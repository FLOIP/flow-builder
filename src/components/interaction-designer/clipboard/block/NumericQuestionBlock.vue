<template>
  <div class="card">
    <div class="card-body sm-padding-below font-roboto">
      <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.name}}</h4>
      <p class="card-text">
        {{prompt.block.label}}
      </p>
      <input v-model="enteredValue"
        class="form-control"
        type="number"
        required
        :disabled="!isFocused"
        :min="prompt.config.min"
        :maxlength="maxDigits"
        :max="prompt.config.max"
        @keyup="checkIsValid" />
      <block-action-buttons
        class="mt-3"
        :is-disabled="false"
        :is-focused="isFocused"
        :on-next-clicked="submitAnswer"
        :is-block-interaction="isBlockInteraction"
        :on-cancel-clicked="onActiveBlockChanged"/>
    </div>
  </div>
</template>
<script>
import { IContext, NumericPrompt } from '@floip/flow-runner'
import BlockActionButtons from '../BlockActionButtons.vue'

export default {
  name: 'NumericQuestionBlock',
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    prompt: NumericPrompt,
    goNext: Function,

    isBlockInteraction: Boolean,
    onActiveBlockChanged: Function,
    isFocused: Boolean,
  },
  data() {
    return {
      enteredValue: '',
      isValid: true,
    }
  },
  computed: {
    maxDigits() {
      return this.prompt.block.maxNumericDigits || 1 // TODO need to figure out the default value
    },
    maxValue() {
      return Math.pow(10, 0 + this.maxDigits) - 1
    },
  },
  methods: {
    checkIsValid() {
      // const num = +this.enteredValue
      // try {
      //   this.prompt.validate(num)
      // } catch (e) {
      //   this.isValid = false
      // }
    },
    submitAnswer() {
      // console.log('is valid ', this.isValid)
      // if (this.isValid) {
      this.prompt.value = +this.enteredValue
      this.prompt.fulfill()
      this.goNext()
      // }
    },
    reset() {
    },
  },
}
</script>
