/* eslint-disable max-len */

import {IRootState} from '@/store'
import {
  findBlockWith,
  IBlock,
  IChoice,
  IFlow,
  ILanguage,
  IResource,
  ISelectOneResponseBlock,
  ValidationException,
} from '@floip/flow-runner'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {deleteChoiceValueByPath} from '@/store/flow/utils/vuexBlockHelpers'
import {IEmptyState} from '@/store/flow/block-types/BaseBlockStore'
import Vue from 'vue'
import {choiceToTestExpression} from '@/components/interaction-designer/block-editors/choices/expressionTransformers'

export const BLOCK_RESPONSE_EXPRESSION = 'block.response'

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
  choice_deleteByPath(state, {choice, path}: { choice: IChoice, path: string }) {
    deleteChoiceValueByPath(state, choice, `${path}`)
  },
}

export const actions: ActionTree<IEmptyState, IRootState> = {
  choice_create(
    {rootGetters, dispatch},
    {blockId, resourceId, value}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string },
  ) {
    const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const {choices, set_contact_property} = block.config

    dispatch('choice_updateName', {blockId, resourceId, value})

    // Make sure to update the ivr_test expression to provide a default value,
    // which is associated with using key_press selector by default
    dispatch('choice_updateIvrTestExpression', {
      blockId,
      resourceId,
      value: `${BLOCK_RESPONSE_EXPRESSION} = '${choices.length < 10
        ? choices.length
        : '*'
      }'`,
    })

    if (set_contact_property !== undefined && set_contact_property.length > 0) {
      dispatch('flow/block_updateContactPropertyMetadataAfterNewChoiceAdded', {
        blockId,
        prompt: resourceId,
      }, {root: true})
    }
  },

  choice_change(
    {dispatch},
    params: { blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string },
  ) {
    dispatch('choice_updateName', params)
  },

  choice_updateName(
    {dispatch, getters},
    {blockId, resourceId, value}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string },
  ) {
    const previousName = getters.choice_findChoice(blockId, resourceId)?.name

    dispatch('choice_updateByPath', {
      blockId,
      resourceId,
      path: 'name',
      value,
    })

    dispatch('flow/block_updateContactPropertyAfterChoicesChange', {
      blockId,
    }, {root: true})

    dispatch('choice_updateFirstSynonymForActiveLanguages', {
      blockId,
      resourceId,
      oldValue: previousName,
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
    {blockId, resourceId, value, oldValue}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string, oldValue: string },
  ) {
    const flow: IFlow = rootGetters['flow/activeFlow']
    const languages = flow.languages

    languages.forEach(({id: language}) => {
      const choice = getters.choice_findChoice(blockId, resourceId) as IChoice
      const existingValue = choice.text_tests?.find(synonym => synonym.language === language)?.test_expression

      const isNew = existingValue === undefined
      const hasValueToMatch = oldValue !== undefined
      const hasMatchingValues = hasValueToMatch && existingValue === choiceToTestExpression(oldValue)
      const shouldUpdateValue = isNew || !hasValueToMatch || hasMatchingValues

      // Make sure the 1st synonym has not been changed by the user
      if (shouldUpdateValue) {
        dispatch('choice_setSynonymForLanguage', {
          blockId,
          resourceId,
          language,
          index: 0,
          value,
        })
      }
    })
  },

  /**
   * Replaces a synonym by given index for a specific language.
   *
   * @param param0 vuex context
   * @param param1 action parameters
   * @returns
   */
  choice_setSynonymForLanguage(
    {getters, dispatch},
    {blockId, resourceId, language, index = Number.POSITIVE_INFINITY, value}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'], language: ILanguage['id'], index: number, value: string },
  ) {
    const choice = getters.choice_findChoice(blockId, resourceId)
    const expressionValue = choiceToTestExpression(value)

    if (choice?.text_tests === undefined) {
      Vue.set(choice, 'text_tests', [])
    }

    let testIndex = 0
    let languageIndex = -1

    for (; testIndex < choice.text_tests.length; testIndex += 1) {
      const text_test = choice.text_tests[testIndex]

      if (text_test.language === language) {
        languageIndex += 1

        if (languageIndex === index) {
          dispatch('choice_updateByPath', {
            blockId,
            resourceId: choice.prompt,
            path: `text_tests.[${testIndex}].test_expression`,
            value: expressionValue,
          })
          return
        }
      }
    }

    if (languageIndex < index) {
      dispatch('choice_updateByPath', {
        blockId,
        resourceId: choice.prompt,
        path: `text_tests.[${choice.text_tests.length}]`,
        value: {
          language,
          test_expression: expressionValue,
        },
      })
    }
  },

  choice_removeTextTestsExpressionOnIndex(
    {commit},
    {choice, testIndex, value}: { choice: IChoice, testIndex: number, value: string },
  ) {
    commit('choice_deleteByPath', {
      choice,
      path: `text_tests.[${testIndex}]`,
      value,
    })
  },

  choice_updateByPath(
    {commit, rootGetters},
    {blockId, resourceId, path, value}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'], path: string, value?: object | string | number | boolean },
  ) {
    const block = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const choices = block.config.choices
    const choiceIndex = choices.findIndex((choice: IChoice) => choice.prompt === resourceId)

    commit('flow/block_updateConfigByPath', {
      blockId,
      path: `choices.[${choiceIndex}].${path}`,
      value,
    }, {root: true})
  },
}
