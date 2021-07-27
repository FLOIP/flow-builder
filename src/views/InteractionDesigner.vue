<template>
  <div
    v-if="activeFlow"
    class="interaction-designer-contents">
    <tree-builder-toolbar @height-updated="handleToolBarHeightUpdate" />

    <div
      class="tree-sidebar-container"
      :class="{ 'slide-out': !$route.meta.isSidebarShown,}">
      <div
        class="sidebar-cue"
        :class="{'sidebar-close': $route.meta.isSidebarShown}"
        @click="showOrHideSidebar">
        <font-awesome-icon
          v-if="$route.meta.isSidebarShown"
          :icon="['fac', 'minimize']"
          class="fa-btn" />
        <font-awesome-icon
          v-else
          :icon="['fac', 'expand']"
          class="fa-btn" />
      </div>

      <div
        v-if="isSimulatorActive"
        class="tree-sidebar">
        <clipboard-root />
      </div>

      <div
        v-else
        class="tree-sidebar">
        <div class="tree-sidebar-edit-block">
          <flow-editor :flow="activeFlow" />
        </div>
      </div>
    </div>

    <div class="tree-contents position-relative">
      <builder-canvas  @click.native="handleCanvasSelected" />
    </div>
  </div>
</template>

<script>
import {lang} from '@/lib/filters/lang'
import Routes from '@/lib/mixins/Routes'
import {endsWith, forEach, get, invoke, isEmpty} from 'lodash'
import Vue from 'vue'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
// import {affix as Affix} from 'vue-strap'
// import {SelectOneResponseBlock} from '../components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue'

// import * as BlockTypes from './block-types'
// import JsPlumbBlock from './JsPlumbBlock'

import {store} from '@/store'

// import TreeEditor from './TreeEditor'
// import TreeViewer from './TreeViewer'
// import LegacyInteractionDesigner from './InteractionDesigner.legacy'
// import TreeUpdateConflictModal from './TreeUpdateConflictModal';
import TreeBuilderToolbar from '@/components/interaction-designer/toolbar/TreeBuilderToolbar.vue'
import FlowEditor from '@/components/interaction-designer/flow-editors/FlowEditor.vue'
import BuilderCanvas from '@/components/interaction-designer/BuilderCanvas.vue'
import ClipboardRoot from '@/components/interaction-designer/clipboard/ClipboardRoot.vue'
import {scrollBehavior, scrollBlockIntoView} from '@/router/helpers'

// import '../TreeDiffLogger'

