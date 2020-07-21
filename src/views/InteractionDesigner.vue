<template>
  <div class="interaction-designer-contents panel panel-default">
    <tree-builder-toolbar/>

    <div class="tree-sidebar-menu-container">
      <div class="tree-sidebar-menu" id="tree-sidebar">
        <div class="tree-sidebar-edit-block"
             :data-block-type="activeBlock && activeBlock.type"
             :data-for-block-id="activeBlock && activeBlock.uuid">

<!--          <flow-editor v-if="!activeBlock"-->
<!--                       :flow="activeFlow" />-->

          <div v-if="activeBlock"
               :is="`Flow${activeBlock.type.replace(/\\/g, '')}`"
               :block="activeBlock"
               :flow="activeFlow" />

        </div>


<!--        <tree-editor v-if="sidebarType === 'TreeEditor'"-->
<!--                     :jsonValidationResults="jsonValidationResults"-->
<!--                     :isTreeValid="isTreeValid"/>-->

<!--        <tree-viewer v-if="sidebarType === 'TreeViewer'"/>-->

<!--        <block-viewer-->
<!--          :key="jsKey"-->
<!--          v-if="sidebarType === 'BlockViewer'"-->
<!--          :data-for-block-id="jsKey" />-->

      </div>
    </div>

    <div class="panel-body tree-contents">
      <div id="tree-workspace"
           class="tree-block-container"
           :style="{'min-height': `${designerWorkspaceHeight}px`}">
        <builder-canvas @click.native="handleCanvasSelected" />
      </div>
    </div>
  </div>
</template>

