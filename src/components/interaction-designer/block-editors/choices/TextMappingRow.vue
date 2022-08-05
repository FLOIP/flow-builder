<template>
  <tr class="text-mapping-row">
    <td>
      {{ choice.name }}
    </td>
    <td>
      <text-synonyms-editor :block="block" :choice="choice" :index="index" />
    </td>
  </tr>
</template>

<script>
import Lang from '@/lib/filters/lang'
import {IChoice, ISelectOneResponseBlock} from '@floip/flow-runner'
import TextSynonymsEditor from './TextSynonymsEditor.vue'

export default {
  components: {
    TextSynonymsEditor,
  },
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
  mixins: [Lang],
}
</script>

<style scoped>

</style>
