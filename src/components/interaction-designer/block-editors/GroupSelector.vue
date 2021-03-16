<template>
  <div class="form-group">
    <label>{{'flow-builder.group-label' | trans}}</label>
    <vue-multiselect v-model="selectedGroup"
                     track-by="id"
                     label="name"
                     :placeholder="'flow-builder.group-selector-placeholder' | trans"
                     :options="groupsList"
                     :allow-empty="false"
                     :show-labels="false"
                     :searchable="true">
    </vue-multiselect>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueMultiselect from 'vue-multiselect'
import { IBlock } from '@floip/flow-runner'
import { Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import lang from '@/lib/filters/lang'
import { get, find } from 'lodash'

const flowVuexNamespace = namespace('flow')

interface IGroupOption {
  id: string
  name: string
}

@Component<any>({
  components: {
    VueMultiselect,
  },
  mixins: [lang],
})
class GroupSelector extends Vue {
  @Prop() readonly block!: IBlock

  get selectedGroup() {
    const groupKey = get(this.block, 'config.groupKey')
    if (!groupKey) {
      return null
    }

    const groupOption = find(this.groupsList, { id: groupKey }) as IGroupOption
    if (!groupOption) {
      return null
    }

    return groupOption
  }

  set selectedGroup(value: IGroupOption) {
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'groupKey',
      value: value.id
    })
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'groupName',
      value: value.name
    })
  }

  get groupsList(): object[] {
    return this.$store.state.trees.ui.groups
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath
}

export default GroupSelector
</script>
