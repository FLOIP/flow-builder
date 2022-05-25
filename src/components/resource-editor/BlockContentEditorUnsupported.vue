<template>
  <div class="block-content-editor-unsupported">
    <ul class="list-inline pull-right h4">
      <li
        v-for="(tag, i) in block.customData.tags"
        :key="i">
        <span class="badge badge-default">{{ tag }}</span>
      </li>
      <li>
        <span class="badge badge-info">{{ 'flow-builder.block-type-unsupported-in-resource-view' | trans }}</span>
      </li>
    </ul>

    <h4
      :class="{'text-muted': !block.customData.title}"
      :title="'Block ID - ' + block.jsKey">
      <span v-if="block.customData.label">{{ block.customData.label }} - </span>
      {{ block.customData.title || $options.filters.trans('flow-builder.untitled-block') }}
      <small>{{ `flow-builder.${block.type}` | trans }}</small>
    </h4>
  </div>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import Lang from '@/lib/filters/lang'
import {IBlock} from '@floip/flow-runner'

@Component({})
export class BlockContentEditorUnsupported extends mixins(Lang) {
  @Prop() readonly block?: IBlock
}

export default BlockContentEditorUnsupported
</script>

<style lang="scss" scoped>
.block-content-editor-unsupported {
  transition: all 200ms ease-in-out;
  background: #f9f9f9;
  border-top: 1px solid #eee;
  padding: 1em 0.5em 0.5em;
}
</style>
