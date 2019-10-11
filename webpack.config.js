var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	resolve: {
		extensions: ['.js', '.vue']
	},
	module: {
		rules: [
			{
				test: /\.vue?$/,
				exclude: /(node_modules)/,
				use: 'vue-loader'
			},
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				use: 'babel-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		]
	},
	plugins: [new HtmlWebpackPlugin({
		template: './src/index.html'
	})],
	devServer: {
		historyApiFallback: true
	},
	externals: {
		// global app config object
		config: JSON.stringify({
			apiUrl: 'http://localhost:5000/api'
		})
	}
};