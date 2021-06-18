<template>
  <span
    class="connection"
    :reposition-hook="repositionHook" />
</template>

<script>
// import LeaderLine from 'leader-line'
import {set} from 'lodash'
import {mapGetters, mapMutations, mapState} from 'vuex'

const {LeaderLine} = window

const categoryColorMappings = {
  'category-0-faint': '#fbfdfb',
  'category-0-light': '#97BD8A',
  'category-0-dark': '#38542f',
  'category-1-faint': '#fdfdfe',
  'category-1-light': '#6897BB',
  'category-1-dark': '#30516a',
  'category-2-faint': '#fdfbf8',
  'category-2-light': '#C69557',
  'category-2-dark': '#6e4e25',
}

export default {
  props: {
    exit: Object,

    repaintCacheKeyGenerator: Function,
    source: Object,
    target: Object,
    position: Object,

    colorCategory: Number,
  },

  data() {
    return {
      // no need to set up observers over this
      // line: null,
      isPermanentlyActive: false,
    }
  },

  computed: {
    ...mapState('builder', ['activeConnectionContext']),
    ...mapGetters('builder', ['blocksById']),

    options() {
      return {
        startPlug: 'square',

        startPlugColor: categoryColorMappings[`category-${this.colorCategory}-light`],
        endPlugColor: categoryColorMappings[`category-${this.colorCategory}-dark`],
        gradient: true,

        startSocket: 'bottom',
        endSocket: 'top',

        size: 3,
        outline: true,
        outlineColor: '#ffffff',
        // outlineSize: 0.08,

        path: 'grid',
        // path: 'fluid',
        // path: 'arc',
        // path: 'magnet',

        middleLabel: LeaderLine.captionLabel(this.exit.tag, {
          color: categoryColorMappings[`category-${this.colorCategory}-dark`],
          fontSize: 12,
          // lineOffset: 65,
        }),
      }
    },

    prominentOptions() {
      return {
        size: this.options.size + 3,
      }
    },

    connectionContext() {
      return {
        sourceId: this.source?.uuid,
        targetId: this.target?.uuid,
        exitId: this.exit?.uuid,
      }
    },

    sourceElementId: ({exit}) => `exit/${exit.uuid}/handle`,
    targetElementId: ({exit}) => (exit.destination_block
      ? `block/${exit.destination_block}/handle`
      : `exit/${exit.uuid}/pseudo-block-handle`),

    // todo: externalize as `positionCacheKey` + deprecate `position` prop
    //       but rather include that in `positionCacheKey`'s domain definition
    repositionHook() {
      if (!this.repaintCacheKeyGenerator) {
        return null
      }

      // @note - intentional side-effect; todo: move this into vuex responding to data changes
      // todo: we only want this called if something changes.
      this.$nextTick(this.reposition)

      // generate drafts while 'between exits' or 'source/destination unknown'
      // todo: push these out into ?block?
      const source = this.source || {
        ...set({}, 'vendor_metadata.io_viamo.uiData.xPosition', this.position.x),
        ...set({}, 'vendor_metadata.io_viamo.uiData.yPosition', this.position.y),
      }

      const target = this.target || {
        ...set({}, 'vendor_metadata.io_viamo.uiData.xPosition', this.position.x),
        ...set({}, 'vendor_metadata.io_viamo.uiData.yPosition', this.position.y),
      }

      return this.repaintCacheKeyGenerator(source, target)
        .join('\n')
    },
  },

  methods: {
    ...mapMutations('builder', ['activateConnection', 'deactivateConnection', 'activateBlock']),
    reposition() {
      if (!this.line) {
        return
      }

      const position = this.line.position()

      console.debug('connection', 'repositioning', {
        sourceId: this.source?.uuid,
        targetId: this.target?.uuid,
        position,
        x: this.line.top,
        y: this.line.left,
      })
    },
    mouseOverHandler() {
      this.line.setOptions(this.prominentOptions)
      this.activateConnection({connectionContext: this.connectionContext})
    },
    mouseOutHandler() {
      if (!this.isPermanentlyActive) {
        this.line.setOptions(this.options)
        this.deactivateConnection({connectionContext: this.connectionContext})
      }
    },
    clickHandler() {
      this.isPermanentlyActive = true
      this.line.setOptions(this.prominentOptions)
      this.activateConnection({connectionContext: this.connectionContext})
      this.activateBlock({blockId: null})
    },
    clickAwayHandler(connectionElement) {
      document.addEventListener('click', (event) => {
        // Do not listen if the connection was not fully set
        try {
          const checkExistingEnd = this.line.end
        } catch (e) {
          return
        }

        const isClickInside = connectionElement.contains(event.target)

        if (!isClickInside) {
          this.isPermanentlyActive = false
          this.line.setOptions(this.options)
          this.deactivateConnection({connectionContext: this.connectionContext})
        }
      }, false)
    },
  },

  beforeDestroy() {
    this.line.remove()
  },

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

    const blockPaddingOffset = {x: 34, y: -7}
    const start = document.getElementById(this.sourceElementId)
    const end = this.position
      ? document.getElementById(this.targetElementId)
      : LeaderLine.pointAnchor(document.getElementById(this.targetElementId), blockPaddingOffset)

    this.line = new LeaderLine(start, end, this.options)

    // Add event listeners
    const self = this
    // the only way to identify current line so far: https://github.com/anseki/leader-line/issues/185
    const connectionElement = document.querySelector('body>.leader-line:last-of-type')

    connectionElement.addEventListener('click', self.clickHandler, false)

    connectionElement.addEventListener('click', self.clickAwayHandler(connectionElement), false)

    connectionElement.addEventListener('mouseover', self.mouseOverHandler, false)

    connectionElement.addEventListener('mouseout', self.mouseOutHandler, false)

    // stop listening to scroll and window resize hooks
    // LeaderLine.positionByWindowResize = false
    // this.line.positionByWindowResize = false
  },
}
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
