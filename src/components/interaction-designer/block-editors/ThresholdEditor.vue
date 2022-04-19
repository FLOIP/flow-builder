<template>
  <validation-message :message-key="`block/${block.uuid}/config/accuracy_threshold_meters`">
    <template #input-control="{ isValid }">
      <div class="threshold-editor">
        <float-editor
          v-model.number="threshold"
          :min="0"
          :regex-float-filtering="'[0-9.,]'"
          :label="'flow-builder.accuracy-threshold-in-meters' | trans"
          :placeholder="'flow-builder.enter-value' | trans"
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

@Component({})
export class ThresholdEditor extends mixins(Lang) {
  @Prop({type: Object, required: true}) readonly block!: object

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
