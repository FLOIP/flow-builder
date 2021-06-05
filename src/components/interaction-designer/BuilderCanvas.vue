<template>
  <div v-if="activeFlow"
       class="builder-canvas no-select"
       :style="{ minWidth: `${canvasWidth}px` , minHeight: `${canvasHeight}px` }"
  >
    <plain-draggable class="all-selected-block"
                     :start-x="80" :start-y="80" style="width: 100px; height: 100px;">
      <div class="draggable-handle" style="cursor: pointer">
        <div style="background-color: #531944; color: white">
          Drag me
        </div>
      </div>
      <block v-for="block in allSelectedBlocks"
             :key="block.uuid"
             :ref="`block/${block.uuid}`"
             :id="`block/${block.uuid}`"
             :block="block"
             :x="block.vendor_metadata.io_viamo.uiData.xPosition"
             :y="block.vendor_metadata.io_viamo.uiData.yPosition" />
    </plain-draggable>

    <block v-for="block in allNonSelectedBlocks" class="non-selected-block"
           :key="block.uuid"
           :ref="`block/${block.uuid}`"
           :id="`block/${block.uuid}`"
           :block="block"
           :x="block.vendor_metadata.io_viamo.uiData.xPosition"
           :y="block.vendor_metadata.io_viamo.uiData.yPosition" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import Block from '@/components/interaction-designer/Block.vue'
import { find, isEqual, cloneDeep, debounce, maxBy, get, filter, includes } from 'lodash'
import { namespace } from 'vuex-class'
import { IBlock, IFlow } from '@floip/flow-runner'
import { IValidationStatus } from '@/store/validation'
import PlainDraggable from '@/components/common/PlainDraggable.vue'

const flowVuexNamespace = namespace('flow')
const validationVuexNamespace = namespace('validation')

const MARGIN_HEIGHT = 100 //px
const MARGIN_WIDTH = 100 //px
const DEBOUNCE_SCROLL_TIMER = 100 //ms

@Component({
  components: {
    Block,
    PlainDraggable,
  },
})
export default class BuilderCanvas extends Vue {
  @Prop() block!: IBlock

  // ###### Validation API Watchers [
  @Watch('activeFlow', { deep: true, immediate: true })
  async onActiveFlowChanged(newFlow: IFlow) {
    console.debug('watch/activeFlow:', 'active flow has changed, validating ...')
    await this.validate_flow({ flow: newFlow })
  }

  @Watch('blocksOnActiveFlowForWatcher', { deep: true, immediate: true })
  async onBlocksInActiveFlowChanged(newBlocks: IBlock[], oldBlocks: IBlock[]) {
    if (newBlocks.length === 0) {
      return
    }

    console.debug('watch/activeFlow.blocks:', 'blocks inside active flow have changed, validating ...')
    for (let i = 0;  i < newBlocks.length; i++) {
      const currentNewBlock = newBlocks[i]
      const currentOldBlock = find(oldBlocks, { 'uuid': currentNewBlock.uuid })

      if (isEqual(currentNewBlock, currentOldBlock)) {
        continue // no changes found
      }

      await this.validate_block({ block: currentNewBlock })
    }
  }
  // ] ######### end Validation API Watchers

  // ##### Canvas dynamic size watchers [
  @Watch('canvasHeight')
  onCanvasHeightChanged(newValue: number) {
    console.debug('canvas height changed to', newValue)
    this.debounceVerticalScroll()
  }

  @Watch('canvasWidth')
  onCanvasWidthChanged(newValue: number) {
    console.debug('canvas width changed to', newValue)
    this.debounceHorizontalScroll()
  }

  debounceVerticalScroll = debounce(function(this: any) { // !important: do not change to arrow function
    window.scrollTo({
      top: this.canvasHeight,
    })
  }, DEBOUNCE_SCROLL_TIMER)

  debounceHorizontalScroll = debounce(function(this: any) { // !important: do not change to arrow function
    window.scrollTo({
      left: this.canvasWidth,
    })
  }, DEBOUNCE_SCROLL_TIMER)

