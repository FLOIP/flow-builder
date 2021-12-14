((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[13],{

/***/ "2d61":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d80eb91e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/MobilePrimitives_NumericResponseBlock.vue?vue&type=template&id=32db4788&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mobile-primitive-numeric-response-block"},[_c('h3',{staticClass:"block-editor-header"},[_vm._v(" "+_vm._s(_vm._f("trans")(("flow-builder." + (_vm.block.type))))+" ")]),_c('fieldset',{attrs:{"disabled":!_vm.isEditable}},[_c('block-label-editor',{attrs:{"block":_vm.block},on:{"gearClicked":function($event){_vm.showSemanticLabel = !_vm.showSemanticLabel}}}),(_vm.showSemanticLabel)?_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}):_vm._e(),_c('block-name-editor',{attrs:{"block":_vm.block}}),_c('block-minimum-numeric-editor',{attrs:{"block":_vm.block},on:{"commitValidationMinimumChange":_vm.updateValidationMin}}),_c('block-maximum-numeric-editor',{attrs:{"block":_vm.block},on:{"commitValidationMaximumChange":_vm.updateValidationMax}}),_c('block-max-digit-editor',{attrs:{"block":_vm.block,"has-ivr":_vm.hasVoiceMode},on:{"commitMaxDigitsChange":_vm.updateMaxDigits}}),_c('block-output-branching-config',{attrs:{"block":_vm.block,"has-exit-per-choice":false},on:{"branchingTypeChangedToUnified":function($event){return _vm.handleBranchingTypeChangedToUnified({block: _vm.block})}}}),(_vm.promptResource)?_c('resource-editor',{attrs:{"resource":_vm.promptResource,"block":_vm.block,"flow":_vm.flow}}):_vm._e(),_vm._t("extras"),_c('categorization',{attrs:{"block":_vm.block}}),_c('generic-contact-property-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}})],2),_c('block-id',{attrs:{"block":_vm.block}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_NumericResponseBlock.vue?vue&type=template&id=32db4788&

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

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/index.js + 14 modules
var vue_property_decorator_lib = __webpack_require__("1b40");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("c964");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/domain/IdGeneratorUuidV4.js
var IdGeneratorUuidV4 = __webpack_require__("31aa");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// EXTERNAL MODULE: ./src/store/validation/validationHelpers.ts
var validationHelpers = __webpack_require__("85b2");

// CONCATENATED MODULE: ./src/store/flow/block-types/MobilePrimitives_NumericResponseBlockStore.ts





var BLOCK_TYPE = 'MobilePrimitives.NumericResponse';
var getters = {};
var mutations = {};
var actions = {
  setValidationMinimum: function setValidationMinimum(_ref, _ref2) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var commit, blockId, value, valueAsNumberOrUnset;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              blockId = _ref2.blockId, value = _ref2.value;
              valueAsNumberOrUnset = value === '' ? undefined : value;
              commit('flow/block_updateConfigByKey', {
                blockId: blockId,
                key: 'validation_minimum',
                value: valueAsNumberOrUnset
              }, {
                root: true
              });
              return _context.abrupt("return", valueAsNumberOrUnset);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  setValidationMaximum: function setValidationMaximum(_ref3, _ref4) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var commit, blockId, value, valueAsNumberOrUnset;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref3.commit;
              blockId = _ref4.blockId, value = _ref4.value;
              valueAsNumberOrUnset = value === '' ? undefined : value;
              commit('flow/block_updateConfigByKey', {
                blockId: blockId,
                key: 'validation_maximum',
                value: valueAsNumberOrUnset
              }, {
                root: true
              });
              return _context2.abrupt("return", valueAsNumberOrUnset);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  setMaxDigits: function setMaxDigits(_ref5, _ref6) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var commit, blockId, value, valueAsNumberOrUnset;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref5.commit;
              blockId = _ref6.blockId, value = _ref6.value;
              valueAsNumberOrUnset = value === '' ? undefined : value;
              commit('flow/block_updateConfigByKey', {
                blockId: blockId,
                key: 'ivr',
                value: {
                  max_digits: valueAsNumberOrUnset
                }
              }, {
                root: true
              });
              return _context3.abrupt("return", valueAsNumberOrUnset);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  createWith: function createWith(_ref7, _ref8) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var dispatch, commit, props, exits, blankResource;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dispatch = _ref7.dispatch, commit = _ref7.commit;
              props = _ref8.props;
              _context4.t0 = dispatch;
              _context4.next = 5;
              return new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate();

            case 5:
              _context4.t1 = _context4.sent;
              _context4.t2 = {
                uuid: _context4.t1
              };
              _context4.t3 = {
                props: _context4.t2
              };
              _context4.t4 = {
                root: true
              };
              _context4.next = 11;
              return (0, _context4.t0)('flow/block_createBlockDefaultExitWith', _context4.t3, _context4.t4);

            case 11:
              _context4.t5 = _context4.sent;
              exits = [_context4.t5];
              _context4.next = 15;
              return dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {
                root: true
              });

            case 15:
              blankResource = _context4.sent;
              commit('flow/resource_add', {
                resource: blankResource
              }, {
                root: true
              });
              return _context4.abrupt("return", Object(lodash["defaultsDeep"])(props, {
                type: BLOCK_TYPE,
                name: '',
                label: '',
                semantic_label: '',
                exits: exits,
                config: {
                  prompt: blankResource.uuid,
                  validation_minimum: undefined,
                  validation_maximum: undefined
                },
                tags: [],
                vendor_metadata: {}
              }));

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  handleBranchingTypeChangedToUnified: function handleBranchingTypeChangedToUnified(_ref9, _ref10) {
    var dispatch = _ref9.dispatch;
    var block = _ref10.block;
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: formatTestValueForUnifiedBranchingType(block)
    }, {
      root: true
    });
  },
  validate: function validate(_ref11, _ref12) {
    var rootGetters = _ref11.rootGetters;
    var block = _ref12.block,
        schemaVersion = _ref12.schemaVersion;
    return Object(validationHelpers["e" /* validateCommunityBlock */])({
      block: block,
      schemaVersion: schemaVersion
    });
  }
};

