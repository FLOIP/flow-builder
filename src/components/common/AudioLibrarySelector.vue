<template>
  <div class="audio-library-selector">
    <audio-library-selection v-if="selectedAudioFile"
                             :audioFile="selectedAudioFile"
                             :langId="langId"
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
          :langId="langId"
          :audioFiles="audioFiles"
          @select="selectAudioFile" />
    </template>
  </div>
</template>

<script>
  import lodash from 'lodash'
  import {mapActions} from 'vuex'
  import {
    SupportedContentType,
    SupportedMode
  } from '@floip/flow-runner'
  import AudioLibrarySearchField from './AudioLibrarySearchField'
  import AudioLibrarySelection from './AudioLibrarySelection'

  export default {
    props: [
      'alternateSelections',
      'selectedAudioFile',
      'langId',
      'audioFiles',
      'isPlaying',
      'audioPlayerUrl',
      'resourceId'
    ],

    components: {
      AudioLibrarySearchField,
      AudioLibrarySelection,
    },

    computed: {
      selectable() {
        return !lodash.isEmpty(this.alternateSelections)
      }
    },

    methods: {
      ...mapActions('flow', ['resource_setOrCreateValueModeSpecific']),
      clearSelection() {
        this.resource_setOrCreateValueModeSpecific({
          resourceId: this.resourceId,
          filter: {languageId: this.langId, contentType: SupportedContentType.AUDIO, modes: [SupportedMode.IVR]},
          value: ''
        })
      },
      selectAudioFile({value, langId}) {
        this.resource_setOrCreateValueModeSpecific({
          resourceId: this.resourceId,
          filter: {languageId: langId, contentType: SupportedContentType.AUDIO, modes: [SupportedMode.IVR]},
          value: value.filename
        })
      },
    }
  }
</script>
