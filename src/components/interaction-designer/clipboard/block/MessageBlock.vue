<template>
  <div class="card" :class="{'disabled-block': !isFocused}">
    <div class="card-body sm-padding-below font-roboto">
      <div>
        <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.label}}</h4>
      </div>
      <p class="card-text">
        {{getContent}}
      </p>
      <block-action-buttons
          class="sm-room-above"
          :is-disabled="false"
          :is-focused="isFocused"
          :on-next-clicked="submitAnswer"/>
    </div>
  </div>
</template>

<script>
import { Context, IContext, MessagePrompt } from '@floip/flow-runner'
import BlockActionButtons from '../shared/BlockActionButtons.vue'

export default {
  name: 'MessageBlock',
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    prompt: MessagePrompt,
    goNext: Function,
  },
  data() {
    return {
      isFocused: true,
    }
  },
  computed: {
    getContent() {
      const result = Context.prototype.getResource.call(this.context, this.prompt.config.prompt)
      return result.hasText() ? result.getText() : this.prompt.block.label
    },
  },
  methods: {
    submitAnswer() {
      console.log('submit answer in message block ')
      this.prompt.value = null
      this.isFocused = false
      this.goNext()
      this.isFocused = false
    },
  },
}
</script>
