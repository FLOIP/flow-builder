((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[1],{

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

/***/ "2ffd":
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _NodeList = __webpack_require__(27);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	var _Accordion = __webpack_require__(90);
	
	var _Accordion2 = _interopRequireDefault(_Accordion);
	
	var _Affix = __webpack_require__(94);
	
	var _Affix2 = _interopRequireDefault(_Affix);
	
	var _Alert = __webpack_require__(97);
	
	var _Alert2 = _interopRequireDefault(_Alert);
	
	var _Aside = __webpack_require__(104);
	
	var _Aside2 = _interopRequireDefault(_Aside);
	
	var _buttonGroup = __webpack_require__(109);
	
	var _buttonGroup2 = _interopRequireDefault(_buttonGroup);
	
	var _Carousel = __webpack_require__(112);
	
	var _Carousel2 = _interopRequireDefault(_Carousel);
	
	var _Checkbox = __webpack_require__(117);
	
	var _Checkbox2 = _interopRequireDefault(_Checkbox);
	
	var _Datepicker = __webpack_require__(122);
	
	var _Datepicker2 = _interopRequireDefault(_Datepicker);
	
	var _Dropdown = __webpack_require__(127);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var _FormGroup = __webpack_require__(132);
	
	var _FormGroup2 = _interopRequireDefault(_FormGroup);
	
	var _Input = __webpack_require__(135);
	
	var _Input2 = _interopRequireDefault(_Input);
	
	var _Modal = __webpack_require__(140);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _Navbar = __webpack_require__(149);
	
	var _Navbar2 = _interopRequireDefault(_Navbar);
	
	var _Option = __webpack_require__(152);
	
	var _Option2 = _interopRequireDefault(_Option);
	
	var _Panel = __webpack_require__(155);
	
	var _Panel2 = _interopRequireDefault(_Panel);
	
	var _Popover = __webpack_require__(160);
	
	var _Popover2 = _interopRequireDefault(_Popover);
	
	var _Progressbar = __webpack_require__(166);
	
	var _Progressbar2 = _interopRequireDefault(_Progressbar);
	
	var _Radio = __webpack_require__(169);
	
	var _Radio2 = _interopRequireDefault(_Radio);
	
	var _Select = __webpack_require__(174);
	
	var _Select2 = _interopRequireDefault(_Select);
	
	var _Slider = __webpack_require__(193);
	
	var _Slider2 = _interopRequireDefault(_Slider);
	
	var _Spinner = __webpack_require__(196);
	
	var _Spinner2 = _interopRequireDefault(_Spinner);
	
	var _Tab = __webpack_require__(201);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	var _TabGroup = __webpack_require__(204);
	
	var _TabGroup2 = _interopRequireDefault(_TabGroup);
	
	var _Tabset = __webpack_require__(209);
	
	var _Tabset2 = _interopRequireDefault(_Tabset);
	
	var _Tooltip = __webpack_require__(214);
	
	var _Tooltip2 = _interopRequireDefault(_Tooltip);
	
	var _Typeahead = __webpack_require__(219);
	
	var _Typeahead2 = _interopRequireDefault(_Typeahead);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var VueStrap = {
	  $: _NodeList2.default,
	  accordion: _Accordion2.default,
	  affix: _Affix2.default,
	  alert: _Alert2.default,
	  aside: _Aside2.default,
	  buttonGroup: _buttonGroup2.default,
	  carousel: _Carousel2.default,
	  checkbox: _Checkbox2.default,
	  datepicker: _Datepicker2.default,
	  dropdown: _Dropdown2.default,
	  formGroup: _FormGroup2.default,
	  input: _Input2.default,
	  modal: _Modal2.default,
	  navbar: _Navbar2.default,
	  option: _Option2.default,
	  panel: _Panel2.default,
	  popover: _Popover2.default,
	  progressbar: _Progressbar2.default,
	  radio: _Radio2.default,
	  select: _Select2.default,
	  slider: _Slider2.default,
	  spinner: _Spinner2.default,
	  tab: _Tab2.default,
	  tabGroup: _TabGroup2.default,
	  tabset: _Tabset2.default,
	  tooltip: _Tooltip2.default,
	  typeahead: _Typeahead2.default
	};
	
	module.exports = VueStrap;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty = __webpack_require__(28);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	var _iterator = __webpack_require__(46);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _getOwnPropertyNames = __webpack_require__(82);
	
	var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);
	
	var _classCallCheck2 = __webpack_require__(88);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(89);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ArrayProto = Array.prototype;
	var nodeError = new Error('Passed arguments must be of Node');
	var blurEvent = void 0;
	var blurList = [];
	var Events = [];
	
	function isNode(val) {
	  return val instanceof window.Node;
	}
	function isNodeList(val) {
	  return val instanceof window.NodeList || val instanceof NodeList || val instanceof window.HTMLCollection || val instanceof Array;
	}
	
	function splitWords(val) {
	  val = val.trim();return val.length ? val.replace(/\s+/, ' ').split(' ') : [];
	}
	function joinWords(val) {
	  return val.length ? val.join(' ') : '';
	}
	
	var NodeList = function () {
	  function NodeList(args) {
	    (0, _classCallCheck3.default)(this, NodeList);
	
	    var nodes = args;
	    if (args[0] === window) {
	      nodes = [window];
	    } else if (typeof args[0] === 'string') {
	      nodes = (args[1] || document).querySelectorAll(args[0]);
	      if (args[1]) {
	        this.owner = args[1];
	      }
	    } else if (0 in args && !isNode(args[0]) && args[0] && 'length' in args[0]) {
	      nodes = args[0];
	      if (args[1]) {
	        this.owner = args[1];
	      }
	    }
	    if (nodes) {
	      for (var i in nodes) {
	        this[i] = nodes[i];
	      }
	      this.length = nodes.length;
	    } else {
	      this.length = 0;
	    }
	  }
	
	  (0, _createClass3.default)(NodeList, [{
	    key: 'concat',
	    value: function concat() {
	      var nodes = ArrayProto.slice.call(this);
	      function flatten(arr) {
	        ArrayProto.forEach.call(arr, function (el) {
	          if (isNode(el)) {
	            if (!~nodes.indexOf(el)) nodes.push(el);
	          } else if (isNodeList(el)) {
	            flatten(el);
	          }
	        });
	      }
	
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      ArrayProto.forEach.call(args, function (arg) {
	        if (isNode(arg)) {
	          if (!~nodes.indexOf(arg)) nodes.push(arg);
	        } else if (isNodeList(arg)) {
	          flatten(arg);
	        } else {
	          throw Error('Concat arguments must be of a Node, NodeList, HTMLCollection, or Array of (Node, NodeList, HTMLCollection, Array)');
	        }
	      });
	      return NodeListJS(nodes, this);
	    }
	  }, {
	    key: 'delete',
	    value: function _delete() {
	      var notRemoved = flatten(this).filter(function (el) {
	        if (el.remove) {
	          el.remove();
	        } else if (el.parentNode) {
	          el.parentNode.removeChild(el);
	        }
	        return document.body.contains(el);
	      });
	      if (notRemoved.length) console.warn('NodeList: Some nodes could not be deleted.');
	      return notRemoved;
	    }
	  }, {
	    key: 'each',
	    value: function each() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      ArrayProto.forEach.apply(this, args);
	      return this;
	    }
	  }, {
	    key: 'filter',
	    value: function filter() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }
	
	      return NodeListJS(ArrayProto.filter.apply(this, args), this);
	    }
	  }, {
	    key: 'find',
	    value: function find(element) {
	      var nodes = [];
	      flatten(this).forEach(function (node) {
	        ArrayProto.push.apply(nodes, node.querySelectorAll(element));
	      });
	      return flatten(nodes, this.owner);
	    }
	  }, {
	    key: 'findChildren',
	    value: function findChildren(element) {
	      var _this = this;
	
	      if (element) return this.find(element).filter(function (el) {
	        return _this.includes(el.parentElement);
	      });
	      return flatten(this.map(function (el) {
	        return el.children;
	      }));
	    }
	  }, {
	    key: 'forEach',
	    value: function forEach() {
	      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }
	
	      ArrayProto.forEach.apply(this, args);
	      return this;
	    }
	  }, {
	    key: 'includes',
	    value: function includes(element, index) {
	      return ~this.indexOf(element, index);
	    }
	  }, {
	    key: 'map',
	    value: function map() {
	      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        args[_key5] = arguments[_key5];
	      }
	
	      var mapped = ArrayProto.map.apply(this, args);
	      return mapped.some(function (el) {
	        return isNode(el) || isNodeList(el);
	      }) ? flatten(mapped, this) : mapped;
	    }
	  }, {
	    key: 'parent',
	    value: function parent() {
	      return flatten(this.map(function (el) {
	        return el.parentNode;
	      }), this);
	    }
	  }, {
	    key: 'pop',
	    value: function pop(amount) {
	      if (typeof amount !== 'number') {
	        amount = 1;
	      }
	      var nodes = [];
	      var pop = ArrayProto.pop.bind(this);
	      while (amount--) {
	        nodes.push(pop());
	      }return NodeListJS(nodes, this);
	    }
	  }, {
	    key: 'push',
	    value: function push() {
	      var _this2 = this;
	
	      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	        args[_key6] = arguments[_key6];
	      }
	
	      ArrayProto.forEach.call(args, function (arg) {
	        if (!isNode(arg)) throw nodeError;
	        if (!~_this2.indexOf(arg)) ArrayProto.push.call(_this2, arg);
	      });
	      return this;
	    }
	  }, {
	    key: 'shift',
	    value: function shift(amount) {
	      if (typeof amount !== 'number') {
	        amount = 1;
	      }
	      var nodes = [];
	      while (amount--) {
	        nodes.push(ArrayProto.shift.call(this));
	      }return nodes.length == 1 ? nodes[0] : NodeListJS(nodes, this);
	    }
	  }, {
	    key: 'slice',
	    value: function slice() {
	      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	        args[_key7] = arguments[_key7];
	      }
	
	      return NodeListJS(ArrayProto.slice.apply(this, args), this);
	    }
	  }, {
	    key: 'splice',
	    value: function splice() {
	      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	        args[_key8] = arguments[_key8];
	      }
	
	      for (var i = 2, l = args.length; i < l; i++) {
	        if (!isNode(args[i])) throw nodeError;
	      }
	      ArrayProto.splice.apply(this, args);
	      return this;
	    }
	  }, {
	    key: 'unshift',
	    value: function unshift() {
	      var _this3 = this;
	
	      var unshift = ArrayProto.unshift.bind(this);
	
	      for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
	        args[_key9] = arguments[_key9];
	      }
	
	      ArrayProto.forEach.call(args, function (arg) {
	        if (!isNode(arg)) throw nodeError;
	        if (!~_this3.indexOf(arg)) unshift(arg);
	      });
	      return this;
	    }
	  }, {
	    key: 'addClass',
	    value: function addClass(classes) {
	      return this.toggleClass(classes, true);
	    }
	  }, {
	    key: 'removeClass',
	    value: function removeClass(classes) {
	      return this.toggleClass(classes, false);
	    }
	  }, {
	    key: 'toggleClass',
	    value: function toggleClass(classes, value) {
	      var method = value === undefined || value === null ? 'toggle' : value ? 'add' : 'remove';
	      if (typeof classes === 'string') {
	        classes = splitWords(classes);
	      }
	      this.each(function (el) {
	        var list = splitWords(el.className);
	        classes.forEach(function (c) {
	          var hasClass = ~list.indexOf(c);
	          if (!hasClass && method !== 'remove') list.push(c);
	          if (hasClass && method !== 'add') {
	            list = list.filter(function (el) {
	              return el !== c;
	            });
	          }
	        });
	        list = joinWords(list);
	        if (!list) el.removeAttribute('class');else el.className = list;
	      });
	      return this;
	    }
	  }, {
	    key: 'get',
	    value: function get(prop) {
	      var arr = [];
	      this.each(function (el) {
	        if (el !== null) {
	          el = el[prop];
	        }
	        arr.push(el);
	      });
	      return flatten(arr, this);
	    }
	  }, {
	    key: 'set',
	    value: function set(prop, value) {
	      if (prop.constructor === Object) {
	        this.each(function (el) {
	          if (el) {
	            for (var key in prop) {
	              if (key in el) {
	                el[key] = prop[key];
	              }
	            }
	          }
	        });
	      } else {
	        this.each(function (el) {
	          if (prop in el) {
	            el[prop] = value;
	          }
	        });
	      }
	      return this;
	    }
	  }, {
	    key: 'call',
	    value: function call() {
	      for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	        args[_key10] = arguments[_key10];
	      }
	
	      var method = ArrayProto.shift.call(args);
	      var arr = [];
	      var returnThis = true;
	      this.each(function (el) {
	        if (el && el[method] instanceof Function) {
	          el = el[method].apply(el, args);
	          arr.push(el);
	          if (returnThis && el !== undefined) {
	            returnThis = false;
	          }
	        } else {
	          arr.push(undefined);
	        }
	      });
	      return returnThis ? this : flatten(arr, this);
	    }
	  }, {
	    key: 'item',
	    value: function item(index) {
	      return NodeListJS([this[index]], this);
	    }
	  }, {
	    key: 'on',
	
	
	    // event handlers
	    value: function on(events, selector, callback) {
	      if (typeof events === 'string') {
	        events = splitWords(events);
	      }
	      if (!this || !this.length) return this;
	      if (callback === undefined) {
	        callback = selector;
	        selector = null;
	      }
	      if (!callback) return this;
	      var fn = callback;
	      callback = selector ? function (e) {
	        var els = NodeListJS(selector, this);
	        if (!els.length) {
	          return;
	        }
	        els.some(function (el) {
	          var target = el.contains(e.target);
	          if (target) fn.call(el, e, el);
	          return target;
	        });
	      } : function (e) {
	        fn.apply(this, [e, this]);
	      };
	      this.each(function (el) {
	        events.forEach(function (event) {
	          if (el === window || isNode(el)) {
	            el.addEventListener(event, callback, false);
	            Events.push({
	              el: el,
	              event: event,
	              callback: callback
	            });
	          }
	        });
	      });
	      return this;
	    }
	  }, {
	    key: 'off',
	    value: function off(events, callback) {
	      if (events instanceof Function) {
	        callback = events;
	        events = null;
	      }
	      events = events instanceof Array ? events : typeof events === 'string' ? splitWords(events) : null;
	      this.each(function (el) {
	        Events = Events.filter(function (e) {
	          if (e && e.el === el && (!callback || callback === e.callback) && (!events || ~events.indexOf(e.event))) {
	            e.el.removeEventListener(e.event, e.callback);
	            return false;
	          }
	          return true;
	        });
	      });
	      return this;
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur(callback) {
	      if (!this || !this.length) return this;
	      if (!callback) return this;
	      this.each(function (el) {
	        blurList.push({ el: el, callback: callback });
	      });
	      if (!blurEvent) {
	        blurEvent = function blurEvent(e) {
	          blurList.forEach(function (item) {
	            var target = item.el.contains(e.target) || item.el === e.target;
	            if (!target) item.callback.call(item.el, e, item.el);
	          });
	        };
	        document.addEventListener('click', blurEvent, false);
	        document.addEventListener('touchstart', blurEvent, false);
	      }
	      return this;
	    }
	  }, {
	    key: 'offBlur',
	    value: function offBlur(callback) {
	      this.each(function (el) {
	        blurList = blurList.filter(function (blur) {
	          if (blur && blur.el === el && (!callback || blur.callback === callback)) {
	            return false;
	          }
	          return el;
	        });
	      });
	      return this;
	    }
	  }, {
	    key: 'asArray',
	    get: function get() {
	      return ArrayProto.slice.call(this);
	    }
	  }]);
	  return NodeList;
	}();
	
	var NL = NodeList.prototype;
	
	function flatten(arr, owner) {
	  var list = [];
	  ArrayProto.forEach.call(arr, function (el) {
	    if (isNode(el)) {
	      if (!~list.indexOf(el)) list.push(el);
	    } else if (isNodeList(el)) {
	      for (var id in el) {
	        list.push(el[id]);
	      }
	    } else if (el !== null) {
	      arr.get = NL.get;
	      arr.set = NL.set;
	      arr.call = NL.call;
	      arr.owner = owner;
	      return arr;
	    }
	  });
	  return NodeListJS(list, owner);
	}
	
	(0, _getOwnPropertyNames2.default)(ArrayProto).forEach(function (key) {
	  if (key !== 'join' && key !== 'copyWithin' && key !== 'fill' && NL[key] === undefined) {
	    NL[key] = ArrayProto[key];
	  }
	});
	if (window.Symbol && _iterator2.default) {
	  NL[_iterator2.default] = NL.values = ArrayProto[_iterator2.default];
	}
	var div = document.createElement('div');
	function setterGetter(prop) {
	  var _this4 = this;
	
	  if (NL[prop]) return;
	  if (div[prop] instanceof Function) {
	    NL[prop] = function () {
	      for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
	        args[_key11] = arguments[_key11];
	      }
	
	      var arr = [];
	      var returnThis = true;
	      for (var i in NL) {
	        var el = NL[i];
	        if (el && el[prop] instanceof Function) {
	          el = el[prop].apply(el, args);
	          arr.push(el);
	          if (returnThis && el !== undefined) {
	            returnThis = false;
	          }
	        } else {
	          arr.push(undefined);
	        }
	      }
	      return returnThis ? _this4 : flatten(arr, _this4);
	    };
	  } else {
	    (0, _defineProperty2.default)(NL, prop, {
	      get: function get() {
	        var arr = [];
	        this.each(function (el) {
	          if (el !== null) {
	            el = el[prop];
	          }
	          arr.push(el);
	        });
	        return flatten(arr, this);
	      },
	      set: function set(value) {
	        this.each(function (el) {
	          if (el && prop in el) {
	            el[prop] = value;
	          }
	        });
	      }
	    });
	  }
	}
	for (var prop in div) {
	  setterGetter(prop);
	}function NodeListJS() {
	  for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
	    args[_key12] = arguments[_key12];
	  }
	
	  return new NodeList(args);
	}
	window.NL = NodeListJS;
	
	exports.default = NodeListJS;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(29), __esModule: true };

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(30);
	var $Object = __webpack_require__(33).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(31);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(41), 'Object', { defineProperty: __webpack_require__(37).f });


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(32);
	var core = __webpack_require__(33);
	var ctx = __webpack_require__(34);
	var hide = __webpack_require__(36);
	var PROTOTYPE = 'prototype';
	
	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 33 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(35);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(37);
	var createDesc = __webpack_require__(45);
	module.exports = __webpack_require__(41) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(38);
	var IE8_DOM_DEFINE = __webpack_require__(40);
	var toPrimitive = __webpack_require__(44);
	var dP = Object.defineProperty;
	
	exports.f = __webpack_require__(41) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(39);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(41) && !__webpack_require__(42)(function () {
	  return Object.defineProperty(__webpack_require__(43)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(42)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 42 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(39);
	var document = __webpack_require__(32).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(39);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(47), __esModule: true };

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(48);
	__webpack_require__(77);
	module.exports = __webpack_require__(81).f('iterator');


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(49)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(52)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(50);
	var defined = __webpack_require__(51);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(53);
	var $export = __webpack_require__(31);
	var redefine = __webpack_require__(54);
	var hide = __webpack_require__(36);
	var has = __webpack_require__(55);
	var Iterators = __webpack_require__(56);
	var $iterCreate = __webpack_require__(57);
	var setToStringTag = __webpack_require__(73);
	var getPrototypeOf = __webpack_require__(75);
	var ITERATOR = __webpack_require__(74)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';
	
	var returnThis = function () { return this; };
	
	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(36);


/***/ }),
/* 55 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 56 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(58);
	var descriptor = __webpack_require__(45);
	var setToStringTag = __webpack_require__(73);
	var IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(36)(IteratorPrototype, __webpack_require__(74)('iterator'), function () { return this; });
	
	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(38);
	var dPs = __webpack_require__(59);
	var enumBugKeys = __webpack_require__(71);
	var IE_PROTO = __webpack_require__(68)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(43)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(72).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(37);
	var anObject = __webpack_require__(38);
	var getKeys = __webpack_require__(60);
	
	module.exports = __webpack_require__(41) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(61);
	var enumBugKeys = __webpack_require__(71);
	
	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(55);
	var toIObject = __webpack_require__(62);
	var arrayIndexOf = __webpack_require__(65)(false);
	var IE_PROTO = __webpack_require__(68)('IE_PROTO');
	
	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(63);
	var defined = __webpack_require__(51);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(64);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(62);
	var toLength = __webpack_require__(66);
	var toAbsoluteIndex = __webpack_require__(67);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(50);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(50);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(69)('keys');
	var uid = __webpack_require__(70);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(32);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(32).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(37).f;
	var has = __webpack_require__(55);
	var TAG = __webpack_require__(74)('toStringTag');
	
	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(69)('wks');
	var uid = __webpack_require__(70);
	var Symbol = __webpack_require__(32).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(55);
	var toObject = __webpack_require__(76);
	var IE_PROTO = __webpack_require__(68)('IE_PROTO');
	var ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(51);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(78);
	var global = __webpack_require__(32);
	var hide = __webpack_require__(36);
	var Iterators = __webpack_require__(56);
	var TO_STRING_TAG = __webpack_require__(74)('toStringTag');
	
	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');
	
	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(79);
	var step = __webpack_require__(80);
	var Iterators = __webpack_require__(56);
	var toIObject = __webpack_require__(62);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(52)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


/***/ }),
/* 79 */
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),
/* 80 */
/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(74);


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(84);
	var $Object = __webpack_require__(33).Object;
	module.exports = function getOwnPropertyNames(it) {
	  return $Object.getOwnPropertyNames(it);
	};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(85)('getOwnPropertyNames', function () {
	  return __webpack_require__(86).f;
	});


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(31);
	var core = __webpack_require__(33);
	var fails = __webpack_require__(42);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
	};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(62);
	var gOPN = __webpack_require__(87).f;
	var toString = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(61);
	var hiddenKeys = __webpack_require__(71).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


