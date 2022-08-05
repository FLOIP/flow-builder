import {IRootState} from '@/store'
import {IChoice} from '@floip/flow-runner'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {updateChoiceValueByPath} from '@/store/flow/utils/vuexBlockHelpers'
import {IEmptyState} from '@/store/flow/block-types/BaseBlock'

export const getters: GetterTree<IEmptyState, IRootState> = {

}

export const mutations: MutationTree<IEmptyState> = {
  choice_updateByPath(state, {choice, path, value}: {choice: IChoice, path: string, value?: object | string | number | boolean}) {
    updateChoiceValueByPath(state, choice, `${path}`, value)
  },
}

export const actions: ActionTree<IEmptyState, IRootState> = {
  /**
   * Set choice's text tests expression on a given index
   */
  choice_setTextTestsExpressionOnIndex(
    {commit, state, dispatch},
    {choice, testIndex, value}: { choice: IChoice, choiceIndex: number, testIndex: number, value: string },
  ) {
    commit('choice_updateByPath', {
      choice,
      path: `text_tests.[${testIndex}].test_expression`,
      value,
    })
  },
}
