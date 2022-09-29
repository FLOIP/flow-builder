<template>
  <div class="audio-library-selector">
    <audio-library-selection
      v-if="selectedAudioUri"
      :audio-file="selectedFile"
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

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import {mapActions, mapGetters} from 'vuex'
import {SupportedContentType, SupportedMode} from '@floip/flow-runner'

export const AudioLibrarySelector = {
  props: [
    'alternateSelections',
    'selectedAudioUri',
    'langId',
    'audioFiles',
    'isPlaying',
    'audioPlayerUrl',
    'resourceId',
  ],

  computed: {
    ...mapGetters(['availableAudiosByUri']),
    selectedFile() {
      return this.availableAudiosByUri[this.selectedAudioUri]
    },
  },

  methods: {
    ...mapActions('flow', [
      'resource_setOrCreateValueModeSpecific',
    ]),

    clearSelection() {
      this.resource_setOrCreateValueModeSpecific({
        resourceId: this.resourceId,
        filter: {language_id: this.langId, content_type: SupportedContentType.AUDIO, modes: [SupportedMode.IVR]},
        value: '',
      })
    },

    selectAudioFile({value, langId}) {
      this.resource_setOrCreateValueModeSpecific({
        resourceId: this.resourceId,
        filter: {language_id: langId, content_type: SupportedContentType.AUDIO, modes: [SupportedMode.IVR]},
        value: value.uri,
      })
      this.$emit('select')
    },
  },
}

export default AudioLibrarySelector
</script>
