<template>
  <div class="clipboard-root-view">
    <header class="d-flex justify-content-between">
      <h3>Clipboard Simulator</h3>
      <i class="glyphicon glyphicon-remove cursor-pointer align-self-center h4"
         @click="closeSimulator"></i>
    </header>

    <main>
      <div v-for="(blockPrompt, i) in blockPrompts" :key="i" class="mt-2">
        <component :is="getBlockComponent(blockPrompt.block.type)"
                   :prompt="blockPrompt"
                   :context="context"
                   :go-next="goNext"
                   :is-focused="true">
        </component>
      </div>
    </main>

    <footer>

    </footer>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import {
  IContext, createContextDataObjectFor, FlowRunner, IRichCursorInputRequired, SupportedMode,
} from '@floip/flow-runner'
import MessageBlock from './block/MessageBlock.vue'
import NumericQuestionBlock from './block/NumericQuestionBlock.vue'

const dummyFlowState = {
  flows: [{
    uuid: '596940d8-6529-4712-98cf-bbbd6349173f',
    name: 'Test Flow',
    label: 'Flow Label',
    lastModified: '2021-03-04 02:16:59.513Z',
    interactionTimeout: 172800,
    supportedModes: ['offline'],
    languages: [{
      id: '22', name: 'English', abbreviation: 'EN', orgId: '1008107874829627392', rightToLeft: false, code: null, deletedAt: null,
    }],
    platform_metadata: {},
    blocks: [{
      uuid: 'c1437db9-0b63-49f4-8646-a3d83d05c47c',
      platform_metadata: { io_viamo: { uiData: { xPosition: 482, yPosition: 785 } } },
      type: 'MobilePrimitives\\Message',
      name: 'Message',
      label: 'This is a message label',
      semanticLabel: 'This is a semantic label',
      exits: [{
        uuid: '2d7739a6-cf02-4ecd-90c0-6432131e4931', tag: 'Default', label: 'Default', default: true, config: {}, destinationBlock: 'f4acae9c-dc27-4c8d-b4aa-153a49bb12a9',
      }],
      config: { prompt: '0bb24791-b486-4df8-93c7-3b9695293868', messageAudio: '' },
    }, {
      uuid: 'f4acae9c-dc27-4c8d-b4aa-153a49bb12a9',
      platform_metadata: { io_viamo: { uiData: { xPosition: 459, yPosition: 1025 } } },
      type: 'MobilePrimitives\\NumericResponse',
      name: 'NumericBlock',
      label: 'This is a numeric block',
      semanticLabel: 'This is a semantic label',
      exits: [{
        uuid: '764b2fa4-8b54-4237-8762-f675916f8e49', tag: 'Default', label: 'Default', default: true, config: {},
      }, {
        uuid: '02b047a9-35e9-436f-9977-f89ee69789d9', tag: 'Error', label: 'Error', config: {},
      }],
      config: { prompt: '5dd14702-70b6-4a57-863b-d57d7fab958d', validationMinimum: 1, validationMaximum: 100 },
    }, {
      uuid: 'f4d4884e-7be1-4ed5-852f-02614203d35d',
      platform_metadata: {
        io_viamo: {
          uiData: {
            xPosition: 264,
            yPosition: 882,
          },
        },
      },
      type: 'MobilePrimitives\\OpenResponse',
      name: 'OpenResponse',
      label: 'This is an open response',
      semanticLabel: 'This is a open semantic label',
      exits: [
        {
          uuid: '23bff775-e9d0-4155-83e5-62953cfd2bc2',
          tag: 'Default',
          label: 'Default',
          default: true,
          config: {

          },
        },
        {
          uuid: 'd71ddc4d-b3b7-4d27-8e91-373359c7e449',
          tag: 'Error',
          label: 'Error',
          config: {

          },
        },
      ],
      config: {
        prompt: '54d9f06f-3499-4964-a606-fb414b9f9497',
        ivr: {
          maxDurationSeconds: 30,
        },
        text: {
          maxResponseCharacters: 250,
        },
      },
    }],
    firstBlockId: 'c1437db9-0b63-49f4-8646-a3d83d05c47c',
  }],
  resources: [{
    uuid: '0bb24791-b486-4df8-93c7-3b9695293868',
    values: [{
      languageId: '22', value: '', contentType: ['text'], modes: ['sms'],
    }, {
      languageId: '22', value: '', contentType: ['text'], modes: ['ussd'],
    }, {
      languageId: '22', value: '', contentType: ['audio'], modes: ['ivr'],
    }, {
      languageId: '22', value: '', contentType: ['text', 'image', 'video'], modes: ['rich_messaging'],
    }, {
      languageId: '22', value: '', contentType: ['text', 'image', 'video'], modes: ['offline'],
    }, {
      languageId: '23', value: '', contentType: ['text'], modes: ['sms'],
    }, {
      languageId: '23', value: '', contentType: ['text'], modes: ['ussd'],
    }, {
      languageId: '23', value: '', contentType: ['audio'], modes: ['ivr'],
    }, {
      languageId: '23', value: '', contentType: ['text', 'image', 'video'], modes: ['rich_messaging'],
    }, {
      languageId: '23', value: '', contentType: ['text', 'image', 'video'], modes: ['offline'],
    }],
  }, { uuid: '376bc6fd-e897-4b70-9f50-e2f462bd1db5', values: [] }, { uuid: '8e10f75b-fa54-4028-bbfa-64a90e105db2', values: [] }, { uuid: '18647434-8597-498f-96c3-5585852a50e8', values: [] }, {
    uuid: '5dd14702-70b6-4a57-863b-d57d7fab958d',
    values: [{
      languageId: '22', value: '', contentType: ['text'], modes: ['sms'],
    }, {
      languageId: '22', value: '', contentType: ['text'], modes: ['ussd'],
    }, {
      languageId: '22', value: '', contentType: ['audio'], modes: ['ivr'],
    }, {
      languageId: '22', value: '', contentType: ['text', 'image', 'video'], modes: ['rich_messaging'],
    }, {
      languageId: '22', value: '', contentType: ['text', 'image', 'video'], modes: ['offline'],
    }],
  }, {
    uuid: '5dd14702-70b6-4a57-863b-d57d7fab958d',
    values: [{
      languageId: '22', value: '', contentType: ['text'], modes: ['sms'],
    }, {
      languageId: '22', value: '', contentType: ['text'], modes: ['ussd'],
    }, {
      languageId: '22', value: '', contentType: ['audio'], modes: ['ivr'],
    }, {
      languageId: '22', value: '', contentType: ['text', 'image', 'video'], modes: ['rich_messaging'],
    }, {
      languageId: '22', value: '', contentType: ['text', 'image', 'video'], modes: ['offline'],
    }],
  }],
  firstFlowId: '596940d8-6529-4712-98cf-bbbd6349173f',
  nestedFlowBlockInteractionIdStack: [],
  'Core\\Case': {},
  'Core\\RunFlow': {},
  'Core\\Output': {},
  'SmartDevices\\PhotoResponse': {},
  'ConsoleIO\\Print': {},
  'ConsoleIO\\Read': {},
  'Core\\Log': {},
  'MobilePrimitives\\Message': {},
  'MobilePrimitives\\NumericResponse': {},
  'MobilePrimitives\\OpenResponse': {},
  'MobilePrimitives\\SelectOneResponse': {},
  'MobilePrimitives\\SelectManyResponse': {},
  'SmartDevices\\LocationResponse': {},
}

