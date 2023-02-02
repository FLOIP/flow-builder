import {IStack, Snapshot} from '@/store/undo/IStack'

export default class SimpleStack<T> implements IStack<T> {
  private stack: Snapshot<T>[] = []

  push({value, name}: Snapshot<T>): void {
    this.stack.push({value, name})
  }

  pop(): Snapshot<T> | undefined {
    return this.stack.pop()
  }

  clear(): void {
    this.stack = []
  }

  isEmpty(): boolean {
    return this.stack.length === 0
  }

  tooltip(): string | undefined {
    if (this.isEmpty()) {
      return undefined
    } else {
      return this.stack[this.stack.length - 1].name
    }
  }
}
