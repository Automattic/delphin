/**
 * External dependencies
 */
var webpack = require( 'webpack' ),
	path = require( 'path' );

module.exports = {
	entry: [
		'webpack/hot/only-dev-server',
		'webpack-dev-server/client?/',
		path.join( __dirname, 'client' )
	],
	output: {
		path: path.resolve( __dirname, 'build' ),
		publicPath: '/build/',
		filename: 'client.bundle.js',
		devtoolModuleFilenameTemplate: 'app:///[resource-path]'
	},
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
		],
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
	},
};
