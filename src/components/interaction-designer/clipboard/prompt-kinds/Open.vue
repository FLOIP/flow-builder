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
            @keyup="checkIsValid(enteredValue)"/>
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
import Component, {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {PromptKindMixin} from '@/components/interaction-designer/clipboard/shared/PromptKindMixin'
import BlockActionButtons from '../shared/BlockActionButtons.vue'

@Component({
  components: {
    BlockActionButtons
  },
})
export default class Open extends mixins(Lang, PromptKindMixin) {
  enteredValue = ''
  backUpValue = ''

  async submitAnswer() {
    this.checkIsValid(this.enteredValue)
    await this.submitAnswerCommon(this.enteredValue)
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
