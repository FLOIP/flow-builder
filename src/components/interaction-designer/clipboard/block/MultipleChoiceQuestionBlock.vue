<template>
  <div class="card">
    <div class="card-body sm-padding-below font-roboto">
      <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.name}}</h4>
      <p class="card-text">
        {{prompt.block.label}}
      </p>

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

      <block-action-buttons
        class="sm-room-above"
        :is-disabled="false"
        :is-focused="isFocused"
        :on-next-clicked="submitAnswer"
        :is-block-interaction="isBlockInteraction"
        :on-cancel-clicked="onActiveBlockChanged"/>
    </div>
  </div>
</template>
<script>
import { IContext, SelectOnePrompt } from '@floip/flow-runner'
import BlockActionButtons from '../BlockActionButtons.vue'

export default {
  name: 'MultipleChoiceQuestionBlock',
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    prompt: SelectOnePrompt,
    goNext: Function,

    isBlockInteraction: Boolean,
    onActiveBlockChanged: Function,
    isFocused: Boolean,
  },
  data() {
    return {
      selectedItemIndex: null,
      wasSelectedIndexChanged: false,
    }
  },
  methods: {
    changeSelection(index) {
      // this.wasSelectedIndexChanged = true
      // this.selectedItemIndex = index
    },

    submitAnswer() {

    },

    reset() {

    },

    isSelected(index) {
      // if (this.selectedItemIndex === null) {
      //   // This case occurs when a suggestion is provided
      //   this.selectedItemIndex = this.blockInteraction.blockQuestionInteraction.choiceId
      // }
      //
      // return this.selectedItemIndex === index
      //       || (this.isBlockInteraction
      //           && !this.wasSelectedIndexChanged
      //           && this.blockInteraction.output.outputIndex === index)
    },
  },
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
</style>
