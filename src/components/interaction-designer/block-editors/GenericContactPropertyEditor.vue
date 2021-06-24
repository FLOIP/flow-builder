<template>
  <!--Contact property editor for all block types-->
  <div class="generic-contact-property-editor">
    <label>{{ 'flow-builder.contact-properties-label' | trans }}</label>
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
        {{ 'flow-builder.set-contact-properties' | trans }}
      </label>
    </div>

    <div
      v-if="shouldSetContactProperty"
      class="form-group">
      <!--Contact property fields-->
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
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/set_contact_property/property_value`">
        <expression-editor
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

const NULL_STRING_EXPRESSION = '@(null)'
const EMPTY_STRING_EXPRESSION = ''

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

  created() {
    this.shouldSetContactProperty = has(this.block.config, 'set_contact_property')
  }

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
          property_value: '',
        } as ISetContactPropertyBlockConfig,
      })
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
  @flowVuexNamespace.Mutation block_removeConfigByKey!: ({blockId, key}: { blockId: string, key: string}) => void
}

export default GenericContactPropertyEditor
</script>
