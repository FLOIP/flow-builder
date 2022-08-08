import {IRootState} from '@/store'
import {
  findBlockWith,
  IChoice,
  IFlow,
  ISelectOneResponseBlock,
  ISelectOneResponseFloipUiMetadataChoice,
  SelectOneResponseFloipUiMetadataChoiceByPrompt,
  TextTest,
} from '@floip/flow-runner'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {updateChoiceValueByPath, deleteChoiceValueByPath, updateBlockValueByPath} from '@/store/flow/utils/vuexBlockHelpers'
import {IEmptyState} from '@/store/flow/block-types/BaseBlock'
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
  /**
   * Set choice's text tests expression on a given index
   */
  choice_setTextTestsExpressionOnIndex(
    {commit, state, dispatch},
    {choice, testIndex, value}: { choice: IChoice, testIndex: number, value: string },
  ) {
    // TODO VMO-6654 Consider language
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
