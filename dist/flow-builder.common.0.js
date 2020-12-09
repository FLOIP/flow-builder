((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[0],{

/***/ "0be7":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".block-text-content-editor-for-lang-and-type{margin-bottom:.5em}.block-text-content-editor-for-lang-and-type .content-editor{position:relative}.block-text-content-editor-for-lang-and-type .content-editor textarea{height:56px}.block-text-content-editor-for-lang-and-type .content-editor input[type=text]:not(:focus)+button,.block-text-content-editor-for-lang-and-type .content-editor textarea:not(:focus)+button{opacity:1}.block-text-content-editor-for-lang-and-type .content-editor input[type=text]+button,.block-text-content-editor-for-lang-and-type .content-editor textarea+button{position:absolute;bottom:7px;right:10px;transition:opacity .2s ease-in-out;opacity:0}.block-text-content-editor-for-lang-and-type .content-editor-selected input[type=text],.block-text-content-editor-for-lang-and-type .content-editor-selected textarea{background-color:#f8f8f8}.block-text-content-editor-for-lang-and-type .content-toolbar{margin-top:1px}.invisible{opacity:0}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "192b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b019c1b8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue?vue&type=template&id=65c8906b&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"starting-block-button"},[( true)?[_c('h4',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.options')))]),_c('div',{staticClass:"form-group"},[_c('button',{staticClass:"btn btn-default btn-sm",attrs:{"type":"button","disabled":_vm.isStartBlock},on:{"click":function($event){return _vm.setStartBlock($event)}}},[(_vm.isStartBlock)?[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.currently-set-as-starting-block'))+" ")]:[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.set-as-starting-block'))+" ")]],2)])]:undefined],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue?vue&type=template&id=65c8906b&

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

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__("60a3");

// EXTERNAL MODULE: ./src/lib/filters/lang.js
var lang = __webpack_require__("3a37");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue?vue&type=script&lang=ts&









var flowVuexNamespace = Object(lib["b" /* namespace */])('flow');

var FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(FirstBlockEditorButton, _Vue);

  var _super = Object(createSuper["a" /* default */])(FirstBlockEditorButton);

  function FirstBlockEditorButton() {
    Object(classCallCheck["a" /* default */])(this, FirstBlockEditorButton);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(FirstBlockEditorButton, [{
    key: "setStartBlock",
    value: function setStartBlock(event) {
      var flowId = this.flow.uuid,
          blockId = this.blockId;
      this.flow_setFirstBlockId({
        flowId: flowId,
        blockId: blockId
      });
    }
  }, {
    key: "isStartBlock",
    get: function get() {
      return this.blockId === this.flow.firstBlockId;
    }
  }]);

  return FirstBlockEditorButton;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  default: true
})], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton.prototype, "isEditable", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton.prototype, "blockId", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Mutation], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton.prototype, "flow_setFirstBlockId", void 0);

FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  mixins: [lang["a" /* default */]]
})], FirstBlockEditorButtonvue_type_script_lang_ts_FirstBlockEditorButton);
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b019c1b8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue?vue&type=template&id=07ceef3b&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('text-editor',{attrs:{"is-editable":_vm.isEditable,"label":_vm._f("trans")('flow-builder.block-semantic-label'),"placeholder":_vm._f("trans")('flow-builder.enter-block-semantic-label')},model:{value:(_vm.semanticLabel),callback:function ($$v) {_vm.semanticLabel=$$v},expression:"semanticLabel"}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue?vue&type=template&id=07ceef3b&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("ade3");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./src/lib/filters/lang.js
var lang = __webpack_require__("3a37");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue?vue&type=script&lang=js&



var _components$mixins$pr;

//
//
//
//
//
//
//
//
//



/* harmony default export */ var SemanticLabelEditorvue_type_script_lang_js_ = (_components$mixins$pr = {
  components: {
    TextEditor: TextEditor["a" /* default */]
  },
  mixins: [lang["a" /* default */]],
  props: {
    isEditable: {
      default: true,
      type: Boolean
    },
    block: {
      type: Object,
      required: true
    }
  }
}, Object(defineProperty["a" /* default */])(_components$mixins$pr, "mixins", [lang["a" /* default */]]), Object(defineProperty["a" /* default */])(_components$mixins$pr, "computed", {
  semanticLabel: {
    get: function get() {
      return this.block.semanticLabel;
    },
    set: function set(value) {
      this.block_setSemanticLabel({
        blockId: this.block.uuid,
        value: value
      });
    }
  }
}), Object(defineProperty["a" /* default */])(_components$mixins$pr, "methods", Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapMutations */])('flow', ['block_setSemanticLabel']))), _components$mixins$pr);
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

