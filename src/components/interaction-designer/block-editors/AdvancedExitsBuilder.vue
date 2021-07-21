<template>
  <div class="advanced-exits-builder">
    <h6>Set advanced exit configurations using test expressions</h6>

    <advanced-exit-editor
      v-for="(exit, i) in block.exits"
      :key="exit.uuid"
      :block="block"
      :exit="exit"
      :label="i + 1"
      class="advanced-block-exit-builder-item mb-3" />

    <advanced-exit-editor
      v-if="draftExit"
      :key="draftExit.uuid"
      :block="block"
      :exit="draftExit"
      :label="block.exits.length + 1"
      class="advanced-block-exit-builder-item mb-3"
      @beforeExitTestChanged="addDraftExitToBlock"
      @beforeExitNameChanged="addDraftExitToBlock" />
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import AdvancedExitEditor from '@/components/interaction-designer/block-editors/AdvancedExitEditor.vue'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    AdvancedExitEditor,
  },
})
class AdvancedExitsBuilder extends mixins(Lang) {
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
        {block: this.block})
      return
    }

    this.block_addExit({blockId: this.block.uuid, exit: this.draftExit})
    this.generateDraftExit()
  }

  @flowVuexNamespace.Mutation block_addExit!: ({blockId, exit}: {blockId: string, exit: IBlockExit}) => void
  @flowVuexNamespace.Action block_createBlockExitWith!: ({props}: { props: { uuid: string } & Partial<IBlockExit> }) => Promise<IBlockExit>
}
export default AdvancedExitsBuilder
</script>
