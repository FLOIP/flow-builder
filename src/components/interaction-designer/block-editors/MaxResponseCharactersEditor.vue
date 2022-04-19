<template>
  <div class="max-response-characters-editor">
    <span class="d-flex mb-2">
      <input
        v-model="shouldShowMaxResponseCharField"
        type="checkbox"
        class="align-self-center">
      <p class="m-0 ml-2">{{ 'flow-builder.max-response-prompt' | trans }}</p>
    </span>
    <validation-message
      v-if="shouldShowMaxResponseCharField"
      :message-key="`block/${block.uuid}/config/text/max_response_characters`">
      <template #input-control="{ isValid }">
        <div
          v-if="hasText"
          class="block-max-response-characters">
          <numeric-editor
            v-model.number="maxResponse"
            :regex-numeric-filtering="'[0-9]'"
            :label="'flow-builder.max-response-characters' | trans"
            :placeholder="'flow-builder.enter-value' | trans"
            :valid-state="isValid" />
          <small class="text-muted">
            {{ 'flow-builder.unlimited-if-not-defined-or-set-as-zero' | trans }}
          </small>
        </div>
      </template>
    </validation-message>
  </div>
</template>

<script lang="ts">
import {get} from 'lodash'
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import {IBlock} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'

@Component({})
export class MaxResponseCharactersEditor extends mixins(Lang) {
  @Prop({type: Boolean, default: true}) readonly hasText!: boolean
  @Prop({type: Object, required: true}) readonly block!: IBlock

  defaultMaxLength = 0
  shouldShowMaxResponseCharField = false

  get maxResponse(): number {
    return get(this.block, 'config.text.max_response_characters', '')
  }

  set maxResponse(value: string | number) {
    this.$emit('commitMaxResponseCharactersChange', Number(value))
  }
}

export default MaxResponseCharactersEditor
</script>
