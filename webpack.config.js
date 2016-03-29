/**
 * External dependencies
 */
var webpack = require( 'webpack' ),
	path = require( 'path' );

module.exports = {
	entry:  './src',
	output: {
		path:     'build',
		filename: 'bundle.js',
		publicPath: '/build',
	},
	module: {
		loaders: [
			{
				test:   /\.jsx?$/,
				loader: 'babel-loader',
				include: path.join( __dirname, '/src' )
			}
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		extensions: [ '', '.js', '.jsx' ]
	},
	devServer: {
		port: 1337,
		historyApiFallback: true
	}
};
