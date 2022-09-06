<template>
  <div v-if="block">
    <slot />
  </div>
</template>

<script lang="ts">
import '@/css/stories/InteractionDesigner.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'vue-multiselect/dist/vue-multiselect.css'
import '@/scss/main.scss'
import '@/css/customized/vue-multiselect.css'

import {Prop} from 'vue-property-decorator'
import {Options, Vue} from 'vue-class-component'
import {IBlock} from '@floip/flow-runner'
import {Mutation} from 'vuex-class'

@Options({})
export class PlainFlowBuilderBlockEditorContainer extends Vue {
  @Prop({default: null}) readonly block!: IBlock

  created() {
    this.configure({appConfig: {}, builderConfig: {}})
  }

  @Mutation configure: any
}

export default PlainFlowBuilderBlockEditorContainer
</script>
