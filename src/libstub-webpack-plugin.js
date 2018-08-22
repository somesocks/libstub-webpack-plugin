
const path = require('path');

const prepareStub = require('./prepare-stub');

const { InSeries, InParallel, PassThrough } = require('uchain');

const isOneOf = (...vals) => {
	const valSet = new Set(vals);
	return (val) => valSet.has(val);
};

function LibstubPlugin(options) {
	options = options || {};

	const self = this instanceof LibstubPlugin ? this : Object.create(LibstubPlugin.prototype);

	self.consume = options.consume || [];
	self._stubs = {};

	self.shouldStub = isOneOf(...self.consume);

	self.prepareStub = (next, name) => prepareStub(next, self, name);

	// self.hookCompilation = self.hookCompilation.bind(self);
	self.hookModuleFactory = self.hookModuleFactory.bind(self);

	self.hookBeforeModuleResolve = self.hookBeforeModuleResolve.bind(self);
	self.hookAfterModuleResolve = self.hookAfterModuleResolve.bind(self);


	return self;
};



LibstubPlugin.prototype.hookBeforeModuleResolve = function (request) {
	// console.log('LibstubPlugin.hookBeforeModuleResolve request', request);
	if (
		request.contextInfo &&
		request.contextInfo.issuer &&
		request.contextInfo.issuer.endsWith('.libstub-webpack-plugin.stub.js')
	) {
		request.context = path.resolve(__dirname);
	}
};

LibstubPlugin.prototype.hookAfterModuleResolve = function (result, callback) {
	// console.log('LibstubPlugin.hookAfterModuleResolve result', result.rawRequest);

	if (!this.shouldStub(result.rawRequest)) {
		// console.log('LibstubPlugin.hookAfterModuleResolve no stub', result.rawRequest);
		callback(null, result);
	} else {
		// console.log('LibstubPlugin.hookAfterModuleResolve stubbing', result.rawRequest);

		const task = InSeries(
			(next, plugin, result) => next(null, plugin, result),
			InParallel(
				PassThrough,
				(next, plugin, result) => plugin.prepareStub(next, result.rawRequest),
			),
			(next, [ plugin, result ], [ stubPath ]) => {
				// console.log('LibstubPlugin.hookAfterModuleResolve stubbed', stubPath);

				result.resource = stubPath;
				next(null, result);
			}
		);

		task(callback, this, result);
	}
};

// LibstubPlugin.prototype.hookCompilation = function (compilation) {
// 	// console.log('LibstubPlugin.hookCompilation compilation.hooks', compilation.hooks);
// };

LibstubPlugin.prototype.hookModuleFactory = function (moduleFactory) {
	// console.log('LibstubPlugin.hookModuleFactory moduleFactory.hooks', moduleFactory.hooks);

	moduleFactory.hooks.beforeResolve.tap('LibstubPlugin', this.hookBeforeModuleResolve);
	moduleFactory.hooks.afterResolve.tapAsync('LibstubPlugin', this.hookAfterModuleResolve);
};

LibstubPlugin.prototype.apply = function (compiler) {
	// console.log('LibstubPlugin.apply compiler.hooks', compiler.hooks);

	compiler.hooks.normalModuleFactory.tap('LibstubPlugin', this.hookModuleFactory);
	compiler.hooks.contextModuleFactory.tap('LibstubPlugin', this.hookModuleFactory);

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