function formatTestValueForUnifiedBranchingType(block) {
  if ((block.config.validation_minimum === null || block.config.validation_minimum === undefined) && (block.config.validation_maximum === null || block.config.validation_maximum === undefined)) {
    return 'is_number(block.value)';
  }

  if (block.config.validation_minimum !== null && block.config.validation_minimum !== undefined && block.config.validation_maximum !== null && block.config.validation_maximum !== undefined) {
    return "AND(is_number(block.value, block.value >= ".concat(block.config.validation_minimum, ",") + " block.value <= ".concat(block.config.validation_maximum, ")");
  }

  if (block.config.validation_minimum !== null && block.config.validation_minimum !== undefined && (block.config.validation_maximum === null || block.config.validation_maximum === undefined)) {
    return "AND(is_number(block.value), block.value >= ".concat(block.config.validation_minimum, ")");
  }

  if ((block.config.validation_minimum === null || block.config.validation_minimum === undefined) && block.config.validation_maximum !== null && block.config.validation_maximum !== undefined) {
    return "AND(is_number(block.value), block.value <= ".concat(block.config.validation_maximum, ")");
  }

  console.warn('Exit test condition not found for NumericBlock, providing `true` by default');
  return 'true';
}

/* harmony default export */ var MobilePrimitives_NumericResponseBlockStore = ({
  namespaced: true,
  getters: getters,
  mutations: mutations,
  actions: actions
});
// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/Categorization.vue + 9 modules
var Categorization = __webpack_require__("8619");

// EXTERNAL MODULE: ./src/store/builder/index.ts
var builder = __webpack_require__("af98");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue + 14 modules
var BlockOutputBranchingConfig = __webpack_require__("18b0");

// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceEditor.vue + 37 modules
var ResourceEditor = __webpack_require__("510a");

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d80eb91e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MinimumNumericEditor.vue?vue&type=template&id=6a6ee882&
var MinimumNumericEditorvue_type_template_id_6a6ee882_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/validation_minimum")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-validation-min"},[_c('numeric-editor',{attrs:{"regex-numeric-filtering":'[0-9]',"label":_vm._f("trans")('flow-builder.minimum-value-(inclusive)'),"placeholder":_vm._f("trans")('flow-builder.enter-value'),"valid-state":isValid},model:{value:(_vm.minValue),callback:function ($$v) {_vm.minValue=_vm._n($$v)},expression:"minValue"}})],1)]}}])})}
var MinimumNumericEditorvue_type_template_id_6a6ee882_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MinimumNumericEditor.vue?vue&type=template&id=6a6ee882&

// EXTERNAL MODULE: ./src/components/common/NumericEditor.vue + 4 modules
var NumericEditor = __webpack_require__("2f00");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MinimumNumericEditor.vue?vue&type=script&lang=ts&








/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */






var MinimumNumericEditorvue_type_script_lang_ts_MinimumNumericEditor = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(MinimumNumericEditor, _mixins);

  var _super = Object(createSuper["a" /* default */])(MinimumNumericEditor);

  function MinimumNumericEditor() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, MinimumNumericEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(MinimumNumericEditor, [{
    key: "minValue",
    get: function get() {
      return this.block.config.validation_minimum;
    },
    set: function set(value) {
      this.$emit('commitValidationMinimumChange', value);
    }
  }]);

  return MinimumNumericEditor;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], MinimumNumericEditorvue_type_script_lang_ts_MinimumNumericEditor.prototype, "block", void 0);

MinimumNumericEditorvue_type_script_lang_ts_MinimumNumericEditor = Object(tslib_es6["__decorate"])([Object(vue_class_component_esm["b" /* default */])({
  components: {
    NumericEditor: NumericEditor["a" /* default */]
  }
})], MinimumNumericEditorvue_type_script_lang_ts_MinimumNumericEditor);
/* harmony default export */ var MinimumNumericEditorvue_type_script_lang_ts_ = (MinimumNumericEditorvue_type_script_lang_ts_MinimumNumericEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MinimumNumericEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_MinimumNumericEditorvue_type_script_lang_ts_ = (MinimumNumericEditorvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MinimumNumericEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_MinimumNumericEditorvue_type_script_lang_ts_,
  MinimumNumericEditorvue_type_template_id_6a6ee882_render,
  MinimumNumericEditorvue_type_template_id_6a6ee882_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_editors_MinimumNumericEditor = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d80eb91e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MaximumNumericEditor.vue?vue&type=template&id=31357080&
var MaximumNumericEditorvue_type_template_id_31357080_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/validation_maximum")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-validation-max"},[_c('numeric-editor',{attrs:{"regex-numeric-filtering":'[0-9]',"label":_vm._f("trans")('flow-builder.maximum-value-(inclusive)'),"placeholder":_vm._f("trans")('flow-builder.enter-value'),"valid-state":isValid},model:{value:(_vm.maxValue),callback:function ($$v) {_vm.maxValue=_vm._n($$v)},expression:"maxValue"}})],1)]}}])})}
var MaximumNumericEditorvue_type_template_id_31357080_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaximumNumericEditor.vue?vue&type=template&id=31357080&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MaximumNumericEditor.vue?vue&type=script&lang=ts&








/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */






var MaximumNumericEditorvue_type_script_lang_ts_MaximumNumericEditor = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(MaximumNumericEditor, _mixins);

  var _super = Object(createSuper["a" /* default */])(MaximumNumericEditor);

  function MaximumNumericEditor() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, MaximumNumericEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(MaximumNumericEditor, [{
    key: "maxValue",
    get: function get() {
      return this.block.config.validation_maximum;
    },
    set: function set(value) {
      this.$emit('commitValidationMaximumChange', value);
    }
  }]);

  return MaximumNumericEditor;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], MaximumNumericEditorvue_type_script_lang_ts_MaximumNumericEditor.prototype, "block", void 0);

MaximumNumericEditorvue_type_script_lang_ts_MaximumNumericEditor = Object(tslib_es6["__decorate"])([Object(vue_class_component_esm["b" /* default */])({
  components: {
    NumericEditor: NumericEditor["a" /* default */]
  }
})], MaximumNumericEditorvue_type_script_lang_ts_MaximumNumericEditor);
/* harmony default export */ var MaximumNumericEditorvue_type_script_lang_ts_ = (MaximumNumericEditorvue_type_script_lang_ts_MaximumNumericEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaximumNumericEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_MaximumNumericEditorvue_type_script_lang_ts_ = (MaximumNumericEditorvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaximumNumericEditor.vue





/* normalize component */

var MaximumNumericEditor_component = Object(componentNormalizer["a" /* default */])(
  block_editors_MaximumNumericEditorvue_type_script_lang_ts_,
  MaximumNumericEditorvue_type_template_id_31357080_render,
  MaximumNumericEditorvue_type_template_id_31357080_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_editors_MaximumNumericEditor = (MaximumNumericEditor_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d80eb91e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MaxDigitEditor.vue?vue&type=template&id=1aee26fe&
var MaxDigitEditorvue_type_template_id_1aee26fe_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.hasIvr)?_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/ivr/max_digits")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-max-digits"},[_c('numeric-editor',{attrs:{"regex-numeric-filtering":'[0-9]',"label":_vm._f("trans")('flow-builder.maximum-digits'),"placeholder":_vm._f("trans")('flow-builder.enter-value'),"sub-title":_vm._f("trans")('flow-builder.max-digits-help-text'),"valid-state":isValid},model:{value:(_vm.maxDigits),callback:function ($$v) {_vm.maxDigits=_vm._n($$v)},expression:"maxDigits"}})],1)]}}],null,false,2439896574)}):_vm._e()}
var MaxDigitEditorvue_type_template_id_1aee26fe_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaxDigitEditor.vue?vue&type=template&id=1aee26fe&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MaxDigitEditor.vue?vue&type=script&lang=js&
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */



/* harmony default export */ var MaxDigitEditorvue_type_script_lang_js_ = ({
  components: {
    NumericEditor: NumericEditor["a" /* default */]
  },
  mixins: [lang["b" /* lang */]],
  props: {
    block: {
      type: Object,
      required: true
    },
    hasIvr: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    maxDigits: {
      get: function get() {
        return Object(lodash["get"])(this.block, 'config.ivr.max_digits', '');
      },
      set: function set(value) {
        this.$emit('commitMaxDigitsChange', value);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaxDigitEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var block_editors_MaxDigitEditorvue_type_script_lang_js_ = (MaxDigitEditorvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaxDigitEditor.vue





/* normalize component */

var MaxDigitEditor_component = Object(componentNormalizer["a" /* default */])(
  block_editors_MaxDigitEditorvue_type_script_lang_js_,
  MaxDigitEditorvue_type_template_id_1aee26fe_render,
  MaxDigitEditorvue_type_template_id_1aee26fe_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MaxDigitEditor = (MaxDigitEditor_component.exports);
// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue + 4 modules
var GenericContactPropertyEditor = __webpack_require__("b4ec");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/MobilePrimitives_NumericResponseBlock.vue?vue&type=script&lang=ts&


























var flowVuexNamespace = Object(lib["e" /* namespace */])('flow');
var blockVuexNamespace = Object(lib["e" /* namespace */])("flow/".concat(BLOCK_TYPE));
var builderVuexNamespace = Object(lib["e" /* namespace */])('builder');

var MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(MobilePrimitives_NumericResponseBlock, _mixins);

  var _super = Object(createSuper["a" /* default */])(MobilePrimitives_NumericResponseBlock);

  function MobilePrimitives_NumericResponseBlock() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, MobilePrimitives_NumericResponseBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "flow", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "showSemanticLabel", false);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "resourcesByUuid", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "hasVoiceMode", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block_convertExitFormationToUnified", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "setValidationMinimum", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "setValidationMaximum", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "setMaxDigits", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "handleBranchingTypeChangedToUnified", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "isEditable", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(MobilePrimitives_NumericResponseBlock, [{
    key: "promptResource",
    get: function get() {
      return this.resourcesByUuid[this.block.config.prompt];
    }
  }, {
    key: "updateValidationMin",
    value: function updateValidationMin(value) {
      this.setValidationMinimum({
        blockId: this.block.uuid,
        value: value
      });
      this.handleActionsAccordingToBranchingType();
    }
  }, {
    key: "updateValidationMax",
    value: function updateValidationMax(value) {
      this.setValidationMaximum({
        blockId: this.block.uuid,
        value: value
      });
      this.handleActionsAccordingToBranchingType();
    }
  }, {
    key: "updateMaxDigits",
    value: function updateMaxDigits(value) {
      this.setMaxDigits({
        blockId: this.block.uuid,
        value: value
      });
    }
  }, {
    key: "handleActionsAccordingToBranchingType",
    value: function handleActionsAccordingToBranchingType() {
      var metadata = this.block.vendor_metadata;
      var UNIFIED = BlockOutputBranchingConfig["b" /* OutputBranchingType */].UNIFIED;

      if (metadata.io_viamo.branchingType === UNIFIED) {
        this.handleBranchingTypeChangedToUnified({
          block: this.block
        });
      }
    }
  }]);

  return MobilePrimitives_NumericResponseBlock;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Getter], MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock.prototype, "resourcesByUuid", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Getter], MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock.prototype, "hasVoiceMode", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Action], MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock.prototype, "block_convertExitFormationToUnified", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock.prototype, "setValidationMinimum", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock.prototype, "setValidationMaximum", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock.prototype, "setMaxDigits", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock.prototype, "handleBranchingTypeChangedToUnified", void 0);

Object(tslib_es6["__decorate"])([builderVuexNamespace.Getter], MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock.prototype, "isEditable", void 0);

MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    GenericContactPropertyEditor: GenericContactPropertyEditor["a" /* default */],
    ResourceEditor: ResourceEditor["a" /* default */],
    BlockNameEditor: NameEditor["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    BlockId: BlockId["a" /* default */],
    BlockMinimumNumericEditor: block_editors_MinimumNumericEditor,
    BlockMaximumNumericEditor: block_editors_MaximumNumericEditor,
    BlockMaxDigitEditor: MaxDigitEditor,
    Categorization: Categorization["a" /* default */],
    BlockOutputBranchingConfig: BlockOutputBranchingConfig["c" /* default */]
  }
})], MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock);
/* harmony default export */ var MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_ = (MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_MobilePrimitives_NumericResponseBlock);
var install = Object(builder["d" /* createDefaultBlockTypeInstallerFor */])(BLOCK_TYPE, MobilePrimitives_NumericResponseBlockStore);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_NumericResponseBlock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_types_MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_ = (MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_NumericResponseBlock.vue





/* normalize component */

var MobilePrimitives_NumericResponseBlock_component = Object(componentNormalizer["a" /* default */])(
  block_types_MobilePrimitives_NumericResponseBlockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_types_MobilePrimitives_NumericResponseBlock = __webpack_exports__["default"] = (MobilePrimitives_NumericResponseBlock_component.exports);

/***/ })

}]);
//# sourceMappingURL=flow-builder.umd.13.js.map