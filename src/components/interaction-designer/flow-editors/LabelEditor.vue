<template>
  <div class="form-group flow-label">
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

    set label(label: string) {
      this.flow_setLabel({ flowId: this.flow.uuid, label })
      //Also set the name
      this.flow_setNameFromLabel({ flowId: this.flow.uuid, label })
    }

    @flowVuexNamespace.Mutation flow_setLabel!: ({ flowId, label }: { flowId: string, label: string }) => void
    @flowVuexNamespace.Mutation flow_setNameFromLabel!: ({ flowId, label }: { flowId: string, label: string }) => void
  }

export default FlowLabelEditor
</script>
