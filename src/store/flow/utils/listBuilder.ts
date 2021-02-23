import { get, find, without } from 'lodash';

export const allItemsHaveValue = function (list: object[], key: string): boolean {
  return list.every((item: object) => !!get(item, key));
};

export const someItemsHaveValue = function (list: object[], key: string): boolean {
  return list.some((item: object) => !!get(item, key));
};

export const twoItemsBlank = function (list: object[], key: string): boolean {
  let blankNumber = 0;

  return list.some((item: object) => {
    if (!get(item, key)) {
      blankNumber += 1;
    }

    if (blankNumber > 1) {
      return true;
    }

    return false;
  });
};

export const popFirstEmptyItem = function <T> (list: T[], key: string): T[] {
  const exitToRemove = find(list, (item: T) => !get(item, key));
  if (exitToRemove) {
    list = without(list, exitToRemove);
  }
  return list;
};
