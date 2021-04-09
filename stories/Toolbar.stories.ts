import Vuex from 'vuex'
import Vue from 'vue'
import {
  Action, Mutation, namespace
} from 'vuex-class'
const flowVuexNamespace = namespace('flow')
import FlowBuilderContainer from "./story-utils/FlowBuilderContainer.vue";
import {Component} from 'vue-property-decorator'
import {IRootState, store} from '@/store'
import TreeBuilderToolbar from "@/components/interaction-designer/toolbar/TreeBuilderToolbar.vue";
import StoryRouter from 'storybook-vue-router';
import {routes} from './story-utils/router'
import {
  findFlowWith,
  IContext,
} from '@floip/flow-runner'

// Allow story to load components which use <router-link>
const decorators = [() => ({ template: '<div><story/></div>' })];
decorators.push(StoryRouter({}, {
  routes
}))

const builderVuexNamespace = namespace('builder')

export default {
  title: 'InteractionDesigner/Toolbar',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  decorators
}

const ToolbarTemplate = `
  <flow-builder-container v-if="activeFlow">
    <tree-builder-toolbar/>
  </flow-builder-container>`

store.modules.flow.mutations.flow_setActiveFlowUUID = function flow_setActiveFlowUUID(state, { flowId, newUUID }) {
  const flow = findFlowWith(flowId, state as unknown as IContext)
  flow.uuid = newUUID
  state.firstFlowId = newUUID
}

const BaseOptions = {
  components: {FlowBuilderContainer, TreeBuilderToolbar},
  template: ToolbarTemplate,
  store: new Vuex.Store<IRootState>(store),
  async created() {
    this.configure({appConfig: {}, builderConfig: {}});
    // @ts-ignore
    this.initializeTreeModel() // from trees store
    await this.flow_addBlankFlow()
    //Force all the links to have a static flow id
    this.flow_setActiveFlowUUID({ flowId: this.activeFlow.uuid, newUUID: "1" })
  }
}
class BaseMountedClass extends Vue {
  @Action initializeTreeModel: any

  @Mutation configure
  @Mutation addEnabledFeature: any
  @Mutation removeEnabledFeature: any
  @flowVuexNamespace.Action flow_addBlankFlow!: () => Promise<IFlow>
  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Mutation flow_setActiveFlowUUID: any
  @builderVuexNamespace.Action setIsEditable: void
}

// Default
@Component<any>(
    {
        ...BaseOptions,
      async mounted() {
        this.setIsEditable(false)
        this.addEnabledFeature({value: 'resourceEditor'})
      }
    }
)
class DefaultClass extends BaseMountedClass {

}
export const Default = () => (DefaultClass)

// Without Resource Editor toggle
@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      this.setIsEditable(false)
      this.removeEnabledFeature({value: 'resourceEditor'})
    }
  }
)
class ResourceEditorClass extends BaseMountedClass {

}
export const WithoutResourceEditorToggle = () => (ResourceEditorClass)

// Edit flow
@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      this.setIsEditable(true)
      this.addEnabledFeature({value: 'resourceEditor'})
      this.removeEnabledFeature({value: 'treeSave'})
    }
  }
)
class EditFlowClass extends BaseMountedClass {

}
export const EditFlow = () => (EditFlowClass)

// With Save button
@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      this.setIsEditable(true)
      this.addEnabledFeature({value: 'resourceEditor'})
      this.addEnabledFeature({value: 'treeSave'})
    }
  }
)
class SaveClass extends BaseMountedClass {

}
export const WithSaveButton = () => (SaveClass)

// With Extra right grouped button
let BaseOptions2 = BaseOptions
BaseOptions2.template = `
  <flow-builder-container v-if="activeFlow">
    <tree-builder-toolbar>
      <template slot="right-grouped-buttons">
        <a href="#"
           class="btn btn-success"
           :disabled="true"
           title="another grouped button">
           Action X
        </a>
        <a href="#"
           class="btn btn-warning"
           :disabled="false"
           title="another grouped button">
           Action Y
        </a>
      </template>
    </tree-builder-toolbar>
  </flow-builder-container>`
@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      this.setIsEditable(true)
      this.addEnabledFeature({value: 'resourceEditor'})
      this.addEnabledFeature({value: 'treeSave'})
    }
  }
)
class GroupButtonsSlotClass extends BaseMountedClass {

}
export const WithGroupedButtonsSlot = () => (GroupButtonsSlotClass)

// With Extra buttons
let BaseOptions3 = BaseOptions
BaseOptions3.template = `
  <flow-builder-container v-if="activeFlow">
    <tree-builder-toolbar>
      <template slot="extra-buttons">
        <a href="#"
           class="btn btn-success"
           :disabled="true"
           title="another grouped button">
           Action X
        </a>
        <a href="#"
           class="btn btn-warning"
           :disabled="false"
           title="another grouped button">
           Action Y
        </a>
      </template>
    </tree-builder-toolbar>
  </flow-builder-container>`
@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      this.setIsEditable(true)
      this.addEnabledFeature({value: 'resourceEditor'})
      this.addEnabledFeature({value: 'treeSave'})
    }
  }
)
class ExtraButtonsSlotClass extends BaseMountedClass {

}
export const WithExtraButtonsSlot = () => (ExtraButtonsSlotClass)
