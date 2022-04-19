<template>
  <div class="core-run-flow-block">
    <base-block
      :block="block"
      :flow="flow"
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
            <!--
            <label class="text-primary">{{ 'flow-builder.destination-flow' | trans }}</label>
            <select
              v-model="destinationFlowId"
              class="form-control"
              :class="{ 'is-invalid': isValid === false }">
              <option value="">
                {{ 'flow-builder.none-selected' | trans }}
              </option>
              <option
                v-for="(flow, i) in otherFlows"
                :value="flow.uuid">
                {{ flow.name }}
              </option>
            </select>
            //TODO - add back in or move across to embedding app via slot when ready - pull flows from a backend
          -->
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
    </base-block>
    <slot name="vendor" />
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
class Core_RunAnotherFlowBlock extends mixins(Lang) {
  @Prop() readonly block!: IRunFlowBlock
  @Prop() readonly flow!: IFlow
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: false}) readonly usesDefaultContactPropsEditor!: boolean

  get destinationFlowId(): string {
    return this.block.config.flow_id
  }

  set destinationFlowId(newDestinationFlowId: string) {
    this.setDestinationFlowId({blockId: this.block.uuid, newDestinationFlowId})
  }

  @blockVuexNamespace.Action declare setDestinationFlowId: (
    {blockId, newDestinationFlowId}: { blockId: string, newDestinationFlowId: string },
  ) => Promise<string>
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
  //TODO - add back in or move across to embedding app via slot when ready - pull flows from a backend
  //@blockVuexNamespace.Getter declare otherFlows: IFlow[]

  @builderVuexNamespace.Getter declare isEditable: boolean
}

export default Core_RunAnotherFlowBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, RunAnotherFlowStore)
</script>
