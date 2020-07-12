<template>
  <plain-draggable
      v-if="hasLayout"
      class="block"
      :startX="x"
      :startY="y"
      @dragged="onMoved">

    <header
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

      <p class="block-type">
        {{block.type}}
      </p>

      <h3 class="block-label">{{block.label}}</h3>
    </header>

    <div class="block-connection-target" :id="`block/${block.uuid}/handle`">
      <i class="glyphicon glyphicon-transfer"></i>
    </div>

    <div class="block-exits">
      <div v-for="exit in block.exits"
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
          <span class="label label-primary tree-block-item-label tree-block-item-output-subscribers-1"></span>
        </div>

        <template v-if="exit.destinationBlock == null">
          <plain-draggable class="handle-create-link btn btn-default btn-xs"
                           :class="{
                               'btn-info': exit.destinationBlock != null,
                           }"
                           :id="`exit/${exit.uuid}/pseudo-block-handle`"
                           @dragStarted="onCreateExitDragStarted($event, exit)"
                           @dragged="onCreateExitDragged($event)"
                           @dragEnded="onCreateExitDragEnded($event, exit)">
            <i class="glyphicon glyphicon-transfer"></i>
            {{exit.tag}}
          </plain-draggable>

          <template v-if="isConnectionCreateActive && isExitActivatedForCreate(exit) && livePosition">
            <div class="handle-move-link btn btn-default btn-xs"
                 :class="{
                               'btn-info': exit.destinationBlock != null,
                           }"
                 :id="`exit/${exit.uuid}/handle`">
              <i class="glyphicon glyphicon-move"></i>
              {{exit.tag}}
            </div>

            <connection :key="`exit/${exit.uuid}/line-for-draft`"
                        :positionCacheKey="`_`"
                        :exit="exit"
                        :block="block"
                        :position="livePosition" />
          </template>
        </template>

        <template v-if="exit.destinationBlock != null">
          <div class="btn btn-danger btn-xs"
               title="Click to remove this connection"
               @click="removeConnectionFrom(exit)">
            <span class="glyphicon glyphicon-remove"></span>
          </div>

          <plain-draggable class="handle-move-link btn btn-default btn-xs"
                           :class="{
                               'btn-info': exit.destinationBlock != null,
                           }"
                           :id="`exit/${exit.uuid}/handle`"
                           @dragStarted="onMoveExitDragStarted($event, exit)"
                           @dragged="onMoveExitDragged($event)"
                           @dragEnded="onMoveExitDragEnded($event, exit)">
            <i class="glyphicon glyphicon-move"></i>
            {{exit.tag}}
          </plain-draggable>

          <connection :key="`exit/${exit.uuid}/line`"
                      :positionCacheKey="`_`"
                      :block="block"
                      :exit="exit"
                      :position="livePosition" />
        </template>

      </div>
    </div>
  </plain-draggable>
</template>

<script>
  import {isNumber} from 'lodash'
  import {mapActions, mapMutations, mapState} from 'vuex'
  import PlainDraggable from '../common/PlainDraggable.vue'
  import {ResourceResolver, SupportedMode} from '@floip/flow-runner'
  import {OperationKind} from '@/store/builder'
  import Connection from '@/components/interaction-designer/Connection.vue'

  export default {
    props: ['block', 'x', 'y'],

    components: {
      Connection,
      PlainDraggable,
    },

    data() {
      return {
        livePosition: null,
      }
    },

    computed: {
      ...mapState('flow', ['resources']),
      ...mapState('builder', ['operations']),

      hasLayout() {
        return isNumber(this.x) && isNumber(this.y)
      },

      // todo: does this component know too much, what out of the above mapped state can be mapped?
      // todo: We should likely also proxy our resource resolving so that as to mitigate the need to see all resources and generate a context

      isConnectionSourceRelocateActive: ({operations}) => !!operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data,
      isConnectionCreateActive: ({operations}) => !!operations[OperationKind.CONNECTION_CREATE].data,
      isBlockActivated: ({block, operations}) => {
        const data = operations[OperationKind.CONNECTION_CREATE].data
        return data && data.target === block.uuid
      },
    },

    methods: {
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
        this.setBlockPositionTo({position: {x, y}, block})
      },

      removeConnectionFrom(exit) {
        const {block} = this
        this._removeConnectionFrom({block, exit})
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
        draggable.left += 60
      },

      onCreateExitDragged({position: {left: x, top: y}}) {
        this.livePosition = {x, y}
      },

      onCreateExitDragEnded({draggable}) {
        const {x: left, y: top} = this.operations[OperationKind.CONNECTION_CREATE].data.position
        Object.assign(draggable, {left, top})

        this.applyConnectionCreate()
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
        draggable.left += 60
      },

      onMoveExitDragged({position: {left: x, top: y}}) {
        this.livePosition = {x, y}
      },

      // todo: store the leaderlines in vuex and manip there --- aka the leaderline itself would simply _produce_ the
      //       domain object which we thenceforth manip in vuex ?

      onMoveExitDragEnded({draggable}) {
        const {x: left, y: top} = this.operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data.position
        Object.assign(draggable, {left, top})

        this.applyConnectionSourceRelocate()
      },
    },
  }
</script>

<style lang="scss">
  .block {
    background-color: #FFFFFF;
    /*background-image: -webkit-gradient(linear, left top, left bottom, from(white), to(#E7E7E7));*/
    /*background-image: linear-gradient(white, #E7E7E7);*/

    border: 1px solid #aaa;
    border-radius: 0.3em;
    box-shadow: 0px 3px 6px #CACACA;

    color: #575757;
    min-width: 122px;

    position: absolute;
    left: 0;
    top: 0;
    /*z-index: 20;*/

    .block-label {
      font-size: 11px;
      font-weight: bolder;
      line-height: 12px;
      margin: 0;
    }

    .block-type {
      font-size: 11px;
      margin-bottom: 0.4em;
    }

    .block-target {
      height: 80px;
    }

    .block-connection-target {
      position: absolute;
      left: 50%;
      bottom: 100%;
      width: 2em;
      height: 2em;

      text-align: center;
      padding-top: 5px;
      margin-left: -0.75em;

      border: 1px solid #aaa;
      background-color: white;
    }

    .block-exits {
      display: flex;
      white-space: nowrap;

      .block-exit {
        display: inline-block;
        flex: auto;
        min-width: 30px;
        /*max-width: 140px;*/

        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        /*border-left: 1px solid #aaa;*/
        /*border-top: 1px solid #aaa;*/

        &:first-child {
          border-left: none;
        }

        &:hover {
          background-color: #42B1CA;
          background-image: -webkit-gradient(linear, left top, left bottom, from(#72c5d7), to(#42B1CA));
          background-image: linear-gradient(#72c5d7, #42B1CA);
          color: white;
        }
      }
    }

  }
</style>
