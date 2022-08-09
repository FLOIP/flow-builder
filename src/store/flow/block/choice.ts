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

export const getters: GetterTree<IEmptyState, IRootState> = {
  choice_findChoice: (state, getters, rootState, rootGetters) => (blockId: string, prompt: string): IChoice | undefined => {
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
    const choice = getters.choice_findChoice(blockId, resourceId)
    choice.name = value
  },

  choice_updateIvrTestExpression(
    {getters, rootGetters, dispatch},
    {blockId, resourceId, value}: {blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string},
  ) {
    const choice = getters.choice_findChoice(blockId, resourceId)
    Vue.set(choice, 'ivr_test', {})
    Vue.set(choice.ivr_test as object, 'test_expression', value)
  },

  // TODO: rename this to init because it's called to init text_test only
  choice_updateTextTestsOn(
    {getters, rootGetters, dispatch, commit},
    {blockId, resourceId, value, langId}: {blockId: IBlock['uuid'], resourceId: IResource['uuid'], value: string, langId: ILanguage['id']},
  ) {
    const choice = getters.choice_findChoice(blockId, resourceId)

    // Making sure we have array on text_tests
    if (choice?.text_tests === undefined) {
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
