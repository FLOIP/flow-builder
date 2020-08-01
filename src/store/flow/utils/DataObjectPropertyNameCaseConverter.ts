// TODO:
//  move this file into @floip
//  override convertKeysToCamelCase under '@floip/flow-runner/src/flow-spec/DataObjectPopertyNameCamelCaseConverter'
//  and update convertKeysToCamelCase usage in @floip (tests, etc) to convertKeysCase
import {camelCase, snakeCase, includes, isArray, isObject, reduce} from 'lodash'

export const EXCLUDED_DATA_HIERARCHIES_BY_KEY = ['choices', 'platformMetadata', 'platform_metadata']

export default function convertKeysCase(x: any, caseType: string = 'CAMEL', exclusions = EXCLUDED_DATA_HIERARCHIES_BY_KEY): any {
  if (isArray(x)) {
    return x.map(_ => convertKeysCase(_, caseType, exclusions))
  }

  if (!isObject(x)) {
    return x
  }

  return reduce(x, (memo: any, value: any, key: string) => {
    let currentKey = caseType === 'CAMEL' ? camelCase(key) : snakeCase(key)
    memo[includes(exclusions, key) ? key : currentKey] =
        convertKeysCase(value, caseType, exclusions)

    return memo
  }, {})
}
