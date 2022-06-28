<template>
  <div class="core-set-group-membership-block">
    <base-block
      :block="block"
      :flow="flow"
      :show-semantic-label="false"
      :uses-default-contact-props-editor="usesDefaultContactPropsEditor"
      :uses-default-branching-editor="usesDefaultBranchingEditor"
      @handleBranchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})">
      <slot
        slot="resource-editors"
        name="resource-editors" />
      <slot
        slot="extras"
        name="extras">
        <group-membership-editor
          :block="block"
          :available-groups="availableGroups"
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
import {namespace} from 'vuex-class'

import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import SetGroupMembershipStore, {ADD_KEY, BLOCK_TYPE, REMOVE_KEY} from '@/store/flow/block-types/Core_SetGroupMembershipStore'
import {IBlock, IFlow, IGroupMembership} from '@floip/flow-runner'
import {mixins} from 'vue-class-component'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

@Component({})
class Core_SetGroupMembershipBlock extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: false}) readonly usesDefaultContactPropsEditor!: boolean

 /**
  * The availableGroups and hasGroupsLoading are forwarded to group-membership-editor as is.
  * @see group-membership-editor for details of use
  */
  @Prop() readonly availableGroups?: IGroupMembership[]
  @Prop() readonly hasGroupsLoading?: boolean

  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
}

export default Core_SetGroupMembershipBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetGroupMembershipStore)
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
</style>
