<template>
  <div class="block-id text-right" :data-cy="`block-id-${block.uuid}`">
    <small class="text-muted">{{ trans('flow-builder.block-id') }}: <em>{{ blockId }}</em></small>
  </div>
</template>

<script lang="ts" setup>
import {PropType, computed, defineProps, ComputedRef} from 'vue'
import {IBlock} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'

const props = defineProps({
  block: Object as PropType<IBlock>,
})
const blockId: ComputedRef<string> = computed(() => (props.block.uuid !== undefined ? props.block.uuid : ''))

// eslint-disable-next-line @typescript-eslint/unbound-method
const {trans} = Lang
</script>
