<template>
  <plain-draggable
      v-if="hasLayout"
      class="block"
      :class="{
        active: isBlockActivated,
        [`category-${blockClasses[block.type].category}`]: true,
      }"
      :startX="x"
      :startY="y"
      @dragged="onMoved"
      @dragStarted="selectBlock">

    <header
        :id="`block/${block.uuid}/handle`"
        class="block-target draggable-handle"
        :class="{
             'initial': false,
             'pending': isConnectionCreateActive,
             'fulfilled': false,
             'rejected': false,
             'activated': isBlockActivated,
           }"
        @mouseenter="isConnectionCreateActive && activateBlockAsDropZone($event)"
        @mouseleave="isConnectionCreateActive && deactivateBlockAsDropZone($event)">

      <p class="block-type text-muted">
        {{trans(`flow-builder.${block.type}`)}}
      </p>

      <h3 class="block-label"
          :class="{'empty': !block.label}">
        {{block.label || 'Untitled block'}}
      </h3>
    </header>

    <div class="block-exits">
      <div v-for="(exit, key) in block.exits"
           :key="exit.uuid"
           class="block-exit"
           :class="{
             'initial': false,
             'pending': isConnectionSourceRelocateActive,
             'fulfilled': false,
             'rejected': false,
             'activated': isExitActivatedForRelocate(exit),
           }"
           @mouseenter="isConnectionSourceRelocateActive && activateExitAsDropZone($event, exit)"
           @mouseleave="isConnectionSourceRelocateActive && deactivateExitAsDropZone($event, exit)">

        <div class="total-label-container">
          <span class="badge badge-primary tree-block-item-label tree-block-item-output-subscribers-1"></span>
        </div>

        <h3 class="block-exit-tag badge badge-warning">{{visibleExitTag(key, exit)}}</h3>

        <template v-if="exit.destinationBlock == null">
          <plain-draggable class="handle-create-link btn btn-outline-secondary btn-xs btn-flat"
                           :class="{
                               'btn-info': exit.destinationBlock != null,
                           }"
                           :id="`exit/${exit.uuid}/pseudo-block-handle`"
                           :key="`exit/${exit.uuid}/pseudo-block-handle`"
                           @initialized="handleDraggableInitializedFor(exit, $event)"
                           @dragStarted="onCreateExitDragStarted($event, exit)"
                           @dragged="onCreateExitDragged($event)"
                           @dragEnded="onCreateExitDragEnded($event, exit)">
            <i class="glyphicon glyphicon-move"></i>
          </plain-draggable>

          <template v-if="isConnectionCreateActive && isExitActivatedForCreate(exit) && livePosition">
            <div class="handle-move-link btn btn-secondary btn-xs"
                 :class="{
                               'btn-info': exit.destinationBlock != null,
                           }"
                 :id="`exit/${exit.uuid}/handle`">
              <i class="glyphicon glyphicon-move"></i>
            </div>

            <connection :key="`exit/${exit.uuid}/line-for-draft`"
                        :repaint-cache-key-generator="generateConnectionLayoutKeyFor"
                        :source="block"
                        :target="blocksById[exit.destinationBlock]"
                        :exit="exit"
                        :position="livePosition"
                        :color-category="blockClasses[block.type].category" />
          </template>
        </template>

        <template v-if="exit.destinationBlock != null">
          <plain-draggable class="block-exit-move-handle handle-move-link btn btn-outline-secondary btn-xs btn-flat"
                           :class="{
                               // 'btn-secondary': exit.destinationBlock != null,
                           }"
                           :id="`exit/${exit.uuid}/handle`"
                           :key="`exit/${exit.uuid}/handle`"
                           @initialized="handleDraggableInitializedFor(exit, $event)"
                           @dragStarted="onMoveExitDragStarted($event, exit)"
                           @dragged="onMoveExitDragged($event)"
                           @dragEnded="onMoveExitDragEnded($event, exit)">
            <i class="glyphicon glyphicon-move"></i>
          </plain-draggable>

          <div class="block-exit-remove btn btn-danger btn-xs"
               title="Click to remove this connection"
               @click="removeConnectionFrom(exit)">
            <span class="glyphicon glyphicon-remove"></span>
          </div>

          <connection :key="`exit/${exit.uuid}/line`"
                      :repaint-cache-key-generator="generateConnectionLayoutKeyFor"
                      :source="livePosition ? null : block"
                      :target="blocksById[exit.destinationBlock]"
                      :exit="exit"
                      :position="livePosition"
                      :color-category="blockClasses[block.type].category" />
        </template>

      </div>
    </div>
  </plain-draggable>
</template>