/***/ }),
/* 88 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(28);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(91)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(93)
	if (false) {}

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	exports.default = {
	  props: {
	    type: {
	      type: String,
	      default: null
	    },
	    oneAtAtime: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    }
	  },
	  created: function created() {
	    var _this = this;
	
	    this._isAccordion = true;
	    this.$on('isOpenEvent', function (child) {
	      if (_this.oneAtAtime) {
	        _this.$children.forEach(function (item) {
	          if (child !== item) {
	            item.isOpen = false;
	          }
	        });
	      }
	    });
	  }
	};
	// </script>
	// <template>
	//   <div class="panel-group">
	//     <slot></slot>
	//   </div>
	// </template>
	
	// <script>

/***/ }),
/* 92 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getJSON = getJSON;
	exports.getScrollBarWidth = getScrollBarWidth;
	exports.translations = translations;
	exports.delayer = delayer;
	exports.VueFixer = VueFixer;
	// coerce convert som types of data into another type
	var coerce = exports.coerce = {
	  // Convert a string to booleam. Otherwise, return the value without modification, so if is not boolean, Vue throw a warning.
	  boolean: function boolean(val) {
	    return typeof val === 'string' ? val === '' || val === 'true' ? true : val === 'false' || val === 'null' || val === 'undefined' ? false : val : val;
	  },
	  // Attempt to convert a string value to a Number. Otherwise, return 0.
	  number: function number(val) {
	    var alt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    return typeof val === 'number' ? val : val === undefined || val === null || isNaN(Number(val)) ? alt : Number(val);
	  },
	  // Attempt to convert to string any value, except for null or undefined.
	  string: function string(val) {
	    return val === undefined || val === null ? '' : val + '';
	  },
	  // Pattern accept RegExp, function, or string (converted to RegExp). Otherwise return null.
	  pattern: function pattern(val) {
	    return val instanceof Function || val instanceof RegExp ? val : typeof val === 'string' ? new RegExp(val) : null;
	  }
	};
	
	function getJSON(url) {
	  var request = new window.XMLHttpRequest();
	  var data = {};
	  // p (-simulated- promise)
	  var p = {
	    then: function then(fn1, fn2) {
	      return p.done(fn1).fail(fn2);
	    },
	    catch: function _catch(fn) {
	      return p.fail(fn);
	    },
	    always: function always(fn) {
	      return p.done(fn).fail(fn);
	    }
	  };
	  ['done', 'fail'].forEach(function (name) {
	    data[name] = [];
	    p[name] = function (fn) {
	      if (fn instanceof Function) data[name].push(fn);
	      return p;
	    };
	  });
	  p.done(JSON.parse);
	  request.onreadystatechange = function () {
	    if (request.readyState === 4) {
	      var e = { status: request.status };
	      if (request.status === 200) {
	        try {
	          var response = request.responseText;
	          for (var i in data.done) {
	            var value = data.done[i](response);
	            if (value !== undefined) {
	              response = value;
	            }
	          }
	        } catch (err) {
	          data.fail.forEach(function (fail) {
	            return fail(err);
	          });
	        }
	      } else {
	        data.fail.forEach(function (fail) {
	          return fail(e);
	        });
	      }
	    }
	  };
	  request.open('GET', url);
	  request.setRequestHeader('Accept', 'application/json');
	  request.send();
	  return p;
	}
	
	function getScrollBarWidth() {
	  if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
	    return 0;
	  }
	  var inner = document.createElement('p');
	  inner.style.width = '100%';
	  inner.style.height = '200px';
	
	  var outer = document.createElement('div');
	  outer.style.position = 'absolute';
	  outer.style.top = '0px';
	  outer.style.left = '0px';
	  outer.style.visibility = 'hidden';
	  outer.style.width = '200px';
	  outer.style.height = '150px';
	  outer.style.overflow = 'hidden';
	  outer.appendChild(inner);
	
	  document.body.appendChild(outer);
	  var w1 = inner.offsetWidth;
	  outer.style.overflow = 'scroll';
	  var w2 = inner.offsetWidth;
	  if (w1 === w2) w2 = outer.clientWidth;
	
	  document.body.removeChild(outer);
	
	  return w1 - w2;
	}
	
	// return all the translations or the default language (english)
	function translations() {
	  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
	
	  var text = {
	    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	    limit: 'Limit reached ({{limit}} items max).',
	    loading: 'Loading...',
	    minLength: 'Min. Length',
	    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	    notSelected: 'Nothing Selected',
	    required: 'Required',
	    search: 'Search'
	  };
	  return window.VueStrapLang ? window.VueStrapLang(lang) : text;
	}
	
	// delayer: set a function that execute after a delay
	// @params (function, delay_prop or value, default_value)
	function delayer(fn, varTimer) {
	  var ifNaN = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
	
	  function toInt(el) {
	    return (/^[0-9]+$/.test(el) ? Number(el) || 1 : null
	    );
	  }
	  var timerId;
	  return function () {
	    var _this = this;
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    if (timerId) clearTimeout(timerId);
	    timerId = setTimeout(function () {
	      fn.apply(_this, args);
	    }, toInt(varTimer) || toInt(this[varTimer]) || ifNaN);
	  };
	}
	
	// Fix a vue instance Lifecycle to vue 1/2 (just the basic elements, is not a real parser, so this work only if your code is compatible with both)
	function VueFixer(vue) {
	  var vue2 = !window.Vue || !window.Vue.partial;
	  var mixin = {
	    computed: {
	      vue2: function vue2() {
	        return !this.$dispatch;
	      }
	    }
	  };
	  if (!vue2) {
	    if (vue.beforeCreate) {
	      mixin.create = vue.beforeCreate;
	      delete vue.beforeCreate;
	    }
	    if (vue.beforeMount) {
	      vue.beforeCompile = vue.beforeMount;
	      delete vue.beforeMount;
	    }
	    if (vue.mounted) {
	      vue.ready = vue.mounted;
	      delete vue.mounted;
	    }
	  } else {
	    if (vue.beforeCompile) {
	      vue.beforeMount = vue.beforeCompile;
	      delete vue.beforeCompile;
	    }
	    if (vue.compiled) {
	      mixin.compiled = vue.compiled;
	      delete vue.compiled;
	    }
	    if (vue.ready) {
	      vue.mounted = vue.ready;
	      delete vue.ready;
	    }
	  }
	  if (!vue.mixins) {
	    vue.mixins = [];
	  }
	  vue.mixins.unshift(mixin);
	  return vue;
	}

/***/ }),
/* 93 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"panel-group\">\n    <slot></slot>\n  </div>";

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(95)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(96)
	if (false) {}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	var _NodeList = __webpack_require__(27);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div class="hidden-print hidden-xs hidden-sm">
	//     <nav class="bs-docs-sidebar" :class="{affix:affixed}" :style="{marginTop:top}">
	//       <slot></slot>
	//     </nav>
	//   </div>
	// </template>
	
	// <script>
	exports.default = {
	  props: {
	    offset: {
	      type: Number,
	      coerce: _utils.coerce.number,
	      default: 0
	    }
	  },
	  data: function data() {
	    return {
	      affixed: false
	    };
	  },
	
	  computed: {
	    top: function top() {
	      return this.offset > 0 ? this.offset + 'px' : null;
	    }
	  },
	  methods: {
	    // from https://github.com/ant-design/ant-design/blob/master/components/affix/index.jsx#L20
	    checkScroll: function checkScroll() {
	      var _this = this;
	
	      // if is hidden don't calculate anything
	      if (!(this.$el.offsetWidth || this.$el.offsetHeight || this.$el.getClientRects().length)) {
	        return;
	      }
	      // get window scroll and element position to detect if have to be normal or affixed
	      var scroll = {};
	      var element = {};
	      var rect = this.$el.getBoundingClientRect();
	      var body = document.body;
	      ['Top', 'Left'].forEach(function (type) {
	        var t = type.toLowerCase();
	        var ret = window['page' + (type === 'Top' ? 'Y' : 'X') + 'Offset'];
	        var method = 'scroll' + type;
	        if (typeof ret !== 'number') {
	          // ie6,7,8 standard mode
	          ret = document.documentElement[method];
	          if (typeof ret !== 'number') {
	            // quirks mode
	            ret = document.body[method];
	          }
	        }
	        scroll[t] = ret;
	        element[t] = scroll[t] + rect[t] - (_this.$el['client' + type] || body['client' + type] || 0);
	      });
	      var fix = scroll.top > element.top - this.offset;
	      if (this.affixed !== fix) {
	        this.affixed = fix;
	      }
	    }
	  },
	  ready: function ready() {
	    var _this2 = this;
	
	    (0, _NodeList2.default)(window).on('scroll resize', function () {
	      return _this2.checkScroll();
	    });
	    setTimeout(function () {
	      return _this2.checkScroll();
	    }, 0);
	  },
	  beforeDestroy: function beforeDestroy() {
	    var _this3 = this;
	
	    (0, _NodeList2.default)(window).off('scroll resize', function () {
	      return _this3.checkScroll();
	    });
	  }
	};
	// </script>

/***/ }),
/* 96 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"hidden-print hidden-xs hidden-sm\">\n    <nav class=\"bs-docs-sidebar\" :class=\"{affix:affixed}\" :style=\"{marginTop:top}\">\n      <slot></slot>\n    </nav>\n  </div>";

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(98)
	module.exports = __webpack_require__(102)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(103)
	if (false) {}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(99);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".fade-transition {\n  transition: opacity .3s ease;\n}\n.fade-enter,\n.fade-leave {\n  height: 0;\n  opacity: 0;\n}\n.alert.top {\n  position: fixed;\n  top: 30px;\n  margin: 0 auto;\n  left: 0;\n  right: 0;\n  z-index: 1050;\n}\n.alert.top-right {\n  position: fixed;\n  top: 30px;\n  right: 50px;\n  z-index: 1050;\n}", ""]);
	
	// exports


/***/ }),
/* 100 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	exports.default = {
	  props: {
	    type: {
	      type: String
	    },
	    dismissable: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    show: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: true,
	      twoWay: true
	    },
	    duration: {
	      type: Number,
	      coerce: _utils.coerce.number,
	      default: 0
	    },
	    width: {
	      type: String
	    },
	    placement: {
	      type: String
	    }
	  },
	  watch: {
	    show: function show(val) {
	      var _this = this;
	
	      if (this._timeout) clearTimeout(this._timeout);
	      if (val && Boolean(this.duration)) {
	        this._timeout = setTimeout(function () {
	          _this.show = false;
	        }, this.duration);
	      }
	    }
	  }
	  // </script>
	
	  // <style>
	  // .fade-transition {
	  //   transition: opacity .3s ease;
	  // }
	  // .fade-enter,
	  // .fade-leave {
	  //   height: 0;
	  //   opacity: 0;
	  // }
	  // .alert.top {
	  //   position: fixed;
	  //   top: 30px;
	  //   margin: 0 auto;
	  //   left: 0;
	  //   right: 0;
	  //   z-index: 1050;
	  // }
	  // .alert.top-right {
	  //   position: fixed;
	  //   top: 30px;
	  //   right: 50px;
	  //   z-index: 1050;
	  // }
	  // </style>
	
	}; // <template>
	//   <div
	//     v-show="show"
	//     v-bind:class="{
	//       'alert':		true,
	//       'alert-success':(type == 'success'),
	//       'alert-warning':(type == 'warning'),
	//       'alert-info':	(type == 'info'),
	//       'alert-danger':	(type == 'danger'),
	//       'top': 			(placement === 'top'),
	//       'top-right': 	(placement === 'top-right')
	//     }"
	//     transition="fade"
	//     v-bind:style="{width:width}"
	//     role="alert">
	//     <button v-show="dismissable" type="button" class="close"
	//       @click="show = false">
	//       <span>&times;</span>
	//     </button>
	//     <slot></slot>
	//   </div>
	// </template>
	
	// <script>

/***/ }),
/* 103 */
/***/ (function(module, exports) {

	module.exports = "<div\n    v-show=\"show\"\n    v-bind:class=\"{\n      'alert':\t\ttrue,\n      'alert-success':(type == 'success'),\n      'alert-warning':(type == 'warning'),\n      'alert-info':\t(type == 'info'),\n      'alert-danger':\t(type == 'danger'),\n      'top': \t\t\t(placement === 'top'),\n      'top-right': \t(placement === 'top-right')\n    }\"\n    transition=\"fade\"\n    v-bind:style=\"{width:width}\"\n    role=\"alert\">\n    <button v-show=\"dismissable\" type=\"button\" class=\"close\"\n      @click=\"show = false\">\n      <span>&times;</span>\n    </button>\n    <slot></slot>\n  </div>";

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(105)
	module.exports = __webpack_require__(107)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(108)
	if (false) {}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(106);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".aside-open {\n  transition: -webkit-transform 0.3s;\n  transition: transform 0.3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n}\n.aside-open.has-push-right {\n  -webkit-transform: translateX(-300px);\n          transform: translateX(-300px);\n}\n.aside {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    z-index: 1049;\n    overflow: auto;\n    background: #fff;\n}\n.aside.left {\n  left: 0;\n  right: auto;\n}\n.aside.right {\n  left: auto;\n  right: 0;\n}\n.slideleft-enter {\n  -webkit-animation:slideleft-in .3s;\n          animation:slideleft-in .3s;\n}\n.slideleft-leave {\n  -webkit-animation:slideleft-out .3s;\n          animation:slideleft-out .3s;\n}\n@-webkit-keyframes slideleft-in {\n  0% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes slideleft-in {\n  0% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes slideleft-out {\n  0% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n    opacity: 0;\n  }\n}\n@keyframes slideleft-out {\n  0% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n    opacity: 0;\n  }\n}\n.slideright-enter {\n  -webkit-animation:slideright-in .3s;\n          animation:slideright-in .3s;\n}\n.slideright-leave {\n  -webkit-animation:slideright-out .3s;\n          animation:slideright-out .3s;\n}\n@-webkit-keyframes slideright-in {\n  0% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes slideright-in {\n  0% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes slideright-out {\n  0% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n    opacity: 0;\n  }\n}\n@keyframes slideright-out {\n  0% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n    opacity: 0;\n  }\n}\n.aside:focus {\n    outline: 0\n}\n@media (max-width: 991px) {\n  .aside {\n    min-width:240px\n  }\n}\n.aside.left {\n  right: auto;\n  left: 0\n}\n.aside.right {\n  right: 0;\n  left: auto\n}\n.aside .aside-dialog .aside-header {\n  border-bottom: 1px solid #e5e5e5;\n  min-height: 16.43px;\n  padding: 6px 15px;\n  background: #337ab7;\n  color: #fff\n}\n.aside .aside-dialog .aside-header .close {\n  margin-right: -8px;\n  padding: 4px 8px;\n  color: #fff;\n  font-size: 25px;\n  opacity: .8\n}\n.aside .aside-dialog .aside-body {\n  position: relative;\n  padding: 15px\n}\n.aside .aside-dialog .aside-footer {\n  padding: 15px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5\n}\n.aside .aside-dialog .aside-footer .btn+.btn {\n  margin-left: 5px;\n  margin-bottom: 0\n}\n.aside .aside-dialog .aside-footer .btn-group .btn+.btn {\n  margin-left: -1px\n}\n.aside .aside-dialog .aside-footer .btn-block+.btn-block {\n  margin-left: 0\n}\n.aside-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  opacity: 0;\n  transition: opacity .3s ease;\n  background-color: #000\n}\n.aside-backdrop.in {\n  opacity: .5;\n  filter: alpha(opacity=50)\n}", ""]);
	
	// exports


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	var _NodeList = __webpack_require__(27);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div class="aside"
	//     v-bind:style="{width:width + 'px'}"
	//     v-bind:class="{
	//     left:placement === 'left',
	//     right:placement === 'right'
	//     }"
	//     v-show="show"
	//     :transition="(this.placement === 'left') ? 'slideleft' : 'slideright'">
	//     <div class="aside-dialog">
	//       <div class="aside-content">
	//         <div class="aside-header">
	//           <button type="button" class="close" @click='close'><span>&times;</span></button>
	//           <h4 class="aside-title">
	//           <slot name="header">
	//             {{ header }}
	//           </slot>
	//           </h4>
	//         </div>
	//         <div class="aside-body">
	//           <slot></slot>
	//         </div>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	
	// <script>
	exports.default = {
	  props: {
	    show: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      required: true,
	      twoWay: true
	    },
	    placement: {
	      type: String,
	      default: 'right'
	    },
	    header: {
	      type: String
	    },
	    width: {
	      type: Number,
	      coerce: _utils.coerce.number,
	      default: 320
	    }
	  },
	  watch: {
	    show: function show(val) {
	      var _this = this;
	
	      var body = document.body;
	      var scrollBarWidth = (0, _utils.getScrollBarWidth)();
	      if (val) {
	        if (!this._backdrop) {
	          this._backdrop = document.createElement('div');
	        }
	        this._backdrop.className = 'aside-backdrop';
	        body.appendChild(this._backdrop);
	        body.classList.add('modal-open');
	        if (scrollBarWidth !== 0) {
	          body.style.paddingRight = scrollBarWidth + 'px';
	        }
	        // request property that requires layout to force a layout
	        var x = this._backdrop.clientHeight;
	        this._backdrop.classList.add('in');
	        (0, _NodeList2.default)(this._backdrop).on('click', function () {
	          return _this.close();
	        });
	      } else {
	        (0, _NodeList2.default)(this._backdrop).on('transitionend', function () {
	          (0, _NodeList2.default)(_this._backdrop).off();
	          try {
	            body.classList.remove('modal-open');
	            body.style.paddingRight = '0';
	            body.removeChild(_this._backdrop);
	            _this._backdrop = null;
	          } catch (e) {}
	        });
	        this._backdrop.className = 'aside-backdrop';
	      }
	    }
	  },
	  methods: {
	    close: function close() {
	      this.show = false;
	    }
	  }
	  // </script>
	
	  // <style>
	  // .aside-open {
	  //   transition: transform 0.3s;
	  // }
	  // .aside-open.has-push-right {
	  //   transform: translateX(-300px);
	  // }
	  // .aside {
	  //     position: fixed;
	  //     top: 0;
	  //     bottom: 0;
	  //     z-index: 1049;
	  //     overflow: auto;
	  //     background: #fff;
	  // }
	  // .aside.left {
	  //   left: 0;
	  //   right: auto;
	  // }
	  // .aside.right {
	  //   left: auto;
	  //   right: 0;
	  // }
	  // .slideleft-enter {
	  //   animation:slideleft-in .3s;
	  // }
	  // .slideleft-leave {
	  //   animation:slideleft-out .3s;
	  // }
	  // @keyframes slideleft-in {
	  //   0% {
	  //     transform: translateX(-100%);
	  //     opacity: 0;
	  //   }
	  //   100% {
	  //     transform: translateX(0);
	  //     opacity: 1;
	  //   }
	  // }
	  // @keyframes slideleft-out {
	  //   0% {
	  //     transform: translateX(0);
	  //     opacity: 1;
	  //   }
	  //   100% {
	  //     transform: translateX(-100%);
	  //     opacity: 0;
	  //   }
	  // }
	  // .slideright-enter {
	  //   animation:slideright-in .3s;
	  // }
	  // .slideright-leave {
	  //   animation:slideright-out .3s;
	  // }
	  // @keyframes slideright-in {
	  //   0% {
	  //     transform: translateX(100%);
	  //     opacity: 0;
	  //   }
	  //   100% {
	  //     transform: translateX(0);
	  //     opacity: 1;
	  //   }
	  // }
	  // @keyframes slideright-out {
	  //   0% {
	  //     transform: translateX(0);
	  //     opacity: 1;
	  //   }
	  //   100% {
	  //     transform: translateX(100%);
	  //     opacity: 0;
	  //   }
	  // }
	  // .aside:focus {
	  //     outline: 0
	  // }
	  // @media (max-width: 991px) {
	  //   .aside {
	  //     min-width:240px
	  //   }
	  // }
	  // .aside.left {
	  //   right: auto;
	  //   left: 0
	  // }
	  // .aside.right {
	  //   right: 0;
	  //   left: auto
	  // }
	  // .aside .aside-dialog .aside-header {
	  //   border-bottom: 1px solid #e5e5e5;
	  //   min-height: 16.43px;
	  //   padding: 6px 15px;
	  //   background: #337ab7;
	  //   color: #fff
	  // }
	  // .aside .aside-dialog .aside-header .close {
	  //   margin-right: -8px;
	  //   padding: 4px 8px;
	  //   color: #fff;
	  //   font-size: 25px;
	  //   opacity: .8
	  // }
	  // .aside .aside-dialog .aside-body {
	  //   position: relative;
	  //   padding: 15px
	  // }
	  // .aside .aside-dialog .aside-footer {
	  //   padding: 15px;
	  //   text-align: right;
	  //   border-top: 1px solid #e5e5e5
	  // }
	  // .aside .aside-dialog .aside-footer .btn+.btn {
	  //   margin-left: 5px;
	  //   margin-bottom: 0
	  // }
	  // .aside .aside-dialog .aside-footer .btn-group .btn+.btn {
	  //   margin-left: -1px
	  // }
	  // .aside .aside-dialog .aside-footer .btn-block+.btn-block {
	  //   margin-left: 0
	  // }
	  // .aside-backdrop {
	  //   position: fixed;
	  //   top: 0;
	  //   right: 0;
	  //   bottom: 0;
	  //   left: 0;
	  //   z-index: 1040;
	  //   opacity: 0;
	  //   transition: opacity .3s ease;
	  //   background-color: #000
	  // }
	  // .aside-backdrop.in {
	  //   opacity: .5;
	  //   filter: alpha(opacity=50)
	  // }
	  // </style>
	
	};

