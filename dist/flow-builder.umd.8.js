((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[8],{

/***/ "5c47":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "MobilePrimitives_SelectOneResponseBlock", function() { return /* reexport */ MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock; });
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue?vue&type=template&id=044c371d&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h3',{staticClass:"no-room-above"},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.edit-block-type',{block_type: _vm.trans(("flow-builder." + (_vm.block.type)))}))+" ")]),_c('block-name-editor',{attrs:{"block":_vm.block}}),_c('block-label-editor',{attrs:{"block":_vm.block}}),_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}),_c('div',{staticClass:"prompt-resource"},[(_vm.promptResource)?_c('resource-editor',{attrs:{"label":_vm._f("trans")('flow-builder.prompt'),"resource":_vm.promptResource,"flow":_vm.flow}}):_vm._e()],1),_c('div',{staticClass:"question-prompt-resource"},[(_vm.questionPromptResource)?_c('resource-editor',{attrs:{"label":_vm._f("trans")('flow-builder.question-prompt'),"resource":_vm.questionPromptResource,"flow":_vm.flow}}):_vm._e()],1),_c('div',{staticClass:"choices-prompt-resource"},[(_vm.choicesPromptResource)?_c('resource-editor',{attrs:{"label":_vm._f("trans")('flow-builder.choices-prompt'),"resource":_vm.choicesPromptResource,"flow":_vm.flow}}):_vm._e()],1),_vm._l((Object.keys(_vm.inflatedChoices)),function(choiceKey){return _c('div',{staticClass:"form-group form-inline"},[_c('resource-editor',{attrs:{"label":("Choice " + choiceKey),"resource":_vm.inflatedChoices[choiceKey],"flow":_vm.flow}})],1)}),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}}),_c('block-id',{attrs:{"block":_vm.block}})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue?vue&type=template&id=044c371d&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("bee2");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__("262e");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
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

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/NameEditor.vue + 4 modules
var NameEditor = __webpack_require__("f04e");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue + 4 modules
var LabelEditor = __webpack_require__("3411");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue + 4 modules
var SemanticLabelEditor = __webpack_require__("1b4e");

// EXTERNAL MODULE: ./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue + 4 modules
var FirstBlockEditorButton = __webpack_require__("192b");

// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceEditor.vue + 20 modules
var ResourceEditor = __webpack_require__("510a");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/BlockId.vue + 4 modules
var BlockId = __webpack_require__("792f");

// EXTERNAL MODULE: ./src/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore.ts
var MobilePrimitives_SelectOneResponseBlockStore = __webpack_require__("ecef");

// EXTERNAL MODULE: ./src/lib/filters/lang.js
var lang = __webpack_require__("3a37");

// EXTERNAL MODULE: ./src/store/builder/index.ts + 6 modules
var builder = __webpack_require__("af98");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue?vue&type=script&lang=ts&

















var flowVuexNamespace = Object(lib["b" /* namespace */])('flow');
var blockVuexNamespace = Object(lib["b" /* namespace */])("flow/".concat(MobilePrimitives_SelectOneResponseBlockStore["a" /* BLOCK_TYPE */]));

var MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(MobilePrimitives_SelectOneResponseBlock, _Vue);

  var _super = Object(createSuper["a" /* default */])(MobilePrimitives_SelectOneResponseBlock);

  function MobilePrimitives_SelectOneResponseBlock() {
    Object(classCallCheck["a" /* default */])(this, MobilePrimitives_SelectOneResponseBlock);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(MobilePrimitives_SelectOneResponseBlock, [{
    key: "onChoicesChanged",
    value: function onChoicesChanged(newChoices) {
      this.editSelectOneResponseBlockChoice();
    }
  }, {
    key: "promptResource",
    get: function get() {
      return this.resourcesByUuid[this.block.config.prompt];
    }
  }, {
    key: "questionPromptResource",
    get: function get() {
      return this.resourcesByUuid[this.block.config.questionPrompt || ""];
    }
  }, {
    key: "choicesPromptResource",
    get: function get() {
      return this.resourcesByUuid[this.block.config.choicesPrompt || ""];
    }
  }]);

  return MobilePrimitives_SelectOneResponseBlock;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["d" /* Watch */])('inflatedChoices', {
  deep: true
})], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "onChoicesChanged", null);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Getter], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "resourcesByUuid", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Getter], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "inflatedChoices", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "editSelectOneResponseBlockChoice", void 0);

MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  components: {
    BlockNameEditor: NameEditor["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    ResourceEditor: ResourceEditor["a" /* default */],
    BlockId: BlockId["a" /* default */]
  },
  mixins: [lang["a" /* default */]]
})], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock);

/* harmony default export */ var MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_ = (MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock);
var install = Object(builder["b" /* createDefaultBlockTypeInstallerFor */])(MobilePrimitives_SelectOneResponseBlockStore["a" /* BLOCK_TYPE */], MobilePrimitives_SelectOneResponseBlockStore["c" /* default */]);
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

