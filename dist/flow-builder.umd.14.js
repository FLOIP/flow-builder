((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[14],{

/***/ "84d1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"26dc0a25-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_SetContactPropertyBlock.vue?vue&type=template&id=88d7e1dc&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"core-set-contact-property-block"},[_c('h3',{staticClass:"block-editor-header"},[_vm._v(" "+_vm._s(_vm._f("trans")(("flow-builder." + (_vm.block.type))))+" ")]),_c('fieldset',{attrs:{"disabled":!_vm.isEditable}},[_c('block-label-editor',{attrs:{"block":_vm.block},on:{"gearClicked":function($event){_vm.showSemanticLabel = !_vm.showSemanticLabel}}}),(_vm.showSemanticLabel)?_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}):_vm._e(),_c('block-name-editor',{attrs:{"block":_vm.block}}),_vm._t("extras"),_c('contact-property-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('block-output-branching-config',{attrs:{"block":_vm.block,"has-exit-per-choice":false},on:{"branchingTypeChangedToUnified":function($event){return _vm.handleBranchingTypeChangedToUnified({block: _vm.block})}}}),_c('categorization',{attrs:{"block":_vm.block}}),_c('hr'),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}})],2),_c('block-id',{attrs:{"block":_vm.block}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_SetContactPropertyBlock.vue?vue&type=template&id=88d7e1dc&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("276c");

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"26dc0a25-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/ContactPropertyEditor.vue?vue&type=template&id=95c55a4e&
var ContactPropertyEditorvue_type_template_id_95c55a4e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"contact-property-editor"},[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"text-primary"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.action-label')))]),_c('p',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.contact-property-action-hint')))]),_c('div',{staticClass:"form-group"},[_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.propertyAction),expression:"propertyAction"}],staticClass:"custom-control-input",attrs:{"id":"setProp","type":"radio","name":"contactPropAction"},domProps:{"value":_vm.PROPERTY_ACTION.SET,"checked":_vm._q(_vm.propertyAction,_vm.PROPERTY_ACTION.SET)},on:{"change":function($event){_vm.propertyAction=_vm.PROPERTY_ACTION.SET}}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"setProp"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.set-contact-property'))+" ")])]),_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.propertyAction),expression:"propertyAction"}],staticClass:"custom-control-input",attrs:{"id":"clearProp","type":"radio","name":"contactPropAction"},domProps:{"value":_vm.PROPERTY_ACTION.CLEAR,"checked":_vm._q(_vm.propertyAction,_vm.PROPERTY_ACTION.CLEAR)},on:{"change":function($event){_vm.propertyAction=_vm.PROPERTY_ACTION.CLEAR}}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"clearProp"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.clear-contact-property'))+" ")])])]),_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/set_contact_property/property_key")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-contact-property-key"},[_c('text-editor',{attrs:{"label":_vm._f("trans")('flow-builder.contact-property-label'),"label-class":'font-weight-bold',"placeholder":_vm._f("trans")('flow-builder.enter-contact-property-label'),"valid-state":isValid},model:{value:(_vm.propertyKey),callback:function ($$v) {_vm.propertyKey=$$v},expression:"propertyKey"}})],1)]}}])}),(_vm.propertyAction === _vm.PROPERTY_ACTION.SET)?_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/set_contact_property/property_value")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('expression-input',{attrs:{"label":_vm._f("trans")('flow-builder.value-expression'),"placeholder":_vm._f("trans")('flow-builder.enter-expression'),"label-class":'font-weight-bold',"current-expression":_vm.propertyValue,"valid-state":isValid},on:{"commitExpressionChange":_vm.updatePropertyValue}})]}}],null,false,3462627979)}):_vm._e()],1)])}
var ContactPropertyEditorvue_type_template_id_95c55a4e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/ContactPropertyEditor.vue?vue&type=template&id=95c55a4e&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("e954");

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/ContactPropertyEditor.vue?vue&type=script&lang=ts&
















var flowVuexNamespace = Object(lib["e" /* namespace */])('flow');
var NULL_STRING_EXPRESSION = '@(null)';
var EMPTY_STRING_EXPRESSION = '';

var ContactPropertyEditorvue_type_script_lang_ts_ContactPropertyEditor = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(ContactPropertyEditor, _mixins);

  var _super = Object(createSuper["a" /* default */])(ContactPropertyEditor);

  function ContactPropertyEditor() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ContactPropertyEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "PROPERTY_ACTION", {
      SET: 'set',
      CLEAR: 'clear'
    });

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block_updateConfigByPath", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(ContactPropertyEditor, [{
    key: "propertyAction",
    get: function get() {
      if (this.propertyValue === NULL_STRING_EXPRESSION) {
        return this.PROPERTY_ACTION.CLEAR;
      }

      return this.PROPERTY_ACTION.SET;
    },
    set: function set(value) {
      if (value === this.PROPERTY_ACTION.CLEAR) {
        this.updatePropertyValue(NULL_STRING_EXPRESSION);
      } else {
        this.updatePropertyValue(EMPTY_STRING_EXPRESSION);
      }
    }
  }, {
    key: "propertyKey",
    get: function get() {
      return Object(lodash["get"])(this.block.config, 'set_contact_property.property_key');
    },
    set: function set(value) {
      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'set_contact_property.property_key',
        value: value
      });
    }
  }, {
    key: "propertyValue",
    get: function get() {
      return Object(lodash["get"])(this.block.config, 'set_contact_property.property_value', EMPTY_STRING_EXPRESSION);
    }
  }, {
    key: "updatePropertyValue",
    value: function updatePropertyValue(value) {
      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'set_contact_property.property_value',
        value: value
      });
    }
  }]);

  return ContactPropertyEditor;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], ContactPropertyEditorvue_type_script_lang_ts_ContactPropertyEditor.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Mutation], ContactPropertyEditorvue_type_script_lang_ts_ContactPropertyEditor.prototype, "block_updateConfigByPath", void 0);

