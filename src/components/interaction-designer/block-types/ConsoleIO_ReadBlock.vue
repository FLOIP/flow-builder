<template>
  <div class="console-io-read-block">
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
        <format-string-editor
          :block="block"
          @commitFormatStringChange="setFormatString" />
        <div>
          <h6>{{ 'flow-builder.destination-variable' | trans }}</h6>
          <div
            v-for="(variableStringFormat,i) in destinationVariablesFields"
            :key="i"
            class="form-group">
            <validation-message
              #input-control="{ isValid }"
              :message-key="`block/${block.uuid}/config/destination_variables/${i}`">
              <text-editor
                :label="''"
                :placeholder="'flow-builder.destination-variable-placeholder' | trans"
                :valid-state="isValid"
                value=""
                @keydown="filterVariableName"
                @input="updatedestinationVariables($event, i)" />
            </validation-message>
          </div>
        </div>
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

import {IBlock, IFlow} from '@floip/flow-runner'
import {IReadBlock} from '@floip/flow-runner/src/model/block/IReadBlock'
import ReadStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_ReadBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
class ConsoleIO_ReadBlock extends mixins(Lang) {
  @Prop() readonly declare block: IReadBlock
  @Prop() readonly declare flow: IFlow
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: false}) readonly usesDefaultContactPropsEditor!: boolean

  filterVariableName(e: KeyboardEvent): void {
    if (e.key.match(/\W+|Enter/g)) {
      e.preventDefault()
    }
  }

  updatedestinationVariables(value: string, i: number): void {
    this.editDestinationVariable({variableName: value, keyIndex: i})
  }

  @blockVuexNamespace.Action declare setFormatString: (newFormatString: string) => Promise<string>

  @blockVuexNamespace.Action declare editDestinationVariable: ({
    variableName,
    keyIndex,
  }: { variableName: string, keyIndex: number }) => Promise<string[]>

  @blockVuexNamespace.Getter declare destinationVariablesFields: () => Promise<string[]>
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
  @builderVuexNamespace.Getter declare isEditable: boolean
}

export default ConsoleIO_ReadBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, ReadStore)
</script>
