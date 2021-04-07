((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[14],{

/***/ "64bb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"48ce26ce-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/MobilePrimitives_OpenResponseBlock.vue?vue&type=template&id=1926e054&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h3',{staticClass:"no-room-above"},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.edit-block-type',{block_type: _vm.trans(("flow-builder." + (_vm.block.type)))}))+" ")]),_c('fieldset',{attrs:{"disabled":!_vm.isEditable}},[_c('block-name-editor',{attrs:{"block":_vm.block}}),_c('block-label-editor',{attrs:{"block":_vm.block}}),_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}),_c('block-max-duration-seconds-editor',{attrs:{"block":_vm.block,"hasIvr":_vm.hasVoiceMode},on:{"commitMaxDurationChange":_vm.setMaxDurationSeconds}}),_c('block-max-response-characters-editor',{attrs:{"block":_vm.block,"hasText":_vm.hasTextMode},on:{"commitMaxResponseCharactersChange":_vm.setMaxResponseCharacters}}),(_vm.promptResource)?_c('resource-editor',{attrs:{"resource":_vm.promptResource,"block":_vm.block,"flow":_vm.flow}}):_vm._e(),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}})],1),_c('block-id',{attrs:{"block":_vm.block}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_OpenResponseBlock.vue?vue&type=template&id=1926e054&

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

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__("60a3");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/domain/IdGeneratorUuidV4.js
var IdGeneratorUuidV4 = __webpack_require__("31aa");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// CONCATENATED MODULE: ./src/store/flow/block-types/MobilePrimitives_OpenResponseBlockStore.ts




var BLOCK_TYPE = 'MobilePrimitives\\OpenResponse';
var getters = {};
var mutations = {};
var actions = {
  setMaxDurationSeconds: function setMaxDurationSeconds(_ref, newDuration) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var commit, rootGetters, activeBlock;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit, rootGetters = _ref.rootGetters;
              activeBlock = rootGetters['builder/activeBlock'];
              commit('flow/block_updateConfigByKey', {
                blockId: activeBlock.uuid,
                key: 'ivr',
                value: {
                  maxDurationSeconds: newDuration
                }
              }, {
                root: true
              });
              return _context.abrupt("return", newDuration);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  setMaxResponseCharacters: function setMaxResponseCharacters(_ref2, newLength) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var commit, rootGetters, activeBlock, value;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit, rootGetters = _ref2.rootGetters;
              activeBlock = rootGetters['builder/activeBlock'];
              value = {
                maxResponseCharacters: newLength
              };
              commit('flow/block_updateConfigByKey', {
                blockId: activeBlock.uuid,
                key: 'text',
                value: value
              }, {
                root: true
              });
              return _context2.abrupt("return", value);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  createWith: function createWith(_ref3, _ref4) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var rootGetters, dispatch, commit, props, exits, blankResource;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              rootGetters = _ref3.rootGetters, dispatch = _ref3.dispatch, commit = _ref3.commit;
              props = _ref4.props;
              _context3.next = 4;
              return dispatch('flow/block_createBlockDefaultExitWith', {
                props: {
                  uuid: new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate(),
                  tag: 'Default',
                  label: 'Default'
                }
              }, {
                root: true
              });

            case 4:
              _context3.t0 = _context3.sent;
              _context3.next = 7;
              return dispatch('flow/block_createBlockExitWith', {
                props: {
                  uuid: new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate(),
                  tag: 'Error',
                  label: 'Error'
                }
              }, {
                root: true
              });

            case 7:
              _context3.t1 = _context3.sent;
              exits = [_context3.t0, _context3.t1];
              _context3.next = 11;
              return dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {
                root: true
              });

            case 11:
              blankResource = _context3.sent;
              commit('flow/resource_add', {
                resource: blankResource
              }, {
                root: true
              });
              return _context3.abrupt("return", Object(lodash["defaults"])(props, {
                type: BLOCK_TYPE,
                name: '',
                label: '',
                semanticLabel: '',
                exits: exits,
                config: {
                  prompt: blankResource.uuid
                }
              }));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
};
/* harmony default export */ var MobilePrimitives_OpenResponseBlockStore = ({
  namespaced: true,
  getters: getters,
  mutations: mutations,
  actions: actions
});
// EXTERNAL MODULE: ./src/lib/filters/lang.js
var lang = __webpack_require__("3a37");

// EXTERNAL MODULE: ./src/store/builder/index.ts + 6 modules
var builder = __webpack_require__("af98");

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"48ce26ce-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MaxDurationSecondsEditor.vue?vue&type=template&id=11af4e2c&
var MaxDurationSecondsEditorvue_type_template_id_11af4e2c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.hasIvr)?_c('div',{staticClass:"form-group block-max-duration-seconds"},[_c('numeric-editor',{attrs:{"regex-numeric-filtering":'[0-9]',"label":_vm._f("trans")('flow-builder.max-duration-in-seconds'),"placeholder":_vm._f("trans")('flow-builder.enter-value')},model:{value:(_vm.duration),callback:function ($$v) {_vm.duration=_vm._n($$v)},expression:"duration"}})],1):_vm._e()}
var MaxDurationSecondsEditorvue_type_template_id_11af4e2c_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaxDurationSecondsEditor.vue?vue&type=template&id=11af4e2c&

