((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[9],{

/***/ "192b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2b349eb4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue?vue&type=template&id=4d00be79&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"starting-block-button"},[(_vm.isEditable)?[_c('h4',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.options')))]),_c('div',{staticClass:"form-group"},[_c('button',{staticClass:"btn btn-secondary btn-sm",attrs:{"type":"button","disabled":_vm.isStartBlock},on:{"click":function($event){return _vm.setStartBlock($event)}}},[(_vm.isStartBlock)?[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.currently-set-as-starting-block'))+" ")]:[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.set-as-starting-block'))+" ")]],2)])]:_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue?vue&type=template&id=4d00be79&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("bee2");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__("262e");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 2 modules
var createSuper = __webpack_require__("2caf");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__("60a3");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue?vue&type=script&lang=ts&









var flowVuexNamespace = Object(lib["e" /* namespace */])('flow');

var FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(FirstBlockEditorButton, _mixins);

  var _super = Object(createSuper["a" /* default */])(FirstBlockEditorButton);

  function FirstBlockEditorButton() {
    Object(classCallCheck["a" /* default */])(this, FirstBlockEditorButton);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(FirstBlockEditorButton, [{
    key: "setStartBlock",
    value: function setStartBlock(event) {
      var flowId = this.flow.uuid,
          blockId = this.blockId;
      this.flow_setFirstBlockId({
        flowId: flowId,
        blockId: blockId
      });
    }
  }, {
    key: "isStartBlock",
    get: function get() {
      return this.blockId === this.flow.first_block_id;
    }
  }]);

  return FirstBlockEditorButton;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  default: true
})], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton.prototype, "isEditable", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton.prototype, "blockId", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Mutation], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton.prototype, "flow_setFirstBlockId", void 0);

FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({})], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton);
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2b349eb4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue?vue&type=template&id=80125e96&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/semantic_label")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-semantic-label",attrs:{"id":((_vm.block.uuid) + ".semanticLabel")}},[_c('text-editor',{attrs:{"label":_vm._f("trans")('flow-builder.block-semantic-label'),"placeholder":_vm._f("trans")('flow-builder.enter-block-semantic-label'),"validState":isValid},model:{value:(_vm.semanticLabel),callback:function ($$v) {_vm.semanticLabel=$$v},expression:"semanticLabel"}})],1)]}}])})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue?vue&type=template&id=80125e96&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/components/common/ValidationMessage.vue + 5 modules
var ValidationMessage = __webpack_require__("21e9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue?vue&type=script&lang=js&

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




/* harmony default export */ var SemanticLabelEditorvue_type_script_lang_js_ = ({
  components: {
    TextEditor: TextEditor["a" /* default */],
    ValidationMessage: ValidationMessage["a" /* default */]
  },
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  mixins: [lang["b" /* lang */]],
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2b349eb4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/LabelEditor.vue?vue&type=template&id=1e3c9238&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/label")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-label",attrs:{"id":((_vm.block.uuid) + ".label")}},[_c('text-editor',{attrs:{"label":_vm._f("trans")('flow-builder.block-label'),"placeholder":_vm._f("trans")('flow-builder.enter-block-label'),"validState":isValid},model:{value:(_vm.label),callback:function ($$v) {_vm.label=$$v},expression:"label"}})],1)]}}])})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue?vue&type=template&id=1e3c9238&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("bee2");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__("262e");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 2 modules
var createSuper = __webpack_require__("2caf");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__("60a3");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// EXTERNAL MODULE: ./src/components/common/ValidationMessage.vue + 5 modules
var ValidationMessage = __webpack_require__("21e9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/LabelEditor.vue?vue&type=script&lang=ts&











var flowVuexNamespace = Object(lib["e" /* namespace */])('flow');

var LabelEditorvue_type_script_lang_ts_LabelEditor = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(LabelEditor, _mixins);

  var _super = Object(createSuper["a" /* default */])(LabelEditor);

  function LabelEditor() {
    Object(classCallCheck["a" /* default */])(this, LabelEditor);

    return _super.apply(this, arguments);
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

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], LabelEditorvue_type_script_lang_ts_LabelEditor.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Mutation], LabelEditorvue_type_script_lang_ts_LabelEditor.prototype, "block_setLabel", void 0);

LabelEditorvue_type_script_lang_ts_LabelEditor = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
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

/***/ "792f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2b349eb4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/BlockId.vue?vue&type=template&id=9ef7b11c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"block-id text-right"},[_c('small',{staticClass:"text-muted"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.block-id'))+": "),_c('em',[_vm._v(_vm._s(_vm.blockId))])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/BlockId.vue?vue&type=template&id=9ef7b11c&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("bee2");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__("262e");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 2 modules
var createSuper = __webpack_require__("2caf");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__("60a3");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/BlockId.vue?vue&type=script&lang=ts&









