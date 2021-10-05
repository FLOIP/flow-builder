/* eslint-disable no-underscore-dangle */

import {map} from 'lodash'
import Vue from 'vue'
import {Store} from 'vuex'
import {IFlow, SupportedMode} from '@floip/flow-runner'
import {ITree} from '@/store/trees/adapters/TreeAdapter'

export function createTreeDetailsAdapterFor(
  flow: IFlow,
  tree: ITree,
  store: Store<any>,
) {
  Vue.observable(flow)
  Vue.observable(tree)

  return new Vue({
    store,

    computed: {
      title: {
        get() {
          return flow.name
        },
      },

      description: {
        get() {
          return flow.label
        },
      },

      // todo: when should we use getters vs. FlowAdapter?
      hasClipboard() {
        return flow.supported_modes.indexOf(SupportedMode.OFFLINE) !== -1
      },

      hasSms() {
        return flow.supported_modes.indexOf(SupportedMode.SMS) !== -1
      },

      hasSocial() {
        return flow.supported_modes.indexOf(SupportedMode.RICH_MESSAGING) !== -1
      },

      hasUssd() {
        return flow.supported_modes.indexOf(SupportedMode.USSD) !== -1
      },

      hasVoice() {
        return flow.supported_modes.indexOf(SupportedMode.IVR) !== -1
      },

      startingBlockKey: {
        get() {
          return flow.first_block_id
        },

        // set(blockId) {
        //   this.flow_setFirstBlockId({flowId: flow.uuid, blockId});
        // },
      },

      exitBlockKey: {
        get() {
          return flow.exit_block_id
        },

        // set(blockId) {
        // this.flow_setFirstBlockId({flowId: flow.uuid, blockId});
        // },
      },

      enabledLanguages: {
        get() {
          return map(flow.languages, 'id')
        },

        // set() {
        // flow_setSupportedMode
        // },
      },
    },
  });
}
