((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[6,7],{

/***/ "03d5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "MobilePrimitives_SelectManyResponseBlock", function() { return /* reexport */ MobilePrimitives_SelectManyResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectManyResponseBlock; });
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0b5ed522-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue?vue&type=template&id=650f095c&
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0b5ed522-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MinimumChoicesEditor.vue?vue&type=template&id=9874cada&
var MinimumChoicesEditorvue_type_template_id_9874cada_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/minimum_choices")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-validation-min-choices"},[_c('numeric-editor',{attrs:{"regex-numeric-filtering":'[0-9]',"label":_vm._f("trans")('flow-builder.minimum-choices'),"placeholder":_vm._f("trans")('flow-builder.enter-value'),"valid-state":isValid},model:{value:(_vm.minChoices),callback:function ($$v) {_vm.minChoices=_vm._n($$v)},expression:"minChoices"}})],1)]}}])})}
var MinimumChoicesEditorvue_type_template_id_9874cada_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MinimumChoicesEditor.vue?vue&type=template&id=9874cada&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("e954");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/components/common/NumericEditor.vue + 4 modules
var NumericEditor = __webpack_require__("2f00");

// EXTERNAL MODULE: ./src/components/common/ValidationMessage.vue + 5 modules
var ValidationMessage = __webpack_require__("21e9");

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
    NumericEditor: NumericEditor["a" /* default */],
    ValidationMessage: ValidationMessage["a" /* default */]
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
  MinimumChoicesEditorvue_type_template_id_9874cada_render,
  MinimumChoicesEditorvue_type_template_id_9874cada_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_editors_MinimumChoicesEditor = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0b5ed522-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/MaximumChoicesEditor.vue?vue&type=template&id=0bb8fcff&
var MaximumChoicesEditorvue_type_template_id_0bb8fcff_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/maximum_choices")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-validation-max-choices"},[_c('numeric-editor',{attrs:{"regex-numeric-filtering":'[0-9]',"label":_vm._f("trans")('flow-builder.maximum-choices'),"placeholder":_vm._f("trans")('flow-builder.enter-value'),"valid-state":isValid},model:{value:(_vm.maxChoices),callback:function ($$v) {_vm.maxChoices=_vm._n($$v)},expression:"maxChoices"}})],1)]}}])})}
var MaximumChoicesEditorvue_type_template_id_0bb8fcff_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaximumChoicesEditor.vue?vue&type=template&id=0bb8fcff&

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
    NumericEditor: NumericEditor["a" /* default */],
    ValidationMessage: ValidationMessage["a" /* default */]
  }
})], MaximumChoicesEditorvue_type_script_lang_ts_MaximumChoicesEditor);

/* harmony default export */ var MaximumChoicesEditorvue_type_script_lang_ts_ = (MaximumChoicesEditorvue_type_script_lang_ts_MaximumChoicesEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaximumChoicesEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_MaximumChoicesEditorvue_type_script_lang_ts_ = (MaximumChoicesEditorvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/MaximumChoicesEditor.vue





/* normalize component */

var MaximumChoicesEditor_component = Object(componentNormalizer["a" /* default */])(
  block_editors_MaximumChoicesEditorvue_type_script_lang_ts_,
  MaximumChoicesEditorvue_type_template_id_0bb8fcff_render,
  MaximumChoicesEditorvue_type_template_id_0bb8fcff_staticRenderFns,
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

/***/ }),

/***/ "5aa7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0b5ed522-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/ChoicesBuilder.vue?vue&type=template&id=481d38b7&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"choices-builder form-group"},[_c('h4',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.choices')))]),_vm._l((_vm.choiceResourcesOrderedByResourcesList),function(resource,i){return [_c('resource-variant-text-editor',{key:resource.uuid,ref:"choices",refInFor:true,staticClass:"choices-builder-item",attrs:{"label":(i + 1).toString(),"rows":1,"placeholder":'Enter choice...',"resource-id":resource.uuid,"resource-variant":resource.values[0],"mode":_vm.SupportedMode.TEXT},on:{"afterResourceVariantChanged":function($event){return _vm.handleExistingResourceVariantChangedFor(
        resource.uuid,
        i,
        resource)}}})]}),(_vm.draftResource)?_c('resource-variant-text-editor',{ref:"draftChoice",staticClass:"choices-builder-item",attrs:{"label":(_vm.choiceResourcesOrderedByResourcesList.length + 1).toString(),"rows":1,"placeholder":'Enter choice...',"resource-id":_vm.draftResource.uuid,"resource-variant":_vm.findOrGenerateStubbedVariantOn(
      _vm.draftResource,
      {language_id: _vm.activeFlow.languages[0].id,
       content_type: _vm.SupportedContentType.TEXT,
       modes: [_vm.SupportedMode.TEXT]}),"mode":_vm.SupportedMode.TEXT},on:{"beforeResourceVariantChanged":_vm.addDraftResourceToChoices,"afterResourceVariantChanged":function($event){return _vm.rewriteChoiceKeyFor({resourceId: _vm.draftResource.uuid, blockId: _vm.block.uuid})}}}):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/ChoicesBuilder.vue?vue&type=template&id=481d38b7&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("c964");

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

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__("07ac");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// EXTERNAL MODULE: ./src/store/flow/resource.ts
var flow_resource = __webpack_require__("393e");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/index.js + 14 modules
var lib = __webpack_require__("1b40");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/index.js
var dist = __webpack_require__("9300");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var vuex_class_lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue + 4 modules
var ResourceVariantTextEditor = __webpack_require__("bb40");

