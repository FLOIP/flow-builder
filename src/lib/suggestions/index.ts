import {IBlock} from '@floip/flow-runner'
import {IExpressionContext, ISuggestion} from '../types'

import {getBlockSuggestions} from './getBlockSuggestions'
import {getContactSuggestions} from './getContactSuggestions'
import {getFlowIdentifiersSuggestions} from './getFlowIdentifiersSuggestions'
import {getMethodSuggestions} from './getMethodSuggestions'
import {getResultsSuggestions} from './getResultsSuggestions'
import {getRunSuggestions} from './getRunSuggestions'

import {merge} from './suggestionHelpers'

export interface ISuggestionsContext {
  blocks: IBlock[],
}

export function getSuggestions(context: IExpressionContext): ISuggestion[] {
  return merge([
    {
      trigger: '@',
      values: [
        {
          value: '@()',
          focusText: [-1, -1],
        },
      ],
    },
    ...getBlockSuggestions(),
    ...getContactSuggestions(context),
    ...getFlowIdentifiersSuggestions(context),
    ...getMethodSuggestions(),
    ...getRunSuggestions(context),
    ...getResultsSuggestions(context),
  ])
}
