import {
  IResource,
} from '@floip/flow-runner'

export const updateResourcesForLanguageMatch = function (resources: IResource[], oldId: string, newId: string): IResource[] {
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
