<template>
  <div
    ref="builder-toolbar"
    class="tree-builder-toolbar d-flex flex-column">
    <div class="tree-builder-toolbar-main-menu d-flex flex-column">
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

      <div class="tree-workspace-panel-heading panel-heading w-100">
        <!--    <tree-update-conflict-modal/>-->
        <div class="tree-workspace-panel-heading-contents">
          <div class="btn-toolbar">
            <h4
              class="text-primary mr-4 flow-label"
              :title="activeFlow.label">
              {{ activeFlow.label }}
            </h4>
            <div>
              <router-link
                :to="route('flows.home')"
                :title="trans('flow-builder.home')"
                class="mr-2">
                <font-awesome-icon
                  :icon="['fac', 'home']"
                  class="fa-btn" />
              </router-link>
              <router-link
                :to="route('flows.newFlow')"
                class="btn btn-primary btn-sm mr-2">
                {{ trans('flow-builder.new-flow') }}
              </router-link>
              <button
                class="btn btn-outline-primary btn-sm"
                @click="showOrHideEditFlowModal">
                {{ 'flow-builder.edit-flow' | trans }}
              </button>
              <b-modal
                ref="edit-flow-modal"
                ok-only
                :ok-title="'flow-builder.done' | trans"
                @ok="showOrHideEditFlowModal">
                <template slot="modal-header">
                  <h2 class="mb-0">
                    {{ 'flow-builder.edit-flow' | trans }}
                  </h2>
                  <button
                    type="button"
                    aria-label="Close"
                    @click="showOrHideEditFlowModal"
                    class="close">
                    ×
                  </button>
                </template>
                <flow-editor
                  :flow="activeFlow"
                  flow-header="" />
              </b-modal>

              <div class="vertical-divider" />

              <template v-if="isResourceEditorEnabled">
                <router-link
                  :to="resourceViewUrl"
                  class="btn btn-outline-primary btn-sm"
                  @click.native="handleResourceViewerSelected">
                  {{ trans('flow-builder.resource-view') }}
                </router-link>

                <div class="vertical-divider" />
              </template>

              <div
                v-if="!ui.isEditableLocked"
                class="btn-group">
                <router-link
                  :to="viewTreeUrl"
                  event=""
                  :title="trans('flow-builder.click-to-toggle-editing')"
                  class="btn btn-outline-primary btn-sm"
                  :class="{active: !isEditable}"
                  @click.native.prevent="handlePersistFlow(viewTreeUrl)">
                  {{ trans('flow-builder.view-mode') }}
                </router-link>
                <router-link
                  :to="editTreeUrl"
                  event=""
                  :title="trans('flow-builder.click-to-toggle-editing')"
                  class="btn btn-outline-primary btn-sm"
                  :class="{active: isEditable}"
                  @click.native.prevent="handlePersistFlow(editTreeUrl)">
                  {{ trans('flow-builder.edit-mode') }}
                </router-link>
              </div>

              <slot name="extra-buttons" />
            </div>

            <div class="ml-auto mr-2">
              <button
                v-if="hasSimulator"
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="setSimulatorActive(true)">
                {{ trans('flow-builder.show-clipboard-simulator') }}
              </button>

              <div class="btn-group mr-2">
                <slot name="right-grouped-buttons" />
              </div>

              <button
                class="btn btn-outline-primary btn-sm"
                :class="{active: isImporterVisible}"
                @click="toggleImportExport">
                {{ trans('flow-builder.import-export') }}
              </button>

              <!--TODO - do disable if no changes logic-->
              <button
                v-if="isEditable && isFeatureTreeSaveEnabled"
                type="button"
                class="btn btn-info btn-sm tree-save-tree ml-4"
                :title="trans('flow-builder.save-changes-to-the-flow')"
                :disabled="!!isTreeSaving"
                @click="handlePersistFlow()">
                {{ saveButtonText }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isEditable" class="tree-workspace-panel-heading panel-heading w-100 bg-white d-flex justify-content-start pt-0 pb-0">
        <div class="tree-workspace-panel-heading-contents">
          <ul class="nav">
            <li class="nav-item dropdown nav">
              <a
                class="nav-link dropdown-toggle"
                @mouseover="openDropdownMenu($event.target)"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">
                <font-awesome-icon
                  :icon="['fac', 'content']"
                  class="fa-btn big-icon" />
                <span class="nav-link-text">{{ 'flow-builder.content' | trans }}</span>
              </a>
              <div class="dropdown-menu mt-0">
                <template v-for="(classDetails, className) in blockClassesForContentCategory">
                  <div
                    v-if="shouldDisplayDividerBefore(blockClassesForContentCategory, className)"
                    :key="`${className}divider`"
                    class="dropdown-divider"></div>
                  <a
                    v-if="isBlockAvailableByBlockClass[className]"
                    :key="className + 'item'"
                    href="#"
                    class="dropdown-item"
                    :data-block-type="className"
                    :data-default-num-connections="classDetails['defaultConnections']"
                    @click.prevent="handleAddBlockByTypeSelected(classDetails)">
                    {{ translateTreeClassName(className) }}
                  </a>
                </template>
                <slot name="extra-dropdown-items-for-category1" />
              </div>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                @mouseover="openDropdownMenu($event.target)"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">
                <font-awesome-icon
                  :icon="['fac', 'contact']"
                  class="fa-btn big-icon" />
                <span class="nav-link-text">{{ 'flow-builder.contact' | trans }}</span>
              </a>
              <div class="dropdown-menu mt-0">
                <template v-for="(classDetails, className) in blockClassesForContactCategory">
                  <div
                    v-if="shouldDisplayDividerBefore(blockClassesForContactCategory, className)"
                    :key="`${className}divider`"
                    class="dropdown-divider"></div>
                  <a
                    v-if="isBlockAvailableByBlockClass[className]"
                    :key="className + 'item'"
                    href="#"
                    class="dropdown-item"
                    :data-block-type="className"
                    :data-default-num-connections="classDetails['defaultConnections']"
                    @click.prevent="handleAddBlockByTypeSelected(classDetails)">
                    {{ translateTreeClassName(className) }}
                  </a>
                </template>
                <slot name="extra-dropdown-items-for-category2" />
              </div>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                @mouseover="openDropdownMenu($event.target)"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">
                <font-awesome-icon
                  :icon="['fac', 'branching']"
                  class="fa-btn big-icon" />
                <span class="nav-link-text">{{ 'flow-builder.branching' | trans }}</span>
              </a>
              <div class="dropdown-menu mt-0">
                <template v-for="(classDetails, className) in blockClassesForBranchingCategory">
                  <div
                    v-if="shouldDisplayDividerBefore(blockClassesForBranchingCategory, className)"
                    :key="`${className}divider`"
                    class="dropdown-divider"></div>
                  <a
                    v-if="isBlockAvailableByBlockClass[className]"
                    :key="className + 'item'"
                    href="#"
                    class="dropdown-item"
                    :data-block-type="className"
                    :data-default-num-connections="classDetails['defaultConnections']"
                    @click.prevent="handleAddBlockByTypeSelected(classDetails)">
                    {{ translateTreeClassName(className) }}
                  </a>
                </template>
                <slot name="extra-dropdown-items-for-category3" />
              </div>
            </li>
            <li v-if="!isEmpty(blockClassesForWeatherCategory)"
              class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                @mouseover="openDropdownMenu($event.target)"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">
                <font-awesome-icon
                  :icon="['fac', 'weather']"
                  class="fa-btn big-icon" />
                <span class="nav-link-text">{{ 'flow-builder.weather' | trans }}</span>
              </a>
              <div class="dropdown-menu mt-0">
                <template v-for="(classDetails, className) in blockClassesForWeatherCategory">
                  <div
                    v-if="shouldDisplayDividerBefore(blockClassesForWeatherCategory, className)"
                    :key="`${className}divider`"
                    class="dropdown-divider"></div>
                  <a
                    v-if="isBlockAvailableByBlockClass[className]"
                    :key="className + 'item'"
                    href="#"
                    class="dropdown-item"
                    :data-block-type="className"
                    :data-default-num-connections="classDetails['defaultConnections']"
                    @click.prevent="handleAddBlockByTypeSelected(classDetails)">
                    {{ translateTreeClassName(className) }}
                  </a>
                </template>
                <slot name="extra-dropdown-items-for-category4" />
              </div>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                @mouseover="openDropdownMenu($event.target)"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">
                <font-awesome-icon
                  :icon="['fac', 'developer']"
                  class="fa-btn big-icon" />
                <span class="nav-link-text">{{ 'flow-builder.developer' | trans }}</span>
              </a>
              <div class="dropdown-menu mt-0">
                <template v-for="(classDetails, className) in blockClassesForDeveloperCategory">
                  <div
                    v-if="shouldDisplayDividerBefore(blockClassesForDeveloperCategory, className)"
                    :key="`${className}divider`"
                    class="dropdown-divider"></div>
                  <a
                    v-if="isBlockAvailableByBlockClass[className]"
                    :key="className + 'item'"
                    href="#"
                    class="dropdown-item"
                    :data-block-type="className"
                    :data-default-num-connections="classDetails['defaultConnections']"
                    @click.prevent="handleAddBlockByTypeSelected(classDetails)">
                    {{ translateTreeClassName(className) }}
                  </a>
                </template>
                <slot name="extra-dropdown-items-for-category5" />
              </div>
            </li>
          </ul>
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
import {BModal, VBTooltipPlugin} from 'bootstrap-vue'
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
import {computeBlockUiData, computeBlockVendorUiData} from '@/store/builder'

import Component, {mixins} from 'vue-class-component'
import {Action, Getter, Mutation, namespace, State} from 'vuex-class'
import {IBlock, IContext, IFlow, IResource} from '@floip/flow-runner'
import {RawLocation} from 'vue-router'
import SelectionBanner from '@/components/interaction-designer/toolbar/SelectionBanner.vue'
import ErrorNotifications from '@/components/interaction-designer/toolbar/ErrorNotifications.vue'
import FlowEditor from '@/components/interaction-designer/flow-editors/FlowEditor.vue'
import {Dictionary} from 'vue-router/types/router'
import {Watch} from 'vue-property-decorator'

Vue.use(VBTooltipPlugin)

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')
const clipboardVuexNamespace = namespace('clipboard')
const validationVuexNamespace = namespace('validation')

@Component({
  components: {
    SelectionBanner,
    ErrorNotifications,
    BModal,
    FlowEditor,
    // Affix,
    // TreeUpdateConflictModal,
    // InteractionTotalsDateRangeConfiguration
  },

})
export default class TreeBuilderToolbar extends mixins(Routes, Permissions, Lang) {
  isImporterVisible = false
  height = 102

  async mounted() {
    const routeMeta = this.$route.meta ? this.$route.meta : {}
    this.onMetaChanged(routeMeta)
    this.$root.$on('bv::modal::show', () => {
      const routeMeta = this.$route.meta
      if (!routeMeta || !routeMeta.isFlowEditorShown) {
        this.$router.replace({
          name: 'flow-details',
        })
      }
    })
    this.$root.$on('bv::modal::hide', () => {
      const routeMeta = this.$route.meta
      if (routeMeta && routeMeta.isFlowEditorShown) {
        this.$router.replace({
          name: 'flow-canvas',
        })
      }
    })
  }

  @Watch('$route.meta', {immediate: true, deep: true})
  onMetaChanged(meta: {[key: string]: string}) {
    const editFlowModal: any = this.$refs['edit-flow-modal']
    if (editFlowModal) {
      if (meta.isFlowEditorShown) {
        editFlowModal.show()
      } else {
        editFlowModal.hide()
      }
    }
  }

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

  get editTreeUrl(): any {
    return this.editTreeRoute({
      component: 'designer',
      mode: 'edit',
    })
  }

  get viewTreeUrl(): any {
    return this.editTreeRoute({
      component: 'designer',
      mode: 'view',
    })
  }

  get saveButtonText(): any {
    if (this.isTreeSaving) {
      return this.trans('flow-builder.saving')
    } else {
      return this.trans('flow-builder.save')
    }
    //TODO - once we can detect changes again we will change this text to "Saved" when saved and keep it that way until there are further changes.
  }

  get blockClassesForContentCategory(): any {
    return flow(
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'hidden_in_menu')),
      pickBy((classDetails: { [key: string]: any }) => this.hasMenuCategory(classDetails, 1)),
    )(this.ui.blockClasses)
  }

  get blockClassesForContactCategory(): any {
    return flow(
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'hidden_in_menu')),
      pickBy((classDetails: { [key: string]: any }) => this.hasMenuCategory(classDetails, 2)),
    )(this.ui.blockClasses)
  }

  get blockClassesForBranchingCategory(): any {
    return flow(
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'hidden_in_menu')),
      pickBy((classDetails: { [key: string]: any }) => {
        return this.hasMenuCategory(classDetails, 3) || this.hasClassDetail(classDetails, 'branchingMenu')
      }),
    )(this.ui.blockClasses)
  }

  get blockClassesForWeatherCategory(): any {
    return flow(
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'hidden_in_menu')),
      pickBy((classDetails: { [key: string]: any }) => this.hasMenuCategory(classDetails, 4)),
    )(this.ui.blockClasses)
  }

  get blockClassesForDeveloperCategory(): any {
    return flow(
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'hidden_in_menu')),
      pickBy((classDetails: { [key: string]: any }) => this.hasMenuCategory(classDetails, 5)),
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
      ui_metadata: {
        canvas_coordinates: computeBlockUiData(this.activeBlock),
      },
      vendor_metadata: {
        io_viamo: {
          uiData: computeBlockVendorUiData(this.activeBlock),
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
  showOrHideEditFlowModal(): void {
    const editFlowModal: any = this.$refs['edit-flow-modal']
    if (editFlowModal) {
      editFlowModal.toggle()
    }
  }
  openDropdownMenu(targetElement: HTMLElement) {
    if (!targetElement.hasAttribute('aria-expanded')) {
      return
    }

    if (targetElement.getAttribute('aria-expanded') === 'true') {
      return
    }

    targetElement.click()
  }

  toggleImportExport(): void {
    this.isImporterVisible = !this.isImporterVisible
  }

  editTreeRoute({component = null, mode = null}: { component?: any, mode?: string | null } = {}): any {
    const context = this.removeNilValues({
      flowId: this.activeFlow?.uuid,
      component,
      mode,
    })
    return this.route('flows.editFlow', context)
  }

  hasClassDetail(classDetails: { [key: string]: any }, attribute: string): any {
    return !isNil(classDetails[attribute]) && classDetails[attribute]
  }

  hasMenuCategory(classDetails: { [key: string]: any }, category: number): any {
    return this.hasClassDetail(classDetails, 'menu_category') && classDetails['menu_category'] === category
  }

  translateTreeClassName(className: string): any {
    return this.trans(`flow-builder.${className}`)
  }

  shouldDisplayDividerBefore(blockClasses: { [key: string]: any }, className: string): any {
    const shouldShowDividerBeforeBlock = _pickBy(
      blockClasses,
      (classDetails) => this.hasClassDetail(classDetails, 'divider_before'),
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

.tree-builder-toolbar-main-menu {
  width: 100vw;

  border-bottom: 1px solid darkgrey;
  background: #eee;

  box-shadow: 0 3px 6px #CACACA;
}

.tree-save-tree {
  width: 5.5em;
}

.btn-toolbar > .flow-label {
  max-width: 25%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tree-workspace-panel-heading-contents .nav .nav-item a {
  color: black;
}

.tree-workspace-panel-heading-contents .big-icon {
  width: 32px;
  height: 32px;
  vertical-align: middle;
}

.tree-workspace-panel-heading-contents .nav-link-text {
  vertical-align: middle;
}

.tree-workspace-panel-heading-contents .nav .nav-item.show>a:hover,
.tree-workspace-panel-heading-contents nav .nav-item.show>a:focus {
  color: #ffffff;
  background-color: #8C215C;
}

.tree-workspace-panel-heading-contents .dropdown-item:hover,
.tree-workspace-panel-heading-contents .dropdown-item:focus {
  color: #ffffff !important;
  background-color: #8C215C;
}

.vertical-divider {
  border-left: 1px solid #CCCCCC;
  display: inline;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
