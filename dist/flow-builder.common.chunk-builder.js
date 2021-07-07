((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[3],{

/***/ "3dbb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImportMatcher_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e8ee");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImportMatcher_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImportMatcher_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImportMatcher_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7d8c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5d79dff5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ImportFlow.vue?vue&type=template&id=da4e8e94&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"new-contents"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-sm-8 offset-sm-2"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',[_c('h2',[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.import-flow'))+" ")]),_c('p',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.create-flow-from-json')))]),_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.import-note'))+" ")])]),_c('div',[_c('label',{staticClass:"mt-2 no-weight"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.uploadOrPaste),expression:"uploadOrPaste"}],attrs:{"type":"radio","value":"upload"},domProps:{"checked":_vm._q(_vm.uploadOrPaste,"upload")},on:{"change":function($event){_vm.uploadOrPaste="upload"}}}),_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.import-json-file'))+" ")]),(_vm.uploadOrPaste === 'upload')?_c('div',{staticClass:"ml-3 mr-3"},[_c('div',{staticClass:"form-inline mb-2"},[_c('span',{staticClass:"one-line"},[_c('a',{staticClass:"btn btn-outline-secondary",on:{"click":_vm.chooseFile}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.import-file'))+" ")]),_c('input',{ref:"file",attrs:{"id":"flowUpload","type":"file","hidden":""},on:{"change":_vm.handleFileUpload}}),(_vm.fileName)?_c('strong',{staticClass:"ml-1"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.uploaded-file')))]):_vm._e(),_vm._v(" "+_vm._s(_vm.fileName)+" ")])]),(_vm.flowJsonText)?_c('text-editor',{staticClass:"tall-text",attrs:{"value":_vm.flowJson,"label":"","placeholder":_vm._f("trans")('flow-builder.edit-flow-json')},on:{"input":_vm.setUpdatingAndHandleFlowJsonTextChange}}):_vm._e(),_c('error-handler')],1):_vm._e()]),_c('div',{staticClass:"mt-2"},[_c('label',{staticClass:"mt-2 no-weight"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.uploadOrPaste),expression:"uploadOrPaste"}],attrs:{"type":"radio","value":"paste"},domProps:{"checked":_vm._q(_vm.uploadOrPaste,"paste")},on:{"change":function($event){_vm.uploadOrPaste="paste"}}}),_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.paste-json-directly'))+" ")]),(_vm.uploadOrPaste === 'paste')?_c('div',{staticClass:"ml-3 mr-3"},[_c('text-editor',{staticClass:"tall-text",attrs:{"value":_vm.flowJson,"label":"","placeholder":_vm._f("trans")('flow-builder.paste-flow-json')},on:{"input":_vm.setUpdatingAndHandleFlowJsonTextChange}}),_c('error-handler')],1):_vm._e()]),_c('div',{staticClass:"float-right mt-3"},[_c('router-link',{staticClass:"btn btn-outline-secondary mr-2",attrs:{"to":_vm.route('flows.cancelImport')}},[_vm._v(" "+_vm._s(_vm.trans('flow-builder.cancel'))+" ")]),_c('a',{staticClass:"btn btn-primary",class:{'disabled': _vm.disableContinue},attrs:{"href":_vm.route('trees.editTree', {treeId: _vm.flowUUID, component: 'interaction-designer', mode: 'edit'})},on:{"click":function($event){$event.preventDefault();_vm.handleImportFlow(_vm.route('trees.editTree', {treeId: _vm.flowUUID, component: 'interaction-designer', mode: 'edit'}))}}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.create-flow'))+" ")])],1)])])])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/ImportFlow.vue?vue&type=template&id=da4e8e94&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

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

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/lib/mixins/Routes.ts
var Routes = __webpack_require__("d39e");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__("60a3");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// EXTERNAL MODULE: ./src/store/index.ts + 7 modules
var store = __webpack_require__("0613");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5d79dff5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/import/ErrorHandler.vue?vue&type=template&id=d5c63faa&
var ErrorHandlervue_type_template_id_d5c63faa_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.updating)?_c('div',[_c('br'),_c('div',{staticClass:"spinner-border",attrs:{"role":"status"}},[_c('span',{staticClass:"sr-only"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.loading')))])])]):_vm._e(),(_vm.flowError)?_c('div',{staticClass:"alert alert-danger mt-3",attrs:{"role":"alert"}},[_vm._v(" "+_vm._s(_vm._f("trans")(_vm.flowError,_vm.flowErrorInterpolations))+" ")]):_vm._e(),(_vm.hasUnsupportedBlockClasses)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v(" "+_vm._s(((_vm.trans('flow-builder.unsupported-blocks-detected')) + ": " + _vm.unsupportedBlockClassesList))+" ")]):_vm._e(),(_vm.languagesMissing)?_c('import-matcher',{staticClass:"mt-2",attrs:{"missing-matches":_vm.missingLanguages,"type-id":"id","type-label":"label","existing-options-without-match":_vm.existingLanguagesWithoutMatch,"match-not-found-text":"flow-builder.match-for-languages-not-found"},on:{"reactToMatch":_vm.handleMatchLanguage}}):_vm._e(),(_vm.propertiesMissing)?_c('import-matcher',{staticClass:"mt-2",attrs:{"missing-matches":_vm.missingProperties,"type-id":"name","type-label":"name","existing-options-without-match":_vm.existingPropertiesWithoutMatch,"match-not-found-text":"flow-builder.match-for-properties-not-found"},on:{"reactToMatch":_vm.handleMatchProperty}}):_vm._e(),(_vm.groupsMissing)?_c('import-matcher',{staticClass:"mt-2",attrs:{"missing-matches":_vm.missingGroups,"type-id":"id","type-label":"group_name","existing-options-without-match":_vm.existingGroupsWithoutMatch,"match-not-found-text":"flow-builder.match-for-groups-not-found"},on:{"reactToMatch":_vm.handleMatchGroup}}):_vm._e()],1)}
var ErrorHandlervue_type_template_id_d5c63faa_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/import/ErrorHandler.vue?vue&type=template&id=d5c63faa&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5d79dff5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/import/ImportMatcher.vue?vue&type=template&id=f415f7f8&
var ImportMatchervue_type_template_id_f415f7f8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('label',[_vm._v(_vm._s(_vm._f("trans")(_vm.matchNotFoundText)))]),_vm._l((_vm.missingMatches),function(missingMatch){return _c('div',{key:((_vm.getIdentifier(missingMatch)) + "-missing")},[_c('div',{staticClass:"form-check form-check-inline full-width"},[_c('div',{staticClass:"row full-width ml-1"},[_c('div',{staticClass:"col-xl-2 col-md-3"},[_c('label',{staticClass:"form-check-label full-width mt-2 mb-2"},[_vm._v(_vm._s(_vm.getLabel(missingMatch)))])]),_c('div',{staticClass:"col-xl-8 col-md-6"},[_c('select',{staticClass:"form-control full-width",on:{"change":function($event){return _vm.updateMappings(missingMatch, $event)}}},[_c('option',{key:"default",attrs:{"value":""},domProps:{"selected":_vm.mappingsEmpty}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.none-selected'))+" ")]),_vm._l((_vm.existingOptionsWithoutMatch),function(option){return _c('option',{key:((_vm.getIdentifier(option)) + "-option"),domProps:{"value":JSON.stringify(option)}},[_vm._v(" "+_vm._s(option)+" ")])})],2)]),_c('div',{staticClass:"col-xl-2 col-md-3"},[_c('button',{staticClass:"btn btn-primary full-width",on:{"click":function($event){return _vm.handleMatch(missingMatch)}}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.update'))+" ")])])])])])})],2)}
var ImportMatchervue_type_template_id_f415f7f8_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/import/ImportMatcher.vue?vue&type=template&id=f415f7f8&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/import/ImportMatcher.vue?vue&type=script&lang=ts&










var ImportMatchervue_type_script_lang_ts_ImportMatcher = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(ImportMatcher, _Vue);

  var _super = Object(createSuper["a" /* default */])(ImportMatcher);

  function ImportMatcher() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ImportMatcher);

    _this = _super.apply(this, arguments);
    _this.mappings = {};
    return _this;
  }

  Object(createClass["a" /* default */])(ImportMatcher, [{
    key: "getLabel",
    value: function getLabel(missingMatch) {
      return Object(lodash["get"])(missingMatch, this.typeLabel, '');
    }
  }, {
    key: "getIdentifier",
    value: function getIdentifier(missingMatch) {
      return Object(lodash["get"])(missingMatch, this.typeId, '');
    }
  }, {
    key: "updateMappings",
    value: function updateMappings(missingMatch, event) {
      this.mappings[this.getIdentifier(missingMatch)] = event.target.value;
    }
  }, {
    key: "handleMatch",
    value: function handleMatch(missingMatch) {
      var matchingJson = Object(lodash["get"])(this.mappings, this.getIdentifier(missingMatch));

      if (matchingJson) {
        var newMatch = JSON.parse(matchingJson);
        this.$emit('reactToMatch', missingMatch, newMatch);
        this.mappings = Object(lodash["omit"])(this.mappings, this.getIdentifier(missingMatch));
      }
    }
  }, {
    key: "mappingsEmpty",
    get: function get() {
      return Object(lodash["isEmpty"])(this.mappings);
    }
  }]);

  return ImportMatcher;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  default: ''
})], ImportMatchervue_type_script_lang_ts_ImportMatcher.prototype, "matchNotFoundText", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  required: true
})], ImportMatchervue_type_script_lang_ts_ImportMatcher.prototype, "typeId", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  required: true
})], ImportMatchervue_type_script_lang_ts_ImportMatcher.prototype, "typeLabel", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  required: true
})], ImportMatchervue_type_script_lang_ts_ImportMatcher.prototype, "missingMatches", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  required: true
})], ImportMatchervue_type_script_lang_ts_ImportMatcher.prototype, "existingOptionsWithoutMatch", void 0);

