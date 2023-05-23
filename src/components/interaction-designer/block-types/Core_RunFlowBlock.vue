<template>
  <div class="core-run-flow-block">
    <base-block
      :block="block"
      :show-semantic-label="false"
      :uses-default-contact-props-editor="usesDefaultContactPropsEditor"
      :uses-default-branching-editor="usesDefaultBranchingEditor"
      @handleBranchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})">
      <slot
        slot="description"
        name="description" />
      <slot
        slot="resource-editors"
        name="resource-editors" />
      <slot
        slot="extras"
        name="extras">
        <validation-message :message-key="`block/${block.uuid}/config/flow_id`">
          <template #input-control="{ isValid }">
            <div class="form-group">
              <text-editor
                :label="'flow-builder.destination-flow' | trans"
                :placeholder="'flow-builder.enter-destination-flow-id' | trans"
                :valid-state="isValid"
                :value="destinationFlowId"
                @input="updateDestinationFlowId" />
            </div>
          </template>
        </validation-message>
      </slot>
      <slot
        slot="vendor-extras"
        name="vendor-extras" />
      <slot
        slot="branching"
        name="branching" />
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
import {namespace} from 'vuex-class'
import {Component, Prop} from 'vue-property-decorator'

import {IRunFlowBlock} from '@floip/flow-runner/src/model/block/IRunFlowBlock'
import {IBlock} from '@floip/flow-runner'
import Core_RunFlowBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_RunFlowBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')
const undoRedoVuexNamespace = namespace('undoRedo')

@Component({})
export class Core_RunFlowBlock extends mixins(Lang) {
  @Prop() readonly block!: IRunFlowBlock
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: false}) readonly usesDefaultContactPropsEditor!: boolean

  get destinationFlowId(): string {
    return this.block.config.flow_id
  }

  @blockVuexNamespace.Action declare setDestinationFlowId: (
    {blockId, newDestinationFlowId}: { blockId: string, newDestinationFlowId: string | undefined },
  ) => Promise<string>

  async updateDestinationFlowId(newDestinationFlowId: string): Promise<void> {
    if (newDestinationFlowId === '') {
      await this.setDestinationFlowId({blockId: this.block.uuid, newDestinationFlowId: undefined})
    } else {
      await this.setDestinationFlowId({blockId: this.block.uuid, newDestinationFlowId})
    }
    await this.takeSnapshot()
  }
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
  //TODO - add back in or move across to embedding app via slot when ready - pull flows from a backend
  //@blockVuexNamespace.Getter declare otherFlows: IFlow[]

  @builderVuexNamespace.Getter declare isEditable: boolean
  @undoRedoVuexNamespace.Action takeSnapshot: () => Promise<void>
}

export default Core_RunFlowBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, Core_RunFlowBlockStore)
</script>