/***/ }),
/* 108 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"aside\"\n    v-bind:style=\"{width:width + 'px'}\"\n    v-bind:class=\"{\n    left:placement === 'left',\n    right:placement === 'right'\n    }\"\n    v-show=\"show\"\n    :transition=\"(this.placement === 'left') ? 'slideleft' : 'slideright'\">\n    <div class=\"aside-dialog\">\n      <div class=\"aside-content\">\n        <div class=\"aside-header\">\n          <button type=\"button\" class=\"close\" @click='close'><span>&times;</span></button>\n          <h4 class=\"aside-title\">\n          <slot name=\"header\">\n            {{ header }}\n          </slot>\n          </h4>\n        </div>\n        <div class=\"aside-body\">\n          <slot></slot>\n        </div>\n      </div>\n    </div>\n  </div>";

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(110)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(111)
	if (false) {}

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	exports.default = {
	  props: {
	    value: null,
	    buttons: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: true
	    },
	    justified: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    type: {
	      type: String,
	      default: 'default'
	    },
	    vertical: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    }
	  },
	  watch: {
	    value: {
	      deep: true,
	      handler: function handler(val) {
	        this.$children.forEach(function (el) {
	          if (el.group && el.eval) el.eval();
	        });
	      }
	    }
	  },
	  created: function created() {
	    this._btnGroup = true;
	  }
	};
	// </script>
	// <template>
	//   <div :class="{'btn-group':buttons,'btn-group-justified':justified,'btn-group-vertical':vertical}" :data-toggle="buttons&&'buttons'">
	//     <slot></slot>
	//   </div>
	// </template>
	
	// <script>

/***/ }),
/* 111 */
/***/ (function(module, exports) {

	module.exports = "<div :class=\"{'btn-group':buttons,'btn-group-justified':justified,'btn-group-vertical':vertical}\" :data-toggle=\"buttons&&'buttons'\">\n    <slot></slot>\n  </div>";

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(113)
	module.exports = __webpack_require__(115)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(116)
	if (false) {}

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(114);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".carousel-control[_v-e0565696] {\n  cursor: pointer;\n}", ""]);
	
	// exports


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	var _NodeList = __webpack_require__(27);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	// <div class="carousel slide" data-ride="carousel">
	//   <!-- Indicators -->
	//   <ol class="carousel-indicators" v-show="indicators">
	//     <li v-for="i in indicator" @click="indicatorClick($index)" v-bind:class="{active:$index === index}"><span></span></li>
	//   </ol>
	//   <!-- Wrapper for slides -->
	//   <div class="carousel-inner" role="listbox">
	//     <slot></slot>
	//   </div>
	//   <!-- Controls -->
	//   <div v-show="controls" class="carousel-controls hidden-xs">
	//     <a class="left carousel-control" role="button" @click="prev">
	//       <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
	//     </a>
	//     <a class="right carousel-control" role="button" @click="next">
	//       <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
	//     </a>
	//   </div>
	// </div>
	// </template>
	
	// <script>
	exports.default = {
	  props: {
	    indicators: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: true
	    },
	    controls: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: true
	    },
	    interval: {
	      type: Number,
	      coerce: _utils.coerce.number,
	      default: 5000
	    }
	  },
	  data: function data() {
	    return {
	      indicator: [],
	      index: 0,
	      isAnimating: false
	    };
	  },
	
	  watch: {
	    index: function index(newVal, oldVal) {
	      this.slide(newVal > oldVal ? 'left' : 'right', newVal, oldVal);
	    }
	  },
	  methods: {
	    indicatorClick: function indicatorClick(index) {
	      if (this.isAnimating || this.index === index) return false;
	      this.isAnimating = true;
	      this.index = index;
	    },
	    slide: function slide(direction, next, prev) {
	      var _this = this;
	
	      if (!this.$el) {
	        return;
	      }
	      var $slider = (0, _NodeList2.default)('.item', this.$el);
	      if (!$slider.length) {
	        return;
	      }
	      var selected = $slider[next] || $slider[0];
	      (0, _NodeList2.default)(selected).addClass(direction === 'left' ? 'next' : 'prev');
	      // request property that requires layout to force a layout
	      var x = selected.clientHeight;
	      (0, _NodeList2.default)([$slider[prev], selected]).addClass(direction).on('transitionend', function () {
	        $slider.off('transitionend').className = 'item';
	        (0, _NodeList2.default)(selected).addClass('active');
	        _this.isAnimating = false;
	      });
	    },
	    next: function next() {
	      if (!this.$el || this.isAnimating) {
	        return false;
	      }
	      this.isAnimating = true;
	      this.index + 1 < (0, _NodeList2.default)('.item', this.$el).length ? this.index += 1 : this.index = 0;
	    },
	    prev: function prev() {
	      if (!this.$el || this.isAnimating) {
	        return false;
	      }
	      this.isAnimating = true;
	      this.index === 0 ? this.index = (0, _NodeList2.default)('.item', this.$el).length - 1 : this.index -= 1;
	    },
	    toggleInterval: function toggleInterval(val) {
	      if (val === undefined) {
	        val = this._intervalID;
	      }
	      if (this._intervalID) {
	        clearInterval(this._intervalID);
	        delete this._intervalID;
	      }
	      if (val && this.interval > 0) {
	        this._intervalID = setInterval(this.next, this.interval);
	      }
	    }
	  },
	  ready: function ready() {
	    var _this2 = this;
	
	    this.toggleInterval(true);
	    (0, _NodeList2.default)(this.$el).on('mouseenter', function () {
	      return _this2.toggleInterval(false);
	    }).on('mouseleave', function () {
	      return _this2.toggleInterval(true);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.toggleInterval(false);
	    (0, _NodeList2.default)(this.$el).off('mouseenter mouseleave');
	  }
	};
	// </script>
	
	// <style scoped>
	// .carousel-control {
	//   cursor: pointer;
	// }
	// </style>

/***/ }),
/* 116 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"carousel slide\" data-ride=\"carousel\" _v-e0565696=\"\">\n  <!-- Indicators -->\n  <ol class=\"carousel-indicators\" v-show=\"indicators\" _v-e0565696=\"\">\n    <li v-for=\"i in indicator\" @click=\"indicatorClick($index)\" v-bind:class=\"{active:$index === index}\" _v-e0565696=\"\"><span _v-e0565696=\"\"></span></li>\n  </ol>\n  <!-- Wrapper for slides -->\n  <div class=\"carousel-inner\" role=\"listbox\" _v-e0565696=\"\">\n    <slot _v-e0565696=\"\"></slot>\n  </div>\n  <!-- Controls -->\n  <div v-show=\"controls\" class=\"carousel-controls hidden-xs\" _v-e0565696=\"\">\n    <a class=\"left carousel-control\" role=\"button\" @click=\"prev\" _v-e0565696=\"\">\n      <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\" _v-e0565696=\"\"></span>\n    </a>\n    <a class=\"right carousel-control\" role=\"button\" @click=\"next\" _v-e0565696=\"\">\n      <span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\" _v-e0565696=\"\"></span>\n    </a>\n  </div>\n</div>";

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(118)
	module.exports = __webpack_require__(120)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(121)
	if (false) {}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(119);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, "label.checkbox[_v-726cb4d0] {\n  position: relative;\n  padding-left: 18px;\n}\nlabel.checkbox > input[_v-726cb4d0] {\n  box-sizing: border-box;\n  position: absolute;\n  z-index: -1;\n  padding: 0;\n  opacity: 0;\n  margin: 0;\n}\nlabel.checkbox > .icon[_v-726cb4d0] {\n  position: absolute;\n  top: .2rem;\n  left: 0;\n  display: block;\n  width: 1.4rem;\n  height: 1.4rem;\n  line-height:1rem;\n  text-align: center;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  border-radius: .35rem;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 50% 50%;\n}\nlabel.checkbox:not(.active) > .icon[_v-726cb4d0] {\n  background-color: #ddd;\n  border: 1px solid #bbb;\n}\nlabel.checkbox > input:focus ~ .icon[_v-726cb4d0] {\n  outline: 0;\n  border: 1px solid #66afe9;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);\n}\nlabel.checkbox.active > .icon[_v-726cb4d0] {\n  background-size: 1rem 1rem;\n  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNyIgaGVpZ2h0PSI3Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJtNS43MywwLjUybC0zLjEyNDIyLDMuMzQxNjFsLTEuMzM4OTUsLTEuNDMyMTJsLTEuMjQ5NjksMS4zMzY2NWwyLjU4ODYzLDIuNzY4NzZsNC4zNzM5LC00LjY3ODI2bC0xLjI0OTY5LC0xLjMzNjY1bDAsMGwwLjAwMDAyLDAuMDAwMDF6Ii8+PC9zdmc+);\n}\nlabel.checkbox.active .btn-default[_v-726cb4d0] { -webkit-filter: brightness(75%); filter: brightness(75%); }\n\nlabel.checkbox.disabled[_v-726cb4d0],\nlabel.checkbox.readonly[_v-726cb4d0],\n.btn.readonly[_v-726cb4d0] {\n  filter: alpha(opacity=65);\n  box-shadow: none;\n  opacity: .65;\n}\nlabel.btn > input[type=checkbox][_v-726cb4d0] {\n  position: absolute;\n  clip: rect(0,0,0,0);\n  pointer-events: none;\n}", ""]);
	
	// exports


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	exports.default = {
	  props: {
	    value: {
	      default: true
	    },
	    checked: {
	      twoWay: true
	    },
	    button: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    disabled: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    name: {
	      type: String,
	      default: null
	    },
	    readonly: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    type: {
	      type: String,
	      default: null
	    }
	  },
	  computed: {
	    active: function active() {
	      return typeof this.value !== 'boolean' && this.group ? ~this.$parent.value.indexOf(this.value) : this.checked === this.value;
	    },
	    isButton: function isButton() {
	      return this.button || this.group && this.$parent.buttons;
	    },
	    group: function group() {
	      return this.$parent && this.$parent._checkboxGroup;
	    },
	    typeColor: function typeColor() {
	      return this.type || this.$parent && this.$parent.type || 'default';
	    }
	  },
	  watch: {
	    checked: function checked(val) {
	      if (typeof this.value !== 'boolean' && this.group) {
	        if (this.checked && !~this.$parent.value.indexOf(this.value)) this.$parent.value.push(this.value);
	        if (!this.checked && ~this.$parent.value.indexOf(this.value)) this.$parent.value.$remove(this.value);
	      }
	    }
	  },
	  created: function created() {
	    if (typeof this.value === 'boolean') {
	      return;
	    }
	    var parent = this.$parent;
	    if (parent && parent._btnGroup && !parent._radioGroup) {
	      parent._checkboxGroup = true;
	      if (!(parent.value instanceof Array)) {
	        parent.value = [];
	      }
	    }
	  },
	  ready: function ready() {
	    if (!this.$parent._checkboxGroup || typeof this.value === 'boolean') {
	      return;
	    }
	    if (this.$parent.value.length) {
	      this.checked = ~this.$parent.value.indexOf(this.value);
	    } else if (this.checked) {
	      this.$parent.value.push(this.value);
	    }
	  },
	
	  methods: {
	    eval: function _eval() {
	      if (typeof this.value !== 'boolean' && this.group) {
	        this.checked = ~this.$parent.value.indexOf(this.value);
	      }
	    },
	    focus: function focus() {
	      this.$els.input.focus();
	    },
	    toggle: function toggle() {
	      if (!this.disabled) {
	        this.focus();
	        if (!this.readonly) {
	          this.checked = this.checked ? null : this.value;
	          if (this.group && typeof this.value !== 'boolean') {
	            var index = this.$parent.value.indexOf(this.value);
	            this.$parent.value[~index ? '$remove' : 'push'](this.value);
	          }
	        }
	      }
	      return false;
	    }
	  }
	  // </script>
	
	  // <style scoped>
	  // label.checkbox {
	  //   position: relative;
	  //   padding-left: 18px;
	  // }
	  // label.checkbox > input {
	  //   box-sizing: border-box;
	  //   position: absolute;
	  //   z-index: -1;
	  //   padding: 0;
	  //   opacity: 0;
	  //   margin: 0;
	  // }
	  // label.checkbox > .icon {
	  //   position: absolute;
	  //   top: .2rem;
	  //   left: 0;
	  //   display: block;
	  //   width: 1.4rem;
	  //   height: 1.4rem;
	  //   line-height:1rem;
	  //   text-align: center;
	  //   user-select: none;
	  //   border-radius: .35rem;
	  //   background-repeat: no-repeat;
	  //   background-position: center center;
	  //   background-size: 50% 50%;
	  // }
	  // label.checkbox:not(.active) > .icon {
	  //   background-color: #ddd;
	  //   border: 1px solid #bbb;
	  // }
	  // label.checkbox > input:focus ~ .icon {
	  //   outline: 0;
	  //   border: 1px solid #66afe9;
	  //   box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
	  // }
	  // label.checkbox.active > .icon {
	  //   background-size: 1rem 1rem;
	  //   background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNyIgaGVpZ2h0PSI3Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJtNS43MywwLjUybC0zLjEyNDIyLDMuMzQxNjFsLTEuMzM4OTUsLTEuNDMyMTJsLTEuMjQ5NjksMS4zMzY2NWwyLjU4ODYzLDIuNzY4NzZsNC4zNzM5LC00LjY3ODI2bC0xLjI0OTY5LC0xLjMzNjY1bDAsMGwwLjAwMDAyLDAuMDAwMDF6Ii8+PC9zdmc+);
	  // }
	  // label.checkbox.active .btn-default { filter: brightness(75%); }
	
	  // label.checkbox.disabled,
	  // label.checkbox.readonly,
	  // .btn.readonly {
	  //   filter: alpha(opacity=65);
	  //   box-shadow: none;
	  //   opacity: .65;
	  // }
	  // label.btn > input[type=checkbox] {
	  //   position: absolute;
	  //   clip: rect(0,0,0,0);
	  //   pointer-events: none;
	  // }
	  // </style>
	
	}; // <template>
	//   <label :class="[isButton?'btn btn-'+typeColor:'open checkbox '+typeColor,{active:checked,disabled:disabled,readonly:readonly}]" @click.prevent="toggle">
	//     <input type="checkbox" autocomplete="off"
	//       v-el:input
	//       :checked="active"
	//       :value="value"
	//       :name="name"
	//       :readonly="readonly"
	//       :disabled="disabled"
	//     />
	//     <span v-if="!isButton" class="icon dropdown-toggle" :class="[active?'btn-'+typeColor:'',{bg:typeColor==='default'}]"></span>
	//     <span v-if="!isButton&active&&typeColor==='default'" class="icon"></span>
	//     <slot></slot>
	//   </label>
	// </template>
	
	// <script>

/***/ }),
/* 121 */
/***/ (function(module, exports) {

	module.exports = "<label :class=\"[isButton?'btn btn-'+typeColor:'open checkbox '+typeColor,{active:checked,disabled:disabled,readonly:readonly}]\" @click.prevent=\"toggle\" _v-726cb4d0=\"\">\n    <input type=\"checkbox\" autocomplete=\"off\" v-el:input=\"\" :checked=\"active\" :value=\"value\" :name=\"name\" :readonly=\"readonly\" :disabled=\"disabled\" _v-726cb4d0=\"\">\n    <span v-if=\"!isButton\" class=\"icon dropdown-toggle\" :class=\"[active?'btn-'+typeColor:'',{bg:typeColor==='default'}]\" _v-726cb4d0=\"\"></span>\n    <span v-if=\"!isButton&amp;active&amp;&amp;typeColor==='default'\" class=\"icon\" _v-726cb4d0=\"\"></span>\n    <slot _v-726cb4d0=\"\"></slot>\n  </label>";

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(123)
	module.exports = __webpack_require__(125)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(126)
	if (false) {}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(124);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".datepicker{\n  position: relative;\n  display: inline-block;\n}\ninput.datepicker-input.with-reset-button {\n  padding-right: 25px;\n}\n.datepicker > button.close {\n  position: absolute;\n  top: 0;\n  right: 0;\n  outline: none;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n}\n.datepicker > button.close:focus {\n  opacity: .2;\n}\n.datepicker-popup{\n  position: absolute;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  background: #fff;\n  margin-top: 2px;\n  z-index: 1000;\n  box-shadow: 0 6px 12px rgba(0,0,0,0.175);\n}\n.datepicker-inner{\n  width: 218px;\n}\n.datepicker-body{\n  padding: 10px 10px;\n}\n.datepicker-ctrl p,\n.datepicker-ctrl span,\n.datepicker-body span{\n  display: inline-block;\n  width: 28px;\n  line-height: 28px;\n  height: 28px;\n  border-radius: 4px;\n}\n.datepicker-ctrl p {\n  width: 65%;\n}\n.datepicker-ctrl span {\n  position: absolute;\n}\n.datepicker-body span {\n  text-align: center;\n}\n.datepicker-monthRange span{\n  width: 48px;\n  height: 50px;\n  line-height: 45px;\n}\n.datepicker-item-disable {\n  background-color: white!important;\n  cursor: not-allowed!important;\n}\n.decadeRange span:first-child,\n.decadeRange span:last-child,\n.datepicker-item-disable,\n.datepicker-item-gray{\n  color: #999;\n}\n\n.datepicker-dateRange-item-active:hover,\n.datepicker-dateRange-item-active {\n  background: rgb(50, 118, 177)!important;\n  color: white!important;\n}\n.datepicker-monthRange {\n  margin-top: 10px\n}\n.datepicker-monthRange span,\n.datepicker-ctrl span,\n.datepicker-ctrl p,\n.datepicker-dateRange span {\n  cursor: pointer;\n}\n.datepicker-monthRange span:hover,\n.datepicker-ctrl p:hover,\n.datepicker-ctrl i:hover,\n.datepicker-dateRange span:hover,\n.datepicker-dateRange-item-hover {\n  background-color : #eeeeee;\n}\n.datepicker-weekRange span{\n  font-weight: bold;\n}\n.datepicker-label{\n  background-color: #f8f8f8;\n  font-weight: 700;\n  padding: 7px 0;\n  text-align: center;\n}\n.datepicker-ctrl{\n  position: relative;\n  height: 30px;\n  line-height: 30px;\n  font-weight: bold;\n  text-align: center;\n}\n.month-btn{\n  font-weight: bold;\n  -webkit-user-select:none;\n  -moz-user-select:none;\n  -ms-user-select:none;\n  user-select:none;\n}\n.datepicker-preBtn{\n  left: 2px;\n}\n.datepicker-nextBtn{\n  right: 2px;\n}", ""]);
	
	// exports


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	var _NodeList = __webpack_require__(27);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div class="datepicker">
	//     <input class="form-control datepicker-input" :class="{'with-reset-button': clearButton}" type="text" :placeholder="placeholder"
	//         :style="{width:width}"
	//         @click="inputClick"
	//         v-model="value"/>
	//     <button v-if="clearButton && value" type="button" class="close" @click="value = ''">
	//       <span>&times;</span>
	//     </button>
	//     <div class="datepicker-popup" v-show="displayDayView">
	//       <div class="datepicker-inner">
	//         <div class="datepicker-body">
	//           <div class="datepicker-ctrl">
	//             <span class="datepicker-preBtn glyphicon glyphicon-chevron-left" aria-hidden="true" @click="preNextMonthClick(0)"></span>
	//             <span class="datepicker-nextBtn glyphicon glyphicon-chevron-right" aria-hidden="true" @click="preNextMonthClick(1)"></span>
	//             <p @click="switchMonthView">{{stringifyDayHeader(currDate)}}</p>
	//           </div>
	//           <div class="datepicker-weekRange">
	//             <span v-for="w in text.daysOfWeek">{{w}}</span>
	//           </div>
	//           <div class="datepicker-dateRange">
	//             <span v-for="d in dateRange" :class="d.sclass" @click="daySelect(d.date,$event)">{{d.text}}</span>
	//           </div>
	//         </div>
	//       </div>
	//     </div>
	//     <div class="datepicker-popup" v-show="displayMonthView">
	//       <div class="datepicker-inner">
	//         <div class="datepicker-body">
	//           <div class="datepicker-ctrl">
	//             <span class="datepicker-preBtn glyphicon glyphicon-chevron-left" aria-hidden="true" @click="preNextYearClick(0)"></span>
	//             <span class="datepicker-nextBtn glyphicon glyphicon-chevron-right" aria-hidden="true" @click="preNextYearClick(1)"></span>
	//             <p @click="switchDecadeView">{{stringifyYearHeader(currDate)}}</p>
	//           </div>
	//           <div class="datepicker-monthRange">
	//             <template v-for="m in text.months">
	//               <span   :class="{'datepicker-dateRange-item-active':
	//                   (text.months[parse(value).getMonth()]  === m) &&
	//                   currDate.getFullYear() === parse(value).getFullYear()}"
	//                   @click="monthSelect($index)"
	//                 >{{m.substr(0,3)}}</span>
	//             </template>
	//           </div>
	//         </div>
	//       </div>
	//     </div>
	//     <div class="datepicker-popup" v-show="displayYearView">
	//       <div class="datepicker-inner">
	//         <div class="datepicker-body">
	//           <div class="datepicker-ctrl">
	//             <span class="datepicker-preBtn glyphicon glyphicon-chevron-left" aria-hidden="true" @click="preNextDecadeClick(0)"></span>
	//             <span class="datepicker-nextBtn glyphicon glyphicon-chevron-right" aria-hidden="true" @click="preNextDecadeClick(1)"></span>
	//             <p>{{stringifyDecadeHeader(currDate)}}</p>
	//           </div>
	//           <div class="datepicker-monthRange decadeRange">
	//             <template v-for="decade in decadeRange">
	//               <span :class="{'datepicker-dateRange-item-active':
	//                   parse(this.value).getFullYear() === decade.text}"
	//                   @click.stop="yearSelect(decade.text)"
	//                 >{{decade.text}}</span>
	//             </template>
	//           </div>
	//         </div>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	
	// <script>
	exports.default = {
	  props: {
	    value: {
	      type: String,
	      twoWay: true
	    },
	    format: {
	      default: 'MM/dd/yyyy'
	    },
	    disabledDaysOfWeek: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    width: {
	      type: String,
	      default: '200px'
	    },
	    clearButton: {
	      type: Boolean,
	      default: false
	    },
	    lang: {
	      type: String,
	      default: navigator.language
	    },
	    placeholder: {
	      type: String
	    }
	  },
	  ready: function ready() {
	    var _this = this;
	
	    this._blur = function (e) {
	      if (_this.$el !== null && !_this.$el.contains(e.target)) _this.close();
	    };
	    this.$dispatch('child-created', this);
	    this.currDate = this.parse(this.value) || this.parse(new Date());
	    (0, _NodeList2.default)(window).on('click', this._blur);
	  },
	  beforeDestroy: function beforeDestroy() {
	    (0, _NodeList2.default)(window).off('click', this._blur);
	  },
	  data: function data() {
	    return {
	      currDate: new Date(),
	      dateRange: [],
	      decadeRange: [],
	      displayDayView: false,
	      displayMonthView: false,
	      displayYearView: false
	    };
	  },
	
	  watch: {
	    currDate: function currDate() {
	      this.getDateRange();
	    }
	  },
	  computed: {
	    text: function text() {
	      return (0, _utils.translations)(this.lang);
	    }
	  },
	  methods: {
	    close: function close() {
	      this.displayDayView = this.displayMonthView = this.displayYearView = false;
	    },
	    inputClick: function inputClick() {
	      this.currDate = this.parse(this.value) || this.parse(new Date());
	      if (this.displayMonthView || this.displayYearView) {
	        this.displayDayView = false;
	      } else {
	        this.displayDayView = !this.displayDayView;
	      }
	    },
	    preNextDecadeClick: function preNextDecadeClick(flag) {
	      var year = this.currDate.getFullYear();
	      var months = this.currDate.getMonth();
	      var date = this.currDate.getDate();
	
	      if (flag === 0) {
	        this.currDate = new Date(year - 10, months, date);
	      } else {
	        this.currDate = new Date(year + 10, months, date);
	      }
	    },
	    preNextMonthClick: function preNextMonthClick(flag) {
	      var year = this.currDate.getFullYear();
	      var month = this.currDate.getMonth();
	      var date = this.currDate.getDate();
	
	      if (flag === 0) {
	        var preMonth = this.getYearMonth(year, month - 1);
	        this.currDate = new Date(preMonth.year, preMonth.month, date);
	      } else {
	        var nextMonth = this.getYearMonth(year, month + 1);
	        this.currDate = new Date(nextMonth.year, nextMonth.month, date);
	      }
	    },
	    preNextYearClick: function preNextYearClick(flag) {
	      var year = this.currDate.getFullYear();
	      var months = this.currDate.getMonth();
	      var date = this.currDate.getDate();
	
	      if (flag === 0) {
	        this.currDate = new Date(year - 1, months, date);
	      } else {
	        this.currDate = new Date(year + 1, months, date);
	      }
	    },
	    yearSelect: function yearSelect(year) {
	      this.displayYearView = false;
	      this.displayMonthView = true;
	      this.currDate = new Date(year, this.currDate.getMonth(), this.currDate.getDate());
	    },
	    daySelect: function daySelect(date, event) {
	      if (event.target.classList[0] === 'datepicker-item-disable') {
	        return false;
	      } else {
	        this.currDate = date;
	        this.value = this.stringify(this.currDate);
	        this.displayDayView = false;
	      }
	    },
	    switchMonthView: function switchMonthView() {
	      this.displayDayView = false;
	      this.displayMonthView = true;
	    },
	    switchDecadeView: function switchDecadeView() {
	      this.displayMonthView = false;
	      this.displayYearView = true;
	    },
	    monthSelect: function monthSelect(index) {
	      this.displayMonthView = false;
	      this.displayDayView = true;
	      this.currDate = new Date(this.currDate.getFullYear(), index, this.currDate.getDate());
	    },
	    getYearMonth: function getYearMonth(year, month) {
	      if (month > 11) {
	        year++;
	        month = 0;
	      } else if (month < 0) {
	        year--;
	        month = 11;
	      }
	      return { year: year, month: month };
	    },
	    stringifyDecadeHeader: function stringifyDecadeHeader(date) {
	      var yearStr = date.getFullYear().toString();
	      var firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0;
	      var lastYearOfDecade = parseInt(firstYearOfDecade, 10) + 10;
	      return firstYearOfDecade + '-' + lastYearOfDecade;
	    },
	    stringifyDayHeader: function stringifyDayHeader(date) {
	      return this.text.months[date.getMonth()] + ' ' + date.getFullYear();
	    },
	    parseMonth: function parseMonth(date) {
	      return this.text.months[date.getMonth()];
	    },
	    stringifyYearHeader: function stringifyYearHeader(date) {
	      return date.getFullYear();
	    },
	    stringify: function stringify(date) {
	      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.format;
	
	      if (!date) date = this.parse();
	      if (!date) return '';
	      var year = date.getFullYear();
	      var month = date.getMonth() + 1;
	      var day = date.getDate();
	      var monthName = this.parseMonth(date);
	
	      return format.replace(/yyyy/g, year).replace(/MMMM/g, monthName).replace(/MMM/g, monthName.substring(0, 3)).replace(/MM/g, ('0' + month).slice(-2)).replace(/dd/g, ('0' + day).slice(-2)).replace(/yy/g, year).replace(/M(?!a)/g, month).replace(/d/g, day);
	    },
	    parse: function parse() {
	      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.value;
	
	      var date = void 0;
	      if (str.length === 10 && (this.format === 'dd-MM-yyyy' || this.format === 'dd/MM/yyyy')) {
	        date = new Date(str.substring(6, 10), str.substring(3, 5) - 1, str.substring(0, 2));
	      } else {
	        date = new Date(str);
	      }
	      return isNaN(date.getFullYear()) ? new Date() : date;
	    },
	    getDayCount: function getDayCount(year, month) {
	      var dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	      if (month === 1) {
	        if (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) {
	          return 29;
	        }
	      }
	      return dict[month];
	    },
	    getDateRange: function getDateRange() {
	      var _this2 = this;
	
	      this.dateRange = [];
	      this.decadeRange = [];
	      var time = {
	        year: this.currDate.getFullYear(),
	        month: this.currDate.getMonth(),
	        day: this.currDate.getDate()
	      };
	      var yearStr = time.year.toString();
	      var firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0 - 1;
	      for (var i = 0; i < 12; i++) {
	        this.decadeRange.push({
	          text: firstYearOfDecade + i
	        });
	      }
	
	      var currMonthFirstDay = new Date(time.year, time.month, 1);
	      var firstDayWeek = currMonthFirstDay.getDay() + 1;
	      if (firstDayWeek === 0) {
	        firstDayWeek = 7;
	      }
	      var dayCount = this.getDayCount(time.year, time.month);
	      if (firstDayWeek > 1) {
	        var preMonth = this.getYearMonth(time.year, time.month - 1);
	        var prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month);
	        for (var _i = 1; _i < firstDayWeek; _i++) {
	          var dayText = prevMonthDayCount - firstDayWeek + _i + 1;
	          this.dateRange.push({
	            text: dayText,
	            date: new Date(preMonth.year, preMonth.month, dayText),
	            sclass: 'datepicker-item-gray'
	          });
	        }
	      }
	
	      var _loop = function _loop(_i2) {
	        var date = new Date(time.year, time.month, _i2);
	        var week = date.getDay();
	        var sclass = '';
	        _this2.disabledDaysOfWeek.forEach(function (el) {
	          if (week === parseInt(el, 10)) sclass = 'datepicker-item-disable';
	        });
	        if (_i2 === time.day) {
	          if (_this2.value) {
	            var valueDate = _this2.parse(_this2.value);
	            if (valueDate) {
	              if (valueDate.getFullYear() === time.year && valueDate.getMonth() === time.month) {
	                sclass = 'datepicker-dateRange-item-active';
	              }
	            }
	          }
	        }
	        _this2.dateRange.push({
	          text: _i2,
	          date: date,
	          sclass: sclass
	        });
	      };
	
	      for (var _i2 = 1; _i2 <= dayCount; _i2++) {
	        _loop(_i2);
	      }
	
	      if (this.dateRange.length < 42) {
	        var nextMonthNeed = 42 - this.dateRange.length;
	        var nextMonth = this.getYearMonth(time.year, time.month + 1);
	
	        for (var _i3 = 1; _i3 <= nextMonthNeed; _i3++) {
	          this.dateRange.push({
	            text: _i3,
	            date: new Date(nextMonth.year, nextMonth.month, _i3),
	            sclass: 'datepicker-item-gray'
	          });
	        }
	      }
	    }
	  }
	  // </script>
	
	  // <style>
	  // .datepicker{
	  //   position: relative;
	  //   display: inline-block;
	  // }
	  // input.datepicker-input.with-reset-button {
	  //   padding-right: 25px;
	  // }
	  // .datepicker > button.close {
	  //   position: absolute;
	  //   top: 0;
	  //   right: 0;
	  //   outline: none;
	  //   z-index: 2;
	  //   display: block;
	  //   width: 34px;
	  //   height: 34px;
	  //   line-height: 34px;
	  //   text-align: center;
	  // }
	  // .datepicker > button.close:focus {
	  //   opacity: .2;
	  // }
	  // .datepicker-popup{
	  //   position: absolute;
	  //   border: 1px solid #ccc;
	  //   border-radius: 5px;
	  //   background: #fff;
	  //   margin-top: 2px;
	  //   z-index: 1000;
	  //   box-shadow: 0 6px 12px rgba(0,0,0,0.175);
	  // }
	  // .datepicker-inner{
	  //   width: 218px;
	  // }
	  // .datepicker-body{
	  //   padding: 10px 10px;
	  // }
	  // .datepicker-ctrl p,
	  // .datepicker-ctrl span,
	  // .datepicker-body span{
	  //   display: inline-block;
	  //   width: 28px;
	  //   line-height: 28px;
	  //   height: 28px;
	  //   border-radius: 4px;
	  // }
	  // .datepicker-ctrl p {
	  //   width: 65%;
	  // }
	  // .datepicker-ctrl span {
	  //   position: absolute;
	  // }
	  // .datepicker-body span {
	  //   text-align: center;
	  // }
	  // .datepicker-monthRange span{
	  //   width: 48px;
	  //   height: 50px;
	  //   line-height: 45px;
	  // }
	  // .datepicker-item-disable {
	  //   background-color: white!important;
	  //   cursor: not-allowed!important;
	  // }
	  // .decadeRange span:first-child,
	  // .decadeRange span:last-child,
	  // .datepicker-item-disable,
	  // .datepicker-item-gray{
	  //   color: #999;
	  // }
	
	  // .datepicker-dateRange-item-active:hover,
	  // .datepicker-dateRange-item-active {
	  //   background: rgb(50, 118, 177)!important;
	  //   color: white!important;
	  // }
	  // .datepicker-monthRange {
	  //   margin-top: 10px
	  // }
	  // .datepicker-monthRange span,
	  // .datepicker-ctrl span,
	  // .datepicker-ctrl p,
	  // .datepicker-dateRange span {
	  //   cursor: pointer;
	  // }
	  // .datepicker-monthRange span:hover,
	  // .datepicker-ctrl p:hover,
	  // .datepicker-ctrl i:hover,
	  // .datepicker-dateRange span:hover,
	  // .datepicker-dateRange-item-hover {
	  //   background-color : #eeeeee;
	  // }
	  // .datepicker-weekRange span{
	  //   font-weight: bold;
	  // }
	  // .datepicker-label{
	  //   background-color: #f8f8f8;
	  //   font-weight: 700;
	  //   padding: 7px 0;
	  //   text-align: center;
	  // }
	  // .datepicker-ctrl{
	  //   position: relative;
	  //   height: 30px;
	  //   line-height: 30px;
	  //   font-weight: bold;
	  //   text-align: center;
	  // }
	  // .month-btn{
	  //   font-weight: bold;
	  //   -webkit-user-select:none;
	  //   -moz-user-select:none;
	  //   -ms-user-select:none;
	  //   user-select:none;
	  // }
	  // .datepicker-preBtn{
	  //   left: 2px;
	  // }
	  // .datepicker-nextBtn{
	  //   right: 2px;
	  // }
	  // </style>
	
	};

