<template>
  <div class="text-editor">
    <label
      v-if="label"
      :class="labelClass">{{ label }}</label>
    <textarea
      class="form-control"
      :class="{ 'is-invalid': isInvalid }"
      :placeholder="placeholder"
      :value="value"
      :rows="rows"
      @keydown="$emit('keydown', $event)"
      @input="$emit('input', $event.target.value)" />
    <slot />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component({})
export class TextEditor extends Vue {
  @Prop({type: [String, Number], required: true}) readonly label!: string | number
  @Prop({type: String, default: 'text-primary'}) readonly labelClass!: string
  @Prop({type: String, required: true}) readonly placeholder!: string
  @Prop({type: String, required: true}) readonly value!: string
  @Prop({type: Boolean}) readonly validState?: boolean
  @Prop({type: Number, default: 1}) readonly rows!: number

  get isInvalid(): boolean {
    return typeof this.validState === 'boolean' && !this.validState
  }
}

export default TextEditor
</script>
