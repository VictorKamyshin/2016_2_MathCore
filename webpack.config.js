'use strict';

const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	entry: {
		app: path.resolve(__dirname, 'public', 'main.js'),
		vendor: ['babel-polyfill', 'eventsource-polyfill']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: path.join('js', '[name].js')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: {
					presets: ['latest'],
					plugins: ["transform-strict-mode"]
				}
			},
			{
				test: /\.(s)?css/,
				loader: 'style-loader!css-loader!postcss-loader!sass-loader'
			},
			{
				test: /\.tmpl\.xml/,
				loader: 'fest-loader'
			}
		]
	},
	resolve: {
		extensions: [".js", ".scss"]
	},
	resolveLoader: {
		moduleExtensions: ['-loader'],
		alias: {
			'fest-loader': path.resolve(__dirname, './fest-loader')
		}
	},
	plugins: [
		new CleanWebpackPlugin('dist'),
		new CopyWebpackPlugin([{
			from: path.join(__dirname, "public", 'sky34'),
			to: path.join(__dirname, "dist", 'sky34')
		},
		{
			from: path.join(__dirname, "public",'static'),
			to: path.join(__dirname, "dist", 'static')
		}
	]),
		new webpack.LoaderOptionsPlugin({
			debug: true,
			postcss: [precss, autoprefixer]
		}),
		new webpack.NoErrorsPlugin(),
		new HtmlPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'public/index.html')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: path.join('js', '[name].bundle.[hash].js')
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			compress: {
				sequences: true,
				booleans: true,
				loops: true,
				unused: true,
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	]
};
