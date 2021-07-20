<template>
  <div
    ref="builder-toolbar"
    class="tree-builder-toolbar">
    <div class="tree-builder-toolbar-main-menu">
      <div
        v-if="isImporterVisible"
        class="flows-importer alert alert-info">
        <h3>{{ trans('flow-builder.flow-importer') }}</h3>
        <textarea
          v-model="flow"
          class="flow-importer"
          rows="15"
          disabled />
      </div>

      <div class="tree-workspace-panel-heading panel-heading">
        <!--    <tree-update-conflict-modal/>-->
        <div class="tree-workspace-panel-heading-contents">
          <div class="btn-toolbar">
            <button
              class="btn btn-secondary mr-2"
              :class="{active: isImporterVisible}"
              @click="toggleImportExport">
              <i class="glyphicon glyphicon-chevron-up" />
              {{ trans('flow-builder.import-export') }}
            </button>

            <div
              v-if="isResourceEditorEnabled"
              class="btn-group mr-2">
              <router-link
                :to="treeViewUrl"
                class="btn btn-secondary active">
                {{ trans('flow-builder.flow-view') }}
              </router-link>
              <router-link
                :to="resourceViewUrl"
                class="btn btn-secondary"
                @click.native="handleResourceViewerSelected">
                {{ trans('flow-builder.resource-view') }}
              </router-link>
            </div>

            <router-link
              v-if="!ui.isEditableLocked"
              :to="editOrViewTreeJsUrl"
              event=""
              :title="trans('flow-builder.click-to-toggle-editing')"
              class="btn btn-secondary mr-2"
              :class="{active: isEditable}"
              @click.native.prevent="handlePersistFlow(editOrViewTreeJsUrl)">
              {{ isEditable ? trans('flow-builder.view-flow') : trans('flow-builder.edit-flow') }}
            </router-link>

            <div
              v-if="isEditable"
              class="dropdown mr-2">
              <button
                type="button"
                class="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown">
                {{ trans('flow-builder.add-block') }}
              </button>

              <div class="dropdown-menu">
                <template v-for="(classDetails, className) in rootBlockClassesToDisplay">
                  <a
                    v-if="shouldDisplayDividerBefore(rootBlockClassesToDisplay, className)"
                    :key="className + 'divider'"
                    class="dropdown-divider" />
                  <a
                    v-if="isBlockAvailableByBlockClass[className]"
                    :key="className + 'item'"
                    href="#"
                    class="dropdown-item tree-add-block"
                    :data-block-type="className"
                    :data-default-num-connections="classDetails['defaultConnections']"
                    @click.prevent="handleAddBlockByTypeSelected(classDetails)">
                    {{ translateTreeClassName(className) }}
                  </a>
                </template>

                <template v-if="!isEmpty(rootDropdownClassesToDisplay)">
                  <a class="dropdown-divider" />

                  <a class="menu-item dropdown dropdown-submenu">
                    <a
                      href="#"
                      class="dropdown-toggle"
                      data-toggle="dropdown">
                      {{ trans('flow-builder.branching') }}
                    </a>
                    <div class="dropdown-menu">
                      <template v-for="(classDetails, className) in rootDropdownClassesToDisplay">
                        <a
                          v-if="shouldDisplayDividerBefore(rootDropdownClassesToDisplay, className)"
                          :key="className + 'divider'"
                          class="dropdown-divider" />
                        <a
                          v-if="isBlockAvailableByBlockClass[className]"
                          :key="className + 'item'"
                          href="#"
                          class="dropdown-item tree-add-block"
                          :data-block-type="className"
                          :data-default-num-connections="classDetails['defaultConnections']">
                          {{ translateTreeClassName(className) }}
                        </a>
                      </template>
                    </div>
                  </a>
                </template>

                <template v-if="!isEmpty(advancedDropdownClassesToDisplay)">
                  <a class="dropdown-divider" />

                  <a class="menu-item dropdown dropdown-submenu">
                    <a
                      href="#"
                      class="dropdown-toggle"
                      data-toggle="dropdown">{{ 'flow-builder.advanced' | trans }}
                    </a>
                    <div class="dropdown-menu">
                      <template v-for="(classDetails, className) in advancedDropdownClassesToDisplay">
                        <a
                          v-if="shouldDisplayDividerBefore(advancedDropdownClassesToDisplay, className)"
                          :key="className + 'divider'"
                          class="dropdown-divider" />
                        <a
                          v-if="isBlockAvailableByBlockClass[className]"
                          :key="className + 'item'"
                          href="#"
                          class="dropdown-item tree-add-block"
                          :data-block-type="className"
                          :data-default-num-connections="classDetails['defaultConnections']">
                          {{ translateTreeClassName(className) }}
                        </a>
                      </template>
                    </div>
                  </a>
                </template>
              </div>
            </div>

            <router-link
              :to="route('flows.newFlow')"
              class="btn btn-secondary mr-2">
              {{ trans('flow-builder.new-flow') }}
            </router-link>
            <router-link
              :to="route('flows.home')"
              class="btn btn-secondary mr-2">
              {{ trans('flow-builder.home') }}
            </router-link>

            <slot name="extra-buttons" />

            <div
              v-if="hasSimulator"
              class="btn-group pull-right mr-2">
              <button
                type="button"
                class="btn btn-primary"
                @click="setSimulatorActive(true)">
                {{ trans('flow-builder.show-clipboard-simulator') }}
              </button>
            </div>

            <!--TODO - do disable if no changes logic-->
            <div class="btn-group ml-auto mr-2">
              <button
                v-if="isEditable && isFeatureTreeSaveEnabled"
                type="button"
                class="btn btn-primary tree-save-tree"
                :title="trans('flow-builder.save-changes-to-the-flow')"
                :disabled="!!isTreeSaving"
                @click="handlePersistFlow()">
                {{ saveButtonText }}
              </button>
              <slot name="right-grouped-buttons" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tree-builder-toolbar-alerts w-100">
      <selection-banner v-if="isEditable" @updated="handleHeightChangeFromDOM" />
      <error-notifications @updated="handleHeightChangeFromDOM" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Lang from '@/lib/filters/lang'
