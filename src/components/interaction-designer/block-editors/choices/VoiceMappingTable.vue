<template>
  <table class="voice-mapping-table table table-striped">
    <thead>
    <tr>
      <th class="col-5 align-top">{{ trans('flow-builder.choice-name') }}</th>
      <th class="align-top">{{ trans('flow-builder.voice-key-press') }}</th>
      <th class="col-5 align-top">
        {{ trans('flow-builder.expression') }}
        <h5 class="small">{{ trans('flow-builder.voice-choice-mapping-expression')}}</h5>
      </th>
    </tr>
    </thead>
    <tbody>
      <voice-mapping-row
        v-for="(choice, index) in block.config.choices"
        :key="index"
        :block="block"
        :choice="choice"
        :index="index" />
    </tbody>
  </table>
</template>

<script>
import Lang from '@/lib/filters/lang'
import {ISelectOneResponseBlock} from '@floip/flow-runner'
import VoiceMappingRow from './VoiceMappingRow.vue'

export default {
  components: {
    VoiceMappingRow,
  },
  mixins: [Lang],
  props: {
    block: {type: ISelectOneResponseBlock, required: true},
  },
}
</script>

<style scoped>

</style>
