<template>
  <div class="advanced-exit-editor remove-margin-left-right">
    <div class="put-back-margin-left-right">
      <div class="input-group">
        <div class="input-group-prepend bg-grey">
          <span class="input-group-text">
            {{ label }}
          </span>
        </div>
        <textarea
          ref="name"
          v-model="name"
          :placeholder="trans('flow-builder.advanced-exit-name-placeholder')"
          class="form-control"
          data-cy="advanced-exit-name--input"
          rows="1" />
        <button
          class="btn btn-outline-primary ml-3"
          data-cy="advanced-exit-delete--btn"
          @click="$emit('deleteExit', exit)">
          <font-awesome-icon :icon="['far', 'trash-alt']" />
        </button>
      </div>
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
            data-cy="advanced-exit-test-expression--input"
            @commitExpressionChange="commitExpressionChange" />
        </template>
      </validation-message>
    </div>
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
