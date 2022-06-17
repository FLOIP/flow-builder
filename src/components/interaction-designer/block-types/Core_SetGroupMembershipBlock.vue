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
        <group-membership-editor :block="block" />
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
import {namespace} from 'vuex-class'
import {Component, Prop} from 'vue-property-decorator'

import {IBlock, IFlow, IGroupMembership} from '@floip/flow-runner'
import VueMultiselect from 'vue-multiselect'
import SetGroupMembershipStore, {ADD_KEY, BLOCK_TYPE, REMOVE_KEY} from '@/store/flow/block-types/Core_SetGroupMembershipStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {find} from 'lodash'
import {mixins} from 'vue-class-component'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

interface IGroupActionOption {
  id: string,
  name: string,
}

@Component({
  components: {
    VueMultiselect,
  },
})
class Core_SetGroupMembershipBlock extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: false}) readonly usesDefaultContactPropsEditor!: boolean

  @Prop() readonly availableGroups?: IGroupMembership[]
  @Prop() readonly groupsLoading?: boolean

  actionsList: IGroupActionOption[] = [
    {
      id: ADD_KEY,
      name: this.trans('flow-builder.add'),
    },
    {
      id: REMOVE_KEY,
      name: this.trans('flow-builder.remove'),
    },
  ]

  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
  @builderVuexNamespace.Getter isEditable!: boolean
}

export default Core_SetGroupMembershipBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetGroupMembershipStore)
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
</style>
