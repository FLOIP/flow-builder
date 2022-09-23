<template>
  <div v-if="resource"
       :class="{'d-flex': isHorizontalDisplay}"
       class="language-resource-editor">
    <div
      v-for="(mode, modeIndex) in activeFlow.supported_modes"
      :key="modeIndex"
      :class="{'col-3': isHorizontalDisplay}">
      <header class="d-flex">
        <font-awesome-icon
          v-if="iconsMap.get(mode)"
          :class="{'custom-icons': iconsMap.get(mode)[0] === 'fac', 'library-icons': iconsMap.get(mode)[0] !== 'fac'}"
          :icon="iconsMap.get(mode)" />
        <h6 class="ml-1">
          {{ `flow-builder.${mode.toLowerCase()}-content` | trans }}
        </h6>
      </header>

      <template v-for="contentType in discoverContentTypesFor(mode)">
        <!-- todo: it's odd that we pass around a ContentType variant rather than a ContentTypeLangMode variant (aka, mode as external arg) -->

        <resource-variant-text-editor
          v-if="contentType === SupportedContentType.TEXT"
          :index="computeResourceIndex(languageIndex, modeIndex)"
          :mode="mode"
          :resource-id="resource.uuid"
          :resource-variant="findOrGenerateStubbedVariantOn(
                  resource,
                  {language_id: languageId, content_type: contentType, modes: [mode]})" />

        <div v-if="contentType === SupportedContentType.AUDIO">
          <validation-message
            #input-control="{ isValid }"
            :message-key="`resource/${resource.uuid}/values/${computeResourceIndex(languageIndex, modeIndex)}/value`">
            <audio-library-selector
              :audio-files="availableAudioFiles"
              :lang-id="languageId"
              :resource-id="resource.uuid"
              :selected-audio-uri="findOrGenerateStubbedVariantOn(
                      resource,
                      {language_id: languageId, content_type: contentType, modes: [mode]}).value" />
          </validation-message>

          <phone-recorder
            v-if="can(['edit-content', 'send-call-to-records'], true) && !findOrGenerateStubbedVariantOn(resource,{language_id: languageId, content_type: contentType, modes: [mode]}).value"
            :recording-key="`${block.uuid}:${languageId}`" />

          <template v-if="!findAudioResourceVariantFor(resource, {language_id: languageId, content_type: contentType, modes: [mode]})">
            <upload-monitor :upload-key="`${block.uuid}:${languageId}`" />

            <div class="d-flex mt-2">
              <button
                v-if="isEditable && isFeatureAudioUploadEnabled"
                v-flow-uploader="{
                        target: route('trees.resumeableAudioUpload'),
                        token: `${block.uuid}:${languageId}`,
                        accept: 'audio/*'}"
                class="btn btn-primary ivr-buttons"
                @fileError="handleFileErrorFor($event)"
                @fileSuccess="handleFileSuccessFor(`${block.uuid}:${languageId}`, languageId, $event)"
                @filesSubmitted="handleFilesSubmittedFor(`${block.uuid}:${languageId}`, $event)">
                <font-awesome-icon
                  :icon="['fac', 'upload']"
                  class="fa-btn" />
                {{ 'flow-builder.upload-audio' | trans }}
              </button>
              <button
                v-if="can(['edit-content', 'send-call-to-records'], true) && isFeatureAudioUploadEnabled"
                class="btn btn-primary ivr-buttons ml-2"
                @click.prevent="triggerRecordViaPhoneFor(languageId)">
                <font-awesome-icon
                  :icon="['fac', 'record-audio']"
                  class="fa-btn" />
                {{ 'flow-builder.record-audio' | trans }}
              </button>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import Permissions from '@/lib/mixins/Permissions'
import Routes from '@/lib/mixins/Routes'
import FlowUploader from '@/lib/mixins/FlowUploader'
import {Getter, Mutation, namespace} from 'vuex-class'
import {
  IBlock,
  IFlow,
  IResource,
  IResourceValue as IResourceDefinitionVariantOverModes,
  SupportedContentType,
  SupportedMode,
} from '@floip/flow-runner'

import {
  discoverContentTypesFor,
  findOrGenerateStubbedVariantOn,
  findResourceVariantOverModesOn,
  IResourceDefinitionVariantOverModesFilter,
} from '@/store/flow/resource'
import {ValidationException} from '@floip/flow-runner/src/domain/exceptions/ValidationException'
import {ILanguage} from '@floip/flow-runner/dist/flow-spec/ILanguage'
import {IAudioFile} from '@/components/interaction-designer/resource-editors/ResourceEditor.model'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

