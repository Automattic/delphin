// External dependencies
import { combineReducers, createStore, applyMiddleware } from 'redux';
import curry from 'lodash/curry';
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
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import thunk from 'redux-thunk';

// Internal dependencies
import api from './wpcom-rest-api-proxy';
import config, { isEnabled } from 'config';
import { fileExists } from './utils';
import generateSourceMap from './sitemap-generator';
import i18nCache from './i18n-cache';
import { getPath, defaultRoutes, routes } from 'app/routes';
import { getLocaleSlug } from 'lib/routes';
import Stylizer, { addCss } from 'lib/stylizer';
import webpackConfig from '../webpack.client.config';

const app = express(),
	port = process.env.PORT || 1337,
	templatePath = path.join( __dirname, 'views', 'index.pug' ),
	template = fs.readFileSync( templatePath, 'utf8' ),
	templateCompiler = pug.compile( template, { filename: templatePath, pretty: true } );

function renderPage( props, localeData ) {
	const store = createStore(
		combineReducers( {
			...reducers,
			routing: routerReducer
		} ),
		applyMiddleware( thunk )
	);

	const css = [];

	// We're actually not rendering <App /> component here, but one of the routes components,
	// props.children has that actualy component
	const content = renderToString(
		<Provider store={ store }>
			<Stylizer onInsertCss={ curry( addCss )( css ) }>
				<RouterContext { ...props } />
			</Stylizer>
		</Provider>
	);

	const title = DocumentTitle.rewind();

	const bundlePath = '/scripts/';
	const assets = JSON.parse( fs.readFileSync( path.join( 'public', bundlePath, 'assets.json' ) ) );
	// `main` is an array of JS files after a hot update has been applied
	const bundleFileName = typeof assets.main === 'string' ? assets.main : assets.main[ 0 ];

	return templateCompiler( {
		content,
		isEnabled,
		localeData,
		title,
		css: css.join( '' ),
		bundle: path.join( bundlePath, bundleFileName )
	} );
}

const generateStaticFile = filePath => {
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

		fs.writeFile( path.join( directory, 'index.html' ), renderPage( props, localeData ), function( writeError ) {
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

	config( 'languages' ).map( language => language.langSlug ).forEach( locale => {
		staticSlugs.forEach( slug => generateStaticFile( getPath( slug, {}, { locale } ) ) );
	} );
};

const init = () => {
	if ( process.env.BUILD_STATIC ) {
		generateStaticFiles( defaultRoutes );

		// we need to explicitly generate a 404 page because it isn't in in the default routes
		generateStaticFile( '404' );

		generateSourceMap();

		// No need to start the server
		return;
	}

	// Use a development env for express js, even with NODE_ENV set to production
	// so we have the errors printed when a route fails
	app.set( 'env', 'development' );

	app.use( express.static( path.join( __dirname, '..', 'public' ) ) );

	app.use( api() );

	app.get( '/*', ( request, response ) => {
		match( { routes, location: request.url }, ( error, redirectLocation, props ) => {
			const locale = getLocaleSlug( request.url ),
				localeData = i18nCache.get( locale );

			i18n.setLocale( localeData );

			if ( props.routes.some( route => route.slug === 'notFound' ) ) {
				response.status( 404 );
			}

			response.send( renderPage( props, localeData ) );
		} );
	} );

	const isDevelopment = 'production' !== config( 'env' );
	if ( isDevelopment ) {
		const backendPort = port + 1;

		webpackConfig.entry.unshift( 'webpack/hot/only-dev-server' );
		webpackConfig.entry.unshift( 'webpack-dev-server/client?/' );
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
