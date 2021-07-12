<template>
  <div class="starting-block-button">
    <template v-if="isEditable">
      <h4>{{ 'flow-builder.options' | trans }}</h4>
      <div class="form-group">
        <button
          type="button"
          class="btn btn-sm w-100"
          :class="{'btn-outline-primary': !isStartBlock, 'btn-primary': isStartBlock}"
          :disabled="isStartBlock"
          @click="setStartBlock($event)">
          <svg-icon icon="enter" />
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
import SvgIcon from '@/components/common/SvgIcon.vue'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    SvgIcon,
  },
})
class FirstBlockEditorButton extends mixins(Lang) {
  @Prop({default: true}) readonly isEditable!: boolean

  @Prop() readonly blockId!: string

  @Prop() readonly flow!: IFlow

  get isStartBlock(): boolean {
    return this.blockId === this.flow.first_block_id
  }

    // @ts-ignore
    setStartBlock(event: any) {
      const { flow: { uuid: flowId }, blockId } = this
      this.flow_setFirstBlockId({ flowId, blockId })
    }

  @flowVuexNamespace.Mutation flow_setFirstBlockId!: ({flowId, blockId}: { flowId: IFlow['uuid'], blockId: IBlock['uuid'] }) => void
}

export default FirstBlockEditorButton
</script>
