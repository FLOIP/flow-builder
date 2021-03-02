((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[0],{

/***/ "1276":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var isRegExp = __webpack_require__("44e7");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var speciesConstructor = __webpack_require__("4840");
var advanceStringIndex = __webpack_require__("8aa5");
var toLength = __webpack_require__("50c4");
var callRegExpExec = __webpack_require__("14c3");
var regexpExec = __webpack_require__("9263");
var fails = __webpack_require__("d039");

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),

/***/ "228e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ getComponentConfig; });

// UNUSED EXPORTS: getConfig, getConfigValue, getBreakpoints, getBreakpointsCached, getBreakpointsUp, getBreakpointsUpCached, getBreakpointsDown, getBreakpointsDownCached

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/vue.js
var vue = __webpack_require__("2f79");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/config.js
var config = __webpack_require__("50d3");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/clone-deep.js
var clone_deep = __webpack_require__("c9a9");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/object.js
var object = __webpack_require__("d82f");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/memoize.js

var memoize_memoize = function memoize(fn) {
  var cache = Object(object["c" /* create */])(null);
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var argsKey = JSON.stringify(args);
    return cache[argsKey] = cache[argsKey] || fn.apply(null, args);
  };
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/config.js



 // --- Constants ---

var VueProto = vue["b" /* Vue */].prototype; // --- Getter methods ---
// All methods return a deep clone (immutable) copy of the config value,
// to prevent mutation of the user config object
// Get the current config

var config_getConfig = function getConfig() {
  var bvConfig = VueProto[config["c" /* PROP_NAME */]];
  return bvConfig ? bvConfig.getConfig() : {};
}; // Method to grab a config value based on a dotted/array notation key

var config_getConfigValue = function getConfigValue(key) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var bvConfig = VueProto[config["c" /* PROP_NAME */]];
  return bvConfig ? bvConfig.getConfigValue(key, defaultValue) : Object(clone_deep["a" /* cloneDeep */])(defaultValue);
}; // Method to grab a config value for a particular component

var getComponentConfig = function getComponentConfig(key) {
  var propKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  // Return the particular config value for key if specified,
  // otherwise we return the full config (or an empty object if not found)
  return propKey ? config_getConfigValue("".concat(key, ".").concat(propKey), defaultValue) : config_getConfigValue(key, {});
}; // Get all breakpoint names

var config_getBreakpoints = function getBreakpoints() {
  return config_getConfigValue('breakpoints', config["a" /* DEFAULT_BREAKPOINT */]);
}; // Private method for caching breakpoint names

var _getBreakpointsCached = memoize_memoize(function () {
  return config_getBreakpoints();
}); // Get all breakpoint names (cached)


var config_getBreakpointsCached = function getBreakpointsCached() {
  return Object(clone_deep["a" /* cloneDeep */])(_getBreakpointsCached());
}; // Get breakpoints with the smallest breakpoint set as ''
// Useful for components that create breakpoint specific props

var getBreakpointsUp = function getBreakpointsUp() {
  var breakpoints = config_getBreakpoints();
  breakpoints[0] = '';
  return breakpoints;
}; // Get breakpoints with the smallest breakpoint set as '' (cached)
// Useful for components that create breakpoint specific props

var getBreakpointsUpCached = memoize_memoize(function () {
  var breakpoints = config_getBreakpointsCached();
  breakpoints[0] = '';
  return breakpoints;
}); // Get breakpoints with the largest breakpoint set as ''

var getBreakpointsDown = function getBreakpointsDown() {
  var breakpoints = config_getBreakpoints();
  breakpoints[breakpoints.length - 1] = '';
  return breakpoints;
}; // Get breakpoints with the largest breakpoint set as '' (cached)
// Useful for components that create breakpoint specific props

/* istanbul ignore next: we don't use this method anywhere, yet */

var getBreakpointsDownCached = function getBreakpointsDownCached() {
  var breakpoints = config_getBreakpointsCached();
  breakpoints[breakpoints.length - 1] = '';
  return breakpoints;
};

/***/ }),

/***/ "2326":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return from; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return arrayIncludes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return concat; });
/* unused harmony export createArray */
/* unused harmony export flatten */
/* unused harmony export flattenDeep */
/* harmony import */ var _inspect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7b1e");
 // --- Static ---

var from = function from() {
  return Array.from.apply(Array, arguments);
}; // --- Instance ---

var arrayIncludes = function arrayIncludes(array, value) {
  return array.indexOf(value) !== -1;
};
var concat = function concat() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Array.prototype.concat.apply([], args);
}; // --- Utilities ---

var createArray = function createArray(length, fillFn) {
  var mapFn = Object(_inspect__WEBPACK_IMPORTED_MODULE_0__[/* isFunction */ "d"])(fillFn) ? fillFn : function () {
    return fillFn;
  };
  return Array.apply(null, {
    length: length
  }).map(mapFn);
};
var flatten = function flatten(array) {
  return array.reduce(function (result, item) {
    return concat(result, item);
  }, []);
};
var flattenDeep = function flattenDeep(array) {
  return array.reduce(function (result, item) {
    return concat(result, Array.isArray(item) ? flattenDeep(item) : item);
  }, []);
};

/***/ }),

/***/ "2f79":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COMPONENT_UID_KEY; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "b", function() { return vue__WEBPACK_IMPORTED_MODULE_0___default.a; });
/* harmony import */ var vue_functional_data_merge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("b42e");

 // --- Constants ---

var COMPONENT_UID_KEY = '_uid';


/***/ }),

/***/ "3a58":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return toInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return toFloat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return toFixed; });
// Number utilities
// Converts a value (string, number, etc.) to an integer number
// Assumes radix base 10
var toInteger = function toInteger(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
  var integer = parseInt(value, 10);
  return isNaN(integer) ? defaultValue : integer;
}; // Converts a value (string, number, etc.) to a number

var toFloat = function toFloat(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
  var float = parseFloat(value);
  return isNaN(float) ? defaultValue : float;
}; // Converts a value (string, number, etc.) to a string
// representation with `precision` digits after the decimal
// Returns the string 'NaN' if the value cannot be converted

var toFixed = function toFixed(val, precision) {
  return toFloat(val).toFixed(toInteger(precision, 0));
};

/***/ }),

/***/ "49f5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ BProgress; });

// UNUSED EXPORTS: props

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/vue.js
var vue = __webpack_require__("2f79");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/components.js
var components = __webpack_require__("c637");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/props.js
var props = __webpack_require__("a723");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/object.js
var object = __webpack_require__("d82f");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/props.js
var utils_props = __webpack_require__("cf757");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/constants/slots.js
var SLOT_NAME_ADD_BUTTON_TEXT = 'add-button-text';
var SLOT_NAME_APPEND = 'append';
var SLOT_NAME_ASIDE = 'aside';
var SLOT_NAME_BADGE = 'badge';
var SLOT_NAME_BOTTOM_ROW = 'bottom-row';
var SLOT_NAME_BUTTON_CONTENT = 'button-content';
var SLOT_NAME_CUSTOM_FOOT = 'custom-foot';
var SLOT_NAME_DECREMENT = 'decrement';
var SLOT_NAME_DEFAULT = 'default';
var SLOT_NAME_DESCRIPTION = 'description';
var SLOT_NAME_DISMISS = 'dismiss';
var SLOT_NAME_DROP_PLACEHOLDER = 'drop-placeholder';
var SLOT_NAME_ELLIPSIS_TEXT = 'ellipsis-text';
var SLOT_NAME_EMPTY = 'empty';
var SLOT_NAME_EMPTYFILTERED = 'emptyfiltered';
var SLOT_NAME_FILE_NAME = 'file-name';
var SLOT_NAME_FIRST = 'first';
var SLOT_NAME_FIRST_TEXT = 'first-text';
var SLOT_NAME_FOOTER = 'footer';
var SLOT_NAME_HEADER = 'header';
var SLOT_NAME_HEADER_CLOSE = 'header-close';
var SLOT_NAME_ICON_CLEAR = 'icon-clear';
var SLOT_NAME_ICON_EMPTY = 'icon-empty';
var SLOT_NAME_ICON_FULL = 'icon-full';
var SLOT_NAME_ICON_HALF = 'icon-half';
var SLOT_NAME_IMG = 'img';
var SLOT_NAME_INCREMENT = 'increment';
var SLOT_NAME_INVALID_FEEDBACK = 'invalid-feedback';
var SLOT_NAME_LABEL = 'label';
var SLOT_NAME_LAST_TEXT = 'last-text';
var SLOT_NAME_LEAD = 'lead';
var SLOT_NAME_LOADING = 'loading';
var SLOT_NAME_MODAL_BACKDROP = 'modal-backdrop';
var SLOT_NAME_MODAL_CANCEL = 'modal-cancel';
var SLOT_NAME_MODAL_FOOTER = 'modal-footer';
var SLOT_NAME_MODAL_HEADER = 'modal-header';
var SLOT_NAME_MODAL_HEADER_CLOSE = 'modal-header-close';
var SLOT_NAME_MODAL_OK = 'modal-ok';
var SLOT_NAME_MODAL_TITLE = 'modal-title';
var SLOT_NAME_NAV_NEXT_DECADE = 'nav-next-decade';
var SLOT_NAME_NAV_NEXT_MONTH = 'nav-next-month';
var SLOT_NAME_NAV_NEXT_YEAR = 'nav-next-year';
var SLOT_NAME_NAV_PEV_DECADE = 'nav-prev-decade';
var SLOT_NAME_NAV_PEV_MONTH = 'nav-prev-month';
var SLOT_NAME_NAV_PEV_YEAR = 'nav-prev-year';
var SLOT_NAME_NAV_THIS_MONTH = 'nav-this-month';
var SLOT_NAME_NEXT_TEXT = 'next-text';
var SLOT_NAME_OVERLAY = 'overlay';
var SLOT_NAME_PAGE = 'page';
var SLOT_NAME_PLACEHOLDER = 'placeholder';
var SLOT_NAME_PREPEND = 'prepend';
var SLOT_NAME_PREV_TEXT = 'prev-text';
var SLOT_NAME_ROW_DETAILS = 'row-details';
var SLOT_NAME_TABLE_BUSY = 'table-busy';
var SLOT_NAME_TABLE_CAPTION = 'table-caption';
var SLOT_NAME_TABLE_COLGROUP = 'table-colgroup';
var SLOT_NAME_TABS_END = 'tabs-end';
var SLOT_NAME_TABS_START = 'tabs-start';
var SLOT_NAME_TEXT = 'text';
var SLOT_NAME_THEAD_TOP = 'thead-top';
var SLOT_NAME_TITLE = 'title';
var SLOT_NAME_TOAST_TITLE = 'toast-title';
var SLOT_NAME_TOP_ROW = 'top-row';
var SLOT_NAME_VALID_FEEDBACK = 'valid-feedback';
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/array.js
var array = __webpack_require__("2326");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/identity.js
var identity = __webpack_require__("6c06");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/inspect.js
var inspect = __webpack_require__("7b1e");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/normalize-slot.js


 // Note for functional components:
// In functional components, `slots` is a function so it must be called
// first before passing to the below methods. `scopedSlots` is always an
// object and may be undefined (for Vue < 2.6.x)

/**
 * Returns true if either scoped or unscoped named slot exists
 *
 * @param {String, Array} name or name[]
 * @param {Object} scopedSlots
 * @param {Object} slots
 * @returns {Array|undefined} VNodes
 */

var normalize_slot_hasNormalizedSlot = function hasNormalizedSlot(names) {
  var $scopedSlots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var $slots = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // Ensure names is an array
  names = Object(array["b" /* concat */])(names).filter(identity["a" /* identity */]); // Returns true if the either a $scopedSlot or $slot exists with the specified name

  return names.some(function (name) {
    return $scopedSlots[name] || $slots[name];
  });
};
/**
 * Returns VNodes for named slot either scoped or unscoped
 *
 * @param {String, Array} name or name[]
 * @param {String} scope
 * @param {Object} scopedSlots
 * @param {Object} slots
 * @returns {Array|undefined} VNodes
 */

var normalize_slot_normalizeSlot = function normalizeSlot(names) {
  var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var $scopedSlots = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var $slots = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  // Ensure names is an array
  names = Object(array["b" /* concat */])(names).filter(identity["a" /* identity */]);
  var slot;

  for (var i = 0; i < names.length && !slot; i++) {
    var name = names[i];
    slot = $scopedSlots[name] || $slots[name];
  } // Note: in Vue 2.6.x, all named slots are also scoped slots


  return Object(inspect["d" /* isFunction */])(slot) ? slot(scope) : slot;
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/normalize-slot.js



 // @vue/component

var normalizeSlotMixin = vue["b" /* Vue */].extend({
  methods: {
    // Returns `true` if the either a `$scopedSlot` or `$slot` exists with the specified name
    // `name` can be a string name or an array of names
    hasNormalizedSlot: function hasNormalizedSlot() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SLOT_NAME_DEFAULT;
      var scopedSlots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$scopedSlots;
      var slots = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.$slots;
      return normalize_slot_hasNormalizedSlot(name, scopedSlots, slots);
    },
    // Returns an array of rendered VNodes if slot found, otherwise `undefined`
    // `name` can be a string name or an array of names
    normalizeSlot: function normalizeSlot() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SLOT_NAME_DEFAULT;
      var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var scopedSlots = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.$scopedSlots;
      var slots = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.$slots;

      var vNodes = normalize_slot_normalizeSlot(name, scope, scopedSlots, slots);

      return vNodes ? Object(array["b" /* concat */])(vNodes) : vNodes;
    }
  }
});
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/regex.js
var regex = __webpack_require__("992e");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/html.js
 // Removes anything that looks like an HTML tag from the supplied string

var html_stripTags = function stripTags() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(text).replace(regex["c" /* RX_HTML_TAGS */], '');
}; // Generate a `domProps` object for either `innerHTML`, `textContent` or an empty object

var htmlOrText = function htmlOrText(innerHTML, textContent) {
  return innerHTML ? {
    innerHTML: innerHTML
  } : textContent ? {
    textContent: textContent
  } : {};
};
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/math.js
var math = __webpack_require__("a8c8");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/number.js
var number = __webpack_require__("3a58");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/string.js
var string = __webpack_require__("fa73");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/progress/progress-bar.js









 // --- Props ---

var progress_bar_props = Object(utils_props["b" /* makePropsConfigurable */])({
  animated: Object(utils_props["a" /* makeProp */])(props["c" /* PROP_TYPE_BOOLEAN */], null),
  label: Object(utils_props["a" /* makeProp */])(props["f" /* PROP_TYPE_STRING */]),
  labelHtml: Object(utils_props["a" /* makeProp */])(props["f" /* PROP_TYPE_STRING */]),
  max: Object(utils_props["a" /* makeProp */])(props["d" /* PROP_TYPE_NUMBER_STRING */], null),
  precision: Object(utils_props["a" /* makeProp */])(props["d" /* PROP_TYPE_NUMBER_STRING */], null),
  showProgress: Object(utils_props["a" /* makeProp */])(props["c" /* PROP_TYPE_BOOLEAN */], null),
  showValue: Object(utils_props["a" /* makeProp */])(props["c" /* PROP_TYPE_BOOLEAN */], null),
  striped: Object(utils_props["a" /* makeProp */])(props["c" /* PROP_TYPE_BOOLEAN */], null),
  value: Object(utils_props["a" /* makeProp */])(props["d" /* PROP_TYPE_NUMBER_STRING */], 0),
  variant: Object(utils_props["a" /* makeProp */])(props["f" /* PROP_TYPE_STRING */])
}, components["d" /* NAME_PROGRESS_BAR */]); // --- Main component ---
// @vue/component

var BProgressBar = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: components["d" /* NAME_PROGRESS_BAR */],
  mixins: [normalizeSlotMixin],
  inject: {
    bvProgress: {
      default:
      /* istanbul ignore next */
      function _default() {
        return {};
      }
    }
  },
  props: progress_bar_props,
  computed: {
    progressBarClasses: function progressBarClasses() {
      var computedAnimated = this.computedAnimated,
          computedVariant = this.computedVariant;
      return [computedVariant ? "bg-".concat(computedVariant) : '', this.computedStriped || computedAnimated ? 'progress-bar-striped' : '', computedAnimated ? 'progress-bar-animated' : ''];
    },
    progressBarStyles: function progressBarStyles() {
      return {
        width: 100 * (this.computedValue / this.computedMax) + '%'
      };
    },
    computedValue: function computedValue() {
      return Object(number["b" /* toFloat */])(this.value, 0);
    },
    computedMax: function computedMax() {
      // Prefer our max over parent setting
      // Default to `100` for invalid values (`-x`, `0`, `NaN`)
      var max = Object(number["b" /* toFloat */])(this.max) || Object(number["b" /* toFloat */])(this.bvProgress.max, 0);
      return max > 0 ? max : 100;
    },
    computedPrecision: function computedPrecision() {
      // Prefer our precision over parent setting
      // Default to `0` for invalid values (`-x`, `NaN`)
      return Object(math["a" /* mathMax */])(Object(number["c" /* toInteger */])(this.precision, Object(number["c" /* toInteger */])(this.bvProgress.precision, 0)), 0);
    },
    computedProgress: function computedProgress() {
      var precision = this.computedPrecision;
      var p = Object(math["b" /* mathPow */])(10, precision);
      return Object(number["a" /* toFixed */])(100 * p * this.computedValue / this.computedMax / p, precision);
    },
    computedVariant: function computedVariant() {
      // Prefer our variant over parent setting
      return this.variant || this.bvProgress.variant;
    },
    computedStriped: function computedStriped() {
      // Prefer our striped over parent setting
      return Object(inspect["b" /* isBoolean */])(this.striped) ? this.striped : this.bvProgress.striped || false;
    },
    computedAnimated: function computedAnimated() {
      // Prefer our animated over parent setting
      return Object(inspect["b" /* isBoolean */])(this.animated) ? this.animated : this.bvProgress.animated || false;
    },
    computedShowProgress: function computedShowProgress() {
      // Prefer our showProgress over parent setting
      return Object(inspect["b" /* isBoolean */])(this.showProgress) ? this.showProgress : this.bvProgress.showProgress || false;
    },
    computedShowValue: function computedShowValue() {
      // Prefer our showValue over parent setting
      return Object(inspect["b" /* isBoolean */])(this.showValue) ? this.showValue : this.bvProgress.showValue || false;
    }
  },
  render: function render(h) {
    var label = this.label,
        labelHtml = this.labelHtml,
        computedValue = this.computedValue,
        computedPrecision = this.computedPrecision;
    var $children;
    var domProps = {};

    if (this.hasNormalizedSlot()) {
      $children = this.normalizeSlot();
    } else if (label || labelHtml) {
      domProps = htmlOrText(labelHtml, label);
    } else if (this.computedShowProgress) {
      $children = this.computedProgress;
    } else if (this.computedShowValue) {
      $children = Object(number["a" /* toFixed */])(computedValue, computedPrecision);
    }

    return h('div', {
      staticClass: 'progress-bar',
      class: this.progressBarClasses,
      style: this.progressBarStyles,
      attrs: {
        role: 'progressbar',
        'aria-valuemin': '0',
        'aria-valuemax': Object(string["c" /* toString */])(this.computedMax),
        'aria-valuenow': Object(number["a" /* toFixed */])(computedValue, computedPrecision)
      },
      domProps: domProps
    }, $children);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/progress/progress.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







 // --- Props ---

var progressBarProps = Object(object["i" /* omit */])(progress_bar_props, ['label', 'labelHtml']);
var progress_props = Object(utils_props["b" /* makePropsConfigurable */])(Object(object["k" /* sortKeys */])(_objectSpread(_objectSpread({}, progressBarProps), {}, {
  animated: Object(utils_props["a" /* makeProp */])(props["c" /* PROP_TYPE_BOOLEAN */], false),
  height: Object(utils_props["a" /* makeProp */])(props["f" /* PROP_TYPE_STRING */]),
  max: Object(utils_props["a" /* makeProp */])(props["d" /* PROP_TYPE_NUMBER_STRING */], 100),
  precision: Object(utils_props["a" /* makeProp */])(props["d" /* PROP_TYPE_NUMBER_STRING */], 0),
  showProgress: Object(utils_props["a" /* makeProp */])(props["c" /* PROP_TYPE_BOOLEAN */], false),
  showValue: Object(utils_props["a" /* makeProp */])(props["c" /* PROP_TYPE_BOOLEAN */], false),
  striped: Object(utils_props["a" /* makeProp */])(props["c" /* PROP_TYPE_BOOLEAN */], false)
})), components["c" /* NAME_PROGRESS */]); // --- Main component ---
// @vue/component

var BProgress = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: components["c" /* NAME_PROGRESS */],
  mixins: [normalizeSlotMixin],
  provide: function provide() {
    return {
      bvProgress: this
    };
  },
  props: progress_props,
  computed: {
    progressHeight: function progressHeight() {
      return {
        height: this.height || null
      };
    }
  },
  render: function render(h) {
    var $childNodes = this.normalizeSlot();

    if (!$childNodes) {
      $childNodes = h(BProgressBar, {
        props: Object(utils_props["c" /* pluckProps */])(progressBarProps, this.$props)
      });
    }

    return h('div', {
      staticClass: 'progress',
      style: this.progressHeight
    }, [$childNodes]);
  }
});

/***/ }),

/***/ "50d3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PROP_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEFAULT_BREAKPOINT; });
var NAME = 'BvConfig';
var PROP_NAME = '$bvConfig';
var DEFAULT_BREAKPOINT = ['xs', 'sm', 'md', 'lg', 'xl'];

/***/ }),

/***/ "6c06":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return identity; });
var identity = function identity(x) {
  return x;
};

/***/ }),

/***/ "7b1e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export toType */
/* unused harmony export toRawType */
/* unused harmony export toRawTypeLC */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isNull; });
/* unused harmony export isEmptyString */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return isUndefinedOrNull; });
/* unused harmony export isUndefinedOrNullOrEmpty */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return isNumber; });
/* unused harmony export isNumeric */
/* unused harmony export isPrimitive */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return isPlainObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isDate; });
/* unused harmony export isEvent */
/* unused harmony export isFile */
/* unused harmony export isRegExp */
/* unused harmony export isPromise */
/* harmony import */ var _constants_regex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("992e");
/* harmony import */ var _constants_safe_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ca88");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


 // --- Convenience inspection utilities ---

var toType = function toType(value) {
  return _typeof(value);
};
var toRawType = function toRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
};
var toRawTypeLC = function toRawTypeLC(value) {
  return toRawType(value).toLowerCase();
};
var isUndefined = function isUndefined(value) {
  return value === undefined;
};
var isNull = function isNull(value) {
  return value === null;
};
var isEmptyString = function isEmptyString(value) {
  return value === '';
};
var isUndefinedOrNull = function isUndefinedOrNull(value) {
  return isUndefined(value) || isNull(value);
};
var isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(value) {
  return isUndefinedOrNull(value) || isEmptyString(value);
};
var isFunction = function isFunction(value) {
  return toType(value) === 'function';
};
var isBoolean = function isBoolean(value) {
  return toType(value) === 'boolean';
};
var isString = function isString(value) {
  return toType(value) === 'string';
};
var isNumber = function isNumber(value) {
  return toType(value) === 'number';
};
var isNumeric = function isNumeric(value) {
  return _constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_NUMBER */ "f"].test(String(value));
};
var isPrimitive = function isPrimitive(value) {
  return isBoolean(value) || isString(value) || isNumber(value);
};
var isArray = function isArray(value) {
  return Array.isArray(value);
}; // Quick object check
// This is primarily used to tell Objects from primitive values
// when we know the value is a JSON-compliant type
// Note object could be a complex type like array, Date, etc.

var isObject = function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
}; // Strict object type check
// Only returns true for plain JavaScript objects

var isPlainObject = function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
var isDate = function isDate(value) {
  return value instanceof Date;
};
var isEvent = function isEvent(value) {
  return value instanceof Event;
};
var isFile = function isFile(value) {
  return value instanceof _constants_safe_types__WEBPACK_IMPORTED_MODULE_1__[/* File */ "b"];
};
var isRegExp = function isRegExp(value) {
  return toRawType(value) === 'RegExp';
};
var isPromise = function isPromise(value) {
  return !isUndefinedOrNull(value) && isFunction(value.then) && isFunction(value.catch);
};

/***/ }),

/***/ "938d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export getEnv */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getNoWarn; });
/**
 * Utilities to get information about the current environment
 */
var getEnv = function getEnv(key) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var env = typeof process !== 'undefined' && process ? Object({"NODE_ENV":"production","BASE_URL":"/"}) || false : {};

  if (!key) {
    /* istanbul ignore next */
    return env;
  }

  return env[key] || fallback;
};
var getNoWarn = function getNoWarn() {
  return getEnv('BOOTSTRAP_VUE_NO_WARN') || getEnv('NODE_ENV') === 'production';
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "992e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RX_ARRAY_NOTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RX_BV_PREFIX; });
/* unused harmony export RX_DIGITS */
/* unused harmony export RX_EXTENSION */
/* unused harmony export RX_HASH */
/* unused harmony export RX_HASH_ID */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RX_HTML_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return RX_HYPHENATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return RX_LOWER_UPPER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return RX_NUMBER; });
/* unused harmony export RX_PLUS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return RX_REGEXP_REPLACE; });
/* unused harmony export RX_SPACES */
/* unused harmony export RX_SPACE_SPLIT */
/* unused harmony export RX_STAR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return RX_START_SPACE_WORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return RX_TRIM_LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return RX_TRIM_RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return RX_UNDERSCORE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return RX_UN_KEBAB; });
/* unused harmony export RX_DATE */
/* unused harmony export RX_DATE_SPLIT */
/* unused harmony export RX_TIME */
/* unused harmony export RX_HREF */
/* unused harmony export RX_ENCODED_COMMA */
/* unused harmony export RX_ENCODE_REVERSE */
/* unused harmony export RX_QUERY_START */
/* unused harmony export RX_ASPECT */
/* unused harmony export RX_ASPECT_SEPARATOR */
/* unused harmony export RX_COL_CLASS */
/* unused harmony export RX_ICON_PREFIX */
/* unused harmony export RX_STRIP_LOCALE_MODS */
// --- General ---
var RX_ARRAY_NOTATION = /\[(\d+)]/g;
var RX_BV_PREFIX = /^(BV?)/;
var RX_DIGITS = /^\d+$/;
var RX_EXTENSION = /^\..+/;
var RX_HASH = /^#/;
var RX_HASH_ID = /^#[A-Za-z]+[\w\-:.]*$/;
var RX_HTML_TAGS = /(<([^>]+)>)/gi;
var RX_HYPHENATE = /\B([A-Z])/g;
var RX_LOWER_UPPER = /([a-z])([A-Z])/g;
var RX_NUMBER = /^[0-9]*\.?[0-9]+$/;
var RX_PLUS = /\+/g;
var RX_REGEXP_REPLACE = /[-/\\^$*+?.()|[\]{}]/g;
var RX_SPACES = /[\s\uFEFF\xA0]+/g;
var RX_SPACE_SPLIT = /\s+/;
var RX_STAR = /\/\*$/;
var RX_START_SPACE_WORD = /(\s|^)(\w)/g;
var RX_TRIM_LEFT = /^\s+/;
var RX_TRIM_RIGHT = /\s+$/;
var RX_UNDERSCORE = /_/g;
var RX_UN_KEBAB = /-(\w)/g; // --- Date ---
// Loose YYYY-MM-DD matching, ignores any appended time inforation
// Matches '1999-12-20', '1999-1-1', '1999-01-20T22:51:49.118Z', '1999-01-02 13:00:00'

