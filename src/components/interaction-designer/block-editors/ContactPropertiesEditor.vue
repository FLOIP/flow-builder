<template>
  <!--Contact properties editor for each block-->
  <div class="contact-properties-editor">
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

      <div v-if="shouldSetContactProperty">
        <div
          v-for="(exit, index) in block.exits"
          :key="index">
          <validation-message
            #input-control="{ isValid }"
            :message-key="`block/${block.uuid}/config/set_contact_property/${index}/property_key`">
            <div class="block-contact-property-key">
              <text-editor
                :value="block.config.set_contact_property[index].property_key"
                :label="'flow-builder.contact-property-label' | trans"
                :placeholder="'flow-builder.enter-contact-property-label' | trans"
                :valid-state="isValid"
                @input="(value) => updatePropertyKey(index, value)"/>
            </div>
          </validation-message>

          <validation-message
            #input-control="{ isValid }"
            :message-key="`block/${block.uuid}/config/set_contact_property/${index}/property_value`">
            <expression-editor
              :label="'flow-builder.contact-property-expression' | trans"
              :placeholder="'flow-builder.edit-expression' | trans"
              :current-expression="block.config.set_contact_property[index].property_value"
              :valid-state="isValid"
              @commitExpressionChange="(value) => updatePropertyValue(index, value)" />
          </validation-message>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock, ISetContactPropertyBlockConfig} from '@floip/flow-runner'
import {map, has} from 'lodash'
import {namespace} from 'vuex-class'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import TextEditor from '@/components/common/TextEditor.vue'
import ExpressionEditor from '@/components/common/ExpressionEditor.vue'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    TextEditor,
    ExpressionEditor,
    ValidationMessage,
  },
})
class ContactPropertiesEditor extends mixins(Lang) {
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
      this.initConfigForContactProperty()
    }
  }

  initConfigForContactProperty() {
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'set_contact_property',
      value: map(this.block.exits, (_exit) => ({
        property_key: '',
        property_value: '',
      } as ISetContactPropertyBlockConfig)),
    })
  }

  updatePropertyKey(index, value: string): void {
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: `set_contact_property.[${index}].property_key`,
      value,
    })
  }

  updatePropertyValue(index, value: string): void {
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: `set_contact_property.[${index}].property_value`,
      value,
    })
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value: string | object }
  ) => void
  @flowVuexNamespace.Mutation block_removeConfigByKey!: ({blockId, key}: { blockId: string, key: string}) => void
}
export default ContactPropertiesEditor
</script>
