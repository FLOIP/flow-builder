/* eslint-disable no-underscore-dangle */

import {isEmpty, map, omit} from 'lodash'
import Vue from 'vue'
import {Store} from 'vuex'
import {
  IBlock,
  IFlow,
  ISelectOneResponseBlockConfig,
  ResourceResolver,
  ValidationException
} from '@floip/flow-runner'
import {ITree} from '@/store/trees/adapters/TreeAdapter'
import {IBlockWithViamoMetadata} from "@/store/trees/adapters/BlockAdapter";

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ICustomData {
  title: string
  label: string
  branching: number // as boolean
  addExitForNoResponse: number // as boolean

  // MCQ
  choices: string[]
  numChoices: number

}

export function createBlockCustomDataAdapterFor(
  flow: IFlow,
  block: IBlockWithViamoMetadata,
  tree: ITree,
  store: Store<any>,
) {
  // explicitly initialize shared reference for customData
  if (isEmpty(block.vendor_metadata.io_viamo.customData)) {
    throw new ValidationException('Unable to create customData adapter for absent customData value.')
  }

  Vue.observable(flow)
  Vue.observable(block)
  Vue.observable(tree)

  delete block.vendor_metadata.io_viamo.customData.label
  // delete block.vendor_metadata.io_viamo.customData.branching
  // delete block.vendor_metadata.io_viamo.customData.addExitForNoResponse
  // delete block.vendor_metadata.io_viamo.customData.choices
  // delete block.vendor_metadata.io_viamo.customData.numChoices

  return new Vue({
    store,

    data: () => {
      // todo: we should return the same customData ref because data props are inherently proxied
      //       === shared customdata instance
      // todo: we should provide container resources into this adapter factory for resource lookups

      // todo: need flow and block to be observables
      // debugger

      return block.vendor_metadata.io_viamo.customData
    },

    computed: {
      title() {
        return block.label
      },

      branching() {
        return // getter for isSeggregated
      },

      addExitForNoResponse() {
        return // i don't know what this corresponds to
      },

      choices() {
        // return map(
        //   (block.config as ISelectOneResponseBlockConfig).choices,
        //   (resourceId) => ResourceResolver.prototype.resolve.call({ resources: [] }, resourceId)
        // )

        return

        // return this.$data._block.config.choices.map(resourceId =>
        //   ResourceResolver.prototype.resolve.call({resources: []}, resourceId))
      },

      numChoices() {
        return Object.keys((block.config as ISelectOneResponseBlockConfig).choices).length
      },
    },
  })
}
