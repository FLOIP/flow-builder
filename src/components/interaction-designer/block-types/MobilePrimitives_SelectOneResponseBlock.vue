<template>
  <div>
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>

    <block-name-editor :block="block" />
    <block-label-editor :block="block" />
    <block-semantic-label-editor :block="block" />

    <div class="prompt-resource">
      <resource-editor v-if="promptResource"
                       :label="'flow-builder.prompt' | trans"
                       :resource="promptResource"
                       :block="block"
                       :flow="flow" />
    </div>
    <div class="question-prompt-resource">
      <resource-editor v-if="questionPromptResource"
                       :label="'flow-builder.question-prompt' | trans"
                       :resource="questionPromptResource"
                       :block="block"
                       :flow="flow" />
    </div>
    <div class="choices-prompt-resource">
      <resource-editor v-if="choicesPromptResource"
                       :label="'flow-builder.choices-prompt' | trans"
                       :resource="choicesPromptResource"
                       :block="block"
                       :flow="flow" />
    </div>
    <div v-for="(choiceKey) in Object.keys(inflatedChoices)" class="form-group form-inline">
      <resource-editor :label="`Choice ${choiceKey}`"
                       :resource="inflatedChoices[choiceKey]"
                       :block="block"
                       :flow="flow" />
    </div>

    <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid" />

    <block-id :block="block" />

  </div>
</template>

<script lang="ts">
  import {IFlow} from '@floip/flow-runner'
  import ISelectOneResponseBlock from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock'
  import {
    IResourceDefinition,
  } from '@floip/flow-runner/src/domain/IResourceResolver'
  import Vue from 'vue'
  import {namespace} from 'vuex-class'
  import {Component, Prop, Watch} from 'vue-property-decorator'

  import BlockNameEditor from '../block-editors/NameEditor.vue'
  import BlockLabelEditor from '../block-editors/LabelEditor.vue'
  import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'

  import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
  import ResourceEditor from '../resource-editors/ResourceEditor.vue'
  import BlockId from '../block-editors/BlockId.vue'

  import SelectOneStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'
  import lang from '@/lib/filters/lang'
  import {createDefaultBlockTypeInstallerFor} from "@/store/builder";

  const flowVuexNamespace = namespace('flow')
  const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

  @Component<any>({
    components: {
      BlockNameEditor,
      BlockLabelEditor,
      BlockSemanticLabelEditor,
      FirstBlockEditorButton,
      ResourceEditor,
      BlockId,
    },
    mixins: [lang],
  })
  export class MobilePrimitives_SelectOneResponseBlock extends Vue {
    @Prop()readonly block!: ISelectOneResponseBlock
    @Prop()readonly flow!: IFlow

    get promptResource(): IResourceDefinition {
      return this.resourcesByUuid[this.block.config.prompt]
    }
    get questionPromptResource(): IResourceDefinition {
      return this.resourcesByUuid[this.block.config.questionPrompt || ""]
    }
    get choicesPromptResource(): IResourceDefinition {
      return this.resourcesByUuid[this.block.config.choicesPrompt || ""]
    }

    @Watch('inflatedChoices', {deep: true})
    onChoicesChanged(newChoices: object) {
      this.editSelectOneResponseBlockChoice()
    }

    @flowVuexNamespace.Getter resourcesByUuid!: {[key: string]: IResourceDefinition}
    @blockVuexNamespace.Getter inflatedChoices!: {[key: string]: IResourceDefinition}
    @blockVuexNamespace.Action editSelectOneResponseBlockChoice!: () => Promise<object>
  }

  export default MobilePrimitives_SelectOneResponseBlock
  export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SelectOneStore)
</script>
