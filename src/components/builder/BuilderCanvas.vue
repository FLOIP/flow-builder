<template>
  <div v-if="flows.length"
       class="builder-canvas no-select">

    <block v-for="block in flows[0].blocks"
           :key="block.uuid"
           :id="`block/${block.uuid}`"
           :block="block"
           :x="block.platform_metadata.io_viamo.uiData.xPosition"
           :y="block.platform_metadata.io_viamo.uiData.yPosition" />
  </div>
</template>

<script lang="ts">
  import {mapState} from 'vuex'
  import {Component, Vue} from 'vue-property-decorator'
  import Block from "@/components/builder/Block.vue"

  @Component({
    components: {
      Block,
    },

    computed: {
      ...mapState('flow', ['flows']),
    },

    mounted() {
      this.$store.dispatch('builder/loadFlow')
    }
  })
  export default class BuilderCanvas extends Vue {
  }
</script>

<style scoped>
  .noselect * {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Opera and Firefox */
  }
  
  .builder-canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>