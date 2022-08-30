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
            v-if="choices.length === 0"
            class="mt-2 mb-2 text-danger">
            {{ trans('flow-builder.enter-at-least-one-choice-above') }}
          </div>
          <template v-else>
            <div>
              {{ trans('flow-builder.enter-value-for-choices-for-selected-property') }}
            </div>
            <div
              v-for="{prompt: choicePrompt, name: choiceName} in choices"
              :key="choicePrompt"
              class="mt-2">
              <label>{{ trans('flow-builder.choice') }}: {{ choiceName }}</label>
              <input
                v-if="isTextProperty"
                :value="getChoiceValue(choicePrompt)"
                type="text"
                class="form-control"
                :placeholder="trans('flow-builder.enter-value')"
                @input="setChoiceValue($event.target.value, choicePrompt)">
              <input
                v-if="isNumberProperty"
                :value="getChoiceValue(choicePrompt)"
                type="number"
                class="form-control"
                :placeholder="trans('flow-builder.enter-value')"
                @input="setChoiceValue(Number($event.target.value), choicePrompt)">
            </div>
          </template>
        </div>
      </template>
    </generic-contact-property-editor>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
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

    choices() {
      return this.block.config.choices
    },
  },

  methods: {
    ...mapMutations('flow', [
      'block_updateVendorMetadataByPath',
      'block_removeVendorMetadataByPath',
      'block_updateConfigByPath',
    ]),
    ...mapActions('flow', [
      'block_resetContactPropertyMetadata',
    ]),

    getChoiceValue(choicePrompt) {
      return this.block.vendor_metadata?.floip?.ui_metadata?.set_contact_property?.property_value_mapping?.[choicePrompt]
    },

    setChoiceValue(choiceValue, choicePrompt) {
      this.block_updateVendorMetadataByPath({
        blockId: this.block.uuid,
        path: `floip.ui_metadata.set_contact_property.property_value_mapping.${choicePrompt}`,
        value: choiceValue,
      })

      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'set_contact_property[0].property_value',
        value: choicesToExpression(
          this.block.config.choices,
          this.block.vendor_metadata?.floip?.ui_metadata?.set_contact_property?.property_value_mapping ?? {},
        ),
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
      this.block_resetContactPropertyMetadata({blockId: this.block.uuid})
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