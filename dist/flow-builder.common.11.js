((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[11],{

/***/ "b6b9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1fb466d0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue?vue&type=template&id=7025d864&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"console-io-read-block"},[_c('h3',{staticClass:"block-editor-header"},[_vm._v(" "+_vm._s(_vm._f("trans")(("flow-builder." + (_vm.block.type))))+" ")]),_c('fieldset',{attrs:{"disabled":!_vm.isEditable}},[_c('block-label-editor',{attrs:{"block":_vm.block},on:{"gearClicked":function($event){_vm.showSemanticLabel = !_vm.showSemanticLabel}}}),(_vm.showSemanticLabel)?_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}):_vm._e(),_c('block-name-editor',{attrs:{"block":_vm.block}}),_vm._t("extras"),_c('hr'),_c('block-format-string-editor',{attrs:{"block":_vm.block},on:{"commitFormatStringChange":_vm.setFormatString}}),_c('div',[_c('h6',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.destination-variable')))]),_vm._l((_vm.destinationVariablesFields),function(variableStringFormat,i){return _c('div',{key:i,staticClass:"form-group"},[_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/destination_variables/" + i)},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('text-editor',{attrs:{"label":'',"placeholder":_vm._f("trans")('flow-builder.destination-variable-placeholder'),"valid-state":isValid,"value":""},on:{"keydown":_vm.filterVariableName,"input":function($event){return _vm.updatedestinationVariables($event, i)}}})]}}],null,true)})],1)})],2),_c('hr'),_c('block-output-branching-config',{attrs:{"block":_vm.block,"has-exit-per-choice":false},on:{"branchingTypeChangedToUnified":function($event){return _vm.handleBranchingTypeChangedToUnified({block: _vm.block})}}}),_c('categorization',{attrs:{"block":_vm.block}}),_c('generic-contact-property-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}})],2),_c('block-id',{attrs:{"block":_vm.block}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue?vue&type=template&id=7025d864&

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

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/index.js + 14 modules
var vue_property_decorator_lib = __webpack_require__("1b40");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("c964");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/domain/IdGeneratorUuidV4.js
var IdGeneratorUuidV4 = __webpack_require__("31aa");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// CONCATENATED MODULE: ./src/store/flow/block-types/ConsoleIO_ReadBlockStore.ts




var BLOCK_TYPE = 'ConsoleIO.Read';
var getters = {
  destinationVariablesFields: function destinationVariablesFields(state, _getters, _rootState, rootGetters) {
    var activeBlock = rootGetters['builder/activeBlock']; // TODO: correct the destination variables array according to scanf library we're using, and think about consecutive % or other error we should avoid

    return new Array(Object(lodash["split"])(activeBlock.config.format_string || '', '%').length - 1);
  }
};
var mutations = {};
var actions = {
  setFormatString: function setFormatString(_ref, newFormatString) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var commit, rootGetters, activeBlock, newConfig;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit, rootGetters = _ref.rootGetters;
              activeBlock = rootGetters['builder/activeBlock'];
              newConfig = {
                format_string: newFormatString
              };
              commit('flow/block_updateConfigByKey', {
                blockId: activeBlock.uuid,
                key: 'format_string',
                value: newFormatString
              }, {
                root: true
              });
              return _context.abrupt("return", newConfig);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  editDestinationVariable: function editDestinationVariable(_ref2, _ref3) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var commit, rootGetters, variableName, keyIndex, activeBlock, newDestinationVariables;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit, rootGetters = _ref2.rootGetters;
              variableName = _ref3.variableName, keyIndex = _ref3.keyIndex;
              activeBlock = rootGetters['builder/activeBlock'];
              newDestinationVariables = activeBlock.config.destination_variables || [];
              newDestinationVariables[keyIndex] = variableName;
              commit('flow/block_updateConfigByKey', {
                blockId: activeBlock.uuid,
                key: 'destination_variables',
                value: newDestinationVariables
              }, {
                root: true
              });
              return _context2.abrupt("return", newDestinationVariables);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  createWith: function createWith(_ref4, _ref5) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var dispatch, props, exits;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch = _ref4.dispatch;
              props = _ref5.props;
              _context3.t0 = dispatch;
              _context3.next = 5;
              return new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate();

            case 5:
              _context3.t1 = _context3.sent;
              _context3.t2 = {
                uuid: _context3.t1
              };
              _context3.t3 = {
                props: _context3.t2
              };
              _context3.t4 = {
                root: true
              };
              _context3.next = 11;
              return (0, _context3.t0)('flow/block_createBlockDefaultExitWith', _context3.t3, _context3.t4);

            case 11:
              _context3.t5 = _context3.sent;
              exits = [_context3.t5];
              return _context3.abrupt("return", Object(lodash["defaultsDeep"])(props, {
                type: BLOCK_TYPE,
                name: '',
                label: '',
                semantic_label: '',
                config: {
                  format_string: '',
                  destination_variables: []
                },
                exits: exits,
                tags: [],
                vendor_metadata: {}
              }));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  handleBranchingTypeChangedToUnified: function handleBranchingTypeChangedToUnified(_ref6, _ref7) {
    var dispatch = _ref6.dispatch;
    var block = _ref7.block;
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'block.value = true'
    }, {
      root: true
    });
  }
};
/* harmony default export */ var ConsoleIO_ReadBlockStore = ({
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

// EXTERNAL MODULE: ./src/components/common/ValidationMessage.vue + 5 modules
var ValidationMessage = __webpack_require__("21e9");

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1fb466d0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/FormatStringEditor.vue?vue&type=template&id=6a186454&
var FormatStringEditorvue_type_template_id_6a186454_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/format_string")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-format-string"},[_c('text-editor',{attrs:{"label":_vm._f("trans")('flow-builder.format-string'),"placeholder":_vm._f("trans")('flow-builder.enter-format-string'),"valid-state":isValid},model:{value:(_vm.formatString),callback:function ($$v) {_vm.formatString=$$v},expression:"formatString"}}),_c('small',{staticClass:"text-muted"},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.format-string-hint'))+" ")])],1)]}}])})}
var FormatStringEditorvue_type_template_id_6a186454_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/FormatStringEditor.vue?vue&type=template&id=6a186454&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/FormatStringEditor.vue?vue&type=script&lang=js&
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */



/* harmony default export */ var FormatStringEditorvue_type_script_lang_js_ = ({
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
    formatString: {
      get: function get() {
        return this.block.config.format_string;
      },
      set: function set(value) {
        this.$emit('commitFormatStringChange', value);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/FormatStringEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var block_editors_FormatStringEditorvue_type_script_lang_js_ = (FormatStringEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/FormatStringEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_FormatStringEditorvue_type_script_lang_js_,
  FormatStringEditorvue_type_template_id_6a186454_render,
  FormatStringEditorvue_type_template_id_6a186454_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FormatStringEditor = (component.exports);
// EXTERNAL MODULE: ./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue + 4 modules
var FirstBlockEditorButton = __webpack_require__("192b");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/BlockId.vue + 4 modules
var BlockId = __webpack_require__("792f");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue + 4 modules
var GenericContactPropertyEditor = __webpack_require__("b4ec");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue?vue&type=script&lang=ts&




























var blockVuexNamespace = Object(lib["e" /* namespace */])("flow/".concat(BLOCK_TYPE));
var builderVuexNamespace = Object(lib["e" /* namespace */])('builder');

var ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(ConsoleIO_ReadBlock, _mixins);

  var _super = Object(createSuper["a" /* default */])(ConsoleIO_ReadBlock);

  function ConsoleIO_ReadBlock() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ConsoleIO_ReadBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "showSemanticLabel", false);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "handleBranchingTypeChangedToUnified", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(ConsoleIO_ReadBlock, [{
    key: "filterVariableName",
    value: function filterVariableName(e) {
      if (e.key.match(/\W+|Enter/g)) {
        e.preventDefault();
      }
    }
  }, {
    key: "updatedestinationVariables",
    value: function updatedestinationVariables(value, i) {
      this.editDestinationVariable({
        variableName: value,
        keyIndex: i
      });
    }
  }]);

  return ConsoleIO_ReadBlock;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock.prototype, "setFormatString", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock.prototype, "editDestinationVariable", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Getter], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock.prototype, "destinationVariablesFields", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock.prototype, "handleBranchingTypeChangedToUnified", void 0);

Object(tslib_es6["__decorate"])([builderVuexNamespace.Getter], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock.prototype, "isEditable", void 0);

ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    GenericContactPropertyEditor: GenericContactPropertyEditor["a" /* default */],
    ResourceEditor: ResourceEditor["a" /* default */],
    BlockNameEditor: NameEditor["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    BlockFormatStringEditor: FormatStringEditor,
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    TextEditor: TextEditor["a" /* default */],
    BlockId: BlockId["a" /* default */],
    ValidationMessage: ValidationMessage["a" /* default */],
    Categorization: Categorization["a" /* default */],
    BlockOutputBranchingConfig: BlockOutputBranchingConfig["c" /* default */]
  }
})], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock);
/* harmony default export */ var ConsoleIO_ReadBlockvue_type_script_lang_ts_ = (ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock);
var install = Object(builder["d" /* createDefaultBlockTypeInstallerFor */])(BLOCK_TYPE, ConsoleIO_ReadBlockStore);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_types_ConsoleIO_ReadBlockvue_type_script_lang_ts_ = (ConsoleIO_ReadBlockvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue





/* normalize component */

var ConsoleIO_ReadBlock_component = Object(componentNormalizer["a" /* default */])(
  block_types_ConsoleIO_ReadBlockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_types_ConsoleIO_ReadBlock = __webpack_exports__["default"] = (ConsoleIO_ReadBlock_component.exports);

/***/ })

}]);
//# sourceMappingURL=flow-builder.common.11.js.map