  // ] ######## end canvas dynamic size watchers

  get blocksOnActiveFlowForWatcher() {
    return cloneDeep(this.activeFlow.blocks) // needed to make comparison between new & old values on watcher
  }

  get blockHeight() {
    const blockElementRef = this.$refs[`block/${this.blockAtTheLowestPosition?.uuid}`] as Vue[]// it returns array as we loop blocks inside v-for
    if (!blockElementRef) {
      console.debug('Interaction Designer', 'Unable to find DOM element corresponding to lowest block id: ', `block/${this.blockAtTheLowestPosition?.uuid}`)
      return 150 // temporary dummy height for UI scroll purpose
    }
    return (<HTMLElement> (<Vue> blockElementRef[0].$refs['draggable']).$el).offsetHeight
  }

  get blockWidth() {
    const blockElementRef = this.$refs[`block/${this.blockAtTheFurthestRightPosition?.uuid}`] as Vue[]// it returns array as we loop blocks inside v-for

    if (!blockElementRef) {
      console.debug('Interaction Designer', 'Unable to find DOM element corresponding to furthest right block id: ', `block/${this.blockAtTheFurthestRightPosition?.uuid}`)
      return 110 // temporary dummy width for UI scroll purpose
    }

    return (<HTMLElement> (<Vue> blockElementRef[0].$refs['draggable']).$el).offsetWidth
  }

  get blockAtTheLowestPosition() {
    return maxBy(this.activeFlow.blocks, 'vendor_metadata.io_viamo.uiData.yPosition')
  }

  get blockAtTheFurthestRightPosition() {
    return maxBy(this.activeFlow.blocks, 'vendor_metadata.io_viamo.uiData.xPosition')
  }

  get windowHeight() {
    return window.screen.availHeight
  }

  get windowWidth() {
    return window.screen.availWidth
  }

  get canvasHeight() {
    if (!this.activeFlow.blocks && this.activeFlow.blocks!.length) {
      return this.windowHeight
    }

    if (!this.blockAtTheLowestPosition) {
      console.debug('Interaction Designer', 'Unable to find block at the lowest position')
      return this.windowHeight
    }

    const yPosition = get(this.blockAtTheLowestPosition, 'vendor_metadata.io_viamo.uiData.yPosition')
    const scrollHeight = yPosition + this.blockHeight + MARGIN_HEIGHT

    if (scrollHeight < this.windowHeight) {
      return this.windowHeight
    }

    return scrollHeight
  }

  get canvasWidth(): number {
    if (!this.activeFlow.blocks && this.activeFlow.blocks!.length) {
      return this.windowWidth
    }

    if (!this.blockAtTheFurthestRightPosition) {
      console.debug('Interaction Designer', 'Unable to find block at the furthest right position')
      return this.windowWidth
    }

    const xPosition = get(this.blockAtTheLowestPosition, 'vendor_metadata.io_viamo.uiData.xPosition')
    const scrollWidth = xPosition + this.blockWidth + MARGIN_WIDTH

    if (scrollWidth < this.windowWidth) {
      return this.windowWidth
    }

    return scrollWidth
  }

  get allSelectedBlocks() {
    return filter(this.activeFlow.blocks, (block) => {
      return includes(this.selectedBlocks, block.uuid)
    })
  }

  get allNonSelectedBlocks() {
    return filter(this.activeFlow.blocks, (block) => {
      return !includes(this.selectedBlocks, block.uuid)
    })
  }

  @flowVuexNamespace.State flows?: IFlow[]
  @flowVuexNamespace.State selectedBlocks!: IBlock['uuid'][]
  @flowVuexNamespace.Getter activeFlow!: IFlow

  @validationVuexNamespace.Action validate_flow!: ({ flow } : { flow: IFlow }) => Promise<IValidationStatus>
  @validationVuexNamespace.Action validate_block!: ({ block } : { block: IBlock }) => Promise<IValidationStatus>
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
