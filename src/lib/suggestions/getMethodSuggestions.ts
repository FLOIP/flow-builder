/* eslint-disable import/prefer-default-export */

import {MethodNodeEvaluatorFactory} from '@floip/expression-evaluator/dist/Evaluator/NodeEvaluator/MethodNodeEvaluator/Factory'
import {ISuggestion} from '../types'

function getEvaluatorMethods(): Map<string, Function[]> {
  const methods = new Map()

  /* eslint-disable no-restricted-syntax */
  for (const handler of MethodNodeEvaluatorFactory.defaultHandlers()) {
    for (const method of handler.handles()) {
      const trigger = method.substring(0, 2)
      const upperTrigger = trigger.toUpperCase()
      const upperMethod = method.toUpperCase()
      if (methods.has(trigger)) {
        methods.set(trigger, [...methods.get(trigger), method])
        methods.set(upperTrigger, [...methods.get(upperTrigger), upperMethod])
      } else {
        methods.set(trigger, [method])
        methods.set(upperTrigger, [upperMethod])
      }
    }
  }
  /* eslint-enable no-restricted-syntax */
  return methods
}

export function getMethodSuggestions(): ISuggestion[] {
  return Array.from(getEvaluatorMethods().entries()).map(([trigger, methods]) => ({
    trigger,
    values: methods.map((i) => ({
      value: `${i}()`,
      focusText: [-1, -1],
    })),
  }))
}
