/* eslint-disable @typescript-eslint/interface-name-prefix */
import {find, keyBy, mapValues} from 'lodash'
import Vue from 'vue'
import {mapMutations, Store} from "vuex"
import {IBlock, IFlow, IResource, SupportedMode} from "@floip/flow-runner"

export interface ITreeBlock {
  jsKey: string
  type: string

  customData: {}
  uiData: {}

  smsContent: {} // {"206062": ""},
  ussdContent: {}
  socialContent: {} // {"206062": {"text": "Social content"}},
  clipboardContent: {}

  smsAutogenLangs: string[]
  ussdAutogenLangs: string[]
  socialAutogenLangs: string[]
  clipboardAutogenLangs: string[]

  audioFiles: {} // ?
}

export function createBlockAdapterFor(block: IBlock, store: Store<any>) {
  return new Vue({
    store,

    data: () => ({_block: block}),

    computed: {
      jsKey() {
        return this.$data._block.uuid
      },

      type: {
        get() {
          const block = this.$data._block;
          return block.vendor_metadata.io_viamo.type || block.type
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      customData: {
        get() {
          return this.$data._block.vendor_metadata.io_viamo.customData
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      uiData: {
        get() {
          return this.$data._block.vendor_metadata.io_viamo.uiData
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      audioFiles: {
        get() {
          // todo: some kind of map over resources
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      smsContent: {
        get() {
          // const resourcesByUuid = this.$store.getters['flow/resourcesByUuid']
          // const resource: IResource = resourcesByUuid[this._block.config]

          // todo: leverage something like findResourceVariantOverModesWith
          //  or findResourceVariantOverModesOn
          // const smsResourceVariants = find(resource.values, {modes: [SupportedMode.SMS]})
          // return mapValues(keyBy(smsResourceVariants, 'languageId'), ({value}) => value)
        },
        set(value) {
          // this.resource_setOrCreateValueModeSpecific({resourceId, filter, value})
        },
      },

      ussdContent: {
        get() {
          // todo: some kind of map over resources
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      socialContent: {
        get() {
          // todo: some kind of map over resources
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      clipboardContent: {
        get() {
          // todo: some kind of map over resources
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      smsAutogenLangs: {
        get() {
          return this.$data._block.vendor_metadata.io_viamo.smsAutogenLangs
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      ussdAutogenLangs: {
        get() {
          return this.$data._block.vendor_metadata.io_viamo.ussdAutogenLangs
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      socialAutogenLangs: {
        get() {
          return this.$data._block.vendor_metadata.io_viamo.socialAutogenLangs
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      clipboardAutogenLangs: {
        get() {
          return this.$data._block.vendor_metadata.io_viamo.clipboardAutogenLangs
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },
    },

    watch: {
      // ['customData.title'](value, previousValue) {
      //   this.block_setName({blockId: this.$data._block.uuid, value})
      // },
    },

    methods: {
      ...mapMutations(['builder/block_setName'])
    }
  })
}