import Permissions from '@/lib/mixins/Permissions'
import Routes from '@/lib/mixins/Routes'
import {identity, isEmpty, isNil, pickBy as _pickBy, reduce, omit} from 'lodash'
import flow from 'lodash/fp/flow'
import pickBy from 'lodash/fp/pickBy'
// import {affix as Affix} from 'vue-strap'
// import TreeUpdateConflictModal from '../TreeUpdateConflictModal'
// import InteractionTotalsDateRangeConfiguration from './InteractionTotalsDateRangeConfiguration'
import {computeBlockUiData} from '@/store/builder'
import {VBTooltipPlugin} from 'bootstrap-vue'
import Component, {mixins} from 'vue-class-component'
import {Action, Getter, Mutation, namespace, State} from 'vuex-class'
import {IBlock, IContext, IFlow, IResource} from '@floip/flow-runner'
import {RawLocation} from 'vue-router'
import SelectionBanner from '@/components/interaction-designer/toolbar/SelectionBanner.vue'
import ErrorNotifications from '@/components/interaction-designer/toolbar/ErrorNotifications.vue'
import {Dictionary} from 'vue-router/types/router'

Vue.use(VBTooltipPlugin)

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')
const clipboardVuexNamespace = namespace('clipboard')
const validationVuexNamespace = namespace('validation')

@Component({
  components: {
    SelectionBanner,
    ErrorNotifications,
    // Affix,
    // TreeUpdateConflictModal,
    // InteractionTotalsDateRangeConfiguration
  },

})
export default class TreeBuilderToolbar extends mixins(Routes, Permissions, Lang) {
  isImporterVisible = false
  height = 60

  // Computed ####################

  isEmpty(value?: any): boolean {
    return isEmpty(value)
  }

