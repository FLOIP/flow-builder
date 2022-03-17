<template>
  <div class="advanced-exit-editor">
    <expression-input
      ref="testExpressionInput"
      label=""
      :placeholder="'flow-builder.advanced-exit-expression-placeholder' | trans"
      :current-expression="test"
      :rows="1"
      :prepend-text="label"
      @commitExpressionChange="commitExpressionChange" />

    <h6 class="mt-2">{{ 'flow-builder.advanced-exit-name' | trans }}</h6>
    <textarea
      ref="name"
      v-model="name"
      :placeholder="'flow-builder.advanced-exit-name-placeholder' | trans"
      class="form-control"
      rows="1" />
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {namespace} from 'vuex-class'

const flowVuexNamespace = namespace('flow')

@Component({})
export class AdvancedExitEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly exit!: IBlockExit
  @Prop() readonly label!: string

  get test(): IBlockExit['test'] {
    return this.exit.test
  }

  get name(): IBlockExit['name'] {
    return this.exit.name
  }

  set name(value: IBlockExit['name']) {
    const {uuid: blockId} = this.block
    const {uuid: exitId} = this.exit

    this.$emit('beforeExitNameChanged', {blockId, exitId, value})
    this.block_setExitName({blockId, exitId, value})
    this.$emit('afterExitNameChanged', {blockId, exitId, value})
  }

  async commitExpressionChange(value: IBlockExit['test']): Promise<void> {
    this.$emit('beforeExitTestChanged', {exitId: this.exit.uuid, blockId: this.block.uuid, value})
    this.block_setExitTest({exitId: this.exit.uuid, blockId: this.block.uuid, value})
    this.$emit('afterExitTestChanged', {exitId: this.exit.uuid, blockId: this.block.uuid, value})
  }

  @flowVuexNamespace.Mutation block_setExitTest!:
    ({exitId, blockId, value}: { exitId: string, blockId: string, value: IBlockExit['test'] }) => void
  @flowVuexNamespace.Mutation block_setExitName!:
    ({exitId, blockId, value}: {exitId: IBlockExit['uuid'], blockId: IBlock['uuid'], value: IBlockExit['name']}) => void
}

export default AdvancedExitEditor
</script>
