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

<template>
  <form class="batch-match-audio-files-prompt alert alert-info form-horizontal">
    <h4>{{'trees.auto-link-audio-files' | trans}}</h4>

    <p v-if="data.isFailure" class="alert alert-danger">
      <strong><i class="glyphicon glyphicon-exclamation-sign"></i> {{'trees.failed-finding-matches' | trans}}</strong>
      {{'trees.heres-what-we-know' | trans}} <em>{{data.message || 'An unknown error occurred.'}}</em>.
    </p>

    <p v-if="isAudioLibraryEmpty" class="alert alert-warning">
      <strong><i class="glyphicon glyphicon-exclamation-sign"></i> {{'trees.empty-audio-library' | trans}}</strong>
      {{'trees.we-need-audio-files-previously-uploaded-to-audio-lib-to-match-to-blocks' | trans}}
      {{'trees.upload-audio-files-to-X' | trans}} <a href="/audiofiles/new/multi">{{'trees.your-orgs-audio-library' | trans}}</a>.
    </p>

    <fieldset :disabled="disabled">
      <div class="form-group">
        <label for="resource-viewer-batch-match-audio-pattern" class="col-sm-3 control-label">
          {{'trees.audio-file-naming-pattern' | trans}}
        </label>
        <div class="col-sm-6"
             :class="{
    	          'has-warning': pattern.length && !isValid,
    	          'has-error': data.isEmpty && data.isComplete}">
          <input type="text"
                 class="form-control"
                 placeholder="[label]_example tree_[language]"
                 id="resource-viewer-batch-match-audio-pattern"
                 v-model="pattern"
                 v-focus="focus">

          <span v-if="pattern.length && !isValid" class="help-block">
            <strong><i class="glyphicon glyphicon-warning-sign"></i> {{'trees.invalid-pattern' | trans}}</strong>
            {{'trees.at-minimum-we-need-two-placeholders' | trans}} <em>[label]</em>, <em>[language]</em>.
          </span>

          <span v-if="data.isEmpty && data.isComplete" class="help-block">
            <strong><i class="glyphicon glyphicon-exclamation-sign"></i> {{'trees.no-matches-found' | trans}}</strong>
            {{'trees.we-didnt-find-any-matches-revisit-pattern' | trans}}
          </span>

          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="replaceExisting"> {{'trees.replace-existing-audio-files-on-blocks' | trans}}
            </label>
          </div>
        </div>
      </div>
    </fieldset>

    <h5>{{'trees.examples' | trans}}</h5>
    <ul>
      <li>
        <em>[label]_example tree_[language]</em>
        {{'trees.X-will-match-with-Y' | trans({pattern: '', name: ''})}}
        <em>M1A_example tree_EN.mp3</em>, {{'trees.or' | trans}}
        <em>introduction_M1A_example tree_EN.mp3</em>
      </li>
      <li>
        <em>[label]_example tree_[language]</em>
        <u>{{'trees.X-wont-match-with-Y' | trans({pattern: '', name: ''})}}</u>
        <em>tree_M1A_EN.mp3</em> {{'trees.or' | trans}}
        <em>M1A_introduction_example tree_EN.mp3</em>
      </li>
    </ul>

    <template v-if="expanded">
      <h5>
        {{'trees.three-components-used-to-create-assignment-rules-and-name-audio-files' | trans}}
      </h5>

      <table class="table table-striped table-bordered">
        <thead>
        <tr>
          <th>{{'trees.rule-components' | trans}}</th>
          <th>{{'trees.corresponding-audio-file-components-examples' | trans}}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>[label] {{'trees.X-assigned-to-a-block' | trans({label: ''})}}</td>
          <td>M1A</td>
        </tr>
        <tr>
          <td>[language] {{'trees.X-abbreviations-set-when-creating-tree' | trans({lang: ''})}}</td>
          <td>EN</td>
        </tr>
        <tr>
          <td>{{'trees.additional-designation-created-in-the-rule' | trans}}</td>
          <td>{{'trees.example-tree' | trans}}</td>
        </tr>
        </tbody>
      </table>

      <p>
        [label] {{'trees.and' | trans}} [language] {{'trees.X-are-required-placeholder-components-for-rule-but-additional-designation-optional' | trans({placeholders: ''})}}
        {{'trees.order-of-components-dont-matter-but-must-be-adjacent-one-another' | trans}}
        {{'trees.components-can-be-separated-by-symbols-but-not-required' | trans}}
        {{'trees.if-symbols-are-used-then-reflect-in-filename' | trans}}
      </p>
    </template>

    <hr>

    <fieldset class="text-right btn-toolbar"
              :disabled="disabled">
      <button class="btn btn-link"
              @click.prevent="cancel">Cancel
      </button>

      <button class="btn btn-default"
              :class="{active: expanded}"
              @click.prevent="toggleExpanded">
        <span>{{'trees.tell-me-more' | trans}}&hellip;</span>
        <i class="glyphicon"
           :class="{
                 'glyphicon-chevron-down': !expanded,
                 'glyphicon-chevron-up': expanded}"></i>
      </button>

      <button class="btn btn-primary"
              :disabled="!isValid"
              @click.prevent="confirm">
        <i class="glyphicon glyphicon-ok"></i>
        {{'trees.find-matches' | trans}}
      </button>
    </fieldset>
  </form>
</template>

<script>
  import lang from '@/lib/filters/lang'
  import lodash from 'lodash'
	import VueFocus from 'vue-focus'

	export default {
		props: ['focus', 'data', 'isAudioLibraryEmpty'],
		mixins: [lang, VueFocus.mixin],

		data() {
			return {
				pattern: '',
				replaceExisting: true,
				expanded: false
			}
		},

    computed: {
			disabled() {
				return this.data.isPending
      },

      isValid() {
				return lodash.includes(this.pattern, '[label]')
            && lodash.includes(this.pattern, '[language]')
      }
    },

		methods: {
			cancel() {
				this.$emit('cancel')
			},

			confirm() {
				this.$emit('confirm', {
					value: this.pattern,
					replaceExisting: this.replaceExisting
				})
			},

			toggleExpanded() {
				this.expanded = !this.expanded
			}
		}
	}
</script>
