import {Delta} from 'jsondiffpatch'

export interface IStack<S> {
  push({name, value}: Snapshot<S>): void,
  pop(): Snapshot<S> | undefined,
  tooltip(): string | undefined,
  isEmpty(): boolean,
  clear(): void,
}

/** how we push it into the stack */
export type Snapshot<S> = {
  /** clone of the state */
  value: S,

  /** name of the user's action, for undo/redo button tooltip */
  name: string,
}

/** how we store it under the hood (in diff-based stacks) */
export type SnapshotDiff = {
  /** diff between two states */
  value: Delta | undefined,

  /** name of the user's action, for undo/redo button tooltip */
  name: string,
}
