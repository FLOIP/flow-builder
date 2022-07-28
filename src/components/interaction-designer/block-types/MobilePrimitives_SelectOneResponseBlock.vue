<template>
  <div class="mobile-primitive-select-one-response-block">
    <base-block
      :block="block"
      :flow="flow"
      :show-semantic-label="false"
      :uses-default-contact-props-editor="usesDefaultContactPropsEditor"
      :uses-default-branching-editor="usesDefaultBranchingEditor"
      @handleBranchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})">
      <slot
        slot="resource-editors"
        name="resource-editors">
        <resource-editor
          v-if="promptResource"
          :label="'flow-builder.prompt' | trans"
          :resource="promptResource"
          :block="block"
          :flow="flow" />
      </slot>
      <slot
        slot="extras"
        name="extras">
        <choices-builder
          :block="block"
          @choiceChanged="handleChoiceChanged" />
      </slot>
      <slot
        slot="vendor-extras"
        name="vendor-extras" />
      <slot
        slot="branching"
        name="branching">
        <block-output-branching-config
          :block="block"
          :has-exit-per-choice="true"
          :label-class="''"
          @branchingTypeChanged="reflowExitsWhenSwitchingToBranchingTypeNotUnified()" />
      </slot>
      <slot
        slot="contact-props"
        name="contact-props" />
      <slot
        slot="vendor"
        name="vendor" />
    </base-block>
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

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

@Component({})
export class MobilePrimitives_SelectOneResponseBlock extends mixins(Lang) {
  @Prop() readonly block!: ISelectOneResponseBlock
  @Prop() readonly flow!: IFlow
  @Prop({default: false}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: true}) readonly usesDefaultContactPropsEditor!: boolean

  SupportedMode = SupportedMode
  findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

  get promptResource(): IResource | undefined {
    if (this.block.config.prompt !== undefined) {
      return this.resourcesByUuidOnActiveFlow[this.block.config.prompt]
    }
    return undefined
  }

  handleChoiceChanged(): void {
    const {
      uuid: blockId,
      vendor_metadata: {floip: {ui_metadata: {branching_type}}},
    } = this.block as unknown as IBlockWithBranchingType

    const {EXIT_PER_CHOICE, UNIFIED, ADVANCED} = OutputBranchingType

    if (branching_type === UNIFIED) {
      this.handleBranchingTypeChangedToUnified({block: this.block})
    } else if (branching_type === ADVANCED) {
      this.reflowExitsFromChoices({blockId})
    } else if (branching_type === EXIT_PER_CHOICE) {
      this.reflowExitsFromChoices({blockId})
    } else {
      console.error('handleChoiceChanged', `cannot handle branching type ${branching_type}`)
    }
  }

  reflowExitsWhenSwitchingToBranchingTypeNotUnified(): void {
    const {uuid: blockId, vendor_metadata: metadata} = this.block as unknown as IBlockWithBranchingType
    const {EXIT_PER_CHOICE, ADVANCED} = OutputBranchingType
    const isEnteringChoiceOrAdvancedBranchingType = includes([EXIT_PER_CHOICE, ADVANCED], metadata.floip.ui_metadata.branching_type)

    if (!isEnteringChoiceOrAdvancedBranchingType) {
      this.handleBranchingTypeChangedToUnified({block: this.block})
      return
    }

    this.reflowExitsFromChoices({blockId})
  }

  @flowVuexNamespace.Getter resourcesByUuidOnActiveFlow!: { [key: string]: IResource }
  @blockVuexNamespace.Action reflowExitsFromChoices!: ({blockId}: {blockId: IBlock['uuid']}) => void
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
}

export default MobilePrimitives_SelectOneResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SelectOneStore)
</script>
