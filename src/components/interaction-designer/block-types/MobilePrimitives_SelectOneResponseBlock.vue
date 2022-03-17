<template>
  <div class="mobile-primitive-select-one-response-block">
    <base-block
      :block="block"
      :flow="flow"
      :uses-default-contact-props-editor="usesDefaultContactPropsEditor"
      :uses-default-branching-editor="usesDefaultBranchingEditor"
      :show-semantic-label="false">
      <template slot="extras">
        <template
          v-if="!$slots['extras']">
          <choices-builder
            :block="block"
            @choiceChanged="handleChoiceChanged" />
          <block-output-branching-config
            v-if="!$slots['branching']"
            :block="block"
            :has-exit-per-choice="true"
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
        </template>
        <slot
          v-if="$slots['extras']"
          name="extras" />
      </template>
      <template slot="branching">
        <slot
          name="branching" />
      </template>
      <template slot="contact-props">
        <slot
          name="contact-props" />
      </template>
    </base-block>
    <slot name="vendor" />
  </div>
</template>

<script lang="ts">
import {IBlock, IFlow, IResource, SupportedMode} from '@floip/flow-runner'
import {ISelectOneResponseBlock} from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock'
import {namespace} from 'vuex-class'
import {Component, Prop} from 'vue-property-decorator'
import {includes} from 'lodash'

import SelectOneStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import {findOrGenerateStubbedVariantOn} from '@/store/flow/resource'
import {
  IBlockWithBranchingType,
  OutputBranchingType,
} from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import BaseBlock from './BaseBlock.vue'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

@Component({
  components: {
    BaseBlock,
  },
})
export class MobilePrimitives_SelectOneResponseBlock extends mixins(Lang) {
  @Prop() readonly block!: ISelectOneResponseBlock
  @Prop() readonly flow!: IFlow
  @Prop({default: false}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: true}) readonly usesDefaultContactPropsEditor!: boolean

  showSemanticLabel = false

  SupportedMode = SupportedMode
  findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

  get promptResource(): IResource {
    return this.resourcesByUuid[this.block.config.prompt]
  }

  handleChoiceChanged(): void {
    const {uuid: blockId, vendor_metadata: metadata} = this.block as unknown as IBlockWithBranchingType
    const {EXIT_PER_CHOICE, UNIFIED} = OutputBranchingType

    if (metadata.io_viamo.branchingType === UNIFIED) {
      this.handleBranchingTypeChangedToUnified({block: this.block})
    }

    if (metadata.io_viamo.branchingType !== EXIT_PER_CHOICE) {
      return
    }

    this.reflowExitsFromChoices({blockId})
  }

  reflowExitsWhenSwitchingToBranchingTypeNotUnified(): void {
    const {uuid: blockId, vendor_metadata: metadata} = this.block as unknown as IBlockWithBranchingType
    const {EXIT_PER_CHOICE, ADVANCED} = OutputBranchingType
    const isEnteringChoiceOrAdvancedBranchingType = includes([EXIT_PER_CHOICE, ADVANCED], metadata.io_viamo.branchingType)

    if (!isEnteringChoiceOrAdvancedBranchingType) {
      this.handleBranchingTypeChangedToUnified({block: this.block})
      return
    }

    this.reflowExitsFromChoices({blockId})
  }

  @flowVuexNamespace.Getter resourcesByUuid!: { [key: string]: IResource }
  @blockVuexNamespace.Action reflowExitsFromChoices!: ({blockId}: {blockId: IBlock['uuid']}) => void
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
}

export default MobilePrimitives_SelectOneResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SelectOneStore)
</script>
