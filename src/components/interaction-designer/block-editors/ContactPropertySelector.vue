<template>
  <div class="form-group">
    <label>{{'flow-builder.contact-property-label' | trans}}</label>
    <vue-multiselect v-model="selectedProperty"
                     track-by="id"
                     label="displayLabel"
                     :placeholder="'flow-builder.contact-property-selector-placeholder' | trans"
                     :options="contactPropertiesList"
                     :show-labels="false"
                     :searchable="true">
    </vue-multiselect>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueMultiselect from 'vue-multiselect';
import { IBlock } from '@floip/flow-runner';
import { Component, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class'
import lang from '@/lib/filters/lang';
import { get, find } from 'lodash'

const flowVuexNamespace = namespace('flow')

@Component<any>({
  components: {
    VueMultiselect,
  },
  mixins: [lang],
})
class ContactPropertySelector extends Vue {
  @Prop() readonly block!: IBlock

  get selectedProperty(): object {
    const propertyKey = get(this.block, 'config.set_contact_property.property_key')
    if (!propertyKey) {
      return null
    }

    const propertyOption = find(this.contactPropertiesList, { name: propertyKey })
    if (!propertyOption) {
      return null
    }

    return propertyOption
  }

  set selectedProperty(value) {
    this.block_updateConfigByKey({
      blockId: this.block.uuid,
      key: 'set_contact_property',
      value: {
        property_key: value.name
      }
    })
  }

  get contactPropertiesList(): object[] {
    return this.$store.state.trees.ui.subscriberPropertyFields
  }

  @flowVuexNamespace.Mutation block_updateConfigByKey
}

export default ContactPropertySelector;
</script>
