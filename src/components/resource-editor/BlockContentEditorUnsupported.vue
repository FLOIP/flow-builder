<style lang="scss" scoped>
.block-content-editor-unsupported {
  transition: all 200ms ease-in-out;
  background: #f9f9f9;
  border-top: 1px solid #eee;
  padding: 0.5em;
  padding-top: 1em;
}
</style>

<template>
  <div class="block-content-editor block-content-editor-unsupported">
    <ul class="list-inline pull-right h4">
      <li v-for="(tag, i) in block.customData.tags" :key="i">
        <span class="badge badge-default">{{ tag }}</span>
      </li>
      <li>
        <span class="badge badge-info">{{
          "flow-builder.block-type-unsupported-in-resource-view" | trans
        }}</span>
      </li>
    </ul>

    <h4 :class="{ 'text-muted': !block.customData.title }" :title="'Block ID - ' + block.jsKey">
      <span v-if="block.customData.label">{{ block.customData.label }} - </span>
      {{ block.customData.title || $options.filters.trans("flow-builder.untitled-block") }}
      <small>{{ `flow-builder.${block.type}` | trans }}</small>
    </h4>
  </div>
</template>

<script>
import lang from '@/lib/filters/lang'

export default {
  props: ['block', 'blockTypes'],
  mixins: [lang],
}
</script>
