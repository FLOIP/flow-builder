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
import { Lang } from '@/lib/filters/lang'
import Permissions from '@/lib/mixins/Permissions'
import Routes from '@/lib/mixins/Routes'
import lodash, { isEmpty } from 'lodash'
import flow from 'lodash/fp/flow'
import pickBy from 'lodash/fp/pickBy'
// import {affix as Affix} from 'vue-strap'
// import TreeUpdateConflictModal from '../TreeUpdateConflictModal'
// import InteractionTotalsDateRangeConfiguration from './InteractionTotalsDateRangeConfiguration'
import convertKeysCase from '@/store/flow/utils/DataObjectPropertyNameCaseConverter'
import { computeBlockPositionsFrom } from '@/store/builder'
import { VBTooltipPlugin } from 'bootstrap-vue'
import Component, { mixins } from 'vue-class-component'
import { Action, Getter, namespace, State, Mutation } from 'vuex-class'
import { IBlock, IContext, IFlow, IResourceDefinition } from '@floip/flow-runner'

Vue.use(VBTooltipPlugin)

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    // Affix,
    // TreeUpdateConflictModal,
    // InteractionTotalsDateRangeConfiguration
  },
})
export default class TreeBuilderToolbar extends mixins(Routes, Permissions, Lang) {
  isImporterVisible = false

  // Computed ####################

  isEmpty(value?: any): boolean {
    return isEmpty(value)
  }

  get flow() {
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
  }

  set flow(value) {
    this.importFlowsAndResources(convertKeysCase(
      JSON.parse(value),
      'CAMEL',
      ['platform_metadata', 'io_viamo'],
    ))
  }

  get editTreeUrl() {
    return this.editTreeRoute()
  }

  get treeViewUrl() {
    return this.editTreeRoute({
      component: 'interaction-designer',
    })
  }

  get resourceViewUrl() {
    return this.editTreeRoute({
      component: 'resource-viewer',
    })
  }

  get viewResultsUrl() {
    return this.isFeatureViewResultsEnabled ? this.editTreeRoute({ component: 'results' }) : ''
  }

  get viewResultsSetUrl() {
    return this.isFeatureViewResultsEnabled
      ? this.route('trees.viewTreeSetResults', { treeSetId: this.tree.treeSetId })
      : ''
  }

  get downloadAudioUrl() {
    return this.editTreeRoute({
      component: 'downloadaudio',
    })
  }

  get sendOutgoingCallUrl() {
    return this.isTreeValid ? `/outgoing/new?tree=${this.tree.id}` : ''
  }

  get publishVersionUrl() {
    return this.isTreeValid ? `/trees/${this.tree.id}/publishversion` : ''
  }

  get editOrViewTreeJsUrl() {
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
  }

  get duplicateTreeLink() {
    return this.isFeatureTreeDuplicateEnabled
      ? this.route('trees.duplicateTreeAndContinue', { treeId: this.tree.id })
      : ''
  }

  get saveButtonText() {
  //TODO - once we can detect changes again we will change this text when saved
  return this.trans('flow-builder.save')
  }

