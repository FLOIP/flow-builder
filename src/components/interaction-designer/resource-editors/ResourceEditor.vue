<template>
  <div class="resource-editor">
    <hr v-if="label">

    <h4 v-if="label">
      {{ label }}
    </h4>

    <div>
      <b-tabs>
        <b-tab
          v-for="{id: languageId, label: language} in flow.languages"
          :key="languageId"
          :title="language || 'flow-builder.unknown-language' | trans"
          active>
          <div v-for="(mode, i) in flow.supported_modes" :key="i" class="tab-content-style">
            <h6>{{ `flow-builder.${mode.toLowerCase()}-content` | trans }}</h6>

            <template v-for="contentType in discoverContentTypesFor(mode)">
              <!-- todo: it's odd that we pass around a ContentType variant rather than a ContentTypeLangMode variant (aka, mode as external arg) -->

              <resource-variant-text-editor
                v-if="contentType === SupportedContentType.TEXT"
                :resource-id="resource.uuid"

                :resource-variant="findOrGenerateStubbedVariantOn(
                  resource,
                  {language_id: languageId, content_type: contentType, modes: [mode]})"
                :mode="mode"
                :enable-autogen-button="true || enableAutogenButton" />

              <div v-if="contentType === SupportedContentType.AUDIO">
                <template v-if="!findAudioResourceVariantFor(resource, {language_id: languageId, content_type: contentType, modes: [mode]})">
                  <upload-monitor :upload-key="`${block.uuid}:${languageId}`" />

                  <ul class="nav nav-tabs">
                    <li class="nav-item">
                      <a
                        class="nav-link px-2 py-1 active"
                        href="#"
                        @click.prevent="">{{ 'flow-builder.library' | trans }}</a>
                    </li>
                    <li
                      v-if="can(['edit-content', 'send-call-to-records'], true) && isFeatureAudioUploadEnabled"
                      class="nav-item">
                      <a
                        href="#"
                        class="nav-link px-2 py-1"
                        @click.prevent="triggerRecordViaPhoneFor(languageId)">{{ 'flow-builder.phone-recording' | trans }}</a>
                    </li>

                    <li
                      v-if="isEditable"
                      class="nav-item">
                      <a
                        v-if="isFeatureAudioUploadEnabled"
                        v-flow-uploader="{
                          target: route('trees.resumeableAudioUpload'),
                          token: `${block.uuid}${languageId}`,
                          accept: 'audio/*'}"
                        class="nav-link px-2 py-1"
                        href="#"
                        @filesSubmitted="handleFilesSubmittedFor(`${block.uuid}:${languageId}`, $event)"
                        @fileSuccess="handleFileSuccessFor(`${block.uuid}:${languageId}`, languageId, $event)">
                        {{ 'flow-builder.upload' | trans }}
                      </a>
                    </li>
                  </ul>
                </template>

                <audio-library-selector
                  :audio-files="availableAudio"
                  :lang-id="languageId"
                  :resource-id="resource.uuid"
                  :selected-audio-file="findOrGenerateStubbedVariantOn(
                    resource,
                    {language_id: languageId, content_type: contentType, modes: [mode]}).value" />

                <phone-recorder
                  v-if="can(['edit-content', 'send-call-to-records'], true) && !findOrGenerateStubbedVariantOn(resource,{language_id: languageId, content_type: contentType, modes: [mode]}).value"
                  :recording-key="`${block.uuid}:${languageId}`" />
              </div>
            </template>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Getter, Mutation, namespace} from 'vuex-class'
