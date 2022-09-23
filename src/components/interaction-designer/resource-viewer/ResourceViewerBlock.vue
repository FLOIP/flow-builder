<template>
  <div class="resource-viewer-block p-2">
    <h3>Label: {{block.label}}, Type: {{block.type}}</h3>
  </div>
</template>

<script lang="ts">
import {IBlock} from '@floip/flow-runner'

export default {
  name: 'ResourceViewerBlock',
  props: {
    block: IBlock,
  },
}
</script>

<style scoped>

</style>
