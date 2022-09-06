<template>
  <div class="resource-viewer panel panel-default">
    <div class="panel-heading resource-viewer-panel-heading">
      <div class="btn-toolbar">
        <div class="btn-group">
          <router-link
            :to="`/trees/${id}/interaction-designer`"
            class="btn btn-secondary"
            @click.native="handleTreeEditorSelected">
            {{ trans('trees.tree-view') }}
          </router-link>
          <router-link
            :to="`/trees/${id}/resource-viewer`"
            class="btn btn-secondary active">
            {{ trans('trees.resource-view') }}
          </router-link>
        </div>

        <button
          v-if="isFeatureTreesBatchLinkAudioEnabled"
          class="btn btn-secondary"
          :class="{active: batchMatchAudioDialogShown}"
          @click="toggleBatchMatchAudioDialog">
          <i class="glyphicon glyphicon-random" />
          &nbsp;{{ trans('trees.auto-link-audio-files') }}
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
          {{ trans('trees.view-issues') }}
        </router-link>

        <button
          v-if="showEmptyBlocksOnly"
          class="btn btn-info"
          @click="toggleShowEmptyBlocks">
          <i class="fa fa-eye" />
          {{ trans('trees.show-all') }}
        </button>
        <button
          v-else
          class="btn btn-warning"
          @click="toggleShowEmptyBlocks">
          <i class="fa fa-eye-slash" />
          {{ trans('trees.show-empty-only') }}
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
                <small>{{ trans('trees.X-of-resources-populated', {count: ''}) }}</small>
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
                  {{ trans('trees.voice') }}
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
                    'label-warning': totalPiecesOfBlockContentWithSms !== totalPiecesOfBlockContent,
                    'label-success': totalPiecesOfBlockContentWithSms === totalPiecesOfBlockContent}">
                  {{ trans('trees.sms') }}
                  <!--<i class="glyphicon glyphicon-alert"></i>-->
                  {{ totalPiecesOfBlockContentWithSms }}
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
                    'label-warning': totalPiecesOfBlockContentWithUssd !== totalPiecesOfBlockContent,
                    'label-success': totalPiecesOfBlockContentWithUssd === totalPiecesOfBlockContent}">
                  {{ trans('trees.ussd') }}
                  <!--<i class="glyphicon glyphicon-alert"></i>-->
                  {{ totalPiecesOfBlockContentWithUssd }}
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
                :placeholder="trans('trees.filter-block-content')">
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
            <strong>{{ trans('trees.filter-enabled') }}</strong> &mdash; {{ trans('trees.showing-block-content-filtered-by-X') }}
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
            <strong>{{ trans('trees.filter-validation') }}</strong> &mdash; {{ trans('trees.enter-at-least-three-chars-to-search') }}
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
            <strong>{{ trans('trees.no-blocks-for-content') }}</strong>
            {{ trans('trees.use-tree-view-to-add-blocks') }}
          </h4>

          <div class="text-right">
            <router-link
              :to="`/trees/${id}/interaction-designer`"
              class="btn btn-primary">
              {{ trans('trees.switch-to-tree-view-to-add-blocks') }}
            </router-link>
          </div>
        </div>

        <div
          v-if="blocks.length && !blocksWithContent.length"
          class="alert alert-info">
          <h4>
            <i class="glyphicon glyphicon-warning-sign" />
            <strong>{{ trans('trees.no-content-blocks') }}</strong>
            {{ trans('trees.no-content-blocks-to-populate-content-onto') }}
            {{ trans('trees.use-tree-view-to-add-blocks') }}
          </h4>

          <div class="text-right">
            <router-link
              :to="`/trees/${id}/interaction-designer`"
              class="btn btn-primary">
              {{ trans('trees.switch-to-tree-view-to-add-blocks') }}
            </router-link>
          </div>
        </div>

        <fieldset :disabled="isEditableLocked">
          <template v-for="block in (query.length >= 3 ? search(query) : blocks)">
            <template v-if="hasContent(block.type)">
              <ul
                :key="block.uuid"
                class="list-inline pull-right h4">
                <li
                  v-for="(tag, i) in block.customData.tags"
                  :key="i">
                  <span class="badge badge-default">{{ tag }}</span>
                </li>
              </ul>

              <h4
                :key="block.uuid"
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
                :alternate-audio-file-selections="batchMatchAudioData.results && batchMatchAudioData.results[block.jsKey]"
                :language-names="languageNames" />
            </template>

            <block-content-editor-unsupported
              v-else
              :key="block.jsKey"
              :block="block" />
          </template>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */

