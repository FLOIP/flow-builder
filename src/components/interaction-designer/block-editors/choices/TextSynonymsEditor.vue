<template>
  <div class="text-synonyms-editor">
    <template v-for="({
      test_expression, _language,
    }, testIndex) in currentTextTestList">
      <validation-message
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/choices/${index}/text_tests/${testIndex}/test_expression`">
        <expression-input
          :current-expression="test_expression"
          :label="''"
          :placeholder="trans('flow-builder.enter-expression')"
          :valid-state="isValid"
          class="mb-1"
          @commitExpressionChange="updateCurrentExpression(testIndex, $event)" />
      </validation-message>
    </template>

    <!--empty input to add new synonyms-->
    <expression-input
      :current-expression="draftExpression"
      :label="''"
      :placeholder="trans('flow-builder.enter-expression')"
      class="mb-1"
      @commitExpressionChange="addNewExpression" />
  </div>
</template>

<script>
import {IChoice, ISelectOneResponseBlock} from '@floip/flow-runner'
import {mapActions} from 'vuex'
import {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'
import Lang from '@/lib/filters/lang'

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

  data() {
    return {
      draftExpression: '',
    }
  },

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
    ...mapActions(`flow/${BLOCK_TYPE}`, ['choice_setTextTestsExpressionOnIndex']),

    updateCurrentExpression(testIndex, value) {
      this.choice_setTextTestsExpressionOnIndex({
        choice: this.choice,
        choiceIndex: this.index,
        testIndex,
        value,
      })
    },
    addNewExpression(value) {
      this.draftExpression = value
      this.choice_setTextTestsExpressionOnIndex({
        choice: this.choice,
        choiceIndex: this.index,
        testIndex: Number(this.currentTextTestList.length),
        value,
      })

      // Wait the dom to be ready before resetting back
      this.$nextTick(() => {
        this.draftExpression = ''
      })
    },
  },
}
</script>
