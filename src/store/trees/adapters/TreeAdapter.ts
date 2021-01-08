import Vue from 'vue'
import {keyBy} from 'lodash'
import {createBlockAdapterFor} from './BlockAdapter'
import {IFlow} from "@floip/flow-runner";
import {Store} from "vuex";
import {createTreeDetailsAdapterFor} from "@/store/trees/adapters/TreeDetailsAdapter";

export function createTreeAdapterFor(flow: IFlow, store: Store<any>) {
  return new Vue({
    store,

    data: () => ({_flow: flow}),

    computed: {
      id() {
        return this.$data._flow.uuid
      },

      blocks() {
        return this.$data._flow.blocks.map(b => createBlockAdapterFor(b, this.$store))
      },

      details: {
        get() {
          return createTreeDetailsAdapterFor(flow, store)
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },
    },
  })
}

