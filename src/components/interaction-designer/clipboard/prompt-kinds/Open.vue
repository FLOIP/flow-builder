<template>
    <div>
      <div class="d-flex justify-content-between">
        <slot name="title"></slot>
        <i v-if="!isFocused && !isComplete" @click="editBlock"
           class="glyphicon glyphicon-pencil cursor-pointer"></i>
      </div>
      <slot name="content"></slot>
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
        :on-next-clicked="submitAnswer"
        :is-block-interaction="isBlockInteraction"
        :on-cancel-clicked="onCancel"
      />
    </div>
</template>
<script>
import { IContext } from '@floip/flow-runner'
import { mapActions, mapGetters } from 'vuex'
import BlockActionButtons from '../shared/BlockActionButtons.vue'

export default {
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    index: Number,
    isComplete: Boolean,
    goNext: Function,
  },
  data() {
    return {
      enteredValue: '',
      backUpValue: '',
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
  },
  methods: {
    ...mapActions('clipboard', ['setIsFocused', 'setLastBlockUnEditable', 'setLastBlockEditable']),
    checkIsValid() {
      try {
        this.prompt.validate(this.enteredValue)
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
        this.prompt.value = this.enteredValue
        this.setIsFocused({ index: this.index, value: false })
        this.goNext()
      }
    },
    editBlock() {
      this.setLastBlockUnEditable()
      this.setIsFocused({ index: this.index, value: true })
      this.isBlockInteraction = true
      this.backUpValue = this.prompt.value
    },
    onCancel() {
      this.setLastBlockEditable()
      this.setIsFocused({ index: this.index, value: false })
      this.isBlockInteraction = false
      this.enteredValue = this.backUpValue
      this.errorMsg = ''
    },
  },
}
</script>
