<template>
  <div class="unsupported-block card">
    <div class="card-body sm-padding-below font-roboto">
      {{blockName}} {{'flow-builder.simulator-unsupported-block' | trans}}
    </div>
  </div>
</template>

<script>
import lang from '@/lib/filters/lang'

export default {
  props: {
    blockName: String,
  },
  mixins: [lang],
}
</script>
