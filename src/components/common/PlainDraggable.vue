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
    isEditable: Boolean,
  },

  watch: {
    isEditable(value) {
      this.draggable.disabled = !value
    },
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
      const {draggable} = this
      this.$emit('moved', {draggable, position})
    },
  },

  mounted() {
    // todo: modify this to instantiate blank draggable onCreate, then set options when props change
    console.debug('PlainDraggable.vue', 'mounted')

    // this.$nextTick(() => {
    const handle = this.$el.querySelectorAll('.draggable-handle')[0]

    this.draggable = new PlainDraggable(this.$el, {
      containment: document.querySelector('.builder-canvas'),
      autoScroll: true,

      // prevent css translate() animations for move
      // they don't seem to be throttled enough for leaderline to follow tightly
      leftTop: false,
      disabled: true,
      onDrag: this.handleDragged,
      onDragStart: this.handleDragStarted,
      onDragEnd: this.handleDragEnded,
      // onMove: this.handleMoved,

      left: this.startX,
      top: this.startY,

      handle,
    })
    // draggable.rect.{left,top,x,y,...}

    // this.draggable.snap = {x: 50, y: 50, width: 50, height: 50} // todo: why this doesn't work?
    // this.draggable.snap = {step: 21}

    this.handleInitialized()
    // })
  },

  destroyed() {
    this.draggable.remove()
  },
}
</script>