var BlockIdvue_type_script_lang_ts_BlockId = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(BlockId, _mixins);

  var _super = Object(createSuper["a" /* default */])(BlockId);

  function BlockId() {
    Object(classCallCheck["a" /* default */])(this, BlockId);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(BlockId, [{
    key: "blockId",
    get: function get() {
      return this.block.uuid || '';
    }
  }]);

  return BlockId;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], BlockIdvue_type_script_lang_ts_BlockId.prototype, "block", void 0);

BlockIdvue_type_script_lang_ts_BlockId = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({})], BlockIdvue_type_script_lang_ts_BlockId);
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

/***/ "cab88":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2b349eb4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_RunFlowBlock.vue?vue&type=template&id=8d7f2b1c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"core-run-flow-block"},[_c('h3',{staticClass:"no-room-above"},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.edit-block-type',{block_type: _vm.trans(("flow-builder." + (_vm.block.type)))}))+" ")]),_c('fieldset',{attrs:{"disabled":!_vm.isEditable}},[_c('block-name-editor',{attrs:{"block":_vm.block}}),_c('block-label-editor',{attrs:{"block":_vm.block}}),_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}),_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/flow_id")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"form-group"},[_c('label',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.destination-flow')))]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.destinationFlowId),expression:"destinationFlowId"}],staticClass:"form-control",class:{ 'is-invalid': isValid === false },on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.destinationFlowId=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{attrs:{"value":""}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.none-selected'))+" ")]),_vm._l((_vm.otherFlows),function(flow,i){return _c('option',{domProps:{"value":flow.uuid}},[_vm._v(" "+_vm._s(flow.name)+" ")])})],2)])]}}])}),_vm._t("extras"),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}})],2),_c('block-id',{attrs:{"block":_vm.block}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_RunFlowBlock.vue?vue&type=template&id=8d7f2b1c&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("bee2");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__("262e");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 2 modules
var createSuper = __webpack_require__("2caf");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__("60a3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/domain/IdGeneratorUuidV4.js
var IdGeneratorUuidV4 = __webpack_require__("31aa");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// CONCATENATED MODULE: ./src/store/flow/block-types/Core_RunFlowBlockStore.ts





var BLOCK_TYPE = 'Core.RunFlow';
var getters = {
  otherFlows: function otherFlows(state, getters, rootState, rootGetters) {
    return rootState.flow.flows.filter(function (flow) {
      return flow.uuid !== rootGetters['flow/activeFlow'].uuid;
    });
  }
};
var mutations = {};
var actions = {
  setDestinationFlowId: function setDestinationFlowId(_ref, _ref2) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var commit, blockId, newDestinationFlowId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              blockId = _ref2.blockId, newDestinationFlowId = _ref2.newDestinationFlowId;
              commit('flow/block_updateConfig', {
                blockId: blockId,
                newConfig: {
                  flow_id: newDestinationFlowId
                }
              }, {
                root: true
              });
              return _context.abrupt("return", newDestinationFlowId);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  createWith: function createWith(_ref3, _ref4) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var dispatch, props, exits;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch = _ref3.dispatch;
              props = _ref4.props;
              _context2.t0 = dispatch;
              _context2.next = 5;
              return new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate();

            case 5:
              _context2.t1 = _context2.sent;
              _context2.t2 = {
                uuid: _context2.t1,
                tag: 'Default',
                label: 'Default'
              };
              _context2.t3 = {
                props: _context2.t2
              };
              _context2.t4 = {
                root: true
              };
              _context2.next = 11;
              return (0, _context2.t0)('flow/block_createBlockDefaultExitWith', _context2.t3, _context2.t4);

            case 11:
              _context2.t5 = _context2.sent;
              _context2.t6 = dispatch;
              _context2.next = 15;
              return new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate();

            case 15:
              _context2.t7 = _context2.sent;
              _context2.t8 = {
                uuid: _context2.t7,
                tag: 'Error',
                label: 'Error'
              };
              _context2.t9 = {
                props: _context2.t8
              };
              _context2.t10 = {
                root: true
              };
              _context2.next = 21;
              return (0, _context2.t6)('flow/block_createBlockExitWith', _context2.t9, _context2.t10);

            case 21:
              _context2.t11 = _context2.sent;
              exits = [_context2.t5, _context2.t11];
              return _context2.abrupt("return", Object(lodash["defaultsDeep"])(props, {
                type: BLOCK_TYPE,
                name: '',
                label: '',
                semantic_label: '',
                config: {
                  flow_id: ''
                },
                exits: exits
              }));

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
/* harmony default export */ var Core_RunFlowBlockStore = ({
  namespaced: true,
  getters: getters,
  mutations: mutations,
  actions: actions
});
// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/store/builder/index.ts
var builder = __webpack_require__("af98");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/NameEditor.vue + 4 modules
var NameEditor = __webpack_require__("f04e");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue + 4 modules
var LabelEditor = __webpack_require__("3411");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue + 4 modules
var SemanticLabelEditor = __webpack_require__("1b4e");

// EXTERNAL MODULE: ./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue + 4 modules
var FirstBlockEditorButton = __webpack_require__("192b");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/BlockId.vue + 4 modules
var BlockId = __webpack_require__("792f");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// EXTERNAL MODULE: ./src/components/common/ValidationMessage.vue + 5 modules
var ValidationMessage = __webpack_require__("21e9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_RunFlowBlock.vue?vue&type=script&lang=ts&

















var blockVuexNamespace = Object(lib["e" /* namespace */])("flow/".concat(BLOCK_TYPE));
var builderVuexNamespace = Object(lib["e" /* namespace */])('builder');

var Core_RunFlowBlockvue_type_script_lang_ts_Core_RunAnotherFlowBlock = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(Core_RunAnotherFlowBlock, _mixins);

  var _super = Object(createSuper["a" /* default */])(Core_RunAnotherFlowBlock);

  function Core_RunAnotherFlowBlock() {
    Object(classCallCheck["a" /* default */])(this, Core_RunAnotherFlowBlock);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(Core_RunAnotherFlowBlock, [{
    key: "destinationFlowId",
    get: function get() {
      return this.block.config.flow_id;
    },
    set: function set(newDestinationFlowId) {
      this.setDestinationFlowId({
        blockId: this.block.uuid,
        newDestinationFlowId: newDestinationFlowId
      });
    }
  }]);

  return Core_RunAnotherFlowBlock;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], Core_RunFlowBlockvue_type_script_lang_ts_Core_RunAnotherFlowBlock.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], Core_RunFlowBlockvue_type_script_lang_ts_Core_RunAnotherFlowBlock.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], Core_RunFlowBlockvue_type_script_lang_ts_Core_RunAnotherFlowBlock.prototype, "setDestinationFlowId", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Getter], Core_RunFlowBlockvue_type_script_lang_ts_Core_RunAnotherFlowBlock.prototype, "otherFlows", void 0);

