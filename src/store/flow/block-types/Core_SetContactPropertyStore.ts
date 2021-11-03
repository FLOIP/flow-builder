import {ActionTree} from 'vuex'
import {IRootState} from '@/store'
import {IFlowsState} from '../index'
import {IBlockExit, IBlockConfig} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
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
    props.config = {
        set_contact_property: {
          property_key: '',
          property_value: '',
        },
    }
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]
    props.exits = exits
    return await baseActions.createWith({dispatch}, {props})
  }

}

//better way to do this kind of thing?
const Core_SetContactPropertyStore = Object.assign({}, BaseBlockStore)
Core_SetContactPropertyStore.actions.createWith = actions.createWith

export default Core_SetContactPropertyStore
