<template>
  <div v-if="isFocused" class="row blockActionButtonRoot">
    <div v-if="isBlockInteraction && isFocused" class="col-md-6">
      <button
          class="btn btn-secondary btn-block sm-room-below"
          @click.stop="clickCancel">
        Cancel
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
  export default {
    name: 'BlockActionButtons',
    props: {
      isFocused: {},
      isDisabled: {},
      onNextClicked: {},
      isBlockInteraction: {},
      onCancelClicked: {}
    },
    computed: {
      primaryButtonText() {
        if (this.isBlockInteraction) {
          return "Revise"
        } else {
          return "Next"
        }
      }
    },
    methods: {
      clickCancel() {
        this.onCancelClicked(null)
      }
    }
  }
</script>
<style lang="scss" scoped>
  button {
  }

  .blockActionButtonRoot {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 6px;
  }

  .btn-block {
    margin: 0;
  }
</style>