<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/config/group_key`">
    <div class="group-selector block-group">
      <label class="text-primary">{{ trans('flow-builder.group-label') }}</label>
      <vue-multiselect
        v-model="selectedGroup"
        track-by="id"
        label="name"
        :class="{invalid: isValid === false}"
        :placeholder="trans('flow-builder.group-selector-placeholder')"
        :options="groups"
        :allow-empty="false"
        :show-labels="false"
        :searchable="true" />
    </div>
  </validation-message>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect'
import {IBlock, ISetGroupMembershipBlockConfig} from '@floip/flow-runner'
import {Prop} from 'vue-property-decorator'
import {Getter, namespace} from 'vuex-class'
import {Lang} from '@/lib/filters/lang'
import {find} from 'lodash'
import {mixins, Options} from 'vue-class-component'
import {IGroupOption} from '../../../store/flow/block-types/Core_SetGroupMembershipStore'

const flowVuexNamespace = namespace('flow')

@Options({
  components: {
    VueMultiselect,
  },
})
export class GroupSelector extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  get selectedGroup() {
    const {group_key} = this.block.config as ISetGroupMembershipBlockConfig
    if (!group_key) {
      return {} as IGroupOption
    }

    const groupOption = find<IGroupOption>(this.groups, {id: group_key})
    if (groupOption) {
      return groupOption
    } else {
      return {} as IGroupOption
    }
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

  @flowVuexNamespace.Mutation block_updateConfigByPath!: ({
    blockId,
    path,
    value,
  }: { blockId: string, path: string, value: object | string }) => void
  @Getter groups!: IGroupOption[]
}

export default GroupSelector
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
</style>
