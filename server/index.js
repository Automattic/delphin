// External dependencies
import auth from 'http-auth';
import { combineReducers, createStore } from 'redux';
import curry from 'lodash/curry';
import find from 'lodash/find';
import express from 'express';
import fs from 'fs';
import i18n from 'app/lib/i18n';
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

// Internal dependencies
import api from './wpcom-rest-api-proxy';
import config from 'config';
import { fileExists } from './utils';
import i18nCache from './i18n-cache';
import { routes, serverRedirectRoutes, staticPages } from 'app/routes';
import { getLocaleSlug, stripLocaleSlug } from 'lib/routes';
import Stylizer, { addCss } from 'lib/stylizer';
import webpackConfig from '../webpack.config';

const app = express(),
	port = process.env.PORT || 1337,
	templatePath = path.join( __dirname, 'views', 'index.pug' ),
	template = fs.readFileSync( templatePath, 'utf8' ),
	templateCompiler = pug.compile( template, { filename: templatePath, pretty: true } );

i18n.initialize();

if ( config( 'env' ) === 'production' ) {
	app.use( auth.connect( auth.basic( {
		realm: 'Delphin',
		file: path.join( __dirname, 'credentials' )
	} ) ) );
}

function getCompiledTemplate( props, localeData ) {
	const store = createStore(
		combineReducers( {
			...reducers,
			routing: routerReducer
		} )
	);

	const css = [];

	const content = renderToString(
		<Provider store={ store }>
			<Stylizer onInsertCss={ curry( addCss )( css ) }>
				<RouterContext { ...props } />
			</Stylizer>
		</Provider>
	);

	return templateCompiler( { content, localeData, css: css.join( '' ) } );
}

function generateStaticFile( filePath ) {
	match( { routes, location: filePath }, ( error, redirectLocation, props ) => {
		const locale = getLocaleSlug( filePath ),
			localeData = i18nCache.get( locale ),
			staticDirectory = path.join( __dirname, '..', 'public/static' ),
			directory = path.join( __dirname, '..', 'public/static', filePath );

		if ( ! fileExists( staticDirectory ) ) {
			fs.mkdirSync( staticDirectory );
		}

		if ( ! fileExists( directory ) ) {
			fs.mkdirSync( directory );
		}

		fs.writeFile( path.join( directory, 'index.html' ), getCompiledTemplate( props, localeData ), function( writeError ) {
			if ( writeError ) {
				return console.log( writeError );
			}
			console.log( filePath + ' written' );
		} );
	} );
}

const init = () => {
	if ( config( 'env' ) === 'static' ) {
		// Generate static files
		staticPages.forEach( function( file ) {
			generateStaticFile( file );
		} );

		// No need to start the server
		return;
	}

	app.use( express.static( path.join( __dirname, '..', 'public' ) ) );

	app.use( '/build', express.static( path.join( __dirname, '..', 'build' ) ) );

	app.use( api() );

	app.get( '/*', ( request, response ) => {
		match( { routes, location: request.url }, ( error, redirectLocation, props ) => {
			const locale = getLocaleSlug( request.url ),
				localeData = i18nCache.get( locale );

			i18n.initialize( localeData );

			const redirect = find( serverRedirectRoutes, route => {
				return stripLocaleSlug( request.url ).startsWith( route.from );
			} );

			if ( redirect ) {
				response.redirect( locale ? `/${ locale }${ redirect.to }` : redirect.to );

				return;
			}

			if ( props.routes.some( route => route.slug === 'notFound' ) ) {
				response.status( 404 );
			}

			response.send( getCompiledTemplate( props, localeData ) );
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
			console.log( error || 'Server listening on http://localhost:' + port );
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
