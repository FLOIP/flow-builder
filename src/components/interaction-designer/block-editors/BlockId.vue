<template>
  <div class="block-id text-right">
    <small class="text-muted">{{ trans('flow-builder.block-id') }}: <em>{{ blockId }}</em></small>
  </div>
</template>

<script lang="ts" setup>
import {PropType, computed, defineProps} from 'vue'
import {IBlock} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'

const props = defineProps({
  block: Object as PropType<IBlock>,
})
const blockId: string = computed(() => (props.block.uuid !== undefined ? props.block.uuid : ''))

const {trans} = Lang
</script>
