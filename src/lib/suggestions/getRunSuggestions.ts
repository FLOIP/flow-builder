/* eslint-disable import/prefer-default-export */

import {IExpressionContext, ISuggestion} from '../types'
import {getResultSuggestionsForBlockNames} from './getResultsSuggestions'
import {getBlockNames} from './suggestionHelpers'

function getRunSuggestionsWithPrefix(prefix: string): ISuggestion[] {
  return [
    {
      trigger: `${prefix}.`,
      values: [
        `${prefix}.language`,
        `${prefix}.localization`,
        `${prefix}.entered_at`,
        `${prefix}.exited_at`,
        `${prefix}.flow`,
        `${prefix}.mode`,
        `${prefix}.results`,
        `${prefix}.parent`,
        `${prefix}.child`,
      ],
    },
    {
      trigger: `${prefix}.language.`,
      values: [
        `${prefix}.language.id`,
        `${prefix}.language.label`,
        `${prefix}.language.variant`,
        `${prefix}.language.iso_639_3`,
      ],
    },
    {
      trigger: `${prefix}.flow.`,
      values: [
        `${prefix}.flow.id`,
        `${prefix}.flow.name`,
      ],
    },
  ]
}

export function getRunSuggestions(context: IExpressionContext): ISuggestion[] {
  const blockNames = getBlockNames(context)

  return [
    {
      trigger: '@',
      values: [
        '@run',
      ],
    },
    ...getRunSuggestionsWithPrefix('@run'),
    ...getResultSuggestionsForBlockNames(blockNames, '@run.results'),
    ...getRunSuggestionsWithPrefix('@run.parent'),
    ...getRunSuggestionsWithPrefix('@run.child'),
    {
      trigger: '@',
      values: [
        '@parent',
        '@child',
      ],
    },
    ...getRunSuggestionsWithPrefix('@parent'),
    ...getRunSuggestionsWithPrefix('@child'),
  ]
}
