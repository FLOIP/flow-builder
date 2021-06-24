<template>
  <!--Contact properties editor for each block-->
  <div class="contact-properties-editor">
    <label>{{ 'flow-builder.contact-properties-label' | trans }}</label>
    <div class="custom-control custom-checkbox">
      <input
        id="setContactProperty"
        v-model="shouldSetContactProperty"
        type="checkbox"
        name="setContactProperty"
        class="custom-control-input">
      <label
        class="custom-control-label font-weight-normal"
        for="setContactProperty">
        {{ 'flow-builder.set-contact-properties' | trans }}
      </label>
    </div>
    <contact-property-editor
      v-if="shouldSetContactProperty"
      :block="block"
      :should-show-action="false" />
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock, ISetContactPropertyBlockConfig} from '@floip/flow-runner'
import {map} from 'lodash'
import {namespace} from 'vuex-class'
import ContactPropertyEditor from './ContactPropertyEditor.vue'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    ContactPropertyEditor,
  },
})
class ContactPropertiesEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  get shouldSetContactProperty(): boolean {
    return Object.prototype.hasOwnProperty.call(this.block.config, 'set_contact_property')
  }

  set shouldSetContactProperty(value: boolean) {
    console.log('shouldSetContactProperty', value)
    if (!value) {
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

  @flowVuexNamespace.Mutation block_updateConfigByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value: string | object }
  ) => void
  @flowVuexNamespace.Mutation block_removeConfigByKey!: ({blockId, key}: { blockId: string, key: string}) => void
}
export default ContactPropertiesEditor
</script>
