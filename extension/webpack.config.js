import path from 'path'
import { fileURLToPath } from 'url'
import CopyPlugin from 'copy-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mode = process.env.ENVIRONMENT || 'production'

const optimization = {}

if (mode === 'production') {
	optimization.minimize = true
	optimization.minimizer = [
		new TerserPlugin({
			parallel: true,
			extractComments: true,
			terserOptions: {
				format: {
					comments: false,
				},
				compress: {
					drop_console: true,
					pure_funcs: ['console.info', 'console.debug', 'console.warn'],
				},
			},
		}),
	]
}

export default [
	{
		mode,
		target: 'web',
		entry: {
			content: './src/content/content.ts',
			background: './src/background/background.ts'
		},
		module: {
			rules: [
				{
					test: /\.ts?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ['.ts', '.js'],
			alias: { '@global': path.resolve(__dirname, '../web/src/utils') },
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			new CopyPlugin({
				patterns: [{ from: './src/static', to: '' }],
			}),
			new webpack.DefinePlugin({
				'process.env': JSON.stringify(process.env),
			}),
		],
		optimization,
	},
]
