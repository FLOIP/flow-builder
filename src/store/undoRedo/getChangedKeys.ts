/* eslint-disable import/prefer-default-export, @typescript-eslint/no-explicit-any */
export function getChangedKeys(a: any, b: any): string[] {
  const changedKeys: string[] = []

  Object.keys({...a as object, ...b as object})
    .forEach((key) => {
      const aVal = (a as Record<string, any>)[key]
      const bVal = (b as Record<string, any>)[key]

      if (typeof aVal === 'object' && typeof bVal === 'object') {
        changedKeys.push(...getChangedKeys(aVal as object, bVal as object).map((k) => `${key}.${k}`))
      } else if (aVal !== bVal) {
        changedKeys.push(key)
      }
    })

  return changedKeys
}
