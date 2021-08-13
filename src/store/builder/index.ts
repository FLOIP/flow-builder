import {filter, flatMap, get, isEqual, keyBy, map, mapValues, union} from 'lodash'
import Vue from 'vue'
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit, IFlow, IResource, SupportedMode, ValidationException} from '@floip/flow-runner'
import {IDeepBlockExitIdWithinFlow} from '@/store/flow/block'

// todo migrate these to flight-monitor
export enum OperationKind {
  CONNECTION_SOURCE_RELOCATE = 'CONNECTION_SOURCE_RELOCATE',
  CONNECTION_CREATE = 'CONNECTION_CREATE',
  // todo: we can now skip updating vuex on-the-fly and rather await a drop
  BLOCK_RELOCATE = 'BLOCK_RELOCATE',
}

export interface IConnectionSourceRelocateOperation {
  kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
  data: null | {
    from: IDeepBlockExitIdWithinFlow,
    // todo: rename to startingPosition
    position: IPosition,
    to: IDeepBlockExitIdWithinFlow | null,
  },
}

export interface IConnectionCreateOperation {
  kind: OperationKind.CONNECTION_CREATE,
  data: null | {
    source: IDeepBlockExitIdWithinFlow,
    // todo: rename to startingPosition
    position: IPosition,
    targetId: IBlock['uuid'] | null,
  },
}

export interface IConnectionContext {
  sourceId: IBlock['uuid'],
  targetId: IBlock['uuid'],
  exitId: IBlockExit['uuid'],
}

export type SupportedOperation = IConnectionSourceRelocateOperation | IConnectionCreateOperation

interface IPosition {
  x: number,
  y: number,
}

export interface IBuilderState {
  activeBlockId: IBlock['uuid'] | null,
  isEditable: boolean,
  activeConnectionsContext: IConnectionContext[],
  operations: {
    [OperationKind.CONNECTION_SOURCE_RELOCATE]: IConnectionSourceRelocateOperation,
    [OperationKind.CONNECTION_CREATE]: IConnectionCreateOperation,
    [OperationKind.BLOCK_RELOCATE]: null,
  },
  draggableForExitsByUuid: object,
  isBlockEditorOpen: boolean,
}

export const stateFactory = (): IBuilderState => ({
  activeBlockId: null,
  isEditable: true,
  activeConnectionsContext: [],
  operations: {
    [OperationKind.CONNECTION_SOURCE_RELOCATE]: {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: null,
    },
    [OperationKind.CONNECTION_CREATE]: {
      kind: OperationKind.CONNECTION_CREATE,
      data: null,
    },
    [OperationKind.BLOCK_RELOCATE]: null,
  },
  draggableForExitsByUuid: {},
  isBlockEditorOpen: false,
})

export const getters: GetterTree<IBuilderState, IRootState> = {
  activeBlock: ({activeBlockId}, {blocksById}) => (activeBlockId ? blocksById[activeBlockId] : null),

  blocksById: (_state, _getters, _rootState, rootGetters) => {
    const {blocks} = rootGetters['flow/activeFlow'] ? rootGetters['flow/activeFlow'] : {blocks: []}
    return keyBy(blocks, 'uuid')
  },

  nodeLabelsById: (_state, _getters, {flow: {flows}}) => mapValues(keyBy(flows[0].blocks, 'uuid'), 'label'),

  exitLabelsById: (_state, _getters, {flow: {flows}}) => mapValues(keyBy(flatMap(flows[0].blocks, 'exits'), 'uuid'), 'label'),

  isEditable: (state) => state.isEditable,
}

export const mutations: MutationTree<IBuilderState> = {
  activateBlock(state, {blockId}: { blockId: IBlock['uuid'] }) {
    state.activeBlockId = blockId

    // simulate engaging with specified block
    // FlowRunner.prototype.navigateTo(block, state as unknown as IContext)
  },

  activateConnection(state, {connectionContext}) {
    state.activeConnectionsContext = union([connectionContext], state.activeConnectionsContext)
  },

  deactivateConnection(state, {connectionContext}) {
    state.activeConnectionsContext = filter(state.activeConnectionsContext, (context) => context !== connectionContext)
  },

  setOperation({operations}: { operations: any }, {operation}: { operation: SupportedOperation }) {
    operations[operation.kind] = operation
  },

  // @ts-ignore
  setBlockPositionTo(state, {position: {x, y}, block}) {
    // todo: ensure our vendor_metadata.io_viamo is always instantiated with builder uiData props
    // if (!block.vendor_metadata.io_viamo.uiData) {
    //   defaultsDeep(block, {vendor_metadata: {io_viamo: {uiData: {xPosition: 0, yPosition: 0}}}})
    //   Vue.observable(block.vendor_metadata.io_viamo.uiData)
    // }

    block.ui_metadata.canvas_coordinates.x = x
    block.ui_metadata.canvas_coordinates.y = y
  },

  setIsEditable(state, value) {
    state.isEditable = value
  },

  initDraggableForExitsByUuid(state) {
    state.draggableForExitsByUuid = {}
  },

  setIsBlockEditorOpen(state, value) {
    state.isBlockEditorOpen = value
  },
}

