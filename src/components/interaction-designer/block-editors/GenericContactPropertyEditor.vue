<template>
  <!--Contact property editor for all block types-->
  <div
    class="generic-contact-property-editor"
    data-cy="generic-contact-property--editor">
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
        data-cy="set-contact-property--checkbox"
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
        <div
          class="block-contact-property-key"
          data-cy="contact-property--selector">
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
      <template v-if="flowSelectedContactPropertyField !== null && !forceUsingBlockValue">
        <label>{{ 'flow-builder.value' | trans }}</label>
        <div
          v-if="isBlockInteractive"
          class="form-group">
          <div
            v-if="!disableExpressionInput"
            class="custom-control custom-radio">
            <input
              id="setProp"
              v-model="propertyValueAction"
              type="radio"
              name="contactPropAction"
              :value="PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE"
              data-cy="set-contact-property--from-current-block-response"
              class="custom-control-input">
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
              v-model="propertyValueAction"
              type="radio"
              name="contactPropAction"
              :value="PROPERTY_VALUE_ACTION.OPEN_EXPRESSION"
              data-cy="set-contact-property--open-expression"
              class="custom-control-input">
            <label
              class="custom-control-label font-weight-normal"
              for="clearProp">
              {{ 'flow-builder.expression' | trans }}
            </label>
          </div>
        </div>

        <template v-if="shouldUseOpenExpression">
          <validation-message :message-key="`block/${block.uuid}/config/set_contact_property/0/property_value`">
            <template #input-control="{ isValid }">
              <expression-input
                class="mb-1"
                :label="''"
                :placeholder="'flow-builder.enter-expression' | trans"
                :current-expression="propertyValue"
                :valid-state="isValid"
                data-cy="contact-property--expression-input"
                @commitExpressionChange="updateFirstContactPropertyValue" />
            </template>
          </validation-message>
          <div class="small">
            {{ trans('flow-builder.hint-to-set-contact-prop-by-expression') }}
          </div>
        </template>
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
  @Prop({default: false}) readonly forceUsingBlockValue!: boolean

  PROPERTY_VALUE_ACTION = {
    OPEN_EXPRESSION: 'openExpression',
    FROM_CURRENT_BLOCK_RESPONSE: 'fromCurrentBlockResponse',
  }

  created(): void {
    if (this.propertyValue === undefined) {
      // default setting
      if (this.isBlockInteractive) {
        // interactive blocks will have `Entry from this block` option by default
        this.propertyValue = BLOCK_RESPONSE_EXPRESSION
      } else {
        // non interactive blocks will have `Expression` option by default
        this.propertyValue = EMPTY_STRING_EXPRESSION
      }
    }
  }

  get isBlockInteractive(): boolean {
    return isBlockInteractive(this.block)
  }

  get shouldSetContactProperty(): boolean {
    return has(this.block.config, 'set_contact_property')
  }

  set shouldSetContactProperty(value: boolean) {
    if (value) {
      let propertyValue

      if (this.forceUsingBlockValue) {
        propertyValue = BLOCK_RESPONSE_EXPRESSION
      } else {
        propertyValue = this.shouldUseOpenExpression
          ? EMPTY_STRING_EXPRESSION
          : this.propertyValue ?? ''
      }

      this.block_setContactPropertyOnIndex({
        blockId: this.block.uuid,
        index: 0,
        propertyKey: this.propertyKey ?? '',
        propertyValue,
      })
    } else {
      this.block_removeConfigByKey({blockId: this.block.uuid, key: 'set_contact_property'})
    }
  }

  get propertyValueAction(): string {
    const isInteractive = this.isBlockInteractive
    const hasNoExpressionInput = this.disableExpressionInput || this.propertyValue === BLOCK_RESPONSE_EXPRESSION

    if ((isInteractive && hasNoExpressionInput) || this.forceUsingBlockValue) {
      return this.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE
    } else {
      return this.PROPERTY_VALUE_ACTION.OPEN_EXPRESSION
    }
  }

  set propertyValueAction(value: string) {
    if (value === this.PROPERTY_VALUE_ACTION.FROM_CURRENT_BLOCK_RESPONSE || this.forceUsingBlockValue) {
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

  get propertyKey(): string | null {
    return this.block.config.set_contact_property?.[0].property_key ?? null
  }

  get propertyValue(): string | null {
    return this.block.config.set_contact_property?.[0].property_value ?? null
  }

  set propertyValue(value: string | null) {
    this.block_setContactPropertyValueOnIndex({
      blockId: this.block.uuid,
      // Consider the 1st element only
      index: 0,
      propertyValue: value ?? '',
    })
  }

  get flowSelectedContactPropertyField(): IContactPropertyOption | null {
    const selectedOption = find(
      this.subscriberPropertyFields,
      (option: IContactPropertyOption) => option.name === this.propertyKey,
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
      if (this.propertyValue === '' || this.forceUsingBlockValue) {
        // users choose to set the contact prop from "expression" value
        shouldDisable = true
      } else {
        shouldDisable = this.subscriberPropertyFieldDataTypesMapping[field.data_type].includes(this.block.type)
      }

      return {...field, $isDisabled: !shouldDisable}
    })
  }

  toggleSetContactProperty(): void {
    this.shouldSetContactProperty = !this.shouldSetContactProperty
    this.$emit('toggleSetContactProperty', this.shouldSetContactProperty)
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
