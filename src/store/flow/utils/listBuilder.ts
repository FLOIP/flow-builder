import {get, find, without} from 'lodash'

export const allItemsHaveValue = (list: object[], key: string): boolean => list.every((item: object) => !!get(item, key))

export const someItemsHaveValue = (list: object[], key: string): boolean => list.some((item: object) => !!get(item, key))

export const twoItemsBlank = (list: object[], key: string): boolean => {
  let blankNumber = 0
  return list.some((item: object) => {
    if (!get(item, key)) {
      blankNumber += 1
    }
    return blankNumber > 1
  })
}

export const popFirstEmptyItem = <T> (list: T[], key: string): T[] => {
  const exitToRemove = find(list, (item: T) => !get(item, key))
  if (exitToRemove) {
    list = without(list, exitToRemove)
  }
  return list
}
