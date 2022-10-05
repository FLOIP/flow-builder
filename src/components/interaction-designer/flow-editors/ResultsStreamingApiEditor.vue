<template>
  <div class="results-streaming-api-editor">
    <div
      v-b-toggle.my-collapse
      class="text-muted">
      <font-awesome-icon :icon="['fa-solid', 'fa-caret-down']" />
      {{ trans('flow-builder.configure-floip-header') }}
    </div>
    <b-collapse id="my-collapse">
      api config
    </b-collapse>
  </div>
</template>

<script>
import Lang from '@/lib/filters/lang'

export default {
  name: 'ResultsStreamingApiEditor',
  mixins: [Lang],
}
</script>

<style scoped>

</style>
