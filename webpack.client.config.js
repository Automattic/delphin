// External dependencies
var baseConfig = require( './webpack.base.config' ),
	ExtractTextPlugin = require( 'extract-text-webpack-plugin' ),
	WebpackRTLPlugin = require( '@automattic/webpack-rtl-plugin' ),
	merge = require( 'webpack-merge' ),
	path = require( 'path' ),
	fs = require( 'fs' ),
	webpack = require( 'webpack' ),
	NODE_ENV = process.env.NODE_ENV || 'development';

var config = merge.smart( baseConfig, {
	entry: [
		'babel-polyfill',
		path.join( __dirname, 'client' )
	],

	node: {
		console: false,
		process: true,
		global: true,
		Buffer: true,
		__filename: 'mock',
		__dirname: 'mock',
		fs: 'empty'
	},

	output: {
		path: path.resolve( __dirname, 'public/scripts' ),
		publicPath: '/scripts/',
		devtoolModuleFilenameTemplate: 'app:///[resource-path]',
		filename: 'bundle.[hash].js',
		sourceMapFilename: 'bundle.[hash].map.js'
	},

	plugins: [
		new webpack.DefinePlugin( {
			'process.env': {
				NODE_ENV: JSON.stringify( NODE_ENV ),
				BROWSER: JSON.stringify( true )
			}
		} ),
		function() {
			// We extract the bundle assets to a file to be used later for serving the correct hashed file
			this.plugin( 'done', function( stats ) {
				fs.writeFileSync(
					path.join( path.resolve( __dirname, 'public/scripts' ), 'assets.json' ),
					JSON.stringify( stats.toJson().assetsByChunkName )
				);
			} );
		}
	]
} );

if ( NODE_ENV === 'development' ) {
	config.devServer = {
		port: 1337,
		historyApiFallback: true
	};

	// Switches loaders to debug mode. This is required to make CSS hot reloading works correctly (see
	// http://bit.ly/1VTOHrK for more information).
	config.debug = true;

	// Use a more performant type of sourcemaps for our development env
	// For a comparison see: https://webpack.github.io/docs/configuration.html#devtool
	config.devtool = 'cheap-module-eval-source-map';
}

if ( NODE_ENV === 'production' ) {
	config = merge.smart( config, {
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					loaders: [ 'react-hot' ]
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract( {
						loader: [
							'css?modules&importLoaders=1&localIdentName=[path][local]&camelCase=dashes',
							'postcss',
							'sass'
						]
					} )
				}
			]
		},
		plugins: [
			new ExtractTextPlugin( '../styles/bundle.[contenthash].css' ),
			new WebpackRTLPlugin( { filename: '../styles/bundle.[contenthash].rtl.css' } ),
			new webpack.optimize.UglifyJsPlugin( {
				sourceMap: !! config.devtool,
				output: {
					comments: false
				},
				compress: {
					warnings: false
				}
			} )
		]
	} );
}

module.exports = config;
