<template>
  <div class="flow-label-editor form-group">
    <text-editor
      v-model="label"
      :valid-state="validState"
      :label="'flow-builder.flow-label' | trans"
      :placeholder="'flow-builder.enter-flow-label' | trans"
      :class="{ 'is-invalid': isInvalid }" 
      :data-cy='"Open-response-label"'/>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {IBlock, IFlow} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')

@Component
export class FlowLabelEditor extends mixins(Lang) {
  @Prop() readonly flow!: IFlow
  @Prop() validState?: boolean

  get isInvalid() {
    // strict comparison, because `undefined` doesn't mean invalid
    return this.validState === false
  }

  get label(): IBlock['label'] {
    return this.flow.label ?? ''
  }

  set label(label: IBlock['label']) {
    this.flow_setLabel({flowId: this.flow.uuid, label})
    //Also set the name
    this.flow_setNameFromLabel({flowId: this.flow.uuid, label})
  }

  @flowVuexNamespace.Mutation flow_setLabel!: ({flowId, label}: {flowId: IFlow['uuid'], label: IFlow['label']}) => void
  @flowVuexNamespace.Mutation flow_setNameFromLabel!: ({flowId, label}: {flowId: IFlow['uuid'], label: IFlow['label']}) => void
}

export default FlowLabelEditor
</script>