ImportMatchervue_type_script_lang_ts_ImportMatcher = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  mixins: [lang["a" /* default */]]
})], ImportMatchervue_type_script_lang_ts_ImportMatcher);
/* harmony default export */ var ImportMatchervue_type_script_lang_ts_ = (ImportMatchervue_type_script_lang_ts_ImportMatcher);
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/import/ImportMatcher.vue?vue&type=script&lang=ts&
 /* harmony default export */ var import_ImportMatchervue_type_script_lang_ts_ = (ImportMatchervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/interaction-designer/flow-editors/import/ImportMatcher.vue?vue&type=style&index=0&lang=scss&
var ImportMatchervue_type_style_index_0_lang_scss_ = __webpack_require__("3dbb");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/import/ImportMatcher.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  import_ImportMatchervue_type_script_lang_ts_,
  ImportMatchervue_type_template_id_f415f7f8_render,
  ImportMatchervue_type_template_id_f415f7f8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var import_ImportMatcher = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/import/ErrorHandler.vue?vue&type=script&lang=ts&










var importVuexNamespace = Object(lib["e" /* namespace */])('flow/import');

var ErrorHandlervue_type_script_lang_ts_ErrorHandler = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(ErrorHandler, _Vue);

  var _super = Object(createSuper["a" /* default */])(ErrorHandler);

  function ErrorHandler() {
    Object(classCallCheck["a" /* default */])(this, ErrorHandler);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(ErrorHandler, [{
    key: "handleMatchLanguage",
    value: function handleMatchLanguage(oldLanguage, matchingNewLanguage) {
      this.matchLanguage({
        oldLanguage: oldLanguage,
        matchingNewLanguage: matchingNewLanguage
      });
    }
  }, {
    key: "handleMatchProperty",
    value: function handleMatchProperty(oldProperty, matchingNewProperty) {
      this.matchProperty({
        oldProperty: oldProperty,
        matchingNewProperty: matchingNewProperty
      });
    }
  }, {
    key: "handleMatchGroup",
    value: function handleMatchGroup(oldGroup, matchingNewGroup) {
      this.matchGroup({
        oldGroup: oldGroup,
        matchingNewGroup: matchingNewGroup
      });
    }
  }]);

  return ErrorHandler;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([lib["b" /* Getter */]], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "blockClasses", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.Action], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "matchLanguage", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.Action], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "matchProperty", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.Action], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "matchGroup", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.Getter], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "hasUnsupportedBlockClasses", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.Getter], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "unsupportedBlockClassesList", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.Getter], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "languagesMissing", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.Getter], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "groupsMissing", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.Getter], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "propertiesMissing", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.State], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "flowError", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.State], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "flowErrorInterpolations", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.State], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "flowContainer", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.State], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "missingLanguages", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.State], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "existingLanguagesWithoutMatch", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.State], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "missingProperties", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.State], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "existingPropertiesWithoutMatch", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.State], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "missingGroups", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.State], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "existingGroupsWithoutMatch", void 0);

