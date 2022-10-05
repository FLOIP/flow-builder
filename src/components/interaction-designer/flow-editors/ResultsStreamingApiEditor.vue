<template>
  <div class="results-streaming-api-editor">
    <div
      v-b-toggle.results-streaming-api-container
      class="text-muted mb-2">
      <font-awesome-icon :icon="['fa-solid', 'fa-caret-down']" />
      {{ trans('flow-builder.configure-floip-header') }}
    </div>
    <b-collapse
      id="results-streaming-api-container"
      class="row">
      <div
        class="form-group"
        :class="columnClass">
        <label
          for="results-streaming-api-url"
          class="text-primary form-label">
          {{ trans('flow-builder.base-url') }}
        </label>
        <input
          id="results-streaming-api-url"
          class="form-control"
          type="text"
          :placeholder="trans('flow-builder.base-url-placeholder')">
      </div>
      <div
        class="form-group"
        :class="columnClass">
        <label
          for="results-streaming-api-key"
          class="text-primary form-label">
          {{ trans('flow-builder.api-key') }}
        </label>
        <input
          id="results-streaming-api-key"
          class="form-control"
          type="text"
          :placeholder="trans('flow-builder.api-key')">
      </div>
    </b-collapse>
  </div>
</template>

<script>
import Lang from '@/lib/filters/lang'

export default {
  name: 'ResultsStreamingApiEditor',
  mixins: [Lang],
  props: {
    columnClass: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>