<script>
  import {isNumber, forEach} from 'lodash'
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
  import PlainDraggable from '@/components/common/PlainDraggable.vue'
  import {ResourceResolver, SupportedMode, IBlockExit} from '@floip/flow-runner'
  import {OperationKind, generateConnectionLayoutKeyFor} from '@/store/builder'
  import Connection from '@/components/interaction-designer/Connection.vue'
  import lang from '@/lib/filters/lang'
  import {BLOCK_TYPE as BLOCK_TYPE__CASE_BLOCK} from '@/store/flow/block-types/Core_CaseBlockStore'
  import {BLOCK_TYPE as BLOCK_TYPE__SELECT1_BLOCK} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'

  export default {
    props: ['block', 'x', 'y'],
    mixins: [lang],
    components: {
      Connection,
      PlainDraggable,
    },

    created() {
      this.draggablesByExitId = {} // todo: these need to be (better) lifecycle-managed (eg. mcq add/remove exit).
    },

    data() {
      return {
        livePosition: null,
        // draggablesByExitId: {}, // no need to vuejs-observe these
      }
    },

    computed: {
      ...mapState('flow', ['resources']),
      ...mapState('builder', ['activeBlockId', 'operations']),
      ...mapState({
        blockClasses: ({trees: {ui}}) => ui.blockClasses,
      }),

      ...mapGetters('builder', ['blocksById']),

      hasLayout() {
        return isNumber(this.x) && isNumber(this.y)
      },

      // todo: does this component know too much, what out of the above mapped state can be mapped?
      // todo: We should likely also proxy our resource resolving so that as to mitigate the need to see all resources and generate a context

      isConnectionSourceRelocateActive: ({operations}) => !!operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data,
      isConnectionCreateActive: ({operations}) => !!operations[OperationKind.CONNECTION_CREATE].data,
      isBlockActivated: ({activeBlockId, block, operations}) => {
        if (activeBlockId && activeBlockId === block.uuid) {
          return true
        }

        const data = operations[OperationKind.CONNECTION_CREATE].data
        return data && data.target === block.uuid
      },
    },

    methods: {
      // todo: how do we decide whether or not this should be an action or a vanilla domain function?
      ...{
        generateConnectionLayoutKeyFor,
      },

      ...mapMutations('builder', ['setBlockPositionTo']),

      ...mapActions('builder', {
        _removeConnectionFrom: 'removeConnectionFrom'
      }),

      ...mapActions('builder', [
        // ConnectionSourceRelocate
        'initializeConnectionSourceRelocateWith',
        'setConnectionSourceRelocateValue',
        'setConnectionSourceRelocateValueToNullFrom',
        'applyConnectionSourceRelocate',

        // ConnectionCreate
        'initializeConnectionCreateWith',
        'setConnectionCreateTargetBlock',
        'setConnectionCreateTargetBlockToNullFrom',
        'applyConnectionCreate',
      ]),

      ...mapMutations('builder', ['activateBlock']),

      resolveTextResource(uuid) {
        const {resources} = this
        const context = {
          resources,
          languageId: '22',
          mode: SupportedMode.SMS}
        const resource = new ResourceResolver(context)// as IContext) // this isn't ts
            .resolve(uuid);

        return resource.hasText()
            ? resource.getText()
            : uuid
      },

      visibleExitTag(key, exit) {
        if (!exit.tag && !exit.semanticLabel) {
          return '—'
        }

        const {block} = this
        if (block.type === BLOCK_TYPE__CASE_BLOCK) {
          return `${key + 1}: ${exit.tag}`
        } else if (block.type === BLOCK_TYPE__SELECT1_BLOCK && exit.semanticLabel) {
          return exit.semanticLabel
        }

        return exit.tag
      },

      // todo: push NodeExit into it's own vue component
      isExitActivatedForRelocate(exit) {
        const data = this.operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data
        return data
            && data.to
            && data.to.exitId === exit.uuid
      },

      isExitActivatedForCreate(exit) {
        const data = this.operations[OperationKind.CONNECTION_CREATE].data
        return data
            && data.source
            && data.source.exitId === exit.uuid
      },

      activateExitAsDropZone(e, exit) {
        const {block} = this
        this.setConnectionSourceRelocateValue({block, exit})
      },

      deactivateExitAsDropZone(e, exit) {
        const {block} = this
        this.setConnectionSourceRelocateValueToNullFrom({block, exit})
      },

      // eslint-disable-next-line no-unused-vars
      activateBlockAsDropZone(e) {
        const {block} = this
        this.setConnectionCreateTargetBlock({block})
      },

      // eslint-disable-next-line no-unused-vars
      deactivateBlockAsDropZone(e) {
        const {block} = this
        this.setConnectionCreateTargetBlockToNullFrom({block})
      },

      onMoved({position: {left: x, top: y}}) {
        // todo: try this the vuejs way where we push the change into state, then return false + modify draggable w/in store ?

        const {block} = this
        this.$nextTick(() => {
          this.setBlockPositionTo({position: {x, y}, block})

          forEach(this.draggablesByExitId, draggable =>
            draggable.position())

          console.debug('Block', 'onMoved', 'positioned all of', this.draggablesByExitId)
        })
      },

      removeConnectionFrom(exit) {
        const {block} = this
        this._removeConnectionFrom({block, exit})
      },

      handleDraggableInitializedFor({uuid}, {draggable}) {
        this.draggablesByExitId[uuid] = draggable

        const {left, top} = draggable
        const {uuid: blockId} = this.block


        console.debug('Block', 'handleDraggableInitializedFor', {blockId, exitId: uuid, coords: {left, top}})
      },

      onCreateExitDragStarted({draggable}, exit) {
        const {block} = this
        const {left: x, top: y} = draggable

        this.initializeConnectionCreateWith({
          block,
          exit,
          position: {x, y}})

        // since mouseenter + mouseleave will not occur when draggable is below cursor
        // we simply snap the draggable out from under the cursor during this operation
        draggable.left += 30
        draggable.top += 25
      },

      onCreateExitDragged({position: {left: x, top: y}}) {
        this.livePosition = {x, y}
      },

      onCreateExitDragEnded({draggable}) {
        const {x: left, y: top} = this.operations[OperationKind.CONNECTION_CREATE].data.position

        console.debug('Block', 'onCreateExitDragEnded', 'operation.data.position', {left, top})
        console.debug('Block', 'onCreateExitDragEnded', 'reset', {left: draggable.left, top: draggable.top})

        Object.assign(draggable, {left, top})

        this.applyConnectionCreate()

        this.livePosition = null
      },

      onMoveExitDragStarted({draggable}, exit) {
        const {block} = this
        const {left: x, top: y} = draggable

        this.initializeConnectionSourceRelocateWith({
          block,
          exit,
          position: {x, y}})

        // since mouseenter + mouseleave will not occur when draggable is below cursor
        // we simply snap the draggable out from under the cursor during this operation
        draggable.left += 30
        draggable.top += 25

      },

      onMoveExitDragged({position: {left: x, top: y}}) {
        this.livePosition = {x, y}
      },

      // todo: store the leaderlines in vuex and manip there --- aka the leaderline itself would simply _produce_ the
      //       domain object which we thenceforth manip in vuex ?

      onMoveExitDragEnded({draggable}) {
        const {x: left, y: top} = this.operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data.position

        console.debug('Block', 'onMoveExitDragEnded', 'operation.data.position', {left, top})
        console.debug('Block', 'onMoveExitDragEnded', 'reset', {left: draggable.left, top: draggable.top})

        Object.assign(draggable, {left, top})

        this.applyConnectionSourceRelocate()
        this.livePosition = null
      },

      selectBlock() {
        const {block: {uuid: blockId}} = this
        this.activateBlock({blockId})
      },
    },
  }
