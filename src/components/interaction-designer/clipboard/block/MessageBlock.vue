<template>
<!--  <div class="clipboard-block-no-padding card-z1 font-roboto"-->
<!--      :class="{'disabled-alpha': !isFocused}">-->
<!--    <div class="card-body sm-padding-below">-->
<!--      <h4 class="card-title font-weight-regular text-color-title">-->
<!--        {{block.title}}-->
<!--      </h4>-->

<!--      <multimedia :key="block.id.toString()" :media-descriptor="mediaDescriptor"/>-->

<!--      <clipboard-content v-if="block.content" :content="block.content"/>-->

<!--      <block-action-buttons-->
<!--          class="sm-room-above"-->
<!--          :is-disabled="false"-->
<!--          :is-focused="isFocused"-->
<!--          :on-next-clicked="submitAnswer"-->
<!--          :is-block-interaction="isBlockInteraction"-->
<!--          :on-cancel-clicked="onActiveBlockChanged"/>-->
<!--    </div>-->
<!--  </div>-->
  <div class="card">
    <div class="card-body sm-padding-below font-roboto">
      <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.name}}</h4>
      <p class="card-text">
<!--        <multimedia :key="block.id.toString()" :media-descriptor="mediaDescriptor"/>&ndash;&gt;-->
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
// import clipboardQuestionExecutor from '../../mixins/ClipboardQuestionExecutor'
// import Multimedia from './Multimedia.vue'
// import MediaDescribable from '../../mixins/MediaDescribable.vue'

export default {
  name: 'MessageBlock',
  components: {
    // ClipboardContent: () => import(/* webpackChunkName:"/js/clipboard" */ './ClipboardContent'),
    // Multimedia,
    BlockActionButtons,
  },
  // mixins: [
  //   clipboardQuestionExecutor,
  //   MediaDescribable,
  // ],
  created() {
    console.log('prompt is ', this.prompt)
    console.log('context is ', this.context)
    const { resources } = this.context
    console.log(resources)
    const result = Context.prototype.getResource.call(this.context, this.prompt.config.prompt)
    console.log('result is ', result)
    debugger
    console.log('has text ', result.hasText())
    if (result.hasText()) {
      console.log('resource text is ', result.getText())
    }
    // console.log('getresource from context obj ', this.prompt.())
  },
  props: {
    /** @type MessageBlockPrompt */
    context: IContext,
    prompt: Object,
    goNext: Function,

    /** @type BlockInteraction */
    // blockInteraction: Object,
    //
    // /** @type FlowState */
    // flowState: Object,
    //
    // /** The root package of Clipboard */
    // viamo: Object,
    //
    // executeBlock: {},
    isBlockInteraction: Boolean,
    // activeBlockInteractionIndex: Number,
    onActiveBlockChanged: Function,
    isFocused: Boolean,
  },
  // data() {
  //   return {
  //     wasSelectedIndexChanged: false,
  //   }
  // },
  // computed: {
  //   block() {
  //     return this.blockInteraction.block
  //   },
  // },
  methods: {
    getResources() {

      // console.log(result[0].values[result.length - 1].value)
      // console.log(result[0].values())
    },
    submitAnswer() {
      console.log('submit answer in message block ')
      this.prompt.value = null
      this.prompt.fulfill()
      this.goNext()
    //   this.executeSubmitAnswer((currentQuestion) => {
    //     currentQuestion.submitAnswer()
    //     this.executeBlock()
    //     this.reset()
    //   })
    },
    // reset() {
    //   this.wasSelectedIndexChanged = false
    // },
    // isSelected(index) {
    //   return this.isBlockInteraction
    //       && !this.wasSelectedIndexChanged
    //       && this.blockInteraction.output.outputIndex === index
    // },
  },
}
</script>
<style lang="scss" scoped>
  .card-title {
    padding-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    margin: 0;
  }

  .sm-padding-below {
    padding-bottom: 10px;
  }
</style>
