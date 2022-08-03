<template>
  <table class="voice-mapping-table table table-striped">
    <thead>
    <tr>
      <th>Choice name</th>
      <th>Voice key press</th>
      <th>Expression</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(choice, index) in block.config.choices" :key="index">
      <td class="d-flex">
        {{ choice.name }}
        <div class="custom-control custom-checkbox ml-auto">
          <input :id="`useExpression-${index}`" :name="`useExpression-${index}`" class="custom-control-input" type="checkbox">
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
        <input name="expression" type="text">
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import Lang from '@/lib/filters/lang'
import {ISelectOneResponseBlock} from '@floip/flow-runner'

export default {
  components: {},
  mixins: [Lang],
  props: {
    block: {type: ISelectOneResponseBlock, required: true},
  },
}
</script>

<style scoped>

</style>
