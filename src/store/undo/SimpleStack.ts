import {NamedSnapshot, Stack} from '@/store/undo/Stack'

export class SimpleStack<T> implements Stack<T> {
  private stack: NamedSnapshot<T>[] = []

  push({snapshot, name}: NamedSnapshot<T>): void {
    this.stack.push({snapshot, name})
  }

  pop(): NamedSnapshot<T> | undefined {
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
