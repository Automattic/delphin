// External dependencies
var webpack = require( 'webpack' ),
	path = require( 'path' ),
	NODE_ENV = process.env.NODE_ENV || 'development';

var config = {
	// Switches loaders to debug mode. This is required to make CSS hot reloading works correctly (see
	// http://bit.ly/1VTOHrK for more information).
	debug: true,

	devServer: {
		port: 1337,
		historyApiFallback: true
	},

	entry: [
		path.join( __dirname, 'client' )
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [ 'react-hot', 'babel' ],
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
					'sass?sourceMap'
				]
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
		path: path.resolve( __dirname, 'build' ),
		publicPath: '/build/',
		filename: 'client.bundle.js',
		devtoolModuleFilenameTemplate: 'app:///[resource-path]'
	},

	plugins: [
		new webpack.DefinePlugin( {
			'process.env': {
				NODE_ENV: JSON.stringify( NODE_ENV ),
				BROWSER: JSON.stringify( true )
			}
		} )
	],

	resolve: {
		extensions: [ '', '.json', '.js', '.jsx' ],
		modulesDirectories: [
			'node_modules',
			path.join( __dirname, 'assets' ),
			path.join( __dirname, 'app' ),
			__dirname
		]
	}
};

if ( NODE_ENV === 'development' ) {
	config.devtool = 'eval';
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
