<template>
  <!--Contact property editor for all block types-->
  <div class="generic-contact-property-editor">
    <label>{{ 'flow-builder.contact-properties' | trans }}</label>
    <div class="custom-control custom-checkbox">
      <input
        id="setContactProperty"
        :value="shouldSetContactProperty"
        :checked="shouldSetContactProperty"
        type="checkbox"
        name="setContactProperty"
        class="custom-control-input"
        @change="toggleSetContactProperty" />
      <label
        class="custom-control-label font-weight-normal"
        for="setContactProperty">
        {{ 'flow-builder.set-contact-property-with-response' | trans }}
      </label>
    </div>

    <!--Contact property fields-->
    <div
      v-if="shouldSetContactProperty"
      class="form-group">
      <validation-message
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/set_contact_property/property_key`">
        <div class="block-contact-property-key">
          <text-editor
            :value="propertyKey"
            :label="'flow-builder.property' | trans"
            :placeholder="'flow-builder.enter-contact-property-label' | trans"
            :valid-state="isValid"
            @input="updatePropertyKey" />
        </div>
      </validation-message>

      <!--Contact property value editor with actions-->
      <label>{{ 'flow-builder.value' | trans }}</label>
      <div class="form-group">
        <div class="custom-control custom-radio">
          <input
            id="setProp"
            @change="updatePropertyValueAction"
            type="radio"
            name="contactPropAction"
            :checked="propertyValueAction === PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE"
            :value="PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE"
            class="custom-control-input">
          <label
            class="custom-control-label font-weight-normal"
            for="setProp">
            {{ 'flow-builder.entry-from-this-block' | trans }}
          </label>
        </div>
        <div class="custom-control custom-radio">
          <input
            id="clearProp"
            @change="updatePropertyValueAction"
            type="radio"
            name="contactPropAction"
            :checked="propertyValueAction === PROPERTY_VALUE_ACTION.OPEN_EXPRESSION"
            :value="PROPERTY_VALUE_ACTION.OPEN_EXPRESSION"
            class="custom-control-input">
          <label
            class="custom-control-label font-weight-normal"
            for="clearProp">
            {{ 'flow-builder.expression' | trans }}
          </label>
        </div>
      </div>

      <validation-message
        v-if="shouldUseOpenExpression"
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/set_contact_property/property_value`">
        <expression-editor
          :label="'flow-builder.contact-property-expression' | trans"
          :placeholder="'flow-builder.enter-expression' | trans"
          :current-expression="propertyValue"
          :valid-state="isValid"
          @commitExpressionChange="updatePropertyValue" />
      </validation-message>
    </div>
  </div>
</template>

<script lang="ts">
import {IBlock, ISetContactPropertyBlockConfig} from '@floip/flow-runner'
import {Component, Prop} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {get, has, map} from 'lodash'
import {mixins} from 'vue-class-component'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import ExpressionEditor from '@/components/common/ExpressionEditor.vue'
import TextEditor from '@/components/common/TextEditor.vue'

const flowVuexNamespace = namespace('flow')

const EMPTY_STRING_EXPRESSION = ''
const BLOCK_RESPONSE_EXPRESSION = '@block.value'

@Component({
  components: {
    TextEditor,
    ExpressionEditor,
    ValidationMessage,
  },
})
class GenericContactPropertyEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  shouldSetContactProperty = false
  PROPERTY_VALUE_ACTION = {
    OPEN_EXPRESSION: 'openExpression',
    FROM_CURRENT_BLOCK_RESPONSE: 'fromCurrentBlockResponse',
  }
  propertyValueAction = ''
  propertyKey = ''
  propertyValue = ''

  created() {
    this.shouldSetContactProperty = has(this.block.config, 'set_contact_property')
    this.propertyKey = get(this.block.config, 'set_contact_property.property_key', '')
    this.propertyValue = get(this.block.config, 'set_contact_property.property_value', EMPTY_STRING_EXPRESSION)
    this.initPropertyValueAction()
  }

  // for checkbox ######################
  toggleSetContactProperty() {
    this.shouldSetContactProperty = !this.shouldSetContactProperty
    if (!this.shouldSetContactProperty) {
      this.block_removeConfigByKey({blockId: this.block.uuid, key: 'set_contact_property'})
    } else {
      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'set_contact_property',
        value: {
          property_key: '',
          property_value: this.shouldUseOpenExpression ? EMPTY_STRING_EXPRESSION : BLOCK_RESPONSE_EXPRESSION,
        } as ISetContactPropertyBlockConfig,
      })
    }
  }

  // for radio buttons ######################
  initPropertyValueAction(): string {
    if (this.propertyValue === BLOCK_RESPONSE_EXPRESSION) {
      this.propertyValueAction = this.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE
    } else {
      this.propertyValueAction = this.PROPERTY_VALUE_ACTION.OPEN_EXPRESSION
    }
  }

  updatePropertyValueAction({target: {value}}) {
    this.propertyValueAction = value
    if (value === this.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE) {
      this.updatePropertyValue(BLOCK_RESPONSE_EXPRESSION)
    } else {
      this.updatePropertyValue(EMPTY_STRING_EXPRESSION)
    }
  }

  get shouldUseOpenExpression() {
    return this.propertyValueAction === this.PROPERTY_VALUE_ACTION.OPEN_EXPRESSION
  }

  // for input fields ######################
  updatePropertyKey(value: string): void {
    this.propertyKey = value
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'set_contact_property.property_key',
      value,
    })
  }

  updatePropertyValue(value: string): void {
    this.propertyValue = value
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
  @flowVuexNamespace.Mutation block_removeConfigByKey!: ({blockId, key}: { blockId: string, key: string}) => void
}

export default GenericContactPropertyEditor
</script>
