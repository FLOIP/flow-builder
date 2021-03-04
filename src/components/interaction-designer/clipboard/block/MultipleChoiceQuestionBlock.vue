<template>
  <div class="clipboard-block-no-padding card-z1 font-roboto"
      :class="{'disabled-alpha': !isFocused}">
    <div class="card-body">

      <h4 class="card-title font-weight-regular text-color-title">{{ block.title }}</h4>

      <Multimedia :key="block.id.toString()" :media-descriptor="mediaDescriptor"/>

      <clipboard-content v-if="block.content" :content="block.content"/>

      <div class="list-group sm-room-above">
        <div v-if="isFocused">
          <div v-for="(output, index) in options">
            <button
                type="button"
                class="list-group-item list-group-item-action"
                :class="isActive[index]"
                @click="changeSelection(index)"
                style="vertical-align:center">
              <i class="material-icons selectionIcon">{{ isSelected(index) ? "radio_button_checked" : "radio_button_unchecked" }}</i>

              {{output.title}}
            </button>
          </div>
        </div>
        <div v-else-if="blockInteraction != null" class="unfocused-selected-list-item">
          <button
              type="button"
              class="list-group-item list-group-item-action active">
            <i class="material-icons selectionIcon">radio_button_checked</i>

            {{blockInteraction.output.title}}
          </button>
        </div>
      </div>

      <BlockActionButtons
          :isDisabled="isDisabled"
          :isFocused="isFocused"
          :onNextClicked="submitAnswer"
          :isBlockInteraction="isBlockInteraction"
          :onCancelClicked="onActiveBlockChanged"/>
    </div>
  </div>
</template>
<script>
  import lodash from 'lodash'
  import BlockActionButtons from "../BlockActionButtons"
  import ClipboardQuestionExecutor from "../../mixins/ClipboardQuestionExecutor"
  import ArrayListUtils from "../../mixins/ArrayListUtils"
  import Multimedia from "./Multimedia"
  import MediaDescribable from "../../mixins/MediaDescribable"

  export default {
    name: 'MultipleChoiceQuestionBlock',
    components: {
      ClipboardContent: () => import(/* webpackChunkName:"/js/clipboard" */ './ClipboardContent'),
      BlockActionButtons,
      Multimedia
    },
    mixins: [
      ClipboardQuestionExecutor,
      ArrayListUtils,
      MediaDescribable,
    ],
    props: {
      /** @type MultipleChoiceQuestionBlockPrompt */
      currentQuestion: Object,

      /** @type BlockInteraction */
      blockInteraction: Object,

      /** @type FlowState */
      flowState: Object,

      /** The root package of Clipboard */
      viamo: Object,

      executeBlock: {},
      isBlockInteraction: Boolean,
      activeBlockInteractionIndex: Number,
      onActiveBlockChanged: Function,
      isFocused: Boolean,
    },
    data() {
      return {
        selectedItemIndex: null,
        wasSelectedIndexChanged: false,
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
        return this.selectedItemIndex === null},
      isActive() {
        return lodash.map(this.options,
            (option, index) => {
              if (this.isSelected(index)) {
                return "active"
              } else {
                return ""
              }
            })
      }
    },
    methods: {
      changeSelection(index) {
        this.wasSelectedIndexChanged = true
        this.selectedItemIndex = index
      },

      submitAnswer() {
        this.executeSubmitAnswer(currentQuestion => {
          currentQuestion.submitAnswer(this.options[this.selectedItemIndex])
          this.executeBlock()
          this.reset()
        })
      },

      reset() {
        this.selectedItemIndex = null
        this.wasSelectedIndexChanged = false
      },

      isSelected(index) {
        if (this.selectedItemIndex === null) {
          // This case occurs when a suggestion is provided
          this.selectedItemIndex = this.blockInteraction.blockQuestionInteraction.choiceId
        }

        return this.selectedItemIndex === index
            || (this.isBlockInteraction
                && !this.wasSelectedIndexChanged
                && this.blockInteraction.output.outputIndex === index)
      }
    }
  }
</script>
<style lang="scss" scoped>
  i {
    vertical-align: middle;
  }

  .selectionIcon {
    margin-right: 5px;
  }

  .list-group {
    margin: 0 16px 10px;
  }

  /* Margin just overflows, so padding needs to be used */
  .unfocused-selected-list-item {
    padding-bottom: 16px;
  }

  .list-group-item {
    margin-bottom: 8px;
  }

  .list-group-item.active {
    background: #844775;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0, 0, 0, 0.54);
    color: rgba(255, 255, 255, 0.87)
  }

  .card-title {
    padding-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    margin: 0;
  }

  .card-text {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
    margin: 0;
  }
</style>