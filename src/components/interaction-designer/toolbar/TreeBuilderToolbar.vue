<template>
  <div class="tree-builder-toolbar">
    <div v-if="isImporterVisible"
         class="flows-importer alert alert-info">
      <h3>Flows Importer</h3>
      <textarea v-model="flow"
                class=""
                rows="15"></textarea>
    </div>

    <div class="tree-workspace-panel-heading panel-heading">
      <!--    <tree-update-conflict-modal/>-->
      <div class="tree-workspace-panel-heading-contents">
        <div class="btn-toolbar">
          <button class="btn btn-default"
                  :class="{active: isImporterVisible}"
                  @click="toggleImportExport">
            Import / Export
          </button>

          <div v-if="isResourceEditorEnabled" class="btn-group">
            <router-link :to="treeViewUrl" class="btn btn-default active">
              {{trans('flow-builder.flow-view')}}
            </router-link>
            <router-link :to="resourceViewUrl"
                         class="btn btn-default"
                         @click.native="handleResourceViewerSelected">
              {{trans('flow-builder.resource-view')}}
            </router-link>
          </div>

          <template v-if="ui.isEditableLocked">
            <a v-if="isFeatureViewResultsEnabled"
               :href="viewResultsUrl"
               :title="trans('flow-builder.view-results')"
               class="btn btn-default">
              <span class="glyphicon glyphicon-signal"></span>
            </a>
          </template>
          <a v-else
             :href="editOrViewTreeJsUrl"
             :title="trans('flow-builder.click-to-toggle-editing')"
             class="btn btn-default"
             :class="{active: ui.isEditable}"
             @click="attemptSaveTree">
            {{trans('flow-builder.edit-flow')}}
          </a>

          <a v-if="!ui.isEditable && isFeatureTreeDuplicateEnabled"
             :href="duplicateTreeLink"
             class="btn btn-default"
             :title="trans('flow-builder.duplicate-entire-flow')">
            <span class="glyphicon glyphicon-tags"/>
          </a>

          <!--        <interaction-totals-date-range-configuration v-if="ui.isEditableLocked && isFeatureUpdateInteractionTotalsEnabled"/>-->

          <div v-if="ui.isEditable" class="btn-group">
            <button type="button"
                    class="btn btn-default dropdown-toggle"
                    data-toggle="dropdown">
              {{trans('flow-builder.add-block')}} <span class="caret"/>
            </button>

            <ul class="dropdown-menu" role="menu">
              <template v-for="(classDetails, className) in rootBlockClassesToDisplay">
                <li v-if="shouldDisplayDividerBefore(rootBlockClassesToDisplay, className)"
                    :key="className + 'divider'"
                    class="divider"/>
                <li :key="className + 'item'">
                  <a v-if="isBlockAvailableByBlockClass[className]"
                     href="#"
                     @click.prevent="handleAddBlockByTypeSelected(classDetails)"
                     class="tree-add-block"
                     :data-block-type="className"
                     :data-default-num-connections="classDetails['defaultConnections']">
                    {{translateTreeClassName(className)}}
                  </a>
                </li>
              </template>

              <template v-if="!isEmpty(rootDropdownClassesToDisplay)">
                <li class="divider"/>

                <li class="menu-item dropdown dropdown-submenu">
                  <a href="#"
                     class="dropdown-toggle"
                     data-toggle="dropdown">
                    {{trans('flow-builder.branching')}}
                  </a>
                  <ul class="dropdown-menu">
                    <template v-for="(classDetails, className) in rootDropdownClassesToDisplay">
                      <li v-if="shouldDisplayDividerBefore(rootDropdownClassesToDisplay, className)"
                          :key="className + 'divider'"
                          class="divider"/>
                      <li :key="className + 'item'">
                        <a v-if="isBlockAvailableByBlockClass[className]"
                           href="#"
                           class="tree-add-block"
                           :data-block-type="className"
                           :data-default-num-connections="classDetails['defaultConnections']">
                          {{translateTreeClassName(className)}}
                        </a>
                      </li>
                    </template>
                  </ul>
                </li>
              </template>

              <template v-if="!isEmpty(advancedDropdownClassesToDisplay)">
                <li class="divider"/>

                <li class="menu-item dropdown dropdown-submenu">
                  <a href="#"
                     class="dropdown-toggle"
                     data-toggle="dropdown">{{'flow-builder.advanced' | trans}}
                  </a>
                  <ul class="dropdown-menu">
                    <template v-for="(classDetails, className) in advancedDropdownClassesToDisplay">
                      <li v-if="shouldDisplayDividerBefore(advancedDropdownClassesToDisplay, className)"
                          :key="className + 'divider'"
                          class="divider"/>
                      <li :key="className + 'item'">
                        <a v-if="isBlockAvailableByBlockClass[className]"
                           href="#"
                           class="tree-add-block"
                           :data-block-type="className"
                           :data-default-num-connections="classDetails['defaultConnections']">
                          {{translateTreeClassName(className)}}
                        </a>
                      </li>
                    </template>
                  </ul>
                </li>
              </template>
            </ul>
          </div>

          <button v-if="ui.isEditable"
                  type="button"
                  class="btn btn-default tree-duplicate-block"
                  :disabled="!jsKey">
            {{trans('flow-builder.duplicate')}}
          </button>

          <button v-if="ui.isEditable"
                  type="button"
                  class="btn btn-default tree-delete-block"
                  @click.prevent="handleRemoveActivatedBlockTriggered"
                  :disabled="!activeBlockId">
            {{trans('flow-builder.delete')}}
          </button>

          <div class="btn-group pull-right">
            <button v-if="ui.isEditable && isFeatureTreeSaveEnabled"
                    type="button"
                    class="btn btn-primary tree-save-tree"
                    :title="trans('flow-builder.save-changes-to-the-flow')"
                    :disabled="isTreeSaving || !hasChanges"
                    @click="attemptSaveTree">
              {{saveButtonText}}
            </button>

            <template v-if="isFeatureTreeSendEnabled">
              <a v-if="can('edit-content')"
                 :href="publishVersionUrl"
                 class="btn btn-success"
                 :disabled="isTreeSaving || !isTreeValid"
                 :title="isTreeValid ? 'flow-builder.publish-this-version-of-the-flow' : 'flow-builder.fix-validation-errors-before-publishing' | trans">
                {{'flow-builder.publish' | trans}}
              </a>
              <a v-if="can('send-outgoing-call')"
                 :href="sendOutgoingCallUrl"
                 class="btn btn-success tree-send-tree-call"
                 :disabled="isTreeSaving || !isTreeValid"
                 :title="trans('flow-builder.schedule-and-send-an-outgoing-call')">
                {{trans('flow-builder.send')}}
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>

  </div>