export const actions: ActionTree<IBuilderState, IRootState> = {
  removeConnectionFrom({commit}, {block: {uuid: blockId}, exit: {uuid: exitId}}) {
    commit('flow/block_setBlockExitDestinationBlockId', {
      blockId,
      exitId,
      destinationBlockId: undefined,
    }, {root: true})
  },

  // @note: multiple connections can lead to same node, so it doesn't make sense to do a swap here; we'll be "appending"
  // when moving connection target: setExitDestination(exitId, destinationId)

  /// /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // [OperationKind.CONNECTION_SOURCE_RELOCATE] //////////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // todo: do operations warrant their own store? Maybe a generic store that handles a common behaviour

  initializeConnectionSourceRelocateWith({commit}, {
    block: {uuid: blockId},
    exit: {uuid: exitId},
    position,
  }) {
    // this would be a flight-monitor create(key)
    const operation: IConnectionSourceRelocateOperation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: {from: {blockId, exitId}, position, to: {blockId, exitId}},
    }
    commit('setOperation', {operation})
  },

  setConnectionSourceRelocateValue({commit, state}, {block: {uuid: blockId}, exit: {uuid: exitId}}) {
    const {data} = state.operations[OperationKind.CONNECTION_SOURCE_RELOCATE]
    if (!data) {
      throw new ValidationException(`Unable to modify uninitialized operation: ${JSON.stringify(data)}`)
    }

    const {from, position} = data
    const operation: IConnectionSourceRelocateOperation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: {from, position, to: {blockId, exitId}},
    }
    commit('setOperation', {operation})
  },

  setConnectionSourceRelocateValueToNullFrom({commit, state}, {block: {uuid: blockId}, exit: {uuid: exitId}}) {
    const {data} = state.operations[OperationKind.CONNECTION_SOURCE_RELOCATE]
    if (!data) {
      throw new ValidationException(`Unable to modify uninitialized operation: ${JSON.stringify(data)}`)
    }

    const {from, to, position} = data
    if (!isEqual(to, {blockId, exitId})) {
      throw new ValidationException('Unable to nullify exit relocation from different exit.')
    }

    const operation: IConnectionSourceRelocateOperation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: {from, position, to: null},
    }
    commit('setOperation', {operation})
  },

  applyConnectionSourceRelocate({dispatch, commit, state: {operations}}) {
    const {data} = operations[OperationKind.CONNECTION_SOURCE_RELOCATE]
    if (!data) {
      throw new ValidationException(`Unable to complete uninitialized operation: ${JSON.stringify(data)}`)
    }

    const {from: first, to: second} = data
    dispatch('flow/block_swapBlockExitDestinationBlockIds', {first, second}, {root: true})

    const operation: IConnectionSourceRelocateOperation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: null,
    }
    commit('setOperation', {operation})
  },

  /// ////////////////////////////////////////////////////////////////////////////////////////////////
  // [OperationKind.CONNECTION_CREATE] //////////////////////////////////////////////////////////////
  /// ////////////////////////////////////////////////////////////////////////////////////////////////

  initializeConnectionCreateWith({commit}, {
    block: {uuid: blockId},
    exit: {uuid: exitId},
    position,
  }) {
    if (!blockId || !exitId) {
      throw new ValidationException(`Unable to create connection without source: ${JSON.stringify({blockId, exitId})}`)
    }

    const operation: IConnectionCreateOperation = {
      kind: OperationKind.CONNECTION_CREATE,
      data: {source: {blockId, exitId}, position, targetId: null},
    }

    // this would be a flight-monitor create(key)

    commit('setOperation', {operation})
  },

  setConnectionCreateTargetBlock({commit, state}, {block}) {
    const {data} = state.operations[OperationKind.CONNECTION_CREATE]
    if (!data) {
      throw new ValidationException(`Unable to modify uninitialized operation: ${JSON.stringify(data)}`)
    }

    const {source, position} = data
    const operation: IConnectionCreateOperation = {
      kind: OperationKind.CONNECTION_CREATE,
      data: {source, position, targetId: block.uuid},
    }

    commit('setOperation', {operation})
  },

  setConnectionCreateTargetBlockToNullFrom({commit, state}, {block}) {
    const {data} = state.operations[OperationKind.CONNECTION_CREATE]
    if (!data) {
      throw new ValidationException(`Unable to modify uninitialized operation: ${JSON.stringify(data)}`)
    }

    const {source, targetId, position} = data
    if (!isEqual(targetId, block.uuid)) {
      throw new ValidationException('Unable to nullify exit relocation from different exit.')
    }

    const operation: IConnectionCreateOperation = {
      kind: OperationKind.CONNECTION_CREATE,
      data: {source, position, targetId: null},
    }

    commit('setOperation', {operation})
  },

  applyConnectionCreate({commit, state: {operations}}) {
    const {data} = operations[OperationKind.CONNECTION_CREATE]
    if (!data) {
      throw new ValidationException(`Unable to complete uninitialized operation: ${JSON.stringify(data)}`)
    }

    const {
      source: {blockId, exitId},
      targetId: destinationBlockId,
    } = data

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
  async importFlowsAndResources({
    rootState,
  }, {flows, resources}: { flows: IFlow[], resources: IResource[] }) {
    console.debug('importing flows & resources ...')
    console.log({flows, resources})
    const {flow: flowState} = rootState
    const defaultSupportedMode = [
      SupportedMode.IVR,
      SupportedMode.SMS,
      SupportedMode.USSD,
    ]

    // add default activated modes if not set yet
    flows.forEach((_flow, key) => {
      if (!Object.prototype.hasOwnProperty.call([key], 'supported_modes') || !flows[key].supported_modes.length) {
        flows[key].supported_modes = defaultSupportedMode
      }
    })

    // Update flow state
    flowState.flows.splice(0, Number.MAX_SAFE_INTEGER, ...flows)
    flowState.first_flow_id = flows[0].uuid
    flowState.resources.splice(0, Number.MAX_SAFE_INTEGER, ...resources)

    // make sure we use the same languages ids on both UI & Flows
    rootState.trees.ui.languages = flows[0].languages
  },
  setIsEditable({commit}, value) {
    const boolVal = Boolean(value)
    commit('setIsEditable', boolVal)
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
  storeForBlockType: Module<any, IRootState>,
) {
  return (builder: Vue) => builder.$store.hasModule(['flow', blockType])
    || builder.$store.registerModule(['flow', blockType], storeForBlockType)
}

export function generateConnectionLayoutKeyFor(source: IBlock, target: IBlock) {
  console.debug('store/builder', 'generateConnectionLayoutKeyFor', source.uuid, target.uuid)
  return [
    // coords
    [source.ui_metadata.canvas_coordinates.x, source.ui_metadata.canvas_coordinates.y],
    [target.ui_metadata.canvas_coordinates.x, target.ui_metadata.canvas_coordinates.y],

    // block titles
    source.label,
    target.label,

    // todo: this needs to be a computed prop // possibly on store as getter by blockId ?

    // other exit titles
    ...map(source.exits, 'name'),
    ...map(target.exits, 'name'),
  ]
}

export function computeBlockUiData(block?: IBlock | null) {
  const xDelta = 120
  const yDelta = 110
  let xPosition = block ? block.ui_metadata.canvas_coordinates.x : null
  let yPosition = block ? block.ui_metadata.canvas_coordinates.y : null

  if (xPosition === null || yPosition === null) {
    const viewPortCenter = getViewportCenter()
    xPosition = viewPortCenter.x
    yPosition = viewPortCenter.y
  }

  return {
    x: xPosition + xDelta,
    y: yPosition + yDelta,
  }
}

export function computeBlockVendorUiData(block?: IBlock | null) {
  return {
    isSelected: false,
  }
}

export function getViewportCenter() {
  const builderCanvasElement = document.getElementsByClassName('builder-canvas')[0]
  const sideBarElement = document.getElementsByClassName('tree-sidebar-container')[0]
  const rect = builderCanvasElement.getBoundingClientRect()

  const sidebarAdjustment = sideBarElement ? sideBarElement.clientWidth : 0

  return {
    x: Math.round(Math.abs(rect.left) + (window.innerWidth - sidebarAdjustment) / 2),
    y: Math.round(Math.abs(rect.top) + window.innerHeight / 2),
  }
}
