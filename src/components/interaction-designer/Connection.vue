<template>
  <span
    class="connection"
    :reposition-hook="repositionHook" />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import {mixins} from 'vue-class-component'
import {Component, Prop, Watch} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import LeaderLine from 'leader-line'
import {set} from 'lodash'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'
import {IConnectionContext} from '@/store/builder'

export const colorStates = {
  ON_HOVER: '#A31E65',
  CONNECTING: '#10661E',
  // For states: Disconnected, Connected, Extremity element in focus
  DEFAULT: '#707070',
}

const builderNamespace = namespace('builder')

interface ILeaderLineOptions {
  color: string,
  // endPlugColor: string,
  endPlugSize: number,
  endSocket: string,
  gradient: true,
  outline: boolean,
  outlineColor: string,
  path: string,
  size: number,
  startPlug: string,
  // startPlugColor: string,
  startSocket: string,
}

@Component({})
export class Connection extends mixins(Lang) {
  @Prop({type: Object, required: true}) readonly exit!: IBlockExit
  @Prop({type: Function, required: true}) readonly repaintCacheKeyGenerator!: Function
  @Prop({type: Object}) readonly source!: IBlock
  @Prop({type: Object}) readonly target!: IBlock
  @Prop({type: Object}) readonly position!: { x: number, y: number }
  @Prop({type: String}) readonly color!: string

  // The leader-line library has no types yet
  // No need to set up observers over this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  line: any = undefined
  isPermanentlyActive = false

  get hasDestination(): Boolean {
    return this.exit.destination_block != null
  }

  /**
   * these options come from the Leader-line doc: https://anseki.github.io/leader-line/#options
   */
  get options(): ILeaderLineOptions {
    return {
      startPlug: 'square',
      color: this.color,
      startSocket: 'bottom',
      endSocket: 'top',
      size: 4,
      path: 'grid',
      endPlugSize: 1,
      // middleLabel: LeaderLine.captionLabel(this.exit.name, {
      //   color: darkColor,
      //   fontSize: 12,
      //   // lineOffset: 65,
      // }),
    }
  }

  get onHoverOptions(): Partial<ILeaderLineOptions> {
    return {
      color: colorStates.ON_HOVER,
    }
  }

  get connectionContext(): IConnectionContext {
    return {
      sourceId: this.source?.uuid ?? '',
      targetId: this.target?.uuid ?? '',
      exitId: this.exit?.uuid ?? '',
    }
  }

  get sourceElementId(): string {
    return `exit/${this.exit.uuid}/handle`
  }

  get targetElementId(): string {
    const {exit} = this
    return exit.destination_block
      ? `block/${exit.destination_block}/handle`
      : `exit/${exit.uuid}/pseudo-block-handle`
  }

  // todo: externalize as `positionCacheKey` + deprecate `position` prop
  //       but rather include that in `positionCacheKey`'s domain definition
  get repositionHook(): string | null {
    if (!this.repaintCacheKeyGenerator) {
      return null
    }

    // @note - intentional side-effect; todo: move this into vuex responding to data changes
    // todo: we only want this called if something changes.
    this.$nextTick(() => {
      this.reposition()
    })

    // generate drafts while 'between exits' or 'source/destination unknown'
    // todo: push these out into ?block?
    const source = this.source || {
      ...set({}, 'ui_metadata.canvas_coordinates.x', this.position?.x),
      ...set({}, 'ui_metadata.canvas_coordinates.y', this.position?.y),
    }

    const target = this.target || {
      ...set({}, 'ui_metadata.canvas_coordinates.x', this.position?.x),
      ...set({}, 'ui_metadata.canvas_coordinates.y', this.position?.y),
    }

    return this.repaintCacheKeyGenerator(source, target)
      .join('\n')
  }

