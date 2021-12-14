((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[15],{

/***/ "03d5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "MobilePrimitives_SelectManyResponseBlock", function() { return /* reexport */ MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectManyResponseBlock; });
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d80eb91e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue?vue&type=template&id=650f095c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mobile-primitive-select-many-response-block"},[_c('h3',{staticClass:"block-editor-header"},[_vm._v(" "+_vm._s(_vm._f("trans")(("flow-builder." + (_vm.block.type))))+" ")]),_c('fieldset',{attrs:{"disabled":!_vm.isEditable}},[_c('block-label-editor',{attrs:{"block":_vm.block},on:{"gearClicked":function($event){_vm.showSemanticLabel = !_vm.showSemanticLabel}}}),(_vm.showSemanticLabel)?_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}):_vm._e(),_c('block-name-editor',{attrs:{"block":_vm.block}}),_c('div',{staticClass:"prompt-resource"},[(_vm.promptResource)?_c('resource-editor',{attrs:{"label":_vm._f("trans")('flow-builder.prompt'),"resource":_vm.promptResource,"block":_vm.block,"flow":_vm.flow}}):_vm._e()],1),_c('hr'),_c('choices-builder',{attrs:{"block":_vm.block},on:{"choiceChanged":_vm.handleChoiceChanged}}),_c('hr'),_c('minimum-choices-editor',{attrs:{"block":_vm.block}}),_c('maximum-choices-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('block-output-branching-config',{attrs:{"block":_vm.block,"has-exit-per-choice":false,"label-class":''},on:{"branchingTypeChanged":function($event){return _vm.reflowExitsWhenSwitchingToBranchingTypeNotUnified()}}}),_vm._t("extras"),_c('categorization',{attrs:{"block":_vm.block}}),_c('generic-contact-property-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}})],2),_c('block-id',{attrs:{"block":_vm.block}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue?vue&type=template&id=650f095c&

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

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/index.js + 14 modules
var lib = __webpack_require__("1b40");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("c964");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("f3f3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/index.js
var dist = __webpack_require__("9300");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/domain/IdGeneratorUuidV4.js
var IdGeneratorUuidV4 = __webpack_require__("31aa");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// EXTERNAL MODULE: ./src/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore.ts
var MobilePrimitives_SelectOneResponseBlockStore = __webpack_require__("ecef");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue + 14 modules
var BlockOutputBranchingConfig = __webpack_require__("18b0");

// EXTERNAL MODULE: ./src/store/validation/validationHelpers.ts
var validationHelpers = __webpack_require__("85b2");

// CONCATENATED MODULE: ./src/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore.ts












var BLOCK_TYPE = 'MobilePrimitives.SelectManyResponse';
var getters = Object(objectSpread2["a" /* default */])({}, MobilePrimitives_SelectOneResponseBlockStore["d" /* getters */]);
var mutations = Object(objectSpread2["a" /* default */])({}, MobilePrimitives_SelectOneResponseBlockStore["e" /* mutations */]);
var actions = Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, MobilePrimitives_SelectOneResponseBlockStore["b" /* actions */]), {}, {
  setMinChoices: function setMinChoices(_ref, _ref2) {
    var commit = _ref.commit,
        dispatch = _ref.dispatch,
        rootGetters = _ref.rootGetters;
    var blockId = _ref2.blockId,
        value = _ref2.value;
    var block = Object(dist["findBlockWith"])(blockId, rootGetters['flow/activeFlow']);
    commit('flow/block_updateConfigByKey', {
      blockId: block.uuid,
      key: 'minimum_choices',
      value: Object(lodash["isNumber"])(value) ? value : undefined
    }, {
      root: true
    });
    var metadata = block.vendor_metadata;
    var UNIFIED = BlockOutputBranchingConfig["b" /* OutputBranchingType */].UNIFIED;

    if (metadata.io_viamo.branchingType === UNIFIED) {
      dispatch('handleBranchingTypeChangedToUnified', {
        block: block
      });
    }
  },
  setMaxChoices: function setMaxChoices(_ref3, _ref4) {
    var commit = _ref3.commit,
        dispatch = _ref3.dispatch,
        rootGetters = _ref3.rootGetters;
    var blockId = _ref4.blockId,
        value = _ref4.value;
    var block = Object(dist["findBlockWith"])(blockId, rootGetters['flow/activeFlow']);
    commit('flow/block_updateConfigByKey', {
      blockId: block.uuid,
      key: 'maximum_choices',
      value: Object(lodash["isNumber"])(value) ? value : undefined
    }, {
      root: true
    }); // todo: we should probably review our getters + setters in vue files and pull domain logic our stores ?! Schedule this?11

    var metadata = block.vendor_metadata;
    var UNIFIED = BlockOutputBranchingConfig["b" /* OutputBranchingType */].UNIFIED;

    if (metadata.io_viamo.branchingType === UNIFIED) {
      dispatch('handleBranchingTypeChangedToUnified', {
        block: block
      });
    }
  },
  handleBranchingTypeChangedToUnified: function handleBranchingTypeChangedToUnified(_ref5, _ref6) {
    var dispatch = _ref5.dispatch;
    var block = _ref6.block;
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: formatTestValueForUnifiedBranchingType(block)
    }, {
      root: true
    });
  },
  createWith: function createWith(_ref7, _ref8) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var dispatch, props, blankPromptResource, exits;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch = _ref7.dispatch;
              props = _ref8.props;
              _context.next = 4;
              return dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {
                root: true
              });

            case 4:
              blankPromptResource = _context.sent;
              _context.t0 = dispatch;
              _context.next = 8;
              return new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate();

            case 8:
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
              _context.next = 14;
              return (0, _context.t0)('flow/block_createBlockDefaultExitWith', _context.t3, _context.t4);

            case 14:
              _context.t5 = _context.sent;
              exits = [_context.t5];
              return _context.abrupt("return", Object(lodash["defaultsDeep"])(props, {
                type: BLOCK_TYPE,
                name: '',
                label: '',
                semantic_label: '',
                exits: exits,
                config: {
                  prompt: blankPromptResource.uuid,
                  choices: {},
                  minimum_choices: undefined,
                  maximum_choices: undefined
                },
                vendor_metadata: {},
                tags: []
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  validate: function validate(_ref9, _ref10) {
    var rootGetters = _ref9.rootGetters;
    var block = _ref10.block,
        schemaVersion = _ref10.schemaVersion;
    return Object(validationHelpers["e" /* validateCommunityBlock */])({
      block: block,
      schemaVersion: schemaVersion
    });
  }
});

function formatTestValueForUnifiedBranchingType(block) {
  var _block$config = block.config,
      choices = _block$config.choices,
      min = _block$config.minimum_choices,
      max = _block$config.maximum_choices;
  var choiceKeys = Object.keys(choices);

  if (choiceKeys.length === 0) {
    console.warn('Choices are empty for SelectManyBlock, providing `true` by default');
    return 'true';
  }

  var validMinCount = "COUNT(block.value) >= ".concat(min);
  var validMaxCount = "COUNT(block.value) <= ".concat(max);
  var validChoices = "OR(".concat(choiceKeys.map(function (choice) {
    return "IN(\"".concat(choice, "\", block.value)");
  }).join(', '), ")");

  if (Object(lodash["isNumber"])(min) && Object(lodash["isNumber"])(max)) {
    return "AND(".concat([validMinCount, validMaxCount, validChoices].join(', '), ")");
  }

  if (Object(lodash["isNumber"])(min)) {
    return "AND(".concat([validMinCount, validChoices].join(', '), ")");
  }

  if (Object(lodash["isNumber"])(max)) {
    return "AND(".concat([validMaxCount, validChoices].join(', '), ")");
  }

  return validChoices;
}

/* harmony default export */ var MobilePrimitives_SelectManyResponseBlockStore = ({
  namespaced: true,
  state: MobilePrimitives_SelectOneResponseBlockStore["f" /* stateFactory */],
  getters: getters,
  mutations: mutations,
  actions: actions
});
// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var vuex_class_lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./src/store/builder/index.ts
var builder = __webpack_require__("af98");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/Categorization.vue + 9 modules
var Categorization = __webpack_require__("8619");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/ChoicesBuilder.vue + 4 modules
var ChoicesBuilder = __webpack_require__("5aa7");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d80eb91e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MinimumChoicesEditor.vue?vue&type=template&id=7764559c&
var MinimumChoicesEditorvue_type_template_id_7764559c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/minimum_choices")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-validation-min-choices"},[_c('numeric-editor',{attrs:{"regex-numeric-filtering":'[0-9]',"label":_vm._f("trans")('flow-builder.minimum-choices'),"placeholder":_vm._f("trans")('flow-builder.enter-value'),"valid-state":isValid},model:{value:(_vm.minChoices),callback:function ($$v) {_vm.minChoices=_vm._n($$v)},expression:"minChoices"}})],1)]}}])})}
var MinimumChoicesEditorvue_type_template_id_7764559c_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MinimumChoicesEditor.vue?vue&type=template&id=7764559c&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("e954");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/components/common/NumericEditor.vue + 4 modules
var NumericEditor = __webpack_require__("2f00");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MinimumChoicesEditor.vue?vue&type=script&lang=ts&














 // import {ISelectManyResponseBlockConfig} from '@floip/flow-runner'

