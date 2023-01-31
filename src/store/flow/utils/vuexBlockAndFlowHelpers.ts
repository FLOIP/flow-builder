import Vue from 'vue'
import {toPath} from 'lodash'
import {IContext, findBlockOnActiveFlowWith, IBlock, IChoice, findFlowWith, IFlow, IBlockExit, findBlockExitWith} from '@floip/flow-runner'

export type ConfigFieldType = object | string | number | boolean | undefined | null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makePath(block: any, rawPath: string): [object, string] {
  const path = toPath(rawPath)

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
  value: ConfigFieldType,
): void {
  const base = findBlockOnActiveFlowWith(blockId, state as IContext)
  const [pointer, key] = makePath(base, path)
  Vue.set(pointer, key, value)
}

export function updateBlockExitValueByPath(
  state: unknown,
  blockId: IBlock['uuid'],
  exitId: IBlockExit['uuid'],
  path: string,
  value: ConfigFieldType,
): void {
  const block = findBlockOnActiveFlowWith(blockId, state as IContext)
  const base = findBlockExitWith(exitId, block)
  const [pointer, key] = makePath(base, path)
  Vue.set(pointer, key, value)
}

export function deleteChoiceValueByPath(
  state: unknown,
  choice: IChoice,
  path: string,
): void {
  const [pointer, key] = makePath(choice, path)
  Vue.delete(pointer, key)
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

export function updateFlowValueByPath(
  state: unknown,
  flowId: IFlow['uuid'],
  path: string,
  value: ConfigFieldType,
): void {
  const base = findFlowWith(flowId, state as IContext)
  const [pointer, key] = makePath(base, path)
  Vue.set(pointer, key, value)
}

export function removeFlowValueByPath(
  state: unknown,
  flowId: IFlow['uuid'],
  path: string,
): void {
  const base = findFlowWith(flowId, state as IContext)
  const [pointer, key] = makePath(base, path)

  Vue.delete(pointer, key)
}