/***/ "ecef":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BLOCK_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return mutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return actions; });
/* harmony import */ var core_js_modules_es_array_every__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a623");
/* harmony import */ var core_js_modules_es_array_every__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_every__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e260");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("13d5");
/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("45fc");
/* harmony import */ var core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("b64b");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ddb0");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("96cf");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("1da1");
/* harmony import */ var _floip_flow_runner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("9300");
/* harmony import */ var _floip_flow_runner__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_floip_flow_runner__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _floip_flow_runner_dist_domain_IdGeneratorUuidV4__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("31aa");
/* harmony import */ var _floip_flow_runner_dist_domain_IdGeneratorUuidV4__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_floip_flow_runner_dist_domain_IdGeneratorUuidV4__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("2ef0");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _utils_listBuilder__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("b199");












var BLOCK_TYPE = 'MobilePrimitives\\SelectOneResponse';

var getters = {
  inflatedChoices: function inflatedChoices(state, getters, rootState, rootGetters) {
    var currentBlock = rootGetters['builder/activeBlock'];
    var choices = {};
    return Object.keys(currentBlock.config.choices).reduce(function (memo, choiceKey) {
      memo[choiceKey] = rootGetters['flow/resourcesByUuid'][currentBlock.config.choices[choiceKey]];
      return memo;
    }, choices);
  },
  allChoicesHaveContent: function allChoicesHaveContent(state, getters) {
    return Object.keys(getters.inflatedChoices).every(function (key) {
      return Object(_utils_listBuilder__WEBPACK_IMPORTED_MODULE_12__[/* someItemsHaveValue */ "c"])(getters.inflatedChoices[key].values, "value");
    });
  },
  twoChoicesBlank: function twoChoicesBlank(state, getters, rootState, rootGetters) {
    var blankNumber = 0;
    return Object.keys(getters.inflatedChoices).some(function (key) {
      if (!Object(_utils_listBuilder__WEBPACK_IMPORTED_MODULE_12__[/* someItemsHaveValue */ "c"])(getters.inflatedChoices[key].values, "value")) {
        blankNumber += 1;
      }

      if (blankNumber > 1) {
        return true;
      }

      return false;
    });
  }
};
var mutations = {
  deleteChoiceByKey: function deleteChoiceByKey(state, _ref) {
    var choiceKeyToRemove = _ref.choiceKeyToRemove,
        blockId = _ref.blockId;
    //TODO - this shouldn't be necessary
    // @ts-ignore - TS2339: Property 'flow' does not exist on type
    var block = Object(_floip_flow_runner__WEBPACK_IMPORTED_MODULE_9__["findBlockOnActiveFlowWith"])(blockId, this.state.flow);
    delete block.config.choices[choiceKeyToRemove];
    var choices = {}; //rekey

    block.config.choices = Object.keys(block.config.choices).sort().reduce(function (choices, choiceKey, index) {
      choices[index + 1] = block.config.choices[choiceKey];
      return choices;
    }, choices);
  },
  pushNewChoice: function pushNewChoice(state, _ref2) {
    var choiceId = _ref2.choiceId,
        blockId = _ref2.blockId,
        newIndex = _ref2.newIndex;
    //TODO - this shouldn't be necessary
    // @ts-ignore - TS2339: Property 'flow' does not exist on type
    var block = Object(_floip_flow_runner__WEBPACK_IMPORTED_MODULE_9__["findBlockOnActiveFlowWith"])(blockId, this.state.flow);
    block.config.choices[newIndex] = choiceId;
  }
};
var actions = {
  popFirstEmptyChoice: function popFirstEmptyChoice(_ref3) {
    return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var commit, rootGetters, getters, choiceToRemove;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref3.commit, rootGetters = _ref3.rootGetters, getters = _ref3.getters;
              choiceToRemove = Object(lodash__WEBPACK_IMPORTED_MODULE_11__["find"])(Object.keys(getters.inflatedChoices), function (key) {
                return !Object(_utils_listBuilder__WEBPACK_IMPORTED_MODULE_12__[/* someItemsHaveValue */ "c"])(getters.inflatedChoices[key].values, "value");
              });

              if (!choiceToRemove) {
                _context.next = 5;
                break;
              }

              commit('deleteChoiceByKey', {
                choiceKeyToRemove: choiceToRemove,
                blockId: rootGetters['builder/activeBlock'].uuid
              });
              return _context.abrupt("return", rootGetters['builder/activeBlock'].config.choices[choiceToRemove]);

            case 5:
              return _context.abrupt("return", null);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  editSelectOneResponseBlockChoice: function editSelectOneResponseBlockChoice(_ref4) {
    return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var commit, dispatch, getters, rootGetters, activeBlock, newIndex, blankResource, exit, exitLabel;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref4.commit, dispatch = _ref4.dispatch, getters = _ref4.getters, rootGetters = _ref4.rootGetters;
              activeBlock = rootGetters['builder/activeBlock'];

              if (!getters.allChoicesHaveContent) {
                _context2.next = 15;
                break;
              }

              newIndex = parseInt(Object(lodash__WEBPACK_IMPORTED_MODULE_11__["max"])(Object.keys(activeBlock.config.choices)) || "0") + 1;
              _context2.next = 6;
              return dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {
                root: true
              });

            case 6:
              blankResource = _context2.sent;

              if (activeBlock.config.choices[newIndex]) {
                _context2.next = 13;
                break;
              }

              commit('pushNewChoice', {
                choiceId: blankResource.uuid,
                blockId: activeBlock.uuid,
                newIndex: newIndex
              });
              _context2.next = 11;
              return dispatch('flow/block_createBlockExitWith', {
                props: {
                  uuid: new _floip_flow_runner_dist_domain_IdGeneratorUuidV4__WEBPACK_IMPORTED_MODULE_10___default.a().generate(),
                  test: 'block.value = ' + (newIndex - 1),
                  label: blankResource.uuid
                }
              }, {
                root: true
              });

            case 11:
              exit = _context2.sent;
              commit('flow/block_pushNewExit', {
                blockId: activeBlock.uuid,
                newExit: exit
              }, {
                root: true
              });

            case 13:
              _context2.next = 20;
              break;

            case 15:
              if (!getters.twoChoicesBlank) {
                _context2.next = 20;
                break;
              }

              _context2.next = 18;
              return dispatch('popFirstEmptyChoice', {
                blockId: activeBlock.uuid
              });

            case 18:
              exitLabel = _context2.sent;

              if (exitLabel) {
                commit('flow/block_popExitsByLabel', {
                  blockId: activeBlock.uuid,
                  exitLabel: exitLabel
                }, {
                  root: true
                });
              }

            case 20:
              return _context2.abrupt("return", activeBlock.config.choices);

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  // todo: in the flow-spec, there's mention that we can configure to swap between exit-per-choice and a default exit
  //       but, it doesn't seem to mention how this is configured
  createWith: function createWith(_ref5, _ref6) {
    return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var state, commit, dispatch, props, blankResource, blankPromptResource, blankQuestionPromptResource, blankChoicesPromptResource, defaultExitProps, errorExitProps;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = _ref5.state, commit = _ref5.commit, dispatch = _ref5.dispatch;
              props = _ref6.props;
              _context3.next = 4;
              return dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {
                root: true
              });

            case 4:
              blankResource = _context3.sent;
              _context3.next = 7;
              return dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {
                root: true
              });

            case 7:
              blankPromptResource = _context3.sent;
              _context3.next = 10;
              return dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {
                root: true
              });

            case 10:
              blankQuestionPromptResource = _context3.sent;
              _context3.next = 13;
              return dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {
                root: true
              });

            case 13:
              blankChoicesPromptResource = _context3.sent;
              defaultExitProps = {
                uuid: new _floip_flow_runner_dist_domain_IdGeneratorUuidV4__WEBPACK_IMPORTED_MODULE_10___default.a().generate(),
                tag: 'Default',
                label: 'Default'
              };
              errorExitProps = {
                uuid: new _floip_flow_runner_dist_domain_IdGeneratorUuidV4__WEBPACK_IMPORTED_MODULE_10___default.a().generate(),
                tag: 'Error',
                label: 'Error'
              };
              _context3.t0 = lodash__WEBPACK_IMPORTED_MODULE_11__["defaults"];
              _context3.t1 = props;
              _context3.t2 = BLOCK_TYPE;
              _context3.next = 21;
              return dispatch('flow/block_createBlockDefaultExitWith', {
                props: defaultExitProps
              }, {
                root: true
              });

            case 21:
              _context3.t3 = _context3.sent;
              _context3.next = 24;
              return dispatch('flow/block_createBlockExitWith', {
                props: errorExitProps
              }, {
                root: true
              });

            case 24:
              _context3.t4 = _context3.sent;
              _context3.t5 = [_context3.t3, _context3.t4];
              _context3.t6 = {
                prompt: blankPromptResource.uuid,
                questionPrompt: blankQuestionPromptResource.uuid,
                choicesPrompt: blankChoicesPromptResource.uuid,
                choices: {
                  '1': blankResource.uuid
                }
              };
              _context3.t7 = {
                type: _context3.t2,
                name: '',
                label: '',
                semanticLabel: '',
                exits: _context3.t5,
                config: _context3.t6
              };
              return _context3.abrupt("return", (0, _context3.t0)(_context3.t1, _context3.t7));

            case 29:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
};
/* harmony default export */ __webpack_exports__["c"] = ({
  namespaced: true,
  getters: getters,
  mutations: mutations,
  actions: actions
});

/***/ })

}]);
//# sourceMappingURL=flow-builder.umd.8.js.map