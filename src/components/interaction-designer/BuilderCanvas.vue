<template>
  <div
    v-if="activeFlow"
    class="builder-canvas no-select"
    :style="{ minWidth: `${canvasWidth}px` , minHeight: `${canvasHeight}px` }">
    <block
      v-for="block in activeFlow.blocks"
      :id="`block/${block.uuid}`"
      :key="block.uuid"
      :ref="`block/${block.uuid}`"
      :block="block"
      :x="block.ui_metadata.canvas_coordinates.x"
      :y="block.ui_metadata.canvas_coordinates.y" />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import Block from '@/components/interaction-designer/Block.vue'
import {cloneDeep, debounce, find, get, isEqual, maxBy} from 'lodash'
import {namespace} from 'vuex-class'
import {IBlock, IFlow, IResources} from '@floip/flow-runner'
import {IValidationStatus} from '@/store/validation'

const flowVuexNamespace = namespace('flow')
const validationVuexNamespace = namespace('validation')
const builderVuexNamespace = namespace('builder')

//in `px`
const MARGIN_HEIGHT_CORRECTION = -10

//ideal value: the xDelta when we compute xPosition from existing active block, in `px`
const MARGIN_WIDTH_CORRECTION = 120

//in `ms`
const DEBOUNCE_SCROLL_TIMER = 300

@Component({
  components: {
    Block,
  },
})
export default class BuilderCanvas extends Vue {
  @Prop() block!: IBlock
  @Prop({default: 0}) widthAdjustment!: number

  // ###### Validation API Watchers [
  @Watch('activeFlow', {deep: true, immediate: true})
  async onActiveFlowChanged(newFlow: IFlow) {
    console.debug('watch/activeFlow:', 'active flow has changed, validating ...')
    await this.validate_flow({flow: newFlow})
  }

  @Watch('blocksOnActiveFlowForWatcher', {deep: true, immediate: true})
  async onBlocksInActiveFlowChanged(newBlocks: IBlock[], oldBlocks: IBlock[]) {
    if (newBlocks.length === 0) {
      return
    }

    console.debug('watch/activeFlow.blocks:', 'blocks inside active flow have changed, validating ...')

    await Promise.all(
      newBlocks.map(async (currentNewBlock) => {
        const currentOldBlock = find(oldBlocks, {uuid: currentNewBlock.uuid})
        if (!isEqual(currentNewBlock, currentOldBlock)) {
          await this.validate_block({block: currentNewBlock})
        }
      }),
    )
  }

  @Watch('resourcesOnActiveFlow', {deep: true, immediate: true})
  async onResourcesChanged(newResources: IResources[], oldResources: IResources[]) {
    if (newResources.length === 0) {
      return
    }

    console.debug('watch/resourcesOnActiveFlow:', 'resources inside active flow have changed, validating ...')
    // TOOD: change this to validation call
    console.debug('resources', newResources)
  }
  // ] ######### end Validation API Watchers

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
  }, DEBOUNCE_SCROLL_TIMER)

  // !important: do not change to arrow function

  debounceHorizontalScroll = debounce(function (this: any) {
    window.scrollTo({
      left: this.canvasWidth,
    })
  }, DEBOUNCE_SCROLL_TIMER)

  // ] ######## end canvas dynamic size watchers

  get blocksOnActiveFlowForWatcher(): IBlock[] {
    // needed to make comparison between new & old values on watcher
    return cloneDeep(this.activeFlow.blocks)
  }

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
    const scrollHeight = yPosition + MARGIN_HEIGHT_CORRECTION

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
    const scrollWidth = xPosition + this.blockWidth + MARGIN_WIDTH_CORRECTION + this.visibleBlockEditorWidth

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
  @flowVuexNamespace.Getter resourcesOnActiveFlow!: IResources[]

  @builderVuexNamespace.State isBlockEditorOpen!: boolean

  @validationVuexNamespace.Action validate_flow!: ({flow}: { flow: IFlow }) => Promise<IValidationStatus>
  @validationVuexNamespace.Action validate_block!: ({block}: { block: IBlock }) => Promise<IValidationStatus>
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
  /*standard proportion min-width and min-height here so that initial render on slower machines*/
  min-width: 1024px;
  min-height: 768px;
}
</style>
