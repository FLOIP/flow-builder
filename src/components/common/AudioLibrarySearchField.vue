<template>
  <div class="audio-library-search-field dropdown">
    <div class="input-group">
      <span class="input-group-prepend">
        <button
          :class="{active: isEntireLibraryModeEnabled}"
          class="btn btn-outline-secondary dropdown-toggle"
          @click.prevent="toggleAudioLibrary"
        >
          <i class="glyphicon glyphicon-search" />
        </button>
      </span>

      <label>
        <input
          v-model="rawQuery"
          type="text"
          :placeholder="'flow-builder.search-audio-library' | trans"
          :disabled="isEntireLibraryModeEnabled"
          class="form-control"
          @focus="activate"
          @blur="deactivate"
          @input="resetPagination"
        >
      </label>
    </div>

    <div
      v-if="query || isAudioLibraryEmpty || isEntireLibraryModeEnabled"
      class="dropdown-menu"
    >
      <template v-if="isEntireLibraryModeEnabled">
        <a
          href="#"
          class="disabled dropdown-item"
          @click.prevent=""
        >
          <button
            class="close active"
            @click="toggleAudioLibrary"
          >x</button>

          <i class="glyphicon glyphicon-info-sign" />
          {{ 'flow-builder.showing-entire-audio-library'|trans }}&hellip;
        </a>
        <div
          role="separator"
          class="dropdown-divider"
        />
      </template>

      <template v-if="!isAudioLibraryEmpty">
        <a
          v-for="(audio, i) in search(query).slice(offset * limit, (offset + 1) * limit)"
          :key="i"
          class="dropdown-item"
          href="#"
          @click.prevent="select(audio)"
        >
          {{ audio.description }}
        </a>
        <a
          v-if="query.length >= 3 && !search(query).length"
          class="disabled dropdown-item"
          href="#"
          @click.prevent=""
        >
          {{ 'flow-builder.no-audio-files-found-for-X' | trans }} "<em>{{ query }}</em>".
        </a>
        <a
          v-if="query && query.length < 3"
          class="disabled dropdown-item"
          href="#"
          @click.prevent=""
        >
          {{ 'flow-builder.enter-at-least-three-chars' | trans }}
        </a>

        <template v-if="hasPrevious || hasNext">
          <div
            role="separator"
            class="dropdown-divider"
          />

          <div class="pagers dropdown-item">
            <a
              href="#"
              :class="{disabled: !hasPrevious}"
              class="col-md-6"
              @click.prevent="decrementPage"
            >
              <i class="glyphicon glyphicon-chevron-left" />
              {{ 'flow-builder.previous' | trans }}
            </a>

            <a
              href="#"
              :class="{disabled: !hasNext}"
              class="col-md-6 text-right"
              @click.prevent="incrementPage"
            >
              {{ 'flow-builder.next' | trans }}
              <i class="glyphicon glyphicon-chevron-right" />
            </a>
          </div>
        </template>
      </template>

      <a
        v-if="isAudioLibraryEmpty"
        class="disabled dropdown-item"
        href="#"
        @click.prevent=""
      >
        <i class="glyphicon glyphicon-warning-sign" />
        {{ 'flow-builder.audio-lib-empty-for-this-org' | trans }}
      </a>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import Fuse from 'fuse.js'
import {trim} from 'lodash'
import VueFocus from 'vue-focus'
import {lang} from '@/lib/filters/lang'

export default {
  mixins: [VueFocus.mixin, lang],
  props: ['langId', 'audioFiles'],

  data() {
    return {
      isActive: false,

      // querying
      rawQuery: '',
      cache: {},
      isEntireLibraryModeEnabled: false,

      // pagination
      offset: 0,
      limit: 10,
    }
  },

  computed: {
    query() {
      return trim(this.rawQuery)
    },

    isAudioLibraryEmpty() {
      return this.isActive && !this.audioFiles.length
    },

    hasNext() {
      return (this.search(this.query).length / (this.offset + 1)) > this.limit
    },

    hasPrevious() {
      return this.offset > 0
    },
  },

  methods: {
    search(query) {
      if (this.isEntireLibraryModeEnabled) {
        return this.audioFiles
      }

      if (query.length < 3) {
        return []
      }

      console.debug('flow-builder.ResourceViewer.AudioLibrarySearchField', 'searching', query)

      if (query in this.cache) {
        console.debug('flow-builder.ResourceViewer.AudioLibrarySearchField', 'cache hit', query)
        return this.cache[query]
      }

      console.debug('flow-builder.ResourceViewer.AudioLibrarySearchField', 'cache miss', query)

      const keys = ['filename', 'description']
      this.cache[query] = new Fuse(this.audioFiles, {keys}).search(query)
      return this.cache[query]
    },

    // todo: push pagination into isolated component
    incrementPage() {
      if (this.hasNext) {
        this.offset += 1
      }
    },

    decrementPage() {
      if (this.hasPrevious) {
        this.offset -= 1
      }
    },

    resetPagination() {
      this.offset = 0
    },

    toggleAudioLibrary() {
      this.isEntireLibraryModeEnabled = !this.isEntireLibraryModeEnabled
      this.resetPagination()
    },

    select(audio) {
      this.$emit('select', {value: audio, langId: this.langId})
    },

    activate() {
      this.isActive = true
    },

    deactivate() {
      this.isActive = false
    },
  },
}
</script>

<style lang="scss" scoped>
  .audio-library-search-field {
    &.dropdown {
      .dropdown-menu {
        display: block;
        min-width: 100%;

        > li.pagers > a {
          clear: none;
          margin-top: 0;
          margin-bottom: 0;
          padding-top: 0.5em;
          padding-bottom: 0.5em;

          &.disabled {
            text-decoration: none;
            background-color: transparent;
            background-image: none;
            filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
            cursor: not-allowed;
            color: #777777;
          }
        }
      }
    }
  }

  .close {
    pointer-events: auto;
  }
</style>
