((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[3],{

/***/ "47df":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return observeDom; });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("906c");
/* harmony import */ var _warn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("686b");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * Observe a DOM element changes, falls back to eventListener mode
 * @param {Element} el The DOM element to observe
 * @param {Function} callback callback to be called on change
 * @param {object} [options={childList: true, subtree: true}] observe options
 * @see https://stackoverflow.com/questions/3219758
 */

var observeDom = function observeDom(el, callback, options)
/* istanbul ignore next: difficult to test in JSDOM */
{
  // Handle cases where we might be passed a Vue instance
  el = el ? el.$el || el : null; // Early exit when we have no element

  /* istanbul ignore next: difficult to test in JSDOM */

  if (!Object(_dom__WEBPACK_IMPORTED_MODULE_0__[/* isElement */ "q"])(el)) {
    return null;
  } // Exit and throw a warning when `MutationObserver` isn't available


  if (Object(_warn__WEBPACK_IMPORTED_MODULE_1__[/* warnNoMutationObserverSupport */ "b"])('observeDom')) {
    return null;
  } // Define a new observer


  var obs = new _dom__WEBPACK_IMPORTED_MODULE_0__[/* MutationObs */ "a"](function (mutations) {
    var changed = false; // A mutation can contain several change records, so we loop
    // through them to see what has changed
    // We break out of the loop early if any "significant" change
    // has been detected

    for (var i = 0; i < mutations.length && !changed; i++) {
      // The mutation record
      var mutation = mutations[i]; // Mutation type

      var type = mutation.type; // DOM node (could be any DOM node type - HTMLElement, Text, comment, etc.)

      var target = mutation.target; // Detect whether a change happened based on type and target

      if (type === 'characterData' && target.nodeType === Node.TEXT_NODE) {
        // We ignore nodes that are not TEXT (i.e. comments, etc.)
        // as they don't change layout
        changed = true;
      } else if (type === 'attributes') {
        changed = true;
      } else if (type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
        // This includes HTMLElement and text nodes being
        // added/removed/re-arranged
        changed = true;
      }
    } // We only call the callback if a change that could affect
    // layout/size truly happened


    if (changed) {
      callback();
    }
  }); // Have the observer observe foo for changes in children, etc

  obs.observe(el, _objectSpread({
    childList: true,
    subtree: true
  }, options)); // We return a reference to the observer so that `obs.disconnect()`
  // can be called if necessary
  // To reduce overhead when the root element is hidden

  return obs;
};

/***/ }),

/***/ "493b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attrsMixin; });
/* harmony import */ var _utils_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8c4e");

var attrsMixin = Object(_utils_cache__WEBPACK_IMPORTED_MODULE_0__[/* makePropCacheMixin */ "a"])('$attrs', 'bvAttrs');

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
var utils_props = __webpack_require__("cf75");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/mixins/normalize-slot.js
var normalize_slot = __webpack_require__("8c18");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/html.js
var html = __webpack_require__("8690");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/inspect.js
var inspect = __webpack_require__("7b1e");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/math.js
var math = __webpack_require__("a8c8");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/number.js
var number = __webpack_require__("3a58");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/string.js
var string = __webpack_require__("fa73");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/progress/progress-bar.js









 // --- Props ---

var progress_bar_props = Object(utils_props["b" /* makePropsConfigurable */])({
  animated: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], null),
  label: Object(utils_props["a" /* makeProp */])(props["m" /* PROP_TYPE_STRING */]),
  labelHtml: Object(utils_props["a" /* makeProp */])(props["m" /* PROP_TYPE_STRING */]),
  max: Object(utils_props["a" /* makeProp */])(props["j" /* PROP_TYPE_NUMBER_STRING */], null),
  precision: Object(utils_props["a" /* makeProp */])(props["j" /* PROP_TYPE_NUMBER_STRING */], null),
  showProgress: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], null),
  showValue: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], null),
  striped: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], null),
  value: Object(utils_props["a" /* makeProp */])(props["j" /* PROP_TYPE_NUMBER_STRING */], 0),
  variant: Object(utils_props["a" /* makeProp */])(props["m" /* PROP_TYPE_STRING */])
}, components["i" /* NAME_PROGRESS_BAR */]); // --- Main component ---
// @vue/component

var BProgressBar = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: components["i" /* NAME_PROGRESS_BAR */],
  mixins: [normalize_slot["a" /* normalizeSlotMixin */]],
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
      domProps = Object(html["a" /* htmlOrText */])(labelHtml, label);
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
var progress_props = Object(utils_props["b" /* makePropsConfigurable */])(Object(object["l" /* sortKeys */])(_objectSpread(_objectSpread({}, progressBarProps), {}, {
  animated: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], false),
  height: Object(utils_props["a" /* makeProp */])(props["m" /* PROP_TYPE_STRING */]),
  max: Object(utils_props["a" /* makeProp */])(props["j" /* PROP_TYPE_NUMBER_STRING */], 100),
  precision: Object(utils_props["a" /* makeProp */])(props["j" /* PROP_TYPE_NUMBER_STRING */], 0),
  showProgress: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], false),
  showValue: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], false),
  striped: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], false)
})), components["h" /* NAME_PROGRESS */]); // --- Main component ---
// @vue/component

var BProgress = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: components["h" /* NAME_PROGRESS */],
  mixins: [normalize_slot["a" /* normalizeSlotMixin */]],
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

/***/ "4a38":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export stringifyQueryObj */
/* unused harmony export parseQuery */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isRouterLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return computeTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return computeRel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return computeHref; });
/* harmony import */ var _constants_regex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("992e");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("906c");
/* harmony import */ var _inspect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7b1e");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("d82f");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("fa73");





var ANCHOR_TAG = 'a'; // Method to replace reserved chars

var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
}; // Fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas


var encode = function encode(str) {
  return encodeURIComponent(Object(_string__WEBPACK_IMPORTED_MODULE_4__[/* toString */ "c"])(str)).replace(_constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_ENCODE_REVERSE */ "d"], encodeReserveReplacer).replace(_constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_ENCODED_COMMA */ "c"], ',');
};

var decode = decodeURIComponent; // Stringifies an object of query parameters
// See: https://github.com/vuejs/vue-router/blob/dev/src/util/query.js

var stringifyQueryObj = function stringifyQueryObj(obj) {
  if (!Object(_inspect__WEBPACK_IMPORTED_MODULE_2__[/* isPlainObject */ "j"])(obj)) {
    return '';
  }

  var query = Object(_object__WEBPACK_IMPORTED_MODULE_3__[/* keys */ "h"])(obj).map(function (key) {
    var value = obj[key];

    if (Object(_inspect__WEBPACK_IMPORTED_MODULE_2__[/* isUndefined */ "l"])(value)) {
      return '';
    } else if (Object(_inspect__WEBPACK_IMPORTED_MODULE_2__[/* isNull */ "f"])(value)) {
      return encode(key);
    } else if (Object(_inspect__WEBPACK_IMPORTED_MODULE_2__[/* isArray */ "a"])(value)) {
      return value.reduce(function (results, value2) {
        if (Object(_inspect__WEBPACK_IMPORTED_MODULE_2__[/* isNull */ "f"])(value2)) {
          results.push(encode(key));
        } else if (!Object(_inspect__WEBPACK_IMPORTED_MODULE_2__[/* isUndefined */ "l"])(value2)) {
          // Faster than string interpolation
          results.push(encode(key) + '=' + encode(value2));
        }

        return results;
      }, []).join('&');
    } // Faster than string interpolation


    return encode(key) + '=' + encode(value);
  })
  /* must check for length, as we only want to filter empty strings, not things that look falsey! */
  .filter(function (x) {
    return x.length > 0;
  }).join('&');
  return query ? "?".concat(query) : '';
};
var parseQuery = function parseQuery(query) {
  var parsed = {};
  query = Object(_string__WEBPACK_IMPORTED_MODULE_4__[/* toString */ "c"])(query).trim().replace(_constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_QUERY_START */ "j"], '');

  if (!query) {
    return parsed;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(_constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_PLUS */ "i"], ' ').split('=');
    var key = decode(parts.shift());
    var value = parts.length > 0 ? decode(parts.join('=')) : null;

    if (Object(_inspect__WEBPACK_IMPORTED_MODULE_2__[/* isUndefined */ "l"])(parsed[key])) {
      parsed[key] = value;
    } else if (Object(_inspect__WEBPACK_IMPORTED_MODULE_2__[/* isArray */ "a"])(parsed[key])) {
      parsed[key].push(value);
    } else {
      parsed[key] = [parsed[key], value];
    }
  });
  return parsed;
};
var isLink = function isLink(props) {
  return !!(props.href || props.to);
};
var isRouterLink = function isRouterLink(tag) {
  return !!(tag && !Object(_dom__WEBPACK_IMPORTED_MODULE_1__[/* isTag */ "r"])(tag, 'a'));
};
var computeTag = function computeTag(_ref, thisOrParent) {
  var to = _ref.to,
      disabled = _ref.disabled,
      routerComponentName = _ref.routerComponentName;
  var hasRouter = !!thisOrParent.$router;

  if (!hasRouter || hasRouter && (disabled || !to)) {
    return ANCHOR_TAG;
  } // TODO:
  //   Check registered components for existence of user supplied router link component name
  //   We would need to check PascalCase, kebab-case, and camelCase versions of name:
  //   const name = routerComponentName
  //   const names = [name, PascalCase(name), KebabCase(name), CamelCase(name)]
  //   exists = names.some(name => !!thisOrParent.$options.components[name])
  //   And may want to cache the result for performance or we just let the render fail
  //   if the component is not registered


  return routerComponentName || (thisOrParent.$nuxt ? 'nuxt-link' : 'router-link');
};
var computeRel = function computeRel() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      target = _ref2.target,
      rel = _ref2.rel;

  return target === '_blank' && Object(_inspect__WEBPACK_IMPORTED_MODULE_2__[/* isNull */ "f"])(rel) ? 'noopener' : rel || null;
};
var computeHref = function computeHref() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      href = _ref3.href,
      to = _ref3.to;

  var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ANCHOR_TAG;
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#';
  var toFallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';

  // Return `href` when explicitly provided
  if (href) {
    return href;
  } // We've checked for `$router` in `computeTag()`, so `isRouterLink()` indicates a live router
  // When deferring to Vue Router's `<router-link>`, don't use the `href` attribute at all
  // We return `null`, and then remove `href` from the attributes passed to `<router-link>`


  if (isRouterLink(tag)) {
    return null;
  } // Fallback to `to` prop (if `to` is a string)


  if (Object(_inspect__WEBPACK_IMPORTED_MODULE_2__[/* isString */ "k"])(to)) {
    return to || toFallback;
  } // Fallback to `to.path' + `to.query` + `to.hash` prop (if `to` is an object)


  if (Object(_inspect__WEBPACK_IMPORTED_MODULE_2__[/* isPlainObject */ "j"])(to) && (to.path || to.query || to.hash)) {
    var path = Object(_string__WEBPACK_IMPORTED_MODULE_4__[/* toString */ "c"])(to.path);
    var query = stringifyQueryObj(to.query);
    var hash = Object(_string__WEBPACK_IMPORTED_MODULE_4__[/* toString */ "c"])(to.hash);
    hash = !hash || hash.charAt(0) === '#' ? hash : "#".concat(hash);
    return "".concat(path).concat(query).concat(hash) || toFallback;
  } // If nothing is provided return the fallback


  return fallback;
};

/***/ }),

/***/ "6aac":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ BModal; });

// UNUSED EXPORTS: props

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/vue.js
var vue = __webpack_require__("2f79");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/components.js
var components = __webpack_require__("c637");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/env.js
var env = __webpack_require__("e863");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/events.js
var events = __webpack_require__("0056");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/key-codes.js
var key_codes = __webpack_require__("9bfa");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/props.js
var constants_props = __webpack_require__("a723");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/safe-types.js
var safe_types = __webpack_require__("ca88");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/slots.js
var slots = __webpack_require__("9b76");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/array.js
var array = __webpack_require__("2326");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/dom.js
var dom = __webpack_require__("906c");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/events.js
var utils_events = __webpack_require__("6b77");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/html.js
var html = __webpack_require__("8690");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/identity.js
var identity = __webpack_require__("6c06");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/inspect.js
var inspect = __webpack_require__("7b1e");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/model.js
var model = __webpack_require__("58f2");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/object.js
var object = __webpack_require__("d82f");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/observe-dom.js
var observe_dom = __webpack_require__("47df");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/props.js
var utils_props = __webpack_require__("cf75");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/mixins/attrs.js
var attrs = __webpack_require__("493b");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/mixins/id.js
var id = __webpack_require__("90ef");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/listen-on-document.js






 // --- Constants ---

var PROP = '$_bv_documentHandlers_'; // --- Mixin ---
// @vue/component

var listenOnDocumentMixin = vue["b" /* Vue */].extend({
  created: function created() {
    var _this = this;

    /* istanbul ignore next */
    if (!env["f" /* IS_BROWSER */]) {
      return;
    } // Declare non-reactive property
    // Object of arrays, keyed by event name,
    // where value is an array of handlers
    // Prop will be defined on client only


    this[PROP] = {}; // Set up our beforeDestroy handler (client only)

    this.$once(events["D" /* HOOK_EVENT_NAME_BEFORE_DESTROY */], function () {
      var items = _this[PROP] || {}; // Immediately delete this[PROP] to prevent the
      // listenOn/Off methods from running (which may occur
      // due to requestAnimationFrame/transition delays)

      delete _this[PROP]; // Remove all registered event handlers

      Object(object["h" /* keys */])(items).forEach(function (eventName) {
        var handlers = items[eventName] || [];
        handlers.forEach(function (handler) {
          return Object(utils_events["a" /* eventOff */])(document, eventName, handler, events["C" /* EVENT_OPTIONS_NO_CAPTURE */]);
        });
      });
    });
  },
  methods: {
    listenDocument: function listenDocument(on, eventName, handler) {
      on ? this.listenOnDocument(eventName, handler) : this.listenOffDocument(eventName, handler);
    },
    listenOnDocument: function listenOnDocument(eventName, handler) {
      if (this[PROP] && Object(inspect["k" /* isString */])(eventName) && Object(inspect["e" /* isFunction */])(handler)) {
        this[PROP][eventName] = this[PROP][eventName] || [];

        if (!Object(array["a" /* arrayIncludes */])(this[PROP][eventName], handler)) {
          this[PROP][eventName].push(handler);
          Object(utils_events["b" /* eventOn */])(document, eventName, handler, events["C" /* EVENT_OPTIONS_NO_CAPTURE */]);
        }
      }
    },
    listenOffDocument: function listenOffDocument(eventName, handler) {
      if (this[PROP] && Object(inspect["k" /* isString */])(eventName) && Object(inspect["e" /* isFunction */])(handler)) {
        Object(utils_events["a" /* eventOff */])(document, eventName, handler, events["C" /* EVENT_OPTIONS_NO_CAPTURE */]);
        this[PROP][eventName] = (this[PROP][eventName] || []).filter(function (h) {
          return h !== handler;
        });
      }
    }
  }
});
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/mixins/listen-on-root.js
var listen_on_root = __webpack_require__("602d");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/listen-on-window.js






 // --- Constants ---

