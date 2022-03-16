<template>
  <div class="flow-editor">
    <h3 class="no-room-above">
      {{ flowHeader | trans }}
    </h3>

    <fieldset :disabled="!isEditable && sidebar">
      <div class="row">
        <div :class="{'col-12': sidebar, 'col-6': !sidebar}">
          <!-- We have `name` required according to IFlow, but it is auto-gen from `label`, therefore:
            - name refers to validation message-key
            - the UI field will be for label -->
          <validation-message
            #input-control="{ isValid }"
            :message-key="`flow/${flow.uuid}/name`">
            <flow-label-editor
              :flow="flow"
              :valid-state="isValid" />
          </validation-message>

          <validation-message
            #input-control="{ isValid }"
            :message-key="`flow/${flow.uuid}/interaction_timeout`">
            <interaction-timeout-editor
              :flow="flow"
              :valid-state="isValid" />
          </validation-message>
        </div>
        <div :class="{'col-12': sidebar, 'col-6': !sidebar}">
          <validation-message
            #input-control="{ isValid }"
            :message-key="`flow/${flow.uuid}/languages`">
            <languages-editor
              :flow="flow"
              @commitFlowLanguagesChange="updateFlowLanguages" />
          </validation-message>

          <validation-message
            #input-control="{ isValid }"
            :message-key="`flow/${flow.uuid}/supported_modes`">
            <modes-editor
              :flow="flow"
              @commitFlowModesChange="updateFlowModes" />
          </validation-message>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {IFlow, IResource, ILanguage, SupportedMode} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import {mixins} from 'vue-class-component'
import FlowLanguagesEditor from './LanguagesEditor.vue'
import FlowModesEditor from './ModesEditor.vue'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')
const validationVuexNamespace = namespace('validation')

@Component({})
export class FlowEditor extends mixins(Lang) {
  @Prop() readonly flow!: IFlow
  @Prop({default: 'flow-builder.edit-flow'}) readonly flowHeader!: string
  @Prop({default: true}) readonly sidebar!: boolean

  async updateFlowLanguages(value: ILanguage[] | ILanguage): Promise<void> {
    this.flow_setLanguages({flowId: this.flow.uuid, value})
    await this.validate_resourcesOnSupportedValues({
      resources: this.resourcesOnActiveFlow,
      supportedModes: this.activeFlow.supported_modes
    })
  }

  async updateFlowModes(value: SupportedMode[] | SupportedMode): Promise<void> {
    this.flow_setSupportedMode({flowId: this.flow.uuid, value})
    await this.validate_resourcesOnSupportedValues({
      resources: this.resourcesOnActiveFlow,
      supportedModes: this.activeFlow.supported_modes
    })
  }

  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Getter resourcesOnActiveFlow!: IResource[]
  @flowVuexNamespace.Mutation flow_setLanguages: any
  @flowVuexNamespace.Mutation flow_setSupportedMode!: any
  @builderVuexNamespace.Getter isEditable!: boolean

  @validationVuexNamespace.Action validate_resourcesOnSupportedValues!: (
    {resources, supportedModes}: {resources: IResource[], supportedModes: SupportedMode[]}
  ) => Promise<void>
}

export default FlowEditor
</script>
