/* eslint-disable import/prefer-default-export */

import {ISuggestion} from '../types'

export function getBlockSuggestions(): ISuggestion[] {
  return [
    {
      trigger: '@',
      values: [
        '@block',
      ],
    },
    {
      trigger: '@block.',
      values: [
        '@block.entered_at',
        '@block.response',
        '@block.value',
      ],
    },
  ]
}
