<template>
  <div class="float-editor">
    <label class="text-primary">{{ label }}</label>
    <div>
      <input
        type="number"
        :min="min"
        class="form-control"
        :class="{ 'is-invalid': isInvalid }"
        :placeholder="placeholder"
        :value="value"
        :step="step"
        @keypress="filterFloat"
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
export class FloatEditor extends mixins(Lang) {
  @Prop({type: [String, Number], required: true}) readonly label!: string | number
  @Prop({type: String, default: ''}) readonly placeholder!: string
  @Prop({type: String, default: '0.1'}) readonly step!: string
  @Prop({type: [String, Number], required: true}) readonly value!: string | number
  // Meaning it's accepting negative by default
  @Prop({type: [String, Number], required: true, default: ''}) readonly min!: string | number
  @Prop({type: String, default: '[0-9-.,]'}) readonly regexFloatFiltering!: string
  @Prop({type: Boolean}) readonly validState: boolean | undefined

  get isInvalid(): boolean {
    return typeof this.validState === 'boolean' && !this.validState
  }

  filterFloat(e: KeyboardEvent): void {
    if (e.key.match(new RegExp(this.regexFloatFiltering, 'g')) === null) {
      e.preventDefault()
    }
  }
}

export default FloatEditor
</script>
