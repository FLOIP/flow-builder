((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[5],{

/***/ "02b5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4ad08327-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue?vue&type=template&id=a6f27c2c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"core-set-group-membership-block"},[_c('h3',{staticClass:"no-room-above"},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.edit-block-type',{block_type: _vm.trans(("flow-builder." + (_vm.block.type)))}))+" ")]),_c('fieldset',{attrs:{"disabled":!_vm.isEditable}},[_c('block-name-editor',{attrs:{"block":_vm.block}}),_c('block-label-editor',{attrs:{"block":_vm.block}}),_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}),_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/is_member")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"form-group"},[_c('label',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.action-label')))]),_c('vue-multiselect',{class:{invalid: isValid === false},attrs:{"track-by":"id","label":"name","placeholder":_vm._f("trans")('flow-builder.action-placeholder'),"options":_vm.actionsList,"allow-empty":true,"show-labels":false,"searchable":false},model:{value:(_vm.selectedAction),callback:function ($$v) {_vm.selectedAction=$$v},expression:"selectedAction"}})],1)]}}])}),_c('group-selector',{attrs:{"block":_vm.block}}),_vm._t("extras"),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}})],2),_c('block-id',{attrs:{"block":_vm.block}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue?vue&type=template&id=a6f27c2c&scoped=true&

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4ad08327-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/GroupSelector.vue?vue&type=template&id=37746fd0&scoped=true&
var GroupSelectorvue_type_template_id_37746fd0_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/group_key")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-group"},[_c('label',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.group-label')))]),_c('vue-multiselect',{class:{invalid: isValid === false},attrs:{"track-by":"id","label":"name","placeholder":_vm._f("trans")('flow-builder.group-selector-placeholder'),"options":_vm.groups,"allow-empty":false,"show-labels":false,"searchable":true},model:{value:(_vm.selectedGroup),callback:function ($$v) {_vm.selectedGroup=$$v},expression:"selectedGroup"}})],1)]}}])})}
var GroupSelectorvue_type_template_id_37746fd0_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupSelector.vue?vue&type=template&id=37746fd0&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/vue-multiselect/dist/vue-multiselect.min.js
var vue_multiselect_min = __webpack_require__("8e5f");
var vue_multiselect_min_default = /*#__PURE__*/__webpack_require__.n(vue_multiselect_min);

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// EXTERNAL MODULE: ./src/components/common/ValidationMessage.vue + 5 modules
var ValidationMessage = __webpack_require__("21e9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/GroupSelector.vue?vue&type=script&lang=ts&
















var flowVuexNamespace = Object(lib["e" /* namespace */])('flow');

var GroupSelectorvue_type_script_lang_ts_GroupSelector = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(GroupSelector, _mixins);

  var _super = Object(createSuper["a" /* default */])(GroupSelector);

  function GroupSelector() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, GroupSelector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block_updateConfigByPath", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "groups", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(GroupSelector, [{
    key: "selectedGroup",
    get: function get() {
      var group_key = this.block.config.group_key;

      if (!group_key) {
        return {};
      }

      var groupOption = Object(lodash["find"])(this.groups, {
        id: group_key
      });

      if (groupOption) {
        return groupOption;
      } else {
        return {};
      }
    },
    set: function set(value) {
      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'group_key',
        value: value.id
      });
      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'group_name',
        value: value.name
      });
    }
  }]);

  return GroupSelector;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], GroupSelectorvue_type_script_lang_ts_GroupSelector.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Mutation], GroupSelectorvue_type_script_lang_ts_GroupSelector.prototype, "block_updateConfigByPath", void 0);

Object(tslib_es6["__decorate"])([lib["b" /* Getter */]], GroupSelectorvue_type_script_lang_ts_GroupSelector.prototype, "groups", void 0);

GroupSelectorvue_type_script_lang_ts_GroupSelector = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    VueMultiselect: vue_multiselect_min_default.a,
    ValidationMessage: ValidationMessage["a" /* default */]
  }
})], GroupSelectorvue_type_script_lang_ts_GroupSelector);
/* harmony default export */ var GroupSelectorvue_type_script_lang_ts_ = (GroupSelectorvue_type_script_lang_ts_GroupSelector);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupSelector.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_GroupSelectorvue_type_script_lang_ts_ = (GroupSelectorvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/GroupSelector.vue?vue&type=style&index=0&id=37746fd0&lang=css&scoped=true&
var GroupSelectorvue_type_style_index_0_id_37746fd0_lang_css_scoped_true_ = __webpack_require__("0601");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupSelector.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_GroupSelectorvue_type_script_lang_ts_,
  GroupSelectorvue_type_template_id_37746fd0_scoped_true_render,
  GroupSelectorvue_type_template_id_37746fd0_scoped_true_staticRenderFns,
  false,
  null,
  "37746fd0",
  null
  
)

/* harmony default export */ var block_editors_GroupSelector = (component.exports);
// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("c964");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/domain/IdGeneratorUuidV4.js
var IdGeneratorUuidV4 = __webpack_require__("31aa");

// CONCATENATED MODULE: ./src/store/flow/block-types/Core_SetGroupMembershipStore.ts




