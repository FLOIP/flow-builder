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
        :message-key="`block/${block.uuid}/config/set_contact_property/0/property_key`">
        <div class="block-contact-property-key">
          <div v-if="hasSubscriberPropertyFields">
            <label for="contact-property-selector">{{ trans('flow-builder.property') }}</label>
            <vue-multiselect
              id="contact-property-selector"
              v-model="flowSelectedContactPropertyField"
              track-by="id"
              label="display_label"
              :placeholder="'flow-builder.select-a-property' | trans"
              :options="subscriberPropertyFieldsForSelector"
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
            @input="updateFirstContactPropertyKey" />
        </div>
      </validation-message>

      <!--Contact property value editor with actions-->
      <template v-if="flowSelectedContactPropertyField !== null">
        <label>{{ 'flow-builder.value' | trans }}</label>
        <div
          v-if="isBlockInteractive(block)"
          class="form-group">
          <div
            v-if="!disableExpressionInput"
            class="custom-control custom-radio">
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
          <slot
            v-if="propertyValueAction === PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE"
            name="entry-from-this-block" />
          <div
            v-if="!disableExpressionInput"
            class="custom-control custom-radio">
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
            class="mb-1"
            :label="''"
            :placeholder="'flow-builder.enter-expression' | trans"
            :current-expression="propertyValue"
            :valid-state="isValid"
            @commitExpressionChange="updateFirstContactPropertyValue" />
          <div class="small">
            {{ trans('flow-builder.hint-to-set-contact-prop-by-expression') }}
          </div>
        </validation-message>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {IBlock} from '@floip/flow-runner'
import {Component, Prop} from 'vue-property-decorator'
import {Getter, namespace} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {find, has, isEmpty, map} from 'lodash'
import {mixins} from 'vue-class-component'
import {isBlockInteractive} from '@/store/flow/block'
import {ConfigFieldType} from '@/store/flow/utils/vuexBlockAndFlowHelpers'
import VueMultiselect from 'vue-multiselect'
import {IContactPropertyOption, IContactPropertyOptionForUISelector} from '@/store/flow/block-types/Core_SetContactPropertyStore.model'

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
  @Prop({default: false}) readonly disableExpressionInput!: boolean

  shouldSetContactProperty = false
  PROPERTY_VALUE_ACTION = {
    OPEN_EXPRESSION: 'openExpression',
    FROM_CURRENT_BLOCK_RESPONSE: 'fromCurrentBlockResponse',
  }
  propertyValueAction = ''
  // null will help us to enforce validation error on empty value
  propertyKey?: string = null
  propertyValue?: string = ''

  created(): void {
    this.shouldSetContactProperty = has(this.block.config, 'set_contact_property')
    this.propertyKey = this.firstContactPropertyKey
    this.propertyValue = this.firstContactPropertyValue
    if (this.propertyValue === undefined) {
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
    this.$emit('toggleSetContactProperty', !this.shouldSetContactProperty)

    this.shouldSetContactProperty = !this.shouldSetContactProperty
    if (!this.shouldSetContactProperty) {
      this.block_removeConfigByKey({blockId: this.block.uuid, key: 'set_contact_property'})
    } else {
      this.block_setContactPropertyOnIndex({
        blockId: this.block.uuid,
        index: 0,
        propertyKey: this.propertyKey,
        propertyValue: this.shouldUseOpenExpression ? EMPTY_STRING_EXPRESSION : this.propertyValue,
      })
    }
  }

  // for radio buttons ######################
  initPropertyValueAction(): void {
    if (this.disableExpressionInput || this.propertyValue === BLOCK_RESPONSE_EXPRESSION) {
      this.propertyValueAction = this.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE
    } else {
      this.propertyValueAction = this.PROPERTY_VALUE_ACTION.OPEN_EXPRESSION
    }
  }

  updatePropertyValueAction({target: {value}}: {target: {value: string}}): void {
    this.propertyValueAction = value
    if (value === this.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE) {
      this.$emit('updateShouldUseCurrentBlockResponse', true)
      this.updateFirstContactPropertyValue(BLOCK_RESPONSE_EXPRESSION)
    } else {
      this.$emit('updateShouldUseCurrentBlockResponse', false)
      this.updateFirstContactPropertyValue(EMPTY_STRING_EXPRESSION)
    }
  }

  get shouldUseOpenExpression(): boolean {
    return this.propertyValueAction === this.PROPERTY_VALUE_ACTION.OPEN_EXPRESSION
  }

  // for input fields ######################
  updateFirstContactPropertyKey(value: string): void {
    this.propertyKey = value
    this.block_setContactPropertyKeyOnIndex({
      blockId: this.block.uuid,
      // Consider the 1st element only
      index: 0,
      propertyKey: value,
    })
  }

  updateFirstContactPropertyValue(value: string): void {
    this.propertyValue = value
    this.block_setContactPropertyValueOnIndex({
      blockId: this.block.uuid,
      // Consider the 1st element only
      index: 0,
      propertyValue: value,
    })
  }

  get firstContactPropertyKey(): string | null {
    return this.block.config.set_contact_property?.[0].property_key ?? null
  }

  get firstContactPropertyValue(): string | null {
    return this.block.config.set_contact_property?.[0].property_value ?? null
  }

  get flowSelectedContactPropertyField(): IContactPropertyOption | null {
    const selectedOption = find(
      this.subscriberPropertyFields,
      (option: IContactPropertyOption) => option.name === this.firstContactPropertyKey,
    )
    return selectedOption ?? null
  }

  set flowSelectedContactPropertyField(option: IContactPropertyOption | null) {
    if (this.flowSelectedContactPropertyField?.data_type !== option?.data_type) {
      this.$emit('changeContactPropertyType')
    }
    this.updateFirstContactPropertyKey(option?.name as string)
  }

  get hasSubscriberPropertyFields(): boolean {
    return !isEmpty(this.subscriberPropertyFields)
  }

  get subscriberPropertyFieldsForSelector(): IContactPropertyOptionForUISelector[] {
    return map(this.subscriberPropertyFields, (field: IContactPropertyOption) => {
      let shouldDisable
      if (this.firstContactPropertyValue === '') {
        // users choose to set the contact prop from "expression" value
        shouldDisable = true
      } else {
        shouldDisable = this.subscriberPropertyFieldDataTypesMapping[field.data_type].includes(this.block.type)
      }

      return {...field, $isDisabled: !shouldDisable}
    })
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value: ConfigFieldType }
  ) => void
  @flowVuexNamespace.Mutation block_updateVendorMetadataByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value: ConfigFieldType }
  ) => void
  @flowVuexNamespace.Mutation block_removeConfigByKey!: ({blockId, key}: { blockId: IBlock['uuid'], key: string}) => void

  @flowVuexNamespace.Action block_setContactPropertyKeyOnIndex!: (
    {index, blockId, propertyKey}: { index: number, blockId: string, propertyKey: string },
  ) => void
  @flowVuexNamespace.Action block_setContactPropertyValueOnIndex!: (
    {index, blockId, propertyValue}: { index: number, blockId: string, propertyValue: string },
  ) => void
  @flowVuexNamespace.Action block_setContactPropertyOnIndex!: (
    {blockId, index, propertyKey, propertyValue}: { blockId: string, index: number, propertyKey?: string, propertyValue?: string},
  ) => void

  @Getter subscriberPropertyFields!: IContactPropertyOption[]
  @Getter subscriberPropertyFieldDataTypesMapping!: Record<string, string[]>
}

export default GenericContactPropertyEditor
</script>
