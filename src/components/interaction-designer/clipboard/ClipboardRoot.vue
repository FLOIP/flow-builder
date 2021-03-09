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
        <UnsupportedBlock v-if="getBlockComponent(blockPrompt.block.type) == 'Unsupported'" />
        <component v-else :is="getBlockComponent(blockPrompt.block.type)"
                   :prompt="blockPrompt"
                   :context="context"
                   :go-next="goNext">
        </component>
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
  isLastBlock,
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
    }
  },
  created() {
    this.initializeFlowRunner()
  },
  methods: {
    ...mapGetters('flow', ['getFlowState']),
    ...mapActions('clipboard', ['setSimulatorActive']),

    initializeFlowRunner() {
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

      console.log('context = ', (context))
      this.context = context

      this.runner = new FlowRunner(context)
      console.log('runner = ', this.runner)

      this.goNext()
    },

    async goNext() {
      console.log('------ go next ----------')
      const currBlock = this.blockPrompts[this.blockPrompts.length - 1]?.block
      if (this.blockPrompts.length > 0 && isLastBlock(currBlock)) {
        this.isComplete = true
      } else {
        this.isComplete = false
        try {
          const cursor: IRichCursorInputRequired = await this.runner.run()
          console.log('cursor ', cursor)
          const { prompt }: IRichCursorInputRequired = cursor
          this.blockPrompts.push(prompt)
        } catch (e) {
          console.log(e.message)
        }
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
      return blockMap.get(key) || 'Unsupported'
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
