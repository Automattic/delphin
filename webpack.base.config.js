// External dependencies
var autoprefixer = require( 'autoprefixer' ),
	path = require( 'path' ),
	rtlcss = require( 'rtlcss' ),
	webpack = require( 'webpack' );

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
		return process.env.BUILD_RTL ? [ autoprefixer, rtlcss ] : [ autoprefixer ];
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
	// Note:
	// - Source maps won't be used server-side in production since we serve static pages.
	// - Source maps are disabled for the RTL build in production to keep the
	//   size of our diffs down.
	devtool: process.env.NODE_ENV === 'production' && process.env.BUILD_RTL ? undefined : 'source-map',

	plugins: [
		new webpack.DefinePlugin( {
			BUILD_RTL: JSON.stringify( !! process.env.BUILD_RTL )
		} )
	]
};

module.exports = config;
