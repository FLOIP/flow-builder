<style lang="scss" scoped>
  .resource-viewer {
    .block-content-filter {
      margin-top: 5px;
      padding-right: 15px;
    }

    .block-content-filter-warning {
      margin-left: 1em;
      margin-right: 1em;
    }

    .label {
      transition: all 200ms ease-in-out;

      .small, small {
        color: inherit !important;
      }
    }

    .tree-block-container {
      min-height: 0;
      padding-bottom: 0;
    }
  }
</style>

<template>
  <div class="resource-viewer panel panel-default">
    <div class="panel-heading resource-viewer-panel-heading">
      <div class="btn-toolbar">
        <div class="btn-group">
          <router-link :to="`/trees/${id}/interaction-designer`" @click.native="handleTreeEditorSelected" class="btn btn-secondary">
            {{'trees.tree-view' | trans}}
          </router-link>
          <router-link :to="`/trees/${id}/resource-viewer`" class="btn btn-secondary active">{{'trees.resource-view' | trans}}</router-link>
        </div>

        <button
            v-if="isFeatureTreesBatchLinkAudioEnabled"
            class="btn btn-secondary"
            :class="{active: batchMatchAudioDialogShown}"
            @click="toggleBatchMatchAudioDialog">
          <i class="glyphicon glyphicon-random"></i>
          &nbsp;{{'trees.auto-link-audio-files' | trans}}
          <i v-if="batchMatchAudioDialogShown" class="glyphicon glyphicon-chevron-up"></i>
          <i v-else class="glyphicon glyphicon-chevron-down"></i>
        </button>

        <router-link v-if="hasIssues"
                     :to="`/trees/${id}/interaction-designer`"
                     class="btn btn-warning">
          <i class="glyphicon glyphicon-info-sign"></i>
          {{'trees.view-issues' | trans}}
        </router-link>

        <button v-if="showEmptyBlocksOnly"
            @click="toggleShowEmptyBlocks"
            class="btn btn-info">
          <i class="fa fa-eye"></i>
          {{'trees.show-all' | trans}}
        </button>
        <button v-else
            @click="toggleShowEmptyBlocks"
            class="btn btn-warning">
          <i class="fa fa-eye-slash"></i>
          {{'trees.show-empty-only' | trans}}
        </button>
      </div>

      <template v-if="batchMatchAudioDialogShown && isFeatureTreesBatchLinkAudioEnabled">
        <hr>
        <batch-match-audio-files-prompt
            :focus="batchMatchAudioDialogShown"
            :data="batchMatchAudioData"
            :isAudioLibraryEmpty="isAudioLibraryEmpty"
            @cancel="toggleBatchMatchAudioDialog"
            @confirm="dispatchBatchMatchAudio"></batch-match-audio-files-prompt>
      </template>
    </div>

    <div class="panel-body resource-viewer-contents">
      <div class="row h4">
        <div class="col-md-9">
          <ul class="nav nav-pills">
            <li class="disabled">
              <a href="#" @click.prevent="">
                {{percentagePiecesWithContent}}%
                <small>{{'trees.X-of-resources-populated' | trans({count: ''})}}</small>
              </a>
            </li>
            <li v-if="tree.details.hasVoice">
              <a href="#" @click.prevent="">
                <span class="label"
                      :class="{
                          'label-warning': totalPiecesOfBlockContentWithVoice !== totalPiecesOfBlockContent,
                          'label-success': totalPiecesOfBlockContentWithVoice === totalPiecesOfBlockContent}">
                  {{'trees.voice' | trans}}
                  <!--<i class="glyphicon glyphicon-alert"></i>-->
                  {{totalPiecesOfBlockContentWithVoice}}
                  <small>/ {{totalPiecesOfBlockContent}}</small>
                </span>
              </a>
            </li>
            <li v-if="tree.details.hasSms">
              <a href="#" @click.prevent="">
                <span class="label"
                      :class="{
                          'label-warning': totalPiecesOfBlockContenWithSms !== totalPiecesOfBlockContent,
                          'label-success': totalPiecesOfBlockContenWithSms === totalPiecesOfBlockContent}">
                  {{'trees.sms' | trans}}
                  <!--<i class="glyphicon glyphicon-alert"></i>-->
                  {{totalPiecesOfBlockContenWithSms}}
                  <small>/ {{totalPiecesOfBlockContent}}</small>
                </span>
              </a>
            </li>
            <li v-if="tree.details.hasUssd">
              <a href="#" @click.prevent="">
                <span class="label"
                      :class="{
                          'label-warning': totalPiecesOfBlockContenWithUssd !== totalPiecesOfBlockContent,
                          'label-success': totalPiecesOfBlockContenWithUssd === totalPiecesOfBlockContent}">
                  {{'trees.ussd' | trans}}
                  <!--<i class="glyphicon glyphicon-alert"></i>-->
                  {{totalPiecesOfBlockContenWithUssd}}
                  <small>/ {{totalPiecesOfBlockContent}}</small>
                </span>
              </a>
            </li>
            <li>
              <a href="#" @click.prevent="">
                <span class="label"
                      :class="{
                          'label-warning': totalPiecesOfBlockContentReviewed !== totalPiecesOfBlockContent,
                          'label-success': totalPiecesOfBlockContentReviewed === totalPiecesOfBlockContent}">
                  Reviewed
                  <!--<i class="glyphicon glyphicon-alert"></i>-->
                  {{totalPiecesOfBlockContentReviewed}}
                  <small>/ {{totalPiecesOfBlockContent}}</small>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div class="col-md-3">
          <form class="block-content-filter">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="glyphicon glyphicon-search"></i>
              </div>
              <input class="form-control"
                     :placeholder="'trees.filter-block-content' | trans"
                     v-model="query">
            </div>
          </form>
        </div>
      </div>

      <div v-if="query.length >= 3" class="row">
        <div class="col-md-12">
          <p class="block-content-filter-warning alert alert-warning">
            <button class="close"
                    @click="clearSearch">&times;
            </button>
            <strong>{{'trees.filter-enabled' | trans}}</strong>
            &mdash; {{'trees.showing-block-content-filtered-by-X' | trans}} "<em>{{query}}</em>".
          </p>
        </div>
      </div>

      <div v-if="query.length && query.length < 3" class="row">
        <div class="col-md-12">
          <p class="block-content-filter-warning alert alert-warning">
            <button class="close"
                    @click="clearSearch">&times;
            </button>
            <strong>{{'trees.filter-validation' | trans}}</strong> &mdash; {{'trees.enter-at-least-three-chars-to-search' | trans}}
          </p>
        </div>
      </div>

      <div id="tree-workspace" class="tree-block-container">
        <!--<div class="row">-->
        <!--<div class="col-md-1">Lang</div>-->
        <!--<div class="col-md-4">Voice</div>-->
        <!--<div class="col-md-3">SMS</div>-->
        <!--<div class="col-md-3">USSD</div>-->
        <!--<div class="col-md-1">Reviewed?</div>-->
        <!--</div>-->

        <div v-if="!blocks.length" class="alert alert-info">
          <h4>
            <i class="glyphicon glyphicon-warning-sign"></i>
            <strong>{{'trees.no-blocks-for-content' | trans}}</strong>
            {{'trees.use-tree-view-to-add-blocks' | trans}}
          </h4>

          <div class="text-right">
            <router-link :to="`/trees/${id}/interaction-designer`" class="btn btn-primary">
              {{'trees.switch-to-tree-view-to-add-blocks' | trans}}
            </router-link>
          </div>
        </div>

        <div v-if="blocks.length && !blocksWithContent.length" class="alert alert-info">
          <h4>
            <i class="glyphicon glyphicon-warning-sign"></i>
            <strong>{{'trees.no-content-blocks' | trans}}</strong>
            {{'trees.no-content-blocks-to-populate-content-onto' | trans}}
            {{'trees.use-tree-view-to-add-blocks' | trans}}
          </h4>

          <div class="text-right">
            <router-link :to="`/trees/${id}/interaction-designer`" class="btn btn-primary">
              {{'trees.switch-to-tree-view-to-add-blocks' | trans}}
            </router-link>
          </div>
        </div>

        <fieldset :disabled="isEditableLocked">
          <template>
            <div v-for="(block, i) in (query.length >= 3 ? search(query) : blocks)" :key="i">
              <template v-if="hasContent(block.type)">
                <ul class="list-inline pull-right h4">
                  <li v-for="(tag, i) in block.customData.tags" :key="i">
                    <span class="badge badge-default">{{tag}}</span>
                  </li>
                </ul>

                <h4 :class="{'text-muted': !block.customData.title}"
                    :title="'Block ID - ' + block.jsKey">
                  <span v-if="block.customData.label">{{block.customData.label}} - </span>
                  {{block.customData.title || $options.filters.trans('trees.untitled-block')}}
                  <small>{{`trees.${block.type}` | trans}}</small>
                </h4>

                <horizontal-block-content-editor :key="block.jsKey"
                                                 :tree="tree"
                                                 :block="block"
                                                 :enabledLanguages="enabledLanguages"
                                                 :blockTypes="blockTypes"
                                                 :alternateAudioFileSelections="batchMatchAudioData.results
                                                 && batchMatchAudioData.results[block.jsKey]"
                                                 :languageNames="languageNames"></horizontal-block-content-editor>
              </template>

              <block-content-editor-unsupported v-else
                                                :key="block.jsKey"
                                                :block="block"
                                                :blockTypes="blockTypes"></block-content-editor-unsupported>
            </div>
          </template>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
