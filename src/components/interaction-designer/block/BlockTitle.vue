<template>
  <div class="block-title d-flex justify-content-between">
    <p class="block-type">
      {{ lang.trans(`flow-builder.${block.type}`) }}
    </p>
    <div>
      <slot name="right"/>
      <i
        v-if="activeFlow.first_block_id === block.uuid"
        class="glyphicon glyphicon-arrow-down" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue'
import {IBlock, IFlow} from '@floip/flow-runner'
import {useStore} from '@/store/useStore'
import {lang} from '@/lib/filters/lang'

const store = useStore()
const props = defineProps<{
  block: IBlock,
}>()

const activeFlow = computed<IFlow>(() => store.getters['flow/activeFlow'])
</script>