var listen_on_window_PROP = '$_bv_windowHandlers_'; // --- Mixin ---
// @vue/component

var listenOnWindowMixin = vue["b" /* Vue */].extend({
  beforeCreate: function beforeCreate() {
    // Declare non-reactive property
    // Object of arrays, keyed by event name,
    // where value is an array of handlers
    this[listen_on_window_PROP] = {};
  },
  beforeDestroy: function beforeDestroy() {
    if (env["f" /* IS_BROWSER */]) {
      var items = this[listen_on_window_PROP]; // Immediately delete this[PROP] to prevent the
      // listenOn/Off methods from running (which may occur
      // due to requestAnimationFrame delays)

      delete this[listen_on_window_PROP]; // Remove all registered event handlers

      Object(object["h" /* keys */])(items).forEach(function (eventName) {
        var handlers = items[eventName] || [];
        handlers.forEach(function (handler) {
          return Object(utils_events["a" /* eventOff */])(window, eventName, handler, events["C" /* EVENT_OPTIONS_NO_CAPTURE */]);
        });
      });
    }
  },
  methods: {
    listenWindow: function listenWindow(on, eventName, handler) {
      on ? this.listenOnWindow(eventName, handler) : this.listenOffWindow(eventName, handler);
    },
    listenOnWindow: function listenOnWindow(eventName, handler) {
      if (env["f" /* IS_BROWSER */] && this[listen_on_window_PROP] && Object(inspect["k" /* isString */])(eventName) && Object(inspect["e" /* isFunction */])(handler)) {
        this[listen_on_window_PROP][eventName] = this[listen_on_window_PROP][eventName] || [];

        if (!Object(array["a" /* arrayIncludes */])(this[listen_on_window_PROP][eventName], handler)) {
          this[listen_on_window_PROP][eventName].push(handler);
          Object(utils_events["b" /* eventOn */])(window, eventName, handler, events["C" /* EVENT_OPTIONS_NO_CAPTURE */]);
        }
      }
    },
    listenOffWindow: function listenOffWindow(eventName, handler) {
      if (env["f" /* IS_BROWSER */] && this[listen_on_window_PROP] && Object(inspect["k" /* isString */])(eventName) && Object(inspect["e" /* isFunction */])(handler)) {
        Object(utils_events["a" /* eventOff */])(window, eventName, handler, events["C" /* EVENT_OPTIONS_NO_CAPTURE */]);
        this[listen_on_window_PROP][eventName] = (this[listen_on_window_PROP][eventName] || []).filter(function (h) {
          return h !== handler;
        });
      }
    }
  }
});
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/mixins/normalize-slot.js
var normalize_slot = __webpack_require__("8c18");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/mixins/scoped-style.js
var scoped_style = __webpack_require__("8d32");

// EXTERNAL MODULE: ./node_modules/vue-functional-data-merge/dist/lib.esm.js
var lib_esm = __webpack_require__("b42e");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/router.js
var router = __webpack_require__("4a38");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/link/link.js + 1 modules
var link_link = __webpack_require__("aa59");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/button/button.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












 // --- Props ---

var linkProps = Object(object["i" /* omit */])(link_link["b" /* props */], ['event', 'routerTag']);
delete linkProps.href.default;
delete linkProps.to.default;
var button_props = Object(utils_props["b" /* makePropsConfigurable */])(Object(object["l" /* sortKeys */])(_objectSpread(_objectSpread({}, linkProps), {}, {
  block: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  disabled: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  pill: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  // Tri-state: `true`, `false` or `null`
  // => On, off, not a toggle
  pressed: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], null),
  size: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  squared: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  tag: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'button'),
  type: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'button'),
  variant: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'secondary')
})), components["b" /* NAME_BUTTON */]); // --- Helper methods ---
// Focus handler for toggle buttons
// Needs class of 'focus' when focused

var button_handleFocus = function handleFocus(event) {
  if (event.type === 'focusin') {
    Object(dom["b" /* addClass */])(event.target, 'focus');
  } else if (event.type === 'focusout') {
    Object(dom["u" /* removeClass */])(event.target, 'focus');
  }
}; // Is the requested button a link?
// If tag prop is set to `a`, we use a <b-link> to get proper disabled handling


var button_isLink = function isLink(props) {
  return Object(router["d" /* isLink */])(props) || Object(dom["r" /* isTag */])(props.tag, 'a');
}; // Is the button to be a toggle button?


var button_isToggle = function isToggle(props) {
  return Object(inspect["b" /* isBoolean */])(props.pressed);
}; // Is the button "really" a button?


var button_isButton = function isButton(props) {
  return !(button_isLink(props) || props.tag && !Object(dom["r" /* isTag */])(props.tag, 'button'));
}; // Is the requested tag not a button or link?


var isNonStandardTag = function isNonStandardTag(props) {
  return !button_isLink(props) && !button_isButton(props);
}; // Compute required classes (non static classes)


var computeClass = function computeClass(props) {
  var _ref;

  return ["btn-".concat(props.variant || 'secondary'), (_ref = {}, _defineProperty(_ref, "btn-".concat(props.size), props.size), _defineProperty(_ref, 'btn-block', props.block), _defineProperty(_ref, 'rounded-pill', props.pill), _defineProperty(_ref, 'rounded-0', props.squared && !props.pill), _defineProperty(_ref, "disabled", props.disabled), _defineProperty(_ref, "active", props.pressed), _ref)];
}; // Compute the link props to pass to b-link (if required)


var button_computeLinkProps = function computeLinkProps(props) {
  return button_isLink(props) ? Object(utils_props["c" /* pluckProps */])(linkProps, props) : {};
}; // Compute the attributes for a button


var computeAttrs = function computeAttrs(props, data) {
  var button = button_isButton(props);
  var link = button_isLink(props);
  var toggle = button_isToggle(props);
  var nonStandardTag = isNonStandardTag(props);
  var hashLink = link && props.href === '#';
  var role = data.attrs && data.attrs.role ? data.attrs.role : null;
  var tabindex = data.attrs ? data.attrs.tabindex : null;

  if (nonStandardTag || hashLink) {
    tabindex = '0';
  }

  return {
    // Type only used for "real" buttons
    type: button && !link ? props.type : null,
    // Disabled only set on "real" buttons
    disabled: button ? props.disabled : null,
    // We add a role of button when the tag is not a link or button for ARIA
    // Don't bork any role provided in `data.attrs` when `isLink` or `isButton`
    // Except when link has `href` of `#`
    role: nonStandardTag || hashLink ? 'button' : role,
    // We set the `aria-disabled` state for non-standard tags
    'aria-disabled': nonStandardTag ? String(props.disabled) : null,
    // For toggles, we need to set the pressed state for ARIA
    'aria-pressed': toggle ? String(props.pressed) : null,
    // `autocomplete="off"` is needed in toggle mode to prevent some browsers
    // from remembering the previous setting when using the back button
    autocomplete: toggle ? 'off' : null,
    // `tabindex` is used when the component is not a button
    // Links are tabbable, but don't allow disabled, while non buttons or links
    // are not tabbable, so we mimic that functionality by disabling tabbing
    // when disabled, and adding a `tabindex="0"` to non buttons or non links
    tabindex: props.disabled && !button ? '-1' : tabindex
  };
}; // --- Main component ---
// @vue/component


var BButton = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: components["b" /* NAME_BUTTON */],
  functional: true,
  props: button_props,
  render: function render(h, _ref2) {
    var props = _ref2.props,
        data = _ref2.data,
        listeners = _ref2.listeners,
        children = _ref2.children;
    var toggle = button_isToggle(props);
    var link = button_isLink(props);
    var nonStandardTag = isNonStandardTag(props);
    var hashLink = link && props.href === '#';
    var on = {
      keydown: function keydown(event) {
        // When the link is a `href="#"` or a non-standard tag (has `role="button"`),
        // we add a keydown handlers for CODE_SPACE/CODE_ENTER

        /* istanbul ignore next */
        if (props.disabled || !(nonStandardTag || hashLink)) {
          return;
        }

        var keyCode = event.keyCode; // Add CODE_SPACE handler for `href="#"` and CODE_ENTER handler for non-standard tags

        if (keyCode === key_codes["h" /* CODE_SPACE */] || keyCode === key_codes["c" /* CODE_ENTER */] && nonStandardTag) {
          var target = event.currentTarget || event.target;
          Object(utils_events["f" /* stopEvent */])(event, {
            propagation: false
          });
          target.click();
        }
      },
      click: function click(event) {
        /* istanbul ignore if: blink/button disabled should handle this */
        if (props.disabled && Object(inspect["d" /* isEvent */])(event)) {
          Object(utils_events["f" /* stopEvent */])(event);
        } else if (toggle && listeners && listeners['update:pressed']) {
          // Send `.sync` updates to any "pressed" prop (if `.sync` listeners)
          // `concat()` will normalize the value to an array without
          // double wrapping an array value in an array
          Object(array["b" /* concat */])(listeners['update:pressed']).forEach(function (fn) {
            if (Object(inspect["e" /* isFunction */])(fn)) {
              fn(!props.pressed);
            }
          });
        }
      }
    };

    if (toggle) {
      on.focusin = button_handleFocus;
      on.focusout = button_handleFocus;
    }

    var componentData = {
      staticClass: 'btn',
      class: computeClass(props),
      props: button_computeLinkProps(props),
      attrs: computeAttrs(props, data),
      on: on
    };
    return h(link ? link_link["a" /* BLink */] : props.tag, Object(lib_esm["a" /* mergeData */])(data, componentData), children);
  }
});
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/button/button-close.js
var button_close = __webpack_require__("f29e");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/transition/bv-transition.js
var bv_transition = __webpack_require__("ce2a");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/transporter/transporter.js










 // --- Helper components ---
// BVTransporter/BVTransporterTarget:
//
// Single root node portaling of content, which retains parent/child hierarchy
// Unlike Portal-Vue where portaled content is no longer a descendent of its
// intended parent components
//
// Private components for use by Tooltips, Popovers and Modals
//
// Based on vue-simple-portal
// https://github.com/LinusBorg/vue-simple-portal
// Transporter target used by BVTransporter
// Supports only a single root element
// @vue/component

var BVTransporterTarget = /*#__PURE__*/vue["b" /* Vue */].extend({
  // As an abstract component, it doesn't appear in the $parent chain of
  // components, which means the next parent of any component rendered inside
  // of this one will be the parent from which is was portal'd
  abstract: true,
  name: components["r" /* NAME_TRANSPORTER_TARGET */],
  props: {
    // Even though we only support a single root element,
    // VNodes are always passed as an array
    nodes: Object(utils_props["a" /* makeProp */])(constants_props["b" /* PROP_TYPE_ARRAY_FUNCTION */])
  },
  data: function data(vm) {
    return {
      updatedNodes: vm.nodes
    };
  },
  destroyed: function destroyed() {
    Object(dom["v" /* removeNode */])(this.$el);
  },
  render: function render(h) {
    var updatedNodes = this.updatedNodes;
    var $nodes = Object(inspect["e" /* isFunction */])(updatedNodes) ? updatedNodes({}) : updatedNodes;
    $nodes = Object(array["b" /* concat */])($nodes).filter(identity["a" /* identity */]);

    if ($nodes && $nodes.length > 0 && !$nodes[0].text) {
      return $nodes[0];
    }
    /* istanbul ignore next */


    return h();
  }
}); // --- Props ---

var transporter_props = {
  // String: CSS selector,
  // HTMLElement: Element reference
  // Mainly needed for tooltips/popovers inside modals
  container: Object(utils_props["a" /* makeProp */])([safe_types["c" /* HTMLElement */], constants_props["m" /* PROP_TYPE_STRING */]], 'body'),
  disabled: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  // This should be set to match the root element type
  tag: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'div')
}; // --- Main component ---
// @vue/component

