import {
  findFlowWith,
  IContext,
  IFlow,
  IResource,
  IResourceValue as IResourceDefinitionVariantOverModes,
  IResourceValue,
  SupportedContentType,
  SupportedMode,
} from '@floip/flow-runner'
import {ValidationException} from '@floip/flow-runner/src/domain/exceptions/ValidationException'
import {
  castArray,
  cloneDeep,
  compact,
  defaults,
  difference,
  find,
  first,
  isEmpty,
  isEqual,
  keyBy,
  map,
  pick,
  without,
} from 'lodash'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IFlowsState} from '@/store/flow/index'
import {IRootState} from '@/store'

export const getters: GetterTree<IFlowsState, IRootState> = {
  resourcesByUuidOnActiveFlow: (_state, getters) => keyBy(getters.activeFlow.resources, 'uuid'),

  resourceUuidsOnActiveFlow: (_state, getters) => compact(map(getters.activeFlow.resources, (res) => res.uuid)),
}

export const mutations: MutationTree<IFlowsState> = {
  resource_addOnFlow(state, {flowId, resource}: {flowId: IFlow['uuid'], resource: IResource}) {
    findFlowWith(flowId, state as unknown as IContext).resources.push(resource)
  },

  /*
   * TODO in VMO-6643 We need an action that can clean resources and then call this to actual remove.
   * TODO in VMO-6643 We need logic to truly check resources are unused
   *
   * resource_delete({resources}, {resourceId}: { resourceId: string }) {
   *   const resourceIndex = findIndex(resources, (resource) => resource.uuid === resourceId)
   *   resources.splice(resourceIndex, 1)
   */

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

  resource_createVariant({commit, getters}, {resourceId, variant}: {resourceId: IResource['uuid'], variant: IResourceDefinitionVariantOverModes }) {
    commit('resource_createVariantOnFlow', {flowId: getters.activeFlow.uuid, resourceId, variant})
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
    {
      resourceId,
      filter,
      value,
    }: {resourceId: string, filter: IResourceDefinitionVariantOverModes } & { value: string, mode: SupportedMode },
  ) {
    // find resource variant over modes
    const
      mode = first(filter.modes)
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

      //
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

export type IResourceDefinitionVariantOverModesFilter = Partial<IResourceDefinitionVariantOverModes>
export type IResourceDefinitionVariantOverModesFilterAsKey = Omit<IResourceDefinitionVariantOverModes, 'value'>

export type IResourceDefinitionVariantOverModesFilterWithResourceId =
  Partial<IResourceDefinitionVariantOverModes> & { resourceId: string }

export function findResourceWith(uuid: string, {resources}: IFlow): IResource {
  const resource = find(resources, {uuid})
  if (resource == null) {
    throw new ValidationException(`Unable to find resource on context: ${uuid} in ${map(resources, 'uuid')}`)
  }

  return resource
}

export function findResourceVariantOverModesWith(
  uuid: IResource['uuid'],
  filter: IResourceDefinitionVariantOverModesFilter,
  flow: IFlow,
): IResourceDefinitionVariantOverModes {
  return findResourceVariantOverModesOn(
    findResourceWith(uuid, flow),
    filter,
  )
}

export function findResourceVariantOverModesOn(
  resource: IResource,
  filter: IResourceDefinitionVariantOverModesFilter,
): IResourceValue {
  // b/c we do explicit partial matching on modes
  // why do we do partial matching on modes?

  // todo: is there a way that we could do an inclusive+additive search here?
  // todo: the goal here would be to be able to do something like:
  //       resource: {values: [
  //             {modes: [...flow.modes], contentType: contentType, ...}
  //       ]}
  //      the equivalent of the above— This would provide us the ability to then toggle

  const keysForComparison = without(Object.keys(filter), 'modes')
  const filterWithComparatorKeys = pick(filter, keysForComparison)
  const variant = find<IResourceDefinitionVariantOverModes>(
    resource.values,
    (v) => isEqual(filterWithComparatorKeys, pick(v, keysForComparison))
      && difference(filter.modes, v.modes).length === 0,
  )

  if (variant == null) {
    throw new ValidationException(`Unable to find resource variant (over modes) on context: (
      ${resource.uuid},
      ${JSON.stringify(filter)}) in
        ${JSON.stringify(map(resource.values, (v) => pick(v, keysForComparison)))}`)
  }

  return variant
}

export function findOrGenerateStubbedVariantFor(
  resourceId: IResource['uuid'],
  filter: IResourceDefinitionVariantOverModesFilterAsKey,
  flow: IFlow,
): IResourceDefinitionVariantOverModes {
  return findOrGenerateStubbedVariantOn(
    findResourceWith(resourceId, flow),
    filter,
  )
}

export function findOrGenerateStubbedVariantOn(
  resource: IResource,
  filter: IResourceDefinitionVariantOverModesFilterAsKey,
): IResourceDefinitionVariantOverModes {
  try {
    return findResourceVariantOverModesOn(resource, filter)
  } catch (e) {
    if (!(e instanceof ValidationException)) {
      throw e
    }

    return Object.assign(cloneDeep(filter), {value: ''})
  }
}

export function discoverContentTypesFor(mode: SupportedMode, resource?: IResource): SupportedContentType[] | undefined {
  const {TEXT, AUDIO, IMAGE, VIDEO} = SupportedContentType

  // @note -- contentType order inadvertently determines render order on UI.
  const defaultModeMappings: { [key in SupportedMode]?: SupportedContentType[] } = {
    // voice
    [SupportedMode.IVR]: [AUDIO],
    [SupportedMode.SMS]: [TEXT],
    [SupportedMode.TEXT]: [TEXT],
    [SupportedMode.USSD]: [TEXT],
    // clipboard
    [SupportedMode.OFFLINE]: [TEXT, IMAGE, VIDEO],
    // social
    [SupportedMode.RICH_MESSAGING]: [TEXT, IMAGE, VIDEO],
  }

  if (!resource || !resource.values.length) {
    return defaultModeMappings[mode]
  }
  let contentTypeOverrides: { [key in SupportedMode]?: string[] } = {}
  // TODO - think harder about this - what happens when a mode has a non standard content type - e.g. ivr on a log block
  // What happens in a future localised resource world on things like LogBlock? Do we need a log resource value for every language?
  contentTypeOverrides = resource.values.reduce((contentTypeOverrides, value) => {
    value.modes.reduce((contentTypeOverrides, resourceMode) => {
      if (!contentTypeOverrides[resourceMode]) {
        contentTypeOverrides[resourceMode] = []
      }
      contentTypeOverrides[resourceMode]!.push(value.content_type)
      return contentTypeOverrides
    }, contentTypeOverrides)
    return contentTypeOverrides
  }, contentTypeOverrides)
  return Object.assign(defaultModeMappings, contentTypeOverrides)[mode]
}

export function cleanupFlowResources(container: IContext): IContext {
  return {
    ...container,
    flows: container.flows.map((flow) => ({
      ...flow,
      resources: flow.resources
        .map(resource => ({
          ...resource,
          values: resource.values.filter(value => {
            const hasAllowedMode = flow.supported_modes.some(mode => value.modes.includes(mode))
            const hasSupportedLanguage = flow.languages.some(lang => value.language_id === lang.id)

            return hasAllowedMode && hasSupportedLanguage
          }),
        }))
        .filter(resource => !isEmpty(resource.values)),
    })),
  }
}
