<template>
    <div>
      <div class="d-flex justify-content-between">
        <slot name="title"></slot>
        <i v-if="!isFocused && !isComplete" @click="editBlock"
           class="glyphicon glyphicon-pencil cursor-pointer"></i>
      </div>
      <slot name="content"></slot>

      <div class="input-group has-validation">
        <input v-model="enteredValue"
          class="form-control"
          :class="{'is-invalid': errorMsg}"
          type="number"
          required
          :disabled="!isFocused"
          :min="prompt.config.min"
          :max="prompt.config.max"
          @keyup="checkIsValid(+enteredValue)" />
        <div v-if="errorMsg" class="invalid-feedback">
          <small>{{errorMsg}}</small>
        </div>
      </div>

      <block-action-buttons
        class="mt-3"
        :is-disabled="!!errorMsg"
        :is-focused="isFocused"
        :on-next-clicked="submitAnswer"
        :is-block-interaction="isBlockInteraction"
        :on-cancel-clicked="onCancel"
      />
    </div>
</template>

<script lang="ts">
import BlockActionButtons from '../shared/BlockActionButtons.vue'
import Component, { mixins } from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import { PromptKindMixin } from '@/components/interaction-designer/clipboard/shared/PromptKindMixin'

@Component({
  components: {
    BlockActionButtons
  },
})
export default class Numeric extends mixins(Lang, PromptKindMixin) {
  enteredValue = ''
  backUpValue = ''

  async submitAnswer() {
    const value = +this.enteredValue
    this.checkIsValid(value)
    await this.submitAnswerCommon(value)
  }

  editBlock() {
    this.editBlockCommon()
    this.backUpValue = this.prompt.value
  }

  onCancel() {
    this.onCancelCommon()
    this.enteredValue = this.backUpValue
  }
}
</script>
