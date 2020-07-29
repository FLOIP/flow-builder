<template>
  <div>
    <h3 class="no-room-above">
      {{'flow-builder.run-another-flow-block' | trans}}
    </h3>

    <block-name-editor :block="block" />
    <block-label-editor :block="block" />
    <block-semantic-label-editor :block="block" />

    <div class="form-group">
      <label>{{ 'flow-builder.destination-flow' | trans }}</label>

      <select class="form-control" v-model="destinationFlowId">
        <option value="">
          {{ 'flow-builder.none-selected' | trans }}
        </option>

        <option v-for="(flow, i) in otherFlows"
            :value="flow.uuid">
          {{ flow.name }}
        </option>
      </select>
    </div>

    <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid" />

    <block-id :block="block" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {namespace} from 'vuex-class'
  import {Component, Prop} from 'vue-property-decorator'

  import IRunFlowBlock from '@floip/flow-runner/src/model/block/IRunFlowBlock'
  import {IFlow} from '@floip/flow-runner'
  import {IFlowsState} from '@/store/flow/index'
  import BlockNameEditor from '../block-editors/NameEditor.vue'
  import BlockLabelEditor from '../block-editors/LabelEditor.vue'
  import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
  import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
  import BlockId from '../block-editors/BlockId.vue'

  import RunAnotherFlowStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_RunFlowBlockStore'

  const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

  @Component<any>({
    name: 'Core_RunFlowBlock.vue',
    components: {
      BlockNameEditor,
      BlockLabelEditor,
      BlockSemanticLabelEditor,
      FirstBlockEditorButton,
      BlockId,
    },
  })
  class Core_RunAnotherFlowBlock extends Vue {
    @Prop()readonly block!: IRunFlowBlock
    @Prop()readonly flow!: IFlow

    created() {
        if (!this.$store.hasModule(['flow', BLOCK_TYPE])) {
            this.$store.registerModule(['flow', BLOCK_TYPE], RunAnotherFlowStore)
        }
    }

    get destinationFlowId(): string {
      //TODO - fix IRunFlowBlockConfig - it should have flow_id according to spec - not flowId
      return this.block.config.flowId || ''
    }

    set destinationFlowId(newDestinationFlowId: string) {
      this.setDestinationFlowId({blockId: this.block.uuid, newDestinationFlowId})
    }

    @blockVuexNamespace.Action setDestinationFlowId!: (
      {blockId, newDestinationFlowId}: {blockId: string; newDestinationFlowId: string}
    ) => Promise<string>
    @blockVuexNamespace.Getter otherFlows!: IFlowsState[]
  }

  export default Core_RunAnotherFlowBlock
</script>
