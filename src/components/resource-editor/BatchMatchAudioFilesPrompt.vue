<template>
  <form class="batch-match-audio-files-prompt alert alert-info form-horizontal">
    <h4>{{ 'flow-builder.auto-link-audio-files' | trans }}</h4>

    <p
      v-if="data.isFailure"
      class="alert alert-danger">
      <strong><i class="glyphicon glyphicon-exclamation-sign" /> {{ 'flow-builder.failed-finding-matches' | trans }}</strong>
      {{ 'flow-builder.heres-what-we-know' | trans }} <em>{{ data.message || 'flow-builder.unknown-error-occurred' }}</em>.
    </p>

    <p
      v-if="isAudioLibraryEmpty"
      class="alert alert-warning">
      <strong><i class="glyphicon glyphicon-exclamation-sign" /> {{ 'flow-builder.empty-audio-library' | trans }}</strong>
      {{ 'flow-builder.we-need-audio-files-previously-uploaded-to-audio-lib-to-match-to-blocks' | trans }}
      {{ 'flow-builder.upload-audio-files-to-X' | trans }} <a
        href="/audiofiles/new/multi">{{ 'flow-builder.your-orgs-audio-library' | trans }}</a>.
    </p>

    <fieldset :disabled="disabled">
      <div class="form-group">
        <label
          for="resource-viewer-batch-match-audio-pattern"
          class="col-sm-3 control-label">
          {{ 'flow-builder.audio-file-naming-pattern' | trans }}
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
            <strong><i class="glyphicon glyphicon-warning-sign" /> {{ 'flow-builder.invalid-pattern' | trans }}</strong>
            {{ 'flow-builder.at-minimum-we-need-two-placeholders' | trans }} <em>[label]</em>, <em>[language]</em>.
          </span>

          <span
            v-if="data.isEmpty && data.isComplete"
            class="help-block">
            <strong><i class="glyphicon glyphicon-exclamation-sign" /> {{ 'flow-builder.no-matches-found' | trans }}</strong>
            {{ 'flow-builder.we-didnt-find-any-matches-revisit-pattern' | trans }}
          </span>

          <div class="checkbox">
            <label>
              <input
                v-model="replaceExisting"
                type="checkbox"> {{ 'flow-builder.replace-existing-audio-files-on-blocks' | trans }}
            </label>
          </div>
        </div>
      </div>
    </fieldset>

    <h5>{{ 'flow-builder.examples' | trans }}</h5>
    <ul>
      <li>
        <em>[label]_example tree_[language]</em>
        {{ 'flow-builder.X-will-match-with-Y' | trans({pattern: '', name: ''}) }}
        <em>M1A_example tree_EN.mp3</em>, {{ 'flow-builder.or' | trans }}
        <em>introduction_M1A_example tree_EN.mp3</em>
      </li>
      <li>
        <em>[label]_example tree_[language]</em>
        <u>{{ 'flow-builder.X-wont-match-with-Y' | trans({pattern: '', name: ''}) }}</u>
        <em>tree_M1A_EN.mp3</em> {{ 'flow-builder.or' | trans }}
        <em>M1A_introduction_example tree_EN.mp3</em>
      </li>
    </ul>

    <template v-if="expanded">
      <h5>
        {{ 'flow-builder.three-components-used-to-create-assignment-rules-and-name-audio-files' | trans }}
      </h5>

      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>{{ 'flow-builder.rule-components' | trans }}</th>
            <th>{{ 'flow-builder.corresponding-audio-file-components-examples' | trans }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>[label] {{ 'flow-builder.X-assigned-to-a-block' | trans({label: ''}) }}</td>
            <td>M1A</td>
          </tr>
          <tr>
            <td>[language] {{ 'flow-builder.X-abbreviations-set-when-creating-tree' | trans({lang: ''}) }}</td>
            <td>EN</td>
          </tr>
          <tr>
            <td>{{ 'flow-builder.additional-designation-created-in-the-rule' | trans }}</td>
            <td>{{ 'flow-builder.example-tree' | trans }}</td>
          </tr>
        </tbody>
      </table>

      <p>
        [label] {{ 'flow-builder.and' | trans }} [language]
        {{ 'flow-builder.X-are-required-placeholder-components-for-rule-but-additional-designation-optional' | trans({placeholders: ''}) }}
        {{ 'flow-builder.order-of-components-dont-matter-but-must-be-adjacent-one-another' | trans }}
        {{ 'flow-builder.components-can-be-separated-by-symbols-but-not-required' | trans }}
        {{ 'flow-builder.if-symbols-are-used-then-reflect-in-filename' | trans }}
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
        <span>{{ 'flow-builder.tell-me-more' | trans }}&hellip;</span>
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
        {{ 'flow-builder.find-matches' | trans }}
      </button>
    </fieldset>
  </form>
</template>

<script lang="ts">
import {includes} from 'lodash'
import {mixins} from 'vue-class-component'
import VueFocus from 'vue-focus'
import {Component, Prop} from 'vue-property-decorator'
import Lang from '@/lib/filters/lang'
import {IBatchMatchAudioData} from '@/lib/types'

@Component({})
export class BatchMatchAudioFilesPrompt extends mixins(Lang, VueFocus.mixin) {
  @Prop({type: Boolean, required: true}) readonly focus!: boolean
  @Prop({type: Object, required: true}) readonly data!: IBatchMatchAudioData
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
