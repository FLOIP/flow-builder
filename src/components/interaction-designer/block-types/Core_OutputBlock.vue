<template>
  <div class="core-output-block">
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
        <validation-message :message-key="`block/${block.uuid}/config/value`">
          <template #input-control="{ isValid }">
            <expression-input
              :label="trans('flow-builder.output-expression')"
              :placeholder="trans('flow-builder.enter-expression')"
              :current-expression="value"
              :valid-state="isValid"
              :rows="expressionEditorRows"
              @commitExpressionChange="commitExpressionChange" />
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
import {IOutputBlock} from '@floip/flow-runner/src/model/block/IOutputBlock'
import {IBlock} from '@floip/flow-runner'
import OutputStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_OutputBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')
const undoRedoVuexNamespace = namespace('undoRedo')

@Component({})
export class Core_OutputBlock extends mixins(Lang) {
  @Prop() readonly block!: IOutputBlock
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: true}) readonly usesDefaultContactPropsEditor!: boolean
  @Prop({type: Number, default: 1}) readonly expressionEditorRows!: number

  get value(): string {
    return this.block.config.value || ''
  }

  @blockVuexNamespace.Action editOutputExpression!: (params: { blockId: IBlock['uuid'], value: string }) => Promise<string>
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
  @builderVuexNamespace.Getter isEditable !: boolean
  @undoRedoVuexNamespace.Action takeSnapshot: () => Promise<void>

  async commitExpressionChange(value: string): Promise<void> {
    await this.editOutputExpression({blockId: this.block.uuid, value})
    await this.takeSnapshot()
  }
}

export default Core_OutputBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, OutputStore)
</script>
