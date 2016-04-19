// External dependencies
var fs = require( 'fs' ),
	path = require( 'path' ),
	webpack = require( 'webpack' );

function getExternals() {
	var externals = {};

	fs.readdirSync( path.resolve( __dirname, 'node_modules' ) )
		.filter( function( module ) {
			return [ '.bin' ].indexOf( module ) === -1;
		} )
		.forEach( function( module ) {
			externals[ module ] = 'commonjs ' + module;
		} );

	return externals;
}

module.exports = {
	entry: path.resolve( __dirname, 'server/index.js' ),

	output: {
		path: path.resolve( __dirname, 'build' ),
		publicPath: '/build/',
		filename: 'server.bundle.js'
	},

	target: 'node',

	externals: getExternals(),

	node: {
		__filename: true,
		__dirname: true
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				include: [
					path.join( __dirname, 'app' ),
					path.join( __dirname, 'lib' ),
					path.join( __dirname, 'server' )
				]
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},

	resolve: {
		extensions: [ '', '.json', '.js', '.jsx' ],
		modulesDirectories: [
			'node_modules',
			path.join( __dirname, 'assets' ),
			path.join( __dirname, 'app' ),
			__dirname
		]
	},

	plugins: [
		new webpack.DefinePlugin( {
			'process.env': {
				BROWSER: JSON.stringify( false )
			}
		} )
	]
};
