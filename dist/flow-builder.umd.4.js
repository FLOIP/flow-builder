((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[4],{

/***/ "02b5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d80eb91e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue?vue&type=template&id=79bfd758&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"core-set-group-membership-block"},[_c('h3',{staticClass:"block-editor-header"},[_vm._v(" "+_vm._s(_vm._f("trans")(("flow-builder." + (_vm.block.type))))+" ")]),_c('fieldset',{attrs:{"disabled":!_vm.isEditable}},[_c('block-label-editor',{attrs:{"block":_vm.block},on:{"gearClicked":function($event){_vm.showSemanticLabel = !_vm.showSemanticLabel}}}),(_vm.showSemanticLabel)?_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}):_vm._e(),_c('block-name-editor',{attrs:{"block":_vm.block}}),_vm._t("extras"),_c('group-membership-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('block-output-branching-config',{attrs:{"block":_vm.block,"has-exit-per-choice":false},on:{"branchingTypeChangedToUnified":function($event){return _vm.handleBranchingTypeChangedToUnified({block: _vm.block})}}}),_c('categorization',{attrs:{"block":_vm.block}}),_c('generic-contact-property-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}})],2),_c('block-id',{attrs:{"block":_vm.block}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue?vue&type=template&id=79bfd758&scoped=true&

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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d80eb91e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/GroupSelector.vue?vue&type=template&id=0c23c358&scoped=true&
var GroupSelectorvue_type_template_id_0c23c358_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/group_key")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-group"},[_c('label',{staticClass:"text-primary"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.group-label')))]),_c('vue-multiselect',{class:{invalid: isValid === false},attrs:{"track-by":"id","label":"name","placeholder":_vm._f("trans")('flow-builder.group-selector-placeholder'),"options":_vm.groups,"allow-empty":false,"show-labels":false,"searchable":true},model:{value:(_vm.selectedGroup),callback:function ($$v) {_vm.selectedGroup=$$v},expression:"selectedGroup"}})],1)]}}])})}
var GroupSelectorvue_type_template_id_0c23c358_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupSelector.vue?vue&type=template&id=0c23c358&scoped=true&

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
    VueMultiselect: vue_multiselect_min_default.a
  }
})], GroupSelectorvue_type_script_lang_ts_GroupSelector);
/* harmony default export */ var GroupSelectorvue_type_script_lang_ts_ = (GroupSelectorvue_type_script_lang_ts_GroupSelector);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupSelector.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_GroupSelectorvue_type_script_lang_ts_ = (GroupSelectorvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/GroupSelector.vue?vue&type=style&index=0&id=0c23c358&lang=css&scoped=true&
var GroupSelectorvue_type_style_index_0_id_0c23c358_lang_css_scoped_true_ = __webpack_require__("fb01");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupSelector.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_GroupSelectorvue_type_script_lang_ts_,
  GroupSelectorvue_type_template_id_0c23c358_scoped_true_render,
  GroupSelectorvue_type_template_id_0c23c358_scoped_true_staticRenderFns,
  false,
  null,
  "0c23c358",
  null
  
)

/* harmony default export */ var block_editors_GroupSelector = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d80eb91e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/GroupMembershipEditor.vue?vue&type=template&id=07296282&
var GroupMembershipEditorvue_type_template_id_07296282_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"group-membership-editor"},[_c('hr'),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"text-primary"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.action-label')))]),_c('p',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.group-membership-action-hint')))]),_c('div',{staticClass:"form-group"},[_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.membershipAction),expression:"membershipAction"}],staticClass:"custom-control-input",attrs:{"id":"addGroup","type":"radio","name":"groupMembershipAction"},domProps:{"value":_vm.MEMBERSHIP_ACTION.ADD,"checked":_vm._q(_vm.membershipAction,_vm.MEMBERSHIP_ACTION.ADD)},on:{"change":function($event){_vm.membershipAction=_vm.MEMBERSHIP_ACTION.ADD}}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"addGroup"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.set-group-membership'))+" ")])]),_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.membershipAction),expression:"membershipAction"}],staticClass:"custom-control-input",attrs:{"id":"clearGroup","type":"radio","name":"groupMembershipAction"},domProps:{"value":_vm.MEMBERSHIP_ACTION.REMOVE,"checked":_vm._q(_vm.membershipAction,_vm.MEMBERSHIP_ACTION.REMOVE)},on:{"change":function($event){_vm.membershipAction=_vm.MEMBERSHIP_ACTION.REMOVE}}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"clearGroup"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.clear-group-membership'))+" ")])]),_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.membershipAction),expression:"membershipAction"}],staticClass:"custom-control-input",attrs:{"id":"setFromExpression","type":"radio","name":"groupMembershipAction"},domProps:{"value":_vm.MEMBERSHIP_ACTION.SET_FROM_EXPRESSION,"checked":_vm._q(_vm.membershipAction,_vm.MEMBERSHIP_ACTION.SET_FROM_EXPRESSION)},on:{"change":function($event){_vm.membershipAction=_vm.MEMBERSHIP_ACTION.SET_FROM_EXPRESSION}}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"setFromExpression"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.set-group-membership-from-expression'))+" ")])])]),_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/group_key")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-group-key"},[_c('text-editor',{attrs:{"label":_vm._f("trans")('flow-builder.group-label'),"label-class":'font-weight-bold',"placeholder":_vm._f("trans")('flow-builder.enter-group-label'),"valid-state":isValid},model:{value:(_vm.groupKey),callback:function ($$v) {_vm.groupKey=$$v},expression:"groupKey"}})],1)]}}])}),(_vm.membershipAction === _vm.MEMBERSHIP_ACTION.SET_FROM_EXPRESSION)?_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/is_member")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('expression-input',{attrs:{"label":_vm._f("trans")('flow-builder.value-expression'),"placeholder":_vm._f("trans")('flow-builder.enter-expression'),"label-class":'font-weight-bold',"current-expression":_vm.isMember,"valid-state":isValid},on:{"commitExpressionChange":_vm.updateIsMemberExpression}})]}}],null,false,628814233)}):_vm._e()],1)])}
var GroupMembershipEditorvue_type_template_id_07296282_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupMembershipEditor.vue?vue&type=template&id=07296282&

