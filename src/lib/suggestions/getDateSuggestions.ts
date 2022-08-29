/* eslint-disable import/prefer-default-export */

import {ISuggestion} from '../types'

export function getDateSuggestions(): ISuggestion[] {
  return [
    {
      trigger: '@',
      values: [
        '@date',
      ],
    },
    {
      trigger: '@date.',
      values: [
        '@date.now',
        '@date.yesterday',
        '@date.today',
        '@date.tomorrow',
      ],
    },
  ]
}