/***/ }),
/* 126 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"datepicker\">\n    <input class=\"form-control datepicker-input\" :class=\"{'with-reset-button': clearButton}\" type=\"text\" :placeholder=\"placeholder\"\n        :style=\"{width:width}\"\n        @click=\"inputClick\"\n        v-model=\"value\"/>\n    <button v-if=\"clearButton && value\" type=\"button\" class=\"close\" @click=\"value = ''\">\n      <span>&times;</span>\n    </button>\n    <div class=\"datepicker-popup\" v-show=\"displayDayView\">\n      <div class=\"datepicker-inner\">\n        <div class=\"datepicker-body\">\n          <div class=\"datepicker-ctrl\">\n            <span class=\"datepicker-preBtn glyphicon glyphicon-chevron-left\" aria-hidden=\"true\" @click=\"preNextMonthClick(0)\"></span>\n            <span class=\"datepicker-nextBtn glyphicon glyphicon-chevron-right\" aria-hidden=\"true\" @click=\"preNextMonthClick(1)\"></span>\n            <p @click=\"switchMonthView\">{{stringifyDayHeader(currDate)}}</p>\n          </div>\n          <div class=\"datepicker-weekRange\">\n            <span v-for=\"w in text.daysOfWeek\">{{w}}</span>\n          </div>\n          <div class=\"datepicker-dateRange\">\n            <span v-for=\"d in dateRange\" :class=\"d.sclass\" @click=\"daySelect(d.date,$event)\">{{d.text}}</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"datepicker-popup\" v-show=\"displayMonthView\">\n      <div class=\"datepicker-inner\">\n        <div class=\"datepicker-body\">\n          <div class=\"datepicker-ctrl\">\n            <span class=\"datepicker-preBtn glyphicon glyphicon-chevron-left\" aria-hidden=\"true\" @click=\"preNextYearClick(0)\"></span>\n            <span class=\"datepicker-nextBtn glyphicon glyphicon-chevron-right\" aria-hidden=\"true\" @click=\"preNextYearClick(1)\"></span>\n            <p @click=\"switchDecadeView\">{{stringifyYearHeader(currDate)}}</p>\n          </div>\n          <div class=\"datepicker-monthRange\">\n            <template v-for=\"m in text.months\">\n              <span   :class=\"{'datepicker-dateRange-item-active':\n                  (text.months[parse(value).getMonth()]  === m) &&\n                  currDate.getFullYear() === parse(value).getFullYear()}\"\n                  @click=\"monthSelect($index)\"\n                >{{m.substr(0,3)}}</span>\n            </template>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"datepicker-popup\" v-show=\"displayYearView\">\n      <div class=\"datepicker-inner\">\n        <div class=\"datepicker-body\">\n          <div class=\"datepicker-ctrl\">\n            <span class=\"datepicker-preBtn glyphicon glyphicon-chevron-left\" aria-hidden=\"true\" @click=\"preNextDecadeClick(0)\"></span>\n            <span class=\"datepicker-nextBtn glyphicon glyphicon-chevron-right\" aria-hidden=\"true\" @click=\"preNextDecadeClick(1)\"></span>\n            <p>{{stringifyDecadeHeader(currDate)}}</p>\n          </div>\n          <div class=\"datepicker-monthRange decadeRange\">\n            <template v-for=\"decade in decadeRange\">\n              <span :class=\"{'datepicker-dateRange-item-active':\n                  parse(this.value).getFullYear() === decade.text}\"\n                  @click.stop=\"yearSelect(decade.text)\"\n                >{{decade.text}}</span>\n            </template>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>";

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(128)
	module.exports = __webpack_require__(130)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(131)
	if (false) {}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(129);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".secret[_v-d1361234] {\n  position: absolute;\n  clip: rect(0 0 0 0);\n  overflow: hidden;\n  margin: -1px;\n  height: 1px;\n  width: 1px;\n  padding: 0;\n  border: 0;\n}", ""]);
	
	// exports


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	var _NodeList = __webpack_require__(27);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <li v-if="isLi" v-el:dropdown :class="classes">
	//     <slot name="button">
	//       <a class="dropdown-toggle" role="button" :class="{disabled: disabled}" @keyup.esc="show = false">
	//         {{ text }}
	//         <span class="caret"></span>
	//       </a>
	//     </slot>
	//     <slot name="dropdown-menu">
	//       <ul v-else class="dropdown-menu">
	//         <slot></slot>
	//       </ul>
	//     </slot>
	//   </li>
	//   <div v-else v-el:dropdown :class="classes">
	//     <slot name="before"></slot>
	//     <slot name="button">
	//       <button type="button" class="btn btn-{{type}} dropdown-toggle" @keyup.esc="show = false" :disabled="disabled">
	//         {{ text }}
	//         <span class="caret"></span>
	//       </button>
	//     </slot>
	//     <slot name="dropdown-menu">
	//       <ul class="dropdown-menu">
	//         <slot></slot>
	//       </ul>
	//     </slot>
	//   </div>
	// </template>
	// <script>
	exports.default = {
	  props: {
	    show: {
	      twoWay: true,
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    'class': null,
	    disabled: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    text: {
	      type: String,
	      default: null
	    },
	    type: {
	      type: String,
	      default: 'default'
	    }
	  },
	  computed: {
	    classes: function classes() {
	      return [{ open: this.show, disabled: this.disabled }, this.class, this.isLi ? 'dropdown' : this.inInput ? 'input-group-btn' : 'btn-group'];
	    },
	    inInput: function inInput() {
	      return this.$parent._input;
	    },
	    isLi: function isLi() {
	      return this.$parent._navbar || this.$parent.menu || this.$parent._tabset;
	    },
	    menu: function menu() {
	      return !this.$parent || this.$parent.navbar;
	    },
	    submenu: function submenu() {
	      return this.$parent && (this.$parent.menu || this.$parent.submenu);
	    },
	    slots: function slots() {
	      return this._slotContents;
	    }
	  },
	  methods: {
	    blur: function blur() {
	      var _this = this;
	
	      this.unblur();
	      this._hide = setTimeout(function () {
	        _this._hide = null;
	        _this.show = false;
	      }, 100);
	    },
	    unblur: function unblur() {
	      if (this._hide) {
	        clearTimeout(this._hide);
	        this._hide = null;
	      }
	    }
	  },
	  ready: function ready() {
	    var _this2 = this;
	
	    var $el = (0, _NodeList2.default)(this.$els.dropdown);
	    $el.onBlur(function (e) {
	      _this2.show = false;
	    });
	    $el.findChildren('a,button.dropdown-toggle').on('click', function (e) {
	      e.preventDefault();
	      if (_this2.disabled) {
	        return false;
	      }
	      _this2.show = !_this2.show;
	      return false;
	    });
	    $el.findChildren('ul').on('click', 'li>a', function (e) {
	      _this2.show = false;
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    var $el = (0, _NodeList2.default)(this.$els.dropdown);
	    $el.offBlur();
	    $el.findChildren('a,button').off();
	    $el.findChildren('ul').off();
	  }
	};
	// </script>
	
	// <style scoped>
	// .secret {
	//   position: absolute;
	//   clip: rect(0 0 0 0);
	//   overflow: hidden;
	//   margin: -1px;
	//   height: 1px;
	//   width: 1px;
	//   padding: 0;
	//   border: 0;
	// }
	// </style>

/***/ }),
/* 131 */
/***/ (function(module, exports) {

	module.exports = "<li v-if=\"isLi\" v-el:dropdown=\"\" :class=\"classes\" _v-d1361234=\"\">\n    <slot name=\"button\" _v-d1361234=\"\">\n      <a class=\"dropdown-toggle\" role=\"button\" :class=\"{disabled: disabled}\" @keyup.esc=\"show = false\" _v-d1361234=\"\">\n        {{ text }}\n        <span class=\"caret\" _v-d1361234=\"\"></span>\n      </a>\n    </slot>\n    <slot name=\"dropdown-menu\" _v-d1361234=\"\">\n      <ul v-else=\"\" class=\"dropdown-menu\" _v-d1361234=\"\">\n        <slot _v-d1361234=\"\"></slot>\n      </ul>\n    </slot>\n  </li>\n  <div v-else=\"\" v-el:dropdown=\"\" :class=\"classes\" _v-d1361234=\"\">\n    <slot name=\"before\" _v-d1361234=\"\"></slot>\n    <slot name=\"button\" _v-d1361234=\"\">\n      <button type=\"button\" class=\"btn btn-{{type}} dropdown-toggle\" @keyup.esc=\"show = false\" :disabled=\"disabled\" _v-d1361234=\"\">\n        {{ text }}\n        <span class=\"caret\" _v-d1361234=\"\"></span>\n      </button>\n    </slot>\n    <slot name=\"dropdown-menu\" _v-d1361234=\"\">\n      <ul class=\"dropdown-menu\" _v-d1361234=\"\">\n        <slot _v-d1361234=\"\"></slot>\n      </ul>\n    </slot>\n  </div>";

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(133)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(134)
	if (false) {}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	var _NodeList = __webpack_require__(27);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <slot></slot>
	// </template>
	
	// <script>
	exports.default = {
	  props: {
	    valid: {
	      twoWay: true,
	      default: null
	    },
	    enterSubmit: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    icon: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    lang: {
	      type: String,
	      default: navigator.language
	    }
	    // readonly: {
	    //   type: Boolean,
	    //   coerce: coerce.boolean,
	    //   default: false
	    // },
	    // required: {
	    //   type: Boolean,
	    //   coerce: coerce.boolean,
	    //   default: false
	    // },
	    // validationDelay: {
	    //   type: Number,
	    //   coerce: coerce.number,
	    //   default: 250
	    // }
	  },
	  data: function data() {
	    return {
	      children: [],
	      timeout: null
	    };
	  },
	
	  watch: {
	    valid: function valid(val, old) {
	      if (val === old) {
	        return;
	      }
	      this._parent && this._parent.validate();
	    }
	  },
	  methods: {
	    focus: function focus() {
	      this.$els.input.focus();
	    },
	    validate: function validate() {
	      var valid = true;
	      this.children.some(function (el) {
	        var v = el.validate ? el.validate() : el.valid !== undefined ? el.valid : el.required && !~['', null, undefined].indexOf(el.value);
	        if (!v) valid = false;
	        return !valid;
	      });
	      this.valid = valid;
	      return valid === true;
	    }
	  },
	  created: function created() {
	    this._formGroup = true;
	    var parent = this.$parent;
	    while (parent && !parent._formGroup) {
	      parent = parent.$parent;
	    }
	    if (parent && parent._formGroup) {
	      parent.children.push(this);
	      this._parent = parent;
	    }
	  },
	  ready: function ready() {
	    this.validate();
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._parent) this._parent.children.$remove(this);
	  }
	};
	// </script>

/***/ }),
/* 134 */
/***/ (function(module, exports) {

	module.exports = "<slot></slot>";

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(136)
	module.exports = __webpack_require__(138)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(139)
	if (false) {}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(137);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".form-group[_v-a362b476] {\n  position: relative;\n}\nlabel~.close[_v-a362b476] {\n  top: 25px;\n}\n.input-group>.icon[_v-a362b476] {\n  position: relative;\n  display: table-cell;\n  width:0;\n  z-index: 3;\n}\n.close[_v-a362b476] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n}\n.has-feedback .close[_v-a362b476] {\n  right: 20px;\n}", ""]);
	
	// exports


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	var _NodeList = __webpack_require__(27);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div class="form-group" :class="{validate:canValidate,'has-feedback':icon,'has-error':canValidate&&valid===false,'has-success':canValidate&&valid}">
	//     <slot name="label"><label v-if="label" class="control-label" @click="focus">{{label}}</label></slot>
	//     <div v-if="slots.before||slots.after" class="input-group">
	//       <slot name="before"></slot>
	//       <textarea v-if="type=='textarea'" class="form-control" v-el:input v-model="value"
	//         :cols="cols"
	//         :rows="rows"
	//         :name="name"
	//         :title="attr(title)"
	//         :readonly="readonly"
	//         :required="required"
	//         :disabled="disabled"
	//         :maxlength="maxlength"
	//         :placeholder="placeholder"
	//         @blur="onblur" @focus="onfocus"
	//       ></textarea>
	//       <input v-else class="form-control" v-el:input v-model="value"
	//         :name="name"
	//         :max="attr(max)"
	//         :min="attr(min)"
	//         :step="step"
	//         :type="type"
	//         :title="attr(title)"
	//         :readonly="readonly"
	//         :required="required"
	//         :disabled="disabled"
	//         :maxlength="maxlength"
	//         :placeholder="placeholder"
	//         @keyup.enter="enterSubmit&&submit()"
	//         @blur="onblur" @focus="onfocus"
	//       />
	//       <div v-if="showClear && value" :class="{icon:icon}">
	//         <span class="close" @click="value = ''">&times;</span>
	//       </div>
	//       <div v-if="icon" class="icon">
	//         <span v-if="icon&&valid!==null" :class="['form-control-feedback glyphicon','glyphicon-'+(valid?'ok':'remove')]" aria-hidden="true"></span>
	//       </div>
	//       <slot name="after"></slot>
	//     </div>
	//     <template v-else>
	//       <textarea v-if="type=='textarea'" class="form-control" v-el:input v-model="value"
	//         :cols="cols"
	//         :rows="rows"
	//         :name="name"
	//         :title="attr(title)"
	//         :readonly="readonly"
	//         :required="required"
	//         :disabled="disabled"
	//         :maxlength="maxlength"
	//         :placeholder="placeholder"
	//         @blur="onblur" @focus="onfocus"
	//       ></textarea>
	//       <input v-else class="form-control" v-el:input v-model="value"
	//         :name="name"
	//         :max="attr(max)"
	//         :min="attr(min)"
	//         :step="step"
	//         :type="type"
	//         :title="attr(title)"
	//         :readonly="readonly"
	//         :required="required"
	//         :disabled="disabled"
	//         :maxlength="maxlength"
	//         :placeholder="placeholder"
	//         @keyup.enter="enterSubmit&&submit()"
	//         @blur="onblur" @focus="onfocus"
	//       />
	//       <span v-if="showClear && value" class="close" @click="value = ''">&times;</span>
	//       <span v-if="icon&&valid!==null" :class="['form-control-feedback glyphicon','glyphicon-'+(valid?'ok':'remove')]" aria-hidden="true"></span>
	//     </template>
	//     <div v-if="showHelp" class="help-block" @click="focus">{{help}}</div>
	//     <div v-if="showError" class="help-block with-errors" @click="focus">{{errorText}}</div>
	//   </div>
	// </template>
	
	// <script>
	exports.default = {
	  props: {
	    value: {
	      twoWay: true,
	      default: null
	    },
	    match: {
	      type: String,
	      default: null
	    },
	    clearButton: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    disabled: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    enterSubmit: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    error: {
	      type: String,
	      default: null
	    },
	    help: {
	      type: String,
	      default: null
	    },
	    hideHelp: { // hide when have error
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: true
	    },
	    icon: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    label: {
	      type: String,
	      default: null
	    },
	    lang: {
	      type: String,
	      default: navigator.language
	    },
	    mask: null,
	    maskDelay: {
	      type: Number,
	      coerce: _utils.coerce.number,
	      default: 100
	    },
	    max: {
	      type: String,
	      coerce: _utils.coerce.string,
	      default: null
	    },
	    maxlength: {
	      type: Number,
	      coerce: _utils.coerce.number,
	      default: null
	    },
	    min: {
	      type: String,
	      coerce: _utils.coerce.string,
	      default: null
	    },
	    minlength: {
	      type: Number,
	      coerce: _utils.coerce.number,
	      default: 0
	    },
	    name: {
	      type: String,
	      default: null
	    },
	    pattern: {
	      coerce: _utils.coerce.pattern,
	      default: null
	    },
	    placeholder: {
	      type: String,
	      default: null
	    },
	    readonly: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    required: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    rows: {
	      type: Number,
	      coerce: _utils.coerce.number,
	      default: 3
	    },
	    step: {
	      type: Number,
	      coerce: _utils.coerce.number,
	      default: null
	    },
	    type: {
	      type: String,
	      default: 'text'
	    },
	    validationDelay: {
	      type: Number,
	      coerce: _utils.coerce.number,
	      default: 250
	    }
	  },
	  data: function data() {
	    return {
	      valid: null,
	      timeout: null
	    };
	  },
	
	  computed: {
	    canValidate: function canValidate() {
	      return !this.disabled && !this.readonly && (this.required || this.pattern || this.nativeValidate || this.match !== null);
	    },
	    errorText: function errorText() {
	      var value = this.value;
	      var error = [this.error];
	      if (!value && this.required) error.push('(' + this.text.required.toLowerCase() + ')');
	      if (value && value.length < this.minlength) error.push('(' + this.text.minLength.toLowerCase() + ': ' + this.minlength + ')');
	      return error.join(' ');
	    },
	    input: function input() {
	      return this.$els.input;
	    },
	    nativeValidate: function nativeValidate() {
	      return (this.input || {}).checkValidity && (~['url', 'email'].indexOf(this.type.toLowerCase()) || this.min || this.max);
	    },
	    showClear: function showClear() {
	      // Disable the clear-button on Edge if is enabled. Edge has a native clear button.
	      return (/\bEdge\//.test(window.navigator.userAgent) ? false : this.clearButton
	      );
	    },
	    showError: function showError() {
	      return this.error && this.valid === false;
	    },
	    showHelp: function showHelp() {
	      return this.help && (!this.showError || !this.hideHelp);
	    },
	    slots: function slots() {
	      return this._slotContents || {};
	    },
	    text: function text() {
	      return (0, _utils.translations)(this.lang);
	    },
	    title: function title() {
	      return this.errorText || this.help || '';
	    }
	  },
	  watch: {
	    match: function match(val) {
	      this.eval();
	    },
	    valid: function valid(val, old) {
	      if (val !== old) {
	        this._parent && this._parent.validate();
	      }
	    },
	    value: function value(val, old) {
	      var _this = this;
	
	      if (val !== old) {
	        if (this.mask instanceof Function) {
	          val = this.mask(val || '');
	          if (this.value !== val) {
	            if (this._timeout.mask) clearTimeout(this._timeout.mask);
	            this._timeout.mask = setTimeout(function () {
	              _this.value = val;
	              _this.$els.input.value = val;
	            }, this.maskDelay);
	          }
	        }
	        this.eval();
	      }
	    }
	  },
	  methods: {
	    attr: function attr(value) {
	      return ~['', null, undefined].indexOf(value) || value instanceof Function ? undefined : value;
	    },
	    focus: function focus() {
	      this.input.focus();
	    },
	    eval: function _eval() {
	      var _this2 = this;
	
	      if (this._timeout.eval) clearTimeout(this._timeout.eval);
	      if (!this.canValidate) {
	        this.valid = true;
	      } else {
	        this._timeout.eval = setTimeout(function () {
	          _this2.valid = _this2.validate();
	          _this2._timeout.eval = null;
	        }, this.validationDelay);
	      }
	    },
	    onblur: function onblur(e) {
	      if (this.canValidate) {
	        this.valid = this.validate();
	      }
	      this.$emit('blur', e);
	    },
	    onfocus: function onfocus(e) {
	      this.$emit('focus', e);
	    },
	    submit: function submit() {
	      if (this.$parent._formGroup) {
	        return this.$parent.validate();
	      }
	      if (this.input.form) {
	        var invalids = (0, _NodeList2.default)('.form-group.validate:not(.has-success)', this.input.form);
	        if (invalids.length) {
	          invalids.find('input,textarea,select')[0].focus();
	        } else {
	          this.input.form.submit();
	        }
	      }
	    },
	    validate: function validate() {
	      if (!this.canValidate) {
	        return true;
	      }
	      var value = (this.value || '').trim();
	      if (!value) {
	        return !this.required;
	      }
	      if (this.match !== null) {
	        return this.match === value;
	      }
	      if (value.length < this.minlength) {
	        return false;
	      }
	      if (this.nativeValidate && !this.input.checkValidity()) {
	        return false;
	      }
	      if (this.pattern) {
	        return this.pattern instanceof Function ? this.pattern(this.value) : this.pattern.test(this.value);
	      }
	      return true;
	    }
	  },
	  created: function created() {
	    this._input = true;
	    this._timeout = {};
	    var parent = this.$parent;
	    while (parent && !parent._formGroup) {
	      parent = parent.$parent;
	    }
	    if (parent && parent._formGroup) {
	      this._parent = parent;
	    }
	  },
	  ready: function ready() {
	    var _this3 = this;
	
	    this._parent && this._parent.children.push(this);
	    (0, _NodeList2.default)(this.input).on('focus', function (e) {
	      return _this3.$emit('focus', e);
	    }).on('blur', function (e) {
	      if (_this3.canValidate) {
	        _this3.valid = _this3.validate();
	      }
	      _this3.$emit('blur', e);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    this._parent && this._parent.children.$remove(this);
	    (0, _NodeList2.default)(this.input).off();
	  }
	};
	// </script>
	
	// <style scoped>
	// .form-group {
	//   position: relative;
	// }
	// label~.close {
	//   top: 25px;
	// }
	// .input-group>.icon {
	//   position: relative;
	//   display: table-cell;
	//   width:0;
	//   z-index: 3;
	// }
	// .close {
	//   position: absolute;
	//   top: 0;
	//   right: 0;
	//   z-index: 2;
	//   display: block;
	//   width: 34px;
	//   height: 34px;
	//   line-height: 34px;
	//   text-align: center;
	// }
	// .has-feedback .close {
	//   right: 20px;
	// }
	// </style>

/***/ }),
/* 139 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"form-group\" :class=\"{validate:canValidate,'has-feedback':icon,'has-error':canValidate&amp;&amp;valid===false,'has-success':canValidate&amp;&amp;valid}\" _v-a362b476=\"\">\n    <slot name=\"label\" _v-a362b476=\"\"><label v-if=\"label\" class=\"control-label\" @click=\"focus\" _v-a362b476=\"\">{{label}}</label></slot>\n    <div v-if=\"slots.before||slots.after\" class=\"input-group\" _v-a362b476=\"\">\n      <slot name=\"before\" _v-a362b476=\"\"></slot>\n      <textarea v-if=\"type=='textarea'\" class=\"form-control\" v-el:input=\"\" v-model=\"value\" :cols=\"cols\" :rows=\"rows\" :name=\"name\" :title=\"attr(title)\" :readonly=\"readonly\" :required=\"required\" :disabled=\"disabled\" :maxlength=\"maxlength\" :placeholder=\"placeholder\" @blur=\"onblur\" @focus=\"onfocus\" _v-a362b476=\"\"></textarea>\n      <input v-else=\"\" class=\"form-control\" v-el:input=\"\" v-model=\"value\" :name=\"name\" :max=\"attr(max)\" :min=\"attr(min)\" :step=\"step\" :type=\"type\" :title=\"attr(title)\" :readonly=\"readonly\" :required=\"required\" :disabled=\"disabled\" :maxlength=\"maxlength\" :placeholder=\"placeholder\" @keyup.enter=\"enterSubmit&amp;&amp;submit()\" @blur=\"onblur\" @focus=\"onfocus\" _v-a362b476=\"\">\n      <div v-if=\"showClear &amp;&amp; value\" :class=\"{icon:icon}\" _v-a362b476=\"\">\n        <span class=\"close\" @click=\"value = ''\" _v-a362b476=\"\">×</span>\n      </div>\n      <div v-if=\"icon\" class=\"icon\" _v-a362b476=\"\">\n        <span v-if=\"icon&amp;&amp;valid!==null\" :class=\"['form-control-feedback glyphicon','glyphicon-'+(valid?'ok':'remove')]\" aria-hidden=\"true\" _v-a362b476=\"\"></span>\n      </div>\n      <slot name=\"after\" _v-a362b476=\"\"></slot>\n    </div>\n    <template v-else=\"\" _v-a362b476=\"\">\n      <textarea v-if=\"type=='textarea'\" class=\"form-control\" v-el:input=\"\" v-model=\"value\" :cols=\"cols\" :rows=\"rows\" :name=\"name\" :title=\"attr(title)\" :readonly=\"readonly\" :required=\"required\" :disabled=\"disabled\" :maxlength=\"maxlength\" :placeholder=\"placeholder\" @blur=\"onblur\" @focus=\"onfocus\" _v-a362b476=\"\"></textarea>\n      <input v-else=\"\" class=\"form-control\" v-el:input=\"\" v-model=\"value\" :name=\"name\" :max=\"attr(max)\" :min=\"attr(min)\" :step=\"step\" :type=\"type\" :title=\"attr(title)\" :readonly=\"readonly\" :required=\"required\" :disabled=\"disabled\" :maxlength=\"maxlength\" :placeholder=\"placeholder\" @keyup.enter=\"enterSubmit&amp;&amp;submit()\" @blur=\"onblur\" @focus=\"onfocus\" _v-a362b476=\"\">\n      <span v-if=\"showClear &amp;&amp; value\" class=\"close\" @click=\"value = ''\" _v-a362b476=\"\">×</span>\n      <span v-if=\"icon&amp;&amp;valid!==null\" :class=\"['form-control-feedback glyphicon','glyphicon-'+(valid?'ok':'remove')]\" aria-hidden=\"true\" _v-a362b476=\"\"></span>\n    </template>\n    <div v-if=\"showHelp\" class=\"help-block\" @click=\"focus\" _v-a362b476=\"\">{{help}}</div>\n    <div v-if=\"showError\" class=\"help-block with-errors\" @click=\"focus\" _v-a362b476=\"\">{{errorText}}</div>\n  </div>";

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(141)
	module.exports = __webpack_require__(143)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(148)
	if (false) {}

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(142);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".modal {\n  transition: all 0.3s ease;\n}\n.modal.in {\n  background-color: rgba(0,0,0,0.5);\n}\n.modal.zoom .modal-dialog {\n  -webkit-transform: scale(0.1);\n  transform: scale(0.1);\n  top: 300px;\n  opacity: 0;\n  transition: all 0.3s;\n}\n.modal.zoom.in .modal-dialog {\n  -webkit-transform: scale(1);\n  transform: scale(1);\n  -webkit-transform: translate3d(0, -300px, 0);\n  transform: translate3d(0, -300px, 0);\n  opacity: 1;\n}", ""]);
	
	// exports


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isInteger = __webpack_require__(144);
	
	var _isInteger2 = _interopRequireDefault(_isInteger);
	
	var _utils = __webpack_require__(92);
	
	var _NodeList = __webpack_require__(27);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div role="dialog"
	//     v-bind:class="{
	//     'modal':true,
	//     'fade':effect === 'fade',
	//     'zoom':effect === 'zoom'
	//     }"
	//     >
	//     <div v-bind:class="{'modal-dialog':true,'modal-lg':large,'modal-sm':small}" role="document"
	//       v-bind:style="{width: optionalWidth}">
	//       <div class="modal-content">
	//         <slot name="modal-header">
	//           <div class="modal-header">
	//             <button type="button" class="close" @click="close"><span>&times;</span></button>
	//             <h4 class="modal-title">
	//               <slot name="title">
	//                 {{title}}
	//               </slot>
	//             </h4>
	//           </div>
	//         </slot>
	//         <slot name="modal-body">
	//           <div class="modal-body"></div>
	//         </slot>
	//         <slot name="modal-footer">
	//           <div class="modal-footer">
	//             <button type="button" class="btn btn-default" @click="close">{{ cancelText }}</button>
	//             <button type="button" class="btn btn-primary" @click="callback">{{ okText }}</button>
	//           </div>
	//         </slot>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	
	// <script>
	exports.default = {
	  props: {
	    okText: {
	      type: String,
	      default: 'Save changes'
	    },
	    cancelText: {
	      type: String,
	      default: 'Close'
	    },
	    title: {
	      type: String,
	      default: ''
	    },
	    show: {
	      required: true,
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      twoWay: true
	    },
	    width: {
	      default: null
	    },
	    callback: {
	      type: Function,
	      default: function _default() {}
	    },
	    effect: {
	      type: String,
	      default: null
	    },
	    backdrop: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: true
	    },
	    large: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    small: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    }
	  },
	  computed: {
	    optionalWidth: function optionalWidth() {
	      if (this.width === null) {
	        return null;
	      } else if ((0, _isInteger2.default)(this.width)) {
	        return this.width + 'px';
	      }
	      return this.width;
	    }
	  },
	  watch: {
	    show: function show(val) {
	      var _this = this;
	
	      var el = this.$el;
	      var body = document.body;
	      var scrollBarWidth = (0, _utils.getScrollBarWidth)();
	      if (val) {
	        (0, _NodeList2.default)(el).find('.modal-content').focus();
	        el.style.display = 'block';
	        setTimeout(function () {
	          return (0, _NodeList2.default)(el).addClass('in');
	        }, 0);
	        (0, _NodeList2.default)(body).addClass('modal-open');
	        if (scrollBarWidth !== 0) {
	          body.style.paddingRight = scrollBarWidth + 'px';
	        }
	        if (this.backdrop) {
	          (0, _NodeList2.default)(el).on('click', function (e) {
	            if (e.target === el) _this.show = false;
	          });
	        }
	      } else {
	        body.style.paddingRight = null;
	        (0, _NodeList2.default)(body).removeClass('modal-open');
	        (0, _NodeList2.default)(el).removeClass('in').on('transitionend', function () {
	          (0, _NodeList2.default)(el).off('click transitionend');
	          el.style.display = 'none';
	        });
	      }
	    }
	  },
	  methods: {
	    close: function close() {
	      this.show = false;
	    }
	  }
	  // </script>
	  // <style>
	  // .modal {
	  //   transition: all 0.3s ease;
	  // }
	  // .modal.in {
	  //   background-color: rgba(0,0,0,0.5);
	  // }
	  // .modal.zoom .modal-dialog {
	  //   -webkit-transform: scale(0.1);
	  //   -moz-transform: scale(0.1);
	  //   -ms-transform: scale(0.1);
	  //   transform: scale(0.1);
	  //   top: 300px;
	  //   opacity: 0;
	  //   -webkit-transition: all 0.3s;
	  //   -moz-transition: all 0.3s;
	  //   transition: all 0.3s;
	  // }
	  // .modal.zoom.in .modal-dialog {
	  //   -webkit-transform: scale(1);
	  //   -moz-transform: scale(1);
	  //   -ms-transform: scale(1);
	  //   transform: scale(1);
	  //   -webkit-transform: translate3d(0, -300px, 0);
	  //   transform: translate3d(0, -300px, 0);
	  //   opacity: 1;
	  // }
	  // </style>
	
	};

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(145), __esModule: true };

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(146);
	module.exports = __webpack_require__(33).Number.isInteger;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(31);
	
	$export($export.S, 'Number', { isInteger: __webpack_require__(147) });


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(39);
	var floor = Math.floor;
	module.exports = function isInteger(it) {
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};


/***/ }),
/* 148 */
/***/ (function(module, exports) {

	module.exports = "<div role=\"dialog\"\n    v-bind:class=\"{\n    'modal':true,\n    'fade':effect === 'fade',\n    'zoom':effect === 'zoom'\n    }\"\n    >\n    <div v-bind:class=\"{'modal-dialog':true,'modal-lg':large,'modal-sm':small}\" role=\"document\"\n      v-bind:style=\"{width: optionalWidth}\">\n      <div class=\"modal-content\">\n        <slot name=\"modal-header\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" @click=\"close\"><span>&times;</span></button>\n            <h4 class=\"modal-title\">\n              <slot name=\"title\">\n                {{title}}\n              </slot>\n            </h4>\n          </div>\n        </slot>\n        <slot name=\"modal-body\">\n          <div class=\"modal-body\"></div>\n        </slot>\n        <slot name=\"modal-footer\">\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-default\" @click=\"close\">{{ cancelText }}</button>\n            <button type=\"button\" class=\"btn btn-primary\" @click=\"callback\">{{ okText }}</button>\n          </div>\n        </slot>\n      </div>\n    </div>\n  </div>";

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(150)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(151)
	if (false) {}

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _NodeList = __webpack_require__(27);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    type: {
	      type: String,
	      default: 'default'
	    },
	    placement: {
	      type: String,
	      default: ''
	    },
	    fluid: {
	      type: Boolean,
	      default: false
	    }
	  },
	  data: function data() {
	    return {
	      id: 'bs-example-navbar-collapse-1',
	      collapsed: true,
	      styles: {}
	    };
	  },
	
	  computed: {
	    slots: function slots() {
	      return this._slotContents;
	    }
	  },
	  methods: {
	    toggleCollapse: function toggleCollapse(e) {
	      e && e.preventDefault();
	      this.collapsed = !this.collapsed;
	    }
	  },
	  created: function created() {
	    this._navbar = true;
	  },
	  ready: function ready() {
	    var _this = this;
	
	    var $dropdown = (0, _NodeList2.default)('.dropdown>[data-toggle="dropdown"]', this.$el).parent();
	    $dropdown.on('click', '.dropdown-toggle', function (e) {
	      e.preventDefault();
	      $dropdown.each(function (content) {
	        if (content.contains(e.target)) content.classList.toggle('open');
	      });
	    }).on('click', '.dropdown-menu>li>a', function (e) {
	      $dropdown.each(function (content) {
	        if (content.contains(e.target)) content.classList.remove('open');
	      });
	    }).onBlur(function (e) {
	      $dropdown.each(function (content) {
	        if (!content.contains(e.target)) content.classList.remove('open');
	      });
	    });
	    (0, _NodeList2.default)(this.$el).on('click touchstart', 'li:not(.dropdown)>a', function (e) {
	      setTimeout(function () {
	        _this.collapsed = true;
	      }, 200);
	    }).onBlur(function (e) {
	      if (!_this.$el.contains(e.target)) {
	        _this.collapsed = true;
	      }
	    });
	    var height = this.$el.offsetHeight;
	    if (this.placement === 'top') {
	      document.body.style.paddingTop = height + 'px';
	    }
	    if (this.placement === 'bottom') {
	      document.body.style.paddingBottom = height + 'px';
	    }
	    if (this.slots.collapse) (0, _NodeList2.default)('[data-toggle="collapse"]', this.$el).on('click', function (e) {
	      return _this.toggleCollapse(e);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    (0, _NodeList2.default)('.dropdown', this.$el).off('click').offBlur();
	    if (this.slots.collapse) (0, _NodeList2.default)('[data-toggle="collapse"]', this.$el).off('click');
	  }
	};
	// </script>
	// <template>
	//   <nav v-el:navbar :class="['navbar',{
	//     'navbar-inverse':(type == 'inverse'),
	//     'navbar-default':(type == 'default'),
	//     'navbar-fixed-top':(placement === 'top'),
	//     'navbar-fixed-bottom':(placement === 'bottom'),
	//     'navbar-static-top':(placement === 'static')
	//   }]">
	//     <div v-bind:class="fluid ? 'container-fluid' : 'container'">
	//       <div class="navbar-header">
	//         <button v-if="!slots.collapse" type="button" class="navbar-toggle collapsed"  aria-expanded="false" @click="toggleCollapse">
	//           <span class="sr-only">Toggle navigation</span>
	//           <span class="icon-bar"></span>
	//           <span class="icon-bar"></span>
	//           <span class="icon-bar"></span>
	//         </button>
	//         <slot name="collapse"></slot>
	//         <slot name="brand"></slot>
	//       </div>
	//       <div :class="['navbar-collapse',{collapse:collapsed}]">
	//         <ul class="nav navbar-nav">
	//           <slot></slot>
	//         </ul>
	//         <ul v-if="slots.right" class="nav navbar-nav navbar-right">
	//           <slot name="right"></slot>
	//         </ul>
	//       </div>
	//     </div>
	//   </nav>
	// </template>
	
	// <script>

/***/ }),
/* 151 */
/***/ (function(module, exports) {

	module.exports = "<nav v-el:navbar :class=\"['navbar',{\n    'navbar-inverse':(type == 'inverse'),\n    'navbar-default':(type == 'default'),\n    'navbar-fixed-top':(placement === 'top'),\n    'navbar-fixed-bottom':(placement === 'bottom'),\n    'navbar-static-top':(placement === 'static')\n  }]\">\n    <div v-bind:class=\"fluid ? 'container-fluid' : 'container'\">\n      <div class=\"navbar-header\">\n        <button v-if=\"!slots.collapse\" type=\"button\" class=\"navbar-toggle collapsed\"  aria-expanded=\"false\" @click=\"toggleCollapse\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <slot name=\"collapse\"></slot>\n        <slot name=\"brand\"></slot>\n      </div>\n      <div :class=\"['navbar-collapse',{collapse:collapsed}]\">\n        <ul class=\"nav navbar-nav\">\n          <slot></slot>\n        </ul>\n        <ul v-if=\"slots.right\" class=\"nav navbar-nav navbar-right\">\n          <slot name=\"right\"></slot>\n        </ul>\n      </div>\n    </div>\n  </nav>";

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(153)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(154)
	if (false) {}

/***/ }),
/* 153 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template><li v-el:v v-if="loading"><slot></slot></li></template>
	// <script>
	exports.default = {
	  props: { value: null },
	  data: function data() {
	    return { loading: true };
	  },
	  ready: function ready() {
	    if (this.$parent._select) {
	      if (!this.$parent.options) {
	        this.$parent.options = [];
	      }
	      var el = {};
	      el[this.$parent.optionsLabel] = this.$els.v.innerHTML;
	      el[this.$parent.optionsValue] = this.value;
	      this.$parent.options.push(el);
	      this.loading = false;
	    } else {
	      console.warn('options only work inside a select component');
	    }
	  }
	};
	// </script>

/***/ }),
/* 154 */
/***/ (function(module, exports) {

	module.exports = "<li v-el:v v-if=\"loading\"><slot></slot></li>";

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(156)
	module.exports = __webpack_require__(158)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(159)
	if (false) {}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(157);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".accordion-toggle {\n  cursor: pointer;\n}\n.collapse-transition {\n  transition: max-height .5s ease;\n}\n.collapse-enter, .collapse-leave {\n  max-height: 0!important;\n}", ""]);
	
	// exports


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	exports.default = {
	  props: {
	    header: {
	      type: String
	    },
	    isOpen: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: null
	    },
	    type: {
	      type: String,
	      default: null
	    }
	  },
	  computed: {
	    inAccordion: function inAccordion() {
	      return this.$parent && this.$parent._isAccordion;
	    },
	    panelType: function panelType() {
	      return 'panel panel-' + (this.type || this.$parent && this.$parent.type || 'default');
	    }
	  },
	  methods: {
	    toggle: function toggle() {
	      this.isOpen = !this.isOpen;
	      this.$dispatch('isOpenEvent', this);
	    }
	  },
	  transitions: {
	    collapse: {
	      afterEnter: function afterEnter(el) {
	        el.style.maxHeight = '';
	        el.style.overflow = '';
	      },
	      beforeLeave: function beforeLeave(el) {
	        el.style.maxHeight = el.offsetHeight + 'px';
	        el.style.overflow = 'hidden';
	        // Recalculate DOM before the class gets added.
	        return el.offsetHeight;
	      }
	    }
	  },
	  created: function created() {
	    if (this.isOpen === null) {
	      this.isOpen = !this.inAccordion;
	    }
	  }
	};
	// </script>
	
	// <style>
	// .accordion-toggle {
	//   cursor: pointer;
	// }
	// .collapse-transition {
	//   transition: max-height .5s ease;
	// }
	// .collapse-enter, .collapse-leave {
	//   max-height: 0!important;
	// }
	// </style>
	// <template>
	//   <div :class="panelType">
	//     <div :class="['panel-heading',{'accordion-toggle':inAccordion}]" @click.prevent="inAccordion&&toggle()">
	//       <slot name="header">
	//         <h4 class="panel-title">{{ header }}</h4>
	//       </slot>
	//     </div>
	//     <div class="panel-collapse"
	//       v-el:panel
	//       v-show="isOpen"
	//       transition="collapse"
	//     >
	//       <div class="panel-body">
	//         <slot></slot>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	
	// <script>

