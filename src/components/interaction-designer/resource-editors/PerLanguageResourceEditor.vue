<template>
  <div
    v-if="languages.length > 0"
    class="per-language-resource-editor"
    data-cy="resource-editor">
    <div>
      <b-tabs>
        <b-tab
          v-for="({id: languageId, label: language, iso_639_3}) in languages"
          :key="languageId">
          <template #title>
            <span :data-cy="`resource-editor--tab--${iso_639_3}`">
              {{ trans(language || 'flow-builder.unknown-language') }}
            </span>
          </template>
          <per-language-resource-editor-row
            :block="block"
            :language-id="languageId"
            class="tab-content-style" />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {namespace} from 'vuex-class'
import {IBlock, IFlow, ILanguage} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'
import Permissions from '@/lib/mixins/Permissions'
import Routes from '@/lib/mixins/Routes'
import FlowUploader from '@/lib/mixins/FlowUploader'
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import {TabsPlugin} from 'bootstrap-vue'
import {orderLanguages} from '@/store/flow/flow'

Vue.use(TabsPlugin)

const flowVuexNamespace = namespace('flow')

@Component({})
export class PerLanguageResourceEditor extends mixins(FlowUploader, Permissions, Routes, Lang) {
  @Prop({required: true}) block!: IBlock

  @flowVuexNamespace.Getter activeFlow!: IFlow

  get languages(): ILanguage[] {
    return orderLanguages(this.activeFlow.languages ?? [])
  }
}

export default PerLanguageResourceEditor
</script>

<style scoped>
.tab-content-style {
  background: #F4F4F4;
  padding: 10px;
}
</style>
