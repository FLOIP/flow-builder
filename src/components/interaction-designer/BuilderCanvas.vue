<template>
  <div v-if="activeFlow"
       class="builder-canvas no-select"
       :style="{ minWidth: `${canvasWidth}px` , minHeight: `${canvasHeight}px` }"
  >

    <plain-draggable v-if="selectedBlocks.length > 0" class="all-selected-block"
                     @initialized="onInitializedMultiSelectionDrag($event)"
                     @dragStarted="onStartedMultiSelectionDrag($event)"
                     @dragged="onMovedMultiSelection"
                     @dragEnded="onEndedMultiSelectionDrag($event)"
                     :start-x="selectedBlocksOuterRectArea.x"
                     :start-y="selectedBlocksOuterRectArea.y"
    >
      <div class="draggable-handle drag-multiselect">
        <div class="drag-element border-primary rounder" :style="{
                       width: `${selectedBlocksOuterRectArea.width}px`,
                       height: `${selectedBlocksOuterRectArea.height}px`
                     }">
          Drag me
        </div>

        <plain-draggable class="selected-block-area border-secondary"
                         v-for="rectArea in areasForMultipleMove"
                         :start-x="rectArea.left"
                         :start-y="rectArea.top"
                         :style="{
                           width: `${rectArea.width}px`,
                           height: `${rectArea.height}px`,
                         }"
                         @initialized="onInitializedBlockSelectionDrag($event, rectArea.block)">

          <div class="draggable-handle">
            <p class="block-type text-muted">
              TYPE
            </p>
            <span>
            'Untitled block'
          </span>
          </div>
        </plain-draggable>
      </div>
    </plain-draggable>

    <block v-for="block in this.activeFlow.blocks"
           :key="block.uuid"
           :ref="`block/${block.uuid}`"
           :id="`block/${block.uuid}`"
           :block="block"
           :x="block.vendor_metadata.io_viamo.uiData.xPosition"
           :y="block.vendor_metadata.io_viamo.uiData.yPosition"
           @selecting-block="onSelectingBlock"
           @deselecting-block="onDeselectingBlock"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import Block from '@/components/interaction-designer/Block.vue'
import {find, isEqual, cloneDeep, debounce, maxBy, minBy, get, filter, includes, forEach} from 'lodash'
import { namespace } from 'vuex-class'
import {findBlockWith, IBlock, IFlow} from '@floip/flow-runner'
import { IValidationStatus } from '@/store/validation'
import PlainDraggable from '@/components/common/PlainDraggable.vue'
import {IPosition} from "@/store/builder";
import Lang from '@/lib/filters/lang'
import {mixins} from "vue-class-component";

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')
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
export default class BuilderCanvas extends mixins(Lang) {
  @Prop() block!: IBlock

  created() {
    this.blockDraggablesById = {}
  }

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

  onInitializedMultiSelectionDrag({ draggable }) {
    this.draggableForMultipleMove['main'] = draggable
  }

  onInitializedBlockSelectionDrag({ draggable }, block) {
    this.draggableForMultipleMove[block.uuid] = draggable
  }

  onMovedMultiSelection({ position: { left: x, top: y } }) {

  }

  onStartedMultiSelectionDrag({ draggable }) {
    const { left: x, top: y } = draggable
    this.multiDragPositions.start = { x, y }
  }

  onEndedMultiSelectionDrag({ draggable }) {
    const { left: x, top: y } = draggable
    this.multiDragPositions.end = { x, y }

    const delta = {
      x: x - this.multiDragPositions.start.x,
      y: y - this.multiDragPositions.start.y
    }

    console.debug('checkRS', 'BuilderCanvas', 'move multiselection using delta', delta)

    const self = this
    this.$nextTick(() => {
      forEach(self.selectedBlocks, (block) => {
        const newPosition = self.setBlockPositionFromDelta({ delta, block })

        console.debug('checkRS', 'BuilderCanvas', 'new position', block.uuid, newPosition)
        // Update draggable position for each block move area
        Object.assign(
          self.draggableForMultipleMove[block.uuid],
          { left: newPosition.x, top: newPosition.y }
        )
      })
      // Update draggable position for the whole multi-selection move area
      Object.assign(draggable, { left: self.selectedBlocksOuterRectArea.x, top: self.selectedBlocksOuterRectArea.y })
      console.debug('Multiple blocks', 'ended drag', 'positioned all of', self.draggableForBlocksByUuid)
    })
  }

  onSelectingBlock(block) {
    const self = this
    this.$nextTick(() => {
      console.log('onSelectingBlock', self.draggableForMultipleMove)
      const { vendor_metadata: {
        io_viamo: {
          uiData: {
            xPosition: x,
            yPosition: y
          }
        }
      }} = block
      // Update draggable position for the block move area
      Object.assign(
        self.draggableForMultipleMove[block.uuid],
        { left: x, top: y }
      )

      // Update draggable position for the whole multi-selection move area
      Object.assign(self.draggableForMultipleMove['main'], { left: self.selectedBlocksOuterRectArea.x, top: self.selectedBlocksOuterRectArea.y })
    })
  }

