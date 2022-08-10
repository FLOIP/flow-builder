<script>
import {mapActions} from 'vuex'
import {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'
import {BLOCK_RESPONSE_EXPRESSION} from '@/store/flow/block/choice'

export default {
  props: {
    block: {
      required: true,
    },
    choice: {
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
      BLOCK_RESPONSE_EXPRESSION,
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
      if (
        this.currentExpressionWithoutSpaces.endsWith('\'') === true
        && (this.currentExpressionWithoutSpaces?.startsWith(`${BLOCK_RESPONSE_EXPRESSION}='`) === true
        || this.currentExpressionWithoutSpaces?.startsWith(`@${BLOCK_RESPONSE_EXPRESSION}='`) === true)
      ) {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        if (this.options.includes(this.estimatedKeyPress) === true) {
          return true
        }
      }

      return false
    },
    estimatedKeyPress() {
      return String(this.currentExpressionWithoutSpaces?.split('\'')?.[1])
    },
    keypress: {
      get() {
        if (this.isKeyPressIdentifiable === true) {
          return this.estimatedKeyPress
        }

        // Provide an incremental value based on existing choices
        // For now, just a simple incremental logic without considering the choice's ivr_test value
        const nextIndex = Number(this.index) + 1
        return nextIndex <= 9 ? String(nextIndex) : '*'
      },
      set(value) {
        this.updateCurrentExpression(`${BLOCK_RESPONSE_EXPRESSION} = '${value}'`)
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
