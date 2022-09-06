<template>
  <div
    v-if="hasIvr"
    class="end-recording-digits-editor">
    <validation-message
      :message-key="`block/${block.uuid}/config/ivr/end_recording_digits`">
      <template #input-control="{ isValid }">
        <keypad-digits-selector
          v-model="endRecordingDigits"
          :label="trans('flow-builder.end-recording-by-pressing')"
          :placeholder="trans('flow-builder.enter-value')"
          :valid-state="isValid" />
      </template>
    </validation-message>
  </div>
</template>

<script lang="ts">
import {Prop} from 'vue-property-decorator'
import {mixins, Options} from 'vue-class-component'
import {IBlock} from '@floip/flow-runner'
import {Lang} from '@/lib/filters/lang'

@Options({})
export class EndRecordingDigitsEditor extends mixins(Lang) {
  @Prop({type: Boolean, default: true}) hasIvr!: boolean;
  @Prop({type: Object, required: true}) block!: IBlock;

  get endRecordingDigits(): string {
    return this.block?.config?.ivr?.end_recording_digits ?? ''
  }

  set endRecordingDigits(value: string) {
    this.$emit('commitEndRecordingDigitsChange', value)
  }
}

export default EndRecordingDigitsEditor
</script>