// EXTERNAL MODULE: ./src/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore.ts
var MobilePrimitives_SelectOneResponseBlockStore = __webpack_require__("ecef");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/domain/IdGeneratorUuidV4.js
var IdGeneratorUuidV4 = __webpack_require__("31aa");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/ChoicesBuilder.vue?vue&type=script&lang=ts&
























var flowVuexNamespace = Object(vuex_class_lib["e" /* namespace */])('flow');
var blockVuexNamespace = Object(vuex_class_lib["e" /* namespace */])("flow/".concat(MobilePrimitives_SelectOneResponseBlockStore["a" /* BLOCK_TYPE */]));

var ChoicesBuildervue_type_script_lang_ts_ChoicesBuilder = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(ChoicesBuilder, _mixins);

  var _super = Object(createSuper["a" /* default */])(ChoicesBuilder);

  function ChoicesBuilder() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ChoicesBuilder);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "draftResource", null);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "SupportedContentType", dist["SupportedContentType"]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "SupportedMode", dist["SupportedMode"]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "findOrGenerateStubbedVariantOn", flow_resource["c" /* findOrGenerateStubbedVariantOn */]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "resources", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "resourcesByUuid", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "activeFlow", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "resource_add", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "resource_createWith", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "deleteChoiceByResourceIdFrom", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "rewriteChoiceKeyFor", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "addChoiceByResourceIdTo", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(ChoicesBuilder, [{
    key: "choiceResourcesOrderedByResourcesList",
    get: function get() {
      var choiceResourceIds = Object.values(this.block.config.choices);
      return Object(lodash["intersectionWith"])(this.resources, choiceResourceIds, function (resource, choiceResourceId) {
        return resource.uuid === choiceResourceId;
      });
    }
  }, {
    key: "created",
    value: function created() {
      this.generateDraftResource();
    }
  }, {
    key: "generateDraftResource",
    value: function () {
      var _generateDraftResource = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = this;
                _context.next = 3;
                return new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate();

              case 3:
                _context.t1 = _context.sent;
                _context.t2 = {
                  uuid: _context.t1
                };
                _context.t3 = {
                  props: _context.t2
                };
                _context.next = 8;
                return _context.t0.resource_createWith.call(_context.t0, _context.t3);

              case 8:
                this.draftResource = _context.sent;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function generateDraftResource() {
        return _generateDraftResource.apply(this, arguments);
      }

      return generateDraftResource;
    }()
  }, {
    key: "addDraftResourceToChoices",
    value: function () {
      var _addDraftResourceToChoices = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.draftResource == null)) {
                  _context2.next = 3;
                  break;
                }

                console.warn('interaction-designer/block-editors/ChoicesBuilder', 'Unable to add absent draft resource to block choices.', {
                  block: this.block
                });
                return _context2.abrupt("return");

              case 3:
                this.resource_add({
                  resource: this.draftResource
                });
                this.addChoiceByResourceIdTo({
                  blockId: this.block.uuid,
                  resourceId: this.draftResource.uuid
                });
                this.$nextTick(function () {
                  return _this2.focusInputElFor(Object(lodash["last"])(_this2.$refs.choices));
                });
                _context2.next = 8;
                return this.generateDraftResource();

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addDraftResourceToChoices() {
        return _addDraftResourceToChoices.apply(this, arguments);
      }

      return addDraftResourceToChoices;
    }()
  }, {
    key: "focusInputElFor",
    value: function focusInputElFor(editor) {
      editor === null || editor === void 0 ? void 0 : editor.$refs.input.focus();
    }
  }, {
    key: "handleExistingResourceVariantChangedFor",
    value: function handleExistingResourceVariantChangedFor(resourceId, choiceIndex, resource) {
      var isLast = choiceIndex === this.choiceResourcesOrderedByResourcesList.length - 1;
      var hasEmptyValue = Object(lodash["isEmpty"])(Object(lodash["get"])(resource.values[0], 'value'));

      if (isLast && hasEmptyValue) {
        // todo: clean up resource, but should we first check for references?
        // this.resource_delete({resourceId: resource.uuid})
        this.deleteChoiceByResourceIdFrom({
          blockId: this.block.uuid,
          resourceId: resourceId
        });
        this.focusInputElFor(this.$refs.draftChoice);
        return;
      }

      this.rewriteChoiceKeyFor({
        resourceId: resourceId,
        blockId: this.block.uuid
      });
      this.$emit('choiceChanged', {
        resourceId: resourceId,
        choiceIndex: choiceIndex,
        resource: resource
      });
    }
  }]);

  return ChoicesBuilder;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(lib["b" /* Prop */])()], ChoicesBuildervue_type_script_lang_ts_ChoicesBuilder.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.State], ChoicesBuildervue_type_script_lang_ts_ChoicesBuilder.prototype, "resources", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Getter], ChoicesBuildervue_type_script_lang_ts_ChoicesBuilder.prototype, "resourcesByUuid", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Getter], ChoicesBuildervue_type_script_lang_ts_ChoicesBuilder.prototype, "activeFlow", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Mutation], ChoicesBuildervue_type_script_lang_ts_ChoicesBuilder.prototype, "resource_add", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Action], ChoicesBuildervue_type_script_lang_ts_ChoicesBuilder.prototype, "resource_createWith", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], ChoicesBuildervue_type_script_lang_ts_ChoicesBuilder.prototype, "deleteChoiceByResourceIdFrom", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], ChoicesBuildervue_type_script_lang_ts_ChoicesBuilder.prototype, "rewriteChoiceKeyFor", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], ChoicesBuildervue_type_script_lang_ts_ChoicesBuilder.prototype, "addChoiceByResourceIdTo", void 0);

