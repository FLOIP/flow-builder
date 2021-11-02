import {ActionTree} from 'vuex'
import {IRootState} from '@/store'
import {IFlowsState} from '../index'
import {IBlockConfig} from '@floip/flow-runner'
import BaseBlockStore from './BaseBlockStore'

export interface IContactPropertyOption {
  id: string,
  name: string,
  displayLabel: string,
}

export const BLOCK_TYPE = 'Core.SetContactProperty'

const baseActions = Object.assign({}, BaseBlockStore.actions)

const actions: ActionTree<IFlowsState, IRootState> = {
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IBlockConfig> }) {

    props.type = BLOCK_TYPE
    //better way to do this?
    return await baseActions.createWith({dispatch}, {props})
  }

}

const Core_SetContactPropertyStore = Object.assign({}, BaseBlockStore)

//better way to do this?
Core_SetContactPropertyStore.actions.createWith = actions.createWith

export default Core_SetContactPropertyStore
