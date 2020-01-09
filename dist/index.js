module.exports=function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="/",t(t.s=0)}([function(e,r,t){"use strict";r.__esModule=!0,r.formatNumber=void 0;var n=function(e){return e&&e.__esModule?e:{default:e}}(t(1));"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;r.formatNumber=n.default},function(e,r,t){"use strict";(function(e){!function(){var r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0;r&&r(e)}();"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var r=/[0-9\-+#]/,t=/[^\d\-+#]/g;function n(e){return e.search(r)}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#.##",r={},o=e.length,a=n(e);r.prefix=a>0?e.substring(0,a):"";var i=n(e.split("").reverse().join("")),s=o-i,u=e.substring(s,s+1),l=s+("."===u||","===u?1:0);r.suffix=i>0?e.substring(l,o):"",r.mask=e.substring(a,l),r.maskHasNegativeSign="-"===r.mask.charAt(0),r.maskHasPositiveSign="+"===r.mask.charAt(0);var f=r.mask.match(t);return r.decimal=f&&f[f.length-1]||".",r.separator=f&&f[1]&&f[0]||",",f=r.mask.split(r.decimal),r.integer=f[0],r.fraction=f[1],r}function a(e,r,t){var n=!1,o={value:e};e<0&&(n=!0,o.value=-o.value),o.sign=n?"-":"",o.value=Number(o.value).toFixed(r.fraction&&r.fraction.length),o.value=Number(o.value).toString();var a=r.fraction&&r.fraction.lastIndexOf("0"),s=o.value.split("."),u=s[0],l=void 0===u?"0":u,f=s[1],c=void 0===f?"":f;return(!c||c&&c.length<=a)&&(c=a<0?"":Number("0."+c).toFixed(a+1).replace("0.","")),o.integer=l,o.fraction=c,i(o,r),"0"!==o.result&&""!==o.result||(n=!1,o.sign=""),!n&&r.maskHasPositiveSign?o.sign="+":n&&r.maskHasPositiveSign?o.sign="-":n&&(o.sign=t&&t.enforceMaskSign&&!r.maskHasNegativeSign?"":"-"),o}function i(e,r){e.result="";var t=r.integer.split(r.separator),n=t.join(""),o=n&&n.indexOf("0");if(o>-1)for(;e.integer.length<n.length-o;)e.integer="0"+e.integer;else 0===Number(e.integer)&&(e.integer="");var a=t[1]&&t[t.length-1].length;if(a)for(var i=e.integer.length,s=i%a,u=0;u<i;u++)e.result+=e.integer.charAt(u),!((u-s+1)%a)&&u<i-a&&(e.result+=r.separator);else e.result=e.integer;return e.result+=r.fraction&&e.fraction?r.decimal+e.fraction:"",e}e.exports=function(e,r){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!e||isNaN(Number(r)))return r;var n=o(e),i=a(r,n,t);return n.prefix+i.sign+i.result+n.suffix},function(){var e="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;e&&(e.register(r,"maskRegex","/Users/jony/workspaces/yonyou/lang/ac-format/src/formatNumber/index.js"),e.register(t,"notMaskRegex","/Users/jony/workspaces/yonyou/lang/ac-format/src/formatNumber/index.js"),e.register(n,"getIndex","/Users/jony/workspaces/yonyou/lang/ac-format/src/formatNumber/index.js"),e.register(o,"processMask","/Users/jony/workspaces/yonyou/lang/ac-format/src/formatNumber/index.js"),e.register(a,"processValue","/Users/jony/workspaces/yonyou/lang/ac-format/src/formatNumber/index.js"),e.register(i,"addSeparators","/Users/jony/workspaces/yonyou/lang/ac-format/src/formatNumber/index.js"))}(),function(){var r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0;r&&r(e)}()}).call(this,t(2)(e))},function(e,r){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}}]);