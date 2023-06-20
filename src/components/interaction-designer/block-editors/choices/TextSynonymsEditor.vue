<template>
  <div class="text-synonyms-editor">
    <validation-message
      v-for="({ test_expression, visible_expression, globalIndex }, synonymIndex) in synonymsForLanguage"
      :key="synonymIndex"
      :message-key="`block/${block.uuid}/config/choices/${index}/text_tests/${globalIndex}/test_expression`">
      <template #input-control="{ isValid }">
        <expression-input
          ref="expressionInputs"
          :current-expression="visible_expression"
          :title="test_expression"
          :label="''"
          :placeholder="trans('flow-builder.enter-expression')"
          :valid-state="isValid"
          class="mb-1"
          @commitExpressionChange="updateCurrentExpression(synonymIndex, $event)" />
      </template>
    </validation-message>

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
import {testExpressionToChoice} from '@/components/interaction-designer/block-editors/choices/expressionTransformers'

export default {
  name: 'TextSynonymsEditor',
  mixins: [Lang],
  props: {
    block: {
      type: ISelectOneResponseBlock,
      required: true,
    },
    currentChoice: {
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
      /**
       * Despite using local state, this component does not cause problems with undo/redo
       * because the UI within a modal dialog is updated before the undo/redo action,
       * which means re-rendering of the entire component.
       *
       * See CORE-573 for more details.
       */
      draftExpression: '',
    }
  },

  computed: {
    synonymsForLanguage() {
      return this.choiceTests
        .map((text_test, globalIndex) => ({
          ...text_test,
          visible_expression: testExpressionToChoice(text_test.test_expression),
          globalIndex,
        }))
        .filter(({language}) => language === this.langId)
    },
    choiceTests() {
      return this.currentChoice.text_tests
    },
  },

  created() {
    // We already provide a default value for text_tests[0].test_expression during choice creation
    // But, there might be a scenario where we still have it undefined, eg: for imported blocks
    // Therefore, we set it here to make sure we use key_press selector by default
    const testIndex = 0
    if (this.currentChoice?.text_tests?.[testIndex]?.test_expression === undefined) {
      this.updateCurrentExpression(testIndex, {value: this.currentChoice.name})
    }
  },

  methods: {
    ...mapActions(`flow/${BLOCK_TYPE}`, [
      'choice_setSynonymForLanguage',
      'choice_removeTextTestsExpressionOnIndex',
    ]),

    updateCurrentExpression(testIndex, value) {
      if (value > '') {
        // ADD
        this.choice_setSynonymForLanguage({
          blockId: this.block.uuid,
          resourceId: this.currentChoice.prompt,
          language: this.langId,
          index: testIndex,
          value,
        })
      } else {
        // DELETION
        this.choice_removeTextTestsExpressionOnIndex({
          choice: this.currentChoice,
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

      this.choice_setSynonymForLanguage({
        blockId: this.block.uuid,
        resourceId: this.currentChoice.prompt,
        language: this.langId,
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
