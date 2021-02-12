<template>
  <span class="connection"
        :reposition-hook="repositionHook" />
</template>

<script>
  // import LeaderLine from 'leader-line'
  const {LeaderLine} = window
  import {set} from 'lodash'
import {mapState, mapGetters, mapMutations} from 'vuex'

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
        // line: null, // no need to set up observers over this
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
          source: this.source?.uuid,
          target: this.target?.uuid,
          exit: this.exit?.uuid,
        }
      },

      sourceId: ({exit}) => `exit/${exit.uuid}/handle`,
      targetId: ({exit}) => exit.destinationBlock
          ? `block/${exit.destinationBlock}/handle`
          : `exit/${exit.uuid}/pseudo-block-handle`,

      // todo: externalize as `positionCacheKey` + deprecate `position` prop
      //       but rather include that in `positionCacheKey`'s domain definition
      repositionHook() {
        if (!this.repaintCacheKeyGenerator) {
          return null
        }

        // @note - intentional side-effect; todo: move this into vuex responding to data changes
        this.$nextTick(this.reposition) // todo: we only want this called if something changes.

          // generate drafts while 'between exits' or 'source/destination unknown'
        // todo: push these out into ?block?
        const source = this.source || {
          ...set({}, 'platform_metadata.io_viamo.uiData.xPosition', this.position.x),
          ...set({}, 'platform_metadata.io_viamo.uiData.yPosition', this.position.y)}

        const target = this.target || {
          ...set({}, 'platform_metadata.io_viamo.uiData.xPosition', this.position.x),
          ...set({}, 'platform_metadata.io_viamo.uiData.yPosition', this.position.y)}

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
          source: this.source?.uuid,
          target: this.target?.uuid,
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
      clickAwayHandler() {
        this.isPermanentlyActive = false
        this.line.setOptions(this.options)
        this.deactivateConnection({connectionContext: this.connectionContext})
      }
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
      const start = document.getElementById(this.sourceId);
      const end = this.position
        ? document.getElementById(this.targetId)
        : LeaderLine.pointAnchor(document.getElementById(this.targetId), blockPaddingOffset)

      this.line = new LeaderLine(start, end, this.options)

      // Add event listeners
      const self = this
      const connectionElement = document.querySelector('body>.leader-line:last-of-type') // the only way to identify current line so far: https://github.com/anseki/leader-line/issues/185
      connectionElement.addEventListener('click', function() {
        self.clickHandler()
      }, false)

      document.addEventListener('click', function(event) {
        try { // Do not listen if the connection was not fully set
          const checkExistingEnd = self.line.end
        } catch (e) {
          return;
        }

        var isClickInside = connectionElement.contains(event.target);

        if (!isClickInside) {
          self.clickAwayHandler()
        }
      }, false)

      connectionElement.addEventListener('mouseover', function() {
        self.mouseOverHandler()
      }, false)

      connectionElement.addEventListener('mouseout', function() {
        self.mouseOutHandler()
      }, false)

      // stop listening to scroll and window resize hooks
      // LeaderLine.positionByWindowResize = false
      // this.line.positionByWindowResize = false
    }
  }
</script>
<style lang="scss">
svg.leader-line {
  //this is important to add event listener on leader-line svg element
  pointer-events: auto !important;
}
</style>
