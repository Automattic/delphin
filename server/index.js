// External dependencies
import auth from 'http-auth';
import { combineReducers, createStore } from 'redux';
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
import config from 'config';
import api from 'server/wpcom-rest-api-proxy';
import routes, { serverRedirectRoutes } from 'app/routes';
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

app.use( '/build', express.static( path.join( __dirname, '..', 'build' ) ) );

app.use( '/favicon.ico', express.static( path.join( __dirname, '..', 'assets', 'favicon.ico' ) ) );

app.get( '/*', ( request, response ) => {
	match( { routes, location: request.url }, ( error, redirectLocations, props ) => {
		if ( ! props ) {
			response.status( 404 ).send( 'Not found.' );
			return;
		}

		const redirect = find( serverRedirectRoutes, route => {
			return request.url.substring( 1 ).startsWith( route.from );
		} );

		if ( redirect ) {
			response.redirect( redirect.to );
			return;
		}

		const store = createStore(
			combineReducers( {
				...reducers,
				routing: routerReducer
			} )
		);

		const appHtml = renderToString(
			<Provider store={ store }>
				<RouterContext { ...props } />
			</Provider>
		);

		response.send( templateCompiler( { content: appHtml } ) );
	} );
} );

const isDevelopment = 'production' !== config( 'env' );
if ( isDevelopment ) {
	const backendPort = port + 1;

	webpackConfig.entry.unshift( 'webpack/hot/only-dev-server' );
	webpackConfig.entry.unshift( 'webpack-dev-server/client?/' );
	webpackConfig.plugins.push( new webpack.HotModuleReplacementPlugin() );

	webpackConfig.module.loaders.unshift( {
		test: /\.jsx?$/,
		loader: 'react-hot',
		include: [
			path.join( __dirname, '../app' ),
			path.join( __dirname, '../client' ),
			path.join( __dirname, '../lib' )
		]
	} );

	const devServer = new WebpackDevServer( webpack( webpackConfig ), {
		publicPath: webpackConfig.output.publicPath,
		hot: true,
		proxy: {
			'*': 'http://localhost:' + backendPort
		},
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
