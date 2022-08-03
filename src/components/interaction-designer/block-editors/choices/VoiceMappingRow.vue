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
        <label :for="`useExpression-${index}`" class="custom-control-label">Use expression</label>
      </div>
    </td>
    <td>
      <div class="d-flex justify-content-center">
        <select name="press-key">
          <option name="one" value="1">1</option>
          <option name="two" value="2">2</option>
          <option name="three" value="3">3</option>
          <option name="four" value="4">4</option>
          <option name="star" value="*">*</option>
        </select>
      </div>
    </td>
    <td>
      <validation-message
        v-if="shouldUseExpression"
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/choices/${index}/ivr_tests/test_expression`">
        <expression-input
          :current-expression="currentExpression"
          :label="''"
          :placeholder="trans('flow-builder.enter-expression')"
          :valid-state="isValid"
          class="mb-1"
          @commitExpressionChange="updateCurrentExpression" />
      </validation-message>
    </td>
  </tr>
</template>

<script>
import Lang from '@/lib/filters/lang'
import {IChoice, ISelectOneResponseBlock} from '@floip/flow-runner'

export default {
  mixins: [Lang],
  props: {
    block: {
      type: ISelectOneResponseBlock,
      required: true,
    },
    choice: {
      type: IChoice,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    shouldUseExpression: {
      get() {
        return true
      },
      set(value) {
        // TODO
        this.$emit('shouldUseExpressionChanged')
      },
    },
    currentExpression() {
      return '@fdsf'
    },
  },

  methods: {
    updateCurrentExpression(value) {
      // TODO
    },
  }
}
</script>

<style scoped>

</style>
