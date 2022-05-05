<template>
  <div class="select-many">
    <div class="d-flex justify-content-between">
      <slot name="title"></slot>
      <i v-if="!isFocused && !isComplete" @click="editBlock"
         class="glyphicon glyphicon-pencil cursor-pointer"></i>
    </div>
    <slot name="content"></slot>

    <div class="form-group">
      <div v-for="(option, index) in options" :key="index" class="form-check">
        <input
          type="checkbox"
          name="select-many"
          class="form-check-input"
          :class="{'is-invalid': errorMsg}"
          :id="index"
          :value="option.key"
          :disabled="!isFocused"
          v-model="selectedChoices"
          @change="checkIsValid(selectedChoices)"
        />
        <label class="form-check-label" :for="index">{{option.value}}</label>
      </div>
      <div v-if="errorMsg" class="text-danger">
        <small>{{errorMsg}}</small>
      </div>
    </div>

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
import Component, {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {Context} from '@floip/flow-runner'
import {PromptKindMixin} from '@/components/interaction-designer/clipboard/shared/PromptKindMixin'
import BlockActionButtons from '../shared/BlockActionButtons.vue'

@Component({
  components: {
    BlockActionButtons
  },
})
export default class SelectMany extends mixins(Lang, PromptKindMixin) {
  selectedChoices: string[] = []
  options: {key: string, value: string}[] = []
  backUpValue = []

  mounted() {
    this.setOptions()
  }

  setOptions() {
    const { choices } = this.prompt.config
    choices.forEach((choice: {key: string, value: string}) => {
      try {
        const option = Context.prototype.getResource.call(this.context, choice.value).getText()
        this.options.push({
          key: choice.key,
          value: option,
        })
      } catch (e) {
        console.warn('error fetching resource ')
      }
    })
  }

  async submitAnswer() {
    this.checkIsValid(this.selectedChoices)
    await this.submitAnswerCommon(this.selectedChoices)
  }

  editBlock() {
    this.editBlockCommon()
    this.backUpValue = this.prompt.value
  }

  onCancel() {
    this.onCancelCommon()
    this.selectedChoices = this.backUpValue
  }
}
</script>
