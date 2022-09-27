<template>
  <div
    v-if="activeFlow.supported_modes.length > 0"
    class="horizontal-resource-editor">
    <div>
      <div v-for="(mode, modeIndex) in activeFlow.supported_modes"
           :key="modeIndex"
           :class="{
             'radius-on-top': modeIndex === 0,
             'radius-on-bottom': modeIndex === activeFlow.supported_modes.length - 1
           }"
           class="resource-panel">
        <div :class="{
             'radius-on-top': modeIndex === 0,
             'radius-on-bottom': modeIndex === activeFlow.supported_modes.length - 1
           }"
             class="resource-panel-heading p-2 d-flex">
          <div class="mr-auto">
            <header class="d-flex">
              <font-awesome-icon
                v-if="iconsMap.get(mode)"
                :class="{'custom-icons': iconsMap.get(mode)[0] === 'fac', 'library-icons': iconsMap.get(mode)[0] !== 'fac'}"
                :icon="iconsMap.get(mode)" />
              <h6 class="ml-1">
                {{ `flow-builder.${mode.toLowerCase()}-content` | trans }}
              </h6>
            </header>
          </div>
          <div class="ml-auto">
            <button
              :aria-controls="`collapse-lang-panel-${block.uuid}-${mode}`"
              :data-target="`#collapse-lang-panel-${block.uuid}-${mode}`"
              aria-expanded="false"
              class="btn btn-sm btn-primary"
              data-toggle="collapse"
              type="button">
              show/hide
            </button>
          </div>
        </div>
        <div :id="`collapse-lang-panel-${block.uuid}-${mode}`" class="resource-panel-body p-2 collapse multi-collapse">
          <mode-resource-editor
            :block="block"
            :mode="mode"
            :mode-index="modeIndex" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {namespace} from 'vuex-class'
import {
  IBlock,
  IFlow,
  SupportedMode,
} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'
import Permissions from '@/lib/mixins/Permissions'
import Routes from '@/lib/mixins/Routes'
import FlowUploader from '@/lib/mixins/FlowUploader'
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')

@Component({})
export class ResourceEditor extends mixins(FlowUploader, Permissions, Routes, Lang) {
  @Prop({required: true}) block!: IBlock

  @flowVuexNamespace.Getter activeFlow!: IFlow

  SupportedMode = SupportedMode
  iconsMap = new Map<string, object>([
    [SupportedMode.SMS, ['far', 'envelope']],
    [SupportedMode.TEXT, ['fac', 'text']],
    [SupportedMode.USSD, ['fac', 'ussd']],
    [SupportedMode.IVR, ['fac', 'audio']],
    [SupportedMode.RICH_MESSAGING, ['far', 'comment-dots']],
    [SupportedMode.OFFLINE, ['fas', 'mobile-alt']],
  ])
}

export default ResourceEditor
</script>

<style lang="scss" scoped>
@import "../../../scss/custom_variables";

.resource-panel {
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

.resource-panel-heading {
  background-color: white;
}

.resource-panel-body {
  border-top: 1px solid $neutral-200;
}
</style>
