((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[10],{

/***/ "41bd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"26dc0a25-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_LogBlock.vue?vue&type=template&id=6e078121&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"core-log-block"},[_c('h3',{staticClass:"block-editor-header"},[_vm._v(" "+_vm._s(_vm._f("trans")(("flow-builder." + (_vm.block.type))))+" ")]),_c('fieldset',{attrs:{"disabled":!_vm.isEditable}},[_c('block-label-editor',{attrs:{"block":_vm.block},on:{"gearClicked":function($event){_vm.showSemanticLabel = !_vm.showSemanticLabel}}}),(_vm.showSemanticLabel)?_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}):_vm._e(),_c('block-name-editor',{attrs:{"block":_vm.block}}),_vm._t("extras"),_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/message")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('expression-input',{attrs:{"label":_vm._f("trans")('flow-builder.log-message'),"placeholder":_vm._f("trans")('flow-builder.enter-message'),"current-expression":_vm.value,"valid-state":isValid},on:{"commitExpressionChange":_vm.commitMessageChange}})]}}])}),_c('hr'),_c('block-output-branching-config',{attrs:{"block":_vm.block,"has-exit-per-choice":false},on:{"branchingTypeChangedToUnified":function($event){return _vm.handleBranchingTypeChangedToUnified({block: _vm.block})}}}),_c('categorization',{attrs:{"block":_vm.block}}),_c('generic-contact-property-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}})],2),_c('block-id',{attrs:{"block":_vm.block}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_LogBlock.vue?vue&type=template&id=6e078121&

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

// CONCATENATED MODULE: ./src/store/flow/block-types/Core_LogBlockStore.ts




var BLOCK_TYPE = 'Core.Log';
var getters = {};
var mutations = {};
var actions = {
  editMessage: function editMessage(_ref, _ref2) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var commit, blockId, message;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              blockId = _ref2.blockId, message = _ref2.message;
              commit('flow/block_updateConfigByKey', {
                blockId: blockId,
                key: 'message',
                value: message
              }, {
                root: true
              });
              return _context.abrupt("return", message);

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
                uuid: _context2.t1
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
              exits = [_context2.t5];
              return _context2.abrupt("return", Object(lodash["defaultsDeep"])(props, {
                type: BLOCK_TYPE,
                name: '',
                label: '',
                semantic_label: '',
                exits: exits,
                config: {
                  message: ''
                },
                tags: [],
                vendor_metadata: {}
              }));

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  handleBranchingTypeChangedToUnified: function handleBranchingTypeChangedToUnified(_ref5, _ref6) {
    var dispatch = _ref5.dispatch;
    var block = _ref6.block;
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'block.value = true'
    }, {
      root: true
    });
  }
};
/* harmony default export */ var Core_LogBlockStore = ({
  namespaced: true,
  getters: getters,
  mutations: mutations,
  actions: actions
});
// EXTERNAL MODULE: ./src/store/builder/index.ts
var builder = __webpack_require__("af98");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/components/common/ExpressionInput.vue + 5 modules
var ExpressionInput = __webpack_require__("6faa");

// EXTERNAL MODULE: ./src/components/common/ValidationMessage.vue + 5 modules
var ValidationMessage = __webpack_require__("21e9");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/Categorization.vue + 9 modules
var Categorization = __webpack_require__("8619");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue + 14 modules
var BlockOutputBranchingConfig = __webpack_require__("18b0");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

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

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue + 4 modules
var GenericContactPropertyEditor = __webpack_require__("b4ec");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_LogBlock.vue?vue&type=script&lang=ts&
























var blockVuexNamespace = Object(lib["e" /* namespace */])("flow/".concat(BLOCK_TYPE));
var builderVuexNamespace = Object(lib["e" /* namespace */])('builder');

var Core_LogBlockvue_type_script_lang_ts_Core_LogBlock = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(Core_LogBlock, _mixins);

  var _super = Object(createSuper["a" /* default */])(Core_LogBlock);

  function Core_LogBlock() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, Core_LogBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "flow", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "showSemanticLabel", false);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "editMessage", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "handleBranchingTypeChangedToUnified", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "isEditable", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(Core_LogBlock, [{
    key: "value",
    get: function get() {
      return this.block.config.message || '';
    }
  }, {
    key: "commitMessageChange",
    value: function commitMessageChange(value) {
      return this.editMessage({
        blockId: this.block.uuid,
        message: value
      });
    }
  }]);

  return Core_LogBlock;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], Core_LogBlockvue_type_script_lang_ts_Core_LogBlock.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], Core_LogBlockvue_type_script_lang_ts_Core_LogBlock.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], Core_LogBlockvue_type_script_lang_ts_Core_LogBlock.prototype, "editMessage", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], Core_LogBlockvue_type_script_lang_ts_Core_LogBlock.prototype, "handleBranchingTypeChangedToUnified", void 0);