var RX_DATE = /^\d+-\d\d?-\d\d?(?:\s|T|$)/; // Used to split off the date parts of the YYYY-MM-DD string

var RX_DATE_SPLIT = /-|\s|T/; // Time string RegEx (optional seconds)

var RX_TIME = /^([0-1]?[0-9]|2[0-3]):[0-5]?[0-9](:[0-5]?[0-9])?$/; // --- URL ---
// HREFs must end with a hash followed by at least one non-hash character

var RX_HREF = /^.*(#[^#]+)$/;
var RX_ENCODED_COMMA = /%2C/g;
var RX_ENCODE_REVERSE = /[!'()*]/g;
var RX_QUERY_START = /^(\?|#|&)/; // --- Aspect ---

var RX_ASPECT = /^\d+(\.\d*)?[/:]\d+(\.\d*)?$/;
var RX_ASPECT_SEPARATOR = /[/:]/; // --- Grid ---

var RX_COL_CLASS = /^col-/; // --- Icon ---

var RX_ICON_PREFIX = /^BIcon/; // --- Locale ---

var RX_STRIP_LOCALE_MODS = /-u-.+/;

/***/ }),

/***/ "a723":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PROP_TYPE_ANY; });
/* unused harmony export PROP_TYPE_ARRAY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PROP_TYPE_BOOLEAN; });
/* unused harmony export PROP_TYPE_DATE */
/* unused harmony export PROP_TYPE_FUNCTION */
/* unused harmony export PROP_TYPE_NUMBER */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PROP_TYPE_OBJECT; });
/* unused harmony export PROP_TYPE_REG_EXP */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PROP_TYPE_STRING; });
/* unused harmony export PROP_TYPE_ARRAY_FUNCTION */
/* unused harmony export PROP_TYPE_ARRAY_OBJECT */
/* unused harmony export PROP_TYPE_ARRAY_OBJECT_STRING */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PROP_TYPE_ARRAY_STRING; });
/* unused harmony export PROP_TYPE_BOOLEAN_NUMBER */
/* unused harmony export PROP_TYPE_BOOLEAN_NUMBER_STRING */
/* unused harmony export PROP_TYPE_BOOLEAN_STRING */
/* unused harmony export PROP_TYPE_DATE_STRING */
/* unused harmony export PROP_TYPE_FUNCTION_STRING */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PROP_TYPE_NUMBER_STRING; });
/* unused harmony export PROP_TYPE_NUMBER_OBJECT_STRING */
/* unused harmony export PROP_TYPE_OBJECT_FUNCTION */
/* unused harmony export PROP_TYPE_OBJECT_STRING */
// General types
var PROP_TYPE_ANY = undefined;
var PROP_TYPE_ARRAY = Array;
var PROP_TYPE_BOOLEAN = Boolean;
var PROP_TYPE_DATE = Date;
var PROP_TYPE_FUNCTION = Function;
var PROP_TYPE_NUMBER = Number;
var PROP_TYPE_OBJECT = Object;
var PROP_TYPE_REG_EXP = RegExp;
var PROP_TYPE_STRING = String; // Multiple types

var PROP_TYPE_ARRAY_FUNCTION = [PROP_TYPE_ARRAY, PROP_TYPE_FUNCTION];
var PROP_TYPE_ARRAY_OBJECT = [PROP_TYPE_ARRAY, PROP_TYPE_OBJECT];
var PROP_TYPE_ARRAY_OBJECT_STRING = [PROP_TYPE_ARRAY, PROP_TYPE_OBJECT, PROP_TYPE_STRING];
var PROP_TYPE_ARRAY_STRING = [PROP_TYPE_ARRAY, PROP_TYPE_STRING];
var PROP_TYPE_BOOLEAN_NUMBER = [PROP_TYPE_BOOLEAN, PROP_TYPE_NUMBER];
var PROP_TYPE_BOOLEAN_NUMBER_STRING = [PROP_TYPE_BOOLEAN, PROP_TYPE_NUMBER, PROP_TYPE_STRING];
var PROP_TYPE_BOOLEAN_STRING = [PROP_TYPE_BOOLEAN, PROP_TYPE_STRING];
var PROP_TYPE_DATE_STRING = [PROP_TYPE_DATE, PROP_TYPE_STRING];
var PROP_TYPE_FUNCTION_STRING = [PROP_TYPE_FUNCTION, PROP_TYPE_STRING];
var PROP_TYPE_NUMBER_STRING = [PROP_TYPE_NUMBER, PROP_TYPE_STRING];
var PROP_TYPE_NUMBER_OBJECT_STRING = [PROP_TYPE_NUMBER, PROP_TYPE_OBJECT, PROP_TYPE_STRING];
var PROP_TYPE_OBJECT_FUNCTION = [PROP_TYPE_OBJECT, PROP_TYPE_FUNCTION];
var PROP_TYPE_OBJECT_STRING = [PROP_TYPE_OBJECT, PROP_TYPE_STRING];

/***/ }),

/***/ "a8c8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export mathMin */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mathMax; });
/* unused harmony export mathAbs */
/* unused harmony export mathCeil */
/* unused harmony export mathFloor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mathPow; });
/* unused harmony export mathRound */
// Math utilty functions
var mathMin = Math.min;
var mathMax = Math.max;
var mathAbs = Math.abs;
var mathCeil = Math.ceil;
var mathFloor = Math.floor;
var mathPow = Math.pow;
var mathRound = Math.round;

/***/ }),

/***/ "b42e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return a; });
var e=function(){return(e=Object.assign||function(e){for(var t,r=1,s=arguments.length;r<s;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},t={kebab:/-(\w)/g,styleProp:/:(.*)/,styleList:/;(?![^(]*\))/g};function r(e,t){return t?t.toUpperCase():""}function s(e){for(var s,a={},c=0,o=e.split(t.styleList);c<o.length;c++){var n=o[c].split(t.styleProp),i=n[0],l=n[1];(i=i.trim())&&("string"==typeof l&&(l=l.trim()),a[(s=i,s.replace(t.kebab,r))]=l)}return a}function a(){for(var t,r,a={},c=arguments.length;c--;)for(var o=0,n=Object.keys(arguments[c]);o<n.length;o++)switch(t=n[o]){case"class":case"style":case"directives":if(Array.isArray(a[t])||(a[t]=[]),"style"===t){var i=void 0;i=Array.isArray(arguments[c].style)?arguments[c].style:[arguments[c].style];for(var l=0;l<i.length;l++){var y=i[l];"string"==typeof y&&(i[l]=s(y))}arguments[c].style=i}a[t]=a[t].concat(arguments[c][t]);break;case"staticClass":if(!arguments[c][t])break;void 0===a[t]&&(a[t]=""),a[t]&&(a[t]+=" "),a[t]+=arguments[c][t].trim();break;case"on":case"nativeOn":a[t]||(a[t]={});for(var p=0,f=Object.keys(arguments[c][t]||{});p<f.length;p++)r=f[p],a[t][r]?a[t][r]=[].concat(a[t][r],arguments[c][t][r]):a[t][r]=arguments[c][t][r];break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":a[t]||(a[t]={}),a[t]=e({},arguments[c][t],a[t]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:a[t]||(a[t]=arguments[c][t])}return a}
//# sourceMappingURL=lib.esm.js.map


/***/ }),

/***/ "b458":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ VBTooltipPlugin; });

// UNUSED EXPORTS: VBTooltip

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/components.js
var constants_components = __webpack_require__("c637");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/env.js
var env = __webpack_require__("e863");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/constants/events.js
var EVENT_NAME_ACTIVATE_TAB = 'activate-tab';
var EVENT_NAME_BLUR = 'blur';
var EVENT_NAME_CANCEL = 'cancel';
var EVENT_NAME_CHANGE = 'change';
var EVENT_NAME_CHANGED = 'changed';
var EVENT_NAME_CLICK = 'click';
var EVENT_NAME_CLOSE = 'close';
var EVENT_NAME_CONTEXT = 'context';
var EVENT_NAME_CONTEXT_CHANGED = 'context-changed';
var EVENT_NAME_DESTROYED = 'destroyed';
var EVENT_NAME_DISABLE = 'disable';
var EVENT_NAME_DISABLED = 'disabled';
var EVENT_NAME_DISMISSED = 'dismissed';
var EVENT_NAME_DISMISS_COUNT_DOWN = 'dismiss-count-down';
var EVENT_NAME_ENABLE = 'enable';
var EVENT_NAME_ENABLED = 'enabled';
var EVENT_NAME_FILTERED = 'filtered';
var EVENT_NAME_FIRST = 'first';
var EVENT_NAME_FOCUSIN = 'focusin';
var EVENT_NAME_FOCUSOUT = 'focusout';
var EVENT_NAME_HEAD_CLICKED = 'head-clicked';
var EVENT_NAME_HIDDEN = 'hidden';
var EVENT_NAME_HIDE = 'hide';
var EVENT_NAME_IMG_ERROR = 'img-error';
var EVENT_NAME_INPUT = 'input';
var EVENT_NAME_LAST = 'last';
var EVENT_NAME_MOUSEENTER = 'mouseenter';
var EVENT_NAME_MOUSELEAVE = 'mouseleave';
var EVENT_NAME_NEXT = 'next';
var EVENT_NAME_OK = 'ok';
var EVENT_NAME_OPEN = 'open';
var EVENT_NAME_PAGE_CLICK = 'page-click';
var EVENT_NAME_PAUSED = 'paused';
var EVENT_NAME_PREV = 'prev';
var EVENT_NAME_REFRESH = 'refresh';
var EVENT_NAME_REFRESHED = 'refreshed';
var EVENT_NAME_REMOVE = 'remove';
var EVENT_NAME_ROW_CLICKED = 'row-clicked';
var EVENT_NAME_ROW_CONTEXTMENU = 'row-contextmenu';
var EVENT_NAME_ROW_DBLCLICKED = 'row-dblclicked';
var EVENT_NAME_ROW_HOVERED = 'row-hovered';
var EVENT_NAME_ROW_MIDDLE_CLICKED = 'row-middle-clicked';
var EVENT_NAME_ROW_SELECTED = 'row-selected';
var EVENT_NAME_ROW_UNHOVERED = 'row-unhovered';
var EVENT_NAME_SELECTED = 'selected';
var EVENT_NAME_SHOW = 'show';
var EVENT_NAME_SHOWN = 'shown';
var EVENT_NAME_SLIDING_END = 'sliding-end';
var EVENT_NAME_SLIDING_START = 'sliding-start';
var EVENT_NAME_SORT_CHANGED = 'sort-changed';
var EVENT_NAME_TAG_STATE = 'tag-state';
var EVENT_NAME_TOGGLE = 'toggle';
var EVENT_NAME_UNPAUSED = 'unpaused';
var EVENT_NAME_UPDATE = 'update';
var HOOK_EVENT_NAME_BEFORE_DESTROY = 'hook:beforeDestroy';
var HOOK_EVENT_NAME_DESTROYED = 'hook:destroyed';
var MODEL_EVENT_NAME_PREFIX = 'update:';
var ROOT_EVENT_NAME_PREFIX = 'bv';
var ROOT_EVENT_NAME_SEPARATOR = '::';
var EVENT_OPTIONS_PASSIVE = {
  passive: true
};
var EVENT_OPTIONS_NO_CAPTURE = {
  passive: true,
  capture: false
};
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/array.js
var array = __webpack_require__("2326");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/config.js + 1 modules
var utils_config = __webpack_require__("228e");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/get-scope-id.js
// This method returns a component's scoped style attribute name: `data-v-xxxxxxx`
// The `_scopeId` options property is added by vue-loader when using scoped styles
// and will be `undefined` if no scoped styles are in use
var getScopeId = function getScopeId(vm) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return vm ? vm.$options._scopeId || defaultValue : defaultValue;
};
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/identity.js
var identity = __webpack_require__("6c06");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/inspect.js
var inspect = __webpack_require__("7b1e");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/object.js
var object = __webpack_require__("d82f");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/loose-equal.js

 // Assumes both a and b are arrays!
// Handles when arrays are "sparse" (array.every(...) doesn't handle sparse)

var compareArrays = function compareArrays(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  var equal = true;

  for (var i = 0; equal && i < a.length; i++) {
    equal = loose_equal_looseEqual(a[i], b[i]);
  }

  return equal;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 * Returns boolean true or false
 */


var loose_equal_looseEqual = function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var aValidType = Object(inspect["c" /* isDate */])(a);
  var bValidType = Object(inspect["c" /* isDate */])(b);

  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }

  aValidType = Object(inspect["a" /* isArray */])(a);
  bValidType = Object(inspect["a" /* isArray */])(b);

  if (aValidType || bValidType) {
    return aValidType && bValidType ? compareArrays(a, b) : false;
  }

  aValidType = Object(inspect["g" /* isObject */])(a);
  bValidType = Object(inspect["g" /* isObject */])(b);

  if (aValidType || bValidType) {
    /* istanbul ignore if: this if will probably never be called */
    if (!aValidType || !bValidType) {
      return false;
    }

    var aKeysCount = Object(object["h" /* keys */])(a).length;
    var bKeysCount = Object(object["h" /* keys */])(b).length;

    if (aKeysCount !== bKeysCount) {
      return false;
    }

    for (var key in a) {
      var aHasKey = Object(object["g" /* hasOwnProperty */])(a, key);
      var bHasKey = Object(object["g" /* hasOwnProperty */])(b, key);

      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }

  return String(a) === String(b);
};
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/number.js
var number = __webpack_require__("3a58");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/vue.js
var vue = __webpack_require__("2f79");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/safe-types.js
var safe_types = __webpack_require__("ca88");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/string.js
var string = __webpack_require__("fa73");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/dom.js





 // --- Constants ---

var ELEMENT_PROTO = safe_types["a" /* Element */].prototype;
var TABABLE_SELECTOR = ['button', '[href]:not(.disabled)', 'input', 'select', 'textarea', '[tabindex]', '[contenteditable]'].map(function (s) {
  return "".concat(s, ":not(:disabled):not([disabled])");
}).join(', '); // --- Normalization utils ---
// See: https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill

/* istanbul ignore next */

var matchesEl = ELEMENT_PROTO.matches || ELEMENT_PROTO.msMatchesSelector || ELEMENT_PROTO.webkitMatchesSelector; // See: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest

/* istanbul ignore next */

var closestEl = ELEMENT_PROTO.closest || function (sel) {
  var el = this;

  do {
    // Use our "patched" matches function
    if (matches(el, sel)) {
      return el;
    }

    el = el.parentElement || el.parentNode;
  } while (!Object(inspect["e" /* isNull */])(el) && el.nodeType === Node.ELEMENT_NODE);

  return null;
}; // `requestAnimationFrame()` convenience method

/* istanbul ignore next: JSDOM always returns the first option */

var requestAF = env["h" /* WINDOW */].requestAnimationFrame || env["h" /* WINDOW */].webkitRequestAnimationFrame || env["h" /* WINDOW */].mozRequestAnimationFrame || env["h" /* WINDOW */].msRequestAnimationFrame || env["h" /* WINDOW */].oRequestAnimationFrame || // Fallback, but not a true polyfill
// Only needed for Opera Mini

/* istanbul ignore next */
function (cb) {
  return setTimeout(cb, 16);
};
var MutationObs = env["h" /* WINDOW */].MutationObserver || env["h" /* WINDOW */].WebKitMutationObserver || env["h" /* WINDOW */].MozMutationObserver || null; // --- Utils ---
// Remove a node from DOM

var removeNode = function removeNode(el) {
  return el && el.parentNode && el.parentNode.removeChild(el);
}; // Determine if an element is an HTML element

var isElement = function isElement(el) {
  return !!(el && el.nodeType === Node.ELEMENT_NODE);
}; // Get the currently active HTML element

var dom_getActiveElement = function getActiveElement() {
  var excludes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var activeElement = env["a" /* DOCUMENT */].activeElement;
  return activeElement && !excludes.some(function (el) {
    return el === activeElement;
  }) ? activeElement : null;
}; // Returns `true` if a tag's name equals `name`

var dom_isTag = function isTag(tag, name) {
  return Object(string["c" /* toString */])(tag).toLowerCase() === Object(string["c" /* toString */])(name).toLowerCase();
}; // Determine if an HTML element is the currently active element

var isActiveElement = function isActiveElement(el) {
  return isElement(el) && el === dom_getActiveElement();
}; // Determine if an HTML element is visible - Faster than CSS check

var dom_isVisible = function isVisible(el) {
  if (!isElement(el) || !el.parentNode || !dom_contains(env["a" /* DOCUMENT */].body, el)) {
    // Note this can fail for shadow dom elements since they
    // are not a direct descendant of document.body
    return false;
  }

  if (getStyle(el, 'display') === 'none') {
    // We do this check to help with vue-test-utils when using v-show

    /* istanbul ignore next */
    return false;
  } // All browsers support getBoundingClientRect(), except JSDOM as it returns all 0's for values :(
  // So any tests that need isVisible will fail in JSDOM
  // Except when we override the getBCR prototype in some tests


  var bcr = getBCR(el);
  return !!(bcr && bcr.height > 0 && bcr.width > 0);
}; // Determine if an element is disabled

var isDisabled = function isDisabled(el) {
  return !isElement(el) || el.disabled || hasAttr(el, 'disabled') || hasClass(el, 'disabled');
}; // Cause/wait-for an element to reflow its content (adjusting its height/width)

var reflow = function reflow(el) {
  // Requesting an elements offsetHight will trigger a reflow of the element content

  /* istanbul ignore next: reflow doesn't happen in JSDOM */
  return isElement(el) && el.offsetHeight;
}; // Select all elements matching selector. Returns `[]` if none found

var dom_selectAll = function selectAll(selector, root) {
  return Object(array["c" /* from */])((isElement(root) ? root : env["a" /* DOCUMENT */]).querySelectorAll(selector));
}; // Select a single element, returns `null` if not found

var dom_select = function select(selector, root) {
  return (isElement(root) ? root : env["a" /* DOCUMENT */]).querySelector(selector) || null;
}; // Determine if an element matches a selector

var matches = function matches(el, selector) {
  return isElement(el) ? matchesEl.call(el, selector) : false;
}; // Finds closest element matching selector. Returns `null` if not found

var closest = function closest(selector, root) {
  var includeRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!isElement(root)) {
    return null;
  }

  var el = closestEl.call(root, selector); // Native closest behaviour when `includeRoot` is truthy,
  // else emulate jQuery closest and return `null` if match is
  // the passed in root element when `includeRoot` is falsey

  return includeRoot ? el : el === root ? null : el;
}; // Returns true if the parent element contains the child element

var dom_contains = function contains(parent, child) {
  return parent && Object(inspect["d" /* isFunction */])(parent.contains) ? parent.contains(child) : false;
}; // Get an element given an ID

var dom_getById = function getById(id) {
  return env["a" /* DOCUMENT */].getElementById(/^#/.test(id) ? id.slice(1) : id) || null;
}; // Add a class to an element

var addClass = function addClass(el, className) {
  // We are checking for `el.classList` existence here since IE 11
  // returns `undefined` for some elements (e.g. SVG elements)
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
  if (className && isElement(el) && el.classList) {
    el.classList.add(className);
  }
}; // Remove a class from an element

var removeClass = function removeClass(el, className) {
  // We are checking for `el.classList` existence here since IE 11
  // returns `undefined` for some elements (e.g. SVG elements)
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
  if (className && isElement(el) && el.classList) {
    el.classList.remove(className);
  }
}; // Test if an element has a class

var hasClass = function hasClass(el, className) {
  // We are checking for `el.classList` existence here since IE 11
  // returns `undefined` for some elements (e.g. SVG elements)
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
  if (className && isElement(el) && el.classList) {
    return el.classList.contains(className);
  }

  return false;
}; // Set an attribute on an element

var setAttr = function setAttr(el, attr, value) {
  if (attr && isElement(el)) {
    el.setAttribute(attr, value);
  }
}; // Remove an attribute from an element

var removeAttr = function removeAttr(el, attr) {
  if (attr && isElement(el)) {
    el.removeAttribute(attr);
  }
}; // Get an attribute value from an element
// Returns `null` if not found

var getAttr = function getAttr(el, attr) {
  return attr && isElement(el) ? el.getAttribute(attr) : null;
}; // Determine if an attribute exists on an element
// Returns `true` or `false`, or `null` if element not found

var hasAttr = function hasAttr(el, attr) {
  return attr && isElement(el) ? el.hasAttribute(attr) : null;
}; // Set an style property on an element

var setStyle = function setStyle(el, prop, value) {
  if (prop && isElement(el)) {
    el.style[prop] = value;
  }
}; // Remove an style property from an element

var removeStyle = function removeStyle(el, prop) {
  if (prop && isElement(el)) {
    el.style[prop] = '';
  }
}; // Get an style property value from an element
// Returns `null` if not found

var getStyle = function getStyle(el, prop) {
  return prop && isElement(el) ? el.style[prop] || null : null;
}; // Return the Bounding Client Rect of an element
// Returns `null` if not an element

/* istanbul ignore next: getBoundingClientRect() doesn't work in JSDOM */

var getBCR = function getBCR(el) {
  return isElement(el) ? el.getBoundingClientRect() : null;
}; // Get computed style object for an element

/* istanbul ignore next: getComputedStyle() doesn't work in JSDOM */

var dom_getCS = function getCS(el) {
  var getComputedStyle = env["h" /* WINDOW */].getComputedStyle;
  return getComputedStyle && isElement(el) ? getComputedStyle(el) : {};
}; // Returns a `Selection` object representing the range of text selected
// Returns `null` if no window support is given

/* istanbul ignore next: getSelection() doesn't work in JSDOM */

var dom_getSel = function getSel() {
  var getSelection = env["h" /* WINDOW */].getSelection;
  return getSelection ? env["h" /* WINDOW */].getSelection() : null;
}; // Return an element's offset with respect to document element
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.offset

var offset = function offset(el)
/* istanbul ignore next: getBoundingClientRect(), getClientRects() doesn't work in JSDOM */
{
  var _offset = {
    top: 0,
    left: 0
  };

  if (!isElement(el) || el.getClientRects().length === 0) {
    return _offset;
  }

  var bcr = getBCR(el);

  if (bcr) {
    var win = el.ownerDocument.defaultView;
    _offset.top = bcr.top + win.pageYOffset;
    _offset.left = bcr.left + win.pageXOffset;
  }

  return _offset;
}; // Return an element's offset with respect to to its offsetParent
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.position

var dom_position = function position(el)
/* istanbul ignore next: getBoundingClientRect() doesn't work in JSDOM */
{
  var _offset = {
    top: 0,
    left: 0
  };

  if (!isElement(el)) {
    return _offset;
  }

  var parentOffset = {
    top: 0,
    left: 0
  };
  var elStyles = dom_getCS(el);

  if (elStyles.position === 'fixed') {
    _offset = getBCR(el) || _offset;
  } else {
    _offset = offset(el);
    var doc = el.ownerDocument;
    var offsetParent = el.offsetParent || doc.documentElement;

    while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && dom_getCS(offsetParent).position === 'static') {
      offsetParent = offsetParent.parentNode;
    }

    if (offsetParent && offsetParent !== el && offsetParent.nodeType === Node.ELEMENT_NODE) {
      parentOffset = offset(offsetParent);
      var offsetParentStyles = dom_getCS(offsetParent);
      parentOffset.top += Object(number["b" /* toFloat */])(offsetParentStyles.borderTopWidth, 0);
      parentOffset.left += Object(number["b" /* toFloat */])(offsetParentStyles.borderLeftWidth, 0);
    }
  }

  return {
    top: _offset.top - parentOffset.top - Object(number["b" /* toFloat */])(elStyles.marginTop, 0),
    left: _offset.left - parentOffset.left - Object(number["b" /* toFloat */])(elStyles.marginLeft, 0)
  };
}; // Find all tabable elements in the given element
// Assumes users have not used `tabindex` > `0` on elements

var getTabables = function getTabables() {
  var rootEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  return dom_selectAll(TABABLE_SELECTOR, rootEl).filter(dom_isVisible).filter(function (el) {
    return el.tabIndex > -1 && !el.disabled;
  });
}; // Attempt to focus an element, and return `true` if successful

var attemptFocus = function attemptFocus(el) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  try {
    el.focus(options);
  } catch (_unused) {}

  return isActiveElement(el);
}; // Attempt to blur an element, and return `true` if successful

var attemptBlur = function attemptBlur(el) {
  try {
    el.blur();
  } catch (_unused2) {}

  return !isActiveElement(el);
};
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/regex.js
var regex = __webpack_require__("992e");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/events.js




 // --- Utils ---
// Normalize event options based on support of passive option
// Exported only for testing purposes

var events_parseEventOptions = function parseEventOptions(options) {
  /* istanbul ignore else: can't test in JSDOM, as it supports passive */
  if (env["c" /* HAS_PASSIVE_EVENT_SUPPORT */]) {
    return Object(inspect["g" /* isObject */])(options) ? options : {
      capture: !!options || false
    };
  } else {
    // Need to translate to actual Boolean value
    return !!(Object(inspect["g" /* isObject */])(options) ? options.capture : options);
  }
}; // Attach an event listener to an element

var eventOn = function eventOn(el, eventName, handler, options) {
  if (el && el.addEventListener) {
    el.addEventListener(eventName, handler, events_parseEventOptions(options));
  }
}; // Remove an event listener from an element

var eventOff = function eventOff(el, eventName, handler, options) {
  if (el && el.removeEventListener) {
    el.removeEventListener(eventName, handler, events_parseEventOptions(options));
  }
}; // Utility method to add/remove a event listener based on first argument (boolean)
// It passes all other arguments to the `eventOn()` or `eventOff` method

var eventOnOff = function eventOnOff(on) {
  var method = on ? eventOn : eventOff;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  method.apply(void 0, args);
}; // Utility method to prevent the default event handling and propagation

var stopEvent = function stopEvent(event) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$preventDefault = _ref.preventDefault,
      preventDefault = _ref$preventDefault === void 0 ? true : _ref$preventDefault,
      _ref$propagation = _ref.propagation,
      propagation = _ref$propagation === void 0 ? true : _ref$propagation,
      _ref$immediatePropaga = _ref.immediatePropagation,
      immediatePropagation = _ref$immediatePropaga === void 0 ? false : _ref$immediatePropaga;

  if (preventDefault) {
    event.preventDefault();
  }

  if (propagation) {
    event.stopPropagation();
  }

  if (immediatePropagation) {
    event.stopImmediatePropagation();
  }
}; // Helper method to convert a component/directive name to a base event name
// `getBaseEventName('BNavigationItem')` => 'navigation-item'
// `getBaseEventName('BVToggle')` => 'toggle'

