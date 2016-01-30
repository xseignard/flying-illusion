import path from 'path';
import webpack from 'webpack';

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	eslint: {
		configFile: '.eslintrc'
	},
	entry: [
		'webpack-hot-middleware/client',
		path.join(__dirname, '..', 'src', 'main.jsx')
	],
	output: {
		path: path.join(__dirname, '..', 'www'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.srt']
	},
	resolveLoader: {
		alias: {
			'choreography-loader': path.join(__dirname, '../src/misc/choreography-loader.es5.js')
		}
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		preLoaders: [
			{
				test: /\.js|\.jsx$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.js|\.jsx$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules'
			},
			{
				test: /\.srt$/,
				loader: 'raw-loader!choreography-loader'
			}
		]
	}
};
