export default {
  flows: [{
    uuid: '2ccb40c8-7769-4c80-8592-dc9fdc33c449',
    name: 'New Test flow',
    label: 'flow label',
    lastModified: '2021-03-05 15:54:22.613Z',
    interactionTimeout: 172800,
    supportedModes: ['offline'],
    languages: [{
      id: '22', name: 'English', abbreviation: 'EN', orgId: '1008107874829627392', rightToLeft: false, code: null, deletedAt: null,
    }],
    platform_metadata: {},
    blocks: [{
      uuid: 'd53b7729-3c2c-44df-9da0-dedab8a59a3c',
      platform_metadata: { io_viamo: { uiData: { xPosition: 245, yPosition: 8065 } } },
      type: 'MobilePrimitives\\Message',
      name: 'Message',
      label: 'message label',
      semanticLabel: 'message semantic label',
      exits: [{
        uuid: 'fbb5c6d9-0468-4b94-82a5-fc9a80d76e62', tag: 'Default', label: 'Default', default: true, config: {}, destinationBlock: 'f31ce357-87d2-42d3-80dc-22bd4219c328',
      }],
      config: { prompt: '4f8d5086-4aa9-4b16-ba36-196f884c682b', messageAudio: '' },
    }, {
      uuid: 'f31ce357-87d2-42d3-80dc-22bd4219c328',
      platform_metadata: { io_viamo: { uiData: { xPosition: 201, yPosition: 8262 } } },
      type: 'MobilePrimitives\\NumericResponse',
      name: 'Numeric',
      label: 'numeric block label',
      semanticLabel: 'numeric block semantic label',
      exits: [{
        uuid: '2ad0ba03-7034-468c-8673-0fcb31c9b2ee', tag: 'Default', label: 'Default', default: true, config: {}, destinationBlock: 'c4536a4e-e7ab-41b3-a90d-20355e73672f',
      }, {
        uuid: '5ae1b49b-c902-442a-9761-583f36dc486f', tag: 'Error', label: 'Error', config: {},
      }],
      config: { prompt: '5878cde4-e236-4115-afa3-4209c24a199b', validationMinimum: 1, validationMaximum: 100 },
    }, {
      uuid: 'c4536a4e-e7ab-41b3-a90d-20355e73672f',
      platform_metadata: { io_viamo: { uiData: { xPosition: 196, yPosition: 8474 } } },
      type: 'MobilePrimitives\\OpenResponse',
      name: 'Open',
      label: 'Open label',
      semanticLabel: 'open semantic label',
      exits: [{
        uuid: 'b63f11ba-0342-446a-bf90-103d06f520d0', tag: 'Default', label: 'Default', default: true, config: {}, destinationBlock: '067278ec-a99a-4ec1-90a3-951dd7adb502',
      }, {
        uuid: 'ce7e98cd-9195-4672-8623-c4b792d4a6da', tag: 'Error', label: 'Error', config: {},
      }],
      config: { prompt: '91ce9a2a-1559-4ea6-b3b1-4c176cdee317' },
    }, {
      uuid: '067278ec-a99a-4ec1-90a3-951dd7adb502',
      platform_metadata: { io_viamo: { uiData: { xPosition: 649, yPosition: 8069 } } },
      type: 'MobilePrimitives\\SelectOneResponse',
      name: 'SelectOne',
      label: 'select one label',
      semanticLabel: 'select one semantic',
      exits: [{
        uuid: '43d40d7b-471e-46e5-bc14-2b9e399c0e58', tag: 'Default', label: 'Default', default: true, config: {}, destinationBlock: '518ef0ea-b798-4930-83ec-84a2bc27f702',
      },
        // {
        //   uuid: '5fbf8272-4aed-4e9e-81af-430d6e2ff251', test: 'block.value = 1', label: 'ecf371c7-c828-454a-a86c-d73a8ba18cc6', tag: '', config: {},
        // }, {
        //   uuid: '949fb9cc-fd70-4218-98bb-ce8270a9b4a3', test: 'block.value = 2', label: '5a3806fd-b607-47a0-8894-3fa8292888dd', tag: '', config: {},
        // }, {
        //   uuid: '6ef75f83-2fc9-4720-82e7-74b636bc6fc1', test: 'block.value = 3', label: 'ce71c42b-41e2-48df-9164-e17914093d90', tag: '', config: {},
        // }
      ],
      config: {
        prompt: '2340e0a6-5422-4327-8d33-3d472da895f9',
        questionPrompt: '59e595f4-5231-4a4c-af8f-4aebcebdfd79',
        choicesPrompt: '3eb9414d-0499-4c0c-b057-52b2a5d64252',
        choices: {
          1: '4e57c737-5ca3-463a-b4b0-7d50da0d4f60', 2: 'ecf371c7-c828-454a-a86c-d73a8ba18cc6', 3: '5a3806fd-b607-47a0-8894-3fa8292888dd', 4: 'ce71c42b-41e2-48df-9164-e17914093d90',
        },
      },
    }, {
      uuid: '518ef0ea-b798-4930-83ec-84a2bc27f702',
      platform_metadata: { io_viamo: { uiData: { xPosition: 652, yPosition: 8328 } } },
      type: 'MobilePrimitives\\SelectManyResponse',
      name: 'SelectMany',
      label: 'select many label',
      semanticLabel: 'Select many semantic label',
      exits: [{
        uuid: '748c8174-3b04-4c94-9516-434466557a21', tag: 'Default', label: 'Default', default: true, config: {},
      }, {
        uuid: '277b1dc8-84d1-48ce-91de-88ceaefc3b1b', test: 'block.value = 1', label: 'e2beb0fa-5e83-46b6-9459-222683b0ff20', tag: '', config: {},
      }, {
        uuid: '9fdfee90-2845-4696-a342-d78b4980407d', test: 'block.value = 2', label: 'c3ae6711-9e53-497e-98df-9b0599c31dcb', tag: '', config: {},
      }, {
        uuid: 'a0b10d17-2f9b-44ab-8b7e-669693ce7fe8', test: 'block.value = 3', label: '38e4e9b6-1308-4816-980e-831d3737d29a', tag: '', config: {},
      }, {
        uuid: '3dec728b-9593-463c-9d17-a3e2ef83eb14', test: 'block.value = 4', label: '2f6bba77-4177-49e4-8165-8c7c414ae1a0', tag: '', config: {},
      }, {
        uuid: 'f061b7cc-8178-4bc3-80c8-b0e3e83f52f4', test: 'block.value = 5', label: '894fea5e-8127-4bd2-82ee-158e38a82cbb', tag: '', config: {},
      }, {
        uuid: 'c2264e4e-3d55-4133-a22e-41bc9695cfa9', test: 'block.value = 6', label: 'f82de0d9-a68e-40d5-af7f-79a5fdd13078', tag: '', config: {},
      }],
      config: {
        prompt: '197cef4f-b54f-4f91-b248-1dcd29321677',
        questionPrompt: '14fbceb8-e35f-4ace-9c5e-cf7ca2c4bac6',
        choicesPrompt: 'f30d2eff-9c0d-4c15-aaf5-c31e8285c8a8',
        choices: {
          1: 'cff90152-836e-4132-9404-7d30c5aa2361', 2: 'e2beb0fa-5e83-46b6-9459-222683b0ff20', 3: 'c3ae6711-9e53-497e-98df-9b0599c31dcb', 4: '38e4e9b6-1308-4816-980e-831d3737d29a', 5: '2f6bba77-4177-49e4-8165-8c7c414ae1a0', 6: '894fea5e-8127-4bd2-82ee-158e38a82cbb', 7: 'f82de0d9-a68e-40d5-af7f-79a5fdd13078',
        },
      },
    },
    ],
    firstBlockId: 'd53b7729-3c2c-44df-9da0-dedab8a59a3c',
  }],
  resources: [{
    uuid: '4f8d5086-4aa9-4b16-ba36-196f884c682b',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'This is text from message block',
    }],
  }, { uuid: '1a185330-2c58-4e34-8224-4bd1e96c3523', values: [] }, { uuid: 'bd47159a-dc15-440b-acd0-b015113e6da1', values: [] }, { uuid: '9b49106f-b6b3-41ce-94e7-19d36529a960', values: [] }, {
    uuid: '5878cde4-e236-4115-afa3-4209c24a199b',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'What is your age?',
    }],
  }, {
    uuid: '5878cde4-e236-4115-afa3-4209c24a199b',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'What is your age?',
    }],
  }, { uuid: '282aa9d5-7293-4fbc-b51d-2404953ac4b6', values: [] }, { uuid: '383f810b-e4bb-4c32-bde9-3f5d582f8eeb', values: [] }, {
    uuid: '91ce9a2a-1559-4ea6-b3b1-4c176cdee317',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Could you please tell us about yourself in a few sentences?',
    }],
  }, {
    uuid: '91ce9a2a-1559-4ea6-b3b1-4c176cdee317',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Could you please tell us about yourself in a few sentences?',
    }],
  }, {
    uuid: '4e57c737-5ca3-463a-b4b0-7d50da0d4f60',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Employed',
    }],
  }, {
    uuid: '2340e0a6-5422-4327-8d33-3d472da895f9',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'We would like to know about your employment status',
    }],
  }, {
    uuid: '59e595f4-5231-4a4c-af8f-4aebcebdfd79',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Choose one of the options below',
    }],
  }, {
    uuid: '3eb9414d-0499-4c0c-b057-52b2a5d64252',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'The options are ',
    }],
  }, { uuid: '5f098b14-ae71-4a69-bfde-10b80e1bbde2', values: [] }, { uuid: 'f05dd15b-fe15-47e5-acd3-c7900c029726', values: [] }, {
    uuid: 'cff90152-836e-4132-9404-7d30c5aa2361',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Comedy',
    }],
  }, {
    uuid: '197cef4f-b54f-4f91-b248-1dcd29321677',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'We are collecting information to enhance your experience',
    }],
  }, {
    uuid: '14fbceb8-e35f-4ace-9c5e-cf7ca2c4bac6',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Which genre of movies do you like?',
    }],
  }, {
    uuid: 'f30d2eff-9c0d-4c15-aaf5-c31e8285c8a8',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Please choose the options that you like',
    }],
  }, { uuid: '6eb12816-79a2-4e04-b2f7-c6904c078269', values: [] }, { uuid: '0e49ac32-4ae7-4876-b93b-bde911fabc35', values: [] }, {
    uuid: 'ecf371c7-c828-454a-a86c-d73a8ba18cc6',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Self-Employed',
    }],
  }, {
    uuid: '8784c326-981c-4129-a4bc-4eb47c9302c7',
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
  }, { uuid: '050b29fd-7b14-412c-b7e7-a2bac212757b', values: [] }, {
    uuid: '5a3806fd-b607-47a0-8894-3fa8292888dd',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Unemployed',
    }],
  }, {
    uuid: '6acd0a56-02b0-42d0-b76a-855b3b618085',
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
  }, { uuid: 'f7469b19-d9db-4edd-801b-a95efbb3341f', values: [] }, {
    uuid: 'ce71c42b-41e2-48df-9164-e17914093d90',
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
    uuid: 'eae0312b-1d31-4787-9fd7-cd57b6cf9fda',
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
  }, { uuid: 'e0d86485-ebf1-4048-aa2e-bc0b79de104b', values: [] }, {
    uuid: 'e2beb0fa-5e83-46b6-9459-222683b0ff20',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Romantic',
    }],
  }, {
    uuid: '7d4d349e-eb17-44c7-bbfc-f9cf09d5d739',
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
  }, { uuid: 'dcd814e6-8cf5-47c9-bfc2-5a194502f67c', values: [] }, {
    uuid: 'c3ae6711-9e53-497e-98df-9b0599c31dcb',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Horror',
    }],
  }, {
    uuid: 'bb80e377-a62c-4d41-848a-6662b3e2c9c8',
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
  }, { uuid: 'c6d528c7-5526-48c3-903b-3171869f8ac8', values: [] }, {
    uuid: '38e4e9b6-1308-4816-980e-831d3737d29a',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Documentaries',
    }],
  }, {
    uuid: '7a145c28-d380-48e7-80b1-7e01c8668b0c',
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
  }, { uuid: 'ba55c47d-252d-4d1b-a63d-49fa7a966e3c', values: [] }, {
    uuid: '2f6bba77-4177-49e4-8165-8c7c414ae1a0',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Historical',
    }],
  }, {
    uuid: '117fe743-bf3f-409e-a147-ed4b2668b3cc',
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
  }, { uuid: '805bf974-740d-4c4a-90c9-b5bcfdf39578', values: [] }, {
    uuid: '894fea5e-8127-4bd2-82ee-158e38a82cbb',
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
      languageId: '22', contentType: 'text', modes: ['offline'], value: 'Sci-fi',
    }],
  }, {
    uuid: 'f6427af0-66c6-4e14-9141-b5b7b6f31dce',
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
  }, { uuid: '0a8cb504-57a9-40e4-a841-75aed8533595', values: [] }, {
    uuid: 'f82de0d9-a68e-40d5-af7f-79a5fdd13078',
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
    uuid: 'd1164047-5cf8-40cf-ae30-c1003d3acd10',
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
  }, { uuid: '520ce187-9a69-4b20-b21f-6220bde345c6', values: [] }],
  firstFlowId: '2ccb40c8-7769-4c80-8592-dc9fdc33c449',
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