// eslint-disable-next-line import/no-extraneous-dependencies
import Fuse from 'fuse.js'
import lang from '@/lib/filters/lang'
import {forEach, filter, isEmpty as _isEmpty, pickBy, identity, size, reduce, get, includes} from 'lodash'

import HorizontalBlockContentEditor from '@/components/resource-editor/HorizontalBlockContentEditor.vue'
import BatchMatchAudioFilesPrompt from '@/components/resource-editor/BatchMatchAudioFilesPrompt.vue'
import BlockContentEditorUnsupported from '@/components/resource-editor/BlockContentEditorUnsupported.vue'
import stores from '../store'

export default {
  components: {
    BatchMatchAudioFilesPrompt,
    HorizontalBlockContentEditor,
    BlockContentEditorUnsupported,
  },

  mixins: [
    lang,
  ],

  data() {
    return {
      batchMatchAudioDialogShown: false,
      showEmptyBlocksOnly: false,
      query: '',
    }
  },

  created() {
    if (!this.$store.state.trees) {
      forEach(stores.modules, (v, k) => this.$store.registerModule(k, v))
      this.initializeTreeModel()
    }
  },

  computed: {
    ...mapGetters([
      'hasIssues',
      'isFeatureTreesBatchLinkAudioEnabled',
    ]),

    id() {
      return this.$route.params.id
    },

    pathToSendTree() {
      return `/outgoing/new?tree=${this.tree.id}`
    },

    isEditableLocked() {
      return this.$store.state.trees.ui.isEditableLocked === 1
    },

    languageNames() {
      return this.$store.state.trees.ui.languageNames
    },

    enabledLanguages() {
      return this.$store.state.trees.tree.details.enabledLanguages
    },

    contentBlockTypes() {
      return this.$store.state.trees.ui.contentBlockTypes
    },

    blockTypes() {
      return this.$store.state.trees.ui.blockClasses
    },

    tree() {
      return this.$store.state.trees.tree
    },

    blocks() {
      if (this.showEmptyBlocksOnly) {
        // filter only empty content:
        // Empty content could be like: {} or {smsContent:{44:''}
        // Generally, if a block is missing any of the content for all of the content types that are enabled for the tree,
        // the block should be considered “empty” and show up using this filter.
        return filter(this.$store.state.trees.tree.blocks, (item) => {
          if (!this.hasContent(item.type)) {
            return false
          }
          const isEmptyVoice = this.$store.state.trees.tree.hasVoice && (_isEmpty(item.audioFiles)
            || _isEmpty(pickBy(item.audioFiles, identity)))
          const isEmptySMS = this.$store.state.trees.tree.hasSms && (_isEmpty(item.smsContent)
            || _isEmpty(pickBy(item.smsContent, identity)))
          const isEmptyUssd = this.$store.state.trees.tree.hasUssd && (_isEmpty(item.ussdContent)
            || _isEmpty(pickBy(item.ussdContent, identity)))
          const isEmptyClipboard = this.$store.state.trees.tree.hasClipboard && (_isEmpty(item.clipboardContent)
            || _isEmpty(pickBy(item.clipboardContent, identity)))
          const isEmptySocial = this.$store.state.trees.tree.hasSocial && (_isEmpty(item.socialContent)
            || _isEmpty(pickBy(item.socialContent, identity)))
          return isEmptyVoice || isEmptySMS || isEmptyUssd || isEmptyClipboard || isEmptySocial
        })
      }
      return this.$store.state.trees.tree.blocks
    },

    blocksWithContent() {
      return filter(this.blocks, ({type}) => this.hasContent(type))
    },

    batchMatchAudioData() {
      return this.$store.state.trees.ui.batchMatchAudio
    },

    isAudioLibraryEmpty() {
      return !this.$store.state.audio.library.length
    },

    totalPiecesOfBlockContent() {
      return this.blocks.length * size(this.enabledLanguages)
    },

    percentagePiecesWithContent() {
      if (!this.blocks.length) {
        return 0
      }

      const
        channels = this.tree.details.hasVoice
          + this.tree.details.hasSms
          + this.tree.details.hasUssd
          // + 1 = reviewed
          + 1
      const completed = this.totalPiecesOfBlockContentWithVoice
        + this.totalPiecesOfBlockContenWithSms
        + this.totalPiecesOfBlockContenWithUssd
        + this.totalPiecesOfBlockContentReviewed
      const total = (this.totalPiecesOfBlockContent * channels)

      return ((completed / total) * 100).toFixed(0)
    },

    totalPiecesOfBlockContentWithVoice() {
      if (!this.tree.details.hasVoice) {
        return 0
      }

      return reduce(this.enabledLanguages, (sum, langId) =>
        reduce(this.blocks, (audioSum, block) => audioSum + +!!block.audioFiles[langId], sum), 0)
    },

    totalPiecesOfBlockContenWithSms() {
      if (!this.tree.details.hasSms) {
        return 0
      }

      return reduce(this.enabledLanguages, (sum, langId) =>
        reduce(this.blocks, (smsSum, block) => smsSum + +!!block.smsContent[langId], sum), 0)
    },

    totalPiecesOfBlockContenWithUssd() {
      if (!this.tree.details.hasUssd) {
        return 0
      }

      return reduce(this.enabledLanguages, (sum, langId) =>
        reduce(this.blocks, (ussdSum, block) => ussdSum + +!!block.ussdContent[langId], sum), 0)
    },

    totalPiecesOfBlockContentReviewed() {
      return reduce(this.enabledLanguages, (sum, langId) =>
        // using lodash to fetch this one because reviewed hash may be absent
        reduce(this.blocks, (reviewedSum, block) => reviewedSum + +!!get(block, `customData.reviewed.${langId}`), sum), 0)
    },
  },

  methods: {
    ...mapActions(['initializeTreeModel']),

    handleTreeEditorSelected() {
      this.$el.scrollIntoView(true)
    },

    toggleBatchMatchAudioDialog() {
      this.batchMatchAudioDialogShown = !this.batchMatchAudioDialogShown
    },

    toggleShowEmptyBlocks() {
      this.showEmptyBlocksOnly = !this.showEmptyBlocksOnly
    },

    dispatchBatchMatchAudio({value: pattern, replaceExisting}) {
      const {id: treeId} = this.tree

      this.$store.dispatch('batchMatchAudioTriggered', {treeId, pattern, replaceExisting})
        // todo: this should be somewhere else
        .then(() => {
          const {isEmpty, isFailure} = this.batchMatchAudioData
          if (isEmpty || isFailure) {
            return
          }

          this.toggleBatchMatchAudioDialog()
        })
    },

    hasContent(blockType) {
      // special case -- we don't support this nested content type yet.
      if (blockType === 'RandomOrderMultipleChoiceQuestionBlock') {
        return false
      }

      return includes(this.contentBlockTypes, blockType)
    },

    search(query) {
      const
        {enabledLanguages: languages} = this.$store.state.trees.tree.details
      const keys = [
        // todo: how can we get tags in here?
        'customData.title',
        'customData.label',
        ...languages.map((langId) => `audioFiles.${langId}.filename`),
        ...languages.map((langId) => `audioFiles.${langId}.description`),
        ...languages.map((langId) => `ussdContent.${langId}`),
        ...languages.map((langId) => `smsContent.${langId}`)]

      return new Fuse(this.blocks, {keys}).search(query)
    },

    clearSearch() {
      this.query = ''
    },
  },

  mounted() {
    console.debug('Vuej tree resources viewer mounted!')
  },
}
</script>
