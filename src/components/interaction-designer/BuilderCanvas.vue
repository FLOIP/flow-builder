<template>
  <div
    v-if="activeFlow"
    class="builder-canvas no-select"
    :style="{ minWidth: `${canvasWidth}px` , minHeight: `${canvasHeight}px` }">
    <block
      v-for="block in activeFlow.blocks"
      :key="block.uuid"
      :block="block"
      :x="block.ui_metadata.canvas_coordinates.x"
      :y="block.ui_metadata.canvas_coordinates.y" />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {debounce, maxBy} from 'lodash'
import {namespace} from 'vuex-class'
import {IBlock, IFlow} from '@floip/flow-runner'

const flowVuexNamespace = namespace('flow')
const validationVuexNamespace = namespace('validation')
const builderVuexNamespace = namespace('builder')

const MARGIN_HEIGHT_CORRECTION_PX = -10

//ideal value: the xDelta when we compute xPosition from existing active block
const MARGIN_WIDTH_CORRECTION_PX = 120

const DEBOUNCE_SCROLL_TIMER_MS = 300

@Component({})
export class BuilderCanvas extends Vue {
  @Prop({default: 0}) widthAdjustment!: number

  // ##### Canvas dynamic size watchers [
  @Watch('canvasHeight')
  onCanvasHeightChanged(newValue: number): void {
    console.debug('canvas height changed to', newValue)
    this.debounceVerticalScroll()
  }

  @Watch('canvasWidth')
  onCanvasWidthChanged(newValue: number): void {
    console.debug('canvas width changed to', newValue)
    this.debounceHorizontalScroll()
  }

  // !important: do not change to arrow function

  debounceVerticalScroll = debounce(function (this: any) {
    window.scrollTo({
      top: this.canvasHeight,
    })
  }, DEBOUNCE_SCROLL_TIMER_MS)

  // !important: do not change to arrow function

  debounceHorizontalScroll = debounce(function (this: any) {
    window.scrollTo({
      left: this.canvasWidth,
    })
  }, DEBOUNCE_SCROLL_TIMER_MS)

  // ] ######## end canvas dynamic size watchers

  get blockHeight(): number {
    // it returns array as we loop blocks inside v-for
    const blockElementRef = this.$refs[`block/${this.blockAtTheLowestPosition?.uuid}`] as Vue[]
    if (!blockElementRef) {
      console.debug(
        'Interaction Designer',
        'Unable to find DOM element corresponding to lowest block id: ',
        `block/${this.blockAtTheLowestPosition?.uuid}`,
      )
      // for UI scroll purpose
      const temporaryDummyHeight = 84
      return temporaryDummyHeight
    }
    return (<HTMLElement>(<Vue>blockElementRef[0].$refs.draggable).$el).offsetHeight
  }

  get blockWidth(): number {
    // it returns array as we loop blocks inside v-for
    const blockElementRef = this.$refs[`block/${this.blockAtTheFurthestRightPosition?.uuid}`] as Vue[]

    if (!blockElementRef) {
      console.debug(
        'Interaction Designer',
        'Unable to find DOM element corresponding to furthest right block id: ',
        `block/${this.blockAtTheFurthestRightPosition?.uuid}`,
      )
      // for UI scroll purpose
      const temporaryDummyWidth = 110
      return temporaryDummyWidth
    }

    return ((blockElementRef[0].$refs.draggable as Vue).$el as HTMLElement).offsetWidth
  }

  get blockAtTheLowestPosition(): any {
    return maxBy(this.activeFlow.blocks, 'ui_metadata.canvas_coordinates.y')
  }

  get blockAtTheFurthestRightPosition(): any {
    return maxBy(this.activeFlow.blocks, 'ui_metadata.canvas_coordinates.x')
  }

  get windowHeight(): number {
    return window.screen.availHeight
  }

  get windowWidth(): number {
    return window.screen.availWidth
  }

  get canvasHeight(): any {
    if (this.activeFlow.blocks.length === 0) {
      return this.windowHeight
    }

    if (!this.blockAtTheLowestPosition) {
      console.debug('Interaction Designer', 'Unable to find block at the lowest position')
      return this.windowHeight
    }

    const yPosition: number = this.blockAtTheLowestPosition.ui_metadata.canvas_coordinates.y
    const scrollHeight = yPosition + MARGIN_HEIGHT_CORRECTION_PX

    if (scrollHeight < this.windowHeight) {
      return this.windowHeight
    }

    return scrollHeight
  }

  get canvasWidth(): number {
    if (this.activeFlow.blocks.length === 0) {
      return this.windowWidth - this.widthAdjustment
    }

    if (!this.blockAtTheFurthestRightPosition) {
      console.debug('Interaction Designer', 'Unable to find block at the furthest right position')
      return this.windowWidth - this.widthAdjustment
    }

    const xPosition: number = this.blockAtTheFurthestRightPosition.ui_metadata.canvas_coordinates.x
    const scrollWidth = xPosition + this.blockWidth + MARGIN_WIDTH_CORRECTION_PX + this.visibleBlockEditorWidth

    if (scrollWidth < this.windowWidth) {
      return this.windowWidth - this.widthAdjustment
    }

    return scrollWidth - this.widthAdjustment
  }

  get visibleBlockEditorWidth(): number {
    const blockEditorWidth = 365
    return this.isBlockEditorOpen ? blockEditorWidth : 0
  }

  @flowVuexNamespace.State flows?: IFlow[]
  @flowVuexNamespace.Getter activeFlow!: IFlow

  @builderVuexNamespace.State isBlockEditorOpen!: boolean
}

export default BuilderCanvas
</script>

<style scoped lang="scss">
@import "../../scss/custom_variables";
.no-select * {
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
  background: $neutral-40;
  position: relative;
}
</style>
