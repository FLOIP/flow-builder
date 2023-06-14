/* eslint-disable import/prefer-default-export */
import {isObjectOrUndefined, ensureObject, NotNullOrUndefined} from '@/utils/type-utils'

export function getChangedKeys(a: NotNullOrUndefined, b: NotNullOrUndefined): string[] {
  const changedKeys: string[] = []

  Object.keys({
      ...a as object,
      ...b as object,
  })
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
