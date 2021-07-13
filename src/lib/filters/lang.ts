import Vue from 'vue'
import {Component} from 'vue-property-decorator'

type globalType = typeof global & {
  Lang: any,
}
const thisGlobal: globalType = global as globalType

const proxy = (name: string, args: any) => (thisGlobal.Lang ? thisGlobal.Lang[name].apply(thisGlobal.Lang, args) : args[0])
const createProxy = (name: string) => function () {
  return proxy(name, arguments)
}

// For vue-class based components
@Component({
  filters: {
    trans: createProxy('trans'),
    choice: createProxy('choice'),
  },
})
class Lang extends Vue {
  trans(translation: string, interpolations?: object) {
    return thisGlobal.Lang.trans(translation, interpolations)
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

export default Lang

// For non vue-class based components
export const lang = Lang
