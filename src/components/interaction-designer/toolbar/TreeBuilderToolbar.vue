<template>
  <div
    ref="builder-toolbar"
    class="tree-builder-toolbar d-flex flex-column">
    <div class="tree-builder-toolbar-main-menu d-flex flex-column">
      <div
        v-if="isExportVisible"
        class="flows-exporter alert alert-info">
        <h3>{{ trans('flow-builder.flow-exporter') }}</h3>
        <textarea
          :value="flow"
          class="flow-exporter"
          rows="15"
          disabled />
      </div>

      <div class="tree-workspace-panel-heading panel-heading w-100">
        <!--    <tree-update-conflict-modal/>-->
        <div class="tree-workspace-panel-heading-contents">
          <div class="btn-toolbar">
            <h4
              v-if="hasToolbarFlowTitle"
              v-b-tooltip.hover="activeFlow.label"
              class="text-primary mr-4 mb-0 flow-label">
              {{ activeFlow.label }}
            </h4>
            <div>
              <router-link
                v-if="hasToolbarHomeButton"
                v-b-tooltip.hover="trans('flow-builder.home')"
                :to="route('flows.home')"
                class="mr-2">
                <font-awesome-icon
                  :icon="['fac', 'home']"
                  class="fa-btn" />
              </router-link>
              <router-link
                v-if="hasToolbarNewFlowButton"
                :to="route('flows.newFlow')"
                class="btn btn-primary btn-sm mr-2">
                {{ trans('flow-builder.new-flow') }}
              </router-link>
              <button
                class="btn btn-sm"
                :class="{
                  'btn-outline-primary': hasToolbarNewFlowButton,
                  'btn-primary': !hasToolbarNewFlowButton }
                "
                @click="showOrHideEditFlowModal">
                {{ 'flow-builder.flow-details' | trans }}
              </button>
              <b-modal
                ref="edit-flow-modal"
                ok-only
                :ok-title="'flow-builder.done' | trans"
                @ok="showOrHideEditFlowModal">
                <template slot="modal-header">
                  <h2 class="mb-0">
                    {{ 'flow-builder.flow-details' | trans }}
                  </h2>
                  <button
                    type="button"
                    aria-label="Close"
                    class="close"
                    @click="showOrHideEditFlowModal">
                    ×
                  </button>
                </template>
                <flow-editor
                  :flow="activeFlow"
                  :did-user-submit="true"
                  flow-header="" />
              </b-modal>

              <div class="vertical-divider" />

              <div
                v-if="isResourceViewerEnabled"
                class="btn-group mr-3">
                <router-link
                  :class="{active: isBuilderCanvasEnabled, disabled: isTreeSaving}"
                  :to="treeUrl"
                  class="btn btn-outline-primary btn-sm"
                  @click.native.prevent="handlePersistFlow(treeUrl)">
                  {{ trans('flow-builder.flow-view') }}
                </router-link>
                <router-link
                  :to="resourceUrl"
                  class="btn btn-outline-primary btn-sm"
                  :class="{active: isResourceViewerCanvasEnabled, disabled: isTreeSaving}"
                  @click.native.prevent="handlePersistFlow(resourceUrl)">
                  {{ trans('flow-builder.resource-view') }}
                </router-link>
              </div>

              <div
                v-if="!ui.isEditableLocked"
                class="btn-group">
                <router-link
                  v-b-tooltip.hover="trans('flow-builder.click-to-toggle-editing')"
                  :to="viewTreeUrl"
                  event=""
                  class="btn btn-outline-primary btn-sm"
                  :class="{active: !isEditable, disabled: isTreeSaving}"
                  :aria-disabled="isTreeSaving"
                  :tabindex="isTreeSaving ? -1 : undefined"
                  @click.native.prevent="handlePersistFlow(viewTreeUrl)">
                  {{ trans('flow-builder.view-mode') }}
                </router-link>
                <router-link
                  v-b-tooltip.hover="trans('flow-builder.click-to-toggle-editing')"
                  :to="editTreeUrl"
                  event=""
                  class="btn btn-outline-primary btn-sm"
                  :class="{active: isEditable, disabled: isTreeSaving}"
                  :aria-disabled="isTreeSaving"
                  :tabindex="isTreeSaving ? -1 : undefined"
                  @click.native.prevent="handlePersistFlow(editTreeUrl)">
                  {{ trans('flow-builder.edit-mode') }}
                </router-link>
              </div>

              <slot name="extra-buttons" />
            </div>

            <div class="ml-auto mr-2">
              <button
                v-if="isBuilderCanvasEnabled && hasSimulator"
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="setSimulatorActive(true)">
                {{ trans('flow-builder.show-clipboard-simulator') }}
              </button>

              <div class="btn-group mr-2">
                <slot name="right-grouped-buttons" />
              </div>

              <button
                v-if="isBuilderCanvasEnabled && hasToolbarExportButton"
                class="btn btn-outline-primary btn-sm"
                :class="{active: isExportVisible}"
                @click="toggleExportVisibility">
                {{ trans('flow-builder.export') }}
              </button>

              <!--TODO - do disable if no changes logic-->
              <button
                v-if="isBuilderCanvasEnabled && isEditable && isFeatureTreeSaveEnabled"
                v-b-tooltip.hover="trans('flow-builder.save-changes-to-the-flow')"
                type="button"
                class="btn btn-outline-primary btn-sm ml-4 save-button"
                :disabled="isSavingDisabled"
                @click="handlePersistFlow()">
                {{ saveButtonText }}
                <font-awesome-icon
                  v-if="isTreeSaving"
                  :icon="['fas', 'spinner']"
                  class="fa-btn fa-spin" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--TODO: Extract this div into a smaller component-->
      <div
        v-if="isBuilderCanvasEnabled && isEditable"
        class="tree-workspace-panel-heading panel-heading w-100 bg-white d-flex justify-content-start pt-0 pb-0">
        <div class="tree-workspace-panel-heading-contents">
          <ul class="nav">
            <li
              v-if="!isEmpty(blockClassesForContentCategory)"
              class="nav-item dropdown nav">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                @mouseover="openDropdownMenu($event.target)">
                <span class="nav-link-text">{{ 'flow-builder.content' | trans }}</span>
              </a>
              <div class="dropdown-menu mt-0">
                <template v-for="(classDetails, className) in blockClassesForContentCategory">
                  <div
                    v-if="shouldDisplayDividerBefore(blockClassesForContentCategory, className)"
                    :key="`${className}divider`"
                    class="dropdown-divider" />
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
            <li
              v-if="!isEmpty(blockClassesForContactCategory)"
              class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                @mouseover="openDropdownMenu($event.target)">
                <span class="nav-link-text">{{ 'flow-builder.contact' | trans }}</span>
              </a>
              <div class="dropdown-menu mt-0">
                <template v-for="(classDetails, className) in blockClassesForContactCategory">
                  <div
                    v-if="shouldDisplayDividerBefore(blockClassesForContactCategory, className)"
                    :key="`${className}divider`"
                    class="dropdown-divider" />
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
            <li
              v-if="!isEmpty(blockClassesForBranchingCategory)"
              class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                @mouseover="openDropdownMenu($event.target)">
                <span class="nav-link-text">{{ 'flow-builder.branching' | trans }}</span>
              </a>
              <div class="dropdown-menu mt-0">
                <template v-for="(classDetails, className) in blockClassesForBranchingCategory">
                  <div
                    v-if="shouldDisplayDividerBefore(blockClassesForBranchingCategory, className)"
                    :key="`${className}divider`"
                    class="dropdown-divider" />
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
            <li
              v-if="!isEmpty(blockClassesForDeveloperCategory)"
              class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                @mouseover="openDropdownMenu($event.target)">
                <span class="nav-link-text">{{ 'flow-builder.advanced' | trans }}</span>
              </a>
              <div class="dropdown-menu mt-0">
                <template v-for="(classDetails, className) in blockClassesForDeveloperCategory">
                  <div
                    v-if="shouldDisplayDividerBefore(blockClassesForDeveloperCategory, className)"
                    :key="`${className}divider`"
                    class="dropdown-divider" />
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
    <div v-if="isBuilderCanvasEnabled" class="tree-builder-toolbar-alerts w-100">
      <selection-banner
        v-if="isEditable"
        @updated="handleHeightChangeFromDOM" />
      <error-notifications @updated="handleHeightChangeFromDOM" />
    </div>
  </div>
