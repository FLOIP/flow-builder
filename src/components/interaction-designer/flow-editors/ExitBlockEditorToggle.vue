<template>
  <div class="flow-editor exit-block-editor-toggle">
    <template v-if="true || isEditable && hasClipboard">
      <div class="form-group">
        <button type="button"
            class="btn btn-default btn-sm"
            :class="{active: isExitBlock}"
            @click="toggleExitBlock">
          <template v-if="isExitBlock">{{'flow-builder.unset-as-exit-block' | trans}}</template>
          <template v-else>{{'flow-builder.set-as-exit-block' | trans}}</template>
        </button>
      </div>
    </template>
  </div>
</template>

<script>
  import lang from 'lib/filters/lang'
  import {mapMutations} from 'vuex'

  export default {
    props: {
      flow: Object,
      blockId: String, // toggle for particular block

      isEditable: {
        type: Boolean,
        default: true,
      },
    },

    mixins: [lang],

    computed: {
      isExitBlock() {
        return this.blockId === this.flow.exitBlockId
      },
    },

    methods: {
      ...mapMutations('flow', ['flow_setExitBlockId']),

      toggleExitBlock() {
        this.flow_setExitBlockId({
          flowId: this.flow.uuid,
          blockId: this.isExitBlock ? null : this.blockId,
        })
      },
    },
  }
</script>
