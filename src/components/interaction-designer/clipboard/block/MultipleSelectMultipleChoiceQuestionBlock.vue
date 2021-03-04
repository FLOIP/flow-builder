<template>
  <div class="clipboard-block-no-padding card-z1 font-roboto" :class="{'disabled-alpha': !isFocused}">
    <div class="card-body">

      <h4 class="card-title font-weight-regular text-color-title">{{ block.title }}</h4>

      <Multimedia :key="block.id.toString()" :media-descriptor="mediaDescriptor"/>

      <clipboard-content v-if="block.content" :content="block.content"/>

      <div class="list-group sm-room-above">
        <div v-if="isFocused">
          <div v-for="(choice, index) in choices">
            <button
                type="button"
                class="list-group-item list-group-item-action"
                :class="isActive[index]"
                @click="toggleChoice(choice)"
                style="vertical-align:center">
              <i class="material-icons selectionIcon">{{ isSelected(choice) ? "check_box" : "check_box_outline_blank" }}</i>

              {{choice}}
            </button>
          </div>
        </div>

        <div v-else-if="isBlockInteraction" class="unfocused-selected-list-item">
          <div v-for="(choice, index) in getPreviouslySelectedOptions()">
            <button
                type="button"
                class="list-group-item list-group-item-action active"
                style="vertical-align:center">
              <i class="material-icons selectionIcon">check_box</i>
              {{choice}}
            </button>
          </div>
        </div>
      </div>

      <BlockActionButtons
          :hasSelection="isFocused"
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
    name: 'MultipleSelectMultipleChoiceQuestionBlock',
    components: {
      ClipboardContent: () => import(/* webpackChunkName:"/js/clipboard" */ './ClipboardContent'),
      BlockActionButtons,
      Multimedia,
    },
    mixins: [
      ClipboardQuestionExecutor,
      ArrayListUtils,
      MediaDescribable,
    ],
    props: {
      /** @type MultipleSelectMultipleChoiceQuestionBlockPrompt */
      currentQuestion: {},

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
        selectedChoices: [],
        wasSelectedIndexChanged: false,
      }
    },
    mounted() {
      let blockInteractionMultiSelectChoiceIds = this.blockInteractionMultiSelectChoiceIds()
      if (this.isBlockInteraction || blockInteractionMultiSelectChoiceIds) {
        this.selectedChoices = blockInteractionMultiSelectChoiceIds
      }
    },
    computed: {
      block() {
        return this.blockInteraction.block
      },

      choices() {
        return this.kotlinArrayListToArray(this.block.choices)
      },
      isActive() {
        return lodash.map(this.choices,
            (choice) => {
              if (this.isSelected(choice)) {
                return "active"
              } else {
                return ""
              }
            }
        )
      },

    },
    methods: {
      blockInteractionMultiSelectChoiceIds() {
        let multiSelectChoiceIds = this.kotlinArrayListToArray(this.blockInteraction.blockQuestionInteraction.multiSelectChoiceIds)
        if (multiSelectChoiceIds) {
          return multiSelectChoiceIds
        } else {
          return []
        }
      },
      getPreviouslySelectedOptions() {
        return this.choices
            .filter((output) => {
              return this.blockInteractionMultiSelectChoiceIds().includes(output)
            })
      },

      submitAnswer() {
        this.executeSubmitAnswer(currentQuestion => {
          currentQuestion.submitAnswer(this.selectedChoices)
          this.executeBlock()
          this.reset()
        })
      },

      reset() {
        this.selectedChoices = []
        this.wasSelectedIndexChanged = false
      },
      toggleChoice(choice) {
        this.wasSelectedIndexChanged = true
        if (this.selectedChoices.includes(choice)) {
          this.selectedChoices = this.selectedChoices.filter(selectedChoice => selectedChoice !== choice)
        } else {
          this.selectedChoices.push(choice)
        }
      },
      isSelected(choice) {
        return this.selectedChoices.includes(choice)
      },
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

  .list-group-item.active {
    background: #844775;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0, 0, 0, 0.54);
    color: rgba(255, 255, 255, 0.87)
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