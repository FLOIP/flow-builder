<template>
  <div>
    <button class="btn btn-primary"
      @click="showAddLanguageModal">
      {{'flow-builder.add-language' | trans}}
    </button>
    <b-modal title="Add Language"
      @ok.prevent="handleCreateLanguage"
      :ok-title="'flow-builder.create' | trans"
      :cancel-title="'flow-builder.cancel' | trans"
      ref="add-language-modal">
      <div class="form-group">
        <validation-message message-key="language/new_language/label" #input-control="{ isValid }">
          <text-editor v-model="newLanguage.label"
                       :placeholder="'flow-builder.enter-label' | trans"
                       :label="'flow-builder.label' | trans"
                       :validState="isValid"/>
        </validation-message>
      </div>
      <div class="form-group">
  <!-- From https://www.npmjs.com/package/iso-639-3 and use search input from resource editor -->
        <validation-message message-key="language/new_language/iso_639_3" #input-control="{ isValid }">
          <label class="form-check-label mt-2 mb-2 mr-2">ISO 639 3 Code</label>
          <vue-multiselect v-model="iso_639_3"
                           :class="{invalid: isValid === false}"
                           :placeholder="'flow-builder.language-tag-selector-placeholder' | trans"
                           :options="iso_639_3Tags"
                           :allow-empty="false"
                           label="iso6393"
                           track-by="iso6393"
                           :searchable="true">
          </vue-multiselect>
        </validation-message>
      </div>
      <div class="form-group">
        <validation-message message-key="language/new_language/variant" #input-control="{ isValid }">
          <text-editor v-model="newLanguage.variant"
                       :placeholder="'flow-builder.enter-variant' | trans"
                       :label="'flow-builder.language-variant' | trans"
                       :validState="isValid"/>
        </validation-message>
      </div>
      <div class="form-group">
        <label class="form-check-label mt-2 mb-2 mr-2">BCP 47</label>
        <validation-message message-key="language/new_language/bcp_47" #input-control="{ isValid }">
          <input name="bcp_47" type="text" class="form-control" v-model="newLanguage.bcp_47">
        </validation-message>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">

import { BModal } from 'bootstrap-vue'
import Lang from '@/lib/filters/lang'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { iso6393 } from 'iso-639-3'
import {
  isEmpty
} from 'lodash'

import {
  ILanguage,
  IContext,
} from '@floip/flow-runner'
import { Action, namespace } from 'vuex-class'
const importVuexNamespace = namespace('flow/import')
const validationVuexNamespace = namespace('validation')

import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'

import ValidationMessage from '@/components/common/ValidationMessage.vue';
import TextEditor from '@/components/common/TextEditor.vue'
import VueMultiselect from 'vue-multiselect';

@Component({
  components: {
    BModal,
    ValidationMessage,
    VueMultiselect,
    TextEditor
  },
})
class LanguageAdder extends mixins(Lang) {
  newLanguage = {
    id: "",
    label: "",
    iso_639_3: "",
    variant: "",
    bcp_47: ""
  }
  selected_iso_639_3: any = {}
  iso_639_3Tags: any[] = iso6393
  async resetLanguage() {
    this.newLanguage = {
      id: "",
      label: "",
      iso_639_3: "",
      variant: "",
      bcp_47: ""
    }
    this.selected_iso_639_3 = {}
    this.validation_removeNewLanguageValidation()
  }
  showAddLanguageModal() {
    this.resetLanguage()
    const languageModal: any = this.$refs['add-language-modal']
    languageModal.show()
  }
  set iso_639_3(selection: any) {
    if(!isEmpty(selection)) {
      this.newLanguage.iso_639_3 = selection.iso6393
    }
    this.selected_iso_639_3 = selection
  }
  get iso_639_3() {
    return this.selected_iso_639_3
  }
  async handleCreateLanguage() {
    this.newLanguage.id = await (new IdGeneratorUuidV4()).generate()
    const valid = await this.validateAndAddOrgLanguage(this.newLanguage)
    if(!valid) {
      return;
    }
    //TODO - This is an non single responsibility way of updating the list of org languages to choose from
    //it might have some side effects
    //Figure this out and make a better named function
    await this.validateLanguages(this.flowContainer)
    const languageModal: any = this.$refs['add-language-modal']
    languageModal.hide()
  }
  @Action validateAndAddOrgLanguage!: (newLanguage: ILanguage) => Promise<any>

  @importVuexNamespace.Action validateLanguages!: (flowContainer: IContext) => Promise<void>

  @importVuexNamespace.State flowContainer!: IContext

  @validationVuexNamespace.Action validation_removeNewLanguageValidation!: () => Promise<void>
}

export default LanguageAdder

</script>
