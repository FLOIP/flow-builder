<style lang="scss">
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
          <router-link
            :to="`/trees/${id}/interaction-designer`"
            class="btn btn-secondary"
            @click.native="handleTreeEditorSelected">
            {{ 'trees.tree-view' | trans }}
          </router-link>
          <router-link
            :to="`/trees/${id}/resource-viewer`"
            class="btn btn-secondary active">
            {{ 'trees.resource-view' | trans }}
          </router-link>
        </div>

        <button
          v-if="isFeatureTreesBatchLinkAudioEnabled"
          class="btn btn-secondary"
          :class="{active: batchMatchAudioDialogShown}"
          @click="toggleBatchMatchAudioDialog">
          <i class="glyphicon glyphicon-random" />
          &nbsp;{{ 'trees.auto-link-audio-files' | trans }}
          <i
            v-if="batchMatchAudioDialogShown"
            class="glyphicon glyphicon-chevron-up" />
          <i
            v-else
            class="glyphicon glyphicon-chevron-down" />
        </button>

        <router-link
          v-if="hasIssues"
          :to="`/trees/${id}/interaction-designer`"
          class="btn btn-warning">
          <i class="glyphicon glyphicon-info-sign" />
          {{ 'trees.view-issues' | trans }}
        </router-link>

        <button
          v-if="showEmptyBlocksOnly"
          class="btn btn-info"
          @click="toggleShowEmptyBlocks">
          <i class="fa fa-eye" />
          {{ 'trees.show-all' | trans }}
        </button>
        <button
          v-else
          class="btn btn-warning"
          @click="toggleShowEmptyBlocks">
          <i class="fa fa-eye-slash" />
          {{ 'trees.show-empty-only' | trans }}
        </button>
      </div>

      <template v-if="batchMatchAudioDialogShown && isFeatureTreesBatchLinkAudioEnabled">
        <hr>
        <batch-match-audio-files-prompt
          :focus="batchMatchAudioDialogShown"
          :data="batchMatchAudioData"
          :is-audio-library-empty="isAudioLibraryEmpty"
          @cancel="toggleBatchMatchAudioDialog"
          @confirm="dispatchBatchMatchAudio" />
      </template>
    </div>

    <div class="panel-body resource-viewer-contents">
      <div class="row h4">
        <div class="col-md-9">
          <ul class="nav nav-pills">
            <li class="disabled">
              <a
                href="#"
                @click.prevent="">
                {{ percentagePiecesWithContent }}%
                <small>{{ 'trees.X-of-resources-populated' | trans({count: ''}) }}</small>
              </a>
            </li>
            <li v-if="tree.details.hasVoice">
              <a
                href="#"
                @click.prevent="">
                <span
                  class="label"
                  :class="{
                    'label-warning': totalPiecesOfBlockContentWithVoice !== totalPiecesOfBlockContent,
                    'label-success': totalPiecesOfBlockContentWithVoice === totalPiecesOfBlockContent}">
                  {{ 'trees.voice' | trans }}
                  <!--<i class="glyphicon glyphicon-alert"></i>-->
                  {{ totalPiecesOfBlockContentWithVoice }}
                  <small>/ {{ totalPiecesOfBlockContent }}</small>
                </span>
              </a>
            </li>
            <li v-if="tree.details.hasSms">
              <a
                href="#"
                @click.prevent="">
                <span
                  class="label"
                  :class="{
                    'label-warning': totalPiecesOfBlockContenWithSms !== totalPiecesOfBlockContent,
                    'label-success': totalPiecesOfBlockContenWithSms === totalPiecesOfBlockContent}">
                  {{ 'trees.sms' | trans }}
                  <!--<i class="glyphicon glyphicon-alert"></i>-->
                  {{ totalPiecesOfBlockContenWithSms }}
                  <small>/ {{ totalPiecesOfBlockContent }}</small>
                </span>
              </a>
            </li>
            <li v-if="tree.details.hasUssd">
              <a
                href="#"
                @click.prevent="">
                <span
                  class="label"
                  :class="{
                    'label-warning': totalPiecesOfBlockContenWithUssd !== totalPiecesOfBlockContent,
                    'label-success': totalPiecesOfBlockContenWithUssd === totalPiecesOfBlockContent}">
                  {{ 'trees.ussd' | trans }}
                  <!--<i class="glyphicon glyphicon-alert"></i>-->
                  {{ totalPiecesOfBlockContenWithUssd }}
                  <small>/ {{ totalPiecesOfBlockContent }}</small>
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                @click.prevent="">
                <span
                  class="label"
                  :class="{
                    'label-warning': totalPiecesOfBlockContentReviewed !== totalPiecesOfBlockContent,
                    'label-success': totalPiecesOfBlockContentReviewed === totalPiecesOfBlockContent}">
                  Reviewed
                  <!--<i class="glyphicon glyphicon-alert"></i>-->
                  {{ totalPiecesOfBlockContentReviewed }}
                  <small>/ {{ totalPiecesOfBlockContent }}</small>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div class="col-md-3">
          <form class="block-content-filter">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="glyphicon glyphicon-search" />
              </div>
              <input
                v-model="query"
                class="form-control"
                :placeholder="'trees.filter-block-content' | trans">
            </div>
          </form>
        </div>
      </div>

      <div
        v-if="query.length >= 3"
        class="row">
        <div class="col-md-12">
          <p class="block-content-filter-warning alert alert-warning">
            <button
              class="close"
              @click="clearSearch">
              &times;
            </button>
            <strong>{{ 'trees.filter-enabled' | trans }}</strong> &mdash; {{ 'trees.showing-block-content-filtered-by-X' | trans }}
            "<em>{{ query }}</em>".
          </p>
        </div>
      </div>

      <div
        v-if="query.length && query.length < 3"
        class="row">
        <div class="col-md-12">
          <p class="block-content-filter-warning alert alert-warning">
            <button
              class="close"
              @click="clearSearch">
              &times;
            </button>
            <strong>{{ 'trees.filter-validation' | trans }}</strong> &mdash; {{ 'trees.enter-at-least-three-chars-to-search' | trans }}
          </p>
        </div>
      </div>

      <div
        id="tree-workspace"
        class="tree-block-container">
        <!--<div class="row">-->
        <!--<div class="col-md-1">Lang</div>-->
        <!--<div class="col-md-4">Voice</div>-->
        <!--<div class="col-md-3">SMS</div>-->
        <!--<div class="col-md-3">USSD</div>-->
        <!--<div class="col-md-1">Reviewed?</div>-->
        <!--</div>-->

        <div
          v-if="!blocks.length"
          class="alert alert-info">
          <h4>
            <i class="glyphicon glyphicon-warning-sign" />
            <strong>{{ 'trees.no-blocks-for-content' | trans }}</strong>
            {{ 'trees.use-tree-view-to-add-blocks' | trans }}
          </h4>

          <div class="text-right">
            <router-link
              :to="`/trees/${id}/interaction-designer`"
              class="btn btn-primary">
              {{ 'trees.switch-to-tree-view-to-add-blocks' | trans }}
            </router-link>
          </div>
        </div>

        <div
          v-if="blocks.length && !blocksWithContent.length"
          class="alert alert-info">
          <h4>
            <i class="glyphicon glyphicon-warning-sign" />
            <strong>{{ 'trees.no-content-blocks' | trans }}</strong>
            {{ 'trees.no-content-blocks-to-populate-content-onto' | trans }}
            {{ 'trees.use-tree-view-to-add-blocks' | trans }}
          </h4>

          <div class="text-right">
            <router-link
              :to="`/trees/${id}/interaction-designer`"
              class="btn btn-primary">
              {{ 'trees.switch-to-tree-view-to-add-blocks' | trans }}
            </router-link>
          </div>
        </div>

        <fieldset :disabled="isEditableLocked">
          <template v-for="block in (query.length >= 3 ? search(query) : blocks)">
            <template v-if="hasContent(block.type)">
              <ul class="list-inline pull-right h4">
                <li v-for="tag in block.customData.tags">
                  <span class="badge badge-default">{{ tag }}</span>
                </li>
              </ul>

              <h4
                :class="{'text-muted': !block.customData.title}"
                :title="'Block ID - ' + block.jsKey">
                <span v-if="block.customData.label">{{ block.customData.label }} - </span>
                {{ block.customData.title || $options.filters.trans('trees.untitled-block') }}
                <small>{{ `trees.${block.type}` | trans }}</small>
              </h4>

              <horizontal-block-content-editor
                :key="block.jsKey"
                :tree="tree"
                :block="block"
                :enabled-languages="enabledLanguages"
                :block-types="blockTypes"
                :alternate-audio-file-selections="batchMatchAudioData.results && batchMatchAudioData.results[block.jsKey]"
                :language-names="languageNames" />
            </template>

            <block-content-editor-unsupported
              v-else
              :key="block.jsKey"
              :block="block"
              :block-types="blockTypes" />
          </template>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */

