// External dependencies
import BodyClassName from 'react-body-classname';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import DocumentTitle from 'react-document-title';
import express from 'express';
import fs from 'fs';
import i18n from 'i18n-calypso';
import { match, RouterContext } from 'react-router';
import reducers from 'app/reducers';
import { routerReducer } from 'react-router-redux';
import path from 'path';
import { Provider } from 'react-redux';
import pug from 'pug';
import { renderToString } from 'react-dom/server';
import React from 'react';
import rtlcss from 'rtlcss';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import thunk from 'redux-thunk';
import serializeJavascript from 'serialize-javascript';

// Internal dependencies
import api from './wpcom-rest-api-proxy';
import config, { isEnabled } from 'config';
import { fileExists } from './utils';
import generateSiteMap from './sitemap-generator';
import i18nCache from './i18n-cache';
import { getPath, defaultRoutes, routes } from 'app/routes';
import { getLocaleSlug } from 'lib/routes';
import Stylizer from 'lib/stylizer';
import webpackConfig from '../webpack.client.config';

const app = express(),
	port = process.env.PORT || 1337,
	templatePath = path.join( __dirname, 'views', 'index.pug' ),
	template = fs.readFileSync( templatePath, 'utf8' ),
	templateCompiler = pug.compile( template, { filename: templatePath, pretty: true } );

function renderPage( props, localeData, isRtl = false ) {
	const store = createStore(
		combineReducers( {
			...reducers,
			routing: routerReducer
		} ),
		applyMiddleware( thunk )
	);

	const css = [];

	const addCss = styles => (
		css.push( isRtl ? rtlcss.process( styles._getCss() ) : styles._getCss() )
	);

	// We're actually not rendering <App /> component here, but one of the routes components,
	// props.children has that actualy component
	const content = renderToString(
		<Provider store={ store }>
			<Stylizer onInsertCss={ addCss }>
				<RouterContext { ...props } />
			</Stylizer>
		</Provider>
	);

	const title = DocumentTitle.rewind();
	const bodyClassName = BodyClassName.rewind();

	const bundlePath = '/scripts/';
	const assets = JSON.parse( fs.readFileSync( path.join( 'public', bundlePath, 'assets.json' ) ) );
	// `main` is an array of JS files after a hot update has been applied
	const bundleFileName = typeof assets.app === 'string' ? assets.app : assets.app[ 0 ];

	let stylesFileName;
	if ( Array.isArray( assets.app ) ) {
		stylesFileName = assets.app.filter( asset => (
			asset.endsWith( '.css' )
		) ).filter( asset => (
			isRtl === asset.endsWith( '.rtl.css' )
		) ).shift();
	}

	const vendorFileName = typeof assets.vendor === 'string' ? assets.vendor : assets.vendor[ 0 ];

	return templateCompiler( {
		content,
		isEnabled,
		isRtl,
		title,
		bodyClassName,
		localeData: localeData ? serializeJavascript( localeData, { isJSON: true } ) : null,
		ogDescription: i18n.translate( 'Every .blog is a story – tell yours. Millions of great .blog domains are still available. Search and register .blog domains at get.blog.' ),
		ogTitle: i18n.translate( 'Find a new .blog domain for your blog.' ),
		css: process.env.BUILD_STATIC ? '' : css.join( '' ),
		resetCss: '/styles/reset.css',
		bundle: path.join( bundlePath, bundleFileName ),
		vendor: path.join( bundlePath, vendorFileName ),
		styles: stylesFileName ? path.resolve( bundlePath, stylesFileName ) : undefined
	} );
}

const generateStaticFile = ( filePath, isRtl ) => {
	match( { routes, location: filePath }, ( error, redirectLocation, props ) => {
		const locale = getLocaleSlug( filePath ),
			localeData = i18nCache.get( locale ),
			staticDirectory = path.join( __dirname, '..', 'public/static' ),
			directory = path.join( __dirname, '..', 'public/static', filePath );

		i18n.setLocale( localeData );

		if ( ! fileExists( staticDirectory ) ) {
			fs.mkdirSync( staticDirectory );
		}

		if ( ! fileExists( directory ) ) {
			fs.mkdirSync( directory );
		}

		fs.writeFile( path.join( directory, 'index.html' ), renderPage( props, localeData, isRtl ), function( writeError ) {
			if ( writeError ) {
				return console.log( writeError );
			}
			console.log( filePath + ' written' );
		} );
	} );
};

