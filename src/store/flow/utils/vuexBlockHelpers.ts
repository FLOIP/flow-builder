import {toPath} from 'lodash'
import {IContext, findBlockOnActiveFlowWith, IBlock, IChoice, IResource} from '@floip/flow-runner'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makePath(block: any, rawPath: string): [object, string] {
  const path = toPath(rawPath)

  let pointer = block
  while (path.length !== 1) {
    const name = path.shift()!

    if (typeof pointer[name] === 'undefined') {
      pointer[name] = {}
    }
    pointer = pointer[name]
  }

  return [pointer, path.shift()!]
}

export function updateBlockValueByPath(
  state: unknown,
  blockId: IBlock['uuid'],
  path: string,
  value: boolean | number | string | object | null | undefined,
): void {
  const base = findBlockOnActiveFlowWith(blockId, state as IContext)
  const [pointer, key] = makePath(base, path)
  pointer[key] = value
}

export function deleteChoiceValueByPath(
  state: unknown,
  choice: IChoice,
  path: string,
): void {
  const [pointer, key] = makePath(choice, path)
  delete pointer[key]
}

export function removeBlockValueByPath(
  state: unknown,
  blockId: IBlock['uuid'],
  path: string,
): void {
  const base = findBlockOnActiveFlowWith(blockId, state as IContext)
  const [pointer, key] = makePath(base, path)

  delete pointer[key]
}
