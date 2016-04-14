// External dependencies
var express = require( 'express' ),
	app = express(),
	path = require( 'path' ),
	webpack = require( 'webpack' ),
	isDevelopment = 'production' !== process.env.NODE_ENV,
	port = process.env.PORT || 1337,
	pug = require( 'pug' ),
	fs = require( 'fs' ),
	backendPort, isDevelopment, config, WebpackDevServer, compiler, devServer, template, templateCompiler, templatePath;

app.use( '/build', express.static( path.join( __dirname, '..', 'build' ) ) );

app.get( '/*', function( req, res ) {
	templatePath = path.join( __dirname, 'views', 'index.pug' );
	template = fs.readFileSync( templatePath, 'utf8' );
	templateCompiler = pug.compile( template, { filename: templatePath, pretty: true } );

	res.send( templateCompiler() );
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
