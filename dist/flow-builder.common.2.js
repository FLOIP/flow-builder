((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[2],{

/***/ "1e79":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceVariantTextEditor_vue_vue_type_style_index_0_id_0ce279b0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a3e7");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceVariantTextEditor_vue_vue_type_style_index_0_id_0ce279b0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceVariantTextEditor_vue_vue_type_style_index_0_id_0ce279b0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceVariantTextEditor_vue_vue_type_style_index_0_id_0ce279b0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "33b4":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".tab-content-style[data-v-dd0260a8]{background:#f4f4f4;padding:10px}.ivr-buttons[data-v-dd0260a8]{font-size:small;flex-grow:1}.custom-icons[data-v-dd0260a8]{height:1.25em;width:1.25em}.library-icons[data-v-dd0260a8]{margin-top:2px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "510a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: ResourceEditor

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7d6111f6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/resource-editors/ResourceEditor.vue?vue&type=template&id=dd0260a8&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.flow.languages.length > 0)?_c('div',{staticClass:"resource-editor"},[_c('hr'),(_vm.label)?_c('h4',[_vm._v(" "+_vm._s(_vm.label)+" ")]):_vm._e(),_c('div',[_c('b-tabs',_vm._l((_vm.flow.languages),function(ref){
var languageId = ref.id;
var language = ref.label;
return _c('b-tab',{key:languageId,attrs:{"title":_vm._f("trans")(language || 'flow-builder.unknown-language'),"active":""}},_vm._l((_vm.flow.supported_modes),function(mode,i){return _c('div',{key:i,staticClass:"tab-content-style"},[_c('header',{staticClass:"d-flex"},[(_vm.iconsMap.get(mode))?_c('font-awesome-icon',{class:{'custom-icons': _vm.iconsMap.get(mode)[0] === 'fac', 'library-icons': _vm.iconsMap.get(mode)[0] !== 'fac'},attrs:{"icon":_vm.iconsMap.get(mode)}}):_vm._e(),_c('h6',{staticClass:"ml-1"},[_vm._v(_vm._s(_vm._f("trans")(("flow-builder." + (mode.toLowerCase()) + "-content"))))])],1),_vm._l((_vm.discoverContentTypesFor(mode)),function(contentType){return [(contentType === _vm.SupportedContentType.TEXT)?_c('resource-variant-text-editor',{attrs:{"resource-id":_vm.resource.uuid,"resource-variant":_vm.findOrGenerateStubbedVariantOn(
                _vm.resource,
                {language_id: languageId, content_type: contentType, modes: [mode]}),"mode":mode,"enable-autogen-button": true || false}}):_vm._e(),(contentType === _vm.SupportedContentType.AUDIO)?_c('div',[_c('audio-library-selector',{attrs:{"audio-files":_vm.availableAudio,"lang-id":languageId,"resource-id":_vm.resource.uuid,"selected-audio-file":_vm.findOrGenerateStubbedVariantOn(
                  _vm.resource,
                  {language_id: languageId, content_type: contentType, modes: [mode]}).value}}),(_vm.can(['edit-content', 'send-call-to-records'], true) && !_vm.findOrGenerateStubbedVariantOn(_vm.resource,{language_id: languageId, content_type: contentType, modes: [mode]}).value)?_c('phone-recorder',{attrs:{"recording-key":((_vm.block.uuid) + ":" + languageId)}}):_vm._e(),(!_vm.findAudioResourceVariantFor(_vm.resource, {language_id: languageId, content_type: contentType, modes: [mode]}))?[_c('upload-monitor',{attrs:{"upload-key":((_vm.block.uuid) + ":" + languageId)}}),_c('div',{staticClass:"d-flex mt-2"},[(_vm.isEditable && _vm.isFeatureAudioUploadEnabled)?_c('button',{directives:[{name:"flow-uploader",rawName:"v-flow-uploader",value:({
                      target: _vm.route('trees.resumeableAudioUpload'),
                      token: ("" + (_vm.block.uuid) + languageId),
                      accept: 'audio/*'}),expression:"{\n                      target: route('trees.resumeableAudioUpload'),\n                      token: `${block.uuid}${languageId}`,\n                      accept: 'audio/*'}"}],staticClass:"btn btn-primary ivr-buttons",on:{"filesSubmitted":function($event){return _vm.handleFilesSubmittedFor(((_vm.block.uuid) + ":" + languageId), $event)},"fileSuccess":function($event){return _vm.handleFileSuccessFor(((_vm.block.uuid) + ":" + languageId), languageId, $event)}}},[_c('font-awesome-icon',{staticClass:"fa-btn",attrs:{"icon":['fac', 'upload']}}),_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.upload-audio'))+" ")],1):_vm._e(),(_vm.can(['edit-content', 'send-call-to-records'], true) && _vm.isFeatureAudioUploadEnabled)?_c('button',{staticClass:"btn btn-primary ivr-buttons ml-2",on:{"click":function($event){$event.preventDefault();return _vm.triggerRecordViaPhoneFor(languageId)}}},[_c('font-awesome-icon',{staticClass:"fa-btn",attrs:{"icon":['fac', 'record-audio']}}),_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.record-audio'))+" ")],1):_vm._e()])]:_vm._e()],2):_vm._e()]})],2)}),0)}),1)],1)]):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/resource-editors/ResourceEditor.vue?vue&type=template&id=dd0260a8&scoped=true&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("f3f3");

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

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.map.js
var es_map = __webpack_require__("4ec9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/index.js
var dist = __webpack_require__("9300");

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./src/lib/mixins/Permissions.ts
var Permissions = __webpack_require__("cab2");

// EXTERNAL MODULE: ./src/lib/mixins/Routes.ts
var Routes = __webpack_require__("d39e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/@flowjs/flow.js/src/flow.js
var flow = __webpack_require__("ebc7");
var flow_default = /*#__PURE__*/__webpack_require__.n(flow);

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");
var lodash_default = /*#__PURE__*/__webpack_require__.n(lodash);

// EXTERNAL MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
var vue_class_component_esm = __webpack_require__("2fe1");

// CONCATENATED MODULE: ./src/lib/mixins/FlowUploader.ts










var FlowUploader_dispatch = function dispatch(el, name, data) {
  el.dispatchEvent(lodash_default.a.extend(new Event(name, {
    bubbles: true,
    cancelable: true
  }), {
    data: data
  }));
};

var FlowUploader_FlowUploader = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(FlowUploader, _Vue);

  var _super = Object(createSuper["a" /* default */])(FlowUploader);

  function FlowUploader() {
    Object(classCallCheck["a" /* default */])(this, FlowUploader);

    return _super.apply(this, arguments);
  }

  return FlowUploader;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

FlowUploader_FlowUploader = Object(tslib_es6["__decorate"])([Object(vue_class_component_esm["b" /* default */])({
  directives: {
    'flow-uploader': {
      /**
       * This binding provides a bridge between Flow and vuejs such that we can continue using our resumable backend
       */
      bind: function bind(el, binding) {
        var _binding$value = binding.value,
            accept = _binding$value.accept,
            target = _binding$value.target,
            upload_token = _binding$value.token;
        var uploader = new flow_default.a({
          target: target,
          singleFile: true,
          // kbytes, chunked?  ¯\_(ツ)_/¯
          chunkSize: 1024 * 512,
          query: {
            upload_token: upload_token
          }
        });

        if (!uploader.support) {
          // Your browser doesn't support HTML5 uploads; please try Firefox or Chrome.
          return;
        }

        lodash_default.a.extend(el.style, {
          overflow: 'hidden'
        });
        uploader.assignBrowse(el);
        lodash_default.a.chain(el.children).find({
          tagName: 'INPUT',
          type: 'file'
        }).assign({
          accept: accept
        }).value(); // todo: migrate to proxied catch-all handler (voto5 legacy todo)
        // uploader.on('catchAll', (name, file/*or files*/, e) => console.debug(name))
        // todo: when do we call upload on a multiselect-upload and file-added triggered multiple times? (voto5 legacy todo)
        // uploader.upload()
        // uploader.on('fileAdded', (file, e) => dispatch(el, 'filesSubmitted', {file, uploader}))
        // @ts-ignore

        uploader.on('filesSubmitted', function (files, e) {
          return FlowUploader_dispatch(el, 'filesSubmitted', {
            files: files,
            uploader: uploader // uploader.upload()

          });
        }); // @ts-ignore

        uploader.on('fileProgress', function (file, e) {
          return FlowUploader_dispatch(el, 'fileProgress', {
            file: file,
            uploader: uploader
          });
        });
        uploader.on('fileSuccess', function (file, json) {
          return FlowUploader_dispatch(el, 'fileSuccess', {
            file: file,
            uploader: uploader,
            json: json // uploader.cancel()

          });
        });
        uploader.on('error', function (message, file) {
          return FlowUploader_dispatch(el, 'fileSuccess', {
            file: file,
            uploader: uploader,
            message: message // uploader.cancel()

          });
        });
      },
      // @ts-ignore
      unbind: function unbind(el, binding) {}
    }
  }
})], FlowUploader_FlowUploader);
/* harmony default export */ var mixins_FlowUploader = (FlowUploader_FlowUploader);
// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/index.js + 14 modules
var vue_property_decorator_lib = __webpack_require__("1b40");

// EXTERNAL MODULE: ./src/store/flow/resource.ts
var flow_resource = __webpack_require__("393e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7d6111f6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/AudioLibrarySelector.vue?vue&type=template&id=75ccf3c2&
var AudioLibrarySelectorvue_type_template_id_75ccf3c2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"audio-library-selector"},[(_vm.selectedAudioFile)?_c('audio-library-selection',{attrs:{"audio-file":_vm.selectedAudioFile,"lang-id":_vm.langId},on:{"clear":_vm.clearSelection}}):[_c('audio-library-search-field',{attrs:{"lang-id":_vm.langId,"audio-files":_vm.audioFiles},on:{"select":_vm.selectAudioFile}})]],2)}
var AudioLibrarySelectorvue_type_template_id_75ccf3c2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/common/AudioLibrarySelector.vue?vue&type=template&id=75ccf3c2&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7d6111f6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/AudioLibrarySearchField.vue?vue&type=template&id=22499358&scoped=true&
var AudioLibrarySearchFieldvue_type_template_id_22499358_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"audio-library-search-field dropdown"},[_c('div',{staticClass:"input-group"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.rawQuery),expression:"rawQuery"}],staticClass:"form-control",attrs:{"type":"text","placeholder":_vm._f("trans")('flow-builder.search-audio-library'),"disabled":_vm.isEntireLibraryModeEnabled},domProps:{"value":(_vm.rawQuery)},on:{"focus":_vm.activate,"blur":_vm.deactivate,"input":[function($event){if($event.target.composing){ return; }_vm.rawQuery=$event.target.value},_vm.resetPagination]}}),_c('span',{staticClass:"input-group-append"},[_c('button',{staticClass:"btn btn-primary dropdown-toggle",class:{active: _vm.isEntireLibraryModeEnabled},on:{"click":function($event){$event.preventDefault();return _vm.toggleAudioLibrary.apply(null, arguments)}}},[_c('i',{staticClass:"glyphicon glyphicon-search"})])])]),(_vm.query || _vm.isAudioLibraryEmpty || _vm.isEntireLibraryModeEnabled)?_c('div',{staticClass:"dropdown-menu"},[(_vm.isEntireLibraryModeEnabled)?[_c('a',{staticClass:"disabled dropdown-item",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();}}},[_c('button',{staticClass:"close active",on:{"click":_vm.toggleAudioLibrary}},[_vm._v("x ")]),_c('i',{staticClass:"glyphicon glyphicon-info-sign"}),_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.showing-entire-audio-library'))+"… ")]),_c('div',{staticClass:"dropdown-divider",attrs:{"role":"separator"}})]:_vm._e(),(!_vm.isAudioLibraryEmpty)?[_vm._l((_vm.search(_vm.query).slice(_vm.offset * _vm.limit, (_vm.offset + 1) * _vm.limit)),function(audio){return _c('a',{staticClass:"dropdown-item",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.select(audio)}}},[_vm._v(" "+_vm._s(audio.description)+" ")])}),(_vm.query.length >= 3 && !_vm.search(_vm.query).length)?_c('a',{staticClass:"disabled dropdown-item",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();}}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.no-audio-files-found-for-X'))+" \""),_c('em',[_vm._v(_vm._s(_vm.query))]),_vm._v("\". ")]):_vm._e(),(_vm.query && _vm.query.length < 3)?_c('a',{staticClass:"disabled dropdown-item",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();}}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.enter-at-least-three-chars'))+" ")]):_vm._e(),(_vm.hasPrevious || _vm.hasNext)?[_c('div',{staticClass:"dropdown-divider",attrs:{"role":"separator"}}),_c('div',{staticClass:"pagers dropdown-item"},[_c('a',{staticClass:"col-md-6",class:{disabled: !_vm.hasPrevious},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.decrementPage.apply(null, arguments)}}},[_c('i',{staticClass:"glyphicon glyphicon-chevron-left"}),_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.previous'))+" ")]),_c('a',{staticClass:"col-md-6 text-right",class:{disabled: !_vm.hasNext},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.incrementPage.apply(null, arguments)}}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.next'))+" "),_c('i',{staticClass:"glyphicon glyphicon-chevron-right"})])])]:_vm._e()]:_vm._e(),(_vm.isAudioLibraryEmpty)?_c('a',{staticClass:"disabled dropdown-item",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();}}},[_c('i',{staticClass:"glyphicon glyphicon-warning-sign"}),_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.audio-lib-empty-for-this-org'))+" ")]):_vm._e()],2):_vm._e()])}
var AudioLibrarySearchFieldvue_type_template_id_22499358_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/common/AudioLibrarySearchField.vue?vue&type=template&id=22499358&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./node_modules/fuse.js/dist/fuse.js
var fuse = __webpack_require__("ffe7");
var fuse_default = /*#__PURE__*/__webpack_require__.n(fuse);