  mounted(): void {
    // todo: add an invisible centered dot on a node header
    // if (!this.datum.source || !this.datum.target) {
    //   return
    // }

    // todo: I think we can do something like this instead; will this prevent all the hairy business if we use pointAnchors?
    //       See: https://github.com/anseki/leader-line#element
    //       What I'm thinking is that we can just leverage these x/y's? How do we then update them?
    // new LeaderLine(element1, LeaderLine.pointAnchor(element3, {x: 10, y: 30}));

    // const {sourcePosition, targetPosition} = this
    // this.line = new LeaderLine(
    //     LeaderLine.pointAnchor(document.body, sourcePosition),
    //     LeaderLine.pointAnchor(document.body, targetPosition), options)

    const blockPaddingOffset = {x: '50%', y: -7}
    const start = document.getElementById(this.sourceElementId)
    const end = this.position
      ? document.getElementById(this.targetElementId)
      : LeaderLine.pointAnchor(document.getElementById(this.targetElementId), blockPaddingOffset)

    this.line = new LeaderLine(start, end, this.options)

    // The only way to identify current line so far: https://github.com/anseki/leader-line/issues/185
    const connectionElement: Element | null = document.querySelector('body>.leader-line:last-of-type')

    // Add event listeners
    if (connectionElement !== null) {
      connectionElement.addEventListener('click', this.clickHandler.bind(this), false)
      document.addEventListener('click', this.clickAwayHandler.bind(this, connectionElement), false)
      connectionElement.addEventListener('mouseover', this.mouseOverHandler.bind(this), false)
      connectionElement.addEventListener('mouseout', this.mouseOutHandler.bind(this), false)
    }

    // stop listening to scroll and window resize hooks
    // LeaderLine.positionByWindowResize = false
    // this.line.positionByWindowResize = false
  }

  beforeDestroy(): void {
    this.line.remove()
  }

  @builderNamespace.Mutation activateConnection!: ({connectionContext}: { connectionContext: IConnectionContext }) => void
  @builderNamespace.Mutation deactivateConnection!: ({connectionContext}: { connectionContext: IConnectionContext }) => void
  @builderNamespace.Mutation activateBlock!: ({blockId}: { blockId: IBlock['uuid'] | null }) => void

  reposition(): void {
    if (!this.line) {
      return
    }

    const position = this.line.position()

    console.debug('connection', 'repositioning', {
      sourceId: this.source?.uuid,
      targetId: this.target?.uuid,
      position,
      y: this.line.top,
      x: this.line.left,
    })
  }

  mouseOverHandler(): void {
    // Do not handle anything if we don't have the destination yet
    if (!this.hasDestination) {
      return
    }

    this.line.setOptions(this.onHoverOptions);
    this.activateConnection({connectionContext: this.connectionContext})
    this.$emit('lineMouseIn')
  }

  mouseOutHandler(): void {
    // Do not handle anything if we don't have the destination yet
    if (!this.hasDestination) {
      return
    }

    if (!this.isPermanentlyActive) {
      this.line.setOptions(this.options)
      this.deactivateConnection({connectionContext: this.connectionContext})
    }
    this.$emit('lineMouseOut')
  }

  clickHandler(): void {
    this.isPermanentlyActive = true
    this.activateConnection({connectionContext: this.connectionContext})
    this.activateBlock({blockId: null})
    this.$emit('lineMouseIn')
    this.$emit('lineMouseClickedIn')
  }

  clickAwayHandler = function (connectionElement: Element, event): void {
    // Do not listen if the connection was not fully set
    // TODO: Correctly implement the commented removeEventListener in case of performance issue on multiple bocks
    try {
      if (!this.line?.end) {
        // document.removeEventListener('click', this.clickAwayHandler.bind(this, connectionElement), false)
        return
      }
    } catch (e) {
      // document.removeEventListener('click', this.clickAwayHandler.bind(this, connectionElement), false)
      return
    }

    const isClickInside = connectionElement.contains(event.target as Element)

    if (!isClickInside) {
      this.isPermanentlyActive = false
      this.line.setOptions(this.options)
      this.deactivateConnection({connectionContext: this.connectionContext})
      this.$emit('lineMouseClickedOut')
      // document.removeEventListener('click', this.clickAwayHandler.bind(this, connectionElement), false)
    }
    this.$emit('lineMouseOut')
  }
}

export default Connection
</script>

<style lang="scss">
svg.leader-line {
  cursor: pointer;
}

// Considering the parent svg.leader-line has `pointer-events: none;`,
// this is important to listen SVG mouse events on shape only
svg.leader-line * {
  pointer-events: auto !important;
}
</style>
