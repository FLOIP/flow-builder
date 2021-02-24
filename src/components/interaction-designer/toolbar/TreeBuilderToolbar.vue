<template>
  <div class="tree-builder-toolbar">
    <div v-if="isImporterVisible"
         class="flows-importer alert alert-info">
      <h3>{{trans('flow-builder.flow-importer')}}</h3>
      <textarea v-model="flow"
                class="flow-importer"
                rows="15"></textarea>
    </div>

    <div class="tree-workspace-panel-heading panel-heading">
      <!--    <tree-update-conflict-modal/>-->
      <div class="tree-workspace-panel-heading-contents">
        <div class="btn-toolbar">
          <button class="btn btn-outline-secondary mr-2"
                  :class="{active: isImporterVisible}"
                  @click="toggleImportExport">
            <i class="glyphicon glyphicon-chevron-up"></i>
            {{trans('flow-builder.import-export')}}
          </button>

          <div v-if="isResourceEditorEnabled" class="btn-group mr-2">
            <router-link :to="treeViewUrl" class="btn btn-outline-secondary active">
              {{trans('flow-builder.flow-view')}}
            </router-link>
            <router-link :to="resourceViewUrl"
                         class="btn btn-secondary"
                         @click.native="handleResourceViewerSelected">
              {{trans('flow-builder.resource-view')}}
            </router-link>
          </div>

          <a v-if="!ui.isEditableLocked"
             :href="editOrViewTreeJsUrl"
             :title="trans('flow-builder.click-to-toggle-editing')"
             class="btn btn-outline-secondary mr-2"
             :class="{active: ui.isEditable}"
             @click="attemptSaveTree">
            {{trans('flow-builder.edit-flow')}}
          </a>

          <div v-if="ui.isEditable" class="dropdown mr-2">
            <button type="button"
                    class="btn btn-outline-secondary dropdown-toggle"
                    data-toggle="dropdown">
              {{trans('flow-builder.add-block')}}
            </button>

            <div class="dropdown-menu">
              <template v-for="(classDetails, className) in rootBlockClassesToDisplay">
                <a v-if="shouldDisplayDividerBefore(rootBlockClassesToDisplay, className)"
                    :key="className + 'divider'"
                    class="dropdown-divider"/>
                <a v-if="isBlockAvailableByBlockClass[className]"
                   href="#"
                   :key="className + 'item'"
                   @click.prevent="handleAddBlockByTypeSelected(classDetails)"
                   class="dropdown-item tree-add-block"
                   :data-block-type="className"
                   :data-default-num-connections="classDetails['defaultConnections']">
                  {{translateTreeClassName(className)}}
                </a>
              </template>

              <template v-if="!isEmpty(rootDropdownClassesToDisplay)">
                <a class="dropdown-divider"/>

                <a class="menu-item dropdown dropdown-submenu">
                  <a href="#"
                     class="dropdown-toggle"
                     data-toggle="dropdown">
                    {{trans('flow-builder.branching')}}
                  </a>
                  <div class="dropdown-menu">
                    <template v-for="(classDetails, className) in rootDropdownClassesToDisplay">
                      <a v-if="shouldDisplayDividerBefore(rootDropdownClassesToDisplay, className)"
                          :key="className + 'divider'"
                          class="dropdown-divider"/>
                      <a v-if="isBlockAvailableByBlockClass[className]"
                         href="#"
                         :key="className + 'item'"
                         class="dropdown-item tree-add-block"
                         :data-block-type="className"
                         :data-default-num-connections="classDetails['defaultConnections']">
                        {{translateTreeClassName(className)}}
                      </a>
                    </template>
                  </div>
                </a>
              </template>

              <template v-if="!isEmpty(advancedDropdownClassesToDisplay)">
                <a class="dropdown-divider"/>

                <a class="menu-item dropdown dropdown-submenu">
                  <a href="#"
                     class="dropdown-toggle"
                     data-toggle="dropdown">{{'flow-builder.advanced' | trans}}
                  </a>
                  <div class="dropdown-menu">
                    <template v-for="(classDetails, className) in advancedDropdownClassesToDisplay">
                      <a v-if="shouldDisplayDividerBefore(advancedDropdownClassesToDisplay, className)"
                          :key="className + 'divider'"
                          class="dropdown-divider"/>
                      <a v-if="isBlockAvailableByBlockClass[className]"
                         href="#"
                         :key="className + 'item'"
                         class="dropdown-item tree-add-block"
                         :data-block-type="className"
                         :data-default-num-connections="classDetails['defaultConnections']">
                        {{translateTreeClassName(className)}}
                      </a>
                    </template>
                  </div>
                </a>
              </template>
            </div>
          </div>

          <button v-if="ui.isEditable"
                  type="button"
                  class="btn btn-outline-secondary tree-duplicate-block mr-2"
                  @click.prevent="handleDuplicateActivatedBlockTriggered"
                  :disabled="!activeBlockId">
            {{trans('flow-builder.duplicate')}}
          </button>

          <button v-if="ui.isEditable"
                  type="button"
                  class="btn btn-outline-secondary tree-delete-block mr-2"
                  @click.prevent="handleRemoveActivatedBlockTriggered"
                  :disabled="!activeBlockId">
            {{trans('flow-builder.delete')}}
          </button>

          <slot name="extra-buttons"/>

          <div class="btn-group pull-right mr-2">
            <button v-if="ui.isEditable && isFeatureTreeSaveEnabled"
                    type="button"
                    class="btn btn-primary tree-save-tree"
                    :title="trans('flow-builder.save-changes-to-the-flow')"
                    :disabled="isTreeSaving || !hasChanges"
                    @click="attemptSaveTree">
              {{saveButtonText}}
            </button>
            <slot name="right-grouped-buttons"/>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script lang="ts">
