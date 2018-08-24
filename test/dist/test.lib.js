(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../tmp/tmp-19139D3NXYyKKWyoe.libstub-webpack-plugin.stub.js":
/***/ (function(module, exports, __webpack_require__) {

eval("\n/**** libstub-webpack-plugin: auto-generated stub for uchain ****/\n\nconst libstub = __webpack_require__(\"./node_modules/.registry.npmjs.org/libstub/2.0.0/node_modules/libstub/dist/libstub.js\");\n\nmodule.exports = libstub.import('uchain');\n\n\n\n//# sourceURL=webpack:////tmp/tmp-19139D3NXYyKKWyoe.libstub-webpack-plugin.stub.js?");

/***/ }),

/***/ "../../../../tmp/tmp-19139HDU1S7PUStGR.libstub-webpack-plugin.stub.js":
/***/ (function(module, exports, __webpack_require__) {

eval("\n/**** libstub-webpack-plugin: auto-generated stub for vet ****/\n\nconst libstub = __webpack_require__(\"./node_modules/.registry.npmjs.org/libstub/2.0.0/node_modules/libstub/dist/libstub.js\");\n\nmodule.exports = libstub.import('vet');\n\n\n\n//# sourceURL=webpack:////tmp/tmp-19139HDU1S7PUStGR.libstub-webpack-plugin.stub.js?");

/***/ }),

/***/ "./node_modules/.registry.npmjs.org/libstub/2.0.0/node_modules/libstub/dist/libstub.js":
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;(function (_r, _f) {\n\tif (true) {\n\t\t!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return (_r.libstub = _f(_r)); }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t} else {}\n}(typeof self !== 'undefined' ? self : this, function (_r) {\n\n\tfunction _ls() {\n\t\tthis._cache = {};\n\n\t\tthis.import = function (_n) {\n\t\t\tvar _l = this._cache[_n] || _r[_n];\n\t\t\tif (!_l) { throw new Error('libstub: no module ' + _n); }\n\t\t\tthis._cache[_n] = _l;\n\t\t\treturn _l;\n\t\t};\n\n\t\tthis.export = function (_n, _l) {\n\t\t\t_l = this._cache[_n] || _r[_n] || _l;\n\t\t\tthis._cache[_n] = _l;\n\t\t\treturn _l;\n\t\t};\n\n\t\treturn this;\n\t}\n\n\t_r.libstub = _r.libstub || new _ls();\n\treturn _r.libstub;\n}));\n\n\n//# sourceURL=webpack:///./node_modules/.registry.npmjs.org/libstub/2.0.0/node_modules/libstub/dist/libstub.js?");

/***/ }),

/***/ "./test/src/index.js":
/***/ (function(module, exports, __webpack_require__) {

eval("\n__webpack_require__(\"../../../../tmp/tmp-19139HDU1S7PUStGR.libstub-webpack-plugin.stub.js\");\n\n__webpack_require__(\"../../../../tmp/tmp-19139D3NXYyKKWyoe.libstub-webpack-plugin.stub.js\");\n\n__webpack_require__(\"./node_modules/.registry.npmjs.org/libstub/2.0.0/node_modules/libstub/dist/libstub.js\");\n\n// this is a test bundle\n\nmodule.exports = \"test\";\n\n\n//# sourceURL=webpack:///./test/src/index.js?");

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(\"./test/src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./test/src/index.js?");

/***/ })

/******/ });
});