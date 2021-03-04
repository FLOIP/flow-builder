<template>
  <div class="card">
    <div class="card-body sm-padding-below font-roboto">
      <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.name}}</h4>
      <p class="card-text">
        {{prompt.block.label}}
      </p>

    <div class="list-group sm-room-above">
      <div v-if="isFocused">
        <div v-for="(choice, index) in choices">
          <button
              type="button"
              class="list-group-item list-group-item-action"
              :class="isActive[index]"
              @click="toggleChoice(choice)"
              style="vertical-align:center">
            <i class="material-icons selectionIcon">
              {{ isSelected(choice) ? "check_box" : "check_box_outline_blank" }}
            </i>
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
import lodash from 'lodash'
import { IContext, MessagePrompt } from '@floip/flow-runner'
import BlockActionButtons from '../BlockActionButtons.vue'

export default {
  name: 'MultipleSelectMultipleChoiceQuestionBlock',
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    prompt: MessagePrompt,
    goNext: Function,

    isBlockInteraction: Boolean,
    onActiveBlockChanged: Function,
    isFocused: Boolean,
  },
  data() {
    return {
      selectedChoices: [],
      wasSelectedIndexChanged: false,
    }
  },
  computed: {
    isActive() {
      return lodash.map(this.choices,
        (choice) => {
          if (this.isSelected(choice)) {
            return 'active'
          }
          return ''
        })
    },

  },
  methods: {
    blockInteractionMultiSelectChoiceIds() {

    },
    getPreviouslySelectedOptions() {
    },

    submitAnswer() {

    },

    reset() {
      // this.selectedChoices = []
      // this.wasSelectedIndexChanged = false
    },
    toggleChoice(choice) {
      // this.wasSelectedIndexChanged = true
      // if (this.selectedChoices.includes(choice)) {
      //   this.selectedChoices = this.selectedChoices.filter((selectedChoice) => selectedChoice !== choice)
      // } else {
      //   this.selectedChoices.push(choice)
      // }
    },
    isSelected(choice) {
      // return this.selectedChoices.includes(choice)
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
</style>
