import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      blocks: state => state.trees.tree.blocks,
    }),

    openBlocks() {
      return this.blocks.filter(b => b.type === 'OpenQuestionBlock')
    },

    numericBlocks() {
      return this.blocks.filter(b => b.type === 'NumericQuestionBlock')
    },

    inputBlocks() {
      return [
        ...this.openBlocks,
        ...this.numericBlocks
      ]
    },
  }
}