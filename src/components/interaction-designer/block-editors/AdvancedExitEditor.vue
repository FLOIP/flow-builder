<template>
  <div class="advanced-exit-editor remove-margin-left-right bg-grey pt-2 pb-1">
    <div class="put-back-margin-left-right">
      <h6 class="mt-2">
        {{ trans('flow-builder.test-expression') }}
      </h6>
      <validation-message :message-key="`block/${block.uuid}/exits/${index}/test`">
        <template #input-control>
          <expression-input
            ref="testExpressionInput"
            label=""
            :placeholder="trans('flow-builder.advanced-exit-expression-placeholder')"
            :current-expression="test"
            :rows="1"
            :prepend-text="label"
            @commitExpressionChange="commitExpressionChange" />
        </template>
      </validation-message>

      <h6 class="mt-2">
        {{ trans('flow-builder.advanced-exit-name') }}
      </h6>
      <textarea
        ref="name"
        v-model="name"
        :placeholder="trans('flow-builder.advanced-exit-name-placeholder')"
        class="form-control"
        rows="1" />
    </div>
  </div>
</template>

<script lang="ts">
import {Prop} from 'vue-property-decorator'
import {mixins, Options} from 'vue-class-component'
import {Lang} from '@/lib/filters/lang'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {namespace} from 'vuex-class'

const flowVuexNamespace = namespace('flow')

@Options({})
export class AdvancedExitEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly exit!: IBlockExit
  @Prop() readonly label!: string

  get index(): number {
    return this.block.exits?.findIndex(({uuid}) => uuid === this.exit.uuid)
  }

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
