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
           :x="block.vendor_metadata.io_viamo.uiData.xPosition"
           :y="block.vendor_metadata.io_viamo.uiData.yPosition" />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'
import Block from '@/components/interaction-designer/Block.vue'
import lodash from 'lodash'

const MARGIN_HEIGHT = 100 //px
const MARGIN_WIDTH = 100 //px
const DEBOUNCE_SCROLL_TIMER = 100 //ms

  @Component({
    components: {
      Block,
    },

    computed: {
      ...mapGetters('flow', ['activeFlow']),

      blockHeight() {
        const blockElementRef = this.$refs[`block/${this.blockAtTheLowestPosition.uuid}`]
        if (!blockElementRef) {
          console.debug('Interaction Designer', 'Unable to find DOM element corresponding to lowest block id: ', `block/${this.blockAtTheLowestPosition.uuid}`)
          return 150 // temporary dummy height for UI scroll purpose
        }
        return blockElementRef[0].$refs['draggable'].$el.offsetHeight
      },

      blockWidth() {
        const blockElementRef = this.$refs[`block/${this.blockAtTheFurthestRightPosition.uuid}`]

        if (!blockElementRef) {
          console.debug('Interaction Designer', 'Unable to find DOM element corresponding to furthest right block id: ', `block/${this.blockAtTheFurthestRightPosition.uuid}`)
          return 110 // temporary dummy width for UI scroll purpose
        }

        return blockElementRef[0].$refs['draggable'].$el.offsetWidth
      },

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

        const yPosition = lodash.get(this.blockAtTheLowestPosition, 'platform_metadata.io_viamo.uiData.yPosition')
        const scrollHeight = yPosition + this.blockHeight + MARGIN_HEIGHT

        if (scrollHeight < this.windowHeight) {
          return this.windowHeight
        }

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

        const xPosition = lodash.get(this.blockAtTheLowestPosition, 'platform_metadata.io_viamo.uiData.xPosition')
        const scrollWidth = xPosition + this.blockWidth + MARGIN_WIDTH

        if (scrollWidth < this.windowWidth) {
          return this.windowWidth
        }

        return scrollWidth
      },
    },

    watch: {
      canvasHeight: function (newValue) {
        console.debug('canvas height changed to', newValue)
        this.debounceVerticalScroll()
      },
      canvasWidth: function (newValue) {
        console.debug('canvas width changed to', newValue)
        this.debounceHorizontalScroll()
      }
    },

    methods: {
      debounceVerticalScroll: lodash.debounce(function() { // !important: do not change to arrow function
        window.scrollTo({
          top: this.canvasHeight,
        })
      }, DEBOUNCE_SCROLL_TIMER),

      debounceHorizontalScroll: lodash.debounce(function() { // !important: do not change to arrow function
        window.scrollTo({
          left: this.canvasWidth,
        })
      }, DEBOUNCE_SCROLL_TIMER)
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
