<template>
  <tr
    class="text-mapping-row"
    data-cy="text-mapping-entry">
    <td>
      {{ currentChoice.name }}
    </td>
    <td>
      <text-synonyms-editor
        :block="block"
        :current-choice="currentChoice"
        :index="index"
        :lang-id="langId" />
    </td>
  </tr>
</template>

<script>
import Lang from '@/lib/filters/lang'
import {IChoice, ISelectOneResponseBlock} from '@floip/flow-runner'
import TextSynonymsEditor from './TextSynonymsEditor.vue'

export default {
  name: 'TextMappingRow',
  components: {
    TextSynonymsEditor,
  },
  mixins: [Lang],
  props: {
    block: {
      type: ISelectOneResponseBlock,
      required: true,
    },
    currentChoice: {
      type: IChoice,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    langId: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>