</template>
<script>
  import lang from '@/lib/filters/lang'
  import Permissions from '@/lib/mixins/Permissions'
  import Routes from '@/lib/mixins/Routes'
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
  import lodash, {isEmpty} from 'lodash'
  import flow from 'lodash/fp/flow'
  import pickBy from 'lodash/fp/pickBy'
  import {affix as Affix} from 'vue-strap'
  // import TreeUpdateConflictModal from '../TreeUpdateConflictModal'
  // import InteractionTotalsDateRangeConfiguration from './InteractionTotalsDateRangeConfiguration'
  import convertKeysToCamelCase from '@floip/flow-runner/src/flow-spec/DataObjectPopertyNameCamelCaseConverter'

  export default {
    components: {
      Affix,
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
        tree: ({trees: {tree}}) => tree,
        ui: ({trees: {ui}}) => ui,
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
      ]),

      flow: {
        get() {
          const {flows, resources} = this
          return JSON.stringify({
            flows,
            resources,
          }, null, 2)
        },

        set(value) {
          this.importFlowsAndResources(convertKeysToCamelCase(
            JSON.parse(value),
            ['platform_metadata', 'io_viamo']
          ))
        }
      },

      isResourceEditorEnabled() {
        return false
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
        return this.isFeatureViewResultsEnabled ? this.editTreeRoute({component: 'results'}) : ''
      },
      viewResultsSetUrl() {
        return this.isFeatureViewResultsEnabled
            ? this.route('trees.viewTreeSetResults', {treeSetId: this.tree.treeSetId})
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
        } else {
          return this.editTreeRoute({
            component: 'interaction-designer',
            mode: 'edit',
          })
        }
      },
      duplicateTreeLink() {
        return this.isFeatureTreeDuplicateEnabled
            ? this.route('trees.duplicateTreeAndContinue', {treeId: this.tree.id})
            : ''
      },

      saveButtonText() {
        if (this.hasChanges) {
          return this.trans('flow-builder.save')
        } else {
          return this.trans('flow-builder.saved')
        }
      },

      rootBlockClassesToDisplay() {
        return flow(
            pickBy(classDetails => !this.hasClassDetail(classDetails, 'hiddenInMenu')),
            pickBy(classDetails => !this.hasClassDetail(classDetails, 'advancedMenu')),
            pickBy(classDetails => !this.hasClassDetail(classDetails, 'branchingMenu')),
        )(this.ui.blockClasses)
      },

      rootDropdownClassesToDisplay() {
        return flow(
            pickBy(classDetails => !this.hasClassDetail(classDetails, 'hiddenInMenu')),
            pickBy(classDetails => this.hasClassDetail(classDetails, 'branchingMenu')),
        )(this.ui.blockClasses)
      },

      advancedDropdownClassesToDisplay() {
        return flow(
            pickBy(classDetails => !this.hasClassDetail(classDetails, 'hiddenInMenu')),
            pickBy(classDetails => this.hasClassDetail(classDetails, 'advancedMenu')),
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
      ...mapActions('flow', ['flow_addBlankBlockByType']),
      ...mapActions('builder', ['importFlowsAndResources']),

      handleAddBlockByTypeSelected({type}) {
        const {uuid: blockId} = this.flow_addBlankBlockByType({type, platform_metadata: {
            io_viamo: {
              uiData: {xPosition: 150, yPosition: 255}, // todo: selected block + (80,80)
            }}}) // todo push out to intx-designer
        // activateBlock({blockId})
      },

      handleRemoveActivatedBlockTriggered() {
        const {activeBlockId: blockId} = this
        this.flow_removeBlock({blockId})
      },

      toggleImportExport() {
        this.isImporterVisible = !this.isImporterVisible
      },

      editTreeRoute({component = null, mode = null} = {}) {
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
            classDetails => this.hasClassDetail(classDetails, 'dividerBefore'),
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
    padding-right: 366px;

    .flows-importer textarea {
      display: block;
      width: 100%;
    }
  }
</style>
