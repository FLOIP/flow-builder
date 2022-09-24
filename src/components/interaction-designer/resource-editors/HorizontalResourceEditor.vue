<template>
  <div
    v-if="activeFlow.languages.length > 0"
    class="horizontal-resource-editor">
    <div>
      <div v-for="({id: languageId, label: language}, langIndex) in activeFlow.languages"
           :key="languageId"
           :class="{
             'radius-on-top': langIndex === 0,
             'radius-on-bottom': langIndex === activeFlow.languages.length - 1
           }"
           class="language-panel">
        <div :class="{
             'radius-on-top': langIndex === 0,
             'radius-on-bottom': langIndex === activeFlow.languages.length - 1
           }"
             class="language-panel-heading p-2 d-flex">
          <div class="mr-auto">{{language || 'flow-builder.unknown-language' | trans}}</div>
          <div class="ml-auto">
            <button
              :aria-controls="`collapse-lang-panel-${languageId}`"
              :data-target="`#collapse-lang-panel-${languageId}`"
              aria-expanded="false"
              class="btn btn-sm btn-primary"
              data-toggle="collapse"
              type="button">
              show/hide
            </button>
          </div>
        </div>
        <div :id="`collapse-lang-panel-${languageId}`" class="language-panel-body p-2 collapse multi-collapse">
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

<style lang="scss" scoped>
@import "../../../scss/custom_variables";

.language-panel {
  margin-top: -1px; /** To avoid bold border separator on multiple languages **/
  border: 1px solid $neutral-200;
}

.radius-on-top {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.radius-on-bottom {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.language-panel-heading {
  background-color: white;
}

.language-panel-body {
  border-top: 1px solid $neutral-200;
}
</style>
