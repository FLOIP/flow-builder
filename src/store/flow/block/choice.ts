import {IRootState} from '@/store'
import {
  findBlockWith, IBlock,
  IChoice,
  IFlow, ILanguage, IResource,
  ISelectOneResponseBlock,
  ISelectOneResponseFloipUiMetadataChoice,
  SelectOneResponseFloipUiMetadataChoiceByPrompt,
  TextTest, ValidationException,
} from '@floip/flow-runner'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {updateChoiceValueByPath, deleteChoiceValueByPath, updateBlockValueByPath} from '@/store/flow/utils/vuexBlockHelpers'
import {IEmptyState} from '@/store/flow/block-types/BaseBlock'
import Vue from 'vue'
import {findResourceWith} from '../resource'

export interface IChoiceChange {
  blockId: string,
  prompt: string,
}

export interface IChoiceSynonymChange extends IChoiceChange {
  language: string,
  index: string,
  synonym?: string,
}

export const getters: GetterTree<IEmptyState, IRootState> = {
  choice_findChoice(state, getters, rootState, rootGetters):
    (blockId: string, prompt: string) => ISelectOneResponseFloipUiMetadataChoice | undefined {
    return (blockId: string, prompt: string) => {
      const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
      return block.vendor_metadata?.floip?.ui_metadata.choices[prompt]
    }
  },

  /**
   * I think this would be the safest way to find a choice, not from vendor_metadata
   * TODO, once both of us agree:
   * - remove this comment
   * - rename this to choice_findChoice
   * - remove old choice_findChoice
   * - update all choice_findChoice_v2 ref in the code base
   */
  choice_findChoice_v2: (state, getters, rootState, rootGetters) => (blockId: string, prompt: string): IChoice | undefined => {
    const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const resource: IResource = rootGetters['flow/resourcesByUuidOnActiveFlow'][prompt]

    if (resource == null) {
      throw new ValidationException(`Unable to find resource for choice: ${prompt}`)
    }

    return block.config.choices.find((choice: IChoice) => choice.prompt === prompt)
  },
}

export const mutations: MutationTree<IEmptyState> = {
  choice_updateByPath(state, {choice, path, value}: { choice: IChoice, path: string, value?: object | string | number | boolean }) {
    updateChoiceValueByPath(state, choice, `${path}`, value)
  },
  choice_deleteByPath(state, {choice, path}: { choice: IChoice, path: string }) {
    deleteChoiceValueByPath(state, choice, `${path}`)
  },
}

