<template>
  <div>
    <button
      class="btn btn-primary"
      @click="showAddLanguageModal">
      {{ 'flow-builder.add-language' | trans }}
    </button>
    <b-modal
      ref="add-language-modal"
      title="Add Language"
      :ok-title="'flow-builder.create' | trans"
      :cancel-title="'flow-builder.cancel' | trans"
      @ok.prevent="handleCreateLanguage">
      <div class="form-group">
        <validation-message
          #input-control="{ isValid }"
          message-key="language/new_language/label">
          <text-editor
            v-model="newLanguage.label"
            :placeholder="'flow-builder.enter-label' | trans"
            :label="'flow-builder.label' | trans"
            :valid-state="isValid" />
        </validation-message>
      </div>
      <div class="form-group">
        <!-- From https://www.npmjs.com/package/iso-639-3 and use search input from resource editor -->
        <validation-message
          #input-control="{ isValid }"
          message-key="language/new_language/iso_639_3">
          <label class="form-check-label mt-2 mb-2 mr-2">ISO 639 3 Code</label>
          <vue-multiselect
            v-model="iso_639_3"
            :class="{invalid: isValid === false}"
            :placeholder="'flow-builder.language-tag-selector-placeholder' | trans"
            :options="iso_639_3Tags"
            :allow-empty="false"
            :custom-label="customLanguageLabel"
            track-by="iso6393"
            :searchable="true" />
        </validation-message>
      </div>
      <div class="form-group">
        <validation-message
          #input-control="{ isValid }"
          message-key="language/new_language/variant">
          <text-editor
            v-model="variant"
            :placeholder="'flow-builder.enter-variant' | trans"
            :label="'flow-builder.language-variant' | trans"
            :valid-state="isValid"
            @keydown="filterVariant" />
        </validation-message>
      </div>
      <div class="form-group">
        <label class="form-check-label mt-2 mb-2 mr-2">ISO 3166 1 Locale</label>
        <vue-multiselect
          v-model="iso_3166_1"
          :placeholder="'flow-builder.language-locale-selector-placeholder' | trans"
          :options="iso_3166_1Locales()"
          :allow-empty="false"
          track-by="locale"
          :custom-label="customLocaleLabel"
          :searchable="true" />
      </div>
      <div class="form-group">
        <label class="form-check-label mt-2 mb-2 mr-2">BCP 47 - Generated from ISO 639 3, Locale, and Variant</label>
        <validation-message
          #input-control="{ isValid }"
          message-key="language/new_language/bcp_47">
          <input
            v-model="newLanguage.bcp_47"
            name="bcp_47"
            type="text"
            class="form-control"
            disabled>
        </validation-message>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">

import {BModal} from 'bootstrap-vue'
import Lang from '@/lib/filters/lang'
import Routes from '@/lib/mixins/Routes'
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import {iso6393} from 'iso-639-3'

import {
  map,
  keys,
  isEmpty,
} from 'lodash'

import {
  ILanguage,
  IContext,
} from '@floip/flow-runner'
import {Action, namespace} from 'vuex-class'

import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'

import ValidationMessage from '@/components/common/ValidationMessage.vue'
import TextEditor from '@/components/common/TextEditor.vue'
import VueMultiselect from 'vue-multiselect'

const countries = require('i18n-iso-countries')
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

const importVuexNamespace = namespace('flow/import')
const validationVuexNamespace = namespace('validation')

