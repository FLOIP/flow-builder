<template>
  <div class="digits-editor">
    <label class="text-primary">{{ label }}</label>
    <vue-multiselect
      v-model="modelValue"
      :class="{ invalid: validState === false }"
      :options="options"
      :placeholder="placeholder"
      :show-labels="false"
      track-by="name"
      label="label" />
    <slot />
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import VueMultiselect from 'vue-multiselect'
import Lang from '@/lib/filters/lang'

const KEYS = '0123456789#*'

type MultiselectOption = {
  name: string,
  label: string,
};

@Component({
  components: {VueMultiselect},
})
export class DigitsEditor extends mixins(Lang) {
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
    if (value) {
      this.$emit('input', value.name)
    }
  }
}

export default DigitsEditor
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
</style>
