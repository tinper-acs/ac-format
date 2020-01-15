module.exports =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

exports.__esModule = true;
exports.formatNumber = undefined;

var _formatNumber = __webpack_require__(2);

var _formatNumber2 = _interopRequireDefault(_formatNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
    enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
    return a;
};

var formatNumber = function formatNumber(format, value) {
    format = format.replace("[", "").replace("]", ""); //规范分隔符
    format = format.replace("(", "+"); //规范负数

    var after = "",
        before = "";
    if (format.substring(format.length - 1, format.length) === "+") {
        after = "-";
    } else if (format.substring(0, 1) === "+") {
        before = "-";
    }
    if (after === "-" && before === "-") {
        after = "";
        console.log("format is error !");
    }
    format = format.replace(" +", "").replace("+", "").replace("+ ", "").replace("+", "").replace("(", "");
    value = (0, _formatNumber2.default)(format, value);
    return before + value + after;
};

exports.formatNumber = formatNumber;
;

(function () {
    var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(formatNumber, "formatNumber", "/Users/jony/workspaces/yonyou/lang/ac-format/src/index.js");
})();

;

(function () {
    var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
    leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
	var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
	enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
	return a;
};

var maskRegex = /[0-9\-+#]/;
var notMaskRegex = /[^\d\-+#]/g;

function getIndex(mask) {
	return mask.search(maskRegex);
}

function processMask() {
	var mask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#.##";

	var maskObj = {};
	var len = mask.length;
	var start = getIndex(mask);
	maskObj.prefix = start > 0 ? mask.substring(0, start) : "";

	// Reverse string: not an ideal method if there are surrogate pairs
	var end = getIndex(mask.split("").reverse().join(""));
	var offset = len - end;
	var substr = mask.substring(offset, offset + 1);
	// Add 1 to offset if mask has a trailing decimal/comma
	var indx = offset + (substr === "." || substr === "," ? 1 : 0);
	maskObj.suffix = end > 0 ? mask.substring(indx, len) : "";

	maskObj.mask = mask.substring(start, indx);
	maskObj.maskHasNegativeSign = maskObj.mask.charAt(0) === "-";
	maskObj.maskHasPositiveSign = maskObj.mask.charAt(0) === "+";

	// Search for group separator & decimal; anything not digit,
	// not +/- sign, and not #
	var result = maskObj.mask.match(notMaskRegex);
	// Treat the right most symbol as decimal
	maskObj.decimal = result && result[result.length - 1] || ".";
	// Treat the left most symbol as group separator
	maskObj.separator = result && result[1] && result[0] || ",";

	// Split the decimal for the format string if any
	result = maskObj.mask.split(maskObj.decimal);
	maskObj.integer = result[0];
	maskObj.fraction = result[1];
	return maskObj;
}

function processValue(value, maskObj, options) {
	var isNegative = false;
	var valObj = {
		value: value
	};
	if (value < 0) {
		isNegative = true;
		// Process only abs(), and turn on flag.
		valObj.value = -valObj.value;
	}

	valObj.sign = isNegative ? "-" : "";

	// Fix the decimal first, toFixed will auto fill trailing zero.
	valObj.value = Number(valObj.value).toFixed(maskObj.fraction && maskObj.fraction.length);
	// Convert number to string to trim off *all* trailing decimal zero(es)
	valObj.value = Number(valObj.value).toString();

	// Fill back any trailing zero according to format
	// look for last zero in format
	var posTrailZero = maskObj.fraction && maskObj.fraction.lastIndexOf("0");

	var _valObj$value$split = valObj.value.split("."),
	    _valObj$value$split$ = _valObj$value$split[0],
	    valInteger = _valObj$value$split$ === undefined ? "0" : _valObj$value$split$,
	    _valObj$value$split$2 = _valObj$value$split[1],
	    valFraction = _valObj$value$split$2 === undefined ? "" : _valObj$value$split$2;

	if (!valFraction || valFraction && valFraction.length <= posTrailZero) {
		valFraction = posTrailZero < 0 ? "" : Number("0." + valFraction).toFixed(posTrailZero + 1).replace("0.", "");
	}

	valObj.integer = valInteger;
	valObj.fraction = valFraction;
	addSeparators(valObj, maskObj);

	// Remove negative sign if result is zero
	if (valObj.result === "0" || valObj.result === "") {
		// Remove negative sign if result is zero
		isNegative = false;
		valObj.sign = "";
	}

	if (!isNegative && maskObj.maskHasPositiveSign) {
		valObj.sign = "+";
	} else if (isNegative && maskObj.maskHasPositiveSign) {
		valObj.sign = "-";
	} else if (isNegative) {
		valObj.sign = options && options.enforceMaskSign && !maskObj.maskHasNegativeSign ? "" : "-";
	}

	return valObj;
}

function addSeparators(valObj, maskObj) {
	valObj.result = "";
	// Look for separator
	var szSep = maskObj.integer.split(maskObj.separator);
	// Join back without separator for counting the pos of any leading 0
	var maskInteger = szSep.join("");

	var posLeadZero = maskInteger && maskInteger.indexOf("0");
	if (posLeadZero > -1) {
		while (valObj.integer.length < maskInteger.length - posLeadZero) {
			valObj.integer = "0" + valObj.integer;
		}
	} else if (Number(valObj.integer) === 0) {
		valObj.integer = "";
	}

	// Process the first group separator from decimal (.) only, the rest ignore.
	// get the length of the last slice of split result.
	var posSeparator = szSep[1] && szSep[szSep.length - 1].length;
	if (posSeparator) {
		var len = valObj.integer.length;
		var offset = len % posSeparator;
		for (var indx = 0; indx < len; indx++) {
			valObj.result += valObj.integer.charAt(indx);
			// -posSeparator so that won't trail separator on full length
			if (!((indx - offset + 1) % posSeparator) && indx < len - posSeparator) {
				valObj.result += maskObj.separator;
			}
		}
	} else {
		valObj.result = valObj.integer;
	}

	valObj.result += maskObj.fraction && valObj.fraction ? maskObj.decimal + valObj.fraction : "";
	return valObj;
}

module.exports = function (mask, value) {
	var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	if (!mask || isNaN(Number(value))) {
		// Invalid inputs
		return value;
	}

	var maskObj = processMask(mask);
	var valObj = processValue(value, maskObj, options);
	return maskObj.prefix + valObj.sign + valObj.result + maskObj.suffix;
};
;

(function () {
	var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

	if (!reactHotLoader) {
		return;
	}

	reactHotLoader.register(maskRegex, "maskRegex", "/Users/jony/workspaces/yonyou/lang/ac-format/src/formatNumber/index.js");
	reactHotLoader.register(notMaskRegex, "notMaskRegex", "/Users/jony/workspaces/yonyou/lang/ac-format/src/formatNumber/index.js");
	reactHotLoader.register(getIndex, "getIndex", "/Users/jony/workspaces/yonyou/lang/ac-format/src/formatNumber/index.js");
	reactHotLoader.register(processMask, "processMask", "/Users/jony/workspaces/yonyou/lang/ac-format/src/formatNumber/index.js");
	reactHotLoader.register(processValue, "processValue", "/Users/jony/workspaces/yonyou/lang/ac-format/src/formatNumber/index.js");
	reactHotLoader.register(addSeparators, "addSeparators", "/Users/jony/workspaces/yonyou/lang/ac-format/src/formatNumber/index.js");
})();

;

(function () {
	var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
	leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0)(module)))

/***/ })
/******/ ]);