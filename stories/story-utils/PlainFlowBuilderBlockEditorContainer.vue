<template>
  <div v-if="block">
    <slot/>
  </div>
</template>

<script lang="ts">
import '@/css/InteractionDesigner.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import '@/scss/main.scss'

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
export class PlainFlowBuilderBlockEditorContainer extends Vue {
}

export default PlainFlowBuilderBlockEditorContainer
</script>
