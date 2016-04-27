// External dependencies
var autoprefixer = require( 'autoprefixer' ),
	fs = require( 'fs' ),
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

	externals: getExternals(),

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.scss$/,
				loaders: [
					'isomorphic-style',
					'css?modules&importLoaders=1&localIdentName=[path][local]&camelCase=dashes&sourceMap',
					'postcss',
					'sass?sourceMap'
				]
			}
		]
	},

	node: {
		__filename: true,
		__dirname: true
	},

	output: {
		path: path.resolve( __dirname, 'server/build' ),
		filename: 'bundle.js'
	},

	postcss() {
		return [ autoprefixer ];
	},

	resolve: {
		extensions: [ '', '.json', '.js', '.jsx' ],
		modulesDirectories: [
			'node_modules',
			path.join( __dirname, 'app' ),
			__dirname
		]
	},

	target: 'node'
};
