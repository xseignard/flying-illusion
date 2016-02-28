import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
	eslint: {
		configFile: '.eslintrc'
	},
	entry: [
		path.join(__dirname, '..', 'src', 'main')
	],
	output: {
		path: path.join(__dirname, '..', 'www'),
		filename: '[name].js',
		publicPath: ''
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new ExtractTextPlugin('[name].css'),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})
	],
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.srt']
	},
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
				loader: 'worker?name=[name].[ext]'
			},
			{
				test: /\.js|\.jsx$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.woff$|\.ttf$/,
				loader: 'file-loader?name=[name].[ext]'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?modules&localIdentName=[local]--[hash:base64:5]'
				),
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?modules&localIdentName=[local]'
				),
				include: /node_modules/
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
