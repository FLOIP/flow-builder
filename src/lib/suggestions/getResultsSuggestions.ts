/* eslint-disable import/prefer-default-export */

import {IExpressionContext, ISuggestion} from '../types'
import {getBlockNames} from './suggestionHelpers'

export function getResultSuggestionsForBlockNames(blockNames: string[], prefix: string) : ISuggestion[] {
  return blockNames.flatMap(name => ([
    {
      trigger: `${prefix}.`,
      values: blockNames.map(name => `${prefix}.${name}`),
    },
    {
      trigger: `${prefix}.${name}.`,
      values: [
        `${prefix}.${name}.entered_at`,
        `${prefix}.${name}.exited_at`,
        `${prefix}.${name}.response`,
        `${prefix}.${name}.value`,
        `${prefix}.${name}.block`,
        `${prefix}.${name}.exit`,
      ],
    },
    {
      trigger: `${prefix}.${name}.block.`,
      values: [
        `${prefix}.${name}.block.id`,
        `${prefix}.${name}.block.name`,
        `${prefix}.${name}.block.label`,
      ],
    },
    {
      trigger: `${prefix}.${name}.exit.`,
      values: [
        `${prefix}.${name}.exit.name`,
        `${prefix}.${name}.exit.id`,
      ],
    },
  ])) as ISuggestion[]
}

export function getResultsSuggestions(context: IExpressionContext): ISuggestion[] {
  return [
    {
      trigger: '@',
      values: [
        '@results',
      ],
    },
    ...getResultSuggestionsForBlockNames(getBlockNames(context), '@results'),
  ]
}
