import {cloneDeep, flatMap, isEqual, keyBy, map, mapValues, get} from 'lodash'
import Vue from 'vue'
import {ActionTree, GetterTree, Module, MutationTree} from "vuex"
import {IRootState} from "@/store"
import {IBlock, SupportedMode, ValidationException} from "@floip/flow-runner"
import {IDeepBlockExitIdWithinFlow} from "@/store/flow/block"
import createFormattedDate from "@floip/flow-runner/dist/domain/DateFormat";
import IdGeneratorUuidV4 from "@floip/flow-runner/dist/domain/IdGeneratorUuidV4";


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
  activeBlockId: IBlock['uuid'] | null,

  operations: {
    [OperationKind.CONNECTION_SOURCE_RELOCATE]: IConnectionSourceRelocateOperation,
    [OperationKind.CONNECTION_CREATE]: IConnectionCreateOperation,
    [OperationKind.BLOCK_RELOCATE]: null,
  }
}

export const stateFactory = (): IBuilderState => ({
  activeBlockId: null,

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
  activeBlock: ({activeBlockId}, {blocksById}) => activeBlockId ? blocksById[activeBlockId] : null,

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
  activateBlock(state, {blockId}: {blockId: IBlock['uuid']}) {
    state.activeBlockId = blockId

    // simulate engaging with specified block
    // FlowRunner.prototype.navigateTo(block, state as unknown as IContext)
  },

  setOperation({operations}, {operation}: {operation: SupportedOperation}) {
    //TODO - type checking - remove this ignore and fix these errors - they seem to be quite serious but I'm not sure how to resolve them
    //@ts-ignore
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
  // todo: do operations warrant their own store? Maybe a generic store that handles a common behaviour

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

  /**
   * Import Flows And Resources from importer tool
   *
   * The imported JSON should be compatible with IFlowsState
   * {
   *  flows: [
   *    { uuid: 'xxxx', name: 'flow1', ...},
   *    { uuid: 'yyyy', name: 'flow2', ...}]
   *  ],
   *  resources: [
   *    { uuid: 'xxxx-flow1-resource1', values: [...]},
   *    { uuid: 'xxxx-flow1-resource2', values: [...]},
   *    { uuid: 'xxxx-flow2-resource1', values: [...]},
   *    ...
   *  ]
   * }
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param flows
   */
  async importFlowsAndResources({dispatch, commit, state, rootState}, {flows, resources}) {
    console.debug('importing flows & resources ...')
    console.log({flows, resources})
    const {flow: flowState} = rootState
    const defaultSupportedMode = [
      SupportedMode.IVR,
      SupportedMode.SMS,
      SupportedMode.USSD,
    ]

    // add default activated modes if not set yet
    for(let key in flows) {
      if (!flows[key].hasOwnProperty('supportedModes') || !flows[key].supportedModes.length) {
        flows[key].supportedModes = defaultSupportedMode
      }
    }

    // Update flow state
    flowState.flows.splice(0, Number.MAX_SAFE_INTEGER, ...flows)
    flowState.firstFlowId = flows[0].uuid
    flowState.resources.splice(0, Number.MAX_SAFE_INTEGER, ...resources)

    // make sure we use the same languages ids on both UI & Flows
    // TODO - type checking - remove this and resolve the error
    //@ts-ignore
    rootState.trees.ui.languages = flows[0].languages
  },

  async loadFlow({dispatch, commit, state, rootState}) {
    console.debug('builder', 'loading flow...')

    // todo: we need something like: set context
    const flowContext = require('./blank-flow.json')
    const flow = flowContext.flows[0]
    flow.uuid = (new IdGeneratorUuidV4).generate()
    flow.lastModified = createFormattedDate()
    // TODO - type checking - remove this and resolve the error
    //@ts-ignore
    flow.languages = cloneDeep(rootState.trees.ui.languages)

    flowContext.resources.forEach((resource: any) => commit('flow/resource_add', {resource}, {root: true}))

    await dispatch('flow/flow_add', {flow}, {root: true})

    console.debug('builder', 'flow loaded.')
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

export function createDefaultBlockTypeInstallerFor(
    blockType: IBlock['type'],
    storeForBlockType: Module<any, IRootState>) {

  return (builder: Vue) =>
    builder.$store.hasModule(['flow', blockType])
    || builder.$store.registerModule(['flow', blockType], storeForBlockType)
}

export function generateConnectionLayoutKeyFor(source: IBlock, target: IBlock) {
  console.debug('store/builder', 'generateConnectionLayoutKeyFor', source.uuid, target.uuid)
  return [
    // coords
    [get(source, 'platform_metadata.io_viamo.uiData.xPosition'), get(source, 'platform_metadata.io_viamo.uiData.yPosition')],
    [get(target, 'platform_metadata.io_viamo.uiData.xPosition'), get(target, 'platform_metadata.io_viamo.uiData.yPosition')],

    // block titles
    source.label,
    target.label,

    // other exit titles // todo: this needs to be a computed prop // possibly on store as getter by blockId ?
    ...map(source.exits, 'tag'),
    ...map(target.exits, 'tag'),
  ]
}

export function computeBlockPositionsFrom(block: IBlock) {
  const xDelta = 80, yDelta = 80
  let xPosition = 150, yPosition = 255
  if (block) {
    xPosition = get(block, 'platform_metadata.io_viamo.uiData.xPosition', 0) + xDelta
    yPosition = get(block, 'platform_metadata.io_viamo.uiData.yPosition', 0) + yDelta
  } else {
    // put in the viewport center
    let builderCanvasElement = document.getElementsByClassName('builder-canvas')[0]
    let sideBarElement = document.getElementsByClassName('tree-sidebar-container')[0]
    const rect = builderCanvasElement.getBoundingClientRect()

    xPosition = Math.round(Math.abs(rect.left) + (window.innerWidth - sideBarElement.clientWidth) / 2)
    yPosition = Math.round(Math.abs(rect.top) + window.innerHeight / 2)
  }

  return {xPosition, yPosition}
}
