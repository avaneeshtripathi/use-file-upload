const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const { env } = require('minimist')(process.argv.slice(2));

module.exports = {
	entry: {
		index: path.join(__dirname, './', '../app/assets/javascript/main.js'),
		vendor: ['underscore']
	},
	output: {
		filename: 'assets/javascript/[name]-[hash].js',
		path: path.join(__dirname, '../build'),
		publicPath: env === 'production' ? '/file-uploader/' : '/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react', 'stage-0'],
					compact: true
				}
			},
			{
				test: /\.css|.scss|.sass$/,
				loader: 'style-loader!css-loader?modules!sass-loader'
			},
			{
				test: /\.png|jpg|gif$/,
				loader: 'file-loader?name=assets/images/[name]-[hash].[ext]'
			},
			{
				test: /\.(woff|woff2|svg|ttf|eot|ico)$/,
				loader: 'file-loader?name=assets/fonts/[name]-[hash].[ext]'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'app/index.html',
			filename: 'index.html',
			chunks: ['index', 'vendor']
		}),
		new ExtractTextPlugin('React-fileUploader/assets/stylesheet/[name]-[hash].min.css'),
		new webpack.ProvidePlugin({
			React: 'react',
			underscore: 'underscore'
		}),
		new ManifestPlugin({
			fileName: 'asset-manifest.json',
		}),
	],
	stats: {
		colors: true
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.sass', '.scss'],
		modules: ['app', 'node_modules']
	}
};
