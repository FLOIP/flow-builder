/* eslint-disable max-len */

import {IRootState} from '@/store'
import {
  findBlockWith, IBlock,
  IChoice,
  IFlow, ILanguage, IResource,
  ISelectOneResponseBlock,
  TextTest, ValidationException,
} from '@floip/flow-runner'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {updateChoiceValueByPath, deleteChoiceValueByPath, updateBlockValueByPath} from '@/store/flow/utils/vuexBlockHelpers'
import {IEmptyState} from '@/store/flow/block-types/BaseBlock'
import Vue from 'vue'
import {findResourceWith} from '../resource'

export const BLOCK_RESPONSE_EXPRESSION = 'block.response'

export function textValueToExpression(value: string): string {
  // TODO Escape single quote in the value
  return value.startsWith('@') === true
    ? value
    : `@block.response = '${value}'`
}

export const getters: GetterTree<IEmptyState, IRootState> = {
  choice_findChoice: (state, getters, rootState, rootGetters) =>
    /**
     * Finds a block.config.choices[] by given blockId and prompt.
     */
    (blockId: IBlock['uuid'], prompt: IResource['uuid']): IChoice | undefined => {
      const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
      const resource: IResource = rootGetters['flow/resourcesByUuidOnActiveFlow'][prompt]

      if (resource == null) {
        throw new ValidationException(`Unable to find resource for choice: ${prompt}`)
      }

      return block.config.choices.find((choice: IChoice) => choice.prompt === prompt)
    }
  ,
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
  choice_create(
    {rootGetters, dispatch},
    params: { blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string },
  ) {
    const block: ISelectOneResponseBlock = findBlockWith(params.blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock

    dispatch('choice_updateName', params)
    dispatch('choice_updateFirstSynonymForActiveLanguages', params)

    // Make sure to update the ivr_test expression to provide a default value,
    // which is associated with using key_press selector by default
    dispatch('choice_updateIvrTestExpression', {
      ...params,
      value: `${BLOCK_RESPONSE_EXPRESSION} = '${
        block.config.choices.length < 10
          ? block.config.choices.length
          : '*'
      }'`,
    })
  },

  choice_change(
    {dispatch},
    params: { blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string },
  ) {
    dispatch('choice_updateName', params)
    dispatch('choice_updateFirstSynonymForActiveLanguages', params)
  },

  choice_updateName(
    {getters, dispatch},
    {blockId, resourceId, value}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string },
  ) {
    const choice = getters.choice_findChoice(blockId, resourceId)
    choice.name = value

    dispatch('choice_updateFirstSynonymForActiveLanguages', {
      blockId,
      resourceId,
      value,
    })
  },

  /**
   * Replaces ivr_test.test_expression with a given value;
   * An element of block.config.choices[] is found by blockId and prompt = resourceId.
   */
  choice_updateIvrTestExpression(
    {getters, rootGetters, dispatch},
    {blockId, resourceId, value}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string },
  ) {
    const choice = getters.choice_findChoice(blockId, resourceId)
    Vue.set(choice, 'ivr_test', {})
    Vue.set(choice.ivr_test as object, 'test_expression', value)
  },

  /**
   * Replaces 1st item of text_tests[] for all languages in a choice.
   */
  choice_updateFirstSynonymForActiveLanguages(
    {getters, rootGetters, dispatch, commit},
    {blockId, resourceId, value}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string },
  ) {
    const flow: IFlow = rootGetters['flow/activeFlow']
    const languages = flow.languages

    languages.forEach(({id: language}) => {
      // TODO Don't replace if existing value was changed by the user
      dispatch('choice_setSymonymForLanguage', {
        blockId,
        resourceId,
        language,
        index: 0,
        value,
      })
    })
  },

  /**
   * Replaces a synonym by given index for a specific language.
   *
   * @param param0 vuex context
   * @param param1 action parameters
   * @returns
   */
  choice_setSymonymForLanguage(
    {getters, rootGetters, dispatch, commit},
    {blockId, resourceId, language, index, value}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'], language: ILanguage['id'], index: number, value: string },
  ) {
    const choice = getters.choice_findChoice(blockId, resourceId)
    const expressionValue = textValueToExpression(value)

    if (choice?.text_tests === undefined) {
      choice.text_tests = []
    }

    let testIndex = 0
    let languageIndex = -1

    for (; testIndex < choice.text_tests.length; testIndex += 1) {
      const text_test = choice.text_tests[testIndex]

      if (text_test.language === language) {
        languageIndex += 1

        if (languageIndex === index) {
          commit('choice_updateByPath', {
            choice,
            path: `text_tests.[${testIndex}].test_expression`,
            value: expressionValue,
          })
          return
        }
      }
    }

    if (languageIndex < index) {
      choice.text_tests.push({
        language,
        test_expression: expressionValue,
      })
    }
  },

  /**
   * Set choice's text tests expression on a given index
   */
  choice_setTextTestsExpressionOnIndex(
    {commit, state, dispatch},
    {choice, testIndex, langId, value}: { choice: IChoice, testIndex: number, langId?: ILanguage['id'], value: string },
  ) {
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
}
