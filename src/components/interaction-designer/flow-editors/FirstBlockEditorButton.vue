<template>
  <div class="first-block-editor-button">
    <template v-if="isEditable">
      <div class="form-group">
        <button
          type="button"
          class="btn btn-sm w-100"
          :class="{'btn-outline-primary': !isStartBlock, 'btn-primary': isStartBlock}"
          :disabled="isStartBlock"
          @click="setStartBlock($event)">
          <font-awesome-icon
            :icon="['fac', 'enter']"
            class="fa-btn" />
          <template v-if="isStartBlock">
            {{ 'flow-builder.currently-set-as-starting-block' | trans }}
          </template>
          <template v-else>
            {{ 'flow-builder.set-as-starting-block' | trans }}
          </template>
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {IBlock, IFlow} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'
import {namespace} from 'vuex-class'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')
const undoVuexNamespace = namespace('undo')

@Component({})
export class FirstBlockEditorButton extends mixins(Lang) {
  @Prop({default: true}) readonly isEditable!: boolean

  @Prop() readonly blockId!: IBlock['uuid']

  @flowVuexNamespace.Getter activeFlow!: IFlow

  // @ts-ignore
  setStartBlock(event: any): void {
    this.createSnapshot('Change starting block')

    this.flow_setFirstBlockId({
      flowId: this.activeFlow.uuid,
      blockId: this.blockId,
    })
  }

  get isStartBlock(): boolean {
    return this.blockId === this.activeFlow.first_block_id
  }
  @flowVuexNamespace.Mutation flow_setFirstBlockId!: ({flowId, blockId}: { flowId: IFlow['uuid'], blockId: IBlock['uuid'] }) => void
  @undoVuexNamespace.Action createSnapshot: (name: string) => void
}

export default FirstBlockEditorButton
</script>