import Fuse from 'fuse.js'
import {filter, forEach, get, identity, includes, isEmpty, pickBy, reduce, size} from 'lodash'
import {Vue, Options} from 'vue-class-component'
import {Action, Getter} from 'vuex-class'
import {Lang} from '@/lib/filters/lang'
import {IBatchMatchAudioData, IBlockExtended} from '@/lib/types'
import {IBlock, IBlockConfig} from '@floip/flow-runner'
import stores from '../store'
import FuseResult = Fuse.FuseResult;

@Options({
  mixins: [
    Lang, 
  ]
})
export class ResourceViewer extends Vue {
  batchMatchAudioDialogShown = false
  showEmptyBlocksOnly = false
  query = ''

  created(): void {
    if (!this.$store.state["trees"]) {
      // @ts-ignore
      forEach(stores.modules, (v, k) => this.$store.registerModule(k, v))
      this.initializeTreeModel()
    }
  }

  mounted(): void {
    console.debug('VueJS tree resources viewer mounted!')
  }

  @Getter hasIssues!: boolean
  @Getter isFeatureTreesBatchLinkAudioEnabled!: boolean

  get id(): any {
    return this.$route.params.id
  }

  get pathToSendTree(): string {
    return `/outgoing/new?tree=${this.tree.id}`
  }

  get isEditableLocked(): boolean {
    return this.$store.state["trees"].ui.isEditableLocked === 1
  }

  get languageNames(): string[] {
    return this.$store.state["trees"].ui.languageNames
  }

  get enabledLanguages(): string[] {
    return this.$store.state["trees"].tree.details.enabledLanguages
  }

  get contentBlockTypes(): string[] {
    return this.$store.state["trees"].ui.contentBlockTypes
  }

  get tree(): any {
    return this.$store.state["trees"].tree
  }

  get blocks(): IBlockExtended[] {
    if (this.showEmptyBlocksOnly) {
      // filter only empty content:
      // Empty content could be like: {} or {smsContent:{44:''}
      // Generally, if a block is missing any of the content for all the content types
      // that are enabled for the tree, the block should be considered “empty” and show up using this filter.
      return filter(this.$store.state["trees"].tree.blocks, (item) => {
        if (!this.hasContent(item.type)) {
          return false
        }
        const isEmptyVoice = this.$store.state["trees"].tree.hasVoice && (isEmpty(item.audioFiles) || isEmpty(pickBy(
          item.audioFiles,
          identity,
        )))
        const isEmptySMS = this.$store.state["trees"].tree.hasSms && (isEmpty(item.smsContent) || isEmpty(pickBy(
          item.smsContent,
          identity,
        )))
        const isEmptyUssd = this.$store.state["trees"].tree.hasUssd && (isEmpty(item.ussdContent) || isEmpty(pickBy(
          item.ussdContent,
          identity,
        )))
        const isEmptyClipboard = this.$store.state["trees"].tree.hasClipboard && (isEmpty(item.clipboardContent) || isEmpty(
          pickBy(item.clipboardContent, identity),
        ))
        const isEmptySocial = this.$store.state["trees"].tree.hasSocial && (isEmpty(item.socialContent) || isEmpty(pickBy(
          item.socialContent,
          identity,
        )))
        return isEmptyVoice || isEmptySMS || isEmptyUssd || isEmptyClipboard || isEmptySocial
      })
    }
    return this.$store.state["trees"].tree.blocks
  }

