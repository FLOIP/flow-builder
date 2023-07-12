<template>
  <fieldset class="undo-redo-button-group btn-group" :disabled="isTreeSaving">
    <button
      v-b-tooltip.hover="undoTooltip"
      class="btn btn-sm btn-outline-primary"
      :disabled="!hasPreviousSnapshot"
      data-cy="undo--btn"
      @click.stop="handleUndo">
      <font-awesome-icon :icon="['fas', 'undo']" />
    </button>
    <button
      v-b-tooltip.hover="redoTooltip"
      class="btn btn-sm btn-outline-primary"
      :disabled="!hasFutureSnapshot"
      data-cy="redo--btn"
      @click.stop="handleRedo">
      <font-awesome-icon :icon="['fas', 'redo']" />
    </button>
  </fieldset>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useStore} from '@/store/useStore'
import {lang} from '@/lib/filters/lang'
import {BLOCK_RESET_CONNECTIONS} from '../block/Block.vue'
import {ISnapshot} from "@/store/undoRedo"
import {IFlow} from "@floip/flow-runner"
import {useRouter} from 'vue-router/composables'

const store = useStore()
const router = useRouter();

const hasPreviousSnapshot = computed<boolean>(() => store.getters['undoRedo/hasPreviousSnapshot'])
const hasFutureSnapshot = computed<boolean>(() => store.getters['undoRedo/hasFutureSnapshot'])
const currentSnapshot = computed<ISnapshot>(() => store.getters['undoRedo/currentSnapshot'])
const isTreeSaving = computed<boolean>(() => store.getters['isTreeSaving'])
const activeFlow = computed<IFlow>(() => store.getters['flow/activeFlow'])

// we need this check because if hasPreviousSnapshot/hasFutureSnapshot becomes false, the button gets disabled and the tooltip doesn't go away
const undoTooltip = computed<string>(() => (
  hasPreviousSnapshot.value ? lang.trans('flow-builder.undo') : ''
))
const redoTooltip = computed<string>(() => (
  hasFutureSnapshot.value ? lang.trans('flow-builder.redo') : ''
))

async function handleUndo(): Promise<void> {
  window.postMessage(BLOCK_RESET_CONNECTIONS, '*')
  store.dispatch('undoRedo/undoAndUpdateState', null, {root: true})
  await navigateToDeepLink()
}

async function handleRedo(): Promise<void> {
  window.postMessage(BLOCK_RESET_CONNECTIONS, '*')
  store.dispatch('undoRedo/redoAndUpdateState', null, {root: true})
  await navigateToDeepLink()
}

async function navigateToDeepLink(): Promise<void> {
  const {routeName, routeParams} = currentSnapshot.value as ISnapshot
  console.debug('navigating to', routeName, routeParams)

  if (routeName === null || routeName === undefined) {
    return
  }
  try {
    await router.push({
      name: routeName,
      params: {
        id: activeFlow.value?.uuid || '',
        mode: 'edit',
        ...routeParams,
      },
    })
  } catch (err) {
    if (err.name !== 'NavigationDuplicated') {
      console.error(err)
    }
  }
}
</script>
