import {SelectOneResponseFloipUiMetadataChoiceByPrompt} from '@floip/flow-runner'
import {IChoiceConfigChange, uiMetadataChoicesToConfigChanges} from '../choice'

const TEST_DATA: SelectOneResponseFloipUiMetadataChoiceByPrompt = {
  '18dc9baf-23d1-47c4-af67-63c2c28a60d3': {
    voice_options: {
      voice_use_expression: false,
      voice_key_press: '1',
      voice_expression: null,
    },
    text_options: {
      'en-CA': [
        'hello',
        'hi',
      ],
      'ru-RU': [
        'здравствуйте',
        'привет',
      ],
    },
  },
  '6a0f6572-0fbd-4de1-af2d-1205715255c5': {
    voice_options: {
      voice_use_expression: false,
      voice_key_press: '2',
      voice_expression: null,
    },
    text_options: {
      'en-CA': [
        'goodbye',
        'bye',
      ],
      'ru-RU': [
        'до свидания',
        'пока',
      ],
    },
  },
}

const EXPECTED_CONFIG_CHANGES: IChoiceConfigChange[] = [
  {
    prompt: '18dc9baf-23d1-47c4-af67-63c2c28a60d3',
    text_tests: [
      {language: 'en-CA', test_expression: 'block.response = \'hello\''},
      {language: 'en-CA', test_expression: 'block.response = \'hi\''},
      {language: 'ru-RU', test_expression: 'block.response = \'здравствуйте\''},
      {language: 'ru-RU', test_expression: 'block.response = \'привет\''},
    ],
  },
  {
    prompt: '6a0f6572-0fbd-4de1-af2d-1205715255c5',
    text_tests: [
      {language: 'en-CA', test_expression: 'block.response = \'goodbye\''},
      {language: 'en-CA', test_expression: 'block.response = \'bye\''},
      {language: 'ru-RU', test_expression: 'block.response = \'до свидания\''},
      {language: 'ru-RU', test_expression: 'block.response = \'пока\''},
    ],
  },
]

test('convert choices ui_metadata to a series of block.config changes', () => {
  const configChanges = uiMetadataChoicesToConfigChanges(TEST_DATA)
  expect(configChanges).toEqual(EXPECTED_CONFIG_CHANGES)
})
