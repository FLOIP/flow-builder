export interface Stack<T> {
  push({snapshot, name}: NamedSnapshot<T>): void,
  pop(): NamedSnapshot<T> | undefined,
  tooltip(): string | undefined,
  isEmpty(): boolean,
  clear(): void,
}

/** how we push it into the stack */
export type NamedSnapshot<T> = {
  /** state snapshot */
  snapshot: T,

  /** name of the user's action, for undo/redo button tooltip */
  name: string,
}