/***/ }),
/* 159 */
/***/ (function(module, exports) {

	module.exports = "<div :class=\"panelType\">\n    <div :class=\"['panel-heading',{'accordion-toggle':inAccordion}]\" @click.prevent=\"inAccordion&&toggle()\">\n      <slot name=\"header\">\n        <h4 class=\"panel-title\">{{ header }}</h4>\n      </slot>\n    </div>\n    <div class=\"panel-collapse\"\n      v-el:panel\n      v-show=\"isOpen\"\n      transition=\"collapse\"\n    >\n      <div class=\"panel-body\">\n        <slot></slot>\n      </div>\n    </div>\n  </div>";

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(161)
	module.exports = __webpack_require__(163)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(165)
	if (false) {}

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(162);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".popover.top,\n.popover.left,\n.popover.right,\n.popover.bottom {\n  display: block;\n}\n.scale-enter {\n  -webkit-animation:scale-in 0.15s ease-in;\n          animation:scale-in 0.15s ease-in;\n}\n.scale-leave {\n  -webkit-animation:scale-out 0.15s ease-out;\n          animation:scale-out 0.15s ease-out;\n}\n@-webkit-keyframes scale-in {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes scale-in {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes scale-out {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0;\n  }\n}\n@keyframes scale-out {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0;\n  }\n}", ""]);
	
	// exports


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _popoverMixins = __webpack_require__(164);
	
	var _popoverMixins2 = _interopRequireDefault(_popoverMixins);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  mixins: [_popoverMixins2.default],
	  props: {
	    trigger: {
	      type: String,
	      default: 'click'
	    }
	  }
	  // </script>
	
	  // <style>
	  // .popover.top,
	  // .popover.left,
	  // .popover.right,
	  // .popover.bottom {
	  //   display: block;
	  // }
	  // .scale-enter {
	  //   animation:scale-in 0.15s ease-in;
	  // }
	  // .scale-leave {
	  //   animation:scale-out 0.15s ease-out;
	  // }
	  // @keyframes scale-in {
	  //   0% {
	  //     transform: scale(0);
	  //     opacity: 0;
	  //   }
	  //   100% {
	  //     transform: scale(1);
	  //     opacity: 1;
	  //   }
	  // }
	  // @keyframes scale-out {
	  //   0% {
	  //     transform: scale(1);
	  //     opacity: 1;
	  //   }
	  //   100% {
	  //     transform: scale(0);
	  //     opacity: 0;
	  //   }
	  // }
	  // </style>
	
	}; // <template>
	//   <span v-el:trigger>
	//     <slot></slot>
	//     <div v-el:popover v-if="show"
	//       :class="['popover',placement]"
	//       :transition="effect"
	//     >
	//       <div class="arrow"></div>
	//       <h3 class="popover-title" v-if="title">
	//         <slot name="title">{{title}}</slot>
	//       </h3>
	//       <div class="popover-content">
	//         <slot name="content">{{{content}}}</slot>
	//       </div>
	//     </div>
	//   </span>
	// </template>
	
	// <script>

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	var _NodeList = __webpack_require__(27);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    trigger: {
	      type: String
	    },
	    effect: {
	      type: String,
	      default: 'fade'
	    },
	    title: {
	      type: String
	    },
	    content: {
	      type: String
	    },
	    header: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: true
	    },
	    placement: {
	      type: String,
	      default: 'top'
	    }
	  },
	  data: function data() {
	    return {
	      position: {
	        top: 0,
	        left: 0
	      },
	      show: false
	    };
	  },
	
	  methods: {
	    toggle: function toggle(e) {
	      var _this = this;
	
	      if (e && this.trigger === 'contextmenu') e.preventDefault();
	      if (!(this.show = !this.show)) {
	        return;
	      }
	      Vue.nextTick(function () {
	        var popover = _this.$els.popover;
	        var trigger = _this.$els.trigger.children[0];
	        switch (_this.placement) {
	          case 'top':
	            _this.position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2;
	            _this.position.top = trigger.offsetTop - popover.offsetHeight;
	            break;
	          case 'left':
	            _this.position.left = trigger.offsetLeft - popover.offsetWidth;
	            _this.position.top = trigger.offsetTop + trigger.offsetHeight / 2 - popover.offsetHeight / 2;
	            break;
	          case 'right':
	            _this.position.left = trigger.offsetLeft + trigger.offsetWidth;
	            _this.position.top = trigger.offsetTop + trigger.offsetHeight / 2 - popover.offsetHeight / 2;
	            break;
	          case 'bottom':
	            _this.position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2;
	            _this.position.top = trigger.offsetTop + trigger.offsetHeight;
	            break;
	          default:
	            console.warn('Wrong placement prop');
	        }
	        popover.style.top = _this.position.top + 'px';
	        popover.style.left = _this.position.left + 'px';
	      }, 0);
	    }
	  },
	  ready: function ready() {
	    var trigger = this.$els.trigger;
	    if (!trigger) return console.error('Could not find trigger v-el in your component that uses popoverMixin.');
	
	    if (this.trigger === 'focus' && !~trigger.tabIndex) {
	      trigger = (0, _NodeList2.default)('a,input,select,textarea,button', trigger);
	      if (!trigger.length) {
	        trigger = null;
	      }
	    }
	    if (trigger) {
	      var events = { contextmenu: 'contextmenu', hover: 'mouseleave mouseenter', focus: 'blur focus' };
	      (0, _NodeList2.default)(trigger).on(events[this.trigger] || 'click', this.toggle);
	      this._trigger = trigger;
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._trigger) (0, _NodeList2.default)(this._trigger).off();
	  }
	};

