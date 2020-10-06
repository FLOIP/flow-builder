import {IRootState} from '@/store'
import Vue from 'vue'
import {namespace} from 'vuex-class'
const flowVuexNamespace = namespace('flow')
import {IBlock, IFlow} from '@floip/flow-runner'

export const baseMounted = async function (BLOCK_TYPE: string, blockTypeStore: IRootState): Promise<any> {
  // @ts-ignore - TS2551: Property '$store' does not exist on type
  if (this.$store.state['flow'][BLOCK_TYPE]) {
    //some weird race condition is leading to modules not getting unregistered when clicking between stories before the next story re-registers
    // @ts-ignore - TS2551: Property '$store' does not exist on type
    this.$store.unregisterModule(['flow', BLOCK_TYPE])
  }
  // todo: this will end up in `flow_addBlankBlockByType` once we get async import builds working
  // @ts-ignore - TS2551: Property '$store' does not exist on type
  this.$store.registerModule(['flow', BLOCK_TYPE], blockTypeStore) 

  // @ts-ignore - TS2339: Property 'flow_addBlankFlow' does not exist on type
  const flow = await this.flow_addBlankFlow()
  flow.languages = [{id: '1', name: 'English'}] // mutation
  
  // @ts-ignore - TS2339: Property 'flow_addBlankBlockByType' does not exist on type
  const block =  await this.flow_addBlankBlockByType({type: BLOCK_TYPE})
  const {uuid: blockId} = block 
  
  // @ts-ignore - TS2339: Property 'flow_activateBlock' does not exist on type
  this.flow_activateBlock({blockId})

  return { block, flow }
}
/**
 * Vue class used to gather required Getter, Mutation, Action for the BaseMounted binding
 */
export class BaseMountedVueClass extends Vue {
  @flowVuexNamespace.Getter activeBlock!: IBlock
  @flowVuexNamespace.Getter activeFlow!: IFlow

  @flowVuexNamespace.Mutation flow_activateBlock!: void

  @flowVuexNamespace.Action flow_addBlankFlow!: Promise<IFlow>
  @flowVuexNamespace.Action flow_addBlankBlockByType!: Promise<IBlock>
}
