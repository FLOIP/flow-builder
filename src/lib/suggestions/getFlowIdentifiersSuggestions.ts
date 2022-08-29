/* eslint-disable import/prefer-default-export */

import {IBlock} from '@floip/flow-runner'
import {IExpressionContext, ISuggestion} from '../types'

export function getFlowIdentifiersSuggestions(context: IExpressionContext): ISuggestion[] {
  const blockIdentifiers = new Set(
    context.blocks
      .map((block: IBlock) => ([
        `@flow.${block.uuid}`,
        `@flow.${block.name}`,
      ]))
      .flat(),
  )

  return [
    {
      trigger: '@',
      values: [
        '@flow',
      ],
    },
    {
      trigger: '@flow.',
      values: [
        ...blockIdentifiers,
      ],
    },
  ]
}