ContactPropertyEditorvue_type_script_lang_ts_ContactPropertyEditor = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    TextEditor: TextEditor["a" /* default */],
    ExpressionInput: ExpressionInput["a" /* default */],
    ValidationMessage: ValidationMessage["a" /* default */]
  }
})], ContactPropertyEditorvue_type_script_lang_ts_ContactPropertyEditor);
/* harmony default export */ var ContactPropertyEditorvue_type_script_lang_ts_ = (ContactPropertyEditorvue_type_script_lang_ts_ContactPropertyEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/ContactPropertyEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_ContactPropertyEditorvue_type_script_lang_ts_ = (ContactPropertyEditorvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/ContactPropertyEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_ContactPropertyEditorvue_type_script_lang_ts_,
  ContactPropertyEditorvue_type_template_id_95c55a4e_render,
  ContactPropertyEditorvue_type_template_id_95c55a4e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_editors_ContactPropertyEditor = (component.exports);
// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("c964");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/domain/IdGeneratorUuidV4.js
var IdGeneratorUuidV4 = __webpack_require__("31aa");

// CONCATENATED MODULE: ./src/store/flow/block-types/Core_SetContactPropertyStore.ts




var BLOCK_TYPE = 'Core.SetContactProperty';
var getters = {};
var mutations = {};
var actions = {
  createWith: function createWith(_ref, _ref2) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var dispatch, props, exits;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch = _ref.dispatch;
              props = _ref2.props;
              _context.t0 = dispatch;
              _context.next = 5;
              return new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate();

            case 5:
              _context.t1 = _context.sent;
              _context.t2 = {
                uuid: _context.t1
              };
              _context.t3 = {
                props: _context.t2
              };
              _context.t4 = {
                root: true
              };
              _context.next = 11;
              return (0, _context.t0)('flow/block_createBlockDefaultExitWith', _context.t3, _context.t4);

            case 11:
              _context.t5 = _context.sent;
              exits = [_context.t5];
              return _context.abrupt("return", Object(lodash["defaultsDeep"])(props, {
                type: BLOCK_TYPE,
                name: '',
                label: '',
                semantic_label: '',
                config: {
                  set_contact_property: {
                    property_key: '',
                    property_value: ''
                  }
                },
                exits: exits,
                tags: [],
                vendor_metadata: {}
              }));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  handleBranchingTypeChangedToUnified: function handleBranchingTypeChangedToUnified(_ref3, _ref4) {
    var dispatch = _ref3.dispatch;
    var block = _ref4.block;
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'block.value = true'
    }, {
      root: true
    });
  }
};
/* harmony default export */ var Core_SetContactPropertyStore = ({
  namespaced: true,
  getters: getters,
  mutations: mutations,
  actions: actions
});
// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/Categorization.vue + 9 modules
var Categorization = __webpack_require__("8619");

// EXTERNAL MODULE: ./src/store/builder/index.ts
var builder = __webpack_require__("af98");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue + 14 modules
var BlockOutputBranchingConfig = __webpack_require__("18b0");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/BlockId.vue + 4 modules
var BlockId = __webpack_require__("792f");

// EXTERNAL MODULE: ./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue + 4 modules
var FirstBlockEditorButton = __webpack_require__("192b");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue + 4 modules
var SemanticLabelEditor = __webpack_require__("1b4e");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue + 4 modules
var LabelEditor = __webpack_require__("3411");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/NameEditor.vue + 4 modules
var NameEditor = __webpack_require__("f04e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_SetContactPropertyBlock.vue?vue&type=script&lang=ts&





















var builderVuexNamespace = Object(lib["e" /* namespace */])('builder');
var blockVuexNamespace = Object(lib["e" /* namespace */])("flow/".concat(BLOCK_TYPE));

var Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(Core_SetContactPropertyBlock, _mixins);

  var _super = Object(createSuper["a" /* default */])(Core_SetContactPropertyBlock);

  function Core_SetContactPropertyBlock() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, Core_SetContactPropertyBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "flow", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "showSemanticLabel", false);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "isEditable", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "handleBranchingTypeChangedToUnified", void 0);

    return _this;
  }

  return Core_SetContactPropertyBlock;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([builderVuexNamespace.Getter], Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock.prototype, "isEditable", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock.prototype, "handleBranchingTypeChangedToUnified", void 0);

Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    BlockNameEditor: NameEditor["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    BlockId: BlockId["a" /* default */],
    ContactPropertyEditor: block_editors_ContactPropertyEditor,
    Categorization: Categorization["a" /* default */],
    BlockOutputBranchingConfig: BlockOutputBranchingConfig["c" /* default */]
  }
})], Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock);
/* harmony default export */ var Core_SetContactPropertyBlockvue_type_script_lang_ts_ = (Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock);
var install = Object(builder["d" /* createDefaultBlockTypeInstallerFor */])(BLOCK_TYPE, Core_SetContactPropertyStore);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_SetContactPropertyBlock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_types_Core_SetContactPropertyBlockvue_type_script_lang_ts_ = (Core_SetContactPropertyBlockvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_SetContactPropertyBlock.vue





/* normalize component */

var Core_SetContactPropertyBlock_component = Object(componentNormalizer["a" /* default */])(
  block_types_Core_SetContactPropertyBlockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_types_Core_SetContactPropertyBlock = __webpack_exports__["default"] = (Core_SetContactPropertyBlock_component.exports);

/***/ })

}]);
//# sourceMappingURL=flow-builder.umd.14.js.map