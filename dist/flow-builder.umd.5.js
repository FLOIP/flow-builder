((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[5],{

/***/ "02b5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1fb466d0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue?vue&type=template&id=22114df1&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"core-set-group-membership-block"},[_c('h3',{staticClass:"block-editor-header"},[_vm._v(" "+_vm._s(_vm._f("trans")(("flow-builder." + (_vm.block.type))))+" ")]),_c('fieldset',{attrs:{"disabled":!_vm.isEditable}},[_c('block-label-editor',{attrs:{"block":_vm.block},on:{"gearClicked":function($event){_vm.showSemanticLabel = !_vm.showSemanticLabel}}}),(_vm.showSemanticLabel)?_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}):_vm._e(),_c('block-name-editor',{attrs:{"block":_vm.block}}),_vm._t("extras"),_c('group-membership-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('block-output-branching-config',{attrs:{"block":_vm.block,"has-exit-per-choice":false},on:{"branchingTypeChangedToUnified":function($event){return _vm.handleBranchingTypeChangedToUnified({block: _vm.block})}}}),_c('categorization',{attrs:{"block":_vm.block}}),_c('generic-contact-property-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}})],2),_c('block-id',{attrs:{"block":_vm.block}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue?vue&type=template&id=22114df1&scoped=true&

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1fb466d0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/GroupSelector.vue?vue&type=template&id=caea6292&scoped=true&
var GroupSelectorvue_type_template_id_caea6292_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/group_key")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-group"},[_c('label',{staticClass:"text-primary"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.group-label')))]),_c('vue-multiselect',{class:{invalid: isValid === false},attrs:{"track-by":"id","label":"name","placeholder":_vm._f("trans")('flow-builder.group-selector-placeholder'),"options":_vm.groups,"allow-empty":false,"show-labels":false,"searchable":true},model:{value:(_vm.selectedGroup),callback:function ($$v) {_vm.selectedGroup=$$v},expression:"selectedGroup"}})],1)]}}])})}
var GroupSelectorvue_type_template_id_caea6292_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupSelector.vue?vue&type=template&id=caea6292&scoped=true&

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
// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/GroupSelector.vue?vue&type=style&index=0&id=caea6292&lang=css&scoped=true&
var GroupSelectorvue_type_style_index_0_id_caea6292_lang_css_scoped_true_ = __webpack_require__("75ce");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupSelector.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_GroupSelectorvue_type_script_lang_ts_,
  GroupSelectorvue_type_template_id_caea6292_scoped_true_render,
  GroupSelectorvue_type_template_id_caea6292_scoped_true_staticRenderFns,
  false,
  null,
  "caea6292",
  null
  
)

/* harmony default export */ var block_editors_GroupSelector = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1fb466d0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/GroupMembershipEditor.vue?vue&type=template&id=067c4fe0&
var GroupMembershipEditorvue_type_template_id_067c4fe0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"group-membership-editor"},[_c('hr'),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"text-primary"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.action-label')))]),_c('p',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.group-membership-action-hint')))]),_c('div',{staticClass:"form-group"},[_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.membershipAction),expression:"membershipAction"}],staticClass:"custom-control-input",attrs:{"id":"addGroup","type":"radio","name":"groupMembershipAction"},domProps:{"value":_vm.MEMBERSHIP_ACTION.ADD,"checked":_vm._q(_vm.membershipAction,_vm.MEMBERSHIP_ACTION.ADD)},on:{"change":function($event){_vm.membershipAction=_vm.MEMBERSHIP_ACTION.ADD}}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"addGroup"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.set-group-membership'))+" ")])]),_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.membershipAction),expression:"membershipAction"}],staticClass:"custom-control-input",attrs:{"id":"clearGroup","type":"radio","name":"groupMembershipAction"},domProps:{"value":_vm.MEMBERSHIP_ACTION.REMOVE,"checked":_vm._q(_vm.membershipAction,_vm.MEMBERSHIP_ACTION.REMOVE)},on:{"change":function($event){_vm.membershipAction=_vm.MEMBERSHIP_ACTION.REMOVE}}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"clearGroup"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.clear-group-membership'))+" ")])]),_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.membershipAction),expression:"membershipAction"}],staticClass:"custom-control-input",attrs:{"id":"setFromExpression","type":"radio","name":"groupMembershipAction"},domProps:{"value":_vm.MEMBERSHIP_ACTION.SET_FROM_EXPRESSION,"checked":_vm._q(_vm.membershipAction,_vm.MEMBERSHIP_ACTION.SET_FROM_EXPRESSION)},on:{"change":function($event){_vm.membershipAction=_vm.MEMBERSHIP_ACTION.SET_FROM_EXPRESSION}}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"setFromExpression"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.set-group-membership-from-expression'))+" ")])])]),_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/group_key")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-group-key"},[_c('text-editor',{attrs:{"label":_vm._f("trans")('flow-builder.group-label'),"label-class":'font-weight-bold',"placeholder":_vm._f("trans")('flow-builder.enter-group-label'),"valid-state":isValid},model:{value:(_vm.groupKey),callback:function ($$v) {_vm.groupKey=$$v},expression:"groupKey"}})],1)]}}])}),(_vm.membershipAction === _vm.MEMBERSHIP_ACTION.SET_FROM_EXPRESSION)?_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/is_member")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('expression-input',{attrs:{"label":_vm._f("trans")('flow-builder.value-expression'),"placeholder":_vm._f("trans")('flow-builder.enter-expression'),"label-class":'font-weight-bold',"current-expression":_vm.isMember,"valid-state":isValid},on:{"commitExpressionChange":_vm.updateIsMemberExpression}})]}}],null,false,628814233)}):_vm._e()],1)])}
var GroupMembershipEditorvue_type_template_id_067c4fe0_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupMembershipEditor.vue?vue&type=template&id=067c4fe0&

