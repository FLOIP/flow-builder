/* eslint-disable import/prefer-default-export */

import {IContext} from '@floip/flow-runner'
import {castArray, cloneDeep, isEmpty} from 'lodash'

function createSetValidator<T>(allowedValues: T[]) {
  return (lookup: T | T[]) => {
    const lookupValues = castArray(lookup)

    for (let i = 0; i < lookupValues.length; i += 1) {
      if (allowedValues.includes(lookupValues[i])) {
        return true
      }
    }
    return false
  }
}

export function cleanupFlowResources(container: IContext): IContext {
  const result = cloneDeep(container)

  for (let i = 0; i < result.flows.length; i += 1) {
    const flow = result.flows[i]

    const hasAllowedMode = createSetValidator(flow.supported_modes)
    const hasSupportedLanguage = createSetValidator(flow.languages.map(lang => lang.id))

    flow.resources = flow.resources
      .map(resource => ({
        ...resource,
        values: resource.values.filter(value => (
          hasAllowedMode(value.modes)
          && hasSupportedLanguage(value.language_id)
        )),
      }))
      .filter(resource => !isEmpty(resource.values))
  }

  return result
}