export default {

  components: {
    // ...BlockTypes,
    // Affix,
    // JsPlumbBlock,
    // TreeEditor,
    // TreeViewer,
    TreeBuilderToolbar,
    BuilderCanvas,
    FlowEditor,
    ClipboardRoot,
    // TreeUpdateConflictModal,
  },

  mixins: [lang, Routes],
  props: {
    id: {type: String},
    mode: {type: String},
    appConfig: {
      type: Object,
      default() {
        return {}
      },
    },
    builderConfig: {
      type: Object,
      default() {
        return {}
      },
    },
  },

  data() {
    return {
      toolbarHeight: 60,
      // todo: move this to BlockClassDetails spec // an inversion can be "legacy types"
      pureVuejsBlocks: [
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
      ],
      simulateClipboard: true,
    }
  },
  computed: {
    ...mapGetters([
      'isConfigured',
      'selectedBlock',
      'hasChanges',
      'hasIssues',
      'isTreeSaving',
      'isTreeValid',
      'jsonValidationResults',
      'validationResults',
    ]),
    ...mapState({

      // todo: we'll need to do width as well and use margin-right:365 to allow for sidebar
      designerWorkspaceHeight: ({trees: {tree, ui}}) => ui.designerWorkspaceHeight,
      tree: ({trees: {tree, ui}}) => tree,
      validationResultsEmptyTree: ({trees: {tree, ui}}) => !tree.blocks.length,
      hasVoice: ({trees: {tree}}) => tree.details.hasVoice,
      hasSms: ({trees: {tree}}) => tree.details.hasSms,
      hasUssd: ({trees: {tree}}) => tree.details.hasUssd,
      hasSocial: ({trees: {tree}}) => tree.details.hasSocial,
      hasClipboard: ({trees: {tree}}) => tree.details.hasClipboard,
      blockClasses: ({trees: {ui}}) => ui.blockClasses,
    }),

    ...mapGetters('flow', ['activeFlow']),
    ...mapGetters('builder', ['activeBlock', 'isEditable']),
    ...mapGetters('clipboard', ['isSimulatorActive']),

    jsKey() {
      return get(this.selectedBlock, 'jsKey')
    },

    // pure vuejs block types handle readonly mode on their own
    isPureVueBlock() {
      return _.includes(this.pureVuejsBlocks, get(this.selectedBlock, 'type'))
    },
  },
  watch: {
    // `this.mode` comes from captured param in js-routes
    mode(newMode) {
      this.updateIsEditableFromParams(newMode)
    },
  },

  created() {
    const {$store} = this

    forEach(store.modules, (v, k) => !$store.hasModule(k) && $store.registerModule(k, v))

    if ((!isEmpty(this.appConfig) && !isEmpty(this.builderConfig)) || !this.isConfigured) {
      this.configure({appConfig: this.appConfig, builderConfig: this.builderConfig})
    }

    // initialize global reference for legacy + debugging
    global.builder = this

    this.registerBlockTypes()

    this.initializeTreeModel()
    // `this.mode` comes from captured param in js-routes
    this.updateIsEditableFromParams(this.mode)
  },

  activated() {
    // todo: remove once we have jsKey in our js-route
    this.deselectBlocks()
  },

  /** @note - mixin's mount() is called _before_ local mount() (eg. InteractionDesigner.legacy::mount() is 1st) */
  mounted() {
    this.flow_setActiveFlowId({flowId: this.id})

    // if nothing was found for the flow Id
    if (!this.activeFlow) {
      this.flow_setActiveFlowId({flowId: null})
      this.$router.replace(
        {
          path: this.route('flows.fetchFlow', {flowId: this.id}),
          query: {nextUrl: this.$route.fullPath},
        },
      )
    }

    this.hoistResourceViewerToPushState.bind(this, this.$route.hash)
    this.deselectBlocks()
    this.discoverTallestBlockForDesignerWorkspaceHeight({aboveTallest: true})

    setTimeout(() => {
      const {blockId, field} = this.$route.params
      if (blockId) {
        this.activateBlock({blockId})
        scrollBlockIntoView(blockId)
      }
      if (field) {
        scrollBehavior(this.$route)
      }
      if (this.$route.meta?.isBlockEditorShown) {
        this.setIsBlockEditorOpen(true)
      }
    }, 500)
    console.debug('Vuej tree interaction designer mounted!')
  },
  beforeRouteUpdate(to, from, next) {
    this.activateBlock({blockId: to.params.blockId || null})
    if (to.meta?.isBlockEditorShown) {
      scrollBlockIntoView(to.params.blockId)
      this.setIsBlockEditorOpen(true)
    }
    next()
  },
  methods: {
    ...mapMutations(['deselectBlocks', 'configure']),
    ...mapMutations('builder', ['activateBlock', 'setIsBlockEditorOpen']),
    ...mapActions('builder', ['setIsEditable']),
    ...mapMutations('flow', ['flow_setActiveFlowId']),

    ...mapActions([
      'attemptSaveTree',
      'discoverTallestBlockForDesignerWorkspaceHeight',
      'initializeTreeModel']),

    async registerBlockTypes() {
      const {blockClasses} = this

      forEach(blockClasses, async ({type}) => {
        const normalizedType = type.replace('.', '_')
        const typeWithoutSeparators = type.replace('.', '')
        const exported = await import(`../components/interaction-designer/block-types/${normalizedType}Block.vue`)
        invoke(exported, 'install', this)
        Vue.component(`Flow${typeWithoutSeparators}`, exported.default)
      })
    },

    handleCanvasSelected({target}) {
      if (!target.classList.contains('builder-canvas')) {
        console.debug('InteractionDesigner', 'Non-canvas selection mitigated')
        return
      }
      this.setIsBlockEditorOpen(false)
      const routeName = this.$route.meta.isSidebarShown ? 'flow-details' : 'flow-canvas'
      this.$router.history.replace({
        name: routeName,
      })
    },

    updateIsEditableFromParams(mode) {
      const isEditable = +this.discoverIsEditableFrom(mode, this.$route.hash, !!app.ui.isEditableLocked)
      this.setIsEditable(isEditable)
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
      return !isEditableLocked && (
        mode === 'edit' || (!mode && endsWith(hash, '/edit'))
      )
    },

    hoistResourceViewerToPushState(hash) {
      if (!_.endsWith(hash, '/resource-viewer')) {
        return
      }

      this.$router.history.replace(`/trees/${this.id}/resource-viewer`)
    },

    showOrHideSidebar() {
      this.$router.history.replace({
        name: this.$route.meta.isSidebarShown ? 'flow-canvas' : 'flow-details',
      })
    },

    handleToolBarHeightUpdate(height) {
      this.toolbarHeight = height
    },

  },
}
</script>

