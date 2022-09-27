<template>
  <div class="core-run-flow-block">
    <base-block
      :block="block"
      :show-semantic-label="false"
      :uses-default-contact-props-editor="usesDefaultContactPropsEditor"
      :uses-default-branching-editor="usesDefaultBranchingEditor"
      @handleBranchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})">
      <slot
        slot="resource-editors"
        name="resource-editors" />
      <slot
        slot="extras"
        name="extras">
        <validation-message
          #input-control="{ isValid }"
          :message-key="`block/${block.uuid}/config/flow_id`">
          <div class="form-group">
            <text-editor
              v-model="destinationFlowId"
              :label="'flow-builder.destination-flow' | trans"
              :placeholder="'flow-builder.enter-destination-flow-id' | trans"
              :valid-state="isValid" />
          </div>
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
import {IBlock, IFlow} from '@floip/flow-runner'
import RunAnotherFlowStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_RunFlowBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
export class Core_RunAnotherFlowBlock extends mixins(Lang) {
  @Prop() readonly block!: IRunFlowBlock
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: false}) readonly usesDefaultContactPropsEditor!: boolean

  get destinationFlowId(): string {
    return this.block.config.flow_id
  }

  @blockVuexNamespace.Action declare setDestinationFlowId: (
    {blockId, newDestinationFlowId}: { blockId: string, newDestinationFlowId: string | undefined },
  ) => Promise<string>

  set destinationFlowId(newDestinationFlowId: string) {
    if (newDestinationFlowId === '') {
      this.setDestinationFlowId({blockId: this.block.uuid, newDestinationFlowId: undefined})
    } else {
      this.setDestinationFlowId({blockId: this.block.uuid, newDestinationFlowId})
    }
  }
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
  //TODO - add back in or move across to embedding app via slot when ready - pull flows from a backend
  //@blockVuexNamespace.Getter declare otherFlows: IFlow[]

  @builderVuexNamespace.Getter declare isEditable: boolean
}

export default Core_RunAnotherFlowBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, RunAnotherFlowStore)
</script>
