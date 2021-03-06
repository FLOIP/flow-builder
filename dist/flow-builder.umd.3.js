((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[3],{

/***/ "192b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4ad08327-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue?vue&type=template&id=dadc9192&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"starting-block-button"},[(_vm.isEditable)?[_c('h4',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.options')))]),_c('div',{staticClass:"form-group"},[_c('button',{staticClass:"btn btn-secondary btn-sm",attrs:{"type":"button","disabled":_vm.isStartBlock},on:{"click":function($event){return _vm.setStartBlock($event)}}},[(_vm.isStartBlock)?[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.currently-set-as-starting-block'))+" ")]:[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.set-as-starting-block'))+" ")]],2)])]:_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue?vue&type=template&id=dadc9192&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("276c");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("e954");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__("2c4c");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__("920b");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createSuper.js + 1 modules
var createSuper = __webpack_require__("92a6");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("fc11");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/index.js + 14 modules
var lib = __webpack_require__("1b40");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var vuex_class_lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue?vue&type=script&lang=ts&












var flowVuexNamespace = Object(vuex_class_lib["e" /* namespace */])('flow');

var FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(FirstBlockEditorButton, _mixins);

  var _super = Object(createSuper["a" /* default */])(FirstBlockEditorButton);

  function FirstBlockEditorButton() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, FirstBlockEditorButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "isEditable", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "blockId", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "flow", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "flow_setFirstBlockId", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(FirstBlockEditorButton, [{
    key: "isStartBlock",
    get: function get() {
      return this.blockId === this.flow.first_block_id;
    } // @ts-ignore

  }, {
    key: "setStartBlock",
    value: function setStartBlock(event) {
      var flowId = this.flow.uuid,
          blockId = this.blockId;
      this.flow_setFirstBlockId({
        flowId: flowId,
        blockId: blockId
      });
    }
  }]);

  return FirstBlockEditorButton;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(lib["b" /* Prop */])({
  default: true
})], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton.prototype, "isEditable", void 0);

Object(tslib_es6["__decorate"])([Object(lib["b" /* Prop */])()], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton.prototype, "blockId", void 0);

Object(tslib_es6["__decorate"])([Object(lib["b" /* Prop */])()], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Mutation], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton.prototype, "flow_setFirstBlockId", void 0);

FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton = Object(tslib_es6["__decorate"])([Object(lib["a" /* Component */])({})], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton);
/* harmony default export */ var FirstBlockEditorButtonvue_type_script_lang_ts_ = (FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton);
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue?vue&type=script&lang=ts&
 /* harmony default export */ var flow_editors_FirstBlockEditorButtonvue_type_script_lang_ts_ = (FirstBlockEditorButtonvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  flow_editors_FirstBlockEditorButtonvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var flow_editors_FirstBlockEditorButton = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "1b4e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4ad08327-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue?vue&type=template&id=0f0277ae&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/semantic_label")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-semantic-label"},[_c('text-editor',{attrs:{"label":_vm._f("trans")('flow-builder.block-semantic-label'),"placeholder":_vm._f("trans")('flow-builder.enter-block-semantic-label'),"valid-state":isValid},model:{value:(_vm.semanticLabel),callback:function ($$v) {_vm.semanticLabel=$$v},expression:"semanticLabel"}})],1)]}}])})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue?vue&type=template&id=0f0277ae&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("f3f3");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/components/common/ValidationMessage.vue + 5 modules
