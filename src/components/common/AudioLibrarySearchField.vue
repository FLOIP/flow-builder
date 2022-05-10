<template>
  <div class="audio-library-search-field dropdown">
    <div class="input-group">
      <input
        v-model="rawQuery"
        type="text"
        :placeholder="'flow-builder.search-audio-library' | trans"
        :disabled="isEntireLibraryModeEnabled"
        class="form-control"
        @focus="activate"
        @blur="deactivate"
        @input="resetPagination">

      <span class="input-group-append">
        <button
          :class="{active: isEntireLibraryModeEnabled}"
          class="btn btn-primary dropdown-toggle"
          @click.prevent="toggleAudioLibrary">
          <i class="glyphicon glyphicon-search" />
        </button>
      </span>
    </div>

    <div
      v-if="query || isAudioLibraryEmpty || isEntireLibraryModeEnabled"
      class="dropdown-menu">
      <template v-if="isEntireLibraryModeEnabled">
        <a
          href="#"
          class="disabled dropdown-item"
          @click.prevent="">
          <button
            class="close active"
            @click="toggleAudioLibrary">x
          </button>

          <i class="glyphicon glyphicon-info-sign" />
          {{ 'flow-builder.showing-entire-audio-library'|trans }}&hellip;
        </a>
        <div
          role="separator"
          class="dropdown-divider" />
      </template>

      <template v-if="!isAudioLibraryEmpty">
        <a
          v-for="audio in search(query).slice(offset * limit, (offset + 1) * limit)"
          class="dropdown-item"
          href="#"
          @click.prevent="select(audio)">
          {{ audio.description }}
        </a>
        <a
          v-if="query.length >= 3 && !search(query).length"
          class="disabled dropdown-item"
          href="#"
          @click.prevent="">
          {{ 'flow-builder.no-audio-files-found-for-X' | trans }} "<em>{{ query }}</em>".
        </a>
        <a
          v-if="query && query.length < 3"
          class="disabled dropdown-item"
          href="#"
          @click.prevent="">
          {{ 'flow-builder.enter-at-least-three-chars' | trans }}
        </a>

        <template v-if="hasPrevious || hasNext">
          <div
            role="separator"
            class="dropdown-divider" />

          <div class="pagers dropdown-item">
            <a
              href="#"
              :class="{disabled: !hasPrevious}"
              class="col-md-6"
              @click.prevent="decrementPage">
              <i class="glyphicon glyphicon-chevron-left" />
              {{ 'flow-builder.previous' | trans }}
            </a>

            <a
              href="#"
              :class="{disabled: !hasNext}"
              class="col-md-6 text-right"
              @click.prevent="incrementPage">
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
        @click.prevent="">
        <i class="glyphicon glyphicon-warning-sign" />
        {{ 'flow-builder.audio-lib-empty-for-this-org' | trans }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Fuse from 'fuse.js'
import {trim} from 'lodash'
import VueFocus from 'vue-focus'
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import Lang from '@/lib/filters/lang'

@Component({})
export class AudioLibrarySearchField extends mixins(Lang, VueFocus.mixin) {
  @Prop() readonly langId: any
  @Prop() readonly audioFiles: any

  isActive = false

  // querying
  rawQuery = ''
  cache: Record<string, any> = {}
  isEntireLibraryModeEnabled = false

  // pagination
  offset = 0
  limit = 10

  get query(): string {
    return trim(this.rawQuery)
  }

  get isAudioLibraryEmpty(): boolean {
    return this.isActive && this.audioFiles.length === 0
  }

  get hasNext(): boolean {
    return (this.search(this.query).length / (this.offset + 1)) > this.limit
  }

  get hasPrevious(): boolean {
    return this.offset > 0
  }

  search(query: string): any {
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
    this.cache[query] = new Fuse(this.audioFiles, {keys, fieldNormWeight: 1}).search(query)
    return this.cache[query]
  }

  // TODO: Push pagination into isolated component
  incrementPage(): void {
    if (this.hasNext) {
      this.offset += 1
    }
  }

  decrementPage(): void {
    if (this.hasPrevious) {
      (this.offset -= 1)
    }
  }

  resetPagination(): void {
    this.offset = 0
  }

  toggleAudioLibrary(): void {
    this.isEntireLibraryModeEnabled = !this.isEntireLibraryModeEnabled
    this.resetPagination()
  }

  select(audio: any): void {
    this.$emit('select', {value: audio, langId: this.langId})
  }

  activate(): void {
    this.isActive = true
  }

  deactivate(): void {
    this.isActive = false
  }
}

export default AudioLibrarySearchField
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
