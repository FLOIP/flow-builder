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
            {{ trans('flow-builder.currently-set-as-starting-block') }}
          </template>
          <template v-else>
            {{ trans('flow-builder.set-as-starting-block') }}
          </template>
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {Prop} from 'vue-property-decorator'
import {IBlock, IFlow} from '@floip/flow-runner'
import {Lang} from '@/lib/filters/lang'
import {namespace} from 'vuex-class'
import {mixins, Options} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')

@Options({})
export class FirstBlockEditorButton extends mixins(Lang) {
  @Prop({default: true}) readonly isEditable!: boolean

  @Prop() readonly blockId!: IBlock['uuid']

  @Prop() readonly flow!: IFlow

  get isStartBlock(): boolean {
    return this.blockId === this.flow.first_block_id
  }

  // @ts-ignore
  setStartBlock(event: any): void {
    const {flow: {uuid: flowId}, blockId} = this
    this.flow_setFirstBlockId({flowId, blockId})
  }

  @flowVuexNamespace.Mutation flow_setFirstBlockId!: ({flowId, blockId}: { flowId: IFlow['uuid'], blockId: IBlock['uuid'] }) => void
}

export default FirstBlockEditorButton
</script>
