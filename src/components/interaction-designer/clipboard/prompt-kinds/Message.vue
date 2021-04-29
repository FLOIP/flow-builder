<template>
    <div>
      <div class="d-flex justify-content-between">
        <slot name="title"></slot>
        <i v-if="!isFocused && !isComplete" @click="editBlock"
           class="glyphicon glyphicon-pencil cursor-pointer"></i>
      </div>
      <slot name="content"></slot>
      <block-action-buttons
          class="sm-room-above"
          :is-disabled="false"
          :is-focused="isFocused"
          :on-next-clicked="submitAnswer"
          :is-block-interaction="isBlockInteraction"
          :on-cancel-clicked="onCancel"
      />
    </div>
</template>

<script lang="ts">
import BlockActionButtons from '../shared/BlockActionButtons.vue'
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { IPrompt } from '@floip/flow-runner';
import Lang from '@/lib/filters/lang';

const clipboardVuexNamespace = namespace('clipboard')

@Component({
  components: {
    BlockActionButtons
  },
})
export default class Message extends mixins(Lang) {
  @Prop() index!: number
  @Prop() isComplete!: boolean
  @Prop() goNext!: Function
  @Prop() onEditComplete!: Function

  isBlockInteraction = false

  get isFocused() {
    return this.isBlockFocused(this.index)
  }
  get prompt() {
    return this.getBlockPrompt(this.index)
  }

  async submitAnswer() {
    if (this.isBlockInteraction) {
      await this.onEditComplete(this.index)
      this.isBlockInteraction = false
    }
    this.prompt.value = null
    this.setIsFocused({ index: this.index, value: false })
    this.goNext()
  }

  editBlock() {
    this.setIsFocused({ index: this.index, value: true })
    this.setLastBlockUnEditable()
    this.isBlockInteraction = true
  }

  onCancel() {
    this.setLastBlockEditable()
    this.setIsFocused({ index: this.index, value: false })
    this.isBlockInteraction = false
  }

  @clipboardVuexNamespace.Getter isBlockFocused!: (index: number) => boolean
  @clipboardVuexNamespace.Getter getBlockPrompt!: (index: number) => IPrompt<any>
  @clipboardVuexNamespace.Action setIsFocused!: (data: { index: number, value: boolean }) => void
  @clipboardVuexNamespace.Action setLastBlockUnEditable!: () => void
  @clipboardVuexNamespace.Action setLastBlockEditable!: () => void
}
</script>
