<template>
  <div class="interaction-timeout-editor form-group">
    <numeric-editor
      v-model.number="interactionTimeout"
      :regex-numeric-filtering="'[0-9]'"
      :label="'flow-builder.Interaction-timeout' | trans"
      :placeholder="'flow-builder.enter-value' | trans"
      :valid-state="validState" />
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {IFlow} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')
const undoVuexNamespace = namespace('undo')

@Component({})
export class InteractionTimeoutEditor extends mixins(Lang) {
  @Prop() readonly flow!: IFlow
  @Prop() validState?: boolean

  get interactionTimeout(): number {
    return this.flow.interaction_timeout
  }

  set interactionTimeout(value: number) {
    this.createSnapshot('Change interaction timeout')
    this.flow_setInteractionTimeout({flowId: this.flow.uuid, value})
  }

  @flowVuexNamespace.Mutation flow_setInteractionTimeout!: ({
    flowId,
    value,
  }: { flowId: IFlow['uuid'], value: IFlow['interaction_timeout'] }) => void
  @undoVuexNamespace.Action createSnapshot: (name: string) => void
}

export default InteractionTimeoutEditor
</script>