// EXTERNAL MODULE: ./node_modules/vue-focus/dist/vue-focus.common.js
var vue_focus_common = __webpack_require__("f837");
var vue_focus_common_default = /*#__PURE__*/__webpack_require__.n(vue_focus_common);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/AudioLibrarySearchField.vue?vue&type=script&lang=js&



/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */




/* harmony default export */ var AudioLibrarySearchFieldvue_type_script_lang_js_ = ({
  mixins: [vue_focus_common_default.a.mixin, lang["b" /* lang */]],
  props: ['langId', 'audioFiles'],
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
      return Object(lodash["trim"])(this.rawQuery);
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
      this.cache[query] = new fuse_default.a(this.audioFiles, {
        keys: keys
      }).search(query);
      return this.cache[query];
    },
    // todo: push pagination into isolated component
    incrementPage: function incrementPage() {
      if (this.hasNext) {
        this.offset += 1;
      }
    },
    decrementPage: function decrementPage() {
      if (this.hasPrevious) {
        this.offset -= 1;
      }
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
// EXTERNAL MODULE: ./src/components/common/AudioLibrarySearchField.vue?vue&type=style&index=0&id=22499358&lang=scss&scoped=true&
var AudioLibrarySearchFieldvue_type_style_index_0_id_22499358_lang_scss_scoped_true_ = __webpack_require__("f837a");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/common/AudioLibrarySearchField.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  common_AudioLibrarySearchFieldvue_type_script_lang_js_,
  AudioLibrarySearchFieldvue_type_template_id_22499358_scoped_true_render,
  AudioLibrarySearchFieldvue_type_template_id_22499358_scoped_true_staticRenderFns,
  false,
  null,
  "22499358",
  null
  
)

/* harmony default export */ var AudioLibrarySearchField = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7d6111f6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/AudioLibrarySelection.vue?vue&type=template&id=3c1ce0a2&
var AudioLibrarySelectionvue_type_template_id_3c1ce0a2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"well well-sm audio-library-selection",class:{
    'tree-audio-control-text-container-selectable': _vm.selectable,
    'tree-audio-control-text-container-selected': !_vm.selectable},attrs:{"data-audio-file-container-language":_vm.langId}},[_c('button',{staticClass:"audio-library-selection-clear-selection btn-ghost pull-right",on:{"click":function($event){$event.preventDefault();return _vm.clear.apply(null, arguments)}}},[_c('i',{staticClass:"glyphicon glyphicon-remove"})]),_c('div',{staticClass:"btn-group audio-library-selection-download-dropdown"},[_vm._m(0),_c('ul',{staticClass:"dropdown-menu dropdown-menu-right"},[_c('li',[_c('a',{staticClass:"tree-block-audio-files-download-original",attrs:{"href":_vm.audioFileUrl,"target":"_blank"}},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.original-file')))])])])]),_c('p',{staticClass:"audio-file-description",attrs:{"title":_vm.audioFileUrl}},[_vm._v(" "+_vm._s(_vm.audioFileUrl)+" ")]),_c('div',{staticClass:"btn-toolbar"},[(_vm.selectable)?_c('button',{staticClass:"btn btn-secondary btn-xs",on:{"click":function($event){$event.preventDefault();return _vm.select.apply(null, arguments)}}},[_c('i',{staticClass:"glyphicon glyphicon-ok"})]):_vm._e()])])}
var AudioLibrarySelectionvue_type_template_id_3c1ce0a2_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn btn-ghost dropdown-toggle",attrs:{"type":"button","data-toggle":"dropdown"}},[_c('span',{staticClass:"glyphicon glyphicon-download-alt",attrs:{"aria-hidden":"true"}}),_c('span',{staticClass:"caret"})])}]


// CONCATENATED MODULE: ./src/components/common/AudioLibrarySelection.vue?vue&type=template&id=3c1ce0a2&

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
      var currentLocale = moment_default.a.locale(); // this function only gets used in english.

      moment_default.a.locale('en');
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
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/AudioLibrarySelection.vue?vue&type=script&lang=js&
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */


/* harmony default export */ var AudioLibrarySelectionvue_type_script_lang_js_ = ({
  mixins: [lang["b" /* lang */], filters_moment],
  props: ['audioFile', 'selected', 'selectable', 'langId'],
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
  AudioLibrarySelectionvue_type_template_id_3c1ce0a2_render,
  AudioLibrarySelectionvue_type_template_id_3c1ce0a2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AudioLibrarySelection = (AudioLibrarySelection_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/AudioLibrarySelector.vue?vue&type=script&lang=js&




/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */





/* harmony default export */ var AudioLibrarySelectorvue_type_script_lang_js_ = ({
  components: {
    AudioLibrarySearchField: AudioLibrarySearchField,
    AudioLibrarySelection: AudioLibrarySelection
  },
  props: ['alternateSelections', 'selectedAudioFile', 'langId', 'audioFiles', 'isPlaying', 'audioPlayerUrl', 'resourceId'],
  computed: {
    selectable: function selectable() {
      return !Object(lodash["isEmpty"])(this.alternateSelections);
    }
  },
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["a" /* mapActions */])('flow', ['resource_setOrCreateValueModeSpecific'])), {}, {
    clearSelection: function clearSelection() {
      this.resource_setOrCreateValueModeSpecific({
        resourceId: this.resourceId,
        filter: {
          language_id: this.langId,
          content_type: dist["SupportedContentType"].AUDIO,
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
          language_id: langId,
          content_type: dist["SupportedContentType"].AUDIO,
          modes: [dist["SupportedMode"].IVR]
        },
        value: value.description
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
  AudioLibrarySelectorvue_type_template_id_75ccf3c2_render,
  AudioLibrarySelectorvue_type_template_id_75ccf3c2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AudioLibrarySelector = (AudioLibrarySelector_component.exports);
// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/src/domain/exceptions/ValidationException.ts
var ValidationException = __webpack_require__("44e8");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7d6111f6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/PhoneRecorder.vue?vue&type=template&id=79dcd652&
var PhoneRecordervue_type_template_id_79dcd652_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isFeatureCallToRecordEnabled)?_c('div',{staticClass:"phone-recorder"},[_c('phone-recording-recorder-selector',{attrs:{"is-modal-visible":_vm.isRecorderSelectorVisible},on:{"input":_vm.handleRecorderSelectionChanged},model:{value:(_vm.callConfig),callback:function ($$v) {_vm.callConfig=$$v},expression:"callConfig"}})],1):_vm._e()}
var PhoneRecordervue_type_template_id_79dcd652_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/PhoneRecorder.vue?vue&type=template&id=79dcd652&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7d6111f6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/PhoneRecordingRecorderSelector.vue?vue&type=template&id=41756c06&scoped=true&
var PhoneRecordingRecorderSelectorvue_type_template_id_41756c06_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-modal',{staticClass:"phone-recording-recorder-selector",attrs:{"size":"lg","no-close-on-backdrop":"","no-close-on-esc":"","title":_vm._f("trans")('flow-builder.select-a-caller-from-the-list-below'),"visible":_vm.isModalVisible,"ok-title":_vm._f("trans")('flow-builder.call-this-phone-number'),"cancel-title":_vm._f("trans")('flow-builder.close')},on:{"ok":_vm.handleModalClosed,"cancel":_vm.handleModalCancelled,"close":_vm.handleModalCancelled}},[_c('div',{staticClass:"call-to-record-modal-table-container"},[_c('table',{staticClass:"table table-striped"},[_c('thead',[_c('tr',[_c('th',{staticClass:"recorder-selector-field"}),_c('th',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.name')))]),_c('th',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.phone-number')))])])]),_c('tbody',{attrs:{"id":"call-to-record-modal-list"}},_vm._l((_vm.recorders),function(recorder){return _c('tr',{staticClass:"call-to-record-item"},[_c('td',{staticClass:"recorder-selector-field"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedRecorder),expression:"selectedRecorder"}],attrs:{"id":("call-to-record-caller-" + (recorder.id)),"type":"radio","x-name":"calltorecord_caller_select"},domProps:{"value":recorder,"checked":_vm._q(_vm.selectedRecorder,recorder)},on:{"change":function($event){_vm.selectedRecorder=recorder}}})]),_c('td',[_c('label',{attrs:{"for":("call-to-record-caller-" + (recorder.id))},on:{"click":function($event){return _vm.setSelectedRecorder(recorder)}}},[_vm._v(_vm._s(recorder.name))])]),_c('td',[_c('label',{attrs:{"for":("call-to-record-caller-" + (recorder.id))},on:{"click":function($event){return _vm.setSelectedRecorder(recorder)}}},[_vm._v(_vm._s(recorder.phone))])])])}),0)]),_c('h4',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.add-a-description-to-this-recording')))]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.description),expression:"description"}],staticClass:"form-control",attrs:{"type":"text","rows":"2","placeholder":_vm._f("trans")('flow-builder.optional-description')},domProps:{"value":(_vm.description)},on:{"input":function($event){if($event.target.composing){ return; }_vm.description=$event.target.value}}}),_c('h4',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.add-a-new-recorder')))]),_c('table',{staticClass:"table"},[_c('tbody',[_c('tr',[_c('td',{staticClass:"recorder-selector-field"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedRecorder),expression:"selectedRecorder"}],attrs:{"id":"new_recorder_radio","type":"radio","name":"calltorecord_caller_select"},domProps:{"value":_vm.draft,"checked":_vm._q(_vm.selectedRecorder,_vm.draft)},on:{"change":function($event){_vm.selectedRecorder=_vm.draft}}})]),_c('td',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.draft.name),expression:"draft.name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":_vm._f("trans")('flow-builder.name')},domProps:{"value":(_vm.draft.name)},on:{"click":_vm.selectNewRecorder,"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.draft, "name", $event.target.value)}}})]),_c('td',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.draft.phone),expression:"draft.phone"}],staticClass:"form-control",attrs:{"type":"text","placeholder":_vm._f("trans")('flow-builder.phone-number')},domProps:{"value":(_vm.draft.phone)},on:{"click":_vm.selectNewRecorder,"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.draft, "phone", $event.target.value)}}})])])])])])])}
var PhoneRecordingRecorderSelectorvue_type_template_id_41756c06_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/PhoneRecordingRecorderSelector.vue?vue&type=template&id=41756c06&scoped=true&

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/modal/modal.js + 6 modules
var modal = __webpack_require__("6aac");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/PhoneRecordingRecorderSelector.vue?vue&type=script&lang=js&




/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */




/* harmony default export */ var PhoneRecordingRecorderSelectorvue_type_script_lang_js_ = ({
  components: {
    BModal: modal["a" /* BModal */]
  },
  mixins: [lang["b" /* lang */]],
  props: {
    isModalVisible: Boolean
  },
  data: function data() {
    return {
      selectedRecorder: null,
      description: null,
      draft: null
    };
  },
  created: function created() {
    this.reset();
  },
  computed: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["d" /* mapState */])({
    recorders: function recorders(_ref) {
      var _recorders = _ref.audio.recording.recorders;
      return _recorders;
    }
  })),
  methods: {
    selectNewRecorder: function selectNewRecorder() {
      this.draft.isNew = true;
      this.selectedRecorder = this.draft;
    },
    setSelectedRecorder: function setSelectedRecorder(recorder) {
      this.selectedRecorder = recorder;
    },
    reset: function reset() {
      this.draft = {
        name: null,
        phone: null,
        isNew: true
      };
      this.description = null;
      this.selectedRecorder = null;
    },
    handleModalClosed: function handleModalClosed() {
      var description = this.description;
      var value = Object(lodash["clone"])(this.selectedRecorder);
      this.reset();
      this.$emit('input', {
        value: value,
        recorder: value,
        description: description
      });
    },
    handleModalCancelled: function handleModalCancelled() {
      this.reset();
      var description = this.description;
      var value = Object(lodash["clone"])(this.selectedRecorder);
      this.$emit('input', {
        value: value,
        recorder: value,
        description: description
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/PhoneRecordingRecorderSelector.vue?vue&type=script&lang=js&
 /* harmony default export */ var block_editors_PhoneRecordingRecorderSelectorvue_type_script_lang_js_ = (PhoneRecordingRecorderSelectorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/PhoneRecordingRecorderSelector.vue?vue&type=style&index=0&id=41756c06&lang=scss&scoped=true&
var PhoneRecordingRecorderSelectorvue_type_style_index_0_id_41756c06_lang_scss_scoped_true_ = __webpack_require__("e350");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/PhoneRecordingRecorderSelector.vue






/* normalize component */

var PhoneRecordingRecorderSelector_component = Object(componentNormalizer["a" /* default */])(
  block_editors_PhoneRecordingRecorderSelectorvue_type_script_lang_js_,
  PhoneRecordingRecorderSelectorvue_type_template_id_41756c06_scoped_true_render,
  PhoneRecordingRecorderSelectorvue_type_template_id_41756c06_scoped_true_staticRenderFns,
  false,
  null,
  "41756c06",
  null
  
)

/* harmony default export */ var PhoneRecordingRecorderSelector = (PhoneRecordingRecorderSelector_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/PhoneRecorder.vue?vue&type=script&lang=js&




/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */


/* harmony default export */ var PhoneRecordervue_type_script_lang_js_ = ({
  components: {
    PhoneRecordingRecorderSelector: PhoneRecordingRecorderSelector
  },
  props: ['recordingKey'],
  data: function data() {
    return {
      // this is set by hooking into the v-model property of <phone-recording-recorder-selector v-model="callConfig">
      // which $emits a new value that results in setting this variable by reference.
      callConfig: null
    };
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["d" /* mapState */])({
    // todo: deprecate (this + setAudioRecordingConfigVisibilityForSelectedBlock) in favor of modal + local state
    isRecorderSelectorVisible: function isRecorderSelectorVisible(_ref) {
      var _isRecorderSelectorVisible = _ref.audio.recording.isRecorderSelectorVisible;
      return _isRecorderSelectorVisible;
    }
  })), Object(vuex_esm["b" /* mapGetters */])(['isFeatureCallToRecordEnabled'])),
  methods: {
    handleRecorderSelectionChanged: function handleRecorderSelectionChanged() {
      this.$store.commit('setAudioRecordingConfigVisibilityForSelectedBlock', {
        isVisible: false
      });

      if (!this.callConfig.recorder) {
        return;
      }

      var callConfig = Object(objectSpread2["a" /* default */])({
        key: this.recordingKey,
        description: this.callConfig.description
      }, this.callConfig.recorder);

      this.$store.dispatch('startAudioRecordingFor', callConfig);
    }
  }
});
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/PhoneRecorder.vue?vue&type=script&lang=js&
 /* harmony default export */ var block_editors_PhoneRecordervue_type_script_lang_js_ = (PhoneRecordervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/PhoneRecorder.vue





/* normalize component */

var PhoneRecorder_component = Object(componentNormalizer["a" /* default */])(
  block_editors_PhoneRecordervue_type_script_lang_js_,
  PhoneRecordervue_type_template_id_79dcd652_render,
  PhoneRecordervue_type_template_id_79dcd652_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PhoneRecorder = (PhoneRecorder_component.exports);
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/tabs/index.js + 4 modules
var tabs = __webpack_require__("700c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7d6111f6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/UploadMonitor.vue?vue&type=template&id=44a05fb5&
var UploadMonitorvue_type_template_id_44a05fb5_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"upload-monitor"},[(_vm.hasProgress)?_c('div',{staticClass:"upload-monitor-progress"},[_c('h6',[_vm._v(_vm._s(_vm._f("trans")('trees.uploading'))+"… "+_vm._s(_vm.upload.file.name))]),_c('div',{staticClass:"progress"},[_c('b-progress',{staticClass:"mb-3",attrs:{"value":_vm.progress * 1,"show-value":"","animated":""}})],1)]):_vm._e(),(_vm.isFailure)?_c('p',{staticClass:"text-danger small"},[_vm._v(" "+_vm._s(_vm._f("trans")('trees.error-uploading-file-try-again'))+" "),(_vm.upload.message)?_c('span',{staticClass:"details"},[_vm._v("("+_vm._s(_vm.upload.message)+")")]):_vm._e()]):_vm._e(),(!_vm.hasProgress)?_vm._t("default"):_vm._e()],2)}
var UploadMonitorvue_type_template_id_44a05fb5_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/UploadMonitor.vue?vue&type=template&id=44a05fb5&

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/progress/progress.js + 1 modules
var progress_progress = __webpack_require__("49f5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./src/store/trees/multimediaUpload.js


var _UploadStatusToStateM;





var Statuses = {
  UPLOADING: -1,
  UNINITIALIZED: 0,
  SUCCESS: 1,
  FAILURE: 2
};
var UploadStatusToStateMap = (_UploadStatusToStateM = {}, Object(defineProperty["a" /* default */])(_UploadStatusToStateM, Statuses.UPLOADING, 'uploading'), Object(defineProperty["a" /* default */])(_UploadStatusToStateM, Statuses.UNINITIALIZED, 'uninitialized'), Object(defineProperty["a" /* default */])(_UploadStatusToStateM, Statuses.SUCCESS, 'success'), Object(defineProperty["a" /* default */])(_UploadStatusToStateM, Statuses.FAILURE, 'failure'), _UploadStatusToStateM);
/* harmony default export */ var multimediaUpload = ({
  namespaced: true,
  state: {
    uploadProgressByKey: {},
    errorMessageByKey: {},
    uploadsById: {},
    uploadIdsByKey: {}
  },
  mutations: {
    setErrorMessage: function setErrorMessage(_ref, _ref2) {
      var errorMessageByKey = _ref.errorMessageByKey;
      var key = _ref2.key,
          errorMessage = _ref2.errorMessage;
      external_commonjs_vue_commonjs2_vue_root_Vue_default.a.set(errorMessageByKey, key, errorMessage);
    },
    setUploadProgress: function setUploadProgress(_ref3, _ref4) {
      var uploadProgressByKey = _ref3.uploadProgressByKey;
      var key = _ref4.key,
          uploadProgress = _ref4.uploadProgress;
      external_commonjs_vue_commonjs2_vue_root_Vue_default.a.set(uploadProgressByKey, key, uploadProgress);
    },
    setUploadStatusFor: function setUploadStatusFor(_ref5, _ref6) {
      var uploadsById = _ref5.uploadsById,
          uploadIdsByKey = _ref5.uploadIdsByKey;
      var fileWithRefs = _ref6.file,
          key = _ref6.key,
          status = _ref6.status,
          progress = _ref6.progress,
          message = _ref6.message,
          cancel = _ref6.cancel;
      var file = lodash_default.a.pick(fileWithRefs, ['averageSpeed', 'currentSpeed', 'error', 'name', 'paused', 'relativePath', 'size', 'uniqueIdentifier']);
      external_commonjs_vue_commonjs2_vue_root_Vue_default.a.set(uploadsById, file.uniqueIdentifier, {
        key: key,
        status: status,
        progress: progress,
        message: message,
        cancel: cancel,
        file: file
      });
      external_commonjs_vue_commonjs2_vue_root_Vue_default.a.set(uploadIdsByKey, key, file.uniqueIdentifier);
    }
  },
  actions: {
    uploadFile: function uploadFile(_ref7, _ref8) {
      var commit = _ref7.commit;
      var key = _ref8.key,
          uploadUrl = _ref8.uploadUrl,
          formDataFields = _ref8.formDataFields,
          onSuccess = _ref8.onSuccess,
          onError = _ref8.onError;

      if (!uploadUrl) {
        commit('setUploadProgress', {
          key: key,
          uploadProgress: null
        });
        onError(new Error("url was ".concat(uploadUrl)));
        return;
      }

      var formData = new FormData();
      lodash_default.a.forEach(formDataFields, function (value, name) {
        formData.set(name, value);
      });
      var config = {
        onUploadProgress: function onUploadProgress(progressEvent) {
          commit('setUploadProgress', {
            key: key,
            uploadProgress: Math.floor(progressEvent.loaded * 100 / progressEvent.total)
          });
        }
      };
      axios_default.a.post(uploadUrl, formData, config).then(function (response) {
        commit('setUploadProgress', {
          key: key,
          uploadProgress: null
        });
        onSuccess(response);
      }).catch(function (error) {
        commit('setUploadProgress', {
          key: key,
          uploadProgress: null
        });
        onError(error);
      });
    },
    // todo: this is slightly different, because it implements chunked+resumable uploads; generify
    // todo: upgrade backend to use more recent composer package that's compatible w/ npm flow.js
    // https://github.com/flowjs/flow-php-server
    // todo: handle multi-file-per-key
    uploadFiles: function uploadFiles(_ref9, _ref10) {
      var commit = _ref9.commit,
          dispatch = _ref9.dispatch,
          state = _ref9.state;
      var key = _ref10.key,
          files = _ref10.files,
          uploader = _ref10.uploader;

      var cancel = function cancel(_) {
        return uploader.cancel();
      };

      files.forEach(function (file) {
        return commit('setUploadStatusFor', {
          file: file,
          key: key,
          progress: 0,
          status: Statuses.UNINITIALIZED,
          message: null,
          cancel: cancel
        });
      });
      uploader.on('fileProgress', function (file, e) {
        // TODO: enable showAppMessageFor and use it as follow
        // dispatch('showAppMessageFor', {message: `Upload in progress... ${_.parseInt(file.progress() * 100)}%`}, {root: true})
        console.debug("Upload in progress... ".concat(_.parseInt(file.progress() * 100), "%"));
        commit('setUploadStatusFor', {
          file: file,
          key: key,
          progress: file.progress(),
          status: Statuses.UPLOADING,
          message: null,
          cancel: cancel
        });
      });
      uploader.on('fileSuccess', function (file, json) {
        // TODO: enable showAppMessageFor and use it as follow
        // dispatch('showAppMessageFor', {message: 'Upload successful!', isComplete: true}, {root: true})
        console.debug('Upload successful!');
        commit('setUploadStatusFor', {
          file: file,
          key: key,
          progress: 1,
          status: Statuses.SUCCESS,
          message: null,
          cancel: cancel
        }); // clear for next batch
        // uploader.cancel()
      });
      uploader.on('error', function (json, file) {
        var _ref11 = JSON.parse(json) || {},
            status_description = _ref11.status_description; // TODO: enable showAppMessageFor and use it as follow
        // dispatch('showAppMessageFor', {message: status_description, isComplete: true}, {root: true})


        console.debug("Upload has error ".concat(status_description));
        commit('setUploadStatusFor', {
          file: file,
          key: key,
          status: Statuses.FAILURE,
          message: status_description,
          cancel: cancel
        }); // clear for retry
        // uploader.cancel()
      });
      uploader.upload(); // TODO: enable showAppMessageFor and use it as follow
      // dispatch('showAppMessageFor', {message: 'Upload in progress...'}, {root: true})

      console.debug('Upload in progress...');
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/UploadMonitor.vue?vue&type=script&lang=js&


/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions,@typescript-eslint/unbound-method */





/* harmony default export */ var UploadMonitorvue_type_script_lang_js_ = ({
  components: {
    BProgress: progress_progress["a" /* BProgress */]
  },
  mixins: [lang["b" /* lang */]],
  props: ['uploadKey'],
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["d" /* mapState */])('multimediaUpload', ['uploadsById', 'uploadIdsByKey'])), {}, {
    upload: function upload() {
      return this.uploadsById[this.uploadIdsByKey[this.uploadKey]];
    },
    hasProgress: function hasProgress() {
      return this.upload && this.upload.status !== Statuses.SUCCESS && this.upload.status !== Statuses.FAILURE;
    },
    isFailure: function isFailure() {
      return this.upload && this.upload.status === Statuses.FAILURE;
    },
    progress: function progress() {
      return Object(lodash["get"])(this.upload, 'progress', 0) * 100;
    }
  }),
  created: function created() {
    var $store = this.$store;
    var modules = {
      multimediaUpload: multimediaUpload
    };
    Object(lodash["forEach"])(modules, function (v, k) {
      return !$store.hasModule(k) && $store.registerModule(k, v);
    });
  }
});
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/UploadMonitor.vue?vue&type=script&lang=js&
 /* harmony default export */ var block_editors_UploadMonitorvue_type_script_lang_js_ = (UploadMonitorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/UploadMonitor.vue?vue&type=style&index=0&lang=scss&
var UploadMonitorvue_type_style_index_0_lang_scss_ = __webpack_require__("9ea4");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/UploadMonitor.vue






/* normalize component */

var UploadMonitor_component = Object(componentNormalizer["a" /* default */])(
  block_editors_UploadMonitorvue_type_script_lang_js_,
  UploadMonitorvue_type_template_id_44a05fb5_render,
  UploadMonitorvue_type_template_id_44a05fb5_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var UploadMonitor = (UploadMonitor_component.exports);
// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue + 4 modules
var ResourceVariantTextEditor = __webpack_require__("bb40");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/resource-editors/ResourceEditor.vue?vue&type=script&lang=ts&


































external_commonjs_vue_commonjs2_vue_root_Vue_default.a.use(tabs["a" /* TabsPlugin */]);
var flowVuexNamespace = Object(lib["e" /* namespace */])('flow');
var builderVuexNamespace = Object(lib["e" /* namespace */])('builder');

var ResourceEditorvue_type_script_lang_ts_ResourceEditor = /*#__PURE__*/function (_mixins) {
  Object(inherits["a" /* default */])(ResourceEditor, _mixins);

  var _super = Object(createSuper["a" /* default */])(ResourceEditor);

  function ResourceEditor() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ResourceEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "block", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "flow", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "resource", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "label", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "discoverContentTypesFor", flow_resource["b" /* discoverContentTypesFor */]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "findOrGenerateStubbedVariantOn", flow_resource["c" /* findOrGenerateStubbedVariantOn */]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "findResourceVariantOverModesOn", flow_resource["d" /* findResourceVariantOverModesOn */]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "SupportedMode", dist["SupportedMode"]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "SupportedContentType", dist["SupportedContentType"]);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "iconsMap", new Map([[dist["SupportedMode"].SMS, ['far', 'envelope']], [dist["SupportedMode"].USSD, ['fac', 'ussd']], [dist["SupportedMode"].IVR, ['fac', 'audio']], [dist["SupportedMode"].RICH_MESSAGING, ['far', 'comment-dots']], [dist["SupportedMode"].OFFLINE, ['fas', 'mobile-alt']]]));

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "availableAudio", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "isFeatureAudioUploadEnabled", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "pushAudioIntoLibrary", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "resource_setOrCreateValueModeSpecific", void 0);

    Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "isEditable", void 0);

    return _this;
  }

  Object(createClass["a" /* default */])(ResourceEditor, [{
    key: "triggerRecordViaPhoneFor",
    value: function triggerRecordViaPhoneFor(langId) {
      this.$store.commit('setAudioRecordingConfigVisibilityForSelectedBlock', {
        langId: langId,
        isVisible: true
      });
    }
  }, {
    key: "handleFilesSubmittedFor",
    value: function handleFilesSubmittedFor(key, _ref) {
      var data = _ref.data;
      console.debug('call handleFilesSubmittedFor');
      this.$store.dispatch('multimediaUpload/uploadFiles', Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, data), {}, {
        key: key
      }));
    }
  }, {
    key: "handleFileSuccessFor",
    value: function handleFileSuccessFor(key, langId, event) {
      var json = event.data.json;

      var _JSON$parse = JSON.parse(json),
          id = _JSON$parse.audio_file_id,
          filename = _JSON$parse.audio_uuid,
          created_at = _JSON$parse.created_at.date,
          description = _JSON$parse.description,
          duration_seconds = _JSON$parse.duration_seconds;

      var extension = description.split('.')[description.split('.').length - 1];
      var uploadedAudio = {
        id: id,
        filename: filename,
        description: description,
        language_id: langId,
        duration_seconds: duration_seconds,
        original_extension: extension,
        created_at: created_at
      };
      this.resource_setOrCreateValueModeSpecific({
        resourceId: this.resource.uuid,
        filter: {
          language_id: langId,
          content_type: dist["SupportedContentType"].AUDIO,
          modes: [dist["SupportedMode"].IVR]
        },
        value: description
      }); // remove the focus from the `upload` Tab

      event.target.blur();
      this.pushAudioIntoLibrary(uploadedAudio);
    }
  }, {
    key: "findAudioResourceVariantFor",
    value: function findAudioResourceVariantFor(resource, filter) {
      try {
        return Object(flow_resource["d" /* findResourceVariantOverModesOn */])(resource, filter).value;
      } catch (e) {
        if (!(e instanceof ValidationException["a" /* ValidationException */])) {
          throw e;
        }

        return null;
      }
    }
  }]);

  return ResourceEditor;
}(Object(vue_class_component_esm["c" /* mixins */])(mixins_FlowUploader, Permissions["a" /* default */], Routes["a" /* default */], lang["a" /* default */]));

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])({
  required: true
})], ResourceEditorvue_type_script_lang_ts_ResourceEditor.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])({
  required: true
})], ResourceEditorvue_type_script_lang_ts_ResourceEditor.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], ResourceEditorvue_type_script_lang_ts_ResourceEditor.prototype, "resource", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["b" /* Prop */])()], ResourceEditorvue_type_script_lang_ts_ResourceEditor.prototype, "label", void 0);