var blockVuexNamespace = Object(vuex_class_lib["e" /* namespace */])("flow/".concat(BLOCK_TYPE));
var builderVuexNamespace = Object(vuex_class_lib["e" /* namespace */])('builder');

var MinimumChoicesEditorvue_type_script_lang_ts_MinimumChoicesEditor = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(MinimumChoicesEditor, _mixins);

  var _super = Object(createSuper["a" /* default */])(MinimumChoicesEditor);

  function MinimumChoicesEditor() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, MinimumChoicesEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "setMinChoices", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(MinimumChoicesEditor, [{
    key: "mounted",
    value: function mounted() {// todo: dispatch default value onto block
    } // eslint-disable-next-line line-comment-position

  }, {
    key: "minChoices",
    get: function get() {
      var min = this.block.config.minimum_choices;
      return Object(lodash["isNumber"])(min) ? min : '';
    } // eslint-disable-next-line line-comment-position
    ,
    set: function set(value) {
      var blockId = this.block.uuid;
      this.setMinChoices({
        blockId: blockId,
        value: Object(lodash["isNumber"])(value) ? value : undefined
      });
    }
  }]);

  return MinimumChoicesEditor;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(lib["b" /* Prop */])()], MinimumChoicesEditorvue_type_script_lang_ts_MinimumChoicesEditor.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], MinimumChoicesEditorvue_type_script_lang_ts_MinimumChoicesEditor.prototype, "setMinChoices", void 0);

