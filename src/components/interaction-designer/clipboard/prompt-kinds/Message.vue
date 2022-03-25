<template>
    <div>
      <div class="d-flex justify-content-between">
        <slot name="title"></slot>
        <i v-if="!isFocused && !isComplete" @click="editBlockCommon"
           class="glyphicon glyphicon-pencil cursor-pointer"></i>
      </div>
      <slot name="content"></slot>
      <block-action-buttons
          class="sm-room-above"
          :is-disabled="false"
          :is-focused="isFocused"
          :on-next-clicked="submitAnswer"
          :is-block-interaction="isBlockInteraction"
          :on-cancel-clicked="onCancelCommon"
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
export default class Message extends mixins(Lang, PromptKindMixin) {
  async submitAnswer() {
    await this.submitAnswerCommon(null)
  }
}
</script>
