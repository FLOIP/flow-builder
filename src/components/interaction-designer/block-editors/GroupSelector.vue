<template>
  <validation-message :message-key="`block/${block.uuid}/config/group_key`" #input-control="{ isValid }">
    <div class="block-group form-group">
      <label>{{'flow-builder.group-label' | trans}}</label>
      <vue-multiselect v-model="selectedGroup"
                       track-by="id"
                       label="name"
                       :class="{invalid: isValid === false}"
                       :placeholder="'flow-builder.group-selector-placeholder' | trans"
                       :options="groups"
                       :allow-empty="false"
                       :show-labels="false"
                       :searchable="true">
      </vue-multiselect>
    </div>
  </validation-message>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect'
import { IBlock, ISetGroupMembershipBlockConfig } from '@floip/flow-runner'
import { Component, Prop } from 'vue-property-decorator'
import { namespace, Getter } from 'vuex-class'
import Lang from '@/lib/filters/lang'
import { find } from 'lodash'
import { mixins } from "vue-class-component";
import ValidationMessage from '@/components/common/ValidationMessage.vue';

const flowVuexNamespace = namespace('flow')

interface IGroupOption {
  id: string;
  name: string;
}

@Component<any>({
  components: {
    VueMultiselect,
    ValidationMessage,
  },
})
class GroupSelector extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  get selectedGroup() {
    const { group_key } = this.block.config as ISetGroupMembershipBlockConfig
    if (!group_key) {
      return {} as IGroupOption
    }

    const groupOption = find(this.groups, { id: group_key }) as IGroupOption
    if (!groupOption) {
      return {} as IGroupOption
    }

    return groupOption
  }

  set selectedGroup(value: IGroupOption) {
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'group_key',
      value: value.id,
    })
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'group_name',
      value: value.name,
    })
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath!: ({ blockId, path, value }: { blockId: string, path: string, value: object | string }) => void
  @Getter groups!: object[]
}

export default GroupSelector
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
</style>
