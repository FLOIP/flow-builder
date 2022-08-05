<template>
  <tr class="text-mapping-row">
    <td>
      {{ choice.name }}
    </td>
    <td>
      <template v-for="(textTest, i) in currentTextTestList">
        <validation-message
          #input-control="{ isValid }"
          :message-key="`block/${block.uuid}/config/choices/${index}/text_tests/${i}/test_expression`">
          <expression-input
            :current-expression="textExpression(i)"
            :label="''"
            :placeholder="trans('flow-builder.enter-expression')"
            :valid-state="isValid"
            class="mb-1"
            @commitExpressionChange="updateCurrentExpression(i, $event)" />
        </validation-message>
      </template>
    </td>
  </tr>
</template>

<script>
import Lang from '@/lib/filters/lang'
import {mapActions, mapGetters} from 'vuex'
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
  mixins: [Lang],

  created() {
    // We already provide a default value for text_tests[0].test_expression during choice creation
    // But, there might be a scenario where we still have it undefined, eg: for imported blocks
    // Therefore, we set it here to make sure we use key_press selector by default
    const testIndex = 0
    if (this.choice?.text_tests?.[testIndex]?.test_expression === undefined) {
      this.updateCurrentExpression(testIndex, {value: this.choice.name})
    }
  },

  computed: {
    currentTextTestList() {
      return this.choice.text_tests
    },
  },
  methods: {
    ...mapActions(`flow/${BLOCK_TYPE}`, ['block_setChoiceTextTestsExpressionOnIndex']),
    updateCurrentExpression(testIndex, {value}) {
      this.block_setChoiceTextTestsExpressionOnIndex({
        blockId: this.block.uuid,
        choiceIndex: this.index,
        testIndex,
        value,
      })
    },
    //TODO: make this as computed if needed
    textExpression(index) {
      return this.currentTextTestList?.[index]?.test_expression
    },
  },
}
</script>

<style scoped>

</style>
