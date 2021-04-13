<template>
  <div class="block-contact-property form-group">
    <label>{{'flow-builder.contact-property-label' | trans}}</label>
    <vue-multiselect v-model="selectedProperty"
                     track-by="id"
                     label="displayLabel"
                     :placeholder="'flow-builder.contact-property-selector-placeholder' | trans"
                     :options="subscriberPropertyFields || []"
                     :allow-empty="false"
                     :show-labels="false"
                     :searchable="true">
    </vue-multiselect>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueMultiselect from 'vue-multiselect';
import { IBlock, ISetContactPropertyBlockConfig } from '@floip/flow-runner';
import { Component, Prop } from 'vue-property-decorator';
import {Getter, namespace} from 'vuex-class'
import lang from '@/lib/filters/lang';
import { find } from 'lodash'

const flowVuexNamespace = namespace('flow')

interface IContactPropertyOption {
  id: string
  name: string
  displayLabel: string
}

@Component<any>({
  components: {
    VueMultiselect,
  },
  mixins: [lang],
})
class ContactPropertySelector extends Vue {
  @Prop() readonly block!: IBlock

  get selectedProperty() {
    const {
      set_contact_property: {
        // @ts-ignore // TODO: weird issue, the prop exists but TS is still popping an error > Property 'property_key' does not exist on type 'SetContactProperty | SetContactProperty[]'
        property_key: propertyKey,
      },
    } = this.block.config as ISetContactPropertyBlockConfig
    if (!propertyKey) {
      return null
    }

    const propertyOption = find(this.subscriberPropertyFields, { name: propertyKey }) as IContactPropertyOption
    if (!propertyOption) {
      return null
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

  @flowVuexNamespace.Mutation block_updateConfigByPath
  @Getter subscriberPropertyFields: object[]
}

export default ContactPropertySelector;
</script>