import {mapActions, mapGetters, mapState} from 'vuex'
import fuse from 'fuse.js'
import {lang} from '@/lib/filters/lang'
import lodash from 'lodash'
import stores from '../store'

export default {
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
      lodash.forEach(stores.modules, (v, k) => this.$store.registerModule(k, v))
      this.initializeTreeModel()
    }
  },

  computed: {
    // TODO: When the time comes to update finalized this `Resource viewer` feature, use vuex to get tree & ui instead of $store.state
    // Preferably: transform the component to be class based
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
        // Generally, if a block is missing any of the content for all of the content types that are enabled for the tree, the block should be considered “empty” and show up using this filter.
        return lodash.filter(this.$store.state.trees.tree.blocks, (item) => {
          if (!this.hasContent(item.type)) {
            return false
          }
          const isEmptyVoice = this.$store.state.trees.tree.hasVoice && (lodash.isEmpty(item.audioFiles) || lodash.isEmpty(lodash.pickBy(
            item.audioFiles,
            lodash.identity,
          )))
          const isEmptySMS = this.$store.state.trees.tree.hasSms && (lodash.isEmpty(item.smsContent) || lodash.isEmpty(lodash.pickBy(
            item.smsContent,
            lodash.identity,
          )))
          const isEmptyUssd = this.$store.state.trees.tree.hasUssd && (lodash.isEmpty(item.ussdContent) || lodash.isEmpty(lodash.pickBy(
            item.ussdContent,
            lodash.identity,
          )))
          const isEmptyClipboard = this.$store.state.trees.tree.hasClipboard && (lodash.isEmpty(item.clipboardContent) || lodash.isEmpty(
            lodash.pickBy(item.clipboardContent, lodash.identity),
          ))
          const isEmptySocial = this.$store.state.trees.tree.hasSocial && (lodash.isEmpty(item.socialContent) || lodash.isEmpty(lodash.pickBy(
            item.socialContent,
            lodash.identity,
          )))
          return isEmptyVoice || isEmptySMS || isEmptyUssd || isEmptyClipboard || isEmptySocial
        })
      }
      return this.$store.state.trees.tree.blocks
    },

    blocksWithContent() {
      return lodash.filter(this.blocks, ({type}) => this.hasContent(type))
    },

    batchMatchAudioData() {
      return this.$store.state.trees.ui.batchMatchAudio
    },

    isAudioLibraryEmpty() {
      return !this.$store.state.audio.library.length
    },

    totalPiecesOfBlockContent() {
      return this.blocks.length * lodash.size(this.enabledLanguages)
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

      return lodash.reduce(
        this.enabledLanguages,
        (sum, langId) => lodash.reduce(this.blocks, (sum, block) => sum + +!!block.audioFiles[langId], sum),
        0,
      )
    },

    totalPiecesOfBlockContenWithSms() {
      if (!this.tree.details.hasSms) {
        return 0
      }

      return lodash.reduce(
        this.enabledLanguages,
        (sum, langId) => lodash.reduce(this.blocks, (sum, block) => sum + +!!block.smsContent[langId], sum),
        0,
      )
    },

    totalPiecesOfBlockContenWithUssd() {
      if (!this.tree.details.hasUssd) {
        return 0
      }

      return lodash.reduce(
        this.enabledLanguages,
        (sum, langId) => lodash.reduce(this.blocks, (sum, block) => sum + +!!block.ussdContent[langId], sum),
        0,
      )
    },

    totalPiecesOfBlockContentReviewed() {
      return lodash.reduce(this.enabledLanguages, (sum, langId) =>
          // using lodash to fetch this one because reviewed hash may be absent
          lodash.reduce(this.blocks, (sum, block) => sum + +!!lodash.get(block, `customData.reviewed.${langId}`), sum),
        0)
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

      return lodash.includes(this.contentBlockTypes, blockType)
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
        ...languages.map((langId) => `smsContent.${langId}`),
      ]

      return new fuse(this.blocks, {keys}).search(query)
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
