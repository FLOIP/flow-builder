export type NotNullOrUndefined = object | string | number | boolean

export function ensureObject(obj: unknown): NotNullOrUndefined {
  return obj !== null && obj !== undefined ? obj as NotNullOrUndefined : {}
}

export function isObjectOrUndefined(obj: unknown): boolean {
  return obj === undefined || typeof obj === 'object'
}
