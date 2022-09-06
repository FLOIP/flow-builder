<template>
  <div class="interaction-timeout-editor form-group">
    <numeric-editor
      v-model.number="interactionTimeout"
      :regex-numeric-filtering="'[0-9]'"
      :label="trans('flow-builder.Interaction-timeout')"
      :placeholder="trans('flow-builder.enter-value')"
      :valid-state="validState" />
  </div>
</template>

<script lang="ts">
import {Prop} from 'vue-property-decorator'
import {IFlow} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import {Lang} from '@/lib/filters/lang'
import {mixins, Options} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')

@Options({})
export class InteractionTimeoutEditor extends mixins(Lang) {
  @Prop() readonly flow!: IFlow
  @Prop() validState?: boolean

  get interactionTimeout(): number {
    return this.flow.interaction_timeout
  }

  set interactionTimeout(value: number) {
    this.flow_setInteractionTimeout({flowId: this.flow.uuid, value})
  }

  @flowVuexNamespace.Mutation flow_setInteractionTimeout!: ({
    flowId,
    value,
  }: { flowId: IFlow['uuid'], value: IFlow['interaction_timeout'] }) => void
}

export default InteractionTimeoutEditor
</script>
