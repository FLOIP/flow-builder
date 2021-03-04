<template>
  <button v-if="canPerformEarlyExit"
      @click="performEarlyExit"
      class="float-right btn-link card-button text-color-error font-weight-semibold text-uppercase">Exit
  </button>
</template>
<script>
  export default {
    name: 'EarlyExitButton',
    props: {
      canPerformEarlyExit: {},
      performEarlyExit: {}
    }
  }
</script>