ChoicesBuildervue_type_script_lang_ts_ChoicesBuilder = Object(tslib_es6["__decorate"])([Object(lib["a" /* Component */])({
  components: {
    ResourceVariantTextEditor: ResourceVariantTextEditor["a" /* default */]
  }
})], ChoicesBuildervue_type_script_lang_ts_ChoicesBuilder);
/* harmony default export */ var ChoicesBuildervue_type_script_lang_ts_ = (ChoicesBuildervue_type_script_lang_ts_ChoicesBuilder);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/ChoicesBuilder.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_editors_ChoicesBuildervue_type_script_lang_ts_ = (ChoicesBuildervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/ChoicesBuilder.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_ChoicesBuildervue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_editors_ChoicesBuilder = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "5c47":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "MobilePrimitives_SelectOneResponseBlock", function() { return /* reexport */ MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock; });
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0b5ed522-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue?vue&type=template&id=b97b0298&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mobile-primitive-select-one-response-block"},[_c('h3',{staticClass:"block-editor-header"},[_vm._v(" "+_vm._s(_vm._f("trans")(("flow-builder." + (_vm.block.type))))+" ")]),_c('fieldset',{attrs:{"disabled":!_vm.isEditable}},[_c('block-label-editor',{attrs:{"block":_vm.block},on:{"gearClicked":function($event){_vm.showSemanticLabel = !_vm.showSemanticLabel}}}),(_vm.showSemanticLabel)?_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}):_vm._e(),_c('block-name-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('choices-builder',{attrs:{"block":_vm.block},on:{"choiceChanged":_vm.handleChoiceChanged}}),_c('block-output-branching-config',{attrs:{"block":_vm.block,"has-exit-per-choice":true,"label-class":''},on:{"branchingTypeChanged":function($event){return _vm.reflowExitsWhenSwitchingToBranchingTypeNotUnified()}}}),_c('div',{staticClass:"prompt-resource"},[(_vm.promptResource)?_c('resource-editor',{attrs:{"label":_vm._f("trans")('flow-builder.prompt'),"resource":_vm.promptResource,"block":_vm.block,"flow":_vm.flow}}):_vm._e()],1),_vm._t("extras"),_c('categorization',{attrs:{"block":_vm.block}}),_c('generic-contact-property-editor',{attrs:{"block":_vm.block}}),_c('hr'),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}})],2),_c('block-id',{attrs:{"block":_vm.block}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue?vue&type=template&id=b97b0298&

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

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/index.js
var dist = __webpack_require__("9300");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/index.js + 14 modules
var vue_property_decorator_lib = __webpack_require__("1b40");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// EXTERNAL MODULE: ./src/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore.ts
var MobilePrimitives_SelectOneResponseBlockStore = __webpack_require__("ecef");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/Categorization.vue + 9 modules
var Categorization = __webpack_require__("8619");

