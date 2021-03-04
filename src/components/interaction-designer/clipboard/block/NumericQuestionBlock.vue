<template>
<!--  <div class="clipboard-block-no-padding card-z1 font-roboto" :class="{'disabled-alpha': !isFocused}">-->
<!--    <div class="card-body">-->

<!--      <h4 class="card-title font-weight-regular text-color-title">{{ block.title }}</h4>-->

<!--      <Multimedia :key="block.id.toString()"  :media-descriptor="mediaDescriptor"/>-->

<!--      <clipboard-content v-if="block.content" :content="block.content"/>-->

<!--      <div class="numeric-input sm-room-above">-->
<!--        <label>-->
<!--          <input v-model="enteredValue"-->
<!--              class="form-control"-->
<!--              :disabled="!isFocused"-->
<!--              type="number"-->
<!--              min="0"-->
<!--              :maxlength="maxDigits"-->
<!--              :max="maxValue"-->
<!--              @keyup="checkIsValid">-->
<!--        </label>-->
<!--        <small style="display:block"-->
<!--            class="form-text"-->
<!--            :class="{'text-muted': isValid , 'text-danger': !isValid}">-->
<!--          Must be between 0-{{maxValue}}-->
<!--        </small>-->
<!--      </div>-->
<!--      <BlockActionButtons-->
<!--          :isFocused="isFocused"-->
<!--          :isDisabled="!isValid"-->
<!--          :onNextClicked="submitAnswer"-->
<!--          :isBlockInteraction="isBlockInteraction"-->
<!--          :onCancelClicked="onActiveBlockChanged"/>-->
<!--    </div>-->
<!--  </div>-->

  <div class="card">
    <div class="card-body sm-padding-below font-roboto">
      <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.name}}</h4>
      <p class="card-text">
        <!--        <multimedia :key="block.id.toString()" :media-descriptor="mediaDescriptor"/>&ndash;&gt;-->
        {{prompt.block.label}}
      </p>
      <input v-model="enteredValue"
                    class="form-control"
                    :disabled="!isFocused"
                    type="number"
                    min="0"
                    :maxlength="maxDigits"
                    :max="maxValue"
                    @keyup="checkIsValid" />
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
// import lodash from 'lodash'
import { IContext, NumericPrompt } from '@floip/flow-runner'
import BlockActionButtons from '../BlockActionButtons.vue'
// import clipboardQuestionExecutor from '../../mixins/ClipboardQuestionExecutor'
// import Multimedia from './Multimedia'
// import MediaDescribable from '../../mixins/MediaDescribable'

export default {
  name: 'NumericQuestionBlock',
  components: {
    // ClipboardContent: () => import(/* webpackChunkName:"/js/clipboard" */ './ClipboardContent'),
    BlockActionButtons,
    // Multimedia,
  },
  // mixins: [
  //   clipboardQuestionExecutor,
  //   MediaDescribable,
  // ],

  props: {
    context: IContext,
    prompt: NumericPrompt,
    goNext: Function,
    // /** @type NumericQuestionBlockPrompt */
    // currentQuestion: {},
    //
    // /** @type BlockInteraction */
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
  mounted() {
    // if (this.isBlockInteraction || !lodash.isNil(this.blockInteraction.blockQuestionInteraction.numericValue)) {
    //   if (lodash.isNil(this.blockInteraction.blockQuestionInteraction.numericValue)) {
    //     this.enteredValue = ''
    //   } else {
    //     this.enteredValue = this.blockInteraction.blockQuestionInteraction.numericValue.toString()
    //   }
    // }
  },
  data() {
    return {
      enteredValue: '',
      isValid: true,
      wasSelectedIndexChanged: false,
    }
  },
  computed: {
    block() {
      // return this.blockInteraction.block
      this.prompt.block
    },
    maxDigits() {
      // return this.prompt.block.maxNumericDigits
      return 3
    },
    maxValue() {
      return Math.pow(10, 0 + this.maxDigits) - 1
    },
  },
  methods: {
    checkIsValid() {
      // this.wasSelectedIndexChanged = true
      //
      // // Needs to restrict entry to integer values, and an empty string should not be interpreted as a 0
      // if (this.enteredValue === '') {
      //   this.enteredValue = ''
      // } else {
      //   this.enteredValue = +this.enteredValue
      // }
      //
      // this.isValid = ((`${this.enteredValue}`).length <= this.maxDigits)
      //       && (this.enteredValue >= 0)
    },

    submitAnswer() {
      this.prompt.value = 11
      this.prompt.fulfill()
      this.goNext()
      // this.executeSubmitAnswer((currentQuestion) => {
      //   currentQuestion.submitAnswer(`${this.enteredValue}`)
      //   this.executeBlock()
      //   this.reset()
      // })
    },

    reset() {
      // this.enteredValue = ''
      // this.isValid = true
      // this.wasSelectedIndexChanged = false
    },
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

  .card-text {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
    margin: 0;
  }

  .numeric-input {
    margin-left: 16px;
    margin-right: 16px;
    padding-bottom: 16px;
  }
</style>
