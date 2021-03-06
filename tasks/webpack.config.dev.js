import path from 'path';
import webpack from 'webpack';

module.exports = {
	devtool: '#inline-eval-cheap-source-map',
	eslint: {
		configFile: '.eslintrc'
	},
	entry: {
		master: [
			'webpack-hot-middleware/client',
			path.join(__dirname, '..', 'src', 'master.jsx')
		],
		slave: [
			'webpack-hot-middleware/client',
			path.join(__dirname, '..', 'src', 'slave.js')
		]
	},
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
		}),
	],
	module: {
		noParse: [
			/webpackNoParse/
		],
		preLoaders: [
			{
				test: /\.js|\.jsx$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.js$/,
				loader: 'imports?define=>false',
				include: /odometer\.js/
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
				loader: 'style-loader!css-loader?modules&localIdentName=[local]--[hash:base64:5]',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules&localIdentName=[local]',
				include: /node_modules/
			},
			{
				test: /\.png|\.jpg$/,
				loader: 'url-loader?limit=25000'
			},
			{
				test: /\.svg$/,
				loader: 'raw-loader'
			},
			{
				test: /\.srt$/,
				loader: 'raw-loader!srt-loader'
			}
		]
	}
};
