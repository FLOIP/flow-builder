<template>
  <div class="contact-property-editor">
    <div class="form-group">
      <label>{{ 'flow-builder.action-label' | trans }}</label>
      <p>{{ 'flow-builder.contact-property-action-hint' | trans }}</p>
      <div class="form-group">
        <div class="custom-control custom-radio">
          <input
            id="setProp"
            v-model="propertyAction"
            type="radio"
            name="contactPropAction"
            :value="PROPERTY_ACTION.SET"
            class="custom-control-input">
          <label
            class="custom-control-label font-weight-normal"
            for="setProp">
            {{ 'flow-builder.set-contact-property' | trans }}
          </label>
        </div>
        <div class="custom-control custom-radio">
          <input
            id="clearProp"
            v-model="propertyAction"
            type="radio"
            name="contactPropAction"
            :value="PROPERTY_ACTION.CLEAR"
            class="custom-control-input">
          <label
            class="custom-control-label font-weight-normal"
            for="clearProp">
            {{ 'flow-builder.clear-contact-property' | trans }}
          </label>
        </div>
      </div>

      <validation-message
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/set_contact_property/property_key`">
        <div class="block-contact-property-key">
          <text-editor
            v-model="propertyKey"
            :label="'flow-builder.contact-property-label' | trans"
            :placeholder="'flow-builder.enter-contact-property-label' | trans"
            :valid-state="isValid" />
        </div>
      </validation-message>

      <validation-message
        v-if="propertyAction === PROPERTY_ACTION.SET"
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/set_contact_property/property_value`">
        <expression-input
          :label="'flow-builder.contact-property-expression' | trans"
          :placeholder="'flow-builder.edit-expression' | trans"
          :current-expression="propertyValue"
          :valid-state="isValid"
          @commitExpressionChange="updatePropertyValue" />
      </validation-message>
    </div>
  </div>
</template>

<script lang="ts">
import {IBlock} from '@floip/flow-runner'
import {Component, Prop} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {get} from 'lodash'
import {mixins} from 'vue-class-component'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import ExpressionInput from '@/components/common/ExpressionInput.vue'
import TextEditor from '@/components/common/TextEditor.vue'

const flowVuexNamespace = namespace('flow')

const NULL_STRING_EXPRESSION = '@(null)'
const EMPTY_STRING_EXPRESSION = ''

@Component({
  components: {
    TextEditor,
    ExpressionInput,
    ValidationMessage,
  },
})
class ContactPropertyEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  PROPERTY_ACTION = {
    SET: 'set',
    CLEAR: 'clear',
  }

  get propertyAction(): string {
    if (this.propertyValue === NULL_STRING_EXPRESSION) {
      return this.PROPERTY_ACTION.CLEAR
    }
    return this.PROPERTY_ACTION.SET
  }

  set propertyAction(value: string) {
    if (value === this.PROPERTY_ACTION.CLEAR) {
      this.updatePropertyValue(NULL_STRING_EXPRESSION)
    } else {
      this.updatePropertyValue(EMPTY_STRING_EXPRESSION)
    }
  }

  get propertyKey(): string {
    return get(this.block.config, 'set_contact_property.property_key')
  }

  set propertyKey(value: string) {
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'set_contact_property.property_key',
      value,
    })
  }

  get propertyValue(): string {
    return get(this.block.config, 'set_contact_property.property_value', EMPTY_STRING_EXPRESSION)
  }

  updatePropertyValue(value: string): void {
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'set_contact_property.property_value',
      value,
    })
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value: string }
  ) => void
  @flowVuexNamespace.Mutation block_updateVendorMetadataByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value: string }
  ) => void
}

export default ContactPropertyEditor
</script>
