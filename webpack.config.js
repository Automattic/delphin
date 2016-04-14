/**
 * External dependencies
 */
var webpack = require( 'webpack' ),
	path = require( 'path' );

module.exports = {
	devServer: {
		port: 1337,
		historyApiFallback: true
	},
	entry: [
		'webpack/hot/only-dev-server',
		'webpack-dev-server/client?/',
		path.join( __dirname, 'client' )
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [ 'react-hot', 'babel-loader' ],
				exclude: /node_modules/
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
		new webpack.HotModuleReplacementPlugin(),
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
	}
};