Object(tslib_es6["__decorate"])([lib["b" /* Getter */]], ResourceEditorvue_type_script_lang_ts_ResourceEditor.prototype, "availableAudio", void 0);

Object(tslib_es6["__decorate"])([lib["b" /* Getter */]], ResourceEditorvue_type_script_lang_ts_ResourceEditor.prototype, "isFeatureAudioUploadEnabled", void 0);

Object(tslib_es6["__decorate"])([lib["c" /* Mutation */]], ResourceEditorvue_type_script_lang_ts_ResourceEditor.prototype, "pushAudioIntoLibrary", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Action], ResourceEditorvue_type_script_lang_ts_ResourceEditor.prototype, "resource_setOrCreateValueModeSpecific", void 0);

Object(tslib_es6["__decorate"])([builderVuexNamespace.Getter], ResourceEditorvue_type_script_lang_ts_ResourceEditor.prototype, "isEditable", void 0);

ResourceEditorvue_type_script_lang_ts_ResourceEditor = Object(tslib_es6["__decorate"])([Object(vue_property_decorator_lib["a" /* Component */])({
  components: {
    AudioLibrarySelector: AudioLibrarySelector,
    ResourceVariantTextEditor: ResourceVariantTextEditor["a" /* default */],
    UploadMonitor: UploadMonitor,
    PhoneRecorder: PhoneRecorder
  }
})], ResourceEditorvue_type_script_lang_ts_ResourceEditor);

