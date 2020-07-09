<template>
  <div id="app">
    <builder-canvas />
    <!--    <router-view />-->
  </div>
</template>

<script>
import {BuilderCanvas} from '@/components/builder/BuilderCanvas.vue'

export default {
  components: {
    BuilderCanvas,
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
