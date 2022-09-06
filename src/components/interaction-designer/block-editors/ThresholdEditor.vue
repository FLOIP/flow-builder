<template>
  <ValidationMessage :message-key="`block/${block.uuid}/config/accuracy_threshold_meters`">
    <template #input-control="{ isValid }">
      <div class="threshold-editor">
        <float-editor
          v-model.number="threshold"
          :min="0"
          :regex-float-filtering="'[0-9.,]'"
          :label="trans('flow-builder.accuracy-threshold-in-meters')"
          :placeholder="trans('flow-builder.enter-value')"
          :valid-state="isValid" />
      </div>
    </template>
  </ValidationMessage>
</template>

<script lang="ts">
import {get} from 'lodash'
import {mixins, Options} from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {Lang} from '@/lib/filters/lang'
import {IBlock} from '@floip/flow-runner'

@Options({})
export class ThresholdEditor extends mixins(Lang) {
  @Prop({type: Object, required: true}) readonly block!: IBlock

  readonly defaultValue = 5.0

  get threshold(): number {
    return get(this.block, 'config.accuracy_threshold_meters', this.defaultValue)
  }

  set threshold(value: number) {
    this.$emit('commitAccuracyThresholdMetersChange', value)
  }
}

export default ThresholdEditor
</script>
