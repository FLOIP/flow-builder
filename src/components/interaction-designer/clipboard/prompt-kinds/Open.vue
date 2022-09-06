<template>
  <div class="open">
    <div class="d-flex justify-content-between">
      <slot name="title" />
      <i
        v-if="!isFocused && !isComplete"
        class="glyphicon glyphicon-pencil cursor-pointer"
        @click="editBlock" />
    </div>
    <slot name="content" />
    <div>
      <textarea
        v-model="enteredValue"
        rows="4"
        cols="50"
        class="form-control"
        :class="{'is-invalid': errorMsg}"
        :disabled="!isFocused"
        @keyup="checkIsValid(enteredValue)" />
      <div
        v-if="errorMsg"
        class="invalid-feedback">
        <small>{{ errorMsg }}</small>
      </div>
    </div>
    <block-action-buttons
      class="mt-3"
      :is-disabled="!!errorMsg"
      :is-focused="isFocused"
      :on-next-clicked="submitAnswer"
      :is-block-interaction="isBlockInteraction"
      :on-cancel-clicked="onCancel" />
  </div>
</template>

<script lang="ts">
import {mixins, Options} from 'vue-class-component'
import {Lang} from '@/lib/filters/lang'
import {PromptKindMixin} from '@/components/interaction-designer/clipboard/shared/PromptKindMixin'
import BlockActionButtons from '../shared/BlockActionButtons.vue'

@Options({
  components: {
    BlockActionButtons,
  },
})
export default class Open extends mixins(Lang, PromptKindMixin) {
  enteredValue = ''
  backUpValue = ''

  async submitAnswer(): Promise<void> {
    this.checkIsValid(this.enteredValue)
    await this.submitAnswerCommon(this.enteredValue)
  }

  editBlock(): void {
    this.editBlockCommon()
    this.backUpValue = this.prompt.value
  }

  onCancel(): void {
    this.onCancelCommon()
    this.enteredValue = this.backUpValue
  }
}
</script>
