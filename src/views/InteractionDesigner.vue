<template>
  <div v-if="activeFlow" class="interaction-designer-contents">
    <tree-builder-toolbar/>

    <div class="tree-sidebar-container" :class="{'slide-out': !$route.meta.isSidebarShown}" :key="activeBlock && activeBlock.uuid">
      <div class="sidebar-cue" :class="{'sidebar-close': $route.meta.isSidebarShown}" @click="showOrHideSidebar">
        <i class="glyphicon"
           :class="{'glyphicon-resize-full': !$route.meta.isSidebarShown,
                  'glyphicon-resize-small': $route.meta.isSidebarShown}">
        </i>
      </div>

      <div v-if="activeBlock" class="tree-sidebar"
           :class="[`category-${blockClasses[activeBlock.type].category}`]">
        <div class="tree-sidebar-edit-block"
             :data-block-type="activeBlock && activeBlock.type"
             :data-for-block-id="activeBlock && activeBlock.uuid">
          <component v-if="activeBlock"
                     :is="`Flow${activeBlock.type.replace('.', '')}`"
                     :block="activeBlock"
                     :flow="activeFlow">
          </component>
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
      <div v-else class="tree-sidebar">
        <div class="tree-sidebar-edit-block">
          <flow-editor :flow="activeFlow" />
        </div>
      </div>
    </div>

    <div class="tree-contents"
         :x-style="{'min-height': `${designerWorkspaceHeight}px`}">
      <builder-canvas @click.native="handleCanvasSelected" />
    </div>
  </div>
</template>

<script>
import { lang } from '@/lib/filters/lang'
import Routes from '@/lib/mixins/Routes'
import lodash, { forEach, invoke, isEmpty } from 'lodash'
import Vue from 'vue'
import {
  mapActions, mapGetters, mapMutations, mapState,
} from 'vuex'
// import {affix as Affix} from 'vue-strap'
// import {SelectOneResponseBlock} from '../components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue'

// import * as BlockTypes from './block-types'
// import JsPlumbBlock from './JsPlumbBlock'

import { store } from '@/store'

// import TreeEditor from './TreeEditor'
// import TreeViewer from './TreeViewer'
// import LegacyInteractionDesigner from './InteractionDesigner.legacy'
// import TreeUpdateConflictModal from './TreeUpdateConflictModal';
import TreeBuilderToolbar from '@/components/interaction-designer/toolbar/TreeBuilderToolbar.vue'
import FlowEditor from '@/components/interaction-designer/flow-editors/FlowEditor.vue'
import { BuilderCanvas } from '@/components/interaction-designer/BuilderCanvas'

// import '../TreeDiffLogger'