</template>
<script lang="ts">
import {BModal, BootstrapVue, BTooltip} from 'bootstrap-vue'
import Vue from 'vue'
import Lang from '@/lib/filters/lang'
import Permissions from '@/lib/mixins/Permissions'
import Routes from '@/lib/mixins/Routes'
import {identity, isEmpty, isNil, pickBy as _pickBy, reduce, omit} from 'lodash'
import flow from 'lodash/fp/flow'
import pickBy from 'lodash/fp/pickBy'
import {computeBlockCanvasCoordinates} from '@/store/builder'
import Component, {mixins} from 'vue-class-component'
import {Action, Getter, Mutation, namespace, State} from 'vuex-class'
import {IBlock, IContext, IFlow, IResource} from '@floip/flow-runner'
import {RawLocation} from 'vue-router'
import {Dictionary} from 'vue-router/types/router'
import {Watch} from 'vue-property-decorator'

Vue.use(BootstrapVue)
Vue.component('BTooltip', BTooltip)

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')
const clipboardVuexNamespace = namespace('clipboard')
const validationVuexNamespace = namespace('validation')

@Component({
  components: {
    BModal,
  },
})
export class TreeBuilderToolbar extends mixins(Routes, Permissions, Lang) {
  isExportVisible = false
  height = 102

