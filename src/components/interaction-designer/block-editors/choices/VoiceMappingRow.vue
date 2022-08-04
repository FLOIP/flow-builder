<template>
  <tr class="voice-mapping-row">
    <td class="d-flex">
      {{ choice.name }}
      <div class="custom-control custom-checkbox ml-auto">
        <input
          :id="`useExpression-${index}`"
          v-model="shouldUseExpression"
          :name="`useExpression-${index}`"
          class="custom-control-input"
          type="checkbox">
        <label :for="`useExpression-${index}`" class="custom-control-label font-weight-normal">Use expression</label>
      </div>
    </td>
    <td>
      <div class="d-flex justify-content-center">
        <key-press-selector
          :block="block"
          :choice="choice"
          :disabled="shouldUseExpression"
          :index="index"/>
      </div>
    </td>
    <td>
      <validation-message
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/choices/${index}/ivr_tests/test_expression`">
        <expression-input
          :current-expression="currentExpression"
          :label="''"
          :placeholder="trans('flow-builder.enter-expression')"
          :valid-state="isValid"
          class="mb-1"
          :disabled="!shouldUseExpression"
          @commitExpressionChange="updateCurrentExpression" />
      </validation-message>
    </td>
  </tr>
</template>

<script>
import Lang from '@/lib/filters/lang'
import KeyPressSelector from './VoiceKeyPressSelector.vue'
import ConfigBlockPerChoice from './mixins/CommonVoiceChoiceConfig.vue'

export default {
  components: {
    KeyPressSelector,
  },
  extends: ConfigBlockPerChoice,
  mixins: [Lang],

  computed: {
    shouldUseExpression: {
      get() {
        return !(this.isKeyPressIdentifiable === true)
      },
      set(value) {
        if (value === true) {
          this.updateCurrentExpression('')
        } else {
          this.updateCurrentExpression(`${this.blockResponseExpression} = '${this.keypress}'`)
        }
      },
    },
  },
}
</script>

<style scoped>

</style>
