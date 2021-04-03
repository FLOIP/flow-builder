import Vue from 'vue'
import {namespace} from 'vuex-class'
const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')
import {
  IBlock,
  IFlow,
  ILanguage,
  SupportedContentType,
  SupportedMode
} from '@floip/flow-runner'
import {get, isEmpty, cloneDeep} from 'lodash'
import { IResourceDefinitionVariantOverModesFilter } from "../../src/store/flow/resource";
import Component from 'vue-class-component'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import Vuex from "vuex";
import {IRootState, store} from "@/store";

let storyInitState: any = {}

Vue.use(Vuex)

export interface IBaseOptions {
  components: any;
  template: string;
  store?: any;
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

  @builderVuexNamespace.Mutation activateBlock!: ({ blockId }: { blockId: IBlock['uuid'] | null}) => void

  @flowVuexNamespace.Action flow_addBlankFlow!: () => Promise<IFlow>
  @flowVuexNamespace.Action flow_addBlankBlockByType!: ({ type, ...props }: Partial<IBlock>) => Promise<IBlock>
  @flowVuexNamespace.Action flow_add!: ({ flow } : { flow: IFlow}) => Promise<IFlow>
  @flowVuexNamespace.Action flow_createWith!: ({ props }: {props: {uuid: string} & Partial<IFlow>}) => Promise<IFlow>

  @flowVuexNamespace.Mutation block_setName: any
  @flowVuexNamespace.Mutation block_setLabel: any
  @flowVuexNamespace.Mutation block_setSemanticLabel: any
  @flowVuexNamespace.Mutation flow_setFirstBlockId: any

  setDescription(blockId: string) {
    this.block_setName({blockId: blockId, value: "A Name"})
    this.block_setLabel({blockId: blockId, value: "A Label"})
    this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
  }

  /**
   * Fake a 1st block to make sure the current block won't be selected
   */
  async fakeCaseBlockAsFirstBlock(flowId: string) {
    await this.safeRegisterBlockModule(CASE_BLOCK_TYPE, caseBlockStore)
    const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
    const {uuid: caseBlockId} = caseBlock
    this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
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
    this.$store.registerModule(['flow', BLOCK_TYPE], blockTypeStore)
  }

  async baseMounted(BLOCK_TYPE: string, blockTypeStore: any): Promise<any> {
    if (isEmpty(storyInitState)) {
      storyInitState = cloneDeep(this.$store.state)
    } else {
      // Make sure we have cleared state in store for each new mounted story, as we're using one flow to put blocks
      Object.assign(this.$store.state, cloneDeep(storyInitState))
    }

    await this.safeRegisterBlockModule(BLOCK_TYPE, blockTypeStore);

    let flow = await this.flow_addBlankFlow();
    flow.languages = [
      { id: '1', name: 'English' } as ILanguage
      ] // mutation

    const block =  await this.flow_addBlankBlockByType({type: BLOCK_TYPE})
    const {uuid: blockId} = block

    this.activateBlock({blockId})

    return { block, flow }
  }
}

@Component({})
export class BaseMountedVueClassWithResourceAndMode extends BaseMountedVueClass {
  @flowVuexNamespace.Mutation resource_setValue: any
  @flowVuexNamespace.Mutation flow_setSupportedMode: any

  setResourceData({ shouldSetChoices, configPath }: { shouldSetChoices: boolean, configPath: string }) {
    const {
      languages: {
        0: {id: languageId}
      },
    }: IFlow = this.activeFlow
    const resourceId = get(this.activeBlock, configPath, '')

    // Set values on resource editor
    // TODO: find better way to do this once the resource editor is fully implemented, the goal is to set resources' value correctly. The implementation below is just an
    const variantSms: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.SMS],
      contentType: [SupportedContentType.TEXT],
    }
    const variantUssd: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.USSD],
      contentType: [SupportedContentType.TEXT],
    }
    const variantIvr: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.IVR],
      contentType: [SupportedContentType.AUDIO],
    }
    // we're assuming this pseudo-variants exist
    this.resource_setValue({resourceId, filter: variantSms, value: "text for SMS"})
    this.resource_setValue({resourceId, filter: variantUssd, value: "text for USSD"})
    this.resource_setValue({resourceId, filter: variantIvr, value: "path/to/ivr audio.mp3"})

    if (shouldSetChoices) {
      const choiceResourceId = get(this.activeBlock, `config.choices.1`, '')
      this.resource_setValue({resourceId: choiceResourceId, filter: variantSms, value: "text for SMS"})
      this.resource_setValue({resourceId: choiceResourceId, filter: variantUssd, value: "text for USSD"})
      this.resource_setValue({resourceId: choiceResourceId, filter: variantIvr, value: "path/to/ivr audio.mp3"})
    }
  }
}
