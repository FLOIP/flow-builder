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

          <router-link v-if="!ui.isEditableLocked"
             :to="editOrViewTreeJsUrl"
             event=""
             :title="trans('flow-builder.click-to-toggle-editing')"
             class="btn btn-outline-secondary mr-2"
             :class="{active: isEditable}"
             @click.native.prevent="handlePersistFlow(editOrViewTreeJsUrl)">
              {{isEditable ? trans('flow-builder.view-flow') : trans('flow-builder.edit-flow')}}
            </router-link>

          <div v-if="isEditable" class="dropdown mr-2">
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

          <button v-if="isEditable"
                  type="button"
                  v-b-tooltip.hover="trans('flow-builder.tooltip-duplicate-block')"
                  class="btn btn-outline-secondary tree-duplicate-block mr-2"
                  @click.prevent="handleDuplicateActivatedBlockTriggered"
                  :disabled="!activeBlockId">
            {{trans('flow-builder.duplicate')}}
          </button>

          <button v-if="isEditable"
                  type="button"
                  v-b-tooltip.hover="transIf(activeBlockId, 'flow-builder.tooltip-delete-block')"
                  class="btn btn-outline-secondary tree-delete-block mr-2"
                  @click.prevent="handleRemoveActivatedBlockTriggered"
                  :disabled="!activeBlockId">
            {{trans('flow-builder.delete')}}
          </button>

          <router-link :to="route('flows.newFlow')" class="btn btn-outline-secondary mr-2">
            {{trans('flow-builder.new-flow')}}
          </router-link>
          <router-link :to="route('flows.home')" class="btn btn-outline-secondary mr-2">
            {{trans('flow-builder.home')}}
          </router-link>

          <slot name="extra-buttons"/>

          <!--TODO - do disable if no changes logic-->
          <div class="btn-group pull-right mr-2">
            <button v-if="isEditable && isFeatureTreeSaveEnabled"
                    type="button"
                    class="btn btn-primary tree-save-tree"
                    :title="trans('flow-builder.save-changes-to-the-flow')"
                    :disabled="!!isTreeSaving"
                    @click="handlePersistFlow()">
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
import Vue from 'vue'
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
import { computeBlockPositionsFrom } from '@/store/builder'
import { VBTooltipPlugin } from 'bootstrap-vue'

Vue.use(VBTooltipPlugin)

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

    ...mapGetters('flow', ['activeFlow', 'activeFlowContainer']),
    ...mapGetters('builder', ['activeBlock']),
    ...mapState('flow', ['flows', 'resources']),
    ...mapGetters('builder', ['isEditable']),
    ...mapState('builder', ['activeBlockId']),

    ...mapGetters([
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
        const {
          flows,
          resources,
        } = this
        return JSON.stringify(
          convertKeysCase({
            flows,
            resources,
          },
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
      }
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
      if (this.isEditable) {
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
        //TODO - once we can detect changes again we will change this text when saved
        return this.trans('flow-builder.save')
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
    ...mapMutations(['setTreeSaving']),
    ...mapMutations('flow', ['flow_removeBlock']),
    ...mapActions('flow', ['flow_addBlankBlockByType', 'flow_duplicateBlock', 'flow_persist']),
    ...mapActions('builder', ['importFlowsAndResources']),
    ...mapMutations('builder', ['activateBlock']),

    async handleAddBlockByTypeSelected({ type }) {
      const { uuid: blockId } = await this.flow_addBlankBlockByType({
        type,
        platform_metadata: {
          io_viamo: {
            uiData: computeBlockPositionsFrom(this.activeBlock),
          },
        },
      }) // todo push out to intx-designer
      this.activateBlock({ blockId })
    },
    async handlePersistFlow(route) {
      this.setTreeSaving(1)
      this.flow_persist({
        persistRoute: this.route('flows.persistFlow', { flowId: this.activeFlow.uuid }),
        flowContainer: this.activeFlowContainer
      }).then((flowContainer) => {
        this.setTreeSaving(0)
        if(!flowContainer) {
          //TODO - hook into validation system when we have it.
          //TODO - hook into showing validation errors design when we have it
        } else if(route) {
          this.$router.push(route)
        }
      })
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

    editTreeRoute({
      component = null,
      mode = null,
    } = {}) {
      const context = this.removeNilValues({
        treeId: this.activeFlow.uuid,
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
