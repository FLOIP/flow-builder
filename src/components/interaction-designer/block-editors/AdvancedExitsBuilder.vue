<template>
  <div class="advanced-exits-builder">
    <h6>{{ trans('flow-builder.hint-to-set-advance-exit') }}</h6>

    <template v-for="(exit, i) in block.exits">
      <advanced-exit-editor
        v-if="!exit.default"
        ref="exitEditors"
        :key="exit.uuid"
        :block="block"
        :exit="exit"
        :label="(i + 1).toString()"
        class="advanced-block-exit-builder-item mb-2"
        @afterExitTestChanged="handleExitChanged(exit, i)"
        @afterExitNameChanged="handleExitChanged(exit, i)" />
    </template>

    <advanced-exit-editor
      v-if="draftExit"
      ref="draftExitEditor"
      :block="block"
      :exit="draftExit"
      :label="block.exits.length.toString()"
      class="advanced-block-exit-builder-item mb-3"
      @beforeExitTestChanged="addDraftExitToBlock"
      @beforeExitNameChanged="addDraftExitToBlock" />
  </div>
</template>

<script lang="ts">
import {Prop} from 'vue-property-decorator'
import {mixins, Options} from 'vue-class-component'
import {Lang} from '@/lib/filters/lang'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {isEmpty, last} from 'lodash'

const flowVuexNamespace = namespace('flow')

@Options({})
export class AdvancedExitsBuilder extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  draftExit: IBlockExit | null = null

  created(): void {
    this.generateDraftExit()
  }

  async generateDraftExit(): Promise<void> {
    const uuid = await (new IdGeneratorUuidV4()).generate()
    this.draftExit = await this.block_createBlockExitWith({props: {uuid} as IBlockExit})
  }

  addDraftExitToBlock(): void {
    if (this.draftExit == null) {
      console.warn(
        'interaction-designer/block-editors/AdvancedExitsBuilder',
        'Unable to add absent draft exit to block.',
        {block: this.block},
)
      return
    }

    this.block_addExit({blockId: this.block.uuid, exit: this.draftExit})

    this.$nextTick(() => {
      const isNamePopulated = !isEmpty(this.draftExit?.name)
      const lastExitEditor = last(this.$refs.exitEditors as any)
      // sadly defeats Demeter's law -- :/
      this.focusInputEl(isNamePopulated
        ? this.getNameInputFrom(lastExitEditor)
        : this.getTestInputFrom(lastExitEditor))
    })

    this.generateDraftExit()
  }

  handleExitChanged(exit: IBlockExit, index: number): void {
    // Subtracting two to account for default exit
    const isLast = index === this.block.exits.length - 2
    if (!isLast || !this.hasEmptyValues(exit)) {
      return
    }

    this.block_removeExit({blockId: this.block.uuid, exit})
    this.focusInputEl(this.getTestInputFrom(this.$refs.draftExitEditor as any))
  }

  hasEmptyValues(exit: IBlockExit): boolean {
    return isEmpty(exit.name) && isEmpty(exit.test)
  }

  focusInputEl(input?: HTMLInputElement): void {
    input?.focus()
  }

  getNameInputFrom(exitEditor?: any): HTMLInputElement {
    return exitEditor?.$refs.name as HTMLInputElement
  }

  getTestInputFrom(exitEditor?: any): HTMLInputElement {
    return (exitEditor?.$refs.testExpressionInput as any).$refs.input as HTMLInputElement
  }

  @flowVuexNamespace.Mutation block_addExit!: ({blockId, exit}: {blockId: IBlock['uuid'], exit: IBlockExit}) => void
  @flowVuexNamespace.Mutation block_removeExit!: ({blockId, exit}: {blockId: IBlock['uuid'], exit: IBlockExit}) => void
  @flowVuexNamespace.Action block_createBlockExitWith!: ({props}: { props: { uuid: string } & Partial<IBlockExit> }) => Promise<IBlockExit>
}
export default AdvancedExitsBuilder
</script>
