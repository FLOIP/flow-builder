import Vue from 'vue'
import Vuex, {mapActions, mapGetters, mapMutations} from 'vuex'

import SetContactPropertyBlock from '@/components/interaction-designer/block-types/Core_SetContactPropertyBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {baseMounted, BaseMountedVueClass} from './story-utils/storeSetup'

import {IRootState, store} from '@/store'
import SetContactPropertyStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_SetContactPropertyStore'
import {Component} from "vue-property-decorator";
import {Mutation} from "vuex-class";

Vue.use(Vuex)

export default {
  title: 'Core/Set Contact Property',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const SetContactPropertyBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <set-contact-property-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

let baseOptions = {
  components: {SetContactPropertyBlock, FlowBuilderSidebarEditorContainer},
  template: SetContactPropertyBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}
// default state
@Component<any>({
  ...baseOptions,
  async mounted() {
    // @ts-ignore
    await baseMounted.bind(this)(BLOCK_TYPE, SetContactPropertyStore)
  },
})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => (DefaultClass)

@Component<any>({
  ...baseOptions,
  async mounted() {
    // Add sample data
    this.addSubscriberPropertyField({
      property: {
        "id": "123",
        "name": "name",
        "displayLabel": "Name"
      }
    })
    this.addSubscriberPropertyField({
      property: {
        "id": "124",
        "name": "date_of_birth",
        "displayLabel": "Date of birth"
      }
    })
    this.addSubscriberPropertyField({
      property: {
        "id": "125",
        "name": "comment",
        "displayLabel": "Comment"
      }
    })

    // @ts-ignore
    await baseMounted.bind(this)(BLOCK_TYPE, SetContactPropertyStore)
  },
})
class ExistingDataBlockClass extends BaseMountedVueClass {
  @Mutation addSubscriberPropertyField!: ({ property }) => void
}
export const ExistingDataBlock = () => (ExistingDataBlockClass)