Object(tslib_es6["__decorate"])([builderVuexNamespace.Getter], Core_RunFlowBlockvue_type_script_lang_ts_Core_RunAnotherFlowBlock.prototype, "isEditable", void 0);

Core_RunFlowBlockvue_type_script_lang_ts_Core_RunAnotherFlowBlock = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  components: {
    BlockNameEditor: NameEditor["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    BlockId: BlockId["a" /* default */],
    ValidationMessage: ValidationMessage["a" /* default */]
  }
})], Core_RunFlowBlockvue_type_script_lang_ts_Core_RunAnotherFlowBlock);
/* harmony default export */ var Core_RunFlowBlockvue_type_script_lang_ts_ = (Core_RunFlowBlockvue_type_script_lang_ts_Core_RunAnotherFlowBlock);
var install = Object(builder["c" /* createDefaultBlockTypeInstallerFor */])(BLOCK_TYPE, Core_RunFlowBlockStore);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_RunFlowBlock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_types_Core_RunFlowBlockvue_type_script_lang_ts_ = (Core_RunFlowBlockvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_RunFlowBlock.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_types_Core_RunFlowBlockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Core_RunFlowBlock = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "f04e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2b349eb4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/NameEditor.vue?vue&type=template&id=041f538e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/name")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-name",attrs:{"id":((_vm.block.uuid) + ".name")}},[_c('text-editor',{attrs:{"label":_vm._f("trans")('flow-builder.block-name'),"placeholder":_vm._f("trans")('flow-builder.enter-block-name'),"validState":isValid},on:{"keydown":_vm.filterName},model:{value:(_vm.name),callback:function ($$v) {_vm.name=$$v},expression:"name"}},[_c('small',{staticClass:"text-muted"},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.only-accepts-word-characters'))+" ")])])],1)]}}])})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/NameEditor.vue?vue&type=template&id=041f538e&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/components/common/ValidationMessage.vue + 5 modules
var ValidationMessage = __webpack_require__("21e9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/NameEditor.vue?vue&type=script&lang=js&




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
//
//
//




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
//# sourceMappingURL=flow-builder.umd.9.js.map