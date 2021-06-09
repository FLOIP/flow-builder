import {
  flatMap, isEqual, keyBy, map, mapValues, get, filter, union, forEach, min, max, isEmpty
} from 'lodash'
import Vue from 'vue'
import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex'
import { IRootState } from '@/store'
import {
  IBlockExit, IBlock, IFlow, IResource, SupportedMode, ValidationException, findBlockWith,
} from '@floip/flow-runner'
import { IDeepBlockExitIdWithinFlow } from '@/store/flow/block'

export enum OperationKind { // todo migrate these to flight-monitor
  CONNECTION_SOURCE_RELOCATE = 'CONNECTION_SOURCE_RELOCATE',
  CONNECTION_CREATE = 'CONNECTION_CREATE',
  BLOCK_RELOCATE = 'BLOCK_RELOCATE', // todo: we can now skip updating vuex on-the-fly and rather await a drop
}

export interface IConnectionSourceRelocateOperation {
  kind: OperationKind.CONNECTION_SOURCE_RELOCATE;
  data: null | {
    from: IDeepBlockExitIdWithinFlow;
    position: IPosition; // todo: rename to startingPosition
    to: IDeepBlockExitIdWithinFlow | null;
  };
}

export interface IConnectionCreateOperation {
  kind: OperationKind.CONNECTION_CREATE;
  data: null | {
    source: IDeepBlockExitIdWithinFlow;
    position: IPosition; // todo: rename to startingPosition
    targetId: IBlock['uuid'] | null;
  };
}

export interface IConnectionContext {
  sourceId: IBlock['uuid'];
  targetId: IBlock['uuid'];
  exitId: IBlockExit['uuid'];
}

export type SupportedOperation = IConnectionSourceRelocateOperation | IConnectionCreateOperation

export interface IPosition {
  x: number;
  y: number;
}

export interface IBuilderState {
  activeBlockId: IBlock['uuid'] | null;
  isEditable: boolean;
  activeConnectionsContext: IConnectionContext[];
  operations: {
    [OperationKind.CONNECTION_SOURCE_RELOCATE]: IConnectionSourceRelocateOperation;
    [OperationKind.CONNECTION_CREATE]: IConnectionCreateOperation;
    [OperationKind.BLOCK_RELOCATE]: null;
  };
  draggableForExitsByUuid: object;
  draggableForBlocksByUuid: object;
  draggableForMultipleMove: object;
  multiDragPositions: { start: IPosition; end: IPosition };
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
  draggableForBlocksByUuid: {},
  draggableForMultipleMove: {},
  multiDragPositions: {} as { start: IPosition; end: IPosition }
})

export const getters: GetterTree<IBuilderState, IRootState> = {
  activeBlock: ({ activeBlockId }, { blocksById }) => (activeBlockId ? blocksById[activeBlockId] : null),

  blocksById: (state, getters, rootState, rootGetters) => {
    const { blocks } = rootGetters['flow/activeFlow'] ? rootGetters['flow/activeFlow'] : { blocks: [] }
    return keyBy(blocks, 'uuid')
  },

  nodeLabelsById: (state, getters, { flow: { flows } }, rootGetters) => mapValues(keyBy(flows[0].blocks, 'uuid'), 'label'),

  exitLabelsById: (state, getters, { flow: { flows } }, rootGetters) => mapValues(keyBy(flatMap(flows[0].blocks, 'exits'), 'uuid'), 'label'),

  isEditable: (state) => state.isEditable,
}

export const mutations: MutationTree<IBuilderState> = {
  activateBlock(state, { blockId }: {blockId: IBlock['uuid']}) {
    state.activeBlockId = blockId

    // simulate engaging with specified block
    // FlowRunner.prototype.navigateTo(block, state as unknown as IContext)
  },

  activateConnection(state, { connectionContext }) {
    state.activeConnectionsContext = union([connectionContext], state.activeConnectionsContext)
  },

  deactivateConnection(state, { connectionContext }) {
    state.activeConnectionsContext = filter(state.activeConnectionsContext, (context) => context !== connectionContext)
  },

  setOperation({ operations }: { operations: any }, { operation }: { operation: SupportedOperation }) {
    operations[operation.kind] = operation
  },

  setBlockPositionTo(state, { position: { x, y }, block }) {
    // todo: ensure our vendor_metadata.io_viamo is always instantiated with builder // uiData props
    // if (!block.vendor_metadata.io_viamo.uiData) {
    //   defaultsDeep(block, {vendor_metadata: {io_viamo: {uiData: {xPosition: 0, yPosition: 0}}}})
    //   Vue.observable(block.vendor_metadata.io_viamo.uiData)
    // }

    block.vendor_metadata.io_viamo.uiData.xPosition = x
    block.vendor_metadata.io_viamo.uiData.yPosition = y
  },

  setIsEditable(state, value) {
    state.isEditable = value
  },

  initDraggableForExitsByUuid(state) {
    state.draggableForExitsByUuid = {}
  }
}