var events_getBaseEventName = function getBaseEventName(value) {
  return Object(string["a" /* kebabCase */])(value.replace(regex["b" /* RX_BV_PREFIX */], ''));
}; // Get a root event name by component/directive and event name
// `getBaseEventName('BModal', 'show')` => 'bv::modal::show'


var events_getRootEventName = function getRootEventName(name, eventName) {
  return [ROOT_EVENT_NAME_PREFIX, events_getBaseEventName(name), eventName].join(ROOT_EVENT_NAME_SEPARATOR);
}; // Get a root action event name by component/directive and action name
// `getRootActionEventName('BModal', 'show')` => 'bv::show::modal'

var events_getRootActionEventName = function getRootActionEventName(name, actionName) {
  return [ROOT_EVENT_NAME_PREFIX, actionName, events_getBaseEventName(name)].join(ROOT_EVENT_NAME_SEPARATOR);
};
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/math.js
var math = __webpack_require__("a8c8");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/noop.js
var noop = function noop() {};
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/env.js
var utils_env = __webpack_require__("938d");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/warn.js


/**
 * Log a warning message to the console with BootstrapVue formatting
 * @param {string} message
 */

var warn_warn = function warn(message)
/* istanbul ignore next */
{
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!Object(utils_env["a" /* getNoWarn */])()) {
    console.warn("[BootstrapVue warn]: ".concat(source ? "".concat(source, " - ") : '').concat(message));
  }
};
/**
 * Warn when no Promise support is given
 * @param {string} source
 * @returns {boolean} warned
 */

var warn_warnNotClient = function warnNotClient(source) {
  /* istanbul ignore else */
  if (env["f" /* IS_BROWSER */]) {
    return false;
  } else {
    warn_warn("".concat(source, ": Can not be called during SSR."));
    return true;
  }
};
/**
 * Warn when no Promise support is given
 * @param {string} source
 * @returns {boolean} warned
 */

var warn_warnNoPromiseSupport = function warnNoPromiseSupport(source) {
  /* istanbul ignore else */
  if (env["d" /* HAS_PROMISE_SUPPORT */]) {
    return false;
  } else {
    warn_warn("".concat(source, ": Requires Promise support."));
    return true;
  }
};
/**
 * Warn when no MutationObserver support is given
 * @param {string} source
 * @returns {boolean} warned
 */

var warn_warnNoMutationObserverSupport = function warnNoMutationObserverSupport(source) {
  /* istanbul ignore else */
  if (env["b" /* HAS_MUTATION_OBSERVER_SUPPORT */]) {
    return false;
  } else {
    warn_warn("".concat(source, ": Requires MutationObserver support."));
    return true;
  }
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/bv-event.class.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var bv_event_class_BvEvent = /*#__PURE__*/function () {
  function BvEvent(type) {
    var eventInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, BvEvent);

    // Start by emulating native Event constructor
    if (!type) {
      /* istanbul ignore next */
      throw new TypeError("Failed to construct '".concat(this.constructor.name, "'. 1 argument required, ").concat(arguments.length, " given."));
    } // Merge defaults first, the eventInit, and the type last
    // so it can't be overwritten


    Object(object["a" /* assign */])(this, BvEvent.Defaults, this.constructor.Defaults, eventInit, {
      type: type
    }); // Freeze some props as readonly, but leave them enumerable

    Object(object["d" /* defineProperties */])(this, {
      type: Object(object["j" /* readonlyDescriptor */])(),
      cancelable: Object(object["j" /* readonlyDescriptor */])(),
      nativeEvent: Object(object["j" /* readonlyDescriptor */])(),
      target: Object(object["j" /* readonlyDescriptor */])(),
      relatedTarget: Object(object["j" /* readonlyDescriptor */])(),
      vueTarget: Object(object["j" /* readonlyDescriptor */])(),
      componentId: Object(object["j" /* readonlyDescriptor */])()
    }); // Create a private variable using closure scoping

    var defaultPrevented = false; // Recreate preventDefault method. One way setter

    this.preventDefault = function preventDefault() {
      if (this.cancelable) {
        defaultPrevented = true;
      }
    }; // Create `defaultPrevented` publicly accessible prop that
    // can only be altered by the preventDefault method


    Object(object["e" /* defineProperty */])(this, 'defaultPrevented', {
      enumerable: true,
      get: function get() {
        return defaultPrevented;
      }
    });
  }

  _createClass(BvEvent, null, [{
    key: "Defaults",
    get: function get() {
      return {
        type: '',
        cancelable: true,
        nativeEvent: null,
        target: null,
        relatedTarget: null,
        vueTarget: null,
        componentId: null
      };
    }
  }]);

  return BvEvent;
}();
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/listen-on-root.js

 // @vue/component

var listenOnRootMixin = vue["b" /* Vue */].extend({
  methods: {
    /**
     * Safely register event listeners on the root Vue node
     * While Vue automatically removes listeners for individual components,
     * when a component registers a listener on root and is destroyed,
     * this orphans a callback because the node is gone,
     * but the root does not clear the callback
     *
     * When registering a `$root` listener, it also registers a listener on
     * the component's `beforeDestroy()` hook to automatically remove the
     * event listener from the `$root` instance
     *
     * @param {string} event
     * @param {function} callback
     */
    listenOnRoot: function listenOnRoot(event, callback) {
      var _this = this;

      this.$root.$on(event, callback);
      this.$on(HOOK_EVENT_NAME_BEFORE_DESTROY, function () {
        _this.$root.$off(event, callback);
      });
    },

    /**
     * Safely register a `$once()` event listener on the root Vue node
     * While Vue automatically removes listeners for individual components,
     * when a component registers a listener on root and is destroyed,
     * this orphans a callback because the node is gone,
     * but the root does not clear the callback
     *
     * When registering a $root listener, it also registers a listener on
     * the component's `beforeDestroy` hook to automatically remove the
     * event listener from the $root instance.
     *
     * @param {string} event
     * @param {function} callback
     */
    listenOnRootOnce: function listenOnRootOnce(event, callback) {
      var _this2 = this;

      this.$root.$once(event, callback);
      this.$on(HOOK_EVENT_NAME_BEFORE_DESTROY, function () {
        _this2.$root.$off(event, callback);
      });
    },

    /**
     * Convenience method for calling `vm.$emit()` on `vm.$root`
     *
     * @param {string} event
     * @param {*} args
     */
    emitOnRoot: function emitOnRoot(event) {
      var _this$$root;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_this$$root = this.$root).$emit.apply(_this$$root, [event].concat(args));
    }
  }
});
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/props.js
var constants_props = __webpack_require__("a723");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/props.js
var utils_props = __webpack_require__("cf757");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/scoped-style.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // @vue/component

var scopedStyleMixin = vue["b" /* Vue */].extend({
  computed: {
    scopedStyleAttrs: function scopedStyleAttrs() {
      var scopeId = getScopeId(this.$parent);
      return scopeId ? _defineProperty({}, scopeId, '') : {};
    }
  }
});
// EXTERNAL MODULE: ./node_modules/popper.js/dist/esm/popper.js
var popper = __webpack_require__("f0bd");

// EXTERNAL MODULE: ./node_modules/vue-functional-data-merge/dist/lib.esm.js
var lib_esm = __webpack_require__("b42e");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/transition/bv-transition.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { bv_transition_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function bv_transition_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Generic Bootstrap v4 fade (no-fade) transition component
//
// Assumes that `show` class is not required when
// the transition has finished the enter transition
// (show and fade classes are only applied during transition)




 // --- Constants ---

var NO_FADE_PROPS = {
  name: '',
  enterClass: '',
  enterActiveClass: '',
  enterToClass: 'show',
  leaveClass: 'show',
  leaveActiveClass: '',
  leaveToClass: ''
};

var FADE_PROPS = _objectSpread(_objectSpread({}, NO_FADE_PROPS), {}, {
  enterActiveClass: 'fade',
  leaveActiveClass: 'fade'
}); // --- Props ---


var bv_transition_props = {
  // Has no effect if `trans-props` provided
  appear: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_BOOLEAN */], false),
  // Can be overridden by user supplied `trans-props`
  mode: Object(utils_props["a" /* makeProp */])(constants_props["f" /* PROP_TYPE_STRING */]),
  // Only applicable to the built in transition
  // Has no effect if `trans-props` provided
  noFade: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_BOOLEAN */], false),
  // For user supplied transitions (if needed)
  transProps: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_OBJECT */])
}; // --- Main component ---
// @vue/component

var BVTransition = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: constants_components["h" /* NAME_TRANSITION */],
  functional: true,
  props: bv_transition_props,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data,
        props = _ref.props;
    var transProps = props.transProps;

    if (!Object(inspect["h" /* isPlainObject */])(transProps)) {
      transProps = props.noFade ? NO_FADE_PROPS : FADE_PROPS;

      if (props.appear) {
        // Default the appear classes to equal the enter classes
        transProps = _objectSpread(_objectSpread({}, transProps), {}, {
          appear: true,
          appearClass: transProps.enterClass,
          appearActiveClass: transProps.enterActiveClass,
          appearToClass: transProps.enterToClass
        });
      }
    }

    transProps = _objectSpread(_objectSpread({
      mode: props.mode
    }, transProps), {}, {
      // We always need `css` true
      css: true
    });
    return h('transition', // Any transition event listeners will get merged here
    Object(lib_esm["a" /* mergeData */])(data, {
      props: transProps
    }), children);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/tooltip/helpers/bv-popper.js
// Base on-demand component for tooltip / popover templates
//
// Currently:
//   Responsible for positioning and transitioning the template
//   Templates are only instantiated when shown, and destroyed when hidden
//









 // --- Constants ---

var AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  TOPLEFT: 'top',
  TOPRIGHT: 'top',
  RIGHTTOP: 'right',
  RIGHTBOTTOM: 'right',
  BOTTOMLEFT: 'bottom',
  BOTTOMRIGHT: 'bottom',
  LEFTTOP: 'left',
  LEFTBOTTOM: 'left'
};
var OffsetMap = {
  AUTO: 0,
  TOPLEFT: -1,
  TOP: 0,
  TOPRIGHT: +1,
  RIGHTTOP: -1,
  RIGHT: 0,
  RIGHTBOTTOM: +1,
  BOTTOMLEFT: -1,
  BOTTOM: 0,
  BOTTOMRIGHT: +1,
  LEFTTOP: -1,
  LEFT: 0,
  LEFTBOTTOM: +1
}; // --- Props ---

var bv_popper_props = {
  // The minimum distance (in `px`) from the edge of the
  // tooltip/popover that the arrow can be positioned
  arrowPadding: Object(utils_props["a" /* makeProp */])(constants_props["d" /* PROP_TYPE_NUMBER_STRING */], 6),
  // 'scrollParent', 'viewport', 'window', or `Element`
  boundary: Object(utils_props["a" /* makeProp */])([safe_types["c" /* HTMLElement */], constants_props["f" /* PROP_TYPE_STRING */]], 'scrollParent'),
  // Tooltip/popover will try and stay away from
  // boundary edge by this many pixels
  boundaryPadding: Object(utils_props["a" /* makeProp */])(constants_props["d" /* PROP_TYPE_NUMBER_STRING */], 5),
  fallbackPlacement: Object(utils_props["a" /* makeProp */])(constants_props["b" /* PROP_TYPE_ARRAY_STRING */], 'flip'),
  offset: Object(utils_props["a" /* makeProp */])(constants_props["d" /* PROP_TYPE_NUMBER_STRING */], 0),
  placement: Object(utils_props["a" /* makeProp */])(constants_props["f" /* PROP_TYPE_STRING */], 'top'),
  // Element that the tooltip/popover is positioned relative to
  target: Object(utils_props["a" /* makeProp */])([safe_types["c" /* HTMLElement */], safe_types["d" /* SVGElement */]])
}; // --- Main component ---
// @vue/component

