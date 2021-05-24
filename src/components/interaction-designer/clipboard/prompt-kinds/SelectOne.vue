<template>
    <div>
      <div class="d-flex justify-content-between">
        <slot name="title"></slot>
        <i v-if="!isFocused && !isComplete" @click="editBlock"
           class="glyphicon glyphicon-pencil cursor-pointer"></i>
      </div>
      <slot name="content"></slot>

    <div class="form-group">
      <div v-for="(option, index) in options" :key="index" class="form-check">
        <input
          type="radio"
          name="select-one"
          class="form-check-input"
          :class="{'is-invalid': errorMsg}"
          :value="option.key"
          :disabled="!isFocused"
          :id="index"
          v-model="selectedItem"
          @change="checkIsValid"
        />
        <label class="form-check-label" :for="index">{{option.value}}</label>
      </div>
      <div v-if="errorMsg" class="text-danger">
        <small>{{errorMsg}}</small>
      </div>
    </div>

    <block-action-buttons
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
import Lang from '@/lib/filters/lang';
import { Prop } from 'vue-property-decorator';
import { Context, IContext } from '@floip/flow-runner';
import { PromptKindMixin } from '@/components/interaction-designer/clipboard/shared/PromptKindMixin';

@Component({
  components: {
    BlockActionButtons
  },
})
export default class Numeric extends mixins(Lang, PromptKindMixin) {
  selectedItem: string | null = null
  options: {key: string, value: string}[] = []
  backUpValue = ''
  errorMsg: string | null = null


  mounted() {
    this.setOptions();
  }

  setOptions() {
    const { choices } = this.prompt.config
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

  checkIsValid() {
    try {
      this.prompt.validate(this.selectedItem)
      this.errorMsg = ''
    } catch (e) {
      this.errorMsg = e.message
    }
  }

  async submitAnswer() {
    this.checkIsValid()
    if (!this.errorMsg) {
      if (this.isBlockInteraction) {
        await this.onEditComplete(this.index)
        this.isBlockInteraction = false
      }
      this.prompt.value = this.selectedItem
      this.setIsFocused({ index: this.index, value: false })
      this.goNext()
    }
  }

  editBlock() {
    this.setLastBlockUnEditable()
    this.setIsFocused({ index: this.index, value: true })
    this.isBlockInteraction = true
    this.backUpValue = this.prompt.value
  }

  onCancel() {
    this.setLastBlockEditable()
    this.setIsFocused({ index: this.index, value: false })
    this.isBlockInteraction = false
    this.selectedItem = this.backUpValue
    this.errorMsg = ''
  }
}
</script>

