<template>
  <div class="contact-property-editor">
    <div class="form-group">
      <label>{{'flow-builder.action-label' | trans}}</label>
      <p>{{'flow-builder.contact-property-action-hint' | trans}}</p>
      <div class="form-group">
        <div class="custom-control custom-radio">
          <input
            type="radio"
            id="setProp"
            name="contactPropAction"
            :value="PROPERTY_ACTION.SET"
            class="custom-control-input"
            :checked="propertyAction === PROPERTY_ACTION.SET"
            @change="updatePropertyAction($event)">
          <label class="custom-control-label font-weight-normal" for="setProp">
            {{'flow-builder.set-contact-property' | trans}}
          </label>
        </div>
        <div class="custom-control custom-radio">
          <input
            type="radio"
            id="clearProp"
            name="contactPropAction"
            :value="PROPERTY_ACTION.CLEAR"
            class="custom-control-input"
            :checked="propertyAction === PROPERTY_ACTION.CLEAR"
            @change="updatePropertyAction($event)">
          <label class="custom-control-label font-weight-normal" for="clearProp">
            {{'flow-builder.clear-contact-property' | trans}}
          </label>
        </div>
      </div>

      <validation-message
        :message-key="`block/${block.uuid}/config/set_contact_property/property_key`"
        #input-control="{ isValid }">
        <div class="block-contact-property-key">
          <text-editor
            v-model="propertyKey"
            :label="'flow-builder.contact-property-label' | trans"
            :placeholder="'flow-builder.enter-contact-property-label' | trans"
            :valid-state="isValid"/>
        </div>
      </validation-message>

      <validation-message
        :message-key="`block/${block.uuid}/config/set_contact_property/property_value`"
        #input-control="{ isValid }">
        <expression-editor
          :label="'flow-builder.contact-property-expression' | trans"
          :placeholder="'flow-builder.edit-expression' | trans"
          :current-expression="propertyValue"
          :valid-state="isValid"
          @commitExpressionChange="updatePropertyValue"/>
      </validation-message>
    </div>
  </div>
</template>

<script lang="ts">
import { IBlock, ISetContactPropertyBlockConfig } from '@floip/flow-runner';
import { Component, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class'
import Lang from '@/lib/filters/lang';
import { get } from 'lodash'
import { mixins } from "vue-class-component";
import ValidationMessage from '@/components/common/ValidationMessage.vue';
import { BLOCK_TYPE } from '@/store/flow/block-types/Core_SetContactPropertyStore'
import ExpressionEditor from '@/components/common/ExpressionEditor.vue'
import TextEditor from '@/components/common/TextEditor'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

@Component<any>({
  components: {
    TextEditor,
    ExpressionEditor,
    ValidationMessage,
  },
})
class ContactPropertyEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  PROPERTY_ACTION = {
    SET: 'set',
    CLEAR: 'clear',
  }

  get propertyAction() {
    // TODO: decide where we should persist this, thread: https://votomobile.slack.com/archives/CMQDVRDN3/p1624041356067900
    return get(this.block, 'config.set_contact_property.action', this.PROPERTY_ACTION.SET)
  }

  updatePropertyAction(event: Event) {
    return this.editSetContactPropertyExpression({ blockId: this.block.uuid, value: event.target.value })
  }

  get propertyKey() {
    return get(this.block, 'config.set_contact_property.property_key', '')
  }

  set propertyKey(value: string) {
    return this.editSetContactPropertyKey({ blockId: this.block.uuid, value })
  }

  get propertyValue() {
    return get(this.block, 'config.set_contact_property.property_value', '')
  }

  updatePropertyValue(value: string): Promise<string> {
    return this.editSetContactPropertyExpression({ blockId: this.block.uuid, value })
  }

  @blockVuexNamespace.Action editSetContactPropertyExpression!: (params: { blockId: string, value: string }) => Promise<string>
  @blockVuexNamespace.Action editSetContactPropertyKey!: (params: { blockId: string, value: string }) => Promise<string>
  @blockVuexNamespace.Action editSetContactPropertyAction!: (params: { blockId: string, value: string }) => Promise<string>
}

export default ContactPropertyEditor
</script>
