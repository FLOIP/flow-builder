<template>
  <div class="resource-editor-cell d-flex flex-column">
    <resource-variant-text-editor
      v-if="contentType === SupportedContentType.TEXT"
      :index="index"
      :mode="mode"
      :resource-id="resource.uuid"
      :resource-variant="resourceVariant"
      @afterResourceVariantChanged="$emit('change')" />

    <div v-if="contentType === SupportedContentType.AUDIO">
      <validation-message
        #input-control="{ isValid }"
        :message-key="`resource/${resource.uuid}/values/${index}/value`">
        <audio-library-selector
          :audio-files="availableAudioFiles"
          :lang-id="languageId"
          :resource-id="resource.uuid"
          :selected-audio-uri="resourceVariant.value"
          @change="$emit('change')" />
      </validation-message>

      <phone-recorder
        v-if="can(['edit-content', 'send-call-to-records'], true) && !resourceVariant.value"
        :recording-key="`${block.uuid}:${languageId}`"
        @finish="$emit('change')" />

      <template v-if="!resourceVariant.value">
        <upload-monitor :upload-key="`${block.uuid}:${languageId}`" />

        <div class="d-flex mt-2 mb-3">
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
  ILanguage,
  IResource,
  IResourceValue,
  SupportedContentType,
  SupportedMode,
} from '@floip/flow-runner'

import {
  findIndexForResourceVariant,
  findOrGenerateStubbedVariantOn,
} from '@/store/flow/utils/resourceHelpers'
import {
  IAudioFile,
  IResourceDefinitionVariantOverModesWithOptionalValue,
} from '@/components/interaction-designer/resource-editors/ResourceEditor.model'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

@Component({})
export class ResourceEditorCell extends mixins(FlowUploader, Permissions, Routes, Lang) {
  @Prop({required: true}) block!: IBlock
  @Prop({required: true}) contentType!: string
  @Prop({required: true}) languageId!: string
  @Prop({required: true}) mode!: SupportedMode

  SupportedContentType = SupportedContentType

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

  triggerRecordViaPhoneFor(langId: ILanguage['id']): void {
    this.$store.commit('setAudioRecordingConfigVisibilityForSelectedBlock', {langId, isVisible: true})
  }

  handleFilesSubmittedFor(key: string, {data}: { data: any }): void {
    console.debug('call handleFilesSubmittedFor')
    this.$store.dispatch('multimediaUpload/uploadFiles', {...data, key})
    this.$emit('change')
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
    this.$emit('change')
  }

  /**
   * handleFileErrorFor
   * @param event, schema: {data: {file, message, uploader}}
   */
  handleFileErrorFor(event: any): void {
    const {data: {message}} = event
    console.debug('handleFileErrorFor', message)
    this.$emit('change')
  }

  get resourceVariant(): IResourceValue {
    return findOrGenerateStubbedVariantOn(
      this.resource,
      {language_id: this.languageId, content_type: this.contentType, modes: [this.mode]},
    )
  }

  get index(): number {
    return findIndexForResourceVariant(
      this.resource,
      {language_id: this.languageId, content_type: this.contentType, modes: [this.mode]},
    )
  }
}
export default ResourceEditorCell
</script>

<style scoped>
.ivr-buttons {
  font-size: small;
  flex-grow: 1;
}
</style>
