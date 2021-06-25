import {find, get, without} from 'lodash'

export function allItemsHaveValue(list: object[], key: string): boolean {
  return list.every((item: object) => !!get(item, key))
}

export function someItemsHaveValue(list: object[], key: string): boolean {
  return list.some((item: object) => !!get(item, key))
}

export function twoItemsBlank(list: object[], key: string): boolean {
  let blankNumber = 0

  return list.some((item: object) => {
    if (!get(item, key)) {
      blankNumber += 1
    }

    return blankNumber > 1
  })
}

export function popFirstEmptyItem<T>(list: T[], key: string): T[] {
  const exitToRemove = find(list, (item: T) => !get(item, key))
  if (exitToRemove) {
    list = without(list, exitToRemove)
  }
  return list
}
