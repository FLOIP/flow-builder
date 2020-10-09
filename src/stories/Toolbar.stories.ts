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
}

// Default
@Component<any>(
    {
        ...BaseOptions,
      async mounted() {
        this.updateIsEditable({value: 0})
      }
    }
)
class CurrentClass extends BaseMountedClass {
  @Mutation updateIsEditable: any
}
export const Default = () => (CurrentClass)

// Edit flow
@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      this.updateIsEditable({value: 1})
      this.removeEnabledFeature({value: 'treeSave'})
    }
  }
)
class CurrentClass2 extends BaseMountedClass {
  @Mutation updateIsEditable: any
  @Mutation removeEnabledFeature: any
}
export const EditFlow = () => (CurrentClass2)

// With Save flow
@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      this.updateIsEditable({value: 1})
      this.addEnabledFeature({value: 'treeSave'})
    }
  }
)
class CurrentClass3 extends BaseMountedClass {
  @Mutation updateIsEditable: any
  @Mutation addEnabledFeature: any
  @Mutation removeEnabledFeature: any
}
export const WithSaveFlow = () => (CurrentClass3)

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
      this.addEnabledFeature({value: 'treeSave'})
    }
  }
)
class CurrentClass4 extends BaseMountedClass {
  @Mutation updateIsEditable: any
  @Mutation addEnabledFeature: any
  @Mutation removeEnabledFeature: any
}
export const WithGroupedButtonsSlot = () => (CurrentClass4)