Object(tslib_es6["__decorate"])([builderVuexNamespace.Getter], Core_LogBlockvue_type_script_lang_ts_Core_LogBlock.prototype, "isEditable", void 0);

Core_LogBlockvue_type_script_lang_ts_Core_LogBlock = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    GenericContactPropertyEditor: GenericContactPropertyEditor["a" /* default */],
    ExpressionInput: ExpressionInput["a" /* default */],
    BlockNameEditor: NameEditor["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    BlockId: BlockId["a" /* default */],
    ValidationMessage: ValidationMessage["a" /* default */],
    Categorization: Categorization["a" /* default */],
    BlockOutputBranchingConfig: BlockOutputBranchingConfig["c" /* default */]
  }
})], Core_LogBlockvue_type_script_lang_ts_Core_LogBlock);
/* harmony default export */ var Core_LogBlockvue_type_script_lang_ts_ = (Core_LogBlockvue_type_script_lang_ts_Core_LogBlock);
var install = Object(builder["d" /* createDefaultBlockTypeInstallerFor */])(BLOCK_TYPE, Core_LogBlockStore);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_LogBlock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_types_Core_LogBlockvue_type_script_lang_ts_ = (Core_LogBlockvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_LogBlock.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_types_Core_LogBlockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_types_Core_LogBlock = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "b4ec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"26dc0a25-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue?vue&type=template&id=bb893178&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"generic-contact-property-editor"},[_c('hr'),_c('label',{staticClass:"text-primary"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.contact-properties')))]),_c('div',{staticClass:"custom-control custom-checkbox"},[_c('input',{staticClass:"custom-control-input",attrs:{"id":"setContactProperty","type":"checkbox","name":"setContactProperty"},domProps:{"value":_vm.shouldSetContactProperty,"checked":_vm.shouldSetContactProperty},on:{"change":_vm.toggleSetContactProperty}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"setContactProperty"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.set-contact-property-with-response'))+" ")])]),(_vm.shouldSetContactProperty)?_c('div',{staticClass:"form-group"},[_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/set_contact_property/property_key")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-contact-property-key"},[_c('text-editor',{attrs:{"value":_vm.propertyKey,"label":_vm._f("trans")('flow-builder.property'),"label-class":'',"placeholder":_vm._f("trans")('flow-builder.enter-contact-property-label'),"valid-state":isValid},on:{"input":_vm.updatePropertyKey}})],1)]}}],null,false,477660232)}),_c('label',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.value')))]),(_vm.isBlockInteractive(_vm.block))?_c('div',{staticClass:"form-group"},[_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{staticClass:"custom-control-input",attrs:{"id":"setProp","type":"radio","name":"contactPropAction"},domProps:{"checked":_vm.propertyValueAction === _vm.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE,"value":_vm.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE},on:{"change":_vm.updatePropertyValueAction}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"setProp"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.entry-from-this-block'))+" ")])]),_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{staticClass:"custom-control-input",attrs:{"id":"clearProp","type":"radio","name":"contactPropAction"},domProps:{"checked":_vm.propertyValueAction === _vm.PROPERTY_VALUE_ACTION.OPEN_EXPRESSION,"value":_vm.PROPERTY_VALUE_ACTION.OPEN_EXPRESSION},on:{"change":_vm.updatePropertyValueAction}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"clearProp"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.expression'))+" ")])])]):_vm._e(),(_vm.shouldUseOpenExpression)?_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/set_contact_property/property_value")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('expression-input',{attrs:{"label":'',"placeholder":_vm._f("trans")('flow-builder.enter-expression'),"current-expression":_vm.propertyValue,"valid-state":isValid},on:{"commitExpressionChange":_vm.updatePropertyValue}})]}}],null,false,3441631689)}):_vm._e()],1):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue?vue&type=template&id=bb893178&

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

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var vuex_class_lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// EXTERNAL MODULE: ./src/components/common/ValidationMessage.vue + 5 modules
var ValidationMessage = __webpack_require__("21e9");

// EXTERNAL MODULE: ./src/components/common/ExpressionInput.vue + 5 modules
var ExpressionInput = __webpack_require__("6faa");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./src/store/flow/block.ts
var flow_block = __webpack_require__("6df9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue?vue&type=script&lang=ts&

















var flowVuexNamespace = Object(vuex_class_lib["e" /* namespace */])('flow');
var EMPTY_STRING_EXPRESSION = '';
var BLOCK_RESPONSE_EXPRESSION = '@block.value';

var GenericContactPropertyEditorvue_type_script_lang_ts_GenericContactPropertyEditor = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(GenericContactPropertyEditor, _mixins);

  var _super = Object(createSuper["a" /* default */])(GenericContactPropertyEditor);

  function GenericContactPropertyEditor() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, GenericContactPropertyEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "shouldSetContactProperty", false);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "PROPERTY_VALUE_ACTION", {
      OPEN_EXPRESSION: 'openExpression',
      FROM_CURRENT_BLOCK_RESPONSE: 'fromCurrentBlockResponse'
    });

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "propertyValueAction", '');

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "propertyKey", '');

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "propertyValue", '');

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block_updateConfigByPath", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block_updateVendorMetadataByPath", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block_removeConfigByKey", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(GenericContactPropertyEditor, [{
    key: "created",
    value: function created() {
      this.shouldSetContactProperty = Object(lodash["has"])(this.block.config, 'set_contact_property');
      this.propertyKey = Object(lodash["get"])(this.block.config.set_contact_property, 'property_key', '');
      this.propertyValue = Object(lodash["get"])(this.block.config.set_contact_property, 'property_value', null);

      if (this.propertyValue === null) {
        // default setting
        if (this.isBlockInteractive(this.block)) {
          // interactive blocks will have `Entry from this block` option by default
          this.propertyValue = BLOCK_RESPONSE_EXPRESSION;
        } else {
          // non interactive blocks will have `Expression` option by default
          this.propertyValue = EMPTY_STRING_EXPRESSION;
        }
      }

      this.initPropertyValueAction();
    }
  }, {
    key: "isBlockInteractive",
    value: function isBlockInteractive(block) {
      return Object(flow_block["c" /* isBlockInteractive */])(block);
    } // for checkbox ######################

  }, {
    key: "toggleSetContactProperty",
    value: function toggleSetContactProperty() {
      this.shouldSetContactProperty = !this.shouldSetContactProperty;

      if (!this.shouldSetContactProperty) {
        this.block_removeConfigByKey({
          blockId: this.block.uuid,
          key: 'set_contact_property'
        });
      } else {
        this.block_updateConfigByPath({
          blockId: this.block.uuid,
          path: 'set_contact_property',
          value: {
            property_key: this.propertyKey,
            property_value: this.shouldUseOpenExpression ? EMPTY_STRING_EXPRESSION : this.propertyValue
          }
        });
      }
    } // for radio buttons ######################

  }, {
    key: "initPropertyValueAction",
    value: function initPropertyValueAction() {
      if (this.propertyValue === BLOCK_RESPONSE_EXPRESSION) {
        this.propertyValueAction = this.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE;
      } else {
        this.propertyValueAction = this.PROPERTY_VALUE_ACTION.OPEN_EXPRESSION;
      }
    }
  }, {
    key: "updatePropertyValueAction",
    value: function updatePropertyValueAction(_ref) {
      var value = _ref.target.value;
      this.propertyValueAction = value;

      if (value === this.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE) {
        this.updatePropertyValue(BLOCK_RESPONSE_EXPRESSION);
      } else {
        this.updatePropertyValue(EMPTY_STRING_EXPRESSION);
      }
    }
  }, {
    key: "shouldUseOpenExpression",
    get: function get() {
      return this.propertyValueAction === this.PROPERTY_VALUE_ACTION.OPEN_EXPRESSION;
    } // for input fields ######################

  }, {
    key: "updatePropertyKey",
    value: function updatePropertyKey(value) {
      this.propertyKey = value;
      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'set_contact_property.property_key',
        value: value
      });
    }
  }, {
    key: "updatePropertyValue",
    value: function updatePropertyValue(value) {
      this.propertyValue = value;
      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'set_contact_property.property_value',
        value: value
      });
    }
  }]);

  return GenericContactPropertyEditor;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(lib["b" /* Prop */])()], GenericContactPropertyEditorvue_type_script_lang_ts_GenericContactPropertyEditor.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Mutation], GenericContactPropertyEditorvue_type_script_lang_ts_GenericContactPropertyEditor.prototype, "block_updateConfigByPath", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Mutation], GenericContactPropertyEditorvue_type_script_lang_ts_GenericContactPropertyEditor.prototype, "block_updateVendorMetadataByPath", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Mutation], GenericContactPropertyEditorvue_type_script_lang_ts_GenericContactPropertyEditor.prototype, "block_removeConfigByKey", void 0);

GenericContactPropertyEditorvue_type_script_lang_ts_GenericContactPropertyEditor = Object(tslib_es6["__decorate"])([Object(lib["a" /* Component */])({
  components: {
    TextEditor: TextEditor["a" /* default */],
    ExpressionInput: ExpressionInput["a" /* default */],
    ValidationMessage: ValidationMessage["a" /* default */]
  }
})], GenericContactPropertyEditorvue_type_script_lang_ts_GenericContactPropertyEditor);
/* harmony default export */ var GenericContactPropertyEditorvue_type_script_lang_ts_ = (GenericContactPropertyEditorvue_type_script_lang_ts_GenericContactPropertyEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_GenericContactPropertyEditorvue_type_script_lang_ts_ = (GenericContactPropertyEditorvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_GenericContactPropertyEditorvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_editors_GenericContactPropertyEditor = __webpack_exports__["a"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=flow-builder.umd.10.js.map