  get rootBlockClassesToDisplay() {
    return flow(
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'hiddenInMenu')),
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'advancedMenu')),
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'branchingMenu')),
    )(this.ui.blockClasses)
  }

  get rootDropdownClassesToDisplay() {
    return flow(
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'hiddenInMenu')),
      pickBy((classDetails: { [key: string]: any }) => this.hasClassDetail(classDetails, 'branchingMenu')),
    )(this.ui.blockClasses)
  }

  get advancedDropdownClassesToDisplay() {
    return flow(
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'hiddenInMenu')),
      pickBy((classDetails: { [key: string]: any }) => this.hasClassDetail(classDetails, 'advancedMenu')),
    )(this.ui.blockClasses)
  }

  get canViewResultsTotals() {
    return (this.can('view-result-totals') && this.isFeatureViewResultsEnabled)
  }

  // Methods #####################

  async handleAddBlockByTypeSelected({ type } : { type: IBlock['type']}) {
    const { uuid: blockId } = await this.flow_addBlankBlockByType({
      type,
      // @ts-ignore TODO: remove this once IBlock has platform_metadata key
      platform_metadata: {
        io_viamo: {
          uiData: computeBlockPositionsFrom(this.activeBlock),
        },
      },
    }) // todo push out to intx-designer
    this.activateBlock({ blockId })
  }

  async handlePersistFlow(route) {
    //TODO - hook into validation system when we have it - block the logic here if invalid.

    //If we aren't in edit mode there should be nothing to persist
    if(this.isEditable) {
      this.setTreeSaving(true)
      const flowContainer = await this.flow_persist({
        persistRoute: this.route('flows.persistFlow', { flowId: this.activeFlow.uuid }),
        flowContainer: this.activeFlowContainer
      })
      this.setTreeSaving(false)
      if(!flowContainer) {
        //TODO - hook into showing validation errors design when we have it
        //This won't show normal validation errors as the frontend should have caught them. We'll use this to show server errors.
      }
    }
    if(route) {
      this.$router.push(route)
    }
  }

  handleRemoveActivatedBlockTriggered() {
    const { activeBlockId: blockId } = this
    this.flow_removeBlock({ blockId })
  }

  handleDuplicateActivatedBlockTriggered() {
    const { activeBlockId: blockId } = this
    this.flow_duplicateBlock({ blockId })
  }

  toggleImportExport() {
    this.isImporterVisible = !this.isImporterVisible
  }

  editTreeRoute({ component = null, mode = null }: { component?: any; mode?: string | null } = {}) {
    const context = this.removeNilValues({
      treeId: this.activeFlow?.uuid,
      component,
      mode,
    })
    return this.route('trees.editTree', context)
  }

  hasClassDetail(classDetails: { [key: string]: any }, attribute: string) {
    return !lodash.isNil(classDetails[attribute]) && classDetails[attribute]
  }

  translateTreeClassName(className: string) {
    return this.trans(`flow-builder.${className}`)
  }

  shouldDisplayDividerBefore(blockClasses: { [key: string]: any }, className: string) {
    const shouldShowDividerBeforeBlock = lodash.pickBy(
      blockClasses,
      (classDetails) => this.hasClassDetail(classDetails, 'dividerBefore'),
    )[className]
    return shouldShowDividerBeforeBlock && this.isBlockAvailableByBlockClass[className]
  }

  handleResourceViewerSelected() {
    this.$el.scrollIntoView(true)
  }

  // This could be extracted to a helper mixin of some sort so it can be used in other places
  removeNilValues(obj: any) {
    return lodash.pickBy(obj, lodash.identity)
  }

  // ########### VUEX ###############
  @State(({ trees: { tree } }) => tree) tree!: any
  @State(({ trees: { ui } }) => ui) ui!: any
  @Getter isTreeSaving!: number | boolean
  @Getter isBlockAvailableByBlockClass?: any
  @Getter hasChanges!: boolean
  @Getter isTreeValid!: boolean
  @Getter selectedBlock?: IBlock
  @Getter isFeatureTreeSaveEnabled!: boolean
  @Getter isFeatureTreeSendEnabled!: boolean
  @Getter isFeatureTreeDuplicateEnabled!: boolean
  @Getter isFeatureViewResultsEnabled!: boolean
  @Getter isFeatureUpdateInteractionTotalsEnabled!: boolean
  @Getter isResourceEditorEnabled!: boolean
  @Mutation setTreeSaving!: (isSaving: boolean) => void
  @Action attemptSaveTree!: void

  // Flow
  @flowVuexNamespace.Getter activeFlow?: IFlow
  @flowVuexNamespace.Getter activeFlowContainer?: IContext
  @flowVuexNamespace.State flows?: IFlow[]
  @flowVuexNamespace.State resources?: IResourceDefinition[]
  @flowVuexNamespace.Action flow_removeBlock!: ({ flowId, blockId }: { flowId?: string; blockId: IBlock['uuid'] | undefined }) => void
  @flowVuexNamespace.Action flow_addBlankBlockByType!: ({ type, ...props }: Partial<IBlock>) => Promise<IBlock>
  @flowVuexNamespace.Action flow_duplicateBlock!: ({ flowId, blockId }: { flowId?: string; blockId: IBlock['uuid'] | undefined }) => Promise<IBlock>
  @flowVuexNamespace.Action flow_persist!: ({ persistRoute, flowContainer }: { persistRoute: any, flowContainer: IContext }) => Promise<IContext | null>

  // Builder
  @builderVuexNamespace.Getter isEditable!: boolean
  @builderVuexNamespace.State activeBlockId?: IBlock['uuid']
  @builderVuexNamespace.Getter activeBlock?: IBlock
  @builderVuexNamespace.Action importFlowsAndResources!: ({ flows, resources }: { flows: IFlow[]; resources: IResourceDefinition[]}) => Promise<void>
  @builderVuexNamespace.Mutation activateBlock!: ({ blockId }: { blockId: IBlock['uuid'] | null}) => void
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