MinimumChoicesEditorvue_type_script_lang_ts_MinimumChoicesEditor = Object(tslib_es6["__decorate"])([Object(lib["a" /* Component */])({
  components: {
    NumericEditor: NumericEditor["a" /* default */]
  }
})], MinimumChoicesEditorvue_type_script_lang_ts_MinimumChoicesEditor);

/* harmony default export */ var MinimumChoicesEditorvue_type_script_lang_ts_ = (MinimumChoicesEditorvue_type_script_lang_ts_MinimumChoicesEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MinimumChoicesEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_MinimumChoicesEditorvue_type_script_lang_ts_ = (MinimumChoicesEditorvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MinimumChoicesEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_MinimumChoicesEditorvue_type_script_lang_ts_,
  MinimumChoicesEditorvue_type_template_id_7764559c_render,
  MinimumChoicesEditorvue_type_template_id_7764559c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_editors_MinimumChoicesEditor = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d80eb91e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MaximumChoicesEditor.vue?vue&type=template&id=76276f10&
var MaximumChoicesEditorvue_type_template_id_76276f10_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/maximum_choices")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-validation-max-choices"},[_c('numeric-editor',{attrs:{"regex-numeric-filtering":'[0-9]',"label":_vm._f("trans")('flow-builder.maximum-choices'),"placeholder":_vm._f("trans")('flow-builder.enter-value'),"valid-state":isValid},model:{value:(_vm.maxChoices),callback:function ($$v) {_vm.maxChoices=_vm._n($$v)},expression:"maxChoices"}})],1)]}}])})}
var MaximumChoicesEditorvue_type_template_id_76276f10_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaximumChoicesEditor.vue?vue&type=template&id=76276f10&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MaximumChoicesEditor.vue?vue&type=script&lang=ts&














 // import {ISelectManyResponseBlockConfig} from '@floip/flow-runner'

var MaximumChoicesEditorvue_type_script_lang_ts_blockVuexNamespace = Object(vuex_class_lib["e" /* namespace */])("flow/".concat(BLOCK_TYPE));
var MaximumChoicesEditorvue_type_script_lang_ts_builderVuexNamespace = Object(vuex_class_lib["e" /* namespace */])('builder');

var MaximumChoicesEditorvue_type_script_lang_ts_MaximumChoicesEditor = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(MaximumChoicesEditor, _mixins);

  var _super = Object(createSuper["a" /* default */])(MaximumChoicesEditor);

  function MaximumChoicesEditor() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, MaximumChoicesEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "setMaxChoices", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(MaximumChoicesEditor, [{
    key: "mounted",
    value: function mounted() {// todo: dispatch default value onto block
    } // eslint-disable-next-line line-comment-position

  }, {
    key: "maxChoices",
    get: function get() {
      var max = this.block.config.maximum_choices;
      return Object(lodash["isNumber"])(max) ? max : '';
    } // eslint-disable-next-line line-comment-position
    ,
    set: function set(value) {
      var blockId = this.block.uuid;
      this.setMaxChoices({
        blockId: blockId,
        value: Object(lodash["isNumber"])(value) ? value : undefined
      });
    }
  }]);

  return MaximumChoicesEditor;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(lib["b" /* Prop */])()], MaximumChoicesEditorvue_type_script_lang_ts_MaximumChoicesEditor.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([MaximumChoicesEditorvue_type_script_lang_ts_blockVuexNamespace.Action], MaximumChoicesEditorvue_type_script_lang_ts_MaximumChoicesEditor.prototype, "setMaxChoices", void 0);

