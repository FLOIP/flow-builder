<template>
  <div class="resource-editor">
    <hr v-if="label"/>

    <h4 v-if="label">{{label}}</h4>

    <template v-for="{id: languageId, label: language} in flow.languages">
      <div class="block-content-editor-lang">
        <h5 class="badge badge-info">{{language || 'flow-builder.unknown-language' | trans}}</h5>
      </div>

      <template v-for="mode in flow.supported_modes">
        <h6>{{`flow-builder.${mode.toLowerCase()}-content` | trans}}</h6>

        <template v-for="contentType in discoverContentTypesFor(mode)">
          <!-- todo: it's odd that we pass around a ContentType variant rather than a ContentTypeLangMode variant (aka, mode as external arg) -->

          <resource-variant-text-editor :resource-id="resource.uuid"
                                        :resource-variant="findOrGenerateStubbedVariantOn(
                                                resource,
                                                {languageId, contentType, modes: [mode]})"

                                        :mode="mode"
                                        v-if="contentType === SupportedContentType.TEXT"
                                        :enable-autogen-button="true || enableAutogenButton" />

          <div v-if="contentType === SupportedContentType.AUDIO">
            <template v-if="!findAudioResourceVariantFor(resource, {languageId, contentType: contentType, modes: [mode]})">
              <upload-monitor :uploadKey="`${block.uuid}:${languageId}`" />

              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a class="nav-link px-2 py-1 active" @click.prevent="" href="#">{{'flow-builder.library' | trans}}</a>
                </li>
                <li v-if="can(['edit-content', 'send-call-to-records'], true) && isFeatureAudioUploadEnabled" class="nav-item">
                  <a @click.prevent="triggerRecordViaPhoneFor(languageId)" href="#" class="nav-link px-2 py-1">{{'flow-builder.phone-recording' | trans}}</a>
                </li>

                <li class="nav-item" v-if="isEditable">
                  <a v-if="isFeatureAudioUploadEnabled"
                     class="nav-link px-2 py-1"
                     v-flow-uploader="{
                      target: route('trees.resumeableAudioUpload'),
                      token: `${block.uuid}${languageId}`,
                      accept: 'audio/*'}"
                     href="#"
                     @filesSubmitted="handleFilesSubmittedFor(`${block.uuid}:${languageId}`, $event)"
                     @fileSuccess="handleFileSuccessFor(`${block.uuid}:${languageId}`, languageId, $event)"
                  >
                    {{'flow-builder.upload' | trans}}
                  </a>
                </li>
              </ul>
            </template>

            <audio-library-selector
                :audioFiles="availableAudio"
                :langId="languageId"
                :resourceId="resource.uuid"
                :selectedAudioFile="findOrGenerateStubbedVariantOn(
                   resource,
                   {languageId, contentType, modes: [mode]}).value"/>

            <phone-recorder v-if="can(['edit-content', 'send-call-to-records'], true) && !findOrGenerateStubbedVariantOn(resource,{languageId, contentType, modes: [mode]}).value"
                            :recordingKey="`${block.uuid}:${languageId}`" />
          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import {
  Getter,
  Mutation,
  namespace,
} from 'vuex-class'
import {
  IBlock,
  IFlow,
  IResource,
  SupportedContentType,
  SupportedMode,
} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'
import Permissions from '@/lib/mixins/Permissions'
import Routes from '@/lib/mixins/Routes'
import FlowUploader from '@/lib/mixins/FlowUploader'
import { Component, Prop } from 'vue-property-decorator'
import {
  discoverContentTypesFor,
  findOrGenerateStubbedVariantOn,
  findResourceVariantOverModesOn, IResourceDefinitionVariantOverModesFilter,
} from '@/store/flow/resource'
import AudioLibrarySelector from '@/components/common/AudioLibrarySelector.vue'
import { ValidationException } from '@floip/flow-runner/src/domain/exceptions/ValidationException'
import PhoneRecorder from '@/components/interaction-designer/block-editors/PhoneRecorder.vue'
import UploadMonitor from '../block-editors/UploadMonitor.vue'
import ResourceVariantTextEditor from './ResourceVariantTextEditor.vue'
import { IResourceValue as IResourceDefinitionVariantOverModes } from "@floip/flow-runner/dist/domain/IResourceResolver";
import { ILanguage } from "@floip/flow-runner/dist/flow-spec/ILanguage";
import { mixins } from "vue-class-component";

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

  interface IAudioFile {
    id: string;
    filename: string;
    description: string;
    language_id: string;
    duration_seconds: string;
    original_extension: string;
    created_at: string;
  }

  interface IResourceDefinitionVariantOverModesWithOptionalValue extends Partial<IResourceDefinitionVariantOverModes> {
    value?: IResourceDefinitionVariantOverModes['value']
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
  @Prop({ required: true }) block!: IBlock

  @Prop({ required: true }) flow!: IFlow

  @Prop() resource!: IResource

  @Prop() label?: string | number

    discoverContentTypesFor = discoverContentTypesFor

    findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

    findResourceVariantOverModesOn = findResourceVariantOverModesOn

    SupportedMode = SupportedMode

    SupportedContentType = SupportedContentType

    triggerRecordViaPhoneFor(langId: ILanguage['id']) {
      this.$store.commit('setAudioRecordingConfigVisibilityForSelectedBlock', { langId, isVisible: true })
    }

    handleFilesSubmittedFor(key: string, { data }: { data: any }) {
      console.debug('call handleFilesSubmittedFor')
      this.$store.dispatch('multimediaUpload/uploadFiles', { ...data, key })
    }

    handleFileSuccessFor(key: string, langId: ILanguage['id'], event: any) {
      const { data: { file, json } } = event
      const { uuid: jsKey } = this.block
      const {
        audio_file_id: id,
        audio_uuid: filename,
        created_at: { date: created_at },
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
        filter: { languageId: langId, contentType: SupportedContentType.AUDIO, modes: [SupportedMode.IVR] },
        value: description,
      })
      event.target.blur() // remove the focus from the `upload` Tab
      this.pushAudioIntoLibrary(uploadedAudio)
    }

    findAudioResourceVariantFor(resource: IResource, filter: IResourceDefinitionVariantOverModesFilter) {
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

    @flowVuexNamespace.Action resource_setOrCreateValueModeSpecific!: ({ resourceId, filter, value }: { resourceId: IResource['uuid']; filter: IResourceDefinitionVariantOverModesWithOptionalValue; value: string }) => void

    @builderVuexNamespace.Getter isEditable !: boolean
}

export default ResourceEditor
</script>
