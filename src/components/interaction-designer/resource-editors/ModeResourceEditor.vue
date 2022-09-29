<template>
  <!--Resource editors grouped by mode (channel)-->
  <div v-if="resource"
       class="mode-resource-editor d-flex flex-wrap">
    <div v-for="({id: languageId, label: language}, languageIndex) in activeFlow.languages"
         :key="languageId"
         class="col-3">
      <header class="d-flex">
        <div class="mr-auto">{{language || trans('flow-builder.unknown-language')}}</div>
      </header>

      <template v-for="contentType in discoverContentTypesFor(mode)">
        <resource-variant-text-editor
          v-if="contentType === SupportedContentType.TEXT"
          :index="computeResourceIndex(languageIndex, modeIndex)"
          :mode="mode"
          :resource-id="resource.uuid"
          :resource-variant="findOrGenerateStubbedVariantOn(
            resource,
            {language_id: languageId, content_type: contentType, modes: [mode]})"
          @afterResourceVariantChanged="debouncePersistFlow" />

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
                {language_id: languageId, content_type: contentType, modes: [mode]}).value"
              @select="debouncePersistFlow" />
          </validation-message>

          <phone-recorder
            v-if="can(['edit-content', 'send-call-to-records'], true) && !findOrGenerateStubbedVariantOn(resource,{language_id: languageId, content_type: contentType, modes: [mode]}).value"
            :recording-key="`${block.uuid}:${languageId}`"
            @finish="debouncePersistFlow" />

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
import {debounce} from 'lodash'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

@Component({})
export class ModeResourceEditor extends mixins(FlowUploader, Permissions, Routes, Lang) {
  @Prop({required: true}) block!: IBlock
  @Prop({required: true}) modeIndex!: string
  @Prop({required: true}) mode!: string

  SupportedMode = SupportedMode
  SupportedContentType = SupportedContentType

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
  @builderVuexNamespace.Action persistFlowAndAnimate!: () => Promise<void>

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
    this.debouncePersistFlow()
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
    this.debouncePersistFlow()
  }

  /**
   * handleFileErrorFor
   * @param event, schema: {data: {file, message, uploader}}
   */
  handleFileErrorFor(event: any): void {
    const {data: {message}} = event
    console.debug('handleFileErrorFor', message)
    this.debouncePersistFlow()
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

  debouncePersistFlow = debounce(() => {
    this.persistFlowAndAnimate()
  }, 1500)
}
export default ModeResourceEditor
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
