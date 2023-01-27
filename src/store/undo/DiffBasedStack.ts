import * as jsondiffpatch from 'jsondiffpatch'
import {Delta} from 'jsondiffpatch'
import {NamedSnapshot, Stack} from '@/store/undo/Stack'

/** how we actually store it in the stack */
export type NamedDiff = {
  /** diff between two state snapshots */
  diff: Delta | undefined,

  /** name of the user's action, for undo/redo button tooltip */
  name: string,
}

/**
 * A Stack implementation that stores the first snapshot as is, but only diffs for the subsequent snapshots.
 * The aim is to save memory.
 */
export class DiffBasedStack<T> implements Stack<T> {
  private initialNamedSnapshot?: NamedSnapshot<T> = undefined
  private diffStack: NamedDiff[] = []

  push({snapshot, name}: NamedSnapshot<T>): void {
    if (this.initialNamedSnapshot === undefined) {
      this.initialNamedSnapshot = {snapshot, name}
    } else {
      const newNamedDiff: NamedDiff = {
        diff: jsondiffpatch.diff(this.last?.snapshot, snapshot),
        name,
      }
      this.diffStack.push(newNamedDiff)
    }
    console.log('after push', JSON.stringify(this))
  }

  pop(): NamedSnapshot<T> | undefined {
    if (this.diffStack.length === 0) {
      const snapshot = this.initialNamedSnapshot
      this.initialNamedSnapshot = undefined
      return snapshot
    } else {
      // calc 'last' using diffStack before popping
      const last = this.last

      if (this.diffStack.length > 0) {
        this.diffStack.pop()
      } else {
        this.initialNamedSnapshot = undefined
      }

      return last
    }
  }

  clear(): void {
    this.diffStack = []
    this.initialNamedSnapshot = undefined
  }

  isEmpty(): boolean {
    return this.length === 0
  }

  tooltip(): string | undefined {
    if (this.initialNamedSnapshot === undefined) {
      return undefined
    } else if (this.diffStack.length === 0) {
      return this.initialNamedSnapshot.name
    } else {
      return this.diffStack[this.diffStack.length - 1].name
    }
  }

  private get length(): number {
    if (this.initialNamedSnapshot === undefined) {
      return 0
    } else {
      return this.diffStack.length + 1
    }
  }

  private get last(): NamedSnapshot<T> | undefined {
    if (this.diffStack.length === 0) {
      return this.initialNamedSnapshot
    } else {
      return this.diffStack.reduce(
        (acc, currentNamedDiff) => jsondiffpatch.patch(acc, currentNamedDiff),
        this.initialNamedSnapshot,
      )
    }
  }
}
