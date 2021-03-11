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
      <div v-for="(blockPrompt, i) in blockPrompts" :key="i" class="mt-2">
        <component :is="getBlockComponent(blockPrompt.block.type)"
                   :prompt="blockPrompt"
                   :context="context"
                   :go-next="goNext">
        </component>
      </div>
      <div v-if="unsupportedBlockName" class="mt-2">
        <UnsupportedBlock :block-name="unsupportedBlockName"  />
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
  IContact,
} from '@floip/flow-runner'
import MessageBlock from './block/MessageBlock.vue'
import NumericQuestionBlock from './block/NumericQuestionBlock.vue'
import OpenQuestionBlock from './block/OpenQuestionBlock.vue'
import SelectOneResponseBlock from './block/SelectOneResponseBlock.vue'
import SelectManyResponseBlock from './block/SelectManyResponseBlock.vue'
import UnsupportedBlock from './shared/UnsupportedBlock.vue'

export default {
  components: {
    MessageBlock,
    NumericQuestionBlock,
    OpenQuestionBlock,
    SelectOneResponseBlock,
    SelectManyResponseBlock,
    UnsupportedBlock,
  },
  mixins: [lang],
  data() {
    return {
      runner: FlowRunner,
      blockPrompts: [],
      context: {},
      isComplete: false,
      unsupportedBlockName: '',
    }
  },
  created() {
    this.initializeFlowRunner()
  },
  methods: {
    ...mapGetters('flow', ['getFlowState']),
    ...mapActions('clipboard', ['setSimulatorActive']),

    async initializeFlowRunner() {
      const flowState = this.getFlowState()
      const contact = { id: '1' } as IContact
      const groups = []
      const userId = 'user-1234'
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
        this.blockPrompts.push(prompt)
      } catch (e) {
        if (e.message.includes('Unable to find factory for block type')) {
          [, this.unsupportedBlockName] = e.message.split(': ')
        }
        console.warn(e.message)
      }
    },

    getBlockComponent(key) {
      const blockMap = new Map([
        ['MobilePrimitives\\Message', 'MessageBlock'],
        ['MobilePrimitives\\NumericResponse', 'NumericQuestionBlock'],
        ['MobilePrimitives\\OpenResponse', 'OpenQuestionBlock'],
        ['MobilePrimitives\\SelectOneResponse', 'SelectOneResponseBlock'],
        ['MobilePrimitives\\SelectManyResponse', 'SelectManyResponseBlock'],
      ])
      return blockMap.get(key)
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

.disabled-block {
  background-color: #F5F5F5;
}
</style>
