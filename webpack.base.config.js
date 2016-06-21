// External dependencies
var autoprefixer = require( 'autoprefixer' ),
	path = require( 'path' );

var config = {
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [ 'babel' ],
				include: [
					path.resolve( __dirname, 'client' ),
					path.resolve( __dirname, 'app' ),
					path.resolve( __dirname, 'lib' ),
					path.resolve( __dirname, 'server' ),
					path.resolve( __dirname, 'node_modules', '@automattic', 'dops-components', 'client', 'components' )
				]
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
			},
			{
				test: /\.svg$/,
				loader: 'babel!svg-react'
			}
		]
	},

	output: {
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
	}
};

module.exports = config;
