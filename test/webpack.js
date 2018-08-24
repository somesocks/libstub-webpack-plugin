/* eslint-env node */

const path = require('path');
const Webpack = require('webpack');

const LibstubPlugin = require('../dist');

const BASE_DIR = path.normalize(`${__dirname}/../`);
const SRC_DIR = path.normalize(`${__dirname}/../test/src`);
const BUILD_DIR = path.normalize(`${__dirname}/../test/dist/`);


const plugins = [
	LibstubPlugin(
		{
			stubs: [ 'uchain', 'vet', 'moment' ],
			// libs: [ 'uchain', 'vet' ],
			// toStub: [ 'uchain' ],
			// toStub: [ ],
		}
	),
	// new Webpack.IgnorePlugin(/vet/),
];

module.exports = {
	mode: 'development',
	entry: {
		'test.lib.js': [ `${SRC_DIR}/index.js` ],
	},
	output: {
		path: BUILD_DIR,
		pathinfo: false,
		filename: '[name]',
		libraryTarget: 'umd',
	},
	module: {
	},
	resolve: {
		modules: [ SRC_DIR, 'node_modules' ],
		extensions: [ '.*', '.js', '.jsx', '.css', '.scss' ],
	},
	stats: {
		colors: true,
		children: false,
		chunkModules: false,
	},
	plugins,
};
