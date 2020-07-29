<template>
  <div class="starting-block-button">
    <template v-if="true || isEditable">
      <h4>{{'trees.options' | trans}}</h4>
      <div class="form-group">
        <button type="button"
            class="btn btn-default btn-sm"
            :disabled="isStartBlock"
            @click="setStartBlock">
          <template v-if="isStartBlock">
            {{'trees.currently-set-as-starting-block' | trans}}
          </template>
          <template v-else>
            {{'trees.set-as-starting-block' | trans}}
          </template>
        </button>
      </div>
    </template>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    props: {
      flow: Object,
      blockId: String, // set for particular block
      
      isEditable: {
        type: Boolean,
        default: true,
      },
    },

    computed: {
      isStartBlock() {
        return this.blockId === this.flow.firstBlockId
      },
    },

    methods: {
      ...mapMutations('flow', ['flow_setFirstBlockId']),

      setStartBlock() {
        const {flow: {uuid: flowId}, blockId} = this
        this.flow_setFirstBlockId({flowId, blockId})
      },
    },
  }
</script>
