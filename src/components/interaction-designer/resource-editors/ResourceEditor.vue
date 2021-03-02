<template>
  <div class="resource-editor">
    <hr />

    <h4 v-if="label">{{label}}</h4>

    <template v-for="{id: languageId, name: language} in flow.languages">
      <div class="block-content-editor-lang">
        <h5 class="badge badge-info">{{language || 'flow-builder.unknown-language' | trans}}</h5>
      </div>

      <template v-for="mode in flow.supportedModes">
        <h6>{{`flow-builder.${mode}-content` | trans}}</h6>

        <template v-for="contentType in discoverContentTypesFor(mode)">
          <!-- todo: it's odd that we pass around a ContentType variant rather than a ContentTypeLangMode variant (aka, mode as external arg) -->

          <resource-variant-text-editor :resource-id="resource.uuid"
                                        :resource-variant="findOrGenerateStubbedVariantOn(
                                                resource,
                                                {languageId, contentType, modes: [mode]})"

                                        :mode="mode"

                                        :is-editable="true || isEditable"
                                        v-if="contentType === SupportedContentType.TEXT"
                                        :enable-autogen-button="true || enableAutogenButton" />

          <div v-if="contentType === SupportedContentType.AUDIO">
            <template v-if="!findAudioResourceVariantFor(resource, {languageId, contentType: contentType, modes: [mode]})">
              <upload-monitor :uploadKey="`${block.uuid}:${languageId}`" />

              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a class="nav-link active" @click.prevent="" href="#">{{'flow-builder.library' | trans}}</a>
                </li>

                <li class="nav-item">
                  <a v-if="isFeatureAudioUploadEnabled"
                     class="nav-link"
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
    IResourceDefinition,
    SupportedContentType,
    SupportedMode,
  } from '@floip/flow-runner'
  import lang from '@/lib/filters/lang'
  import Permissions from '@/lib/mixins/Permissions'
  import Routes from '@/lib/mixins/Routes'
  import FlowUploader from '@/lib/mixins/FlowUploader'
  import {Component} from 'vue-property-decorator'
  import Vue from 'vue'
  import ResourceVariantTextEditor from './ResourceVariantTextEditor.vue'
  import {
  discoverContentTypesFor,
    findOrGenerateStubbedVariantOn,
    findResourceVariantOverModesOn
  } from '@/store/flow/resource'
  import AudioLibrarySelector from '@/components/common/AudioLibrarySelector.vue'
  import UploadMonitor from '../block-editors/UploadMonitor.vue'
import ValidationException from "@floip/flow-runner/src/domain/exceptions/ValidationException";
import {cloneDeep} from "lodash";

  const flowVuexNamespace = namespace('flow')

  interface IAudioFile {
    id: string,
    filename: string,
    description: string,
    language_id: string,
    duration_seconds: string,
    original_extension: string,
    created_at: string
  }

  @Component({
    props: {
      block: {
        type: Object as () => IBlock,
        required: true,
      },
      flow: {
        type: Object as () => IFlow,
        default: null,
      },
      label: {
        type: [String, Number],
      },
      resource: {
        type: Object as () => IResourceDefinition,
        default: null,
      }
    },

    mixins: [
      lang,
      FlowUploader,
      Permissions,
      Routes,
    ],

    components: {
      AudioLibrarySelector,
      ResourceVariantTextEditor,
      UploadMonitor,
    },
  })
  export class ResourceEditor extends Vue {
    discoverContentTypesFor = discoverContentTypesFor
    findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn
    findResourceVariantOverModesOn = findResourceVariantOverModesOn
    SupportedMode = SupportedMode
    SupportedContentType = SupportedContentType

    handleFilesSubmittedFor(key, {data}) {
      console.debug(`call handleFilesSubmittedFor`)
      this.$store.dispatch('multimediaUpload/uploadFiles', {...data, key})
    }

    handleFileSuccessFor(key, langId, event) {
      const {data: {file, json}} = event
      //@ts-ignore
      const {uuid: jsKey} = this.block
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
        created_at
      }

      this.resource_setOrCreateValueModeSpecific({
        //@ts-ignore
        resourceId: this.resource.uuid,
        filter: {languageId: langId, contentType: SupportedContentType.AUDIO, modes: [SupportedMode.IVR]},
        value: description,
      })
      event.target.blur() // remove the focus from the `upload` Tab
      this.pushAudioIntoLibrary(uploadedAudio)
    }

    findAudioResourceVariantFor(resource, filter) {
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
    @Getter isFeatureAudioUploadEnabled

    @Mutation pushAudioIntoLibrary

    @flowVuexNamespace.Action resource_setOrCreateValueModeSpecific
  }

  export default ResourceEditor
</script>
