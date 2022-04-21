<template>
  <!--Contact property editor for all block types-->
  <div class="generic-contact-property-editor">
    <hr>
    <label class="text-primary">{{ 'flow-builder.contact-properties' | trans }}</label>
    <div class="custom-control custom-checkbox">
      <input
        id="setContactProperty"
        :value="shouldSetContactProperty"
        :checked="shouldSetContactProperty"
        type="checkbox"
        name="setContactProperty"
        class="custom-control-input"
        @change="toggleSetContactProperty">
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
          <div v-if="flowSelectedContactPropertyField">
            <label for="contact-property-selector">{{ trans('flow-builder.property') }}</label>
            <vue-multiselect
              id="contact-property-selector"
              v-model="flowSelectedContactPropertyField"
              track-by="id"
              label="displayLabel"
              :placeholder="'flow-builder.select-a-property' | trans"
              :options="availableContactPropertyFields"
              :multiple="false"
              :show-labels="false"
              :searchable="true" />
          </div>
          <text-editor
            v-else
            :value="propertyKey"
            :label="'flow-builder.property' | trans"
            :label-class="''"
            :placeholder="'flow-builder.enter-contact-property-label' | trans"
            :valid-state="isValid"
            @input="updatePropertyKey" />
        </div>
      </validation-message>

      <!--Contact property value editor with actions-->
      <label>{{ 'flow-builder.value' | trans }}</label>
      <div
        v-if="isBlockInteractive(block)"
        class="form-group">
        <div class="custom-control custom-radio">
          <input
            id="setProp"
            type="radio"
            name="contactPropAction"
            :checked="propertyValueAction === PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE"
            :value="PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE"
            class="custom-control-input"
            @change="updatePropertyValueAction">
          <label
            class="custom-control-label font-weight-normal"
            for="setProp">
            {{ 'flow-builder.entry-from-this-block' | trans }}
          </label>
        </div>
        <div class="custom-control custom-radio">
          <input
            id="clearProp"
            type="radio"
            name="contactPropAction"
            :checked="propertyValueAction === PROPERTY_VALUE_ACTION.OPEN_EXPRESSION"
            :value="PROPERTY_VALUE_ACTION.OPEN_EXPRESSION"
            class="custom-control-input"
            @change="updatePropertyValueAction">
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
        <expression-input
          :label="''"
          :placeholder="'flow-builder.enter-expression' | trans"
          :current-expression="propertyValue"
          :valid-state="isValid"
          @commitExpressionChange="updatePropertyValue" />
      </validation-message>
    </div>
  </div>
</template>

<script lang="ts">
import {IBlock, IBlockConfig} from '@floip/flow-runner'
import {Component, Prop} from 'vue-property-decorator'
import {namespace, State} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {find, get, has} from 'lodash'
import {mixins} from 'vue-class-component'
import {isBlockInteractive} from '@/store/flow/block.ts'
import VueMultiselect from 'vue-multiselect'
import {IContactPropertyOption} from '@/store/flow/block-types/Core_SetContactPropertyStore'

const flowVuexNamespace = namespace('flow')

const EMPTY_STRING_EXPRESSION = ''
const BLOCK_RESPONSE_EXPRESSION = '@block.value'

@Component({
  components: {
    VueMultiselect,
  },
})
export class GenericContactPropertyEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  shouldSetContactProperty = false
  PROPERTY_VALUE_ACTION = {
    OPEN_EXPRESSION: 'openExpression',
    FROM_CURRENT_BLOCK_RESPONSE: 'fromCurrentBlockResponse',
  }
  propertyValueAction = ''
  propertyKey = ''
  propertyValue: string | null = ''

  created(): void {
    this.shouldSetContactProperty = has(this.block.config, 'set_contact_property')
    this.propertyKey = get(this.block.config.set_contact_property, 'property_key', '')
    this.propertyValue = get(this.block.config.set_contact_property, 'property_value', null)
    if (this.propertyValue === null) {
      // default setting
      if (this.isBlockInteractive(this.block)) {
        // interactive blocks will have `Entry from this block` option by default
        this.propertyValue = BLOCK_RESPONSE_EXPRESSION
      } else {
        // non interactive blocks will have `Expression` option by default
        this.propertyValue = EMPTY_STRING_EXPRESSION
      }
    }
    this.initPropertyValueAction()
  }

  isBlockInteractive(block: IBlock): boolean {
    return isBlockInteractive(block)
  }

  // for checkbox ######################
  toggleSetContactProperty(): void {
    this.shouldSetContactProperty = !this.shouldSetContactProperty
    if (!this.shouldSetContactProperty) {
      this.block_removeConfigByKey({blockId: this.block.uuid, key: 'set_contact_property'})
    } else {
      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'set_contact_property',
        value: {
          property_key: this.propertyKey,
          property_value: this.shouldUseOpenExpression ? EMPTY_STRING_EXPRESSION : this.propertyValue,
        } as IBlockConfig,
      })
    }
  }

  // for radio buttons ######################
  initPropertyValueAction(): void {
    if (this.propertyValue === BLOCK_RESPONSE_EXPRESSION) {
      this.propertyValueAction = this.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE
    } else {
      this.propertyValueAction = this.PROPERTY_VALUE_ACTION.OPEN_EXPRESSION
    }
  }

  updatePropertyValueAction({target: {value}}: {target: {value: string}}): void {
    this.propertyValueAction = value
    if (value === this.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE) {
      this.updatePropertyValue(BLOCK_RESPONSE_EXPRESSION)
    } else {
      this.updatePropertyValue(EMPTY_STRING_EXPRESSION)
    }
  }

  get shouldUseOpenExpression(): boolean {
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

  get availableContactPropertyFields(): IContactPropertyOption[] {
    return this.ui.subscriberPropertyFields
  }

  get flowSelectedContactPropertyField(): IContactPropertyOption {
    const selectedOption = find(
      this.availableContactPropertyFields,
      (option: IContactPropertyOption) => option.name === this.block.config.set_contact_property?.property_key,
    )

    return selectedOption || {} as IContactPropertyOption
  }

  set flowSelectedContactPropertyField(option: IContactPropertyOption) {
    this.updatePropertyKey(option.name)
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value: string | object }
  ) => void
  @flowVuexNamespace.Mutation block_updateVendorMetadataByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value: string }
  ) => void
  @flowVuexNamespace.Mutation block_removeConfigByKey!: ({blockId, key}: { blockId: string, key: string}) => void

  @State(({trees: {ui}}) => ui) ui!: any
}

export default GenericContactPropertyEditor
</script>
