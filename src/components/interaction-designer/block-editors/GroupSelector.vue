<template>
  <div class="block-group form-group">
    <label>{{'flow-builder.group-label' | trans}}</label>
    <vue-multiselect v-model="selectedGroup"
                     track-by="id"
                     label="name"
                     :placeholder="'flow-builder.group-selector-placeholder' | trans"
                     :options="groups"
                     :allow-empty="false"
                     :show-labels="false"
                     :searchable="true">
    </vue-multiselect>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueMultiselect from 'vue-multiselect'
import { IBlock, ISetGroupMembershipBlockConfig } from '@floip/flow-runner'
import { Component, Prop } from 'vue-property-decorator'
import { namespace, Getter } from 'vuex-class'
import lang from '@/lib/filters/lang'
import { find } from 'lodash'

const flowVuexNamespace = namespace('flow')

interface IGroupOption {
  id: string;
  name: string;
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
    const { groupKey } = this.block.config as ISetGroupMembershipBlockConfig
    if (!groupKey) {
      return {} as IGroupOption
    }

    const groupOption = find(this.groups, { id: groupKey }) as IGroupOption
    if (!groupOption) {
      return {} as IGroupOption
    }

    return groupOption
  }

  set selectedGroup(value: IGroupOption) {
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'groupKey',
      value: value.id,
    })
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'groupName',
      value: value.name,
    })
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath!: ({ blockId, path, value }: { blockId: string, path: string, value: object | string }) => void
  @Getter groups!: object[]
}

export default GroupSelector
</script>