Object(tslib_es6["__decorate"])([importVuexNamespace.State], ErrorHandlervue_type_script_lang_ts_ErrorHandler.prototype, "updating", void 0);

ErrorHandlervue_type_script_lang_ts_ErrorHandler = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  components: {
    ImportMatcher: import_ImportMatcher
  },
  mixins: [lang["a" /* default */]]
})], ErrorHandlervue_type_script_lang_ts_ErrorHandler);
/* harmony default export */ var ErrorHandlervue_type_script_lang_ts_ = (ErrorHandlervue_type_script_lang_ts_ErrorHandler);
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/import/ErrorHandler.vue?vue&type=script&lang=ts&
 /* harmony default export */ var import_ErrorHandlervue_type_script_lang_ts_ = (ErrorHandlervue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/import/ErrorHandler.vue





/* normalize component */

var ErrorHandler_component = Object(componentNormalizer["a" /* default */])(
  import_ErrorHandlervue_type_script_lang_ts_,
  ErrorHandlervue_type_template_id_d5c63faa_render,
  ErrorHandlervue_type_template_id_d5c63faa_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var import_ErrorHandler = (ErrorHandler_component.exports);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__("13d5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./src/store/flow/utils/importHelpers.ts
var importHelpers = __webpack_require__("90d2");

// CONCATENATED MODULE: ./src/store/flow/views/import.ts










var import_getters = {
  languagesMissing: function languagesMissing(state) {
    return !Object(lodash["isEmpty"])(state.missingLanguages);
  },
  propertiesMissing: function propertiesMissing(state) {
    return !Object(lodash["isEmpty"])(state.missingProperties);
  },
  groupsMissing: function groupsMissing(state) {
    return !Object(lodash["isEmpty"])(state.missingGroups);
  },
  hasUnsupportedBlockClasses: function hasUnsupportedBlockClasses(state, getters) {
    return !Object(lodash["isEmpty"])(getters.unsupportedBlockClasses);
  },
  unsupportedBlockClasses: function unsupportedBlockClasses(state, getters, _rootState, rootGetters) {
    return Object(lodash["difference"])(getters.uploadedBlockTypes, rootGetters.blockClasses);
  },
  unsupportedBlockClassesList: function unsupportedBlockClassesList(state, getters) {
    return Object(lodash["join"])(getters.unsupportedBlockClasses, ', ');
  },
  uploadedBlockTypes: function uploadedBlockTypes(state) {
    return Object(lodash["uniq"])(Object(lodash["get"])(state.flowContainer, 'flows[0].blocks', []).map(function (block) {
      return block.type;
    }));
  }
};
var mutations = {
  setUpdating: function setUpdating(state, updatingStatus) {
    state.updating = updatingStatus;
  },
  baseReset: function baseReset(state) {
    state.flowContainer = null;
    state.flowJsonText = '';
    state.flowError = '';
    state.propertyBlocks = [];
    state.groupBlocks = [];
  },
  resetLanguageMatching: function resetLanguageMatching(state) {
    state.matchingLanguages = [];
    state.missingLanguages = [];
    state.existingLanguagesWithoutMatch = [];
  },
  resetPropertyMatching: function resetPropertyMatching(state) {
    state.matchingLanguages = [];
    state.blocksMissingProperties = {};
    state.missingProperties = [];
    state.existingPropertiesWithoutMatch = [];
  },
  resetGroupMatching: function resetGroupMatching(state) {
    state.matchingGroups = [];
    state.blocksMissingGroups = {};
    state.missingGroups = [];
    state.existingGroupsWithoutMatch = [];
  },
  addMissingLanguage: function addMissingLanguage(state, language) {
    state.missingLanguages.push(language);
  },
  setMissingLanguages: function setMissingLanguages(state, languages) {
    state.missingLanguages = languages;
  },
  setMatchingLanguages: function setMatchingLanguages(state, languages) {
    state.matchingLanguages = languages;
  },
  setExistingLanguagesWithoutMatch: function setExistingLanguagesWithoutMatch(state, languages) {
    state.existingLanguagesWithoutMatch = languages;
  },
  setFlowLanguages: function setFlowLanguages(state, languages) {
    if (state.flowContainer) {
      state.flowContainer.flows[0].languages = languages;
    } else {
      throw new Error('flowContainer is not set');
    }
  },
  setFlowResources: function setFlowResources(state, resources) {
    if (state.flowContainer) {
      state.flowContainer.resources = resources;
    } else {
      throw new Error('flowContainer is not set');
    }
  },
  addFlowLanguage: function addFlowLanguage(state, language) {
    if (state.flowContainer) {
      state.flowContainer.flows[0].languages.push(language);
    } else {
      throw new Error('flowContainer is not set');
    }
  },
  setFlowJsonText: function setFlowJsonText(state, text) {
    state.flowJsonText = text;
  },
  setFlowContainer: function setFlowContainer(state, flowContainer) {
    state.flowContainer = flowContainer;
  },
  setFlowContainerBlocks: function setFlowContainerBlocks(state, blocks) {
    if (state.flowContainer) {
      Object(lodash["set"])(state.flowContainer, 'flows[0].blocks', blocks);
    }
  },
  setFlowErrorWithInterpolations: function setFlowErrorWithInterpolations(state, _ref) {
    var text = _ref.text,
        interpolations = _ref.interpolations;
    state.flowError = text;
    state.flowErrorInterpolations = interpolations;
  },
  setFlowError: function setFlowError(state, text) {
    state.flowError = text;
    state.flowErrorInterpolations = null;
  },
  setGroupBlocks: function setGroupBlocks(state, groupBlocks) {
    state.groupBlocks = groupBlocks;
  },
  setPropertyBlocks: function setPropertyBlocks(state, propertyBlocks) {
    state.propertyBlocks = propertyBlocks;
  },
  setBlocksMissingProperties: function setBlocksMissingProperties(state, blocksMissingProperties) {
    state.blocksMissingProperties = blocksMissingProperties;
  },
  setMissingProperties: function setMissingProperties(state, missingProperties) {
    state.missingProperties = missingProperties;
  },
  setMatchingProperties: function setMatchingProperties(state, matchingProperties) {
    state.matchingProperties = matchingProperties;
  },
  setExistingPropertiesWithoutMatch: function setExistingPropertiesWithoutMatch(state, existingPropertiesWithoutMatch) {
    state.existingPropertiesWithoutMatch = existingPropertiesWithoutMatch;
  },
  setBlocksMissingGroups: function setBlocksMissingGroups(state, blocksMissingGroups) {
    state.blocksMissingGroups = blocksMissingGroups;
  },
  setMissingGroups: function setMissingGroups(state, missingGroups) {
    state.missingGroups = missingGroups;
  },
  setMatchingGroups: function setMatchingGroups(state, matchingGroups) {
    state.matchingGroups = matchingGroups;
  },
  setExistingGroupsWithoutMatch: function setExistingGroupsWithoutMatch(state, existingGroupsWithoutMatch) {
    state.existingGroupsWithoutMatch = existingGroupsWithoutMatch;
  }
};
var actions = {
  setFlowJson: function setFlowJson(_ref2, value) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var commit, state, dispatch, flowContainer, validationErrors, oldFlowContainer, newFlowContainer, newPropertyBlocks, newGroupBlocks;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref2.commit, state = _ref2.state, dispatch = _ref2.dispatch;
              commit('setFlowError', '');
              commit('setFlowJsonText', value);
              _context.prev = 3;
              // check valid json
              flowContainer = JSON.parse(state.flowJsonText);
              _context.next = 14;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](3);
              commit('resetLanguageMatching');
              commit('resetPropertyMatching');
              commit('resetGroupMatching');
              commit('setFlowError', 'flow-builder.invalid-json-provided');
              return _context.abrupt("return");

            case 14:
              if (Object(importHelpers["a" /* checkSingleFlowOnly */])(flowContainer)) {
                _context.next = 17;
                break;
              }

              commit('setFlowError', 'flow-builder.importer-currently-supports-single-flow-only');
              return _context.abrupt("return");

            case 17:
              _context.next = 19;
              return dispatch('validation/validate_flowContainer', {
                flowContainer: flowContainer
              }, {
                root: true
              });

            case 19:
              validationErrors = _context.sent;

              if (validationErrors.isValid) {
                _context.next = 23;
                break;
              }

              commit('setFlowErrorWithInterpolations', {
                text: 'flow-builder.flow-invalid',
                interpolations: {
                  version: flowContainer.specification_version
                }
              });
              return _context.abrupt("return");

            case 23:
              oldFlowContainer = Object(lodash["cloneDeep"])(state.flowContainer);
              newFlowContainer = Object(lodash["cloneDeep"])(flowContainer);
              commit('setFlowContainer', flowContainer);

              if (!Object(importHelpers["c" /* detectedLanguageChanges */])({
                flowContainer: newFlowContainer,
                oldFlowContainer: oldFlowContainer
              })) {
                _context.next = 29;
                break;
              }

              _context.next = 29;
              return dispatch('validateLanguages', state.flowContainer);

            case 29:
              // matching on "property_key" == "name" in builder.config.json
              newPropertyBlocks = Object(importHelpers["f" /* getPropertyBlocks */])(flowContainer);

              if (!Object(importHelpers["d" /* detectedPropertyChanges */])({
                newPropertyBlocks: newPropertyBlocks,
                oldPropertyBlocks: state.propertyBlocks
              })) {
                _context.next = 34;
                break;
              }

              commit('setPropertyBlocks', newPropertyBlocks);
              _context.next = 34;
              return dispatch('validateProperties', state.propertyBlocks);

            case 34:
              // matching on "group_key" == "id" in builder.config.json
              newGroupBlocks = Object(importHelpers["e" /* getGroupBlocks */])(flowContainer);

              if (!Object(importHelpers["b" /* detectedGroupChanges */])({
                newGroupBlocks: newGroupBlocks,
                oldGroupBlocks: state.groupBlocks
              })) {
                _context.next = 39;
                break;
              }

              commit('setGroupBlocks', newGroupBlocks);
              _context.next = 39;
              return dispatch('validateGroups', state.groupBlocks);

            case 39:
              commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2));

            case 40:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 7]]);
    }))();
  },
  validateLanguages: function validateLanguages(_ref3, flowContainer) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var state, commit, rootGetters, uploadLanguages, matchingLanguages;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref3.state, commit = _ref3.commit, rootGetters = _ref3.rootGetters;
              uploadLanguages = Object(lodash["get"])(flowContainer, 'flows[0].languages', []);
              matchingLanguages = [];

              if (uploadLanguages) {
                uploadLanguages.forEach(function (language) {
                  var matchingLanguage = Object(lodash["find"])(rootGetters.languages, function (orgLanguage) {
                    return Object(lodash["isEqual"])(orgLanguage, language);
                  });

                  if (!matchingLanguage) {
                    // Unlike the others we don't reset this.
                    // A previously unmatched language can only be fixed by updating or adding a language
                    commit('addMissingLanguage', language);
                  } else {
                    matchingLanguages.push(language);
                  }
                });
                commit('setMatchingLanguages', matchingLanguages); // Update the languages so we use the org settings for things like id and orgId

                commit('setFlowLanguages', state.matchingLanguages);
                commit('setExistingLanguagesWithoutMatch', Object(lodash["differenceWith"])(rootGetters.languages, state.matchingLanguages, lodash["isEqual"]));
              }

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  validateProperties: function validateProperties(_ref4, newPropertyBlocks) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var rootGetters, state, commit, matchingProperties, blocksMissingProperties;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              rootGetters = _ref4.rootGetters, state = _ref4.state, commit = _ref4.commit;
              matchingProperties = [];
              blocksMissingProperties = Object(lodash["cloneDeep"])(state.blocksMissingProperties);
              newPropertyBlocks.forEach(function (propertyBlock) {
                var propertyIdentifier = Object(lodash["get"])(propertyBlock, 'config.set_contact_property.property_key');

                if (propertyIdentifier) {
                  var matchingProperty = Object(lodash["find"])(rootGetters.subscriberPropertyFields, function (orgProperty) {
                    return Object(lodash["isEqual"])(orgProperty.name, propertyIdentifier);
                  });

                  if (!matchingProperty) {
                    // Unlike the others we don't reset this.
                    // A previously unmatched property can only be fixed by updating or adding a language
                    //
                    // Name is all we can get when there isn't a match
                    // ...as the block sidebar gets the actual displayLabel by matching
                    if (!Object(lodash["get"])(blocksMissingProperties, propertyIdentifier)) {
                      blocksMissingProperties[propertyIdentifier] = [];
                    }

                    blocksMissingProperties[propertyIdentifier].push(propertyBlock.uuid);
                  } else {
                    matchingProperties.push(matchingProperty);
                  }
                }
              });
              commit('setBlocksMissingProperties', blocksMissingProperties);
              commit('setMissingProperties', Object(lodash["keys"])(state.blocksMissingProperties).map(function (propertyIdentifier) {
                return {
                  name: propertyIdentifier,
                  blockIds: state.blocksMissingProperties[propertyIdentifier]
                };
              }));
              commit('setMatchingProperties', matchingProperties); // Update the languages so we use the org settings for things like id and orgId

              commit('setExistingPropertiesWithoutMatch', Object(lodash["differenceWith"])(rootGetters.subscriberPropertyFields, state.matchingProperties, lodash["isEqual"]));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  validateGroups: function validateGroups(_ref5, newGroupBlocks) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var rootGetters, state, commit, matchingGroups, blocksMissingGroups;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              rootGetters = _ref5.rootGetters, state = _ref5.state, commit = _ref5.commit;
              matchingGroups = [];
              blocksMissingGroups = Object(lodash["cloneDeep"])(state.blocksMissingGroups);
              newGroupBlocks.forEach(function (groupBlock) {
                var groupIdentifier = Object(lodash["get"])(groupBlock, 'config.group_key');
                var groupName = Object(lodash["get"])(groupBlock, 'config.group_name');

                if (groupIdentifier) {
                  var matchingGroup = Object(lodash["find"])(rootGetters.groups, function (orgGroup) {
                    return Object(lodash["isEqual"])(orgGroup.id, groupIdentifier) && Object(lodash["isEqual"])(orgGroup.name, groupName);
                  });

                  if (!matchingGroup) {
                    // Unlike the others we don't reset this.
                    // A previously unmatched group can only be fixed by updating or adding a language
                    if (!Object(lodash["get"])(blocksMissingGroups, groupIdentifier)) {
                      blocksMissingGroups[groupIdentifier] = {
                        group_name: groupName,
                        blockIds: []
                      };
                    }

                    blocksMissingGroups[groupIdentifier].blockIds.push(groupBlock.uuid);
                  } else {
                    matchingGroups.push(matchingGroup);
                  }
                }
              });
              commit('setBlocksMissingGroups', blocksMissingGroups);
              commit('setMissingGroups', Object(lodash["keys"])(state.blocksMissingGroups).map(function (groupIdentifier) {
                return Object(objectSpread2["a" /* default */])({
                  id: groupIdentifier
                }, state.blocksMissingGroups[groupIdentifier]);
              }));
              commit('setMatchingGroups', matchingGroups); // Update the languages so we use the org settings for things like id and orgId

              commit('setExistingGroupsWithoutMatch', Object(lodash["differenceWith"])(rootGetters.groups, state.matchingGroups, lodash["isEqual"]));

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  matchLanguage: function matchLanguage(_ref6, _ref7) {
    var commit = _ref6.commit,
        state = _ref6.state,
        dispatch = _ref6.dispatch;
    var oldLanguage = _ref7.oldLanguage,
        matchingNewLanguage = _ref7.matchingNewLanguage;
    commit('addFlowLanguage', matchingNewLanguage);
    commit('setFlowResources', Object(importHelpers["h" /* updateResourcesForLanguageMatch */])(Object(lodash["get"])(state.flowContainer, 'resources', []), oldLanguage.id, matchingNewLanguage.id));
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2));
    commit('setMissingLanguages', Object(lodash["reject"])(state.missingLanguages, function (language) {
      return Object(lodash["isEqual"])(language, oldLanguage);
    }));
    dispatch('validateLanguages', state.flowContainer);
  },
  matchProperty: function matchProperty(_ref8, _ref9) {
    var commit = _ref8.commit,
        state = _ref8.state,
        dispatch = _ref8.dispatch;
    var oldProperty = _ref9.oldProperty,
        matchingNewProperty = _ref9.matchingNewProperty;
    var blocks = Object(lodash["cloneDeep"])(Object(lodash["get"])(state.flowContainer, 'flows[0].blocks'));

    if (!blocks) {
      return;
    }

    oldProperty.blockIds.forEach(function (blockId) {
      var blockIndex = Object(lodash["findIndex"])(blocks, function (block) {
        return block.uuid === blockId;
      });

      if (blockIndex < 0) {
        return;
      }

      Object(lodash["set"])(blocks, "".concat(blockIndex, ".config.set_contact_property.property_key"), matchingNewProperty.name);
    });
    commit('setFlowContainerBlocks', blocks);
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2)); // missingProperties gets updated again when we validate below

    var newBlocksMissingProperties = {};
    commit('setBlocksMissingProperties', Object(lodash["keys"])(state.blocksMissingProperties).reduce(function (newBlocksMissingProperties, propertyIdentifier) {
      if (oldProperty.name !== propertyIdentifier) {
        newBlocksMissingProperties[propertyIdentifier] = state.blocksMissingProperties[propertyIdentifier];
      }

      return newBlocksMissingProperties;
    }, newBlocksMissingProperties));
    commit('setPropertyBlocks', Object(importHelpers["f" /* getPropertyBlocks */])(state.flowContainer));
    dispatch('validateProperties', state.propertyBlocks);
  },
  matchGroup: function matchGroup(_ref10, _ref11) {
    var commit = _ref10.commit,
        state = _ref10.state,
        dispatch = _ref10.dispatch;
    var oldGroup = _ref11.oldGroup,
        matchingNewGroup = _ref11.matchingNewGroup;
    var blocks = Object(lodash["cloneDeep"])(Object(lodash["get"])(state.flowContainer, 'flows[0].blocks'));

    if (!blocks) {
      return;
    }

    oldGroup.blockIds.forEach(function (blockId) {
      var blockIndex = Object(lodash["findIndex"])(blocks, function (block) {
        return block.uuid === blockId;
      });

      if (blockIndex < 0) {
        return;
      }

      Object(lodash["set"])(blocks, "".concat(blockIndex, ".config.group_key"), matchingNewGroup.id);
      Object(lodash["set"])(blocks, "".concat(blockIndex, ".config.group_name"), matchingNewGroup.name);
    });
    commit('setFlowContainerBlocks', blocks);
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2)); // missingGroups gets updated again when we validate below

    var newBlocksMissingGroups = {};
    commit('setBlocksMissingGroups', Object(lodash["keys"])(state.blocksMissingGroups).reduce(function (newBlocksMissingGroups, groupIdentifier) {
      if (oldGroup.id !== groupIdentifier) {
        newBlocksMissingGroups[groupIdentifier] = state.blocksMissingGroups[groupIdentifier];
      }

      return newBlocksMissingGroups;
    }, newBlocksMissingGroups));
    commit('setGroupBlocks', Object(importHelpers["e" /* getGroupBlocks */])(state.flowContainer));
    dispatch('validateGroups', state.groupBlocks);
  }
};
var stateFactory = function stateFactory() {
  return {
    matchingLanguages: [],
    missingLanguages: [],
    existingLanguagesWithoutMatch: [],
    blocksMissingProperties: {},
    missingProperties: [],
    matchingProperties: [],
    existingPropertiesWithoutMatch: [],
    blocksMissingGroups: {},
    missingGroups: [],
    matchingGroups: [],
    existingGroupsWithoutMatch: [],
    flowContainer: null,
    flowJsonText: '',
    flowError: '',
    flowErrorInterpolations: null,
    propertyBlocks: [],
    groupBlocks: [],
    updating: false
  };
};
/* harmony default export */ var views_import = ({
  namespaced: true,
  state: stateFactory,
  getters: import_getters,
  mutations: mutations,
  actions: actions
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/ImportFlow.vue?vue&type=script&lang=ts&




















var flowVuexNamespace = Object(lib["e" /* namespace */])('flow');
var ImportFlowvue_type_script_lang_ts_importVuexNamespace = Object(lib["e" /* namespace */])('flow/import');

var ImportFlowvue_type_script_lang_ts_ImportFlow = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(ImportFlow, _Vue);

  var _super = Object(createSuper["a" /* default */])(ImportFlow);

  function ImportFlow() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ImportFlow);

    _this = _super.apply(this, arguments);
    _this.uploadOrPasteSetting = 'upload';
    _this.fileName = ''; // In case someone is editing a language, let's give them a second to finish before we tell them it doesn't match

    _this.debounceHandleFlowJsonTextChange = Object(lodash["debounce"])(_this.handleFlowJsonTextChange, 2000);
    return _this;
  }

  Object(createClass["a" /* default */])(ImportFlow, [{
    key: "created",
    value: function () {
      var _created = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var $store;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $store = this.$store;
                Object(lodash["forEach"])(store["a" /* store */].modules, function (v, k) {
                  return !$store.hasModule(k) && $store.registerModule(k, v);
                });
                $store.hasModule(['flow', 'import']) || $store.registerModule(['flow', 'import'], views_import);

                if (!Object(lodash["isEmpty"])(this.appConfig) && !Object(lodash["isEmpty"])(this.builderConfig) || !this.isConfigured) {
                  this.configure({
                    appConfig: this.appConfig,
                    builderConfig: this.builderConfig
                  });
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function created() {
        return _created.apply(this, arguments);
      }

      return created;
    }()
  }, {
    key: "reset",
    value: function reset() {
      this.fileName = '';
      this.baseReset();
      this.resetLanguageMatching();
      this.resetPropertyMatching();
      this.resetGroupMatching();
    }
  }, {
    key: "setUpdatingAndHandleFlowJsonTextChange",
    value: function setUpdatingAndHandleFlowJsonTextChange(value) {
      this.setUpdating(true);
      this.debounceHandleFlowJsonTextChange(value);
    }
  }, {
    key: "handleFlowJsonTextChange",
    value: function () {
      var _handleFlowJsonTextChange = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.flowJson = value;
                this.setUpdating(false);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleFlowJsonTextChange(_x) {
        return _handleFlowJsonTextChange.apply(this, arguments);
      }

      return handleFlowJsonTextChange;
    }()
  }, {
    key: "chooseFile",
    value: function chooseFile() {
      var fileInput = this.$refs.file;
      fileInput.click();
    }
  }, {
    key: "handleFileUpload",
    value: function () {
      var _handleFileUpload = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(event) {
        var _this2 = this;

        var selectedFile, reader;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.reset();
                selectedFile = event.target.files[0];
                this.fileName = selectedFile.name;
                event.target.value = '';
                reader = new FileReader();

                reader.onload = function (readEvent) {
                  _this2.flowJson = readEvent.target.result.toString();
                };

                reader.readAsText(selectedFile, 'UTF-8');

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleFileUpload(_x2) {
        return _handleFileUpload.apply(this, arguments);
      }

      return handleFileUpload;
    }()
  }, {
    key: "handleImportFlow",
    value: function () {
      var _handleImportFlow = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(route) {
        var flowContainer;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.flow_import({
                  // @ts-ignore - Would need to switch mixins to class components to fix this - https://class-component.vuejs.org/guide/extend-and-mixins.html#mixins
                  persistRoute: this.route('flows.persistFlow', {
                    flowId: this.flowContainer.uuid
                  }),
                  flowContainer: this.flowContainer
                });

              case 2:
                flowContainer = _context4.sent;

                if (flowContainer) {
                  this.reset();
                  this.$router.push(route);
                } else {
                  this.setFlowError('flow-builder.problem-importing-flow'); // TODO - hook into validation system when we have it to display any errors? Or should we have caught any errors already?
                }

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function handleImportFlow(_x3) {
        return _handleImportFlow.apply(this, arguments);
      }

      return handleImportFlow;
    }()
  }, {
    key: "uploadOrPaste",
    get: function get() {
      return this.uploadOrPasteSetting;
    },
    set: function set(value) {
      if (value !== this.uploadOrPasteSetting) {
        this.reset();
      }

      this.uploadOrPasteSetting = value;
    }
  }, {
    key: "flowJson",
    get: function get() {
      return this.flowJsonText;
    },
    set: function set(value) {
      this.setFlowJson(value);
    }
  }, {
    key: "disableContinue",
    get: function get() {
      return !this.flowUUID || this.flowError || this.languagesMissing || this.propertiesMissing || this.groupsMissing || this.hasUnsupportedBlockClasses;
    }
  }, {
    key: "flowUUID",
    get: function get() {
      return Object(lodash["get"])(this.flowContainer, 'flows[0].uuid');
    }
  }]);

  return ImportFlow;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  default: function _default() {
    return {};
  }
})], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "appConfig", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  default: function _default() {
    return {};
  }
})], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "builderConfig", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Action], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "flow_import", void 0);

