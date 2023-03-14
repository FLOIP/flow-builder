<template>
  <div class="in-progress-action">
    <font-awesome-icon
      :icon="['fas', 'spinner']"
      class="fa-btn fa-spin" />
    {{textContent}}
  </div>
</template>

<script>
export default {
  name: 'InProgressAction',
  props: {
    textContent: {
      type: String,
      required: true,
    },
  },
}
</script>
