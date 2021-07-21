<template>
  <div class="choices-builder form-group">
    <h4>{{'flow-builder.choices' | trans}}</h4>

    <!-- Show non-empty choices -->
    <template v-for="(choiceIndex, choiceKey) in choiceKeys">
      <resource-variant-text-editor
        :key="block.config.choices[choiceKey]"
        class="choices-builder-item"
        :label="choiceIndex"
        :rows="1"
        :placeholder="'Enter choice...'"
        :resource-id="block.config.choices[choiceKey]"
        :resource-variant="findOrGenerateStubbedVariantOn(
          resourcesByUuid[block.config.choices[choiceKey]],
          {language_id: flow.languages[0].id,
           content_type: resourcesByUuid[block.config.choices[choiceKey]].values[0].content_type,
           modes: resourcesByUuid[block.config.choices[choiceKey]].values[0].modes})"
        :mode="'TEXT'"
        @afterResourceVariantChanged="handleExistingResourceVariantChangedFor(
          choiceKey,
          choiceIndex,
          resourcesByUuid[block.config.choices[choiceKey]])" />
    </template>

    <!--Show empty choice-->
    <resource-variant-text-editor
      :key="draftResource.uuid"
      class="choices-builder-item"
      :label="(choiceKeys.length + 1).toString()"
      :rows="1"
      :placeholder="'Enter choice...'"
      :resource-id="draftResource.uuid"
      :resource-variant="findOrGenerateStubbedVariantOn(
        draftResource,
        {language_id: flow.languages[0].id,
         content_type: draftResource.values[0].content_type,
         modes: draftResource.values[0].modes})"
      :mode="'TEXT'"
      @beforeResourceVariantChanged="addDraftResourceToChoices"
      @afterResourceVariantChanged="rewriteChoiceKeyFor({resourceId: draftResource.uuid, blockId: block.uuid})" />
  </div>
</template>

<script lang="ts">
import {get, isEmpty} from 'lodash'
import {findOrGenerateStubbedVariantOn} from '@/store/flow/resource'
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock, IBlockExit, IResource, SupportedContentType, SupportedMode} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import ResourceVariantTextEditor from '@/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue'
import {ISelectOneResponseBlock} from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock'
import SelectOneStore, {BLOCK_TYPE, IInflatedChoicesInterface} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

@Component({
  components: {
    ResourceVariantTextEditor,

  },
})
class ChoicesBuilder extends mixins(Lang) {
  @Prop() readonly block!: ISelectOneResponseBlock

  draftResource: IResource | null = null

  SupportedContentType = SupportedContentType
  SupportedMode = SupportedMode
  findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

  get choiceKeys(): string[] {
    return Object.keys(this.block.config.choices)
  }

  created(): void {
    this.generateDraftResource()
  }

  async generateDraftResource(): Promise<void> {
    this.draftResource = await this.flow_createBlankResourceForEnabledModesAndLangs()
  }

  addDraftResourceToChoices(): void {
    if (this.draftResource == null) {
      console.warn(
        'interaction-designer/block-editors/ChoicesBuilder',
        'Unable to add absent draft resource to block choices.',
        {block: this.block})
      return
    }

    this.resource_add({resource: this.draftResource})
    this.addChoiceByResourceIdTo({blockId: this.block.uuid, resourceId: this.draftResource.uuid})
    this.generateDraftResource()
  }

  handleExistingResourceVariantChangedFor(choiceKey: string, choiceIndex: number, resource: IResource): void {
    const isLast = choiceIndex === this.choiceKeys.length - 1
    const hasEmptyValue = isEmpty(get(resource.values[0], 'value'))

    if (isLast && hasEmptyValue) {
      // todo: clean up resource, but should we first check for references?
      // this.resource_delete({resourceId: resource.uuid})
      this.deleteChoiceByResourceIdFrom({blockId: this.block.uuid, resourceId: resource.uuid})
      return
    }

    this.rewriteChoiceKeyFor({resourceId: resource.uuid, blockId: this.block.uuid})
    this.$emit('choiceChanged', {choiceKey, choiceIndex, resource})
  }

  @flowVuexNamespace.Getter resourcesByUuid!: { [key: string]: IResource }
  @flowVuexNamespace.Mutation resource_add!: ({resource}: {resource: IResource}) => void
  @flowVuexNamespace.Action flow_createBlankResourceForEnabledModesAndLangs!: () => Promise<IResource>
  @blockVuexNamespace.Action deleteChoiceByResourceIdFrom!:
    ({blockId, resourceId}: {blockId: IBlock['uuid'], resourceId: IResource['uuid']}) => void
  @blockVuexNamespace.Action rewriteChoiceKeyFor!:
    ({blockId, resourceId}: {blockId: IBlock['uuid'], resourceId: IResource['uuid']}) => void
  @blockVuexNamespace.Action addChoiceByResourceIdTo!:
    ({blockId, resourceId}: {blockId: IBlock['uuid'], resourceId: IResource['uuid']}) => void
}
export default ChoicesBuilder
</script>
