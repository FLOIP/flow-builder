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
    uuid: '7ab8280a-92f3-4691-83ea-213c8a33d0d2',
    name: 'flow ',
    label: 'label',
    lastModified: '2021-03-03 16:08:45.511Z',
    interactionTimeout: 172800,
    supportedModes: ['sms'],
    languages: [{
      id: '22', name: 'English', abbreviation: 'EN', orgId: '1008107874829627392', rightToLeft: false, code: null, deletedAt: null,
    }, {
      id: '23', name: 'Spanish', abbreviation: 'ES', orgId: '1008107874829627392', rightToLeft: false, code: null, deletedAt: null,
    }],
    platform_metadata: {},
    blocks: [{
      uuid: 'a3956510-3614-4735-b515-47ae399a4d5d',
      platform_metadata: { io_viamo: { uiData: { xPosition: 370, yPosition: 159 } } },
      type: 'MobilePrimitives\\Message',
      name: 'message',
      label: 'message',
      semanticLabel: 'message',
      exits: [{
        uuid: '04a73357-048f-4adc-928d-e2863614a434', tag: 'Default', label: 'Default', default: true, config: {}, destinationBlock: '0219ed2b-2a08-4f6a-8937-0d2dd930d0a8',
      }],
      config: { prompt: '98ac429a-4329-4db6-9102-f44553a5b0d8', messageAudio: '' },
    }, {
      uuid: '0219ed2b-2a08-4f6a-8937-0d2dd930d0a8',
      platform_metadata: { io_viamo: { uiData: { xPosition: 336, yPosition: 389 } } },
      type: 'MobilePrimitives\\NumericResponse',
      name: 'NumericResponse',
      label: 'NumericResponse',
      semanticLabel: 'NumericResponse',
      exits: [{
        uuid: 'eadf0b26-2893-4854-82fd-42a0ee93014a', tag: 'Default', label: 'Default', default: true, config: {},
      }, {
        uuid: 'd554b777-be88-489f-909a-f1ba71f51ec9', tag: 'Error', label: 'Error', config: {},
      }],
      config: {
        prompt: 'f66988f3-b3d2-4df0-ac4d-4ef4b2936e96', validationMinimum: 1, validationMaximum: 1000, ivr: { maxDigits: 3 },
      },
    }],
    firstBlockId: 'a3956510-3614-4735-b515-47ae399a4d5d',
  }],
  resources: [{
    uuid: '98ac429a-4329-4db6-9102-f44553a5b0d8',
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
    }, {
      languageId: '22', contentType: 'text', modes: ['sms'], value: 'message',
    }],
  }, { uuid: '39bc2794-4ff4-4edf-be60-c48ee23ecbd3', values: [] }, { uuid: '1a7a331b-9b0e-4d76-9228-ddb88ed50dea', values: [] }, { uuid: 'effa8049-23d3-4c4d-903e-20300a61913e', values: [] }, {
    uuid: 'f66988f3-b3d2-4df0-ac4d-4ef4b2936e96',
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
    }, {
      languageId: '22', contentType: 'text', modes: ['sms'], value: 'NumericResponse',
    }],
  }, {
    uuid: 'f66988f3-b3d2-4df0-ac4d-4ef4b2936e96',
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
    }, {
      languageId: '22', contentType: 'text', modes: ['sms'], value: 'NumericResponse',
    }],
  }],
  firstFlowId: '7ab8280a-92f3-4691-83ea-213c8a33d0d2',
  nestedFlowBlockInteractionIdStack: [],
  'Core\\Case': {},
  'Core\\Output': {},
  'Core\\RunFlow': {},
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

