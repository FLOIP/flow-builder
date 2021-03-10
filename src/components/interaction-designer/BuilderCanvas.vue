<template>
  <div v-if="flows.length"
       class="builder-canvas no-select"
       :style="{minWidth: `${canvasWidth}px` , minHeight: `${canvasHeight}px`}"
  >

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
  import Block from "@/components/interaction-designer/Block.vue"
  import lodash from 'lodash'

  @Component({
    components: {
      Block,
    },

    computed: {
      ...mapState('flow', ['flows']),

      canvasHeight() {
        const defaultHeight = window.screen.availHeight
        if (!this.flows[0].blocks && this.flows[0].blocks.length) {
          return defaultHeight
        }

        const blockAtTheLowestPosition = lodash.maxBy(this.flows[0].blocks, 'platform_metadata.io_viamo.uiData.yPosition')

        if (!blockAtTheLowestPosition) {
          return defaultHeight
        }

        const blockElement = document.getElementById(`block/${blockAtTheLowestPosition.uuid}`)

        if (!blockElement) {
          return defaultHeight
        }

        const blockHeight = blockElement.clientHeight
        return lodash.get(blockAtTheLowestPosition, 'platform_metadata.io_viamo.uiData.yPosition') + blockHeight + 100
      },

      canvasWidth() {
        const defaultWidth = window.screen.availWidth
        if (!this.flows[0].blocks && this.flows[0].blocks.length) {
          return defaultWidth
        }

        const blockAtTheFurthestRightPosition = lodash.maxBy(this.flows[0].blocks, 'platform_metadata.io_viamo.uiData.xPosition')

        if (!blockAtTheFurthestRightPosition) {
          return defaultWidth
        }

        const blockElement = document.getElementById(`block/${blockAtTheFurthestRightPosition.uuid}`)

        if (!blockElement) {
          return defaultWidth
        }

        const blockWidth = blockElement.clientWidth
        return lodash.get(blockAtTheFurthestRightPosition, 'platform_metadata.io_viamo.uiData.xPosition') + blockWidth + 100
      },
    },

    mounted() {
      this.$store.dispatch('builder/loadFlow')

      // Auto scroll, needed to put in mounted()
      this.$watch('canvasHeight', (newValue) => {
        window.scrollTo({
          top: newValue,
          behavior: 'smooth'
        })
      }, { immediate: true });

      this.$watch('canvasWidth', (newValue) => {
        window.scrollTo({
          left: newValue,
          behavior: 'smooth'
        })
      }, { immediate: true });
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
</style>
