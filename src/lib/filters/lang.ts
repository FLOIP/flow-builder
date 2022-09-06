import { Vue } from 'vue-class-component'
// import LangJs from 'lang.js'

type globalType = typeof global & {
  Lang: any,
}
const thisGlobal: globalType = global as globalType

const proxy = (name: string, args: any) => (thisGlobal.Lang ? thisGlobal.Lang[name].apply(thisGlobal.Lang, args) : args[0])
// const createProxy = (name: string) => function () {
//   return proxy(name, arguments)
// }

// // For vue-class based components
// @Options({
//   filters: {
//     trans: createProxy('trans'),
//     choice: createProxy('choice'),
//   },
// })

interface StringReplacements {
  [key: string]: string,
}

export const trans = (translation: string, replacements?: StringReplacements): string =>
  thisGlobal.Lang.trans(translation, replacements)

export const choice = (key: string, number?: number, replacements?: StringReplacements, locale?: string): string =>
  thisGlobal.Lang.choice(key, number, replacements, locale)  
// global.langJs.choice(key, number, {...replacements}, locale)

export default {
  methods: {
    trans(translation: string, replacements?: StringReplacements):string {
      return trans(translation, replacements)
    },
    choice(key: string, number?: number, replacements?: StringReplacements, locale?: string): string {
      return choice(key, number, replacements, locale)
    }
  },
}

export class Lang extends Vue {
  trans(translation: string, interpolations?: StringReplacements): string {
    return trans(translation, interpolations)
  }
  transIf(condition: boolean, translation: string) {
    if (condition) {
      return this.trans(translation)
    }
    return ''
  }
}
