<template>
  <div class="starting-block-button">
    <template v-if="true || isEditable">
      <h4>{{'flow-builder.options' | trans}}</h4>
      <div class="form-group">
        <button type="button"
            class="btn btn-default btn-sm"
            :disabled="isStartBlock"
            @click="setStartBlock">
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
  import {Component, Prop} from 'vue-property-decorator'
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
    isStartBlock = (this.blockId === this.flow.firstBlockId)

    setStartBlock() {
      const {flow: {uuid: flowId}, blockId} = this
      this.flow_setFirstBlockId({flowId, blockId})
      // Weird behavior: the computed approach with `get isStartBlock()` is not triggered even this.flow.firstBlockId is really mutated when calling this.flow_setFirstBlockId()
      // A workaround would be to use this data approach, and redefine it here
      this.isStartBlock = (this.blockId === this.flow.firstBlockId)
    }

    @flowVuexNamespace.Mutation flow_setFirstBlockId
  }
  export default FirstBlockEditorButton
</script>