// EXTERNAL MODULE: ./src/components/common/ExpressionInput.vue + 5 modules
var ExpressionInput = __webpack_require__("6faa");

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
    ExpressionInput: ExpressionInput["a" /* default */]
  }
})], GroupMembershipEditorvue_type_script_lang_ts_GroupMembershipEditor);
/* harmony default export */ var GroupMembershipEditorvue_type_script_lang_ts_ = (GroupMembershipEditorvue_type_script_lang_ts_GroupMembershipEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupMembershipEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_GroupMembershipEditorvue_type_script_lang_ts_ = (GroupMembershipEditorvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GroupMembershipEditor.vue





/* normalize component */

var GroupMembershipEditor_component = Object(componentNormalizer["a" /* default */])(
  block_editors_GroupMembershipEditorvue_type_script_lang_ts_,
  GroupMembershipEditorvue_type_template_id_07296282_render,
  GroupMembershipEditorvue_type_template_id_07296282_staticRenderFns,
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

// EXTERNAL MODULE: ./src/store/validation/validationHelpers.ts
var validationHelpers = __webpack_require__("85b2");

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
  },
  validate: function validate(_ref6, _ref7) {
    var rootGetters = _ref6.rootGetters;
    var block = _ref7.block,
        schemaVersion = _ref7.schemaVersion;
    return Object(validationHelpers["e" /* validateCommunityBlock */])({
      block: block,
      schemaVersion: schemaVersion
    });
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
    Categorization: Categorization["a" /* default */],
    GroupMembershipEditor: block_editors_GroupMembershipEditor,
    BlockOutputBranchingConfig: BlockOutputBranchingConfig["c" /* default */]
  }
})], Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock);
/* harmony default export */ var Core_SetGroupMembershipBlockvue_type_script_lang_ts_ = (Core_SetGroupMembershipBlockvue_type_script_lang_ts_Core_SetGroupMembershipBlock);
var install = Object(builder["d" /* createDefaultBlockTypeInstallerFor */])(BLOCK_TYPE, Core_SetGroupMembershipStore);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_types_Core_SetGroupMembershipBlockvue_type_script_lang_ts_ = (Core_SetGroupMembershipBlockvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue?vue&type=style&index=0&id=79bfd758&lang=css&scoped=true&
var Core_SetGroupMembershipBlockvue_type_style_index_0_id_79bfd758_lang_css_scoped_true_ = __webpack_require__("1dc8");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue






/* normalize component */

var Core_SetGroupMembershipBlock_component = Object(componentNormalizer["a" /* default */])(
  block_types_Core_SetGroupMembershipBlockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  "79bfd758",
  null
  
)

/* harmony default export */ var block_types_Core_SetGroupMembershipBlock = __webpack_exports__["default"] = (Core_SetGroupMembershipBlock_component.exports);

/***/ }),

/***/ "1dc8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Core_SetGroupMembershipBlock_vue_vue_type_style_index_0_id_79bfd758_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e88f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Core_SetGroupMembershipBlock_vue_vue_type_style_index_0_id_79bfd758_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Core_SetGroupMembershipBlock_vue_vue_type_style_index_0_id_79bfd758_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Core_SetGroupMembershipBlock_vue_vue_type_style_index_0_id_79bfd758_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "70eb":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e88f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fb01":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupSelector_vue_vue_type_style_index_0_id_0c23c358_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("70eb");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupSelector_vue_vue_type_style_index_0_id_0c23c358_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupSelector_vue_vue_type_style_index_0_id_0c23c358_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupSelector_vue_vue_type_style_index_0_id_0c23c358_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

}]);
//# sourceMappingURL=flow-builder.umd.4.js.map