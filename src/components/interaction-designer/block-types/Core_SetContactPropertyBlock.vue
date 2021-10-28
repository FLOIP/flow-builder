<template>
  <div class="core-set-contact-property-block">
    <base-block :block="block" :flow="flow" @handleBranchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})" :showSemanticLabel="false">
      <template slot="extras">
        <contact-property-editor :block="block" />
      </template>
      <template slot="contact-props"/>
    </base-block>
  </div>
</template>

<script lang="ts">
import BaseBlock from './BaseBlock.vue'
import {namespace} from 'vuex-class'
import {Component, Prop} from 'vue-property-decorator'
import {IBlock, IFlow} from '@floip/flow-runner'
import ContactPropertyEditor from '@/components/interaction-designer/block-editors/ContactPropertyEditor.vue'
import SetContactPropertyStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_SetContactPropertyStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

@Component({
  components: {
    ContactPropertyEditor,
    BaseBlock
  },
})
class Core_SetContactPropertyBlock extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
}

export default Core_SetContactPropertyBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetContactPropertyStore)
</script>