var BVTransporter = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: components["q" /* NAME_TRANSPORTER */],
  mixins: [normalize_slot["a" /* normalizeSlotMixin */]],
  props: transporter_props,
  watch: {
    disabled: {
      immediate: true,
      handler: function handler(disabled) {
        disabled ? this.unmountTarget() : this.$nextTick(this.mountTarget);
      }
    }
  },
  created: function created() {
    // Create private non-reactive props
    this.$_defaultFn = null;
    this.$_target = null;
  },
  beforeMount: function beforeMount() {
    this.mountTarget();
  },
  updated: function updated() {
    // We need to make sure that all children have completed updating
    // before rendering in the target
    // `vue-simple-portal` has the this in a `$nextTick()`,
    // while `portal-vue` doesn't
    // Just trying to see if the `$nextTick()` delay is required or not
    // Since all slots in Vue 2.6.x are always functions
    this.updateTarget();
  },
  beforeDestroy: function beforeDestroy() {
    this.unmountTarget();
    this.$_defaultFn = null;
  },
  methods: {
    // Get the element which the target should be appended to
    getContainer: function getContainer() {
      /* istanbul ignore else */
      if (env["f" /* IS_BROWSER */]) {
        var container = this.container;
        return Object(inspect["k" /* isString */])(container) ? Object(dom["x" /* select */])(container) : container;
      } else {
        return null;
      }
    },
    // Mount the target
    mountTarget: function mountTarget() {
      if (!this.$_target) {
        var $container = this.getContainer();

        if ($container) {
          var $el = document.createElement('div');
          $container.appendChild($el);
          this.$_target = new BVTransporterTarget({
            el: $el,
            parent: this,
            propsData: {
              // Initial nodes to be rendered
              nodes: Object(array["b" /* concat */])(this.normalizeSlot())
            }
          });
        }
      }
    },
    // Update the content of the target
    updateTarget: function updateTarget() {
      if (env["f" /* IS_BROWSER */] && this.$_target) {
        var defaultFn = this.$scopedSlots.default;

        if (!this.disabled) {
          /* istanbul ignore else: only applicable in Vue 2.5.x */
          if (defaultFn && this.$_defaultFn !== defaultFn) {
            // We only update the target component if the scoped slot
            // function is a fresh one. The new slot syntax (since Vue 2.6)
            // can cache unchanged slot functions and we want to respect that here
            this.$_target.updatedNodes = defaultFn;
          } else if (!defaultFn) {
            // We also need to be back compatible with non-scoped default slot (i.e. 2.5.x)
            this.$_target.updatedNodes = this.$slots.default;
          }
        } // Update the scoped slot function cache


        this.$_defaultFn = defaultFn;
      }
    },
    // Unmount the target
    unmountTarget: function unmountTarget() {
      this.$_target && this.$_target.$destroy();
      this.$_target = null;
    }
  },
  render: function render(h) {
    // This component has no root element, so only a single VNode is allowed
    if (this.disabled) {
      var $nodes = Object(array["b" /* concat */])(this.normalizeSlot()).filter(identity["a" /* identity */]);

      if ($nodes.length > 0 && !$nodes[0].text) {
        return $nodes[0];
      }
    }

    return h();
  }
});
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/bv-event.class.js
var bv_event_class = __webpack_require__("6d40");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/modal/helpers/bv-modal-event.class.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function bv_modal_event_class_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function bv_modal_event_class_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { bv_modal_event_class_ownKeys(Object(source), true).forEach(function (key) { bv_modal_event_class_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { bv_modal_event_class_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function bv_modal_event_class_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var bv_modal_event_class_BvModalEvent = /*#__PURE__*/function (_BvEvent) {
  _inherits(BvModalEvent, _BvEvent);

  var _super = _createSuper(BvModalEvent);

  function BvModalEvent(type) {
    var _this;

    var eventInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, BvModalEvent);

    _this = _super.call(this, type, eventInit); // Freeze our new props as readonly, but leave them enumerable

    Object(object["d" /* defineProperties */])(_assertThisInitialized(_this), {
      trigger: Object(object["k" /* readonlyDescriptor */])()
    });
    return _this;
  }

  _createClass(BvModalEvent, null, [{
    key: "Defaults",
    get: function get() {
      return bv_modal_event_class_objectSpread(bv_modal_event_class_objectSpread({}, _get(_getPrototypeOf(BvModalEvent), "Defaults", this)), {}, {
        trigger: null
      });
    }
  }]);

  return BvModalEvent;
}(bv_event_class["a" /* BvEvent */]); // Named exports



// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/number.js
var number = __webpack_require__("3a58");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/modal/helpers/modal-manager.js
/**
 * Private ModalManager helper
 * Handles controlling modal stacking zIndexes and body adjustments/classes
 */





 // --- Constants ---
// Default modal backdrop z-index

var DEFAULT_ZINDEX = 1040; // Selectors for padding/margin adjustments

var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
var SELECTOR_STICKY_CONTENT = '.sticky-top';
var SELECTOR_NAVBAR_TOGGLER = '.navbar-toggler'; // --- Main component ---
// @vue/component

var ModalManager = /*#__PURE__*/vue["b" /* Vue */].extend({
  data: function data() {
    return {
      modals: [],
      baseZIndex: null,
      scrollbarWidth: null,
      isBodyOverflowing: false
    };
  },
  computed: {
    modalCount: function modalCount() {
      return this.modals.length;
    },
    modalsAreOpen: function modalsAreOpen() {
      return this.modalCount > 0;
    }
  },
  watch: {
    modalCount: function modalCount(newCount, oldCount) {
      if (env["f" /* IS_BROWSER */]) {
        this.getScrollbarWidth();

        if (newCount > 0 && oldCount === 0) {
          // Transitioning to modal(s) open
          this.checkScrollbar();
          this.setScrollbar();
          Object(dom["b" /* addClass */])(document.body, 'modal-open');
        } else if (newCount === 0 && oldCount > 0) {
          // Transitioning to modal(s) closed
          this.resetScrollbar();
          Object(dom["u" /* removeClass */])(document.body, 'modal-open');
        }

        Object(dom["z" /* setAttr */])(document.body, 'data-modal-open-count', String(newCount));
      }
    },
    modals: function modals(newValue) {
      var _this = this;

      this.checkScrollbar();
      Object(dom["w" /* requestAF */])(function () {
        _this.updateModals(newValue || []);
      });
    }
  },
  methods: {
    // Public methods
    registerModal: function registerModal(modal) {
      var _this2 = this;

      // Register the modal if not already registered
      if (modal && this.modals.indexOf(modal) === -1) {
        // Add modal to modals array
        this.modals.push(modal);
        modal.$once(events["D" /* HOOK_EVENT_NAME_BEFORE_DESTROY */], function () {
          _this2.unregisterModal(modal);
        });
      }
    },
    unregisterModal: function unregisterModal(modal) {
      var index = this.modals.indexOf(modal);

      if (index > -1) {
        // Remove modal from modals array
        this.modals.splice(index, 1); // Reset the modal's data

        if (!(modal._isBeingDestroyed || modal._isDestroyed)) {
          this.resetModal(modal);
        }
      }
    },
    getBaseZIndex: function getBaseZIndex() {
      if (Object(inspect["f" /* isNull */])(this.baseZIndex) && env["f" /* IS_BROWSER */]) {
        // Create a temporary `div.modal-backdrop` to get computed z-index
        var div = document.createElement('div');
        Object(dom["b" /* addClass */])(div, 'modal-backdrop');
        Object(dom["b" /* addClass */])(div, 'd-none');
        Object(dom["A" /* setStyle */])(div, 'display', 'none');
        document.body.appendChild(div);
        this.baseZIndex = Object(number["c" /* toInteger */])(Object(dom["k" /* getCS */])(div).zIndex, DEFAULT_ZINDEX);
        document.body.removeChild(div);
      }

      return this.baseZIndex || DEFAULT_ZINDEX;
    },
    getScrollbarWidth: function getScrollbarWidth() {
      if (Object(inspect["f" /* isNull */])(this.scrollbarWidth) && env["f" /* IS_BROWSER */]) {
        // Create a temporary `div.measure-scrollbar` to get computed z-index
        var div = document.createElement('div');
        Object(dom["b" /* addClass */])(div, 'modal-scrollbar-measure');
        document.body.appendChild(div);
        this.scrollbarWidth = Object(dom["i" /* getBCR */])(div).width - div.clientWidth;
        document.body.removeChild(div);
      }

      return this.scrollbarWidth || 0;
    },
    // Private methods
    updateModals: function updateModals(modals) {
      var _this3 = this;

      var baseZIndex = this.getBaseZIndex();
      var scrollbarWidth = this.getScrollbarWidth();
      modals.forEach(function (modal, index) {
        // We update data values on each modal
        modal.zIndex = baseZIndex + index;
        modal.scrollbarWidth = scrollbarWidth;
        modal.isTop = index === _this3.modals.length - 1;
        modal.isBodyOverflowing = _this3.isBodyOverflowing;
      });
    },
    resetModal: function resetModal(modal) {
      if (modal) {
        modal.zIndex = this.getBaseZIndex();
        modal.isTop = true;
        modal.isBodyOverflowing = false;
      }
    },
    checkScrollbar: function checkScrollbar() {
      // Determine if the body element is overflowing
      var _getBCR = Object(dom["i" /* getBCR */])(document.body),
          left = _getBCR.left,
          right = _getBCR.right;

      this.isBodyOverflowing = left + right < window.innerWidth;
    },
    setScrollbar: function setScrollbar() {
      var body = document.body; // Storage place to cache changes to margins and padding
      // Note: This assumes the following element types are not added to the
      // document after the modal has opened.

      body._paddingChangedForModal = body._paddingChangedForModal || [];
      body._marginChangedForModal = body._marginChangedForModal || [];

      if (this.isBodyOverflowing) {
        var scrollbarWidth = this.scrollbarWidth; // Adjust fixed content padding

        /* istanbul ignore next: difficult to test in JSDOM */

        Object(dom["y" /* selectAll */])(SELECTOR_FIXED_CONTENT).forEach(function (el) {
          var actualPadding = Object(dom["l" /* getStyle */])(el, 'paddingRight') || '';
          Object(dom["z" /* setAttr */])(el, 'data-padding-right', actualPadding);
          Object(dom["A" /* setStyle */])(el, 'paddingRight', "".concat(Object(number["b" /* toFloat */])(Object(dom["k" /* getCS */])(el).paddingRight, 0) + scrollbarWidth, "px"));

          body._paddingChangedForModal.push(el);
        }); // Adjust sticky content margin

        /* istanbul ignore next: difficult to test in JSDOM */

        Object(dom["y" /* selectAll */])(SELECTOR_STICKY_CONTENT).forEach(function (el)
        /* istanbul ignore next */
        {
          var actualMargin = Object(dom["l" /* getStyle */])(el, 'marginRight') || '';
          Object(dom["z" /* setAttr */])(el, 'data-margin-right', actualMargin);
          Object(dom["A" /* setStyle */])(el, 'marginRight', "".concat(Object(number["b" /* toFloat */])(Object(dom["k" /* getCS */])(el).marginRight, 0) - scrollbarWidth, "px"));

          body._marginChangedForModal.push(el);
        }); // Adjust <b-navbar-toggler> margin

        /* istanbul ignore next: difficult to test in JSDOM */

        Object(dom["y" /* selectAll */])(SELECTOR_NAVBAR_TOGGLER).forEach(function (el)
        /* istanbul ignore next */
        {
          var actualMargin = Object(dom["l" /* getStyle */])(el, 'marginRight') || '';
          Object(dom["z" /* setAttr */])(el, 'data-margin-right', actualMargin);
          Object(dom["A" /* setStyle */])(el, 'marginRight', "".concat(Object(number["b" /* toFloat */])(Object(dom["k" /* getCS */])(el).marginRight, 0) + scrollbarWidth, "px"));

          body._marginChangedForModal.push(el);
        }); // Adjust body padding

        var actualPadding = Object(dom["l" /* getStyle */])(body, 'paddingRight') || '';
        Object(dom["z" /* setAttr */])(body, 'data-padding-right', actualPadding);
        Object(dom["A" /* setStyle */])(body, 'paddingRight', "".concat(Object(number["b" /* toFloat */])(Object(dom["k" /* getCS */])(body).paddingRight, 0) + scrollbarWidth, "px"));
      }
    },
    resetScrollbar: function resetScrollbar() {
      var body = document.body;

      if (body._paddingChangedForModal) {
        // Restore fixed content padding
        body._paddingChangedForModal.forEach(function (el) {
          /* istanbul ignore next: difficult to test in JSDOM */
          if (Object(dom["n" /* hasAttr */])(el, 'data-padding-right')) {
            Object(dom["A" /* setStyle */])(el, 'paddingRight', Object(dom["h" /* getAttr */])(el, 'data-padding-right') || '');
            Object(dom["t" /* removeAttr */])(el, 'data-padding-right');
          }
        });
      }

      if (body._marginChangedForModal) {
        // Restore sticky content and navbar-toggler margin
        body._marginChangedForModal.forEach(function (el) {
          /* istanbul ignore next: difficult to test in JSDOM */
          if (Object(dom["n" /* hasAttr */])(el, 'data-margin-right')) {
            Object(dom["A" /* setStyle */])(el, 'marginRight', Object(dom["h" /* getAttr */])(el, 'data-margin-right') || '');
            Object(dom["t" /* removeAttr */])(el, 'data-margin-right');
          }
        });
      }

      body._paddingChangedForModal = null;
      body._marginChangedForModal = null; // Restore body padding

      if (Object(dom["n" /* hasAttr */])(body, 'data-padding-right')) {
        Object(dom["A" /* setStyle */])(body, 'paddingRight', Object(dom["h" /* getAttr */])(body, 'data-padding-right') || '');
        Object(dom["t" /* removeAttr */])(body, 'data-padding-right');
      }
    }
  }
}); // Create and export our modal manager instance

var modalManager = new ModalManager();
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/modal/modal.js
function modal_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function modal_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { modal_ownKeys(Object(source), true).forEach(function (key) { modal_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { modal_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function modal_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }































 // --- Constants ---

var _makeModelMixin = Object(model["a" /* makeModelMixin */])('visible', {
  type: constants_props["e" /* PROP_TYPE_BOOLEAN */],
  defaultValue: false,
  event: events["c" /* EVENT_NAME_CHANGE */]
}),
    modelMixin = _makeModelMixin.mixin,
    modelProps = _makeModelMixin.props,
    MODEL_PROP_NAME = _makeModelMixin.prop,
    MODEL_EVENT_NAME = _makeModelMixin.event;

var TRIGGER_BACKDROP = 'backdrop';
var TRIGGER_ESC = 'esc';
var TRIGGER_FORCE = 'FORCE';
var TRIGGER_TOGGLE = 'toggle';
var BUTTON_CANCEL = 'cancel'; // TODO: This should be renamed to 'close'

var BUTTON_CLOSE = 'headerclose';
var BUTTON_OK = 'ok';
var BUTTONS = [BUTTON_CANCEL, BUTTON_CLOSE, BUTTON_OK]; // `ObserveDom` config to detect changes in modal content
// so that we can adjust the modal padding if needed

var OBSERVER_CONFIG = {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
  attributeFilter: ['style', 'class']
}; // --- Props ---

var modal_props = Object(utils_props["b" /* makePropsConfigurable */])(Object(object["l" /* sortKeys */])(modal_objectSpread(modal_objectSpread(modal_objectSpread({}, id["b" /* props */]), modelProps), {}, {
  ariaLabel: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  autoFocusButton: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], null,
  /* istanbul ignore next */
  function (value) {
    return Object(inspect["m" /* isUndefinedOrNull */])(value) || Object(array["a" /* arrayIncludes */])(BUTTONS, value);
  }),
  bodyBgVariant: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  bodyClass: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */]),
  bodyTextVariant: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  busy: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  buttonSize: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  cancelDisabled: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  cancelTitle: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'Cancel'),
  cancelTitleHtml: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  cancelVariant: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'secondary'),
  centered: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  contentClass: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */]),
  dialogClass: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */]),
  footerBgVariant: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  footerBorderVariant: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  footerClass: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */]),
  footerTextVariant: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  headerBgVariant: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  headerBorderVariant: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  headerClass: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */]),
  headerCloseContent: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], '&times;'),
  headerCloseLabel: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'Close'),
  headerCloseVariant: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  headerTextVariant: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  // TODO: Rename to `noBackdrop` and deprecate `hideBackdrop`
  hideBackdrop: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  // TODO: Rename to `noFooter` and deprecate `hideFooter`
  hideFooter: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  // TODO: Rename to `noHeader` and deprecate `hideHeader`
  hideHeader: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  // TODO: Rename to `noHeaderClose` and deprecate `hideHeaderClose`
  hideHeaderClose: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  ignoreEnforceFocusSelector: Object(utils_props["a" /* makeProp */])(constants_props["d" /* PROP_TYPE_ARRAY_STRING */]),
  lazy: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  modalClass: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */]),
  noCloseOnBackdrop: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  noCloseOnEsc: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  noEnforceFocus: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  noFade: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  noStacking: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  okDisabled: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  okOnly: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  okTitle: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'OK'),
  okTitleHtml: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  okVariant: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'primary'),
  // HTML Element, CSS selector string or Vue component instance
  returnFocus: Object(utils_props["a" /* makeProp */])([safe_types["c" /* HTMLElement */], constants_props["k" /* PROP_TYPE_OBJECT */], constants_props["m" /* PROP_TYPE_STRING */]]),
  scrollable: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  size: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'md'),
  static: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  title: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  titleClass: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */]),
  titleHtml: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  titleSrOnly: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  titleTag: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'h5')
})), components["e" /* NAME_MODAL */]); // --- Main component ---
// @vue/component

