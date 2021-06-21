<template>
  <div>
    <button class="btn btn-primary"
      @click="showAddLanguageModal">
      {{'flow-builder.add-language' | trans}}
    </button>
    <b-modal title="Add Language"
      @ok="handleCreateLanguage"
      ref="add-language-modal">
      <div class="form-group form-inline full-width">
        <label class="form-check-label mt-2 mb-2 mr-2">Label</label>
        <input name="label" type="text" class="form-control" v-model="newLanguage.label">
      </div>
      <div class="form-group form-inline full-width">
        <label class="form-check-label mt-2 mb-2 mr-2">ISO 639 3 Code</label>
        <input name="iso_639_3" type="text" class="form-control" v-model="newLanguage.iso_639_3">
      </div>
      <div class="form-group form-inline full-width">
        <label class="form-check-label mt-2 mb-2 mr-2">Language Variant</label>
        <input name="variant" type="text" class="form-control" v-model="newLanguage.variant">
      </div>
      <div class="form-group form-inline full-width">
        <label class="form-check-label mt-2 mb-2 mr-2">BCP 47</label>
        <input name="bcp_47" type="text" class="form-control" v-model="newLanguage.bcp_47">
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
import { Mutation, namespace } from 'vuex-class'
const importVuexNamespace = namespace('flow/import')

import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'

@Component({
  components: { BModal },
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
    this.addOrgLanguage(this.newLanguage)
    await this.validateLanguages(this.flowContainer)
  }
  @Mutation addOrgLanguage!: (newLanguage: ILanguage) => void

  @importVuexNamespace.Action validateLanguages!: (value: string) => Promise<void>

  @importVuexNamespace.State flowContainer!: IContext
}

export default LanguageAdder

</script>
