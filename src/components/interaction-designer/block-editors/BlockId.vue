<template>
  <div class="block-id text-right">
    <small class="text-muted">{{ trans('flow-builder.block-id') }}: <em>{{ blockId }}</em></small>
  </div>
</template>

<script lang="ts">
import {IBlock} from '@floip/flow-runner'
import {Prop} from 'vue-property-decorator'
import {Lang} from '@/lib/filters/lang'
import {mixins, Options} from 'vue-class-component'

@Options({})
export class BlockId extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  get blockId(): string {
    return this.block.uuid || ''
  }
}

export default BlockId
</script>