// EXTERNAL MODULE: ./src/store/builder/index.ts
var builder = __webpack_require__("af98");

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue + 4 modules
var ResourceVariantTextEditor = __webpack_require__("bb40");

// EXTERNAL MODULE: ./src/store/flow/resource.ts
var resource = __webpack_require__("393e");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/ChoicesBuilder.vue + 4 modules
var ChoicesBuilder = __webpack_require__("5aa7");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue + 14 modules
var BlockOutputBranchingConfig = __webpack_require__("18b0");

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

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue + 4 modules
var GenericContactPropertyEditor = __webpack_require__("b4ec");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue?vue&type=script&lang=ts&





























var flowVuexNamespace = Object(lib["e" /* namespace */])('flow');
var blockVuexNamespace = Object(lib["e" /* namespace */])("flow/".concat(MobilePrimitives_SelectOneResponseBlockStore["a" /* BLOCK_TYPE */]));
var builderVuexNamespace = Object(lib["e" /* namespace */])('builder');

var MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(MobilePrimitives_SelectOneResponseBlock, _mixins);

  var _super = Object(createSuper["a" /* default */])(MobilePrimitives_SelectOneResponseBlock);

  function MobilePrimitives_SelectOneResponseBlock() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, MobilePrimitives_SelectOneResponseBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "flow", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "showSemanticLabel", false);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "SupportedMode", dist["SupportedMode"]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "findOrGenerateStubbedVariantOn", resource["c" /* findOrGenerateStubbedVariantOn */]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "resourcesByUuid", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block_createBlockExitWith", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block_convertExitFormationToUnified", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "reflowExitsFromChoices", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "handleBranchingTypeChangedToUnified", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "isEditable", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(MobilePrimitives_SelectOneResponseBlock, [{
    key: "promptResource",
    get: function get() {
      return this.resourcesByUuid[this.block.config.prompt];
    }
  }, {
    key: "handleChoiceChanged",
    value: function handleChoiceChanged() {
      var _this$block = this.block,
          blockId = _this$block.uuid,
          metadata = _this$block.vendor_metadata;
      var EXIT_PER_CHOICE = BlockOutputBranchingConfig["b" /* OutputBranchingType */].EXIT_PER_CHOICE,
          UNIFIED = BlockOutputBranchingConfig["b" /* OutputBranchingType */].UNIFIED;

      if (metadata.io_viamo.branchingType === UNIFIED) {
        this.handleBranchingTypeChangedToUnified({
          block: this.block
        });
      }

      if (metadata.io_viamo.branchingType !== EXIT_PER_CHOICE) {
        return;
      }

      this.reflowExitsFromChoices({
        blockId: blockId
      });
    }
  }, {
    key: "reflowExitsWhenSwitchingToBranchingTypeNotUnified",
    value: function reflowExitsWhenSwitchingToBranchingTypeNotUnified() {
      var _this$block2 = this.block,
          blockId = _this$block2.uuid,
          metadata = _this$block2.vendor_metadata;
      var EXIT_PER_CHOICE = BlockOutputBranchingConfig["b" /* OutputBranchingType */].EXIT_PER_CHOICE,
          ADVANCED = BlockOutputBranchingConfig["b" /* OutputBranchingType */].ADVANCED;
      var isEnteringChoiceOrAdvancedBranchingType = Object(lodash["includes"])([EXIT_PER_CHOICE, ADVANCED], metadata.io_viamo.branchingType);

      if (!isEnteringChoiceOrAdvancedBranchingType) {
        this.handleBranchingTypeChangedToUnified({
          block: this.block
        });
        return;
      }

      this.reflowExitsFromChoices({
        blockId: blockId
      });
    }
  }]);

  return MobilePrimitives_SelectOneResponseBlock;
}(Object(vue_class_component_esm["c" /* mixins */])(lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Getter], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "resourcesByUuid", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Action], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "block_createBlockExitWith", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Action], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "block_convertExitFormationToUnified", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "reflowExitsFromChoices", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "handleBranchingTypeChangedToUnified", void 0);

