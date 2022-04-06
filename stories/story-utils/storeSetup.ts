import Vue from 'vue'
import {namespace} from 'vuex-class'
import {IBlock, IFlow} from '@floip/flow-runner'
import Component from 'vue-class-component'
import Vuex, {Module, Store} from 'vuex'
import {IRootState, store} from '@/store'
import {IFlowsState} from '@/store/flow'
import {
  fakeCaseBlockAsFirstBlock,
  registerGlobalComponents,
  safeRegisterBlockModule,
  setDescription,
  setResourceData,
  setTags,
  setupFlowAndBlock,
} from '../../tests/unit/testStoreSetup'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

registerGlobalComponents(Vue)

Vue.use(Vuex)

export interface IBaseOptions {
  components: any,
  template: string,
  store?: Store<IRootState>,
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

  setDescription(blockId: string): void {
    setDescription(this.$store, blockId)
  }

  setTags(blockId: string): void {
    setTags(this.$store, blockId)
  }

  async fakeCaseBlockAsFirstBlock(flowId: string): Promise<void> {
    return fakeCaseBlockAsFirstBlock(this.$store, flowId)
  }

  safeRegisterBlockModule(BLOCK_TYPE: string, blockTypeStore: Module<IFlowsState, IRootState>): void {
    safeRegisterBlockModule(this.$store, BLOCK_TYPE, blockTypeStore)
  }

  async baseMounted(BLOCK_TYPE: string, blockTypeStore: Module<IFlowsState, IRootState>): Promise<{block: IBlock, flow: IFlow}> {
    return setupFlowAndBlock(this.$store, BLOCK_TYPE, blockTypeStore)
  }
}

@Component({
  store: new Vuex.Store<IRootState>(store),
})
export class BaseMountedVueClassWithResourceAndMode extends BaseMountedVueClass {
  setResourceData({shouldSetChoices, configPath}: { shouldSetChoices: boolean, configPath: string }): void {
    setResourceData(this.$store, {shouldSetChoices, configPath})
  }
}
