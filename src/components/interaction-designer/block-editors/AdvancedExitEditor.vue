<template>
  <div class="advanced-exit-editor">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">{{label}}</span>
      </div>

      <!-- todo: this needs to be an expression editor instead -->
      <textarea
        v-model="test"
        :placeholder="`Enter test expression for exit`"
        class="form-control"
        rows="1" />
    </div>

    <label>Exit name</label>
    <textarea
      v-model="semanticLabel"
      :placeholder="`Enter name for exit`"
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
class AdvancedExitEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly exit!: IBlockExit
  @Prop() readonly label!: string

  get test(): IBlockExit['test'] {
    return this.exit.test
  }

  set test(value: IBlockExit['test']) {
    this.$emit('beforeExitTestChanged', {exitId: this.exit.uuid, blockId: this.block.uuid, value})
    this.block_setExitTest({exitId: this.exit.uuid, blockId: this.block.uuid, value})
  }

  get semanticLabel(): IBlockExit['semantic_label'] {
    return this.exit.semantic_label
  }

  set semanticLabel(value: IBlockExit['semantic_label']) {
    const {uuid: blockId} = this.block
    const {uuid: exitId} = this.exit

    this.$emit('beforeExitSemanticLabelChanged', {blockId, exitId, value})
    this.block_setExitSemanticLabelAndSlugOntoTagIfPreviouslySlugged({blockId, exitId, value})
  }

  @flowVuexNamespace.Mutation block_setExitTest!:
    ({exitId, blockId, value}: { exitId: string, blockId: string, value: IBlockExit['test'] }) => void
  @flowVuexNamespace.Action block_setExitSemanticLabelAndSlugOntoTagIfPreviouslySlugged!:
    ({exitId, blockId, value}: {exitId: IBlockExit['uuid'], blockId: IBlock['uuid'], value: IBlockExit['semantic_label']}) => void
}
export default AdvancedExitEditor
</script>
