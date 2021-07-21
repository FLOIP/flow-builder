((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[7],{

/***/ "5c47":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "MobilePrimitives_SelectOneResponseBlock", function() { return /* reexport */ MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock; });
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"658979c1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue?vue&type=template&id=37fb0479&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mobile-primitive-select-one-response-block"},[_c('h3',{staticClass:"no-room-above"},[_vm._v(" "+_vm._s(_vm._f("trans")(("flow-builder." + (_vm.block.type))))+" ")]),_c('fieldset',{attrs:{"disabled":!_vm.isEditable}},[_c('block-label-editor',{attrs:{"block":_vm.block},on:{"gearClicked":function($event){_vm.showSemanticLabel = !_vm.showSemanticLabel}}}),(_vm.showSemanticLabel)?_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}):_vm._e(),_c('block-name-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('div',{staticClass:"form-group"},[_c('h4',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.choices')))]),_vm._l((Object.keys(_vm.inflatedChoices)),function(choiceKey){return [_c('resource-variant-text-editor',{attrs:{"label":choiceKey.toString(),"rows":1,"placeholder":'Enter choice...',"resource-id":_vm.inflatedChoices[choiceKey].resource.uuid,"resource-variant":_vm.findOrGenerateStubbedVariantOn(
            _vm.inflatedChoices[choiceKey].resource,
            {language_id: _vm.flow.languages[0].id, content_type: _vm.SupportedMode.TEXT, modes: [_vm.SupportedContentType.TEXT]}),"mode":'TEXT'}})]}),_c('resource-variant-text-editor',{attrs:{"label":(Object.keys(_vm.inflatedChoices).length + 1).toString(),"rows":1,"placeholder":'Enter choice...',"resource-id":_vm.inflatedEmptyChoice.resource.uuid,"resource-variant":_vm.findOrGenerateStubbedVariantOn(
            _vm.inflatedEmptyChoice.resource,
            {language_id: _vm.flow.languages[0].id, content_type: _vm.SupportedMode.TEXT, modes: [_vm.SupportedContentType.TEXT]}),"mode":'TEXT'}})],2),_c('hr'),_c('div',{staticClass:"prompt-resource"},[(_vm.promptResource)?_c('resource-editor',{attrs:{"label":_vm._f("trans")('flow-builder.prompt'),"resource":_vm.promptResource,"block":_vm.block,"flow":_vm.flow}}):_vm._e()],1),_vm._t("extras"),_c('categorization',{attrs:{"block":_vm.block}}),_c('generic-contact-property-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}})],2),_c('block-id',{attrs:{"block":_vm.block}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue?vue&type=template&id=37fb0479&

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

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/index.js
var dist = __webpack_require__("9300");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/index.js + 14 modules
var vue_property_decorator_lib = __webpack_require__("1b40");

// EXTERNAL MODULE: ./src/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore.ts
var MobilePrimitives_SelectOneResponseBlockStore = __webpack_require__("ecef");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/Categorization.vue + 9 modules
var Categorization = __webpack_require__("8619");

// EXTERNAL MODULE: ./src/store/builder/index.ts
var builder = __webpack_require__("af98");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue + 4 modules
var ResourceVariantTextEditor = __webpack_require__("bb40");

// EXTERNAL MODULE: ./src/store/flow/resource.ts
var resource = __webpack_require__("393e");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/NameEditor.vue + 4 modules
var NameEditor = __webpack_require__("f04e");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue + 4 modules
var LabelEditor = __webpack_require__("3411");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue + 4 modules
var SemanticLabelEditor = __webpack_require__("1b4e");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue + 4 modules
var ExitSemanticLabelEditor = __webpack_require__("70f0");

// EXTERNAL MODULE: ./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue + 4 modules
var FirstBlockEditorButton = __webpack_require__("192b");

// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceEditor.vue + 37 modules
var ResourceEditor = __webpack_require__("510a");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/BlockId.vue + 4 modules
var BlockId = __webpack_require__("792f");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue + 4 modules
var GenericContactPropertyEditor = __webpack_require__("b4ec");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue?vue&type=script&lang=ts&


























var flowVuexNamespace = Object(lib["e" /* namespace */])('flow');
var blockVuexNamespace = Object(lib["e" /* namespace */])("flow/".concat(MobilePrimitives_SelectOneResponseBlockStore["a" /* BLOCK_TYPE */]));
var builderVuexNamespace = Object(lib["e" /* namespace */])('builder');

var MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(MobilePrimitives_SelectOneResponseBlock, _mixins);

  var _super = Object(createSuper["a" /* default */])(MobilePrimitives_SelectOneResponseBlock);

  function MobilePrimitives_SelectOneResponseBlock() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, MobilePrimitives_SelectOneResponseBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "flow", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "showSemanticLabel", false);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "SupportedContentType", dist["SupportedContentType"]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "SupportedMode", dist["SupportedMode"]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "findOrGenerateStubbedVariantOn", resource["c" /* findOrGenerateStubbedVariantOn */]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "resourcesByUuid", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "inflatedChoices", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "inflatedEmptyChoice", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "editSelectOneResponseBlockChoice", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "editEmptyChoice", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "isEditable", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(MobilePrimitives_SelectOneResponseBlock, [{
    key: "promptResource",
    get: function get() {
      return this.resourcesByUuid[this.block.config.prompt];
    }
  }, {
    key: "questionPromptResource",
    get: function get() {
      return this.resourcesByUuid[this.block.config.question_prompt || ''];
    }
  }, {
    key: "onChoicesChanged",
    value: function onChoicesChanged(newChoices) {
      console.debug('Watched inflatedChoices', newChoices);
      this.editSelectOneResponseBlockChoice();
    }
  }, {
    key: "onEmptyChoiceChanged",
    value: function onEmptyChoiceChanged(newChoice, oldChoice) {
      console.debug('Watched inflatedEmptyChoice', newChoice, oldChoice);
      this.editEmptyChoice({
        choice: oldChoice
      });
    }
  }]);

  return MobilePrimitives_SelectOneResponseBlock;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["d" /* Watch */])('inflatedChoices', {
  deep: true
})], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "onChoicesChanged", null);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["d" /* Watch */])('inflatedEmptyChoice', {
  deep: true
})], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "onEmptyChoiceChanged", null);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Getter], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "resourcesByUuid", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Getter], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "inflatedChoices", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.State], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "inflatedEmptyChoice", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "editSelectOneResponseBlockChoice", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "editEmptyChoice", void 0);

