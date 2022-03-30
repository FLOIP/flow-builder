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

<script>
import AutoSuggest from '@avcs/autosuggest'
import '@avcs/autosuggest/dropdown.css'
import {mapGetters} from 'vuex'
import {MethodNodeEvaluatorFactory} from '@floip/expression-evaluator/dist/Evaluator/NodeEvaluator/MethodNodeEvaluator/Factory'
import Lang from '@/lib/filters/lang'

const defaultContactPropertyFields = [
  'phone',
]

const defaultDateFields = [
  'now',
  'yesterday',
  'today',
  'tomorrow',
]

export const ExpressionInput = {
  mixins: [Lang],

  props: {
    label: {
      type: [String, Number],
      required: true,
    },
    labelClass: {
      type: String,
      default: 'text-primary',
      required: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    currentExpression: {
      type: String,
      required: false,
    },
    expressionIdentifier: {
      type: [String, Number],
      default: null,
    },
    rows: {
      type: Number,
      required: false,
      default: 1,
    },
    validState: {
      type: Boolean,
      default: null,
      required: false,
    },
    prependText: {
      type: String,
      default: '',
      required: false,
    },
  },

  data() {
    return {
      suggest: {},
    }
  },

  computed: {
    ...mapGetters(['subscriberPropertyFields']),
    ...mapGetters('flow', ['activeFlow']),

    isInvalid() {
      return this.validState === false
    },
    expression: {
      get() {
        return this.currentExpression
      },
      set(value) {
        if (this.expressionIdentifier !== null) {
          value = {
            identifier: this.expressionIdentifier,
            value,
          }
        }
        this.$emit('commitExpressionChange', value)
      },
    },
    expressionContext() {
      const contactFields = this.subscriberPropertyFields.map((prop) => prop.name).concat(defaultContactPropertyFields)
      const blocks = this.activeFlow.blocks.flatMap((b) => [b.name, b.uuid])
      return {
        contact: contactFields,
        flow: blocks,
        date: defaultDateFields,
      }
    },
    topLevelSuggestions() {
      return {
        trigger: '@',
        values: [
          {
            value: '@()',
            focusText: [-1, -1],
          },
          ...Array.from(Object.entries(this.expressionContext)).map((item) => `@${item[0]}`),
        ],
      }
    },
    contextSuggestions() {
      return Array.from(Object.entries(this.expressionContext)).map((item) => {
        const name = item[0]
        return {
          trigger: `${name}.`,
          values: item[1].map((val) => `${name}.${val}`),
        }
      })
    },
    methodSuggestions() {
      return Array.from(this.evaluatorMethods.entries()).map((item) => ({
        trigger: item[0],
        values: item[1].map((i) => ({
          value: `${i}()`,
          focusText: [-1, -1],
        })),
      }))
    },
    evaluatorMethods() {
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
    },
    suggestions() {
      return [
        ...this.contextSuggestions,
        ...this.methodSuggestions,
        this.topLevelSuggestions,
      ]
    },
  },

  mounted() {
    const input = this.$refs.input
    this.suggest = new AutoSuggest({
      caseSensitive: false,
      suggestions: this.suggestions,
      onChange: () => input.dispatchEvent(new Event('input')),
    }, input)
  },
}
export default ExpressionInput
</script>
