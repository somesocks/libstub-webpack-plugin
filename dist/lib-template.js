
const escape = require('./escape');

module.exports = (lib) =>
`
/**** libstub-webpack-plugin: auto-generated lib wrapper for ${lib} ****/

const libstub = require('libstub');

libstub.export('${escape(lib)}', require('${escape(lib)}'));

module.exports = libstub.import('${escape(lib)}');

`;
