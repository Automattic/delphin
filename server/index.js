var express = require( 'express' ),
	path = require( 'path' ),
	webpack = require( 'webpack' ),
	app = express(),
	isDevelopment, config, WebpackDevServer, compiler, devServer;

app.set( 'port', process.env.PORT || 1337 );

app.use( '/build', express.static( path.join( __dirname, '..', 'build' ) ) );

app.get( '/*', function( req, res ) {
	res.sendFile( 'index.html', { root: path.join( __dirname, 'views' ) } );
} );

isDevelopment = 'production' !== process.env.NODE_ENV;
if ( isDevelopment ) {
	app.set( 'backend-port', app.get( 'port' ) + 1 );

	config = require( '../webpack.config' );
	config.entry.bundle.unshift( 'webpack/hot/only-dev-server' );
	config.entry.bundle.unshift( 'webpack-dev-server/client?/' );
	config.plugins.push( new webpack.HotModuleReplacementPlugin() );

	config.module.loaders.unshift( {
		test: /\.jsx?$/,
		loader: 'react-hot',
		include: [
			path.join( __dirname, '../app' ),
			path.join( __dirname, '../client' ),
			path.join( __dirname, '../lib' )
		]
	} );

	WebpackDevServer = require( 'webpack-dev-server' );
	compiler = webpack( config );
	devServer = new WebpackDevServer( compiler, {
		publicPath: config.output.publicPath,
		hot: true,
		proxy: {
			'*': 'http://localhost:' + app.get( 'backend-port' )
		},
		stats: { colors: true }
	} );

	devServer.listen( app.get( 'port' ), function( err ) {
		console.log( err || 'Server listening on http://localhost:' + app.get( 'port' ) );
	} );
	app.listen( app.get( 'backend-port' ), function( err ) {
		console.log( err || 'Backend listening on http://localhost:' + app.get( 'backend-port' ) );
	} );
} else {
	app.listen( app.get( 'port' ), function( err ) {
		console.log( err || 'Server listening on http://localhost:' + app.get( 'port' ) );
	} );
}
