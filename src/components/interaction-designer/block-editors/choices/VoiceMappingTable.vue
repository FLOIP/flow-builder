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
      <td>{{ choice.name }}</td>
      <td>one</td>
      <td>one</td>
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