  // The "Saving" text flashes too quickly w/o actual backend interaction
  private readonly SAVING_ANIMATION_DURATION = 1000

  async mounted(): Promise<void> {
    const routeMeta = this.$route.meta ? this.$route.meta : {}
    this.onMetaChanged(routeMeta)

    const editFlowModal = this.$refs['edit-flow-modal'] as BModal | undefined
    if (editFlowModal) {
      editFlowModal.$on('shown', () => {
        const routeMeta = this.$route.meta
        if (!routeMeta || routeMeta.isFlowEditorShown !== true) {
          this.$router.replace({
            name: 'flow-details',
          })
        }
      })
      editFlowModal.$on('hidden', () => {
        const routeMeta = this.$route.meta
        if (routeMeta && routeMeta.isFlowEditorShown === true) {
          this.$router.replace({
            name: 'flow-canvas',
          })
        }
      })
    } else {
      console.debug('Builder Toolbar', 'Unable to find the edit flow modal on mount - deep linking may not work')
    }
  }

  @Watch('$route.meta', {immediate: true, deep: true})
  onMetaChanged(meta: {[key: string]: string}): void {
    const editFlowModal = this.$refs['edit-flow-modal'] as BModal | undefined
    if (editFlowModal) {
      if (meta.isFlowEditorShown) {
        editFlowModal.show()
      } else {
        editFlowModal.hide()
      }
    }
  }

  // Computed ####################

  isEmpty(value?: unknown): boolean {
    return isEmpty(value)
  }

  get flow(): string {
    return JSON.stringify(
      omit(this.activeFlowContainer, 'isCreated'),
      null,
      2,
    )
  }

  get resourceUrl(): string {
    return this.editTreeRoute({
      component: 'resource-viewer',
      mode: this.isEditable ? 'edit' : 'view',
    })
  }

  get downloadAudioUrl(): string {
    return this.editTreeRoute({
      component: 'downloadaudio',
    })
  }

  get treeUrl(): string {
    return this.editTreeRoute({
      component: 'builder',
      mode: this.isEditable ? 'edit' : 'view',
    })
  }

  get editTreeUrl(): string {
    return this.editTreeRoute({
      component: 'builder',
      mode: 'edit',
    })
  }

  get viewTreeUrl(): string {
    return this.editTreeRoute({
      component: 'builder',
      mode: 'view',
    })
  }

  get saveButtonText(): string {
    if (this.isTreeSaving) {
      return this.trans('flow-builder.saving')
    } else if (this.hasFlowChanges) {
      return this.trans('flow-builder.save')
    } else {
      return this.trans('flow-builder.saved')
    }
  }