import lang from '@/lib/filters/lang'
import Permissions from '@/lib/mixins/Permissions'
import Routes from '@/lib/mixins/Routes'
import {
  mapActions, mapGetters, mapMutations, mapState,
} from 'vuex'
import lodash, { isEmpty } from 'lodash'
import flow from 'lodash/fp/flow'
import pickBy from 'lodash/fp/pickBy'
// import {affix as Affix} from 'vue-strap'
// import TreeUpdateConflictModal from '../TreeUpdateConflictModal'
// import InteractionTotalsDateRangeConfiguration from './InteractionTotalsDateRangeConfiguration'
import convertKeysCase from '@/store/flow/utils/DataObjectPropertyNameCaseConverter'

export default {
  components: {
    // Affix,
    // TreeUpdateConflictModal,
    // InteractionTotalsDateRangeConfiguration
  },
  mixins: [
    lang,
    Permissions,
    Routes,
  ],
  data() {
    return {
      isImporterVisible: false,
    }
  },
  computed: {
    ...mapState({
      tree: ({ trees: { tree } }) => tree,
      ui: ({ trees: { ui } }) => ui,
    }),

    ...mapGetters('flow', ['activeFlow']),
    ...mapState('flow', ['flows', 'resources']),
    ...mapState('builder', ['activeBlockId']),

    ...mapGetters([
      'isEditable',
      'isTreeSaving',
      'isBlockAvailableByBlockClass',
      'hasChanges',
      'isTreeValid',
      'selectedBlock',
      'isFeatureTreeSaveEnabled',
      'isFeatureTreeSendEnabled',
      'isFeatureTreeDuplicateEnabled',
      'isFeatureViewResultsEnabled',
      'isFeatureUpdateInteractionTotalsEnabled',
      'isResourceEditorEnabled',
    ]),

    flow: {
      get() {
        const { flows, resources } = this
        return JSON.stringify(
          convertKeysCase({ flows, resources },
            'SNAKE',
            ['platformMetadata', 'ioViamo']),
          null,
          2,
        )
      },

      set(value) {
        this.importFlowsAndResources(convertKeysCase(
          JSON.parse(value),
          'CAMEL',
          ['platform_metadata', 'io_viamo'],
        ))
      },
    },

    jsKey() { // deprecate
      return lodash.get(this.selectedBlock, 'jsKey')
    },
    editTreeUrl() {
      return this.editTreeRoute()
    },
    treeViewUrl() {
      return this.editTreeRoute({
        component: 'interaction-designer',
      })
    },
    resourceViewUrl() {
      return this.editTreeRoute({
        component: 'resource-viewer',
      })
    },
    viewResultsUrl() {
      return this.isFeatureViewResultsEnabled ? this.editTreeRoute({ component: 'results' }) : ''
    },
    viewResultsSetUrl() {
      return this.isFeatureViewResultsEnabled
        ? this.route('trees.viewTreeSetResults', { treeSetId: this.tree.treeSetId })
        : ''
    },
    downloadAudioUrl() {
      return this.editTreeRoute({
        component: 'downloadaudio',
      })
    },
    sendOutgoingCallUrl() {
      return this.isTreeValid ? `/outgoing/new?tree=${this.tree.id}` : ''
    },
    publishVersionUrl() {
      return this.isTreeValid ? `/trees/${this.tree.id}/publishversion` : ''
    },
    editOrViewTreeJsUrl() {
      if (this.ui.isEditable) {
        return this.editTreeRoute({
          component: 'interaction-designer',
          mode: 'view',
        })
      }
      return this.editTreeRoute({
        component: 'interaction-designer',
        mode: 'edit',
      })
    },
    duplicateTreeLink() {
      return this.isFeatureTreeDuplicateEnabled
        ? this.route('trees.duplicateTreeAndContinue', { treeId: this.tree.id })
        : ''
    },

    saveButtonText() {
      if (this.hasChanges) {
        return this.trans('flow-builder.save')
      }
      return this.trans('flow-builder.saved')
    },

    rootBlockClassesToDisplay() {
      return flow(
        pickBy((classDetails) => !this.hasClassDetail(classDetails, 'hiddenInMenu')),
        pickBy((classDetails) => !this.hasClassDetail(classDetails, 'advancedMenu')),
        pickBy((classDetails) => !this.hasClassDetail(classDetails, 'branchingMenu')),
      )(this.ui.blockClasses)
    },

    rootDropdownClassesToDisplay() {
      return flow(
        pickBy((classDetails) => !this.hasClassDetail(classDetails, 'hiddenInMenu')),
        pickBy((classDetails) => this.hasClassDetail(classDetails, 'branchingMenu')),
      )(this.ui.blockClasses)
    },

    advancedDropdownClassesToDisplay() {
      return flow(
        pickBy((classDetails) => !this.hasClassDetail(classDetails, 'hiddenInMenu')),
        pickBy((classDetails) => this.hasClassDetail(classDetails, 'advancedMenu')),
      )(this.ui.blockClasses)
    },
    canViewResultsTotals() {
      return (this.can('view-result-totals') && this.isFeatureViewResultsEnabled)
    },
  },
  methods: {
    isEmpty,

    ...mapActions(['attemptSaveTree']),
    ...mapMutations('flow', ['flow_removeBlock']),
    ...mapActions('flow', ['flow_addBlankBlockByType', 'flow_duplicateBlock']),
    ...mapActions('builder', ['importFlowsAndResources']),

    handleAddBlockByTypeSelected({ type }) {
      const { uuid: blockId } = this.flow_addBlankBlockByType({
        type,
        platform_metadata: {
          io_viamo: {
            uiData: { xPosition: 150, yPosition: 255 }, // todo: selected block + (80,80)
          },
        },
      }) // todo push out to intx-designer
      // activateBlock({blockId})
    },

    handleRemoveActivatedBlockTriggered() {
      const { activeBlockId: blockId } = this
      this.flow_removeBlock({ blockId })
    },

    handleDuplicateActivatedBlockTriggered() {
      const { activeBlockId: blockId } = this
      this.flow_duplicateBlock({ blockId })
    },

    toggleImportExport() {
      this.isImporterVisible = !this.isImporterVisible
    },

    editTreeRoute({ component = null, mode = null } = {}) {
      const context = this.removeNilValues({
        treeId: this.tree.id,
        component,
        mode,
      })
      return this.route('trees.editTree', context)
    },
    hasClassDetail(classDetails, attribute) {
      return !lodash.isNil(classDetails[attribute]) && classDetails[attribute]
    },
    translateTreeClassName(className) {
      return this.trans(`flow-builder.${className}`)
    },
    shouldDisplayDividerBefore(blockClasses, className) {
      const shouldShowDividerBeforeBlock = lodash.pickBy(
        blockClasses,
        (classDetails) => this.hasClassDetail(classDetails, 'dividerBefore'),
      )[className]
      return shouldShowDividerBeforeBlock && this.isBlockAvailableByBlockClass[className]
    },
    handleResourceViewerSelected() {
      this.$el.scrollIntoView(true)
    },

    // This could be extracted to a helper mixin of some sort so it can be used in other places
    removeNilValues(obj) {
      return lodash.pickBy(obj, lodash.identity)
    },
  },
}
</script>

<style lang="scss">
  .tree-builder-toolbar {
    .flows-importer textarea {
      display: block;
      width: 100%;
    }
  }
</style>
