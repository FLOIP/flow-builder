((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[1],{

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
//# sourceMappingURL=flow-builder.umd.1.js.map