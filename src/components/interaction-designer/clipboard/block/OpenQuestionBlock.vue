<template>
  <div class="card" :class="{'disabled-block': !isFocused}">
    <div class="card-body sm-padding-below font-roboto">
      <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.label}}</h4>
      <p class="card-text">
        {{getContent}}
      </p>
      <div>
        <textarea
            v-model="enteredValue"
            rows="4"
            cols="50"
            class="form-control"
            :class="{'is-invalid': errorMsg}"
            :disabled="!isFocused"
            @keyup="checkIsValid"/>
        <div v-if="errorMsg" class="invalid-feedback">
          <small>{{errorMsg}}</small>
        </div>
      </div>
      <block-action-buttons
        class="mt-3"
        :is-disabled="errorMsg ? true : false"
        :is-focused="isFocused"
        :on-next-clicked="submitAnswer"/>
    </div>
  </div>
</template>
<script>
import { Context, IContext, OpenPrompt } from '@floip/flow-runner'
import BlockActionButtons from '../shared/BlockActionButtons.vue'

export default {
  name: 'OpenQuestionBlock',
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    prompt: OpenPrompt,
    goNext: Function,
  },
  computed: {
    getContent() {
      const result = Context.prototype.getResource.call(this.context, this.prompt.config.prompt)
      return result.hasText() ? result.getText() : this.prompt.block.label
    },
  },
  data() {
    return {
      enteredValue: '',
      errorMsg: null,
      isFocused: true,
    }
  },
  methods: {
    checkIsValid() {
      try {
        const validity = this.prompt.validate(this.enteredValue)
        this.errorMsg = ''
      } catch (e) {
        this.errorMsg = e.message
      }
    },
    submitAnswer() {
      this.checkIsValid()
      if (!this.errorMsg) {
        this.prompt.value = this.enteredValue
        this.isFocused = false
        this.goNext()
      }
    },
  },
}
</script>