<script>
  import lang from 'lib/filters/lang'
  import lodash, {forEach} from 'lodash'
  import Vue from 'vue'
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
  import {affix as Affix} from 'vue-strap'
  // import {SelectOneResponseBlock} from '../components/interaction-designer/block-types/SelectOneResponseBlock.vue'

  // import * as BlockTypes from './block-types'
  // import JsPlumbBlock from './JsPlumbBlock'

  import treesStore from '@/store/trees' // needs to be registered separately because it doesn't currently support namespacing
  import flowStore from '@/store/flow'
  import builderStore from '@/store/builder'


  // import TreeEditor from './TreeEditor'
  // import TreeViewer from './TreeViewer'
  // import LegacyInteractionDesigner from './InteractionDesigner.legacy'
  // import TreeUpdateConflictModal from './TreeUpdateConflictModal';
  import TreeBuilderToolbar from '@/components/interaction-designer/toolbar/TreeBuilderToolbar.vue'

  import {BuilderCanvas} from '@/components/interaction-designer/BuilderCanvas'

  // import '../TreeDiffLogger'

  export default {
    props: ['id', 'mode'],

    mixins: [lang],

    components: {
      // ...BlockTypes,
      Affix,
      // JsPlumbBlock,
      // TreeEditor,
      // TreeViewer,
      TreeBuilderToolbar,
      BuilderCanvas,
      // TreeUpdateConflictModal,
    },

    data() {
      return {
        pureVuejsBlocks: [ // todo: move this to BlockClassDetails spec // an inversion can be "legacy types"
          'CallBackWithCallCenterBlock',
          'CollaborativeFilteringQuestionBlock',
          'CollaborativeFilteringRatingBlock',
          'CollaborativeFilteringRatioBranchBlock',
          'CreateSubscriberBlock',
          'CurrentTimeBranchBlock',
          'DirectorySelectionBlock',
          'EntitySelectionBlock',
          'GenerateCodeBlock',
          'GroupPropertyBlock',
          'SubscriberPropertiesSnapshotBlock',
          'SubscriberPropertyBlock',
          'SummaryBlock',
          'ValidateCodeBlock',
          'WebhookBlock',
          'WebhookContentBlock',
          'RecordGroupMessageBlock',
          'PlayGroupMessageBlock',
        ]}
    },

    computed: {
      ...mapGetters([
        'selectedBlock',
        'isEditable',
        'hasChanges',
        'hasIssues',
        'isTreeSaving',
        'isTreeValid',
        'jsonValidationResults',
        'validationResults',
      ]),
      ...mapState({
        designerWorkspaceHeight: ({trees: {tree, ui}}) => ui.designerWorkspaceHeight,
        tree: ({trees: {tree, ui}}) => tree,
        validationResultsEmptyTree: ({trees: {tree, ui}}) => !tree.blocks.length,
        hasVoice: ({trees: {tree}}) => tree.details.hasVoice,
        hasSms: ({trees: {tree}}) => tree.details.hasSms,
        hasUssd: ({trees: {tree}}) => tree.details.hasUssd,
        hasSocial: ({trees: {tree}}) => tree.details.hasSocial,
        hasClipboard: ({trees: {tree}}) => tree.details.hasClipboard,
        blockClasses:  ({trees: {ui}}) => ui.blockClasses,
      }),

      ...mapGetters('flow', ['activeFlow']),
      ...mapGetters('builder', ['activeBlock']),

      jsKey() {
        return lodash.get(this.selectedBlock, 'jsKey')
      },

      isPureVueBlock() { // pure vuejs block types handle readonly mode on their own
        return _.includes(this.pureVuejsBlocks, lodash.get(this.selectedBlock, 'type'))
      },

      sidebarType() {
        const
            blockType = lodash.get(this.selectedBlock, 'type'),
            blockViewerType = blockType && (this.isPureVueBlock ? blockType : 'BlockViewer')

        return this.isEditable
            ? blockType || 'TreeEditor'
            : blockViewerType || 'TreeViewer'
      },
    },

    created() {
      const {$store} = this
      const modules = {
        // `treesStore` was originally implemented globally, expecting it's state at root
        ...treesStore.modules,
        flow: flowStore,
        builder: builderStore}

      forEach(modules, (v, k) =>
        !$store.hasModule(k) && $store.registerModule(k, v))

      global.builder = this // initialize global reference for legacy + debugging

      this.registerBlockTypes()

      this.initializeTreeModel()
      this.updateIsEditableFromParams(this.mode) // `this.mode` comes from captured param in js-routes
    },

    activated() {
      this.deselectBlocks() // todo: remove once we have jsKey in our js-route
    },

    /** @note - mixin's mount() is called _before_ local mount() (eg. InteractionDesigner.legacy::mount() is 1st) */
    mounted() {
      this.hoistResourceViewerToPushState.bind(this, this.$route.hash)
      this.deselectBlocks()
      this.discoverTallestBlockForDesignerWorkspaceHeight({aboveTallest: true})

      console.debug('Vuej tree interaction designer mounted!')
		},

    methods: {
        ...mapMutations(['deselectBlocks']),
        ...mapMutations('builder', ['activateBlock']),

        ...mapActions([
          'attemptSaveTree',
          'discoverTallestBlockForDesignerWorkspaceHeight',
          'initializeTreeModel']),

      async registerBlockTypes() {
        const {blockClasses} = this

        forEach(blockClasses, async ({type}) => {
          const normalizedType = type.replace('\\', '_')
          const typeWithoutSeparators = type.replace(/\\/g, '')

          // if ($store.hasModule(type)) {
          //   return
          // }
          //
          // const storeForType = await import(
          //   `../store/flow/block-types/${normalizedType}BlockStore`)
          // $store.registerModule(['flow', type], storeForType)

          const {default: componentDefaultExport} = await import(
            `../components/interaction-designer/block-types/${normalizedType}Block.vue`)
          Vue.component(`Flow${typeWithoutSeparators}`, componentDefaultExport)
        })
      },

      handleCanvasSelected({target}) {
        if (!target.classList.contains('builder-canvas')) {
          return
        }

        this.activateBlock({blockId: null})
      },

      updateIsEditableFromParams(mode) {
        const isEditable = +this.discoverIsEditableFrom(mode, this.$route.hash, !!app.ui.isEditableLocked)
        this.$store.commit('updateIsEditable', {value: isEditable})
      },

      /** --------------------------------| has-editable-locked | not-editable-locked |
       | mode-is-absent+view-url-suffix   |        0            |     0               |
       | mode-is-absent+edit-url-suffix   |        0 (r=>view)  |     1               |
       | mode-is-absent+absent-url-suffix |        0 (r=>view)  |     0 (r=>view)     | <- Equivalent to /view
       | mode-is-view                     |        0            |     0               |
       | mode-is-view+edit-url-suffix     |        0            |     0               |
       | mode-is-edit                     |        0 (r=>view)  |     1               |
       | mode-is-edit+view-url-suffix     |        0 (r=>view)  |     1               |
       ------------------------------------------------------------------------------ */
      discoverIsEditableFrom(mode, hash, isEditableLocked) {
        if (isEditableLocked) {
          return false
        }

        return !isEditableLocked && mode === 'edit'|| !mode && lodash.endsWith(hash, '/edit')
      },

		  hoistResourceViewerToPushState(hash) {
        if (!_.endsWith(hash, '/resource-viewer')) {
          return
        }

        this.$router.history.replace(`/trees/${this.id}/resource-viewer`)
      },
    },
	}
</script>

<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap/dist/css/bootstrap-theme.css"></style>
<!--<style src="../css/voto3.css"></style>-->
<style src="../css/InteractionDesigner.css"></style>

<style lang="scss">
  // Colors + dimensions
  $dot-size: 1px;
  $dot-space: 22px;
  $dot-color: CornflowerBlue;
  $bg-color: white;

  #tree-workspace {
    background:
      linear-gradient(90deg, $bg-color ($dot-space - $dot-size), transparent 1%) center,
      linear-gradient($bg-color ($dot-space - $dot-size), transparent 1%) center, $dot-color;
    background-size: $dot-space $dot-space;
  }

  // @note - these styles have been extracted so the output can be reused between storybook and voto5
  /*@import "resources/assets/js/trees/components/InteractionDesigner.scss";*/
</style>
