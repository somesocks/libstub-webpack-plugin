
const fs = require('fs');
const tmp = require('tmp');
const stubTemplate = require('./stub-template');
const { InSeries, InParallel, PassThrough, If, Logging } = require('uchain');

const createTempFile = InSeries(
	Logging('createTempFile', (name) => name),
	(next, name) => next(null, { prefix: `${name}.`, postfix: '.libstub-webpack-plugin.stub.js' }),
	(next, options) => tmp.file(options, next),
	(next, path, fd) => next(null, path)
);

const buildStubContent = (next, name) => next(null, stubTemplate(name));

const writeStubContent = (next, path, content) => fs.writeFile(path, content, next);

const buildStub = InSeries(
	Logging('buildStub', (name) => name),
	(next, name) => next(null, { name }),
	InParallel(
		PassThrough,
		(next, { name }) => createTempFile(next, name),
		(next, { name }) => buildStubContent(next, name),
	),
	(next, [ context ], [ path ], [ content ]) => {
		context.path = path;
		context.content = content;
		next(null, context)
	},
	InParallel(
		PassThrough,
		(next, { path, content }) => writeStubContent(next, path, content)
	),
	(next, [ context ]) => next(null, context.name, context.path)
);

const buildWrapper = InSeries(
	Logging('buildWrapper', (plugin, name) => name),
	(next, plugin, name) => next(null, plugin, name),
	InParallel(
		PassThrough,
		(next, plugin, name) => buildStub(next, name)
	),
	(next, [ plugin ], [ name, path ]) => next(null, plugin, name, path),
	(next, plugin, name, path) => {
		plugin._stubs[name] = plugin._stubs[name] || path;
		next(null, plugin, name);
	}
);

const conditionalWrapper = InSeries(
	Logging('conditionalWrapper', (plugin, name) => name),
	(next, plugin, name) => next(null, plugin, name),
	If(
		(next, plugin, name) => next(null, plugin._stubs[name] != null),
		PassThrough,
		buildWrapper
	),
	(next, plugin, name) => next(null, plugin._stubs[name])
);

module.exports = conditionalWrapper;
