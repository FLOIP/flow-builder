import * as jsondiffpatch from 'jsondiffpatch'
import {IStack, Snapshot, SnapshotDiff} from '@/store/undo/IStack'

/**
 * An IStack implementation that saves memory by:
 * - storing the first snapshot as is
 * - storing the subsequent snapshots as diffs
 */
export default class DiffBasedStack<S> implements IStack<S> {
  private initialSnapshot?: Snapshot<S> = undefined
  private diffStack: SnapshotDiff[] = []

  push({value, name}: Snapshot<S>): void {
    if (this.initialSnapshot === undefined) {
      this.initialSnapshot = {value, name}
    } else {
      const newDiff: SnapshotDiff = {
        value: jsondiffpatch.diff(this.last?.value, value),
        name,
      }
      this.diffStack.push(newDiff)
    }
  }

  pop(): Snapshot<S> | undefined {
    if (this.diffStack.length === 0) {
      const snapshot = this.initialSnapshot
      this.initialSnapshot = undefined
      return snapshot
    } else {
      // calc 'last' using diffStack before popping
      const last = this.last

      if (this.diffStack.length > 0) {
        this.diffStack.pop()
      } else {
        this.initialSnapshot = undefined
      }

      return last
    }
  }

  clear(): void {
    this.diffStack = []
    this.initialSnapshot = undefined
  }

  isEmpty(): boolean {
    return this.length === 0
  }

  tooltip(): string | undefined {
    if (this.initialSnapshot === undefined) {
      return undefined
    } else if (this.diffStack.length === 0) {
      return this.initialSnapshot.name
    } else {
      return this.diffStack[this.diffStack.length - 1].name
    }
  }

  private get length(): number {
    if (this.initialSnapshot === undefined) {
      return 0
    } else {
      return this.diffStack.length + 1
    }
  }

  private get last(): Snapshot<S> | undefined {
    if (this.length === 0) {
      return undefined
    } else if (this.length === 1) {
      return this.initialSnapshot!
    } else {
      const name = this.diffStack[this.diffStack.length - 1].name
      const value = this.diffStack.reduce(
        (acc, {value}) => (value === undefined ? acc : jsondiffpatch.patch(acc, value)),
        this.initialSnapshot!.value,
      )
      return {name, value}
    }
  }
}
