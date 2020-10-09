import Vuex from 'vuex'
import Vue from 'vue'
import {
    Action,
} from 'vuex-class'
import FlowBuilderContainer from "@/stories/story-utils/FlowBuilderContainer.vue";
import {Component} from 'vue-property-decorator'
import {IRootState, store} from '@/store'
import TreeBuilderToolbar from "@/components/interaction-designer/toolbar/TreeBuilderToolbar.vue";

import {namespace} from 'vuex-class'
const flowVuexNamespace = namespace('flow')

export default {
  title: 'Toolbar/Toolbar slot extension',
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
    }
)
class CurrentClass extends BaseMountedClass {}
export const Default = () => (CurrentClass)

//ExistingDataPreFilled
// @Component<any>(
//     {
//         ...BaseOptions,
//         store: new Vuex.Store<IRootState>(store),
//         async mounted() {
//             const {uuid: flowId} = await this.flow_addBlankFlow()
//             const sampleLanguages: ILanguage[] = [
//                 {
//                     id: '1',
//                     name: "English",
//                     abbreviation: "EN",
//                     orgId: "",
//                     rightToLeft: true,
//                 },
//             ]
//
//             const sampleModes = [
//                 SupportedMode.SMS,
//                 SupportedMode.IVR,
//                 SupportedMode.RICH_MESSAGING
//             ]
//
//             this.flow_setName({flowId, value: "FlowName"})
//             this.flow_setLabel({flowId, value: "A flow label"})
//             this.flow_setInteractionTimeout({flowId, value: 20})
//             this.flow_setSupportedMode({flowId, value: sampleModes})
//             this.flow_setLanguages({flowId, value: sampleLanguages})
//         },
//     }
// )
// class CurrentClass2 extends BaseMountedVueClass {
//     @flowVuexNamespace.Mutation flow_setName:any
//     @flowVuexNamespace.Mutation flow_setLabel:any
//     @flowVuexNamespace.Mutation flow_setInteractionTimeout:any
//     @flowVuexNamespace.Mutation flow_setSupportedMode:any
//     @flowVuexNamespace.Mutation flow_setLanguages:any
// }
// export const ExistingDataPreFilled = () => (CurrentClass2)
