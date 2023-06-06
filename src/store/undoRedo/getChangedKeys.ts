/* eslint-disable import/prefer-default-export, @typescript-eslint/no-explicit-any */
export function getChangedKeys(a: object, b: object): string[] {
  const changedKeys: string[] = []

  Object.keys({...a, ...b})
    .forEach((key) => {
      const aVal = (a as Record<string, unknown>)[key]
      const bVal = (b as Record<string, unknown>)[key]

      if (isObjectOrUndefined(aVal) && isObjectOrUndefined(bVal)) {
        changedKeys.push(...getChangedKeys(
          ensureObject(aVal),
          ensureObject(bVal),
        ).map((k) => `${key}.${k}`))
      } else if (aVal !== bVal) {
        changedKeys.push(key)
      }
    })

  return changedKeys
}

function ensureObject(obj: any): object {
  return obj !== null && obj !== undefined ? obj : {}
}

function isObjectOrUndefined(obj: any): boolean {
  return obj === undefined || typeof obj === 'object'
}
