<template>
  <div class="form-group">
    <label>{{'flow-builder.contact-property-label' | trans}}</label>
    <vue-multiselect v-model="selectedProperty"
                     track-by="id"
                     label="displayLabel"
                     :placeholder="'flow-builder.contact-property-selector-placeholder' | trans"
                     :options="contactPropertiesList"
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
import { namespace } from 'vuex-class'
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

    const propertyOption = find(this.contactPropertiesList, { name: propertyKey }) as IContactPropertyOption
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

  get contactPropertiesList(): object[] {
    return this.$store.state.trees.ui.subscriberPropertyFields
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath
}

export default ContactPropertySelector;
</script>