<!--<style src="../css/voto3.css"></style>-->
<!--<style src="../css/InteractionDesigner.css"></style>-->
<style lang="scss" scoped> @import '../css/customized/vue-multiselect.css';</style>
<style lang="scss" scoped>
  // Colors + dimensions
  $dot-size: 1px;
  $dot-space: 22px;
  $dot-color: #333;
  $bg-color: #fcfcfc;

  $toolbar-height: 56px;
  $sidebar-width: 365px;

  .interaction-designer-contents {
    background: #F5F5F5;
    background-size: $dot-space $dot-space;
  }

  .tree-sidebar-container {
    position: fixed;
    right: 0;
    top: 62px;
    z-index: 3*10;

    height: 100vh;
    width: $sidebar-width;
    overflow-y: scroll;

    padding: 1em;
    transition: right 200ms ease-in-out;

    .tree-sidebar {
      background-color: white;
      border: 1px solid #D6D0D0;
      border-radius: 0.3em;
      box-shadow: 0 3px 6px #CACACA;

      padding: 1em;
      margin-top: 1em;

      transition:
        200ms background-color ease-in-out,
        200ms border-color ease-in-out,
        200ms border-radius ease-in-out;
    }

    &.slide-out {
      right: -$sidebar-width;
    }
  }

  .tree-builder-toolbar-main-menu {
    position: fixed;
    z-index: 4*10;

    width: 100vw;

    border-bottom: 1px solid darkgrey;
    background: #eee;

    box-shadow: 0 3px 6px #CACACA;
  }

  // color categorizations
  $category-0-faint: #fbfdfb;
  $category-0-light: #97BD8A;
  $category-0-dark: #38542f;
  $category-1-faint: #fdfdfe;
  $category-1-light: #6897BB;
  $category-1-dark: #30516a;
  $category-2-faint: #fdfbf8;
  $category-2-light: #C69557;
  $category-2-dark: #6e4e25;

  .tree-sidebar-container {
    .tree-sidebar {
      //  &.category-0 {
      //    border-color: $category-0-light;
      //    background-color: $category-0-faint;
      //    border-radius: 0.3em;
      //
      //    h3 {
      //      color: $category-0-dark;
      //    }
      //  }
      //
      //  &.category-1 {
      //    border-color: $category-1-light;
      //    background-color: $category-1-faint;
      //    border-radius: 0.3em;
      //
      //    h3 {
      //      color: $category-1-dark;
      //    }
      //  }
      //
      //  &.category-2 {
      //    border-color: $category-2-light;
      //    background-color: $category-2-faint;
      //    border-radius: 0.3em;
      //
      //    h3 {
      //      color: $category-2-dark;
      //    }
      //  }
    }
  }

  .sidebar-cue {
    cursor: pointer;
    background-color: #eee;
    padding: 5px;
    position: fixed;
    margin-top: 1em;
    right: 0;
    z-index: 5*10;
  }

  .sidebar-close {
    right: 350px;
  }

  // @note - these styles have been extracted so the output can be reused between storybook and voto5
  /*@import "resources/assets/js/trees/components/InteractionDesigner.scss";*/
</style>
