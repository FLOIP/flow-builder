<template>
  <div class="mobile-primitive-select-many-response-block">
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
        @choiceChanged="handleChoiceChanged" />

      <hr>

      <block-output-branching-config
        :block="block"
        :has-exit-per-choice="false"
        :label-class="''"
        @branchingTypeChanged="reflowExitsWhenSwitchingToBranchingTypeNotUnified()" />

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

import SelectManyStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'
import Categorization from '@/components/interaction-designer/block-editors/Categorization.vue'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import ResourceVariantTextEditor from '@/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue'
import {findOrGenerateStubbedVariantOn} from '@/store/flow/resource'
import ChoicesBuilder from '@/components/interaction-designer/block-editors/ChoicesBuilder.vue'
import BlockOutputBranchingConfig from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import BlockExitSemanticLabelEditor from '../block-editors/ExitSemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockId from '../block-editors/BlockId.vue'
import SelectOneResponseBlock from './MobilePrimitives_SelectOneResponseBlock.vue'
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
export class MobilePrimitives_SelectManyResponseBlock extends SelectOneResponseBlock {
  @Prop() readonly declare block: ISelectOneResponseBlock

  @Prop() readonly declare flow: IFlow

  showSemanticLabel = false

  SupportedMode = SupportedMode
  findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

  //Important: Even we extends from SelectOneResponseBlock, to avoid conflict
  // we SHOULD re-declare @blockVuexNamespace based getter, state, action, mutation
  @flowVuexNamespace.Getter declare resourcesByUuid: { [key: string]: IResource }
  @flowVuexNamespace.Action declare block_createBlockExitWith: ({props}: { props: { uuid: string } & Partial<IBlockExit> }) => Promise<IBlockExit>
  @blockVuexNamespace.Action declare reflowExitsFromChoices: ({blockId}: {blockId: IBlock['uuid']}) => void
  @builderVuexNamespace.Getter declare isEditable: boolean
}

export default MobilePrimitives_SelectManyResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SelectManyStore)
</script>
