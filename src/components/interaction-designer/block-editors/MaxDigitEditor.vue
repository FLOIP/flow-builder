<template>
  <validation-message
    v-if="hasIvr"
    :message-key="`block/${block.uuid}/config/ivr/max_digits`">
    <template #input-control="{ isValid }">
      <div class="max-digit-editor">
        <numeric-editor
          v-model.number="maxDigits"
          :regex-numeric-filtering="'[0-9]'"
          :label="'flow-builder.maximum-digits' | trans"
          :placeholder="'flow-builder.enter-value' | trans"
        :tooltip-hint="'flow-builder.max-digits-help-text' | trans"
          :valid-state="isValid" />
      </div>
    </template>
  </validation-message>
</template>

<script lang="ts">
import {get} from 'lodash'
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import Lang from '@/lib/filters/lang'
import {IBlock} from '@floip/flow-runner'

@Component({})
export class MaxDigitEditor extends mixins(Lang) {
  @Prop({type: Object, required: true}) readonly block!: IBlock
  @Prop({type: Boolean, default: true}) readonly hasIvr!: boolean

  get maxDigits(): number {
    return get(this.block, 'config.ivr.max_digits', '')
  }
  set maxDigits(value: number) {
    this.$emit('commitMaxDigitsChange', value)
  }
}

export default MaxDigitEditor
</script>