export default {
  props: {
    id: { type: String },
    mode: { type: String },
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

  mixins: [lang, Routes],

  components: {
    // ...BlockTypes,
    // Affix,
    // JsPlumbBlock,
    // TreeEditor,
    // TreeViewer,
    TreeBuilderToolbar,
    BuilderCanvas,
    FlowEditor,
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
      ],
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
      designerWorkspaceHeight: ({ trees: { tree, ui } }) => ui.designerWorkspaceHeight,
      tree: ({ trees: { tree, ui } }) => tree,
      validationResultsEmptyTree: ({ trees: { tree, ui } }) => !tree.blocks.length,
      hasVoice: ({ trees: { tree } }) => tree.details.hasVoice,
      hasSms: ({ trees: { tree } }) => tree.details.hasSms,
      hasUssd: ({ trees: { tree } }) => tree.details.hasUssd,
      hasSocial: ({ trees: { tree } }) => tree.details.hasSocial,
      hasClipboard: ({ trees: { tree } }) => tree.details.hasClipboard,
      blockClasses: ({ trees: { ui } }) => ui.blockClasses,
    }),

    ...mapGetters('flow', ['activeFlow']),
    ...mapGetters('builder', ['activeBlock', 'isEditable']),

    jsKey() {
      return lodash.get(this.selectedBlock, 'jsKey')
    },

    isPureVueBlock() { // pure vuejs block types handle readonly mode on their own
      return _.includes(this.pureVuejsBlocks, lodash.get(this.selectedBlock, 'type'))
    },

    sidebarType() {
      const
        blockType = lodash.get(this.selectedBlock, 'type')
      const blockViewerType = blockType && (this.isPureVueBlock ? blockType : 'BlockViewer')

      return this.isEditable
        ? blockType || 'TreeEditor'
        : blockViewerType || 'TreeViewer'
    },
  },

  created() {
    const { $store } = this

    forEach(store.modules, (v, k) => !$store.hasModule(k) && $store.registerModule(k, v))

    if ((!isEmpty(this.appConfig) && !isEmpty(this.builderConfig)) || !this.isConfigured) {
      this.configure({ appConfig: this.appConfig, builderConfig: this.builderConfig })
    }

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
    this.flow_setActiveFlowId({ flowId: this.id })

    // if nothing was found for the flow Id
    if (!this.activeFlow) {
      this.flow_setActiveFlowId({ flowId: null })
      this.$router.replace(
        { path: this.route('flows.fetchFlow', { flowId: this.id }),
          query: { nextUrl: this.$route.path } },
      )
    }

    this.hoistResourceViewerToPushState.bind(this, this.$route.hash)
    this.deselectBlocks()
    this.discoverTallestBlockForDesignerWorkspaceHeight({ aboveTallest: true })

    setTimeout(() => {
      const { blockId, field } = this.$route.params
      if (blockId) {
        this.activateBlock({ blockId })
        const blockElement = document.querySelector(`#block\\/${blockId} .plain-draggable`)
        if (blockElement) {
          blockElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
      if (field) {
        const ele = document.getElementById(`${blockId}.${field}`)
        if (ele) {
          ele.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }, 500)
    console.debug('Vuej tree interaction designer mounted!')
  },
  beforeRouteUpdate(to, from, next) {
    this.activateBlock({ blockId: to.params.blockId || null })
    next()
  },
  watch: {
    mode(newMode) {
      this.updateIsEditableFromParams(newMode) // `this.mode` comes from captured param in js-routes
    },
  },
  methods: {
    ...mapMutations(['deselectBlocks', 'configure']),
    ...mapMutations('builder', ['activateBlock']),
    ...mapActions('builder', ['setIsEditable']),
    ...mapMutations('flow', ['flow_setActiveFlowId']),

    ...mapActions([
      'attemptSaveTree',
      'discoverTallestBlockForDesignerWorkspaceHeight',
      'initializeTreeModel']),

    async registerBlockTypes() {
      const { blockClasses } = this

      forEach(blockClasses, async ({ type }) => {
        const normalizedType = type.replace('.', '_')
        const typeWithoutSeparators = type.replace('.', '')
        const exported = await import(`../components/interaction-designer/block-types/${normalizedType}Block.vue`)

        invoke(exported, 'install', this)
        Vue.component(`Flow${typeWithoutSeparators}`, exported.default)
      })
    },

    handleCanvasSelected({ target }) {
      if (!target.classList.contains('builder-canvas')) {
        console.debug('InteractionDesigner', 'Non-canvas selection mitigated')
        return
      }

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
      if (isEditableLocked) {
        return false
      }

      return !isEditableLocked && mode === 'edit' || !mode && lodash.endsWith(hash, '/edit')
    },

    hoistResourceViewerToPushState(hash) {
      if (!_.endsWith(hash, '/resource-viewer')) {
        return
      }

      this.$router.history.replace(`/trees/${this.id}/resource-viewer`)
    },

    showOrHideSidebar() {
      let routeName = ''
      if (this.$route.name.includes('block')) {
        routeName = this.$route.meta.isSidebarShown ? 'block-selected' : 'block-selected-details'
      } else {
        routeName = this.$route.meta.isSidebarShown ? 'flow-canvas' : 'flow-details'
      }
      this.$router.history.replace({
        name: routeName,
      })
    },

  },
}
</script>

<!--<style src="../css/voto3.css"></style>-->
<!--<style src="../css/InteractionDesigner.css"></style>-->

<style lang="scss">
  // Colors + dimensions
  $dot-size: 1px;
  $dot-space: 22px;
  $dot-color: #333;
  $bg-color: #fcfcfc;

  $toolbar-height: 56px;
  $sidebar-width: 365px;

  .interaction-designer-contents {
    background:
      linear-gradient(90deg, $bg-color ($dot-space - $dot-size), transparent 1%) center,
      linear-gradient($bg-color ($dot-space - $dot-size), transparent 1%) center, $dot-color;
    background-size: $dot-space $dot-space;
  }

  .tree-sidebar-container {
    position: fixed;
    right: 0;
    z-index: 2*10;

    height: 100vh;
    width: $sidebar-width;
    overflow-y: scroll;

    padding: 1em;
    padding-top: $toolbar-height;
    transition: right 200ms ease-in-out;

    .tree-sidebar {
      background-color: #eee;
      border: 1px solid lightgray;
      border-radius: 0;
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

  .tree-builder-toolbar {
    position: fixed;
    z-index: 3*10;

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
      &.category-0 {
        border-color: $category-0-light;
        background-color: $category-0-faint;
        border-radius: 0.3em;

        h3 {
          color: $category-0-dark;
        }
      }

      &.category-1 {
        border-color: $category-1-light;
        background-color: $category-1-faint;
        border-radius: 0.3em;

        h3 {
          color: $category-1-dark;
        }
      }

      &.category-2 {
        border-color: $category-2-light;
        background-color: $category-2-faint;
        border-radius: 0.3em;

        h3 {
          color: $category-2-dark;
        }
      }
    }
  }

  .block {
    @mixin block-category($i, $faint, $light, $dark) {
      &.category-#{$i} {
        border-color: $light;

        .block-type {
          color: $light;
        }

        .block-exits .block-exit {
          .block-exit-tag {
            background-color: $light;
          }

          &.activated {
            border-color: $light;
          }
        }

        .block-target:hover {
          border: 1px dashed $light;
        }

        &.active {
          background-color: $faint;
        }
      }
    }

    @include block-category(0, $category-0-faint, $category-0-light, $category-0-dark);
    @include block-category(1, $category-1-faint, $category-1-light, $category-1-dark);
    @include block-category(2, $category-2-faint, $category-2-light, $category-2-dark);
  }

  .sidebar-cue {
    cursor: pointer;
    background-color: #eee;
    padding: 5px;
    position: fixed;
    right: 0;
    top: 70px;
    z-index: 50;
  }

  .sidebar-close {
    right: 350px;
  }

  // @note - these styles have been extracted so the output can be reused between storybook and voto5
  /*@import "resources/assets/js/trees/components/InteractionDesigner.scss";*/
</style>