/* harmony default export */ var ResourceEditorvue_type_script_lang_ts_ = (ResourceEditorvue_type_script_lang_ts_ResourceEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/resource-editors/ResourceEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var resource_editors_ResourceEditorvue_type_script_lang_ts_ = (ResourceEditorvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceEditor.vue?vue&type=style&index=0&id=dd0260a8&scoped=true&lang=css&
var ResourceEditorvue_type_style_index_0_id_dd0260a8_scoped_true_lang_css_ = __webpack_require__("b7bc");

// CONCATENATED MODULE: ./src/components/interaction-designer/resource-editors/ResourceEditor.vue






/* normalize component */

var ResourceEditor_component = Object(componentNormalizer["a" /* default */])(
  resource_editors_ResourceEditorvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  "dd0260a8",
  null
  
)

/* harmony default export */ var resource_editors_ResourceEditor = __webpack_exports__["a"] = (ResourceEditor_component.exports);

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

/***/ "79f2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySelection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bc39");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySelection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySelection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySelection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7f4d":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".phone-recording-recorder-selector[data-v-41756c06]{padding-top:3em}.phone-recording-recorder-selector .modal-body .h4[data-v-41756c06],.phone-recording-recorder-selector .modal-body h4[data-v-41756c06]{margin-top:2em}.phone-recording-recorder-selector .table .recorder-selector-field[data-v-41756c06]{width:3em;text-align:center;vertical-align:middle}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "820c":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("b986");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("001dc3d2", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "8736":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".audio-library-search-field.dropdown .dropdown-menu[data-v-22499358]{display:block;min-width:100%}.audio-library-search-field.dropdown .dropdown-menu>li.pagers>a[data-v-22499358]{clear:none;margin-top:0;margin-bottom:0;padding-top:.5em;padding-bottom:.5em}.audio-library-search-field.dropdown .dropdown-menu>li.pagers>a.disabled[data-v-22499358]{text-decoration:none;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled = false);cursor:not-allowed;color:#777}.close[data-v-22499358]{pointer-events:auto}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "9ea4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadMonitor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("820c");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadMonitor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadMonitor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadMonitor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "a3e7":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("e4fa");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("0a55e500", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "b4ec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7d6111f6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue?vue&type=template&id=07753668&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"generic-contact-property-editor"},[_c('hr'),_c('label',{staticClass:"text-primary"},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.contact-properties')))]),_c('div',{staticClass:"custom-control custom-checkbox"},[_c('input',{staticClass:"custom-control-input",attrs:{"id":"setContactProperty","type":"checkbox","name":"setContactProperty"},domProps:{"value":_vm.shouldSetContactProperty,"checked":_vm.shouldSetContactProperty},on:{"change":_vm.toggleSetContactProperty}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"setContactProperty"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.set-contact-property-with-response'))+" ")])]),(_vm.shouldSetContactProperty)?_c('div',{staticClass:"form-group"},[_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/set_contact_property/property_key")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('div',{staticClass:"block-contact-property-key"},[_c('text-editor',{attrs:{"value":_vm.propertyKey,"label":_vm._f("trans")('flow-builder.property'),"placeholder":_vm._f("trans")('flow-builder.enter-contact-property-label'),"valid-state":isValid},on:{"input":_vm.updatePropertyKey}})],1)]}}],null,false,1545571803)}),_c('h6',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.value')))]),(_vm.isBlockInteractive(_vm.block))?_c('div',{staticClass:"form-group"},[_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{staticClass:"custom-control-input",attrs:{"id":"setProp","type":"radio","name":"contactPropAction"},domProps:{"checked":_vm.propertyValueAction === _vm.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE,"value":_vm.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE},on:{"change":_vm.updatePropertyValueAction}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"setProp"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.entry-from-this-block'))+" ")])]),_c('div',{staticClass:"custom-control custom-radio"},[_c('input',{staticClass:"custom-control-input",attrs:{"id":"clearProp","type":"radio","name":"contactPropAction"},domProps:{"checked":_vm.propertyValueAction === _vm.PROPERTY_VALUE_ACTION.OPEN_EXPRESSION,"value":_vm.PROPERTY_VALUE_ACTION.OPEN_EXPRESSION},on:{"change":_vm.updatePropertyValueAction}}),_c('label',{staticClass:"custom-control-label font-weight-normal",attrs:{"for":"clearProp"}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.expression'))+" ")])])]):_vm._e(),(_vm.shouldUseOpenExpression)?_c('validation-message',{attrs:{"message-key":("block/" + (_vm.block.uuid) + "/config/set_contact_property/property_value")},scopedSlots:_vm._u([{key:"input-control",fn:function(ref){
var isValid = ref.isValid;
return [_c('expression-input',{attrs:{"label":'',"placeholder":_vm._f("trans")('flow-builder.enter-expression'),"current-expression":_vm.propertyValue,"valid-state":isValid},on:{"commitExpressionChange":_vm.updatePropertyValue}})]}}],null,false,3441631689)}):_vm._e()],1):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue?vue&type=template&id=07753668&

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
      this.propertyValue = Object(lodash["get"])(this.block.config.set_contact_property, 'property_value', EMPTY_STRING_EXPRESSION);
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
            property_key: '',
            property_value: this.shouldUseOpenExpression ? EMPTY_STRING_EXPRESSION : BLOCK_RESPONSE_EXPRESSION
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