var BModal = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: components["e" /* NAME_MODAL */],
  mixins: [attrs["a" /* attrsMixin */], id["a" /* idMixin */], modelMixin, listenOnDocumentMixin, listen_on_root["a" /* listenOnRootMixin */], listenOnWindowMixin, normalize_slot["a" /* normalizeSlotMixin */], scoped_style["a" /* scopedStyleMixin */]],
  inheritAttrs: false,
  props: modal_props,
  data: function data() {
    return {
      isHidden: true,
      // If modal should not be in document
      isVisible: false,
      // Controls modal visible state
      isTransitioning: false,
      // Used for style control
      isShow: false,
      // Used for style control
      isBlock: false,
      // Used for style control
      isOpening: false,
      // To signal that the modal is in the process of opening
      isClosing: false,
      // To signal that the modal is in the process of closing
      ignoreBackdropClick: false,
      // Used to signify if click out listener should ignore the click
      isModalOverflowing: false,
      // The following items are controlled by the modalManager instance
      scrollbarWidth: 0,
      zIndex: modalManager.getBaseZIndex(),
      isTop: true,
      isBodyOverflowing: false
    };
  },
  computed: {
    modalId: function modalId() {
      return this.safeId();
    },
    modalOuterId: function modalOuterId() {
      return this.safeId('__BV_modal_outer_');
    },
    modalHeaderId: function modalHeaderId() {
      return this.safeId('__BV_modal_header_');
    },
    modalBodyId: function modalBodyId() {
      return this.safeId('__BV_modal_body_');
    },
    modalTitleId: function modalTitleId() {
      return this.safeId('__BV_modal_title_');
    },
    modalContentId: function modalContentId() {
      return this.safeId('__BV_modal_content_');
    },
    modalFooterId: function modalFooterId() {
      return this.safeId('__BV_modal_footer_');
    },
    modalBackdropId: function modalBackdropId() {
      return this.safeId('__BV_modal_backdrop_');
    },
    modalClasses: function modalClasses() {
      return [{
        fade: !this.noFade,
        show: this.isShow
      }, this.modalClass];
    },
    modalStyles: function modalStyles() {
      var sbWidth = "".concat(this.scrollbarWidth, "px");
      return {
        paddingLeft: !this.isBodyOverflowing && this.isModalOverflowing ? sbWidth : '',
        paddingRight: this.isBodyOverflowing && !this.isModalOverflowing ? sbWidth : '',
        // Needed to fix issue https://github.com/bootstrap-vue/bootstrap-vue/issues/3457
        // Even though we are using v-show, we must ensure 'none' is restored in the styles
        display: this.isBlock ? 'block' : 'none'
      };
    },
    dialogClasses: function dialogClasses() {
      var _ref;

      return [(_ref = {}, modal_defineProperty(_ref, "modal-".concat(this.size), this.size), modal_defineProperty(_ref, 'modal-dialog-centered', this.centered), modal_defineProperty(_ref, 'modal-dialog-scrollable', this.scrollable), _ref), this.dialogClass];
    },
    headerClasses: function headerClasses() {
      var _ref2;

      return [(_ref2 = {}, modal_defineProperty(_ref2, "bg-".concat(this.headerBgVariant), this.headerBgVariant), modal_defineProperty(_ref2, "text-".concat(this.headerTextVariant), this.headerTextVariant), modal_defineProperty(_ref2, "border-".concat(this.headerBorderVariant), this.headerBorderVariant), _ref2), this.headerClass];
    },
    titleClasses: function titleClasses() {
      return [{
        'sr-only': this.titleSrOnly
      }, this.titleClass];
    },
    bodyClasses: function bodyClasses() {
      var _ref3;

      return [(_ref3 = {}, modal_defineProperty(_ref3, "bg-".concat(this.bodyBgVariant), this.bodyBgVariant), modal_defineProperty(_ref3, "text-".concat(this.bodyTextVariant), this.bodyTextVariant), _ref3), this.bodyClass];
    },
    footerClasses: function footerClasses() {
      var _ref4;

      return [(_ref4 = {}, modal_defineProperty(_ref4, "bg-".concat(this.footerBgVariant), this.footerBgVariant), modal_defineProperty(_ref4, "text-".concat(this.footerTextVariant), this.footerTextVariant), modal_defineProperty(_ref4, "border-".concat(this.footerBorderVariant), this.footerBorderVariant), _ref4), this.footerClass];
    },
    modalOuterStyle: function modalOuterStyle() {
      // Styles needed for proper stacking of modals
      return {
        position: 'absolute',
        zIndex: this.zIndex
      };
    },
    slotScope: function slotScope() {
      return {
        cancel: this.onCancel,
        close: this.onClose,
        hide: this.hide,
        ok: this.onOk,
        visible: this.isVisible
      };
    },
    computeIgnoreEnforceFocusSelector: function computeIgnoreEnforceFocusSelector() {
      // Normalize to an single selector with selectors separated by `,`
      return Object(array["b" /* concat */])(this.ignoreEnforceFocusSelector).filter(identity["a" /* identity */]).join(',').trim();
    },
    computedAttrs: function computedAttrs() {
      // If the parent has a scoped style attribute, and the modal
      // is portalled, add the scoped attribute to the modal wrapper
      var scopedStyleAttrs = !this.static ? this.scopedStyleAttrs : {};
      return modal_objectSpread(modal_objectSpread(modal_objectSpread({}, scopedStyleAttrs), this.bvAttrs), {}, {
        id: this.modalOuterId
      });
    },
    computedModalAttrs: function computedModalAttrs() {
      var isVisible = this.isVisible,
          ariaLabel = this.ariaLabel;
      return {
        id: this.modalId,
        role: 'dialog',
        'aria-hidden': isVisible ? null : 'true',
        'aria-modal': isVisible ? 'true' : null,
        'aria-label': ariaLabel,
        'aria-labelledby': this.hideHeader || ariaLabel || // TODO: Rename slot to `title` and deprecate `modal-title`
        !(this.hasNormalizedSlot(slots["j" /* SLOT_NAME_MODAL_TITLE */]) || this.titleHtml || this.title) ? null : this.modalTitleId,
        'aria-describedby': this.modalBodyId
      };
    }
  },
  watch: modal_defineProperty({}, MODEL_PROP_NAME, function (newValue, oldValue) {
    if (newValue !== oldValue) {
      this[newValue ? 'show' : 'hide']();
    }
  }),
  created: function created() {
    // Define non-reactive properties
    this.$_observer = null;
    this.$_returnFocus = this.returnFocus || null;
  },
  mounted: function mounted() {
    // Set initial z-index as queried from the DOM
    this.zIndex = modalManager.getBaseZIndex(); // Listen for events from others to either open or close ourselves
    // and listen to all modals to enable/disable enforce focus

    this.listenOnRoot(Object(utils_events["d" /* getRootActionEventName */])(components["e" /* NAME_MODAL */], events["z" /* EVENT_NAME_SHOW */]), this.showHandler);
    this.listenOnRoot(Object(utils_events["d" /* getRootActionEventName */])(components["e" /* NAME_MODAL */], events["q" /* EVENT_NAME_HIDE */]), this.hideHandler);
    this.listenOnRoot(Object(utils_events["d" /* getRootActionEventName */])(components["e" /* NAME_MODAL */], events["B" /* EVENT_NAME_TOGGLE */]), this.toggleHandler); // Listen for `bv:modal::show events`, and close ourselves if the
    // opening modal not us

    this.listenOnRoot(Object(utils_events["e" /* getRootEventName */])(components["e" /* NAME_MODAL */], events["z" /* EVENT_NAME_SHOW */]), this.modalListener); // Initially show modal?

    if (this[MODEL_PROP_NAME] === true) {
      this.$nextTick(this.show);
    }
  },
  beforeDestroy: function beforeDestroy() {
    // Ensure everything is back to normal
    this.setObserver(false);

    if (this.isVisible) {
      this.isVisible = false;
      this.isShow = false;
      this.isTransitioning = false;
    }
  },
  methods: {
    setObserver: function setObserver() {
      var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.$_observer && this.$_observer.disconnect();
      this.$_observer = null;

      if (on) {
        this.$_observer = Object(observe_dom["a" /* observeDom */])(this.$refs.content, this.checkModalOverflow.bind(this), OBSERVER_CONFIG);
      }
    },
    // Private method to update the v-model
    updateModel: function updateModel(value) {
      if (value !== this[MODEL_PROP_NAME]) {
        this.$emit(MODEL_EVENT_NAME, value);
      }
    },
    // Private method to create a BvModalEvent object
    buildEvent: function buildEvent(type) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new bv_modal_event_class_BvModalEvent(type, modal_objectSpread(modal_objectSpread({
        // Default options
        cancelable: false,
        target: this.$refs.modal || this.$el || null,
        relatedTarget: null,
        trigger: null
      }, options), {}, {
        // Options that can't be overridden
        vueTarget: this,
        componentId: this.modalId
      }));
    },
    // Public method to show modal
    show: function show() {
      if (this.isVisible || this.isOpening) {
        // If already open, or in the process of opening, do nothing

        /* istanbul ignore next */
        return;
      }
      /* istanbul ignore next */


      if (this.isClosing) {
        // If we are in the process of closing, wait until hidden before re-opening

        /* istanbul ignore next */
        this.$once(events["p" /* EVENT_NAME_HIDDEN */], this.show);
        /* istanbul ignore next */

        return;
      }

      this.isOpening = true; // Set the element to return focus to when closed

      this.$_returnFocus = this.$_returnFocus || this.getActiveElement();
      var showEvt = this.buildEvent(events["z" /* EVENT_NAME_SHOW */], {
        cancelable: true
      });
      this.emitEvent(showEvt); // Don't show if canceled

      if (showEvt.defaultPrevented || this.isVisible) {
        this.isOpening = false; // Ensure the v-model reflects the current state

        this.updateModel(false);
        return;
      } // Show the modal


      this.doShow();
    },
    // Public method to hide modal
    hide: function hide() {
      var trigger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (!this.isVisible || this.isClosing) {
        /* istanbul ignore next */
        return;
      }

      this.isClosing = true;
      var hideEvt = this.buildEvent(events["q" /* EVENT_NAME_HIDE */], {
        cancelable: trigger !== TRIGGER_FORCE,
        trigger: trigger || null
      }); // We emit specific event for one of the three built-in buttons

      if (trigger === BUTTON_OK) {
        this.$emit(events["w" /* EVENT_NAME_OK */], hideEvt);
      } else if (trigger === BUTTON_CANCEL) {
        this.$emit(events["b" /* EVENT_NAME_CANCEL */], hideEvt);
      } else if (trigger === BUTTON_CLOSE) {
        this.$emit(events["f" /* EVENT_NAME_CLOSE */], hideEvt);
      }

      this.emitEvent(hideEvt); // Hide if not canceled

      if (hideEvt.defaultPrevented || !this.isVisible) {
        this.isClosing = false; // Ensure v-model reflects current state

        this.updateModel(true);
        return;
      } // Stop observing for content changes


      this.setObserver(false); // Trigger the hide transition

      this.isVisible = false; // Update the v-model

      this.updateModel(false);
    },
    // Public method to toggle modal visibility
    toggle: function toggle(triggerEl) {
      if (triggerEl) {
        this.$_returnFocus = triggerEl;
      }

      if (this.isVisible) {
        this.hide(TRIGGER_TOGGLE);
      } else {
        this.show();
      }
    },
    // Private method to get the current document active element
    getActiveElement: function getActiveElement() {
      // Returning focus to `document.body` may cause unwanted scrolls,
      // so we exclude setting focus on body
      var activeElement = Object(dom["g" /* getActiveElement */])(env["f" /* IS_BROWSER */] ? [document.body] : []); // Preset the fallback return focus value if it is not set
      // `document.activeElement` should be the trigger element that was clicked or
      // in the case of using the v-model, which ever element has current focus
      // Will be overridden by some commands such as toggle, etc.
      // Note: On IE 11, `document.activeElement` may be `null`
      // So we test it for truthiness first
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/3206


      return activeElement && activeElement.focus ? activeElement : null;
    },
    // Private method to finish showing modal
    doShow: function doShow() {
      var _this = this;

      /* istanbul ignore next: commenting out for now until we can test stacking */
      if (modalManager.modalsAreOpen && this.noStacking) {
        // If another modal(s) is already open, wait for it(them) to close
        this.listenOnRootOnce(Object(utils_events["e" /* getRootEventName */])(components["e" /* NAME_MODAL */], events["p" /* EVENT_NAME_HIDDEN */]), this.doShow);
        return;
      }

      modalManager.registerModal(this); // Place modal in DOM

      this.isHidden = false;
      this.$nextTick(function () {
        // We do this in `$nextTick()` to ensure the modal is in DOM first
        // before we show it
        _this.isVisible = true;
        _this.isOpening = false; // Update the v-model

        _this.updateModel(true);

        _this.$nextTick(function () {
          // Observe changes in modal content and adjust if necessary
          // In a `$nextTick()` in case modal content is lazy
          _this.setObserver(true);
        });
      });
    },
    // Transition handlers
    onBeforeEnter: function onBeforeEnter() {
      this.isTransitioning = true;
      this.setResizeEvent(true);
    },
    onEnter: function onEnter() {
      var _this2 = this;

      this.isBlock = true; // We add the `show` class 1 frame later
      // `requestAF()` runs the callback before the next repaint, so we need
      // two calls to guarantee the next frame has been rendered

      Object(dom["w" /* requestAF */])(function () {
        Object(dom["w" /* requestAF */])(function () {
          _this2.isShow = true;
        });
      });
    },
    onAfterEnter: function onAfterEnter() {
      var _this3 = this;

      this.checkModalOverflow();
      this.isTransitioning = false; // We use `requestAF()` to allow transition hooks to complete
      // before passing control over to the other handlers
      // This will allow users to not have to use `$nextTick()` or `requestAF()`
      // when trying to pre-focus an element

      Object(dom["w" /* requestAF */])(function () {
        _this3.emitEvent(_this3.buildEvent(events["A" /* EVENT_NAME_SHOWN */]));

        _this3.setEnforceFocus(true);

        _this3.$nextTick(function () {
          // Delayed in a `$nextTick()` to allow users time to pre-focus
          // an element if the wish
          _this3.focusFirst();
        });
      });
    },
    onBeforeLeave: function onBeforeLeave() {
      this.isTransitioning = true;
      this.setResizeEvent(false);
      this.setEnforceFocus(false);
    },
    onLeave: function onLeave() {
      // Remove the 'show' class
      this.isShow = false;
    },
    onAfterLeave: function onAfterLeave() {
      var _this4 = this;

      this.isBlock = false;
      this.isTransitioning = false;
      this.isModalOverflowing = false;
      this.isHidden = true;
      this.$nextTick(function () {
        _this4.isClosing = false;
        modalManager.unregisterModal(_this4);

        _this4.returnFocusTo(); // TODO: Need to find a way to pass the `trigger` property
        //       to the `hidden` event, not just only the `hide` event


        _this4.emitEvent(_this4.buildEvent(events["p" /* EVENT_NAME_HIDDEN */]));
      });
    },
    emitEvent: function emitEvent(bvEvent) {
      var type = bvEvent.type; // We emit on `$root` first in case a global listener wants to cancel
      // the event first before the instance emits its event

      this.emitOnRoot(Object(utils_events["e" /* getRootEventName */])(components["e" /* NAME_MODAL */], type), bvEvent, bvEvent.componentId);
      this.$emit(type, bvEvent);
    },
    // UI event handlers
    onDialogMousedown: function onDialogMousedown() {
      var _this5 = this;

      // Watch to see if the matching mouseup event occurs outside the dialog
      // And if it does, cancel the clickOut handler
      var modal = this.$refs.modal;

      var onceModalMouseup = function onceModalMouseup(event) {
        Object(utils_events["a" /* eventOff */])(modal, 'mouseup', onceModalMouseup, events["C" /* EVENT_OPTIONS_NO_CAPTURE */]);

        if (event.target === modal) {
          _this5.ignoreBackdropClick = true;
        }
      };

      Object(utils_events["b" /* eventOn */])(modal, 'mouseup', onceModalMouseup, events["C" /* EVENT_OPTIONS_NO_CAPTURE */]);
    },
    onClickOut: function onClickOut(event) {
      if (this.ignoreBackdropClick) {
        // Click was initiated inside the modal content, but finished outside.
        // Set by the above onDialogMousedown handler
        this.ignoreBackdropClick = false;
        return;
      } // Do nothing if not visible, backdrop click disabled, or element
      // that generated click event is no longer in document body


      if (!this.isVisible || this.noCloseOnBackdrop || !Object(dom["f" /* contains */])(document.body, event.target)) {
        return;
      } // If backdrop clicked, hide modal


      if (!Object(dom["f" /* contains */])(this.$refs.content, event.target)) {
        this.hide(TRIGGER_BACKDROP);
      }
    },
    onOk: function onOk() {
      this.hide(BUTTON_OK);
    },
    onCancel: function onCancel() {
      this.hide(BUTTON_CANCEL);
    },
    onClose: function onClose() {
      this.hide(BUTTON_CLOSE);
    },
    onEsc: function onEsc(event) {
      // If ESC pressed, hide modal
      if (event.keyCode === key_codes["d" /* CODE_ESC */] && this.isVisible && !this.noCloseOnEsc) {
        this.hide(TRIGGER_ESC);
      }
    },
    // Document focusin listener
    focusHandler: function focusHandler(event) {
      // If focus leaves modal content, bring it back
      var content = this.$refs.content;
      var target = event.target;

      if (this.noEnforceFocus || !this.isTop || !this.isVisible || !content || document === target || Object(dom["f" /* contains */])(content, target) || this.computeIgnoreEnforceFocusSelector && Object(dom["e" /* closest */])(this.computeIgnoreEnforceFocusSelector, target, true)) {
        return;
      }

      var tabables = Object(dom["m" /* getTabables */])(this.$refs.content);
      var bottomTrap = this.$refs['bottom-trap'];
      var topTrap = this.$refs['top-trap'];

      if (bottomTrap && target === bottomTrap) {
        // If user pressed TAB out of modal into our bottom trab trap element
        // Find the first tabable element in the modal content and focus it
        if (Object(dom["d" /* attemptFocus */])(tabables[0])) {
          // Focus was successful
          return;
        }
      } else if (topTrap && target === topTrap) {
        // If user pressed CTRL-TAB out of modal and into our top tab trap element
        // Find the last tabable element in the modal content and focus it
        if (Object(dom["d" /* attemptFocus */])(tabables[tabables.length - 1])) {
          // Focus was successful
          return;
        }
      } // Otherwise focus the modal content container


      Object(dom["d" /* attemptFocus */])(content, {
        preventScroll: true
      });
    },
    // Turn on/off focusin listener
    setEnforceFocus: function setEnforceFocus(on) {
      this.listenDocument(on, 'focusin', this.focusHandler);
    },
    // Resize listener
    setResizeEvent: function setResizeEvent(on) {
      this.listenWindow(on, 'resize', this.checkModalOverflow);
      this.listenWindow(on, 'orientationchange', this.checkModalOverflow);
    },
    // Root listener handlers
    showHandler: function showHandler(id, triggerEl) {
      if (id === this.modalId) {
        this.$_returnFocus = triggerEl || this.getActiveElement();
        this.show();
      }
    },
    hideHandler: function hideHandler(id) {
      if (id === this.modalId) {
        this.hide('event');
      }
    },
    toggleHandler: function toggleHandler(id, triggerEl) {
      if (id === this.modalId) {
        this.toggle(triggerEl);
      }
    },
    modalListener: function modalListener(bvEvent) {
      // If another modal opens, close this one if stacking not permitted
      if (this.noStacking && bvEvent.vueTarget !== this) {
        this.hide();
      }
    },
    // Focus control handlers
    focusFirst: function focusFirst() {
      var _this6 = this;

      // Don't try and focus if we are SSR
      if (env["f" /* IS_BROWSER */]) {
        Object(dom["w" /* requestAF */])(function () {
          var modal = _this6.$refs.modal;
          var content = _this6.$refs.content;

          var activeElement = _this6.getActiveElement(); // If the modal contains the activeElement, we don't do anything


          if (modal && content && !(activeElement && Object(dom["f" /* contains */])(content, activeElement))) {
            var ok = _this6.$refs['ok-button'];
            var cancel = _this6.$refs['cancel-button'];
            var close = _this6.$refs['close-button']; // Focus the appropriate button or modal content wrapper

            var autoFocus = _this6.autoFocusButton;
            /* istanbul ignore next */

            var el = autoFocus === BUTTON_OK && ok ? ok.$el || ok : autoFocus === BUTTON_CANCEL && cancel ? cancel.$el || cancel : autoFocus === BUTTON_CLOSE && close ? close.$el || close : content; // Focus the element

            Object(dom["d" /* attemptFocus */])(el);

            if (el === content) {
              // Make sure top of modal is showing (if longer than the viewport)
              _this6.$nextTick(function () {
                modal.scrollTop = 0;
              });
            }
          }
        });
      }
    },
    returnFocusTo: function returnFocusTo() {
      // Prefer `returnFocus` prop over event specified
      // `return_focus` value
      var el = this.returnFocus || this.$_returnFocus || null;
      this.$_returnFocus = null;
      this.$nextTick(function () {
        // Is el a string CSS selector?
        el = Object(inspect["k" /* isString */])(el) ? Object(dom["x" /* select */])(el) : el;

        if (el) {
          // Possibly could be a component reference
          el = el.$el || el;
          Object(dom["d" /* attemptFocus */])(el);
        }
      });
    },
    checkModalOverflow: function checkModalOverflow() {
      if (this.isVisible) {
        var modal = this.$refs.modal;
        this.isModalOverflowing = modal.scrollHeight > document.documentElement.clientHeight;
      }
    },
    makeModal: function makeModal(h) {
      // Modal header
      var $header = h();

      if (!this.hideHeader) {
        // TODO: Rename slot to `header` and deprecate `modal-header`
        var $modalHeader = this.normalizeSlot(slots["g" /* SLOT_NAME_MODAL_HEADER */], this.slotScope);

        if (!$modalHeader) {
          var $closeButton = h();

          if (!this.hideHeaderClose) {
            $closeButton = h(button_close["a" /* BButtonClose */], {
              props: {
                content: this.headerCloseContent,
                disabled: this.isTransitioning,
                ariaLabel: this.headerCloseLabel,
                textVariant: this.headerCloseVariant || this.headerTextVariant
              },
              on: {
                click: this.onClose
              },
              ref: 'close-button'
            }, // TODO: Rename slot to `header-close` and deprecate `modal-header-close`
            [this.normalizeSlot(slots["h" /* SLOT_NAME_MODAL_HEADER_CLOSE */])]);
          }

          $modalHeader = [h(this.titleTag, {
            staticClass: 'modal-title',
            class: this.titleClasses,
            attrs: {
              id: this.modalTitleId
            },
            // TODO: Rename slot to `title` and deprecate `modal-title`
            domProps: this.hasNormalizedSlot(slots["j" /* SLOT_NAME_MODAL_TITLE */]) ? {} : Object(html["a" /* htmlOrText */])(this.titleHtml, this.title)
          }, // TODO: Rename slot to `title` and deprecate `modal-title`
          this.normalizeSlot(slots["j" /* SLOT_NAME_MODAL_TITLE */], this.slotScope)), $closeButton];
        }

        $header = h('header', {
          staticClass: 'modal-header',
          class: this.headerClasses,
          attrs: {
            id: this.modalHeaderId
          },
          ref: 'header'
        }, [$modalHeader]);
      } // Modal body


      var $body = h('div', {
        staticClass: 'modal-body',
        class: this.bodyClasses,
        attrs: {
          id: this.modalBodyId
        },
        ref: 'body'
      }, this.normalizeSlot(slots["a" /* SLOT_NAME_DEFAULT */], this.slotScope)); // Modal footer

      var $footer = h();

      if (!this.hideFooter) {
        // TODO: Rename slot to `footer` and deprecate `modal-footer`
        var $modalFooter = this.normalizeSlot(slots["f" /* SLOT_NAME_MODAL_FOOTER */], this.slotScope);

        if (!$modalFooter) {
          var $cancelButton = h();

          if (!this.okOnly) {
            $cancelButton = h(BButton, {
              props: {
                variant: this.cancelVariant,
                size: this.buttonSize,
                disabled: this.cancelDisabled || this.busy || this.isTransitioning
              },
              // TODO: Rename slot to `cancel-button` and deprecate `modal-cancel`
              domProps: this.hasNormalizedSlot(slots["e" /* SLOT_NAME_MODAL_CANCEL */]) ? {} : Object(html["a" /* htmlOrText */])(this.cancelTitleHtml, this.cancelTitle),
              on: {
                click: this.onCancel
              },
              ref: 'cancel-button'
            }, // TODO: Rename slot to `cancel-button` and deprecate `modal-cancel`
            this.normalizeSlot(slots["e" /* SLOT_NAME_MODAL_CANCEL */]));
          }

          var $okButton = h(BButton, {
            props: {
              variant: this.okVariant,
              size: this.buttonSize,
              disabled: this.okDisabled || this.busy || this.isTransitioning
            },
            // TODO: Rename slot to `ok-button` and deprecate `modal-ok`
            domProps: this.hasNormalizedSlot(slots["i" /* SLOT_NAME_MODAL_OK */]) ? {} : Object(html["a" /* htmlOrText */])(this.okTitleHtml, this.okTitle),
            on: {
              click: this.onOk
            },
            ref: 'ok-button'
          }, // TODO: Rename slot to `ok-button` and deprecate `modal-ok`
          this.normalizeSlot(slots["i" /* SLOT_NAME_MODAL_OK */]));
          $modalFooter = [$cancelButton, $okButton];
        }

        $footer = h('footer', {
          staticClass: 'modal-footer',
          class: this.footerClasses,
          attrs: {
            id: this.modalFooterId
          },
          ref: 'footer'
        }, [$modalFooter]);
      } // Assemble modal content


      var $modalContent = h('div', {
        staticClass: 'modal-content',
        class: this.contentClass,
        attrs: {
          id: this.modalContentId,
          tabindex: '-1'
        },
        ref: 'content'
      }, [$header, $body, $footer]); // Tab traps to prevent page from scrolling to next element in
      // tab index during enforce-focus tab cycle

      var $tabTrapTop = h();
      var $tabTrapBottom = h();

      if (this.isVisible && !this.noEnforceFocus) {
        $tabTrapTop = h('span', {
          attrs: {
            tabindex: '0'
          },
          ref: 'top-trap'
        });
        $tabTrapBottom = h('span', {
          attrs: {
            tabindex: '0'
          },
          ref: 'bottom-trap'
        });
      } // Modal dialog wrapper


      var $modalDialog = h('div', {
        staticClass: 'modal-dialog',
        class: this.dialogClasses,
        on: {
          mousedown: this.onDialogMousedown
        },
        ref: 'dialog'
      }, [$tabTrapTop, $modalContent, $tabTrapBottom]); // Modal

      var $modal = h('div', {
        staticClass: 'modal',
        class: this.modalClasses,
        style: this.modalStyles,
        attrs: this.computedModalAttrs,
        on: {
          keydown: this.onEsc,
          click: this.onClickOut
        },
        directives: [{
          name: 'show',
          value: this.isVisible
        }],
        ref: 'modal'
      }, [$modalDialog]); // Wrap modal in transition
      // Sadly, we can't use `BVTransition` here due to the differences in
      // transition durations for `.modal` and `.modal-dialog`
      // At least until https://github.com/vuejs/vue/issues/9986 is resolved

      $modal = h('transition', {
        props: {
          enterClass: '',
          enterToClass: '',
          enterActiveClass: '',
          leaveClass: '',
          leaveActiveClass: '',
          leaveToClass: ''
        },
        on: {
          beforeEnter: this.onBeforeEnter,
          enter: this.onEnter,
          afterEnter: this.onAfterEnter,
          beforeLeave: this.onBeforeLeave,
          leave: this.onLeave,
          afterLeave: this.onAfterLeave
        }
      }, [$modal]); // Modal backdrop

      var $backdrop = h();

      if (!this.hideBackdrop && this.isVisible) {
        $backdrop = h('div', {
          staticClass: 'modal-backdrop',
          attrs: {
            id: this.modalBackdropId
          }
        }, // TODO: Rename slot to `backdrop` and deprecate `modal-backdrop`
        this.normalizeSlot(slots["d" /* SLOT_NAME_MODAL_BACKDROP */]));
      }

      $backdrop = h(bv_transition["a" /* BVTransition */], {
        props: {
          noFade: this.noFade
        }
      }, [$backdrop]); // Assemble modal and backdrop in an outer <div>

      return h('div', {
        style: this.modalOuterStyle,
        attrs: this.computedAttrs,
        key: "modal-outer-".concat(this[vue["a" /* COMPONENT_UID_KEY */]])
      }, [$modal, $backdrop]);
    }
  },
  render: function render(h) {
    if (this.static) {
      return this.lazy && this.isHidden ? h() : this.makeModal(h);
    } else {
      return this.isHidden ? h() : h(BVTransporter, [this.makeModal(h)]);
    }
  }
});

