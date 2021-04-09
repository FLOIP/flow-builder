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
import {IBlock, IFlow} from '@floip/flow-runner'
import { namespace } from 'vuex-class'
import lang from '@/lib/filters/lang'

const flowVuexNamespace = namespace('flow')
@Component(
  {
    components: {
      TextEditor,
    },
    mixins: [lang],
  },
)
class FlowLabelEditor extends Vue {
    @Prop() readonly flow!: IFlow

    get label(): IBlock['label'] {
      return this.flow.label || ''
    }

    set label(label: IBlock['label']) {
      this.flow_setLabel({ flowId: this.flow.uuid, label })
      //Also set the name
      this.flow_setNameFromLabel({ flowId: this.flow.uuid, label })
    }

    @flowVuexNamespace.Mutation flow_setLabel!: ({ flowId, label }: { flowId: IFlow['uuid']; label: IFlow['label']}) => void
    @flowVuexNamespace.Mutation flow_setNameFromLabel!: ({ flowId, label }: { flowId: IFlow['uuid']; label: IFlow['label'] }) => void
  }

export default FlowLabelEditor
</script>
