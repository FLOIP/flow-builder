<template>
  <div><slot></slot></div>
</template>
<script>
  import PlainDraggable from 'plain-draggable'

  export default {
    data() {
      return {
        // draggable: null // no need to set up observers over these
      }
    },

    props: {
      startX: Number,
      startY: Number,
      handleDomId: String,
    },

    // todo: also set `handle` from props onPropsChanged()

    methods: {
      handleInitialized() {
        const {draggable} = this
        // `draggable` reference to reposition if changed externally like:
        // https://www.npmjs.com/package/plain-draggable#position
        this.$emit('initialized', {draggable})
      },

      handleDragged(position) {
        // eslint-disable-next-line no-debugger
        // debugger

        const {draggable} = this
        this.$emit('dragged', {draggable, position})
      },

      handleDragStarted(position) {
        const {draggable} = this
        this.$emit('dragStarted', {draggable, position})
      },

      handleDragEnded(position) {
        const {draggable} = this
        this.$emit('dragEnded', {draggable, position})
      },

      handleMoved(position) {
        // eslint-disable-next-line no-debugger
        // debugger

        const {draggable} = this
        this.$emit('moved', {draggable, position})
      }
    },

    mounted() {
      // todo: modify this to instantiate blank draggable onCreate, then set options when props change

      // this.$nextTick(() => {
      const handle = this.$el.querySelectorAll('.draggable-handle')[0]

      this.draggable = new PlainDraggable(this.$el, {
          containment: {left: 0, top: 0, width: 99999, height: 99999}, // canvas size
          autoScroll: true,
          onDrag: this.handleDragged,
          onDragStart: this.handleDragStarted,
          onDragEnd: this.handleDragEnded,
          // onMove: this.handleMoved,
          left: this.startX,
          top: this.startY,

          handle,
        })

      this.draggable.step = {x: 50, y: 50, width: 50, height: 50} // todo: why this doesn't work?

        this.handleInitialized()
      // })
    },

    destroyed() {
      this.draggable.remove()
    }
  }
</script>

<style>
  .draggable-handle {
    border: 4px dashed transparent;
    border-radius: 0.5em;
  }

  .draggable-handle:hover {
    border-color: royalblue;
  }
</style>