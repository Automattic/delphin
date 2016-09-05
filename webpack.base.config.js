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

	// Enables source maps
	// This is for the server since it won't be used in production
	// Also, we want sourcemaps for the client to debug errors sent to Sentry
	devtool: 'source-map'
};

module.exports = config;
