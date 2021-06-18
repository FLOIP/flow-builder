<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/config/set_contact_property/property_key`">
    <div class="block-contact-property">
      <label>{{ 'flow-builder.contact-property-label' | trans }}</label>
      <vue-multiselect
        v-model="selectedProperty"
        track-by="id"
        label="displayLabel"
        :class="{invalid: isValid === false}"
        :placeholder="'flow-builder.contact-property-selector-placeholder' | trans"
        :options="subscriberPropertyFields || []"
        :allow-empty="false"
        :show-labels="false"
        :searchable="true" />
    </div>
  </validation-message>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect'
import {IBlock, ISetContactPropertyBlockConfig} from '@floip/flow-runner'
import {Component, Prop} from 'vue-property-decorator'
import {Getter, namespace} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {find} from 'lodash'
import {mixins} from 'vue-class-component'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import {IContactPropertyOption} from '../../../store/flow/block-types/Core_SetContactPropertyStore'

const flowVuexNamespace = namespace('flow')

@Component<any>({
  components: {
    VueMultiselect,
    ValidationMessage,
  },
})
class ContactPropertySelector extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  get selectedProperty() {
    const {
      set_contact_property: {
        // TODO: weird issue, the prop exists but TS is still popping an error > Property 'property_key' does not exist on type 'SetContactProperty | SetContactProperty[]'
        // @ts-ignore
        property_key: propertyKey,
      },
    } = this.block.config as ISetContactPropertyBlockConfig
    if (!propertyKey) {
      return {} as IContactPropertyOption
    }

    const propertyOption = find(this.subscriberPropertyFields, {name: propertyKey}) as IContactPropertyOption
    if (!propertyOption) {
      return {} as IContactPropertyOption
    }

    return propertyOption
  }

  set selectedProperty(value: IContactPropertyOption) {
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'set_contact_property.property_key',
      value: value.name,
    })
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath!: ({
    blockId,
    path,
    value,
  }: { blockId: string, path: string, value: object | string }) => void
  @Getter subscriberPropertyFields!: object[]
}

export default ContactPropertySelector
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
</style>