var ValidationMessage = __webpack_require__("21e9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue?vue&type=script&lang=js&


/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */




/* harmony default export */ var SemanticLabelEditorvue_type_script_lang_js_ = ({
  components: {
    TextEditor: TextEditor["a" /* default */],
    ValidationMessage: ValidationMessage["a" /* default */]
  },
  mixins: [lang["b" /* lang */]],
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  computed: {
    semanticLabel: {
      get: function get() {
        return this.block.semantic_label || '';
      },
      set: function set(value) {
        this.block_setSemanticLabel({
          blockId: this.block.uuid,
          value: value
        });
      }
    }
  },
  methods: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapMutations */])('flow', ['block_setSemanticLabel']))
});
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var block_editors_SemanticLabelEditorvue_type_script_lang_js_ = (SemanticLabelEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_SemanticLabelEditorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SemanticLabelEditor = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "3411":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4ad08327-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/LabelEditor.vue?vue&type=template&id=017ef671&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/label")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-label"},[_c('text-editor',{attrs:{"label":_vm._f("trans")('flow-builder.block-label'),"placeholder":_vm._f("trans")('flow-builder.enter-block-label'),"valid-state":isValid},model:{value:(_vm.label),callback:function ($$v) {_vm.label=$$v},expression:"label"}})],1)]}}])})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue?vue&type=template&id=017ef671&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("276c");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("e954");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__("2c4c");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__("920b");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createSuper.js + 1 modules
var createSuper = __webpack_require__("92a6");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("fc11");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/index.js + 14 modules
var lib = __webpack_require__("1b40");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var vuex_class_lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// EXTERNAL MODULE: ./src/components/common/ValidationMessage.vue + 5 modules
var ValidationMessage = __webpack_require__("21e9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/LabelEditor.vue?vue&type=script&lang=ts&














var flowVuexNamespace = Object(vuex_class_lib["e" /* namespace */])('flow');

var LabelEditorvue_type_script_lang_ts_LabelEditor = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(LabelEditor, _mixins);

  var _super = Object(createSuper["a" /* default */])(LabelEditor);

  function LabelEditor() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, LabelEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block_setLabel", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(LabelEditor, [{
    key: "label",
    get: function get() {
      return this.block.label;
    },
    set: function set(value) {
      this.block_setLabel({
        blockId: this.block.uuid,
        value: value
      });
    }
  }]);

  return LabelEditor;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(lib["b" /* Prop */])()], LabelEditorvue_type_script_lang_ts_LabelEditor.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Mutation], LabelEditorvue_type_script_lang_ts_LabelEditor.prototype, "block_setLabel", void 0);