  get isSavingDisabled(): boolean {
    // TODO: Also disable when there are no changes; once hasFlowChanges is implemented properly
    return this.isTreeSaving === true
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
      pickBy((classDetails: { [key: string]: any }) => this.hasMenuCategory(classDetails, 3) || this.hasClassDetail(classDetails, 'branchingMenu')),
    )(this.ui.blockClasses)
  }

  get blockClassesForDeveloperCategory(): any {
    return flow(
      pickBy((classDetails: { [key: string]: any }) => !this.hasClassDetail(classDetails, 'hidden_in_menu')),
      pickBy((classDetails: { [key: string]: any }) => this.hasMenuCategory(classDetails, 5)),
    )(this.ui.blockClasses)
  }

  get canViewResultsTotals(): boolean {
    return (this.can('view-result-totals') && this.isFeatureViewResultsEnabled)
  }

  get hasSimulator(): boolean {
    return this.hasOfflineMode === true && this.isFeatureSimulatorEnabled === true
  }

  // Methods #####################

  async handleAddBlockByTypeSelected({type}: { type: IBlock['type'] }): Promise<void> {
    const {uuid: blockId} = await this.flow_addBlankBlockByType({
      type,
      ui_metadata: {
        canvas_coordinates: computeBlockCanvasCoordinates(this.activeBlock),
      },
    })
    this.activateBlock({blockId})
    await this.$router.push({
      name: 'block-selected-details',
      params: {blockId},
    })
  }

  async handlePersistFlow(route: RawLocation): Promise<void> {
    //TODO - hook into validation system when we have it - block the logic here if invalid.

    // Handle redundant navigation
    if (this.$route.path === route) {
      return
    }

    //If we aren't in edit mode there should be nothing to persist
    if (this.isEditable) {
      this.setTreeSaving(true)
      const flowContainer = (await Promise.all([
        this.flow_persist({
          persistRoute: this.route('flows.persistFlow', {}),
          flowContainer: this.activeFlowContainer,
        }),
        new Promise((resolve) => {
          global.setTimeout(() => {
            resolve(false)
          }, this.SAVING_ANIMATION_DURATION)
        }),
      ]))
        .filter(Boolean)
        .pop()
      this.setTreeSaving(false)
      if (!flowContainer) {
        //TODO - hook into showing validation errors design when we have it
        //This won't show normal validation errors as the frontend should have caught them. We'll use this to show server errors.
      }
    }
    if (route) {
      await this.$router.push(route)
    }
  }
  showOrHideEditFlowModal(): void {
    const editFlowModal: any = this.$refs['edit-flow-modal']
    if (editFlowModal) {
      editFlowModal.toggle()
    }
  }
  openDropdownMenu(targetElement: HTMLElement): void {
    if (!targetElement.hasAttribute('aria-expanded')) {
      return
    }

    if (targetElement.getAttribute('aria-expanded') === 'true') {
      return
    }

    targetElement.click()
  }

  toggleExportVisibility(): void {
    this.isExportVisible = !this.isExportVisible
  }

  editTreeRoute({component = null, mode = null}: { component?: any, mode?: string | null } = {}): string {
    const context = this.removeNilValues({
      flowId: this.activeFlow?.uuid,
      component,
      mode,
    })
    return this.route('flows.editFlow', context)
  }

  hasClassDetail(classDetails: { [key: string]: any }, attribute: string): boolean {
    return !isNil(classDetails[attribute]) && classDetails[attribute]
  }

  hasMenuCategory(classDetails: { [key: string]: any }, category: number): boolean {
    return this.hasClassDetail(classDetails, 'menu_category') && classDetails.menu_category === category
  }

  translateTreeClassName(className: string): string {
    return this.trans(`flow-builder.${className}`)
  }

  shouldDisplayDividerBefore(blockClasses: { [key: string]: any }, className: string): string {
    const shouldShowDividerBeforeBlock = _pickBy(
      blockClasses,
      (classDetails) => this.hasClassDetail(classDetails, 'divider_before'),
    )[className]
    return shouldShowDividerBeforeBlock && this.isBlockAvailableByBlockClass[className]
  }

  // handleResourceViewerSelected(): void {
  //   this.$el.scrollIntoView(true)
  // }

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
  @Getter hasToolbarFlowTitle!: boolean
  @Getter hasToolbarHomeButton!: boolean
  @Getter hasToolbarNewFlowButton!: boolean
  @Getter hasToolbarExportButton!: boolean
  @Getter isTreeSaving!: boolean
  @Getter isBlockAvailableByBlockClass?: any
  @Getter hasChanges!: boolean
  @Getter isTreeValid!: boolean
  @Getter selectedBlock?: IBlock
  @Getter isFeatureTreeSaveEnabled?: boolean
  @Getter isFeatureTreeSendEnabled?: boolean
  @Getter isFeatureTreeDuplicateEnabled?: boolean
  @Getter isFeatureViewResultsEnabled?: boolean
  @Getter isFeatureSimulatorEnabled?: boolean
  @Getter isFeatureUpdateInteractionTotalsEnabled?: boolean
  @Getter isResourceViewerEnabled?: boolean
  @Mutation setTreeSaving!: (isSaving: boolean) => void
  @Action attemptSaveTree!: void
  @Getter getToolbarConfig!: boolean

  // Flow
  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Getter activeFlowContainer?: IContext
  @flowVuexNamespace.Getter hasOfflineMode?: boolean
  @flowVuexNamespace.Getter isActiveFlowValid?: boolean
  @flowVuexNamespace.State flows?: IFlow[]
  @flowVuexNamespace.State resources?: IResource[]
  @flowVuexNamespace.Action flow_removeBlock!: ({flowId, blockId}: { flowId?: string, blockId?: IBlock['uuid'] }) => void
  @flowVuexNamespace.Action flow_addBlankBlockByType!: ({type, ...props}: Partial<IBlock>) => Promise<IBlock>
  @flowVuexNamespace.Action flow_duplicateBlock!: ({
    flowId,
    blockId,
  }: { flowId?: string, blockId?: IBlock['uuid'] }) => Promise<IBlock>
  @flowVuexNamespace.Action flow_persist!: ({
    persistRoute,
    flowContainer,
  }: { persistRoute: any, flowContainer?: IContext }) => Promise<IContext | null>

  // Builder
  @builderVuexNamespace.Getter isEditable!: boolean
  @builderVuexNamespace.Getter hasFlowChanges!: boolean
  @builderVuexNamespace.State activeBlockId?: IBlock['uuid']
  @builderVuexNamespace.Getter activeBlock?: IBlock
  @builderVuexNamespace.Getter isBuilderCanvasEnabled!: boolean
  @builderVuexNamespace.Getter isResourceViewerCanvasEnabled!: boolean
  @builderVuexNamespace.Mutation activateBlock!: ({blockId}: { blockId: IBlock['uuid'] | null}) => void
  @builderVuexNamespace.Mutation setActiveMainComponent!: ({mainComponent}: {mainComponent: string | undefined}) => void

  // Clipboard
  @clipboardVuexNamespace.Action setSimulatorActive!: (value: boolean) => void

  @validationVuexNamespace.Action remove_block_validation!: ({blockId}: { blockId?: IBlock['uuid']}) => void
}

export default TreeBuilderToolbar
</script>

<style lang="scss">
@import "../../../scss/custom_variables";

.tree-builder-toolbar {
  .flows-exporter textarea {
    display: block;
    width: 100%;
  }
}

.viamo-app-container .tree-builder-toolbar {
  position: sticky;
  left: 0;
  padding-left: 100px;
  width: calc(100vw - 30px);
}

.tree-builder-toolbar-main-menu {
  background: $neutral-50;
}

.btn-toolbar > .flow-label {
  max-width: 25%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tree-workspace-panel-heading-contents .nav .nav-item a {
  display: flex;
  align-items: center;
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

.tree-builder-toolbar-main-menu .btn.btn-outline-primary {
  color: $primary-900;
  border-color: $primary-900;
  background-color: $white;

  &.active {
    border-color: $primary-900;
    &.disabled {
      color: $primary-900;
      background-color: $primary-100;
      opacity: 1;
    }
  }
}
</style>
