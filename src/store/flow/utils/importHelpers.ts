import {
  IResourceDefinition,
  IContext,
} from '@floip/flow-runner'

import {
  get,
  findIndex,
} from 'lodash'

export const updateResourcesForLanguageMatch = function (resources: IResourceDefinition[], oldId: string, newId: string): IResourceDefinition[] {
  return resources.map((resource) => {
    resource.values = resource.values.map((value) => {
      if(value.languageId === oldId) {
        value.languageId = newId
      }
      return value
    })
    return resource
  })
}

//We shouldn't need any special logic over collisions
//We just overwrite any existing flows/resources with a given uuid
//This is because they are uuids
//We warn this will happen in the importer
export const mergeFlowContainer = function (existingFlowContainer: IContext, newFlowContainer: IContext): IContext {
  //there should only be a single flow imported at a time currently. We block any more than this in the importer
  const newFlow = get(newFlowContainer, 'flows[0]')
  const newFlowUUID = get(newFlowContainer, 'flows[0].uuid')
  const existingFlowIndex = findIndex(existingFlowContainer.flows, (flow) => flow.uuid == newFlowUUID)
  if(existingFlowIndex < 0) {
    existingFlowContainer.flows.push(newFlow)
  } else {
    existingFlowContainer.flows[existingFlowIndex] = newFlow
  }
  existingFlowContainer.resources = replaceResourcesWhenNecessary(existingFlowContainer.resources, newFlowContainer.resources)
  return existingFlowContainer
}

const replaceResourcesWhenNecessary = function(existingResources: IResourceDefinition[], newResources: IResourceDefinition[]): IResourceDefinition[] {
  newResources.forEach((resource) => {
    const newResourceUUID = resource.uuid
    const existingResourceIndex = findIndex(existingResources, (oldResource) => oldResource.uuid == newResourceUUID)
    if(existingResourceIndex < 0) {
      existingResources.push(resource)
    } else {
      existingResources[existingResourceIndex] = resource
    }
  })
  return existingResources
}
