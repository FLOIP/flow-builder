import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { IContext, IPrompt } from '@floip/flow-runner';

const clipboardVuexNamespace = namespace('clipboard')

@Component
export class PromptKindMixin extends Vue {
  @Prop() index!: number
  @Prop() isComplete!: boolean
  @Prop() goNext!: Function
  @Prop() onEditComplete!: Function
  @Prop() context!: IContext

  isBlockInteraction = false

  get isFocused() {
    return this.isBlockFocused(this.index)
  }

  get prompt() {
    return this.getBlockPrompt(this.index)
  }

  editBlock() {
    this.setLastBlockUnEditable()
    this.setIsFocused({ index: this.index, value: true })
    this.isBlockInteraction = true
  }

  onCancel() {
    this.setLastBlockEditable()
    this.setIsFocused({ index: this.index, value: false })
    this.isBlockInteraction = false
  }

  @clipboardVuexNamespace.Getter isBlockFocused!: (index: number) => boolean
  @clipboardVuexNamespace.Getter getBlockPrompt!: (index: number) => IPrompt<any>
  @clipboardVuexNamespace.Action setIsFocused!: (data: { index: number, value: boolean }) => void
  @clipboardVuexNamespace.Action setLastBlockUnEditable!: () => void
  @clipboardVuexNamespace.Action setLastBlockEditable!: () => void
}