export const actions: ActionTree<IEmptyState, IRootState> = {
  choice_updateName(
    {getters, rootGetters, dispatch},
    {blockId, resourceId, value}: {blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string},
  ) {
    const choice = getters.choice_findChoice_v2(blockId, resourceId)
    choice.name = value
  },

  choice_updateIvrTestExpression(
    {getters, rootGetters, dispatch},
    {blockId, resourceId, value}: {blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string},
  ) {
    const choice = getters.choice_findChoice_v2(blockId, resourceId)
    Vue.set(choice, 'ivr_test', {})
    Vue.set(choice.ivr_test as object, 'test_expression', value)
  },

  // TODO: rename this to init ...
  choice_updateTextTestsOn(
    {getters, rootGetters, dispatch, commit},
    {blockId, resourceId, value, langId}: {blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string, langId: ILanguage['id']},
  ) {
    const choice = getters.choice_findChoice_v2(blockId, resourceId)

    // Making sure we have array on text_tests
    if (choice?.text_tests === undefined) {
      console.warn('choice_setTextTestsExpressionOn', 'choice.text_tests was not set')
      choice.text_tests = []
    }

    const test: TextTest | undefined = choice.text_tests.find((currentTest: TextTest) => currentTest.language === langId)
    if (test !== undefined) {
      // Update existing element
      test.test_expression = value
    } else {
      // Insert new element
      const testIndex = choice.text_tests.length
      commit('choice_updateByPath', {
        choice,
        path: `text_tests.[${testIndex}]`,
        value: {
          language: langId,
          test_expression: value,
        },
      })
    }
  },

  choice_updateTextTestsForActiveLanguages(
    {getters, rootGetters, dispatch, commit},
    {blockId, resourceId, value}: {blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string},
  ) {
    const languages = rootGetters['flow/activeFlow'].languages
    languages.every((lang: ILanguage) => dispatch('choice_updateTextTestsOn', {
      blockId,
      resourceId,
      langId: lang.id,
      value,
    }))
  },

  /**
   * Set choice's text tests expression on a given index
   */
  choice_setTextTestsExpressionOnIndex(
    {commit, state, dispatch},
    {choice, testIndex, langId, value}: { choice: IChoice, testIndex: number, langId?: ILanguage['id'], value: string },
  ) {
    console.debug('test', 'choice_setTextTestsExpressionOnIndex', {choice, testIndex, langId, value})
    if (langId !== undefined) {
      commit('choice_updateByPath', {
        choice,
        path: `text_tests.[${testIndex}].language`,
        value: langId,
      })
    }

    commit('choice_updateByPath', {
      choice,
      path: `text_tests.[${testIndex}].test_expression`,
      value,
    })
  },

  choice_removeTextTestsExpressionOnIndex(
    {commit, state, dispatch},
    {choice, testIndex, value}: { choice: IChoice, testIndex: number, value: string },
  ) {
    commit('choice_deleteByPath', {
      choice,
      path: `text_tests.[${testIndex}]`,
      value,
    })
  },

  choice_addChoice({getters, rootGetters, commit, dispatch}, data: IChoiceChange) {
    const choice: ISelectOneResponseFloipUiMetadataChoice = getters.choice_findChoice(data.blockId, data.prompt)
    const activeFlow = rootGetters['flow/activeFlow'] as IFlow
    const resource = findResourceWith(data.prompt, activeFlow)
    const value = resource.values.find(value => value.mime_type === 'text/plain;choice=true')?.value
    const languages = activeFlow.languages.map(language => language.id)

    if (choice !== undefined) {
      console.warn('choice_addChoice', 'choice already exists')
      return
    }

    commit('flow/block_updateVendorMetadataByPath', {
      blockId: data.blockId,
      path: `floip.ui_metadata.choices[${data.prompt}]`,
      value: {
        text_options: languages.reduce((acc, language) => ({
          ...acc,
          [language]: [value],
        }), {}),
      },
    }, {root: true})

    dispatch('choice_updateConfigFromUiMetadata', data.blockId)
  },

  choice_updateConfigFromUiMetadata({rootGetters, commit}, blockId: string) {
    const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const choices = block.vendor_metadata?.floip.ui_metadata.choices

    if (choices === undefined) {
      console.warn('choice_updateConfigFromUiMetadata', 'no metadata')
      return
    }

    uiMetadataChoicesToConfigChanges(choices)
      .forEach(({prompt, text_tests}) => {
        console.info('update config from choices', prompt, text_tests)
        const choiceIndex = block.config.choices.findIndex(choice => choice.prompt === prompt)

        commit('flow/block_updateConfigByPath', {
          blockId,
          path: `choices[${choiceIndex}].text_tests`,
          value: text_tests,
        }, {root: true})
      })
  },

  choice_updateUiMetadataFromConfig(context) { },
}

export interface IChoiceConfigChange {
  prompt: string,
  text_tests: TextTest[],
}

export function uiMetadataChoicesToConfigChanges(choices: SelectOneResponseFloipUiMetadataChoiceByPrompt): IChoiceConfigChange[] {
  const configChanges: IChoiceConfigChange[] = []

  Object.entries(choices).forEach(([prompt, choice]) => {
    const configChange: IChoiceConfigChange = {
      prompt,
      text_tests: [],
    }

    Object.entries(choice.text_options).forEach(([language, synonyms]) => {
      synonyms.forEach((synonym, index) => {
        configChange.text_tests.push({
          language,
          test_expression: synonym.startsWith('@') === true
            ? synonym
            : `block.response = '${synonym}'`,
        })
        // TODO VMO-5463 Handle voice config as well
      })
    })

    configChanges.push(configChange)
  })

  return configChanges
}
