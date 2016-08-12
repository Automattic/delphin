// External dependencies
var baseConfig = require( './webpack.base.config' ),
	fs = require( 'fs' ),
	merge = require( 'webpack-merge' ),
	path = require( 'path' ),
	webpack = require( 'webpack' ),
	NODE_ENV = process.env.NODE_ENV || 'development';

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

var config = merge.smart( baseConfig, {
	entry: path.resolve( __dirname, 'server/index.js' ),

	externals: getExternals(),

	node: {
		__filename: true,
		__dirname: true
	},

	output: {
		path: path.resolve( __dirname, 'server/build' )
	},

	target: 'node',

	// Enables source maps
	// This is fine since the server won't be used in production
	devtool: 'source-map',

	plugins: [
		// inject source map support on top of the build file
		new webpack.BannerPlugin( 'require("source-map-support").install();', { raw: true, entryOnly: false } ),
		new webpack.DefinePlugin( {
			'process.env': {
				NODE_ENV: JSON.stringify( NODE_ENV ),
				BROWSER: JSON.stringify( false )
			}
		} )
	]
} );

module.exports = config;
