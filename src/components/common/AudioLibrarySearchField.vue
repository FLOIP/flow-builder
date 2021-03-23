<template>
  <div class="audio-library-search-field dropdown">
    <div class="input-group">
      <span class="input-group-prepend">
        <button :class="{active: isEntireLibraryModeEnabled}"
                class="btn btn-outline-secondary dropdown-toggle"
                @click.prevent="toggleAudioLibrary">
          <i class="glyphicon glyphicon-search"></i>
        </button>
      </span>

      <label>
        <input v-model="rawQuery"
               @focus="activate"
               @blur="deactivate"
               @input="resetPagination"
               type="text"
               :placeholder="'flow-builder.search-audio-library' | trans"
               :disabled="isEntireLibraryModeEnabled"
               class="form-control">
      </label>
    </div>

    <div v-if="query || isAudioLibraryEmpty || isEntireLibraryModeEnabled" class="dropdown-menu">
      <template v-if="isEntireLibraryModeEnabled">
        <a @click.prevent="" href="#" class="disabled dropdown-item">
          <button @click="toggleAudioLibrary" class="close active">x</button>

          <i class="glyphicon glyphicon-info-sign"></i>
          {{'flow-builder.showing-entire-audio-library'|trans}}&hellip;
        </a>
        <div role="separator" class="dropdown-divider"></div>
      </template>

      <template v-if="!isAudioLibraryEmpty">
        <a class="dropdown-item"
           v-for="audio in search(query).slice(offset * limit, (offset + 1) * limit)"
           @click.prevent="select(audio)" href="#">
          {{audio.description}}
        </a>
        <a v-if="query.length >= 3 && !search(query).length" class="disabled dropdown-item" @click.prevent="" href="#">
          {{'flow-builder.no-audio-files-found-for-X' | trans}} "<em>{{query}}</em>".
        </a>
        <a v-if="query && query.length < 3" class="disabled dropdown-item" @click.prevent="" href="#">
          {{'flow-builder.enter-at-least-three-chars' | trans}}
        </a>

        <template v-if="hasPrevious || hasNext">
          <div role="separator" class="dropdown-divider"></div>

          <div class="pagers dropdown-item">
            <a @click.prevent="decrementPage" href="#" :class="{disabled: !hasPrevious}" class="col-md-6">
              <i class="glyphicon glyphicon-chevron-left"></i>
              {{'flow-builder.previous' | trans}}
            </a>

            <a @click.prevent="incrementPage" href="#" :class="{disabled: !hasNext}" class="col-md-6 text-right">
              {{'flow-builder.next' | trans}}
              <i class="glyphicon glyphicon-chevron-right"></i>
            </a>
          </div>
        </template>
      </template>

      <a v-if="isAudioLibraryEmpty" class="disabled dropdown-item" @click.prevent="" href="#">
        <i class="glyphicon glyphicon-warning-sign"></i>
        {{'flow-builder.audio-lib-empty-for-this-org' | trans}}
      </a>
    </div>
  </div>
</template>

<script>
import fuse from 'fuse.js'
import lodash from 'lodash'
import VueFocus from 'vue-focus'
import lang from '@/lib/filters/lang'

export default {
  props: ['langId', 'audioFiles'],
  mixins: [VueFocus.mixin, lang],

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
      return lodash.trim(this.rawQuery)
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
      return this.cache[query] = new fuse(this.audioFiles, {keys}).search(query)
    },

    // todo: push pagination into isolated component
    incrementPage() {
      this.hasNext && (this.offset += 1)
    },

    decrementPage() {
      this.hasPrevious && (this.offset -= 1)
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
