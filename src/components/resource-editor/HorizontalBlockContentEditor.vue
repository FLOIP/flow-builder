<style lang="scss" scoped>
  .block-content-editor {
    transition: all 200ms ease-in-out;
    background: #fff;
    border-top: 1px solid #eee;
    padding: 0.5em;
    padding-top: 1em;

    > .list-group > .list-group-item {
      transition: all 200ms ease-in-out;

      &:not(.list-group-item-success) {
        background: #f6f6f6;
      }
    }

    & &-reviewed {
      text-align: center;
      font-size: 3em;
      cursor: pointer;
    }
  }
</style>

<template>
  <div class="block-content-editor">
    <div class="list-group">
      <div class="list-group-item"
           v-for="langId in enabledLanguages"
           :class="{
              'list-group-item-success': block.customData.reviewed[langId],
              'has-success': block.customData.reviewed[langId]}">
        <div class="row">
          <div class="block-content-editor-lang col-md-1">
            <h5>{{languageNames[langId] || 'Unknown language'}}</h5>
          </div>

          <div v-if="tree.details.hasVoice" class="block-content-editor-audio col-md-4">
            <audio-library-selector
                :audioFiles="audioFiles"
                :selectedAudioFile="block.audioFiles[langId]"
                :langId="langId"
                :alternateSelections="alternateAudioFileSelections && alternateAudioFileSelections[langId]"
                @select="selectAudioFileFor"
                @clear="selectAudioFileFor" />
          </div>

          <block-text-content-editor-for-lang-and-type
              v-if="tree.details.hasSms"
              :isEditable="isEditable"
              :block="block"
              :langId="langId"
              :type="'sms'"
              class="col-md-2" />

          <block-text-content-editor-for-lang-and-type
              v-if="tree.details.hasUssd"
              :isEditable="isEditable"
              :block="block"
              :langId="langId"
              :type="'ussd'"
              class="col-md-2" />

          <block-text-content-editor-for-lang-and-type
              v-if="tree.details.hasClipboard"
              :isEditable="isEditable"
              :block="block"
              :langId="langId"
              :type="'clipboard'"
              :enableAutogenButton="false"
              class="col-md-2" />

          <div class="block-content-editor-reviewed col-md-1">
            <button class="btn btn-default btn-xl"
                    :class="{
                      active: block.customData.reviewed[langId],
                      'btn-success': block.customData.reviewed[langId]}"
                    @click="toggleReviewedStateFor(langId)">
              <i :class="{'text-muted': !block.customData.reviewed[langId]}"
                 class="glyphicon glyphicon-thumbs-up"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import lang from 'lib/filters/lang'
	import lodash from 'lodash'
  import {mapGetters, mapState} from 'vuex'
	import AudioLibrarySelector from '@/components/common/AudioLibrarySelector.vue'
	import BlockTextContentEditorForLangAndType from '../block-editors/BlockTextContentEditorForLangAndType'

	export default {
		props: [
			'alternateAudioFileSelections',
			'tree',
			'block',
			'enabledLanguages',
      'blockTypes',
			'languageNames'],

		components: {
			AudioLibrarySelector,
      BlockTextContentEditorForLangAndType,
		},

    mixins: [lang],

    computed: {
      ...mapGetters(['isEditable']),
      ...mapState({
        audioFiles: ({trees: {ui: {audioFiles}}}) => audioFiles
      }),
    },

		methods: {
			debouncedSaveTree: lodash.debounce(function () {
				this.$store.dispatch('attemptSaveTree')
			}, 500),

			selectAudioFileFor({langId, value}) {
				const {jsKey} = this.block
				this.$store.commit('updateAudioFileFor', {jsKey, langId, value})
				this.$store.commit('updateReviewedStateFor', {jsKey, langId, value: false})
				this.debouncedSaveTree();
			},

			toggleReviewedStateFor(langId) {
				const previousVal = !!lodash.get(this.block.customData.reviewed, langId, false)
				this.$store.commit('updateReviewedStateFor', {jsKey: this.block.jsKey, langId, value: !previousVal})
				this.debouncedSaveTree()
			}
		}
	}
</script>
