// External dependencies
var autoprefixer = require( 'autoprefixer' ),
	path = require( 'path' );

var config = {
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [ 'babel' ],
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