Object(tslib_es6["__decorate"])([lib["c" /* Mutation */]], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "configure", void 0);

Object(tslib_es6["__decorate"])([lib["b" /* Getter */]], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "isConfigured", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.Getter], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "hasUnsupportedBlockClasses", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.Getter], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "languagesMissing", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.Getter], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "groupsMissing", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.Getter], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "propertiesMissing", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.Action], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "setFlowJson", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.Mutation], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "baseReset", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.Mutation], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "resetLanguageMatching", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.Mutation], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "resetGroupMatching", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.Mutation], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "resetPropertyMatching", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.Mutation], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "setFlowError", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.Mutation], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "setUpdating", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.State], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "flowError", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.State], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "flowJsonText", void 0);

Object(tslib_es6["__decorate"])([ImportFlowvue_type_script_lang_ts_importVuexNamespace.State], ImportFlowvue_type_script_lang_ts_ImportFlow.prototype, "flowContainer", void 0);

ImportFlowvue_type_script_lang_ts_ImportFlow = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  components: {
    TextEditor: TextEditor["a" /* default */],
    ErrorHandler: import_ErrorHandler
  },
  mixins: [lang["a" /* default */], Routes["a" /* default */]]
})], ImportFlowvue_type_script_lang_ts_ImportFlow);
/* harmony default export */ var ImportFlowvue_type_script_lang_ts_ = (ImportFlowvue_type_script_lang_ts_ImportFlow);
// CONCATENATED MODULE: ./src/views/ImportFlow.vue?vue&type=script&lang=ts&
 /* harmony default export */ var views_ImportFlowvue_type_script_lang_ts_ = (ImportFlowvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/views/ImportFlow.vue?vue&type=style&index=0&lang=scss&
var ImportFlowvue_type_style_index_0_lang_scss_ = __webpack_require__("872f");

// CONCATENATED MODULE: ./src/views/ImportFlow.vue






/* normalize component */

var ImportFlow_component = Object(componentNormalizer["a" /* default */])(
  views_ImportFlowvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var views_ImportFlow = __webpack_exports__["default"] = (ImportFlow_component.exports);

/***/ }),

/***/ "872f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImportFlow_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8d25");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImportFlow_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImportFlow_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImportFlow_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8c98":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".tall-text textarea{min-height:200px}.one-line{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "8d25":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8c98");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("4affecbc", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "aaec":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".full-width{width:100%}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "e8ee":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("aaec");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("000fd584", content, true, {"sourceMap":false,"shadowMode":false});

/***/ })

}]);
//# sourceMappingURL=flow-builder.common.chunk-builder.js.map