@Component({
  components: {
    BModal,
    ValidationMessage,
    VueMultiselect,
    TextEditor,
  },
})
class LanguageAdder extends mixins(Lang, Routes) {
  addLanguageError = ''
  newLanguage = {
    id: '',
    label: '',
    iso_639_3: '',
    variant: '',
    bcp_47: '',
  }
  selected_iso_639_3: any = {}
  selected_iso_3166_1: any = {}
  iso_639_3Tags: any[] = iso6393
  // There is no obvious way to narrow down ISO 3166-1 from iso 639 languages:
  // https://www.rfc-editor.org/rfc/rfc5646.html#section-4.2
  // As a result, we don't attempt to filter this list depending on the iso 639 selection
  // We use Alpha-2 Codes as apparently they are "the most widely used"
  // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
  async resetLanguage() {
    this.newLanguage = {
      id: '',
      label: '',
      iso_639_3: '',
      variant: '',
      bcp_47: '',
    }
    this.selected_iso_639_3 = {}
    this.validation_removeNewLanguageValidation()
  }
  showAddLanguageModal() {
    this.resetLanguage()
    const languageModal: any = this.$refs['add-language-modal']
    languageModal.show()
  }
  customLanguageLabel(option: any) {
    if (!isEmpty(option)) {
      return `${option.name} - ${option.iso6393}`
    }
  }
  customLocaleLabel(option: any) {
    if (!isEmpty(option)) {
      return `${option.country} - ${option.locale}`
    }
  }
  iso_3166_1Locales() {
    //TODO - this gives you the english names of the locales. This library also supports FR. Should we allow searching in both languages?
    const countriesByLocaleCode = countries.getNames('en', {select: 'official'})
    return map(keys(countriesByLocaleCode), (localeCode) => ({locale: localeCode, country: countriesByLocaleCode[localeCode]}))
  }
  set iso_639_3(selection: any) {
    this.selected_iso_639_3 = selection
    if (!isEmpty(selection)) {
      this.newLanguage.iso_639_3 = selection.iso6393
      this.updateBCP47()
    }
  }
  get iso_639_3() {
    return this.selected_iso_639_3
  }
  set iso_3166_1(selection: any) {
    this.selected_iso_3166_1 = selection
    if (!isEmpty(selection)) {
      this.updateBCP47()
    }
  }
  get iso_3166_1() {
    return this.selected_iso_3166_1
  }
  set variant(value: string) {
    this.newLanguage.variant = value
    if (!isEmpty(value)) {
      this.updateBCP47()
    }
  }
  get variant() {
    return this.newLanguage.variant
  }

  //Taken from voto5 restrictions
  filterVariant(e: KeyboardEvent): void {
    if (e.key.match(/[^a-z_]/g)) {
      e.preventDefault()
    }
    const lastCharacter = this.newLanguage.variant[this.newLanguage.variant.length-1]
    if (lastCharacter === "_" && e.key.match(/_/g)) {
      e.preventDefault()
    }
  }
  // For now, we aren't allowing the use of 'script' or other elements in BCP 47 Construction - though the spec allows this.
  // We only use iso 639 + ISO 3166-1 (and not UN M.49)
  // https://www.rfc-editor.org/rfc/rfc5646.html#section-2.1
  updateBCP47() {
    if (!isEmpty(this.selected_iso_639_3)) {
      let bcp_47 = `${this.newLanguage.iso_639_3}`
      if (!isEmpty(this.selected_iso_3166_1)) {
        bcp_47 += `-${this.selected_iso_3166_1.locale}`
      }
      if (this.newLanguage.variant) {
        bcp_47 += `-${this.newLanguage.variant}`
      }
      this.newLanguage.bcp_47 = bcp_47
    }
  }
  async handleCreateLanguage() {
    this.newLanguage.id = await (new IdGeneratorUuidV4()).generate()

    const persistRoute = this.route('languages.persistLanguage', {})
    const valid = await this.validateAndAddOrgLanguage({language: this.newLanguage, persistRoute})
    if (!valid) {
      return
    }
    await this.validateLanguages(this.flowContainer)
    const languageModal: any = this.$refs['add-language-modal']
    languageModal.hide()
  }
  @Action validateAndAddOrgLanguage!: ({language, persistRoute}: { language: ILanguage, persistRoute: string }) => Promise<any>

  @importVuexNamespace.Action validateLanguages!: (flowContainer: IContext) => Promise<void>

  @importVuexNamespace.State flowContainer!: IContext

  @validationVuexNamespace.Action validation_removeNewLanguageValidation!: () => Promise<void>
}

export default LanguageAdder

</script>
