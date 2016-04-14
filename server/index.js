// External dependencies
var express = require( 'express' ),
	app = express(),
	path = require( 'path' ),
	webpack = require( 'webpack' ),
	isDevelopment = 'production' !== process.env.NODE_ENV,
	port = process.env.PORT || 1337,
	backendPort, config, WebpackDevServer, compiler, devServer;

app.use( '/build', express.static( path.join( __dirname, '..', 'build' ) ) );

app.get( '/*', function( req, res ) {
	res.sendFile( 'index.html', { root: path.join( __dirname, 'views' ) } );
} );

if ( isDevelopment ) {
	backendPort = port + 1;

	WebpackDevServer = require( 'webpack-dev-server' );
	config = require( '../webpack.config' );
	compiler = webpack( config );

	devServer = new WebpackDevServer( compiler, {
		publicPath: config.output.publicPath,
		hot: true,
		proxy: {
			'*': 'http://localhost:' + backendPort
		},
		stats: { colors: true }
	} );

	devServer.listen( port, function( err ) {
		console.log( err || 'Server listening on http://localhost:' + port );
	} );
	app.listen( backendPort, 'localhost', function( err ) {
		console.log( err || 'Backend listening on http://localhost:' + backendPort );
	} );
} else {
	app.listen( port, function( err ) {
		console.log( err || 'Server listening on http://localhost:' + port );
	} );
}
