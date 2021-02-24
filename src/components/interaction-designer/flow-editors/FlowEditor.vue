<template>
  <div>
    <h3 class="no-room-above">
      {{'flow-builder.edit-flow' | trans}}
    </h3>

    <fieldset :disabled="!isEditable">
      <flow-name-editor :flow="flow" />
      <flow-label-editor :flow="flow" />
      <flow-interaction-timeout-editor :flow="flow" />
      <flow-languages-editor
        :flow="flow"
        @commitFlowLanguagesChange="updateFlowLanguages"/>
      <flow-modes-editor
        :flow="flow"
        @commitFlowModesChange="updateFlowModes"/>
    </fieldset>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { IFlow } from '@floip/flow-runner'
import { namespace } from 'vuex-class'
import lang from '@/lib/filters/lang'
import FlowNameEditor from './NameEditor.vue'
import FlowLabelEditor from './LabelEditor.vue'
import FlowInteractionTimeoutEditor from './InteractionTimeoutEditor.vue'
import FlowLanguagesEditor from './LanguagesEditor.vue'
import FlowModesEditor from './ModesEditor.vue'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

@Component<any>({
  components: {
    FlowNameEditor,
    FlowLabelEditor,
    FlowInteractionTimeoutEditor,
    FlowLanguagesEditor,
    FlowModesEditor,
  },
  mixins: [lang],
})
class FlowEditor extends Vue {
    @Prop() readonly flow!: IFlow

    updateFlowLanguages(value) {
      this.flow_setLanguages({ flowId: this.flow.uuid, value })
    }

    updateFlowModes(value) {
      this.flow_setSupportedMode({ flowId: this.flow.uuid, value })
    }

    @flowVuexNamespace.Mutation flow_setLanguages

    @flowVuexNamespace.Mutation flow_setSupportedMode

    @builderVuexNamespace.Getter isEditable
}

export default FlowEditor
</script>