Object(tslib_es6["__decorate"])([builderVuexNamespace.Getter], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock.prototype, "isEditable", void 0);

MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    GenericContactPropertyEditor: GenericContactPropertyEditor["a" /* default */],
    ResourceVariantTextEditor: ResourceVariantTextEditor["a" /* default */],
    BlockExitSemanticLabelEditor: ExitSemanticLabelEditor["a" /* default */],
    BlockId: BlockId["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockNameEditor: NameEditor["a" /* default */],
    BlockOutputBranchingConfig: BlockOutputBranchingConfig["c" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    ChoicesBuilder: ChoicesBuilder["a" /* default */],
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    ResourceEditor: ResourceEditor["a" /* default */],
    Categorization: Categorization["a" /* default */]
  }
})], MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock);

/* harmony default export */ var MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_ = (MobilePrimitives_SelectOneResponseBlockvue_type_script_lang_ts_MobilePrimitives_SelectOneResponseBlock);
var install = Object(builder["d" /* createDefaultBlockTypeInstallerFor */])(MobilePrimitives_SelectOneResponseBlockStore["a" /* BLOCK_TYPE */], MobilePrimitives_SelectOneResponseBlockStore["c" /* default */]);
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

/***/ "70f0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0b5ed522-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue?vue&type=template&id=5c7a7930&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('text-editor',{attrs:{"is-editable":_vm.isEditable,"label":_vm._f("trans")('flow-builder.block-exit-semantic-label'),"placeholder":_vm._f("trans")('flow-builder.enter-block-exit-semantic-label')},model:{value:(_vm.semanticLabel),callback:function ($$v) {_vm.semanticLabel=$$v},expression:"semanticLabel"}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue?vue&type=template&id=5c7a7930&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("f3f3");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue?vue&type=script&lang=js&


/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */



/* harmony default export */ var ExitSemanticLabelEditorvue_type_script_lang_js_ = ({
  components: {
    TextEditor: TextEditor["a" /* default */]
  },
  mixins: [lang["b" /* lang */]],
  props: {
    isEditable: {
      default: true,
      type: Boolean
    },
    exit: {
      type: Object,
      required: true
    }
  },
  computed: {
    semanticLabel: {
      get: function get() {
        return this.exit.semantic_label;
      },
      set: function set(value) {
        this.exit.semantic_label = value;
        this.$emit('commitSemanticLabel', value);
      }
    }
  },
  methods: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapMutations */])('flow', ['block_setExitSemanticLabel']))
});
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var block_editors_ExitSemanticLabelEditorvue_type_script_lang_js_ = (ExitSemanticLabelEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_ExitSemanticLabelEditorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ExitSemanticLabelEditor = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "ecef":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BLOCK_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return stateFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return mutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return actions; });
/* harmony import */ var _Users_rs_Documents_Voto_floip_flow_builder_node_modules_vue_babel_preset_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d0ff");
/* harmony import */ var _Users_rs_Documents_Voto_floip_flow_builder_node_modules_vue_babel_preset_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("c964");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("96cf");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("e260");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("ddb0");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("99af");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("b64b");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("fb6a");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("e6cf");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("3ca3");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("d81d");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("cca6");
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("a434");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("a15b");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _floip_flow_runner__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("9300");
/* harmony import */ var _floip_flow_runner__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_floip_flow_runner__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _floip_flow_runner_dist_domain_IdGeneratorUuidV4__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("31aa");
/* harmony import */ var _floip_flow_runner_dist_domain_IdGeneratorUuidV4__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_floip_flow_runner_dist_domain_IdGeneratorUuidV4__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("2ef0");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_18__);



















