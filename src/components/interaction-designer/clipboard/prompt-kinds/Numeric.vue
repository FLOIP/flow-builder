<template>
  <div class="card" :class="{'gray-background': !isFocused}">
    <div class="card-body sm-padding-below font-roboto">
      <div class="d-flex justify-content-between">
        <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.label}}</h4>
      </div>
      <p class="card-text">
        {{content}}
      </p>
      <div class="input-group has-validation">
        <input v-model="enteredValue"
          class="form-control"
          :class="{'is-invalid': errorMsg}"
          type="number"
          required
          :disabled="!isFocused"
          :min="prompt.config.min"
          :max="prompt.config.max"
          @keyup="checkIsValid" />
        <div v-if="errorMsg" class="invalid-feedback">
          <small>{{errorMsg}}</small>
        </div>
      </div>
      <block-action-buttons
        class="mt-3"
        :is-disabled="isDisabled"
        :is-focused="isFocused"
        :on-next-clicked="submitAnswer"/>
    </div>
  </div>
</template>
<script>
import { Context, IContext, NumericPrompt } from '@floip/flow-runner'
import BlockActionButtons from '../shared/BlockActionButtons.vue'

export default {
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    prompt: NumericPrompt,
    goNext: Function,
  },
  data() {
    return {
      enteredValue: '',
      errorMsg: null,
      isFocused: true,
    }
  },
  computed: {
    content() {
      const result = Context.prototype.getResource.call(this.context, this.prompt.config.prompt)
      return result.hasText() ? result.getText() : this.prompt.block.label
    },
    isDisabled() {
      return !!this.errorMsg
    },
  },
  methods: {
    checkIsValid() {
      const num = +this.enteredValue
      try {
        const validity = this.prompt.validate(num)
        this.errorMsg = ''
      } catch (e) {
        this.errorMsg = e.message
      }
    },
    submitAnswer() {
      this.checkIsValid()
      if (!this.errorMsg) {
        this.prompt.value = +this.enteredValue
        this.isFocused = false
        this.goNext()
      }
    },
  },
}
</script>
