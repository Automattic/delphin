var path = require( 'path' );

module.exports = {
	entry:  './src',
	output: {
		path:     'build',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test:   /\.js/,
				loader: 'babel',
				include: path.join( __dirname, '/src' ),
			}
		],
	}
};
