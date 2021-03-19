const proxy = (name, args) => (global.Lang
  ? global.Lang[name].apply(global.Lang, args)
  : args[0])
const createProxy = (name) => function () {
  return proxy(name, arguments)
}

export const trans = createProxy('trans')
export const choice = createProxy('choice')

export default {
  filters: {
    trans,
    choice,
  },
  methods: {
    trans(translation) {
      return global.Lang.trans(translation)
    },
  },
}
