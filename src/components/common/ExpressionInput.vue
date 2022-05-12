<template>
  <div class="expression-input form-group">
    <label
      v-if="label"
      :class="labelClass">{{ label }}</label>

    <div class="input-group">
      <div
        v-if="prependText"
        class="input-group-prepend">
        <span class="input-group-text">{{ prependText }}</span>
      </div>

      <textarea
        ref="input"
        v-model="expression"
        :class="['form-control', {'is-invalid': isInvalid}]"
        :rows="rows"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import AutoSuggest from '@avcs/autosuggest'
import '@avcs/autosuggest/dropdown.css'
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import {Getter, namespace} from 'vuex-class'
import {MethodNodeEvaluatorFactory} from '@floip/expression-evaluator/dist/Evaluator/NodeEvaluator/MethodNodeEvaluator/Factory'
import Lang from '@/lib/filters/lang'
import {IBlock, IFlow} from '@floip/flow-runner'
import {IExpressionContext, ISubscriberPropertyField, ISuggestion, ISuggestionValue} from '@/lib/types'

const defaultContactPropertyFields = [
  'phone',
]

const defaultDateFields = [
  'now',
  'yesterday',
  'today',
  'tomorrow',
]

const flowNamespace = namespace('flow')

@Component({})
export class ExpressionInput extends mixins(Lang) {
  @Prop({type: [String, Number], required: true}) readonly label!: string | number
  @Prop({type: String, default: 'text-primary'}) readonly labelClass!: string
  @Prop({type: String, default: ''}) readonly placeholder!: string
  @Prop({type: String}) readonly currentExpression?: string
  @Prop({type: [String, Number], default: null}) readonly expressionIdentifier!: string | number | null
  @Prop({type: Number, default: 1}) readonly rows!: number
  @Prop({type: Boolean, default: null}) readonly validState!: boolean|null
  @Prop({type: String, default: ''}) readonly prependText!: string

  suggest = {}

  get isInvalid(): boolean {
    return this.validState === false
  }

  get expression(): string | undefined {
    return this.currentExpression
  }

  set expression(value: string | undefined) {
    if (value === undefined) {
      return
    }
    if (this.expressionIdentifier === null) {
      this.$emit('commitExpressionChange', value)
    } else {
      this.$emit('commitExpressionChange', {
        identifier: this.expressionIdentifier,
        value,
      })
    }
  }

  get expressionContext(): IExpressionContext {
    const contactFields = this.subscriberPropertyFields.map((prop) => prop.name).concat(defaultContactPropertyFields)
    const blocks = this.activeFlow?.blocks.flatMap((b: IBlock) => [b.name, b.uuid])
    return {
      contact: contactFields,
      flow: blocks,
      date: defaultDateFields,
    }
  }

  get topLevelSuggestions(): ISuggestion[] {
    return [{
      trigger: '@',
      values: [
        {
          value: '@()',
          focusText: [-1, -1],
        },
        ...Array.from(Object.entries(this.expressionContext)).map((item) => `@${item[0]}`),
      ],
    }]
  }

  get contextSuggestions(): ISuggestion[] {
    return Array.from(Object.entries(this.expressionContext)).map((item) => {
      const name = item[0]
      return {
        trigger: `${name}.`,
        values: item[1].map((val: ISuggestionValue) => `${name}.${val}`),
      }
    })
  }

  get methodSuggestions(): ISuggestion[] {
    return Array.from(this.evaluatorMethods.entries()).map((item) => ({
      trigger: item[0],
      values: item[1].map((i) => ({
        value: `${i}()`,
        focusText: [-1, -1],
      })),
    }))
  }

  get evaluatorMethods(): Map<string, Function[]> {
    const methods = new Map()

    /* eslint-disable no-restricted-syntax */
    for (const handler of MethodNodeEvaluatorFactory.defaultHandlers()) {
      for (const method of handler.handles()) {
        const trigger = method.substr(0, 2)
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

  get suggestions(): ISuggestion[] {
    return [
      ...this.contextSuggestions,
      ...this.methodSuggestions,
      ...this.topLevelSuggestions,
    ]
  }

  mounted(): void {
    const input = this.$refs.input
    this.suggest = new AutoSuggest({
      caseSensitive: false,
      suggestions: this.suggestions,
      onChange: () => (input as HTMLInputElement)!.dispatchEvent(new Event('input')),
    }, input)
  }

  @flowNamespace.Getter activeFlow?: IFlow
  @Getter subscriberPropertyFields!: ISubscriberPropertyField[]
}

export default ExpressionInput
</script>
