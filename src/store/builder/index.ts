import {filter, flatMap, isEqual, keyBy, map, mapValues, union, reject} from 'lodash'
import Vue from 'vue'
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit, IBlockUIMetadataCanvasCoordinates, IContext, ValidationException} from '@floip/flow-runner'
import {IDeepBlockExitIdWithinFlow} from '@/store/flow/block'
import {routeFrom} from '@/lib/mixins/Routes'
import InProgressAction from '@/components/notification/InProgressAction.vue'
import Lang from '@/lib/filters/lang'

// The "Saving" text flashes too quickly w/o actual backend interaction
export const SAVING_ANIMATION_DURATION = 1000

// todo migrate these to flight-monitor
export enum OperationKind {
  CONNECTION_CREATE = 'CONNECTION_CREATE',
  // todo: we can now skip updating vuex on-the-fly and rather await a drop
  BLOCK_RELOCATE = 'BLOCK_RELOCATE',
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

export type SupportedOperation = IConnectionCreateOperation

export interface IPosition {
  x: number,
  y: number,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Draggable = any

export interface IBuilderState {
  activeBlockId: IBlock['uuid'] | null,
  isEditable: boolean,
  activeMainComponent?: string,
  hasFlowChanges: boolean,
  activeConnectionsContext: IConnectionContext[],
  operations: {
    [OperationKind.CONNECTION_CREATE]: IConnectionCreateOperation,
    [OperationKind.BLOCK_RELOCATE]: null,
  },
  //this will be populated when we drag an exit
  draggableForExitsByUuid: Record<string, Draggable>,
  isBlockEditorOpen: boolean,
  interactionDesignerHeaderBoundingClientRect: DOMRect,
  isConnectionCreationInProgress: boolean,
}

export const stateFactory = (): IBuilderState => ({
  activeBlockId: null,
  isEditable: true,
  activeMainComponent: undefined,
  hasFlowChanges: false,
  activeConnectionsContext: [],
  operations: {
    [OperationKind.CONNECTION_CREATE]: {
      kind: OperationKind.CONNECTION_CREATE,
      data: null,
    },
    [OperationKind.BLOCK_RELOCATE]: null,
  },
  draggableForExitsByUuid: {},
  isBlockEditorOpen: false,
  interactionDesignerHeaderBoundingClientRect: {} as DOMRect,
  isConnectionCreationInProgress: false,
})

export type ConnectionLayout = any[]

export const getters: GetterTree<IBuilderState, IRootState> = {
  activeBlock: ({activeBlockId}, {blocksById}) => (activeBlockId ? blocksById[activeBlockId] : null),

  blocksById: (_state, _getters, _rootState, rootGetters) => {
    const {blocks} = rootGetters['flow/activeFlow'] ? rootGetters['flow/activeFlow'] : {blocks: []}
    return keyBy(blocks, 'uuid')
  },

  nodeLabelsById: (_state, _getters, {flow: {flows}}) => mapValues(keyBy(flows[0].blocks, 'uuid'), 'label'),

  exitLabelsById: (_state, _getters, {flow: {flows}}) => mapValues(keyBy(flatMap(flows[0].blocks, 'exits'), 'uuid'), 'label'),

  isEditable: (state) => state.isEditable,

  hasFlowChanges: (state) => state.hasFlowChanges,

  interactionDesignerHeaderBoundingClientRect: (state) => state.interactionDesignerHeaderBoundingClientRect,

  isBuilderCanvasEnabled: (state) => state.activeMainComponent === 'builder',

  isResourceViewerCanvasEnabled: (state) => state.activeMainComponent === 'resource-viewer',
}

export const mutations: MutationTree<IBuilderState> = {
  resetBuilderState(state, builderState) {
    Object.assign(state, builderState)
  },
  activateBlock(state, {blockId}: { blockId: IBlock['uuid'] | null }) {
    state.activeBlockId = blockId

    // simulate engaging with specified block
    // FlowRunner.prototype.navigateTo(block, state as unknown as IContext)
  },

  activateConnection(state, {connectionContext}) {
    state.activeConnectionsContext = union([connectionContext], state.activeConnectionsContext)
  },

  setActiveMainComponent(state, {mainComponent}: {mainComponent: string | undefined}) {
    state.activeMainComponent = mainComponent
  },

  deactivateConnection(state, {connectionContext}) {
    state.activeConnectionsContext = filter(state.activeConnectionsContext, (context) => context !== connectionContext)
  },

  deactivateConnectionFromExitUuid(state, {exitUuid}: {exitUuid: IBlockExit['uuid']}) {
    state.activeConnectionsContext = reject(state.activeConnectionsContext, (context) => context.exitId === exitUuid)
  },

  deactivateAllConnections(state) {
    state.activeConnectionsContext = []
  },

  setIsConnectionCreationInProgress(state, {value}: {value: boolean}) {
    state.isConnectionCreationInProgress = value
  },

  setOperation({operations}, {operation}: { operation: SupportedOperation }) {
    operations[operation.kind] = operation
  },

  setBlockPositionTo(state, {position: {x, y}, block}) {
    block.ui_metadata.canvas_coordinates.x = x
    block.ui_metadata.canvas_coordinates.y = y
  },

  setIsEditable(state, value) {
    state.isEditable = value
  },

  setHasFlowChanges(state, value) {
    state.hasFlowChanges = value
  },

  initDraggableForExitsByUuid(state) {
    state.draggableForExitsByUuid = {}
  },

  setIsBlockEditorOpen(state, value) {
    state.isBlockEditorOpen = value
  },

  setInteractionDesignerHeaderBoundingClientRect(state, value) {
    state.interactionDesignerHeaderBoundingClientRect = value
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

  // todo: do operations warrant their own store? Maybe a generic store that handles a common behaviour
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

  setIsEditable({commit}, value) {
    const boolVal = Boolean(value)
    commit('setIsEditable', boolVal)
  },

  setHasFlowChanges({commit}, value) {
    commit('setHasFlowChanges', Boolean(value))
  },

  /**
   * Persist flow and notify user with notifications, update needed UIs if needed
   */
  async persistFlowAndHandleUiState({dispatch, commit, state, rootGetters, rootState}): Promise<IContext | undefined> {
    // Do not save if features not enabled or edit is not allowed
    if (rootGetters.isFeatureTreeSaveEnabled === false || state.isEditable === false) {
      console.debug('skipping persistFlowAndHandleUiState')
      return undefined
    }

    commit('setTreeSaving', true, {root: true})
    const inProgress = Vue.$toast.info({
      component: InProgressAction,
      props: {
        textContent: Lang.trans('flow-builder.saving-flow'),
      },
    }, {
      closeButton: false,
    })

    const persistFlowAndReturnNewContainer: IContext | null = await dispatch('flow/flow_persist', {
      persistRoute: routeFrom('flows.persistFlow', {}, rootState.trees.ui.routes),
      flowContainer: rootGetters['flow/activeFlowContainer'],
    }, {root: true})

    const keepAnimatingIfPersistWasTooFast = new Promise(resolve => setTimeout(resolve, SAVING_ANIMATION_DURATION))

    const [newFlowContainer] = await Promise.all([
      persistFlowAndReturnNewContainer,
      keepAnimatingIfPersistWasTooFast,
    ])

    if (newFlowContainer === null || newFlowContainer === undefined) {
      // A console error was logged in the flow/flow_persist, but we need to notify users here
      Vue.$toast.error(`${Lang.trans('flow-builder.error-while-saving-flow')}`)
    } else {
      Vue.$toast.success(`${Lang.trans('flow-builder.flow-saved')}`, {
        timeout: 3000,
        hideProgressBar: true,
      })
    }

    commit('setTreeSaving', false, {root: true})
    Vue.$toast.dismiss(inProgress)

    return newFlowContainer ?? undefined
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
  return (builder: Vue) => {
    if (storeForBlockType === undefined || blockType === undefined) {
      // If this error happens, try to not import function from '@/lib' but directly from the file
      console.error('createDefaultBlockTypeInstallerFor',
        'something weird is happening: the store is undefined',
        'which might cause',
        '"TypeError: rawModule is undefined"')
    }
    return builder.$store.hasModule(['flow', blockType]) || builder.$store.registerModule(['flow', blockType], storeForBlockType)
  }
}

export function generateConnectionLayoutKeyFor(source: IBlock, target: IBlock): ConnectionLayout {
  console.debug('store/builder', 'generateConnectionLayoutKeyFor', source.uuid, target.uuid)
  return [
    // coords
    [source?.ui_metadata?.canvas_coordinates?.x, source?.ui_metadata?.canvas_coordinates?.y],
    [target?.ui_metadata?.canvas_coordinates?.x, target?.ui_metadata?.canvas_coordinates?.y],

    // block titles
    source.label,
    target.label,

    // todo: this needs to be a computed prop // possibly on store as getter by blockId ?

    // other exit titles
    ...map(source.exits, 'name'),
    ...map(target.exits, 'name'),
  ]
}

export function computeBlockCanvasCoordinates(block?: IBlock | null): IBlockUIMetadataCanvasCoordinates {
  const xDelta = 120
  const yDelta = 110
  let xPosition = block?.ui_metadata?.canvas_coordinates?.x
  let yPosition = block?.ui_metadata?.canvas_coordinates?.y

  if (xPosition == null || yPosition == null) {
    const viewPortCenter = getViewportCenter()
    xPosition = viewPortCenter.x
    yPosition = viewPortCenter.y
  }

  return {
    x: xPosition != null ? xPosition + xDelta : xDelta,
    y: yPosition != null ? yPosition + yDelta : yDelta,
  }
}

export function getViewportCenter(): IPosition {
  const builderCanvasElement = document.getElementsByClassName('builder-canvas')[0]
  const sideBarElement = document.getElementsByClassName('tree-sidebar-container')[0]
  const rect = builderCanvasElement.getBoundingClientRect()

  const sidebarAdjustment = sideBarElement !== undefined ? sideBarElement.clientWidth : 0

  return {
    x: Math.round(Math.abs(rect.left) + (window.innerWidth - sidebarAdjustment) / 2),
    y: Math.round(Math.abs(rect.top) + window.innerHeight / 2),
  }
}