// EXTERNAL MODULE: ./src/components/common/NumericEditor.vue + 4 modules
var NumericEditor = __webpack_require__("2f00");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MaxDurationSecondsEditor.vue?vue&type=script&lang=js&
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



/* harmony default export */ var MaxDurationSecondsEditorvue_type_script_lang_js_ = ({
  components: {
    NumericEditor: NumericEditor["a" /* default */]
  },
  mixins: [lang["a" /* default */]],
  props: {
    hasIvr: {
      default: true,
      type: Boolean
    },
    block: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      defaultMaxDuration: 0
    };
  },
  computed: {
    duration: {
      get: function get() {
        return Object(lodash["get"])(this.block, 'config.ivr.maxDurationSeconds', '');
      },
      set: function set(value) {
        this.$emit('commitMaxDurationChange', value);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaxDurationSecondsEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var block_editors_MaxDurationSecondsEditorvue_type_script_lang_js_ = (MaxDurationSecondsEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaxDurationSecondsEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_MaxDurationSecondsEditorvue_type_script_lang_js_,
  MaxDurationSecondsEditorvue_type_template_id_11af4e2c_render,
  MaxDurationSecondsEditorvue_type_template_id_11af4e2c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MaxDurationSecondsEditor = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"48ce26ce-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MaxResponseCharactersEditor.vue?vue&type=template&id=22ae1660&
var MaxResponseCharactersEditorvue_type_template_id_22ae1660_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.hasText)?_c('div',{staticClass:"form-group block-max-response-characters"},[_c('numeric-editor',{attrs:{"regex-numeric-filtering":'[0-9]',"label":_vm._f("trans")('flow-builder.max-response-characters'),"placeholder":_vm._f("trans")('flow-builder.enter-value')},model:{value:(_vm.maxResponse),callback:function ($$v) {_vm.maxResponse=_vm._n($$v)},expression:"maxResponse"}}),_c('small',{staticClass:"text-muted"},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.unlimited-if-not-defined-or-set-as-zero'))+" ")])],1):_vm._e()}
var MaxResponseCharactersEditorvue_type_template_id_22ae1660_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaxResponseCharactersEditor.vue?vue&type=template&id=22ae1660&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MaxResponseCharactersEditor.vue?vue&type=script&lang=js&
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



/* harmony default export */ var MaxResponseCharactersEditorvue_type_script_lang_js_ = ({
  components: {
    NumericEditor: NumericEditor["a" /* default */]
  },
  mixins: [lang["a" /* default */]],
  props: {
    hasText: {
      default: true,
      type: Boolean
    },
    block: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      defaultMaxLength: 0
    };
  },
  computed: {
    maxResponse: {
      get: function get() {
        return Object(lodash["get"])(this.block, 'config.text.maxResponseCharacters', '');
      },
      set: function set(value) {
        this.$emit('commitMaxResponseCharactersChange', value);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaxResponseCharactersEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var block_editors_MaxResponseCharactersEditorvue_type_script_lang_js_ = (MaxResponseCharactersEditorvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaxResponseCharactersEditor.vue





/* normalize component */

var MaxResponseCharactersEditor_component = Object(componentNormalizer["a" /* default */])(
  block_editors_MaxResponseCharactersEditorvue_type_script_lang_js_,
  MaxResponseCharactersEditorvue_type_template_id_22ae1660_render,
  MaxResponseCharactersEditorvue_type_template_id_22ae1660_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MaxResponseCharactersEditor = (MaxResponseCharactersEditor_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/MobilePrimitives_OpenResponseBlock.vue?vue&type=script&lang=ts&



















var flowVuexNamespace = Object(lib["c" /* namespace */])('flow');
var blockVuexNamespace = Object(lib["c" /* namespace */])("flow/".concat(BLOCK_TYPE));
var builderVuexNamespace = Object(lib["c" /* namespace */])('builder');

var MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_MobilePrimitives_OpenResponseBlock = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(MobilePrimitives_OpenResponseBlock, _Vue);

  var _super = Object(createSuper["a" /* default */])(MobilePrimitives_OpenResponseBlock);

  function MobilePrimitives_OpenResponseBlock() {
    Object(classCallCheck["a" /* default */])(this, MobilePrimitives_OpenResponseBlock);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(MobilePrimitives_OpenResponseBlock, [{
    key: "promptResource",
    get: function get() {
      return this.resourcesByUuid[this.block.config.prompt];
    }
  }]);

  return MobilePrimitives_OpenResponseBlock;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["a" /* __decorate */])([Object(vue_property_decorator["b" /* Prop */])()], MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_MobilePrimitives_OpenResponseBlock.prototype, "block", void 0);

Object(tslib_es6["a" /* __decorate */])([Object(vue_property_decorator["b" /* Prop */])()], MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_MobilePrimitives_OpenResponseBlock.prototype, "flow", void 0);

Object(tslib_es6["a" /* __decorate */])([flowVuexNamespace.Getter], MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_MobilePrimitives_OpenResponseBlock.prototype, "resourcesByUuid", void 0);

Object(tslib_es6["a" /* __decorate */])([flowVuexNamespace.Getter], MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_MobilePrimitives_OpenResponseBlock.prototype, "hasTextMode", void 0);

Object(tslib_es6["a" /* __decorate */])([flowVuexNamespace.Getter], MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_MobilePrimitives_OpenResponseBlock.prototype, "hasVoiceMode", void 0);

Object(tslib_es6["a" /* __decorate */])([blockVuexNamespace.Action], MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_MobilePrimitives_OpenResponseBlock.prototype, "setMaxDurationSeconds", void 0);

Object(tslib_es6["a" /* __decorate */])([blockVuexNamespace.Action], MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_MobilePrimitives_OpenResponseBlock.prototype, "setMaxResponseCharacters", void 0);

Object(tslib_es6["a" /* __decorate */])([builderVuexNamespace.Getter], MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_MobilePrimitives_OpenResponseBlock.prototype, "isEditable", void 0);

MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_MobilePrimitives_OpenResponseBlock = Object(tslib_es6["a" /* __decorate */])([Object(vue_property_decorator["a" /* Component */])({
  components: {
    ResourceEditor: ResourceEditor["a" /* default */],
    BlockNameEditor: NameEditor["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    BlockId: BlockId["a" /* default */],
    BlockMaxDurationSecondsEditor: MaxDurationSecondsEditor,
    BlockMaxResponseCharactersEditor: MaxResponseCharactersEditor
  },
  mixins: [lang["a" /* default */]]
})], MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_MobilePrimitives_OpenResponseBlock);
/* harmony default export */ var MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_ = (MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_MobilePrimitives_OpenResponseBlock);
var install = Object(builder["c" /* createDefaultBlockTypeInstallerFor */])(BLOCK_TYPE, MobilePrimitives_OpenResponseBlockStore);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_OpenResponseBlock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_types_MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_ = (MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_OpenResponseBlock.vue





/* normalize component */

var MobilePrimitives_OpenResponseBlock_component = Object(componentNormalizer["a" /* default */])(
  block_types_MobilePrimitives_OpenResponseBlockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_types_MobilePrimitives_OpenResponseBlock = __webpack_exports__["default"] = (MobilePrimitives_OpenResponseBlock_component.exports);

/***/ })

}]);
//# sourceMappingURL=flow-builder.common.14.js.map