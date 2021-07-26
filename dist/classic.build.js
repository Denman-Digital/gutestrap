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
/******/ 	return __webpack_require__(__webpack_require__.s = 302);
/******/ })
/************************************************************************/
/******/ ({

/***/ 302:
/*!************************!*\
  !*** ./src/classic.js ***!
  \************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("window.gutestrap = window.gutestrap || {};\njQuery(function ($) {\n  var _window = window,\n      gutestrap = _window.gutestrap;\n\n  function initializeCodemirror() {\n    var customScssMetabox = $(\"#gutestrap_custom_scss_metabox\");\n\n    if (!customScssMetabox.length) {\n      return false;\n    }\n\n    gutestrap.customScssEditor = wp.codeEditor.initialize(customScssMetabox, gutestrapCodeMirrorSettings);\n    gutestrap.customScssEditor.codemirror.on(\"blur\", function () {\n      gutestrap.customScssEditor.codemirror.save();\n    });\n    setTimeout(function () {\n      gutestrap.customScssEditor.codemirror.refresh();\n    }, 1);\n  }\n\n  if (!initializeCodemirror()) {\n    $(document).on(\"gutestrap_custom_scss_metabox\", initializeCodemirror);\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzAyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzaWMuanM/M2VhOCJdLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuZ3V0ZXN0cmFwID0gd2luZG93Lmd1dGVzdHJhcCB8fCB7fTtcbmpRdWVyeShmdW5jdGlvbiAoJCkge1xuICB2YXIgX3dpbmRvdyA9IHdpbmRvdyxcbiAgICAgIGd1dGVzdHJhcCA9IF93aW5kb3cuZ3V0ZXN0cmFwO1xuXG4gIGZ1bmN0aW9uIGluaXRpYWxpemVDb2RlbWlycm9yKCkge1xuICAgIHZhciBjdXN0b21TY3NzTWV0YWJveCA9ICQoXCIjZ3V0ZXN0cmFwX2N1c3RvbV9zY3NzX21ldGFib3hcIik7XG5cbiAgICBpZiAoIWN1c3RvbVNjc3NNZXRhYm94Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGd1dGVzdHJhcC5jdXN0b21TY3NzRWRpdG9yID0gd3AuY29kZUVkaXRvci5pbml0aWFsaXplKGN1c3RvbVNjc3NNZXRhYm94LCBndXRlc3RyYXBDb2RlTWlycm9yU2V0dGluZ3MpO1xuICAgIGd1dGVzdHJhcC5jdXN0b21TY3NzRWRpdG9yLmNvZGVtaXJyb3Iub24oXCJibHVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGd1dGVzdHJhcC5jdXN0b21TY3NzRWRpdG9yLmNvZGVtaXJyb3Iuc2F2ZSgpO1xuICAgIH0pO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZ3V0ZXN0cmFwLmN1c3RvbVNjc3NFZGl0b3IuY29kZW1pcnJvci5yZWZyZXNoKCk7XG4gICAgfSwgMSk7XG4gIH1cblxuICBpZiAoIWluaXRpYWxpemVDb2RlbWlycm9yKCkpIHtcbiAgICAkKGRvY3VtZW50KS5vbihcImd1dGVzdHJhcF9jdXN0b21fc2Nzc19tZXRhYm94XCIsIGluaXRpYWxpemVDb2RlbWlycm9yKTtcbiAgfVxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY2xhc3NpYy5qc1xuLy8gbW9kdWxlIGlkID0gMzAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///302\n");

/***/ })

/******/ });