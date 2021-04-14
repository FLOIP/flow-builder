<template>
  <div v-if="activeFlow"
       class="builder-canvas no-select"
       :style="{ minWidth: `${canvasWidth}px` , minHeight: `${canvasHeight}px` }"
  >

    <block v-for="block in activeFlow.blocks"
           :key="block.uuid"
           :id="`block/${block.uuid}`"
           :block="block"
           :x="block.platform_metadata.io_viamo.uiData.xPosition"
           :y="block.platform_metadata.io_viamo.uiData.yPosition" />
  </div>
</template>

<script lang="ts">
import { mapGetters, mapState } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'
import Block from '@/components/interaction-designer/Block.vue'
import lodash from 'lodash'

  @Component({
    components: {
      Block,
    },

    computed: {
      ...mapState('flow', ['flows']),
      ...mapGetters('flow', ['activeFlow']),

      canvasHeight() {
        const defaultHeight = window.screen.availHeight
        if (!this.flows[0].blocks && this.flows[0].blocks.length) {
          return defaultHeight
        }

        const blockAtTheLowestPosition = lodash.maxBy(this.flows[0].blocks, 'platform_metadata.io_viamo.uiData.yPosition')

        if (!blockAtTheLowestPosition) {
          console.debug('Interaction Designer', 'Unable to find block at the lowest position')
          return defaultHeight
        }

        const blockElement = document.getElementById(`block/${blockAtTheLowestPosition.uuid}`)

        if (!blockElement) {
          console.debug('Interaction Designer', 'Unable to find DOM element corresponding to lowest block id: ', `block/${blockAtTheLowestPosition.uuid}`)
          return defaultHeight
        }

        const blockHeight = blockElement.clientHeight
        const marginHeight = 100
        return lodash.get(blockAtTheLowestPosition, 'platform_metadata.io_viamo.uiData.yPosition') + blockHeight + marginHeight
      },

      canvasWidth() {
        const defaultWidth = window.screen.availWidth
        if (!this.flows[0].blocks && this.flows[0].blocks.length) {
          return defaultWidth
        }

        const blockAtTheFurthestRightPosition = lodash.maxBy(this.flows[0].blocks, 'platform_metadata.io_viamo.uiData.xPosition')

        if (!blockAtTheFurthestRightPosition) {
          console.debug('Interaction Designer', 'Unable to find block at the furthest right position')
          return defaultWidth
        }

        const blockElement = document.getElementById(`block/${blockAtTheFurthestRightPosition.uuid}`)

        if (!blockElement) {
          console.debug('Interaction Designer', 'Unable to find DOM element corresponding to furthest right block id: ', `block/${blockAtTheFurthestRightPosition.uuid}`)
          return defaultWidth
        }

        const blockWidth = blockElement.clientWidth
        const marginWidth = 100
        return lodash.get(blockAtTheFurthestRightPosition, 'platform_metadata.io_viamo.uiData.xPosition') + blockWidth + marginWidth
      },
    },

    watch: {
      canvasHeight: {
        immediate: true,
        handler: function (newValue) {
          window.scrollTo({
            top: newValue,
            behavior: 'smooth'
          })
        }
      },
      canvasWidth: {
        immediate: true,
        handler: function (newValue) {
          window.scrollTo({
            left: newValue,
            behavior: 'smooth'
          })
        }
      }
    }
  })
export default class BuilderCanvas extends Vue {
}

export { BuilderCanvas }
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
    /*standard proportion min-width and min-height here so that initial render on slower machines*/
    min-width: 1024px;
    min-height: 768px;
  }
</style>
