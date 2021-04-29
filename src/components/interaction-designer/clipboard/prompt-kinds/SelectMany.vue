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
            type="checkbox"
            name="select-many"
            class="form-check-input"
            :class="{'is-invalid': errorMsg}"
            :id="index"
            :value="option.key"
            :disabled="!isFocused"
            v-model="selectedChoices"
            @change="checkIsValid"
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
import BlockActionButtons from '../shared/BlockActionButtons.vue'
import Component, { mixins } from 'vue-class-component';
import Lang from '@/lib/filters/lang';
import { Prop } from 'vue-property-decorator';
import { Context, IContext, IPrompt } from '@floip/flow-runner';
import { namespace } from 'vuex-class';

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
  @Prop() context!: IContext

  isBlockInteraction = false
  selectedChoices: string[] = []
  options: {key: string, value: string}[] = []
  backUpValue = []
  errorMsg: string | null = null

  get isFocused() {
    return this.isBlockFocused(this.index)
  }
  get prompt() {
    return this.getBlockPrompt(this.index)
  }

  mounted() {
    this.setOptions();
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

  checkIsValid() {
    try {
      this.prompt.validate(this.selectedChoices)
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
      this.prompt.value = this.selectedChoices
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
    this.selectedChoices = this.backUpValue
    this.errorMsg = ''
  }

  @clipboardVuexNamespace.Getter isBlockFocused!: (index: number) => boolean
  @clipboardVuexNamespace.Getter getBlockPrompt!: (index: number) => IPrompt<any>
  @clipboardVuexNamespace.Action setIsFocused!: (data: { index: number, value: boolean }) => void
  @clipboardVuexNamespace.Action setLastBlockUnEditable!: () => void
  @clipboardVuexNamespace.Action setLastBlockEditable!: () => void
}
</script>
