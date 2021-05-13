import lang from 'lib/filters/lang'
import lodash from 'lodash'
import {mapGetters} from 'vuex'

/**
 * Mixin to be used by config components within a block's sidebar. 
 * Contains common code needed in these components
 */
export default {
  mixins: [lang],
  
  computed: {
    ...mapGetters(['selectedBlock']),
    
    jsKey() {
      return lodash.get(this.selectedBlock, 'jsKey')
    },

  }
}