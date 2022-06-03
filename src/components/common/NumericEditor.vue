<template>
  <div class="numeric-editor">
    <label class="text-primary mb-0 d-flex justify-content-between">
      {{ label }}
      <font-awesome-icon
        v-if="tooltipHint"
        v-b-tooltip.hover="tooltipHint"
        :icon="['fas', 'info-circle']"
        class="fa-btn text-primary" />
    </label>
    <div class="small mb-2">
      {{ subTitle }}
    </div>
    <div>
      <input
        type="number"
        min="0"
        class="form-control"
        :class="{ 'is-invalid': isInvalid }"
        :placeholder="placeholder"
        :value="value"
        @keypress="filterNumeric"
        @keydown="$emit('keydown', $event)"
        @input="$emit('input', $event.target.value)">
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import Lang from '@/lib/filters/lang'

@Component({})
export class NumericEditor extends mixins(Lang) {
  @Prop({type: Boolean}) readonly validState?: boolean
  @Prop({type: [String, Number], required: true}) readonly label!: string | number
  @Prop({type: String, default: ''}) readonly placeholder!: string
  @Prop({type: [String, Number]}) readonly value?: string | number
  @Prop({type: String, default: '[0-9-]'}) readonly regexNumericFiltering!: string
  @Prop({type: String, default: ''}) readonly subTitle!: string
  @Prop({type: String, default: ''}) readonly tooltipHint!: string

  get isInvalid(): boolean {
    // Strict comparison, because `undefined` doesn't mean invalid
    return typeof this.validState === 'boolean' && !this.validState
  }

  filterNumeric(e: KeyboardEvent): void {
    if ((new RegExp(this.regexNumericFiltering, 'g').exec(e.key)) === null) {
      e.preventDefault()
    }
  }
}

export default NumericEditor
</script>
