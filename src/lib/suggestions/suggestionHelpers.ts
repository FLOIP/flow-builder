import {uniq} from 'lodash'
import {IExpressionContext, ISuggestion, ISuggestionValue} from '../types'

export type SuggestionValueOrString = ISuggestionValue | string

function validateValuePrefixes(trigger: string, values: SuggestionValueOrString[]): void {
  if (trigger.startsWith('@')) {
    values.forEach(value => {
      const stringValue = typeof value === 'string' ? value : value.value

      console.assert(
        stringValue.startsWith('@'),
        `${stringValue} for trigger ${trigger} does not start with @`,
      )
    })
  }
}

export function merge(suggestions: ISuggestion[]): ISuggestion[] {
  const map = new Map<string, SuggestionValueOrString[]>()

  for (let i = 0; i < suggestions.length; i += 1) {
    const {trigger, values} = suggestions[i]
    validateValuePrefixes(trigger, values)

    map.set(trigger, uniq([
      ...map.get(trigger) ?? [],
      ...values,
    ]))
  }

  return Array.from(map.entries()).map(([trigger, values]) => ({
    trigger,
    values,
  }))
}

export function getBlockNames(context: IExpressionContext): string[] {
  return context.blocks
    .map(block => block.name)
    .filter(Boolean) ?? []
}
