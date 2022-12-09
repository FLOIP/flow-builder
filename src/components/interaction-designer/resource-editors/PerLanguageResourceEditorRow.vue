<template>
  <!--Resource editors grouped by language-->
  <div
    v-if="resource"
    class="per-language-resource-editor-row d-flex flex-column">
    <div
      v-for="mode in modes"
      :key="mode"
      class="mbx-4">
      <header class="d-flex mb-2">
        <font-awesome-icon
          v-if="iconsMap.get(mode)"
          :class="{'custom-icons': iconsMap.get(mode)[0] === 'fac', 'library-icons': iconsMap.get(mode)[0] !== 'fac'}"
          :icon="iconsMap.get(mode)" />
        <h6 class="ml-3 mb-0 align-self-center">
          {{ `flow-builder.${mode.toLowerCase()}-content` | trans }}
        </h6>
      </header>

      <resource-editor-cell
        v-for="contentType in discoverContentTypesFor(mode)"
        :key="contentType"
        :block="block"
        :content-type="contentType"
        :language-id="languageId"
        :mode="mode" />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import Permissions from '@/lib/mixins/Permissions'
import Routes from '@/lib/mixins/Routes'
import FlowUploader from '@/lib/mixins/FlowUploader'
import {namespace} from 'vuex-class'
import {IBlock, IFlow, IResource, SupportedMode} from '@floip/flow-runner'
import {discoverContentTypesFor} from '@/store/flow/utils/resourceHelpers'
import {orderModes} from '@/store/flow/flow'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

@Component({})
export class PerLanguageResourceEditorRow extends mixins(FlowUploader, Permissions, Routes, Lang) {
  @Prop({required: true}) block!: IBlock
  @Prop({required: true}) languageId!: string

  iconsMap = new Map<string, object>([
    [SupportedMode.SMS, ['fac', 'message']],
    [SupportedMode.TEXT, ['fac', 'text']],
    [SupportedMode.USSD, ['fac', 'ussd']],
    [SupportedMode.IVR, ['fac', 'audio']],
    [SupportedMode.RICH_MESSAGING, ['far', 'comment-dots']],
    [SupportedMode.OFFLINE, ['fas', 'mobile-alt']],
  ])

  discoverContentTypesFor = discoverContentTypesFor
  @flowVuexNamespace.Getter resourcesByUuidOnActiveFlow!: { [key: string]: IResource }
  @flowVuexNamespace.Getter activeFlow: IFlow

  get resource(): IResource {
    return this.resourcesByUuidOnActiveFlow[this.block.config.prompt]
  }

  get modes(): SupportedMode[] {
    return orderModes(this.activeFlow.supported_modes)
  }
}
export default PerLanguageResourceEditorRow
</script>

<style scoped>
.custom-icons {
  height: 1.25em;
  width: 1.25em;
}
.library-icons {
  margin-top: 2px;
}
</style>
