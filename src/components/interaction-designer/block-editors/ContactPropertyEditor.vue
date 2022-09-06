<template>
  <div class="contact-property-editor">
    <div class="form-group">
      <label class="text-primary">{{ trans('flow-builder.action-label') }}</label>
      <p>{{ trans('flow-builder.contact-property-action-hint') }}</p>
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
            {{ trans('flow-builder.set-contact-property') }}
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
            {{ trans('flow-builder.clear-contact-property') }}
          </label>
        </div>
      </div>

      <validation-message
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/set_contact_property/x/property_key`">
        <div class="block-contact-property-key">
          <text-editor
            v-model="propertyKey"
            :label="trans('flow-builder.contact-property-label')"
            :label-class="'font-weight-bold'"
            :placeholder="trans('flow-builder.enter-contact-property-label')"
            :valid-state="isValid" />
        </div>
      </validation-message>

      <validation-message
        v-if="propertyAction === PROPERTY_ACTION.SET"
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/set_contact_property/x/property_value`">
        <expression-input
          :label="trans('flow-builder.value-expression')"
          :placeholder="trans('flow-builder.enter-expression')"
          :label-class="'font-weight-bold'"
          :current-expression="propertyValue"
          :valid-state="isValid"
          @commitExpressionChange="updatePropertyValue" />
      </validation-message>
    </div>
  </div>
</template>

<script lang="ts">
import {IBlock, SetContactProperty} from '@floip/flow-runner'
import {Prop} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {Lang} from '@/lib/filters/lang'
import {first} from 'lodash'
import {mixins, Options} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')

const NULL_STRING_EXPRESSION = '@(null)'
const EMPTY_STRING_EXPRESSION = ''

@Options({})
export class ContactPropertyEditor extends mixins(Lang) {
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

  @flowVuexNamespace.Action block_setContactPropertyKeyOnIndex!: (
    {index, blockId, propertyKey}: { index: number, blockId: string, propertyKey?: string },
  ) => void

  get firstProperty(): SetContactProperty | undefined {
    return first(this.block.config.set_contact_property)
  }

  get propertyKey(): string | undefined {
    return this.firstProperty?.property_key
  }

  get propertyValue(): string {
    return this.firstProperty?.property_value ?? EMPTY_STRING_EXPRESSION
  }

  updatePropertyValue(value: string): void {
    this.block_setContactPropertyValueOnIndex({
      blockId: this.block.uuid,
      // Consider the 1st element only
      index: 0,
      propertyValue: value,
    })
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value: string }
  ) => void

  set propertyKey(value: string | undefined) {
    this.block_setContactPropertyKeyOnIndex({
      blockId: this.block.uuid,
      // Consider the 1st element only
      index: 0,
      propertyKey: value === '' || value === undefined ? undefined : value,
    })
  }
  @flowVuexNamespace.Action block_setContactPropertyValueOnIndex!: (
    {index, blockId, propertyValue}: { index: number, blockId: string, propertyValue: string },
  ) => void
}

export default ContactPropertyEditor
</script>