@Component({})
export class LanguageResourceEditor extends mixins(FlowUploader, Permissions, Routes, Lang) {
  @Prop({required: true}) block!: IBlock
  @Prop({required: true}) languageIndex!: string
  @Prop({required: true}) languageId!: string
  @Prop({required: true, default: 'vertical'}) resourceDisplayType!: string

  SupportedMode = SupportedMode
  SupportedContentType = SupportedContentType
  iconsMap = new Map<string, object>([
    [SupportedMode.SMS, ['far', 'envelope']],
    [SupportedMode.TEXT, ['fac', 'text']],
    [SupportedMode.USSD, ['fac', 'ussd']],
    [SupportedMode.IVR, ['fac', 'audio']],
    [SupportedMode.RICH_MESSAGING, ['far', 'comment-dots']],
    [SupportedMode.OFFLINE, ['fas', 'mobile-alt']],
  ])

  discoverContentTypesFor = discoverContentTypesFor
  findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn
  findResourceVariantOverModesOn = findResourceVariantOverModesOn

  @Getter availableAudioFiles!: IAudioFile[]
  @Getter isFeatureAudioUploadEnabled!: boolean
  @Mutation pushAudioIntoLibrary!: (audio: IAudioFile) => void
  @flowVuexNamespace.Getter resourcesByUuidOnActiveFlow!: { [key: string]: IResource }
  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Action resource_setOrCreateValueModeSpecific!: ({
    resourceId,
    filter,
    value,
  }: { resourceId: IResource['uuid'], filter: IResourceDefinitionVariantOverModesWithOptionalValue, value: string }) => void
  @builderVuexNamespace.Getter isEditable !: boolean

  get resource(): IResource {
    return this.resourcesByUuidOnActiveFlow[this.block.config.prompt]
  }

  get isVerticalDisplay(): string {
    return this.resourceDisplayType === 'vertical'
  }

  get isHorizontalDisplay(): string {
    return this.resourceDisplayType === 'horizontal'
  }

  /**
   * Compute resource index (cell index) for a table having X languages and Y modes
   *
   * @param languageIndex
   * @param modeIndex
   */
  computeResourceIndex(languageIndex: number, modeIndex: number): number {
    return languageIndex * this.activeFlow.supported_modes.length + modeIndex
  }

  triggerRecordViaPhoneFor(langId: ILanguage['id']): void {
    this.$store.commit('setAudioRecordingConfigVisibilityForSelectedBlock', {langId, isVisible: true})
  }

  handleFilesSubmittedFor(key: string, {data}: { data: any }): void {
    console.debug('call handleFilesSubmittedFor')
    this.$store.dispatch('multimediaUpload/uploadFiles', {...data, key})
  }

  /**
   * handleFileSuccessFor
   * @param key
   * @param langId
   * @param event, schema: {data: {file, uploader, json}}
   */
  handleFileSuccessFor(key: string, langId: ILanguage['id'], event: any): void {
    const {data: {json}} = event
    const {
      audio_file_id: id,
      audio_uuid,
      created_at: {date: created_at},
      description,
      duration_seconds,
      uri,
    } = JSON.parse(json)
    const extension = description.split('.')[description.split('.').length - 1]
    const uploadedAudio: IAudioFile = {
      id,
      audio_uuid,
      description,
      language_id: langId,
      duration_seconds,
      original_extension: extension,
      created_at,
      uri,
    }

    this.resource_setOrCreateValueModeSpecific({
      resourceId: this.resource.uuid,
      filter: {language_id: langId, content_type: SupportedContentType.AUDIO, modes: [SupportedMode.IVR]},
      value: uri,
    })
    // remove the focus from the `upload` Tab
    event.target.blur()
    this.pushAudioIntoLibrary(uploadedAudio)
  }

  /**
   * handleFileErrorFor
   * @param event, schema: {data: {file, message, uploader}}
   */
  handleFileErrorFor(event: any): void {
    const {data: {message}} = event
    console.debug('handleFileErrorFor', message)
  }

  findAudioResourceVariantFor(resource: IResource, filter: IResourceDefinitionVariantOverModesFilter): string | null {
    try {
      return findResourceVariantOverModesOn(resource, filter).value
    } catch (e) {
      if (!(e instanceof ValidationException)) {
        throw e
      }

      return null
    }
  }
}
export default LanguageResourceEditor
</script>

<style scoped>
.ivr-buttons {
  font-size: small;
  flex-grow: 1;
}
.custom-icons {
  height: 1.25em;
  width: 1.25em;
}
.library-icons {
  margin-top: 2px;
}
</style>
