import {Component, Vue} from 'vue-property-decorator'
import FlowEditor from '@/components/interaction-designer/flow-editors/FlowEditor.vue'
import {namespace} from 'vuex-class'
import {ILanguage, SupportedMode} from '@floip/flow-runner'
import Vuex from 'vuex'
import {IRootState, store} from '@/store'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

const flowVuexNamespace = namespace('flow')

Vue.use(Vuex)

export default {
  title: 'Flow/Flow Editor',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const FlowEditorTemplate = `
  <flow-builder-sidebar-editor-container :flow="activeFlow">
    <flow-editor :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions: IBaseOptions = {
  components: {FlowBuilderSidebarEditorContainer, FlowEditor},
  template: FlowEditorTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// Stories
@Component({
  ...BaseOptions,
})
class CurrentClass extends BaseMountedVueClass {
  async mounted() {
    const {uuid: flowId} = await this.flow_addBlankFlow()
    this.flow_setSupportedMode({flowId, value: []})
  }

  @flowVuexNamespace.Mutation flow_setSupportedMode: any
}

export const Default = () => (CurrentClass)

//ExistingDataPreFilled
@Component({
  ...BaseOptions,
})
class CurrentClass2 extends BaseMountedVueClass {
  async mounted() {
    const {uuid: flowId} = await this.flow_addBlankFlow()
    const sampleLanguages: ILanguage[] = [
      {
        id: '22',
        label: 'English',
        iso_639_3: 'EN',
      },
    ]

    const sampleModes = [
      SupportedMode.SMS,
      SupportedMode.IVR,
      SupportedMode.RICH_MESSAGING,
    ]

    this.flow_setLabel({flowId, label: 'A flow label'})
    this.flow_setNameFromLabel({flowId, label: 'A flow label'})
    this.flow_setInteractionTimeout({flowId, value: 20})
    this.flow_setSupportedMode({flowId, value: sampleModes})
    this.flow_setLanguages({flowId, value: sampleLanguages})
  }

  @flowVuexNamespace.Mutation flow_setNameFromLabel: any
  @flowVuexNamespace.Mutation flow_setLabel: any
  @flowVuexNamespace.Mutation flow_setInteractionTimeout: any
  @flowVuexNamespace.Mutation flow_setSupportedMode: any
  @flowVuexNamespace.Mutation flow_setLanguages: any
}

export const ExistingDataPreFilled = () => (CurrentClass2)
