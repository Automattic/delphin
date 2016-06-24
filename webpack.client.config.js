// External dependencies
var baseConfig = require( './webpack.base.config' ),
	merge = require( 'webpack-merge' ),
	path = require( 'path' ),
	webpack = require( 'webpack' ),
	NODE_ENV = process.env.NODE_ENV || 'development';

var config = merge.smart( baseConfig, {
	devServer: {
		port: 1337,
		historyApiFallback: true
	},

	entry: [
		'babel-polyfill',
		path.join( __dirname, 'client' )
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [ 'react-hot' ]
			}
		]
	},

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
		devtoolModuleFilenameTemplate: 'app:///[resource-path]'
	},

	plugins: [
		new webpack.DefinePlugin( {
			'process.env': {
				NODE_ENV: JSON.stringify( NODE_ENV ),
				BROWSER: JSON.stringify( true )
			}
		} )
	]
} );

if ( NODE_ENV === 'development' ) {
	// Switches loaders to debug mode. This is required to make CSS hot reloading works correctly (see
	// http://bit.ly/1VTOHrK for more information).
	config.debug = true;

	// Enables source maps
	config.devtool = 'cheap-module-eval-source-map';
}

if ( NODE_ENV === 'production' ) {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin( {
			output: {
				comments: false
			},
			compress: {
				warnings: false
			}
		} )
	);
}

module.exports = config;
