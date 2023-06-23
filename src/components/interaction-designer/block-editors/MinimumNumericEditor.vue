<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/config/validation_minimum`">
    <div class="minimum-numeric-editor">
      <numeric-editor
        v-model.number="minValue"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.minimum-value-(inclusive)' | trans"
        :placeholder="'flow-builder.enter-value' | trans"
        :valid-state="isValid" 
        :data-cy="'Num-miniValue'"/>
    </div>
  </validation-message>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import Lang from '@/lib/filters/lang'
import Component, {mixins} from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {IBlock} from '@floip/flow-runner'

@Component({})
export class MinimumNumericEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  get minValue() {
    return this.block.config.validation_minimum
  }
  set minValue(value) {
    this.$emit('commitValidationMinimumChange', value)
  }
}
export default MinimumNumericEditor
</script>