export default {
  components: {
    MessageBlock,
    NumericQuestionBlock,
  },
  data() {
    return {
      runner: FlowRunner,
      blockPrompts: [],
      context: {},
      isComplete: Boolean,
    }
  },
  created() {
    this.initializeFlowRunner()
  },
  computed: {

  },
  methods: {
    ...mapGetters('flow', ['getFlowState']),
    ...mapActions('clipboard', ['setSimulatorActive']),

    initializeFlowRunner() {
      console.log('initialize flow runner ', JSON.stringify(this.getFlowState()))
      const flowState = dummyFlowState // this.getFlowState()
      const contact = { id: '1' } as IContact // new IContact()
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
      const cursor: IRichCursorInputRequired = (await this.runner.run())!
      console.log('cursor = ', cursor)

      if (cursor == null) {
        throw new Error('Omg, no cursor?')
      }

      const { prompt }: IRichCursorInputRequired = cursor
      this.currentPrompt = prompt
      console.log(prompt)
      this.blockPrompts.push(this.currentPrompt)
    },

    getBlockComponent(key) {
      const blockMap = new Map([
        ['MobilePrimitives\\Message', 'MessageBlock'],
        ['MobilePrimitives\\NumericResponse', 'NumericQuestionBlock'],
        ['MobilePrimitives\\OpenResponse', 'OpenQuestionBlock'],
        ['MobilePrimitives\\SelectOneResponse', 'MultipleChoiceQuestionBlock'],
        ['MobilePrimitives\\SelectManyResponse', 'MultipleSelectMultipleChoiceQuestionBlock'],
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

.disabled-alpha {
  background: #EEEEEE;
}

.cursor-pointer {
  cursor: pointer;
}

.font-roboto {
  font-family: Roboto, sans-serif;
}
</style>
