<template>
  <div class="audio-library-selector">
    <audio-library-selection v-if="selectedAudioFile"
                             :audioFile="selectedAudioFile"
                             @clear="clearSelection" />

    <template v-else>
      <!-- todo: refactor audio-library-selection to use v-model's @input + :value -->
      <audio-library-selection
          v-for="audioFile in alternateSelections"
          :key="audioFile && audioFile.id"
          :audioFile="audioFile"
          :selectable="selectable"
          @select="selectAudioFile({value: audioFile, langId})" />

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
	import AudioLibrarySearchField from './AudioLibrarySearchField'
	import AudioLibrarySelection from './AudioLibrarySelection'

	export default {
    props: [
      'alternateSelections',
      'selectedAudioFile',
      'langId',
      'audioFiles',
      'isPlaying',
      'audioPlayerUrl'],

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
			clearSelection() {
				this.$emit('clear', {value: null, langId: this.langId})
			},

			selectAudioFile({value, langId}) {
				this.$emit('select', {value, langId})
			}
		}
	}
</script>
