<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/config/validation_maximum`">
    <div class="maximum-numeric-editor">
      <numeric-editor
        v-model.number="maxValue"
        :regex-numeric-filtering="'[0-9]'"
        :label="trans('flow-builder.maximum-value-(inclusive)')"
        :placeholder="trans('flow-builder.enter-value')"
        :valid-state="isValid" />
    </div>
  </validation-message>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import {Lang} from '@/lib/filters/lang'
import {mixins, Options} from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {IBlock} from '@floip/flow-runner'

@Options({})
export class MaximumNumericEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  get maxValue() {
    return this.block.config.validation_maximum
  }
  set maxValue(value) {
    this.$emit('commitValidationMaximumChange', value)
  }
}
export default MaximumNumericEditor
</script>
