<template>
    <div>
      <div class="d-flex justify-content-between">
        <slot name="title"></slot>
        <i v-if="!isFocused && !isComplete" @click="editBlock"
           class="glyphicon glyphicon-pencil cursor-pointer"></i>
      </div>
      <slot name="content"></slot>
      <div>
        <textarea
            v-model="enteredValue"
            rows="4"
            cols="50"
            class="form-control"
            :class="{'is-invalid': errorMsg}"
            :disabled="!isFocused"
            @keyup="checkIsValid"/>
        <div v-if="errorMsg" class="invalid-feedback">
          <small>{{errorMsg}}</small>
        </div>
      </div>
      <block-action-buttons
        class="mt-3"
        :is-disabled="!!errorMsg"
        :is-focused="isFocused"
        :on-next-clicked="submitAnswer"
        :is-block-interaction="isBlockInteraction"
        :on-cancel-clicked="onCancel"
      />
    </div>
</template>

<script lang="ts">
import BlockActionButtons from '../shared/BlockActionButtons.vue'
import { namespace } from 'vuex-class';
import Component, { mixins } from 'vue-class-component';
import Lang from '@/lib/filters/lang';
import { Prop } from 'vue-property-decorator';
import { IPrompt } from '@floip/flow-runner';

const clipboardVuexNamespace = namespace('clipboard')

@Component({
  components: {
    BlockActionButtons
  },
})
export default class Numeric extends mixins(Lang) {
  @Prop() index!: number
  @Prop() isComplete!: boolean
  @Prop() goNext!: Function
  @Prop() onEditComplete!: Function

  isBlockInteraction = false
  enteredValue = ''
  backUpValue = ''
  errorMsg: string | null = null

  get isFocused() {
    return this.isBlockFocused(this.index)
  }
  get prompt() {
    return this.getBlockPrompt(this.index)
  }

  checkIsValid() {
    try {
      this.prompt.validate(this.enteredValue)
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
      this.prompt.value = this.enteredValue
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
    this.enteredValue = this.backUpValue
    this.errorMsg = ''
  }

  @clipboardVuexNamespace.Getter isBlockFocused!: (index: number) => boolean
  @clipboardVuexNamespace.Getter getBlockPrompt!: (index: number) => IPrompt<any>
  @clipboardVuexNamespace.Action setIsFocused!: (data: { index: number, value: boolean }) => void
  @clipboardVuexNamespace.Action setLastBlockUnEditable!: () => void
  @clipboardVuexNamespace.Action setLastBlockEditable!: () => void
}
</script>
