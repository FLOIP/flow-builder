<template>
  <div v-if="isFocused" class="block-action-buttons row">
    <div v-if="isBlockInteraction && isFocused" class="col-md-6">
      <button
          class="btn btn-secondary btn-block sm-room-below"
          @click.stop="clickCancel">
        {{'flow-builder.cancel' | trans}}
      </button>
    </div>
    <div v-if="isFocused" :class="{'col-md-6': isBlockInteraction, 'col-md-12': !isBlockInteraction}">
      <button
          class="btn btn-primary btn-block sm-room-below"
          :disabled="isDisabled"
          @click.stop="onNextClicked">
        {{ primaryButtonText }}
      </button>
    </div>
  </div>
</template>
<script>
import lang from '@/lib/filters/lang'

export default {
  name: 'BlockActionButtons',
  mixins: [lang],
  props: {
    isFocused: {},
    isDisabled: {},
    onNextClicked: {},
    isBlockInteraction: {},
    onCancelClicked: {},
  },
  computed: {
    primaryButtonText() {
      if (this.isBlockInteraction) {
        return 'Revise'
      }
      return 'Next'
    },
  },
  methods: {
    clickCancel() {
      this.onCancelClicked(null)
    },
  },
}
</script>
<style lang="scss" scoped>
  button {
  }

  .block-action-buttons {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 6px;
  }

  .btn-block {
    margin: 0;
  }
</style>