// EXTERNAL MODULE: ./src/components/common/ExpressionInput.vue + 5 modules
var ExpressionInput = __webpack_require__("6faa");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/GroupMembershipEditor.vue?vue&type=script&lang=ts&
















var GroupMembershipEditorvue_type_script_lang_ts_flowVuexNamespace = Object(lib["e" /* namespace */])('flow');
var NULL_STRING_EXPRESSION = '@(null)';
var TRUTHY_STRING_EXPRESSION = '@(true)';
var EMPTY_STRING_EXPRESSION = '';

var GroupMembershipEditorvue_type_script_lang_ts_GroupMembershipEditor = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(GroupMembershipEditor, _mixins);

  var _super = Object(createSuper["a" /* default */])(GroupMembershipEditor);

  function GroupMembershipEditor() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, GroupMembershipEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "MEMBERSHIP_ACTION", {
      ADD: 'add',
      SET_FROM_EXPRESSION: 'set_from_expression',
      REMOVE: 'remove'
    });

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block_updateConfigByPath", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(GroupMembershipEditor, [{
    key: "membershipAction",
    get: function get() {
      if (this.isMember === NULL_STRING_EXPRESSION) {
        return this.MEMBERSHIP_ACTION.REMOVE;
      } else if (this.isMember === TRUTHY_STRING_EXPRESSION) {
        return this.MEMBERSHIP_ACTION.ADD;
      }

      return this.MEMBERSHIP_ACTION.SET_FROM_EXPRESSION;
    },
    set: function set(value) {
      if (value === this.MEMBERSHIP_ACTION.REMOVE) {
        this.updateIsMemberExpression(NULL_STRING_EXPRESSION);
      } else if (value === this.MEMBERSHIP_ACTION.ADD) {
        this.updateIsMemberExpression(TRUTHY_STRING_EXPRESSION);
      } else {
        this.updateIsMemberExpression(EMPTY_STRING_EXPRESSION);
      }
    }
  }, {
    key: "groupKey",
    get: function get() {
      return Object(lodash["get"])(this.block.config, 'group_key');
    },
    set: function set(value) {
      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'group_key',
        value: value
      });
    }
  }, {
    key: "isMember",
    get: function get() {
      return Object(lodash["get"])(this.block.config, 'is_member', EMPTY_STRING_EXPRESSION);
    }
  }, {
    key: "updateIsMemberExpression",
    value: function updateIsMemberExpression(value) {
      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'is_member',
        value: value
      });
    }
  }]);

  return GroupMembershipEditor;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], GroupMembershipEditorvue_type_script_lang_ts_GroupMembershipEditor.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([GroupMembershipEditorvue_type_script_lang_ts_flowVuexNamespace.Mutation], GroupMembershipEditorvue_type_script_lang_ts_GroupMembershipEditor.prototype, "block_updateConfigByPath", void 0);

