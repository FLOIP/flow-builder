<template>
  <div class="exit-block-editor-toggle">
    <template v-if="isEditable && hasClipboard">
      <div class="form-group">
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          :class="{active: isExitBlock}"
          @click="toggleExitBlock">
          <template v-if="isExitBlock">
            {{ trans('flow-builder.unset-as-exit-block') }}
          </template>
          <template v-else>
            {{ trans('flow-builder.set-as-exit-block') }}
          </template>
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {mixins, Options} from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {Lang} from '@/lib/filters/lang'
import {namespace} from 'vuex-class'
import {IBlock, IFlow} from '@floip/flow-runner'

const flowVuexNamespace = namespace('flow')

@Options({})
export class ExitBlockEditorToggle extends mixins(Lang) {
  @Prop({type: Object, required: true}) readonly flow!: IFlow
  // Toggle for particular block
  @Prop({type: String, default: ''}) readonly blockId!: IBlock['uuid']
  @Prop({type: Boolean, default: true}) readonly isEditable!: boolean
  // TODO: Validate use of the variable
  @Prop({type: Boolean, default: false}) readonly hasClipboard!: boolean

  get isExitBlock(): boolean {
    return this.blockId === this.flow.exit_block_id
  }

  toggleExitBlock(): void {
    this.flow_setExitBlockId({
      flowId: this.flow.uuid,
      blockId: this.isExitBlock ? '' : this.blockId,
    })
  }

  @flowVuexNamespace.Mutation flow_setExitBlockId!: ({flowId, blockId}: {flowId: string, blockId: IBlock['uuid']}) => void
}

export default ExitBlockEditorToggle
</script>
