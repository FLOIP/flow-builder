<template>
  <span class="leader-line"
        :repositionHook="JSON.stringify(repositionHook)" />
</template>

<script>
  // import LeaderLine from 'leader-line'
  const {LeaderLine} = window
  import {throttle} from 'lodash'
  import {mapGetters} from 'vuex'

  export default {
    props: ['block', 'exit', 'position'],

    data() {
      return {
        // line: null, // no need to set up observers over this
      }
    },

    computed: {
      ...mapGetters('builder', ['blocksById']),

      sourceId: ({exit}) => `exit/${exit.uuid}/handle`,
      targetId: ({exit}) => exit.destinationBlock
          ? `block/${exit.destinationBlock}/handle`
          : `exit/${exit.uuid}/pseudo-block-handle`,

      sourcePosition() {
        const {block} = this
        const {xPosition, yPosition} = block.platform_metadata.io_viamo.uiData
        return {x: xPosition, y: yPosition}
      },

      targetPosition() {
        const block = this.blocksById[this.exit.destinationBlock]
        if (!block) {
          return
        }

        const {xPosition, yPosition} = block.platform_metadata.io_viamo.uiData
        return {x: xPosition, y: yPosition}
      },

      handlePosition() {
        return this.position
      },

      // todo: externalize as `positionCacheKey` + deprecate `position` prop
      //       but rather include that in `positionCacheKey`'s domain definition
      repositionHook() {
        const {sourcePosition, targetPosition, handlePosition} = this

        // if (this.line) { // intentional side-effect
        //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        //   this.line.start = LeaderLine.pointAnchor(document.body, sourcePosition)
        //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        //   this.line.end = LeaderLine.pointAnchor(document.body, targetPosition)
        // }

        this.$nextTick(this.reposition)

        return {
          sourcePosition,
          targetPosition,
          handlePosition,
        }
      }
    },

    methods: {
      debouncedReposition: () => {
      },

      reposition() {
        this.line && this.line.position()
      }
    },

    created() {
      this.debouncedReposition = throttle(this.reposition, 100)
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

      const options = {
        startPlug: 'square',

        startPlugColor: 'rgb(225,2,111, 1)',
        endPlugColor: 'rgb(83,25,68, 1)',
        gradient: true,

        startSocket: 'bottom',
        // endSocket: 'auto',

        size: 3,
        outline: true,
        outlineColor: '#ffffff',
        // outlineSize: 0.08,

        path: 'grid',
        // path: 'fluid',
        // path: 'arc',
        // path: 'magnet',
      }

      // const {sourcePosition, targetPosition} = this
      // this.line = new LeaderLine(
      //     LeaderLine.pointAnchor(document.body, sourcePosition),
      //     LeaderLine.pointAnchor(document.body, targetPosition), options)

      // stop listening to scroll and window resize hooks
      LeaderLine.positionByWindowResize = false

      this.line = new LeaderLine(
          document.getElementById(this.sourceId),
          document.getElementById(this.targetId), options)
    }
  }
</script>
