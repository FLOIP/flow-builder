<template>
  <div class="starting-block-button">
    <template v-if="true || isEditable">
      <h4>{{'flow-builder.options' | trans}}</h4>
      <div class="form-group">
        <button type="button"
            class="btn btn-default btn-sm"
            :disabled="isStartBlock"
            @click="setStartBlock($event)">
          <template v-if="isStartBlock">
            {{'flow-builder.currently-set-as-starting-block' | trans}}
          </template>
          <template v-else>
            {{'flow-builder.set-as-starting-block' | trans}}
          </template>
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop, Watch} from 'vue-property-decorator'
  import lang from '@/lib/filters/lang'
  import {namespace} from "vuex-class"

  const flowVuexNamespace = namespace('flow')

  @Component<any>({
    props: {
      flow: Object,
      blockId: String, // set for particular block

      isEditable: {
        type: Boolean,
        default: true,
      },
    },

    mixins: [lang],
  })
  class FirstBlockEditorButton extends Vue {
    get isStartBlock() {
      console.debug(`compute isStartBlock for block.uuid ${this.blockId} & flow.firstBlockId ${this.flow.firstBlockId}`)
      return this.blockId === this.flow.firstBlockId
    }

    @Watch('flow.firstBlockId', { immediate: true })
    onFlowFirstBlockIdChanged(firstBlockId: any, oldFirstBlockId: any) {
      console.debug(`flow firstBlockId has changed ${firstBlockId}`)
    }

    setStartBlock(event) {
      const {flow: {uuid: flowId}, blockId} = this
      console.debug(`before set this.flow.firstBlockId = ${this.flow.firstBlockId}`)
      this.flow_setFirstBlockId({flowId, blockId})
      console.debug(`after set this.flow.firstBlockId = ${this.flow.firstBlockId}`)
      event.target.blur()
    }

    @flowVuexNamespace.Mutation flow_setFirstBlockId
  }
  export default FirstBlockEditorButton
</script>
