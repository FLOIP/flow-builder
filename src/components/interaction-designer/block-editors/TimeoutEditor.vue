<template>
  <validation-message
    :message-key="`block/${block.uuid}/config/accuracy_timeout_seconds`">
    <template #input-control="{ isValid }">
      <div class="timeout-editor" data-cy="accuracy-timeout--editor">
        <numeric-editor
          v-model.number="timeout"
          :regex-numeric-filtering="'[0-9]'"
          :label="'flow-builder.accuracy-timeout-in-seconds' | trans"
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
import {IBlock} from '@floip/flow-runner'

@Component({})
export class TimeoutEditor extends mixins(Lang) {
  @Prop({type: Object, required: true}) readonly block!: IBlock

  readonly defaultValue = 120

  get timeout(): number {
    return get(this.block, 'config.accuracy_timeout_seconds', this.defaultValue)
  }

  set timeout(value: number) {
    this.$emit('commitAccuracyTimeoutSecondsChange', value)
  }
}

export default TimeoutEditor
</script>
