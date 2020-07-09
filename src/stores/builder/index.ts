import {flatMap, isEqual, keyBy, mapValues} from 'lodash'
import {ActionTree, GetterTree, Module, MutationTree} from "vuex"
import {IRootState} from "@/stores"
import {IBlock, ValidationException} from "@floip/flow-runner"
import {IDeepBlockExitIdWithinFlow} from "@/stores/flow/block"


export enum OperationKind { // todo migrate these to flight-monitor
  CONNECTION_SOURCE_RELOCATE = 'CONNECTION_SOURCE_RELOCATE',
  CONNECTION_CREATE = 'CONNECTION_CREATE',
  BLOCK_RELOCATE = 'BLOCK_RELOCATE', // todo: we can now skip updating vuex on-the-fly and rather await a drop
}

export interface IConnectionSourceRelocateOperation {
  kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
  data: null | {
    from: IDeepBlockExitIdWithinFlow,
    position: IPosition, // todo: rename to startingPosition
    to: IDeepBlockExitIdWithinFlow | null,
  }
}

export interface IConnectionCreateOperation {
  kind: OperationKind.CONNECTION_CREATE,
  data: null | {
    source: IDeepBlockExitIdWithinFlow,
    position: IPosition, // todo: rename to startingPosition
    target: IBlock['uuid'] | null,
  }
}

export type SupportedOperation = IConnectionSourceRelocateOperation | IConnectionCreateOperation

interface IPosition {
  x: number,
  y: number,
}



export interface IBuilderState {
  operations: {
    [OperationKind.CONNECTION_SOURCE_RELOCATE]: IConnectionSourceRelocateOperation,
    [OperationKind.CONNECTION_CREATE]: IConnectionCreateOperation,
    [OperationKind.BLOCK_RELOCATE]: null,
  }
}

export const stateFactory = (): IBuilderState => ({
  operations: {
    [OperationKind.CONNECTION_SOURCE_RELOCATE]: {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: null},
    [OperationKind.CONNECTION_CREATE]: {
      kind: OperationKind.CONNECTION_CREATE,
      data: null},
    [OperationKind.BLOCK_RELOCATE]: null,
  }
})

export const getters: GetterTree<IBuilderState, IRootState> = {
  blocksById: (state, getters, rootState, rootGetters) => {
    const {blocks} = rootGetters['flow/activeFlow']
    return keyBy(blocks, 'uuid')
  },

  nodeLabelsById: (state, getters, {flow: {flows}}, rootGetters) =>
      mapValues(keyBy(flows[0].blocks, 'uuid'), 'label'),

  exitLabelsById: (state, getters, {flow: {flows}}, rootGetters) =>
      mapValues(keyBy(flatMap(flows[0].blocks, 'exits'), 'uuid'), 'label'),
}

export const mutations: MutationTree<IBuilderState> = {
  setOperation({operations}, {operation}: {operation: SupportedOperation}) {
    operations[operation.kind] = operation
  },

  setBlockPositionTo(state, {position: {x, y}, block}) {
    // todo: ensure our platform_metadata.io_viamo is always instantiated with builder // uiData props
    // if (!block.platform_metadata.io_viamo.uiData) {
    //   defaultsDeep(block, {platform_metadata: {io_viamo: {uiData: {xPosition: 0, yPosition: 0}}}})
    //   Vue.observable(block.platform_metadata.io_viamo.uiData)
    // }

    block.platform_metadata.io_viamo.uiData.xPosition = x
    block.platform_metadata.io_viamo.uiData.yPosition = y
  },
}

