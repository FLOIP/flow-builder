<template>
  <table class="text-mapping-table table table-striped">
    <thead>
    <tr>
      <th class="col-5 align-top">{{ trans('flow-builder.choice-name') }}</th>
      <th class="align-top">{{ trans('flow-builder.synonyms') }} / {{ trans('flow-builder.text-expression') }}</th>
    </tr>
    </thead>
    <tbody>
      <text-mapping-row
        v-for="(choice, index) in block.config.choices"
        :key="index"
        :block="block"
        :choice="choice"
        :index="index"
        :lang-id="langId" />
    </tbody>
  </table>
</template>

<script>
import Lang from '@/lib/filters/lang'
import {ISelectOneResponseBlock} from '@floip/flow-runner'
import TextMappingRow from './TextMappingRow.vue'

export default {
  name: 'TextMappingTable',
  components: {
    TextMappingRow,
  },
  mixins: [Lang],
  props: {
    block: {
      type: ISelectOneResponseBlock,
      required: true,
    },
    langId: {
      type: String,
      required: true,
    },
  },
}
</script>
