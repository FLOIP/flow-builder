<template>
  <div
    class="well well-sm audio-library-selection"
    :data-audio-file-container-language="langId"
    :class="{
      'tree-audio-control-text-container-selectable': selectable,
      'tree-audio-control-text-container-selected': !selectable}"
  >
    <button
      class="audio-library-selection-clear-selection btn-ghost pull-right"
      @click.prevent="clear"
    >
      <i class="glyphicon glyphicon-remove" />
    </button>

    <div class="btn-group audio-library-selection-download-dropdown">
      <button
        type="button"
        class="btn btn-ghost dropdown-toggle"
        data-toggle="dropdown"
      >
        <span
          class="glyphicon glyphicon-download-alt"
          aria-hidden="true"
        />
        <span class="caret" />
      </button>

      <ul class="dropdown-menu dropdown-menu-right">
        <li>
          <a
            :href="audioFileUrl"
            target="_blank"
            class="tree-block-audio-files-download-original"
          >{{ 'flow-builder.original-file'|trans }}</a>
        </li>

        <!-- <li><a :href="`/audiofiles/download/${audioFile.filename}/ogg`" target="_blank" class="tree-block-audio-files-download-ogg">
        {{'flow-builder.download-X-format'|trans({kind: '.ogg'})}}</a></li>
        <li><a :href="`/audiofiles/download/${audioFile.filename}/ul`" target="_blank" class="tree-block-audio-files-download-ul">
        {{'flow-builder.download-X-format'|trans({kind: '.ul'})}}</a></li> -->
      </ul>
    </div>

    <p
      class="audio-file-description"
      :title="audioFileUrl"
    >
      {{ audioFileUrl }}
    </p>

    <div class="btn-toolbar">
      <!--      <vue-audio :file="audioFileUrl"></vue-audio>-->

      <button
        v-if="selectable"
        class="btn btn-secondary btn-xs"
        @click.prevent="select"
      >
        <i class="glyphicon glyphicon-ok" />
      </button>
    </div>
  </div>
</template>

<script>
import {lang} from '@/lib/filters/lang'
import momentFilters from '@/lib/filters/moment'

export default {

  mixins: [lang, momentFilters],
  props: ['audioFile', 'selected', 'selectable', 'langId'],

  computed: {
    audioFileUrl() {
      return this.audioFile
    },
  },

  methods: {
    select() {
      this.$emit('select')
    },

    clear() {
      this.$emit('clear')
    },
  },
}
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
          font-size:130%;
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
