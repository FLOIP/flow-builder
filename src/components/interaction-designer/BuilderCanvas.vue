<template>
  <div v-if="flows.length"
       class="builder-canvas no-select"
       :style="{width: `${canvasWidth}px` , height: `${canvasHeight}px`}"
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
        console.log(`lowest block`)
        const defaultHeight = 500
        if (!this.flows[0].blocks && this.flows[0].blocks.length) {
          return defaultHeight
        }
        console.log(`has blocks[]`)
        console.log(this.flows[0].blocks)
        const blockAtTheLowestPosition = lodash.maxBy(this.flows[0].blocks, 'platform_metadata.io_viamo.uiData.xPosition')

        if (!blockAtTheLowestPosition) {
          return defaultHeight
        }

        console.log(`has block`)
        console.log(blockAtTheLowestPosition)
        // const blockElement = document.getElementById(`block/${blockAtTheLowestPosition.uuid}`)
        //
        // if (!blockElement) {
        //   return defaultHeight
        // }

        const blockHeight = 140 //blockElement.clientHeight
        console.log(`has element x position`)
        console.log(lodash.get(blockAtTheLowestPosition, 'platform_metadata.io_viamo.uiData.xPosition'));
        return lodash.get(blockAtTheLowestPosition, 'platform_metadata.io_viamo.uiData.xPosition') + blockHeight + 100
      },

      canvasWidth() {
        console.log(`rightest block`)
        const defaultWidth = 500
        if (!this.flows[0].blocks && this.flows[0].blocks.length) {
          return defaultWidth;
        }
        console.log(`has blocks[]`)
        console.log(this.flows[0].blocks)

        const blockAtTheFurthestRightPosition = lodash.maxBy(this.flows[0].blocks, 'platform_metadata.io_viamo.uiData.yPosition')

        if (!blockAtTheFurthestRightPosition) {
          return defaultWidth
        }

        console.log(`has block`)
        console.log(blockAtTheFurthestRightPosition)

        // const blockElement = document.getElementById(`block/${blockAtTheFurthestRightPosition.uuid}`)
        //
        // if (!blockElement) {
        //   return defaultWidth
        // }

        const blockWidth = 122 //blockElement.clientWidth
        console.log(`has element y position`)
        console.log(lodash.get(blockAtTheFurthestRightPosition, 'platform_metadata.io_viamo.uiData.yPosition'))
        return lodash.get(blockAtTheFurthestRightPosition, 'platform_metadata.io_viamo.uiData.yPosition') + blockWidth + 100
      },
    },

    mounted() {
      this.$store.dispatch('builder/loadFlow')
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

  /*.builder-canvas {*/
  /*  width: 500px;*/
  /*  height: 500px;*/
  /*}*/
</style>
