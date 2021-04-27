<template>
  <div class="flow-editor">
    <h3 class="no-room-above">
      {{flowHeader | trans}}
    </h3>

    <fieldset :disabled="!isEditable && sidebar">
      <div class="row">
          <div :class="{'col-12': sidebar, 'col-6': !sidebar}">
            <flow-label-editor :flow="flow" />
            <validation-message
              :message-key="`flow/${flow.uuid}/.interaction_timeout`"
              #input-control="{ isInvalid }">
              <flow-interaction-timeout-editor :flow="flow" :validationState="isInvalid"/>
            </validation-message>
          </div>
          <div :class="{'col-12': sidebar, 'col-6': !sidebar}">
            <flow-languages-editor
              :flow="flow"
              @commitFlowLanguagesChange="updateFlowLanguages"/>
            <flow-modes-editor
              :flow="flow"
              @commitFlowModesChange="updateFlowModes"/>
          </div>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { IFlow } from '@floip/flow-runner'
import { namespace } from 'vuex-class'
import Lang from '@/lib/filters/lang'
import FlowLabelEditor from './LabelEditor.vue'
import FlowInteractionTimeoutEditor from './InteractionTimeoutEditor.vue'
import FlowLanguagesEditor from './LanguagesEditor.vue'
import FlowModesEditor from './ModesEditor.vue'
import { ILanguage, SupportedMode } from "@floip/flow-runner/src/index";
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import { mixins } from "vue-class-component";

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    FlowLabelEditor,
    FlowInteractionTimeoutEditor,
    FlowLanguagesEditor,
    FlowModesEditor,
    ValidationMessage
  },
})
class FlowEditor extends mixins(Lang) {
    @Prop() readonly flow!: IFlow
    @Prop({default: 'flow-builder.edit-flow'}) readonly flowHeader!: string
    @Prop({default: true}) readonly sidebar!: boolean

    updateFlowLanguages(value: ILanguage[] | ILanguage) {
      this.flow_setLanguages({ flowId: this.flow.uuid, value })
    }

    updateFlowModes(value: SupportedMode[] | SupportedMode) {
      this.flow_setSupportedMode({ flowId: this.flow.uuid, value })
    }

  @flowVuexNamespace.Mutation flow_setLanguages: any

  @flowVuexNamespace.Mutation flow_setSupportedMode!: any

  @builderVuexNamespace.Getter isEditable!: boolean
}

export default FlowEditor
</script>
