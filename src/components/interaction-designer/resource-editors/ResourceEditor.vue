<template>
  <div class="resource-editor" v-if="flow.languages.length > 0">
    <hr>

    <h4 v-if="label">
      {{ label }}
    </h4>

    <div>
      <b-tabs>
        <b-tab
          v-for="({id: languageId, label: language}, langIndex) in flow.languages"
          :key="languageId"
          :title="language || 'flow-builder.unknown-language' | trans">
          <div
            v-for="(mode, modeIndex) in flow.supported_modes"
            :key="modeIndex"
            class="tab-content-style">
            <header class="d-flex">
              <font-awesome-icon
                v-if="iconsMap.get(mode)"
                :icon="iconsMap.get(mode)"
                :class="{'custom-icons': iconsMap.get(mode)[0] === 'fac', 'library-icons': iconsMap.get(mode)[0] !== 'fac'}" />
              <h6 class="ml-1">{{ `flow-builder.${mode.toLowerCase()}-content` | trans }}</h6>
            </header>

            <template v-for="contentType in discoverContentTypesFor(mode)">
              <!-- todo: it's odd that we pass around a ContentType variant rather than a ContentTypeLangMode variant (aka, mode as external arg) -->

              <resource-variant-text-editor
                v-if="contentType === SupportedContentType.TEXT"
                :index="computeResourceIndex(langIndex, modeIndex)"
                :resource-id="resource.uuid"
                :resource-variant="findOrGenerateStubbedVariantOn(
                  resource,
                  {language_id: languageId, content_type: contentType, modes: [mode]})"
                :mode="mode"
                :enable-autogen-button="true || enableAutogenButton" />

              <div v-if="contentType === SupportedContentType.AUDIO">
                <validation-message
                  #input-control="{ isValid }"
                  :message-key="`resource/${resource.uuid}/values/${computeResourceIndex(langIndex, modeIndex)}/value`">
                  <audio-library-selector
                    :audio-files="availableAudio"
                    :lang-id="languageId"
                    :resource-id="resource.uuid"
                    :selected-audio-file="findOrGenerateStubbedVariantOn(
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
                        token: `${block.uuid}${languageId}`,
                        accept: 'audio/*'}"
                      class="btn btn-primary ivr-buttons"
                      @filesSubmitted="handleFilesSubmittedFor(`${block.uuid}:${languageId}`, $event)"
                      @fileSuccess="handleFileSuccessFor(`${block.uuid}:${languageId}`, languageId, $event)">
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
import {ValidationException} from '@floip/flow-runner/src/domain/exceptions/ValidationException'
import {ILanguage} from '@floip/flow-runner/dist/flow-spec/ILanguage'
import {mixins} from 'vue-class-component'
import {TabsPlugin} from 'bootstrap-vue'

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

@Component({})
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

  iconsMap = new Map<string, object>([
    [SupportedMode.SMS, ['far', 'envelope']],
    [SupportedMode.TEXT, ['fac', 'text']],
    [SupportedMode.USSD, ['fac', 'ussd']],
    [SupportedMode.IVR, ['fac', 'audio']],
    [SupportedMode.RICH_MESSAGING, ['far', 'comment-dots']],
    [SupportedMode.OFFLINE, ['fas', 'mobile-alt']],
  ])

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
      flow: this.activeFlow,
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

  /**
   * Compute resource index (cell index) for a table having X languages and Y modes
   *
   * @param langIndex
   * @param modeIndex
   */
  computeResourceIndex(langIndex: number, modeIndex: number): number {
    return langIndex * this.flow.supported_modes.length + modeIndex
  }

  @Getter availableAudio!: IAudioFile[]

  @Getter isFeatureAudioUploadEnabled!: boolean

  @Mutation pushAudioIntoLibrary!: (audio: IAudioFile) => void

  @flowVuexNamespace.Action resource_setOrCreateValueModeSpecific!: ({
    flow,
    resourceId,
    filter,
    value,
  }: { flow: IFlow, resourceId: IResource['uuid'], filter: IResourceDefinitionVariantOverModesWithOptionalValue, value: string }) => void
  @flowVuexNamespace.Getter activeFlow!: IFlow

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default ResourceEditor
</script>

<style scoped>
.tab-content-style {
  background: #F4F4F4;
  padding: 10px;
}
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
