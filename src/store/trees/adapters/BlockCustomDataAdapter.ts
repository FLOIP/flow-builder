/* eslint-disable no-underscore-dangle */

import {map, omit} from 'lodash'
import Vue from 'vue'
import {Store} from 'vuex'
import {IBlock, IFlow, ResourceResolver} from '@floip/flow-runner'
import {ITree} from '@/store/trees/adapters/TreeAdapter'

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
  flow: IFlow, block: IBlock, tree: ITree, store: Store<any>) {

  return new Vue({
    store,

    data: () => {
      // todo: we should return the same customData ref because data props are inherently proxied
      //       === shared customdata instance
      // todo: we should provide container resources into this adapter factory for resource lookups

      return {
        _flow: flow,
        _block: block,

        // ack. the reality that we're maintaining separate entity refs for customData itself
        ...omit(this.$data._block.vendor_metadata.io_viamo.customData, [
          // wipe props that will be proxied as computed properties
          'branching',
          'addExitForNoResponse',
          'choices',
          'numChoices',
        ])
      }
    },

    computed: {
      branching() {
        return // getter for isSeggregated
      },

      addExitForNoResponse() {
        return // i don't know what this corresponds to
      },

      choices() {
        return this.$data._block.config.choices.map(resourceId =>
          ResourceResolver.prototype.resolve.call({resources: []}, resourceId))
      },

      numChoices() {
        return Object.keys(this.$data._block.config.choices).length
      },
    },
  });
}
