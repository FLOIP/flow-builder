<template>
  <div
    class="choices-builder form-group"
    data-cy="choices-builder">
    <label class="text-primary">{{ 'flow-builder.choices' | trans }}</label>

    <!-- Show non-empty choices -->
    <template v-for="(resource, i) in choiceResourcesOrderedByResourcesList">
      <!--the index for resource-variant-text-editor will always be `0` because we have only 01 text resource.
      This will make sure we have the right validation message displayed -->
      <resource-variant-text-editor
        ref="choices"
        :key="resource.uuid"
        :index="0"
        class="choices-builder-item"
        :prepend-text="(i + 1).toString()"
        :title="resource.uuid"
        :rows="1"
        :placeholder="'Enter choice...'"
        :resource-id="resource.uuid"
        :resource-variant="resource.values[0]"
        :mode="SupportedMode.TEXT"
        :disabled-auto-complete="true"
        @afterResourceVariantChanged="handleExistingResourceVariantChangedFor(
          {choiceIndex: i},
          $event
        )" />
    </template>

    <!--Show empty choice-->
    <resource-variant-text-editor
      v-if="draftResource"
      ref="draftChoice"
      class="choices-builder-item"
      :prepend-text="(choiceResourcesOrderedByResourcesList.length + 1).toString()"
      :rows="1"
      :placeholder="'Enter choice...'"
      :resource-id="draftResource.uuid"
      :resource-variant="findOrGenerateStubbedVariantOn(
        draftResource,
        {language_id: activeFlow.languages[0].id,
         content_type: SupportedContentType.TEXT,
         mime_type: choiceMimeType,
         modes: [SupportedMode.TEXT]})"
      :mode="SupportedMode.TEXT"
      :disabled-auto-complete="true"
      @beforeResourceVariantChanged="addDraftResourceToChoices"
      @afterResourceVariantChanged="handleNewChoiceChange" />

    <validation-message
      #input-control="{ isValid }"
      :message-key="`block/${block.uuid}/config/choices`">
      <!--Display programmatic validation & AJV validation related to /config/choices -->
    </validation-message>

    <choice-mapping-modal :block="block" />
  </div>
</template>

<script lang="ts">
import {intersectionWith, isEmpty, last} from 'lodash'
import {findOrGenerateStubbedVariantOn} from '@/store/flow/utils/resourceHelpers'
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock, IFlow, IResource, IResourceValue, SupportedContentType, SupportedMode} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import {ISelectOneResponseBlock} from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock'
import {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import ChoiceMappingModal from '@/components/interaction-designer/block-editors/choices/ChoiceMappingModal.vue'
import Vue from 'vue'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const validationVuexNamespace = namespace('validation')

@Component<any>({
  components: {
    ChoiceMappingModal,
  },
})
export class ChoicesBuilder extends mixins(Lang) {
  @Prop() readonly block!: ISelectOneResponseBlock

  draftResource: IResource | null = null
  SupportedContentType = SupportedContentType
  SupportedMode = SupportedMode
  findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

  get choiceResourcesOrderedByResourcesList(): IResource[] {
    return intersectionWith(this.activeFlow.resources, this.block.config.choices,
      (resource, choice) => resource.uuid === choice?.prompt)
  }

  created(): void {
    this.generateDraftResource()
  }

  async generateDraftResource(): Promise<void> {
    // todo: abstract as createResourceForVanillaChoice()
    this.draftResource = await this.resource_createWith({
      props: {uuid: await (new IdGeneratorUuidV4()).generate()},
    })
  }

  async addDraftResourceToChoices(): Promise<void> {
    if (this.draftResource == null) {
      console.warn(
        'interaction-designer/block-editors/ChoicesBuilder',
        'Unable to add absent draft resource to block choices.',
        {block: this.block},
)
      return
    }

    this.resource_add({resource: this.draftResource})
    this.addChoiceByResourceIdTo({blockId: this.block.uuid, resourceId: this.draftResource.uuid})

    this.$nextTick(() =>
      this.focusInputElFor(last(this.$refs.choices as Vue[])))

    await this.generateDraftResource()
  }

  focusInputElFor(editor?: Vue): void {
    if (editor) {
      // Target input may be nested inside another Vue component
      (editor.$el.querySelector('input, textarea') as HTMLElement)?.focus()
    }
  }

  @blockVuexNamespace.Action choice_create!: (
    {blockId, resourceId, value}: {blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string},
  ) => void
  @blockVuexNamespace.Action choice_change!: (
    {blockId, resourceId, value}: {blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: IResourceValue['value']},
  ) => void

  handleExistingResourceVariantChangedFor(
    {choiceIndex}: {choiceIndex: number},
    {variant, resourceId, value}: {variant: IResourceValue, resourceId: IResource['uuid'], value: IResourceValue['value']},
  ): void {
    const isLast = choiceIndex === this.choiceResourcesOrderedByResourcesList.length - 1
    const hasEmptyValue = isEmpty(value)

    if (isLast && hasEmptyValue) {
      this.deleteLastAndPreviousChoicesIfEmpty(choiceIndex)
      this.focusInputElFor(this.$refs.draftChoice as Vue)
    } else {
      this.choice_change({blockId: this.block.uuid, resourceId, value})
    }

    this.$emit('choiceChanged', {resourceId})
  }

  deleteLastAndPreviousChoicesIfEmpty(choiceIndex: number): void {
    let i = choiceIndex
    let choice = this.block.config.choices[i]

    do {
      console.debug('delete previous empty choice at index', i)
      this.deleteChoiceByResourceIdFrom({blockId: this.block.uuid, resourceId: choice.prompt})
      // important to delete the choice before removing the resource, otherwise this will throw an error
      this.flow_removeResourcesAndRelatedValidationsOnActiveFlow({
        resourceUuids: [choice.prompt],
      })
      i -= 1
      choice = this.block.config.choices[i]
    } while (i >= 0 && choice.name === '')
  }

  handleNewChoiceChange({variant, resourceId, value}: {variant: IResourceValue, resourceId: IResource['uuid'], value: string}): void {
    this.choice_create({
      blockId: this.block.uuid,
      resourceId,
      value,
    })
    this.$emit('choiceChanged', {resourceId})
  }

  @validationVuexNamespace.Getter choiceMimeType!: string

  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Action resource_add!: ({resource}: {resource: IResource}) => void
  @flowVuexNamespace.Action resource_createWith!: ({props}: { props: { uuid: string } & Partial<IResource> }) => Promise<IResource>
  @flowVuexNamespace.Action flow_removeResourcesAndRelatedValidationsOnActiveFlow!:
    ({resourceUuids}: { resourceUuids: IResource['uuid'][] }) => Promise<void>

  @blockVuexNamespace.Action deleteChoiceByResourceIdFrom!:
    ({blockId, resourceId}: {blockId: IBlock['uuid'], resourceId: IResource['uuid']}) => void
  @blockVuexNamespace.Action block_setChoiceIvrExpressionOnIndex!:
    ({blockId, index, value}: { blockId: string, index: number, value: string }) => void
  @blockVuexNamespace.Action addChoiceByResourceIdTo!:
    ({blockId, resourceId}: {blockId: IBlock['uuid'], resourceId: IResource['uuid']}) => void
}
export default ChoicesBuilder
</script>