/***/ }),
/* 165 */
/***/ (function(module, exports) {

	module.exports = "<span v-el:trigger>\n    <slot></slot>\n    <div v-el:popover v-if=\"show\"\n      :class=\"['popover',placement]\"\n      :transition=\"effect\"\n    >\n      <div class=\"arrow\"></div>\n      <h3 class=\"popover-title\" v-if=\"title\">\n        <slot name=\"title\">{{title}}</slot>\n      </h3>\n      <div class=\"popover-content\">\n        <slot name=\"content\">{{{content}}}</slot>\n      </div>\n    </div>\n  </span>";

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(167)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(168)
	if (false) {}

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	exports.default = {
	  props: {
	    now: {
	      type: Number,
	      coerce: _utils.coerce.number,
	      required: true
	    },
	    label: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    type: {
	      type: String
	    },
	    striped: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    animated: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    }
	  }
	  // </script>
	
	}; // <template>
	//   <div role="progressbar" 
	//     :class="['progress-bar',{
	//       'progress-bar-success':type == 'success',
	//       'progress-bar-warning':type == 'warning',
	//       'progress-bar-info':type == 'info',
	//       'progress-bar-danger':type == 'danger',
	//       'progress-bar-striped':striped,
	//       'active':animated
	//     }]"
	//     :style="{width: now + '%'}"
	//   >
	//     {{label ? now + '%' : ''}}
	//   </div>
	// </template>
	
	// <script>

/***/ }),
/* 168 */
/***/ (function(module, exports) {

	module.exports = "<div role=\"progressbar\" \n    :class=\"['progress-bar',{\n      'progress-bar-success':type == 'success',\n      'progress-bar-warning':type == 'warning',\n      'progress-bar-info':type == 'info',\n      'progress-bar-danger':type == 'danger',\n      'progress-bar-striped':striped,\n      'active':animated\n    }]\"\n    :style=\"{width: now + '%'}\"\n  >\n    {{label ? now + '%' : ''}}\n  </div>";

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(170)
	module.exports = __webpack_require__(172)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(173)
	if (false) {}

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(171);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".radio { position: relative; }\n.radio > label > input {\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  opacity: 0;\n  z-index: -1;\n  box-sizing: border-box;\n}\n.radio > label > .icon {\n  position: absolute;\n  top: .15rem;\n  left: 0;\n  display: block;\n  width: 1.4rem;\n  height: 1.4rem;\n  text-align: center;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  border-radius: .7rem;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 50% 50%;\n}\n.radio:not(.active) > label > .icon {\n  background-color: #ddd;\n  border: 1px solid #bbb;\n}\n.radio > label > input:focus ~ .icon {\n  outline: 0;\n  border: 1px solid #66afe9;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);\n}\n.radio.active > label > .icon {\n  background-size: 1rem 1rem;\n  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjUiIGN5PSI1IiByPSI0IiBmaWxsPSIjZmZmIi8+PC9zdmc+);\n}\n.radio.active .btn-default { -webkit-filter: brightness(75%); filter: brightness(75%); }\n\n.radio.disabled > label > .icon,\n.radio.readonly > label > .icon,\n.btn.readonly {\n  filter: alpha(opacity=65);\n  box-shadow: none;\n  opacity: .65;\n}\nlabel.btn > input[type=radio] {\n  position: absolute;\n  clip: rect(0,0,0,0);\n  pointer-events: none;\n}", ""]);
	
	// exports


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	exports.default = {
	  props: {
	    value: {
	      default: true
	    },
	    checked: {
	      twoWay: true
	    },
	    button: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    disabled: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    name: {
	      type: String,
	      default: null
	    },
	    readonly: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    type: {
	      type: String,
	      default: null
	    }
	  },
	  computed: {
	    active: function active() {
	      return this.group ? this.$parent.value === this.value : this.value === this.checked;
	    },
	    buttonStyle: function buttonStyle() {
	      return this.button || this.group && this.$parent.buttons;
	    },
	    group: function group() {
	      return this.$parent && this.$parent._radioGroup;
	    },
	    typeColor: function typeColor() {
	      return this.type || this.$parent && this.$parent.type || 'default';
	    }
	  },
	  created: function created() {
	    var parent = this.$parent;
	    if (!parent) return;
	    if (parent._btnGroup && !parent._checkboxGroup) {
	      parent._radioGroup = true;
	    }
	  },
	  ready: function ready() {
	    if (!this.$parent._radioGroup) return;
	    if (this.$parent.value) {
	      this.checked = this.$parent.value === this.value;
	    } else if (this.checked) {
	      this.$parent.value = this.value;
	    }
	  },
	
	  methods: {
	    focus: function focus() {
	      this.$els.input.focus();
	    },
	    toggle: function toggle() {
	      if (this.disabled) {
	        return;
	      }
	      this.focus();
	      if (this.readonly) {
	        return;
	      }
	      this.checked = this.value;
	      if (this.group) {
	        this.$parent.value = this.value;
	      }
	    }
	  }
	  // </script>
	
	  // <style scope>
	  // .radio { position: relative; }
	  // .radio > label > input {
	  //   position: absolute;
	  //   margin: 0;
	  //   padding: 0;
	  //   opacity: 0;
	  //   z-index: -1;
	  //   box-sizing: border-box;
	  // }
	  // .radio > label > .icon {
	  //   position: absolute;
	  //   top: .15rem;
	  //   left: 0;
	  //   display: block;
	  //   width: 1.4rem;
	  //   height: 1.4rem;
	  //   text-align: center;
	  //   user-select: none;
	  //   border-radius: .7rem;
	  //   background-repeat: no-repeat;
	  //   background-position: center center;
	  //   background-size: 50% 50%;
	  // }
	  // .radio:not(.active) > label > .icon {
	  //   background-color: #ddd;
	  //   border: 1px solid #bbb;
	  // }
	  // .radio > label > input:focus ~ .icon {
	  //   outline: 0;
	  //   border: 1px solid #66afe9;
	  //   box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
	  // }
	  // .radio.active > label > .icon {
	  //   background-size: 1rem 1rem;
	  //   background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjUiIGN5PSI1IiByPSI0IiBmaWxsPSIjZmZmIi8+PC9zdmc+);
	  // }
	  // .radio.active .btn-default { filter: brightness(75%); }
	
	  // .radio.disabled > label > .icon,
	  // .radio.readonly > label > .icon,
	  // .btn.readonly {
	  //   filter: alpha(opacity=65);
	  //   box-shadow: none;
	  //   opacity: .65;
	  // }
	  // label.btn > input[type=radio] {
	  //   position: absolute;
	  //   clip: rect(0,0,0,0);
	  //   pointer-events: none;
	  // }
	  // </style>
	
	}; // <template>
	//   <label v-if="buttonStyle" :class="['btn btn-'+typeColor,{active:active,disabled:disabled,readonly:readonly}]" @click.prevent="toggle">
	//     <input type="radio" autocomplete="off"
	//       v-el:input
	//       v-show="!readonly"
	//       :checked="active"
	//       :value="value"
	//       :name="name"
	//       :readonly="readonly"
	//       :disabled="disabled"
	//     />
	//     <slot></slot>
	//   </label>
	//   <div v-else :class="['radio',typeColor,{active:active,disabled:disabled,readonly:readonly}]" @click.prevent="toggle">
	//     <label class="open">
	//       <input type="radio" autocomplete="off"
	//         v-el:input
	//         :checked="active"
	//         :value="value"
	//         :name="name"
	//         :readonly="readonly"
	//         :disabled="disabled"
	//       />
	//       <span class="icon dropdown-toggle" :class="[active?'btn-'+typeColor:'',{bg:typeColor==='default'}]"></span>
	//       <span v-if="active&&typeColor==='default'" class="icon"></span>
	//       <slot></slot>
	//     </label>
	//   </div>
	// </template>
	
	// <script>

