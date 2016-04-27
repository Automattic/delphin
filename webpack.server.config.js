// External dependencies
var baseConfig = require( './webpack.base.config' ),
	fs = require( 'fs' ),
	merge = require( 'webpack-merge' ),
	path = require( 'path' );

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

	target: 'node'
} );

module.exports = config;
