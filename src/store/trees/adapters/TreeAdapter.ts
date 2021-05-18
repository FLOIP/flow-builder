/* eslint-disable no-underscore-dangle,@typescript-eslint/interface-name-prefix */

import Vue from 'vue'
import {IFlow, SupportedMode} from '@floip/flow-runner'
import {Store} from "vuex";
import {createTreeDetailsAdapterFor} from '@/store/trees/adapters/TreeDetailsAdapter'
import {createBlockAdapterFor, ITreeBlock} from './BlockAdapter'

export interface ITree {
  id: string
  hasClipboard: boolean
  hasSms: boolean
  hasSocial: boolean
  hasUssd: boolean
  hasVoice: boolean

  details: {
    title: string
    description: string
    startingBlockKey: string
    exitBlockKey: string
    enabledLanguages: string[]

    // todo: which is the source of truth? I'm seeing these duplicated from Tree in the data
    hasClipboard: boolean
    hasSms: boolean
    hasSocial: boolean
    hasUssd: boolean
    hasVoice: boolean
  }

  blocks: ITreeBlock[]
  // connections: ITreeConnection[]
}

export function getOrCreateProxyFor(key: string, creator: Function, cache: Map<string, Vue>) {
  if (!cache.has(key)) {
    cache.set(key, creator())
  }

  return cache.get(key)
}

export function createTreeAdapterFor(flow: IFlow, store: Store<any>) {
  /**
   * Maintains list of block proxies to maintain block references throughout app.
   * @example {[blockUuid]: BlockProxy, ...}
   */
  const BLOCK_PROXY_CACHE = new Map()

  /**
   * Provides ability to maintain blocks list reference when computed props invoked multiple times.
   * @example {[flowUuid]: BlockProxy[], ...}
   */
  const FLOW_BLOCKS_LIST_CACHE = new Map()


  /**
   * Proxy to adapt Tree Spec to Flow Spec.
   * @example tree.details.title => flow.name
   */
  return new Vue({
    store,

    data: () => ({_flow: flow}),

    computed: {
      id() {
        return this.$data._flow.uuid
      },

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

      blocks() {
        // const flowId = this.$data._flow.uuid
        // const blocks = getOrCreateProxyFor(flowId, () => [], FLOW_BLOCKS_LIST_CACHE)


        // todo: how to fix regenerating blocks list on _every_ invocation of .blocks()?
        // well, we actually have control over when a block is added and removed; maybe we needn't be so magical about that



        return this.$data._flow.blocks.map(b => createBlockAdapterFor(b, this.$store))
      },

      details: {
        get() {
          return createTreeDetailsAdapterFor(flow, this, store)
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },
    },
  })
}

