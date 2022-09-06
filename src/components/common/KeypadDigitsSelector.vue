<template>
  <div class="keypad-digits-selector">
    <label class="text-primary">{{ label }}</label>
    <vue-multiselect
      v-model="modelValue"
      :class="{ invalid: validState === false }"
      :options="options"
      :placeholder="placeholder"
      :show-labels="false"
      :preselect-first="true"
      track-by="name"
      label="label" />
    <slot />
  </div>
</template>

<script lang="ts">
import {Prop} from 'vue-property-decorator'
import {mixins, Options} from 'vue-class-component'
import VueMultiselect from 'vue-multiselect'
import {Lang} from '@/lib/filters/lang'

const KEYS = '1234567890#*'

type MultiselectOption = {
  name: string,
  label: string,
};

@Options({
  components: {VueMultiselect},
})
export class KeypadDigitsSelector extends mixins(Lang) {
  @Prop({type: String, required: true}) label!: string;
  @Prop({type: String, required: true}) value!: string;
  @Prop({type: String, default: ''}) placeholder!: string;
  @Prop({type: Boolean, default: true}) validState!: boolean;

  get options(): MultiselectOption[] {
    return [
      {
        name: KEYS,
        label: this.trans('flow-builder.any-key'),
      },
      ...KEYS.split('').map((key) => ({
        name: key,
        label: key,
      })),
    ]
  }

  get modelValue(): MultiselectOption | undefined {
    return this.options.find((option) => this.value.includes(option.name))
  }

  set modelValue(value: MultiselectOption | undefined) {
    this.$emit('input', value?.name)
  }
}

export default KeypadDigitsSelector
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
</style>
