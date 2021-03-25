const proxy = (name, args) => (global.Lang ? global.Lang[name].apply(global.Lang, args) : args[0])
const createProxy = (name) => function () {
  return proxy(name, arguments)
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
