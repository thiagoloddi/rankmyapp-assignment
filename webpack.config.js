const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


const env = process.env.NODE_ENV || "local";

let minimizer = [];
if( env != "local" ) minimizer.push(new UglifyJsPlugin());


module.exports = {
	entry: {
		app: [
			"@babel/polyfill",
			path.resolve(__dirname, "app/index.js")
		]
	},
	mode: env == "local" ? "development" : "production",
	output: {
		path: path.resolve(__dirname, "public/build"),
		filename: "[name].bundle.js",
		chunkFilename: "[name].chunk.js",
		publicPath: "/build/"
	},
	module: {
		rules: [
			{
				test: /\.js(x)?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader"
				} 
			}
		]
	},
	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'local', 
			BASE_URL: 'http://localhost:8081'
		})
	],
	optimization:{
		minimizer
	},
	watch: env == "local",
	resolve: {
		extensions: ['.js', '.jsx']
	}
};