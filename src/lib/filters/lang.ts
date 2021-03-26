import Vue from 'vue'
import Component from 'vue-class-component'

type globalType = typeof global & {
  Lang: any;
}
const thisGlobal: globalType = global as globalType

const proxy = (name: string, args: any) => (thisGlobal.Lang ? thisGlobal.Lang[name].apply(thisGlobal.Lang, args) : args[0])
const createProxy = (name: string) => function () {
  return proxy(name, arguments)
}

export const trans = createProxy('trans')
export const choice = createProxy('choice')

// For vue-class based components
@Component({
  filters: {
    trans,
    choice,
  },
})
export class Lang extends Vue {
  trans(translation: string) {
    return thisGlobal.Lang.trans(translation)
  }

  /**
  * `transIf(condition, ...)` should only be used when we encounter an issue with `:disabled="!condition"` approach
  * eg: for v-b-tooltip, we may need to remove completely the tooltip on block view mode
  */
  transIf(condition: boolean, translation: string) {
    if (condition) {
      return this.trans(translation)
    }
    return ''
  }
}

// For non vue-class based components
const lang = Lang
export default lang
