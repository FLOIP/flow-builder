<template>
  <div class="audio-library-selector">
    <language-tag-selection v-if="selectedAudioFile"
                             :audioFile="selectedAudioFile"
                             :langId="langId"
                             @clear="clearSelection" />

    <template v-else>
      <audio-library-search-field
          :langId="langId"
          :audioFiles="audioFiles"
          @select="selectAudioFile" />
    </template>
  </div>
</template>

<script>
import lodash from 'lodash'
import { mapActions } from 'vuex'
import {
  SupportedContentType,
  SupportedMode,
} from '@floip/flow-runner'
import AudioLibrarySearchField from './AudioLibrarySearchField'
import LanguageTagSelection from './LanguageTagSelection'

export default {
  props: [
    'selectedAudioFile',
    'audioFiles',
  ],

  components: {
    AudioLibrarySearchField,
    LanguageTagSelection,
  },

  methods: {
    clearSelection() {
    },
    selectLanguageTag(languageTag) {
    },
  },
}
</script>