Object(tslib_es6["__decorate"])([builderVuexNamespace.Getter], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "isEditable", void 0);

MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    GenericContactPropertyEditor: GenericContactPropertyEditor["a" /* default */],
    ResourceVariantTextEditor: ResourceVariantTextEditor["a" /* default */],
    BlockNameEditor: NameEditor["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    BlockExitSemanticLabelEditor: ExitSemanticLabelEditor["a" /* default */],
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    ResourceEditor: ResourceEditor["a" /* default */],
    BlockId: BlockId["a" /* default */],
    Categorization: Categorization["a" /* default */]
  }
})], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock);

/* harmony default export */ var MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_ = (MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock);
var install = Object(builder["d" /* createDefaultBlockTypeInstallerFor */])(MobilePrimitives_SelectOneResponseBlockStore["a" /* BLOCK_TYPE */], MobilePrimitives_SelectOneResponseBlockStore["c" /* default */]);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_types_MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_ = (MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_types_MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_types_MobilePrimitives_SelectOneResponseBlock = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "70f0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"658979c1-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue?vue&type=template&id=5c7a7930&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('text-editor',{attrs:{"is-editable":_vm.isEditable,"label":_vm._f("trans")('flow-builder.block-exit-semantic-label'),"placeholder":_vm._f("trans")('flow-builder.enter-block-exit-semantic-label')},model:{value:(_vm.semanticLabel),callback:function ($$v) {_vm.semanticLabel=$$v},expression:"semanticLabel"}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue?vue&type=template&id=5c7a7930&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("f3f3");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue?vue&type=script&lang=js&


/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */



/* harmony default export */ var ExitSemanticLabelEditorvue_type_script_lang_js_ = ({
  components: {
    TextEditor: TextEditor["a" /* default */]
  },
  mixins: [lang["b" /* lang */]],
  props: {
    isEditable: {
      default: true,
      type: Boolean
    },
    exit: {
      type: Object,
      required: true
    }
  },
  computed: {
    semanticLabel: {
      get: function get() {
        return this.exit.semantic_label;
      },
      set: function set(value) {
        this.exit.semantic_label = value;
        this.$emit('commitSemanticLabel', value);
      }
    }
  },
  methods: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapMutations */])('flow', ['block_setExitSemanticLabel']))
});
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var block_editors_ExitSemanticLabelEditorvue_type_script_lang_js_ = (ExitSemanticLabelEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_ExitSemanticLabelEditorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ExitSemanticLabelEditor = __webpack_exports__["a"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=flow-builder.common.7.js.map