/***/ }),

/***/ "700c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ TabsPlugin; });

// UNUSED EXPORTS: BTabs, BTab

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/vue.js
var vue = __webpack_require__("2f79");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/components.js
var components = __webpack_require__("c637");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/env.js
var env = __webpack_require__("e863");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/events.js
var events = __webpack_require__("0056");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/key-codes.js
var key_codes = __webpack_require__("9bfa");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/props.js
var constants_props = __webpack_require__("a723");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/slots.js
var slots = __webpack_require__("9b76");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/array.js
var array = __webpack_require__("2326");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/bv-event.class.js
var bv_event_class = __webpack_require__("6d40");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/dom.js
var dom = __webpack_require__("906c");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/events.js
var utils_events = __webpack_require__("6b77");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/identity.js
var identity = __webpack_require__("6c06");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/inspect.js
var inspect = __webpack_require__("7b1e");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/loose-equal.js
var loose_equal = __webpack_require__("3c21");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/math.js
var math = __webpack_require__("a8c8");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/model.js
var model = __webpack_require__("58f2");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/number.js
var number = __webpack_require__("3a58");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/object.js
var object = __webpack_require__("d82f");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/observe-dom.js
var observe_dom = __webpack_require__("47df");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/props.js
var utils_props = __webpack_require__("cf75");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/stable-sort.js
/*
 * Consistent and stable sort function across JavaScript platforms
 *
 * Inconsistent sorts can cause SSR problems between client and server
 * such as in <b-table> if sortBy is applied to the data on server side render.
 * Chrome and V8 native sorts are inconsistent/unstable
 *
 * This function uses native sort with fallback to index compare when the a and b
 * compare returns 0
 *
 * Algorithm based on:
 * https://stackoverflow.com/questions/1427608/fast-stable-sorting-algorithm-implementation-in-javascript/45422645#45422645
 *
 * @param {array} array to sort
 * @param {function} sort compare function
 * @return {array}
 */