import {
  IBlock,
  IFlow,
  IResource,
  IResourceValue as IResourceDefinitionVariantOverModes,
  SupportedContentType,
  SupportedMode,
} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'
import Permissions from '@/lib/mixins/Permissions'
import Routes from '@/lib/mixins/Routes'
import FlowUploader from '@/lib/mixins/FlowUploader'
import {Component, Prop} from 'vue-property-decorator'
import {
  discoverContentTypesFor,
  findOrGenerateStubbedVariantOn,
  findResourceVariantOverModesOn,
  IResourceDefinitionVariantOverModesFilter,
} from '@/store/flow/resource'
import AudioLibrarySelector from '@/components/common/AudioLibrarySelector.vue'
import {ValidationException} from '@floip/flow-runner/src/domain/exceptions/ValidationException'
import PhoneRecorder from '@/components/interaction-designer/block-editors/PhoneRecorder.vue'
import {ILanguage} from '@floip/flow-runner/dist/flow-spec/ILanguage'
import {mixins} from 'vue-class-component'
import {TabsPlugin} from 'bootstrap-vue'
import UploadMonitor from '../block-editors/UploadMonitor.vue'
import ResourceVariantTextEditor from './ResourceVariantTextEditor.vue'

Vue.use(TabsPlugin)

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

interface IAudioFile {
  id: string,
  filename: string,
  description: string,
  language_id: string,
  duration_seconds: string,
  original_extension: string,
  created_at: string,
}

interface IResourceDefinitionVariantOverModesWithOptionalValue extends Partial<IResourceDefinitionVariantOverModes> {
  value?: IResourceDefinitionVariantOverModes['value'],
}

@Component({
  components: {
    AudioLibrarySelector,
    ResourceVariantTextEditor,
    UploadMonitor,
    PhoneRecorder,
  },
})
export class ResourceEditor extends mixins(FlowUploader, Permissions, Routes, Lang) {
  @Prop({required: true}) block!: IBlock

  @Prop({required: true}) flow!: IFlow

  @Prop() resource!: IResource

  @Prop() label?: string | number

  discoverContentTypesFor = discoverContentTypesFor

  findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

  findResourceVariantOverModesOn = findResourceVariantOverModesOn

  SupportedMode = SupportedMode

  SupportedContentType = SupportedContentType

  triggerRecordViaPhoneFor(langId: ILanguage['id']): void {
    this.$store.commit('setAudioRecordingConfigVisibilityForSelectedBlock', {langId, isVisible: true})
  }

  handleFilesSubmittedFor(key: string, {data}: { data: any }): void {
    console.debug('call handleFilesSubmittedFor')
    this.$store.dispatch('multimediaUpload/uploadFiles', {...data, key})
  }

  handleFileSuccessFor(key: string, langId: ILanguage['id'], event: any): void {
    const {data: {json}} = event
    const {
      audio_file_id: id,
      audio_uuid: filename,
      created_at: {date: created_at},
      description,
      duration_seconds,
    } = JSON.parse(json)
    const extension = description.split('.')[description.split('.').length - 1]
    const uploadedAudio: IAudioFile = {
      id,
      filename,
      description,
      language_id: langId,
      duration_seconds,
      original_extension: extension,
      created_at,
    }

    this.resource_setOrCreateValueModeSpecific({
      resourceId: this.resource.uuid,
      filter: {language_id: langId, content_type: SupportedContentType.AUDIO, modes: [SupportedMode.IVR]},
      value: description,
    })
    // remove the focus from the `upload` Tab
    event.target.blur()
    this.pushAudioIntoLibrary(uploadedAudio)
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

  @Getter availableAudio!: IAudioFile[]

  @Getter isFeatureAudioUploadEnabled!: boolean

  @Mutation pushAudioIntoLibrary!: (audio: IAudioFile) => void

  @flowVuexNamespace.Action resource_setOrCreateValueModeSpecific!: ({
    resourceId,
    filter,
    value,
  }: { resourceId: IResource['uuid'], filter: IResourceDefinitionVariantOverModesWithOptionalValue, value: string }) => void

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default ResourceEditor
</script>

<style scoped>
.tab-content-style {
  background: #F4F4F4;
  padding: 10px;
}
</style>