// const dummyFlow2 = {
//   uuid: '5b8c87d6-de90-4bc4-8668-4f040000006e',
//   name: 'Clipboard Shortcut Tree For Backtracking',
//   label: '',
//   lastModified: '2019-10-10 23:46:30.000000+00:00',
//   interactionTimeout: 172800,
//   supportedModes: [],
//   languages: [
//     {
//       id: '22',
//       name: 'enCA',
//       abbreviation: 'EN',
//       orgId: '1008107874829627392',
//       rightToLeft: false,
//       code: null,
//       deletedAt: null,
//     },
//   ],
//   platformMetadata: {
//     io_viamo: {
//       orgId: '1008107874829627392',
//       treeId: '116',
//     },
//   },
//   blocks: [
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb922d18fc',
//       name: '1570737014110_68',
//       label: 'Do you have more children to add?',
//       semanticLabel: '',
//       config: {
//         choices: {
//           yes: '29841127-3247-461e-829a-89c000000000',
//           no: '29841127-3247-461e-829a-94d800000000',
//         },
//         prompt: '95bd9e4a-93cd-46f2-9b43-8edb922d18fc',
//       },
//       platformMetadata: {
//         io_viamo: {
//           type: 'MultipleChoiceQuestionBlock',
//           customData: {
//             title: 'Do you have more children to add?',
//             label: '',
//             tags: [],
//             reviewed: {
//               22: false,
//             },
//             branching: 1,
//             addExitForNoResponse: 0,
//             choices: [
//               'Yes',
//               'No',
//             ],
//             numChoices: 2,
//             propertyFieldId: null,
//           },
//           uiData: {
//             xPosition: 147,
//             yPosition: 107,
//             numConnections: 2,
//             outputNames: [
//               'Yes',
//               'No',
//             ],
//             fieldLabels: [
//               1,
//               2,
//             ],
//           },
//           audioFiles: [],
//           smsContent: [],
//           ussdContent: [],
//           socialContent: [],
//           clipboardContent: {
//             22: 'Do you have more children to add?',
//           },
//           smsAutogenLangs: [],
//           ussdAutogenLangs: [],
//           socialAutogenLangs: [],
//           clipboardAutogenLangs: [],
//           jsKey: 'block_1570737014110_68',
//         },
//       },
//       exits: [
//         {
//           uuid: '29841127-3247-4610-8037-cdc5199dc271',
//           destinationBlock: '95bd9e4a-93cd-46f2-9b43-8edb92536d34',
//           tag: 'Yes',
//           label: '29841127-3247-4610-8037-cdc5199dc271',
//           semanticLabel: '',
//           test: "@(OR(AND(channel.mode = 'ivr', block.value = '1'), AND(channel.mode != 'ivr', OR(block.value = '1', LOWER(block.value) = 'yes'))))",
//         },
//         {
//           uuid: '29841127-3247-4610-8037-cdc5199dc272',
//           destinationBlock: '95bd9e4a-93cd-46f2-9b43-8edb93718673',
//           tag: 'No',
//           label: '29841127-3247-4610-8037-cdc5199dc272',
//           semanticLabel: '',
//           test: "@(OR(AND(channel.mode = 'ivr', block.value = '2'), AND(channel.mode != 'ivr', OR(block.value = '2', LOWER(block.value) = 'no'))))",
//         },
//       ],
//       type: 'MobilePrimitives\\SelectOneResponse',
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb92536d34',
//       name: '1570737039229_96',
//       label: 'What is their age?',
//       semanticLabel: '',
//       config: {
//         validationMinimum: 0,
//         validationMaximum: 999,
//         ivr: {
//           maxDigits: 3,
//         },
//         prompt: '95bd9e4a-93cd-46f2-9b43-8edb92536d34',
//       },
//       platformMetadata: {
//         io_viamo: {
//           type: 'NumericQuestionBlock',
//           customData: {
//             title: 'What is their age?',
//             label: '',
//             tags: [],
//             reviewed: {
//               22: false,
//             },
//             propertyFieldId: null,
//           },
//           uiData: {
//             xPosition: 139,
//             yPosition: 295,
//             numConnections: 1,
//           },
//           audioFiles: [],
//           smsContent: [],
//           ussdContent: [],
//           socialContent: [],
//           clipboardContent: {
//             22: 'What is their age?',
//           },
//           smsAutogenLangs: [],
//           ussdAutogenLangs: [],
//           socialAutogenLangs: [],
//           clipboardAutogenLangs: [],
//           jsKey: 'block_1570737039229_96',
//         },
//       },
//       exits: [
//         {
//           uuid: '29841127-3247-4610-8037-cdc52896a851',
//           destinationBlock: '95bd9e4a-93cd-46f2-9b43-8edb92667e05',
//           tag: '1',
//           label: '29841127-3247-4610-8037-cdc52896a851',
//           semanticLabel: '',
//         },
//       ],
//       type: 'MobilePrimitives\\NumericResponse',
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb92667e05',
//       name: '1570737051724_85',
//       label: '',
//       semanticLabel: '',
//       config: [],
//       platformMetadata: {
//         io_viamo: {
//           type: 'NumericBranchBlock',
//           customData: {
//             title: '',
//             label: '',
//             tags: [],
//             reviewed: {
//               22: false,
//             },
//             outputs: [
//               {
//                 conditions: [
//                   {
//                     jsKey: 'block_1570737039229_96',
//                     value: 18,
//                   },
//                 ],
//               },
//             ],
//             propertyFieldId: null,
//           },
//           uiData: {
//             xPosition: 139,
//             yPosition: 445,
//             numConnections: 2,
//           },
//           audioFiles: [],
//           smsContent: [],
//           ussdContent: [],
//           socialContent: [],
//           clipboardContent: [],
//           smsAutogenLangs: [],
//           ussdAutogenLangs: [],
//           socialAutogenLangs: [],
//           clipboardAutogenLangs: [],
//           jsKey: 'block_1570737051724_85',
//         },
//       },
//       exits: [
//         {
//           uuid: '29841127-3247-4610-8037-cdc5300939f5',
//           destinationBlock: '95bd9e4a-93cd-46f2-9b43-8edb92b0431d',
//           tag: '1',
//           label: '29841127-3247-4610-8037-cdc5300939f5',
//           semanticLabel: '',
//           test: '@(flow.1570737039229_96.value > 18)',
//         },
//         {
//           uuid: '29841127-3247-4610-8037-cdc5300939f6',
//           destinationBlock: '95bd9e4a-93cd-46f2-9b43-8edb93117c75',
//           default: true,
//           tag: 'DEFAULT',
//           label: '29841127-3247-4610-8037-cdc5300939f6',
//           semanticLabel: '',
//         },
//       ],
//       type: 'Core\\Case',
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb92b0431d',
//       name: '1570737100070_69',
//       label: "They aren't a child if they're over 18",
//       semanticLabel: '',
//       config: {
//         prompt: '95bd9e4a-93cd-46f2-9b43-8edb92b0431d',
//       },
//       platformMetadata: {
//         io_viamo: {
//           type: 'MessageBlock',
//           customData: {
//             title: "They aren't a child if they're over 18",
//             label: '',
//             tags: [],
//             reviewed: {
//               22: false,
//             },
//             propertyFieldId: null,
//           },
//           uiData: {
//             xPosition: -80,
//             yPosition: 627,
//             numConnections: 1,
//           },
//           audioFiles: [],
//           smsContent: [],
//           ussdContent: [],
//           socialContent: [],
//           clipboardContent: {
//             22: "They aren't a child if they're over 18",
//           },
//           smsAutogenLangs: [],
//           ussdAutogenLangs: [],
//           socialAutogenLangs: [],
//           clipboardAutogenLangs: [],
//           jsKey: 'block_1570737100070_69',
//         },
//       },
//       exits: [
//         {
//           uuid: '29841127-3247-4610-8037-cdc54cda3755',
//           destinationBlock: '95bd9e4a-93cd-46f2-9b43-8edb922d18fc',
//           tag: '1',
//           label: '29841127-3247-4610-8037-cdc54cda3755',
//           semanticLabel: '',
//         },
//       ],
//       type: 'MobilePrimitives\\Message',
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb93117c75',
//       name: '1570737163787_41',
//       label: 'Do they enjoy reading?',
//       semanticLabel: '',
//       config: {
//         choices: {
//           yes: '29841127-3247-461e-829c-9fe800000000',
//           no: '29841127-3247-461e-829c-ab6800000000',
//         },
//         prompt: '95bd9e4a-93cd-46f2-9b43-8edb93117c75',
//       },
//       platformMetadata: {
//         io_viamo: {
//           type: 'MultipleChoiceQuestionBlock',
//           customData: {
//             title: 'Do they enjoy reading?',
//             label: '',
//             tags: [],
//             reviewed: {
//               22: false,
//             },
//             branching: 1,
//             addExitForNoResponse: 0,
//             choices: [
//               'Yes',
//               'No',
//             ],
//             numChoices: 2,
//             propertyFieldId: null,
//           },
//           uiData: {
//             xPosition: 171,
//             yPosition: 615,
//             numConnections: 2,
//             outputNames: [
//               'Yes',
//               'No',
//             ],
//             fieldLabels: [
//               1,
//               2,
//             ],
//           },
//           audioFiles: [],
//           smsContent: [],
//           ussdContent: [],
//           socialContent: [],
//           clipboardContent: {
//             22: 'Do they enjoy reading?',
//           },
//           smsAutogenLangs: [],
//           ussdAutogenLangs: [],
//           socialAutogenLangs: [],
//           clipboardAutogenLangs: [],
//           jsKey: 'block_1570737163787_41',
//         },
//       },
//       exits: [
//         {
//           uuid: '29841127-3247-4610-8037-cdc572d49db5',
//           destinationBlock: '95bd9e4a-93cd-46f2-9b43-8edb933994fe',
//           tag: 'Yes',
//           label: '29841127-3247-4610-8037-cdc572d49db5',
//           semanticLabel: '',
//           test: "@(OR(AND(channel.mode = 'ivr', block.value = '1'), AND(channel.mode != 'ivr', OR(block.value = '1', LOWER(block.value) = 'yes'))))",
//         },
//         {
//           uuid: '29841127-3247-4610-8037-cdc572d49db6',
//           destinationBlock: '95bd9e4a-93cd-46f2-9b43-8edb935c202f',
//           tag: 'No',
//           label: '29841127-3247-4610-8037-cdc572d49db6',
//           semanticLabel: '',
//           test: "@(OR(AND(channel.mode = 'ivr', block.value = '2'), AND(channel.mode != 'ivr', OR(block.value = '2', LOWER(block.value) = 'no'))))",
//         },
//       ],
//       type: 'MobilePrimitives\\SelectOneResponse',
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb933994fe',
//       name: '1570737190064_62',
//       label: 'How many books per year do they read?',
//       semanticLabel: '',
//       config: {
//         validationMinimum: 0,
//         validationMaximum: 999,
//         ivr: {
//           maxDigits: 3,
//         },
//         prompt: '95bd9e4a-93cd-46f2-9b43-8edb933994fe',
//       },
//       platformMetadata: {
//         io_viamo: {
//           type: 'NumericQuestionBlock',
//           customData: {
//             title: 'How many books per year do they read?',
//             label: '',
//             tags: [],
//             reviewed: {
//               22: false,
//             },
//             propertyFieldId: null,
//           },
//           uiData: {
//             xPosition: 103,
//             yPosition: 782,
//             numConnections: 1,
//           },
//           audioFiles: [],
//           smsContent: [],
//           ussdContent: [],
//           socialContent: [],
//           clipboardContent: {
//             22: 'How many books per year do they read?',
//           },
//           smsAutogenLangs: [],
//           ussdAutogenLangs: [],
//           socialAutogenLangs: [],
//           clipboardAutogenLangs: [],
//           jsKey: 'block_1570737190064_62',
//         },
//       },
//       exits: [
//         {
//           uuid: '29841127-3247-4610-8037-cdc5827e3339',
//           destinationBlock: '95bd9e4a-93cd-46f2-9b43-8edb935c202f',
//           tag: '1',
//           label: '29841127-3247-4610-8037-cdc5827e3339',
//           semanticLabel: '',
//         },
//       ],
//       type: 'MobilePrimitives\\NumericResponse',
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb935c202f',
//       name: '1570737212703_19',
//       label: 'What is thier name?',
//       semanticLabel: '',
//       config: {
//         ivr: {
//           maxDurationSeconds: 60,
//         },
//         prompt: '95bd9e4a-93cd-46f2-9b43-8edb935c202f',
//       },
//       platformMetadata: {
//         io_viamo: {
//           type: 'OpenQuestionBlock',
//           customData: {
//             title: 'What is thier name?',
//             label: '',
//             tags: [],
//             reviewed: {
//               22: false,
//             },
//             propertyFieldId: null,
//           },
//           uiData: {
//             xPosition: 443,
//             yPosition: 970,
//             numConnections: 1,
//           },
//           audioFiles: [],
//           smsContent: [],
//           ussdContent: [],
//           socialContent: [],
//           clipboardContent: {
//             22: 'What is thier name?',
//           },
//           smsAutogenLangs: [],
//           ussdAutogenLangs: [],
//           socialAutogenLangs: [],
//           clipboardAutogenLangs: [],
//           jsKey: 'block_1570737212703_19',
//         },
//       },
//       exits: [
//         {
//           uuid: '29841127-3247-4610-8037-cdc58ffc925d',
//           destinationBlock: '95bd9e4a-93cd-46f2-9b43-8edb922d18fc',
//           tag: '1',
//           label: '29841127-3247-4610-8037-cdc58ffc925d',
//           semanticLabel: '',
//         },
//       ],
//       type: 'MobilePrimitives\\OpenResponse',
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb93718673',
//       name: '1570737226727_55',
//       label: 'Thanks for entering info about your dependents',
//       semanticLabel: '',
//       config: {
//         prompt: '95bd9e4a-93cd-46f2-9b43-8edb93718673',
//       },
//       platformMetadata: {
//         io_viamo: {
//           type: 'MessageBlock',
//           customData: {
//             title: 'Thanks for entering info about your dependents',
//             label: '',
//             tags: [],
//             reviewed: {
//               22: false,
//             },
//             propertyFieldId: null,
//           },
//           uiData: {
//             xPosition: 443,
//             yPosition: 272,
//             numConnections: 1,
//           },
//           audioFiles: [],
//           smsContent: [],
//           ussdContent: [],
//           socialContent: [],
//           clipboardContent: {
//             22: 'Thanks for entering info about your dependents',
//           },
//           smsAutogenLangs: [],
//           ussdAutogenLangs: [],
//           socialAutogenLangs: [],
//           clipboardAutogenLangs: [],
//           jsKey: 'block_1570737226727_55',
//         },
//       },
//       exits: [
//         {
//           uuid: '29841127-3247-4610-8037-cdc5985884ed',
//           destinationBlock: null,
//           tag: '1',
//           label: '29841127-3247-4610-8037-cdc5985884ed',
//           semanticLabel: '',
//         },
//       ],
//       type: 'MobilePrimitives\\Message',
//     },
//   ],
//   resources: [
//     {
//       uuid: '29841127-3247-461e-829a-89c000000000',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: 'Yes',
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-461e-829a-94d800000000',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: 'No',
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-4610-8037-cdc5199dc271',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: 'Yes',
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-4610-8037-cdc5199dc272',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: 'No',
//         },
//       ],
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb922d18fc',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'offline',
//           ],
//           value: 'Do you have more children to add?',
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-4610-8037-cdc52896a851',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: '1',
//         },
//       ],
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb92536d34',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'offline',
//           ],
//           value: 'What is their age?',
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-4610-8037-cdc5300939f5',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: '1',
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-4610-8037-cdc5300939f6',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: 'DEFAULT',
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-4610-8037-cdc54cda3755',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: '1',
//         },
//       ],
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb92b0431d',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'offline',
//           ],
//           value: "They aren't a child if they're over 18",
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-461e-829c-9fe800000000',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: 'Yes',
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-461e-829c-ab6800000000',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: 'No',
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-4610-8037-cdc572d49db5',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: 'Yes',
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-4610-8037-cdc572d49db6',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: 'No',
//         },
//       ],
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb93117c75',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'offline',
//           ],
//           value: 'Do they enjoy reading?',
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-4610-8037-cdc5827e3339',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: '1',
//         },
//       ],
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb933994fe',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'offline',
//           ],
//           value: 'How many books per year do they read?',
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-4610-8037-cdc58ffc925d',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: '1',
//         },
//       ],
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb935c202f',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'offline',
//           ],
//           value: 'What is thier name?',
//         },
//       ],
//     },
//     {
//       uuid: '29841127-3247-4610-8037-cdc5985884ed',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'ivr',
//             'sms',
//             'ussd',
//             'rich_messaging',
//             'offline',
//           ],
//           value: '1',
//         },
//       ],
//     },
//     {
//       uuid: '95bd9e4a-93cd-46f2-9b43-8edb93718673',
//       values: [
//         {
//           languageId: '22',
//           contentType: 'text',
//           modes: [
//             'offline',
//           ],
//           value: 'Thanks for entering info about your dependents',
//         },
//       ],
//     },
//   ],
// }

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
      console.log('initialize flow runner ')
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
      // if (cursor == null) {
      //
      // }
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
        ['Numeric', 'NumericQuestionBlock'],
        ['MobilePrimitives\\SelectOneResponse', 'MessageBlock'],
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
