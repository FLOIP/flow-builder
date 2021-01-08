import Vue from 'vue'
import {IFlow} from "@floip/flow-runner";
import {Store} from "vuex";

export function createTreeDetailsAdapterFor(flow: IFlow, store: Store<any>) {
  return new Vue({
    store,

    data: () => ({_flow: flow}),

    computed: {
      title: {
        get() {
          return this.$data._flow.x
        },

        set() {

        }
      },
      description: {
        get() {
          return this.$data._flow.x
        },

        set() {

        }
      },
      hasVoice: {
        get() {
          return this.$store.getters['flow/hasVoiceMode']
        },

        set(isEnabled: boolean) {
          // flow_setSupportedMode
        }
      },
      enabledLanguages: {
        get() {
          return this.$data._flow.x
        },

        set() {
          // flow_setSupportedMode
        }
      },
      hasSms: {
        get() {
          return this.$store.getters['flow/hasSMSMode']
        },

        set() {
          // flow_setSupportedMode
        }
      },
      hasUssd: {
        get() {
          return this.$store.getters['flow/hasUssdMode']
        },

        set() {
          // flow_setSupportedMode
        }
      },
      hasSocial: {
        get() {
          return this.$data._flow.x
        },

        set() {
          // flow_setSupportedMode
        }
      },
      startingBlockKey: {
        get() {
          return this.$data._flow.x
        },

        set(blockId) {
          this.flow_setFirstBlockId({flowId: this.$data._flow.uuid, blockId})
        }
      },
    },
  })
}