var BVPopper = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: constants_components["b" /* NAME_POPPER */],
  props: bv_popper_props,
  data: function data() {
    return {
      // reactive props set by parent
      noFade: false,
      // State related data
      localShow: true,
      attachment: this.getAttachment(this.placement)
    };
  },
  computed: {
    /* istanbul ignore next */
    templateType: function templateType() {
      // Overridden by template component
      return 'unknown';
    },
    popperConfig: function popperConfig() {
      var _this = this;

      var placement = this.placement;
      return {
        placement: this.getAttachment(placement),
        modifiers: {
          offset: {
            offset: this.getOffset(placement)
          },
          flip: {
            behavior: this.fallbackPlacement
          },
          // `arrow.element` can also be a reference to an HTML Element
          // maybe we should make this a `$ref` in the templates?
          arrow: {
            element: '.arrow'
          },
          preventOverflow: {
            padding: this.boundaryPadding,
            boundariesElement: this.boundary
          }
        },
        onCreate: function onCreate(data) {
          // Handle flipping arrow classes
          if (data.originalPlacement !== data.placement) {
            /* istanbul ignore next: can't test in JSDOM */
            _this.popperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          // Handle flipping arrow classes
          _this.popperPlacementChange(data);
        }
      };
    }
  },
  created: function created() {
    var _this2 = this;

    // Note: We are created on-demand, and should be guaranteed that
    // DOM is rendered/ready by the time the created hook runs
    this.$_popper = null; // Ensure we show as we mount

    this.localShow = true; // Create popper instance before shown

    this.$on(EVENT_NAME_SHOW, function (el) {
      _this2.popperCreate(el);
    }); // Self destruct handler

    var handleDestroy = function handleDestroy() {
      _this2.$nextTick(function () {
        // In a `requestAF()` to release control back to application
        requestAF(function () {
          _this2.$destroy();
        });
      });
    }; // Self destruct if parent destroyed


    this.$parent.$once(HOOK_EVENT_NAME_DESTROYED, handleDestroy); // Self destruct after hidden

    this.$once(EVENT_NAME_HIDDEN, handleDestroy);
  },
  beforeMount: function beforeMount() {
    // Ensure that the attachment position is correct before mounting
    // as our propsData is added after `new Template({...})`
    this.attachment = this.getAttachment(this.placement);
  },
  updated: function updated() {
    // Update popper if needed
    // TODO: Should this be a watcher on `this.popperConfig` instead?
    this.updatePopper();
  },
  beforeDestroy: function beforeDestroy() {
    this.destroyPopper();
  },
  destroyed: function destroyed() {
    // Make sure template is removed from DOM
    var el = this.$el;
    el && el.parentNode && el.parentNode.removeChild(el);
  },
  methods: {
    // "Public" method to trigger hide template
    hide: function hide() {
      this.localShow = false;
    },
    // Private
    getAttachment: function getAttachment(placement) {
      return AttachmentMap[String(placement).toUpperCase()] || 'auto';
    },
    getOffset: function getOffset(placement) {
      if (!this.offset) {
        // Could set a ref for the arrow element
        var arrow = this.$refs.arrow || dom_select('.arrow', this.$el);
        var arrowOffset = Object(number["b" /* toFloat */])(dom_getCS(arrow).width, 0) + Object(number["b" /* toFloat */])(this.arrowPadding, 0);

        switch (OffsetMap[String(placement).toUpperCase()] || 0) {
          /* istanbul ignore next: can't test in JSDOM */
          case +1:
            /* istanbul ignore next: can't test in JSDOM */
            return "+50%p - ".concat(arrowOffset, "px");

          /* istanbul ignore next: can't test in JSDOM */

          case -1:
            /* istanbul ignore next: can't test in JSDOM */
            return "-50%p + ".concat(arrowOffset, "px");

          default:
            return 0;
        }
      }
      /* istanbul ignore next */


      return this.offset;
    },
    popperCreate: function popperCreate(el) {
      this.destroyPopper(); // We use `el` rather than `this.$el` just in case the original
      // mountpoint root element type was changed by the template

      this.$_popper = new popper["a" /* default */](this.target, el, this.popperConfig);
    },
    destroyPopper: function destroyPopper() {
      this.$_popper && this.$_popper.destroy();
      this.$_popper = null;
    },
    updatePopper: function updatePopper() {
      this.$_popper && this.$_popper.scheduleUpdate();
    },
    popperPlacementChange: function popperPlacementChange(data) {
      // Callback used by popper to adjust the arrow placement
      this.attachment = this.getAttachment(data.placement);
    },

    /* istanbul ignore next */
    renderTemplate: function renderTemplate(h) {
      // Will be overridden by templates
      return h('div');
    }
  },
  render: function render(h) {
    var _this3 = this;

    var noFade = this.noFade; // Note: 'show' and 'fade' classes are only appled during transition

    return h(BVTransition, {
      // Transitions as soon as mounted
      props: {
        appear: true,
        noFade: noFade
      },
      on: {
        // Events used by parent component/instance
        beforeEnter: function beforeEnter(el) {
          return _this3.$emit(EVENT_NAME_SHOW, el);
        },
        afterEnter: function afterEnter(el) {
          return _this3.$emit(EVENT_NAME_SHOWN, el);
        },
        beforeLeave: function beforeLeave(el) {
          return _this3.$emit(EVENT_NAME_HIDE, el);
        },
        afterLeave: function afterLeave(el) {
          return _this3.$emit(EVENT_NAME_HIDDEN, el);
        }
      }
    }, [this.localShow ? this.renderTemplate(h) : h()]);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/tooltip/helpers/bv-tooltip-template.js
function bv_tooltip_template_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function bv_tooltip_template_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { bv_tooltip_template_ownKeys(Object(source), true).forEach(function (key) { bv_tooltip_template_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { bv_tooltip_template_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function bv_tooltip_template_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








 // --- Props ---

var bv_tooltip_template_props = {
  // Used only by the directive versions
  html: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_BOOLEAN */], false),
  // Other non-reactive (while open) props are pulled in from BVPopper
  id: Object(utils_props["a" /* makeProp */])(constants_props["f" /* PROP_TYPE_STRING */])
}; // --- Main component ---
// @vue/component

var BVTooltipTemplate = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: constants_components["g" /* NAME_TOOLTIP_TEMPLATE */],
  extends: BVPopper,
  mixins: [scopedStyleMixin],
  props: bv_tooltip_template_props,
  data: function data() {
    // We use data, rather than props to ensure reactivity
    // Parent component will directly set this data
    return {
      title: '',
      content: '',
      variant: null,
      customClass: null,
      interactive: true
    };
  },
  computed: {
    templateType: function templateType() {
      return 'tooltip';
    },
    templateClasses: function templateClasses() {
      var _ref;

      var variant = this.variant,
          attachment = this.attachment,
          templateType = this.templateType;
      return [(_ref = {
        // Disables pointer events to hide the tooltip when the user
        // hovers over its content
        noninteractive: !this.interactive
      }, bv_tooltip_template_defineProperty(_ref, "b-".concat(templateType, "-").concat(variant), variant), bv_tooltip_template_defineProperty(_ref, "bs-".concat(templateType, "-").concat(attachment), attachment), _ref), this.customClass];
    },
    templateAttributes: function templateAttributes() {
      var id = this.id;
      return bv_tooltip_template_objectSpread(bv_tooltip_template_objectSpread({}, this.$parent.$parent.$attrs), {}, {
        id: id,
        role: 'tooltip',
        tabindex: '-1'
      }, this.scopedStyleAttrs);
    },
    templateListeners: function templateListeners() {
      var _this = this;

      // Used for hover/focus trigger listeners
      return {
        mouseenter:
        /* istanbul ignore next */
        function mouseenter(event) {
          _this.$emit(EVENT_NAME_MOUSEENTER, event);
        },
        mouseleave:
        /* istanbul ignore next */
        function mouseleave(event) {
          _this.$emit(EVENT_NAME_MOUSELEAVE, event);
        },
        focusin:
        /* istanbul ignore next */
        function focusin(event) {
          _this.$emit(EVENT_NAME_FOCUSIN, event);
        },
        focusout:
        /* istanbul ignore next */
        function focusout(event) {
          _this.$emit(EVENT_NAME_FOCUSOUT, event);
        }
      };
    }
  },
  methods: {
    renderTemplate: function renderTemplate(h) {
      var title = this.title; // Title can be a scoped slot function

      var $title = Object(inspect["d" /* isFunction */])(title) ? title({}) : title; // Directive versions only

      var domProps = this.html && !Object(inspect["d" /* isFunction */])(title) ? {
        innerHTML: title
      } : {};
      return h('div', {
        staticClass: 'tooltip b-tooltip',
        class: this.templateClasses,
        attrs: this.templateAttributes,
        on: this.templateListeners
      }, [h('div', {
        staticClass: 'arrow',
        ref: 'arrow'
      }), h('div', {
        staticClass: 'tooltip-inner',
        domProps: domProps
      }, [$title])]);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/tooltip/helpers/bv-tooltip.js
function bv_tooltip_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function bv_tooltip_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { bv_tooltip_ownKeys(Object(source), true).forEach(function (key) { bv_tooltip_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { bv_tooltip_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function bv_tooltip_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Tooltip "Class" (Built as a renderless Vue instance)
//
// Handles trigger events, etc.
// Instantiates template on demand

















 // --- Constants ---
// Modal container selector for appending tooltip/popover

var MODAL_SELECTOR = '.modal-content'; // Modal `$root` hidden event

var ROOT_EVENT_NAME_MODAL_HIDDEN = events_getRootEventName(constants_components["a" /* NAME_MODAL */], EVENT_NAME_HIDDEN); // Sidebar container selector for appending tooltip/popover

var SIDEBAR_SELECTOR = '.b-sidebar'; // For finding the container to append to

var CONTAINER_SELECTOR = [MODAL_SELECTOR, SIDEBAR_SELECTOR].join(', '); // For dropdown sniffing

var DROPDOWN_CLASS = 'dropdown';
var DROPDOWN_OPEN_SELECTOR = '.dropdown-menu.show'; // Data attribute to temporary store the `title` attribute's value

var DATA_TITLE_ATTR = 'data-original-title'; // Data specific to popper and template
// We don't use props, as we need reactivity (we can't pass reactive props)

var templateData = {
  // Text string or Scoped slot function
  title: '',
  // Text string or Scoped slot function
  content: '',
  // String
  variant: null,
  // String, Array, Object
  customClass: null,
  // String or array of Strings (overwritten by BVPopper)
  triggers: '',
  // String (overwritten by BVPopper)
  placement: 'auto',
  // String or array of strings
  fallbackPlacement: 'flip',
  // Element or Component reference (or function that returns element) of
  // the element that will have the trigger events bound, and is also
  // default element for positioning
  target: null,
  // HTML ID, Element or Component reference
  container: null,
  // 'body'
  // Boolean
  noFade: false,
  // 'scrollParent', 'viewport', 'window', Element, or Component reference
  boundary: 'scrollParent',
  // Tooltip/popover will try and stay away from
  // boundary edge by this many pixels (Number)
  boundaryPadding: 5,
  // Arrow offset (Number)
  offset: 0,
  // Hover/focus delay (Number or Object)
  delay: 0,
  // Arrow of Tooltip/popover will try and stay away from
  // the edge of tooltip/popover edge by this many pixels
  arrowPadding: 6,
  // Interactive state (Boolean)
  interactive: true,
  // Disabled state (Boolean)
  disabled: false,
  // ID to use for tooltip/popover
  id: null,
  // Flag used by directives only, for HTML content
  html: false
}; // --- Main component ---
// @vue/component

var BVTooltip = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: constants_components["f" /* NAME_TOOLTIP_HELPER */],
  mixins: [listenOnRootMixin],
  data: function data() {
    return bv_tooltip_objectSpread(bv_tooltip_objectSpread({}, templateData), {}, {
      // State management data
      activeTrigger: {
        // manual: false,
        hover: false,
        click: false,
        focus: false
      },
      localShow: false
    });
  },
  computed: {
    templateType: function templateType() {
      // Overwritten by BVPopover
      return 'tooltip';
    },
    computedId: function computedId() {
      return this.id || "__bv_".concat(this.templateType, "_").concat(this[vue["a" /* COMPONENT_UID_KEY */]], "__");
    },
    computedDelay: function computedDelay() {
      // Normalizes delay into object form
      var delay = {
        show: 0,
        hide: 0
      };

      if (Object(inspect["h" /* isPlainObject */])(this.delay)) {
        delay.show = Object(math["a" /* mathMax */])(Object(number["c" /* toInteger */])(this.delay.show, 0), 0);
        delay.hide = Object(math["a" /* mathMax */])(Object(number["c" /* toInteger */])(this.delay.hide, 0), 0);
      } else if (Object(inspect["f" /* isNumber */])(this.delay) || Object(inspect["i" /* isString */])(this.delay)) {
        delay.show = delay.hide = Object(math["a" /* mathMax */])(Object(number["c" /* toInteger */])(this.delay, 0), 0);
      }

      return delay;
    },
    computedTriggers: function computedTriggers() {
      // Returns the triggers in sorted array form
      // TODO: Switch this to object form for easier lookup
      return Object(array["b" /* concat */])(this.triggers).filter(identity["a" /* identity */]).join(' ').trim().toLowerCase().split(/\s+/).sort();
    },
    isWithActiveTrigger: function isWithActiveTrigger() {
      for (var trigger in this.activeTrigger) {
        if (this.activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    },
    computedTemplateData: function computedTemplateData() {
      var title = this.title,
          content = this.content,
          variant = this.variant,
          customClass = this.customClass,
          noFade = this.noFade,
          interactive = this.interactive;
      return {
        title: title,
        content: content,
        variant: variant,
        customClass: customClass,
        noFade: noFade,
        interactive: interactive
      };
    }
  },
  watch: {
    computedTriggers: function computedTriggers(newTriggers, oldTriggers) {
      var _this = this;

      // Triggers have changed, so re-register them

      /* istanbul ignore next */
      if (!loose_equal_looseEqual(newTriggers, oldTriggers)) {
        this.$nextTick(function () {
          // Disable trigger listeners
          _this.unListen(); // Clear any active triggers that are no longer in the list of triggers


          oldTriggers.forEach(function (trigger) {
            if (!Object(array["a" /* arrayIncludes */])(newTriggers, trigger)) {
              if (_this.activeTrigger[trigger]) {
                _this.activeTrigger[trigger] = false;
              }
            }
          }); // Re-enable the trigger listeners

          _this.listen();
        });
      }
    },
    computedTemplateData: function computedTemplateData() {
      // If any of the while open reactive "props" change,
      // ensure that the template updates accordingly
      this.handleTemplateUpdate();
    },
    title: function title(newValue, oldValue) {
      // Make sure to hide the tooltip when the title is set empty
      if (newValue !== oldValue && !newValue) {
        this.hide();
      }
    },
    disabled: function disabled(newValue) {
      if (newValue) {
        this.disable();
      } else {
        this.enable();
      }
    }
  },
  created: function created() {
    var _this2 = this;

    // Create non-reactive properties
    this.$_tip = null;
    this.$_hoverTimeout = null;
    this.$_hoverState = '';
    this.$_visibleInterval = null;
    this.$_enabled = !this.disabled;
    this.$_noop = noop.bind(this); // Destroy ourselves when the parent is destroyed

    if (this.$parent) {
      this.$parent.$once(HOOK_EVENT_NAME_BEFORE_DESTROY, function () {
        _this2.$nextTick(function () {
          // In a `requestAF()` to release control back to application
          requestAF(function () {
            _this2.$destroy();
          });
        });
      });
    }

    this.$nextTick(function () {
      var target = _this2.getTarget();

      if (target && dom_contains(document.body, target)) {
        // Copy the parent's scoped style attribute
        _this2.scopeId = getScopeId(_this2.$parent); // Set up all trigger handlers and listeners

        _this2.listen();
      } else {
        /* istanbul ignore next */
        warn_warn(Object(inspect["i" /* isString */])(_this2.target) ? "Unable to find target element by ID \"#".concat(_this2.target, "\" in document.") : 'The provided target is no valid HTML element.', _this2.templateType);
      }
    });
  },

  /* istanbul ignore next */
  updated: function updated() {
    // Usually called when the slots/data changes
    this.$nextTick(this.handleTemplateUpdate);
  },

  /* istanbul ignore next */
  deactivated: function deactivated() {
    // In a keepalive that has been deactivated, so hide
    // the tooltip/popover if it is showing
    this.forceHide();
  },
  beforeDestroy: function beforeDestroy() {
    // Remove all handler/listeners
    this.unListen();
    this.setWhileOpenListeners(false); // Clear any timeouts/intervals

    this.clearHoverTimeout();
    this.clearVisibilityInterval(); // Destroy the template

    this.destroyTemplate(); // Remove any other private properties created during create

    this.$_noop = null;
  },
  methods: {
    // --- Methods for creating and destroying the template ---
    getTemplate: function getTemplate() {
      // Overridden by BVPopover
      return BVTooltipTemplate;
    },
    updateData: function updateData() {
      var _this3 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // Method for updating popper/template data
      // We only update data if it exists, and has not changed
      var titleUpdated = false;
      Object(object["h" /* keys */])(templateData).forEach(function (prop) {
        if (!Object(inspect["j" /* isUndefined */])(data[prop]) && _this3[prop] !== data[prop]) {
          _this3[prop] = data[prop];

          if (prop === 'title') {
            titleUpdated = true;
          }
        }
      }); // If the title has updated, we may need to handle the `title`
      // attribute on the trigger target
      // We only do this while the template is open

      if (titleUpdated && this.localShow) {
        this.fixTitle();
      }
    },
    createTemplateAndShow: function createTemplateAndShow() {
      // Creates the template instance and show it
      var container = this.getContainer();
      var Template = this.getTemplate();
      var $tip = this.$_tip = new Template({
        parent: this,
        // The following is not reactive to changes in the props data
        propsData: {
          // These values cannot be changed while template is showing
          id: this.computedId,
          html: this.html,
          placement: this.placement,
          fallbackPlacement: this.fallbackPlacement,
          target: this.getPlacementTarget(),
          boundary: this.getBoundary(),
          // Ensure the following are integers
          offset: Object(number["c" /* toInteger */])(this.offset, 0),
          arrowPadding: Object(number["c" /* toInteger */])(this.arrowPadding, 0),
          boundaryPadding: Object(number["c" /* toInteger */])(this.boundaryPadding, 0)
        }
      }); // We set the initial reactive data (values that can be changed while open)

      this.handleTemplateUpdate(); // Template transition phase events (handled once only)
      // When the template has mounted, but not visibly shown yet

      $tip.$once(EVENT_NAME_SHOW, this.onTemplateShow); // When the template has completed showing

      $tip.$once(EVENT_NAME_SHOWN, this.onTemplateShown); // When the template has started to hide

      $tip.$once(EVENT_NAME_HIDE, this.onTemplateHide); // When the template has completed hiding

      $tip.$once(EVENT_NAME_HIDDEN, this.onTemplateHidden); // When the template gets destroyed for any reason

      $tip.$once(HOOK_EVENT_NAME_DESTROYED, this.destroyTemplate); // Convenience events from template
      // To save us from manually adding/removing DOM
      // listeners to tip element when it is open

      $tip.$on(EVENT_NAME_FOCUSIN, this.handleEvent);
      $tip.$on(EVENT_NAME_FOCUSOUT, this.handleEvent);
      $tip.$on(EVENT_NAME_MOUSEENTER, this.handleEvent);
      $tip.$on(EVENT_NAME_MOUSELEAVE, this.handleEvent); // Mount (which triggers the `show`)

      $tip.$mount(container.appendChild(document.createElement('div'))); // Template will automatically remove its markup from DOM when hidden
    },
    hideTemplate: function hideTemplate() {
      // Trigger the template to start hiding
      // The template will emit the `hide` event after this and
      // then emit the `hidden` event once it is fully hidden
      // The `hook:destroyed` will also be called (safety measure)
      this.$_tip && this.$_tip.hide(); // Clear out any stragging active triggers

      this.clearActiveTriggers(); // Reset the hover state

      this.$_hoverState = '';
    },
    // Destroy the template instance and reset state
    destroyTemplate: function destroyTemplate() {
      this.setWhileOpenListeners(false);
      this.clearHoverTimeout();
      this.$_hoverState = '';
      this.clearActiveTriggers();
      this.localPlacementTarget = null;

      try {
        this.$_tip.$destroy();
      } catch (_unused) {}

      this.$_tip = null;
      this.removeAriaDescribedby();
      this.restoreTitle();
      this.localShow = false;
    },
    getTemplateElement: function getTemplateElement() {
      return this.$_tip ? this.$_tip.$el : null;
    },
    handleTemplateUpdate: function handleTemplateUpdate() {
      var _this4 = this;

      // Update our template title/content "props"
      // So that the template updates accordingly
      var $tip = this.$_tip;

      if ($tip) {
        var props = ['title', 'content', 'variant', 'customClass', 'noFade', 'interactive']; // Only update the values if they have changed

        props.forEach(function (prop) {
          if ($tip[prop] !== _this4[prop]) {
            $tip[prop] = _this4[prop];
          }
        });
      }
    },
    // --- Show/Hide handlers ---
    // Show the tooltip
    show: function show() {
      var target = this.getTarget();

      if (!target || !dom_contains(document.body, target) || !dom_isVisible(target) || this.dropdownOpen() || (Object(inspect["k" /* isUndefinedOrNull */])(this.title) || this.title === '') && (Object(inspect["k" /* isUndefinedOrNull */])(this.content) || this.content === '')) {
        // If trigger element isn't in the DOM or is not visible, or
        // is on an open dropdown toggle, or has no content, then
        // we exit without showing
        return;
      } // If tip already exists, exit early


      if (this.$_tip || this.localShow) {
        /* istanbul ignore next */
        return;
      } // In the process of showing


      this.localShow = true; // Create a cancelable BvEvent

      var showEvt = this.buildEvent(EVENT_NAME_SHOW, {
        cancelable: true
      });
      this.emitEvent(showEvt); // Don't show if event cancelled

      /* istanbul ignore if */

      if (showEvt.defaultPrevented) {
        // Destroy the template (if for some reason it was created)
        this.destroyTemplate();
        return;
      } // Fix the title attribute on target


      this.fixTitle(); // Set aria-describedby on target

      this.addAriaDescribedby(); // Create and show the tooltip

      this.createTemplateAndShow();
    },
    hide: function hide() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // Hide the tooltip
      var tip = this.getTemplateElement();
      /* istanbul ignore if */

      if (!tip || !this.localShow) {
        this.restoreTitle();
        return;
      } // Emit cancelable BvEvent 'hide'
      // We disable cancelling if `force` is true


      var hideEvt = this.buildEvent(EVENT_NAME_HIDE, {
        cancelable: !force
      });
      this.emitEvent(hideEvt);
      /* istanbul ignore if: ignore for now */

      if (hideEvt.defaultPrevented) {
        // Don't hide if event cancelled
        return;
      } // Tell the template to hide


      this.hideTemplate();
    },
    forceHide: function forceHide() {
      // Forcefully hides/destroys the template, regardless of any active triggers
      var tip = this.getTemplateElement();

      if (!tip || !this.localShow) {
        /* istanbul ignore next */
        return;
      } // Disable while open listeners/watchers
      // This is also done in the template `hide` event handler


      this.setWhileOpenListeners(false); // Clear any hover enter/leave event

      this.clearHoverTimeout();
      this.$_hoverState = '';
      this.clearActiveTriggers(); // Disable the fade animation on the template

      if (this.$_tip) {
        this.$_tip.noFade = true;
      } // Hide the tip (with force = true)


      this.hide(true);
    },
    enable: function enable() {
      this.$_enabled = true; // Create a non-cancelable BvEvent

      this.emitEvent(this.buildEvent(EVENT_NAME_ENABLED));
    },
    disable: function disable() {
      this.$_enabled = false; // Create a non-cancelable BvEvent

      this.emitEvent(this.buildEvent(EVENT_NAME_DISABLED));
    },
    // --- Handlers for template events ---
    // When template is inserted into DOM, but not yet shown
    onTemplateShow: function onTemplateShow() {
      // Enable while open listeners/watchers
      this.setWhileOpenListeners(true);
    },
    // When template show transition completes
    onTemplateShown: function onTemplateShown() {
      var prevHoverState = this.$_hoverState;
      this.$_hoverState = '';
      /* istanbul ignore next: occasional Node 10 coverage error */

      if (prevHoverState === 'out') {
        this.leave(null);
      } // Emit a non-cancelable BvEvent 'shown'


      this.emitEvent(this.buildEvent(EVENT_NAME_SHOWN));
    },
    // When template is starting to hide
    onTemplateHide: function onTemplateHide() {
      // Disable while open listeners/watchers
      this.setWhileOpenListeners(false);
    },
    // When template has completed closing (just before it self destructs)
    onTemplateHidden: function onTemplateHidden() {
      // Destroy the template
      this.destroyTemplate(); // Emit a non-cancelable BvEvent 'shown'

      this.emitEvent(this.buildEvent(EVENT_NAME_HIDDEN));
    },
    // --- Helper methods ---
    getTarget: function getTarget() {
      var target = this.target;

      if (Object(inspect["i" /* isString */])(target)) {
        target = dom_getById(target.replace(/^#/, ''));
      } else if (Object(inspect["d" /* isFunction */])(target)) {
        target = target();
      } else if (target) {
        target = target.$el || target;
      }

      return isElement(target) ? target : null;
    },
    getPlacementTarget: function getPlacementTarget() {
      // This is the target that the tooltip will be placed on, which may not
      // necessarily be the same element that has the trigger event listeners
      // For now, this is the same as target
      // TODO:
      //   Add in child selector support
      //   Add in visibility checks for this element
      //   Fallback to target if not found
      return this.getTarget();
    },
    getTargetId: function getTargetId() {
      // Returns the ID of the trigger element
      var target = this.getTarget();
      return target && target.id ? target.id : null;
    },
    getContainer: function getContainer() {
      // Handle case where container may be a component ref
      var container = this.container ? this.container.$el || this.container : false;
      var body = document.body;
      var target = this.getTarget(); // If we are in a modal, we append to the modal, If we
      // are in a sidebar, we append to the sidebar, else append
      // to body, unless a container is specified
      // TODO:
      //   Template should periodically check to see if it is in dom
      //   And if not, self destruct (if container got v-if'ed out of DOM)
      //   Or this could possibly be part of the visibility check

      return container === false ? closest(CONTAINER_SELECTOR, target) || body :
      /*istanbul ignore next */
      Object(inspect["i" /* isString */])(container) ?
      /*istanbul ignore next */
      dom_getById(container.replace(/^#/, '')) || body :
      /*istanbul ignore next */
      body;
    },
    getBoundary: function getBoundary() {
      return this.boundary ? this.boundary.$el || this.boundary : 'scrollParent';
    },
    isInModal: function isInModal() {
      var target = this.getTarget();
      return target && closest(MODAL_SELECTOR, target);
    },
    isDropdown: function isDropdown() {
      // Returns true if trigger is a dropdown
      var target = this.getTarget();
      return target && hasClass(target, DROPDOWN_CLASS);
    },
    dropdownOpen: function dropdownOpen() {
      // Returns true if trigger is a dropdown and the dropdown menu is open
      var target = this.getTarget();
      return this.isDropdown() && target && dom_select(DROPDOWN_OPEN_SELECTOR, target);
    },
    clearHoverTimeout: function clearHoverTimeout() {
      clearTimeout(this.$_hoverTimeout);
      this.$_hoverTimeout = null;
    },
    clearVisibilityInterval: function clearVisibilityInterval() {
      clearInterval(this.$_visibleInterval);
      this.$_visibleInterval = null;
    },
    clearActiveTriggers: function clearActiveTriggers() {
      for (var trigger in this.activeTrigger) {
        this.activeTrigger[trigger] = false;
      }
    },
    addAriaDescribedby: function addAriaDescribedby() {
      // Add aria-describedby on trigger element, without removing any other IDs
      var target = this.getTarget();
      var desc = getAttr(target, 'aria-describedby') || '';
      desc = desc.split(/\s+/).concat(this.computedId).join(' ').trim(); // Update/add aria-described by

      setAttr(target, 'aria-describedby', desc);
    },
    removeAriaDescribedby: function removeAriaDescribedby() {
      var _this5 = this;

      // Remove aria-describedby on trigger element, without removing any other IDs
      var target = this.getTarget();
      var desc = getAttr(target, 'aria-describedby') || '';
      desc = desc.split(/\s+/).filter(function (d) {
        return d !== _this5.computedId;
      }).join(' ').trim(); // Update or remove aria-describedby

      if (desc) {
        /* istanbul ignore next */
        setAttr(target, 'aria-describedby', desc);
      } else {
        removeAttr(target, 'aria-describedby');
      }
    },
    fixTitle: function fixTitle() {
      // If the target has a `title` attribute,
      // remove it and store it on a data attribute
      var target = this.getTarget();

      if (hasAttr(target, 'title')) {
        // Get `title` attribute value and remove it from target
        var title = getAttr(target, 'title');
        setAttr(target, 'title', ''); // Only set the data attribute when the value is truthy

        if (title) {
          setAttr(target, DATA_TITLE_ATTR, title);
        }
      }
    },
    restoreTitle: function restoreTitle() {
      // If the target had a `title` attribute,
      // restore it and remove the data attribute
      var target = this.getTarget();

      if (hasAttr(target, DATA_TITLE_ATTR)) {
        // Get data attribute value and remove it from target
        var title = getAttr(target, DATA_TITLE_ATTR);
        removeAttr(target, DATA_TITLE_ATTR); // Only restore the `title` attribute when the value is truthy

        if (title) {
          setAttr(target, 'title', title);
        }
      }
    },
    // --- BvEvent helpers ---
    buildEvent: function buildEvent(type) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Defaults to a non-cancellable event
      return new bv_event_class_BvEvent(type, bv_tooltip_objectSpread({
        cancelable: false,
        target: this.getTarget(),
        relatedTarget: this.getTemplateElement() || null,
        componentId: this.computedId,
        vueTarget: this
      }, options));
    },
    emitEvent: function emitEvent(bvEvent) {
      var type = bvEvent.type;
      this.emitOnRoot(events_getRootEventName(this.templateType, type), bvEvent);
      this.$emit(type, bvEvent);
    },
    // --- Event handler setup methods ---
    listen: function listen() {
      var _this6 = this;

      // Enable trigger event handlers
      var el = this.getTarget();

      if (!el) {
        /* istanbul ignore next */
        return;
      } // Listen for global show/hide events


      this.setRootListener(true); // Set up our listeners on the target trigger element

      this.computedTriggers.forEach(function (trigger) {
        if (trigger === 'click') {
          eventOn(el, 'click', _this6.handleEvent, EVENT_OPTIONS_NO_CAPTURE);
        } else if (trigger === 'focus') {
          eventOn(el, 'focusin', _this6.handleEvent, EVENT_OPTIONS_NO_CAPTURE);
          eventOn(el, 'focusout', _this6.handleEvent, EVENT_OPTIONS_NO_CAPTURE);
        } else if (trigger === 'blur') {
          // Used to close $tip when element looses focus

          /* istanbul ignore next */
          eventOn(el, 'focusout', _this6.handleEvent, EVENT_OPTIONS_NO_CAPTURE);
        } else if (trigger === 'hover') {
          eventOn(el, 'mouseenter', _this6.handleEvent, EVENT_OPTIONS_NO_CAPTURE);
          eventOn(el, 'mouseleave', _this6.handleEvent, EVENT_OPTIONS_NO_CAPTURE);
        }
      }, this);
    },

    /* istanbul ignore next */
    unListen: function unListen() {
      var _this7 = this;

      // Remove trigger event handlers
      var events = ['click', 'focusin', 'focusout', 'mouseenter', 'mouseleave'];
      var target = this.getTarget(); // Stop listening for global show/hide/enable/disable events

      this.setRootListener(false); // Clear out any active target listeners

      events.forEach(function (event) {
        target && eventOff(target, event, _this7.handleEvent, EVENT_OPTIONS_NO_CAPTURE);
      }, this);
    },
    setRootListener: function setRootListener(on) {
      // Listen for global `bv::{hide|show}::{tooltip|popover}` hide request event
      var $root = this.$root;

      if ($root) {
        var method = on ? '$on' : '$off';
        var type = this.templateType;
        $root[method](events_getRootActionEventName(type, EVENT_NAME_HIDE), this.doHide);
        $root[method](events_getRootActionEventName(type, EVENT_NAME_SHOW), this.doShow);
        $root[method](events_getRootActionEventName(type, EVENT_NAME_DISABLE), this.doDisable);
        $root[method](events_getRootActionEventName(type, EVENT_NAME_ENABLE), this.doEnable);
      }
    },
    setWhileOpenListeners: function setWhileOpenListeners(on) {
      // Events that are only registered when the template is showing
      // Modal close events
      this.setModalListener(on); // Dropdown open events (if we are attached to a dropdown)

      this.setDropdownListener(on); // Periodic $element visibility check
      // For handling when tip target is in <keepalive>, tabs, carousel, etc

      this.visibleCheck(on); // On-touch start listeners

      this.setOnTouchStartListener(on);
    },
    // Handler for periodic visibility check
    visibleCheck: function visibleCheck(on) {
      var _this8 = this;

      this.clearVisibilityInterval();
      var target = this.getTarget();
      var tip = this.getTemplateElement();

      if (on) {
        this.$_visibleInterval = setInterval(function () {
          if (tip && _this8.localShow && (!target.parentNode || !dom_isVisible(target))) {
            // Target element is no longer visible or not in DOM, so force-hide the tooltip
            _this8.forceHide();
          }
        }, 100);
      }
    },
    setModalListener: function setModalListener(on) {
      // Handle case where tooltip/target is in a modal
      if (this.isInModal()) {
        // We can listen for modal hidden events on `$root`
        this.$root[on ? '$on' : '$off'](ROOT_EVENT_NAME_MODAL_HIDDEN, this.forceHide);
      }
    },

    /* istanbul ignore next: JSDOM doesn't support `ontouchstart` */
    setOnTouchStartListener: function setOnTouchStartListener(on) {
      var _this9 = this;

      // If this is a touch-enabled device we add extra empty
      // `mouseover` listeners to the body's immediate children
      // Only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        Object(array["c" /* from */])(document.body.children).forEach(function (el) {
          eventOnOff(on, el, 'mouseover', _this9.$_noop);
        });
      }
    },
    setDropdownListener: function setDropdownListener(on) {
      var target = this.getTarget();

      if (!target || !this.$root || !this.isDropdown) {
        return;
      } // We can listen for dropdown shown events on its instance
      // TODO:
      //   We could grab the ID from the dropdown, and listen for
      //   $root events for that particular dropdown id
      //   Dropdown shown and hidden events will need to emit
      //   Note: Dropdown auto-ID happens in a `$nextTick()` after mount
      //         So the ID lookup would need to be done in a `$nextTick()`


      if (target.__vue__) {
        target.__vue__[on ? '$on' : '$off'](EVENT_NAME_SHOWN, this.forceHide);
      }
    },
    // --- Event handlers ---
    handleEvent: function handleEvent(event) {
      // General trigger event handler
      // target is the trigger element
      var target = this.getTarget();

      if (!target || isDisabled(target) || !this.$_enabled || this.dropdownOpen()) {
        // If disabled or not enabled, or if a dropdown that is open, don't do anything
        // If tip is shown before element gets disabled, then tip will not
        // close until no longer disabled or forcefully closed
        return;
      }

      var type = event.type;
      var triggers = this.computedTriggers;

      if (type === 'click' && Object(array["a" /* arrayIncludes */])(triggers, 'click')) {
        this.click(event);
      } else if (type === 'mouseenter' && Object(array["a" /* arrayIncludes */])(triggers, 'hover')) {
        // `mouseenter` is a non-bubbling event
        this.enter(event);
      } else if (type === 'focusin' && Object(array["a" /* arrayIncludes */])(triggers, 'focus')) {
        // `focusin` is a bubbling event
        // `event` includes `relatedTarget` (element losing focus)
        this.enter(event);
      } else if (type === 'focusout' && (Object(array["a" /* arrayIncludes */])(triggers, 'focus') || Object(array["a" /* arrayIncludes */])(triggers, 'blur')) || type === 'mouseleave' && Object(array["a" /* arrayIncludes */])(triggers, 'hover')) {
        // `focusout` is a bubbling event
        // `mouseleave` is a non-bubbling event
        // `tip` is the template (will be null if not open)
        var tip = this.getTemplateElement(); // `eventTarget` is the element which is losing focus/hover and

        var eventTarget = event.target; // `relatedTarget` is the element gaining focus/hover

        var relatedTarget = event.relatedTarget;
        /* istanbul ignore next */

        if ( // From tip to target
        tip && dom_contains(tip, eventTarget) && dom_contains(target, relatedTarget) || // From target to tip
        tip && dom_contains(target, eventTarget) && dom_contains(tip, relatedTarget) || // Within tip
        tip && dom_contains(tip, eventTarget) && dom_contains(tip, relatedTarget) || // Within target
        dom_contains(target, eventTarget) && dom_contains(target, relatedTarget)) {
          // If focus/hover moves within `tip` and `target`, don't trigger a leave
          return;
        } // Otherwise trigger a leave


        this.leave(event);
      }
    },
    doHide: function doHide(id) {
      // Programmatically hide tooltip or popover
      if (!id || this.getTargetId() === id || this.computedId === id) {
        // Close all tooltips or popovers, or this specific tip (with ID)
        this.forceHide();
      }
    },
    doShow: function doShow(id) {
      // Programmatically show tooltip or popover
      if (!id || this.getTargetId() === id || this.computedId === id) {
        // Open all tooltips or popovers, or this specific tip (with ID)
        this.show();
      }
    },

    /*istanbul ignore next: ignore for now */
    doDisable: function doDisable(id)
    /*istanbul ignore next: ignore for now */
    {
      // Programmatically disable tooltip or popover
      if (!id || this.getTargetId() === id || this.computedId === id) {
        // Disable all tooltips or popovers (no ID), or this specific tip (with ID)
        this.disable();
      }
    },

    /*istanbul ignore next: ignore for now */
    doEnable: function doEnable(id)
    /*istanbul ignore next: ignore for now */
    {
      // Programmatically enable tooltip or popover
      if (!id || this.getTargetId() === id || this.computedId === id) {
        // Enable all tooltips or popovers (no ID), or this specific tip (with ID)
        this.enable();
      }
    },
    click: function click(event) {
      if (!this.$_enabled || this.dropdownOpen()) {
        /* istanbul ignore next */
        return;
      } // Get around a WebKit bug where `click` does not trigger focus events
      // On most browsers, `click` triggers a `focusin`/`focus` event first
      // Needed so that trigger 'click blur' works on iOS
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/5099
      // We use `currentTarget` rather than `target` to trigger on the
      // element, not the inner content


      attemptFocus(event.currentTarget);
      this.activeTrigger.click = !this.activeTrigger.click;

      if (this.isWithActiveTrigger) {
        this.enter(null);
      } else {
        /* istanbul ignore next */
        this.leave(null);
      }
    },

    /* istanbul ignore next */
    toggle: function toggle() {
      // Manual toggle handler
      if (!this.$_enabled || this.dropdownOpen()) {
        /* istanbul ignore next */
        return;
      } // Should we register as an active trigger?
      // this.activeTrigger.manual = !this.activeTrigger.manual


      if (this.localShow) {
        this.leave(null);
      } else {
        this.enter(null);
      }
    },
    enter: function enter() {
      var _this10 = this;

      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      // Opening trigger handler
      // Note: Click events are sent with event === null
      if (event) {
        this.activeTrigger[event.type === 'focusin' ? 'focus' : 'hover'] = true;
      }
      /* istanbul ignore next */


      if (this.localShow || this.$_hoverState === 'in') {
        this.$_hoverState = 'in';
        return;
      }

      this.clearHoverTimeout();
      this.$_hoverState = 'in';

      if (!this.computedDelay.show) {
        this.show();
      } else {
        // Hide any title attribute while enter delay is active
        this.fixTitle();
        this.$_hoverTimeout = setTimeout(function () {
          /* istanbul ignore else */
          if (_this10.$_hoverState === 'in') {
            _this10.show();
          } else if (!_this10.localShow) {
            _this10.restoreTitle();
          }
        }, this.computedDelay.show);
      }
    },
    leave: function leave() {
      var _this11 = this;

      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      // Closing trigger handler
      // Note: Click events are sent with event === null
      if (event) {
        this.activeTrigger[event.type === 'focusout' ? 'focus' : 'hover'] = false;
        /* istanbul ignore next */

        if (event.type === 'focusout' && Object(array["a" /* arrayIncludes */])(this.computedTriggers, 'blur')) {
          // Special case for `blur`: we clear out the other triggers
          this.activeTrigger.click = false;
          this.activeTrigger.hover = false;
        }
      }
      /* istanbul ignore next: ignore for now */


      if (this.isWithActiveTrigger) {
        return;
      }

      this.clearHoverTimeout();
      this.$_hoverState = 'out';

      if (!this.computedDelay.hide) {
        this.hide();
      } else {
        this.$_hoverTimeout = setTimeout(function () {
          if (_this11.$_hoverState === 'out') {
            _this11.hide();
          }
        }, this.computedDelay.hide);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/directives/tooltip/tooltip.js
function tooltip_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function tooltip_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { tooltip_ownKeys(Object(source), true).forEach(function (key) { tooltip_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { tooltip_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function tooltip_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












 // Key which we use to store tooltip object on element

var BV_TOOLTIP = '__BV_Tooltip__'; // Default trigger

var DefaultTrigger = 'hover focus'; // Valid event triggers

var validTriggers = {
  focus: true,
  hover: true,
  click: true,
  blur: true,
  manual: true
}; // Directive modifier test regular expressions. Pre-compile for performance

var htmlRE = /^html$/i;
var noninteractiveRE = /^noninteractive$/i;
var noFadeRE = /^nofade$/i;
var placementRE = /^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/i;
var boundaryRE = /^(window|viewport|scrollParent)$/i;
var delayRE = /^d\d+$/i;
var delayShowRE = /^ds\d+$/i;
var delayHideRE = /^dh\d+$/i;
var offsetRE = /^o-?\d+$/i;
var variantRE = /^v-.+$/i;
var spacesRE = /\s+/; // Build a Tooltip config based on bindings (if any)
// Arguments and modifiers take precedence over passed value config object

var tooltip_parseBindings = function parseBindings(bindings, vnode)
/* istanbul ignore next: not easy to test */
{
  // We start out with a basic config
  var config = {
    title: undefined,
    trigger: '',
    // Default set below if needed
    placement: 'top',
    fallbackPlacement: 'flip',
    container: false,
    // Default of body
    animation: true,
    offset: 0,
    id: null,
    html: false,
    interactive: true,
    disabled: false,
    delay: Object(utils_config["a" /* getComponentConfig */])(constants_components["e" /* NAME_TOOLTIP */], 'delay', 50),
    boundary: String(Object(utils_config["a" /* getComponentConfig */])(constants_components["e" /* NAME_TOOLTIP */], 'boundary', 'scrollParent')),
    boundaryPadding: Object(number["c" /* toInteger */])(Object(utils_config["a" /* getComponentConfig */])(constants_components["e" /* NAME_TOOLTIP */], 'boundaryPadding', 5), 0),
    variant: Object(utils_config["a" /* getComponentConfig */])(constants_components["e" /* NAME_TOOLTIP */], 'variant'),
    customClass: Object(utils_config["a" /* getComponentConfig */])(constants_components["e" /* NAME_TOOLTIP */], 'customClass')
  }; // Process `bindings.value`

  if (Object(inspect["i" /* isString */])(bindings.value) || Object(inspect["f" /* isNumber */])(bindings.value)) {
    // Value is tooltip content (HTML optionally supported)
    config.title = bindings.value;
  } else if (Object(inspect["d" /* isFunction */])(bindings.value)) {
    // Title generator function
    config.title = bindings.value;
  } else if (Object(inspect["h" /* isPlainObject */])(bindings.value)) {
    // Value is config object, so merge
    config = tooltip_objectSpread(tooltip_objectSpread({}, config), bindings.value);
  } // If title is not provided, try title attribute


  if (Object(inspect["j" /* isUndefined */])(config.title)) {
    // Try attribute
    var data = vnode.data || {};
    config.title = data.attrs && !Object(inspect["k" /* isUndefinedOrNull */])(data.attrs.title) ? data.attrs.title : undefined;
  } // Normalize delay


  if (!Object(inspect["h" /* isPlainObject */])(config.delay)) {
    config.delay = {
      show: Object(number["c" /* toInteger */])(config.delay, 0),
      hide: Object(number["c" /* toInteger */])(config.delay, 0)
    };
  } // If argument, assume element ID of container element


  if (bindings.arg) {
    // Element ID specified as arg
    // We must prepend '#' to become a CSS selector
    config.container = "#".concat(bindings.arg);
  } // Process modifiers


  Object(object["h" /* keys */])(bindings.modifiers).forEach(function (mod) {
    if (htmlRE.test(mod)) {
      // Title allows HTML
      config.html = true;
    } else if (noninteractiveRE.test(mod)) {
      // Noninteractive
      config.interactive = false;
    } else if (noFadeRE.test(mod)) {
      // No animation
      config.animation = false;
    } else if (placementRE.test(mod)) {
      // Placement of tooltip
      config.placement = mod;
    } else if (boundaryRE.test(mod)) {
      // Boundary of tooltip
      mod = mod === 'scrollparent' ? 'scrollParent' : mod;
      config.boundary = mod;
    } else if (delayRE.test(mod)) {
      // Delay value
      var delay = Object(number["c" /* toInteger */])(mod.slice(1), 0);
      config.delay.show = delay;
      config.delay.hide = delay;
    } else if (delayShowRE.test(mod)) {
      // Delay show value
      config.delay.show = Object(number["c" /* toInteger */])(mod.slice(2), 0);
    } else if (delayHideRE.test(mod)) {
      // Delay hide value
      config.delay.hide = Object(number["c" /* toInteger */])(mod.slice(2), 0);
    } else if (offsetRE.test(mod)) {
      // Offset value, negative allowed
      config.offset = Object(number["c" /* toInteger */])(mod.slice(1), 0);
    } else if (variantRE.test(mod)) {
      // Variant
      config.variant = mod.slice(2) || null;
    }
  }); // Special handling of event trigger modifiers trigger is
  // a space separated list

  var selectedTriggers = {}; // Parse current config object trigger

  Object(array["b" /* concat */])(config.trigger || '').filter(identity["a" /* identity */]).join(' ').trim().toLowerCase().split(spacesRE).forEach(function (trigger) {
    if (validTriggers[trigger]) {
      selectedTriggers[trigger] = true;
    }
  }); // Parse modifiers for triggers

  Object(object["h" /* keys */])(bindings.modifiers).forEach(function (mod) {
    mod = mod.toLowerCase();

    if (validTriggers[mod]) {
      // If modifier is a valid trigger
      selectedTriggers[mod] = true;
    }
  }); // Sanitize triggers

  config.trigger = Object(object["h" /* keys */])(selectedTriggers).join(' ');

  if (config.trigger === 'blur') {
    // Blur by itself is useless, so convert it to 'focus'
    config.trigger = 'focus';
  }

  if (!config.trigger) {
    // Use default trigger
    config.trigger = DefaultTrigger;
  } // Return the config


  return config;
}; // Add/update Tooltip on our element


var tooltip_applyTooltip = function applyTooltip(el, bindings, vnode) {
  if (!env["f" /* IS_BROWSER */]) {
    /* istanbul ignore next */
    return;
  }

  var config = tooltip_parseBindings(bindings, vnode);

  if (!el[BV_TOOLTIP]) {
    var $parent = vnode.context;
    el[BV_TOOLTIP] = new BVTooltip({
      parent: $parent,
      // Add the parent's scoped style attribute data
      _scopeId: getScopeId($parent, undefined)
    });
    el[BV_TOOLTIP].__bv_prev_data__ = {};
    el[BV_TOOLTIP].$on(EVENT_NAME_SHOW, function ()
    /* istanbul ignore next: for now */
    {
      // Before showing the tooltip, we update the title if it is a function
      if (Object(inspect["d" /* isFunction */])(config.title)) {
        el[BV_TOOLTIP].updateData({
          title: config.title(el)
        });
      }
    });
  }

  var data = {
    title: config.title,
    triggers: config.trigger,
    placement: config.placement,
    fallbackPlacement: config.fallbackPlacement,
    variant: config.variant,
    customClass: config.customClass,
    container: config.container,
    boundary: config.boundary,
    delay: config.delay,
    offset: config.offset,
    noFade: !config.animation,
    id: config.id,
    interactive: config.interactive,
    disabled: config.disabled,
    html: config.html
  };
  var oldData = el[BV_TOOLTIP].__bv_prev_data__;
  el[BV_TOOLTIP].__bv_prev_data__ = data;

  if (!loose_equal_looseEqual(data, oldData)) {
    // We only update the instance if data has changed
    var newData = {
      target: el
    };
    Object(object["h" /* keys */])(data).forEach(function (prop) {
      // We only pass data properties that have changed
      if (data[prop] !== oldData[prop]) {
        // if title is a function, we execute it here
        newData[prop] = prop === 'title' && Object(inspect["d" /* isFunction */])(data[prop]) ? data[prop](el) : data[prop];
      }
    });
    el[BV_TOOLTIP].updateData(newData);
  }
}; // Remove Tooltip on our element


var removeTooltip = function removeTooltip(el) {
  if (el[BV_TOOLTIP]) {
    el[BV_TOOLTIP].$destroy();
    el[BV_TOOLTIP] = null;
  }

  delete el[BV_TOOLTIP];
}; // Export our directive


var VBTooltip = {
  bind: function bind(el, bindings, vnode) {
    tooltip_applyTooltip(el, bindings, vnode);
  },
  // We use `componentUpdated` here instead of `update`, as the former
  // waits until the containing component and children have finished updating
  componentUpdated: function componentUpdated(el, bindings, vnode) {
    // Performed in a `$nextTick()` to prevent render update loops
    vnode.context.$nextTick(function () {
      tooltip_applyTooltip(el, bindings, vnode);
    });
  },
  unbind: function unbind(el) {
    removeTooltip(el);
  }
};
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/config.js
var constants_config = __webpack_require__("50d3");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/clone-deep.js
var clone_deep = __webpack_require__("c9a9");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/get.js



/**
 * Get property defined by dot/array notation in string, returns undefined if not found
 *
 * @link https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf#gistcomment-1935901
 *
 * @param {Object} obj
 * @param {string|Array} path
 * @return {*}
 */

var get_getRaw = function getRaw(obj, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  // Handle array of path values
  path = Object(inspect["a" /* isArray */])(path) ? path.join('.') : path; // If no path or no object passed

  if (!path || !Object(inspect["g" /* isObject */])(obj)) {
    return defaultValue;
  } // Handle edge case where user has dot(s) in top-level item field key
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2762
  // Switched to `in` operator vs `hasOwnProperty` to handle obj.prototype getters
  // https://github.com/bootstrap-vue/bootstrap-vue/issues/3463


  if (path in obj) {
    return obj[path];
  } // Handle string array notation (numeric indices only)


  path = String(path).replace(regex["a" /* RX_ARRAY_NOTATION */], '.$1');
  var steps = path.split('.').filter(identity["a" /* identity */]); // Handle case where someone passes a string of only dots

  if (steps.length === 0) {
    return defaultValue;
  } // Traverse path in object to find result
  // Switched to `in` operator vs `hasOwnProperty` to handle obj.prototype getters
  // https://github.com/bootstrap-vue/bootstrap-vue/issues/3463


  return steps.every(function (step) {
    return Object(inspect["g" /* isObject */])(obj) && step in obj && !Object(inspect["k" /* isUndefinedOrNull */])(obj = obj[step]);
  }) ? obj : Object(inspect["e" /* isNull */])(obj) ? null : defaultValue;
};
/**
 * Get property defined by dot/array notation in string.
 *
 * @link https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf#gistcomment-1935901
 *
 * @param {Object} obj
 * @param {string|Array} path
 * @param {*} defaultValue (optional)
 * @return {*}
 */

var get_get = function get(obj, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var value = get_getRaw(obj, path);
  return Object(inspect["k" /* isUndefinedOrNull */])(value) ? defaultValue : value;
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/config-set.js
function config_set_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function config_set_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function config_set_createClass(Constructor, protoProps, staticProps) { if (protoProps) config_set_defineProperties(Constructor.prototype, protoProps); if (staticProps) config_set_defineProperties(Constructor, staticProps); return Constructor; }







 // Config manager class

var config_set_BvConfig = /*#__PURE__*/function () {
  function BvConfig() {
    config_set_classCallCheck(this, BvConfig);

    this.$_config = {};
  } // Method to merge in user config parameters


  config_set_createClass(BvConfig, [{
    key: "setConfig",
    value: function setConfig() {
      var _this = this;

      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      /* istanbul ignore next */
      if (!Object(inspect["h" /* isPlainObject */])(config)) {
        return;
      }

      var configKeys = Object(object["f" /* getOwnPropertyNames */])(config);
      configKeys.forEach(function (key) {
        /* istanbul ignore next */
        var subConfig = config[key];

        if (key === 'breakpoints') {
          /* istanbul ignore if */
          if (!Object(inspect["a" /* isArray */])(subConfig) || subConfig.length < 2 || subConfig.some(function (b) {
            return !Object(inspect["i" /* isString */])(b) || b.length === 0;
          })) {
            warn_warn('"breakpoints" must be an array of at least 2 breakpoint names', constants_config["b" /* NAME */]);
          } else {
            _this.$_config[key] = Object(clone_deep["a" /* cloneDeep */])(subConfig);
          }
        } else if (Object(inspect["h" /* isPlainObject */])(subConfig)) {
          // Component prop defaults
          _this.$_config[key] = Object(object["f" /* getOwnPropertyNames */])(subConfig).reduce(function (config, prop) {
            if (!Object(inspect["j" /* isUndefined */])(subConfig[prop])) {
              config[prop] = Object(clone_deep["a" /* cloneDeep */])(subConfig[prop]);
            }

            return config;
          }, _this.$_config[key] || {});
        }
      });
    } // Clear the config

  }, {
    key: "resetConfig",
    value: function resetConfig() {
      this.$_config = {};
    } // Returns a deep copy of the user config

  }, {
    key: "getConfig",
    value: function getConfig() {
      return Object(clone_deep["a" /* cloneDeep */])(this.$_config);
    } // Returns a deep copy of the config value

  }, {
    key: "getConfigValue",
    value: function getConfigValue(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return Object(clone_deep["a" /* cloneDeep */])(get_getRaw(this.$_config, key, defaultValue));
    }
  }]);

  return BvConfig;
}(); // Method for applying a global config


var config_set_setConfig = function setConfig() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var Vue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : vue["b" /* Vue */];
  // Ensure we have a `$bvConfig` Object on the Vue prototype
  // We set on Vue and OurVue just in case consumer has not set an alias of `vue`
  Vue.prototype[constants_config["c" /* PROP_NAME */]] = vue["b" /* Vue */].prototype[constants_config["c" /* PROP_NAME */]] = Vue.prototype[constants_config["c" /* PROP_NAME */]] || vue["b" /* Vue */].prototype[constants_config["c" /* PROP_NAME */]] || new config_set_BvConfig(); // Apply the config values

  Vue.prototype[constants_config["c" /* PROP_NAME */]].setConfig(config);
}; // Method for resetting the user config
// Exported for testing purposes only

var config_set_resetConfig = function resetConfig() {
  if (vue["b" /* Vue */].prototype[constants_config["c" /* PROP_NAME */]] && vue["b" /* Vue */].prototype[constants_config["c" /* PROP_NAME */]].resetConfig) {
    vue["b" /* Vue */].prototype[constants_config["c" /* PROP_NAME */]].resetConfig();
  }
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/plugins.js
function plugins_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function plugins_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { plugins_ownKeys(Object(source), true).forEach(function (key) { plugins_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { plugins_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function plugins_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * Checks if there are multiple instances of Vue, and warns (once) about possible issues.
 * @param {object} Vue
 */

var checkMultipleVue = function () {
  var checkMultipleVueWarned = false;
  var MULTIPLE_VUE_WARNING = ['Multiple instances of Vue detected!', 'You may need to set up an alias for Vue in your bundler config.', 'See: https://bootstrap-vue.org/docs#using-module-bundlers'].join('\n');
  return function (Vue) {
    /* istanbul ignore next */
    if (!checkMultipleVueWarned && vue["b" /* Vue */] !== Vue && !env["g" /* IS_JSDOM */]) {
      warn_warn(MULTIPLE_VUE_WARNING);
    }

    checkMultipleVueWarned = true;
  };
}();
/**
 * Plugin install factory function.
 * @param {object} { components, directives }
 * @returns {function} plugin install function
 */

var plugins_installFactory = function installFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      components = _ref.components,
      directives = _ref.directives,
      plugins = _ref.plugins;

  var install = function install(Vue) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (install.installed) {
      /* istanbul ignore next */
      return;
    }

    install.installed = true;
    checkMultipleVue(Vue);
    config_set_setConfig(config, Vue);
    registerComponents(Vue, components);
    registerDirectives(Vue, directives);
    registerPlugins(Vue, plugins);
  };

  install.installed = false;
  return install;
};
/**
 * Plugin install factory function (no plugin config option).
 * @param {object} { components, directives }
 * @returns {function} plugin install function
 */

var installFactoryNoConfig = function installFactoryNoConfig() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      components = _ref2.components,
      directives = _ref2.directives,
      plugins = _ref2.plugins;

  var install = function install(Vue) {
    if (install.installed) {
      /* istanbul ignore next */
      return;
    }

    install.installed = true;
    checkMultipleVue(Vue);
    registerComponents(Vue, components);
    registerDirectives(Vue, directives);
    registerPlugins(Vue, plugins);
  };

  install.installed = false;
  return install;
};
/**
 * Plugin object factory function.
 * @param {object} { components, directives, plugins }
 * @returns {object} plugin install object
 */

var pluginFactory = function pluginFactory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var extend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return plugins_objectSpread(plugins_objectSpread({}, extend), {}, {
    install: plugins_installFactory(options)
  });
};
/**
 * Plugin object factory function (no config option).
 * @param {object} { components, directives, plugins }
 * @returns {object} plugin install object
 */

var pluginFactoryNoConfig = function pluginFactoryNoConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var extend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return plugins_objectSpread(plugins_objectSpread({}, extend), {}, {
    install: installFactoryNoConfig(options)
  });
};
/**
 * Load a group of plugins.
 * @param {object} Vue
 * @param {object} Plugin definitions
 */

var registerPlugins = function registerPlugins(Vue) {
  var plugins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  for (var plugin in plugins) {
    if (plugin && plugins[plugin]) {
      Vue.use(plugins[plugin]);
    }
  }
};
/**
 * Load a component.
 * @param {object} Vue
 * @param {string} Component name
 * @param {object} Component definition
 */

var registerComponent = function registerComponent(Vue, name, def) {
  if (Vue && name && def) {
    Vue.component(name, def);
  }
};
/**
 * Load a group of components.
 * @param {object} Vue
 * @param {object} Object of component definitions
 */

var registerComponents = function registerComponents(Vue) {
  var components = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  for (var component in components) {
    registerComponent(Vue, component, components[component]);
  }
};
/**
 * Load a directive.
 * @param {object} Vue
 * @param {string} Directive name
 * @param {object} Directive definition
 */

var registerDirective = function registerDirective(Vue, name, def) {
  if (Vue && name && def) {
    // Ensure that any leading V is removed from the
    // name, as Vue adds it automatically
    Vue.directive(name.replace(/^VB/, 'B'), def);
  }
};
/**
 * Load a group of directives.
 * @param {object} Vue
 * @param {object} Object of directive definitions
 */

var registerDirectives = function registerDirectives(Vue) {
  var directives = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  for (var directive in directives) {
    registerDirective(Vue, directive, directives[directive]);
  }
};
/**
 * Install plugin if window.Vue available
 * @param {object} Plugin definition
 */

var plugins_vueUse = function vueUse(VuePlugin) {
  /* istanbul ignore next */
  if (env["e" /* HAS_WINDOW_SUPPORT */] && window.Vue) {
    window.Vue.use(VuePlugin);
  }
  /* istanbul ignore next */


  if (env["e" /* HAS_WINDOW_SUPPORT */] && VuePlugin.NAME) {
    window[VuePlugin.NAME] = VuePlugin;
  }
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/directives/tooltip/index.js


var VBTooltipPlugin = /*#__PURE__*/pluginFactory({
  directives: {
    VBTooltip: VBTooltip
  }
});


/***/ }),

/***/ "c637":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NAME_ALERT */
/* unused harmony export NAME_ASPECT */
/* unused harmony export NAME_AVATAR */
/* unused harmony export NAME_AVATAR_GROUP */
/* unused harmony export NAME_BADGE */
/* unused harmony export NAME_BREADCRUMB */
/* unused harmony export NAME_BREADCRUMB_ITEM */
/* unused harmony export NAME_BREADCRUMB_LINK */
/* unused harmony export NAME_BUTTON */
/* unused harmony export NAME_BUTTON_CLOSE */
/* unused harmony export NAME_BUTTON_GROUP */
/* unused harmony export NAME_BUTTON_TOOLBAR */
/* unused harmony export NAME_CALENDAR */
/* unused harmony export NAME_CARD */
/* unused harmony export NAME_CARD_BODY */
/* unused harmony export NAME_CARD_FOOTER */
/* unused harmony export NAME_CARD_GROUP */
/* unused harmony export NAME_CARD_HEADER */
/* unused harmony export NAME_CARD_IMG */
/* unused harmony export NAME_CARD_IMG_LAZY */
/* unused harmony export NAME_CARD_SUB_TITLE */
/* unused harmony export NAME_CARD_TEXT */
/* unused harmony export NAME_CARD_TITLE */
/* unused harmony export NAME_CAROUSEL */
/* unused harmony export NAME_CAROUSEL_SLIDE */
/* unused harmony export NAME_COL */
/* unused harmony export NAME_COLLAPSE */
/* unused harmony export NAME_CONTAINER */
/* unused harmony export NAME_DROPDOWN */
/* unused harmony export NAME_DROPDOWN_DIVIDER */
/* unused harmony export NAME_DROPDOWN_FORM */
/* unused harmony export NAME_DROPDOWN_GROUP */
/* unused harmony export NAME_DROPDOWN_HEADER */
/* unused harmony export NAME_DROPDOWN_ITEM */
/* unused harmony export NAME_DROPDOWN_ITEM_BUTTON */
/* unused harmony export NAME_DROPDOWN_TEXT */
/* unused harmony export NAME_EMBED */
/* unused harmony export NAME_FORM */
/* unused harmony export NAME_FORM_CHECKBOX */
/* unused harmony export NAME_FORM_CHECKBOX_GROUP */
/* unused harmony export NAME_FORM_DATALIST */
/* unused harmony export NAME_FORM_DATEPICKER */
/* unused harmony export NAME_FORM_FILE */
/* unused harmony export NAME_FORM_GROUP */
/* unused harmony export NAME_FORM_INPUT */
/* unused harmony export NAME_FORM_INVALID_FEEDBACK */
/* unused harmony export NAME_FORM_RADIO */
/* unused harmony export NAME_FORM_RADIO_GROUP */
/* unused harmony export NAME_FORM_RATING */
/* unused harmony export NAME_FORM_ROW */
/* unused harmony export NAME_FORM_SELECT */
/* unused harmony export NAME_FORM_SELECT_OPTION */
/* unused harmony export NAME_FORM_SELECT_OPTION_GROUP */
/* unused harmony export NAME_FORM_SPINBUTTON */
/* unused harmony export NAME_FORM_TAG */
/* unused harmony export NAME_FORM_TAGS */
/* unused harmony export NAME_FORM_TEXT */
/* unused harmony export NAME_FORM_TEXTAREA */
/* unused harmony export NAME_FORM_TIMEPICKER */
/* unused harmony export NAME_FORM_VALID_FEEDBACK */
/* unused harmony export NAME_ICON */
/* unused harmony export NAME_ICONSTACK */
/* unused harmony export NAME_ICON_BASE */
/* unused harmony export NAME_IMG */
/* unused harmony export NAME_IMG_LAZY */
/* unused harmony export NAME_INPUT_GROUP */
/* unused harmony export NAME_INPUT_GROUP_ADDON */
/* unused harmony export NAME_INPUT_GROUP_APPEND */
/* unused harmony export NAME_INPUT_GROUP_PREPEND */
/* unused harmony export NAME_INPUT_GROUP_TEXT */
/* unused harmony export NAME_JUMBOTRON */
/* unused harmony export NAME_LINK */
/* unused harmony export NAME_LIST_GROUP */
/* unused harmony export NAME_LIST_GROUP_ITEM */
/* unused harmony export NAME_MEDIA */
/* unused harmony export NAME_MEDIA_ASIDE */
/* unused harmony export NAME_MEDIA_BODY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NAME_MODAL; });
/* unused harmony export NAME_MSG_BOX */
/* unused harmony export NAME_NAV */
/* unused harmony export NAME_NAVBAR */
/* unused harmony export NAME_NAVBAR_BRAND */
/* unused harmony export NAME_NAVBAR_NAV */
/* unused harmony export NAME_NAVBAR_TOGGLE */
/* unused harmony export NAME_NAV_FORM */
/* unused harmony export NAME_NAV_ITEM */
/* unused harmony export NAME_NAV_ITEM_DROPDOWN */
/* unused harmony export NAME_NAV_TEXT */
/* unused harmony export NAME_OVERLAY */
/* unused harmony export NAME_PAGINATION */
/* unused harmony export NAME_PAGINATION_NAV */
/* unused harmony export NAME_POPOVER */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NAME_PROGRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NAME_PROGRESS_BAR; });
/* unused harmony export NAME_ROW */
/* unused harmony export NAME_SIDEBAR */
/* unused harmony export NAME_SKELETON */
/* unused harmony export NAME_SKELETON_ICON */
/* unused harmony export NAME_SKELETON_IMG */
/* unused harmony export NAME_SKELETON_TABLE */
/* unused harmony export NAME_SKELETON_WRAPPER */
/* unused harmony export NAME_SPINNER */
/* unused harmony export NAME_TAB */
/* unused harmony export NAME_TABLE */
/* unused harmony export NAME_TABLE_CELL */
/* unused harmony export NAME_TABLE_LITE */
/* unused harmony export NAME_TABLE_SIMPLE */
/* unused harmony export NAME_TABS */
/* unused harmony export NAME_TBODY */
/* unused harmony export NAME_TFOOT */
/* unused harmony export NAME_TH */
/* unused harmony export NAME_THEAD */
/* unused harmony export NAME_TIME */
/* unused harmony export NAME_TOAST */
/* unused harmony export NAME_TOASTER */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return NAME_TOOLTIP; });
/* unused harmony export NAME_TR */
/* unused harmony export NAME_COLLAPSE_HELPER */
/* unused harmony export NAME_FORM_BUTTON_LABEL_CONTROL */
/* unused harmony export NAME_FORM_RATING_STAR */
/* unused harmony export NAME_POPOVER_HELPER */
/* unused harmony export NAME_POPOVER_TEMPLATE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NAME_POPPER; });
/* unused harmony export NAME_TAB_BUTTON_HELPER */
/* unused harmony export NAME_TOAST_POP */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return NAME_TOOLTIP_HELPER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return NAME_TOOLTIP_TEMPLATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return NAME_TRANSITION; });
/* unused harmony export NAME_TRANSPORTER */
/* unused harmony export NAME_TRANSPORTER_TARGET */
// Component names
var NAME_ALERT = 'BAlert';
var NAME_ASPECT = 'BAspect';
var NAME_AVATAR = 'BAvatar';
var NAME_AVATAR_GROUP = 'BAvatarGroup';
var NAME_BADGE = 'BBadge';
var NAME_BREADCRUMB = 'BBreadcrumb';
var NAME_BREADCRUMB_ITEM = 'BBreadcrumbItem';
var NAME_BREADCRUMB_LINK = 'BBreadcrumbLink';
var NAME_BUTTON = 'BButton';
var NAME_BUTTON_CLOSE = 'BButtonClose';
var NAME_BUTTON_GROUP = 'BButtonGroup';
var NAME_BUTTON_TOOLBAR = 'BButtonToolbar';
var NAME_CALENDAR = 'BCalendar';
var NAME_CARD = 'BCard';
var NAME_CARD_BODY = 'BCardBody';
var NAME_CARD_FOOTER = 'BCardFooter';
var NAME_CARD_GROUP = 'BCardGroup';
var NAME_CARD_HEADER = 'BCardHeader';
var NAME_CARD_IMG = 'BCardImg';
var NAME_CARD_IMG_LAZY = 'BCardImgLazy';
var NAME_CARD_SUB_TITLE = 'BCardSubTitle';
var NAME_CARD_TEXT = 'BCardText';
var NAME_CARD_TITLE = 'BCardTitle';
var NAME_CAROUSEL = 'BCarousel';
var NAME_CAROUSEL_SLIDE = 'BCarouselSlide';
var NAME_COL = 'BCol';
var NAME_COLLAPSE = 'BCollapse';
var NAME_CONTAINER = 'BContainer';
var NAME_DROPDOWN = 'BDropdown';
var NAME_DROPDOWN_DIVIDER = 'BDropdownDivider';
var NAME_DROPDOWN_FORM = 'BDropdownForm';
var NAME_DROPDOWN_GROUP = 'BDropdownGroup';
var NAME_DROPDOWN_HEADER = 'BDropdownHeader';
var NAME_DROPDOWN_ITEM = 'BDropdownItem';
var NAME_DROPDOWN_ITEM_BUTTON = 'BDropdownItemButton';
var NAME_DROPDOWN_TEXT = 'BDropdownText';
var NAME_EMBED = 'BEmbed';
var NAME_FORM = 'BForm';
var NAME_FORM_CHECKBOX = 'BFormCheckbox';
var NAME_FORM_CHECKBOX_GROUP = 'BFormCheckboxGroup';
var NAME_FORM_DATALIST = 'BFormDatalist';
var NAME_FORM_DATEPICKER = 'BFormDatepicker';
var NAME_FORM_FILE = 'BFormFile';
var NAME_FORM_GROUP = 'BFormGroup';
var NAME_FORM_INPUT = 'BFormInput';
var NAME_FORM_INVALID_FEEDBACK = 'BFormInvalidFeedback';
var NAME_FORM_RADIO = 'BFormRadio';
var NAME_FORM_RADIO_GROUP = 'BFormRadioGroup';
var NAME_FORM_RATING = 'BFormRating';
var NAME_FORM_ROW = 'BFormRow';
var NAME_FORM_SELECT = 'BFormSelect';
var NAME_FORM_SELECT_OPTION = 'BFormSelectOption';
var NAME_FORM_SELECT_OPTION_GROUP = 'BFormSelectOptionGroup';
var NAME_FORM_SPINBUTTON = 'BFormSpinbutton';
var NAME_FORM_TAG = 'BFormTag';
var NAME_FORM_TAGS = 'BFormTags';
var NAME_FORM_TEXT = 'BFormText';
var NAME_FORM_TEXTAREA = 'BFormTextarea';
var NAME_FORM_TIMEPICKER = 'BFormTimepicker';
var NAME_FORM_VALID_FEEDBACK = 'BFormValidFeedback';
var NAME_ICON = 'BIcon';
var NAME_ICONSTACK = 'BIconstack';
var NAME_ICON_BASE = 'BIconBase';
var NAME_IMG = 'BImg';
var NAME_IMG_LAZY = 'BImgLazy';
var NAME_INPUT_GROUP = 'BInputGroup';
var NAME_INPUT_GROUP_ADDON = 'BInputGroupAddon';
var NAME_INPUT_GROUP_APPEND = 'BInputGroupAppend';
var NAME_INPUT_GROUP_PREPEND = 'BInputGroupPrepend';
var NAME_INPUT_GROUP_TEXT = 'BInputGroupText';
var NAME_JUMBOTRON = 'BJumbotron';
var NAME_LINK = 'BLink';
var NAME_LIST_GROUP = 'BListGroup';
var NAME_LIST_GROUP_ITEM = 'BListGroupItem';
var NAME_MEDIA = 'BMedia';
var NAME_MEDIA_ASIDE = 'BMediaAside';
var NAME_MEDIA_BODY = 'BMediaBody';
var NAME_MODAL = 'BModal';
var NAME_MSG_BOX = 'BMsgBox';
var NAME_NAV = 'BNav';
var NAME_NAVBAR = 'BNavbar';
var NAME_NAVBAR_BRAND = 'BNavbarBrand';
var NAME_NAVBAR_NAV = 'BNavbarNav';
var NAME_NAVBAR_TOGGLE = 'BNavbarToggle';
var NAME_NAV_FORM = 'BNavForm';
var NAME_NAV_ITEM = 'BNavItem';
var NAME_NAV_ITEM_DROPDOWN = 'BNavItemDropdown';
var NAME_NAV_TEXT = 'BNavText';
var NAME_OVERLAY = 'BOverlay';
var NAME_PAGINATION = 'BPagination';
var NAME_PAGINATION_NAV = 'BPaginationNav';
var NAME_POPOVER = 'BPopover';
var NAME_PROGRESS = 'BProgress';
var NAME_PROGRESS_BAR = 'BProgressBar';
var NAME_ROW = 'BRow';
var NAME_SIDEBAR = 'BSidebar';
var NAME_SKELETON = 'BSkeleton';
var NAME_SKELETON_ICON = 'BSkeletonIcon';
var NAME_SKELETON_IMG = 'BSkeletonImg';
var NAME_SKELETON_TABLE = 'BSkeletonTable';
var NAME_SKELETON_WRAPPER = 'BSkeletonWrapper';
var NAME_SPINNER = 'BSpinner';
var NAME_TAB = 'BTab';
var NAME_TABLE = 'BTable';
var NAME_TABLE_CELL = 'BTableCell';
var NAME_TABLE_LITE = 'BTableLite';
var NAME_TABLE_SIMPLE = 'BTableSimple';
var NAME_TABS = 'BTabs';
var NAME_TBODY = 'BTbody';
var NAME_TFOOT = 'BTfoot';
var NAME_TH = 'BTh';
var NAME_THEAD = 'BThead';
var NAME_TIME = 'BTime';
var NAME_TOAST = 'BToast';
var NAME_TOASTER = 'BToaster';
var NAME_TOOLTIP = 'BTooltip';
var NAME_TR = 'BTr'; // Helper component names

var NAME_COLLAPSE_HELPER = 'BVCollapse';
var NAME_FORM_BUTTON_LABEL_CONTROL = 'BVFormBtnLabelControl';
var NAME_FORM_RATING_STAR = 'BVFormRatingStar';
var NAME_POPOVER_HELPER = 'BVPopover';
var NAME_POPOVER_TEMPLATE = 'BVPopoverTemplate';
var NAME_POPPER = 'BVPopper';
var NAME_TAB_BUTTON_HELPER = 'BVTabButton';
var NAME_TOAST_POP = 'BVToastPop';
var NAME_TOOLTIP_HELPER = 'BVTooltip';
var NAME_TOOLTIP_TEMPLATE = 'BVTooltipTemplate';
var NAME_TRANSITION = 'BVTransition';
var NAME_TRANSPORTER = 'BVTransporter';
var NAME_TRANSPORTER_TARGET = 'BVTransporterTarget';

/***/ }),

/***/ "c9a9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cloneDeep; });
/* harmony import */ var _inspect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7b1e");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("d82f");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var cloneDeep = function cloneDeep(obj) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : obj;

  if (Object(_inspect__WEBPACK_IMPORTED_MODULE_0__[/* isArray */ "a"])(obj)) {
    return obj.reduce(function (result, val) {
      return [].concat(_toConsumableArray(result), [cloneDeep(val, val)]);
    }, []);
  }

  if (Object(_inspect__WEBPACK_IMPORTED_MODULE_0__[/* isPlainObject */ "h"])(obj)) {
    return Object(_object__WEBPACK_IMPORTED_MODULE_1__[/* keys */ "h"])(obj).reduce(function (result, key) {
      return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, key, cloneDeep(obj[key], obj[key])));
    }, {});
  }

  return defaultValue;
};

/***/ }),

/***/ "ca88":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HTMLElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SVGElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return File; });
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e863");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


/* istanbul ignore next */

var Element = _env__WEBPACK_IMPORTED_MODULE_0__[/* HAS_WINDOW_SUPPORT */ "e"] ? _env__WEBPACK_IMPORTED_MODULE_0__[/* WINDOW */ "h"].Element : /*#__PURE__*/function (_Object) {
  _inherits(Element, _Object);

  var _super = _createSuper(Element);

  function Element() {
    _classCallCheck(this, Element);

    return _super.apply(this, arguments);
  }

  return Element;
}( /*#__PURE__*/_wrapNativeSuper(Object));
/* istanbul ignore next */

var HTMLElement = _env__WEBPACK_IMPORTED_MODULE_0__[/* HAS_WINDOW_SUPPORT */ "e"] ? _env__WEBPACK_IMPORTED_MODULE_0__[/* WINDOW */ "h"].HTMLElement : /*#__PURE__*/function (_Element) {
  _inherits(HTMLElement, _Element);

  var _super2 = _createSuper(HTMLElement);

  function HTMLElement() {
    _classCallCheck(this, HTMLElement);

    return _super2.apply(this, arguments);
  }

  return HTMLElement;
}(Element);
/* istanbul ignore next */

var SVGElement = _env__WEBPACK_IMPORTED_MODULE_0__[/* HAS_WINDOW_SUPPORT */ "e"] ? _env__WEBPACK_IMPORTED_MODULE_0__[/* WINDOW */ "h"].SVGElement : /*#__PURE__*/function (_Element2) {
  _inherits(SVGElement, _Element2);

  var _super3 = _createSuper(SVGElement);

  function SVGElement() {
    _classCallCheck(this, SVGElement);

    return _super3.apply(this, arguments);
  }

  return SVGElement;
}(Element);
/* istanbul ignore next */

var File = _env__WEBPACK_IMPORTED_MODULE_0__[/* HAS_WINDOW_SUPPORT */ "e"] ? _env__WEBPACK_IMPORTED_MODULE_0__[/* WINDOW */ "h"].File : /*#__PURE__*/function (_Object2) {
  _inherits(File, _Object2);

  var _super4 = _createSuper(File);

  function File() {
    _classCallCheck(this, File);

    return _super4.apply(this, arguments);
  }

  return File;
}( /*#__PURE__*/_wrapNativeSuper(Object));

/***/ }),

