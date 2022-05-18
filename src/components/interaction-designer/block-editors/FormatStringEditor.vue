<template>
  <validation-message :message-key="`block/${block.uuid}/config/format_string`">
    <template #input-control="{ isValid }">
      <div class="format-string-editor">
        <text-editor
          v-model="formatString"
          :label="'flow-builder.format-string' | trans"
          :placeholder="'flow-builder.enter-format-string' | trans"
          :valid-state="isValid" />
        <small class="text-muted">
          {{ 'flow-builder.format-string-hint' | trans }}
        </small>
      </div>
    </template>
  </validation-message>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import Lang from '@/lib/filters/lang'
import {IBlock} from '@floip/flow-runner'

@Component({})
export class FormatStringEditor extends mixins(Lang) {
  @Prop({type: Object, required: true}) readonly block!: IBlock

  get formatString(): string {
    return this.block.config.format_string
  }

  set formatString(value: string) {
    this.$emit('commitFormatStringChange', value)
  }
}

export default FormatStringEditor
</script>
