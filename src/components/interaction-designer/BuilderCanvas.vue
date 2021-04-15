<template>
  <div v-if="activeFlow"
       class="builder-canvas no-select"
       :style="{ minWidth: `${canvasWidth}px` , minHeight: `${canvasHeight}px` }"
  >

    <block v-for="block in activeFlow.blocks"
           :key="block.uuid"
           :ref="`block/${block.uuid}`"
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

  @Component({
    components: {
      Block,
    },

    data() {
      return {
        // last computed data, will be used in case the DOM not yet ready
        lastComputedCanvasHeight: this.windowHeight,
        lastComputedCanvasWidth: this.windowWidth,
      }
    },

    computed: {
      ...mapGetters('flow', ['activeFlow']),

      blockAtTheLowestPosition() {
        return lodash.maxBy(this.activeFlow.blocks, 'platform_metadata.io_viamo.uiData.yPosition')
      },

      blockAtTheFurthestRightPosition() {
        return lodash.maxBy(this.activeFlow.blocks, 'platform_metadata.io_viamo.uiData.xPosition')
      },

      windowHeight() {
        return window.screen.availHeight
      },

      windowWidth() {
        return window.screen.availWidth
      },

      canvasHeight() {
        if (!this.activeFlow.blocks && this.activeFlow.blocks.length) {
          return this.windowHeight
        }

        if (!this.blockAtTheLowestPosition) {
          console.debug('Interaction Designer', 'Unable to find block at the lowest position')
          return this.windowHeight
        }

        const blockElementRef = this.$refs[`block/${this.blockAtTheLowestPosition.uuid}`]

        if (!blockElementRef) {
          console.debug('Interaction Designer', 'Unable to find DOM element corresponding to lowest block id: ', `block/${this.blockAtTheLowestPosition.uuid}`)
          return this.lastComputedCanvasHeight
        }

        const yPosition = lodash.get(this.blockAtTheLowestPosition, 'platform_metadata.io_viamo.uiData.yPosition')
        const blockHeight = blockElementRef[0].$refs['draggable'].$el.offsetHeight
        const marginHeight = 100
        const scrollHeight = yPosition + blockHeight + marginHeight

        console.log('compare height', yPosition, blockHeight, marginHeight, scrollHeight, this.windowHeight)
        if (scrollHeight < this.windowHeight) {
          return this.windowHeight
        }

        this.lastComputedCanvasHeight = scrollHeight
        return scrollHeight
      },

      canvasWidth() {
        if (!this.activeFlow.blocks && this.activeFlow.blocks.length) {
          return this.windowWidth
        }

        if (!this.blockAtTheFurthestRightPosition) {
          console.debug('Interaction Designer', 'Unable to find block at the furthest right position')
          return this.windowWidth
        }

        const blockElementRef = this.$refs[`block/${this.blockAtTheFurthestRightPosition.uuid}`]

        if (!blockElementRef) {
          console.debug('Interaction Designer', 'Unable to find DOM element corresponding to furthest right block id: ', `block/${this.blockAtTheFurthestRightPosition.uuid}`)
          return this.lastComputedCanvasWidth
        }

        const xPosition = lodash.get(this.blockAtTheLowestPosition, 'platform_metadata.io_viamo.uiData.xPosition')
        const blockWidth = blockElementRef[0].$refs['draggable'].$el.offsetWidth
        const marginWidth = 100
        const scrollWidth = xPosition + blockWidth + marginWidth

        if (scrollWidth < this.windowWidth) {
          return this.windowWidth
        }

        this.lastComputedCanvasWidth = scrollWidth
        return scrollWidth
      },
    },

    watch: {
      canvasHeight: function (newValue) {
        console.log('canvasHeight changed', newValue)
        window.scrollTo({
          top: newValue,
          behavior: 'smooth'
        })
      },
      canvasWidth: function (newValue) {
        console.log('canvasWidth changed', newValue)
        window.scrollTo({
          left: newValue,
          behavior: 'smooth'
        })
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
