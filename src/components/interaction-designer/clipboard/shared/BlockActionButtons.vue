<template>
  <div
    v-if="isFocused"
    class="block-action-buttons row">
    <div
      v-if="isBlockInteraction && isFocused"
      class="col-md-6">
      <button
        class="btn btn-secondary btn-block sm-room-below"
        @click.stop="clickCancel">
        {{ 'flow-builder.cancel' | trans }}
      </button>
    </div>
    <div
      v-if="isFocused"
      :class="{'col-md-6': isBlockInteraction, 'col-md-12': !isBlockInteraction}">
      <button
        class="btn btn-primary btn-block sm-room-below"
        :disabled="isDisabled"
        @click.stop="onNextClicked">
        {{ primaryButtonText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import Lang from '@/lib/filters/lang'

@Component({})
export class BlockActionButtons extends mixins(Lang) {
  @Prop({type: Boolean, required: true}) readonly isFocused!: boolean
  @Prop({type: Boolean, required: true}) readonly isDisabled!: boolean
  @Prop({type: Function, required: true}) readonly onNextClicked!: () => void
  @Prop({type: Boolean, required: true}) readonly isBlockInteraction!: boolean
  @Prop({type: Function, required: true}) readonly onCancelClicked!: () => void

  get primaryButtonText(): string {
    // window.addEventListener()
    if (this.isBlockInteraction) {
      return 'Revise'
    }
    return 'Next'
  }

  clickCancel(): void {
    if (typeof this.onCancelClicked === 'function') {
      this.onCancelClicked()
    }
  }
}

export default BlockActionButtons
</script>

<style lang="scss" scoped>
  button {
  }

  .block-action-buttons {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 6px;
  }

  .btn-block {
    margin: 0;
  }
</style>
