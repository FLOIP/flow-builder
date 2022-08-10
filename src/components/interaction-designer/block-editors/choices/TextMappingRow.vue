<template>
  <tr class="text-mapping-row">
    <td>
      {{ currentChoice.name }}
    </td>
    <td>
      <text-synonyms-editor :block="block" :current-choice="currentChoice" :index="index" :lang-id="langId"/>
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
  mixins: [Lang],
}
</script>

<style scoped>

</style>
