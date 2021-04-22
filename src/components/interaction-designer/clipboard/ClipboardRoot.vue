<template>
  <div class="clipboard-root-view">
    <header class="d-flex justify-content-between">
      <h3>
        {{ 'flow-builder.clipboard-simulator' | trans }}
      </h3>
      <i class="glyphicon glyphicon-remove cursor-pointer align-self-center h4"
         @click="closeSimulator"></i>
    </header>
    <main>
      <div v-for="(blockData, i) in blocksData" :key="i" class="mt-2">
        <div class="card" :class="{'gray-background': !isBlockFocused(i)}">
          <div class="card-body sm-padding-below font-roboto">
            <component :is="blockData.prompt.config.kind"
                       :context="context"
                       :go-next="goNext"
                       :index="i"
                       :is-complete="isComplete"
                       :on-edit-complete="onEditComplete"
            >
              <template #title>
                <h4 class="card-title font-weight-regular pl-0 text-color-title">
                  {{blockData.prompt.block.label}}
                </h4>
              </template>
              <template #content>
                <p class="card-text">
                  {{content(blockData.prompt.config.prompt)}}
                </p>
              </template>
            </component>
          </div>
        </div>
      </div>
      <div v-if="unsupportedBlockName" class="mt-2">
        <unsupported-block :block-name="unsupportedBlockName" />
      </div>
    </main>
    <footer v-if="isComplete" class="mt-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{'flow-builder.completed' | trans}}!</h5>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import lang from '@/lib/filters/lang'
import { mapActions, mapGetters } from 'vuex'
import {
  IContext,
  createContextDataObjectFor,
  FlowRunner,
  IRichCursorInputRequired,
  SupportedMode,
  IContact, BasicBacktrackingBehaviour, Context,
} from '@floip/flow-runner'
import Message from './prompt-kinds/Message.vue'
import Numeric from './prompt-kinds/Numeric.vue'
import Open from './prompt-kinds/Open.vue'
import SelectOne from './prompt-kinds/SelectOne.vue'
import SelectMany from './prompt-kinds/SelectMany.vue'
import UnsupportedBlock from './shared/UnsupportedBlock.vue'

export default {
  components: {
    Message,
    Numeric,
    Open,
    SelectOne,
    SelectMany,
    UnsupportedBlock,
  },
  mixins: [lang],
  data() {
    return {
      runner: FlowRunner,
      blocksData: [],
      context: {},
      isComplete: false,
      unsupportedBlockName: '',
    }
  },
  created() {
    this.initializeFlowRunner()
  },
  computed: {
    ...mapGetters('clipboard', ['getBlocksData', 'isBlockFocused']),
  },
  methods: {
    ...mapGetters('flow', ['getFlowsState']),
    ...mapActions('clipboard', ['setSimulatorActive', 'setBlocksData', 'setIsFocused']),

    content(promptId) {
      console.log('content for prompt ', promptId)
      const result = Context.prototype.getResource.call(this.context, promptId)
      return result.hasText() ? result.getText() : ''
    },

    getUpdatedFlowState() {
      const flowState = this.getFlowsState()
      // TODO: Need to remove this after a fix is available on flow runner
      flowState.flows[0].blocks.map(({ exits }) => exits.map((e) => {
        e.test = e.test || 'true'
        return e
      }))
      return flowState
    },

    async initializeFlowRunner() {
      const flowState = this.getUpdatedFlowState()
      const contact = { id: '1' } as IContact
      const groups = []
      const userId = 'user-1234' // TODO: fix this value when user details are available
      const orgId = 'org-1234'
      const { flows } = flowState
      const languageId = '22'
      const mode = SupportedMode.OFFLINE
      const { resources } = flowState
      const context: IContext = createContextDataObjectFor(
        contact,
        groups,
        userId,
        orgId,
        flows,
        languageId,
        mode,
        resources,
      )

      this.context = context
      this.runner = new FlowRunner(context)
      await this.goNext()
    },

    async goNext() {
      this.isComplete = false
      try {
        const cursor: IRichCursorInputRequired = await this.runner.run()
        if (!cursor) {
          this.isComplete = true
          return
        }
        const { prompt }: IRichCursorInputRequired = cursor
        this.blocksData.push({ prompt, isFocused: true })
        this.setBlocksData(this.blocksData)
      } catch (e) {
        if (e.message.includes('Unable to find factory for block type')) {
          [, this.unsupportedBlockName] = e.message.split(': ')
        }
        console.warn(e.message)
      }
    },

    async onEditComplete(index) {
      this.setIsFocused({ index: this.blocksData.length - 1, value: true })
      const backtracking: BasicBacktrackingBehaviour = this.runner.behaviours.basicBacktracking
      const seekSteps = (this.blocksData.length - 1) - index
      const cursor = await backtracking.seek(seekSteps, this.context)

      this.blocksData.splice(index)
      this.blocksData.push({ prompt: cursor.prompt, isFocused: true })
      this.setBlocksData(this.blocksData)
    },

    closeSimulator() {
      this.setSimulatorActive(false)
    },
  },
}
</script>

<style lang="scss">
.clipboard-root-view {
  min-height: 80vh;
}

.cursor-pointer {
  cursor: pointer;
}

.font-roboto {
  font-family: Roboto, sans-serif;
}

.gray-background {
  background-color: #F5F5F5;
}
</style>