MaximumChoicesEditorvue_type_script_lang_ts_MaximumChoicesEditor = Object(tslib_es6["__decorate"])([Object(lib["a" /* Component */])({
  components: {
    NumericEditor: NumericEditor["a" /* default */]
  }
})], MaximumChoicesEditorvue_type_script_lang_ts_MaximumChoicesEditor);

/* harmony default export */ var MaximumChoicesEditorvue_type_script_lang_ts_ = (MaximumChoicesEditorvue_type_script_lang_ts_MaximumChoicesEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaximumChoicesEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_MaximumChoicesEditorvue_type_script_lang_ts_ = (MaximumChoicesEditorvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaximumChoicesEditor.vue





/* normalize component */

var MaximumChoicesEditor_component = Object(componentNormalizer["a" /* default */])(
  block_editors_MaximumChoicesEditorvue_type_script_lang_ts_,
  MaximumChoicesEditorvue_type_template_id_76276f10_render,
  MaximumChoicesEditorvue_type_template_id_76276f10_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_editors_MaximumChoicesEditor = (MaximumChoicesEditor_component.exports);
// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/NameEditor.vue + 4 modules
var NameEditor = __webpack_require__("f04e");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue + 4 modules
var LabelEditor = __webpack_require__("3411");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue + 4 modules
var SemanticLabelEditor = __webpack_require__("1b4e");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue + 4 modules
var ExitSemanticLabelEditor = __webpack_require__("70f0");

// EXTERNAL MODULE: ./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue + 4 modules
var FirstBlockEditorButton = __webpack_require__("192b");

// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceEditor.vue + 37 modules
var ResourceEditor = __webpack_require__("510a");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/BlockId.vue + 4 modules
var BlockId = __webpack_require__("792f");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue + 4 modules
var MobilePrimitives_SelectOneResponseBlock = __webpack_require__("5c47");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue + 4 modules
var GenericContactPropertyEditor = __webpack_require__("b4ec");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue?vue&type=script&lang=ts&

























var MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_blockVuexNamespace = Object(vuex_class_lib["e" /* namespace */])("flow/".concat(BLOCK_TYPE));
var MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_builderVuexNamespace = Object(vuex_class_lib["e" /* namespace */])('builder');

var MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectManyResponseBlock = /*#__PURE__*/function (_SelectOneResponseBlo) {
  Object(inherits["a" /* default */])(MobilePrimitives_SelectManyResponseBlock, _SelectOneResponseBlo);

  var _super = Object(createSuper["a" /* default */])(MobilePrimitives_SelectManyResponseBlock);

  function MobilePrimitives_SelectManyResponseBlock() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, MobilePrimitives_SelectManyResponseBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "showSemanticLabel", false);

    return _this;
  }

  return MobilePrimitives_SelectManyResponseBlock;
}(MobilePrimitives_SelectOneResponseBlock["default"]);

Object(tslib_es6["__decorate"])([MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_builderVuexNamespace.Getter], MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectManyResponseBlock.prototype, "isEditable", void 0);

Object(tslib_es6["__decorate"])([MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_blockVuexNamespace.Action], MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectManyResponseBlock.prototype, "handleBranchingTypeChangedToUnified", void 0);

MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectManyResponseBlock = Object(tslib_es6["__decorate"])([Object(lib["a" /* Component */])({
  components: {
    BlockId: BlockId["a" /* default */],
    BlockNameEditor: NameEditor["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockOutputBranchingConfig: BlockOutputBranchingConfig["c" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    BlockExitSemanticLabelEditor: ExitSemanticLabelEditor["a" /* default */],
    ChoicesBuilder: ChoicesBuilder["a" /* default */],
    Categorization: Categorization["a" /* default */],
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    GenericContactPropertyEditor: GenericContactPropertyEditor["a" /* default */],
    MinimumChoicesEditor: block_editors_MinimumChoicesEditor,
    MaximumChoicesEditor: block_editors_MaximumChoicesEditor,
    ResourceEditor: ResourceEditor["a" /* default */]
  }
})], MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectManyResponseBlock);

/* harmony default export */ var MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_ = (MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectManyResponseBlock);
var install = Object(builder["d" /* createDefaultBlockTypeInstallerFor */])(BLOCK_TYPE, MobilePrimitives_SelectManyResponseBlockStore);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_types_MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_ = (MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue





/* normalize component */

var MobilePrimitives_SelectManyResponseBlock_component = Object(componentNormalizer["a" /* default */])(
  block_types_MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_types_MobilePrimitives_SelectManyResponseBlock = __webpack_exports__["default"] = (MobilePrimitives_SelectManyResponseBlock_component.exports);

/***/ })

}]);
//# sourceMappingURL=flow-builder.common.15.js.map