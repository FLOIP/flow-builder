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
        <label class="form-check-label mt-2 mb-2 mr-2">Label</label>
        <validation-message message-key="language/new_language/label" #input-control="{ isValid }">
          <text-editor v-model="newLanguage.label"
                       :placeholder="'flow-builder.enter-label' | trans"
                       :validState="isValid"/>
        </validation-message>
      </div>
      <div class="form-group">
  <!-- From https://www.npmjs.com/package/iso-639-3 and use search input from resource editor -->
        <validation-message message-key="language/new_language/iso_639_3" #input-control="{ isValid }">
          <label class="form-check-label mt-2 mb-2 mr-2">ISO 639 3 Code</label>
          <input name="iso_639_3" type="text" class="form-control full-width" v-model="newLanguage.iso_639_3">

  <!-- Instead, use vue-multiselect? -->
          <language-tag-selector
              :audioFiles="availableAudio"
              selectedAudioFile=""/>
        </validation-message>
      </div>
      <div class="form-group">
        <label class="form-check-label mt-2 mb-2 mr-2">Language Variant</label>
        <validation-message message-key="language/new_language/variant" #input-control="{ isValid }">
          <text-editor v-model="newLanguage.variant"
                       :placeholder="'flow-builder.enter-variant' | trans"
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
import {
  ILanguage,
  IContext,
} from '@floip/flow-runner'
import { Action, namespace } from 'vuex-class'
const importVuexNamespace = namespace('flow/import')

import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'

import ValidationMessage from '@/components/common/ValidationMessage.vue';
import TextEditor from '@/components/common/TextEditor.vue'
import LanguageTagSelector from '@/components/common/AudioLibrarySelector.vue'

@Component({
  components: {
    BModal,
    ValidationMessage,
    LanguageTagSelector,
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
  resetLanguage() {
    this.newLanguage = {
      id: "",
      label: "",
      iso_639_3: "",
      variant: "",
      bcp_47: ""
    }
  }
  showAddLanguageModal() {
    this.resetLanguage()
    const languageModal: any = this.$refs['add-language-modal']
    languageModal.show()
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
}

export default LanguageAdder

</script>
