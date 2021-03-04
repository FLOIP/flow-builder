<template>
  <div
      class="clipboard-block card-z1 font-roboto"
      :class="{'disabled-alpha': !isFocused}">

    <div class="card-body">
      <h4 class="card-title font-weight-regular text-color-title">{{ block.title }}</h4>

      <div v-if="getInteractionsBeforeLastSummary(flowState.validBlockInteractions(), block.flow).length"
          class="form-group">
        <div @click="toggleInteractionsBeforeLastSummaryVisibility"
            class="clickable faded">
          <icon :name="isInteractionsBeforeLastSummaryVisible ? 'caret-down' : 'caret-right'"
              class="text-muted"></icon>
          <span class="text-muted">Interactions before last summary</span>
        </div>
        <div v-if="isInteractionsBeforeLastSummaryVisible" class="faded indent">
          <interaction-summary v-for="interaction in getInteractionsBeforeLastSummary(flowState.validBlockInteractions(), block.flow)"
              :interaction="interaction"
              :key="interaction.blockInteractionId.toString()"
              :viamo="viamo"></interaction-summary>
        </div>
      </div>
      <div class="form-group">
        <interaction-summary v-for="interaction in getInteractionsAfterLastSummary(flowState.validBlockInteractions(), block.flow)"
            :interaction="interaction"
            :key="interaction.blockInteractionId.toString()"
            :viamo="viamo"/>
      </div>

      <div v-if="options.length === 2" class="list-group md-room-below">
        <div v-for="(output, index) in options">
          <button
              v-if="shouldShowOption(index)"
              type="button"
              class="list-group-item list-group-item-action"
              :class="{active: isActive[index]}"
              @click="selectItem(index)">
            {{output.title}}
          </button>
        </div>
      </div>

      <BlockActionButtons
          :isFocused="isFocused"
          :isDisabled="isDisabled"
          :onNextClicked="submitAnswer"
          :isBlockInteraction="isBlockInteraction"
          :onCancelClicked="onActiveBlockChanged"/>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon.vue'
  import lodash from 'lodash'
  import 'vue-awesome/icons/caret-right'
  import 'vue-awesome/icons/caret-down'

  import InteractionSummary from '../InteractionSummary'
  import BlockActionButtons from "../BlockActionButtons";
  import ClipboardQuestionExecutor from "../../mixins/ClipboardQuestionExecutor"
  import ArrayListUtils from "../../mixins/ArrayListUtils";

  export default {
    components: {
      InteractionSummary,
      Icon,
      BlockActionButtons
    },
    mixins: [
      ClipboardQuestionExecutor,
      ArrayListUtils
    ],
    props: {
      /** @type SummaryBlockPrompt */
      currentQuestion: {},

      /** The root package of Clipboard */
      viamo: Object,

      /** @type BlockInteraction */
      blockInteraction: Object,

      /** @type FlowState */
      flowState: Object,

      executeBlock: {},
      isBlockInteraction: Boolean,
      activeBlockInteractionIndex: Number,
      onActiveBlockChanged: Function,
      isFocused: Boolean,
    },
    data() {
      return {
        selectedItemIndex: null,
        isInteractionsBeforeLastSummaryVisible: false,
        wasSelectedIndexChanged: false
      }
    },
    computed: {
      block() {
        return this.blockInteraction.block
      },

      options() {
        return this.kotlinArrayListToArray(this.block.outputs)
      },

      isDisabled() {
        return this.selectedItemIndex === null && this.options.length === 2
      },
      isActive() {
        if (this.blockInteraction != null && !this.isFocused) {
          return this.options.map((output, index) => {
            return this.blockInteraction.blockQuestionInteraction.choiceId === index
          })
        } else {
          return lodash.map(this.options, (option, index) => index === this.selectedItemIndex)
        }
      },
      getInteractionsBeforeLastSummary() {
        return this.viamo.model.block.interaction.getInteractionsBeforeLastSummary
      },
      getInteractionsAfterLastSummary() {
        return this.viamo.model.block.interaction.getInteractionsAfterLastSummary
      }
    },
    methods: {
      shouldShowOption(optionIndex) {
        if (this.blockInteraction != null && !this.isFocused) {
          return this.options.map((output, index) => {
            return this.blockInteraction.blockQuestionInteraction.choiceId === index
          })[optionIndex]
        } else {
          return true
        }
      },
      selectItem(index) {
        this.wasSelectedIndexChanged = true
        this.selectedItemIndex = index
      },
      submitAnswer() {
        this.executeSubmitAnswer(currentQuestion => {
          currentQuestion.submitAnswer(this.selectedItemIndex || 0)
          this.executeBlock()
          this.reset()
        });
      },
      reset() {
        this.selectedItemIndex = null
        this.isInteractionsBeforeLastSummaryVisible = false
        this.wasSelectedIndexChanged = false
      },
      toggleInteractionsBeforeLastSummaryVisibility() {
        this.isInteractionsBeforeLastSummaryVisible = !this.isInteractionsBeforeLastSummaryVisible
      }
    }
  }
</script>

<style lang="scss" scoped>
  .faded {
    opacity: 0.7;
  }

  .clickable {
    cursor: pointer;
  }

  .indent {
    margin-left: 1em;
  }
</style>