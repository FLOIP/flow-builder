import Vuex from 'vuex'

import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {Component} from 'vue-property-decorator'
import {IRootState, store} from '@/store'
import FlowEditor from '@/components/interaction-designer/flow-editors/FlowEditor.vue'
import {namespace} from 'vuex-class'
import ILanguage from '@floip/flow-runner/dist/flow-spec/ILanguage'
import {SupportedMode} from '@floip/flow-runner'
import {BaseMountedVueClass} from "./story-utils/storeSetup";

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

// Stories
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
class CurrentClass extends BaseMountedVueClass {
    @flowVuexNamespace.Mutation flow_setSupportedMode: any
}
export const Default = () => (CurrentClass)

//ExistingDataPreFilled
@Component<any>(
    {
        ...BaseOptions,
        store: new Vuex.Store<IRootState>(store),
        async mounted() {
            const {uuid: flowId} = await this.flow_addBlankFlow()
            const sampleLanguages: ILanguage[] = [
                {
                  id: '22',
                  label: "English",
                  iso_639_3: "EN"
                }
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
class CurrentClass2 extends BaseMountedVueClass {
    @flowVuexNamespace.Mutation flow_setName:any
    @flowVuexNamespace.Mutation flow_setLabel:any
    @flowVuexNamespace.Mutation flow_setInteractionTimeout:any
    @flowVuexNamespace.Mutation flow_setSupportedMode:any
    @flowVuexNamespace.Mutation flow_setLanguages:any
}
export const ExistingDataPreFilled = () => (CurrentClass2)
