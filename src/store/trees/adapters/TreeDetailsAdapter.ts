/* eslint-disable no-underscore-dangle */

import {map} from 'lodash'
import Vue from 'vue'
import {Store} from 'vuex'
import {IFlow, SupportedMode} from '@floip/flow-runner'
import {ITree} from '@/store/trees/adapters/TreeAdapter'

export function createTreeDetailsAdapterFor(flow: IFlow, tree: ITree, store: Store<any>) {
  return new Vue({
    store,

    data: () => ({_flow: flow}),

    computed: {
      title: {
        get() {
          return this.$data._flow.name
        },
      },

      description: {
        get() {
          return this.$data._flow.label
        },
      },

      // todo: when should we use getters vs. FlowAdapter?
      hasClipboard() {
        return this.$data._flow.supportedModes.indexOf(SupportedMode.OFFLINE) !== -1
      },

      hasSms() {
        return this.$data._flow.supportedModes.indexOf(SupportedMode.SMS) !== -1
      },

      hasSocial() {
        return this.$data._flow.supportedModes.indexOf(SupportedMode.RICH_MESSAGING) !== -1
      },

      hasUssd() {
        return this.$data._flow.supportedModes.indexOf(SupportedMode.USSD) !== -1
      },

      hasVoice() {
        return this.$data._flow.supportedModes.indexOf(SupportedMode.IVR) !== -1
      },

      startingBlockKey: {
        get() {
          return this.$data._flow.firstBlockId
        },

        set(blockId) {
          this.flow_setFirstBlockId({flowId: this.$data._flow.uuid, blockId});
        },
      },

      exitBlockKey: {
        get() {
          return this.$data._flow.exitBlockId
        },

        // set(blockId) {
        // this.flow_setFirstBlockId({flowId: this.$data._flow.uuid, blockId});
        // },
      },

      enabledLanguages: {
        get() {
          return map(this.$data._flow.languages, 'id')
        },

        // set() {
        // flow_setSupportedMode
        // },
      },
    },
  });
}
