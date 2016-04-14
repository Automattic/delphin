// External dependencies
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import pug from 'pug';
import fs from 'fs';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config';

const app = express(),
	port = process.env.PORT || 1337,
	templatePath = path.join( __dirname, 'views', 'index.pug' ),
	template = fs.readFileSync( templatePath, 'utf8' ),
	templateCompiler = pug.compile( template, { filename: templatePath, pretty: true } );

app.use( '/build', express.static( path.join( __dirname, '..', 'build' ) ) );

app.get( '/*', ( req, res ) => {
	res.send( templateCompiler() );
} );

const isDevelopment = 'production' !== process.env.NODE_ENV;
if ( isDevelopment ) {
	const backendPort = port + 1;

	const devServer = new WebpackDevServer( webpack( config ), {
		publicPath: config.output.publicPath,
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
