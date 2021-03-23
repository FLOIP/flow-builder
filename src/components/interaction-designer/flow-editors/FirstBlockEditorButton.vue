<template>
  <div class="starting-block-button">
    <template v-if="isEditable">
      <h4>{{'flow-builder.options' | trans}}</h4>
      <div class="form-group">
        <button type="button"
            class="btn btn-secondary btn-sm"
            :disabled="isStartBlock"
            @click="setStartBlock($event)">
          <template v-if="isStartBlock">
            {{'flow-builder.currently-set-as-starting-block' | trans}}
          </template>
          <template v-else>
            {{'flow-builder.set-as-starting-block' | trans}}
          </template>
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {IFlow} from '@floip/flow-runner'
import lang from '@/lib/filters/lang'
import {namespace} from 'vuex-class'

const flowVuexNamespace = namespace('flow')

  @Component<any>({
    mixins: [lang],
  })
class FirstBlockEditorButton extends Vue {
    @Prop({default: true}) readonly isEditable!: boolean

    @Prop()readonly blockId!: string

    @Prop()readonly flow!: IFlow

    get isStartBlock() {
      return this.blockId === this.flow.firstBlockId
    }

    setStartBlock(event) {
      const {flow: {uuid: flowId}, blockId} = this
      this.flow_setFirstBlockId({flowId, blockId})
    }

    @flowVuexNamespace.Mutation flow_setFirstBlockId!: ({flowId, blockId}: {flowId: string; blockId: string}) => void
  }
export default FirstBlockEditorButton
</script>
