<template>
  <div class="text-right">
    <small class="text-muted"
      >{{ "flow-builder.block-id" | trans }}: <em>{{ blockId }}</em></small
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {IBlock} from '@floip/flow-runner'
import {Component, Prop} from 'vue-property-decorator'
import lang from '@/lib/filters/lang'

@Component<any>({
  mixins: [lang],
})
class BlockId extends Vue {
  @Prop() readonly block!: IBlock;

  get blockId(): string {
    return this.block.uuid || ''
  }
}

export default BlockId
</script>
