import {IBlock, IContext, IResource} from '@floip/flow-runner'

import {cloneDeep, filter, findIndex, get, isEqual} from 'lodash'

export function updateResourcesForLanguageMatch(
  resources: IResource[], oldId: string, newId: string,
): IResource[] {
  return resources.map((resource) => {
    const newResource = cloneDeep(resource)
    newResource.values = resource.values.map((value) => {
      const newValue = cloneDeep(value)
      if (value.language_id === oldId) {
        newValue.language_id = newId
      }
      return newValue
    })
    return newResource
  })
}

export function replaceResourcesWhenNecessary(
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
export function mergeFlowContainer(
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

export function checkSingleFlowOnly(flowContainer: IContext): boolean {
  return get(flowContainer, 'flows', []).length === 1
}

export function detectedLanguageChanges(
  {flowContainer, oldFlowContainer}:
    { flowContainer: IContext, oldFlowContainer: IContext | null },
): boolean {
  return !isEqual(get(flowContainer, 'flows[0].languages'), get(oldFlowContainer, 'flows[0].languages'))
}

export function detectedPropertyChanges(
  {newPropertyBlocks, oldPropertyBlocks}: { newPropertyBlocks: IBlock[], oldPropertyBlocks: IBlock[] },
): boolean {
  return !isEqual(newPropertyBlocks, oldPropertyBlocks)
}

export function detectedGroupChanges(
  {newGroupBlocks, oldGroupBlocks}: { newGroupBlocks: IBlock[], oldGroupBlocks: IBlock[] },
): boolean {
  return !isEqual(newGroupBlocks, oldGroupBlocks)
}

export function getPropertyBlocks(flowContainer: IContext): IBlock[] {
  return filter(get(flowContainer, 'flows[0].blocks'), (block) => block.type === 'Core.SetContactProperty')
}

export function getGroupBlocks(flowContainer: IContext): IBlock[] {
  return filter(get(flowContainer, 'flows[0].blocks'), (block) => block.type === 'Core.SetGroupMembership')
}
