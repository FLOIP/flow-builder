const proxy = (name, args) => (global.Lang
  ? global.Lang[name].apply(global.Lang, args)
  : args[0])
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
  },
}
