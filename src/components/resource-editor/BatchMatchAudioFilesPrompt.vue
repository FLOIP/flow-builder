<template>
  <form class="batch-match-audio-files-prompt alert alert-info form-horizontal">
    <h4>{{ trans('flow-builder.auto-link-audio-files') }}</h4>

    <p
      v-if="data.isFailure"
      class="alert alert-danger">
      <strong><i class="glyphicon glyphicon-exclamation-sign" /> {{ trans('flow-builder.failed-finding-matches') }}</strong>
      {{ trans('flow-builder.heres-what-we-know') }} <em>{{ data.message || 'flow-builder.unknown-error-occurred' }}</em>.
    </p>

    <p
      v-if="isAudioLibraryEmpty"
      class="alert alert-warning">
      <strong><i class="glyphicon glyphicon-exclamation-sign" /> {{ trans('flow-builder.empty-audio-library') }}</strong>
      {{ trans('flow-builder.we-need-audio-files-previously-uploaded-to-audio-lib-to-match-to-blocks') }}
      {{ trans('flow-builder.upload-audio-files-to-X') }} <a
        href="/audiofiles/new/multi">{{ trans('flow-builder.your-orgs-audio-library') }}</a>.
    </p>

    <fieldset :disabled="disabled">
      <div class="form-group">
        <label
          for="resource-viewer-batch-match-audio-pattern"
          class="col-sm-3 control-label">
          {{ trans('flow-builder.audio-file-naming-pattern') }}
        </label>
        <div
          class="col-sm-6"
          :class="{
            'has-warning': pattern.length && !isValid,
            'has-error': data.isEmpty && data.isComplete}">
          <input
            id="resource-viewer-batch-match-audio-pattern"
            v-model="pattern"
            v-focus="focus"
            type="text"
            class="form-control"
            placeholder="[label]_example tree_[language]">

          <span
            v-if="pattern.length && !isValid"
            class="help-block">
            <strong><i class="glyphicon glyphicon-warning-sign" /> {{ trans('flow-builder.invalid-pattern') }}</strong>
            {{ trans('flow-builder.at-minimum-we-need-two-placeholders') }} <em>[label]</em>, <em>[language]</em>.
          </span>

          <span
            v-if="data.isEmpty && data.isComplete"
            class="help-block">
            <strong><i class="glyphicon glyphicon-exclamation-sign" /> {{ trans('flow-builder.no-matches-found') }}</strong>
            {{ trans('flow-builder.we-didnt-find-any-matches-revisit-pattern') }}
          </span>

          <div class="checkbox">
            <label>
              <input
                v-model="replaceExisting"
                type="checkbox"> {{ trans('flow-builder.replace-existing-audio-files-on-blocks') }}
            </label>
          </div>
        </div>
      </div>
    </fieldset>

    <h5>{{ trans('flow-builder.examples') }}</h5>
    <ul>
      <li>
        <em>[label]_example tree_[language]</em>
        {{ trans('flow-builder.X-will-match-with-Y', {pattern: '', name: ''}) }}
        <em>M1A_example tree_EN.mp3</em>, {{ trans('flow-builder.or') }}
        <em>introduction_M1A_example tree_EN.mp3</em>
      </li>
      <li>
        <em>[label]_example tree_[language]</em>
        <u>{{ trans('flow-builder.X-wont-match-with-Y', ({pattern: '', name: ''})) }}</u>
        <em>tree_M1A_EN.mp3</em> {{ trans('flow-builder.or') }}
        <em>M1A_introduction_example tree_EN.mp3</em>
      </li>
    </ul>

    <template v-if="expanded">
      <h5>
        {{ trans('flow-builder.three-components-used-to-create-assignment-rules-and-name-audio-files') }}
      </h5>

      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>{{ trans('flow-builder.rule-components', ) }}</th>
            <th>{{ trans('flow-builder.corresponding-audio-file-components-examples') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>[label] {{ trans('flow-builder.X-assigned-to-a-block', {label: ''}) }}</td>
            <td>M1A</td>
          </tr>
          <tr>
            <td>[language] {{ trans('flow-builder.X-abbreviations-set-when-creating-tree', {lang: ''}) }}</td>
            <td>EN</td>
          </tr>
          <tr>
            <td>{{ trans('flow-builder.additional-designation-created-in-the-rule') }}</td>
            <td>{{ trans('flow-builder.example-tree') }}</td>
          </tr>
        </tbody>
      </table>

      <p>
        [label] {{ trans('flow-builder.and', ) }} [language]
        {{ trans('flow-builder.X-are-required-placeholder-components-for-rule-but-additional-designation-optional', {placeholders: ''}) }}
        {{ trans('flow-builder.order-of-components-dont-matter-but-must-be-adjacent-one-another') }}
        {{ trans('flow-builder.components-can-be-separated-by-symbols-but-not-required') }}
        {{ trans('flow-builder.if-symbols-are-used-then-reflect-in-filename') }}
      </p>
    </template>

    <hr>

    <fieldset
      class="text-right btn-toolbar"
      :disabled="disabled">
      <button
        class="btn btn-link"
        @click.prevent="cancel">
        Cancel
      </button>

      <button
        class="btn btn-secondary"
        :class="{active: expanded}"
        @click.prevent="toggleExpanded">
        <span>{{ trans('flow-builder.tell-me-more') }}&hellip;</span>
        <i
          class="glyphicon"
          :class="{
            'glyphicon-chevron-down': !expanded,
            'glyphicon-chevron-up': expanded}" />
      </button>

      <button
        class="btn btn-primary"
        :disabled="!isValid"
        @click.prevent="confirm">
        <i class="glyphicon glyphicon-ok" />
        {{ trans('flow-builder.find-matches') }}
      </button>
    </fieldset>
  </form>
</template>

<script lang="ts">
import {includes} from 'lodash'
import {mixins, Options} from 'vue-class-component'
// import VueFocus from 'vue-focus'
import {Prop} from 'vue-property-decorator'
import {Lang} from '@/lib/filters/lang'
// import {IBatchMatchAudioData} from '@/lib/types'

@Options({})
export class BatchMatchAudioFilesPrompt extends mixins(Lang) {
  @Prop({type: Boolean, required: true}) readonly focus!: boolean
  @Prop({type: Object, required: true}) readonly data!: any
  @Prop() readonly isAudioLibraryEmpty?: boolean

  pattern = ''
  replaceExisting = true
  expanded = false

  get disabled(): boolean {
    return this.data.isPending
  }

  get isValid(): boolean {
    return includes(this.pattern, '[label]')
      && includes(this.pattern, '[language]')
  }

  cancel(): void {
    this.$emit('cancel')
  }

  confirm(): void {
    this.$emit('confirm', {
      value: this.pattern,
      replaceExisting: this.replaceExisting,
    })
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded
  }
}

export default BatchMatchAudioFilesPrompt
</script>

<style lang="scss" scoped>
.batch-match-audio-files-prompt {
  > p, > ul {
    margin-bottom: 10px;
  }

  table {
    background: white;
  }
}
</style>
