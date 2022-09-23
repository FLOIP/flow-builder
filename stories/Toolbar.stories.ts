/* eslint-disable max-classes-per-file */
import Vue from 'vue'
import {Action, Mutation, namespace} from 'vuex-class'
import {Component} from 'vue-property-decorator'
import {IRootState, store} from '@/store'
import TreeBuilderToolbar from '@/components/interaction-designer/toolbar/TreeBuilderToolbar.vue'
import StoryRouter from 'storybook-vue-router'
import {findFlowWith, IContext, IFlow} from '@floip/flow-runner'
import Vuex from 'vuex'
import {routes} from './story-utils/router'
import {IBaseOptions} from './story-utils/storeSetup'
import FlowBuilderContainer from './story-utils/FlowBuilderContainer.vue'

Vue.use(Vuex)

// Allow story to load components which use <router-link>
const decorators = [() => ({template: '<div><story/></div>'})]
decorators.push(StoryRouter({}, {
  routes,
}))

const builderVuexNamespace = namespace('builder')
const flowVuexNamespace = namespace('flow')

export default {
  title: 'InteractionDesigner/Toolbar',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  decorators,
}

const ToolbarTemplate = `
  <flow-builder-container v-if="activeFlow">
    <tree-builder-toolbar/>
  </flow-builder-container>`

// @ts-ignore: Custom store shim for stories only
store.modules.flow.mutations.flow_setActiveFlowUUID = function flow_setActiveFlowUUID(state, {flowId, newUUID}) {
  const flow = findFlowWith(flowId, state as unknown as IContext)
  flow.uuid = newUUID
  state.first_flow_id = newUUID
}

const BaseOptions: IBaseOptions = {
  components: {FlowBuilderContainer, TreeBuilderToolbar},
  template: ToolbarTemplate,
  store: new Vuex.Store<IRootState>(store),
}

@Component({
  ...BaseOptions,
})
class BaseMountedClass extends Vue {
  async created() {
    this.configure({appConfig: {}, builderConfig: {}})
    // from trees store
    this.initializeTreeModel()
    await this.flow_addBlankFlow()
    //Force all the links to have a static flow id
    this.flow_setActiveFlowUUID({flowId: this.activeFlow.uuid, newUUID: '1'})
  }

  @Action initializeTreeModel: any

  @Mutation configure: any
  @Mutation addEnabledFeature: any
  @Mutation removeEnabledFeature: any
  @flowVuexNamespace.Action flow_addBlankFlow!: () => Promise<IFlow>
  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Mutation flow_setActiveFlowUUID: any
  @builderVuexNamespace.Action setIsEditable!: (value: boolean) => void
  @builderVuexNamespace.Mutation setActiveMainComponent!: ({mainComponent}: {mainComponent: string | undefined}) => void
}

// Default
@Component(
  {
    ...BaseOptions,
  },
)
class DefaultClass extends BaseMountedClass {
  async mounted() {
    this.setIsEditable(false)
    this.addEnabledFeature({value: 'resourceViewer'})
    this.setActiveMainComponent({mainComponent: 'builder'})
  }
}

export const Default = () => (DefaultClass)

// Without Resource Editor toggle
@Component(
  {
    ...BaseOptions,
  },
)
class NoResourceEditorClass extends BaseMountedClass {
  async mounted() {
    this.setIsEditable(false)
    this.removeEnabledFeature({value: 'resourceViewer'})
    this.setActiveMainComponent({mainComponent: 'builder'})
  }
}

export const NoResourceEditor = () => (NoResourceEditorClass)

// Edit resources
@Component(
  {
    ...BaseOptions,
  },
)
class EditResourceViewerClass extends BaseMountedClass {
  async mounted() {
    this.setIsEditable(true)
    this.addEnabledFeature({value: 'resourceViewer'})
    this.removeEnabledFeature({value: 'treeSave'})
    this.setActiveMainComponent({mainComponent: 'resource-viewer'})
  }
}

export const EditResourceViewer = () => (EditResourceViewerClass)

// Edit flow
@Component(
  {
    ...BaseOptions,
  },
)
class EditFlowClass extends BaseMountedClass {
  async mounted() {
    this.setIsEditable(true)
    this.addEnabledFeature({value: 'resourceViewer'})
    this.removeEnabledFeature({value: 'treeSave'})
    this.setActiveMainComponent({mainComponent: 'builder'})
  }
}

export const EditFlow = () => (EditFlowClass)

// With Save button
@Component(
  {
    ...BaseOptions,
  },
)
class SaveClass extends BaseMountedClass {
  async mounted() {
    this.setIsEditable(true)
    this.addEnabledFeature({value: 'resourceViewer'})
    this.addEnabledFeature({value: 'treeSave'})
    this.setActiveMainComponent({mainComponent: 'builder'})
  }
}

export const WithSaveButton = () => (SaveClass)

// With Extra right grouped button
const BaseOptions2 = BaseOptions
BaseOptions2.template = `
  <flow-builder-container v-if="activeFlow">
    <tree-builder-toolbar>
      <template slot="right-grouped-buttons">
        <a href="#"
           class="btn btn-success btn-sm ml-4"
           :disabled="true"
           title="another grouped button">
           Action X
        </a>
        <a href="#"
           class="btn btn-warning btn-sm"
           :disabled="false"
           title="another grouped button">
           Action Y
        </a>
      </template>
    </tree-builder-toolbar>
  </flow-builder-container>`

@Component(
  {
    ...BaseOptions,
  },
)
class GroupButtonsSlotClass extends BaseMountedClass {
  async mounted() {
    this.setIsEditable(true)
    this.addEnabledFeature({value: 'resourceViewer'})
    this.addEnabledFeature({value: 'treeSave'})
    this.setActiveMainComponent({mainComponent: 'builder'})
  }
}

export const WithGroupedButtonsSlot = () => (GroupButtonsSlotClass)

// With Extra buttons
const BaseOptions3 = BaseOptions
BaseOptions3.template = `
  <flow-builder-container v-if="activeFlow">
    <tree-builder-toolbar>
      <template slot="extra-buttons">
        <a href="#"
           class="btn btn-success btn-sm ml-4"
           :disabled="true"
           title="another grouped button">
           Action X
        </a>
        <a href="#"
           class="btn btn-warning btn-sm"
           :disabled="false"
           title="another grouped button">
           Action Y
        </a>
      </template>
    </tree-builder-toolbar>
  </flow-builder-container>`

@Component(
  {
    ...BaseOptions,
  },
)
class ExtraButtonsSlotClass extends BaseMountedClass {
  async mounted() {
    this.setIsEditable(true)
    this.addEnabledFeature({value: 'resourceViewer'})
    this.setActiveMainComponent({mainComponent: 'builder'})
    this.addEnabledFeature({value: 'treeSave'})
  }
}

export const WithExtraButtonsSlot = () => (ExtraButtonsSlotClass)

// Saving State
@Component(
  {
    ...BaseOptions,
  },
)
class SavingStateClass extends BaseMountedClass {
  async mounted() {
    this.addEnabledFeature({value: 'resourceViewer'})
    this.setActiveMainComponent({mainComponent: 'builder'})
    this.setTreeSaving(true)
  }

  @Mutation setTreeSaving: any
}

export const SavingState = () => (SavingStateClass)
