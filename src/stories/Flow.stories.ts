import Vue from 'vue'
import Vuex from 'vuex'

import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {Component} from 'vue-property-decorator'
import {IRootState, store} from '../../stores'
import FlowEditor from '../flow-editors/FlowEditor.vue'
import {namespace} from 'vuex-class'
import ILanguage from '@floip/flow-runner/dist/flow-spec/ILanguage'
import {SupportedMode} from '@floip/flow-runner'

const flowVuexNamespace = namespace('flow')

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

const BaseOptions = {
  components: {FlowBuilderSidebarEditorContainer, FlowEditor},
  template: FlowEditorTemplate,
}

class BaseClass extends Vue {
  @flowVuexNamespace.Getter activeBlock
  @flowVuexNamespace.Getter activeFlow

  @flowVuexNamespace.Action flow_addBlankFlow
}

// Stories
export const Default = () => (
  @Component<any>(
    {
      ...BaseOptions,
      store: new Vuex.Store<IRootState>(store),
      async mounted() {
        const {uuid: flowId} = await this.flow_addBlankFlow()
        this.flow_setSupportedMode({flowId, value: []})
      },
    }
  )
  class CurrentClass extends BaseClass {
    @flowVuexNamespace.Mutation flow_setSupportedMode
  }
)

export const ExistingDataPreFilled = () => (
  @Component<any>(
    {
      ...BaseOptions,
      store: new Vuex.Store<IRootState>(store),
      async mounted() {
        const {uuid: flowId} = await this.flow_addBlankFlow()
        const sampleLanguages: ILanguage[] = [
          {
            id: 1,
            name: "English",
            abbreviation: "EN",
            orgId: "",
            rightToLeft: true,
          },
        ]

        const sampleModes = [
          SupportedMode.SMS,
          SupportedMode.IVR,
          SupportedMode.RICH_MESSAGING
        ]

        this.flow_setName({flowId, value: "FlowName"})
        this.flow_setLabel({flowId, value: "A flow label"})
        this.flow_setInteractionTimeout({flowId, value: 20})
        this.flow_setSupportedMode({flowId, value: sampleModes})
        this.flow_setLanguages({flowId, value: sampleLanguages})
      },
    }
  )
  class CurrentClass extends BaseClass {
    @flowVuexNamespace.Mutation flow_setName
    @flowVuexNamespace.Mutation flow_setLabel
    @flowVuexNamespace.Mutation flow_setInteractionTimeout
    @flowVuexNamespace.Mutation flow_setSupportedMode
    @flowVuexNamespace.Mutation flow_setLanguages
  }
)