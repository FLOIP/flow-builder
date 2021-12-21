import {ActionTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit, IBlockConfig} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {cloneDeep} from 'lodash'
import BaseStore from './BaseBlock'
import {IFlowsState} from '../index'

export interface IContactPropertyOption {
  id: string,
  name: string,
  displayLabel: string,
}

export const BLOCK_TYPE = 'Core.SetContactProperty'

const baseActions = cloneDeep(BaseStore.actions)

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
    //TODO - fix this
    // @ts-ignore
    return await baseActions.createWith({dispatch}, {props})
  },

}

const Core_SetContactPropertyStore = cloneDeep(BaseStore)
Core_SetContactPropertyStore.actions.createWith = actions.createWith

export default Core_SetContactPropertyStore
