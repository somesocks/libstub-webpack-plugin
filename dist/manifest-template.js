
const escape = require('./escape');

const exportLine = (name) => {
	name = escape(name);
	return `libstub.export('${name}', require('${name}'));`;
};

module.exports = (stubs) => {
	const exports = stubs.map(exportLine).join('\n');

	const content =
`/* * * * libstub-webpack-plugin: auto-generated manifest * * * */

const libstub = require('libstub');

${exports}
`;

	return content;
};
