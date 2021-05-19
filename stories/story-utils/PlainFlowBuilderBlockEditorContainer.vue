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
import {Component, Prop} from 'vue-property-decorator'

import {IBlock} from '@floip/flow-runner'
import {Mutation} from "vuex-class";

@Component({})
export class PlainFlowBuilderBlockEditorContainer extends Vue {
  @Prop({default: null}) readonly block!: IBlock

  created() {
    this.configure({appConfig: {}, builderConfig: {}, supportedBlockTypes: {}});
  }

  @Mutation configure: any
}

export default PlainFlowBuilderBlockEditorContainer
</script>
