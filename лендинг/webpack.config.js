const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
	entry: ".static/script.js",
	output: {
		filename: "bundle.js"
	},
	mode: "production",
	watch: true,
	module:{
		rules:[]

	},
	plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],

};