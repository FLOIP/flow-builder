<template>
  <div class="card">
    <div class="card-body sm-padding-below font-roboto">
      <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.name}}</h4>
      <p class="card-text">
        {{prompt.block.label}}
      </p>
      <div class="numeric-input">
        <label class="numeric-input-label">
          <textarea
              v-model="enteredValue"
              rows="4"
              cols="50"
              class="form-control"
              :disabled="!isFocused"
              @keyup="checkIsValid"/>
        </label>
        <small v-if="errorMessage"
            style="display:block"
            class="sm-room-below form-text"
            :class="{'text-muted': errorMessage , 'text-danger': !errorMessage}">
          <span>{{errorMessage}}</span>
        </small>
      </div>
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
import { IContext, OpenPrompt } from '@floip/flow-runner'
import BlockActionButtons from '../BlockActionButtons'

export default {
  name: 'OpenQuestionBlock',
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    prompt: OpenPrompt,
    goNext: Function,

    isBlockInteraction: Boolean,
    onActiveBlockChanged: Function,
    isFocused: Boolean,
  },
  data() {
    return {
      enteredValue: '',
      errorMessage: null,
    }
  },
  methods: {
    checkIsValid() {
      try {
        this.block.validate(this.enteredValue)
        this.errorMessage = null
      } catch (e) {
        this.handleErrorOnSubmission(e)
      }
    },

    submitAnswer() {
      this.prompt.value = this.enteredValue
      this.prompt.fulfill()
      this.goNext()
    },

    handleErrorOnSubmission(e) {
      if (e.userSafeMessage) {
        console.error(e.userSafeMessage.devMessage, e)
        this.errorMessage = e.userSafeMessage.userMessage || 'An error has occurred'
      } else {
        console.error(e)
      }
    },

    reset() {
    },
  },
}
</script>
<style lang="scss" scoped>
  .text-small {
    font-size: 80%;
  }

  .invalid {
    margin-top: .25rem;
    color: #dc3545;
  }

  .numeric-input {
    margin-left: 16px;
    margin-right: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .numeric-input-label {
    width:100%;
    margin-bottom: 0
  }
</style>
