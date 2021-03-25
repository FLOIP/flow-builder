import {IRootState} from '@/store'
import Vue from 'vue'
import {namespace} from 'vuex-class'
const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')
import { findFlowWith, IBlock, IContext, IFlow, SupportedContentType, SupportedMode } from '@floip/flow-runner'
import {get, isEmpty, cloneDeep} from 'lodash'
import { IResourceDefinitionVariantOverModesFilter } from "../../src/store/flow/resource";
import Component from "vue-class-component";
import caseBlockStore, { BLOCK_TYPE as CASE_BLOCK_TYPE } from "../../src/store/flow/block-types/Core_CaseBlockStore";

let storyInitState: any = {}

/**
 * Safe register block module
 * Because some weird race condition is leading to modules not getting unregistered when clicking between stories before the next story re-registers
 */
export const safeRegisterBlockModule = async function(BLOCK_TYPE: string, blockTypeStore: IRootState) {
  if (this.$store.hasModule(['flow', BLOCK_TYPE])) {
    this.$store.unregisterModule(['flow', BLOCK_TYPE])
  }
  // todo: this will end up in `flow_addBlankBlockByType` once we get async import builds working
  // @ts-ignore - TS2551: Property '$store' does not exist on type
  this.$store.registerModule(['flow', BLOCK_TYPE], blockTypeStore)
}

export const baseMounted = async function (this: any, BLOCK_TYPE: string, blockTypeStore: IRootState): Promise<any> {
  if (isEmpty(storyInitState)) {
    storyInitState = cloneDeep(this.$store.state)
  } else {
    // Make sure we have cleared state in store for each new mounted story, as we're using one flow to put blocks
    Object.assign(this.$store.state, cloneDeep(storyInitState))
  }

  await safeRegisterBlockModule.bind(this)(BLOCK_TYPE, blockTypeStore);

  let flow = await this.flow_addBlankFlow();
  flow.languages = [{id: '1', name: 'English'}] // mutation

  const block =  await this.flow_addBlankBlockByType({type: BLOCK_TYPE})
  const {uuid: blockId} = block 

  this.activateBlock({blockId})

  return { block, flow }
}

/**
 * Vue class used to gather required Getter, Mutation, Action for the BaseMounted binding
 */
@Component({})
export class BaseMountedVueClass extends Vue {
  @builderVuexNamespace.Getter activeBlock!: IBlock
  @flowVuexNamespace.Getter activeFlow!: IFlow

  @builderVuexNamespace.Mutation activateBlock!: void

  @flowVuexNamespace.Action flow_addBlankFlow!: Promise<IFlow>
  @flowVuexNamespace.Action flow_addBlankBlockByType!: Promise<IBlock>
  @flowVuexNamespace.Action flow_add!: Promise<IFlow>
  @flowVuexNamespace.Action flow_createWith!: Promise<IFlow>

  @flowVuexNamespace.Mutation block_setName: any
  @flowVuexNamespace.Mutation block_setLabel: any
  @flowVuexNamespace.Mutation block_setSemanticLabel: any
  @flowVuexNamespace.Mutation flow_setFirstBlockId: any

  setDescription(blockId: string) {
    this.block_setName({blockId: blockId, value: "A Name"})
    this.block_setLabel({blockId: blockId, value: "A Label"})
    this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
  }

  // async fakeAFirstBlock(BLOCK_TYPE: string, blockTypeStore: IRootState, flowId: string) {
  //   // Fake a 1st block to make sure the current block won't be selected
  //   await this.safeRegisterBlockModule(CASE_BLOCK_TYPE, caseBlockStore)
  //   const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
  //   const {uuid: caseBlockId} = caseBlock
  //   this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
  // }

  /**
   * Safe register block module
   * Because some weird race condition is leading to modules not getting unregistered when clicking between stories before the next story re-registers
   */
  async safeRegisterBlockModule(BLOCK_TYPE: string, blockTypeStore: IRootState) {
    if (this.$store.hasModule(['flow', BLOCK_TYPE])) {
      this.$store.unregisterModule(['flow', BLOCK_TYPE])
    }
    // todo: this will end up in `flow_addBlankBlockByType` once we get async import builds working
    // @ts-ignore - TS2769: No overload matches this call.
    this.$store.registerModule(['flow', BLOCK_TYPE], blockTypeStore)
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

    // Set values on resource editor // TODO: find better way to do this once the resource editor is fully implemented
    const variantSms: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.SMS],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.TEXT],
    }
    const variantUssd: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.USSD],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.TEXT],
    }
    const variantIvr: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.IVR],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
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