var stableSort = function stableSort(array, compareFn) {
  // Using `.bind(compareFn)` on the wrapped anonymous function improves
  // performance by avoiding the function call setup. We don't use an arrow
  // function here as it binds `this` to the `stableSort` context rather than
  // the `compareFn` context, which wouldn't give us the performance increase.
  return array.map(function (a, index) {
    return [index, a];
  }).sort(function (a, b) {
    return this(a[1], b[1]) || a[0] - b[0];
  }.bind(compareFn)).map(function (e) {
    return e[1];
  });
};
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/mixins/id.js
var mixins_id = __webpack_require__("90ef");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/mixins/normalize-slot.js
var normalize_slot = __webpack_require__("8c18");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/link/link.js + 1 modules
var link_link = __webpack_require__("aa59");

// EXTERNAL MODULE: ./node_modules/vue-functional-data-merge/dist/lib.esm.js
var lib_esm = __webpack_require__("b42e");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/nav/nav.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




 // --- Helper methods ---

var computeJustifyContent = function computeJustifyContent(value) {
  value = value === 'left' ? 'start' : value === 'right' ? 'end' : value;
  return "justify-content-".concat(value);
}; // --- Props ---


var nav_props = Object(utils_props["b" /* makePropsConfigurable */])({
  align: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
  // Set to `true` if placing in a card header
  cardHeader: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  fill: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  justified: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  pills: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  small: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  tabs: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  tag: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'ul'),
  vertical: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false)
}, components["f" /* NAME_NAV */]); // --- Main component ---
// @vue/component

var BNav = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: components["f" /* NAME_NAV */],
  functional: true,
  props: nav_props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var tabs = props.tabs,
        pills = props.pills,
        vertical = props.vertical,
        align = props.align,
        cardHeader = props.cardHeader;
    return h(props.tag, Object(lib_esm["a" /* mergeData */])(data, {
      staticClass: 'nav',
      class: (_class = {
        'nav-tabs': tabs,
        'nav-pills': pills && !tabs,
        'card-header-tabs': !vertical && cardHeader && tabs,
        'card-header-pills': !vertical && cardHeader && pills && !tabs,
        'flex-column': vertical,
        'nav-fill': !vertical && props.fill,
        'nav-justified': !vertical && props.justified
      }, _defineProperty(_class, computeJustifyContent(align), !vertical && align), _defineProperty(_class, "small", props.small), _class)
    }), children);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/tabs/tabs.js
var _watch;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { tabs_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function tabs_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

























 // --- Constants ---

var _makeModelMixin = Object(model["a" /* makeModelMixin */])('value', {
  type: constants_props["h" /* PROP_TYPE_NUMBER */]
}),
    modelMixin = _makeModelMixin.mixin,
    modelProps = _makeModelMixin.props,
    MODEL_PROP_NAME = _makeModelMixin.prop,
    MODEL_EVENT_NAME = _makeModelMixin.event; // --- Helper methods ---
// Filter function to filter out disabled tabs


var notDisabled = function notDisabled(tab) {
  return !tab.disabled;
}; // --- Helper components ---
// @vue/component


var BVTabButton = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: components["l" /* NAME_TAB_BUTTON_HELPER */],
  inject: {
    bvTabs: {
      default:
      /* istanbul ignore next */
      function _default() {
        return {};
      }
    }
  },
  props: {
    controls: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
    id: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */]),
    noKeyNav: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
    posInSet: Object(utils_props["a" /* makeProp */])(constants_props["h" /* PROP_TYPE_NUMBER */]),
    setSize: Object(utils_props["a" /* makeProp */])(constants_props["h" /* PROP_TYPE_NUMBER */]),
    // Reference to the child <b-tab> instance
    tab: Object(utils_props["a" /* makeProp */])(),
    tabIndex: Object(utils_props["a" /* makeProp */])(constants_props["h" /* PROP_TYPE_NUMBER */])
  },
  methods: {
    focus: function focus() {
      Object(dom["d" /* attemptFocus */])(this.$refs.link);
    },
    handleEvt: function handleEvt(event) {
      /* istanbul ignore next */
      if (this.tab.disabled) {
        return;
      }

      var type = event.type,
          keyCode = event.keyCode,
          shiftKey = event.shiftKey;

      if (type === 'click') {
        Object(utils_events["f" /* stopEvent */])(event);
        this.$emit(events["e" /* EVENT_NAME_CLICK */], event);
      } else if (type === 'keydown' && keyCode === key_codes["h" /* CODE_SPACE */]) {
        // For ARIA tabs the SPACE key will also trigger a click/select
        // Even with keyboard navigation disabled, SPACE should "click" the button
        // See: https://github.com/bootstrap-vue/bootstrap-vue/issues/4323
        Object(utils_events["f" /* stopEvent */])(event);
        this.$emit(events["e" /* EVENT_NAME_CLICK */], event);
      } else if (type === 'keydown' && !this.noKeyNav) {
        // For keyboard navigation
        if ([key_codes["i" /* CODE_UP */], key_codes["f" /* CODE_LEFT */], key_codes["e" /* CODE_HOME */]].indexOf(keyCode) !== -1) {
          Object(utils_events["f" /* stopEvent */])(event);

          if (shiftKey || keyCode === key_codes["e" /* CODE_HOME */]) {
            this.$emit(events["m" /* EVENT_NAME_FIRST */], event);
          } else {
            this.$emit(events["y" /* EVENT_NAME_PREV */], event);
          }
        } else if ([key_codes["a" /* CODE_DOWN */], key_codes["g" /* CODE_RIGHT */], key_codes["b" /* CODE_END */]].indexOf(keyCode) !== -1) {
          Object(utils_events["f" /* stopEvent */])(event);

          if (shiftKey || keyCode === key_codes["b" /* CODE_END */]) {
            this.$emit(events["s" /* EVENT_NAME_LAST */], event);
          } else {
            this.$emit(events["v" /* EVENT_NAME_NEXT */], event);
          }
        }
      }
    }
  },
  render: function render(h) {
    var id = this.id,
        tabIndex = this.tabIndex,
        setSize = this.setSize,
        posInSet = this.posInSet,
        controls = this.controls,
        handleEvt = this.handleEvt;
    var _this$tab = this.tab,
        title = _this$tab.title,
        localActive = _this$tab.localActive,
        disabled = _this$tab.disabled,
        titleItemClass = _this$tab.titleItemClass,
        titleLinkClass = _this$tab.titleLinkClass,
        titleLinkAttributes = _this$tab.titleLinkAttributes;
    var $link = h(link_link["a" /* BLink */], {
      staticClass: 'nav-link',
      class: [{
        active: localActive && !disabled,
        disabled: disabled
      }, titleLinkClass, // Apply <b-tabs> `activeNavItemClass` styles when the tab is active
      localActive ? this.bvTabs.activeNavItemClass : null],
      props: {
        disabled: disabled
      },
      attrs: _objectSpread(_objectSpread({}, titleLinkAttributes), {}, {
        id: id,
        role: 'tab',
        // Roving tab index when keynav enabled
        tabindex: tabIndex,
        'aria-selected': localActive && !disabled ? 'true' : 'false',
        'aria-setsize': setSize,
        'aria-posinset': posInSet,
        'aria-controls': controls
      }),
      on: {
        click: handleEvt,
        keydown: handleEvt
      },
      ref: 'link'
    }, [this.tab.normalizeSlot(slots["m" /* SLOT_NAME_TITLE */]) || title]);
    return h('li', {
      staticClass: 'nav-item',
      class: [titleItemClass],
      attrs: {
        role: 'presentation'
      }
    }, [$link]);
  }
}); // --- Props ---

var navProps = Object(object["i" /* omit */])(nav_props, ['tabs', 'isNavBar', 'cardHeader']);
var tabs_props = Object(utils_props["b" /* makePropsConfigurable */])(Object(object["l" /* sortKeys */])(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, mixins_id["b" /* props */]), modelProps), navProps), {}, {
  // Only applied to the currently active `<b-nav-item>`
  activeNavItemClass: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */]),
  // Only applied to the currently active `<b-tab>`
  // This prop is sniffed by the `<b-tab>` child
  activeTabClass: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */]),
  card: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  contentClass: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */]),
  // Synonym for 'bottom'
  end: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  // This prop is sniffed by the `<b-tab>` child
  lazy: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  navClass: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */]),
  navWrapperClass: Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */]),
  noFade: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  noKeyNav: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  noNavStyle: Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false),
  tag: Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'div')
})), components["k" /* NAME_TABS */]); // --- Main component ---
// @vue/component

