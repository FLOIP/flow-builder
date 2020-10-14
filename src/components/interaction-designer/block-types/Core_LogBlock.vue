<template>
  <div>
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>

    <block-name-editor :block="block" />
    <block-label-editor :block="block" />
    <block-semantic-label-editor :block="block" />

    <div class="text-only-resource-editor">
      <hr />

      <h4>Log Message</h4>
      <template v-for="{id: languageId, name: language} in flow.languages">
        <div class="block-content-editor-lang">
          <h4>{{language || 'flow-builder.unknown-language' | trans}}</h4>
        </div>

        <template v-for="mode in flow.supportedModes">
          <h5>{{`flow-builder.${mode}-content` | trans}}</h5>

          <resource-variant-text-editor :resource-id="messageResource.uuid"
                                        :resource-variant="findOrGenerateStubbedVariantOn(
                                          messageResource,
                                          {languageId, contentType: ['text'], modes: [mode]})"

                                        :mode="mode"

                                        :is-editable="true || isEditable"
                                        :enable-autogen-button="true || enableAutogenButton" />
        </template>
      </template>
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

  import {IFlow} from '@floip/flow-runner'
  import ILogBlock from '@floip/flow-runner/src/model/block/ILogBlock'
  import {IResourceDefinition} from '@floip/flow-runner/src/domain/IResourceResolver'

  import ResourceEditor from '../resource-editors/ResourceEditor.vue'
  import BlockNameEditor from '../block-editors/NameEditor.vue'
  import BlockLabelEditor from '../block-editors/LabelEditor.vue'
  import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
  import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
  import BlockId from '../block-editors/BlockId.vue'
  import {findOrGenerateStubbedVariantOn} from '@/store/flow/resource'
  import LogStore, {BLOCK_TYPE} from "@/store/flow/block-types/Core_LogBlockStore";
  import {createDefaultBlockTypeInstallerFor} from "@/store/builder";
  import lang from '@/lib/filters/lang'

  const flowVuexNamespace = namespace('flow')

  @Component<any>({
    components: {
      ResourceEditor,
      BlockNameEditor,
      BlockLabelEditor,
      BlockSemanticLabelEditor,
      FirstBlockEditorButton,
      BlockId,
    },
    mixins: [lang],
  })
  class Core_LogBlock extends Vue {
    @Prop()readonly block!: ILogBlock
    @Prop()readonly flow!: IFlow

    findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

    get messageResource(): IResourceDefinition {
      return this.resourcesByUuid[this.block.config.message]
    }

    @flowVuexNamespace.Getter resourcesByUuid!: {[key: string]: IResourceDefinition}
  }

  export default Core_LogBlock
  export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, LogStore)
</script>
