import {
  findFlowWith,
  IBlock,
  IContext,
  IFlow,
  IResource,
  IResourceValue as IResourceDefinitionVariantOverModes,
  SupportedMode,
} from '@floip/flow-runner'
import {ValidationException} from '@floip/flow-runner/src/domain/exceptions/ValidationException'
import {cloneDeep, compact, defaults, difference, first, isEmpty, keyBy, map, union, without} from 'lodash'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IFlowsState} from '@/store/flow/index'
import {IRootState} from '@/store'
import {
  findBlockRelatedResourcesUuids,
  findResourceVariantOverModesWith,
  findResourceWith,
  IResourceDefinitionVariantOverModesFilter,
} from '@/store/flow/utils/resourceHelpers'

export const getters: GetterTree<IFlowsState, IRootState> = {
  resourcesByUuidOnActiveFlow: (_state, getters) => keyBy(getters.activeFlow?.resources, 'uuid'),

  resourceUuidsOnActiveFlow: (_state, getters): IBlock['uuid'][] => compact(map(getters.activeFlow?.resources, (res) => res.uuid)) as IBlock['uuid'][],

  nonOrphanResourceUuidsOnActiveFlow: (_state, getters): IBlock['uuid'][] => {
    let results: IBlock['uuid'][] = []
    getters.activeFlow?.blocks?.forEach((block: IBlock) => {
      results = union(results, findBlockRelatedResourcesUuids({block}))
    })

    return results
  },

  orphanResourceUuidsOnActiveFlow: (_state, getters) => difference(
    getters.resourceUuidsOnActiveFlow as IBlock['uuid'][],
    getters.nonOrphanResourceUuidsOnActiveFlow as IBlock['uuid'][],
  ),
}

export const mutations: MutationTree<IFlowsState> = {
  resource_addOnFlow(state, {flowId, resource}: {flowId: IFlow['uuid'], resource: IResource}) {
    findFlowWith(flowId, state as unknown as IContext).resources.push(resource)
  },

  resource_createVariantOnFlow(
    state,
    {flowId, resourceId, variant}: {flowId: IFlow['uuid'], resourceId: string, variant: IResourceDefinitionVariantOverModes},
  ) {
    const flow = findFlowWith(flowId, state as unknown as IContext)
    // append to given flow's resource
    findResourceWith(resourceId, flow)
      .values
      .push(cloneDeep(variant))
  },

  resource_removeVariantsOnFlow(
    state,
    {flowId, resourceId, variants}: {flowId: IFlow['uuid'], resourceId: string, variants: IResourceDefinitionVariantOverModes[]},
  ): void {
    const flow = findFlowWith(flowId, state as unknown as IContext)
    const resource = findResourceWith(resourceId, flow)
    resource.values = resource.values.filter(value => !variants.includes(value))
  },

  resource_setValueOnFlow(
    state,
    {flowId, resourceId, filter, value}: {
      flowId: IFlow['uuid'],
      resourceId: string,
      filter: IResourceDefinitionVariantOverModesFilter,
      value: string,
    },
  ) {
    const flow = findFlowWith(flowId, state as unknown as IContext)
    findResourceVariantOverModesWith(resourceId, filter, flow)
      .value = value || ''
  },
  // @note -- modes in this case does not tighten filter, but rather exists solely for update operation
  resource_setModesOnFlow(
    state,
    {flowId, resourceId, filter, modes}:
      {
        flowId: IFlow['uuid'],
        resourceId: string,
        filter: IResourceDefinitionVariantOverModesFilter,
      } & { modes: SupportedMode[] },
  ) {
    if (isEmpty(modes)) {
      // todo: create type that requires both resourceId & modes with (N>1) entries
      throw new ValidationException('`mode` is required to assign mode on `IResourceDefinitionVariantOverModes`.')
    }

    // todo: this should likely validate whether or not we're intersecting with other variants with this operation
    //       eg. variants: [{modes: [a, b]}, {modes: [c]}] => variants[0].modes = [c]
    const flow = findFlowWith(flowId, state as unknown as IContext)
    findResourceVariantOverModesWith(resourceId, filter, flow)
      .modes = modes
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  resource_add({commit, getters}, {resource}: {resource: IResource}) {
    commit('resource_addOnFlow', {flowId: getters.activeFlow.uuid, resource})
  },

  resource_createVariant(
    {commit, getters},
    {resourceId, variant}: {resourceId: IResource['uuid'], variant: IResourceDefinitionVariantOverModes},
  ) {
    commit('resource_createVariantOnFlow', {flowId: getters.activeFlow.uuid, resourceId, variant})
  },

  resource_removeVariants(
    {commit, getters},
    {resourceId, variants}: {resourceId: IResource['uuid'], variants: IResourceDefinitionVariantOverModes},
  ) {
    commit('resource_removeVariantsOnFlow', {flowId: getters.activeFlow.uuid, resourceId, variants})
  },

  resource_setValue(
    {commit, getters},
    {resourceId, filter, value}: {
      resourceId: IResource['uuid'],
      filter: IResourceDefinitionVariantOverModesFilter,
      value: string,
    },
  ) {
    commit('resource_setValueOnFlow', {flowId: getters.activeFlow.uuid, resourceId, filter, value})
  },

  resource_setModes(
    {commit, getters},
    {resourceId, filter, modes}:
      {resourceId: IResource['uuid'], filter: IResourceDefinitionVariantOverModesFilter} & { modes: SupportedMode[]},
  ) {
    commit('resource_setModesOnFlow', {flowId: getters.activeFlow.uuid, resourceId, filter, modes})
  },

  async resource_createWith(_context, {props}: { props: { uuid: string } & Partial<IResource> }): Promise<IResource> {
    return {
      ...defaults(
        props,
        {values: []},
      ),
    }
  },

  resource_setOrCreateValueModeSpecific(
    {commit, dispatch, state, getters},
    {resourceId, filter, value}: {resourceId: IResource['uuid'], filter: IResourceDefinitionVariantOverModes, value: string },
  ) {
    try {
      // @note - `find()` raises when absent; this verifies its presence
      findResourceVariantOverModesWith(resourceId, filter, getters.activeFlow)
      dispatch('resource_setValueModeSpecific', {resourceId, filter, value})
    } catch (e) {
      if (!(e instanceof ValidationException)) {
        throw e
      }

      dispatch('resource_createVariant', {resourceId, variant: Object.assign(cloneDeep(filter), {value})})
    }
  },

  resource_setValueModeSpecific(
    {commit, state, dispatch, getters},
    {resourceId, filter, value}: {resourceId: IResource['uuid'], filter: IResourceDefinitionVariantOverModes, value: string },
  ) {
    // find resource variant over modes
    const mode = first(filter.modes)
    const variant = findResourceVariantOverModesWith(resourceId, filter, getters.activeFlow)

    // need to disambiguate b/c value is spread over multiple modes
    if (variant.modes.length > 1) {
      // remove mode from existing variant
      dispatch('resource_setModes', {
        resourceId,
        filter: variant,
        modes: without(variant.modes, mode),
      })

      // generate new variant-over-modes with single targeted mode
      dispatch('resource_createVariant', {
        resourceId,
        variant: Object.assign(
          cloneDeep(variant),
          {modes: [mode], value},
        ),
      })

      // specialized case, we're done here
      return
    }

    dispatch('resource_setValue', {resourceId, filter: variant, value})
  },
}