LabelEditorvue_type_script_lang_ts_LabelEditor = Object(tslib_es6["__decorate"])([Object(lib["a" /* Component */])({
  components: {
    TextEditor: TextEditor["a" /* default */],
    ValidationMessage: ValidationMessage["a" /* default */]
  }
})], LabelEditorvue_type_script_lang_ts_LabelEditor);
/* harmony default export */ var LabelEditorvue_type_script_lang_ts_ = (LabelEditorvue_type_script_lang_ts_LabelEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_LabelEditorvue_type_script_lang_ts_ = (LabelEditorvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_LabelEditorvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_editors_LabelEditor = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "6faa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4ad08327-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/ExpressionInput.vue?vue&type=template&id=5b173190&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"expression-input form-group"},[_c('label',[_vm._v(_vm._s(_vm.label))]),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.expression),expression:"expression"}],ref:"input",class:['form-control', {'is-invalid': _vm.isInvalid}],attrs:{"placeholder":_vm.placeholder},domProps:{"value":(_vm.expression)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.expression=$event.target.value},function($event){return _vm.$emit('input', $event.target.value)}]}}),_vm._v(" "),_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/common/ExpressionInput.vue?vue&type=template&id=5b173190&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("54f8");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("d0ff");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("f3f3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.flat-map.js
var es_array_flat_map = __webpack_require__("5db7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.unscopables.flat-map.js
var es_array_unscopables_flat_map = __webpack_require__("73d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__("a630");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__("4fad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.map.js
var es_map = __webpack_require__("4ec9");

// EXTERNAL MODULE: ./node_modules/@avcs/autosuggest/lib/AutoSuggest.js
var AutoSuggest = __webpack_require__("4b17e");
var AutoSuggest_default = /*#__PURE__*/__webpack_require__.n(AutoSuggest);

// EXTERNAL MODULE: ./node_modules/@avcs/autosuggest/dropdown.css
var dropdown = __webpack_require__("c6c1");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./node_modules/@floip/expression-evaluator/dist/Evaluator/NodeEvaluator/MethodNodeEvaluator/Factory.js
var Factory = __webpack_require__("20c7");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/ExpressionInput.vue?vue&type=script&lang=js&
















//
//
//
//
//
//
//
//
//
//
//
//
//





var defaultContactPropertyFields = ['phone'];
var defaultDateFields = ['now', 'yesterday', 'today', 'tomorrow'];
/* harmony default export */ var ExpressionInputvue_type_script_lang_js_ = ({
  mixins: [lang["a" /* default */]],
  props: {
    label: {
      type: [String, Number],
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    currentExpression: {
      type: String,
      required: true
    },
    expressionIdentifier: {
      type: [String, Number],
      default: null
    },
    validState: {
      type: Boolean,
      default: null,
      required: false
    }
  },
  data: function data() {
    return {
      suggest: {}
    };
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["b" /* mapGetters */])(['subscriberPropertyFields'])), Object(vuex_esm["b" /* mapGetters */])('flow', ['activeFlow'])), {}, {
    isInvalid: function isInvalid() {
      return this.validState === false;
    },
    expression: {
      get: function get() {
        return this.currentExpression;
      },
      set: function set(value) {
        if (this.expressionIdentifier !== null) {
          value = {
            identifier: this.expressionIdentifier,
            value: value
          };
        }

        this.$emit('commitExpressionChange', value);
      }
    },
    expressionContext: function expressionContext() {
      var contactFields = this.subscriberPropertyFields.map(function (prop) {
        return prop.name;
      }).concat(defaultContactPropertyFields);
      var blocks = this.activeFlow.blocks.flatMap(function (b) {
        return [b.name, b.uuid];
      });
      return {
        contact: contactFields,
        flow: blocks,
        date: defaultDateFields
      };
    },
    topLevelSuggestions: function topLevelSuggestions() {
      return {
        trigger: '@',
        values: [{
          value: '@()',
          focusText: [-1, -1]
        }].concat(Object(toConsumableArray["a" /* default */])(Array.from(Object.entries(this.expressionContext)).map(function (item) {
          return "@".concat(item[0]);
        })))
      };
    },
    contextSuggestions: function contextSuggestions() {
      return Array.from(Object.entries(this.expressionContext)).map(function (item) {
        var name = item[0];
        return {
          trigger: "".concat(name, "."),
          values: item[1].map(function (val) {
            return "".concat(name, ".").concat(val);
          })
        };
      });
    },
    methodSuggestions: function methodSuggestions() {
      return Array.from(this.evaluatorMethods.entries()).map(function (item) {
        return {
          trigger: item[0],
          values: item[1].map(function (i) {
            return {
              value: "".concat(i, "()"),
              focusText: [-1, -1]
            };
          })
        };
      });
    },
    evaluatorMethods: function evaluatorMethods() {
      var methods = new Map();
      /* eslint-disable no-restricted-syntax */

      var _iterator = Object(createForOfIteratorHelper["a" /* default */])(Factory["MethodNodeEvaluatorFactory"].defaultHandlers()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var handler = _step.value;

          var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(handler.handles()),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var method = _step2.value;
              var trigger = method.substr(0, 2);
              var upperTrigger = trigger.toUpperCase();
              var upperMethod = method.toUpperCase();

              if (methods.has(trigger)) {
                methods.set(trigger, [].concat(Object(toConsumableArray["a" /* default */])(methods.get(trigger)), [method]));
                methods.set(upperTrigger, [].concat(Object(toConsumableArray["a" /* default */])(methods.get(upperTrigger)), [upperMethod]));
              } else {
                methods.set(trigger, [method]);
                methods.set(upperTrigger, [upperMethod]);
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
        /* eslint-enable no-restricted-syntax */

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return methods;
    },
    suggestions: function suggestions() {
      return [].concat(Object(toConsumableArray["a" /* default */])(this.contextSuggestions), Object(toConsumableArray["a" /* default */])(this.methodSuggestions), [this.topLevelSuggestions]);
    }
  }),
  mounted: function mounted() {
    var input = this.$refs.input;
    this.suggest = new AutoSuggest_default.a({
      caseSensitive: false,
      suggestions: this.suggestions,
      onChange: function onChange() {
        return input.dispatchEvent(new Event('input'));
      }
    }, input);
  }
});
// CONCATENATED MODULE: ./src/components/common/ExpressionInput.vue?vue&type=script&lang=js&
 /* harmony default export */ var common_ExpressionInputvue_type_script_lang_js_ = (ExpressionInputvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/common/ExpressionInput.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  common_ExpressionInputvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ExpressionInput = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "792f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4ad08327-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/BlockId.vue?vue&type=template&id=0d0e1317&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"block-id text-right"},[_c('small',{staticClass:"text-muted"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.block-id'))+": "),_c('em',[_vm._v(_vm._s(_vm.blockId))])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/BlockId.vue?vue&type=template&id=0d0e1317&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("276c");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("e954");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__("2c4c");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__("920b");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createSuper.js + 1 modules
var createSuper = __webpack_require__("92a6");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("fc11");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/index.js + 14 modules
var lib = __webpack_require__("1b40");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/BlockId.vue?vue&type=script&lang=ts&












var BlockIdvue_type_script_lang_ts_BlockId = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(BlockId, _mixins);

  var _super = Object(createSuper["a" /* default */])(BlockId);

  function BlockId() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, BlockId);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(BlockId, [{
    key: "blockId",
    get: function get() {
      return this.block.uuid || '';
    }
  }]);

  return BlockId;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(lib["b" /* Prop */])()], BlockIdvue_type_script_lang_ts_BlockId.prototype, "block", void 0);

BlockIdvue_type_script_lang_ts_BlockId = Object(tslib_es6["__decorate"])([Object(lib["a" /* Component */])({})], BlockIdvue_type_script_lang_ts_BlockId);
/* harmony default export */ var BlockIdvue_type_script_lang_ts_ = (BlockIdvue_type_script_lang_ts_BlockId);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/BlockId.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_BlockIdvue_type_script_lang_ts_ = (BlockIdvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/BlockId.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_BlockIdvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_editors_BlockId = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "ab96":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "8872",
	"./af.js": "8872",
	"./ar": "bb32",
	"./ar-dz": "f38b",
	"./ar-dz.js": "f38b",
	"./ar-kw": "8a87",
	"./ar-kw.js": "8a87",
	"./ar-ly": "119f",
	"./ar-ly.js": "119f",
	"./ar-ma": "de6a",
	"./ar-ma.js": "de6a",
	"./ar-sa": "ab35",
	"./ar-sa.js": "ab35",
	"./ar-tn": "7068",
	"./ar-tn.js": "7068",
	"./ar.js": "bb32",
	"./az": "32c8",
	"./az.js": "32c8",
	"./be": "a569",
	"./be.js": "a569",
	"./bg": "911b",
	"./bg.js": "911b",
	"./bm": "cade",
	"./bm.js": "cade",
	"./bn": "b059",
	"./bn-bd": "60a6",
	"./bn-bd.js": "60a6",
	"./bn.js": "b059",
	"./bo": "0b7e",
	"./bo.js": "0b7e",
	"./br": "7beb",
	"./br.js": "7beb",
	"./bs": "44a7",
	"./bs.js": "44a7",
	"./ca": "5978",
	"./ca.js": "5978",
	"./cs": "3e30",
	"./cs.js": "3e30",
	"./cv": "90d4",
	"./cv.js": "90d4",
	"./cy": "893a",
	"./cy.js": "893a",
	"./da": "673f",
	"./da.js": "673f",
	"./de": "745c",
	"./de-at": "beab",
	"./de-at.js": "beab",
	"./de-ch": "5939",
	"./de-ch.js": "5939",
	"./de.js": "745c",
	"./dv": "4da0",
	"./dv.js": "4da0",
	"./el": "6f8c",
	"./el.js": "6f8c",
	"./en-au": "8a25",
	"./en-au.js": "8a25",
	"./en-ca": "2e5f",
	"./en-ca.js": "2e5f",
	"./en-gb": "0787",
	"./en-gb.js": "0787",
	"./en-ie": "a30f3",
	"./en-ie.js": "a30f3",
	"./en-il": "45c0",
	"./en-il.js": "45c0",
	"./en-in": "3c1e",
	"./en-in.js": "3c1e",
	"./en-nz": "ff2e",
	"./en-nz.js": "ff2e",
	"./en-sg": "f14d",
	"./en-sg.js": "f14d",
	"./eo": "69bc",
	"./eo.js": "69bc",
	"./es": "f88f",
	"./es-do": "66dc",
	"./es-do.js": "66dc",
	"./es-mx": "10af",
	"./es-mx.js": "10af",
	"./es-us": "e89d",
	"./es-us.js": "e89d",
	"./es.js": "f88f",
	"./et": "71be",
	"./et.js": "71be",
	"./eu": "7780",
	"./eu.js": "7780",
	"./fa": "0b63",
	"./fa.js": "0b63",
	"./fi": "a33d",
	"./fi.js": "a33d",
	"./fil": "3dbd",
	"./fil.js": "3dbd",
	"./fo": "fc63",
	"./fo.js": "fc63",
	"./fr": "9a51",
	"./fr-ca": "cda8",
	"./fr-ca.js": "cda8",
	"./fr-ch": "4a7d",
	"./fr-ch.js": "4a7d",
	"./fr.js": "9a51",
	"./fy": "854a",
	"./fy.js": "854a",
	"./ga": "4489",
	"./ga.js": "4489",
	"./gd": "c0d5",
	"./gd.js": "c0d5",
	"./gl": "4530",
	"./gl.js": "4530",
	"./gom-deva": "8967",
	"./gom-deva.js": "8967",
	"./gom-latn": "2ef4",
	"./gom-latn.js": "2ef4",
	"./gu": "cbd2",
	"./gu.js": "cbd2",
	"./he": "c2f9",
	"./he.js": "c2f9",
	"./hi": "77fe",
	"./hi.js": "77fe",
	"./hr": "a34a",
	"./hr.js": "a34a",
	"./hu": "8d44",
	"./hu.js": "8d44",
	"./hy-am": "c920",
	"./hy-am.js": "c920",
	"./id": "4197",
	"./id.js": "4197",
	"./is": "540c",
	"./is.js": "540c",
	"./it": "2f58",
	"./it-ch": "a347",
	"./it-ch.js": "a347",
	"./it.js": "2f58",
	"./ja": "f6f6",
	"./ja.js": "f6f6",
	"./jv": "99f1",
	"./jv.js": "99f1",
	"./ka": "60e4",
	"./ka.js": "60e4",
	"./kk": "17f2",
	"./kk.js": "17f2",
	"./km": "ec19",
	"./km.js": "ec19",
	"./kn": "2216",
	"./kn.js": "2216",
	"./ko": "dba2",
	"./ko.js": "dba2",
	"./ku": "917e",
	"./ku.js": "917e",
	"./ky": "3ad1",
	"./ky.js": "3ad1",
	"./lb": "cb9a",
	"./lb.js": "cb9a",
	"./lo": "786a",
	"./lo.js": "786a",
	"./lt": "0eeb",
	"./lt.js": "0eeb",
	"./lv": "0716",
	"./lv.js": "0716",
	"./me": "325a",
	"./me.js": "325a",
	"./mi": "7732",
	"./mi.js": "7732",
	"./mk": "2fde",
	"./mk.js": "2fde",
	"./ml": "9991",
	"./ml.js": "9991",
	"./mn": "fb02",
	"./mn.js": "fb02",
	"./mr": "623d",
	"./mr.js": "623d",
	"./ms": "a904",
	"./ms-my": "d801",
	"./ms-my.js": "d801",
	"./ms.js": "a904",
	"./mt": "ddbe",
	"./mt.js": "ddbe",
	"./my": "c740",
	"./my.js": "c740",
	"./nb": "8196",
	"./nb.js": "8196",
	"./ne": "1f2a",
	"./ne.js": "1f2a",
	"./nl": "e056",
	"./nl-be": "325b",
	"./nl-be.js": "325b",
	"./nl.js": "e056",
	"./nn": "b7b0",
	"./nn.js": "b7b0",
	"./oc-lnc": "57c8",
	"./oc-lnc.js": "57c8",
	"./pa-in": "99c7",
	"./pa-in.js": "99c7",
	"./pl": "5919",
	"./pl.js": "5919",
	"./pt": "d9ae",
	"./pt-br": "d851",
	"./pt-br.js": "d851",
	"./pt.js": "d9ae",
	"./ro": "ce90",
	"./ro.js": "ce90",
	"./ru": "87a5",
	"./ru.js": "87a5",
	"./sd": "235c",
	"./sd.js": "235c",
	"./se": "839b",
	"./se.js": "839b",
	"./si": "2dd2",
	"./si.js": "2dd2",
	"./sk": "8cd8",
	"./sk.js": "8cd8",
	"./sl": "2a76",
	"./sl.js": "2a76",
	"./sq": "4a4d",
	"./sq.js": "4a4d",
	"./sr": "1632",
	"./sr-cyrl": "73fd",
	"./sr-cyrl.js": "73fd",
	"./sr.js": "1632",
	"./ss": "052a",
	"./ss.js": "052a",
	"./sv": "cb84b",
	"./sv.js": "cb84b",
	"./sw": "b126",
	"./sw.js": "b126",
	"./ta": "f946",
	"./ta.js": "f946",
	"./te": "399d",
	"./te.js": "399d",
	"./tet": "8d77",
	"./tet.js": "8d77",
	"./tg": "6588",
	"./tg.js": "6588",
	"./th": "462a",
	"./th.js": "462a",
	"./tk": "7d6b",
	"./tk.js": "7d6b",
	"./tl-ph": "27ff",
	"./tl-ph.js": "27ff",
	"./tlh": "1239",
	"./tlh.js": "1239",
	"./tr": "09a0",
	"./tr.js": "09a0",
	"./tzl": "e9ca",
	"./tzl.js": "e9ca",
	"./tzm": "d954",
	"./tzm-latn": "e577",
	"./tzm-latn.js": "e577",
	"./tzm.js": "d954",
	"./ug-cn": "5756",
	"./ug-cn.js": "5756",
	"./uk": "7c79",
	"./uk.js": "7c79",
	"./ur": "fb86",
	"./ur.js": "fb86",
	"./uz": "e487",
	"./uz-latn": "251a",
	"./uz-latn.js": "251a",
	"./uz.js": "e487",
	"./vi": "9681",
	"./vi.js": "9681",
	"./x-pseudo": "8e0c",
	"./x-pseudo.js": "8e0c",
	"./yo": "5cf8",
	"./yo.js": "5cf8",
	"./zh-cn": "96ae",
	"./zh-cn.js": "96ae",
	"./zh-hk": "7e5c",
	"./zh-hk.js": "7e5c",
	"./zh-mo": "eb4b",
	"./zh-mo.js": "eb4b",
	"./zh-tw": "623f",
	"./zh-tw.js": "623f"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "ab96";

/***/ }),

/***/ "f04e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4ad08327-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/NameEditor.vue?vue&type=template&id=e76ca57c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/name")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-name"},[_c('text-editor',{attrs:{"label":_vm._f("trans")('flow-builder.block-name'),"placeholder":_vm._f("trans")('flow-builder.enter-block-name'),"valid-state":isValid},on:{"keydown":_vm.filterName},model:{value:(_vm.name),callback:function ($$v) {_vm.name=$$v},expression:"name"}},[_c('small',{staticClass:"text-muted"},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.only-accepts-word-characters'))+" ")])])],1)]}}])})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/NameEditor.vue?vue&type=template&id=e76ca57c&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("f3f3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/components/common/ValidationMessage.vue + 5 modules
var ValidationMessage = __webpack_require__("21e9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/NameEditor.vue?vue&type=script&lang=js&





/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */




/* harmony default export */ var NameEditorvue_type_script_lang_js_ = ({
  components: {
    TextEditor: TextEditor["a" /* default */],
    ValidationMessage: ValidationMessage["a" /* default */]
  },
  mixins: [lang["b" /* lang */]],
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  computed: {
    name: {
      get: function get() {
        return this.block.name;
      },
      set: function set(value) {
        this.block_setName({
          blockId: this.block.uuid,
          value: value
        });
      }
    }
  },
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapMutations */])('flow', ['block_setName'])), {}, {
    filterName: function filterName(e) {
      if (e.key.match(/\W+|Enter/g)) {
        e.preventDefault();
      }
    }
  })
});
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/NameEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var block_editors_NameEditorvue_type_script_lang_js_ = (NameEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/NameEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_NameEditorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var NameEditor = __webpack_exports__["a"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=flow-builder.umd.3.js.map