  get blocksWithContent(): IBlock[] {
    return filter(this.blocks, ({type}) => this.hasContent(type))
  }

  get batchMatchAudioData(): IBatchMatchAudioData {
    return this.$store.state["trees"].ui.batchMatchAudio
  }

  get isAudioLibraryEmpty(): boolean {
    return !this.$store.state["audio"].library.length
  }

  get totalPiecesOfBlockContent(): number {
    return this.blocks.length * size(this.enabledLanguages)
  }

  get percentagePiecesWithContent(): string | number {
    if (!this.blocks.length) {
      return 0
    }

    const
      channels = Number(this.tree.details.hasVoice)
        + Number(this.tree.details.hasSms)
        + Number(this.tree.details.hasUssd)
        // + 1 = reviewed
        + 1
    const completed = this.totalPiecesOfBlockContentWithVoice
      + this.totalPiecesOfBlockContentWithSms
      + this.totalPiecesOfBlockContentWithUssd
      + this.totalPiecesOfBlockContentReviewed
    const total = (this.totalPiecesOfBlockContent * channels)

    return ((completed / total) * 100).toFixed(0)
  }

  get totalPiecesOfBlockContentWithVoice(): number {
    if (!this.tree.details.hasVoice) {
      return 0
    }

    return reduce(
      this.enabledLanguages,
      (sum, langId) => reduce(this.blocks, (sum, block) => sum + +!!block.audioFiles[langId], sum),
      0,
    )
  }

  get totalPiecesOfBlockContentWithSms(): number {
    if (!this.tree.details.hasSms) {
      return 0
    }

    return reduce(
      this.enabledLanguages,
      (sum, langId) => reduce(this.blocks, (sum, block) => sum + +!!block.smsContent[langId], sum),
      0,
    )
  }

  get totalPiecesOfBlockContentWithUssd(): number {
    if (!this.tree.details.hasUssd) {
      return 0
    }

    return reduce(
      this.enabledLanguages,
      (sum, langId) => reduce(this.blocks, (sum, block) => sum + +!!block.ussdContent[langId], sum),
      0,
    )
  }

  get totalPiecesOfBlockContentReviewed(): number {
    return reduce(this.enabledLanguages, (sum, langId) =>
        // using lodash to fetch this one because reviewed hash may be absent
        reduce(this.blocks, (sum, block) => sum + +!!get(block, `customData.reviewed.${langId}`), sum),
      0)
  }

  @Action initializeTreeModel!: () => void

  handleTreeEditorSelected(): void {
    this.$el.scrollIntoView(true)
  }

  toggleBatchMatchAudioDialog(): void {
    this.batchMatchAudioDialogShown = !this.batchMatchAudioDialogShown
  }

  toggleShowEmptyBlocks(): void {
    this.showEmptyBlocksOnly = !this.showEmptyBlocksOnly
  }

  dispatchBatchMatchAudio({value: pattern, replaceExisting} : {value: string, replaceExisting: boolean}): void {
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
  }

  hasContent(blockType: string): boolean {
    // special case -- we don't support this nested content type yet.
    if (blockType === 'RandomOrderMultipleChoiceQuestionBlock') {
      return false
    }

    return includes(this.contentBlockTypes, blockType)
  }

  search(query: string): FuseResult<IBlockExtended>[] {
    const
      {enabledLanguages: languages} = this.$store.state["trees"].tree.details
    const keys = [
      // todo: how can we get tags in here?
      'customData.title',
      'customData.label',
      ...languages.map((langId: string) => `audioFiles.${langId}.filename`),
      ...languages.map((langId: string) => `audioFiles.${langId}.description`),
      ...languages.map((langId: string) => `ussdContent.${langId}`),
      ...languages.map((langId: string) => `smsContent.${langId}`),
    ] as string[]

    return new Fuse(this.blocks, {fieldNormWeight: 1, keys}).search(query)
  }

  clearSearch(): void {
    this.query = ''
  }
}

export default ResourceViewer
</script>

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
