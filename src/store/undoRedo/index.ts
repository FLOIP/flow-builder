import Vue from 'vue'
import {Location} from 'vue-router'
import {IRootState} from '@/store'
import {IFlowsState} from '@/store/flow'
import structuredClone from '@ungap/structured-clone'
import {difference, union} from 'lodash'
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {getDeepLink} from '@/store/undoRedo/deeplink'
import {getChangedKeys} from './getChangedKeys'

const MAX_HISTORY_LENGTH = 100

export interface ISnapshotModules {
  flows: IFlowsState,
}

export interface ISnapshot {
  modules: ISnapshotModules,
  routeName: Location['name'] | null,
  routeParams: Location['params'] | null,
  timestamp: number,
}

export interface IUndoRedoState {
  snapshots: ISnapshot[],
  position: number,
}

function pack({modules, routeName, routeParams}: Omit<ISnapshot, 'timestamp'>): ISnapshot {
  return {
    modules: structuredClone(modules),
    routeName,
    routeParams,
    timestamp: new Date().getTime(),
  }
}

function unpack(snapshot: ISnapshot): ISnapshotModules {
  return structuredClone(snapshot?.modules ?? {} as ISnapshotModules)
}

function getChangedModulesKeys(snapshotA: ISnapshot, snapshotB: ISnapshot): string[] {
  const modulesA = unpack(snapshotA)
  const modulesB = unpack(snapshotB)

  return getChangedKeys(modulesA, modulesB)
}

function shouldAlwaysTriggerSnapshot(changedKeys: string[]): boolean {
  return changedKeys.some((key) => (
    /^flows.flows.\d+.blocks.\d+.exits.\d+.destination_block$/.test(key)
  ))
}

export const stateFactory = (): IUndoRedoState => ({
  snapshots: [],
  position: -1,
})

export const getters: GetterTree<IUndoRedoState, IRootState> = {
  currentSnapshot(state): ISnapshot {
    return state.snapshots[state.position]
  },
  previousSnapshot(state): ISnapshot | null {
    return state.snapshots[state.position - 1] ?? null
  },
  futureSnapshot(state): ISnapshot | null {
    return state.snapshots[state.position + 1] ?? null
  },
  hasCurrentSnapshot(_state, getters): boolean {
    return Boolean(getters.currentSnapshot)
  },
  hasPreviousSnapshot(_state, getters): boolean {
    return Boolean(getters.previousSnapshot)
  },
  hasFutureSnapshot(_state, getters): boolean {
    return Boolean(getters.futureSnapshot)
  },
  previouslyChangedKeys(_state, getters): string[] {
    return getChangedModulesKeys(
      getters.currentSnapshot as ISnapshot,
      getters.previousSnapshot as ISnapshot,
    )
  },
}

export const mutations: MutationTree<IUndoRedoState> = {
  addSnapshot(state, snapshot: ISnapshot) {
    state.snapshots = [
      ...state.snapshots.slice(0, state.position + 1),
      snapshot,
    ]
      .slice(-MAX_HISTORY_LENGTH)

    state.position = state.snapshots.length - 1
  },
  patchSnapshot(state, snapshot: ISnapshot) {
    Vue.set(state.snapshots, state.position, snapshot)
  },
  resetSnapshots(state, snapshot: ISnapshot) {
    state.snapshots = [snapshot]
    state.position = 0
  },
  undo(state) {
    if (state.position > 0) {
      state.position -= 1
    } else {
      console.warn('Cannot undo, we have already reached the beginning of the history')
    }
  },
  redo(state) {
    if (state.position < state.snapshots.length - 1) {
      state.position += 1
    } else {
      console.warn('Cannot redo, we have already reached the end of the history')
    }
  },
}

export const actions: ActionTree<IUndoRedoState, IRootState> = {
  async handleStateChange({commit, getters, rootState}) {
    const currentModules: ISnapshotModules = structuredClone({flows: getters.currentSnapshot?.modules.flows ?? {}})
    const newModules: ISnapshotModules = structuredClone({flows: rootState.flow})
    const changedKeys = getChangedKeys(currentModules, newModules)

    if (changedKeys.length === 0) {
      return
    }

    let {routeName, routeParams} = getDeepLink({
      changedKeys,
      flows: rootState.flow,
    })

    let isNewSnapshotFromPersistenceAction = false
    if (!(getters.hasCurrentSnapshot as boolean)) {
      // If we don't have a current snapshot yet, we consider the new snapshot as from a persistence action
      isNewSnapshotFromPersistenceAction = true
    }
    const currentSavedAt = getters.currentSnapshot?.modules.flows?.savedAt

    const newSavedAt = newModules.flows?.savedAt
    if (currentSavedAt !== newSavedAt && currentSavedAt !== undefined && newSavedAt !== undefined) {
      isNewSnapshotFromPersistenceAction = true
    }

    // if the action was from a persistence action, we don't want to change the route
    if (isNewSnapshotFromPersistenceAction) {
      routeName = getters.currentSnapshot?.routeName ?? 'flow-canvas'
      routeParams = getters.currentSnapshot?.routeParams ?? {}
    } else {
      routeName = routeName ?? 'flow-canvas'
      routeParams = {
        component: rootState.builder.activeMainComponent!,
        ...routeParams
      }
    }

    // format the snapshot
    const newSnapshot = pack({
      modules: newModules,
      routeName,
      routeParams,
    })

    // ####### force patch ##############
    if (isNewSnapshotFromPersistenceAction) {
      commit('patchSnapshot', newSnapshot)
      return
    }

    // ######## choose between `patch` and `add` ############
    if (getters.hasFutureSnapshot as boolean) {
      commit('addSnapshot', newSnapshot)
      return
    }

    // We group changes by comparing sets of changed keys, and either
    // add a new snapshot or patch the current ones
    const previouslyChangedKeys = getters.previouslyChangedKeys as string[]
    const differentKeys = union(
      difference(changedKeys, previouslyChangedKeys),
      difference(previouslyChangedKeys, changedKeys),
    )

    if (differentKeys.length > 0) {
      commit('addSnapshot', newSnapshot)
      return
    }

    if (shouldAlwaysTriggerSnapshot(changedKeys)) {
      commit('addSnapshot', newSnapshot)
      return
    }

    commit('patchSnapshot', newSnapshot)
  },

  /**
   * Undo user's command
   */
  async undoAndUpdateState({commit, getters, dispatch}): Promise<void> {
    // eslint-disable-next-line
    if (!getters.hasPreviousSnapshot) {
      console.warn('Cannot undo, the action history is empty or we have already reached the beginning of it')
      return
    }

    commit('undo')
    const modules = unpack(getters.currentSnapshot as ISnapshot)

    commit('flow/flow_resetFlowState', modules.flows, {root: true})
  },

  /**
   * Redo user's command
   */
  async redoAndUpdateState({commit, dispatch, getters}): Promise<void> {
    // eslint-disable-next-line
    if (!getters.hasFutureSnapshot as boolean) {
      console.warn('Cannot redo, the action history is empty or we have already reached the end of it')
      return
    }

    commit('redo')
    const modules = unpack(getters.currentSnapshot as ISnapshot)

    commit('flow/flow_resetFlowState', modules.flows, {root: true})
  },
}

export const store: Module<IUndoRedoState, IRootState> = {
  namespaced: true,
  state: stateFactory,
  mutations,
  getters,
  actions,
}

export default store