GroupMembershipEditorvue_type_script_lang_ts_GroupMembershipEditor = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    TextEditor: TextEditor["a" /* default */],
    ExpressionInput: ExpressionInput["a" /* default */],
    ValidationMessage: ValidationMessage["a" /* default */]
  }
})], GroupMembershipEditorvue_type_script_lang_ts_GroupMembershipEditor);
/* harmony default export */ var GroupMembershipEditorvue_type_script_lang_ts_ = (GroupMembershipEditorvue_type_script_lang_ts_GroupMembershipEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupMembershipEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_GroupMembershipEditorvue_type_script_lang_ts_ = (GroupMembershipEditorvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupMembershipEditor.vue





/* normalize component */

var GroupMembershipEditor_component = Object(componentNormalizer["a" /* default */])(
  block_editors_GroupMembershipEditorvue_type_script_lang_ts_,
  GroupMembershipEditorvue_type_template_id_067c4fe0_render,
  GroupMembershipEditorvue_type_template_id_067c4fe0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_editors_GroupMembershipEditor = (GroupMembershipEditor_component.exports);
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
                  group_key: '',
                  group_name: '',
                  is_member: null
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
  },
  setIsMember: function setIsMember(_ref5, action) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var commit, rootGetters, activeBlock, isMember;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref5.commit, rootGetters = _ref5.rootGetters;
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

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue + 4 modules
var GenericContactPropertyEditor = __webpack_require__("b4ec");

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

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "showSemanticLabel", false);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "actionsList", [{
      id: ADD_KEY,
      name: _this.trans('flow-builder.add')
    }, {
      id: REMOVE_KEY,
      name: _this.trans('flow-builder.remove')
    }]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "setIsMember", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "handleBranchingTypeChangedToUnified", void 0);

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

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock.prototype, "handleBranchingTypeChangedToUnified", void 0);

Object(tslib_es6["__decorate"])([builderVuexNamespace.Getter], Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock.prototype, "isEditable", void 0);

Object(tslib_es6["__decorate"])([Core_SetGroupMembershipBlockvue_type_script_lang_ts_flowVuexNamespace.Mutation], Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock.prototype, "block_updateConfigByPath", void 0);

Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    GenericContactPropertyEditor: GenericContactPropertyEditor["a" /* default */],
    BlockNameEditor: NameEditor["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    BlockId: BlockId["a" /* default */],
    GroupSelector: block_editors_GroupSelector,
    VueMultiselect: vue_multiselect_min_default.a,
    ValidationMessage: ValidationMessage["a" /* default */],
    Categorization: Categorization["a" /* default */],
    GroupMembershipEditor: block_editors_GroupMembershipEditor,
    BlockOutputBranchingConfig: BlockOutputBranchingConfig["c" /* default */]
  }
})], Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock);
/* harmony default export */ var Core_SetGroupMembershipBlockvue_type_script_lang_ts_ = (Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock);
var install = Object(builder["d" /* createDefaultBlockTypeInstallerFor */])(BLOCK_TYPE, Core_SetGroupMembershipStore);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_types_Core_SetGroupMembershipBlockvue_type_script_lang_ts_ = (Core_SetGroupMembershipBlockvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue?vue&type=style&index=0&id=22114df1&lang=css&scoped=true&
var Core_SetGroupMembershipBlockvue_type_style_index_0_id_22114df1_lang_css_scoped_true_ = __webpack_require__("54df");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue






/* normalize component */

var Core_SetGroupMembershipBlock_component = Object(componentNormalizer["a" /* default */])(
  block_types_Core_SetGroupMembershipBlockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  "22114df1",
  null
  
)

/* harmony default export */ var block_types_Core_SetGroupMembershipBlock = __webpack_exports__["default"] = (Core_SetGroupMembershipBlock_component.exports);

/***/ }),

/***/ "3e88":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "54df":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Core_SetGroupMembershipBlock_vue_vue_type_style_index_0_id_22114df1_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3e88");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Core_SetGroupMembershipBlock_vue_vue_type_style_index_0_id_22114df1_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Core_SetGroupMembershipBlock_vue_vue_type_style_index_0_id_22114df1_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Core_SetGroupMembershipBlock_vue_vue_type_style_index_0_id_22114df1_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "75ce":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupSelector_vue_vue_type_style_index_0_id_caea6292_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("edc4");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupSelector_vue_vue_type_style_index_0_id_caea6292_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupSelector_vue_vue_type_style_index_0_id_caea6292_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupSelector_vue_vue_type_style_index_0_id_caea6292_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b4ec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1fb466d0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue?vue&type=template&id=bb893178&
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

/***/ }),

/***/ "edc4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=flow-builder.umd.5.js.map