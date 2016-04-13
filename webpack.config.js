/**
 * External dependencies
 */
var webpack = require( 'webpack' ),
	path = require( 'path' );

module.exports = {
	entry: {
		'bundle': [
			path.join( __dirname, 'client' )
		]
	},
	output: {
		path: path.join( __dirname, 'build' ),
		publicPath: '/build/',
		filename: '[name].js',
		devtoolModuleFilenameTemplate: 'app:///[resource-path]'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: [
					path.join( __dirname, 'app' ),
					path.join( __dirname, 'client' ),
					path.join( __dirname, 'lib' )
				]
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass?sourceMap'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin( {
			'process.env': {
				WPCOM_API_KEY: '"' + process.env.WPCOM_API_KEY + '"'
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
	},
	devServer: {
		port: 1337,
		historyApiFallback: true
	},
	node: {
		console: false,
		process: true,
		global: true,
		Buffer: true,
		__filename: 'mock',
		__dirname: 'mock',
		fs: 'empty'
	}
};
