<script>
import {mapActions} from 'vuex'
import {IChoice, ISelectOneResponseBlock} from '@floip/flow-runner'
import {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'

export default {
  props: {
    block: {
      type: ISelectOneResponseBlock,
      required: true,
    },
    choice: {
      type: IChoice,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*'],
      blockResponseExpression: 'block.response',
    }
  },
  computed: {
    currentExpressionWithoutSpaces() {
      return this.currentExpression !== undefined ? this.currentExpression.replace(/\s/g, '') : undefined
    },
    currentExpression() {
      return this.choice.ivr_test?.test_expression
    },
    /**
     * Test if:
     * - the expression starts with `block.response='` (floip schema) or `@block.response='` (from partner's flow)
     * - and if the estimated key_press is part of the options' elements
     */
    isKeyPressIdentifiable() {
      if (this.currentExpressionWithoutSpaces?.startsWith(`${this.blockResponseExpression}='`) === true
        || this.currentExpressionWithoutSpaces?.startsWith(`@${this.blockResponseExpression}='`) === true) {
        const estimatedKeyPress = this.currentExpressionWithoutSpaces.split('\'')?.[1]
        if (this.options.includes(String(estimatedKeyPress)) === true) {
          return true
        }
      }

      return false
    },
    estimatedKeyPress() {
      return this.currentExpressionWithoutSpaces?.split('\'')?.[1]
    },
    keypress: {
      get() {
        if (this.isKeyPressIdentifiable === true) {
          return String(this.estimatedKeyPress)
        }

        return '1'
      },
      set(value) {
        this.updateCurrentExpression(`${this.blockResponseExpression} = '${value}'`)
      },
    },
  },

  methods: {
    ...mapActions(`flow/${BLOCK_TYPE}`, ['block_setChoiceIvrExpressionOnIndex']),
    updateCurrentExpression(value) {
      this.block_setChoiceIvrExpressionOnIndex({
        blockId: this.block.uuid,
        index: this.index,
        value,
      })
    },
  },
}
</script>