var BTabs = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: components["k" /* NAME_TABS */],
  mixins: [mixins_id["a" /* idMixin */], modelMixin, normalize_slot["a" /* normalizeSlotMixin */]],
  provide: function provide() {
    return {
      bvTabs: this
    };
  },
  props: tabs_props,
  data: function data() {
    return {
      // Index of current tab
      currentTab: Object(number["c" /* toInteger */])(this[MODEL_PROP_NAME], -1),
      // Array of direct child `<b-tab>` instances, in DOM order
      tabs: [],
      // Array of child instances registered (for triggering reactive updates)
      registeredTabs: []
    };
  },
  computed: {
    fade: function fade() {
      // This computed prop is sniffed by the tab child
      return !this.noFade;
    },
    localNavClass: function localNavClass() {
      var classes = [];

      if (this.card && this.vertical) {
        classes.push('card-header', 'h-100', 'border-bottom-0', 'rounded-0');
      }

      return [].concat(classes, [this.navClass]);
    }
  },
  watch: (_watch = {}, tabs_defineProperty(_watch, MODEL_PROP_NAME, function (newValue, oldValue) {
    if (newValue !== oldValue) {
      newValue = Object(number["c" /* toInteger */])(newValue, -1);
      oldValue = Object(number["c" /* toInteger */])(oldValue, 0);
      var $tab = this.tabs[newValue];

      if ($tab && !$tab.disabled) {
        this.activateTab($tab);
      } else {
        // Try next or prev tabs
        if (newValue < oldValue) {
          this.previousTab();
        } else {
          this.nextTab();
        }
      }
    }
  }), tabs_defineProperty(_watch, "currentTab", function currentTab(newValue) {
    var index = -1; // Ensure only one tab is active at most

    this.tabs.forEach(function ($tab, i) {
      if (i === newValue && !$tab.disabled) {
        $tab.localActive = true;
        index = i;
      } else {
        $tab.localActive = false;
      }
    }); // Update the v-model

    this.$emit(MODEL_EVENT_NAME, index);
  }), tabs_defineProperty(_watch, "tabs", function tabs(newValue, oldValue) {
    var _this = this;

    // We use `_uid` instead of `safeId()`, as the later is changed in a `$nextTick()`
    // if no explicit ID is provided, causing duplicate emits
    if (!Object(loose_equal["a" /* looseEqual */])(newValue.map(function ($tab) {
      return $tab[vue["a" /* COMPONENT_UID_KEY */]];
    }), oldValue.map(function ($tab) {
      return $tab[vue["a" /* COMPONENT_UID_KEY */]];
    }))) {
      // In a `$nextTick()` to ensure `currentTab` has been set first
      this.$nextTick(function () {
        // We emit shallow copies of the new and old arrays of tabs,
        // to prevent users from potentially mutating the internal arrays
        _this.$emit(events["d" /* EVENT_NAME_CHANGED */], newValue.slice(), oldValue.slice());
      });
    }
  }), tabs_defineProperty(_watch, "registeredTabs", function registeredTabs() {
    this.updateTabs();
  }), _watch),
  created: function created() {
    // Create private non-reactive props
    this.$_observer = null;
  },
  mounted: function mounted() {
    this.setObserver(true);
  },
  beforeDestroy: function beforeDestroy() {
    this.setObserver(false); // Ensure no references to child instances exist

    this.tabs = [];
  },
  methods: {
    registerTab: function registerTab($tab) {
      if (!Object(array["a" /* arrayIncludes */])(this.registeredTabs, $tab)) {
        this.registeredTabs.push($tab);
      }
    },
    unregisterTab: function unregisterTab($tab) {
      this.registeredTabs = this.registeredTabs.slice().filter(function ($t) {
        return $t !== $tab;
      });
    },
    // DOM observer is needed to detect changes in order of tabs
    setObserver: function setObserver() {
      var _this2 = this;

      var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.$_observer && this.$_observer.disconnect();
      this.$_observer = null;

      if (on) {
        /* istanbul ignore next: difficult to test mutation observer in JSDOM */
        var handler = function handler() {
          _this2.$nextTick(function () {
            Object(dom["w" /* requestAF */])(function () {
              _this2.updateTabs();
            });
          });
        }; // Watch for changes to `<b-tab>` sub components


        this.$_observer = Object(observe_dom["a" /* observeDom */])(this.$refs.content, handler, {
          childList: true,
          subtree: false,
          attributes: true,
          attributeFilter: ['id']
        });
      }
    },
    getTabs: function getTabs() {
      var $tabs = this.registeredTabs.filter(function ($tab) {
        return $tab.$children.filter(function ($t) {
          return $t._isTab;
        }).length === 0;
      }); // DOM Order of Tabs

      var order = [];
      /* istanbul ignore next: too difficult to test */

      if (env["f" /* IS_BROWSER */] && $tabs.length > 0) {
        // We rely on the DOM when mounted to get the "true" order of the `<b-tab>` children
        // `querySelectorAll()` always returns elements in document order, regardless of
        // order specified in the selector
        var selector = $tabs.map(function ($tab) {
          return "#".concat($tab.safeId());
        }).join(', ');
        order = Object(dom["y" /* selectAll */])(selector, this.$el).map(function ($el) {
          return $el.id;
        }).filter(identity["a" /* identity */]);
      } // Stable sort keeps the original order if not found in the `order` array,
      // which will be an empty array before mount


      return stableSort($tabs, function (a, b) {
        return order.indexOf(a.safeId()) - order.indexOf(b.safeId());
      });
    },
    updateTabs: function updateTabs() {
      var $tabs = this.getTabs(); // Find last active non-disabled tab in current tabs
      // We trust tab state over `currentTab`, in case tabs were added/removed/re-ordered

      var tabIndex = $tabs.indexOf($tabs.slice().reverse().find(function ($tab) {
        return $tab.localActive && !$tab.disabled;
      })); // Else try setting to `currentTab`

      if (tabIndex < 0) {
        var currentTab = this.currentTab;

        if (currentTab >= $tabs.length) {
          // Handle last tab being removed, so find the last non-disabled tab
          tabIndex = $tabs.indexOf($tabs.slice().reverse().find(notDisabled));
        } else if ($tabs[currentTab] && !$tabs[currentTab].disabled) {
          // Current tab is not disabled
          tabIndex = currentTab;
        }
      } // Else find first non-disabled tab in current tabs


      if (tabIndex < 0) {
        tabIndex = $tabs.indexOf($tabs.find(notDisabled));
      } // Ensure only one tab is active at a time


      $tabs.forEach(function ($tab, index) {
        $tab.localActive = index === tabIndex;
      });
      this.tabs = $tabs;
      this.currentTab = tabIndex;
    },
    // Find a button that controls a tab, given the tab reference
    // Returns the button vm instance
    getButtonForTab: function getButtonForTab($tab) {
      return (this.$refs.buttons || []).find(function ($btn) {
        return $btn.tab === $tab;
      });
    },
    // Force a button to re-render its content, given a `<b-tab>` instance
    // Called by `<b-tab>` on `update()`
    updateButton: function updateButton($tab) {
      var $button = this.getButtonForTab($tab);

      if ($button && $button.$forceUpdate) {
        $button.$forceUpdate();
      }
    },
    // Activate a tab given a `<b-tab>` instance
    // Also accessed by `<b-tab>`
    activateTab: function activateTab($tab) {
      var currentTab = this.currentTab,
          $tabs = this.tabs;
      var result = false;

      if ($tab) {
        var index = $tabs.indexOf($tab);

        if (index !== currentTab && index > -1 && !$tab.disabled) {
          var tabEvent = new bv_event_class["a" /* BvEvent */](events["a" /* EVENT_NAME_ACTIVATE_TAB */], {
            cancelable: true,
            vueTarget: this,
            componentId: this.safeId()
          });
          this.$emit(tabEvent.type, index, currentTab, tabEvent);

          if (!tabEvent.defaultPrevented) {
            this.currentTab = index;
            result = true;
          }
        }
      } // Couldn't set tab, so ensure v-model is up to date

      /* istanbul ignore next: should rarely happen */


      if (!result && this[MODEL_PROP_NAME] !== currentTab) {
        this.$emit(MODEL_EVENT_NAME, currentTab);
      }

      return result;
    },
    // Deactivate a tab given a `<b-tab>` instance
    // Accessed by `<b-tab>`
    deactivateTab: function deactivateTab($tab) {
      if ($tab) {
        // Find first non-disabled tab that isn't the one being deactivated
        // If no tabs are available, then don't deactivate current tab
        return this.activateTab(this.tabs.filter(function ($t) {
          return $t !== $tab;
        }).find(notDisabled));
      }
      /* istanbul ignore next: should never/rarely happen */


      return false;
    },
    // Focus a tab button given its `<b-tab>` instance
    focusButton: function focusButton($tab) {
      var _this3 = this;

      // Wrap in `$nextTick()` to ensure DOM has completed rendering
      this.$nextTick(function () {
        Object(dom["d" /* attemptFocus */])(_this3.getButtonForTab($tab));
      });
    },
    // Emit a click event on a specified `<b-tab>` component instance
    emitTabClick: function emitTabClick(tab, event) {
      if (Object(inspect["d" /* isEvent */])(event) && tab && tab.$emit && !tab.disabled) {
        tab.$emit(events["e" /* EVENT_NAME_CLICK */], event);
      }
    },
    // Click handler
    clickTab: function clickTab($tab, event) {
      this.activateTab($tab);
      this.emitTabClick($tab, event);
    },
    // Move to first non-disabled tab
    firstTab: function firstTab(focus) {
      var $tab = this.tabs.find(notDisabled);

      if (this.activateTab($tab) && focus) {
        this.focusButton($tab);
        this.emitTabClick($tab, focus);
      }
    },
    // Move to previous non-disabled tab
    previousTab: function previousTab(focus) {
      var currentIndex = Object(math["a" /* mathMax */])(this.currentTab, 0);
      var $tab = this.tabs.slice(0, currentIndex).reverse().find(notDisabled);

      if (this.activateTab($tab) && focus) {
        this.focusButton($tab);
        this.emitTabClick($tab, focus);
      }
    },
    // Move to next non-disabled tab
    nextTab: function nextTab(focus) {
      var currentIndex = Object(math["a" /* mathMax */])(this.currentTab, -1);
      var $tab = this.tabs.slice(currentIndex + 1).find(notDisabled);

      if (this.activateTab($tab) && focus) {
        this.focusButton($tab);
        this.emitTabClick($tab, focus);
      }
    },
    // Move to last non-disabled tab
    lastTab: function lastTab(focus) {
      var $tab = this.tabs.slice().reverse().find(notDisabled);

      if (this.activateTab($tab) && focus) {
        this.focusButton($tab);
        this.emitTabClick($tab, focus);
      }
    }
  },
  render: function render(h) {
    var _this4 = this;

    var align = this.align,
        card = this.card,
        end = this.end,
        fill = this.fill,
        firstTab = this.firstTab,
        justified = this.justified,
        lastTab = this.lastTab,
        nextTab = this.nextTab,
        noKeyNav = this.noKeyNav,
        noNavStyle = this.noNavStyle,
        pills = this.pills,
        previousTab = this.previousTab,
        small = this.small,
        $tabs = this.tabs,
        vertical = this.vertical; // Currently active tab

    var $activeTab = $tabs.find(function ($tab) {
      return $tab.localActive && !$tab.disabled;
    }); // Tab button to allow focusing when no active tab found (keynav only)

    var $fallbackTab = $tabs.find(function ($tab) {
      return !$tab.disabled;
    }); // For each `<b-tab>` found create the tab buttons

    var $buttons = $tabs.map(function ($tab, index) {
      var _on;

      var safeId = $tab.safeId; // Ensure at least one tab button is focusable when keynav enabled (if possible)

      var tabIndex = null;

      if (!noKeyNav) {
        // Buttons are not in tab index unless active, or a fallback tab
        tabIndex = -1;

        if ($tab === $activeTab || !$activeTab && $tab === $fallbackTab) {
          // Place tab button in tab sequence
          tabIndex = null;
        }
      }

      return h(BVTabButton, {
        props: {
          controls: safeId ? safeId() : null,
          id: $tab.controlledBy || (safeId ? safeId("_BV_tab_button_") : null),
          noKeyNav: noKeyNav,
          posInSet: index + 1,
          setSize: $tabs.length,
          tab: $tab,
          tabIndex: tabIndex
        },
        on: (_on = {}, tabs_defineProperty(_on, events["e" /* EVENT_NAME_CLICK */], function (event) {
          _this4.clickTab($tab, event);
        }), tabs_defineProperty(_on, events["m" /* EVENT_NAME_FIRST */], firstTab), tabs_defineProperty(_on, events["y" /* EVENT_NAME_PREV */], previousTab), tabs_defineProperty(_on, events["v" /* EVENT_NAME_NEXT */], nextTab), tabs_defineProperty(_on, events["s" /* EVENT_NAME_LAST */], lastTab), _on),
        key: $tab[vue["a" /* COMPONENT_UID_KEY */]] || index,
        ref: 'buttons',
        // Needed to make `this.$refs.buttons` an array
        refInFor: true
      });
    });
    var $nav = h(BNav, {
      class: this.localNavClass,
      attrs: {
        role: 'tablist',
        id: this.safeId('_BV_tab_controls_')
      },
      props: {
        fill: fill,
        justified: justified,
        align: align,
        tabs: !noNavStyle && !pills,
        pills: !noNavStyle && pills,
        vertical: vertical,
        small: small,
        cardHeader: card && !vertical
      },
      ref: 'nav'
    }, [this.normalizeSlot(slots["l" /* SLOT_NAME_TABS_START */]) || h(), $buttons, this.normalizeSlot(slots["k" /* SLOT_NAME_TABS_END */]) || h()]);
    $nav = h('div', {
      class: [{
        'card-header': card && !vertical && !end,
        'card-footer': card && !vertical && end,
        'col-auto': vertical
      }, this.navWrapperClass],
      key: 'bv-tabs-nav'
    }, [$nav]);
    var $children = this.normalizeSlot() || [];
    var $empty = h();

    if ($children.length === 0) {
      $empty = h('div', {
        class: ['tab-pane', 'active', {
          'card-body': card
        }],
        key: 'bv-empty-tab'
      }, this.normalizeSlot(slots["c" /* SLOT_NAME_EMPTY */]));
    }

    var $content = h('div', {
      staticClass: 'tab-content',
      class: [{
        col: vertical
      }, this.contentClass],
      attrs: {
        id: this.safeId('_BV_tab_container_')
      },
      key: 'bv-content',
      ref: 'content'
    }, [$children, $empty]); // Render final output

    return h(this.tag, {
      staticClass: 'tabs',
      class: {
        row: vertical,
        'no-gutters': vertical && card
      },
      attrs: {
        id: this.safeId()
      }
    }, [end ? $content : h(), $nav, end ? h() : $content]);
  }
});
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/transition/bv-transition.js
var bv_transition = __webpack_require__("ce2a");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/tabs/tab.js
var _objectSpread2, tab_watch;

function tab_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function tab_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { tab_ownKeys(Object(source), true).forEach(function (key) { tab_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { tab_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function tab_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










 // --- Constants ---

var MODEL_PROP_NAME_ACTIVE = 'active';
var MODEL_EVENT_NAME_ACTIVE = events["F" /* MODEL_EVENT_NAME_PREFIX */] + MODEL_PROP_NAME_ACTIVE; // --- Props ---

var tab_props = Object(utils_props["b" /* makePropsConfigurable */])(Object(object["l" /* sortKeys */])(tab_objectSpread(tab_objectSpread({}, mixins_id["b" /* props */]), {}, (_objectSpread2 = {}, tab_defineProperty(_objectSpread2, MODEL_PROP_NAME_ACTIVE, Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false)), tab_defineProperty(_objectSpread2, "buttonId", Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */])), tab_defineProperty(_objectSpread2, "disabled", Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false)), tab_defineProperty(_objectSpread2, "lazy", Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false)), tab_defineProperty(_objectSpread2, "noBody", Object(utils_props["a" /* makeProp */])(constants_props["e" /* PROP_TYPE_BOOLEAN */], false)), tab_defineProperty(_objectSpread2, "tag", Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */], 'div')), tab_defineProperty(_objectSpread2, "title", Object(utils_props["a" /* makeProp */])(constants_props["m" /* PROP_TYPE_STRING */])), tab_defineProperty(_objectSpread2, "titleItemClass", Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */])), tab_defineProperty(_objectSpread2, "titleLinkAttributes", Object(utils_props["a" /* makeProp */])(constants_props["k" /* PROP_TYPE_OBJECT */])), tab_defineProperty(_objectSpread2, "titleLinkClass", Object(utils_props["a" /* makeProp */])(constants_props["c" /* PROP_TYPE_ARRAY_OBJECT_STRING */])), _objectSpread2))), components["j" /* NAME_TAB */]); // --- Main component ---
// @vue/component

var BTab = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: components["j" /* NAME_TAB */],
  mixins: [mixins_id["a" /* idMixin */], normalize_slot["a" /* normalizeSlotMixin */]],
  inject: {
    bvTabs: {
      default: function _default() {
        return {};
      }
    }
  },
  props: tab_props,
  data: function data() {
    return {
      localActive: this[MODEL_PROP_NAME_ACTIVE] && !this.disabled
    };
  },
  computed: {
    // For parent sniffing of child
    _isTab: function _isTab() {
      return true;
    },
    tabClasses: function tabClasses() {
      var active = this.localActive,
          disabled = this.disabled;
      return [{
        active: active,
        disabled: disabled,
        'card-body': this.bvTabs.card && !this.noBody
      }, // Apply <b-tabs> `activeTabClass` styles when this tab is active
      active ? this.bvTabs.activeTabClass : null];
    },
    controlledBy: function controlledBy() {
      return this.buttonId || this.safeId('__BV_tab_button__');
    },
    computedNoFade: function computedNoFade() {
      return !(this.bvTabs.fade || false);
    },
    computedLazy: function computedLazy() {
      return this.bvTabs.lazy || this.lazy;
    }
  },
  watch: (tab_watch = {}, tab_defineProperty(tab_watch, MODEL_PROP_NAME_ACTIVE, function (newValue, oldValue) {
    if (newValue !== oldValue) {
      if (newValue) {
        // If activated post mount
        this.activate();
      } else {
        /* istanbul ignore next */
        if (!this.deactivate()) {
          // Tab couldn't be deactivated, so we reset the synced active prop
          // Deactivation will fail if no other tabs to activate
          this.$emit(MODEL_EVENT_NAME_ACTIVE, this.localActive);
        }
      }
    }
  }), tab_defineProperty(tab_watch, "disabled", function disabled(newValue, oldValue) {
    if (newValue !== oldValue) {
      var firstTab = this.bvTabs.firstTab;

      if (newValue && this.localActive && firstTab) {
        this.localActive = false;
        firstTab();
      }
    }
  }), tab_defineProperty(tab_watch, "localActive", function localActive(newValue) {
    // Make `active` prop work with `.sync` modifier
    this.$emit(MODEL_EVENT_NAME_ACTIVE, newValue);
  }), tab_watch),
  mounted: function mounted() {
    // Inform `<b-tabs>` of our presence
    this.registerTab();
  },
  updated: function updated() {
    // Force the tab button content to update (since slots are not reactive)
    // Only done if we have a title slot, as the title prop is reactive
    var updateButton = this.bvTabs.updateButton;

    if (updateButton && this.hasNormalizedSlot(slots["m" /* SLOT_NAME_TITLE */])) {
      updateButton(this);
    }
  },
  beforeDestroy: function beforeDestroy() {
    // Inform `<b-tabs>` of our departure
    this.unregisterTab();
  },
  methods: {
    // Private methods
    registerTab: function registerTab() {
      // Inform `<b-tabs>` of our presence
      var registerTab = this.bvTabs.registerTab;

      if (registerTab) {
        registerTab(this);
      }
    },
    unregisterTab: function unregisterTab() {
      // Inform `<b-tabs>` of our departure
      var unregisterTab = this.bvTabs.unregisterTab;

      if (unregisterTab) {
        unregisterTab(this);
      }
    },
    // Public methods
    activate: function activate() {
      // Not inside a `<b-tabs>` component or tab is disabled
      var activateTab = this.bvTabs.activateTab;
      return activateTab && !this.disabled ? activateTab(this) : false;
    },
    deactivate: function deactivate() {
      // Not inside a `<b-tabs>` component or not active to begin with
      var deactivateTab = this.bvTabs.deactivateTab;
      return deactivateTab && this.localActive ? deactivateTab(this) : false;
    }
  },
  render: function render(h) {
    var localActive = this.localActive;
    var $content = h(this.tag, {
      staticClass: 'tab-pane',
      class: this.tabClasses,
      directives: [{
        name: 'show',
        value: localActive
      }],
      attrs: {
        role: 'tabpanel',
        id: this.safeId(),
        'aria-hidden': localActive ? 'false' : 'true',
        'aria-labelledby': this.controlledBy || null
      },
      ref: 'panel'
    }, // Render content lazily if requested
    [localActive || !this.computedLazy ? this.normalizeSlot() : h()]);
    return h(bv_transition["a" /* BVTransition */], {
      props: {
        mode: 'out-in',
        noFade: this.computedNoFade
      }
    }, [$content]);
  }
});
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/plugins.js + 2 modules
var plugins = __webpack_require__("3790");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/tabs/index.js



