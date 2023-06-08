export const BLOCK_CHANGE_REGEX = /^flows.flows.(?<flowIndex>\d+).blocks.(?<blockIndex>\d+).(?<fieldPath>.+)/

type BlockChangeParamsAsStrings = { flowIndex: string, blockIndex: string, fieldPath: string }
type BlockChangeParams = { flowIndex: number, blockIndex: number, fieldPath: string }

export function parseBlockChangeParams(key: string): BlockChangeParams | null {
  const params = BLOCK_CHANGE_REGEX.exec(key)?.groups as BlockChangeParamsAsStrings | undefined

  if (params !== undefined) {
    const {flowIndex, blockIndex, fieldPath} = params
    return {
      flowIndex: Number(flowIndex),
      blockIndex: Number(blockIndex),
      fieldPath: fieldPath.replace(/\./g, '/'),
    }
  } else {
    return null
  }
}
