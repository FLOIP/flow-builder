<template>
  <div class="form-group flow-name">
    <text-editor v-model="label"
        :label="'flow-builder.flow-label' | trans"
        :placeholder="'flow-builder.enter-flow-label' | trans">
    </text-editor>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TextEditor from '@/components/common/TextEditor.vue'
import { Component, Prop } from 'vue-property-decorator'
import { IFlow } from '@floip/flow-runner'
import { namespace } from 'vuex-class'
import lang from '@/lib/filters/lang'

const flowVuexNamespace = namespace('flow')
  @Component<any>(
    {
      components: {
        TextEditor,
      },
      mixins: [lang],
    },
  )
class FlowLabelEditor extends Vue {
    @Prop() readonly flow!: IFlow

    get label(): string {
      return this.flow.label || ''
    }

    set label(value: string) {
      this.flow_setLabel({ flowId: this.flow.uuid, value })
    }

    @flowVuexNamespace.Mutation flow_setLabel!: ({ flowId, value }: { flowId: IFlow['uuid']; value: IFlow['label']}) => void
  }

export default FlowLabelEditor
</script>