/***/ "b7bc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceEditor_vue_vue_type_style_index_0_id_dd0260a8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("efac");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceEditor_vue_vue_type_style_index_0_id_dd0260a8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceEditor_vue_vue_type_style_index_0_id_dd0260a8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceEditor_vue_vue_type_style_index_0_id_dd0260a8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b986":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".progress{margin-bottom:.5em}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "bb40":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7d6111f6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue?vue&type=template&id=0ce279b0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"resource-variant-text-editor"},[_c('div',{staticClass:"content-editor",class:{'content-editor-selected': !!_vm.content}},[_c('div',{staticClass:"input-group"},[(_vm.label)?_c('div',{staticClass:"input-group-prepend"},[_c('span',{staticClass:"input-group-text"},[_vm._v(_vm._s(_vm.label))])]):_vm._e(),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.content),expression:"content"},{name:"focus",rawName:"v-focus",value:(_vm.isSelected),expression:"isSelected"}],ref:"input",staticClass:"form-control",attrs:{"placeholder":_vm._f("trans")(_vm.placeholder || ("flow-builder.enter-" + (_vm.resourceVariant.content_type.toString().toLowerCase()) + "-content")),"rows":_vm.rows},domProps:{"value":(_vm.content)},on:{"focus":_vm.select,"blur":_vm.deselect,"input":function($event){if($event.target.composing){ return; }_vm.content=$event.target.value}}})])]),_c('div',{staticClass:"content-toolbar"},[(_vm.isEditable)?_c('span',{staticClass:"text-muted transition-all",class:{invisible: !_vm.characterCounter.count}},[_vm._v(" "+_vm._s(_vm.characterCounter.count)+" characters "),(_vm.mode === 'sms' && _vm.characterCounter.pages > 1)?[_vm._v(" ("+_vm._s(_vm.characterCounter.pages)+" "+_vm._s(_vm.characterCounter.hasUnicode ? 'unicode pages' : 'pages')+") ")]:_vm._e()],2):_vm._e(),(_vm.doesContentContainExpression)?_c('a',{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.top.html",value:(("<p>" + (_vm.trans('flow-builder.youre-using-floip-expressions')) + "</p>\n                     <p>\n                       <strong>" + (_vm.trans('flow-builder.pro-tip')) + ":</strong>\n                       " + (_vm.trans('flow-builder.floip-expressions-escape-with-double-at-symbol')) + "\n                     </p>")),expression:"`<p>${trans('flow-builder.youre-using-floip-expressions')}</p>\n                     <p>\n                       <strong>${trans('flow-builder.pro-tip')}:</strong>\n                       ${trans('flow-builder.floip-expressions-escape-with-double-at-symbol')}\n                     </p>`",modifiers:{"hover":true,"top":true,"html":true}}],attrs:{"href":"https://floip.gitbooks.io/flow-specification/content/fundamentals/expressions.html","target":"_blank"}},[_c('kbd',{staticStyle:{"margin-left":"1em"}},[_c('i',{staticClass:"glyphicon glyphicon-console"}),(_vm.doesContentContainExpressionError)?_c('i',{staticClass:"glyphicon glyphicon glyphicon-remove-sign text-danger"}):_c('i',{staticClass:"glyphicon glyphicon-ok-sign text-success"})])]):_vm._e(),(_vm.doesContentContainExpressionError)?_c('div',{staticClass:"alert alert-danger",staticStyle:{"margin-top":"0.5em"}},[_c('p',[_c('i',{staticClass:"glyphicon glyphicon-remove-sign"}),_c('strong',[_c('a',{attrs:{"href":"https://floip.gitbooks.io/flow-specification/content/fundamentals/expressions.html","target":"_blank"}},[_vm._v("FLOIP Expression")]),_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.error-found'))+" ")])]),_c('p',[_c('em',[_vm._v(" "+_vm._s(_vm.contentExpressionAST.message)+" ("),(_vm.contentExpressionAST.location.start.line !== 1)?_c('span',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.on-line'))+" "+_vm._s(_vm.contentExpressionAST.location.start.line)+", ")]):_vm._e(),_vm._v(_vm._s(_vm._f("trans")('flow-builder.at-character'))+" "+_vm._s(_vm.contentExpressionAST.location.start.column)+") ")])])]):_vm._e()])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue?vue&type=template&id=0ce279b0&scoped=true&

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("f3f3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./src/lib/filters/lang.ts
var lang = __webpack_require__("4a51");

// EXTERNAL MODULE: ./node_modules/@floip/expression-parser/dist/Parser.js
var Parser = __webpack_require__("14d3");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// EXTERNAL MODULE: ./node_modules/vue-focus/dist/vue-focus.common.js
var vue_focus_common = __webpack_require__("f837");
var vue_focus_common_default = /*#__PURE__*/__webpack_require__.n(vue_focus_common);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/tooltip/tooltip.js
var tooltip = __webpack_require__("b4ae");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue?vue&type=script&lang=js&




/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */






 // import BlockContentAutogenButton from './BlockContentAutogenButton'

external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component('BTooltip', tooltip["a" /* BTooltip */]);
/* harmony default export */ var ResourceVariantTextEditorvue_type_script_lang_js_ = ({
  components: {// BlockContentAutogenButton,
  },
  mixins: [lang["b" /* lang */], vue_focus_common_default.a.mixin],
  props: {
    isEditable: Boolean,
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    resourceId: {
      type: String,
      default: null
    },
    resourceVariant: {
      // as () => IResourceValue
      type: Object,
      default: null
    },
    mode: {
      type: String,
      default: null
    },
    enableAutogenButton: {
      type: Boolean,
      default: true
    },
    rows: {
      type: Number,
      default: 2
    } // maybe!?
    // block: Object,
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
            languageId = _this$resourceVariant.language_id,
            contentType = _this$resourceVariant.content_type;
        this.$emit('beforeResourceVariantChanged', {
          variant: this.resourceVariant,
          resourceId: resourceId
        });
        this.resource_setOrCreateValueModeSpecific({
          resourceId: resourceId,
          filter: {
            language_id: languageId,
            content_type: contentType,
            modes: [mode]
          },
          value: value
        });
        this.$emit('afterResourceVariantChanged', {
          variant: this.resourceVariant,
          resourceId: resourceId
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
      var hasUnicode = !/^[\x00-\x7F]*$/.test(this.content);
      var count = this.content.length;
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
// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue?vue&type=style&index=0&id=0ce279b0&lang=scss&scoped=true&
var ResourceVariantTextEditorvue_type_style_index_0_id_0ce279b0_lang_scss_scoped_true_ = __webpack_require__("1e79");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  resource_editors_ResourceVariantTextEditorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "0ce279b0",
  null
  
)

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

/***/ "e350":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneRecordingRecorderSelector_vue_vue_type_style_index_0_id_41756c06_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fc0c");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneRecordingRecorderSelector_vue_vue_type_style_index_0_id_41756c06_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneRecordingRecorderSelector_vue_vue_type_style_index_0_id_41756c06_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneRecordingRecorderSelector_vue_vue_type_style_index_0_id_41756c06_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e4fa":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".resource-variant-text-editor[data-v-0ce279b0]{margin-bottom:10px}.block-text-content-editor-for-lang-and-type[data-v-0ce279b0]{margin-bottom:.5em}.block-text-content-editor-for-lang-and-type .content-editor[data-v-0ce279b0]{position:relative}.block-text-content-editor-for-lang-and-type .content-editor textarea[data-v-0ce279b0]{height:56px}.block-text-content-editor-for-lang-and-type .content-editor input[type=text]:not(:focus)+button[data-v-0ce279b0],.block-text-content-editor-for-lang-and-type .content-editor textarea:not(:focus)+button[data-v-0ce279b0]{opacity:1}.block-text-content-editor-for-lang-and-type .content-editor input[type=text]+button[data-v-0ce279b0],.block-text-content-editor-for-lang-and-type .content-editor textarea+button[data-v-0ce279b0]{position:absolute;bottom:7px;right:10px;transition:opacity .2s ease-in-out;opacity:0}.block-text-content-editor-for-lang-and-type .content-editor-selected input[type=text][data-v-0ce279b0],.block-text-content-editor-for-lang-and-type .content-editor-selected textarea[data-v-0ce279b0]{background-color:#f8f8f8}.block-text-content-editor-for-lang-and-type .content-toolbar[data-v-0ce279b0]{margin-top:1px}.invisible[data-v-0ce279b0]{opacity:0}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "efac":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("33b4");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("01b640c1", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "f837a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySearchField_vue_vue_type_style_index_0_id_22499358_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fa04");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySearchField_vue_vue_type_style_index_0_id_22499358_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySearchField_vue_vue_type_style_index_0_id_22499358_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AudioLibrarySearchField_vue_vue_type_style_index_0_id_22499358_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "fa04":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8736");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("8d873f5c", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "fc0c":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("7f4d");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("63295499", content, true, {"sourceMap":false,"shadowMode":false});

/***/ })

}]);
//# sourceMappingURL=flow-builder.common.2.js.map