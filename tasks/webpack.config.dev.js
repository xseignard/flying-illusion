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
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		})
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
				test: /\.worker\.js$/,
				loader: 'worker!'
			},
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
				test: /\.png|\.jpg|\.svg$/,
				loader: 'file-loader?name=img/[name].[ext]'
			},
			{
				test: /\.srt$/,
				loader: 'raw-loader!srt-loader'
			}
		]
	}
};
