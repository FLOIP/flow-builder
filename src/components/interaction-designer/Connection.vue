<template>
  <span class="connection" :reposition-hook="repositionHook" />
</template>

<script>
// import LeaderLine from 'leader-line'
import {set} from 'lodash'
import {mapGetters} from 'vuex'

const {LeaderLine} = window

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
      // line: null, // no need to set up observers over this
    }
  },

  computed: {
    ...mapGetters('builder', ['blocksById']),

    sourceId: ({exit}) => `exit/${exit.uuid}/handle`,
    targetId: ({exit}) => (exit.destinationBlock
      ? `block/${exit.destinationBlock}/handle`
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
        ...set({}, 'platform_metadata.io_viamo.uiData.xPosition', this.position.x),
        ...set({}, 'platform_metadata.io_viamo.uiData.yPosition', this.position.y),
      }

      const target = this.target || {
        ...set({}, 'platform_metadata.io_viamo.uiData.xPosition', this.position.x),
        ...set({}, 'platform_metadata.io_viamo.uiData.yPosition', this.position.y),
      }

      return this.repaintCacheKeyGenerator(source, target).join('\n')
    },
  },

  methods: {
    reposition() {
      if (!this.line) {
        return
      }

      const position = this.line.position()

      console.debug('connection', 'repositioning', {
        source: this.source?.uuid,
        target: this.target?.uuid,
        position,
        x: this.line.top,
        y: this.line.left,
      })
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

    const options = {
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

    // const {sourcePosition, targetPosition} = this
    // this.line = new LeaderLine(
    //     LeaderLine.pointAnchor(document.body, sourcePosition),
    //     LeaderLine.pointAnchor(document.body, targetPosition), options)

    const blockPaddingOffset = {x: 34, y: -7}
    const start = document.getElementById(this.sourceId)
    const end = this.position
      ? document.getElementById(this.targetId)
      : LeaderLine.pointAnchor(document.getElementById(this.targetId), blockPaddingOffset)

    this.line = new LeaderLine(start, end, options)

    // stop listening to scroll and window resize hooks
    // LeaderLine.positionByWindowResize = false
    // this.line.positionByWindowResize = false
  },
}
</script>