/***/ }),
/* 173 */
/***/ (function(module, exports) {

	module.exports = "<label v-if=\"buttonStyle\" :class=\"['btn btn-'+typeColor,{active:active,disabled:disabled,readonly:readonly}]\" @click.prevent=\"toggle\">\n    <input type=\"radio\" autocomplete=\"off\"\n      v-el:input\n      v-show=\"!readonly\"\n      :checked=\"active\"\n      :value=\"value\"\n      :name=\"name\"\n      :readonly=\"readonly\"\n      :disabled=\"disabled\"\n    />\n    <slot></slot>\n  </label>\n  <div v-else :class=\"['radio',typeColor,{active:active,disabled:disabled,readonly:readonly}]\" @click.prevent=\"toggle\">\n    <label class=\"open\">\n      <input type=\"radio\" autocomplete=\"off\"\n        v-el:input\n        :checked=\"active\"\n        :value=\"value\"\n        :name=\"name\"\n        :readonly=\"readonly\"\n        :disabled=\"disabled\"\n      />\n      <span class=\"icon dropdown-toggle\" :class=\"[active?'btn-'+typeColor:'',{bg:typeColor==='default'}]\"></span>\n      <span v-if=\"active&&typeColor==='default'\" class=\"icon\"></span>\n      <slot></slot>\n    </label>\n  </div>";

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(175)
	module.exports = __webpack_require__(177)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(192)
	if (false) {}

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(176);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, "div.form-control.dropdown-toggle[_v-68cb8591]{\n  height: auto;\n  padding-right: 24px;\n  cursor: pointer;\n}\ndiv.form-control.dropdown-toggle[_v-68cb8591]:after{\n  content: ' ';\n  position: absolute;\n  right: 13px;\n  top: 50%;\n  margin: -1px 0 0;\n  border-top: 4px dashed;\n  border-top: 4px solid \\9;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n}\n.bs-searchbox[_v-68cb8591] {\n  position: relative;\n  margin: 4px 8px;\n}\n.bs-searchbox .close[_v-68cb8591] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n}\n.bs-searchbox input[_v-68cb8591]:focus,\n.secret:focus + button[_v-68cb8591] {\n  outline: 0;\n  border-color: #66afe9 !important;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);\n}\n.secret[_v-68cb8591] {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\ndiv>.close[_v-68cb8591] { margin-left: 5px; }\n.notify.out[_v-68cb8591] { position: relative; }\n.notify.in[_v-68cb8591],\n.notify>div[_v-68cb8591] {\n  position: absolute;\n  width: 96%;\n  margin: 0 2%;\n  min-height: 26px;\n  padding: 3px 5px;\n  background: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);\n  pointer-events: none;\n}\n.notify>div[_v-68cb8591] {\n  top: 5px;\n  z-index: 1;\n}\n.notify.in[_v-68cb8591] {\n  opacity: .9;\n  bottom: 5px;\n}\n.btn-group-justified .dropdown-toggle>span[_v-68cb8591]:not(.close) {\n  width: calc(100% - 18px);\n  display: inline-block;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  margin-bottom: -4px;\n}\n.btn-group-justified .dropdown-menu[_v-68cb8591] {\n  width: 100%;\n}\n.open>.dropdown-menu[_v-68cb8591] {\n  overflow-y: auto;\n  max-height: 2.5rem;\n}\n.form-control.dropdown-toggle[_v-68cb8591]{\n  border-radius: 5px;\n}\n.form-control.dropdown-toggle>.close[_v-68cb8591]{\n  float: none;\n  font-size: 20px;\n  line-height: 20px;\n}", ""]);
	
	// exports


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(178);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _utils = __webpack_require__(92);
	
	var _NodeList = __webpack_require__(27);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div v-el:select :class="classes">
	//     <div class="form-control dropdown-toggle"
	//       :disabled="disabled || !hasParent"
	//       :readonly="readonly"
	//       @click="toggle()"
	//       @keyup.esc="show = false"
	//     >
	//       <span class="btn-content" v-html="loading ? text.loading : showPlaceholder || selected"></span>
	//       <span v-if="clearButton&&values.length" class="close" @click="clear()">&times;</span>
	//     </div>
	//     <select v-el:sel v-model="value" v-show="show" name="{{name}}" class="secret" :multiple="multiple" :required="required" :readonly="readonly" :disabled="disabled">
	//       <option v-if="required" value=""></option>
	//       <option v-for="option in options" :value="option[optionsValue]||option">{{ option[optionsLabel]||option }}</option>
	//     </select>
	//     <ul class="dropdown-menu">
	//       <template v-if="options.length">
	//         <li v-if="canSearch" class="bs-searchbox">
	//           <input type="text" placeholder="{{searchText||text.search}}" class="form-control" autocomplete="off"
	//             v-el:search
	//             v-model="searchValue"
	//             @keyup.esc="show = false"
	//           />
	//           <span v-show="searchValue" class="close" @click="clearSearch">&times;</span>
	//         </li>
	//         <li v-if="required&&!clearButton"><a @mousedown.prevent="clear() && blur()">{{ placeholder || text.notSelected }}</a></li>
	//         <li v-for="option in options | filterBy searchValue" :id="option[optionsValue]||option">
	//           <a @mousedown.prevent="select(option[optionsValue],option)">
	//             <span v-html="option[optionsLabel]||option"></span>
	//             <span class="glyphicon glyphicon-ok check-mark" v-show="isSelected(option[optionsValue])"></span>
	//           </a>
	//         </li>
	//       </template>
	//       <slot></slot>
	//       <div v-if="showNotify && !closeOnSelect" class="notify in" transition="fadein">{{limitText}}</div>
	//     </ul>
	//     <div v-if="showNotify && closeOnSelect" class="notify out" transition="fadein"><div>{{limitText}}</div></div>
	//   </div>
	// </template>
	
	// <script>
	var timeout = {};
	exports.default = {
	  props: {
	    value: {
	      twoWay: true
	    },
	    options: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    multiple: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    clearButton: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    closeOnSelect: { // only works when multiple
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    disabled: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    lang: {
	      type: String,
	      default: navigator.language
	    },
	    limit: {
	      type: Number,
	      coerce: _utils.coerce.number,
	      default: 1024
	    },
	    name: {
	      type: String,
	      default: null
	    },
	    optionsLabel: {
	      type: String,
	      default: 'label'
	    },
	    optionsValue: {
	      type: String,
	      default: 'value'
	    },
	    parent: {
	      default: true
	    },
	    placeholder: {
	      type: String,
	      default: null
	    },
	    readonly: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: null
	    },
	    required: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: null
	    },
	    minSearch: {
	      type: Number,
	      coerce: _utils.coerce.number,
	      default: 0
	    },
	    search: { // Allow searching (only works when options are provided)
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    searchText: {
	      type: String,
	      default: null
	    },
	    url: {
	      type: String,
	      default: null
	    }
	  },
	  data: function data() {
	    return {
	      loading: null,
	      searchValue: null,
	      show: false,
	      showNotify: false,
	      valid: null
	    };
	  },
	
	  computed: {
	    selected: function selected() {
	      var _this = this;
	
	      if (this.options.length === 0) {
	        return '';
	      }
	      var foundItems = [];
	      this.values.forEach(function (item) {
	        if (~['number', 'string'].indexOf(typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item))) {
	          var option = null;
	          if (_this.options.some(function (o) {
	            if (o instanceof Object ? o[_this.optionsValue] === item : o === item) {
	              option = o;
	              return true;
	            }
	          })) {
	            foundItems.push(option[_this.optionsLabel] || option);
	          }
	        }
	      });
	      return foundItems.join(', ');
	    },
	    classes: function classes() {
	      return [{ open: this.show, disabled: this.disabled }, this.class, this.isLi ? 'dropdown' : this.inInput ? 'input-group-btn' : 'btn-group'];
	    },
	    inInput: function inInput() {
	      return this.$parent._input;
	    },
	    isLi: function isLi() {
	      return this.$parent._navbar || this.$parent.menu || this.$parent._tabset;
	    },
	    canSearch: function canSearch() {
	      return this.minSearch ? this.options.length >= this.minSearch : this.search;
	    },
	    limitText: function limitText() {
	      return this.text.limit.replace('{{limit}}', this.limit);
	    },
	    showPlaceholder: function showPlaceholder() {
	      return this.values.length === 0 || !this.hasParent ? this.placeholder || this.text.notSelected : null;
	    },
	    text: function text() {
	      return (0, _utils.translations)(this.lang);
	    },
	    hasParent: function hasParent() {
	      return this.parent instanceof Array ? this.parent.length : this.parent;
	    },
	    values: function values() {
	      return this.value instanceof Array ? this.value : this.value !== null && this.value !== undefined ? [this.value] : [];
	    }
	  },
	  watch: {
	    options: function options(_options) {
	      var _this2 = this;
	
	      var changed = false;
	      if (_options instanceof Array && _options.length) {
	        _options.map(function (el) {
	          if (!(el instanceof Object)) {
	            var obj = {};
	            obj[_this2.optionsLabel] = el;
	            obj[_this2.optionsValue] = el;
	            changed = true;
	            return obj;
	          }
	          return el;
	        });
	      }
	      if (changed) {
	        this.options = _options;
	      }
	    },
	    show: function show(val) {
	      if (val) {
	        this.$els.sel.focus();
	        this.$els.search && this.$els.search.focus();
	      }
	    },
	    url: function url() {
	      this.update();
	    },
	    value: function value(val) {
	      var _this3 = this;
	
	      this.$emit('change', val);
	      this.$emit('selected', this.selected);
	      if (this.value instanceof Array && val.length > this.limit) {
	        this.showNotify = true;
	        if (timeout.limit) clearTimeout(timeout.limit);
	        timeout.limit = setTimeout(function () {
	          timeout.limit = false;
	          _this3.showNotify = false;
	        }, 1500);
	      }
	      this.checkValue();
	      this.valid = this.validate();
	    },
	    valid: function valid(val, old) {
	      if (val === old) {
	        return;
	      }
	      this._parent && this._parent.validate();
	    }
	  },
	  methods: {
	    blur: function blur() {
	      this.show = false;
	    },
	    clear: function clear() {
	      if (this.disabled || this.readonly) {
	        return;
	      }
	      this.value = this.value instanceof Array ? [] : null;
	      this.toggle();
	    },
	    clearSearch: function clearSearch() {
	      this.searchValue = '';
	      this.$els.search.focus();
	    },
	    checkValue: function checkValue() {
	      if (this.multiple && !(this.value instanceof Array)) {
	        this.value = this.value === null || this.value === undefined ? [] : [this.value];
	      }
	      if (!this.multiple && this.value instanceof Array) {
	        this.value = this.value.length ? this.value.pop() : null;
	      }
	      if (this.limit < 1) {
	        this.limit = 1;
	      }
	      if (this.values.length > this.limit) {
	        this.value = this.value.slice(0, this.limit);
	      }
	    },
	    isSelected: function isSelected(v) {
	      return this.values.indexOf(v) > -1;
	    },
	    select: function select(v, alt) {
	      this.$els.search.blur();
	      if (this.value instanceof Array) {
	        if (~this.value.indexOf(v)) {
	          this.value.$remove(v);
	        } else {
	          this.value.push(v);
	        }
	        if (this.closeOnSelect) {
	          this.toggle();
	        }
	      } else {
	        var tmp = this.value;
	        this.value = !~['', null, undefined].indexOf(v) ? v : alt;
	        if (this.value === tmp) {
	          this.value = null;
	        }
	        this.toggle();
	      }
	    },
	    toggle: function toggle() {
	      this.show = !this.show;
	    },
	    update: function update() {
	      var _this4 = this;
	
	      if (!this.url) return;
	      this.loading = true;
	      (0, _utils.getJSON)(this.url).then(function (data) {
	        var options = [];
	        data.forEach(function (opc) {
	          if (opc[_this4.optionsValue] !== undefined && opc[_this4.optionsLabel] !== undefined) options.push(opc);
	        });
	        _this4.options = options;
	        if (!options.length) {
	          _this4.value = _this4.value instanceof Array ? [] : null;
	        }
	      }).always(function () {
	        _this4.loading = false;
	        _this4.checkValue();
	      });
	    },
	    validate: function validate() {
	      return !this.required ? true : this.value instanceof Array ? this.value.length > 0 : this.value !== null;
	    }
	  },
	  created: function created() {
	    this._select = true;
	    if (this.value === undefined || !this.parent) {
	      this.value = null;
	    }
	    if (!this.multiple && this.value instanceof Array) {
	      this.value = this.value.shift();
	    }
	    this.checkValue();
	    if (this.url) this.update();
	    var parent = this.$parent;
	    while (parent && !parent._formGroup) {
	      parent = parent.$parent;
	    }
	    if (parent && parent._formGroup) {
	      parent.children.push(this);
	      this._parent = parent;
	    }
	  },
	  ready: function ready() {
	    var _this5 = this;
	
	    (0, _NodeList2.default)(this.$els.select).onBlur(function (e) {
	      _this5.show = false;
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._parent) this._parent.children.$remove(this);
	    (0, _NodeList2.default)(this.$els.select).offBlur();
	  }
	};
	// </script>
	
	// <style scoped>
	// div.form-control.dropdown-toggle{
	//   height: auto;
	//   padding-right: 24px;
	//   cursor: pointer;
	// }
	// div.form-control.dropdown-toggle:after{
	//   content: ' ';
	//   position: absolute;
	//   right: 13px;
	//   top: 50%;
	//   margin: -1px 0 0;
	//   border-top: 4px dashed;
	//   border-top: 4px solid \9;
	//   border-right: 4px solid transparent;
	//   border-left: 4px solid transparent;
	// }
	// .bs-searchbox {
	//   position: relative;
	//   margin: 4px 8px;
	// }
	// .bs-searchbox .close {
	//   position: absolute;
	//   top: 0;
	//   right: 0;
	//   z-index: 2;
	//   display: block;
	//   width: 34px;
	//   height: 34px;
	//   line-height: 34px;
	//   text-align: center;
	// }
	// .bs-searchbox input:focus,
	// .secret:focus + button {
	//   outline: 0;
	//   border-color: #66afe9 !important;
	//   box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
	// }
	// .secret {
	//   border: 0;
	//   clip: rect(0 0 0 0);
	//   height: 1px;
	//   margin: -1px;
	//   overflow: hidden;
	//   padding: 0;
	//   position: absolute;
	//   width: 1px;
	// }
	// div>.close { margin-left: 5px; }
	// .notify.out { position: relative; }
	// .notify.in,
	// .notify>div {
	//   position: absolute;
	//   width: 96%;
	//   margin: 0 2%;
	//   min-height: 26px;
	//   padding: 3px 5px;
	//   background: #f5f5f5;
	//   border: 1px solid #e3e3e3;
	//   box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
	//   pointer-events: none;
	// }
	// .notify>div {
	//   top: 5px;
	//   z-index: 1;
	// }
	// .notify.in {
	//   opacity: .9;
	//   bottom: 5px;
	// }
	// .btn-group-justified .dropdown-toggle>span:not(.close) {
	//   width: calc(100% - 18px);
	//   display: inline-block;
	//   overflow: hidden;
	//   white-space: nowrap;
	//   text-overflow: ellipsis;
	//   margin-bottom: -4px;
	// }
	// .btn-group-justified .dropdown-menu {
	//   width: 100%;
	// }
	// .open>.dropdown-menu {
	//   overflow-y: auto;
	//   max-height: 2.5rem;
	// }
	// .form-control.dropdown-toggle{
	//   border-radius: 5px;
	// }
	// .form-control.dropdown-toggle>.close{
	//   float: none;
	//   font-size: 20px;
	//   line-height: 20px;
	// }
	// </style>

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(46);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(179);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(180), __esModule: true };

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(181);
	__webpack_require__(189);
	__webpack_require__(190);
	__webpack_require__(191);
	module.exports = __webpack_require__(33).Symbol;


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(32);
	var has = __webpack_require__(55);
	var DESCRIPTORS = __webpack_require__(41);
	var $export = __webpack_require__(31);
	var redefine = __webpack_require__(54);
	var META = __webpack_require__(182).KEY;
	var $fails = __webpack_require__(42);
	var shared = __webpack_require__(69);
	var setToStringTag = __webpack_require__(73);
	var uid = __webpack_require__(70);
	var wks = __webpack_require__(74);
	var wksExt = __webpack_require__(81);
	var wksDefine = __webpack_require__(183);
	var enumKeys = __webpack_require__(184);
	var isArray = __webpack_require__(187);
	var anObject = __webpack_require__(38);
	var toIObject = __webpack_require__(62);
	var toPrimitive = __webpack_require__(44);
	var createDesc = __webpack_require__(45);
	var _create = __webpack_require__(58);
	var gOPNExt = __webpack_require__(86);
	var $GOPD = __webpack_require__(188);
	var $DP = __webpack_require__(37);
	var $keys = __webpack_require__(60);
	var gOPD = $GOPD.f;
	var dP = $DP.f;
	var gOPN = gOPNExt.f;
	var $Symbol = global.Symbol;
	var $JSON = global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function () { return dP(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(87).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(186).f = $propertyIsEnumerable;
	  __webpack_require__(185).f = $getOwnPropertySymbols;
	
	  if (DESCRIPTORS && !__webpack_require__(53)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });
	
	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);
	
	for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    replacer = args[1];
	    if (typeof replacer == 'function') $replacer = replacer;
	    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
	      if ($replacer) value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(36)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

	var META = __webpack_require__(70)('meta');
	var isObject = __webpack_require__(39);
	var has = __webpack_require__(55);
	var setDesc = __webpack_require__(37).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(42)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(32);
	var core = __webpack_require__(33);
	var LIBRARY = __webpack_require__(53);
	var wksExt = __webpack_require__(81);
	var defineProperty = __webpack_require__(37).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(60);
	var gOPS = __webpack_require__(185);
	var pIE = __webpack_require__(186);
	module.exports = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};