var BLOCK_TYPE = 'MobilePrimitives.SelectOneResponse';
var stateFactory = function stateFactory() {
  return {};
};
var getters = {};
var mutations = {};
var actions = {
  rewriteChoiceKeyFor: function rewriteChoiceKeyFor(_ref, _ref2) {
    var rootGetters = _ref.rootGetters,
        dispatch = _ref.dispatch;
    var resourceId = _ref2.resourceId,
        blockId = _ref2.blockId;
    var block = Object(_floip_flow_runner__WEBPACK_IMPORTED_MODULE_15__["findBlockWith"])(blockId, rootGetters['flow/activeFlow']);
    var resource = rootGetters['flow/resourcesByUuid'][resourceId];

    if (resource == null) {
      throw new _floip_flow_runner__WEBPACK_IMPORTED_MODULE_15__["ValidationException"]("Unable to find resource for choice: ".concat(resourceId));
    }

    var choiceKey = String(Object(lodash__WEBPACK_IMPORTED_MODULE_18__["findKey"])(block.config.choices, function (v) {
      return v === resourceId;
    })); // omit() will inadvertently but desirably remove an empty `choiceKey`

    block.config.choices = Object(lodash__WEBPACK_IMPORTED_MODULE_18__["omit"])(block.config.choices, choiceKey);
    dispatch('addChoiceByResourceIdTo', {
      blockId: blockId,
      resourceId: resourceId
    });
  },
  addChoiceByResourceIdTo: function addChoiceByResourceIdTo(_ref3, _ref4) {
    var rootGetters = _ref3.rootGetters;
    var blockId = _ref4.blockId,
        resourceId = _ref4.resourceId;
    var block = Object(_floip_flow_runner__WEBPACK_IMPORTED_MODULE_15__["findBlockWith"])(blockId, rootGetters['flow/activeFlow']);
    var resource = rootGetters['flow/resourcesByUuid'][resourceId];

    if (resource == null) {
      throw new _floip_flow_runner__WEBPACK_IMPORTED_MODULE_15__["ValidationException"]("Unable to find resource for choice: ".concat(resourceId));
    } // defaulted to `resourceId` to mitigate empty keys and associated error handling altogether


    var desiredChoiceKey = Object(lodash__WEBPACK_IMPORTED_MODULE_18__["snakeCase"])(Object(lodash__WEBPACK_IMPORTED_MODULE_18__["get"])(resource.values[0], 'value')) || resource.uuid;
    var doesChoiceKeyAlreadyExist = (desiredChoiceKey in block.config.choices); // apply suffix as resourceId when duplicated to prevent overwriting as input is received

    var suffix = doesChoiceKeyAlreadyExist ? "-".concat(resource.uuid) : '';
    vue__WEBPACK_IMPORTED_MODULE_17___default.a.set(block.config.choices, "".concat(desiredChoiceKey).concat(suffix), resource.uuid);
  },
  deleteChoiceByResourceIdFrom: function deleteChoiceByResourceIdFrom(_ref5, _ref6) {
    var rootGetters = _ref5.rootGetters;
    var blockId = _ref6.blockId,
        resourceId = _ref6.resourceId;
    var block = Object(_floip_flow_runner__WEBPACK_IMPORTED_MODULE_15__["findBlockWith"])(blockId, rootGetters['flow/activeFlow']);
    var choiceKey = String(Object(lodash__WEBPACK_IMPORTED_MODULE_18__["findKey"])(block.config.choices, function (v) {
      return v === resourceId;
    }));
    vue__WEBPACK_IMPORTED_MODULE_17___default.a.delete(block.config.choices, choiceKey);
  },
  reflowExitsFromChoices: function reflowExitsFromChoices(_ref7, _ref8) {
    return Object(_Users_rs_Documents_Voto_floip_flow_builder_node_modules_vue_babel_preset_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var dispatch, rootGetters, blockId, block, choices, exits, choiceKeys, exitsForChoices;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch = _ref7.dispatch, rootGetters = _ref7.rootGetters;
              blockId = _ref8.blockId;
              block = Object(_floip_flow_runner__WEBPACK_IMPORTED_MODULE_15__["findBlockWith"])(blockId, rootGetters['flow/activeFlow']);
              choices = block.config.choices, exits = block.exits;
              choiceKeys = Object.keys(choices);
              exitsForChoices = exits.slice(0, -1); // non-default exits; default should always be last
              // reflow exits based on choices

              _context2.next = 8;
              return Promise.all(choiceKeys.map( /*#__PURE__*/function () {
                var _ref9 = Object(_Users_rs_Documents_Voto_floip_flow_builder_node_modules_vue_babel_preset_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(choiceKey, i) {
                  var uuid, exit;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!(exitsForChoices[i] == null)) {
                            _context.next = 8;
                            break;
                          }

                          _context.next = 3;
                          return new _floip_flow_runner_dist_domain_IdGeneratorUuidV4__WEBPACK_IMPORTED_MODULE_16__["IdGeneratorUuidV4"]().generate();

                        case 3:
                          uuid = _context.sent;
                          _context.next = 6;
                          return dispatch('flow/block_createBlockExitWith', {
                            props: {
                              uuid: uuid
                            }
                          }, {
                            root: true
                          });

                        case 6:
                          exit = _context.sent;
                          exitsForChoices.push(exit);

                        case 8:
                          Object.assign(exitsForChoices[i], {
                            name: choiceKey,
                            test: "block.value = \"".concat(choiceKey, "\"")
                          });

                        case 9:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x, _x2) {
                  return _ref9.apply(this, arguments);
                };
              }()));

            case 8:
              exits.splice.apply(exits, [0, exits.length - 1].concat(Object(_Users_rs_Documents_Voto_floip_flow_builder_node_modules_vue_babel_preset_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(exitsForChoices)));

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  createWith: function createWith(_ref10, _ref11) {
    return Object(_Users_rs_Documents_Voto_floip_flow_builder_node_modules_vue_babel_preset_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var dispatch, props, blankPromptResource, exits;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch = _ref10.dispatch;
              props = _ref11.props;
              _context3.next = 4;
              return dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {
                root: true
              });

            case 4:
              blankPromptResource = _context3.sent;
              _context3.t0 = dispatch;
              _context3.next = 8;
              return new _floip_flow_runner_dist_domain_IdGeneratorUuidV4__WEBPACK_IMPORTED_MODULE_16__["IdGeneratorUuidV4"]().generate();

            case 8:
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
              _context3.next = 14;
              return (0, _context3.t0)('flow/block_createBlockDefaultExitWith', _context3.t3, _context3.t4);

            case 14:
              _context3.t5 = _context3.sent;
              exits = [_context3.t5];
              return _context3.abrupt("return", Object(lodash__WEBPACK_IMPORTED_MODULE_18__["defaultsDeep"])(props, {
                type: BLOCK_TYPE,
                name: '',
                label: '',
                semantic_label: '',
                config: {
                  prompt: blankPromptResource.uuid,
                  choices: {}
                },
                exits: exits,
                tags: [],
                vendor_metadata: {}
              }));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  handleBranchingTypeChangedToUnified: function handleBranchingTypeChangedToUnified(_ref12, _ref13) {
    var dispatch = _ref12.dispatch;
    var block = _ref13.block;
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: formatTestValueForUnifiedBranchingType(block)
    }, {
      root: true
    });
  }
};

function formatTestValueForUnifiedBranchingType(block) {
  var blockChoicesKey = Object.keys(block.config.choices);

  if (blockChoicesKey.length === 0) {
    console.warn('Choices are empty for SelectOneBlock, providing `true` by default');
    return 'true';
  }

  return "OR(".concat(Object(lodash__WEBPACK_IMPORTED_MODULE_18__["map"])(blockChoicesKey, function (choice) {
    return "block.value = \"".concat(choice, "\"");
  }).join(','), ")");
}

/* harmony default export */ __webpack_exports__["c"] = ({
  namespaced: true,
  state: stateFactory,
  getters: getters,
  mutations: mutations,
  actions: actions
});

/***/ })

}]);
//# sourceMappingURL=flow-builder.umd.6.js.map