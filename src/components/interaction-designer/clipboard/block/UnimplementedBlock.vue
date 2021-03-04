<template>
  <div class="card-body">
    <div class="form-group">
      <h4 class="no-room-above">{{currentQuestion.unimplementedBlock.actualClassName}} is not implemented yet</h4>
      <p>
        For test purposes, you can choose which output to follow here, but the desired outcomes may not occur due to this block not executing.
      </p>
    </div>

    <hr>

    <h4 class="card-title">{{ block.title }}</h4>
    <clipboard-content v-if="block.content" :content="block.content"/>

    <div class="list-group sm-room-above">
      <div v-for="(output, index) in options">
        <button
            type="button"
            class="list-group-item list-group-item-action"
            :class="isActive[index]"
            @click="selectedItemIndex = index">
          <i class="material-icons selectionIcon">{{ isSelected(index) ? "radio_button_checked" : "radio_button_unchecked" }}</i>
          {{outputTitle(output)}}
        </button>
      </div>
    </div>
    <br>

    <BlockActionButtons
        :isDisabled="isDisabled"
        :isFocused="isFocused"
        :onNextClicked="submitAnswer"
        :isBlockInteraction="isBlockInteraction"
        :onCancelClicked="onActiveBlockChanged"/>
  </div>
</template>
<script>
  import lodash from 'lodash'

  import BlockActionButtons from "../BlockActionButtons";
  import ArrayListUtils from "../../mixins/ArrayListUtils";

  export default {
    name: 'UnimplementedBlock',
    components: {
      ClipboardContent: () => import(/* webpackChunkName:"/js/clipboard" */ './ClipboardContent'),
      BlockActionButtons,
    },
    props: {
      currentQuestion: {},
      executeBlock: {},
      isBlockInteraction: Boolean,
      isFocused: Boolean,

      /** The root package of Clipboard */
      viamo: Object
    },
    mixins: [ArrayListUtils],
    data() {
      return {
        selectedItemIndex: -1
      }
    },
    computed: {
      block() {
        return this.blockInteraction.block
      },
      options() {
        return this.kotlinArrayListToArray(this.block.outputs)
      },
      isDisabled() {
        return this.selectedItemIndex === -1
      },
      isActive() {
        return lodash.map(this.currentQuestion.options,
            (option, index) => index === this.selectedItemIndex ? "active" : "")
      }
    },
    methods: {
      submitAnswer() {
        try {
          this.currentQuestion.submitAnswer(this.currentQuestion.options[this.selectedItemIndex])
          this.executeBlock()
          this.reset()
        } catch (exception) {
          this.errorFeedback = (exception.message)
          return console.error(exception.name, exception.message, exception.stack);
        }
      },
      reset() {
        this.selectedItemIndex = -1
      },
      isSelected(index) {
        return this.selectedItemIndex === index
      },
      outputTitle(output) {
        if (output.block !== null && output.block.title !== "") {
          return output.block.title
        } else if (output.title !== "") {
          return output.title
        } else if (output.className === "UnimplementedBlock") {
          return output.block.actualClassName
        } else {
          return output.block.className
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  i {
    vertical-align: middle;
  }

  .selectionIcon {
    margin-right: 5px;
  }

  .card-title {
    font-weight: bold;
  }
</style>