<template>
  <div class="horizontal-block-content-editor">
    <div class="list-group">
      <div
        v-for="langId in enabledLanguages"
        :key="langId"
        class="list-group-item"
        :class="{
          'list-group-item-success': block.customData.reviewed[langId],
          'has-success': block.customData.reviewed[langId]}">
        <div class="row">
          <div class="block-content-editor-lang col-md-1">
            <h6 class="badge badge-info">
              {{ languageNames[langId] || 'Unknown language' }}
            </h6>
          </div>

          <div
            v-if="tree.details.hasVoice"
            class="block-content-editor-audio col-md-4">
            <audio-library-selector
              :audio-files="audioFiles"
              :selected-audio-file="block.audioFiles[langId]"
              :lang-id="langId"
              :alternate-selections="alternateAudioFileSelections && alternateAudioFileSelections[langId]"
              @select="selectAudioFileFor"
              @clear="selectAudioFileFor" />
          </div>

          <block-text-content-editor-for-lang-and-type
            v-if="tree.details.hasSms"
            :is-editable="isEditable"
            :block="block"
            :lang-id="langId"
            :type="'sms'"
            class="col-md-2" />

          <block-text-content-editor-for-lang-and-type
            v-if="tree.details.hasUssd"
            :is-editable="isEditable"
            :block="block"
            :lang-id="langId"
            :type="'ussd'"
            class="col-md-2" />

          <block-text-content-editor-for-lang-and-type
            v-if="tree.details.hasClipboard"
            :is-editable="isEditable"
            :block="block"
            :lang-id="langId"
            :type="'clipboard'"
            :enable-autogen-button="false"
            class="col-md-2" />

          <div class="block-content-editor-reviewed col-md-1">
            <button
              class="btn btn-secondary btn-xl"
              :class="{
                active: block.customData.reviewed[langId],
                'btn-success': block.customData.reviewed[langId]}"
              @click="toggleReviewedStateFor(langId)">
              <i
                :class="{'text-muted': !block.customData.reviewed[langId]}"
                class="glyphicon glyphicon-thumbs-up" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import {Getter, State} from 'vuex-class'
import {debounce} from 'lodash'

import Lang from '@/lib/filters/lang'

@Component({})
export class HorizontalBlockContentEditor extends mixins(Lang) {
  @Prop() alternateAudioFileSelections: any
  @Prop() tree: any
  @Prop() block: any
  @Prop() enabledLanguages: any
  @Prop() blockTypes: any
  @Prop() languageNames: any

  @Getter isEditable!: boolean
  @State(({trees: {ui: {audioFiles}}}) => audioFiles) audioFiles: any

  debouncedSaveTree: () => void

  constructor() {
    super()

    this.debouncedSaveTree = debounce(() => {
      this.$store.dispatch('attemptSaveTree')
    }, 500)
  }

  selectAudioFileFor({langId, value}: {langId: string, value: boolean}): void {
    const {jsKey} = this.block
    this.$store.commit('updateAudioFileFor', {jsKey, langId, value})
    this.$store.commit('updateReviewedStateFor', {jsKey, langId, value: false})
    this.debouncedSaveTree()
  }

  toggleReviewedStateFor(langId: string): void {
    const previousVal = Boolean(this.block.customData.reviewed?.langId)
    this.$store.commit('updateReviewedStateFor', {jsKey: this.block.jsKey, langId, value: !previousVal})
    this.debouncedSaveTree()
  }
}

export default HorizontalBlockContentEditor
</script>

<style lang="scss" scoped>
.horizontal-block-content-editor {
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
