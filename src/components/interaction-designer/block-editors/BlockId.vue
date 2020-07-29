<template>
  <div class="text-right">
    <small class="text-muted">{{'flow-builder.block-id' | trans}}: <em>{{blockId}}</em></small>
  </div>
</template>

<script lang="ts">
  //TODO - is block editors the right place for this?
  import Vue from 'vue'
  import {IBlock} from '@floip/flow-runner'
  import {Component, Prop} from 'vue-property-decorator'

  @Component<any>({
    name: 'BlockId',
  })
  class BlockId extends Vue {
    @Prop()readonly block!: IBlock

    get blockId(): string {
      return this.block.uuid || ''
    }
  }
  
  export default BlockId
</script>
