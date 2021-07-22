<template>
  <div class="mobile-primitive-select-one-response-block">
    <h3 class="no-room-above">
      {{ `flow-builder.${block.type}` | trans }}
    </h3>

    <fieldset :disabled="!isEditable">
      <block-label-editor
        :block="block"
        @gearClicked="showSemanticLabel = !showSemanticLabel" />
      <block-semantic-label-editor
        v-if="showSemanticLabel"
        :block="block" />
      <block-name-editor :block="block" />

      <hr>

      <choices-builder
        :block="block"
        @choiceChanged="reflowExitsWhenBranchingTypeNotUnified()" />

      <block-output-branching-config
        :block="block"
        :has-exit-per-choice="true"
        @branchingTypeChanged="reflowExitsWhenBranchingTypeNotUnified()" />

      <div class="prompt-resource">
        <resource-editor
          v-if="promptResource"
          :label="'flow-builder.prompt' | trans"
          :resource="promptResource"
          :block="block"
          :flow="flow" />
      </div>

      <slot name="extras" />

      <categorization :block="block" />

      <generic-contact-property-editor :block="block" />

      <hr>

      <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid" />

    </fieldset>

    <block-id :block="block" />

  </div>
</template>

<script lang="ts">
import {IBlock, IBlockExit, IFlow, IResource, SupportedContentType, SupportedMode} from '@floip/flow-runner'
import {ISelectOneResponseBlock} from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock'
import {namespace} from 'vuex-class'
import {Component, Prop} from 'vue-property-decorator'
import {includes} from 'lodash'

import SelectOneStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'
import Lang from '@/lib/filters/lang'
import Categorization from '@/components/interaction-designer/block-editors/Categorization.vue'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import ResourceVariantTextEditor from '@/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue'
import {findOrGenerateStubbedVariantOn} from '@/store/flow/resource'
import ChoicesBuilder from '@/components/interaction-designer/block-editors/ChoicesBuilder.vue'
import BlockOutputBranchingConfig, {
  IBlockWithBranchingType,
  OutputBranchingType,
} from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import BlockExitSemanticLabelEditor from '../block-editors/ExitSemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockId from '../block-editors/BlockId.vue'
import GenericContactPropertyEditor from '../block-editors/GenericContactPropertyEditor.vue'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    GenericContactPropertyEditor,
    ResourceVariantTextEditor,
    BlockExitSemanticLabelEditor,
    BlockId,
    BlockLabelEditor,
    BlockNameEditor,
    BlockOutputBranchingConfig,
    BlockSemanticLabelEditor,
    ChoicesBuilder,
    FirstBlockEditorButton,
    ResourceEditor,
    Categorization,
  },
})
export class MobilePrimitives_SelectOneResponseBlock extends mixins(Lang) {
  @Prop() readonly block!: ISelectOneResponseBlock

  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  SupportedContentType = SupportedContentType
  SupportedMode = SupportedMode
  findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

  get promptResource(): IResource {
    return this.resourcesByUuid[this.block.config.prompt]
  }

  reflowExitsWhenBranchingTypeNotUnified(): void {
    const {uuid: blockId, vendor_metadata: metadata} = this.block as unknown as IBlockWithBranchingType
    const {EXIT_PER_CHOICE, ADVANCED} = OutputBranchingType
    const isEnteringChoiceOrAdvancedBranchingType = includes([EXIT_PER_CHOICE, ADVANCED], metadata.io_viamo.branchingType)

    if (!isEnteringChoiceOrAdvancedBranchingType) {
      return
    }

    this.reflowExitsFromChoices({blockId})
  }

  @flowVuexNamespace.Getter resourcesByUuid!: { [key: string]: IResource }
  @flowVuexNamespace.Action block_createBlockExitWith!: ({props}: { props: { uuid: string } & Partial<IBlockExit> }) => Promise<IBlockExit>
  @blockVuexNamespace.Action reflowExitsFromChoices!: ({blockId}: {blockId: IBlock['uuid']}) => void
  @builderVuexNamespace.Getter isEditable !: boolean
}

export default MobilePrimitives_SelectOneResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SelectOneStore)
</script>
