<template>
  <!--Resource editors grouped by language-->
  <div v-if="resource"
       class="per-language-resource-editor d-flex flex-column">
    <div
      v-for="(item) in supportedModeWithOrderInfo"
      :key="item.index"
      :class="{
        [`order-${item.order}`]: true
      }"
      class="mbx-4">
      <header class="d-flex">
        <font-awesome-icon
          v-if="iconsMap.get(item.mode)"
          :class="{'custom-icons': iconsMap.get(item.mode)[0] === 'fac', 'library-icons': iconsMap.get(item.mode)[0] !== 'fac'}"
          :icon="iconsMap.get(item.mode)" />
        <h6 class="ml-1">
          {{ `flow-builder.${item.mode.toLowerCase()}-content` | trans }}
        </h6>
      </header>

      <resource-editor-cell
        v-for="contentType in discoverContentTypesFor(item.mode)"
        :key="contentType"
        :block="block"
        :content-type="contentType"
        :language-id="languageId"
        :language-index="languageIndex"
        :mode="item.mode"
        :mode-index="item.index" />
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
import {
  IBlock,
  IResource,
  SupportedContentType,
  SupportedMode,
} from '@floip/flow-runner'

import {discoverContentTypesFor} from '@/store/flow/utils/resourceHelpers'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

@Component({})
export class PerLanguageResourceEditorRow extends mixins(FlowUploader, Permissions, Routes, Lang) {
  @Prop({required: true}) block!: IBlock
  @Prop({required: true}) languageIndex!: string
  @Prop({required: true}) languageId!: string

  SupportedMode = SupportedMode
  SupportedContentType = SupportedContentType
  iconsMap = new Map<string, object>([
    [SupportedMode.SMS, ['far', 'envelope']],
    [SupportedMode.TEXT, ['fac', 'text']],
    [SupportedMode.USSD, ['fac', 'ussd']],
    [SupportedMode.IVR, ['fac', 'audio']],
    [SupportedMode.RICH_MESSAGING, ['far', 'comment-dots']],
    [SupportedMode.OFFLINE, ['fas', 'mobile-alt']],
  ])

  discoverContentTypesFor = discoverContentTypesFor
  @flowVuexNamespace.Getter resourcesByUuidOnActiveFlow!: { [key: string]: IResource }
  @flowVuexNamespace.Getter supportedModeWithOrderInfo!: {mode: SupportedMode, index: number, order: number}[]

  get resource(): IResource {
    return this.resourcesByUuidOnActiveFlow[this.block.config.prompt]
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