/***/ "cf757":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export prefixPropName */
/* unused harmony export unprefixPropName */
/* unused harmony export suffixPropName */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return makeProp; });
/* unused harmony export copyProps */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return pluckProps; });
/* unused harmony export makePropConfigurable */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return makePropsConfigurable; });
/* unused harmony export hasPropFunction */
/* harmony import */ var _constants_props__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a723");
/* harmony import */ var _clone_deep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("c9a9");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("228e");
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("6c06");
/* harmony import */ var _inspect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7b1e");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("d82f");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("fa73");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







 // Prefix a property

var prefixPropName = function prefixPropName(prefix, value) {
  return prefix + Object(_string__WEBPACK_IMPORTED_MODULE_6__[/* upperFirst */ "d"])(value);
}; // Remove a prefix from a property

var unprefixPropName = function unprefixPropName(prefix, value) {
  return Object(_string__WEBPACK_IMPORTED_MODULE_6__[/* lowerFirst */ "b"])(value.replace(prefix, ''));
}; // Suffix can be a falsey value so nothing is appended to string
// (helps when looping over props & some shouldn't change)
// Use data last parameters to allow for currying

var suffixPropName = function suffixPropName(suffix, value) {
  return value + (suffix ? Object(_string__WEBPACK_IMPORTED_MODULE_6__[/* upperFirst */ "d"])(suffix) : '');
}; // Generates a prop object

