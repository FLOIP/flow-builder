<template>
  <div class="block-id text-right">
    <small class="text-muted">{{ 'flow-builder.block-id' | trans }}: <em>{{ blockId }}</em></small>
  </div>
</template>

<script lang="ts">
import {IBlock} from '@floip/flow-runner'
import {Component, Prop} from 'vue-property-decorator'
import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'

@Component({})
class BlockId extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  get blockId(): string {
    return this.block.uuid || ''
  }
}

export default BlockId
</script>