var ADD_KEY = 'add';
var REMOVE_KEY = 'remove';
var BLOCK_TYPE = 'Core.SetGroupMembership';
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
                uuid: _context.t1,
                tag: 'Default',
                label: 'Default'
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
                  group_key: '',
                  group_name: '',
                  is_member: null
                },
                exits: exits
              }));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  setIsMember: function setIsMember(_ref3, action) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var commit, rootGetters, activeBlock, isMember;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref3.commit, rootGetters = _ref3.rootGetters;
              activeBlock = rootGetters['builder/activeBlock'];
              isMember = false;

              if (action) {
                isMember = action.id === ADD_KEY;
              }

              commit('flow/block_updateConfigByPath', {
                blockId: activeBlock.uuid,
                path: 'is_member',
                value: isMember
              }, {
                root: true
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
/* harmony default export */ var Core_SetGroupMembershipStore = ({
  namespaced: true,
  getters: getters,
  mutations: mutations,
  actions: actions
});
// EXTERNAL MODULE: ./src/store/builder/index.ts
var builder = __webpack_require__("af98");

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue?vue&type=script&lang=ts&























var blockVuexNamespace = Object(lib["e" /* namespace */])("flow/".concat(BLOCK_TYPE));
var Core_SetGroupMembershipBlockvue_type_script_lang_ts_flowVuexNamespace = Object(lib["e" /* namespace */])('flow');
var builderVuexNamespace = Object(lib["e" /* namespace */])('builder');

var Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(Core_SetGroupMembershipBlock, _mixins);

  var _super = Object(createSuper["a" /* default */])(Core_SetGroupMembershipBlock);

  function Core_SetGroupMembershipBlock() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, Core_SetGroupMembershipBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "flow", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "actionsList", [{
      id: ADD_KEY,
      name: _this.trans('flow-builder.add')
    }, {
      id: REMOVE_KEY,
      name: _this.trans('flow-builder.remove')
    }]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "setIsMember", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "isEditable", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block_updateConfigByPath", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(Core_SetGroupMembershipBlock, [{
    key: "selectedAction",
    get: function get() {
      var is_member = this.block.config.is_member;

      if (!is_member) {
        return Object(lodash["find"])(this.actionsList, {
          id: REMOVE_KEY
        }) || {};
      }

      if (is_member) {
        return Object(lodash["find"])(this.actionsList, {
          id: ADD_KEY
        }) || {};
      }

      return {};
    },
    set: function set(action) {
      this.setIsMember(action);
    }
  }]);

  return Core_SetGroupMembershipBlock;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock.prototype, "setIsMember", void 0);

Object(tslib_es6["__decorate"])([builderVuexNamespace.Getter], Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock.prototype, "isEditable", void 0);

Object(tslib_es6["__decorate"])([Core_SetGroupMembershipBlockvue_type_script_lang_ts_flowVuexNamespace.Mutation], Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock.prototype, "block_updateConfigByPath", void 0);

Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    BlockNameEditor: NameEditor["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    BlockId: BlockId["a" /* default */],
    GroupSelector: block_editors_GroupSelector,
    VueMultiselect: vue_multiselect_min_default.a,
    ValidationMessage: ValidationMessage["a" /* default */]
  }
})], Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock);
/* harmony default export */ var Core_SetGroupMembershipBlockvue_type_script_lang_ts_ = (Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock);
var install = Object(builder["c" /* createDefaultBlockTypeInstallerFor */])(BLOCK_TYPE, Core_SetGroupMembershipStore);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_types_Core_SetGroupMembershipBlockvue_type_script_lang_ts_ = (Core_SetGroupMembershipBlockvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue?vue&type=style&index=0&id=a6f27c2c&lang=css&scoped=true&
var Core_SetGroupMembershipBlockvue_type_style_index_0_id_a6f27c2c_lang_css_scoped_true_ = __webpack_require__("2eb4");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue






/* normalize component */

var Core_SetGroupMembershipBlock_component = Object(componentNormalizer["a" /* default */])(
  block_types_Core_SetGroupMembershipBlockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  "a6f27c2c",
  null
  
)

/* harmony default export */ var block_types_Core_SetGroupMembershipBlock = __webpack_exports__["default"] = (Core_SetGroupMembershipBlock_component.exports);

/***/ }),

/***/ "05ff":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".invalid[data-v-a6f27c2c] .multiselect__tags{border-color:#dc3545}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "0601":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupSelector_vue_vue_type_style_index_0_id_37746fd0_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b7ec");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupSelector_vue_vue_type_style_index_0_id_37746fd0_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupSelector_vue_vue_type_style_index_0_id_37746fd0_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupSelector_vue_vue_type_style_index_0_id_37746fd0_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

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

/***/ "2119":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".invalid[data-v-37746fd0] .multiselect__tags{border-color:#dc3545}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "2eb4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Core_SetGroupMembershipBlock_vue_vue_type_style_index_0_id_a6f27c2c_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bc20");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Core_SetGroupMembershipBlock_vue_vue_type_style_index_0_id_a6f27c2c_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Core_SetGroupMembershipBlock_vue_vue_type_style_index_0_id_a6f27c2c_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Core_SetGroupMembershipBlock_vue_vue_type_style_index_0_id_a6f27c2c_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

/***/ "b7ec":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("2119");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("2d003a48", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "bc20":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("05ff");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("5ab75ac0", content, true, {"sourceMap":false,"shadowMode":false});

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
//# sourceMappingURL=flow-builder.common.5.js.map