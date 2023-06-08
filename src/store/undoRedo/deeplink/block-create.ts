export const BLOCK_CREATE_REGEX = /^flows.flows.(?<flowIndex>\d+).blocks.(?<blockIndex>\d+)$/

type BlockCreateParamsAsStrings = { flowIndex: string, blockIndex: string }
type BlockCreateParams = { flowIndex: number, blockIndex: number }

export function parseBlockCreateParams(key: string): BlockCreateParams | null {
  const params = BLOCK_CREATE_REGEX.exec(key)?.groups as BlockCreateParamsAsStrings | undefined

  if (params !== undefined) {
    const {flowIndex, blockIndex} = params
    return {
      flowIndex: Number(flowIndex),
      blockIndex: Number(blockIndex),
    }
  } else {
    return null
  }
}
