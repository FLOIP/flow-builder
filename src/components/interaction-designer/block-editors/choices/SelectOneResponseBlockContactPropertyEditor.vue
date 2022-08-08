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
            <div>
              {{ trans('flow-builder.enter-value-for-choices-for-selected-property') }}
            </div>
            <div
              v-for="choiceKey in choiceKeys"
              :key="choiceKey"
              class="mt-2">
              <label>{{ trans('flow-builder.choice') }}: {{ choiceKey }}</label>
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

<script>
import {mapGetters, mapMutations} from 'vuex'
import VueMultiselect from 'vue-multiselect'
import {find} from 'lodash'
import {lang} from '@/lib/filters/lang'
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

    contactPropertyName() {
      return this.block.config.set_contact_property?.[0].property_key
    },

    contactProperty() {
      return find(this.subscriberPropertyFields, contactProperty => contactProperty.name === this.contactPropertyName) ?? null
    },

    isTextProperty() {
      return this.contactProperty?.data_type === 'text'
    },

    isNumberProperty() {
      return this.contactProperty?.data_type === 'number'
    },

    choiceKeys() {
      return this.block.config.choices.map(choice => choice.name)
    },
  },

  methods: {
    ...mapMutations('flow', [
      'block_updateVendorMetadataByPath',
      'block_removeVendorMetadataByPath',
      'block_updateConfigByPath',
    ]),

    getChoiceValue(choiceKey) {
      return this.block.vendor_metadata?.floip?.ui_metadata?.set_contact_property?.property_value_mapping?.[choiceKey]
    },

    setChoiceValue(value, choiceKey) {
      this.block_updateVendorMetadataByPath({
        blockId: this.block.uuid,
        path: `floip.ui_metadata.set_contact_property.property_value_mapping.${choiceKey}`,
        value,
      })

      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'set_contact_property[0].property_value',
        value: choicesToExpression(this.block.vendor_metadata?.floip?.ui_metadata?.set_contact_property?.property_value_mapping),
      })
    },

    onSetContactPropertyToggle(shouldSetContactProperty) {
      if (shouldSetContactProperty) {
        this.resetMapping()
      } else {
        this.removeMapping()
      }
    },

    onShouldUseCurrentBlockResponseUpdate(shouldUseCurrentBlockResponse) {
      if (shouldUseCurrentBlockResponse) {
        this.resetMapping()
      } else {
        this.removeMapping()
      }
    },

    resetMapping() {
      this.block_updateVendorMetadataByPath({
        blockId: this.block.uuid,
        path: 'floip.ui_metadata.set_contact_property.property_value_mapping',
        value: {},
      })
    },

    removeMapping() {
      this.block_removeVendorMetadataByPath({
        blockId: this.block.uuid,
        path: 'floip.ui_metadata.set_contact_property',
      })
    },
  },
}

export default SelectOneResponseBlockContactPropertyEditor
</script>
