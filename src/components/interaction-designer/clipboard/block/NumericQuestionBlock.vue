<template>
  <div class="card" :class="{'disabled-block': !isFocused}">
    <div class="card-body sm-padding-below font-roboto">
      <div class="d-flex justify-content-between">
        <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.label}}</h4>
        <i v-if="!isFocused && !isComplete"
           class="glyphicon glyphicon-pencil cursor-pointer"
           @click="editBlock"></i>
      </div>
      <p class="card-text">
        {{getContent}}
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
        :on-next-clicked="submitAnswer"
        :is-block-interaction="isBlockInteraction"
        :on-cancel-clicked="onCancel"
      />
    </div>
  </div>
</template>
<script>
import { Context, IContext } from '@floip/flow-runner'
import { mapActions, mapGetters } from 'vuex'
import BlockActionButtons from '../shared/BlockActionButtons.vue'

export default {
  name: 'NumericQuestionBlock',
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    index: Number,
    isComplete: Boolean,
    goNext: Function,
    onEditComplete: Function,
  },
  data() {
    return {
      enteredValue: '',
      errorMsg: null,
      isBlockInteraction: false,
    }
  },
  computed: {
    ...mapGetters('clipboard', ['isBlockFocused', 'getBlockPrompt']),
    isFocused() {
      return this.isBlockFocused(this.index)
    },
    prompt() {
      return this.getBlockPrompt(this.index)
    },
    getContent() {
      const result = Context.prototype.getResource.call(this.context, this.prompt.config.prompt)
      return result.hasText() ? result.getText() : ''
    },
    isDisabled() {
      return !!this.errorMsg
    },
  },
  methods: {
    ...mapActions('clipboard', ['setIsFocused', 'setLastBlockUnEditable', 'setLastBlockEditable']),
    checkIsValid() {
      const num = +this.enteredValue
      try {
        this.prompt.validate(num)
        this.errorMsg = ''
      } catch (e) {
        this.errorMsg = e.message
      }
    },
    async submitAnswer() {
      this.checkIsValid()
      if (!this.errorMsg) {
        if (this.isBlockInteraction) {
          await this.onEditComplete(this.index)
          this.isBlockInteraction = false
        }
        this.prompt.value = +this.enteredValue
        this.setIsFocused({ index: this.index, value: false })
        this.goNext(this.index)
      }
    },
    editBlock() {
      this.setLastBlockUnEditable()
      this.setIsFocused({ index: this.index, value: true })
      this.isBlockInteraction = true
    },
    onCancel() {
      this.setLastBlockEditable()
      this.setIsFocused({ index: this.index, value: false })
      this.isBlockInteraction = false
    },
  },
}
</script>
