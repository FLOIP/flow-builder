<template>
  <div
    v-if="orderedSupportedModes.length > 0"
    class="per-mode-resource-editor">
    <div class="d-flex flex-column">
      <div
        v-for="(mode, modeIndex) in orderedSupportedModes"
        :key="modeIndex"
        :class="{
          'radius-on-top': modeIndex === 0,
          'radius-on-bottom': modeIndex === orderedSupportedModes.length - 1
        }"
        class="resource-panel">
        <div
          :class="{
            'radius-on-top': modeIndex === 0,
            'radius-on-bottom': modeIndex === orderedSupportedModes.length - 1,
          }"
          class="resource-panel-heading p-2 d-flex"
          @click="updateIsPanelExpanded(`${block.uuid}-${mode}`)">
          <div class="mr-auto">
            <header class="d-flex channel-name">
              <font-awesome-icon
                v-if="iconsMap.get(mode)"
                class="ml-3"
                :class="{'custom-icons': iconsMap.get(mode)[0] === 'fac', 'library-icons': iconsMap.get(mode)[0] !== 'fac'}"
                :icon="iconsMap.get(mode)"
                size="lg" />
              <h6 class="ml-3 align-self-center mb-0">
                {{ `flow-builder.${mode.toLowerCase()}-content` | trans }}
              </h6>
            </header>
          </div>
          <div class="ml-auto">
            <slot
              name="right"
              :mode="mode"
              :mode-index="modeIndex" />
            <font-awesome-icon
              :icon="[
                'fas',
                isPanelExpanded[`${block.uuid}-${mode}`] === true ? 'angle-up' : 'angle-down'
              ]"
              class="cursor-pointer text-primary align-self-center" />
          </div>
        </div>
        <div
          v-show="isPanelExpanded[`${block.uuid}-${mode}`] === true"
          :id="`collapse-lang-panel-${block.uuid}-${mode}`"
          class="resource-panel-body p-2 collapse multi-collapse show">
          <per-mode-resource-editor-row
            :block="block"
            :mode="mode"
            :mode-index="modeIndex"
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
import {Component, Prop, Watch} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')

@Component({})
export class PerModeResourceEditor extends mixins(FlowUploader, Permissions, Routes, Lang) {
  @Prop({required: true}) block!: IBlock
  @Prop({}) openResources?: string[]

  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Getter orderedSupportedModes!: SupportedMode[]

  SupportedMode = SupportedMode
  iconsMap = new Map<string, object>([
    [SupportedMode.SMS, ['fac', 'message']],
    [SupportedMode.TEXT, ['fac', 'text']],
    [SupportedMode.USSD, ['fac', 'ussd']],
    [SupportedMode.IVR, ['fac', 'audio']],
    [SupportedMode.RICH_MESSAGING, ['far', 'comment-dots']],
    [SupportedMode.OFFLINE, ['fas', 'mobile-alt']],
  ])

  expandedPanels: Record<string, boolean> = {}
  expandedPanelsOverridden: Record<string, boolean> = {}

  get hasOpenPanelsOverridden(): boolean {
    return this.openResources === undefined || this.openResources.length > 0
  }

  @Watch('openResources')
  overrideOpenResources(resources: string[]): void {
    if (resources !== undefined) {
      this.expandedPanelsOverridden = resources.reduce((map, key) => ({
        ...map,
        [key]: true,
      }), {})
    } else {
      this.expandedPanelsOverridden = {}
    }
  }

  get isPanelExpanded(): Record<string, boolean> {
    return this.hasOpenPanelsOverridden
      ? this.expandedPanelsOverridden
      : this.expandedPanels
  }

  updateIsPanelExpanded(id): void {
    if (this.hasOpenPanelsOverridden) {
      this.expandedPanelsOverridden = {
        ...this.expandedPanelsOverridden,
        [id]: !this.expandedPanelsOverridden[id],
      }
    } else {
      this.expandedPanels = {
        ...this.expandedPanels,
        [id]: !this.expandedPanels[id],
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