/***/ }),
/* 185 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 186 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(64);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

	var pIE = __webpack_require__(186);
	var createDesc = __webpack_require__(45);
	var toIObject = __webpack_require__(62);
	var toPrimitive = __webpack_require__(44);
	var has = __webpack_require__(55);
	var IE8_DOM_DEFINE = __webpack_require__(40);
	var gOPD = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(41) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};


/***/ }),
/* 189 */
/***/ (function(module, exports) {



/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(183)('asyncIterator');


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(183)('observable');


/***/ }),
/* 192 */
/***/ (function(module, exports) {

	module.exports = "<div v-el:select=\"\" :class=\"classes\" _v-68cb8591=\"\">\n    <div class=\"form-control dropdown-toggle\" :disabled=\"disabled || !hasParent\" :readonly=\"readonly\" @click=\"toggle()\" @keyup.esc=\"show = false\" _v-68cb8591=\"\">\n      <span class=\"btn-content\" v-html=\"loading ? text.loading : showPlaceholder || selected\" _v-68cb8591=\"\"></span>\n      <span v-if=\"clearButton&amp;&amp;values.length\" class=\"close\" @click=\"clear()\" _v-68cb8591=\"\">×</span>\n    </div>\n    <select v-el:sel=\"\" v-model=\"value\" v-show=\"show\" name=\"{{name}}\" class=\"secret\" :multiple=\"multiple\" :required=\"required\" :readonly=\"readonly\" :disabled=\"disabled\" _v-68cb8591=\"\">\n      <option v-if=\"required\" value=\"\" _v-68cb8591=\"\"></option>\n      <option v-for=\"option in options\" :value=\"option[optionsValue]||option\" _v-68cb8591=\"\">{{ option[optionsLabel]||option }}</option>\n    </select>\n    <ul class=\"dropdown-menu\" _v-68cb8591=\"\">\n      <template v-if=\"options.length\" _v-68cb8591=\"\">\n        <li v-if=\"canSearch\" class=\"bs-searchbox\" _v-68cb8591=\"\">\n          <input type=\"text\" placeholder=\"{{searchText||text.search}}\" class=\"form-control\" autocomplete=\"off\" v-el:search=\"\" v-model=\"searchValue\" @keyup.esc=\"show = false\" _v-68cb8591=\"\">\n          <span v-show=\"searchValue\" class=\"close\" @click=\"clearSearch\" _v-68cb8591=\"\">×</span>\n        </li>\n        <li v-if=\"required&amp;&amp;!clearButton\" _v-68cb8591=\"\"><a @mousedown.prevent=\"clear() &amp;&amp; blur()\" _v-68cb8591=\"\">{{ placeholder || text.notSelected }}</a></li>\n        <li v-for=\"option in options | filterBy searchValue\" :id=\"option[optionsValue]||option\" _v-68cb8591=\"\">\n          <a @mousedown.prevent=\"select(option[optionsValue],option)\" _v-68cb8591=\"\">\n            <span v-html=\"option[optionsLabel]||option\" _v-68cb8591=\"\"></span>\n            <span class=\"glyphicon glyphicon-ok check-mark\" v-show=\"isSelected(option[optionsValue])\" _v-68cb8591=\"\"></span>\n          </a>\n        </li>\n      </template>\n      <slot _v-68cb8591=\"\"></slot>\n      <div v-if=\"showNotify &amp;&amp; !closeOnSelect\" class=\"notify in\" transition=\"fadein\" _v-68cb8591=\"\">{{limitText}}</div>\n    </ul>\n    <div v-if=\"showNotify &amp;&amp; closeOnSelect\" class=\"notify out\" transition=\"fadein\" _v-68cb8591=\"\"><div _v-68cb8591=\"\">{{limitText}}</div></div>\n  </div>";

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(194)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(195)
	if (false) {}

/***/ }),
/* 194 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div class="item">
	//     <slot></slot>
	//   </div>
	// </template>
	
	// <script>
	exports.default = {
	  data: function data() {
	    return {
	      index: 0,
	      show: false
	    };
	  },
	
	  computed: {
	    show: function show() {
	      return this.$parent.index === this.index;
	    }
	  },
	  ready: function ready() {
	    for (var c in this.$parent.$children) {
	      if (this.$parent.$children[c] === this) {
	        this.index = parseInt(c, 10);
	        break;
	      }
	    }
	    //this.index = [...this.$el.parentNode.children].indexOf(this.$el)
	    this.$parent.indicator.push(this.index);
	    if (this.index === 0) {
	      this.$el.classList.add('active');
	    }
	  }
	};
	// </script>

/***/ }),
/* 195 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"item\">\n    <slot></slot>\n  </div>";

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(197)
	module.exports = __webpack_require__(199)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(200)
	if (false) {}

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(198);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, "@-webkit-keyframes spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.spinner-gritcode {\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 9998;\n  position: absolute;\n  width: 100%;\n  text-align: center;\n  background: rgba(255, 255, 255, 0.9);\n}\n.spinner-gritcode.spinner-fixed {\n  position: fixed;\n}\n.spinner-gritcode .spinner-wrapper {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n}\n.spinner-gritcode .spinner-circle {\n  position: relative;\n  border: 4px solid #ccc;\n  border-right-color: #337ab7;\n  border-radius: 50%;\n  display: inline-block;\n  -webkit-animation: spin 0.6s linear;\n          animation: spin 0.6s linear;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  width: 3em;\n  height: 3em;\n  z-index: 2;\n}\n.spinner-gritcode .spinner-text {\n  position: relative;\n  text-align: center;\n  margin-top: 0.5em;\n  z-index: 2;\n  width: 100%;\n  font-size: 95%;\n  color: #337ab7;\n}\n.spinner-gritcode.spinner-sm .spinner-circle {\n  width: 1.5em;\n  height: 1.5em;\n}\n.spinner-gritcode.spinner-md .spinner-circle {\n  width: 2em;\n  height: 2em;\n}\n.spinner-gritcode.spinner-lg .spinner-circle {\n  width: 2.5em;\n  height: 2.5em;\n}\n.spinner-gritcode.spinner-xl .spinner-circle {\n  width: 3.5em;\n  height: 3.5em;\n}\n.lt-ie10 .spinner-gritcode .spinner-circle,\n.ie9 .spinner-gritcode .spinner-circle,\n.oldie .spinner-gritcode .spinner-circle,\n.no-csstransitions .spinner-gritcode .spinner-circle,\n.no-csstransforms3d .spinner-gritcode .spinner-circle {\n  background: url(\"http://i2.wp.com/www.thegreatnovelingadventure.com/wp-content/plugins/wp-polls/images/loading.gif\") center center no-repeat;\n  -webkit-animation: none;\n          animation: none;\n  margin-left: 0;\n  margin-top: 5px;\n  border: none;\n  width: 32px;\n  height: 32px;\n}", ""]);
	
	// exports


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	var MIN_WAIT = 500; // in ms
	
	// <template>
	//   <div :class="['spinner spinner-gritcode',spinnerSize,{'spinner-fixed':fixed}]" v-show="active">
	//     <div class="spinner-wrapper">
	//       <div class="spinner-circle"></div>
	//       <div class="spinner-text">{{text}}</div>
	//     </div>
	//   </div>
	// </template>
	
	// <script>
	exports.default = {
	  props: {
	    size: {
	      type: String,
	      default: 'md'
	    },
	    text: {
	      type: String,
	      default: ''
	    },
	    fixed: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    }
	  },
	  data: function data() {
	    return {
	      active: false
	    };
	  },
	
	  computed: {
	    spinnerSize: function spinnerSize() {
	      return this.size ? 'spinner-' + this.size : 'spinner-sm';
	    }
	  },
	  ready: function ready() {
	    this._body = document.querySelector('body');
	    this._bodyOverflow = this._body.style.overflowY || '';
	  },
	
	  methods: {
	    getMinWait: function getMinWait(delay) {
	      delay = delay || 0;
	      return new Date().getTime() - this._started.getTime() < MIN_WAIT ? MIN_WAIT - parseInt(new Date().getTime() - this._started.getTime(), 10) + delay : 0 + delay;
	    },
	    show: function show(options) {
	      if (options && options.text) {
	        this.text = options.text;
	      }
	      if (options && options.size) {
	        this.size = options.size;
	      }
	      if (options && options.fixed) {
	        this.fixed = options.fixed;
	      }
	
	      // block scrolling when spinner is on
	      this._body.style.overflowY = 'hidden';
	
	      // activate spinner
	      this._started = new Date();
	      this.active = true;
	      this.$root.$broadcast('shown::spinner');
	    },
	    hide: function hide() {
	      var _this = this;
	
	      var delay = 0;
	      this._spinnerAnimation = setTimeout(function () {
	        _this.active = false;
	        _this._body.style.overflowY = _this._bodyOverflow;
	        _this.$root.$broadcast('hidden::spinner');
	      }, this.getMinWait(delay));
	    }
	  },
	  events: {
	    'show::spinner': function showSpinner(options) {
	      this.show(options);
	    },
	    'hide::spinner': function hideSpinner() {
	      this.hide();
	    },
	    'start::ajax': function startAjax(options) {
	      this.show(options);
	    },
	    'end::ajax': function endAjax() {
	      this.hide();
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    clearTimeout(this._spinnerAnimation);
	    this._body.style.overflowY = this._bodyOverflow;
	  }
	};
	// </script>
	
	// <style>
	// @keyframes spin {
	//   100% {
	//     transform: rotate(360deg);
	//   }
	// }
	// .spinner-gritcode {
	//   top: 0;
	//   left: 0;
	//   bottom: 0;
	//   right: 0;
	//   z-index: 9998;
	//   position: absolute;
	//   width: 100%;
	//   text-align: center;
	//   background: rgba(255, 255, 255, 0.9);
	// }
	// .spinner-gritcode.spinner-fixed {
	//   position: fixed;
	// }
	// .spinner-gritcode .spinner-wrapper {
	//   position: absolute;
	//   top: 50%;
	//   left: 50%;
	//   transform: translate(-50%, -50%);
	//   -ms-transform: translate(-50%, -50%);
	// }
	// .spinner-gritcode .spinner-circle {
	//   position: relative;
	//   border: 4px solid #ccc;
	//   border-right-color: #337ab7;
	//   border-radius: 50%;
	//   display: inline-block;
	//   animation: spin 0.6s linear;
	//   animation-iteration-count: infinite;
	//   width: 3em;
	//   height: 3em;
	//   z-index: 2;
	// }
	// .spinner-gritcode .spinner-text {
	//   position: relative;
	//   text-align: center;
	//   margin-top: 0.5em;
	//   z-index: 2;
	//   width: 100%;
	//   font-size: 95%;
	//   color: #337ab7;
	// }
	// .spinner-gritcode.spinner-sm .spinner-circle {
	//   width: 1.5em;
	//   height: 1.5em;
	// }
	// .spinner-gritcode.spinner-md .spinner-circle {
	//   width: 2em;
	//   height: 2em;
	// }
	// .spinner-gritcode.spinner-lg .spinner-circle {
	//   width: 2.5em;
	//   height: 2.5em;
	// }
	// .spinner-gritcode.spinner-xl .spinner-circle {
	//   width: 3.5em;
	//   height: 3.5em;
	// }
	// .lt-ie10 .spinner-gritcode .spinner-circle,
	// .ie9 .spinner-gritcode .spinner-circle,
	// .oldie .spinner-gritcode .spinner-circle,
	// .no-csstransitions .spinner-gritcode .spinner-circle,
	// .no-csstransforms3d .spinner-gritcode .spinner-circle {
	//   background: url("http://i2.wp.com/www.thegreatnovelingadventure.com/wp-content/plugins/wp-polls/images/loading.gif") center center no-repeat;
	//   animation: none;
	//   margin-left: 0;
	//   margin-top: 5px;
	//   border: none;
	//   width: 32px;
	//   height: 32px;
	// }
	// </style>

/***/ }),
/* 200 */
/***/ (function(module, exports) {

	module.exports = "<div :class=\"['spinner spinner-gritcode',spinnerSize,{'spinner-fixed':fixed}]\" v-show=\"active\">\n    <div class=\"spinner-wrapper\">\n      <div class=\"spinner-circle\"></div>\n      <div class=\"spinner-text\">{{text}}</div>\n    </div>\n  </div>";

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(202)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(203)
	if (false) {}

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	exports.default = {
	  props: {
	    header: {
	      type: String
	    },
	    disabled: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    }
	  },
	  computed: {
	    active: function active() {
	      return this._tabset.show === this;
	    },
	    index: function index() {
	      return this._tabset.tabs.indexOf(this);
	    },
	    show: function show() {
	      return this._tabset && this._tabset.show === this;
	    },
	    transition: function transition() {
	      return this._tabset ? this._tabset.effect : null;
	    }
	  },
	  created: function created() {
	    this._ingroup = this.$parent && this.$parent._tabgroup;
	    var tabset = this;
	    while (tabset && tabset._tabset !== true && tabset.$parent) {
	      tabset = tabset.$parent;
	    }
	    if (!tabset._tabset) {
	      this._tabset = {};
	      console.warn('Warning: "tab" depend on "tabset" to work properly.');
	    } else {
	      tabset.tabs.push(this);
	      if (!this._ingroup) {
	        tabset.headers.push(this);
	      } else {
	        if (!~tabset.headers.indexOf(this.$parent)) {
	          tabset.headers.push(this.$parent);
	        }
	      }
	      this._tabset = tabset;
	    }
	    if (this._ingroup) {
	      this.$parent.tabs.push(this);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._tabset.active === this.index) {
	      this._tabset.active = 0;
	    }
	    if (this._ingroup) {
	      this.$parent.tabs.$remove(this);
	    }
	    this._tabset.tabs.$remove(this);
	  }
	};
	// </script>
	// <template>
	//   <div role="tabpanel" class="tab-pane active" v-show="show"
	//     :class="{hide:!show}"
	//     :transition="transition"
	//   >
	//     <slot></slot>
	//   </div>
	// </template>
	
	// <script>

/***/ }),
/* 203 */
/***/ (function(module, exports) {

	module.exports = "<div role=\"tabpanel\" class=\"tab-pane active\" v-show=\"show\"\n    :class=\"{hide:!show}\"\n    :transition=\"transition\"\n  >\n    <slot></slot>\n  </div>";

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(205)
	module.exports = __webpack_require__(207)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(208)
	if (false) {}

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(206);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".nav-tabs[_v-98bc4b82] {\n  margin-bottom: 15px;\n}", ""]);
	
	// exports


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	exports.default = {
	  props: {
	    disabled: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    header: {
	      type: String
	    }
	  },
	  data: function data() {
	    return {
	      tabs: [],
	      show: false
	    };
	  },
	
	  computed: {
	    active: function active() {
	      return ~this.tabs.indexOf(this._tabset.show);
	    }
	  },
	  created: function created() {
	    this._tabgroup = true;
	    var tabset = this.$parent && this.$parent._tabset === true ? this.$parent : {};
	    if (this.$parent && this.$parent._tabgroup) {
	      console.error('Can\'t nest tabgroups.');
	    }
	    while (tabset && !tabset._tabset && tabset.$parent) {
	      tabset = tabset.$parent;
	    }
	    if (!tabset._tabset) {
	      this._tabset = {};
	      this.show = true;
	      console.warn('Warning: tabgroup depend on tabset to work properly.');
	    } else {
	      this._tabset = tabset;
	    }
	  },
	
	  methods: {
	    blur: function blur() {
	      this.show = false;
	    },
	    toggle: function toggle() {
	      this.show = !this.show;
	    }
	  }
	  // </script>
	
	  // <style scoped>
	  // .nav-tabs {
	  //   margin-bottom: 15px;
	  // }
	  // </style>
	
	}; // <template><slot></slot></template>
	
	// <script>

/***/ }),
/* 208 */
/***/ (function(module, exports) {

	module.exports = "<slot _v-98bc4b82=\"\"></slot>";

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(210)
	module.exports = __webpack_require__(212)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(213)
	if (false) {}

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(211);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".nav-tabs[_v-358f2e7c] {\n  margin-bottom: 15px;\n}", ""]);
	
	// exports


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	var _Dropdown = __webpack_require__(127);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div>
	//     <!-- Nav tabs -->
	//     <ul class="nav nav-{{navStyle}}" role="tablist">
	//       <template v-for="t in headers">
	//         <li v-if="!t._tabgroup" :class="{active:t.active, disabled:t.disabled}" @click.prevent="select(t)">
	//           <a href="#"><slot name="header" v-html="t.header"></slot></a>
	//         </li>
	//         <dropdown v-else :text="t.header" :class="{active:t.active}" :disabled="t.disabled">
	//           <li v-for="tab in t.tabs" :class="{disabled:tab.disabled}"><a href="#" @click.prevent="select(tab)">{{tab.header}}</a></li>
	//         </dropdown>
	//       </template>
	//     </ul>
	//     <div class="tab-content" v-el:tab-content>
	//       <slot></slot>
	//     </div>
	//   </div>
	// </template>
	
	// <script>
	exports.default = {
	  components: {
	    dropdown: _Dropdown2.default
	  },
	  props: {
	    navStyle: {
	      type: String,
	      default: 'tabs'
	    },
	    effect: {
	      type: String,
	      default: 'fadein'
	    },
	    active: {
	      twoWay: true,
	      type: Number,
	      coerce: _utils.coerce.number,
	      default: 0
	    }
	  },
	  data: function data() {
	    return {
	      show: null,
	      headers: [],
	      tabs: []
	    };
	  },
	  created: function created() {
	    this._tabset = true;
	  },
	
	  watch: {
	    active: function active(val) {
	      this.show = this.tabs[val];
	    }
	  },
	  ready: function ready() {
	    this.show = this.tabs[this.active];
	  },
	
	  methods: {
	    select: function select(tab) {
	      if (!tab.disabled) {
	        this.active = tab.index;
	      }
	    }
	  }
	  // </script>
	
	  // <style scoped>
	  // .nav-tabs {
	  //   margin-bottom: 15px;
	  // }
	  // </style>
	
	};

/***/ }),
/* 213 */
/***/ (function(module, exports) {

	module.exports = "<div _v-358f2e7c=\"\">\n    <!-- Nav tabs -->\n    <ul class=\"nav nav-{{navStyle}}\" role=\"tablist\" _v-358f2e7c=\"\">\n      <template v-for=\"t in headers\" _v-358f2e7c=\"\">\n        <li v-if=\"!t._tabgroup\" :class=\"{active:t.active, disabled:t.disabled}\" @click.prevent=\"select(t)\" _v-358f2e7c=\"\">\n          <a href=\"#\" _v-358f2e7c=\"\"><slot name=\"header\" v-html=\"t.header\" _v-358f2e7c=\"\"></slot></a>\n        </li>\n        <dropdown v-else=\"\" :text=\"t.header\" :class=\"{active:t.active}\" :disabled=\"t.disabled\" _v-358f2e7c=\"\">\n          <li v-for=\"tab in t.tabs\" :class=\"{disabled:tab.disabled}\" _v-358f2e7c=\"\"><a href=\"#\" @click.prevent=\"select(tab)\" _v-358f2e7c=\"\">{{tab.header}}</a></li>\n        </dropdown>\n      </template>\n    </ul>\n    <div class=\"tab-content\" v-el:tab-content=\"\" _v-358f2e7c=\"\">\n      <slot _v-358f2e7c=\"\"></slot>\n    </div>\n  </div>";

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(215)
	module.exports = __webpack_require__(217)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(218)
	if (false) {}

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(216);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".tooltip.top,\n.tooltip.left,\n.tooltip.right,\n.tooltip.bottom {\n  opacity: .9\n}\n.fadein-enter {\n  -webkit-animation:fadein-in 0.3s ease-in;\n          animation:fadein-in 0.3s ease-in;\n}\n.fadein-leave {\n  -webkit-animation:fadein-out 0.3s ease-out;\n          animation:fadein-out 0.3s ease-out;\n}\n@-webkit-keyframes fadein-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: .9;\n  }\n}\n@keyframes fadein-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: .9;\n  }\n}\n@-webkit-keyframes fadein-out {\n  0% {\n    opacity: .9;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes fadein-out {\n  0% {\n    opacity: .9;\n  }\n  100% {\n    opacity: 0;\n  }\n}", ""]);
	
	// exports


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _popoverMixins = __webpack_require__(164);
	
	var _popoverMixins2 = _interopRequireDefault(_popoverMixins);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  mixins: [_popoverMixins2.default],
	  props: {
	    trigger: {
	      type: String,
	      default: 'hover'
	    },
	    effect: {
	      type: String,
	      default: 'scale'
	    }
	  }
	  // </script>
	
	  // <style>
	  // .tooltip.top,
	  // .tooltip.left,
	  // .tooltip.right,
	  // .tooltip.bottom {
	  //   opacity: .9
	  // }
	  // .fadein-enter {
	  //   animation:fadein-in 0.3s ease-in;
	  // }
	  // .fadein-leave {
	  //   animation:fadein-out 0.3s ease-out;
	  // }
	  // @keyframes fadein-in {
	  //   0% {
	  //     opacity: 0;
	  //   }
	  //   100% {
	  //     opacity: .9;
	  //   }
	  // }
	  // @keyframes fadein-out {
	  //   0% {
	  //     opacity: .9;
	  //   }
	  //   100% {
	  //     opacity: 0;
	  //   }
	  // }
	  // </style>
	
	}; // <template>
	//   <span v-el:trigger>
	//     <slot></slot>
	//     <div v-el:popover v-if="show" style="display:block;"
	//       :class="['tooltip',placement]"
	//       :transition="effect"
	//     >
	//       <div class="tooltip-arrow"></div>
	//       <div class="tooltip-inner">
	//         <slot name="content">
	//           {{{content}}}
	//         </slot>
	//     </div>
	//     </div>
	//   </span>
	// </template>
	
	// <script>

/***/ }),
/* 218 */
/***/ (function(module, exports) {

	module.exports = "<span v-el:trigger>\n    <slot></slot>\n    <div v-el:popover v-if=\"show\" style=\"display:block;\"\n      :class=\"['tooltip',placement]\"\n      :transition=\"effect\"\n    >\n      <div class=\"tooltip-arrow\"></div>\n      <div class=\"tooltip-inner\">\n        <slot name=\"content\">\n          {{{content}}}\n        </slot>\n    </div>\n    </div>\n  </span>";

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(220)
	module.exports = __webpack_require__(222)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(223)
	if (false) {}

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(221);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(101)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {}

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(100)();
	// imports
	
	
	// module
	exports.push([module.id, ".dropdown-menu > li > a {\n  cursor: pointer;\n}", ""]);
	
	// exports


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(92);
	
	var Vue = window.Vue; // <template>
	//   <div style="position: relative"
	//        v-bind:class="{'open':showDropdown}"
	//   >
	//     <input type="text" class="form-control"
	//       :placeholder="placeholder"
	//       autocomplete="off"
	//       v-model="value"
	//       @input="update"
	//       @keydown.up="up"
	//       @keydown.down="down"
	//       @keydown.enter= "hit"
	//       @keydown.esc="reset"
	//       @blur="showDropdown = false"
	//     />
	//     <ul class="dropdown-menu" v-el:dropdown>
	//       <li v-for="item in items" v-bind:class="{'active': isActive($index)}">
	//         <a @mousedown.prevent="hit" @mousemove="setActive($index)">
	//           <partial :name="templateName"></partial>
	//         </a>
	//       </li>
	//     </ul>
	//   </div>
	// </template>
	
	// <script>
	
	var _DELAY_ = 200;
	
	exports.default = {
	  created: function created() {
	    this.items = this.primitiveData;
	  },
	
	  partials: {
	    default: '<span v-html="item | highlight value"></span>'
	  },
	  props: {
	    value: {
	      twoWay: true,
	      type: String,
	      default: ''
	    },
	    data: {
	      type: Array
	    },
	    limit: {
	      type: Number,
	      default: 8
	    },
	    async: {
	      type: String
	    },
	    template: {
	      type: String
	    },
	    templateName: {
	      type: String,
	      default: 'default'
	    },
	    key: {
	      type: String,
	      default: null
	    },
	    matchCase: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    matchStart: {
	      type: Boolean,
	      coerce: _utils.coerce.boolean,
	      default: false
	    },
	    onHit: {
	      type: Function,
	      default: function _default(items) {
	        this.reset();
	        this.value = items;
	      }
	    },
	    placeholder: {
	      type: String
	    },
	    delay: {
	      type: Number,
	      default: _DELAY_,
	      coerce: _utils.coerce.number
	    }
	  },
	  data: function data() {
	    return {
	      showDropdown: false,
	      noResults: true,
	      current: 0,
	      items: []
	    };
	  },
	
	  computed: {
	    primitiveData: function primitiveData() {
	      var _this = this;
	
	      if (this.data) {
	        return this.data.filter(function (value) {
	          value = _this.matchCase ? value : value.toLowerCase();
	          var query = _this.matchCase ? _this.value : _this.value.toLowerCase();
	          return _this.matchStart ? value.indexOf(query) === 0 : value.indexOf(query) !== -1;
	        }).slice(0, this.limit);
	      }
	    }
	  },
	  ready: function ready() {
	    // register a partial:
	    if (this.templateName && this.templateName !== 'default') {
	      Vue.partial(this.templateName, this.template);
	    }
	  },
	
	  methods: {
	    update: function update() {
	      if (!this.value) {
	        this.reset();
	        return false;
	      }
	      if (this.data) {
	        this.items = this.primitiveData;
	        this.showDropdown = this.items.length > 0;
	      }
	      if (this.async) this.query();
	    },
	
	    query: (0, _utils.delayer)(function () {
	      var _this2 = this;
	
	      (0, _utils.getJSON)(this.async + this.value).then(function (data) {
	        _this2.items = (_this2.key ? data[_this2.key] : data).slice(0, _this2.limit);
	        _this2.showDropdown = _this2.items.length;
	      });
	    }, 'delay', _DELAY_),
	    reset: function reset() {
	      this.items = [];
	      this.value = '';
	      this.loading = false;
	      this.showDropdown = false;
	    },
	    setActive: function setActive(index) {
	      this.current = index;
	    },
	    isActive: function isActive(index) {
	      return this.current === index;
	    },
	    hit: function hit(e) {
	      e.preventDefault();
	      this.onHit(this.items[this.current], this);
	    },
	    up: function up() {
	      if (this.current > 0) this.current--;
	    },
	    down: function down() {
	      if (this.current < this.items.length - 1) this.current++;
	    }
	  },
	  filters: {
	    highlight: function highlight(value, phrase) {
	      return value.replace(new RegExp('(' + phrase + ')', 'gi'), '<strong>$1</strong>');
	    }
	  }
	  // </script>
	
	  // <style>
	  // .dropdown-menu > li > a {
	  //   cursor: pointer;
	  // }
	  // </style>
	
	};

/***/ }),
/* 223 */
/***/ (function(module, exports) {

	module.exports = "<div style=\"position: relative\"\n       v-bind:class=\"{'open':showDropdown}\"\n  >\n    <input type=\"text\" class=\"form-control\"\n      :placeholder=\"placeholder\"\n      autocomplete=\"off\"\n      v-model=\"value\"\n      @input=\"update\"\n      @keydown.up=\"up\"\n      @keydown.down=\"down\"\n      @keydown.enter= \"hit\"\n      @keydown.esc=\"reset\"\n      @blur=\"showDropdown = false\"\n    />\n    <ul class=\"dropdown-menu\" v-el:dropdown>\n      <li v-for=\"item in items\" v-bind:class=\"{'active': isActive($index)}\">\n        <a @mousedown.prevent=\"hit\" @mousemove=\"setActive($index)\">\n          <partial :name=\"templateName\"></partial>\n        </a>\n      </li>\n    </ul>\n  </div>";

/***/ })
/******/ ])
});
;
//# sourceMappingURL=vue-strap.js.map

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
//# sourceMappingURL=flow-builder.common.1.js.map