import BlockCode from 'trees/components/BlockCode'
import BlockExitBlockButton from 'trees/components/block-editors/BlockExitBlockButton'
import lang from 'lib/filters/lang'

/**
 * Contains code needed by all blocks.
 */
export default {
  components: {
    BlockCode,
    BlockExitBlockButton,
  },
  
  mixins: [lang],
}