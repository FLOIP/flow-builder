<template>
  <div v-if="block" >
    <slot/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'

  import {IBlock} from '@floip/flow-runner'

  @Component({
    props: {
      block: {
        type: Object as () => IBlock,
        default: null,
      },
    },
  })
  export class PlainFlowBuilderBlockEditorContainer extends Vue { }
  export default PlainFlowBuilderBlockEditorContainer
</script>