const generateStaticFiles = rootRoutes => {
	let staticSlugs = [];

	const addStaticSlugs = innerRoutes => {
		innerRoutes.forEach( route => {
			if ( route.static ) {
				staticSlugs.push( route.slug );
			}

			if ( route.childRoutes ) {
				addStaticSlugs( route.childRoutes );
			}
		} );
	};

	addStaticSlugs( rootRoutes );

	config( 'languages' ).forEach( language => {
		const { langSlug, isRtl } = language;
		staticSlugs.forEach( slug => generateStaticFile( getPath( slug, {}, { locale: langSlug } ), isRtl ) );
	} );
};

const generateStatic404Files = () => {
	config( 'languages' )
		// we filter out `en` because it lives in the top-level static directory, not under `/en/`
		.filter( language => language.langSlug !== config( 'i18n_default_locale_slug' ) )
		.forEach( language => generateStaticFile( `/${ language.langSlug }/404`, language.isRtl ) );

	// generate English 404
	generateStaticFile( '404' );
};

const init = () => {
	if ( process.env.BUILD_STATIC ) {
		generateStaticFiles( defaultRoutes );

		// we need to explicitly generate 404 pages because 404 isn't in in the default routes
		generateStatic404Files();

		generateSiteMap();

		// No need to start the server
		return;
	}

	// Use a development env for express js, even with NODE_ENV set to production
	// so we have the errors printed when a route fails
	app.set( 'env', 'development' );

	app.use( express.static( path.join( __dirname, '..', 'public' ) ) );

	app.use( api() );

	app.get( '/*', ( request, response, next ) => {
		match( { routes, location: request.url }, ( error, redirectLocation, props ) => {
			const localeSlug = getLocaleSlug( request.url ),
				localeData = i18nCache.get( localeSlug );

			i18n.setLocale( localeData );

			const language = config( 'languages' ).find( lang => (
				( ! localeSlug && lang.langSlug === 'en' ) || lang.langSlug === localeSlug
			) );

			if ( props.routes.some( route => route.slug === 'notFound' ) ) {
				response.status( 404 );
			}

			try {
				const pageMarkup = renderPage( props, localeData, language.isRtl );
				response.send( pageMarkup );
			} catch ( renderError ) {
				// pass to default express error handler
				next( renderError );
			}
		} );
	} );

	const isDevelopment = 'production' !== config( 'env' );
	if ( isDevelopment ) {
		const backendPort = port + 1;

		webpackConfig.entry.app.unshift( 'webpack/hot/only-dev-server' ); // "only" prevents reload on syntax errors
		webpackConfig.entry.app.unshift( 'webpack-dev-server/client?/' );
		webpackConfig.plugins.push( new webpack.HotModuleReplacementPlugin() );

		const devServer = new WebpackDevServer( webpack( webpackConfig ), {
			publicPath: webpackConfig.output.publicPath,
			hot: true,
			proxy: {
				'*': 'http://localhost:' + backendPort
			},
			noInfo: true, // suppress boring information
			stats: { colors: true }
		} );

		devServer.listen( port, error => {
			console.log( error || 'Server listening on http://delphin.localhost:' + port );
		} );

		app.listen( backendPort, 'localhost', error => {
			console.log( error || 'Backend listening on http://localhost:' + backendPort );
		} );
	} else {
		app.listen( port, error => {
			console.log( error || 'Server listening on http://localhost:' + port );
		} );
	}
};

i18nCache.fetch( () => {
	console.log( 'i18n data fetched' );
	init();
} );

console.log( '                                         __' );
console.log( '                                     _.-~  )' );
console.log( '                          _..--~~~~,\'   ,-/     _' );
console.log( '                       .-\'. . . .\'   ,-\',\'    ,\' )' );
console.log( '                     ,\'. . . _   ,--~,-\'__..-\'  ,\'' );
console.log( '                   ,\'. . .  (@)\' ---~~~~      ,\'' );
console.log( '                  /. . . . \'~~             ,-\'' );
console.log( '                 /. . . . .             ,-\'' );
console.log( '                ; . . . .  - .        ,\'' );
console.log( '               : . . . .       _     /' );
console.log( '              . . . . .          `-.:' );
console.log( '             . . . ./  - .          )' );
console.log( '            .  . . |  _____..---.._/ ____ δελφίνια _' );
console.log( '      ~---~~~~----~~~~             ~~ ' );
