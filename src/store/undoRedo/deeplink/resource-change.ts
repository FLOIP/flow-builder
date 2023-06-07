export const RESOURCE_CHANGE_REGEX = /^flows.flows.(?<flowIndex>\d+).resources.(?<resourceIndex>\d+).(?<fieldPath>.+)/

type ResourceChangeParamsAsStrings = { flowIndex: string, resourceIndex: string, fieldPath: string }
type ResourceChangeParams = { flowIndex: number, resourceIndex: number, fieldPath: string }

export function parseResourceChangeParams(key: string): ResourceChangeParams | null {
  const params = RESOURCE_CHANGE_REGEX.exec(key)?.groups as ResourceChangeParamsAsStrings | undefined

  if (params !== undefined) {
    const {flowIndex, resourceIndex, fieldPath} = params
    return {
      flowIndex: Number(flowIndex),
      resourceIndex: Number(resourceIndex),
      fieldPath,
    }
  } else {
    return null
  }
}
