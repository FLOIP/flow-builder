<template>
  <div class="text-synonyms-editor">
    <template v-for="({
        test_expression, language
      }, testIndex) in currentTextTestList">
      <validation-message
        v-if="language === langId"
        :key="testIndex"
        :message-key="`block/${block.uuid}/config/choices/${index}/text_tests/${testIndex}/test_expression`">
        <template #input-control="{ isValid }">
          <expression-input
            ref="expressionInputs"
            :current-expression="test_expression"
            :label="''"
            :placeholder="trans('flow-builder.enter-expression')"
            :valid-state="isValid"
            class="mb-1"
            @commitExpressionChange="updateCurrentExpression(testIndex, $event)" />
        </template>
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
  name: 'TextSynonymsEditor',
  mixins: [Lang],
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
    langId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      draftExpression: '',
    }
  },

  computed: {
    currentTextTestList() {
      return this.choice.text_tests
    },
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

  methods: {
    ...mapActions(`flow/${BLOCK_TYPE}`, ['choice_setTextTestsExpressionOnIndex', 'choice_removeTextTestsExpressionOnIndex']),

    updateCurrentExpression(testIndex, value) {
      if (value > '') {
        // ADD
        this.choice_setTextTestsExpressionOnIndex({
          choice: this.choice,
          testIndex,
          langId: this.langId,
          value,
        })
      } else {
        // DELETION
        this.choice_removeTextTestsExpressionOnIndex({
          choice: this.choice,
          testIndex,
        })

        // Hack the dom rendering to make sure we update the UI
        this.draftExpression = value
        this.$nextTick(() => {
          this.draftExpression = ''
        })
      }
    },
    addNewExpression(value) {
      this.draftExpression = value
      this.choice_setTextTestsExpressionOnIndex({
        choice: this.choice,
        testIndex: Number(this.currentTextTestList.length),
        langId: this.langId,
        value,
      })

      // Wait the dom to be ready before resetting back
      this.$nextTick(() => {
        this.draftExpression = ''
        this.$refs.expressionInputs.at(-1).focus()
      })
    },
  },
}
</script>
