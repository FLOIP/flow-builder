<template>
  <div class="advanced-exits-builder">
    <h6>{{ trans('flow-builder.hint-to-set-advance-exit') }}</h6>

    <template v-for="(exit, i) in block.exits">
      <div :key="exit.uuid">
        <hr v-if="i > 0">
        <advanced-exit-editor
          v-if="!exit.default"
          ref="exitEditors"
          :block="block"
          :exit="exit"
          :label="(i + 1).toString()"
          class="advanced-block-exit-builder-item mb-2"
          @deleteExit="handleDeleteExit" />
      </div>
    </template>

    <input
      class="btn btn-outline-primary btn-sm w-100"
      type="button"
      :value="trans('flow-builder.btn-add-exit')"
      @click="addDraftExitToBlock">
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import Vue from 'vue'

const flowVuexNamespace = namespace('flow')

@Component({})
export class AdvancedExitsBuilder extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  async addDraftExitToBlock(): Promise<void> {
    const uuid = await (new IdGeneratorUuidV4()).generate()

    this.block_addExit({
      blockId: this.block.uuid,
      exit: await this.block_createBlockExitWith({
        props: {uuid} as IBlockExit,
      }),
    })

    this.$nextTick(() => {
      ((this.$refs.exitEditors as Vue[])
        .find(node => node.$props.exit.uuid === uuid)
        ?.$refs.name as HTMLInputElement)
        ?.focus()
    })
  }

  handleDeleteExit(exit: IBlockExit): void {
    this.block_removeExit({blockId: this.block.uuid, exit})
  }

  @flowVuexNamespace.Mutation block_addExit!: ({blockId, exit}: {blockId: IBlock['uuid'], exit: IBlockExit}) => void
  @flowVuexNamespace.Mutation block_removeExit!: ({blockId, exit}: {blockId: IBlock['uuid'], exit: IBlockExit}) => void
  @flowVuexNamespace.Action block_createBlockExitWith!: ({props}: { props: { uuid: string } & Partial<IBlockExit> }) => Promise<IBlockExit>
}
export default AdvancedExitsBuilder
</script>