</script>

<style lang="scss">
  .btn-secondary.btn-flat {
    @extend .btn-secondary;
    background: transparent;
  }

  .block {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1*10;

    min-width: 122px;
    padding: 0.4em;
    padding-bottom: 0.25em;
    scroll-margin: 35px;
    scroll-margin-top: 100px;

    background-color: white;
    color: #575757;
    border: 1px solid #5b5b5b;

    border-radius: 0.3em;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    opacity: 0.9;

    transition:
      opacity 200ms ease-in-out,
      background-color 200ms ease-in-out;

    .block-label {
      font-size: 14px;
      font-weight: normal;

      &.empty {
        color: #aaa;
      }
    }

    .block-type {
      font-size: 11px;
      font-weight: bolder;
      margin-right: 1em;
      margin-bottom: 0.4em;
    }

    .block-target {
      min-height: 4em;
      border: 1px dashed transparent;
      border-bottom: 1px solid #eee;
      padding: 0.1em;

      transition: border-radius 200ms ease-in-out;

      &:hover {
        border-radius: 0.3em;
        border-color: #5b5b5b;
      }
    }

    .block-exits {
      display: flex;
      white-space: nowrap;
      position: relative;
      top: 0em;
      margin-top: 0.25em;

      .block-exit {
        display: inline-block;
        border: 1px dashed transparent;
        transition: border-radius 200ms ease-in-out;

        /*flex: auto;*/
        min-width: 6em;
        max-width: 140px;

        padding: 0.25em 1em;
        text-align: center;

        .block-exit-tag  {
          display: block;

          min-width: 6em;
          max-width: 140px;

          margin: 0 0 0.5em 0;
          padding: 0.4em;

          background-color: #5b5b5b;
          border: none;

          font-weight: normal;
          font-size: 12px;

          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .block-exit-move-handle {
          margin-right: 0.5em;
        }

        .block-exit-remove {
          background-image: none;
          opacity: 0;
          transition: opacity 200ms ease-in-out;
        }

        &.activated {
          border-radius: 0.3em;
          border-color: #333333;
        }
      }

    }

    // state mutations

    &.active {
      border-width: 2px;
      box-shadow: 0 3px 6px #CACACA;
    }

    &:hover {
      opacity: 1;
    }

    &.active,
    &:hover {
      .block-exit .block-exit-remove {
        opacity: 1;
      }
    }
  }
</style>