  onDeselectingBlock(block) {
    delete this.draggableForMultipleMove[block.uuid]
  }

  getBlockHeightFromDom(blockUuid) {
    const blockElementRef = this.$refs[`block/${blockUuid}`] as Vue[]// it returns array as we loop blocks inside v-for
    if (!blockElementRef) {
      console.debug('Interaction Designer', 'Unable to find DOM element corresponding to lowest block id: ', `block/${blockUuid}`)
      return 150 // temporary dummy height for UI scroll purpose
    }
    return (<HTMLElement> (<Vue> blockElementRef[0].$refs['draggable']).$el).offsetHeight
  }

  getBlockWidthFromDom(blockUuid) {
    const blockElementRef = this.$refs[`block/${blockUuid}`] as Vue[]// it returns array as we loop blocks inside v-for

    if (!blockElementRef) {
      console.debug('Interaction Designer', 'Unable to find DOM element corresponding to furthest right block id: ', `block/${blockUuid}`)
      return 110 // temporary dummy width for UI scroll purpose
    }

    return (<HTMLElement> (<Vue> blockElementRef[0].$refs['draggable']).$el).offsetWidth
  }

  get blocksOnActiveFlowForWatcher() {
    return cloneDeep(this.activeFlow.blocks) // needed to make comparison between new & old values on watcher
  }

  get activeBlockHeight() {
    return this.getBlockHeightFromDom(this.blockAtTheLowestPosition?.uuid)
  }

  get activeBlockWidth() {
    return this.getBlockWidthFromDom(this.blockAtTheFurthestRightPosition?.uuid)
  }

  get blockAtTheLowestPosition() {
    return maxBy(this.activeFlow.blocks, 'vendor_metadata.io_viamo.uiData.yPosition')
  }

  get blockAtTheFurthestRightPosition() {
    return maxBy(this.activeFlow.blocks, 'vendor_metadata.io_viamo.uiData.xPosition')
  }

  get blockAtTheTopPosition() {
    return minBy(this.activeFlow.blocks, 'vendor_metadata.io_viamo.uiData.yPosition')
  }

  get blockAtTheFurthestLeftPosition() {
    return minBy(this.activeFlow.blocks, 'vendor_metadata.io_viamo.uiData.xPosition')
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
    const scrollHeight = yPosition + this.activeBlockHeight + MARGIN_HEIGHT

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
    const scrollWidth = xPosition + this.activeBlockWidth + MARGIN_WIDTH

    if (scrollWidth < this.windowWidth) {
      return this.windowWidth
    }

    return scrollWidth
  }

  get selectedBlocksOuterRectArea() {
    console.log('selectedBlocksInnerRectArea', JSON.stringify(this.selectedBlocksInnerRectArea))
    const margin = 20
    const outerArea = cloneDeep(this.selectedBlocksInnerRectArea)
    outerArea.height = outerArea.height + this.activeBlockHeight + 2*margin
    outerArea.width = outerArea.width + this.activeBlockWidth + 2*margin

    outerArea.x = outerArea.x - margin > 0 ? outerArea.x - margin : 0
    outerArea.y = outerArea.y - margin > 0 ? outerArea.y - margin : 0
    console.log('selectedBlocksOuterRectArea', JSON.stringify(outerArea))
    return outerArea
  }

  get areasForMultipleMove() {
    const margin = 5
    const self = this
    let areas = []
    forEach(self.selectedBlocks, function (block) {
      areas.push({
        left: block.vendor_metadata.io_viamo.uiData.xPosition - margin,
        top: block.vendor_metadata.io_viamo.uiData.yPosition - margin,
        width: self.getBlockWidthFromDom(block.uuid) + 2*margin,
        height: self.getBlockHeightFromDom(block.uuid) + 2*margin,
        block: block
      })
    })
    return areas
  }

  @flowVuexNamespace.State flows?: IFlow[]
  @flowVuexNamespace.State selectedBlockUuids!: IBlock['uuid'][]
  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Getter selectedBlocks!: IBlock[]
  @flowVuexNamespace.Getter selectedBlocksInnerRectArea!: object

  @builderVuexNamespace.State draggableForBlocksByUuid!: object
  @builderVuexNamespace.State draggableForMultipleMove!: object
  @builderVuexNamespace.State multiDragPositions!: { start: IPosition; end: IPosition }
  @builderVuexNamespace.Mutation setBlockPositionTo!: ({ position, block }: { position: any, block: IBlock }) => void
  @builderVuexNamespace.Action setBlockPositionFromDelta!: () => object

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

  .all-selected-block {
    position: absolute;
    z-index: 10;
  }

  .drag-multiselect {
    cursor: grab;
  }

  .drag-element {
    pointer-events: none;
    cursor: none;
    /*background-color: #531944;*/
    background-color: transparent;
    border: medium dashed;
  }

  .selected-block-area {
    position: absolute;
    background-color: transparent;
    border: medium dashed;
  }
</style>
