
const path = require('path');

const prepareStub = require('./prepare-stub');
const prepareLib = require('./prepare-lib');

const manifestTemplate = require('./manifest-template');

const { InSeries, InParallel, PassThrough } = require('uchain');

const isOneOf = (...vals) => {
	const valSet = new Set(vals);
	return (val) => valSet.has(val);
};

function LibstubPlugin(options) {
	options = options || {};

	const self = this instanceof LibstubPlugin ? this : Object.create(LibstubPlugin.prototype);

	self._stubsList = options.stubs || options.toStub || [];
	self._libsList = options.libs || [];

	self._stubs = {};
	self._libs = {};

	self.isStub = isOneOf(...self._stubsList);
	self.shouldResolveStub = (request) => self.isStub(request.request);

	self.isLib = isOneOf(...self._libsList);
	self.shouldResolveLib = (request) =>
		self.isLib(request.request) &&
		!(request.contextInfo.issuer || '')
			.endsWith('.libstub-webpack-plugin.lib.js');

	self.prepareStub = (next, name) => prepareStub(next, self, name);
	self.prepareLib = (next, name) => prepareLib(next, self, name);

	// self.hookCompilation = self.hookCompilation.bind(self);
	self.hookEmit = self.hookEmit.bind(self);
	self.hookModuleFactory = self.hookModuleFactory.bind(self);

	self.hookBeforeModuleResolve = self.hookBeforeModuleResolve.bind(self);

	return self;
};



LibstubPlugin.prototype.hookBeforeModuleResolve = function (request, callback) {
	// console.log('LibstubPlugin.hookBeforeModuleResolve request', request);

	if (this.shouldResolveStub(request)) {
		// console.log('LibstubPlugin.hookBeforeModuleResolve shouldResolveStub', request);

		const task = InSeries(
			(next, plugin, request) => next(null, plugin, request),
			InParallel(
				PassThrough,
				(next, plugin, request) => plugin.prepareStub(next, request.request),
			),
			(next, [ plugin, request ], [ stubPath ]) => {
				// console.log('LibstubPlugin.hookAfterModuleResolve stubbed', stubPath);

				request.request = stubPath;

				next(null, request);
			}
		);

		task(callback, this, request);
	} else if (this.shouldResolveLib(request)) {
		// console.log('LibstubPlugin.hookBeforeModuleResolve shouldResolveLib', request);

		const task = InSeries(
			(next, plugin, request) => next(null, plugin, request),
			InParallel(
				PassThrough,
				(next, plugin, request) => plugin.prepareLib(next, request.request),
			),
			(next, [ plugin, request ], [ libPath ]) => {
				// console.log('LibstubPlugin.hookAfterModuleResolve stubbed', stubPath);

				request.request = libPath;

				next(null, request);
			}
		);

		task(callback, this, request);
	} else if (
		(request.contextInfo.issuer || '').endsWith('.libstub-webpack-plugin.stub.js') ||
		(request.contextInfo.issuer || '').endsWith('.libstub-webpack-plugin.lib.js')
	) {
		request.context = path.resolve(__dirname);
		callback(null, request);
	} else {
		callback(null, request);
	}
};

// LibstubPlugin.prototype.hookCompilation = function (compilation) {
// 	console.log('LibstubPlugin.hookCompilation compilation.hooks', compilation.hooks);
// };

LibstubPlugin.prototype.hookEmit = function (compilation, callback) {
	// console.log('LibstubPlugin.hookEmit compilation.outputOptions', compilation.outputOptions);
	// console.log('LibstubPlugin.hookEmit compilation.assets', compilation.assets);

	const manifestContent = manifestTemplate(this._stubsList);

	Object
		.keys(compilation.assets)
		.filter((name) => name.endsWith('.js'))
		.map((name) => path.basename(name, '.js'))
		.map((name) => `${name}.dependencies.js`)
		.forEach(
			(name) => {
				compilation.assets[name] = {
					source: () => manifestContent,
					size: () => manifestContent.length
				};
			}
		);

	callback();
};

LibstubPlugin.prototype.hookModuleFactory = function (moduleFactory) {
	console.log('LibstubPlugin.hookModuleFactory moduleFactory.hooks', moduleFactory.hooks);

	moduleFactory.hooks.beforeResolve.tapAsync('LibstubPlugin', this.hookBeforeModuleResolve);
};

LibstubPlugin.prototype.apply = function (compiler) {
	// console.log('LibstubPlugin.apply compiler.hooks', compiler.hooks);

	compiler.hooks.normalModuleFactory.tap('LibstubPlugin', this.hookModuleFactory);
	compiler.hooks.contextModuleFactory.tap('LibstubPlugin', this.hookModuleFactory);

	compiler.hooks.emit.tapAsync('LibstubPlugin', this.hookEmit);

	// compiler.hooks.compilation.tap('LibstubPlugin', this.hookCompilation);

	//
	// compiler.hooks.normalModuleFactory.tap("IgnorePlugin", nmf => {
	// 	nmf.hooks.beforeResolve.tap("IgnorePlugin", this.log);
	// });
	// compiler.hooks.contextModuleFactory.tap("IgnorePlugin", cmf => {
	// 	cmf.hooks.beforeResolve.tap("IgnorePlugin", this.log);
	// });
};

module.exports = LibstubPlugin;
