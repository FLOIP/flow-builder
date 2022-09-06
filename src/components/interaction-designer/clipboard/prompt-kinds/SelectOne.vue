<template>
  <div class="select-one">
    <div class="d-flex justify-content-between">
      <slot name="title" />
      <i
        v-if="!isFocused && !isComplete"
        class="glyphicon glyphicon-pencil cursor-pointer"
        @click="editBlock" />
    </div>
    <slot name="content" />

    <div class="form-group">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="form-check">
        <input
          :id="index"
          v-model="selectedItem"
          type="radio"
          name="select-one"
          class="form-check-input"
          :class="{'is-invalid': errorMsg}"
          :value="option.key"
          :disabled="!isFocused"
          @change="checkIsValid(selectedItem)">
        <label
          class="form-check-label"
          :for="index">{{ option.value }}</label>
      </div>
      <div
        v-if="errorMsg"
        class="text-danger">
        <small>{{ errorMsg }}</small>
      </div>
    </div>

    <block-action-buttons
      :is-disabled="false"
      :is-focused="isFocused"
      :on-next-clicked="submitAnswer"
      :is-block-interaction="isBlockInteraction"
      :on-cancel-clicked="onCancel" />
  </div>
</template>

<script lang="ts">
import {mixins, Options} from 'vue-class-component'
import {Lang} from '@/lib/filters/lang'
import {Context} from '@floip/flow-runner'
import {PromptKindMixin} from '@/components/interaction-designer/clipboard/shared/PromptKindMixin'
import BlockActionButtons from '../shared/BlockActionButtons.vue'

@Options({
  components: {
    BlockActionButtons,
  },
})
export default class SelectOne extends mixins(Lang, PromptKindMixin) {
  selectedItem: string | null = null
  options: {key: string, value: string}[] = []
  backUpValue = ''

  mounted() {
    this.setOptions()
  }

  setOptions() {
    const {choices} = this.prompt.config
    choices.forEach((choice: {key: string, value: string}) => {
      try {
        const option: string = Context.prototype.getResource.call(this.context, choice.value).getText()
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
    this.checkIsValid(this.selectedItem)
    await this.submitAnswerCommon(this.selectedItem)
  }

  editBlock() {
    this.editBlockCommon()
    this.backUpValue = this.prompt.value
  }

  onCancel() {
    this.onCancelCommon()
    this.selectedItem = this.backUpValue
  }
}
</script>
