const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const common = require('./webpack.common')

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new ImageminPlugin({
			optipng: {
				optimizationLevel: 7,
			},
		}),
		new ZipPlugin({
			filename: 'app.zip',
			exclude: [/\.js.map$/],
		}),
	],
})
