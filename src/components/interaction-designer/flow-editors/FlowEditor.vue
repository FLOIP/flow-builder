<template>
  <div class="flow-editor">
    <h3
      v-if="flowHeader"
      class="no-room-above">
      {{ flowHeader | trans }}
    </h3>

    <fieldset :disabled="!isEditable && isOnSmallContainer">
      <div class="row">
        <!-- We have `name` required according to IFlow, but it is auto-gen from `label`, therefore:
                    - name refers to validation message-key
                    - the UI field will be for label -->
        <validation-message
          #input-control="{ isValid }"
          :class="firstRowClass"
          :message-key="`flow/${flow.uuid}/name`"
          :should-hide-validation="!didUserSubmit">
          <flow-label-editor
            :flow="flow"
            :valid-state="isValid"
            class="cy--flow-label--editor"/>
        </validation-message>

        <validation-message
          v-if="!hasDefaultInteractionTimeout"
          #input-control="{ isValid }"
          :class="firstRowClass"
          :message-key="`flow/${flow.uuid}/interaction_timeout`"
          :should-hide-validation="!didUserSubmit">
          <interaction-timeout-editor
            :flow="flow"
            :valid-state="isValid"
            class="cy--interaction-timeout--editor"/>
        </validation-message>
      </div>
      <div class="row">
        <validation-message
          #input-control="{ isValid }"
          :class="otherRowsClass"
          :message-key="`flow/${flow.uuid}/languages`"
          :should-hide-validation="!didUserSubmit">
          <languages-editor :flow="flow" class="cy--languages--selector"/>
        </validation-message>

        <validation-message
          #input-control="{ isValid }"
          :class="otherRowsClass"
          :message-key="`flow/${flow.uuid}/supported_modes`"
          :should-hide-validation="!didUserSubmit">
          <modes-editor :flow="flow" class="cy--modes--selector"/>
        </validation-message>
      </div>

      <slot name="vendor-extras" />
    </fieldset>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {IFlow, IResource, ILanguage, SupportedMode} from '@floip/flow-runner'
import {namespace, State} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')
const validationVuexNamespace = namespace('validation')

@Component({})
export class FlowEditor extends mixins(Lang) {
  @Prop() readonly flow!: IFlow
  @Prop({default: ''}) readonly flowHeader!: string
  @Prop({default: true}) readonly isOnSmallContainer!: boolean
  @Prop({default: false}) readonly didUserSubmit!: boolean

  get hasDefaultInteractionTimeout(): boolean {
    return Boolean(this.ui.appWideInteractionTimeout)
  }

  get firstRowClass(): string {
    if (this.isOnSmallContainer) {
      // show full width, no matter we have default InteractionTimeout or not
      return 'col-12'
    } if (!this.hasDefaultInteractionTimeout) {
      return 'col-xl-6 col-lg-6 col-md-12 col-sm-12'
    } else {
      return 'col-12'
    }
  }

  get otherRowsClass(): string {
    return this.isOnSmallContainer ? 'col-12' : 'col-xl-6 col-lg-6 col-md-12 col-sm-12'
  }

  @State(({trees: {ui}}) => ui) ui!: any
  @builderVuexNamespace.Getter isEditable!: boolean
}

export default FlowEditor
</script>
