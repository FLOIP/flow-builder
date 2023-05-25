/* eslint-disable import/prefer-default-export, @typescript-eslint/no-explicit-any */
export function getChangedKeys(a: object, b: object): string[] {
  const changedKeys: string[] = []

  Object.keys({...a, ...b})
    .forEach((key) => {
      const aVal = (a as Record<string, unknown>)[key]
      const bVal = (b as Record<string, unknown>)[key]

      if (typeof aVal === 'object' && typeof bVal === 'object' && aVal !== null && bVal !== null) {
        changedKeys.push(...getChangedKeys(aVal, bVal).map((k) => `${key}.${k}`))
      } else if (aVal !== bVal) {
        changedKeys.push(key)
      }
    })

  return changedKeys
}
