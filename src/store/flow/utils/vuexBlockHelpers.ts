import Vue from 'vue'
import {toPath} from 'lodash'
import {IContext, findBlockOnActiveFlowWith, IBlock} from '@floip/flow-runner'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makePath(block: any, rawPath: string): [object, string] {
  const path = toPath(rawPath)
  console.info('PATH', path)

  let pointer = block
  while (path.length !== 1) {
    const name = path.shift()!

    if (typeof pointer[name] === 'undefined') {
      Vue.set(pointer, name, {})
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
  Vue.set(pointer, key, value)
}

export function removeBlockValueByPath(
  state: unknown,
  blockId: IBlock['uuid'],
  path: string,
): void {
  const base = findBlockOnActiveFlowWith(blockId, state as IContext)
  const [pointer, key] = makePath(base, path)

  Vue.delete(pointer, key)
}
