<template>
  <textarea
    ref="input"
    :value="value"
    :rows="rows"
    :placeholder="placeholder"
    class="form-control"
    v-bind="attrs"
    @input="emitValue($event.target.value)"
    v-on="listeners"
  />
</template>

<script>
import AutoSuggest from '@avcs/autosuggest'
import '@avcs/autosuggest/dropdown.css'
import {mapState} from 'vuex'
import {debounce} from 'lodash'
import { MethodNodeEvaluatorFactory } from '@floip/expression-evaluator/dist/Evaluator/NodeEvaluator/MethodNodeEvaluator/Factory'
import Lang from 'lib/filters/lang';

const defaultContactPropertyFields = [
  'phone',
]

const defaultDateFields = [
  'now',
  'yesterday',
  'today',
  'tomorrow',
]

export default {
  mixins: [Lang],

  props: {
    value: {
      type: String,
      default: '',
    },
    shortSyntax: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      suggest: {},
      didScroll: false,
      didMount: false,
      debounceScroll: () => undefined,
    }
  },

  computed: {
    ...mapState({
      subscriberPropertyFields: state => state.trees.ui.subscriberPropertyFields,
      blocks: state => state.trees.tree.blocks
        .flatMap(b => [b.jsKey, b.customData.label])
        .filter(f => f !== '')
        .map(f => f.toLowerCase().replace(/\s/g, '_')),
    }),
    expressionContext() {
      return {
        contact: this.subscriberPropertyFields.map(prop => prop.name).concat(defaultContactPropertyFields),
        flow: this.blocks,
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
          ...Array.from(Object.entries(this.expressionContext)).map(item => `@${item[0]}`),
        ],
      }
    },
    contextSuggestions() {
      return Array.from(Object.entries(this.expressionContext)).map((item) => {
        const name = item[0]
        return {
          trigger: `${name}.`,
          values: item[1].map(val => `${name}.${val}`),
        }
      })
    },
    methodSuggestions() {
      return Array.from(this.evaluatorMethods.entries()).map(item => ({
        trigger: item[0],
        values: item[1].map(i => ({
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
      const suggestions = [
        ...this.contextSuggestions,
        ...this.methodSuggestions,
      ]
      if (this.shortSyntax === true) {
        return suggestions
      } else {
        return [
          ...suggestions,
          this.topLevelSuggestions,
        ]
      }
    },
    // we can use the below methods to pass listeners and attributes
    // to our underlying text area... that way this component
    // can be used exactly the same
    listeners() {
      const {input, ...listeners} = this.$listeners
      return listeners
    },
    rows() {
      return this.$attrs.rows || 2
    },
    attrs() {
      const {rows, ...attrs} = this.$attrs
      return attrs
    },
  },

  mounted() {
    this.didMount = true
    const input = this.$refs.input
    this.suggest = new AutoSuggest({
      caseSensitive: false,
      suggestions: this.suggestions,
      onChange: () => input.dispatchEvent(new Event('input')),
    }, input)

    this.debounceScroll = debounce(() => { this.didScroll = true }, 100)

    window.addEventListener('scroll', this.debounceScroll)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.debounceScroll)
  },

  methods: {
    emitValue(value) {
      this.$emit('input', value)
      this.fixDropdownCoords()
    },
    // since this element is used on affixed content, we need to
    // reset the coordinates of the dropdown when we scroll or other events
    // occur
    fixDropdownCoords() {
      if (this.didScroll || this.didMount) {
        const coords = this.$refs.input.getBoundingClientRect()
        document.querySelectorAll('.dropdown.open').forEach((el) => {
          el.style.left = `${coords.left}px`
          el.style.top = `${coords.top}px`
          el.style.position = 'fixed'
          el.style.zIndex = '9999'
        })
      }
      this.didScroll = false
      this.didMount = false
    },
  },

}
</script>

<style scoped>

</style>
