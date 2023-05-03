<template>
  <div class="core-set-group-membership-block">
    <base-block
      :block="block"
      :show-semantic-label="false"
      :uses-default-contact-props-editor="usesDefaultContactPropsEditor"
      :uses-default-branching-editor="usesDefaultBranchingEditor"
      @handleBranchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})">
      <slot
        slot="description"
        name="description" />
      <slot
        slot="resource-editors"
        name="resource-editors" />
      <slot
        slot="extras"
        name="extras">
        <group-membership-editor
          :block="block"
          :available-groups="finalGroupOptions"
          :has-groups-loading="hasGroupsLoading" />
      </slot>
      <slot
        slot="vendor-extras"
        name="vendor-extras" />
      <slot
        slot="branching"
        name="branching" />
      <slot
        slot="contact-props"
        name="contact-props" />
      <slot
        slot="vendor"
        name="vendor" />
    </base-block>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {namespace, State} from 'vuex-class'

import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import SetGroupMembershipStore, {ADD_KEY, BLOCK_TYPE, IGroupOption, REMOVE_KEY} from '@/store/flow/block-types/Core_SetGroupMembershipStore'
import {IBlock, IFlow, IGroupMembership} from '@floip/flow-runner'
import {mixins} from 'vue-class-component'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

@Component({})
export class Core_SetGroupMembershipBlock extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: false}) readonly usesDefaultContactPropsEditor!: boolean

 /**
  * The availableGroups and hasGroupsLoading are forwarded to group-membership-editor as is.
  * @see group-membership-editor for details of use
  */
  @Prop() readonly availableGroups?: IGroupMembership[]
  @Prop() readonly hasGroupsLoading?: boolean

  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
  @State(({trees: {ui: {groups}}}) => groups) groupsFromUiConfig!: IGroupOption[]

  /**
   * If availableGroups is not provided, use the groups from the ui config
   * In general, we specify the availableGroups at the consumer level to customize this component
   */
  get finalGroupOptions(): IGroupMembership[] {
    return this.availableGroups || this.groupsFromUiConfig.map(({id, name}) => ({group_key: id, group_name: name}))
  }
}

export default Core_SetGroupMembershipBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetGroupMembershipStore)
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
</style>