export const actions: ActionTree<IBuilderState, IRootState> = {
  removeConnectionFrom({commit}, {block: {uuid: blockId}, exit: {uuid: exitId}}) {
    commit('flow/block_setBlockExitDestinationBlockId', {
      blockId,
      exitId,
      destinationBlockId: undefined
    }, {root: true})
  },


  // @note: multiple connections can lead to same node, so it doesn't make sense to do a swap here; we'll be "appending"
  // when moving connection target: setExitDestination(exitId, destinationId)

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // [OperationKind.CONNECTION_SOURCE_RELOCATE] //////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // todo: do operations warrant their own store?

  initializeConnectionSourceRelocateWith({commit}, {
    block: {uuid: blockId},
    exit: {uuid: exitId},
    position}) {

    // this would be a flight-monitor create(key)
    const operation: IConnectionSourceRelocateOperation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: {from: {blockId, exitId}, position, to: {blockId, exitId}}}
    commit('setOperation', {operation})
  },

  setConnectionSourceRelocateValue({commit, state}, {block: {uuid: blockId}, exit: {uuid: exitId}}) {
    const data = state.operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data
    if (!data) {
      throw new ValidationException(`Unable to modify uninitialized operation: ${JSON.stringify(data)}`)
    }

    const {from, position} = data
    const operation: IConnectionSourceRelocateOperation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: {from, position, to: {blockId, exitId}}}
    commit('setOperation', {operation})
  },

  setConnectionSourceRelocateValueToNullFrom({commit, state}, {block: {uuid: blockId}, exit: {uuid: exitId}}) {
    const data = state.operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data
    if (!data) {
      throw new ValidationException(`Unable to modify uninitialized operation: ${JSON.stringify(data)}`)
    }

    const {from, to, position} = data
    if (!isEqual(to, {blockId, exitId})) {
      throw new ValidationException('Unable to nullify exit relocation from different exit.')
    }

    const operation: IConnectionSourceRelocateOperation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: {from, position, to: null}}
    commit('setOperation', {operation})
  },

  applyConnectionSourceRelocate({dispatch, commit, state: {operations}}) {
    const data = operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data
    if (!data) {
      throw new ValidationException(`Unable to complete uninitialized operation: ${JSON.stringify(data)}`)
    }

    const {from: first, to: second} = data
    dispatch('flow/block_swapBlockExitDestinationBlockIds', {first, second}, {root: true})

    const operation: IConnectionSourceRelocateOperation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: null}
    commit('setOperation', {operation})
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // [OperationKind.CONNECTION_CREATE] //////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  initializeConnectionCreateWith({commit}, {
    block: {uuid: blockId},
    exit: {uuid: exitId},
    position}) {

    if (!blockId || !exitId) {
      throw new ValidationException(`Unable to create connection without source: ${JSON.stringify({blockId, exitId})}`)
    }

    const operation: IConnectionCreateOperation = {
      kind: OperationKind.CONNECTION_CREATE,
      data: {source: {blockId, exitId}, position, target: null}}

    commit('setOperation', {operation}) // this would be a flight-monitor create(key)
  },

  setConnectionCreateTargetBlock({commit, state}, {block}) {
    const data = state.operations[OperationKind.CONNECTION_CREATE].data
    if (!data) {
      throw new ValidationException(`Unable to modify uninitialized operation: ${JSON.stringify(data)}`)
    }

    const {source, position} = data
    const operation: IConnectionCreateOperation = {
      kind: OperationKind.CONNECTION_CREATE,
      data: {source, position, target: block.uuid}}

    commit('setOperation', {operation})
  },

  setConnectionCreateTargetBlockToNullFrom({commit, state}, {block}) {
    const data = state.operations[OperationKind.CONNECTION_CREATE].data
    if (!data) {
      throw new ValidationException(`Unable to modify uninitialized operation: ${JSON.stringify(data)}`)
    }

    const {source, target, position} = data
    if (!isEqual(target, block.uuid)) {
      throw new ValidationException('Unable to nullify exit relocation from different exit.')
    }

    const operation: IConnectionCreateOperation = {
      kind: OperationKind.CONNECTION_CREATE,
      data: {source, position, target: null}}

    commit('setOperation', {operation})
  },

  applyConnectionCreate({dispatch, commit, state: {operations}}) {
    const data = operations[OperationKind.CONNECTION_CREATE].data
    if (!data) {
      throw new ValidationException(`Unable to complete uninitialized operation: ${JSON.stringify(data)}`)
    }

    const {
      source: {blockId, exitId},
      target: destinationBlockId} = data

    commit('flow/block_setBlockExitDestinationBlockId', {blockId, exitId, destinationBlockId}, {root: true})

    const operation: IConnectionCreateOperation = {kind: OperationKind.CONNECTION_CREATE, data: null}
    commit('setOperation', {operation})
  },

  async loadFlow({dispatch, commit, state}) {
    console.debug('loading flow...')

    // todo: we need something like: set context
    const flowContext = require('./2019-10-10-shortcut-flow.json')
    const flow = flowContext.flows[0]

    flowContext.resources.map(resource => commit('flow/resource_add', {resource}, {root: true}))
    await dispatch('flow/flow_add', {flow}, {root: true})
  },
}

export const store: Module<IBuilderState, IRootState> = {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}

export default store
