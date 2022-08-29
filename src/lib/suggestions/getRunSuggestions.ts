/* eslint-disable import/prefer-default-export */

import {IExpressionContext, ISuggestion} from '../types'

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
  const blockNames = context.blocks
    .map(block => block.name)
    .filter(Boolean) ?? []

  return [
    {
      trigger: '@',
      values: [
        '@run',
      ],
    },
    ...getRunSuggestionsWithPrefix('@run'),
    {
      trigger: '@run.results.',
      values: blockNames.map(name => `@run.results.${name}`),
    },
    ...blockNames.flatMap(name => ([
      {
        trigger: `@run.results.${name}.`,
        values: [
          `@run.results.${name}.entered_at`,
          `@run.results.${name}.exited_at`,
          `@run.results.${name}.response`,
          `@run.results.${name}.value`,
          `@run.results.${name}.block`,
          `@run.results.${name}.exit`,
        ],
      },
      {
        trigger: `@run.results.${name}.block.`,
        values: [
          `@run.results.${name}.block.id`,
          `@run.results.${name}.block.name`,
          `@run.results.${name}.block.label`,
        ],
      },
      {
        trigger: `@run.results.${name}.exit.`,
        values: [
          `@run.results.${name}.exit.name`,
          `@run.results.${name}.exit.id`,
        ],
      },
    ])) as ISuggestion[],
    ...getRunSuggestionsWithPrefix('@run.parent'),
    ...getRunSuggestionsWithPrefix('@run.child'),
  ]
}
