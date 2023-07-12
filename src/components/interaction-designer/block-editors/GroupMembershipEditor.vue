<template>
  <div class="group-membership-editor" data-cy="group-membership--editor">
    <div class="form-group">
      <label class="text-primary">{{ trans('flow-builder.action-label') }}</label>
      <p>{{ trans('flow-builder.group-membership-action-hint') }}</p>

      <div class="form-group">
        <div
          v-for="action in availableMembershipActions"
          :key="action.id"
          class="custom-control custom-radio">
          <input
            :id="action.id"
            v-model="membershipAction"
            type="radio"
            name="groupMembershipAction"
            :value="action.value"
            :data-cy="`${action.id}--radio`"
            class="custom-control-input">
          <label
            class="custom-control-label font-weight-normal"
            :for="action.id">
            {{ action.label }}
          </label>
        </div>
      </div>

      <ValidationMessage :message-key="`block/${block.uuid}/config/groups`">
        <template #input-control="{isValid}">
          <vue-multiselect
            v-if="isGroupListVisible"
            v-model="selectedGroups"
            :class="{invalid: isValid === false}"
            :is-loading="hasGroupsLoading"
            :options="groupOptions"
            :taggable="!availableGroups"
            :multiple="true"
            :show-labels="false"
            track-by="group_key"
            label="group_name"
            @seach-change="onSearchChange"
            data-cy="group-membership--selector"
            @tag="onGroupAdd" />
        </template>
      </ValidationMessage>
    </div>
  </div>
</template>

<script lang="ts">
import {IBlock, ISetGroupMembershipBlockConfig, IGroupMembership} from '@floip/flow-runner'
import {Component, Prop} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import VueMultiselect from 'vue-multiselect'
import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'
import {ConfigFieldType} from '@/store/flow/utils/vuexBlockAndFlowHelpers'
import {isEqual, unionWith} from 'lodash'
import ValidationMessage from '../../common/ValidationMessage.vue'

const flowVuexNamespace = namespace('flow')

type MembershipAction = {
  id: string,
  label: string,
  value: string,
}

enum MEMBERSHIP_ACTION {
  ADD = 'add',
  REMOVE = 'remove',
  CLEAR = 'clear',
}

@Component({
  components: {VueMultiselect},
})
export class GroupMembershipEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  /*
   * The following two props should be used together
   * when a user is only be allowed to select groups
   * from a pre-defined list.
   *
   * availableGroups = [
   *  { group_key: 'gr1', group_name: 'Foo' },
   *  { group_key: 'gr2', group_name: 'Bar' },
   * ]
   *
   * hasGroupsLoading should be set when the availableGroups
   * list is unknown yet, e.g., while an asynchronous request
   * to fetch the list after the group-search event
   * has not been resolved.
   */
  @Prop() readonly availableGroups?: IGroupMembership[]
  @Prop({type: Boolean, default: false}) readonly hasGroupsLoading!: boolean

  // User adds these  groups with vue-multiselect tagging interface
  get userAddedGroups(): IGroupMembership[] {
    return this.block.vendor_metadata?.floip.ui_metadata.user_added_groups ?? []
  }

  set userAddedGroups(groups) {
    this.block_updateVendorMetadataByPath({
      blockId: this.block.uuid,
      path: 'floip.ui_metadata.user_added_groups',
      value: groups,
    })
  }

  get groupOptions(): IGroupMembership[] {
    return unionWith(this.availableGroups, this.userAddedGroups, isEqual)
  }

  get availableMembershipActions(): MembershipAction[] {
    return [
      {
        id: 'addGroup',
        label: this.trans('flow-builder.set-group-membership'),
        value: MEMBERSHIP_ACTION.ADD,
      },
      {
        id: 'removeGroup',
        label: this.trans('flow-builder.remove-group-membership'),
        value: MEMBERSHIP_ACTION.REMOVE,
      },
      {
        id: 'clearGroup',
        label: this.trans('flow-builder.clear-group-membership'),
        value: MEMBERSHIP_ACTION.CLEAR,
      },
    ]
  }

  get membershipAction(): MEMBERSHIP_ACTION {
    const {clear, is_member: isMember} = this.block.config

    if (clear === true) {
      return MEMBERSHIP_ACTION.CLEAR
    }

    return isMember === true
      ? MEMBERSHIP_ACTION.ADD
      : MEMBERSHIP_ACTION.REMOVE
  }

  set membershipAction(value: MEMBERSHIP_ACTION) {
    if (value === MEMBERSHIP_ACTION.CLEAR) {
      this.updateBlockConfig({
        clear: true,
        is_member: undefined,
      })
    } else if (value === MEMBERSHIP_ACTION.ADD || value === MEMBERSHIP_ACTION.REMOVE) {
      this.updateBlockConfig({
        clear: false,
        is_member: value === MEMBERSHIP_ACTION.ADD,
      })
    } else {
      throw new Error(`Unknown membership action ${value}`)
    }
  }

  get isGroupListVisible(): boolean {
    return this.membershipAction !== MEMBERSHIP_ACTION.CLEAR
  }

  get selectedGroups(): IGroupMembership[] {
    return this.block.config?.groups ?? []
  }

  set selectedGroups(groups: IGroupMembership[]) {
    this.updateBlockConfig({
      groups,
    })
  }

  updateBlockConfig(config: Partial<ISetGroupMembershipBlockConfig>): void {
    Object.entries(config).forEach(([key, value]) => {
      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: key,
        value,
      })
    })
  }

  onSearchChange(e: Event): void {
    this.$emit('group-search', e)
  }

  onGroupAdd(name: string): void {
    const newGroup: IGroupMembership = {
      group_key: name,
      group_name: name,
    }

    this.userAddedGroups = [...this.userAddedGroups, newGroup]
    this.selectedGroups = [...this.selectedGroups, newGroup]
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value: ConfigFieldType }
  ) => void

  @flowVuexNamespace.Mutation block_updateVendorMetadataByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value: ConfigFieldType }
  ) => void
}

export default GroupMembershipEditor
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
</style>
