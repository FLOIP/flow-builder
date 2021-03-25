<template>
  <div v-if="activeFlow"
       class="builder-canvas no-select">

    <block v-for="block in activeFlow.blocks"
           :key="block.uuid"
           :id="`block/${block.uuid}`"
           :block="block"
           :x="block.platform_metadata.io_viamo.uiData.xPosition"
           :y="block.platform_metadata.io_viamo.uiData.yPosition" />
  </div>
</template>

<script lang="ts">
  import {mapGetters} from 'vuex'
  import {Component, Vue} from 'vue-property-decorator'
  import Block from "@/components/interaction-designer/Block.vue"

  @Component({
    components: {
      Block,
    },

    computed: {
      ...mapGetters('flow', ['activeFlow']),
    },

  })
  export default class BuilderCanvas extends Vue {
  }

  export {BuilderCanvas}
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
    width: 9999px;
    height: 9999px;
  }
</style>
