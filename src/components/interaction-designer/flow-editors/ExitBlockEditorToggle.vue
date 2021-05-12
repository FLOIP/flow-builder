<template>
  <div class="flow-editor exit-block-editor-toggle">
    <template v-if="isEditable">
      <div class="form-group">
        <button type="button"
            class="btn btn-secondary btn-sm"
            :class="{active: isExitBlock}"
            @click="toggleExitBlock()">
          <template v-if="isExitBlock">
            {{'flow-builder.unset-as-exit-block' | trans}}
          </template>
          <template v-else>
            {{'flow-builder.set-as-exit-block' | trans}}
          </template>
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { IBlock, IFlow } from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'
import { namespace } from 'vuex-class'
import { mixins } from "vue-class-component";

const flowVuexNamespace = namespace('flow')

@Component({})
class ExitBlockEditorToggle extends mixins(Lang) {
  @Prop({ default: true }) readonly isEditable!: boolean
  @Prop() readonly blockId!: string
  @Prop() readonly flow!: IFlow

  get isExitBlock() {
    return this.blockId === this.flow.exit_block_id
  }

  toggleExitBlock() {
    this.flow_setExitBlockId({
      flowId: this.flow.uuid,
      blockId: this.isExitBlock ? null : this.blockId,
    })
  }

  @flowVuexNamespace.Mutation flow_setExitBlockId!: ({ flowId, blockId }: {flowId: IFlow['uuid']; blockId: IBlock['uuid']}) => void
}
export default ExitBlockEditorToggle
</script>
