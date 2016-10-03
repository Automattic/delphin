// External dependencies
var autoprefixer = require( 'autoprefixer' ),
	path = require( 'path' ),
	webpack = require( 'webpack' ),
	supportedLocales = require( './app/config/languages' ).map( function( language ) { return language.langSlug; } );

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

	resolve: {
		extensions: [ '.json', '.js', '.jsx' ],
		enforceExtension: false,
		modules: [
			'node_modules',
			path.join( path.resolve( path.dirname( '' ) ), 'app' ),
			path.resolve( path.dirname( '' ) )
		]
	},

	// Enables source maps both for the client and server.
	devtool: 'source-map',

	plugins: [
		new webpack.LoaderOptionsPlugin( {
			test: /\.scss$/,
			debug: ! process.env.NODE_ENV || process.env.NODE_ENV === 'development',
			options: {
				sassLoader: {
					includePaths: [ path.resolve( __dirname, 'app' ) ]
				},
				context: __dirname,
				postcss: () => [ autoprefixer ]
			}
		} ),
		// Exclude unused locales from moment.js
		new webpack.ContextReplacementPlugin( /moment[\/\\]locale$/, new RegExp( supportedLocales.join('|') ) )
	]
};

module.exports = config;