/***/ "3411":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b019c1b8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/LabelEditor.vue?vue&type=template&id=1cd96f6e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('text-editor',{attrs:{"is-editable":_vm.isEditable,"label":_vm._f("trans")('flow-builder.block-label'),"placeholder":_vm._f("trans")('flow-builder.enter-block-label')},model:{value:(_vm.label),callback:function ($$v) {_vm.label=$$v},expression:"label"}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue?vue&type=template&id=1cd96f6e&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("ade3");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./src/lib/filters/lang.js
var lang = __webpack_require__("3a37");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/LabelEditor.vue?vue&type=script&lang=js&



var _components$mixins$pr;

//
//
//
//
//
//
//
//
//



/* harmony default export */ var LabelEditorvue_type_script_lang_js_ = (_components$mixins$pr = {
  components: {
    TextEditor: TextEditor["a" /* default */]
  },
  mixins: [lang["a" /* default */]],
  props: {
    isEditable: {
      default: true,
      type: Boolean
    },
    block: {
      type: Object,
      required: true
    }
  }
}, Object(defineProperty["a" /* default */])(_components$mixins$pr, "mixins", [lang["a" /* default */]]), Object(defineProperty["a" /* default */])(_components$mixins$pr, "computed", {
  label: {
    get: function get() {
      return this.block.label;
    },
    set: function set(value) {
      this.block_setLabel({
        blockId: this.block.uuid,
        value: value
      });
    }
  }
}), Object(defineProperty["a" /* default */])(_components$mixins$pr, "methods", Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapMutations */])('flow', ['block_setLabel']))), _components$mixins$pr);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var block_editors_LabelEditorvue_type_script_lang_js_ = (LabelEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_LabelEditorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var LabelEditor = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "510a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: ResourceEditor

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b019c1b8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/resource-editors/ResourceEditor.vue?vue&type=template&id=1a97fbb5&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"resource-editor"},[_c('hr'),(_vm.label)?_c('h4',[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._l((_vm.flow.languages),function(ref){
var languageId = ref.id;
var language = ref.name;
return [_c('div',{staticClass:"block-content-editor-lang"},[_c('h5',{staticClass:"label label-info"},[_vm._v(_vm._s(_vm._f("trans")(language || 'flow-builder.unknown-language')))])]),_vm._l((_vm.flow.supportedModes),function(mode){return [_c('h5',[_vm._v(_vm._s(_vm._f("trans")(("flow-builder." + mode + "-content"))))]),_vm._l((_vm.discoverContentTypesFor(mode)),function(contentType){return [(contentType === _vm.SupportedContentType.TEXT)?_c('resource-variant-text-editor',{attrs:{"resource-id":_vm.resource.uuid,"resource-variant":_vm.findOrGenerateStubbedVariantOn(
                                              _vm.resource,
                                              {languageId: languageId, contentType: contentType, modes: [mode]}),"mode":mode,"is-editable": true || false,"enable-autogen-button": true || false}}):_vm._e(),(contentType === _vm.SupportedContentType.AUDIO)?_c('div',[_c('audio-library-selector',{attrs:{"audioFiles":_vm.availableAudio,"langId":languageId,"resourceId":_vm.resource.uuid,"selectedAudioFile":_vm.findOrGenerateStubbedVariantOn(
                 _vm.resource,
                 {languageId: languageId, contentType: contentType, modes: [mode]}).value}})],1):_vm._e()]})]})]})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/resource-editors/ResourceEditor.vue?vue&type=template&id=1a97fbb5&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__("262e");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__("2caf");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/index.js
var dist = __webpack_require__("9300");

// EXTERNAL MODULE: ./src/lib/filters/lang.js
var lang = __webpack_require__("3a37");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__("60a3");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue + 4 modules
var ResourceVariantTextEditor = __webpack_require__("bb40");

// EXTERNAL MODULE: ./src/store/flow/resource.ts + 1 modules
var resource = __webpack_require__("393e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b019c1b8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/AudioLibrarySelector.vue?vue&type=template&id=797950bd&
var AudioLibrarySelectorvue_type_template_id_797950bd_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"audio-library-selector"},[(_vm.selectedAudioFile)?_c('audio-library-selection',{attrs:{"audioFile":_vm.selectedAudioFile,"langId":_vm.langId},on:{"clear":_vm.clearSelection}}):[_c('audio-library-search-field',{attrs:{"langId":_vm.langId,"audioFiles":_vm.audioFiles},on:{"select":_vm.selectAudioFile}})]],2)}
var AudioLibrarySelectorvue_type_template_id_797950bd_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/common/AudioLibrarySelector.vue?vue&type=template&id=797950bd&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");
var lodash_default = /*#__PURE__*/__webpack_require__.n(lodash);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b019c1b8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/AudioLibrarySearchField.vue?vue&type=template&id=02dbbc38&scoped=true&
var AudioLibrarySearchFieldvue_type_template_id_02dbbc38_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"audio-library-search-field dropdown"},[_c('div',{staticClass:"input-group"},[_c('span',{staticClass:"input-group-btn"},[_c('button',{staticClass:"btn btn-default",class:{active: _vm.isEntireLibraryModeEnabled},on:{"click":function($event){$event.preventDefault();return _vm.toggleAudioLibrary($event)}}},[_c('i',{staticClass:"glyphicon glyphicon-search"}),_c('span',{staticClass:"caret"})])]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.rawQuery),expression:"rawQuery"}],staticClass:"form-control",attrs:{"type":"text","placeholder":_vm._f("trans")('flow-builder.search-audio-library'),"disabled":_vm.isEntireLibraryModeEnabled},domProps:{"value":(_vm.rawQuery)},on:{"focus":_vm.activate,"blur":_vm.deactivate,"input":[function($event){if($event.target.composing){ return; }_vm.rawQuery=$event.target.value},_vm.resetPagination]}})]),(_vm.query || _vm.isAudioLibraryEmpty || _vm.isEntireLibraryModeEnabled)?_c('ul',{staticClass:"dropdown-menu"},[(_vm.isEntireLibraryModeEnabled)?[_c('li',{staticClass:"disabled"},[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();}}},[_c('button',{staticClass:"close",on:{"click":_vm.toggleAudioLibrary}},[_vm._v("x")]),_c('i',{staticClass:"glyphicon glyphicon-info-sign"}),_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.showing-entire-audio-library'))+"… ")])]),_c('li',{staticClass:"divider",attrs:{"role":"separator"}})]:_vm._e(),(!_vm.isAudioLibraryEmpty)?[_vm._l((_vm.search(_vm.query).slice(_vm.offset * _vm.limit, (_vm.offset + 1) * _vm.limit)),function(audio){return _c('li',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.select(audio)}}},[_vm._v(_vm._s(audio.description))])])}),(_vm.query.length >= 3 && !_vm.search(_vm.query).length)?_c('li',{staticClass:"disabled"},[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();}}},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.no-audio-files-found-for-X'))+" \""),_c('em',[_vm._v(_vm._s(_vm.query))]),_vm._v("\".")])]):_vm._e(),(_vm.query && _vm.query.length < 3)?_c('li',{staticClass:"disabled"},[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();}}},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.enter-at-least-three-chars')))])]):_vm._e(),(_vm.hasPrevious || _vm.hasNext)?[_c('li',{staticClass:"divider",attrs:{"role":"separator"}}),_c('li',{staticClass:"pagers"},[_c('a',{staticClass:"col-md-6",class:{disabled: !_vm.hasPrevious},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.decrementPage($event)}}},[_c('i',{staticClass:"glyphicon glyphicon-chevron-left"}),_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.previous'))+" ")]),_c('a',{staticClass:"col-md-6 text-right",class:{disabled: !_vm.hasNext},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.incrementPage($event)}}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.next'))+" "),_c('i',{staticClass:"glyphicon glyphicon-chevron-right"})])])]:_vm._e()]:_vm._e(),(_vm.isAudioLibraryEmpty)?_c('li',{staticClass:"disabled"},[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();}}},[_c('i',{staticClass:"glyphicon glyphicon-warning-sign"}),_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.audio-lib-empty-for-this-org'))+" ")])]):_vm._e()],2):_vm._e()])}
var AudioLibrarySearchFieldvue_type_template_id_02dbbc38_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/common/AudioLibrarySearchField.vue?vue&type=template&id=02dbbc38&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./node_modules/fuse.js/dist/fuse.js
var fuse = __webpack_require__("ffe7");
var fuse_default = /*#__PURE__*/__webpack_require__.n(fuse);

