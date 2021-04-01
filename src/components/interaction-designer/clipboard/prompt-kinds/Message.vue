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
    onEditComplete: Function,
  },
  data() {
    return {
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
    async submitAnswer() {
      if (this.isBlockInteraction) {
        await this.onEditComplete(this.index)
        this.isBlockInteraction = false
      }
      this.prompt.value = null
      this.setIsFocused({ index: this.index, value: false })
      this.goNext()
    },
    editBlock() {
      this.setIsFocused({ index: this.index, value: true })
      this.setLastBlockUnEditable()
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
