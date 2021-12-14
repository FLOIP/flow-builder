((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[11],{

/***/ "84d1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d80eb91e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_SetContactPropertyBlock.vue?vue&type=template&id=2636f8bc&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"core-set-contact-property-block"},[_c('base-block',{attrs:{"block":_vm.block,"flow":_vm.flow,"showSemanticLabel":false,"usesDefaultContactPropsEditor":false},on:{"handleBranchingTypeChangedToUnified":function($event){return _vm.handleBranchingTypeChangedToUnified({block: _vm.block})}}},[_c('template',{slot:"extras"},[_c('contact-property-editor',{attrs:{"block":_vm.block}})],1)],2)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_SetContactPropertyBlock.vue?vue&type=template&id=2636f8bc&

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

// EXTERNAL MODULE: ./src/components/interaction-designer/block-types/BaseBlock.vue + 4 modules
var BaseBlock = __webpack_require__("3ef7");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/index.js + 14 modules
var vue_property_decorator_lib = __webpack_require__("1b40");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d80eb91e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/ContactPropertyEditor.vue?vue&type=template&id=46de0de2&
var ContactPropertyEditorvue_type_template_id_46de0de2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"contact-property-editor"},[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"text-primary"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.action-label')))]),_c('p',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.contact-property-action-hint')))]),_c('div',{staticClass:"form-group"},[_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.propertyAction),expression:"propertyAction"}],staticClass:"custom-control-input",attrs:{"id":"setProp","type":"radio","name":"contactPropAction"},domProps:{"value":_vm.PROPERTY_ACTION.SET,"checked":_vm._q(_vm.propertyAction,_vm.PROPERTY_ACTION.SET)},on:{"change":function($event){_vm.propertyAction=_vm.PROPERTY_ACTION.SET}}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"setProp"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.set-contact-property'))+" ")])]),_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.propertyAction),expression:"propertyAction"}],staticClass:"custom-control-input",attrs:{"id":"clearProp","type":"radio","name":"contactPropAction"},domProps:{"value":_vm.PROPERTY_ACTION.CLEAR,"checked":_vm._q(_vm.propertyAction,_vm.PROPERTY_ACTION.CLEAR)},on:{"change":function($event){_vm.propertyAction=_vm.PROPERTY_ACTION.CLEAR}}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"clearProp"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.clear-contact-property'))+" ")])])]),_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/set_contact_property/property_key")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-contact-property-key"},[_c('text-editor',{attrs:{"label":_vm._f("trans")('flow-builder.contact-property-label'),"label-class":'font-weight-bold',"placeholder":_vm._f("trans")('flow-builder.enter-contact-property-label'),"valid-state":isValid},model:{value:(_vm.propertyKey),callback:function ($$v) {_vm.propertyKey=$$v},expression:"propertyKey"}})],1)]}}])}),(_vm.propertyAction === _vm.PROPERTY_ACTION.SET)?_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/set_contact_property/property_value")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('expression-input',{attrs:{"label":_vm._f("trans")('flow-builder.value-expression'),"placeholder":_vm._f("trans")('flow-builder.enter-expression'),"label-class":'font-weight-bold',"current-expression":_vm.propertyValue,"valid-state":isValid},on:{"commitExpressionChange":_vm.updatePropertyValue}})]}}],null,false,3462627979)}):_vm._e()],1)])}
var ContactPropertyEditorvue_type_template_id_46de0de2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/ContactPropertyEditor.vue?vue&type=template&id=46de0de2&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("e954");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// EXTERNAL MODULE: ./src/components/common/ExpressionInput.vue + 5 modules
var ExpressionInput = __webpack_require__("6faa");

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
    ExpressionInput: ExpressionInput["a" /* default */]
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
  ContactPropertyEditorvue_type_template_id_46de0de2_render,
  ContactPropertyEditorvue_type_template_id_46de0de2_staticRenderFns,
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

// EXTERNAL MODULE: ./src/store/flow/block-types/BaseBlock.ts
var block_types_BaseBlock = __webpack_require__("2680");

// CONCATENATED MODULE: ./src/store/flow/block-types/Core_SetContactPropertyStore.ts





var BLOCK_TYPE = 'Core.SetContactProperty';
var baseActions = Object(lodash["cloneDeep"])(block_types_BaseBlock["a" /* default */].actions);
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
              props.type = BLOCK_TYPE;
              props.config = {
                set_contact_property: {
                  property_key: '',
                  property_value: ''
                }
              };
              _context.t0 = dispatch;
              _context.next = 7;
              return new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate();

            case 7:
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
              _context.next = 13;
              return (0, _context.t0)('flow/block_createBlockDefaultExitWith', _context.t3, _context.t4);

            case 13:
              _context.t5 = _context.sent;
              exits = [_context.t5];
              props.exits = exits; //TODO - fix this
              // @ts-ignore

              _context.next = 18;
              return baseActions.createWith({
                dispatch: dispatch
              }, {
                props: props
              });

            case 18:
              return _context.abrupt("return", _context.sent);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};
var Core_SetContactPropertyStore = Object(lodash["cloneDeep"])(block_types_BaseBlock["a" /* default */]);
Core_SetContactPropertyStore.actions.createWith = actions.createWith;
/* harmony default export */ var block_types_Core_SetContactPropertyStore = (Core_SetContactPropertyStore);
// EXTERNAL MODULE: ./src/store/builder/index.ts
var builder = __webpack_require__("af98");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_SetContactPropertyBlock.vue?vue&type=script&lang=ts&















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

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "handleBranchingTypeChangedToUnified", void 0);

    return _this;
  }

  return Core_SetContactPropertyBlock;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock.prototype, "handleBranchingTypeChangedToUnified", void 0);

Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    ContactPropertyEditor: block_editors_ContactPropertyEditor,
    BaseBlock: BaseBlock["default"]
  }
})], Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock);
/* harmony default export */ var Core_SetContactPropertyBlockvue_type_script_lang_ts_ = (Core_SetContactPropertyBlockvue_type_script_lang_ts_Core_SetContactPropertyBlock);
var install = Object(builder["d" /* createDefaultBlockTypeInstallerFor */])(BLOCK_TYPE, block_types_Core_SetContactPropertyStore);
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
//# sourceMappingURL=flow-builder.common.11.js.map