<template>
  <div class="resource-editor">
    <hr />

    <h4 v-if="label">{{label}}</h4>

    <template v-for="{id: languageId, name: language} in flow.languages">
      <div class="block-content-editor-lang">
        <h5 class="label label-info">{{language || 'flow-builder.unknown-language' | trans}}</h5>
      </div>

      <template v-for="mode in flow.supportedModes">
        <h5>{{`flow-builder.${mode}-content` | trans}}</h5>

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
            <template v-if="true"><!-- TODO: check if !findAudioResourceVariantFor(langId, resource) + feature is enable -->
              <upload-monitor :uploadKey="`${block.uuid}:${languageId}`" />

              <ul class="nav nav-tabs">
                <li class="active">
                  <a @click.prevent="" href="#">{{'trees.library' | trans}}</a>
                </li>

<!--                <li v-if="isFeatureAudioUploadEnabled">&lt;!&ndash; TODO: fix can() and use the condition can(['edit-content', 'send-call-to-records'], true) && isFeatureAudioUploadEnabled&ndash;&gt;-->
<!--                  <a @click.prevent="triggerRecordViaPhoneFor(langId)" href="#">{{'trees.phone-recording' | trans}}</a>-->
<!--                </li>-->

                <li>
                  <a v-if="isFeatureAudioUploadEnabled"
                     v-flow-uploader="{
                      target: route('trees.resumeableAudioUpload'),
                      token: `${block.uuid}${languageId}`,
                      accept: 'audio/*'}"
                     href="#"
                     @filesSubmitted="handleFilesSubmittedFor(`${block.uuid}:${languageId}`, $event)"
                     @fileSuccess="handleFileSuccessFor(`${block.uuid}:${languageId}`, languageId, $event)"
                  >
<!--                    TODO: put these into the above <a> -->
                    {{'trees.upload' | trans}}
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
  import {discoverContentTypesFor, findOrGenerateStubbedVariantOn} from '@/store/flow/resource'
  import AudioLibrarySelector from '@/components/common/AudioLibrarySelector.vue'
  import UploadMonitor from '../block-editors/UploadMonitor.vue'

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
    SupportedMode = SupportedMode
    SupportedContentType = SupportedContentType

    debouncedSaveTree() {
      lodash.debounce(function () {
        this.$store.dispatch('attemptSaveTree')
      }, 500)
    }

    handleFilesSubmittedFor(key, {data}) {
      console.log(`call handleFilesSubmittedFor`)
      this.$store.dispatch('multimediaUpload/uploadFiles', {...data, key})
    }

    handleFileSuccessFor(key, langId, {data: {file, json}}) {
      console.log(`call handleFileSuccessFor`)
      const {uuid: jsKey} = this.block,
          {
            audio_file_id: id,
            audio_uuid: filename,
            created_at: {date: created_at},
            description,
            duration_seconds,
          } = JSON.parse(json)

      this.$store.commit('updateAudioFileFor', {jsKey, langId, value: {id, filename, created_at, description, duration_seconds}})
      this.$store.commit('updateReviewedStateFor', {jsKey, langId, value: false})
      this.debouncedSaveTree();
    }

    @Getter availableAudio!: IAudioFile[]
    @Getter isFeatureAudioUploadEnabled
  }

  export default ResourceEditor
</script>
