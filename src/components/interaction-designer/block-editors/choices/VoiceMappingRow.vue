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
        <label :for="`useExpression-${index}`" class="custom-control-label font-weight-normal">
          {{ trans('flow-builder.use-expressions') }}
        </label>
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
        :message-key="`block/${block.uuid}/config/choices/${index}/ivr_test/test_expression`">
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
import CommonVoiceChoiceConfig from './mixins/CommonVoiceChoiceConfig.vue'
import {mapGetters} from 'vuex'

export default {
  components: {
    KeyPressSelector,
  },
  extends: CommonVoiceChoiceConfig,
  mixins: [Lang],

  created() {
    // We already provide a default value for ivr_test.test_expression during choice creation
    // But, there might be a scenario where we still have it undefined, eg: for imported blocks
    // Therefore, we set it here to make sure we use key_press selector by default
    if (this.hasVoiceMode === true && this.choice?.ivr_test?.test_expression === undefined) {
      this.updateCurrentExpression(`${this.BLOCK_RESPONSE_EXPRESSION} = '${this.keypress}'`)
    }
  },

  computed: {
    ...mapGetters('flow', ['hasVoiceMode']),
    shouldUseExpression: {
      get() {
        return !(this.isKeyPressIdentifiable === true)
      },
      set(value) {
        if (value === true) {
          this.updateCurrentExpression('')
        } else {
          this.updateCurrentExpression(`${this.BLOCK_RESPONSE_EXPRESSION} = '${this.keypress}'`)
        }
      },
    },
  },
}
</script>

<style scoped>

</style>
