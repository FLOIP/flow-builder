<template>
  <select
    v-model="keypress"
    class="voice-key-press-selector">
    <option v-for="value in options" :key="value" :disabled="disabled" :value="value">
      {{ value }}
    </option>
  </select>
</template>

<script>
import CommonVoiceChoiceConfig from './mixins/CommonVoiceChoiceConfig.vue'

export default {
  extends: CommonVoiceChoiceConfig,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.key-press-selector {
  width: 4.5em
}
</style>