var TabsPlugin = /*#__PURE__*/Object(plugins["a" /* pluginFactory */])({
  components: {
    BTabs: BTabs,
    BTab: BTab
  }
});


/***/ }),

/***/ "8690":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export stripTags */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return htmlOrText; });
/* harmony import */ var _constants_regex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("992e");
 // Removes anything that looks like an HTML tag from the supplied string

var stripTags = function stripTags() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(text).replace(_constants_regex__WEBPACK_IMPORTED_MODULE_0__[/* RX_HTML_TAGS */ "e"], '');
}; // Generate a `domProps` object for either `innerHTML`, `textContent` or an empty object

var htmlOrText = function htmlOrText(innerHTML, textContent) {
  return innerHTML ? {
    innerHTML: innerHTML
  } : textContent ? {
    textContent: textContent
  } : {};
};

/***/ }),

/***/ "8c4e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export makePropWatcher */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return makePropCacheMixin; });
/* harmony import */ var _vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2f79");
/* harmony import */ var _clone_deep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("c9a9");
/* harmony import */ var _loose_equal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("3c21");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("d82f");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var isEmpty = function isEmpty(value) {
  return !value || Object(_object__WEBPACK_IMPORTED_MODULE_3__[/* keys */ "h"])(value).length === 0;
};

var makePropWatcher = function makePropWatcher(propName) {
  return {
    handler: function handler(newValue, oldValue) {
      if (Object(_loose_equal__WEBPACK_IMPORTED_MODULE_2__[/* looseEqual */ "a"])(newValue, oldValue)) {
        return;
      }

      if (isEmpty(newValue) || isEmpty(oldValue)) {
        this[propName] = Object(_clone_deep__WEBPACK_IMPORTED_MODULE_1__[/* cloneDeep */ "a"])(newValue);
        return;
      }

      for (var key in oldValue) {
        if (!Object(_object__WEBPACK_IMPORTED_MODULE_3__[/* hasOwnProperty */ "g"])(newValue, key)) {
          this.$delete(this.$data[propName], key);
        }
      }

      for (var _key in newValue) {
        this.$set(this.$data[propName], _key, newValue[_key]);
      }
    }
  };
};
var makePropCacheMixin = function makePropCacheMixin(propName, proxyPropName) {
  return _vue__WEBPACK_IMPORTED_MODULE_0__[/* Vue */ "b"].extend({
    data: function data() {
      return _defineProperty({}, proxyPropName, Object(_clone_deep__WEBPACK_IMPORTED_MODULE_1__[/* cloneDeep */ "a"])(this[propName]));
    },
    watch: _defineProperty({}, propName, makePropWatcher(proxyPropName))
  });
};

/***/ }),

/***/ "90ef":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return props; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return idMixin; });
/* harmony import */ var _vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2f79");
/* harmony import */ var _constants_props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("a723");
/* harmony import */ var _utils_props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cf75");
// SSR safe client-side ID attribute generation
// ID's can only be generated client-side, after mount
// `this._uid` is not synched between server and client


 // --- Props ---

var props = {
  id: Object(_utils_props__WEBPACK_IMPORTED_MODULE_2__[/* makeProp */ "a"])(_constants_props__WEBPACK_IMPORTED_MODULE_1__[/* PROP_TYPE_STRING */ "m"])
}; // --- Mixin ---
// @vue/component

var idMixin = _vue__WEBPACK_IMPORTED_MODULE_0__[/* Vue */ "b"].extend({
  props: props,
  data: function data() {
    return {
      localId_: null
    };
  },
  computed: {
    safeId: function safeId() {
      // Computed property that returns a dynamic function for creating the ID
      // Reacts to changes in both `.id` and `.localId_` and regenerates a new function
      var id = this.id || this.localId_; // We return a function that accepts an optional suffix string
      // So this computed prop looks and works like a method
      // but benefits from Vue's computed prop caching

      var fn = function fn(suffix) {
        if (!id) {
          return null;
        }

        suffix = String(suffix || '').replace(/\s+/g, '_');
        return suffix ? id + '_' + suffix : id;
      };

      return fn;
    }
  },
  mounted: function mounted() {
    var _this = this;

    // `mounted()` only occurs client-side
    this.$nextTick(function () {
      // Update DOM with auto-generated ID after mount
      // to prevent SSR hydration errors
      _this.localId_ = "__BVID__".concat(_this[_vue__WEBPACK_IMPORTED_MODULE_0__[/* COMPONENT_UID_KEY */ "a"]]);
    });
  }
});

/***/ }),

/***/ "9bfa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CODE_BACKSPACE */
/* unused harmony export CODE_BREAK */
/* unused harmony export CODE_DELETE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CODE_DOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CODE_END; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CODE_ENTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CODE_ESC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CODE_HOME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CODE_LEFT; });
/* unused harmony export CODE_PAGEDOWN */
/* unused harmony export CODE_PAGEUP */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return CODE_RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return CODE_SPACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CODE_UP; });
var CODE_BACKSPACE = 8;
var CODE_BREAK = 19;
var CODE_DELETE = 46;
var CODE_DOWN = 40;
var CODE_END = 35;
var CODE_ENTER = 13;
var CODE_ESC = 27;
var CODE_HOME = 36;
var CODE_LEFT = 37;
var CODE_PAGEDOWN = 34;
var CODE_PAGEUP = 33;
var CODE_RIGHT = 39;
var CODE_SPACE = 32;
var CODE_UP = 38;

/***/ }),

/***/ "aa59":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ link_props; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ BLink; });

// UNUSED EXPORTS: routerLinkProps, nuxtLinkProps

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/vue.js
var vue = __webpack_require__("2f79");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/components.js
var components = __webpack_require__("c637");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/events.js
var events = __webpack_require__("0056");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/constants/props.js
var props = __webpack_require__("a723");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/array.js
var array = __webpack_require__("2326");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/dom.js
var dom = __webpack_require__("906c");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/events.js
var utils_events = __webpack_require__("6b77");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/inspect.js
var inspect = __webpack_require__("7b1e");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/object.js
var object = __webpack_require__("d82f");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/props.js
var utils_props = __webpack_require__("cf75");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/router.js
var router = __webpack_require__("4a38");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/mixins/attrs.js
var attrs = __webpack_require__("493b");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/mixins/listen-on-root.js
var listen_on_root = __webpack_require__("602d");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/cache.js
var cache = __webpack_require__("8c4e");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/listeners.js

var listenersMixin = Object(cache["a" /* makePropCacheMixin */])('$listeners', 'bvListeners');
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/mixins/normalize-slot.js
var normalize_slot = __webpack_require__("8c18");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/link/link.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















 // --- Constants ---

var ROOT_EVENT_NAME_CLICKED = Object(utils_events["e" /* getRootEventName */])(components["d" /* NAME_LINK */], 'clicked'); // --- Props ---
// `<router-link>` specific props

var routerLinkProps = {
  activeClass: Object(utils_props["a" /* makeProp */])(props["m" /* PROP_TYPE_STRING */]),
  append: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], false),
  event: Object(utils_props["a" /* makeProp */])(props["d" /* PROP_TYPE_ARRAY_STRING */], events["e" /* EVENT_NAME_CLICK */]),
  exact: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], false),
  exactActiveClass: Object(utils_props["a" /* makeProp */])(props["m" /* PROP_TYPE_STRING */]),
  replace: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], false),
  routerTag: Object(utils_props["a" /* makeProp */])(props["m" /* PROP_TYPE_STRING */], 'a'),
  to: Object(utils_props["a" /* makeProp */])(props["l" /* PROP_TYPE_OBJECT_STRING */])
}; // `<nuxt-link>` specific props

var nuxtLinkProps = {
  noPrefetch: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], false),
  // Must be `null` to fall back to the value defined in the
  // `nuxt.config.js` configuration file for `router.prefetchLinks`
  // We convert `null` to `undefined`, so that Nuxt.js will use the
  // compiled default
  // Vue treats `undefined` as default of `false` for Boolean props,
  // so we must set it as `null` here to be a true tri-state prop
  prefetch: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], null)
}; // All `<b-link>` props

var link_props = Object(utils_props["b" /* makePropsConfigurable */])(Object(object["l" /* sortKeys */])(_objectSpread(_objectSpread(_objectSpread({}, nuxtLinkProps), routerLinkProps), {}, {
  active: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], false),
  disabled: Object(utils_props["a" /* makeProp */])(props["e" /* PROP_TYPE_BOOLEAN */], false),
  href: Object(utils_props["a" /* makeProp */])(props["m" /* PROP_TYPE_STRING */]),
  // Must be `null` if no value provided
  rel: Object(utils_props["a" /* makeProp */])(props["m" /* PROP_TYPE_STRING */], null),
  // To support 3rd party router links based on `<router-link>` (i.e. `g-link` for Gridsome)
  // Default is to auto choose between `<router-link>` and `<nuxt-link>`
  // Gridsome doesn't provide a mechanism to auto detect and has caveats
  // such as not supporting FQDN URLs or hash only URLs
  routerComponentName: Object(utils_props["a" /* makeProp */])(props["m" /* PROP_TYPE_STRING */]),
  target: Object(utils_props["a" /* makeProp */])(props["m" /* PROP_TYPE_STRING */], '_self')
})), components["d" /* NAME_LINK */]); // --- Main component ---
// @vue/component

var BLink = /*#__PURE__*/vue["b" /* Vue */].extend({
  name: components["d" /* NAME_LINK */],
  // Mixin order is important!
  mixins: [attrs["a" /* attrsMixin */], listenersMixin, listen_on_root["a" /* listenOnRootMixin */], normalize_slot["a" /* normalizeSlotMixin */]],
  inheritAttrs: false,
  props: link_props,
  computed: {
    computedTag: function computedTag() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      var to = this.to,
          disabled = this.disabled,
          routerComponentName = this.routerComponentName;
      return Object(router["c" /* computeTag */])({
        to: to,
        disabled: disabled,
        routerComponentName: routerComponentName
      }, this);
    },
    isRouterLink: function isRouterLink() {
      return Object(router["e" /* isRouterLink */])(this.computedTag);
    },
    computedRel: function computedRel() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      var target = this.target,
          rel = this.rel;
      return Object(router["b" /* computeRel */])({
        target: target,
        rel: rel
      });
    },
    computedHref: function computedHref() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      var to = this.to,
          href = this.href;
      return Object(router["a" /* computeHref */])({
        to: to,
        href: href
      }, this.computedTag);
    },
    computedProps: function computedProps() {
      var prefetch = this.prefetch;
      return this.isRouterLink ? _objectSpread(_objectSpread({}, Object(utils_props["c" /* pluckProps */])(_objectSpread(_objectSpread({}, routerLinkProps), nuxtLinkProps), this)), {}, {
        // Coerce `prefetch` value `null` to be `undefined`
        prefetch: Object(inspect["b" /* isBoolean */])(prefetch) ? prefetch : undefined,
        // Pass `router-tag` as `tag` prop
        tag: this.routerTag
      }) : {};
    },
    computedAttrs: function computedAttrs() {
      var bvAttrs = this.bvAttrs,
          href = this.computedHref,
          rel = this.computedRel,
          disabled = this.disabled,
          target = this.target,
          routerTag = this.routerTag,
          isRouterLink = this.isRouterLink;
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, bvAttrs), href ? {
        href: href
      } : {}), isRouterLink && !Object(dom["r" /* isTag */])(routerTag, 'a') ? {} : {
        rel: rel,
        target: target
      }), {}, {
        tabindex: disabled ? '-1' : Object(inspect["l" /* isUndefined */])(bvAttrs.tabindex) ? null : bvAttrs.tabindex,
        'aria-disabled': disabled ? 'true' : null
      });
    },
    computedListeners: function computedListeners() {
      return _objectSpread(_objectSpread({}, this.bvListeners), {}, {
        // We want to overwrite any click handler since our callback
        // will invoke the user supplied handler(s) if `!this.disabled`
        click: this.onClick
      });
    }
  },
  methods: {
    onClick: function onClick(event) {
      var _arguments = arguments;
      var eventIsEvent = Object(inspect["d" /* isEvent */])(event);
      var isRouterLink = this.isRouterLink;
      var suppliedHandler = this.bvListeners.click;

      if (eventIsEvent && this.disabled) {
        // Stop event from bubbling up
        // Kill the event loop attached to this specific `EventTarget`
        // Needed to prevent `vue-router` for doing its thing
        Object(utils_events["f" /* stopEvent */])(event, {
          immediatePropagation: true
        });
      } else {
        /* istanbul ignore next: difficult to test, but we know it works */
        if (isRouterLink && event.currentTarget.__vue__) {
          // Router links do not emit instance `click` events, so we
          // add in an `$emit('click', event)` on its Vue instance
          event.currentTarget.__vue__.$emit(events["e" /* EVENT_NAME_CLICK */], event);
        } // Call the suppliedHandler(s), if any provided


        Object(array["b" /* concat */])(suppliedHandler).filter(function (h) {
          return Object(inspect["e" /* isFunction */])(h);
        }).forEach(function (handler) {
          handler.apply(void 0, _toConsumableArray(_arguments));
        }); // Emit the global `$root` click event

        this.emitOnRoot(ROOT_EVENT_NAME_CLICKED, event); // TODO: Remove deprecated 'clicked::link' event with next major release

        this.emitOnRoot('clicked::link', event);
      } // Stop scroll-to-top behavior or navigation on
      // regular links when href is just '#'


      if (eventIsEvent && !isRouterLink && this.computedHref === '#') {
        Object(utils_events["f" /* stopEvent */])(event, {
          propagation: false
        });
      }
    },
    focus: function focus() {
      Object(dom["d" /* attemptFocus */])(this.$el);
    },
    blur: function blur() {
      Object(dom["c" /* attemptBlur */])(this.$el);
    }
  },
  render: function render(h) {
    var active = this.active,
        disabled = this.disabled;
    return h(this.computedTag, _defineProperty({
      class: {
        active: active,
        disabled: disabled
      },
      attrs: this.computedAttrs,
      props: this.computedProps
    }, this.isRouterLink ? 'nativeOn' : 'on', this.computedListeners), this.normalizeSlot());
  }
});

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
//# sourceMappingURL=flow-builder.common.3.js.map