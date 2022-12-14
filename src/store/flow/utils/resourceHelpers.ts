import {
  IBlock,
  IChoice,
  IContext,
  IFlow,
  IResource,
  IResourceValue,
  IResourceValue as IResourceDefinitionVariantOverModes,
  SupportedContentType,
  SupportedMode,
} from '@floip/flow-runner'
import {cloneDeep, difference, find, isEmpty, isEqual, map, pick, without} from 'lodash'
import {ValidationException} from '@floip/flow-runner/src/domain/exceptions/ValidationException'

export type IResourceDefinitionVariantOverModesFilter = Partial<IResourceDefinitionVariantOverModes>
export type IResourceDefinitionVariantOverModesFilterAsKey = Omit<IResourceDefinitionVariantOverModes, 'value'>

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

/** @returns resource variant's index in the resource.values array, -1 if not found */
export function findIndexForResourceVariant(
  resource: IResource,
  filter: IResourceDefinitionVariantOverModesFilter,
): number {
  const keysForComparison = without(Object.keys(filter), 'modes')
  const filterWithComparatorKeys = pick(filter, keysForComparison)
  return resource.values.findIndex(v =>
    isEqual(filterWithComparatorKeys, pick(v, keysForComparison))
    && difference(filter.modes, v.modes).length === 0)
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

export function cleanupFlowResources(container: IContext, choiceMimeType: string): IContext {
  return {
    ...container,
    flows: container.flows.map((flow) => ({
      ...flow,
      resources: flow.resources
        .map(resource => ({
          ...resource,
          values: resource.values.filter(value => {
            const isChoice = value.mime_type === choiceMimeType
            const hasAllowedMode = flow.supported_modes.some(mode => value.modes.includes(mode))
            const hasSupportedLanguage = flow.languages.some(lang => value.language_id === lang.id)

            return isChoice || (hasAllowedMode && hasSupportedLanguage)
          }),
        }))
        .filter(resource => !isEmpty(resource.values)),
    })),
  }
}

export function findBlockRelatedResourcesUuids({block}: {block: IBlock}): IResource['uuid'][] {
  const resources: IResource['uuid'][] = []
  // Get uuid from block config prompt
  if (block.config?.prompt !== undefined) {
    resources.push((block.config.prompt as IBlock['uuid']))
  }

  // Get uuid from block config choices
  block.config?.choices?.forEach((choice: IChoice) => {
    resources.push(choice.prompt)
  })

  return resources
}
