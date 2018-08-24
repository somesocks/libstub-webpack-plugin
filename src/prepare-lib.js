
const fs = require('fs');
const tmp = require('tmp');
const libTemplate = require('./lib-template');
const { InSeries, InParallel, PassThrough, If, Logging } = require('uchain');

const createTempFile = InSeries(
	// Logging('createTempFile', (name) => name),
	(next, name) => next(null, { postfix: '.libstub-webpack-plugin.lib.js' }),
	(next, options) => tmp.file(options, next),
	(next, path, fd) => next(null, path)
);

const buildLibContent = (next, name) => next(null, libTemplate(name));

const writeLibContent = (next, path, content) => fs.writeFile(path, content, next);

const buildLib = InSeries(
	// Logging('buildLib', (name) => name),
	(next, name) => next(null, { name }),
	InParallel(
		PassThrough,
		(next, { name }) => createTempFile(next, name),
		(next, { name }) => buildLibContent(next, name),
	),
	(next, [ context ], [ path ], [ content ]) => {
		context.path = path;
		context.content = content;
		next(null, context)
	},
	InParallel(
		PassThrough,
		(next, { path, content }) => writeLibContent(next, path, content)
	),
	(next, [ context ]) => next(null, context.name, context.path)
);

const buildWrapper = InSeries(
	// Logging('buildWrapper', (plugin, name) => name),
	(next, plugin, name) => next(null, plugin, name),
	InParallel(
		PassThrough,
		(next, plugin, name) => buildLib(next, name)
	),
	(next, [ plugin ], [ name, path ]) => next(null, plugin, name, path),
	(next, plugin, name, path) => {
		plugin._libs[name] = plugin._libs[name] || path;
		next(null, plugin, name);
	}
);

const conditionalWrapper = InSeries(
	// Logging('conditionalWrapper', (plugin, name) => name),
	(next, plugin, name) => next(null, plugin, name),
	If(
		(next, plugin, name) => next(null, plugin._libs[name] != null),
		PassThrough,
		buildWrapper
	),
	(next, plugin, name) => next(null, plugin._libs[name])
);

module.exports = conditionalWrapper;
