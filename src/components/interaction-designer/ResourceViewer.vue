<template>
  <div class="resource-viewer" data-cy="resource-viewer--page">
    <slot name="vendor-header" />
    <div class="resource-viewer-contents">
      <resource-viewer-block
        v-for="block in activeFlow?.blocks ?? []"
        v-show="visibleBlocks === null || visibleBlocks.includes(block.uuid)"
        :id="`block/${block.uuid}`"
        :key="block.uuid"
        :block="block"
        @change="debounce_persistFlow" />
    </div>
    <slot name="vendor-footer" />
  </div>
</template>

<script lang="ts">
import Lang from '@/lib/filters/lang'
import {debounce} from 'lodash'
import {mapActions, mapGetters} from 'vuex'
import {DEBOUNCE_FLOW_PERSIST_MS} from '@/lib/constants'

export default {
  name: 'ResourceViewer',
  mixins: [Lang],
  props: {
    visibleBlocks: {
      type: Array,
      // if null, all blocks are visible
      default: () => null,
    },
  },
  computed: {
    ...mapGetters({
      activeFlow: 'flow/activeFlow',
    }),
    id() {
      return this.$route.params.id
    },
  },
  mounted() {
    console.debug('VueJS flow resources viewer mounted!')
  },
  methods: {
    ...mapActions('builder', [
      'persistFlowAndHandleUiState',
    ]),
    debounce_persistFlow: debounce(function () {
      return this.persistFlowAndHandleUiState()
    }, DEBOUNCE_FLOW_PERSIST_MS),
  },
}
</script>

<style lang="scss">
.resource-viewer {
  background: white;

  .block-content-filter {
    margin-top: 5px;
    padding-right: 15px;
  }

  .block-content-filter-warning {
    margin-left: 1em;
    margin-right: 1em;
  }

  .label {
    transition: all 200ms ease-in-out;

    .small, small {
      color: inherit !important;
    }
  }

  .tree-block-container {
    min-height: 0;
    padding-bottom: 0;
  }
}
</style>
