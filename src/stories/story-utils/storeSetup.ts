import {IRootState} from '@/store'
import Vue from 'vue'
import {namespace} from 'vuex-class'
const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')
import {findFlowWith, IBlock, IContext, IFlow} from '@floip/flow-runner'
import {get} from 'lodash'

/**
 * Safe register block module
 * Because some weird race condition is leading to modules not getting unregistered when clicking between stories before the next story re-registers
 */
export const safeRegisterBlockModule = async function(BLOCK_TYPE: string, blockTypeStore: IRootState) {
  // @ts-ignore - TS2551: Property '$store' does not exist on type
  if (this.$store.state['flow'][BLOCK_TYPE]) {
    // @ts-ignore - TS2551: Property '$store' does not exist on type
    this.$store.unregisterModule(['flow', BLOCK_TYPE])
  }
  // todo: this will end up in `flow_addBlankBlockByType` once we get async import builds working
  // @ts-ignore - TS2551: Property '$store' does not exist on type
  this.$store.registerModule(['flow', BLOCK_TYPE], blockTypeStore)
}

export const baseMounted = async function (this: any, BLOCK_TYPE: string, blockTypeStore: IRootState): Promise<any> {
  await safeRegisterBlockModule.bind(this)(BLOCK_TYPE, blockTypeStore)

  const firstFlowId = get(this.$store.state, 'flow.firstFlowId')
  let flow
  if (firstFlowId) {
    flow = findFlowWith(firstFlowId, get(this.$store.state, 'flow') as unknown as IContext)
  } else {
    // @ts-ignore - TS2339: Property 'flow_addBlankFlow' does not exist on type
    flow = await this.flow_addBlankFlow();
    flow.languages = [{id: '1', name: 'English'}] // mutation
  }

  // @ts-ignore - TS2339: Property 'flow_addBlankBlockByType' does not exist on type
  const block =  await this.flow_addBlankBlockByType({type: BLOCK_TYPE})
  const {uuid: blockId} = block 
  
  // @ts-ignore - TS2339: Property 'flow_'activateBlock' does not exist on type
  this.activateBlock({blockId})

  return { block, flow }
}

/**
 * Vue class used to gather required Getter, Mutation, Action for the BaseMounted binding
 */
export class BaseMountedVueClass extends Vue {
  @builderVuexNamespace.Getter activeBlock!: IBlock
  @flowVuexNamespace.Getter activeFlow!: IFlow

  @builderVuexNamespace.Mutation activateBlock!: void

  @flowVuexNamespace.Action flow_addBlankFlow!: Promise<IFlow>
  @flowVuexNamespace.Action flow_addBlankBlockByType!: Promise<IBlock>
}
