<template>
  <div
    v-if="activeFlow.supported_modes.length > 0"
    class="per-mode-resource-editor">
    <div class="d-flex flex-column">
      <div v-for="(item) in supportedModeWithOrderInfo"
           :key="item.index"
           :class="{
             [`order-${item.order}`]: true,
             'radius-on-top': item.order === 0,
             'radius-on-bottom': item.order === activeFlow.supported_modes.length - 1
           }"
           class="resource-panel">
        <div :class="{
               'radius-on-top': item.order === 0,
               'radius-on-bottom': item.order === activeFlow.supported_modes.length - 1,
             }"
             class="resource-panel-heading p-2 d-flex"
             @click="updateIsPanelExpanded(`${block.uuid}-${item.mode}`)">
          <div class="mr-auto">
            <header class="d-flex channel-name">
              <font-awesome-icon
                v-if="iconsMap.get(item.mode)"
                class="ml-3"
                :class="{'custom-icons': iconsMap.get(item.mode)[0] === 'fac', 'library-icons': iconsMap.get(item.mode)[0] !== 'fac'}"
                :icon="iconsMap.get(item.mode)"
                size="lg" />
              <h6 class="ml-3 align-self-center mb-0">
                {{ `flow-builder.${item.mode.toLowerCase()}-content` | trans }}
              </h6>
            </header>
          </div>
          <div class="ml-auto">
            <slot name="right" :mode="item.mode" :modeIndex="item.index" :modeOrder="item.order"/>
            <font-awesome-icon
              :icon="[
                'fas',
                isPanelExpanded[`${block.uuid}-${item.mode}`] === true ? 'angle-up' : 'angle-down'
              ]"
              class="cursor-pointer text-primary align-self-center" />
          </div>
        </div>
        <div
            v-if="isPanelExpanded[`${block.uuid}-${item.mode}`] === true"
            :id="`collapse-lang-panel-${block.uuid}-${item.mode}`"
            class="resource-panel-body p-2 collapse multi-collapse show">
          <per-mode-resource-editor-row
            :block="block"
            :mode="item.mode"
            :mode-index="item.index"
            @change="$emit('change')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {namespace} from 'vuex-class'
import {IBlock, IFlow, SupportedMode} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'
import Permissions from '@/lib/mixins/Permissions'
import Routes from '@/lib/mixins/Routes'
import FlowUploader from '@/lib/mixins/FlowUploader'
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')

@Component({})
export class PerModeResourceEditor extends mixins(FlowUploader, Permissions, Routes, Lang) {
  @Prop({required: true}) block!: IBlock

  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Getter supportedModeWithOrderInfo!: {mode: SupportedMode, index: number, order: number}[]

  SupportedMode = SupportedMode
  iconsMap = new Map<string, object>([
    [SupportedMode.SMS, ['fac', 'message']],
    [SupportedMode.TEXT, ['fac', 'text']],
    [SupportedMode.USSD, ['fac', 'ussd']],
    [SupportedMode.IVR, ['fac', 'audio']],
    [SupportedMode.RICH_MESSAGING, ['far', 'comment-dots']],
    [SupportedMode.OFFLINE, ['fas', 'mobile-alt']],
  ])

  isPanelExpanded = {}

  updateIsPanelExpanded(id) {
    if (this.isPanelExpanded[id] === true) {
      // redefine to make the data reactive
      this.isPanelExpanded = {
        ...this.isPanelExpanded,
        [id]: false,
      }
    } else {
      // redefine to make the data reactive
      this.isPanelExpanded = {
        ...this.isPanelExpanded,
        [id]: true,
      }
    }
  }
}

export default PerModeResourceEditor
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
  cursor: pointer;
}

.resource-panel-body {
  border-top: 1px solid $neutral-200;
  background-color: $neutral-25;
}
</style>