var makeProp = function makeProp() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants_props__WEBPACK_IMPORTED_MODULE_0__[/* PROP_TYPE_ANY */ "a"];
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var requiredOrValidator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var validator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var required = requiredOrValidator === true;
  validator = required ? validator : requiredOrValidator;
  return _objectSpread(_objectSpread(_objectSpread({}, type ? {
    type: type
  } : {}), required ? {
    required: required
  } : Object(_inspect__WEBPACK_IMPORTED_MODULE_4__[/* isUndefined */ "j"])(value) ? {} : {
    default: Object(_inspect__WEBPACK_IMPORTED_MODULE_4__[/* isObject */ "g"])(value) ? function () {
      return value;
    } : value
  }), Object(_inspect__WEBPACK_IMPORTED_MODULE_4__[/* isUndefined */ "j"])(validator) ? {} : {
    validator: validator
  });
}; // Copies props from one array/object to a new array/object
// Prop values are also cloned as new references to prevent possible
// mutation of original prop object values
// Optionally accepts a function to transform the prop name

var copyProps = function copyProps(props) {
  var transformFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _identity__WEBPACK_IMPORTED_MODULE_3__[/* identity */ "a"];

  if (Object(_inspect__WEBPACK_IMPORTED_MODULE_4__[/* isArray */ "a"])(props)) {
    return props.map(transformFn);
  }

  var copied = {};

  for (var prop in props) {
    /* istanbul ignore else */
    if (Object(_object__WEBPACK_IMPORTED_MODULE_5__[/* hasOwnProperty */ "g"])(props, prop)) {
      // If the prop value is an object, do a shallow clone
      // to prevent potential mutations to the original object
      copied[transformFn(prop)] = Object(_inspect__WEBPACK_IMPORTED_MODULE_4__[/* isObject */ "g"])(props[prop]) ? Object(_object__WEBPACK_IMPORTED_MODULE_5__[/* clone */ "b"])(props[prop]) : props[prop];
    }
  }

  return copied;
}; // Given an array of properties or an object of property keys,
// plucks all the values off the target object, returning a new object
// that has props that reference the original prop values

var pluckProps = function pluckProps(keysToPluck, objToPluck) {
  var transformFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _identity__WEBPACK_IMPORTED_MODULE_3__[/* identity */ "a"];
  return (Object(_inspect__WEBPACK_IMPORTED_MODULE_4__[/* isArray */ "a"])(keysToPluck) ? keysToPluck.slice() : Object(_object__WEBPACK_IMPORTED_MODULE_5__[/* keys */ "h"])(keysToPluck)).reduce(function (memo, prop) {
    memo[transformFn(prop)] = objToPluck[prop];
    return memo;
  }, {});
}; // Make a prop object configurable by global configuration
// Replaces the current `default` key of each prop with a `getComponentConfig()`
// call that falls back to the current default value of the prop

var makePropConfigurable = function makePropConfigurable(prop, key, componentKey) {
  return _objectSpread(_objectSpread({}, Object(_clone_deep__WEBPACK_IMPORTED_MODULE_1__[/* cloneDeep */ "a"])(prop)), {}, {
    default: function bvConfigurablePropDefault() {
      var value = Object(_config__WEBPACK_IMPORTED_MODULE_2__[/* getComponentConfig */ "a"])(componentKey, key, prop.default);
      return Object(_inspect__WEBPACK_IMPORTED_MODULE_4__[/* isFunction */ "d"])(value) ? value() : value;
    }
  });
}; // Make a props object configurable by global configuration
// Replaces the current `default` key of each prop with a `getComponentConfig()`
// call that falls back to the current default value of the prop

var makePropsConfigurable = function makePropsConfigurable(props, componentKey) {
  return Object(_object__WEBPACK_IMPORTED_MODULE_5__[/* keys */ "h"])(props).reduce(function (result, key) {
    return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, key, makePropConfigurable(props[key], key, componentKey)));
  }, {});
}; // Get function name we use in `makePropConfigurable()`
// for the prop default value override to compare
// against in `hasPropFunction()`

var configurablePropDefaultFnName = makePropConfigurable({}, '', '').default.name; // Detect wether the given value is currently a function
// and isn't the props default function

var hasPropFunction = function hasPropFunction(fn) {
  return Object(_inspect__WEBPACK_IMPORTED_MODULE_4__[/* isFunction */ "d"])(fn) && fn.name !== configurablePropDefaultFnName;
};

/***/ }),

/***/ "d82f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return defineProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return defineProperty; });
/* unused harmony export freeze */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getOwnPropertyNames; });
/* unused harmony export getOwnPropertyDescriptor */
/* unused harmony export getOwnPropertySymbols */
/* unused harmony export getPrototypeOf */
/* unused harmony export is */
/* unused harmony export isFrozen */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return hasOwnProperty; });
/* unused harmony export toString */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return clone; });
/* unused harmony export pick */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return omit; });
/* unused harmony export mergeDeep */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return sortKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return readonlyDescriptor; });
/* harmony import */ var _inspect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7b1e");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // --- Static ---

var assign = function assign() {
  return Object.assign.apply(Object, arguments);
};
var create = function create(proto, optionalProps) {
  return Object.create(proto, optionalProps);
};
var defineProperties = function defineProperties(obj, props) {
  return Object.defineProperties(obj, props);
};
var defineProperty = function defineProperty(obj, prop, descriptor) {
  return Object.defineProperty(obj, prop, descriptor);
};
var freeze = function freeze(obj) {
  return Object.freeze(obj);
};
var getOwnPropertyNames = function getOwnPropertyNames(obj) {
  return Object.getOwnPropertyNames(obj);
};
var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(obj, prop) {
  return Object.getOwnPropertyDescriptor(obj, prop);
};
var getOwnPropertySymbols = function getOwnPropertySymbols(obj) {
  return Object.getOwnPropertySymbols(obj);
};
var getPrototypeOf = function getPrototypeOf(obj) {
  return Object.getPrototypeOf(obj);
};
var is = function is(value1, value2) {
  return Object.is(value1, value2);
};
var isFrozen = function isFrozen(obj) {
  return Object.isFrozen(obj);
};
var keys = function keys(obj) {
  return Object.keys(obj);
}; // --- "Instance" ---

var hasOwnProperty = function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
var toString = function toString(obj) {
  return Object.prototype.toString.call(obj);
}; // --- Utilities ---
// Shallow copy an object

var clone = function clone(obj) {
  return _objectSpread({}, obj);
}; // Return a shallow copy of object with the specified properties only
// See: https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc

var pick = function pick(obj, props) {
  return keys(obj).filter(function (key) {
    return props.indexOf(key) !== -1;
  }).reduce(function (result, key) {
    return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, key, obj[key]));
  }, {});
}; // Return a shallow copy of object with the specified properties omitted
// See: https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc

var omit = function omit(obj, props) {
  return keys(obj).filter(function (key) {
    return props.indexOf(key) === -1;
  }).reduce(function (result, key) {
    return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, key, obj[key]));
  }, {});
}; // Merges two object deeply together
// See: https://gist.github.com/Salakar/1d7137de9cb8b704e48a

var mergeDeep = function mergeDeep(target, source) {
  if (Object(_inspect__WEBPACK_IMPORTED_MODULE_0__[/* isObject */ "g"])(target) && Object(_inspect__WEBPACK_IMPORTED_MODULE_0__[/* isObject */ "g"])(source)) {
    keys(source).forEach(function (key) {
      if (Object(_inspect__WEBPACK_IMPORTED_MODULE_0__[/* isObject */ "g"])(source[key])) {
        if (!target[key] || !Object(_inspect__WEBPACK_IMPORTED_MODULE_0__[/* isObject */ "g"])(target[key])) {
          target[key] = source[key];
        }

        mergeDeep(target[key], source[key]);
      } else {
        assign(target, _defineProperty({}, key, source[key]));
      }
    });
  }

  return target;
}; // Returns a shallow copy of the object with keys in sorted order

var sortKeys = function sortKeys(obj) {
  return keys(obj).sort().reduce(function (result, key) {
    return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, key, obj[key]));
  }, {});
}; // Convenience method to create a read-only descriptor

var readonlyDescriptor = function readonlyDescriptor() {
  return {
    enumerable: true,
    configurable: false,
    writable: false
  };
};

/***/ }),

/***/ "e863":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return HAS_WINDOW_SUPPORT; });
/* unused harmony export HAS_DOCUMENT_SUPPORT */
/* unused harmony export HAS_NAVIGATOR_SUPPORT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return HAS_PROMISE_SUPPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HAS_MUTATION_OBSERVER_SUPPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return IS_BROWSER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return WINDOW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DOCUMENT; });
/* unused harmony export NAVIGATOR */
/* unused harmony export USER_AGENT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return IS_JSDOM; });
/* unused harmony export IS_IE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HAS_PASSIVE_EVENT_SUPPORT; });
/* unused harmony export HAS_TOUCH_SUPPORT */
/* unused harmony export HAS_POINTER_EVENT_SUPPORT */
/* unused harmony export HAS_INTERACTION_OBSERVER_SUPPORT */
var HAS_WINDOW_SUPPORT = typeof window !== 'undefined';
var HAS_DOCUMENT_SUPPORT = typeof document !== 'undefined';
var HAS_NAVIGATOR_SUPPORT = typeof navigator !== 'undefined';
var HAS_PROMISE_SUPPORT = typeof Promise !== 'undefined';
/* istanbul ignore next: JSDOM always returns false */

var HAS_MUTATION_OBSERVER_SUPPORT = typeof MutationObserver !== 'undefined' || typeof WebKitMutationObserver !== 'undefined' || typeof MozMutationObserver !== 'undefined';
var IS_BROWSER = HAS_WINDOW_SUPPORT && HAS_DOCUMENT_SUPPORT && HAS_NAVIGATOR_SUPPORT;
var WINDOW = HAS_WINDOW_SUPPORT ? window : {};
var DOCUMENT = HAS_DOCUMENT_SUPPORT ? document : {};
var NAVIGATOR = HAS_NAVIGATOR_SUPPORT ? navigator : {};
var USER_AGENT = (NAVIGATOR.USER_AGENT || '').toLowerCase();
var IS_JSDOM = USER_AGENT.indexOf('jsdom') > 0;
var IS_IE = /msie|trident/.test(USER_AGENT); // Determine if the browser supports the option passive for events

var HAS_PASSIVE_EVENT_SUPPORT = function () {
  var passiveEventSupported = false;

  if (IS_BROWSER) {
    try {
      var options = {
        // This function will be called when the browser
        // attempts to access the passive property
        get passive() {
          /* istanbul ignore next: will never be called in JSDOM */
          passiveEventSupported = true;
        }

      };
      WINDOW.addEventListener('test', options, options);
      WINDOW.removeEventListener('test', options, options);
    } catch (_unused) {
      /* istanbul ignore next: will never be called in JSDOM */
      passiveEventSupported = false;
    }
  }

  return passiveEventSupported;
}();
var HAS_TOUCH_SUPPORT = IS_BROWSER && ('ontouchstart' in DOCUMENT.documentElement || NAVIGATOR.maxTouchPoints > 0);
var HAS_POINTER_EVENT_SUPPORT = IS_BROWSER && Boolean(WINDOW.PointerEvent || WINDOW.MSPointerEvent);
/* istanbul ignore next: JSDOM only checks for 'IntersectionObserver' */

var HAS_INTERACTION_OBSERVER_SUPPORT = IS_BROWSER && 'IntersectionObserver' in WINDOW && 'IntersectionObserverEntry' in WINDOW && // Edge 15 and UC Browser lack support for `isIntersecting`
// but we an use `intersectionRatio > 0` instead
// 'isIntersecting' in window.IntersectionObserverEntry.prototype &&
'intersectionRatio' in WINDOW.IntersectionObserverEntry.prototype;

/***/ }),

/***/ "ebc7":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @license MIT
 */
