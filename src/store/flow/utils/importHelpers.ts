import {
  IResource,
  IContext,
  IBlock,
} from '@floip/flow-runner'

import {
  get,
  findIndex,
  isEqual,
  filter,
  cloneDeep,
} from 'lodash'

export const updateResourcesForLanguageMatch = function (
  resources: IResource[], oldId: string, newId: string,
): IResource[] {
  return resources.map((resource) => {
    const newResource = cloneDeep(resource)
    newResource.values = resource.values.map((value) => {
      const newValue = cloneDeep(value)
      if (value.language_id === oldId) {
        newValue.language_id = newId // eslint-disable-line @typescript-eslint/camelcase
      }
      return newValue
    })
    return newResource
  })
}

const replaceResourcesWhenNecessary = function (
  existingResources: IResource[], newResources: IResource[],
): IResource[] {
  const newExistingResources = cloneDeep(existingResources)
  newResources.forEach((resource) => {
    const newResourceUUID = resource.uuid
    const existingResourceIndex = findIndex(
      newExistingResources,
      (oldResource) => oldResource.uuid === newResourceUUID,
    )
    if (existingResourceIndex < 0) {
      newExistingResources.push(resource)
    } else {
      newExistingResources[existingResourceIndex] = resource
    }
  })
  return newExistingResources
}

// We shouldn't need any special logic over collisions
// We just overwrite any existing flows/resources with a given uuid
// This is because they are uuids
// We warn this will happen in the importer
// For now we don't care about flow container uuid collisions
// ...as we aren't quite sure on the role of flow container yet
export const mergeFlowContainer = function (
  existingFlowContainer: IContext, newFlowContainer: IContext,
): IContext {
  const newExistingFlowContainer = cloneDeep(existingFlowContainer)
  // There should only be a single flow imported at a time currently.
  // We block any more than this in the importer
  const newFlow = get(newFlowContainer, 'flows[0]')
  const newFlowUUID = get(newFlowContainer, 'flows[0].uuid')
  const existingFlowIndex = findIndex(
    newExistingFlowContainer.flows,
    (flow) => flow.uuid === newFlowUUID,
  )
  if (existingFlowIndex < 0) {
    newExistingFlowContainer.flows.push(newFlow)
  } else {
    newExistingFlowContainer.flows[existingFlowIndex] = newFlow
  }
  const newResources = cloneDeep(newExistingFlowContainer.resources)
  newExistingFlowContainer.resources = replaceResourcesWhenNecessary(
    newResources,
    newFlowContainer.resources,
  )
  return newExistingFlowContainer
}

export const checkSingleFlowOnly = function (flowContainer: IContext) {
  if (get(flowContainer, 'flows', []).length !== 1) {
    return false
  }
  return true
}

export const detectedLanguageChanges = function (
  { flowContainer, oldFlowContainer }:
  { flowContainer: IContext; oldFlowContainer: IContext | null},
) {
  return !isEqual(get(flowContainer, 'flows[0].languages'), get(oldFlowContainer, 'flows[0].languages'))
}
export const detectedPropertyChanges = function (
  { newPropertyBlocks, oldPropertyBlocks }:
  { newPropertyBlocks: IBlock[]; oldPropertyBlocks: IBlock[] },
) {
  return !isEqual(newPropertyBlocks, oldPropertyBlocks)
}
export const detectedGroupChanges = function (
  { newGroupBlocks, oldGroupBlocks }: { newGroupBlocks: IBlock[]; oldGroupBlocks: IBlock[] },
) {
  return !isEqual(newGroupBlocks, oldGroupBlocks)
}

export const getPropertyBlocks = function (flowContainer: IContext) {
  return filter(get(flowContainer, 'flows[0].blocks'), (block) => block.type === 'Core.SetContactProperty')
}
export const getGroupBlocks = function (flowContainer: IContext) {
  return filter(get(flowContainer, 'flows[0].blocks'), (block) => block.type === 'Core.SetGroupMembership')
}
