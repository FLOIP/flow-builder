<template>
  <div class="select-one-response-block-contact-property-editor">
    <generic-contact-property-editor
      :block="block"
      @toggleSetContactProperty="onSetContactPropertyToggle"
      @changeContactPropertyType="resetMapping"
      @updateShouldUseCurrentBlockResponse="onShouldUseCurrentBlockResponseUpdate">
      <template slot="entry-from-this-block">
        <div class="mt-2 mb-2">
          <div
            v-if="choiceKeys.length === 0"
            class="mt-2 mb-2 text-danger">
            {{ trans('flow-builder.enter-at-least-one-choice-above') }}
          </div>
          <template v-else>
            <div v-if="isMultipleChoiceProperty">
              {{ trans('flow-builder.select-value-for-choices-for-selected-property') }}
            </div>
            <div v-else>
              {{ trans('flow-builder.enter-value-for-choices-for-selected-property') }}
            </div>

            <div
              v-for="choiceKey in choiceKeys"
              :key="choiceKey"
              class="mt-2">
              <label>{{ trans('flow-builder.choice') }}: {{ choiceKey }}</label>
              <vue-multiselect
                v-if="isMultipleChoiceProperty"
                :value="getChoiceValueOption(choiceKey)"
                :options="choiceValueOptions"
                :show-labels="false"
                :placeholder="trans('flow-builder.select-a-value')"
                track-by="value"
                label="description"
                @input="setChoiceValueOption($event, choiceKey)" />
              <input
                v-if="isTextProperty"
                :value="getChoiceValue(choiceKey)"
                type="text"
                class="form-control"
                :placeholder="trans('flow-builder.enter-value')"
                @input="setChoiceValue($event.target.value, choiceKey)">
              <input
                v-if="isNumberProperty"
                :value="getChoiceValue(choiceKey)"
                type="number"
                class="form-control"
                :placeholder="trans('flow-builder.enter-value')"
                @input="setChoiceValue(Number($event.target.value), choiceKey)">
            </div>
          </template>
        </div>
      </template>
    </generic-contact-property-editor>
  </div>
</template>

<script lang="ts">
import {mapGetters, mapMutations} from 'vuex'
import VueMultiselect from 'vue-multiselect'
import {find} from 'lodash'
import {lang} from '@/lib/filters/lang'
import {IContactPropertyOption} from '@/store/flow/block-types'
import {IContactPropertyMultipleChoice} from '@/store/flow/block-types/Core_SetContactPropertyStore'
import {choicesToExpression} from './expressionTransformers'

export const SelectOneResponseBlockContactPropertyEditor = {
  components: {
    VueMultiselect,
  },

  mixins: [lang],

  props: {
    block: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters([
      'subscriberPropertyFields',
    ]),

    contactPropertyName(): string | undefined {
      return this.block.config.set_contact_property?.[0].property_key
    },

    contactProperty(): IContactPropertyOption | null {
      return find(this.subscriberPropertyFields, contactProperty => contactProperty.name === this.contactPropertyName) ?? null
    },

    isMultipleChoiceProperty(): boolean {
      return this.contactProperty?.data_type === 'multiple_choice'
    },

    isTextProperty(): boolean {
      return this.contactProperty?.data_type === 'text'
    },

    isNumberProperty(): boolean {
      return this.contactProperty?.data_type === 'number'
    },

    choiceKeys(): string[] {
      return this.block.config.choices.map(choice => choice.name)
    },

    choiceValueOptions(): IContactPropertyMultipleChoice[] {
      return this.contactProperty?.choices ?? []
    },
  },

  methods: {
    ...mapMutations('flow', [
      'block_updateVendorMetadataByPath',
      'block_removeVendorMetadataByPath',
      'block_updateConfigByPath',
    ]),

    getChoiceValue(choiceKey: string): string | number | undefined {
      return this.block.vendor_metadata?.floip?.ui_metadata?.set_contact_property[0].property_value_mapping?.[choiceKey]
    },

    getChoiceValueOption(choiceKey: string): IContactPropertyMultipleChoice | undefined {
      const choiceValue = this.getChoiceValue(choiceKey)
      return this.choiceValueOptions.find(option => option.value === choiceValue)
    },

    setChoiceValue(value: string | number, choiceKey: string): void {
      this.block_updateVendorMetadataByPath({
        blockId: this.block.uuid,
        path: `floip.ui_metadata.set_contact_property[0].property_value_mapping.${choiceKey}`,
        value,
      })

      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'set_contact_property[0].property_value',
        value: choicesToExpression(this.block.vendor_metadata?.floip?.ui_metadata?.set_contact_property[0].property_value_mapping),
      })
    },

    setChoiceValueOption(choiceValueOption: IContactPropertyMultipleChoice, choiceKey: string): void {
      this.setChoiceValue(choiceValueOption.value, choiceKey)
    },

    onSetContactPropertyToggle(shouldSetContactProperty: boolean): void {
      if (shouldSetContactProperty) {
        this.resetMapping()
      } else {
        this.removeMapping()
      }
    },

    onShouldUseCurrentBlockResponseUpdate(shouldUseCurrentBlockResponse: boolean): void {
      if (shouldUseCurrentBlockResponse) {
        this.resetMapping()
      } else {
        this.removeMapping()
      }
    },

    resetMapping(): void {
      this.block_updateVendorMetadataByPath({
        blockId: this.block.uuid,
        path: 'floip.ui_metadata.set_contact_property[0].property_value_mapping',
        value: {},
      })
    },

    removeMapping(): void {
      this.block_removeVendorMetadataByPath({
        blockId: this.block.uuid,
        path: 'floip.ui_metadata.set_contact_property',
      })
    },
  },
}

export default SelectOneResponseBlockContactPropertyEditor
</script>
