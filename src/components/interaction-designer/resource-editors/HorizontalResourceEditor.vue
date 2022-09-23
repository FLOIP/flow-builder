<template>
  <div
    v-if="activeFlow.languages.length > 0"
    class="horizontal-resource-editor">
    <div>
      <div v-for="({id: languageId, label: language}, langIndex) in activeFlow.languages"
           :key="languageId"
           class="panel panel-default" >
        <div class="panel-heading">
          {{language || 'flow-builder.unknown-language' | trans}}
        </div>
        <div class="panel-body">
          <language-resource-editor
            :block="block"
            :language-id="languageId"
            :language-index="langIndex"
            :resource-display-type="'horizontal'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {namespace} from 'vuex-class'
import {
  IBlock,
  IFlow,
} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'
import Permissions from '@/lib/mixins/Permissions'
import Routes from '@/lib/mixins/Routes'
import FlowUploader from '@/lib/mixins/FlowUploader'
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import {TabsPlugin} from 'bootstrap-vue'

Vue.use(TabsPlugin)

const flowVuexNamespace = namespace('flow')

@Component({})
export class ResourceEditor extends mixins(FlowUploader, Permissions, Routes, Lang) {
  @Prop({required: true}) block!: IBlock

  @flowVuexNamespace.Getter activeFlow!: IFlow
}

export default ResourceEditor
</script>

<style scoped>
.tab-content-style {
  background: #F4F4F4;
  padding: 10px;
}
.ivr-buttons {
  font-size: small;
  flex-grow: 1;
}
.custom-icons {
  height: 1.25em;
  width: 1.25em;
}
.library-icons {
  margin-top: 2px;
}
</style>
