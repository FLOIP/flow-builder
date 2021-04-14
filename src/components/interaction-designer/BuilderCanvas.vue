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
import { mapGetters } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'
import Block from '@/components/interaction-designer/Block.vue'
import lodash from 'lodash'

const defaultHeight = window.screen.availHeight
const defaultWidth = window.screen.availWidth

  @Component({
    components: {
      Block,
    },

    computed: {
      ...mapGetters('flow', ['activeFlow']),

      blockAtTheLowestPosition() {
        return lodash.maxBy(this.activeFlow.blocks, 'platform_metadata.io_viamo.uiData.yPosition')
      },

      blockAtTheFurthestRightPosition() {
        return lodash.maxBy(this.activeFlow.blocks, 'platform_metadata.io_viamo.uiData.xPosition')
      },

      canvasHeight() {
        if (!this.activeFlow.blocks && this.activeFlow.blocks.length) {
          return defaultHeight
        }

        if (!this.blockAtTheLowestPosition) {
          console.debug('Interaction Designer', 'Unable to find block at the lowest position')
          return defaultHeight
        }

        const blockElement = document.getElementById(`block/${this.blockAtTheLowestPosition.uuid}`)

        if (!blockElement) {
          console.debug('Interaction Designer', 'Unable to find DOM element corresponding to lowest block id: ', `block/${this.blockAtTheLowestPosition.uuid}`)
          return defaultHeight
        }

        const blockHeight = blockElement.clientHeight
        const marginHeight = 100
        return lodash.get(this.blockAtTheLowestPosition, 'platform_metadata.io_viamo.uiData.yPosition') + blockHeight + marginHeight
      },

      canvasWidth() {
        if (!this.activeFlow.blocks && this.activeFlow.blocks.length) {
          return defaultWidth
        }

        if (!this.blockAtTheFurthestRightPosition) {
          console.debug('Interaction Designer', 'Unable to find block at the furthest right position')
          return defaultWidth
        }

        const blockElement = document.getElementById(`block/${this.blockAtTheFurthestRightPosition.uuid}`)

        if (!blockElement) {
          console.debug('Interaction Designer', 'Unable to find DOM element corresponding to furthest right block id: ', `block/${this.blockAtTheFurthestRightPosition.uuid}`)
          return defaultWidth
        }

        const blockWidth = blockElement.clientWidth
        const marginWidth = 100
        return lodash.get(this.blockAtTheFurthestRightPosition, 'platform_metadata.io_viamo.uiData.xPosition') + blockWidth + marginWidth
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
