import Vue from 'vue'
import {namespace, State} from 'vuex-class'
import {IBlock, IFlow, ILanguage, SupportedContentType, SupportedMode} from '@floip/flow-runner'
import {cloneDeep, get, isEmpty, map} from 'lodash'
import Component from 'vue-class-component'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import Vuex from 'vuex'
import {IRootState, store} from '@/store'
import {IResourceDefinitionVariantOverModesFilter} from '@/store/flow/resource'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

let storyInitState: any = {}

import * as commonComponents from '@/components/common'
import * as interactionDesignerComponents from '@/components/interaction-designer/'
import * as blockEditorsComponents from '@/components/interaction-designer/block-editors'
import * as blockTypesComponents from '@/components/interaction-designer/block-types'
import * as blockComponents from '@/components/interaction-designer/block'
import * as flowEditorsComponents from '@/components/interaction-designer/flow-editors'
import * as flowImportComponents from '@/components/interaction-designer/flow-editors/import'
import * as resourceEditorsComponents from '@/components/interaction-designer/resource-editors'
import * as toolbarComponents from '@/components/interaction-designer/toolbar'

const Components: { [key: string]: any } = {
  ...commonComponents,
  ...interactionDesignerComponents,
  ...blockEditorsComponents,
  ...blockTypesComponents,
  ...blockComponents,
  ...flowEditorsComponents,
  ...flowImportComponents,
  ...resourceEditorsComponents,
  ...toolbarComponents
}

Object.entries(Components).forEach((component) => {
  Vue.component(component[0], component[1])
})

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
  @flowVuexNamespace.Mutation resource_setValue: any
  @flowVuexNamespace.Mutation flow_setSupportedMode: any

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
    this.resource_setValue({resourceId, filter: variantIvr, value: 'path/to/ivr audio.mp3'})

    if (shouldSetChoices) {
      // TODO: uncomment these if needed, when we found a solution for the above todo. This is not working for now.
      // const choiceResourceId = get(this.activeBlock, `config.choices.1`, '')
      // this.resource_setValue({resourceId: choiceResourceId, filter: variantSms, value: "text for SMS"})
      // this.resource_setValue({resourceId: choiceResourceId, filter: variantUssd, value: "text for USSD"})
      // this.resource_setValue({resourceId: choiceResourceId, filter: variantIvr, value: "path/to/ivr audio.mp3"})
    }
  }
}
