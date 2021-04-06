const proxy = (name, args) => (global.Lang ? global.Lang[name](...args) : args[0])
// eslint-disable-next-line func-names
const createProxy = (name) => function (...args) {
  return proxy(name, args)
}

export default {
  filters: {
    trans: createProxy('trans'),
    choice: createProxy('choice'),
  },
  methods: {
    trans(translation) {
      return global.Lang.trans(translation)
    },
    // `transIf(condition, ...)` should only be used when we encounter an issue with `:disabled="!condition"` approach
    // eg: for v-b-tooltip, we may need to remove completely the tooltip on block view mode
    transIf(condition, translation) {
      if (condition) {
        return this.trans(translation)
      }
      return ''
    },
  },
}
