<template>
  <div class="resource-viewer-block border p-2">
    <div class="block-header-1 d-flex">
      <div class="mr-auto text-primary"><h5>{{blockLabel}}</h5></div>
      <div class="ml-auto"><h6>{{trans(`flow-builder.${block.type}`).toUpperCase()}}</h6></div>
    </div>
    <div class="block-content">
      <fieldset :disabled="!isEditable">
        <div class="d-flex">
          <simplified-name-editor
            :block="block"
            class="col-3 p-0"
            @change="$emit('change')" />
          <div v-if="!hasContent" class="col-3">
            <div class="badge badge-info">{{trans('flow-builder.no-content-block-info')}}</div>
          </div>
        </div>
        <div v-if="hasContent">
          <per-mode-resource-editor
            :block="block"
            @change="$emit('change')" />
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts">
import {IBlock} from '@floip/flow-runner'
import {lang} from '@/lib/filters/lang'
import {mapGetters} from 'vuex'
import {PropType} from 'vue'

export default {
  name: 'ResourceViewerBlock',
  props: {
    block: Object as PropType<IBlock>,
  },
  mixins: [lang],
  computed: {
    ...mapGetters('flow', ['block_classesConfig']),
    ...mapGetters('builder', ['isEditable']),
    blockLabel() {
      return this.block.label > '' ? this.block.label : lang.trans('flow-builder.untitled-block')
    },
    hasContent() {
      return this.block_classesConfig[this.block.type].is_interactive === true
    },
  },
}
</script>

<style scoped>
.resource-viewer-block {
  border: 1px solid #dee2e6 !important;
  margin-top: -1px;
}
</style>
