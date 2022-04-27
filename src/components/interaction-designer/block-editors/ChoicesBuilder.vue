<template>
  <div class="choices-builder form-group">
    <h4>{{'flow-builder.choices' | trans}}</h4>

    <!-- Show non-empty choices -->
    <template v-for="(resource, i) in choiceResourcesOrderedByResourcesList">
      <resource-variant-text-editor
        ref="choices"
        :key="resource.uuid"
        :index="i"
        class="choices-builder-item"
        :label="(i + 1).toString()"
        :rows="1"
        :placeholder="'Enter choice...'"
        :resource-id="resource.uuid"
        :resource-variant="resource.values[0]"
        :mode="SupportedMode.TEXT"
        @afterResourceVariantChanged="handleExistingResourceVariantChangedFor(
          resource.uuid,
          i,
          resource)" />
    </template>

    <!--Show empty choice-->
    <resource-variant-text-editor
      v-if="draftResource"
      ref="draftChoice"
      class="choices-builder-item"
      :label="(choiceResourcesOrderedByResourcesList.length + 1).toString()"
      :rows="1"
      :placeholder="'Enter choice...'"
      :resource-id="draftResource.uuid"
      :resource-variant="findOrGenerateStubbedVariantOn(
        draftResource,
        {language_id: activeFlow.languages[0].id,
         content_type: SupportedContentType.TEXT,
         mime_type: this.choiceMimeType,
         modes: [SupportedMode.TEXT]})"
      :mode="SupportedMode.TEXT"
      @beforeResourceVariantChanged="addDraftResourceToChoices"
      @afterResourceVariantChanged="rewriteChoiceKeyFor({resourceId: draftResource.uuid, blockId: block.uuid})" />
  </div>
</template>

<script lang="ts">
import {get, isEmpty, last, intersectionWith} from 'lodash'
import {findOrGenerateStubbedVariantOn} from '@/store/flow/resource'
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock, IFlow, IResource, SupportedContentType, SupportedMode} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import {ISelectOneResponseBlock} from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock'
import {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import Vue from 'vue'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const validationVuexNamespace = namespace('validation')

@Component({})
export class ChoicesBuilder extends mixins(Lang) {
  @Prop() readonly block!: ISelectOneResponseBlock

  draftResource: IResource | null = null

  SupportedContentType = SupportedContentType
  SupportedMode = SupportedMode
  findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

  get choiceResourcesOrderedByResourcesList(): IResource[] {
    const choiceResourceIds = Object.values(this.block.config.choices)
    return intersectionWith(this.resources, choiceResourceIds,
      (resource, choiceResourceId) => resource.uuid === choiceResourceId)
  }

  created(): void {
    this.generateDraftResource()
  }

  async generateDraftResource(): Promise<void> {
    this.draftResource = await this.resource_createWith({ // todo: abstract as createResourceForVanillaChoice()
      props: {uuid: await (new IdGeneratorUuidV4()).generate()},
    })
  }

  async addDraftResourceToChoices(): Promise<void> {
    if (this.draftResource == null) {
      console.warn(
        'interaction-designer/block-editors/ChoicesBuilder',
        'Unable to add absent draft resource to block choices.',
        {block: this.block})
      return
    }

    this.resource_add({resource: this.draftResource})
    this.addChoiceByResourceIdTo({blockId: this.block.uuid, resourceId: this.draftResource.uuid})

    this.$nextTick(() =>
      this.focusInputElFor(last(this.$refs.choices as Vue[])))

    await this.generateDraftResource()
  }

  focusInputElFor(editor?: Vue): void {
    (editor?.$refs.input as HTMLInputElement).focus()
  }

  handleExistingResourceVariantChangedFor(resourceId: IResource['uuid'], choiceIndex: number, resource: IResource): void {
    const isLast = choiceIndex === this.choiceResourcesOrderedByResourcesList.length - 1
    const hasEmptyValue = isEmpty(get(resource.values[0], 'value'))

    if (isLast && hasEmptyValue) {
      // todo: clean up resource, but should we first check for references?
      // this.resource_delete({resourceId: resource.uuid})
      this.deleteChoiceByResourceIdFrom({blockId: this.block.uuid, resourceId})
      this.focusInputElFor(this.$refs.draftChoice as Vue)
      return
    }

    this.rewriteChoiceKeyFor({resourceId, blockId: this.block.uuid})
    this.$emit('choiceChanged', {resourceId, choiceIndex, resource})
  }

  @validationVuexNamespace.Getter choiceMimeType: string

  @flowVuexNamespace.State resources!: IResource[]
  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Action resource_add!: ({resource}: {resource: IResource}) => void
  // @flowVuexNamespace.Action flow_createBlankResourceForEnabledModesAndLangs!: () => Promise<IResource>
  @flowVuexNamespace.Action resource_createWith!: ({props}: { props: { uuid: string } & Partial<IResource> }) => Promise<IResource>
  @blockVuexNamespace.Action deleteChoiceByResourceIdFrom!:
    ({blockId, resourceId}: {blockId: IBlock['uuid'], resourceId: IResource['uuid']}) => void
  @blockVuexNamespace.Action rewriteChoiceKeyFor!:
    ({blockId, resourceId}: {blockId: IBlock['uuid'], resourceId: IResource['uuid']}) => void
  @blockVuexNamespace.Action addChoiceByResourceIdTo!:
    ({blockId, resourceId}: {blockId: IBlock['uuid'], resourceId: IResource['uuid']}) => void
}
export default ChoicesBuilder
</script>
