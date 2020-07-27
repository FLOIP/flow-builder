<template>
  <div>
    <h3 class="no-room-above">
      {{'flow-builder.edit-output-block' | trans}}
    </h3>

    <block-name-editor :block="block" />
    <block-label-editor :block="block" />
    <block-semantic-label-editor :block="block" />

    <expression-editor :label="'flow-builder.output-expression' | trans"
        :placeholder="'flow-builder.edit-expression' | trans"
        :current-expression="value"
        @commitExpressionChange="commitExpressionChange"/>

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

  import IOutputBlock from '@floip/flow-runner/src/model/block/IOutputBlock'
  import {IFlow} from '@floip/flow-runner'
  import ExpressionEditor from '../../common/ExpressionEditor.vue'
  import BlockNameEditor from '../block-editors/NameEditor.vue'
  import BlockLabelEditor from '../block-editors/LabelEditor.vue'
  import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
  import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
  import BlockId from '../block-editors/BlockId.vue'

  import OutputStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_OutputBlockStore'

  const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

  //providing this generic is required by tsserver checking but not in the build run by yarn storybook
  //TODO - understand what is going on here and if there is something more correct we should have instead
  @Component<any>({
    name: 'OutputBlock',
    components: {
      ExpressionEditor,
      BlockNameEditor,
      BlockLabelEditor,
      BlockSemanticLabelEditor,
      FirstBlockEditorButton,
      BlockId,
    },
    created() {
      //TODO - better way to do this?
      if (!this.$store.state.flow[BLOCK_TYPE]) {
        this.$store.registerModule(['flow', BLOCK_TYPE], OutputStore)
      }
    },
  })
  class OutputBlock extends Vue {
    @Prop()readonly block!: IOutputBlock
    @Prop()readonly flow!: IFlow

    get value(): string {
      return this.block.config.value || ''
    }

    @blockVuexNamespace.Action editOutputExpression!: (params: {blockId: string; value: string}) => Promise<string>

    commitExpressionChange(value: string): Promise<string> {
      this.editOutputExpression({blockId: this.block.uuid, value})
    }
  }

  export default OutputBlock
</script>
