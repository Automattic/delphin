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

	// Enables source maps both for the client and server.
	// - In development this property might be overridden to make debugging easier/faster.
	// - This is required in production to be able to debug client-side errors more easily.
	// Note however that source maps won't be used server-side in production since we serve static pages,
	// in this case it's only useful for the dev server.
	devtool: 'source-map'
};

module.exports = config;
