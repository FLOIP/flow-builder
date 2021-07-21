<template>
  <div class="advanced-exit-editor">

    <!--
         <expression-input
          label=""
          :placeholder="'Enter test expression for exit'"
          :rows="1"
          :prepend-text="label"
     -->

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
      v-model="name"
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
import ExpressionInput from '@/components/common/ExpressionInput.vue'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {ExpressionInput},
})
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

  get name(): IBlockExit['name'] {
    return this.exit.name
  }

  set name(value: IBlockExit['name']) {
    const {uuid: blockId} = this.block
    const {uuid: exitId} = this.exit

    this.$emit('beforeExitNameChanged', {blockId, exitId, value})
    this.block_setExitName({blockId, exitId, value})
  }

  @flowVuexNamespace.Mutation block_setExitTest!:
    ({exitId, blockId, value}: { exitId: string, blockId: string, value: IBlockExit['test'] }) => void
  @flowVuexNamespace.Mutation block_setExitName!:
    ({exitId, blockId, value}: {exitId: IBlockExit['uuid'], blockId: IBlock['uuid'], value: IBlockExit['name']}) => void
}

export default AdvancedExitEditor
</script>
