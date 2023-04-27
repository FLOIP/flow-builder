import Vue from 'vue'
import {namespace, State} from 'vuex-class'
import {IBlock, IFlow, ILanguage, SupportedContentType, SupportedMode} from '@floip/flow-runner'
import {cloneDeep, get, isEmpty} from 'lodash'
import Component from 'vue-class-component'
import Vuex from 'vuex'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import {IRootState, store} from '@/store'
import {IResourceDefinitionVariantOverModesFilter} from '@/store/flow/utils/resourceHelpers'
import registerCustomComponents from '@/common-imports'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

let storyInitState: any = {}

registerCustomComponents()

Vue.use(Vuex)

export interface IBaseOptions {
  components: any,
  template: string,
  store?: any,
}

/**
 * Vue class used to gather required Getter, Mutation, Action for the BaseMounted binding
 */
@Component({
  store: new Vuex.Store<IRootState>(store),
})
export class BaseMountedVueClass extends Vue {
  @builderVuexNamespace.Getter activeBlock!: IBlock
  @flowVuexNamespace.Getter activeFlow!: IFlow

  @builderVuexNamespace.Mutation activateBlock!: ({blockId}: { blockId: IBlock['uuid'] | null }) => void

  @flowVuexNamespace.Action flow_addBlankFlow!: () => Promise<IFlow>
  @flowVuexNamespace.Action flow_addBlankBlockByType!: ({type, ...props}: Partial<IBlock>) => Promise<IBlock>
  @flowVuexNamespace.Action flow_add!: ({flow}: { flow: IFlow }) => Promise<IFlow>
  @flowVuexNamespace.Action flow_createWith!: ({props}: { props: { uuid: string } & Partial<IFlow> }) => Promise<IFlow>

  @flowVuexNamespace.Mutation flow_setActiveFlowId!: ({flowId}: { flowId: IFlow['uuid'] }) => void
  @flowVuexNamespace.Mutation block_setName: any
  @flowVuexNamespace.Mutation block_setLabel: any
  @flowVuexNamespace.Mutation block_setSemanticLabel: any
  @flowVuexNamespace.Mutation flow_setFirstBlockId: any

  @flowVuexNamespace.Mutation block_setTags!: ({blockId, value}: {blockId: IBlock['uuid'], value: string[]}) => void
  @State(({trees: {ui: {blockTags}}}) => blockTags) blockTags!: string[]

  setDescription(blockId: string) {
    this.block_setName({blockId, value: 'A Name'})
    this.block_setLabel({blockId, value: 'A Label'})
    this.block_setSemanticLabel({blockId, value: 'A Semantic Label'})
  }

  setTags(blockId: string) {
    // Available tags
    this.blockTags.push('tag1')
    this.blockTags.push('tag2')
    // Selected tags
    this.block_setTags({
      blockId,
      value: ['tag1'],
    })
  }

  /**
   * Fake a 1st block to make sure the current block won't be selected
   */
  async fakeCaseBlockAsFirstBlock(flowId: string) {
    await this.safeRegisterBlockModule(CASE_BLOCK_TYPE, caseBlockStore)
    const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
    const {uuid: caseBlockId} = caseBlock
    this.flow_setFirstBlockId({blockId: caseBlockId, flowId})
  }

  /**
   * Safe register block module
   * Because some weird race condition is leading to modules not getting unregistered when clicking between stories before the next story re-registers
   */
  async safeRegisterBlockModule(BLOCK_TYPE: string, blockTypeStore: any): Promise<any> {
    if (this.$store.hasModule(['flow', BLOCK_TYPE])) {
      this.$store.unregisterModule(['flow', BLOCK_TYPE])
    }
    // todo: this will end up in `flow_addBlankBlockByType` once we get async import builds working
    console.log(`Registering module flow/${BLOCK_TYPE}`)
    this.$store.registerModule(['flow', BLOCK_TYPE], blockTypeStore)
  }

  async baseMounted(BLOCK_TYPE: string, blockTypeStore: any): Promise<any> {
    if (isEmpty(storyInitState)) {
      console.log('storyInitState is empty')
      storyInitState = cloneDeep(this.$store.state)
    } else {
      // Make sure we have cleared state in store for each new mounted story, as we're using one flow to put blocks
      console.log('storyInitState is NOT empty, clearing it')
      Object.assign(this.$store.state, cloneDeep(storyInitState))
    }

    await this.safeRegisterBlockModule(BLOCK_TYPE, blockTypeStore)

    const flow = await this.flow_addBlankFlow()
    flow.languages = [
      {id: '1', label: 'English'} as ILanguage,
      // mutation
    ]

    const block = await this.flow_addBlankBlockByType({type: BLOCK_TYPE})
    const {uuid: blockId} = block

    this.activateBlock({blockId})

    return {block, flow}
  }
}

@Component({
  store: new Vuex.Store<IRootState>(store),
})
export class BaseMountedVueClassWithResourceAndMode extends BaseMountedVueClass {
  @flowVuexNamespace.Action resource_setValue: any
  @flowVuexNamespace.Mutation flow_setSupportedMode!: ({flowId, value}: {flowId: string, value: SupportedMode[] | SupportedMode}) => void

  setResourceData({shouldSetChoices, configPath}: { shouldSetChoices: boolean, configPath: string }) {
    const {
      languages: {
        0: {id: languageId},
      },
    }: IFlow = this.activeFlow
    const resourceId = get(this.activeBlock, configPath, '')

    // Set values on resource editor
    const variantSms: IResourceDefinitionVariantOverModesFilter = {
      language_id: languageId,
      modes: [SupportedMode.SMS],
      content_type: SupportedContentType.TEXT,
    }
    const variantUssd: IResourceDefinitionVariantOverModesFilter = {
      language_id: languageId,
      modes: [SupportedMode.USSD],
      content_type: SupportedContentType.TEXT,
    }
    const variantIvr: IResourceDefinitionVariantOverModesFilter = {
      language_id: languageId,
      modes: [SupportedMode.IVR],
      content_type: SupportedContentType.AUDIO,
    }
    // we're assuming this pseudo-variants exist
    this.resource_setValue({resourceId, filter: variantSms, value: 'text for SMS'})
    this.resource_setValue({resourceId, filter: variantUssd, value: 'text for USSD'})
    // the value https://your-domain/path/to/5cae2f49b605a6.45924131.mp3 comes from the audio library
    this.resource_setValue({resourceId, filter: variantIvr, value: 'https://your-domain/path/to/5cae2f49b605a6.45924131.mp3'})


    if (shouldSetChoices) {
      // TODO: find a way to set choices
    }
  }
}
