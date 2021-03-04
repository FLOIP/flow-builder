<template>
  <div class="clipboard-block-no-padding card-z1 font-roboto" :class="{'disabled-alpha': !isFocused}">
    <div class="card-body">
      <h4 class="card-title font-weight-regular text-color-title">
        {{block.title}}
      </h4>

      <multimedia :key="block.id.toString()" :media-descriptor="mediaDescriptor"/>

      <clipboard-content v-if="block.content" :content="block.content"/>

      <div class="numeric-input">
        <label class="numeric-input-label">
          <textarea
              v-model="enteredValue"
              rows="4"
              cols="50"
              class="form-control"
              :disabled="!isFocused"
              @keyup="checkIsValid"/>
        </label>
        <small v-if="errorMessage"
            style="display:block"
            class="sm-room-below form-text"
            :class="{'text-muted': errorMessage , 'text-danger': !errorMessage}">
          <span>{{errorMessage}}</span>
        </small>
      </div>

      <block-action-buttons
          :is-disabled="errorMessage"
          :is-focused="isFocused"
          :on-next-clicked="submitAnswer"
          :is-block-interaction="isBlockInteraction"
          :on-cancel-clicked="onActiveBlockChanged"/>
    </div>
  </div>
</template>
<script>
  import BlockActionButtons from '../BlockActionButtons'
  import clipboardQuestionExecutor from '../../mixins/ClipboardQuestionExecutor'
  import Multimedia from './Multimedia'
  import MediaDescribable from '../../mixins/MediaDescribable'

  export default {
    name: 'OpenQuestionBlock',
    components: {
      ClipboardContent: () => import(/* webpackChunkName:"/js/clipboard" */ './ClipboardContent'),
      BlockActionButtons,
      Multimedia,
    },
    mixins: [
      clipboardQuestionExecutor,
      MediaDescribable,
    ],
    props: {
      /** @type OpenQuestionBlockPrompt */
      currentQuestion: {},

      /** @type BlockInteraction */
      blockInteraction: Object,

      /** @type FlowState */
      flowState: Object,

      /** The root package of Clipboard */
      viamo: Object,

      executeBlock: {},
      isBlockInteraction: Boolean,
      activeBlockInteractionIndex: Number,
      onActiveBlockChanged: Function,
      isFocused: Boolean,
    },
    data() {
      return {
        enteredValue: '',
        wasSelectedIndexChanged: false,
        errorMessage: null,
      }
    },
    computed: {
      block() {
        return this.blockInteraction.block
      },
    },
    mounted() {
      if (this.isBlockInteraction || this.blockInteraction.blockQuestionInteraction.openText) {
        this.enteredValue = this.blockInteraction.blockQuestionInteraction.openText
      }
    },
    methods: {
      checkIsValid() {
        this.wasSelectedIndexChanged = true
        try {
          this.block.validate(this.enteredValue)
          this.errorMessage = null
        } catch (e) {
          this.handleErrorOnSubmission(e)
        }
      },

      submitAnswer() {
        try {
          this.block.validate(this.enteredValue)
          this.executeSubmitAnswer((currentQuestion) => {
            try {
              currentQuestion.submitAnswer(this.enteredValue)
              this.executeBlock()
              this.reset()
            } catch (e) {
              this.handleErrorOnSubmission(e)
            }
          })
        } catch (e) {
          this.handleErrorOnSubmission(e)
        }
      },

      handleErrorOnSubmission(e) {
        if (e.userSafeMessage) {
          console.error(e.userSafeMessage.devMessage, e)
          this.errorMessage = e.userSafeMessage.userMessage || 'An error has occurred'
        } else {
          console.error(e)
        }
      },

      reset() {
        this.enteredValue = ''
        this.errorMessage = null
        this.wasSelectedIndexChanged = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .text-small {
    font-size: 80%;
  }

  .invalid {
    margin-top: .25rem;
    color: #dc3545;
  }

  .card-title {
    padding-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    margin: 0;
  }

  .card-text {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 0 !important;
    margin: 0;
  }

  .numeric-input {
    margin-left: 16px;
    margin-right: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .numeric-input-label {
    width:100%;
    margin-bottom: 0
  }
</style>