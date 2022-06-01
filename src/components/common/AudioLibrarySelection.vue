<template>
  <div
    class="audio-library-selection well well-sm"
    :data-audio-file-container-language="langId"
    :class="{
      'tree-audio-control-text-container-selectable': selectable,
      'tree-audio-control-text-container-selected': !selectable}">
    <button
      class="audio-library-selection-clear-selection btn-ghost pull-right"
      @click.prevent="clear">
      <i class="glyphicon glyphicon-remove" />
    </button>

    <div class="btn-group audio-library-selection-download-dropdown">
      <button
        type="button"
        class="btn btn-ghost dropdown-toggle"
        data-toggle="dropdown">
        <span
          class="glyphicon glyphicon-download-alt"
          aria-hidden="true" />
        <span class="caret" />
      </button>

      <div class="dropdown-menu dropdown-menu-right">
        <a
          class="dropdown-item"
          :href="audioFileUrl"
          target="_blank">
          {{ 'flow-builder.original-file' | trans }}
        </a>
      </div>
    </div>

    <p
      class="audio-file-description"
      :title="audioFileUrl">
      {{ audioFileDescription }}
    </p>

    <div class="btn-toolbar">
      <!--      <vue-audio :file="audioFileUrl"></vue-audio>-->

      <button
        v-if="selectable"
        class="btn btn-secondary btn-xs"
        @click.prevent="select">
        <i class="glyphicon glyphicon-ok" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import Lang from '@/lib/filters/lang'
import Moment from '@/lib/filters/moment'
import {IAudioFile} from '../interaction-designer/resource-editors'

@Component({})
export class AudioLibrarySelection extends mixins(Lang, Moment) {
  @Prop({type: Object, required: true}) audioFile!: IAudioFile
  @Prop() selectable?: boolean
  @Prop() langId?: string

  get audioFileUrl(): string {
    return this.audioFile?.uri
  }

  get audioFileDescription(): string {
    return this.audioFile?.description
  }

  select(): void {
    this.$emit('select')
  }

  clear(): void {
    this.$emit('clear')
  }
}

export default AudioLibrarySelection
</script>

<style lang="scss">
.btn-ghost {
  background: transparent;
  border: none;
}

.audio-library-selection {
  position: relative;
  background-color: transparent !important;
  background-image: none !important;
  border-color: #cccccc !important;

  .audio-library-selection-download-dropdown {
    position: absolute;
    right: 1.6em;
    top: 50%;
    margin-top: -8px;
    color: #888888;

    svg {
      vertical-align: middle;
    }
  }

  .audio-library-selection-clear-selection {
    margin-right: -7px;
  }

  .audio-file-description {
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 3px;
  }

  .vue-sound-wrapper {
    margin-bottom: 8px;
    margin-left: 1em;

    .vue-sound__player {
      .icon-play3, .icon-pause2 {
        font-size: 130%;
        color: #888888;
      }

      .icon-play3:hover, .icon-pause2:hover {
        color: black;
        text-decoration: none;
      }

      .icon-stop2, .icon-download, .icon-volume-high, .volume-toggle {
        display: none !important;
      }

      .vue-sound__playback-time-current, .vue-sound__playback-time-total, .vue-sound__playback-time-separator {
        font-size: 80%;
        color: #888888;
      }

      .vue-sound__playback-time-wrapper {
        text-align: center;
        width: 71% !important;
      }
    }
  }
}
</style>
