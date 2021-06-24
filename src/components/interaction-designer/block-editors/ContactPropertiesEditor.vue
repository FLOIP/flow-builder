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
import {Component, Prop, Vue} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock, ISetContactPropertyBlockConfig, SetContactProperty} from '@floip/flow-runner'
import ContactPropertyEditor from './ContactPropertyEditor.vue'

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
      Vue.delete(this.block.config, 'set_contact_property')
    } else {
      this.initConfigForContactProperty()
    }
  }

  initConfigForContactProperty() {
    Vue.set(
      this.block.config!,
      'set_contact_property',
      [{} as ISetContactPropertyBlockConfig],
    )
  }
}
export default ContactPropertiesEditor
</script>
