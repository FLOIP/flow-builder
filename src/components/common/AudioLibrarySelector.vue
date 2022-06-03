<template>
  <div class="audio-library-selector">
    <audio-library-selection
      v-if="selectedAudioFile"
      :audio-file="selectedAudioFile"
      :lang-id="langId"
      @clear="clearSelection" />

    <template v-else>
      <!-- todo: refactor audio-library-selection to use v-model's @input + :value -->
      <!-- <audio-library-selection
          v-for="audioFile in alternateSelections"
          :key="audioFile && audioFile.id"
          :audioFile="audioFile"
          :selectable="selectable"
          @select="selectAudioFile({value: audioFile, langId})" /> -->

      <!-- todo: refactor audio-library-search-field to use v-model's @input + :value -->
      <audio-library-search-field
        :lang-id="langId"
        :audio-files="audioFiles"
        @select="selectAudioFile" />
    </template>
  </div>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {isEmpty} from 'lodash'
import {IResource, SupportedContentType, SupportedMode} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'
import {IResourceValue as IResourceDefinitionVariantOverModes} from '@floip/flow-runner/dist/flow-spec/IResource'
import {IAudioFile} from '@/store/builder'
import {IAudioFileSelection} from '@/lib/types'

const flowNamespace = namespace('flow')

const EMPTY_RESOURCE_UUID: IResource['uuid'] = ''

@Component({})
export class AudioLibrarySelector extends mixins(Lang) {
  @Prop() alternateSelections: unknown
  @Prop() selectedAudioFile?: string
  @Prop() langId?: string
  @Prop() audioFiles?: IAudioFile[]
  @Prop() audioPlayerUrl?: string
  @Prop() resourceId?: string

  get selectable(): boolean {
    return !isEmpty(this.alternateSelections)
  }

  clearSelection(): void {
    this.resource_setOrCreateValueModeSpecific({
      resourceId: this.resourceId ?? EMPTY_RESOURCE_UUID,
      filter: {language_id: this.langId, content_type: SupportedContentType.AUDIO, modes: [SupportedMode.IVR]},
      value: '',
    })
  }

  selectAudioFile({value, langId}: IAudioFileSelection): void {
    this.resource_setOrCreateValueModeSpecific({
      resourceId: this.resourceId ?? EMPTY_RESOURCE_UUID,
      filter: {language_id: langId, content_type: SupportedContentType.AUDIO, modes: [SupportedMode.IVR]},
      value: value.description,
    })
  }

  @flowNamespace.Action resource_setOrCreateValueModeSpecific!: (data: {
    resourceId: string,
    filter: Partial<IResourceDefinitionVariantOverModes>,
    value: string,
  }) => void
}

export default AudioLibrarySelector
</script>
