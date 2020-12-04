/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 114);
/******/ })
/************************************************************************/
/******/ ({

/***/ 114:
/*!************************!*\
  !*** ./src/classic.js ***!
  \************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("window.gutestrap = window.gutestrap || {};\njQuery(function ($) {\n  var _window = window,\n      gutestrap = _window.gutestrap;\n  var customScssMetabox = $(\"#gutenberg_custom_scss_metabox\");\n\n  if (customScssMetabox.length) {\n    gutestrap.customScssEditor = wp.codeEditor.initialize(customScssMetabox, gutestrapCodeMirrorSettings);\n    gutestrap.customScssEditor.codemirror.on(\"blur\", function () {\n      gutestrap.customScssEditor.codemirror.save();\n    });\n    setTimeout(function () {\n      gutestrap.customScssEditor.codemirror.refresh();\n    }, 1);\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTE0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzaWMuanM/M2VhOCJdLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuZ3V0ZXN0cmFwID0gd2luZG93Lmd1dGVzdHJhcCB8fCB7fTtcbmpRdWVyeShmdW5jdGlvbiAoJCkge1xuICB2YXIgX3dpbmRvdyA9IHdpbmRvdyxcbiAgICAgIGd1dGVzdHJhcCA9IF93aW5kb3cuZ3V0ZXN0cmFwO1xuICB2YXIgY3VzdG9tU2Nzc01ldGFib3ggPSAkKFwiI2d1dGVuYmVyZ19jdXN0b21fc2Nzc19tZXRhYm94XCIpO1xuXG4gIGlmIChjdXN0b21TY3NzTWV0YWJveC5sZW5ndGgpIHtcbiAgICBndXRlc3RyYXAuY3VzdG9tU2Nzc0VkaXRvciA9IHdwLmNvZGVFZGl0b3IuaW5pdGlhbGl6ZShjdXN0b21TY3NzTWV0YWJveCwgZ3V0ZXN0cmFwQ29kZU1pcnJvclNldHRpbmdzKTtcbiAgICBndXRlc3RyYXAuY3VzdG9tU2Nzc0VkaXRvci5jb2RlbWlycm9yLm9uKFwiYmx1clwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBndXRlc3RyYXAuY3VzdG9tU2Nzc0VkaXRvci5jb2RlbWlycm9yLnNhdmUoKTtcbiAgICB9KTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGd1dGVzdHJhcC5jdXN0b21TY3NzRWRpdG9yLmNvZGVtaXJyb3IucmVmcmVzaCgpO1xuICAgIH0sIDEpO1xuICB9XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jbGFzc2ljLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///114\n");

/***/ })

/******/ });