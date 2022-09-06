<template>
  <validation-message
    v-if="hasIvr"
    :message-key="`block/${block.uuid}/config/ivr/max_digits`">
    <template #input-control="{ isValid }">
      <div class="max-digit-editor">
        <numeric-editor
          v-model.number="maxDigits"
          :regex-numeric-filtering="'[0-9]'"
          :label="trans('flow-builder.maximum-digits')"
          :placeholder="trans('flow-builder.enter-value')"
        :tooltip-hint="trans('flow-builder.max-digits-help-text')"
          :valid-state="isValid" />
      </div>
    </template>
  </validation-message>
</template>

<script lang="ts">
import {get} from 'lodash'
import {mixins, Options} from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {Lang} from '@/lib/filters/lang'
import {IBlock} from '@floip/flow-runner'

@Options({})
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
