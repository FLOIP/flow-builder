<template>
  <validation-message
    v-if="hasIvr"
    :message-key="`block/${block.uuid}/config/ivr/max_duration_seconds`">
    <template #input-control="{ isValid }">
      <numeric-editor
        v-model.number="duration"
        :regex-numeric-filtering="'[0-9]'"
        :label="trans('flow-builder.max-duration-in-seconds')"
        :placeholder="trans('flow-builder.enter-value')"
        :valid-state="isValid"
        class="max-duration-seconds-editor" />
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
export class MaxDurationSecondsEditor extends mixins(Lang) {
  @Prop({type: Object, required: true}) readonly block!: IBlock
  @Prop({type: Boolean, default: true}) readonly hasIvr!: boolean

  readonly defaultMaxDuration = 60

  get duration(): number {
    return get(this.block, 'config.ivr.max_duration_seconds', '')
  }

  set duration(value: number) {
    this.$emit('commitMaxDurationChange', value)
  }

  created(): void {
    if (!this.duration) {
      this.duration = this.defaultMaxDuration
    }
  }
}

export default MaxDurationSecondsEditor
</script>
