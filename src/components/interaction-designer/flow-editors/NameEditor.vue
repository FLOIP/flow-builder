<template>
  <div class="form-group flow-label">
    <text-editor v-model="name"
        :label="'flow-builder.flow-name' | trans"
        :placeholder="'flow-builder.enter-flow-name' | trans">
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

@Component(
  {
    components: {
      TextEditor,
    },
    mixins: [lang],
  },
)
class FlowNameEditor extends Vue {
    @Prop()readonly flow!: IFlow

    get name(): string {
      return this.flow.name || ''
    }

    set name(value: string) {
      this.flow_setName({ flowId: this.flow.uuid, value })
    }

    @flowVuexNamespace.Mutation flow_setName!: ({ flowId, value }: {flowId: string; value: string}) => void
  }

export default FlowNameEditor
</script>
