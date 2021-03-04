<template>
  <div class="card">
    <div class="card-body sm-padding-below font-roboto">
      <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.name}}</h4>
      <p class="card-text">
        {{prompt.block.label}}
      </p>
      <block-action-buttons
          class="sm-room-above"
          :is-disabled="false"
          :is-focused="isFocused"
          :on-next-clicked="submitAnswer"
          :is-block-interaction="isBlockInteraction"
          :on-cancel-clicked="onActiveBlockChanged"/>
    </div>
  </div>
</template>

<script>
import { Context, IContext, MessagePrompt } from '@floip/flow-runner'
import BlockActionButtons from '../BlockActionButtons.vue'

export default {
  name: 'MessageBlock',
  components: {
    BlockActionButtons,
  },
  created() {
    const { resources } = this.context
    console.log('resources ', resources)
    const result = Context.prototype.getResource.call(this.context, this.prompt.config.prompt)
    console.log('result is ', result)
    debugger
    console.log('has text ', result.hasText())
    if (result.hasText()) {
      console.log('resource text is ', result.getText())
    }
  },
  props: {
    context: IContext,
    prompt: MessagePrompt,
    goNext: Function,
    isBlockInteraction: Boolean,
    onActiveBlockChanged: Function,
    isFocused: Boolean,
  },
  methods: {
    submitAnswer() {
      console.log('submit answer in message block ')
      this.prompt.value = null
      this.prompt.fulfill()
      this.goNext()
    },
  },
}
</script>
