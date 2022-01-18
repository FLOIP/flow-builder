<template>
  <div>
    <slot :showAddLanguageModal="showAddLanguageModal">
      <button
        class="btn btn-primary"
        @click="showAddLanguageModal">
        {{ 'flow-builder.add-language' | trans }}
      </button>
    </slot>
    <b-modal
      ref="add-language-modal"
      :title="'flow-builder.add-language' | trans"
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
          <label class="text-primary">{{ 'flow-builder.iso-639-3-label' | trans }}</label>
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
        <label class="text-primary">{{ 'flow-builder.iso-3166-1-label' | trans }}</label>
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
        <label class="text-primary">{{ 'flow-builder.bcp-47-label' | trans }}</label>
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
} from '@floip/flow-runner'
import {Action, namespace, State} from 'vuex-class'

import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'

import VueMultiselect from 'vue-multiselect'

const countries = require('i18n-iso-countries')
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
countries.registerLocale(require('i18n-iso-countries/langs/fr.json'))

const importVuexNamespace = namespace('flow/import')
const validationVuexNamespace = namespace('validation')

@Component({
  components: {
    BModal,
    VueMultiselect,
  },
})
class LanguageAdder extends mixins(Lang, Routes) {
  newLanguage: ILanguage = {
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
  resetLanguage(): void {
    this.newLanguage = {
      id: '',
      label: '',
      iso_639_3: '',
      variant: '',
      bcp_47: '',
    } as ILanguage
    this.selected_iso_639_3 = {}
    this.selected_iso_3166_1 = {}
    this.validation_removeNewLanguageValidation()
  }
  showAddLanguageModal(): void {
    this.resetLanguage()
    const languageModal: any = this.$refs['add-language-modal']
    languageModal.show()
  }
  customLanguageLabel(option: any): string {
    if (!isEmpty(option)) {
      return `${option.name} - ${option.iso6393}`
    }
    return ''
  }
  customLocaleLabel(option: any): string {
    if (!isEmpty(option)) {
      return `${option.country} - ${option.locale}`
    }
    return ''
  }
  iso_3166_1Locales(): object[] {
    const countriesByLocaleCode = countries.getNames(this.locale, {select: 'official'})
    return map(keys(countriesByLocaleCode), (localeCode) => ({locale: localeCode, country: countriesByLocaleCode[localeCode]}))
  }
  set iso_639_3(selection: any) {
    this.selected_iso_639_3 = selection
    if (!isEmpty(selection)) {
      this.newLanguage.iso_639_3 = selection.iso6393
      this.updateBCP47()
    }
  }
  get iso_639_3(): string {
    return this.selected_iso_639_3
  }
  set iso_3166_1(selection: any) {
    this.selected_iso_3166_1 = selection
    if (!isEmpty(selection)) {
      this.updateBCP47()
    }
  }
  get iso_3166_1(): string {
    return this.selected_iso_3166_1
  }
  set variant(value: string) {
    this.newLanguage.variant = value
    if (!isEmpty(value)) {
      this.updateBCP47()
    }
  }
  get variant(): string {
    if (this.newLanguage.variant !== undefined) {
      return this.newLanguage.variant
    } else {
      return ''
    }
  }

  //Taken from voto5 restrictions
  filterVariant(e: KeyboardEvent): void {
    if (e.key.match(/[^a-z_]/g) && e.keyCode !== 8 && e.keyCode !== 46) {//allow backspace and delete
      e.preventDefault()
    }
    if (this.newLanguage.variant !== undefined && !isEmpty(this.newLanguage.variant)) {
      const lastCharacter = this.newLanguage.variant[this.newLanguage.variant.length - 1]
      if (lastCharacter === '_' && e.key.match(/_/g)) {
        e.preventDefault()
      }
    }
  }
  /*
   * For now, we aren't allowing the use of 'script' or other elements in BCP 47 Construction - though the spec allows this.
   * We only use iso 639 + ISO 3166-1 (and not UN M.49)
   * https://www.rfc-editor.org/rfc/rfc5646.html#section-2.1
   */
  updateBCP47(): void {
    if (!isEmpty(this.selected_iso_639_3)) {
      let bcp_47 = `${this.newLanguage.iso_639_3}`
      if (!isEmpty(this.selected_iso_3166_1)) {
        bcp_47 += `-${this.selected_iso_3166_1.locale}`
      }
      if (this.newLanguage.variant !== undefined && !isEmpty(this.newLanguage.variant)) {
        bcp_47 += `-${this.newLanguage.variant}`
      }
      this.newLanguage.bcp_47 = bcp_47
    }
  }
  async handleCreateLanguage(): Promise<void> {
    this.newLanguage.id = await (new IdGeneratorUuidV4()).generate()

    const persistRoute = this.route('languages.persistLanguage', {})
    const valid = await this.validateAndAddOrgLanguage({language: this.newLanguage, persistRoute})
    if (!valid) {
      return
    }
    this.$emit('onLanguageAddition')
    const languageModal: any = this.$refs['add-language-modal']
    languageModal.hide()
  }
  @Action validateAndAddOrgLanguage!: ({language, persistRoute}: { language: ILanguage, persistRoute: string }) => Promise<boolean | ILanguage>

  @State locale!: string

  @validationVuexNamespace.Action validation_removeNewLanguageValidation!: () => Promise<void>
}

export default LanguageAdder

</script>
