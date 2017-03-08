var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserPlugin = require('open-browser-webpack-plugin');
var uglifyPlugin = webpack.optimize.UglifyJsPlugin;
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: 'build',
		inline: 'true',
		port: 8080,
		stats: {
			colors: true
		}
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: extractTextPlugin.extract('style', 'css'),
				include: path.resolve(__dirname, 'src')
			},
			{
				test: /\.less$/,
				loader: extractTextPlugin.extract('style', 'css!less'),
				include: path.resolve(__dirname, 'src')
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			title: 'webpack demo',
			template: './src/index.html'
		}),
		new openBrowserPlugin({
			url: 'http://localhost:8080'
		}),
		new uglifyPlugin({
			compress: false
		}),
		new extractTextPlugin('style.css', {allChunks: true})
	]
}