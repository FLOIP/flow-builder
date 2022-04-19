<template>
  <span
    class="connection"
    :reposition-hook="repositionHook" />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import LeaderLine from 'leader-line'
import {set} from 'lodash'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'

const lightColor = '#6897BB'
const darkColor = '#30516a'
const disconnectionColor = '#dc3545'

const builderNamespace = namespace('builder')

@Component({})
export class Connection extends mixins(Lang) {
  @Prop({type: Object, required: true}) readonly exit!: IBlockExit
  @Prop({type: Function, required: true}) readonly repaintCacheKeyGenerator!: Function
  @Prop({type: Object, required: true}) readonly source!: IBlock | null
  @Prop({type: Object, required: true}) readonly target!: IBlock | null
  @Prop({type: Object, required: true}) readonly position!: { x: number, y: number } | null

  isPermanentlyActive = false
  line: any = null

  @builderNamespace.State activeConnectionContext: any
  @builderNamespace.State blocksById: any

  get options() {
    return {
      startPlug: 'square',

      startPlugColor: lightColor,
      endPlugColor: darkColor,
      gradient: true,

      startSocket: 'bottom',
      endSocket: 'top',

      size: 5,
      outline: true,
      outlineColor: '#ffffff',
      // outlineSize: 0.08,

      path: 'grid',
      endPlugSize: 0.5,
      // path: 'fluid',
      // path: 'arc',
      // path: 'magnet',

      // middleLabel: LeaderLine.captionLabel(this.exit.name, {
      //   color: darkColor,
      //   fontSize: 12,
      //   // lineOffset: 65,
      // }),
    }
  }

  get prominentOptions() {
    return {
      startPlugColor: disconnectionColor,
      endPlugColor: disconnectionColor,
    }
  }

  get connectionContext() {
    return {
      sourceId: this.source?.uuid,
      targetId: this.target?.uuid,
      exitId: this.exit?.uuid,
    }
  }

  get sourceElementId() {
    return `exit/${this.exit.uuid}/handle`
  }

  get targetElementId() {
    return this.exit.destination_block
      ? `block/${this.exit.destination_block}/handle`
      : `exit/${this.exit.uuid}/pseudo-block-handle`
  }

  // todo: externalize as `positionCacheKey` + deprecate `position` prop
  //       but rather include that in `positionCacheKey`'s domain definition
  get repositionHook() {
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

  mounted() {
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
      // connectionElement.addEventListener('click', this.clickAwayHandler(connectionElement), false)
      this.clickAwayHandler(connectionElement)
      connectionElement.addEventListener('mouseover', this.mouseOverHandler.bind(this), false)
      connectionElement.addEventListener('mouseout', this.mouseOutHandler.bind(this), false)
    }

    // stop listening to scroll and window resize hooks
    // LeaderLine.positionByWindowResize = false
    // this.line.positionByWindowResize = false
  }

  beforeDestroy() {
    this.line.remove()
  }

  @builderNamespace.Mutation activateConnection: any
  @builderNamespace.Mutation deactivateConnection: any
  @builderNamespace.Mutation activateBlock: any

  reposition() {
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

  mouseOverHandler() {
    this.line.setOptions(this.prominentOptions)
    this.activateConnection({connectionContext: this.connectionContext})
    this.$emit('lineMouseIn')
  }

  mouseOutHandler() {
    if (!this.isPermanentlyActive) {
      this.line.setOptions(this.options)
      this.deactivateConnection({connectionContext: this.connectionContext})
    }
    this.$emit('lineMouseOut')
  }

  clickHandler() {
    this.isPermanentlyActive = true
    this.activateConnection({connectionContext: this.connectionContext})
    this.activateBlock({blockId: null})
    this.$emit('lineMouseIn')
  }

  clickAwayHandler(connectionElement: Element) {
    document.addEventListener('click', (event) => {
      // Do not listen if the connection was not fully set
      if (!this.line?.end) {
        return
      }

      const isClickInside = connectionElement.contains(event.target as Element)

      if (!isClickInside) {
        this.isPermanentlyActive = false
        this.line.setOptions(this.options)
        this.deactivateConnection({connectionContext: this.connectionContext})
      }
      this.$emit('lineMouseOut')
    }, false)
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
