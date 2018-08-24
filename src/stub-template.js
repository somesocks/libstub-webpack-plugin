
const escape = require('./escape');

module.exports = (stub) =>
`
/**** libstub-webpack-plugin: auto-generated stub for ${stub} ****/

const libstub = require('libstub');

module.exports = libstub.import('${escape(stub)}');

`;
