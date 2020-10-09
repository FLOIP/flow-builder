import Vuex from 'vuex'
import Vue from 'vue'
import {
    Action, Mutation
} from 'vuex-class'
import FlowBuilderContainer from "@/stories/story-utils/FlowBuilderContainer.vue";
import {Component} from 'vue-property-decorator'
import {IRootState, store} from '@/store'
import TreeBuilderToolbar from "@/components/interaction-designer/toolbar/TreeBuilderToolbar.vue";

export default {
  title: 'InteractionDesigner/Toolbar',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}


const ToolbarTemplate = `
  <flow-builder-container>
    <tree-builder-toolbar/>
  </flow-builder-container>`

const BaseOptions = {
  components: {FlowBuilderContainer, TreeBuilderToolbar},
  template: ToolbarTemplate,
  store: new Vuex.Store<IRootState>(store),
  created() {
      this.initializeTreeModel()
  },
}
class BaseMountedClass extends Vue {
  @Action initializeTreeModel: any

  @Mutation updateIsEditable: any
  @Mutation addEnabledFeature: any
  @Mutation removeEnabledFeature: any
}

// Default
@Component<any>(
    {
        ...BaseOptions,
      async mounted() {
        this.updateIsEditable({value: 0})
        this.addEnabledFeature({value: 'resourceEditor'})
      }
    }
)
class DefaultClass extends BaseMountedClass {

}
export const Default = () => (DefaultClass)

// Edit flow
@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      this.updateIsEditable({value: 1})
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
      this.updateIsEditable({value: 1})
      this.addEnabledFeature({value: 'resourceEditor'})
      this.addEnabledFeature({value: 'treeSave'})
    }
  }
)
class SaveClass extends BaseMountedClass {

}
export const WithSaveButton = () => (SaveClass)

// With Resource Editor toggle
@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      this.updateIsEditable({value: 0})
      this.addEnabledFeature({value: 'resourceEditor'})
    }
  }
)
class ResourceEditorClass extends BaseMountedClass {

}
export const WithResourceEditorToggle = () => (ResourceEditorClass)

// With Extra right grouped button
let BaseOptions2 = BaseOptions
BaseOptions2.template = `
  <flow-builder-container>
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
      this.updateIsEditable({value: 1})
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
  <flow-builder-container>
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
      this.updateIsEditable({value: 1})
      this.addEnabledFeature({value: 'resourceEditor'})
      this.addEnabledFeature({value: 'treeSave'})
    }
  }
)
class ExtraButtonsSlotClass extends BaseMountedClass {
  
}
export const WithExtraButtonsSlot = () => (ExtraButtonsSlotClass)
