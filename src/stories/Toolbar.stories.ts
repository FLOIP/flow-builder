import Vuex from 'vuex'
import Vue from 'vue'
import {
    Action, Mutation
} from 'vuex-class'
import FlowBuilderContainer from "@/stories/story-utils/FlowBuilderContainer.vue";
import {Component} from 'vue-property-decorator'
import {IRootState, store} from '@/store'
import TreeBuilderToolbar from "@/components/interaction-designer/toolbar/TreeBuilderToolbar.vue";

import {namespace} from 'vuex-class'

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
    }
  }
)
class CurrentClass2 extends BaseMountedClass {
  @Mutation updateIsEditable: any
}
export const EditFlow = () => (CurrentClass2)