// EXTERNAL MODULE: ./node_modules/vue-focus/dist/vue-focus.common.js
var vue_focus_common = __webpack_require__("f837");
var vue_focus_common_default = /*#__PURE__*/__webpack_require__.n(vue_focus_common);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/AudioLibrarySearchField.vue?vue&type=script&lang=js&



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
//
//
//
//
//
//
//




/* harmony default export */ var AudioLibrarySearchFieldvue_type_script_lang_js_ = ({
  props: ['langId', 'audioFiles'],
  mixins: [vue_focus_common_default.a.mixin, lang["a" /* default */]],
  data: function data() {
    return {
      isActive: false,
      // querying
      rawQuery: '',
      cache: {},
      isEntireLibraryModeEnabled: false,
      // pagination
      offset: 0,
      limit: 10
    };
  },
  computed: {
    query: function query() {
      return lodash_default.a.trim(this.rawQuery);
    },
    isAudioLibraryEmpty: function isAudioLibraryEmpty() {
      return this.isActive && !this.audioFiles.length;
    },
    hasNext: function hasNext() {
      return this.search(this.query).length / (this.offset + 1) > this.limit;
    },
    hasPrevious: function hasPrevious() {
      return this.offset > 0;
    }
  },
  methods: {
    search: function search(query) {
      if (this.isEntireLibraryModeEnabled) {
        return this.audioFiles;
      }

      if (query.length < 3) {
        return [];
      }

      console.debug('flow-builder.ResourceViewer.AudioLibrarySearchField', 'searching', query);

      if (query in this.cache) {
        console.debug('flow-builder.ResourceViewer.AudioLibrarySearchField', 'cache hit', query);
        return this.cache[query];
      }

      console.debug('flow-builder.ResourceViewer.AudioLibrarySearchField', 'cache miss', query);
      var keys = ['filename', 'description'];
      return this.cache[query] = new fuse_default.a(this.audioFiles, {
        keys: keys
      }).search(query);
    },
    // todo: push pagination into isolated component
    incrementPage: function incrementPage() {
      this.hasNext && (this.offset += 1);
    },
    decrementPage: function decrementPage() {
      this.hasPrevious && (this.offset -= 1);
    },
    resetPagination: function resetPagination() {
      this.offset = 0;
    },
    toggleAudioLibrary: function toggleAudioLibrary() {
      this.isEntireLibraryModeEnabled = !this.isEntireLibraryModeEnabled;
      this.resetPagination();
    },
    select: function select(audio) {
      this.$emit('select', {
        value: audio,
        langId: this.langId
      });
    },
    activate: function activate() {
      this.isActive = true;
    },
    deactivate: function deactivate() {
      this.isActive = false;
    }
  }
});
// CONCATENATED MODULE: ./src/components/common/AudioLibrarySearchField.vue?vue&type=script&lang=js&
 /* harmony default export */ var common_AudioLibrarySearchFieldvue_type_script_lang_js_ = (AudioLibrarySearchFieldvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/common/AudioLibrarySearchField.vue?vue&type=style&index=0&id=02dbbc38&lang=scss&scoped=true&
var AudioLibrarySearchFieldvue_type_style_index_0_id_02dbbc38_lang_scss_scoped_true_ = __webpack_require__("7e3b");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/common/AudioLibrarySearchField.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  common_AudioLibrarySearchFieldvue_type_script_lang_js_,
  AudioLibrarySearchFieldvue_type_template_id_02dbbc38_scoped_true_render,
  AudioLibrarySearchFieldvue_type_template_id_02dbbc38_scoped_true_staticRenderFns,
  false,
  null,
  "02dbbc38",
  null
  
)