  get flow(): string {
    return JSON.stringify(
      omit(this.activeFlowContainer, 'isCreated'),
      null,
      2,
    )
  }

  set flow(value: string) {
    this.importFlowsAndResources(JSON.parse(value) as { flows: IFlow[], resources: IResource[] })
  }

  get treeViewUrl(): any {
    return this.editTreeRoute({
      component: 'interaction-designer',
    })
  }

  get resourceViewUrl(): any {
    return this.editTreeRoute({
      component: 'resource-viewer',
    })
  }

  get downloadAudioUrl(): any {
    return this.editTreeRoute({
      component: 'downloadaudio',
    })
  }

  get editOrViewTreeJsUrl(): any {
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

  get saveButtonText(): any {
    //TODO - once we can detect changes again we will change this text when saved
    return this.trans('flow-builder.save')
  }

  get rootBlockClassesToDisplay(): any {
    return flow(
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'hiddenInMenu')),
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'advancedMenu')),
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'branchingMenu')),
    )(this.ui.blockClasses)
  }

  get rootDropdownClassesToDisplay(): any {
    return flow(
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'hiddenInMenu')),
      pickBy((classDetails: { [key: string]: any }) => this.hasClassDetail(classDetails, 'branchingMenu')),
    )(this.ui.blockClasses)
  }

  get advancedDropdownClassesToDisplay(): any {
    return flow(
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'hiddenInMenu')),
      pickBy((classDetails: { [key: string]: any }) => this.hasClassDetail(classDetails, 'advancedMenu')),
    )(this.ui.blockClasses)
  }

  get canViewResultsTotals(): any {
    return (this.can('view-result-totals') && this.isFeatureViewResultsEnabled)
  }

  get hasSimulator() {
    return this.hasOfflineMode && this.isFeatureSimulatorEnabled
  }

  // Methods #####################

  async handleAddBlockByTypeSelected({type}: { type: IBlock['type'] }): Promise<void> {
    const {uuid: blockId} = await this.flow_addBlankBlockByType({
      type,
      // @ts-ignore TODO: remove this once IBlock has vendor_metadata key
      vendor_metadata: {
        io_viamo: {
          uiData: computeBlockUiData(this.activeBlock),
        },
      },
      // todo push out to intx-designer
    })
    this.activateBlock({blockId})
    this.$router.push({
      name: 'block-selected-details',
      params: {blockId},
    })
  }

  async handlePersistFlow(route: RawLocation): Promise<void> {
    //TODO - hook into validation system when we have it - block the logic here if invalid.

    //If we aren't in edit mode there should be nothing to persist
    if (this.isEditable) {
      this.setTreeSaving(true)
      const flowContainer = await this.flow_persist({
        persistRoute: this.route('flows.persistFlow', {}),
        flowContainer: this.activeFlowContainer,
      })
      this.setTreeSaving(false)
      if (!flowContainer) {
        //TODO - hook into showing validation errors design when we have it
        //This won't show normal validation errors as the frontend should have caught them. We'll use this to show server errors.
      }
    }
    if (route) {
      this.$router.push(route)
    }
  }

  toggleImportExport(): void {
    this.isImporterVisible = !this.isImporterVisible
  }

  editTreeRoute({component = null, mode = null}: { component?: any, mode?: string | null } = {}): any {
    const context = this.removeNilValues({
      treeId: this.activeFlow?.uuid,
      component,
      mode,
    })
    return this.route('trees.editTree', context)
  }

  hasClassDetail(classDetails: { [key: string]: any }, attribute: string): any {
    return !isNil(classDetails[attribute]) && classDetails[attribute]
  }

  translateTreeClassName(className: string): any {
    return this.trans(`flow-builder.${className}`)
  }

  shouldDisplayDividerBefore(blockClasses: { [key: string]: any }, className: string): any {
    const shouldShowDividerBeforeBlock = _pickBy(
      blockClasses,
      (classDetails) => this.hasClassDetail(classDetails, 'dividerBefore'),
    )[className]
    return shouldShowDividerBeforeBlock && this.isBlockAvailableByBlockClass[className]
  }

  handleResourceViewerSelected(): void {
    this.$el.scrollIntoView(true)
  }

  // This could be extracted to a helper mixin of some sort so it can be used in other places
  removeNilValues(obj: any): Dictionary<unknown> {
    return _pickBy(obj, identity)
  }

  /**
   * We have to make sure this is called using $nextTick() because we play with DOM
   */
  handleHeightChangeFromDOM() {
    const elementRef = this.$refs['builder-toolbar'] as Element
    if (!elementRef) {
      console.debug('Interaction Designer', 'Unable to find DOM element corresponding to builder-toolbar')
    }

    const height = reduce(
      elementRef.childNodes,
      (sum, child) => sum + (child as HTMLElement).offsetHeight,
      0,
)

    if (height > 0) {
      this.height = height
      this.$emit('height-updated', this.height)
    }
  }

  // ########### VUEX ###############
  @State(({trees: {tree}}) => tree) tree!: any
  @State(({trees: {ui}}) => ui) ui!: any
  @Getter isTreeSaving!: number | boolean
  @Getter isBlockAvailableByBlockClass?: any
  @Getter hasChanges!: boolean
  @Getter isTreeValid!: boolean
  @Getter selectedBlock?: IBlock
  @Getter isFeatureTreeSaveEnabled!: boolean
  @Getter isFeatureTreeSendEnabled!: boolean
  @Getter isFeatureTreeDuplicateEnabled!: boolean
  @Getter isFeatureViewResultsEnabled!: boolean
  @Getter isFeatureSimulatorEnabled!: boolean
  @Getter isFeatureUpdateInteractionTotalsEnabled!: boolean
  @Getter isResourceEditorEnabled!: boolean
  @Mutation setTreeSaving!: (isSaving: boolean) => void
  @Action attemptSaveTree!: void

  // Flow
  @flowVuexNamespace.Getter activeFlow?: IFlow
  @flowVuexNamespace.Getter activeFlowContainer?: IContext
  @flowVuexNamespace.Getter hasOfflineMode?: boolean
  @flowVuexNamespace.State flows?: IFlow[]
  @flowVuexNamespace.State resources?: IResource[]
  @flowVuexNamespace.Action flow_removeBlock!: ({flowId, blockId}: { flowId?: string, blockId: IBlock['uuid'] | undefined }) => void
  @flowVuexNamespace.Action flow_addBlankBlockByType!: ({type, ...props}: Partial<IBlock>) => Promise<IBlock>
  @flowVuexNamespace.Action flow_duplicateBlock!: ({
    flowId,
    blockId,
  }: { flowId?: string, blockId: IBlock['uuid'] | undefined }) => Promise<IBlock>
  @flowVuexNamespace.Action flow_persist!: ({
    persistRoute,
    flowContainer,
  }: { persistRoute: any, flowContainer?: IContext }) => Promise<IContext | null>

  // Builder
  @builderVuexNamespace.Getter isEditable!: boolean
  @builderVuexNamespace.State activeBlockId?: IBlock['uuid']
  @builderVuexNamespace.Getter activeBlock?: IBlock
  @builderVuexNamespace.Action importFlowsAndResources!: ({flows, resources}: { flows: IFlow[], resources: IResource[]}) => Promise<void>
  @builderVuexNamespace.Mutation activateBlock!: ({blockId}: { blockId: IBlock['uuid'] | null}) => void

  // Clipboard
  @clipboardVuexNamespace.Action setSimulatorActive!: (value: boolean) => void

  @validationVuexNamespace.Action remove_block_validation!: ({blockId}: { blockId: IBlock['uuid'] | undefined}) => void
}
</script>

<style lang="scss">
.tree-builder-toolbar {
  .flows-importer textarea {
    display: block;
    width: 100%;
  }
}

.tree-builder-toolbar-alerts {
  position: fixed;
  margin-top: 60px;
  z-index: 3*10;
}
</style>