(function(window, document, undefined) {'use strict';
  if (!window || !document) {
    console.warn('Flowjs needs window and document objects to work');
    return;
  }
  // ie10+
  var ie10plus = window.navigator.msPointerEnabled;
  /**
   * Flow.js is a library providing multiple simultaneous, stable and
   * resumable uploads via the HTML5 File API.
   * @param [opts]
   * @param {number|Function} [opts.chunkSize]
   * @param {bool} [opts.forceChunkSize]
   * @param {number} [opts.simultaneousUploads]
   * @param {bool} [opts.singleFile]
   * @param {string} [opts.fileParameterName]
   * @param {number} [opts.progressCallbacksInterval]
   * @param {number} [opts.speedSmoothingFactor]
   * @param {Object|Function} [opts.query]
   * @param {Object|Function} [opts.headers]
   * @param {bool} [opts.withCredentials]
   * @param {Function} [opts.preprocess]
   * @param {string} [opts.method]
   * @param {string|Function} [opts.testMethod]
   * @param {string|Function} [opts.uploadMethod]
   * @param {bool} [opts.prioritizeFirstAndLastChunk]
   * @param {bool} [opts.allowDuplicateUploads]
   * @param {string|Function} [opts.target]
   * @param {number} [opts.maxChunkRetries]
   * @param {number} [opts.chunkRetryInterval]
   * @param {Array.<number>} [opts.permanentErrors]
   * @param {Array.<number>} [opts.successStatuses]
   * @param {Function} [opts.initFileFn]
   * @param {Function} [opts.readFileFn]
   * @param {Function} [opts.generateUniqueIdentifier]
   * @constructor
   */
  function Flow(opts) {
    /**
     * Supported by browser?
     * @type {boolean}
     */
    this.support = (
        typeof File !== 'undefined' &&
        typeof Blob !== 'undefined' &&
        typeof FileList !== 'undefined' &&
        (
          !!Blob.prototype.slice || !!Blob.prototype.webkitSlice || !!Blob.prototype.mozSlice ||
          false
        ) // slicing files support
    );

    if (!this.support) {
      return ;
    }

    /**
     * Check if directory upload is supported
     * @type {boolean}
     */
    this.supportDirectory = (
        /Chrome/.test(window.navigator.userAgent) ||
        /Firefox/.test(window.navigator.userAgent) ||
        /Edge/.test(window.navigator.userAgent)
    );

    /**
     * List of FlowFile objects
     * @type {Array.<FlowFile>}
     */
    this.files = [];

    /**
     * Default options for flow.js
     * @type {Object}
     */
    this.defaults = {
      chunkSize: 1024 * 1024,
      forceChunkSize: false,
      simultaneousUploads: 3,
      singleFile: false,
      fileParameterName: 'file',
      progressCallbacksInterval: 500,
      speedSmoothingFactor: 0.1,
      query: {},
      headers: {},
      withCredentials: false,
      preprocess: null,
      changeRawDataBeforeSend: null,
      method: 'multipart',
      testMethod: 'GET',
      uploadMethod: 'POST',
      prioritizeFirstAndLastChunk: false,
      allowDuplicateUploads: false,
      target: '/',
      testChunks: true,
      generateUniqueIdentifier: null,
      maxChunkRetries: 0,
      chunkRetryInterval: null,
      permanentErrors: [404, 413, 415, 500, 501],
      successStatuses: [200, 201, 202],
      onDropStopPropagation: false,
      initFileFn: null,
      readFileFn: webAPIFileRead
    };

    /**
     * Current options
     * @type {Object}
     */
    this.opts = {};

    /**
     * List of events:
     *  key stands for event name
     *  value array list of callbacks
     * @type {}
     */
    this.events = {};

    var $ = this;

    /**
     * On drop event
     * @function
     * @param {MouseEvent} event
     */
    this.onDrop = function (event) {
      if ($.opts.onDropStopPropagation) {
        event.stopPropagation();
      }
      event.preventDefault();
      var dataTransfer = event.dataTransfer;
      if (dataTransfer.items && dataTransfer.items[0] &&
        dataTransfer.items[0].webkitGetAsEntry) {
        $.webkitReadDataTransfer(event);
      } else {
        $.addFiles(dataTransfer.files, event);
      }
    };

    /**
     * Prevent default
     * @function
     * @param {MouseEvent} event
     */
    this.preventEvent = function (event) {
      event.preventDefault();
    };


    /**
     * Current options
     * @type {Object}
     */
    this.opts = Flow.extend({}, this.defaults, opts || {});

  }

  Flow.prototype = {
    /**
     * Set a callback for an event, possible events:
     * fileSuccess(file), fileProgress(file), fileAdded(file, event),
     * fileRemoved(file), fileRetry(file), fileError(file, message),
     * complete(), progress(), error(message, file), pause()
     * @function
     * @param {string} event
     * @param {Function} callback
     */
    on: function (event, callback) {
      event = event.toLowerCase();
      if (!this.events.hasOwnProperty(event)) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    },

    /**
     * Remove event callback
     * @function
     * @param {string} [event] removes all events if not specified
     * @param {Function} [fn] removes all callbacks of event if not specified
     */
    off: function (event, fn) {
      if (event !== undefined) {
        event = event.toLowerCase();
        if (fn !== undefined) {
          if (this.events.hasOwnProperty(event)) {
            arrayRemove(this.events[event], fn);
          }
        } else {
          delete this.events[event];
        }
      } else {
        this.events = {};
      }
    },

    /**
     * Fire an event
     * @function
     * @param {string} event event name
     * @param {...} args arguments of a callback
     * @return {bool} value is false if at least one of the event handlers which handled this event
     * returned false. Otherwise it returns true.
     */
    fire: function (event, args) {
      // `arguments` is an object, not array, in FF, so:
      args = Array.prototype.slice.call(arguments);
      event = event.toLowerCase();
      var preventDefault = false;
      if (this.events.hasOwnProperty(event)) {
        each(this.events[event], function (callback) {
          preventDefault = callback.apply(this, args.slice(1)) === false || preventDefault;
        }, this);
      }
      if (event != 'catchall') {
        args.unshift('catchAll');
        preventDefault = this.fire.apply(this, args) === false || preventDefault;
      }
      return !preventDefault;
    },

    /**
     * Read webkit dataTransfer object
     * @param event
     */
    webkitReadDataTransfer: function (event) {
      var $ = this;
      var queue = event.dataTransfer.items.length;
      var files = [];
      each(event.dataTransfer.items, function (item) {
        var entry = item.webkitGetAsEntry();
        if (!entry) {
          decrement();
          return ;
        }
        if (entry.isFile) {
          // due to a bug in Chrome's File System API impl - #149735
          fileReadSuccess(item.getAsFile(), entry.fullPath);
        } else {
          readDirectory(entry.createReader());
        }
      });
      function readDirectory(reader) {
        reader.readEntries(function (entries) {
          if (entries.length) {
            queue += entries.length;
            each(entries, function(entry) {
              if (entry.isFile) {
                var fullPath = entry.fullPath;
                entry.file(function (file) {
                  fileReadSuccess(file, fullPath);
                }, readError);
              } else if (entry.isDirectory) {
                readDirectory(entry.createReader());
              }
            });
            readDirectory(reader);
          } else {
            decrement();
          }
        }, readError);
      }
      function fileReadSuccess(file, fullPath) {
        // relative path should not start with "/"
        file.relativePath = fullPath.substring(1);
        files.push(file);
        decrement();
      }
      function readError(fileError) {
        decrement();
        throw fileError;
      }
      function decrement() {
        if (--queue == 0) {
          $.addFiles(files, event);
        }
      }
    },

    /**
     * Generate unique identifier for a file
     * @function
     * @param {FlowFile} file
     * @returns {string}
     */
    generateUniqueIdentifier: function (file) {
      var custom = this.opts.generateUniqueIdentifier;
      if (typeof custom === 'function') {
        return custom(file);
      }
      // Some confusion in different versions of Firefox
      var relativePath = file.relativePath || file.webkitRelativePath || file.fileName || file.name;
      return file.size + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/img, '');
    },

    /**
     * Upload next chunk from the queue
     * @function
     * @returns {boolean}
     * @private
     */
    uploadNextChunk: function (preventEvents) {
      // In some cases (such as videos) it's really handy to upload the first
      // and last chunk of a file quickly; this let's the server check the file's
      // metadata and determine if there's even a point in continuing.
      var found = false;
      if (this.opts.prioritizeFirstAndLastChunk) {
        each(this.files, function (file) {
          if (!file.paused && file.chunks.length &&
            file.chunks[0].status() === 'pending') {
            file.chunks[0].send();
            found = true;
            return false;
          }
          if (!file.paused && file.chunks.length > 1 &&
            file.chunks[file.chunks.length - 1].status() === 'pending') {
            file.chunks[file.chunks.length - 1].send();
            found = true;
            return false;
          }
        });
        if (found) {
          return found;
        }
      }

      // Now, simply look for the next, best thing to upload
      each(this.files, function (file) {
        if (!file.paused) {
          each(file.chunks, function (chunk) {
            if (chunk.status() === 'pending') {
              chunk.send();
              found = true;
              return false;
            }
          });
        }
        if (found) {
          return false;
        }
      });
      if (found) {
        return true;
      }

      // The are no more outstanding chunks to upload, check is everything is done
      var outstanding = false;
      each(this.files, function (file) {
        if (!file.isComplete()) {
          outstanding = true;
          return false;
        }
      });
      if (!outstanding && !preventEvents) {
        // All chunks have been uploaded, complete
        async(function () {
          this.fire('complete');
        }, this);
      }
      return false;
    },


    /**
     * Assign a browse action to one or more DOM nodes.
     * @function
     * @param {Element|Array.<Element>} domNodes
     * @param {boolean} isDirectory Pass in true to allow directories to
     * @param {boolean} singleFile prevent multi file upload
     * @param {Object} attributes set custom attributes:
     *  http://www.w3.org/TR/html-markup/input.file.html#input.file-attributes
     *  eg: accept: 'image/*'
     * be selected (Chrome only).
     */
    assignBrowse: function (domNodes, isDirectory, singleFile, attributes) {
      if (domNodes instanceof Element) {
        domNodes = [domNodes];
      }

      each(domNodes, function (domNode) {
        var input;
        if (domNode.tagName === 'INPUT' && domNode.type === 'file') {
          input = domNode;
        } else {
          input = document.createElement('input');
          input.setAttribute('type', 'file');
          // display:none - not working in opera 12
          extend(input.style, {
            visibility: 'hidden',
            position: 'absolute',
            width: '1px',
            height: '1px'
          });
          // for opera 12 browser, input must be assigned to a document
          domNode.appendChild(input);
          // https://developer.mozilla.org/en/using_files_from_web_applications)
          // event listener is executed two times
          // first one - original mouse click event
          // second - input.click(), input is inside domNode
          domNode.addEventListener('click', function() {
            input.click();
          }, false);
        }
        if (!this.opts.singleFile && !singleFile) {
          input.setAttribute('multiple', 'multiple');
        }
        if (isDirectory) {
          input.setAttribute('webkitdirectory', 'webkitdirectory');
        }
        each(attributes, function (value, key) {
          input.setAttribute(key, value);
        });
        // When new files are added, simply append them to the overall list
        var $ = this;
        input.addEventListener('change', function (e) {
       	  if (e.target.value) {
            $.addFiles(e.target.files, e);
            e.target.value = '';
       	  }
        }, false);
      }, this);
    },

    /**
     * Assign one or more DOM nodes as a drop target.
     * @function
     * @param {Element|Array.<Element>} domNodes
     */
    assignDrop: function (domNodes) {
      if (typeof domNodes.length === 'undefined') {
        domNodes = [domNodes];
      }
      each(domNodes, function (domNode) {
        domNode.addEventListener('dragover', this.preventEvent, false);
        domNode.addEventListener('dragenter', this.preventEvent, false);
        domNode.addEventListener('drop', this.onDrop, false);
      }, this);
    },

    /**
     * Un-assign drop event from DOM nodes
     * @function
     * @param domNodes
     */
    unAssignDrop: function (domNodes) {
      if (typeof domNodes.length === 'undefined') {
        domNodes = [domNodes];
      }
      each(domNodes, function (domNode) {
        domNode.removeEventListener('dragover', this.preventEvent);
        domNode.removeEventListener('dragenter', this.preventEvent);
        domNode.removeEventListener('drop', this.onDrop);
      }, this);
    },

    /**
     * Returns a boolean indicating whether or not the instance is currently
     * uploading anything.
     * @function
     * @returns {boolean}
     */
    isUploading: function () {
      var uploading = false;
      each(this.files, function (file) {
        if (file.isUploading()) {
          uploading = true;
          return false;
        }
      });
      return uploading;
    },

    /**
     * should upload next chunk
     * @function
     * @returns {boolean|number}
     */
    _shouldUploadNext: function () {
      var num = 0;
      var should = true;
      var simultaneousUploads = this.opts.simultaneousUploads;
      each(this.files, function (file) {
        each(file.chunks, function(chunk) {
          if (chunk.status() === 'uploading') {
            num++;
            if (num >= simultaneousUploads) {
              should = false;
              return false;
            }
          }
        });
      });
      // if should is true then return uploading chunks's length
      return should && num;
    },

    /**
     * Start or resume uploading.
     * @function
     */
    upload: function () {
      // Make sure we don't start too many uploads at once
      var ret = this._shouldUploadNext();
      if (ret === false) {
        return;
      }
      // Kick off the queue
      this.fire('uploadStart');
      var started = false;
      for (var num = 1; num <= this.opts.simultaneousUploads - ret; num++) {
        started = this.uploadNextChunk(true) || started;
      }
      if (!started) {
        async(function () {
          this.fire('complete');
        }, this);
      }
    },

    /**
     * Resume uploading.
     * @function
     */
    resume: function () {
      each(this.files, function (file) {
        if (!file.isComplete()) {
          file.resume();
        }
      });
    },

    /**
     * Pause uploading.
     * @function
     */
    pause: function () {
      each(this.files, function (file) {
        file.pause();
      });
    },

    /**
     * Cancel upload of all FlowFile objects and remove them from the list.
     * @function
     */
    cancel: function () {
      for (var i = this.files.length - 1; i >= 0; i--) {
        this.files[i].cancel();
      }
    },

    /**
     * Returns a number between 0 and 1 indicating the current upload progress
     * of all files.
     * @function
     * @returns {number}
     */
    progress: function () {
      var totalDone = 0;
      var totalSize = 0;
      // Resume all chunks currently being uploaded
      each(this.files, function (file) {
        totalDone += file.progress() * file.size;
        totalSize += file.size;
      });
      return totalSize > 0 ? totalDone / totalSize : 0;
    },

    /**
     * Add a HTML5 File object to the list of files.
     * @function
     * @param {File} file
     * @param {Event} [event] event is optional
     */
    addFile: function (file, event) {
      this.addFiles([file], event);
    },

    /**
     * Add a HTML5 File object to the list of files.
     * @function
     * @param {FileList|Array} fileList
     * @param {Event} [event] event is optional
     */
    addFiles: function (fileList, event) {
      var files = [];
      each(fileList, function (file) {
        // https://github.com/flowjs/flow.js/issues/55
        if ((!ie10plus || ie10plus && file.size > 0) && !(file.size % 4096 === 0 && (file.name === '.' || file.fileName === '.'))) {
          var uniqueIdentifier = this.generateUniqueIdentifier(file);
          if (this.opts.allowDuplicateUploads || !this.getFromUniqueIdentifier(uniqueIdentifier)) {
            var f = new FlowFile(this, file, uniqueIdentifier);
            if (this.fire('fileAdded', f, event)) {
              files.push(f);
            }
          }
        }
      }, this);
      if (this.fire('filesAdded', files, event)) {
        each(files, function (file) {
          if (this.opts.singleFile && this.files.length > 0) {
            this.removeFile(this.files[0]);
          }
          this.files.push(file);
        }, this);
        this.fire('filesSubmitted', files, event);
      }
    },


    /**
     * Cancel upload of a specific FlowFile object from the list.
     * @function
     * @param {FlowFile} file
     */
    removeFile: function (file) {
      for (var i = this.files.length - 1; i >= 0; i--) {
        if (this.files[i] === file) {
          this.files.splice(i, 1);
          file.abort();
          this.fire('fileRemoved', file);
        }
      }
    },

    /**
     * Look up a FlowFile object by its unique identifier.
     * @function
     * @param {string} uniqueIdentifier
     * @returns {boolean|FlowFile} false if file was not found
     */
    getFromUniqueIdentifier: function (uniqueIdentifier) {
      var ret = false;
      each(this.files, function (file) {
        if (file.uniqueIdentifier === uniqueIdentifier) {
          ret = file;
        }
      });
      return ret;
    },

    /**
     * Returns the total size of all files in bytes.
     * @function
     * @returns {number}
     */
    getSize: function () {
      var totalSize = 0;
      each(this.files, function (file) {
        totalSize += file.size;
      });
      return totalSize;
    },

    /**
     * Returns the total size uploaded of all files in bytes.
     * @function
     * @returns {number}
     */
    sizeUploaded: function () {
      var size = 0;
      each(this.files, function (file) {
        size += file.sizeUploaded();
      });
      return size;
    },

    /**
     * Returns remaining time to upload all files in seconds. Accuracy is based on average speed.
     * If speed is zero, time remaining will be equal to positive infinity `Number.POSITIVE_INFINITY`
     * @function
     * @returns {number}
     */
    timeRemaining: function () {
      var sizeDelta = 0;
      var averageSpeed = 0;
      each(this.files, function (file) {
        if (!file.paused && !file.error) {
          sizeDelta += file.size - file.sizeUploaded();
          averageSpeed += file.averageSpeed;
        }
      });
      if (sizeDelta && !averageSpeed) {
        return Number.POSITIVE_INFINITY;
      }
      if (!sizeDelta && !averageSpeed) {
        return 0;
      }
      return Math.floor(sizeDelta / averageSpeed);
    }
  };






  /**
   * FlowFile class
   * @name FlowFile
   * @param {Flow} flowObj
   * @param {File} file
   * @param {string} uniqueIdentifier
   * @constructor
   */
  function FlowFile(flowObj, file, uniqueIdentifier) {

    /**
     * Reference to parent Flow instance
     * @type {Flow}
     */
    this.flowObj = flowObj;

    /**
     * Used to store the bytes read
     * @type {Blob|string}
     */
    this.bytes = null;

    /**
     * Reference to file
     * @type {File}
     */
    this.file = file;

    /**
     * File name. Some confusion in different versions of Firefox
     * @type {string}
     */
    this.name = file.fileName || file.name;

    /**
     * File size
     * @type {number}
     */
    this.size = file.size;

    /**
     * Relative file path
     * @type {string}
     */
    this.relativePath = file.relativePath || file.webkitRelativePath || this.name;

    /**
     * File unique identifier
     * @type {string}
     */
    this.uniqueIdentifier = (uniqueIdentifier === undefined ? flowObj.generateUniqueIdentifier(file) : uniqueIdentifier);

    /**
     * Size of Each Chunk
     * @type {number}
     */
    this.chunkSize = 0;

    /**
     * List of chunks
     * @type {Array.<FlowChunk>}
     */
    this.chunks = [];

    /**
     * Indicated if file is paused
     * @type {boolean}
     */
    this.paused = false;

    /**
     * Indicated if file has encountered an error
     * @type {boolean}
     */
    this.error = false;

    /**
     * Average upload speed
     * @type {number}
     */
    this.averageSpeed = 0;

    /**
     * Current upload speed
     * @type {number}
     */
    this.currentSpeed = 0;

    /**
     * Date then progress was called last time
     * @type {number}
     * @private
     */
    this._lastProgressCallback = Date.now();

    /**
     * Previously uploaded file size
     * @type {number}
     * @private
     */
    this._prevUploadedSize = 0;

    /**
     * Holds previous progress
     * @type {number}
     * @private
     */
    this._prevProgress = 0;

    this.bootstrap();
  }

  FlowFile.prototype = {
    /**
     * Update speed parameters
     * @link http://stackoverflow.com/questions/2779600/how-to-estimate-download-time-remaining-accurately
     * @function
     */
    measureSpeed: function () {
      var timeSpan = Date.now() - this._lastProgressCallback;
      if (!timeSpan) {
        return ;
      }
      var smoothingFactor = this.flowObj.opts.speedSmoothingFactor;
      var uploaded = this.sizeUploaded();
      // Prevent negative upload speed after file upload resume
      this.currentSpeed = Math.max((uploaded - this._prevUploadedSize) / timeSpan * 1000, 0);
      this.averageSpeed = smoothingFactor * this.currentSpeed + (1 - smoothingFactor) * this.averageSpeed;
      this._prevUploadedSize = uploaded;
    },

    /**
     * For internal usage only.
     * Callback when something happens within the chunk.
     * @function
     * @param {FlowChunk} chunk
     * @param {string} event can be 'progress', 'success', 'error' or 'retry'
     * @param {string} [message]
     */
    chunkEvent: function (chunk, event, message) {
      switch (event) {
        case 'progress':
          if (Date.now() - this._lastProgressCallback <
            this.flowObj.opts.progressCallbacksInterval) {
            break;
          }
          this.measureSpeed();
          this.flowObj.fire('fileProgress', this, chunk);
          this.flowObj.fire('progress');
          this._lastProgressCallback = Date.now();
          break;
        case 'error':
          this.error = true;
          this.abort(true);
          this.flowObj.fire('fileError', this, message, chunk);
          this.flowObj.fire('error', message, this, chunk);
          break;
        case 'success':
          if (this.error) {
            return;
          }
          this.measureSpeed();
          this.flowObj.fire('fileProgress', this, chunk);
          this.flowObj.fire('progress');
          this._lastProgressCallback = Date.now();
          if (this.isComplete()) {
            this.currentSpeed = 0;
            this.averageSpeed = 0;
            this.flowObj.fire('fileSuccess', this, message, chunk);
          }
          break;
        case 'retry':
          this.flowObj.fire('fileRetry', this, chunk);
          break;
      }
    },

    /**
     * Pause file upload
     * @function
     */
    pause: function() {
      this.paused = true;
      this.abort();
    },

    /**
     * Resume file upload
     * @function
     */
    resume: function() {
      this.paused = false;
      this.flowObj.upload();
    },

    /**
     * Abort current upload
     * @function
     */
    abort: function (reset) {
      this.currentSpeed = 0;
      this.averageSpeed = 0;
      var chunks = this.chunks;
      if (reset) {
        this.chunks = [];
      }
      each(chunks, function (c) {
        if (c.status() === 'uploading') {
          c.abort();
          this.flowObj.uploadNextChunk();
        }
      }, this);
    },

    /**
     * Cancel current upload and remove from a list
     * @function
     */
    cancel: function () {
      this.flowObj.removeFile(this);
    },

    /**
     * Retry aborted file upload
     * @function
     */
    retry: function () {
      this.bootstrap();
      this.flowObj.upload();
    },

    /**
     * Clear current chunks and slice file again
     * @function
     */
    bootstrap: function () {
      if (typeof this.flowObj.opts.initFileFn === "function") {
        this.flowObj.opts.initFileFn(this);
      }

      this.abort(true);
      this.error = false;
      // Rebuild stack of chunks from file
      this._prevProgress = 0;
      var round = this.flowObj.opts.forceChunkSize ? Math.ceil : Math.floor;
      this.chunkSize = evalOpts(this.flowObj.opts.chunkSize, this);
      var chunks = Math.max(
        round(this.size / this.chunkSize), 1
      );
      for (var offset = 0; offset < chunks; offset++) {
        this.chunks.push(
          new FlowChunk(this.flowObj, this, offset)
        );
      }
    },

    /**
     * Get current upload progress status
     * @function
     * @returns {number} from 0 to 1
     */
    progress: function () {
      if (this.error) {
        return 1;
      }
      if (this.chunks.length === 1) {
        this._prevProgress = Math.max(this._prevProgress, this.chunks[0].progress());
        return this._prevProgress;
      }
      // Sum up progress across everything
      var bytesLoaded = 0;
      each(this.chunks, function (c) {
        // get chunk progress relative to entire file
        bytesLoaded += c.progress() * (c.endByte - c.startByte);
      });
      var percent = bytesLoaded / this.size;
      // We don't want to lose percentages when an upload is paused
      this._prevProgress = Math.max(this._prevProgress, percent > 0.9999 ? 1 : percent);
      return this._prevProgress;
    },

    /**
     * Indicates if file is being uploaded at the moment
     * @function
     * @returns {boolean}
     */
    isUploading: function () {
      var uploading = false;
      each(this.chunks, function (chunk) {
        if (chunk.status() === 'uploading') {
          uploading = true;
          return false;
        }
      });
      return uploading;
    },

    /**
     * Indicates if file is has finished uploading and received a response
     * @function
     * @returns {boolean}
     */
    isComplete: function () {
      var outstanding = false;
      each(this.chunks, function (chunk) {
        var status = chunk.status();
        if (status === 'pending' || status === 'uploading' || status === 'reading' || chunk.preprocessState === 1 || chunk.readState === 1) {
          outstanding = true;
          return false;
        }
      });
      return !outstanding;
    },

    /**
     * Count total size uploaded
     * @function
     * @returns {number}
     */
    sizeUploaded: function () {
      var size = 0;
      each(this.chunks, function (chunk) {
        size += chunk.sizeUploaded();
      });
      return size;
    },

    /**
     * Returns remaining time to finish upload file in seconds. Accuracy is based on average speed.
     * If speed is zero, time remaining will be equal to positive infinity `Number.POSITIVE_INFINITY`
     * @function
     * @returns {number}
     */
    timeRemaining: function () {
      if (this.paused || this.error) {
        return 0;
      }
      var delta = this.size - this.sizeUploaded();
      if (delta && !this.averageSpeed) {
        return Number.POSITIVE_INFINITY;
      }
      if (!delta && !this.averageSpeed) {
        return 0;
      }
      return Math.floor(delta / this.averageSpeed);
    },

    /**
     * Get file type
     * @function
     * @returns {string}
     */
    getType: function () {
      return this.file.type && this.file.type.split('/')[1];
    },

    /**
     * Get file extension
     * @function
     * @returns {string}
     */
    getExtension: function () {
      return this.name.substr((~-this.name.lastIndexOf(".") >>> 0) + 2).toLowerCase();
    }
  };

  /**
   * Default read function using the webAPI
   *
   * @function webAPIFileRead(fileObj, startByte, endByte, fileType, chunk)
   *
   */
  function webAPIFileRead(fileObj, startByte, endByte, fileType, chunk) {
    var function_name = 'slice';

    if (fileObj.file.slice)
      function_name =  'slice';
    else if (fileObj.file.mozSlice)
      function_name = 'mozSlice';
    else if (fileObj.file.webkitSlice)
      function_name = 'webkitSlice';

    chunk.readFinished(fileObj.file[function_name](startByte, endByte, fileType));
  }


  /**
   * Class for storing a single chunk
   * @name FlowChunk
   * @param {Flow} flowObj
   * @param {FlowFile} fileObj
   * @param {number} offset
   * @constructor
   */
  function FlowChunk(flowObj, fileObj, offset) {

    /**
     * Reference to parent flow object
     * @type {Flow}
     */
    this.flowObj = flowObj;

    /**
     * Reference to parent FlowFile object
     * @type {FlowFile}
     */
    this.fileObj = fileObj;

    /**
     * File offset
     * @type {number}
     */
    this.offset = offset;

    /**
     * Indicates if chunk existence was checked on the server
     * @type {boolean}
     */
    this.tested = false;

    /**
     * Number of retries performed
     * @type {number}
     */
    this.retries = 0;

    /**
     * Pending retry
     * @type {boolean}
     */
    this.pendingRetry = false;

    /**
     * Preprocess state
     * @type {number} 0 = unprocessed, 1 = processing, 2 = finished
     */
    this.preprocessState = 0;

    /**
     * Read state
     * @type {number} 0 = not read, 1 = reading, 2 = finished
     */
    this.readState = 0;


    /**
     * Bytes transferred from total request size
     * @type {number}
     */
    this.loaded = 0;

    /**
     * Total request size
     * @type {number}
     */
    this.total = 0;

    /**
     * Size of a chunk
     * @type {number}
     */
    this.chunkSize = this.fileObj.chunkSize;

    /**
     * Chunk start byte in a file
     * @type {number}
     */
    this.startByte = this.offset * this.chunkSize;

    /**
     * A specific filename for this chunk which otherwise default to the main name
     * @type {string}
     */
    this.filename = null;

    /**
      * Compute the endbyte in a file
      *
      */
    this.computeEndByte = function() {
      var endByte = Math.min(this.fileObj.size, (this.offset + 1) * this.chunkSize);
      if (this.fileObj.size - endByte < this.chunkSize && !this.flowObj.opts.forceChunkSize) {
        // The last chunk will be bigger than the chunk size,
        // but less than 2 * this.chunkSize
        endByte = this.fileObj.size;
      }
      return endByte;
    }

    /**
     * Chunk end byte in a file
     * @type {number}
     */
    this.endByte = this.computeEndByte();

    /**
     * XMLHttpRequest
     * @type {XMLHttpRequest}
     */
    this.xhr = null;

    var $ = this;

    /**
     * Send chunk event
     * @param event
     * @param {...} args arguments of a callback
     */
    this.event = function (event, args) {
      args = Array.prototype.slice.call(arguments);
      args.unshift($);
      $.fileObj.chunkEvent.apply($.fileObj, args);
    };
    /**
     * Catch progress event
     * @param {ProgressEvent} event
     */
    this.progressHandler = function(event) {
      if (event.lengthComputable) {
        $.loaded = event.loaded ;
        $.total = event.total;
      }
      $.event('progress', event);
    };

    /**
     * Catch test event
     * @param {Event} event
     */
    this.testHandler = function(event) {
      var status = $.status(true);
      if (status === 'error') {
        $.event(status, $.message());
        $.flowObj.uploadNextChunk();
      } else if (status === 'success') {
        $.tested = true;
        $.event(status, $.message());
        $.flowObj.uploadNextChunk();
      } else if (!$.fileObj.paused) {
        // Error might be caused by file pause method
        // Chunks does not exist on the server side
        $.tested = true;
        $.send();
      }
    };

    /**
     * Upload has stopped
     * @param {Event} event
     */
    this.doneHandler = function(event) {
      var status = $.status();
      if (status === 'success' || status === 'error') {
        delete this.data;
        $.event(status, $.message());
        $.flowObj.uploadNextChunk();
      } else if (!$.fileObj.paused) {
        $.event('retry', $.message());
        $.pendingRetry = true;
        $.abort();
        $.retries++;
        var retryInterval = $.flowObj.opts.chunkRetryInterval;
        if (retryInterval !== null) {
          setTimeout(function () {
            $.send();
          }, retryInterval);
        } else {
          $.send();
        }
      }
    };
  }

  FlowChunk.prototype = {
    /**
     * Get params for a request
     * @function
     */
    getParams: function () {
      return {
        flowChunkNumber: this.offset + 1,
        flowChunkSize: this.chunkSize,
        flowCurrentChunkSize: this.endByte - this.startByte,
        flowTotalSize: this.fileObj.size,
        flowIdentifier: this.fileObj.uniqueIdentifier,
        flowFilename: this.fileObj.name,
        flowRelativePath: this.fileObj.relativePath,
        flowTotalChunks: this.fileObj.chunks.length
      };
    },

    /**
     * Get target option with query params
     * @function
     * @param params
     * @returns {string}
     */
    getTarget: function(target, params){
      if (params.length == 0) {
	return target;
      }

      if(target.indexOf('?') < 0) {
        target += '?';
      } else {
        target += '&';
      }
      return target + params.join('&');
    },

    /**
     * Makes a GET request without any data to see if the chunk has already
     * been uploaded in a previous session
     * @function
     */
    test: function () {
      // Set up request and listen for event
      this.xhr = new XMLHttpRequest();
      this.xhr.addEventListener("load", this.testHandler, false);
      this.xhr.addEventListener("error", this.testHandler, false);
      var testMethod = evalOpts(this.flowObj.opts.testMethod, this.fileObj, this);
      var data = this.prepareXhrRequest(testMethod, true);
      this.xhr.send(data);
    },

    /**
     * Finish preprocess state
     * @function
     */
    preprocessFinished: function () {
      // Re-compute the endByte after the preprocess function to allow an
      // implementer of preprocess to set the fileObj size
      this.endByte = this.computeEndByte();

      this.preprocessState = 2;
      this.send();
    },

    /**
     * Finish read state
     * @function
     */
    readFinished: function (bytes) {
      this.readState = 2;
      this.bytes = bytes;
      this.send();
    },


    /**
     * Uploads the actual data in a POST call
     * @function
     */
    send: function () {
      var preprocess = this.flowObj.opts.preprocess;
      var read = this.flowObj.opts.readFileFn;
      if (typeof preprocess === 'function') {
        switch (this.preprocessState) {
          case 0:
            this.preprocessState = 1;
            preprocess(this);
            return;
          case 1:
            return;
        }
      }
      switch (this.readState) {
        case 0:
          this.readState = 1;
          read(this.fileObj, this.startByte, this.endByte, this.fileObj.file.type, this);
          return;
        case 1:
          return;
      }
      if (this.flowObj.opts.testChunks && !this.tested) {
        this.test();
        return;
      }

      this.loaded = 0;
      this.total = 0;
      this.pendingRetry = false;

      // Set up request and listen for event
      this.xhr = new XMLHttpRequest();
      this.xhr.upload.addEventListener('progress', this.progressHandler, false);
      this.xhr.addEventListener("load", this.doneHandler, false);
      this.xhr.addEventListener("error", this.doneHandler, false);

      var uploadMethod = evalOpts(this.flowObj.opts.uploadMethod, this.fileObj, this);
      var data = this.prepareXhrRequest(uploadMethod, false, this.flowObj.opts.method, this.bytes);
      var changeRawDataBeforeSend = this.flowObj.opts.changeRawDataBeforeSend;
      if (typeof changeRawDataBeforeSend === 'function') {
        data = changeRawDataBeforeSend(this, data);
      }
      this.xhr.send(data);
    },

    /**
     * Abort current xhr request
     * @function
     */
    abort: function () {
      // Abort and reset
      var xhr = this.xhr;
      this.xhr = null;
      if (xhr) {
        xhr.abort();
      }
    },

    /**
     * Retrieve current chunk upload status
     * @function
     * @returns {string} 'pending', 'uploading', 'success', 'error'
     */
    status: function (isTest) {
      if (this.readState === 1) {
        return 'reading';
      } else if (this.pendingRetry || this.preprocessState === 1) {
        // if pending retry then that's effectively the same as actively uploading,
        // there might just be a slight delay before the retry starts
        return 'uploading';
      } else if (!this.xhr) {
        return 'pending';
      } else if (this.xhr.readyState < 4) {
        // Status is really 'OPENED', 'HEADERS_RECEIVED'
        // or 'LOADING' - meaning that stuff is happening
        return 'uploading';
      } else {
        if (this.flowObj.opts.successStatuses.indexOf(this.xhr.status) > -1) {
          // HTTP 200, perfect
		      // HTTP 202 Accepted - The request has been accepted for processing, but the processing has not been completed.
          return 'success';
        } else if (this.flowObj.opts.permanentErrors.indexOf(this.xhr.status) > -1 ||
            !isTest && this.retries >= this.flowObj.opts.maxChunkRetries) {
          // HTTP 413/415/500/501, permanent error
          return 'error';
        } else {
          // this should never happen, but we'll reset and queue a retry
          // a likely case for this would be 503 service unavailable
          this.abort();
          return 'pending';
        }
      }
    },

    /**
     * Get response from xhr request
     * @function
     * @returns {String}
     */
    message: function () {
      return this.xhr ? this.xhr.responseText : '';
    },

    /**
     * Get upload progress
     * @function
     * @returns {number}
     */
    progress: function () {
      if (this.pendingRetry) {
        return 0;
      }
      var s = this.status();
      if (s === 'success' || s === 'error') {
        return 1;
      } else if (s === 'pending') {
        return 0;
      } else {
        return this.total > 0 ? this.loaded / this.total : 0;
      }
    },

    /**
     * Count total size uploaded
     * @function
     * @returns {number}
     */
    sizeUploaded: function () {
      var size = this.endByte - this.startByte;
      // can't return only chunk.loaded value, because it is bigger than chunk size
      if (this.status() !== 'success') {
        size = this.progress() * size;
      }
      return size;
    },

    /**
     * Prepare Xhr request. Set query, headers and data
     * @param {string} method GET or POST
     * @param {bool} isTest is this a test request
     * @param {string} [paramsMethod] octet or form
     * @param {Blob} [blob] to send
     * @returns {FormData|Blob|Null} data to send
     */
    prepareXhrRequest: function(method, isTest, paramsMethod, blob) {
      // Add data from the query options
      var query = evalOpts(this.flowObj.opts.query, this.fileObj, this, isTest);
      query = extend(query || {}, this.getParams());

      var target = evalOpts(this.flowObj.opts.target, this.fileObj, this, isTest);
      var data = null;
      if (method === 'GET' || paramsMethod === 'octet') {
        // Add data from the query options
        var params = [];
        each(query, function (v, k) {
          params.push([encodeURIComponent(k), encodeURIComponent(v)].join('='));
        });
        target = this.getTarget(target, params);
        data = blob || null;
      } else {
        // Add data from the query options
        data = new FormData();
        each(query, function (v, k) {
          data.append(k, v);
        });
        if (typeof blob !== "undefined") {
            data.append(this.flowObj.opts.fileParameterName, blob, this.filename || this.fileObj.file.name);
        }
      }

      this.xhr.open(method, target, true);
      this.xhr.withCredentials = this.flowObj.opts.withCredentials;

      // Add data from header options
      each(evalOpts(this.flowObj.opts.headers, this.fileObj, this, isTest), function (v, k) {
        this.xhr.setRequestHeader(k, v);
      }, this);

      return data;
    }
  };

  /**
   * Remove value from array
   * @param array
   * @param value
   */
  function arrayRemove(array, value) {
    var index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  /**
   * If option is a function, evaluate it with given params
   * @param {*} data
   * @param {...} args arguments of a callback
   * @returns {*}
   */
  function evalOpts(data, args) {
    if (typeof data === "function") {
      // `arguments` is an object, not array, in FF, so:
      args = Array.prototype.slice.call(arguments);
      data = data.apply(null, args.slice(1));
    }
    return data;
  }
  Flow.evalOpts = evalOpts;

  /**
   * Execute function asynchronously
   * @param fn
   * @param context
   */
  function async(fn, context) {
    setTimeout(fn.bind(context), 0);
  }

  /**
   * Extends the destination object `dst` by copying all of the properties from
   * the `src` object(s) to `dst`. You can specify multiple `src` objects.
   * @function
   * @param {Object} dst Destination object.
   * @param {...Object} src Source object(s).
   * @returns {Object} Reference to `dst`.
   */
  function extend(dst, src) {
    each(arguments, function(obj) {
      if (obj !== dst) {
        each(obj, function(value, key){
          dst[key] = value;
        });
      }
    });
    return dst;
  }
  Flow.extend = extend;

  /**
   * Iterate each element of an object
   * @function
   * @param {Array|Object} obj object or an array to iterate
   * @param {Function} callback first argument is a value and second is a key.
   * @param {Object=} context Object to become context (`this`) for the iterator function.
   */
  function each(obj, callback, context) {
    if (!obj) {
      return ;
    }
    var key;
    // Is Array?
    // Array.isArray won't work, not only arrays can be iterated by index https://github.com/flowjs/ng-flow/issues/236#
    if (typeof(obj.length) !== 'undefined') {
      for (key = 0; key < obj.length; key++) {
        if (callback.call(context, obj[key], key) === false) {
          return ;
        }
      }
    } else {
      for (key in obj) {
        if (obj.hasOwnProperty(key) && callback.call(context, obj[key], key) === false) {
          return ;
        }
      }
    }
  }
  Flow.each = each;

  /**
   * FlowFile constructor
   * @type {FlowFile}
   */
  Flow.FlowFile = FlowFile;

  /**
   * FlowFile constructor
   * @type {FlowChunk}
   */
  Flow.FlowChunk = FlowChunk;

  /**
   * Library version
   * @type {string}
   */
  Flow.version = '<%= version %>';

  if (  true && module && typeof module.exports === "object" ) {
    // Expose Flow as module.exports in loaders that implement the Node
    // module pattern (including browserify). Do not create the global, since
    // the user will be storing it themselves locally, and globals are frowned
    // upon in the Node module world.
    module.exports = Flow;
  } else {
    // Otherwise expose Flow to the global object as usual
    window.Flow = Flow;

    // Register as a named AMD module, since Flow can be concatenated with other
    // files that may use define, but not via a proper concatenation script that
    // understands anonymous AMD modules. A named AMD is safest and most robust
    // way to register. Lowercase flow is used because AMD module names are
    // derived from file names, and Flow is normally delivered in a lowercase
    // file name. Do this after creating the global so that if an AMD module wants
    // to call noConflict to hide this version of Flow, it will work.
    if ( true ) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () { return Flow; }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})(typeof window !== 'undefined' && window, typeof document !== 'undefined' && document);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("62e4")(module)))

