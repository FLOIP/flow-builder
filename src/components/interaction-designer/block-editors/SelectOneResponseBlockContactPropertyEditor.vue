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
import VueMultiselect from 'vue-multiselect'
import Component, {mixins} from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import Lang from '@/lib/filters/lang'
import {ISelectOneResponseBlock} from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock'
import {IContactPropertyOption} from '@/store/flow/block-types'
import {Getter, namespace} from 'vuex-class'
import {find} from 'lodash'
import {IContactPropertyMultipleChoice} from '@/store/flow/block-types/Core_SetContactPropertyStore'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    VueMultiselect,
  },
})
export class SelectOneResponseBlockContactPropertyEditor extends mixins(Lang) {
  @Prop() readonly block!: ISelectOneResponseBlock

  get contactPropertyName(): string | undefined {
    return this.block.config.set_contact_property?.[0].property_key
  }

  get contactProperty(): IContactPropertyOption | null {
    return find(this.subscriberPropertyFields, contactProperty => contactProperty.name === this.contactPropertyName) ?? null
  }

  get isMultipleChoiceProperty(): boolean {
    return this.contactProperty?.data_type === 'multiple_choice'
  }

  get isTextProperty(): boolean {
    return this.contactProperty?.data_type === 'text'
  }

  get isNumberProperty(): boolean {
    return this.contactProperty?.data_type === 'number'
  }

  get choiceKeys(): string[] {
    return this.block.config.choices.map(choice => choice.name)
  }

  get choiceValueOptions(): IContactPropertyMultipleChoice[] {
    return this.contactProperty?.choices ?? []
  }

  getChoiceValue(choiceKey: string): string | number | undefined {
    return this.block.vendor_metadata?.floip?.ui_metadata?.set_contact_property[0].property_value_mapping?.[choiceKey]
  }

  getChoiceValueOption(choiceKey: string): IContactPropertyMultipleChoice | undefined {
    const choiceValue = this.getChoiceValue(choiceKey)
    return this.choiceValueOptions.find(option => option.value === choiceValue)
  }

  setChoiceValue(value: string | number, choiceKey: string): void {
    this.block_updateVendorMetadataByPath({
      blockId: this.block.uuid,
      path: `floip.ui_metadata.set_contact_property[0].property_value_mapping.${choiceKey}`,
      value,
    })
  }

  setChoiceValueOption(choiceValueOption: IContactPropertyMultipleChoice, choiceKey: string): void {
    this.setChoiceValue(choiceValueOption.value, choiceKey)
  }

  onSetContactPropertyToggle(shouldSetContactProperty: boolean): void {
    if (shouldSetContactProperty) {
      this.resetMapping()
    } else {
      this.removeMapping()
    }
  }

  onShouldUseCurrentBlockResponseUpdate(shouldUseCurrentBlockResponse: boolean): void {
    if (shouldUseCurrentBlockResponse) {
      this.resetMapping()
    } else {
      this.removeMapping()
    }
  }

  resetMapping(): void {
    this.block_updateVendorMetadataByPath({
      blockId: this.block.uuid,
      path: 'floip.ui_metadata.set_contact_property[0].property_value_mapping',
      value: {},
    })
  }

  removeMapping(): void {
    this.block_removeVendorMetadataByPath({
      blockId: this.block.uuid,
      path: 'floip.ui_metadata.set_contact_property',
    })
  }

  @Getter subscriberPropertyFields!: IContactPropertyOption[]
  @flowVuexNamespace.Mutation block_updateVendorMetadataByPath!: (args: {blockId: string, path: string, value: object | string}) => void
  @flowVuexNamespace.Mutation block_removeVendorMetadataByPath!: (args: {blockId: string, path: string}) => void
}

export default SelectOneResponseBlockContactPropertyEditor
</script>