export const actions: ActionTree<IBuilderState, IRootState> = {
  setBlockPositionFromDelta({ commit }, { delta: { x, y }, block }) {
    console.log('checkRs', 'setBlockPositionFromDelta', x, y, block)
    const { vendor_metadata: {
      io_viamo: {
        uiData: {
          xPosition: initialXPosition,
          yPosition: initialYPosition
        }
      }
    }} = block

    const newPosition = {
      x: initialXPosition + x,
      y: initialYPosition + y
    }

    commit('setBlockPositionTo', { position: newPosition, block })
    return newPosition
  },

  removeConnectionFrom({ commit }, { block: { uuid: blockId }, exit: { uuid: exitId } }) {
    commit('flow/block_setBlockExitDestinationBlockId', {
      blockId,
      exitId,
      destinationBlockId: undefined,
    }, { root: true })
  },

  // @note: multiple connections can lead to same node, so it doesn't make sense to do a swap here; we'll be "appending"
  // when moving connection target: setExitDestination(exitId, destinationId)

  /// /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // [OperationKind.CONNECTION_SOURCE_RELOCATE] //////////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // todo: do operations warrant their own store? Maybe a generic store that handles a common behaviour

  initializeConnectionSourceRelocateWith({ commit }, {
    block: { uuid: blockId },
    exit: { uuid: exitId },
    position,
  }) {
    // this would be a flight-monitor create(key)
    const operation: IConnectionSourceRelocateOperation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: { from: { blockId, exitId }, position, to: { blockId, exitId } },
    }
    commit('setOperation', { operation })
  },

  setConnectionSourceRelocateValue({ commit, state }, { block: { uuid: blockId }, exit: { uuid: exitId } }) {
    const { data } = state.operations[OperationKind.CONNECTION_SOURCE_RELOCATE]
    if (!data) {
      throw new ValidationException(`Unable to modify uninitialized operation: ${JSON.stringify(data)}`)
    }

    const { from, position } = data
    const operation: IConnectionSourceRelocateOperation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: { from, position, to: { blockId, exitId } },
    }
    commit('setOperation', { operation })
  },

  setConnectionSourceRelocateValueToNullFrom({ commit, state }, { block: { uuid: blockId }, exit: { uuid: exitId } }) {
    const { data } = state.operations[OperationKind.CONNECTION_SOURCE_RELOCATE]
    if (!data) {
      throw new ValidationException(`Unable to modify uninitialized operation: ${JSON.stringify(data)}`)
    }

    const { from, to, position } = data
    if (!isEqual(to, { blockId, exitId })) {
      throw new ValidationException('Unable to nullify exit relocation from different exit.')
    }

    const operation: IConnectionSourceRelocateOperation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: { from, position, to: null },
    }
    commit('setOperation', { operation })
  },

  applyConnectionSourceRelocate({ dispatch, commit, state: { operations } }) {
    const { data } = operations[OperationKind.CONNECTION_SOURCE_RELOCATE]
    if (!data) {
      throw new ValidationException(`Unable to complete uninitialized operation: ${JSON.stringify(data)}`)
    }

    const { from: first, to: second } = data
    dispatch('flow/block_swapBlockExitDestinationBlockIds', { first, second }, { root: true })

    const operation: IConnectionSourceRelocateOperation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: null,
    }
    commit('setOperation', { operation })
  },

  /// ////////////////////////////////////////////////////////////////////////////////////////////////
  // [OperationKind.CONNECTION_CREATE] //////////////////////////////////////////////////////////////
  /// ////////////////////////////////////////////////////////////////////////////////////////////////

  initializeConnectionCreateWith({ commit }, {
    block: { uuid: blockId },
    exit: { uuid: exitId },
    position,
  }) {
    if (!blockId || !exitId) {
      throw new ValidationException(`Unable to create connection without source: ${JSON.stringify({ blockId, exitId })}`)
    }

    const operation: IConnectionCreateOperation = {
      kind: OperationKind.CONNECTION_CREATE,
      data: { source: { blockId, exitId }, position, targetId: null },
    }

    commit('setOperation', { operation }) // this would be a flight-monitor create(key)
  },

  setConnectionCreateTargetBlock({ commit, state }, { block }) {
    const { data } = state.operations[OperationKind.CONNECTION_CREATE]
    if (!data) {
      throw new ValidationException(`Unable to modify uninitialized operation: ${JSON.stringify(data)}`)
    }

    const { source, position } = data
    const operation: IConnectionCreateOperation = {
      kind: OperationKind.CONNECTION_CREATE,
      data: { source, position, targetId: block.uuid },
    }

    commit('setOperation', { operation })
  },

  setConnectionCreateTargetBlockToNullFrom({ commit, state }, { block }) {
    const { data } = state.operations[OperationKind.CONNECTION_CREATE]
    if (!data) {
      throw new ValidationException(`Unable to modify uninitialized operation: ${JSON.stringify(data)}`)
    }

    const { source, targetId, position } = data
    if (!isEqual(targetId, block.uuid)) {
      throw new ValidationException('Unable to nullify exit relocation from different exit.')
    }

    const operation: IConnectionCreateOperation = {
      kind: OperationKind.CONNECTION_CREATE,
      data: { source, position, targetId: null },
    }

    commit('setOperation', { operation })
  },

  applyConnectionCreate({ dispatch, commit, state: { operations } }) {
    const { data } = operations[OperationKind.CONNECTION_CREATE]
    if (!data) {
      throw new ValidationException(`Unable to complete uninitialized operation: ${JSON.stringify(data)}`)
    }

    const {
      source: { blockId, exitId },
      targetId: destinationBlockId,
    } = data

    commit('flow/block_setBlockExitDestinationBlockId', { blockId, exitId, destinationBlockId }, { root: true })

    const operation: IConnectionCreateOperation = { kind: OperationKind.CONNECTION_CREATE, data: null }
    commit('setOperation', { operation })
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
    dispatch, commit, state, rootState,
  }, { flows, resources }: { flows: IFlow[]; resources: IResource[]}) {
    console.debug('importing flows & resources ...')
    console.log({ flows, resources })
    const { flow: flowState } = rootState
    const defaultSupportedMode = [
      SupportedMode.IVR,
      SupportedMode.SMS,
      SupportedMode.USSD,
    ]

    // add default activated modes if not set yet
    for (const key in flows) {
      if (!flows[key].hasOwnProperty('supported_modes') || !flows[key].supported_modes.length) {
        flows[key].supported_modes = defaultSupportedMode
      }
    }

    // Update flow state
    flowState.flows.splice(0, Number.MAX_SAFE_INTEGER, ...flows)
    flowState.first_flow_id = flows[0].uuid
    flowState.resources.splice(0, Number.MAX_SAFE_INTEGER, ...resources)

    // make sure we use the same languages ids on both UI & Flows
    rootState.trees.ui.languages = flows[0].languages
  },
  setIsEditable({ commit }, value) {
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
    [get(source, 'vendor_metadata.io_viamo.uiData.xPosition'), get(source, 'vendor_metadata.io_viamo.uiData.yPosition')],
    [get(target, 'vendor_metadata.io_viamo.uiData.xPosition'), get(target, 'vendor_metadata.io_viamo.uiData.yPosition')],

    // block titles
    source.label,
    target.label,

    // other exit titles // todo: this needs to be a computed prop // possibly on store as getter by blockId ?
    ...map(source.exits, 'tag'),
    ...map(target.exits, 'tag'),
  ]
}

export function computeBlockUiData(block?: IBlock | null) {
  const xDelta = 160
  const yDelta = 180

  let xPosition = get(block, 'vendor_metadata.io_viamo.uiData.xPosition')
  let yPosition = get(block, 'vendor_metadata.io_viamo.uiData.yPosition')

  if (!xPosition || !yPosition) {
    const viewPortCenter = getViewportCenter()
    xPosition = viewPortCenter.x
    yPosition = viewPortCenter.y
  }

  return {
    xPosition: xPosition + xDelta,
    yPosition: yPosition + yDelta,
  }
}

export function getViewportCenter() {
  const builderCanvasElement = document.getElementsByClassName('builder-canvas')[0]
  const sideBarElement = document.getElementsByClassName('tree-sidebar-container')[0]
  const rect = builderCanvasElement.getBoundingClientRect()

  return {
    x: Math.round(Math.abs(rect.left) + (window.innerWidth - sideBarElement.clientWidth) / 2),
    y: Math.round(Math.abs(rect.top) + window.innerHeight / 2),
  }
}
