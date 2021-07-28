import {Component, Vue} from 'vue-property-decorator'
import CaseBlock from '@/components/interaction-designer/block-types/Core_CaseBlock.vue'
import caseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import {namespace, State} from 'vuex-class'
import Vuex from 'vuex'
import {IRootState, store} from '@/store'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IBlockExit} from '@floip/flow-runner'

const flowVuexNamespace = namespace('flow')

Vue.use(Vuex)

export default {
  title: 'Core/Case Block Styled',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const CaseBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <case-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions: IBaseOptions = {
  components: {CaseBlock, FlowBuilderSidebarEditorContainer},
  template: CaseBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default case block state
@Component({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, caseBlockStore)
  }
}

export const Default = () => (DefaultClass)

//ExistingDataBlock
@Component({
  ...BaseOptions,
})
class CurrentClass2 extends BaseMountedVueClass {
  async mounted() {
    const {block} = await this.baseMounted(BLOCK_TYPE, caseBlockStore)
    const blockId = block.uuid

    this.setDescription(blockId)
    this.setTags(blockId)

    const exits: IBlockExit[] = [
      await this.block_createBlockExitWith({
        props: {
          uuid: await (new IdGeneratorUuidV4()).generate(),
          name: 'An exit',
          test: 'block.value = "hello"',
        },
      }),

      await this.block_createBlockExitWith({
        props: {
          uuid: await (new IdGeneratorUuidV4()).generate(),
          name: 'Another exit',
          test: 'block.value = "goodbye"',
        },
      }),
    ]

    this.block_addExit({blockId, exit: exits[0]})
    this.block_addExit({blockId, exit: exits[1]})
  }

  @flowVuexNamespace.Mutation block_addExit: any
  @flowVuexNamespace.Action block_createBlockExitWith: any
  @flowVuexNamespace.Action block_createBlockDefaultExitWith: any
}

export const ExistingDataBlock = () => (CurrentClass2)
