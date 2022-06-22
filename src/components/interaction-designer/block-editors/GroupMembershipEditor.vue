<template>
  <div class="group-membership-editor">
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
            class="custom-control-input">
          <label
            class="custom-control-label font-weight-normal"
            :for="action.id">
            {{ action.label }}
          </label>
        </div>
      </div>

      <vue-multiselect
        v-if="isGroupListVisible"
        v-model="selectedGroups"
        :is-loading="hasGroupsLoading"
        :options="groupOptions"
        :taggable="!availableGroups"
        :multiple="true"
        track-by="group_key"
        label="group_name"
        @seach-change="onSearchChange"
        @tag="onGroupAdd" />
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
   *
   * TODO: VMO-6299 Document the use of these properties in stories
   */
  @Prop() readonly availableGroups?: IGroupMembership[]
  @Prop({type: Boolean, default: false}) readonly hasGroupsLoading!: boolean

  // User adds these  groups with vue-multiselect tagging interface
  userAddedGroups: IGroupMembership[] = []
  cachedGroupsSelection: IGroupMembership[] = []

  get groupOptions(): unknown {
    return this.availableGroups ?? this.userAddedGroups
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
      this.cachedGroupsSelection = this.selectedGroups
      this.updateBlockConfig({
        clear: true,
        groups: undefined,
        is_member: undefined,
      })
    } else {
      this.updateBlockConfig({
        clear: undefined,
        groups: this.block.config?.groups ?? this.cachedGroupsSelection,
        is_member: value === MEMBERSHIP_ACTION.ADD,
      })
    }
  }

  get isGroupListVisible(): boolean {
    return this.membershipAction !== MEMBERSHIP_ACTION.CLEAR
  }

  get selectedGroups(): IGroupMembership[] {
    return this.block.config.groups ?? []
  }

  set selectedGroups(groups: IGroupMembership[]) {
    this.updateBlockConfig({
      groups,
    })
  }

  updateBlockConfig(config: Partial<ISetGroupMembershipBlockConfig>): void {
    Object.entries(config)
      .forEach(([key, value]) => {
        if (value === undefined) {
          this.block_removeConfigByKey({
            blockId: this.block.uuid,
            key,
          })
        } else {
          this.block_updateConfigByPath({
            blockId: this.block.uuid,
            path: key,
            value,
          })
        }
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

    this.userAddedGroups.push(newGroup)
    this.selectedGroups.push(newGroup)
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value?: object | string | number | boolean }
  ) => void

  @flowVuexNamespace.Mutation block_removeConfigByKey!: ({blockId, key}: { blockId: string, key: string}) => void
}

export default GroupMembershipEditor
</script>