/***/ }),

/***/ "f0bd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

/* harmony default export */ __webpack_exports__["a"] = (Popper);
//# sourceMappingURL=popper.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "f837":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vue = __webpack_require__("8bbf");
Vue = 'default' in Vue ? Vue['default'] : Vue;

var version = '2.1.0';

var compatible = (/^2\./).test(Vue.version);
if (!compatible) {
  Vue.util.warn('VueFocus ' + version + ' only supports Vue 2.x, and does not support Vue ' + Vue.version);
}

var focus = {
  inserted: function(el, binding) {
    if (binding.value) el.focus();
    else el.blur();
  },

  componentUpdated: function(el, binding) {
    if (binding.modifiers.lazy) {
      if (Boolean(binding.value) === Boolean(binding.oldValue)) {
        return;
      }
    }

    if (binding.value) el.focus();
    else el.blur();
  },
};

var mixin = {
  directives: {
    focus: focus,
  },
};

exports.version = version;
exports.focus = focus;
exports.mixin = mixin;

/***/ }),

/***/ "fa73":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return kebabCase; });
/* unused harmony export pascalCase */
/* unused harmony export startCase */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return lowerFirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return upperFirst; });
/* unused harmony export escapeRegExp */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return toString; });
/* unused harmony export trimLeft */
/* unused harmony export trimRight */
/* unused harmony export trim */
/* unused harmony export lowerCase */
/* unused harmony export upperCase */
/* harmony import */ var _constants_regex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("992e");
/* harmony import */ var _inspect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("7b1e");
// String utilities

 // --- Utilities ---
// Converts PascalCase or camelCase to kebab-case

var kebabCase = function kebabCase(str) {
  return str.replace(_constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_HYPHENATE */ "d"], '-$1').toLowerCase();
}; // Converts a kebab-case or camelCase string to PascalCase

var pascalCase = function pascalCase(str) {
  str = kebabCase(str).replace(_constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_UN_KEBAB */ "l"], function (_, c) {
    return c ? c.toUpperCase() : '';
  });
  return str.charAt(0).toUpperCase() + str.slice(1);
}; // Converts a string, including strings in camelCase or snake_case, into Start Case
// It keeps original single quote and hyphen in the word
// https://github.com/UrbanCompass/to-start-case

var startCase = function startCase(str) {
  return str.replace(_constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_UNDERSCORE */ "k"], ' ').replace(_constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_LOWER_UPPER */ "e"], function (str, $1, $2) {
    return $1 + ' ' + $2;
  }).replace(_constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_START_SPACE_WORD */ "h"], function (str, $1, $2) {
    return $1 + $2.toUpperCase();
  });
}; // Lowercases the first letter of a string and returns a new string

var lowerFirst = function lowerFirst(str) {
  str = Object(_inspect__WEBPACK_IMPORTED_MODULE_1__[/* isString */ "i"])(str) ? str.trim() : String(str);
  return str.charAt(0).toLowerCase() + str.slice(1);
}; // Uppercases the first letter of a string and returns a new string

var upperFirst = function upperFirst(str) {
  str = Object(_inspect__WEBPACK_IMPORTED_MODULE_1__[/* isString */ "i"])(str) ? str.trim() : String(str);
  return str.charAt(0).toUpperCase() + str.slice(1);
}; // Escape characters to be used in building a regular expression

var escapeRegExp = function escapeRegExp(str) {
  return str.replace(_constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_REGEXP_REPLACE */ "g"], '\\$&');
}; // Convert a value to a string that can be rendered
// `undefined`/`null` will be converted to `''`
// Plain objects and arrays will be JSON stringified

var toString = function toString(val) {
  var spaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return Object(_inspect__WEBPACK_IMPORTED_MODULE_1__[/* isUndefinedOrNull */ "k"])(val) ? '' : Object(_inspect__WEBPACK_IMPORTED_MODULE_1__[/* isArray */ "a"])(val) || Object(_inspect__WEBPACK_IMPORTED_MODULE_1__[/* isPlainObject */ "h"])(val) && val.toString === Object.prototype.toString ? JSON.stringify(val, null, spaces) : String(val);
}; // Remove leading white space from a string

var trimLeft = function trimLeft(str) {
  return toString(str).replace(_constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_TRIM_LEFT */ "i"], '');
}; // Remove Trailing white space from a string

var trimRight = function trimRight(str) {
  return toString(str).replace(_constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_TRIM_RIGHT */ "j"], '');
}; // Remove leading and trailing white space from a string

var trim = function trim(str) {
  return toString(str).trim();
}; // Lower case a string

var lowerCase = function lowerCase(str) {
  return toString(str).toLowerCase();
}; // Upper case a string

var upperCase = function upperCase(str) {
  return toString(str).toUpperCase();
};

/***/ }),

/***/ "ffe7":
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Fuse.js v3.6.1 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!function(e,t){ true?module.exports=t():undefined}(this,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=r(1),a=r(7),s=a.get,c=(a.deepValue,a.isArray),h=function(){function e(t,r){var n=r.location,o=void 0===n?0:n,i=r.distance,a=void 0===i?100:i,c=r.threshold,h=void 0===c?.6:c,l=r.maxPatternLength,u=void 0===l?32:l,f=r.caseSensitive,v=void 0!==f&&f,p=r.tokenSeparator,d=void 0===p?/ +/g:p,g=r.findAllMatches,y=void 0!==g&&g,m=r.minMatchCharLength,k=void 0===m?1:m,b=r.id,S=void 0===b?null:b,x=r.keys,M=void 0===x?[]:x,_=r.shouldSort,w=void 0===_||_,L=r.getFn,A=void 0===L?s:L,O=r.sortFn,C=void 0===O?function(e,t){return e.score-t.score}:O,j=r.tokenize,P=void 0!==j&&j,I=r.matchAllTokens,F=void 0!==I&&I,T=r.includeMatches,N=void 0!==T&&T,z=r.includeScore,E=void 0!==z&&z,W=r.verbose,K=void 0!==W&&W;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:a,threshold:h,maxPatternLength:u,isCaseSensitive:v,tokenSeparator:d,findAllMatches:y,minMatchCharLength:k,id:S,keys:M,includeMatches:N,includeScore:E,shouldSort:w,getFn:A,sortFn:C,verbose:K,tokenize:P,matchAllTokens:F},this.setCollection(t),this._processKeys(M)}var t,r,a;return t=e,(r=[{key:"setCollection",value:function(e){return this.list=e,e}},{key:"_processKeys",value:function(e){if(this._keyWeights={},this._keyNames=[],e.length&&"string"==typeof e[0])for(var t=0,r=e.length;t<r;t+=1){var n=e[t];this._keyWeights[n]=1,this._keyNames.push(n)}else{for(var o=null,i=null,a=0,s=0,c=e.length;s<c;s+=1){var h=e[s];if(!h.hasOwnProperty("name"))throw new Error('Missing "name" property in key object');var l=h.name;if(this._keyNames.push(l),!h.hasOwnProperty("weight"))throw new Error('Missing "weight" property in key object');var u=h.weight;if(u<0||u>1)throw new Error('"weight" property in key must bein the range of [0, 1)');i=null==i?u:Math.max(i,u),o=null==o?u:Math.min(o,u),this._keyWeights[l]=u,a+=u}if(a>1)throw new Error("Total of weights cannot exceed 1")}}},{key:"search",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{limit:!1};this._log('---------\nSearch pattern: "'.concat(e,'"'));var r=this._prepareSearchers(e),n=r.tokenSearchers,o=r.fullSearcher,i=this._search(n,o);return this._computeScore(i),this.options.shouldSort&&this._sort(i),t.limit&&"number"==typeof t.limit&&(i=i.slice(0,t.limit)),this._format(i)}},{key:"_prepareSearchers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];if(this.options.tokenize)for(var r=e.split(this.options.tokenSeparator),n=0,o=r.length;n<o;n+=1)t.push(new i(r[n],this.options));return{tokenSearchers:t,fullSearcher:new i(e,this.options)}}},{key:"_search",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=this.list,n={},o=[];if("string"==typeof r[0]){for(var i=0,a=r.length;i<a;i+=1)this._analyze({key:"",value:r[i],record:i,index:i},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t});return o}for(var s=0,c=r.length;s<c;s+=1)for(var h=r[s],l=0,u=this._keyNames.length;l<u;l+=1){var f=this._keyNames[l];this._analyze({key:f,value:this.options.getFn(h,f),record:h,index:s},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t})}return o}},{key:"_analyze",value:function(e,t){var r=this,n=e.key,o=e.arrayIndex,i=void 0===o?-1:o,a=e.value,s=e.record,h=e.index,l=t.tokenSearchers,u=void 0===l?[]:l,f=t.fullSearcher,v=t.resultMap,p=void 0===v?{}:v,d=t.results,g=void 0===d?[]:d;!function e(t,o,i,a){if(null!=o)if("string"==typeof o){var s=!1,h=-1,l=0;r._log("\nKey: ".concat(""===n?"--":n));var v=f.search(o);if(r._log('Full text: "'.concat(o,'", score: ').concat(v.score)),r.options.tokenize){for(var d=o.split(r.options.tokenSeparator),y=d.length,m=[],k=0,b=u.length;k<b;k+=1){var S=u[k];r._log('\nPattern: "'.concat(S.pattern,'"'));for(var x=!1,M=0;M<y;M+=1){var _=d[M],w=S.search(_),L={};w.isMatch?(L[_]=w.score,s=!0,x=!0,m.push(w.score)):(L[_]=1,r.options.matchAllTokens||m.push(1)),r._log('Token: "'.concat(_,'", score: ').concat(L[_]))}x&&(l+=1)}h=m[0];for(var A=m.length,O=1;O<A;O+=1)h+=m[O];h/=A,r._log("Token score average:",h)}var C=v.score;h>-1&&(C=(C+h)/2),r._log("Score average:",C);var j=!r.options.tokenize||!r.options.matchAllTokens||l>=u.length;if(r._log("\nCheck Matches: ".concat(j)),(s||v.isMatch)&&j){var P={key:n,arrayIndex:t,value:o,score:C};r.options.includeMatches&&(P.matchedIndices=v.matchedIndices);var I=p[a];I?I.output.push(P):(p[a]={item:i,output:[P]},g.push(p[a]))}}else if(c(o))for(var F=0,T=o.length;F<T;F+=1)e(F,o[F],i,a)}(i,a,s,h)}},{key:"_computeScore",value:function(e){this._log("\n\nComputing score:\n");for(var t=this._keyWeights,r=!!Object.keys(t).length,n=0,o=e.length;n<o;n+=1){for(var i=e[n],a=i.output,s=a.length,c=1,h=0;h<s;h+=1){var l=a[h],u=l.key,f=r?t[u]:1,v=0===l.score&&t&&t[u]>0?Number.EPSILON:l.score;c*=Math.pow(v,f)}i.score=c,this._log(i)}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn)}},{key:"_format",value:function(e){var t=[];if(this.options.verbose){var r=[];this._log("\n\nOutput:\n\n",JSON.stringify(e,function(e,t){if("object"===n(t)&&null!==t){if(-1!==r.indexOf(t))return;r.push(t)}return t},2)),r=null}var o=[];this.options.includeMatches&&o.push(function(e,t){var r=e.output;t.matches=[];for(var n=0,o=r.length;n<o;n+=1){var i=r[n];if(0!==i.matchedIndices.length){var a={indices:i.matchedIndices,value:i.value};i.key&&(a.key=i.key),i.hasOwnProperty("arrayIndex")&&i.arrayIndex>-1&&(a.arrayIndex=i.arrayIndex),t.matches.push(a)}}}),this.options.includeScore&&o.push(function(e,t){t.score=e.score});for(var i=0,a=e.length;i<a;i+=1){var s=e[i];if(this.options.id&&(s.item=this.options.getFn(s.item,this.options.id)[0]),o.length){for(var c={item:s.item},h=0,l=o.length;h<l;h+=1)o[h](s,c);t.push(c)}else t.push(s.item)}return t}},{key:"_log",value:function(){var e;this.options.verbose&&(e=console).log.apply(e,arguments)}}])&&o(t.prototype,r),a&&o(t,a),e}();e.exports=h},function(e,t,r){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o=r(2),i=r(3),a=r(6),s=function(){function e(t,r){var n=r.location,o=void 0===n?0:n,i=r.distance,s=void 0===i?100:i,c=r.threshold,h=void 0===c?.6:c,l=r.maxPatternLength,u=void 0===l?32:l,f=r.isCaseSensitive,v=void 0!==f&&f,p=r.tokenSeparator,d=void 0===p?/ +/g:p,g=r.findAllMatches,y=void 0!==g&&g,m=r.minMatchCharLength,k=void 0===m?1:m,b=r.includeMatches,S=void 0!==b&&b;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:s,threshold:h,maxPatternLength:u,isCaseSensitive:v,tokenSeparator:d,findAllMatches:y,includeMatches:S,minMatchCharLength:k},this.pattern=v?t:t.toLowerCase(),this.pattern.length<=u&&(this.patternAlphabet=a(this.pattern))}var t,r,s;return t=e,(r=[{key:"search",value:function(e){var t=this.options,r=t.isCaseSensitive,n=t.includeMatches;if(r||(e=e.toLowerCase()),this.pattern===e){var a={isMatch:!0,score:0};return n&&(a.matchedIndices=[[0,e.length-1]]),a}var s=this.options,c=s.maxPatternLength,h=s.tokenSeparator;if(this.pattern.length>c)return o(e,this.pattern,h);var l=this.options,u=l.location,f=l.distance,v=l.threshold,p=l.findAllMatches,d=l.minMatchCharLength;return i(e,this.pattern,this.patternAlphabet,{location:u,distance:f,threshold:v,findAllMatches:p,minMatchCharLength:d,includeMatches:n})}}])&&n(t.prototype,r),s&&n(t,s),e}();e.exports=s},function(e,t){var r=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:/ +/g,o=new RegExp(t.replace(r,"\\$&").replace(n,"|")),i=e.match(o),a=!!i,s=[];if(a)for(var c=0,h=i.length;c<h;c+=1){var l=i[c];s.push([e.indexOf(l),l.length-1])}return{score:a?.5:1,isMatch:a,matchedIndices:s}}},function(e,t,r){var n=r(4),o=r(5);e.exports=function(e,t,r,i){for(var a=i.location,s=void 0===a?0:a,c=i.distance,h=void 0===c?100:c,l=i.threshold,u=void 0===l?.6:l,f=i.findAllMatches,v=void 0!==f&&f,p=i.minMatchCharLength,d=void 0===p?1:p,g=i.includeMatches,y=void 0!==g&&g,m=s,k=e.length,b=u,S=e.indexOf(t,m),x=t.length,M=[],_=0;_<k;_+=1)M[_]=0;if(-1!==S){var w=n(t,{errors:0,currentLocation:S,expectedLocation:m,distance:h});if(b=Math.min(w,b),-1!==(S=e.lastIndexOf(t,m+x))){var L=n(t,{errors:0,currentLocation:S,expectedLocation:m,distance:h});b=Math.min(L,b)}}S=-1;for(var A=[],O=1,C=x+k,j=1<<(x<=31?x-1:30),P=0;P<x;P+=1){for(var I=0,F=C;I<F;){n(t,{errors:P,currentLocation:m+F,expectedLocation:m,distance:h})<=b?I=F:C=F,F=Math.floor((C-I)/2+I)}C=F;var T=Math.max(1,m-F+1),N=v?k:Math.min(m+F,k)+x,z=Array(N+2);z[N+1]=(1<<P)-1;for(var E=N;E>=T;E-=1){var W=E-1,K=r[e.charAt(W)];if(K&&(M[W]=1),z[E]=(z[E+1]<<1|1)&K,0!==P&&(z[E]|=(A[E+1]|A[E])<<1|1|A[E+1]),z[E]&j&&(O=n(t,{errors:P,currentLocation:W,expectedLocation:m,distance:h}))<=b){if(b=O,(S=W)<=m)break;T=Math.max(1,2*m-S)}}if(n(t,{errors:P+1,currentLocation:m,expectedLocation:m,distance:h})>b)break;A=z}var $={isMatch:S>=0,score:0===O?.001:O};return y&&($.matchedIndices=o(M,d)),$}},function(e,t){e.exports=function(e,t){var r=t.errors,n=void 0===r?0:r,o=t.currentLocation,i=void 0===o?0:o,a=t.expectedLocation,s=void 0===a?0:a,c=t.distance,h=void 0===c?100:c,l=n/e.length,u=Math.abs(s-i);return h?l+u/h:u?1:l}},function(e,t){e.exports=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=[],n=-1,o=-1,i=0,a=e.length;i<a;i+=1){var s=e[i];s&&-1===n?n=i:s||-1===n||((o=i-1)-n+1>=t&&r.push([n,o]),n=-1)}return e[i-1]&&i-n>=t&&r.push([n,i-1]),r}},function(e,t){e.exports=function(e){for(var t={},r=e.length,n=0;n<r;n+=1)t[e.charAt(n)]=0;for(var o=0;o<r;o+=1)t[e.charAt(o)]|=1<<r-o-1;return t}},function(e,t){var r=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)},n=function(e){return null==e?"":function(e){if("string"==typeof e)return e;var t=e+"";return"0"==t&&1/e==-1/0?"-0":t}(e)},o=function(e){return"string"==typeof e},i=function(e){return"number"==typeof e};e.exports={get:function(e,t){var a=[];return function e(t,s){if(s){var c=s.indexOf("."),h=s,l=null;-1!==c&&(h=s.slice(0,c),l=s.slice(c+1));var u=t[h];if(null!=u)if(l||!o(u)&&!i(u))if(r(u))for(var f=0,v=u.length;f<v;f+=1)e(u[f],l);else l&&e(u,l);else a.push(n(u))}else a.push(t)}(e,t),a},isArray:r,isString:o,isNum:i,toString:n}}])});

/***/ })

}]);
//# sourceMappingURL=flow-builder.common.0.js.map