<template>
  <validation-message
    :message-key="`block/${block.uuid}/config/ivr/max_duration_seconds`">
    <template #input-control="{ isValid }">
      <div
        v-if="hasIvr"
        class="max-duration-seconds-editor">
        <numeric-editor
          v-model.number="duration"
          :regex-numeric-filtering="'[0-9]'"
          :label="'flow-builder.max-duration-in-seconds' | trans"
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
export class MaxDurationSecondsEditor extends mixins(Lang) {
  @Prop({type: Object, required: true}) readonly block!: object
  @Prop({type: Boolean, default: true}) readonly hasIvr!: boolean

  readonly defaultMaxDuration = 0

  get duration(): number {
    return get(this.block, 'config.ivr.max_duration_seconds', '')
  }

  set duration(value: number) {
    this.$emit('commitMaxDurationChange', value)
  }
}

export default MaxDurationSecondsEditor
</script>