/* harmony default export */ var AudioLibrarySearchField = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b019c1b8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/AudioLibrarySelection.vue?vue&type=template&id=069023b1&
var AudioLibrarySelectionvue_type_template_id_069023b1_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"well well-sm audio-library-selection",class:{
           'tree-audio-control-text-container-selectable': _vm.selectable,
           'tree-audio-control-text-container-selected': !_vm.selectable},attrs:{"data-audio-file-container-language":_vm.langId}},[_c('button',{staticClass:"audio-library-selection-clear-selection btn-ghost pull-right",on:{"click":function($event){$event.preventDefault();return _vm.clear($event)}}},[_c('i',{staticClass:"glyphicon glyphicon-remove"})]),_c('div',{staticClass:"btn-group audio-library-selection-download-dropdown"},[_vm._m(0),_c('ul',{staticClass:"dropdown-menu dropdown-menu-right"},[_c('li',[_c('a',{staticClass:"tree-block-audio-files-download-original",attrs:{"href":_vm.audioFileUrl,"target":"_blank"}},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.original-file')))])])])]),_c('p',{staticClass:"audio-file-description",attrs:{"title":_vm.audioFileUrl}},[_vm._v(" "+_vm._s(_vm.audioFileUrl)+" ")]),_c('div',{staticClass:"btn-toolbar"},[(_vm.selectable)?_c('button',{staticClass:"btn btn-default btn-xs",on:{"click":function($event){$event.preventDefault();return _vm.select($event)}}},[_c('i',{staticClass:"glyphicon glyphicon-ok"})]):_vm._e()])])}
var AudioLibrarySelectionvue_type_template_id_069023b1_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn btn-ghost dropdown-toggle",attrs:{"type":"button","data-toggle":"dropdown"}},[_c('span',{staticClass:"glyphicon glyphicon-download-alt",attrs:{"aria-hidden":"true"}}),_c('span',{staticClass:"caret"})])}]


// CONCATENATED MODULE: ./src/components/common/AudioLibrarySelection.vue?vue&type=template&id=069023b1&

// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__("c1df");
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// CONCATENATED MODULE: ./src/lib/filters/moment.js

/* harmony default export */ var filters_moment = ({
  filters: {
    formatDate: function formatDate(date) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'llll';

      if (!date) {
        return '';
      }

      return moment_default.a.utc(date).format(format);
    },
    fromNow: function fromNow(date, withoutSuffix) {
      return moment_default.a.utc(date).fromNow(withoutSuffix);
    },
    formatDuration: function formatDuration(duration) {
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'seconds';
      var withSuffix = arguments.length > 2 ? arguments[2] : undefined;
      var currentLocale = moment_default.a.locale();
      moment_default.a.locale('en'); //this function only gets used in english.

      var result = moment_default.a.duration(duration, unit).humanize(withSuffix);
      moment_default.a.locale(currentLocale);
      return result;
    },
    formatDurationLocalized: function formatDurationLocalized(duration, locale) {
      var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'seconds';
      var withSuffix = arguments.length > 3 ? arguments[3] : undefined;
      var currentLocale = moment_default.a.locale();
      moment_default.a.locale(locale);
      var result = moment_default.a.duration(duration, unit).humanize(withSuffix);
      moment_default.a.locale(currentLocale);
      return result;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/AudioLibrarySelection.vue?vue&type=script&lang=js&
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
//
//
//


/* harmony default export */ var AudioLibrarySelectionvue_type_script_lang_js_ = ({
  props: ['audioFile', 'selected', 'selectable', 'langId'],
  mixins: [lang["a" /* default */], filters_moment],
  computed: {
    audioFileUrl: function audioFileUrl() {
      return this.audioFile;
    }
  },
  methods: {
    select: function select() {
      this.$emit('select');
    },
    clear: function clear() {
      this.$emit('clear');
    }
  }
});
// CONCATENATED MODULE: ./src/components/common/AudioLibrarySelection.vue?vue&type=script&lang=js&
 /* harmony default export */ var common_AudioLibrarySelectionvue_type_script_lang_js_ = (AudioLibrarySelectionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/common/AudioLibrarySelection.vue?vue&type=style&index=0&lang=scss&
var AudioLibrarySelectionvue_type_style_index_0_lang_scss_ = __webpack_require__("79f2");

// CONCATENATED MODULE: ./src/components/common/AudioLibrarySelection.vue






/* normalize component */

var AudioLibrarySelection_component = Object(componentNormalizer["a" /* default */])(
  common_AudioLibrarySelectionvue_type_script_lang_js_,
  AudioLibrarySelectionvue_type_template_id_069023b1_render,
  AudioLibrarySelectionvue_type_template_id_069023b1_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AudioLibrarySelection = (AudioLibrarySelection_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/AudioLibrarySelector.vue?vue&type=script&lang=js&

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





/* harmony default export */ var AudioLibrarySelectorvue_type_script_lang_js_ = ({
  props: ['alternateSelections', 'selectedAudioFile', 'langId', 'audioFiles', 'isPlaying', 'audioPlayerUrl', 'resourceId'],
  components: {
    AudioLibrarySearchField: AudioLibrarySearchField,
    AudioLibrarySelection: AudioLibrarySelection
  },
  computed: {
    selectable: function selectable() {
      return !lodash_default.a.isEmpty(this.alternateSelections);
    }
  },
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["a" /* mapActions */])('flow', ['resource_setOrCreateValueModeSpecific'])), {}, {
    clearSelection: function clearSelection() {
      this.resource_setOrCreateValueModeSpecific({
        resourceId: this.resourceId,
        filter: {
          languageId: this.langId,
          contentType: dist["SupportedContentType"].AUDIO,
          modes: [dist["SupportedMode"].IVR]
        },
        value: ''
      });
    },
    selectAudioFile: function selectAudioFile(_ref) {
      var value = _ref.value,
          langId = _ref.langId;
      this.resource_setOrCreateValueModeSpecific({
        resourceId: this.resourceId,
        filter: {
          languageId: langId,
          contentType: dist["SupportedContentType"].AUDIO,
          modes: [dist["SupportedMode"].IVR]
        },
        value: value.filename
      });
    }
  })
});
// CONCATENATED MODULE: ./src/components/common/AudioLibrarySelector.vue?vue&type=script&lang=js&
 /* harmony default export */ var common_AudioLibrarySelectorvue_type_script_lang_js_ = (AudioLibrarySelectorvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/common/AudioLibrarySelector.vue





/* normalize component */

var AudioLibrarySelector_component = Object(componentNormalizer["a" /* default */])(
  common_AudioLibrarySelectorvue_type_script_lang_js_,
  AudioLibrarySelectorvue_type_template_id_797950bd_render,
  AudioLibrarySelectorvue_type_template_id_797950bd_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AudioLibrarySelector = (AudioLibrarySelector_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/resource-editors/ResourceEditor.vue?vue&type=script&lang=ts&














var ResourceEditorvue_type_script_lang_ts_ResourceEditor = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(ResourceEditor, _Vue);

  var _super = Object(createSuper["a" /* default */])(ResourceEditor);

  function ResourceEditor() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ResourceEditor);

    _this = _super.apply(this, arguments);
    _this.discoverContentTypesFor = resource["b" /* discoverContentTypesFor */];
    _this.findOrGenerateStubbedVariantOn = resource["c" /* findOrGenerateStubbedVariantOn */];
    _this.SupportedMode = dist["SupportedMode"];
    _this.SupportedContentType = dist["SupportedContentType"];
    return _this;
  }

  return ResourceEditor;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([lib["a" /* Getter */]], ResourceEditorvue_type_script_lang_ts_ResourceEditor.prototype, "availableAudio", void 0);

ResourceEditorvue_type_script_lang_ts_ResourceEditor = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  props: {
    flow: {
      type: Object,
      default: null
    },
    label: {
      type: [String, Number]
    },
    resource: {
      type: Object,
      default: null
    }
  },
  mixins: [lang["a" /* default */]],
  components: {
    AudioLibrarySelector: AudioLibrarySelector,
    ResourceVariantTextEditor: ResourceVariantTextEditor["a" /* default */]
  }
})], ResourceEditorvue_type_script_lang_ts_ResourceEditor);

/* harmony default export */ var ResourceEditorvue_type_script_lang_ts_ = (ResourceEditorvue_type_script_lang_ts_ResourceEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/resource-editors/ResourceEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var resource_editors_ResourceEditorvue_type_script_lang_ts_ = (ResourceEditorvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/resource-editors/ResourceEditor.vue





/* normalize component */

var ResourceEditor_component = Object(componentNormalizer["a" /* default */])(
  resource_editors_ResourceEditorvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var resource_editors_ResourceEditor = __webpack_exports__["a"] = (ResourceEditor_component.exports);

/***/ }),

/***/ "704a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceVariantTextEditor_vue_vue_type_custom_index_0_blockType_x_style_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("793b");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceVariantTextEditor_vue_vue_type_custom_index_0_blockType_x_style_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceVariantTextEditor_vue_vue_type_custom_index_0_blockType_x_style_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceVariantTextEditor_vue_vue_type_custom_index_0_blockType_x_style_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7928":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".btn-ghost{background:transparent;border:none}.audio-library-selection{position:relative;background-color:transparent!important;background-image:none!important;border-color:#ccc!important}.audio-library-selection .audio-library-selection-download-dropdown{position:absolute;right:1.6em;top:50%;margin-top:-8px;color:#888}.audio-library-selection .audio-library-selection-download-dropdown svg{vertical-align:middle}.audio-library-selection .audio-library-selection-clear-selection{margin-right:-7px}.audio-library-selection .audio-file-description{text-overflow:ellipsis;overflow:hidden;margin-bottom:3px}.audio-library-selection .vue-sound-wrapper{margin-bottom:8px;margin-left:1em}.audio-library-selection .vue-sound-wrapper .vue-sound__player .icon-pause2,.audio-library-selection .vue-sound-wrapper .vue-sound__player .icon-play3{font-size:130%;color:#888}.audio-library-selection .vue-sound-wrapper .vue-sound__player .icon-pause2:hover,.audio-library-selection .vue-sound-wrapper .vue-sound__player .icon-play3:hover{color:#000;text-decoration:none}.audio-library-selection .vue-sound-wrapper .vue-sound__player .icon-download,.audio-library-selection .vue-sound-wrapper .vue-sound__player .icon-stop2,.audio-library-selection .vue-sound-wrapper .vue-sound__player .icon-volume-high,.audio-library-selection .vue-sound-wrapper .vue-sound__player .volume-toggle{display:none!important}.audio-library-selection .vue-sound-wrapper .vue-sound__player .vue-sound__playback-time-current,.audio-library-selection .vue-sound-wrapper .vue-sound__player .vue-sound__playback-time-separator,.audio-library-selection .vue-sound-wrapper .vue-sound__player .vue-sound__playback-time-total{font-size:80%;color:#888}.audio-library-selection .vue-sound-wrapper .vue-sound__player .vue-sound__playback-time-wrapper{text-align:center;width:71%!important}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "792f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b019c1b8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/BlockId.vue?vue&type=template&id=7d26466e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"text-right"},[_c('small',{staticClass:"text-muted"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.block-id'))+": "),_c('em',[_vm._v(_vm._s(_vm.blockId))])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/BlockId.vue?vue&type=template&id=7d26466e&

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

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__("60a3");

// EXTERNAL MODULE: ./src/lib/filters/lang.js
var lang = __webpack_require__("3a37");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/BlockId.vue?vue&type=script&lang=ts&









var BlockIdvue_type_script_lang_ts_BlockId = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(BlockId, _Vue);

  var _super = Object(createSuper["a" /* default */])(BlockId);

  function BlockId() {
    Object(classCallCheck["a" /* default */])(this, BlockId);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(BlockId, [{
    key: "blockId",
    get: function get() {
      return this.block.uuid || '';
    }
  }]);

  return BlockId;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], BlockIdvue_type_script_lang_ts_BlockId.prototype, "block", void 0);

BlockIdvue_type_script_lang_ts_BlockId = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  mixins: [lang["a" /* default */]]
})], BlockIdvue_type_script_lang_ts_BlockId);
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

/***/ "793b":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("0be7");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("98e06cea", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "79f2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySelection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bc39");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySelection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySelection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySelection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7ab6":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("d607");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("98e00624", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "7e3b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySearchField_vue_vue_type_style_index_0_id_02dbbc38_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7ab6");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySearchField_vue_vue_type_style_index_0_id_02dbbc38_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySearchField_vue_vue_type_style_index_0_id_02dbbc38_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySearchField_vue_vue_type_style_index_0_id_02dbbc38_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "bb40":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b019c1b8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue?vue&type=template&id=9f129c72&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"resource-variant-text-editor"},[(_vm.isEditable)?_c('div',{staticClass:"content-editor",class:{'content-editor-selected': !!_vm.content}},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.content),expression:"content"},{name:"focus",rawName:"v-focus",value:(_vm.isSelected),expression:"isSelected"}],staticClass:"form-control",attrs:{"placeholder":_vm._f("trans")(("flow-builder.enter-" + (_vm.resourceVariant.contentType) + "-content"))},domProps:{"value":(_vm.content)},on:{"focus":_vm.select,"blur":_vm.deselect,"input":function($event){if($event.target.composing){ return; }_vm.content=$event.target.value}}})]):_vm._e(),_c('div',{staticClass:"content-toolbar"},[(_vm.isEditable)?_c('span',{staticClass:"text-muted transition-all",class:{invisible: !_vm.characterCounter.count}},[_vm._v(" "+_vm._s(_vm.characterCounter.count)+" characters "),(_vm.mode === 'sms' && _vm.characterCounter.pages > 1)?[_vm._v(" ("+_vm._s(_vm.characterCounter.pages)+" "+_vm._s(_vm.characterCounter.hasUnicode ? 'unicode pages' : 'pages')+") ")]:_vm._e()],2):_vm._e(),(_vm.doesContentContainExpression)?_c('tooltip',{attrs:{"content":("<p>" + (_vm.trans('flow-builder.youre-using-floip-expressions')) + "</p>\n                     <p>\n                       <strong>" + (_vm.trans('flow-builder.pro-tip')) + ":</strong>\n                       " + (_vm.trans('flow-builder.floip-expressions-escape-with-double-at-symbol')) + "\n                     </p>"),"effect":"scale","placement":"top"}},[_c('a',{attrs:{"href":"https://floip.gitbooks.io/flow-specification/content/fundamentals/expressions.html","target":"_blank"}},[_c('kbd',{staticStyle:{"margin-left":"1em"}},[_c('i',{staticClass:"glyphicon glyphicon-console"}),(_vm.doesContentContainExpressionError)?_c('i',{staticClass:"glyphicon glyphicon glyphicon-remove-sign text-danger"}):_c('i',{staticClass:"glyphicon glyphicon-ok-sign text-success"})])])]):_vm._e(),(_vm.doesContentContainExpressionError)?_c('div',{staticClass:"alert alert-danger",staticStyle:{"margin-top":"0.5em"}},[_c('p',[_c('i',{staticClass:"glyphicon glyphicon-remove-sign"}),_c('strong',[_c('a',{attrs:{"href":"https://floip.gitbooks.io/flow-specification/content/fundamentals/expressions.html","target":"_blank"}},[_vm._v("FLOIP Expression")]),_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.error-found'))+" ")])]),_c('p',[_c('em',[_vm._v(" "+_vm._s(_vm.contentExpressionAST.message)+" ("),(_vm.contentExpressionAST.location.start.line !== 1)?_c('span',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.on-line'))+" "+_vm._s(_vm.contentExpressionAST.location.start.line)+", ")]):_vm._e(),_vm._v(_vm._s(_vm._f("trans")('flow-builder.at-character'))+" "+_vm._s(_vm.contentExpressionAST.location.start.column)+") ")])])]):_vm._e()],1),(!_vm.isEditable)?[(_vm.content)?_c('p',[_vm._v(_vm._s(_vm.content))]):_c('p',[_c('em',{staticClass:"text-muted"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.no-sms-content-yet')))])])]:_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue?vue&type=template&id=9f129c72&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./src/lib/filters/lang.js
var lang = __webpack_require__("3a37");

// EXTERNAL MODULE: ./node_modules/@floip/expression-parser/dist/Parser.js
var Parser = __webpack_require__("14d3");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// EXTERNAL MODULE: ./node_modules/vue-focus/dist/vue-focus.common.js
var vue_focus_common = __webpack_require__("f837");
var vue_focus_common_default = /*#__PURE__*/__webpack_require__.n(vue_focus_common);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./node_modules/vue-strap/dist/vue-strap.js
var vue_strap = __webpack_require__("2ffd");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue?vue&type=script&lang=js&


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





 // import BlockContentAutogenButton from './BlockContentAutogenButton'

/* harmony default export */ var ResourceVariantTextEditorvue_type_script_lang_js_ = ({
  components: {
    // BlockContentAutogenButton,
    Tooltip: vue_strap["tooltip"]
  },
  mixins: [lang["a" /* default */], vue_focus_common_default.a.mixin],
  props: {
    isEditable: Boolean,
    resourceId: {
      type: String,
      default: null
    },
    resourceVariant: {
      type: Object,
      //as () => IResourceDefinitionContentTypeSpecific
      default: null
    },
    mode: {
      type: String,
      default: null
    },
    enableAutogenButton: {
      type: Boolean,
      default: true
    } // block: Object, // maybe!?
    // langId: [String, Number],
    // type: String,
    // pathToTextContent: String,

  },
  data: function data() {
    return {
      isSelected: false
    };
  },
  computed: {
    content: {
      get: function get() {
        return this.resourceVariant.value;
      },
      set: function set(value) {
        var resourceId = this.resourceId,
            mode = this.mode;
        var _this$resourceVariant = this.resourceVariant,
            languageId = _this$resourceVariant.languageId,
            contentType = _this$resourceVariant.contentType;
        this.resource_setOrCreateValueModeSpecific({
          resourceId: resourceId,
          filter: {
            languageId: languageId,
            contentType: contentType,
            modes: [mode]
          },
          value: value
        });
      }
    },
    contentExpressionAST: function contentExpressionAST() {
      var ast = [];

      try {
        ast = Object(Parser["parse"])(this.content);
      } catch (e) {
        if (e instanceof SyntaxError || e.name === 'SyntaxError') {
          return e;
        }
      }

      var hasMembers = Object(lodash["some"])(ast, lodash["isObject"]);
      return hasMembers ? ast : null;
    },
    doesContentContainExpression: function doesContentContainExpression() {
      return !!this.contentExpressionAST;
    },
    doesContentContainExpressionError: function doesContentContainExpressionError() {
      return !!(this.contentExpressionAST instanceof Error);
    },
    characterCounter: function characterCounter() {
      var hasUnicode = !/^[\x00-\x7F]*$/.test(this.content),
          count = this.content.length;
      console.debug('BlockTextContentEditorForLangAndType', 'characterCounter', {
        hasUnicode: hasUnicode,
        count: count
      });
      return {
        hasUnicode: hasUnicode,
        count: count,
        pages: hasUnicode ? Math.ceil(count / 70) : Math.ceil(count / 160)
      };
    }
  },
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["a" /* mapActions */])('flow', ['resource_setOrCreateValueModeSpecific'])), {}, {
    select: function select() {
      this.isSelected = true;
    },
    deselect: function deselect() {
      this.isSelected = false;
    } // debouncedSaveTree: debounce(function () {
    //   this.$store.dispatch('attemptSaveTree')
    // }, 500),

  })
});
// CONCATENATED MODULE: ./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var resource_editors_ResourceVariantTextEditorvue_type_script_lang_js_ = (ResourceVariantTextEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue?vue&type=custom&index=0&blockType=x-style&lang=scss&scoped=true
var ResourceVariantTextEditorvue_type_custom_index_0_blockType_x_style_lang_scss_scoped_true = __webpack_require__("704a");

// CONCATENATED MODULE: ./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  resource_editors_ResourceVariantTextEditorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* custom blocks */

if (typeof ResourceVariantTextEditorvue_type_custom_index_0_blockType_x_style_lang_scss_scoped_true["default"] === 'function') Object(ResourceVariantTextEditorvue_type_custom_index_0_blockType_x_style_lang_scss_scoped_true["default"])(component)

/* harmony default export */ var ResourceVariantTextEditor = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "bc39":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("7928");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("f82b14ce", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "d607":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".audio-library-search-field.dropdown .dropdown-menu[data-v-02dbbc38]{display:block;min-width:100%}.audio-library-search-field.dropdown .dropdown-menu>li.pagers>a[data-v-02dbbc38]{clear:none;margin-top:0;margin-bottom:0;padding-top:.5em;padding-bottom:.5em}.audio-library-search-field.dropdown .dropdown-menu>li.pagers>a.disabled[data-v-02dbbc38]{text-decoration:none;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled = false);cursor:not-allowed;color:#777}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "f04e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b019c1b8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/NameEditor.vue?vue&type=template&id=5d3e1d52&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('text-editor',{attrs:{"is-editable":_vm.isEditable,"label":_vm._f("trans")('flow-builder.block-name'),"placeholder":_vm._f("trans")('flow-builder.enter-block-name')},on:{"keydown":_vm.filterName},model:{value:(_vm.name),callback:function ($$v) {_vm.name=$$v},expression:"name"}},[_c('small',{staticClass:"text-muted"},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.only-accepts-word-characters'))+" ")])])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/NameEditor.vue?vue&type=template&id=5d3e1d52&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./src/lib/filters/lang.js
var lang = __webpack_require__("3a37");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/NameEditor.vue?vue&type=script&lang=js&




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
//



/* harmony default export */ var NameEditorvue_type_script_lang_js_ = ({
  components: {
    TextEditor: TextEditor["a" /* default */]
  },
  mixins: [lang["a" /* default */]],
  props: {
    isEditable: {
      default: true,
      type: Boolean
    },
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
//# sourceMappingURL=flow-builder.common.0.js.map