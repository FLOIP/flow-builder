/* eslint-disable @typescript-eslint/interface-name-prefix */
import {fill, filter, find, kebabCase, keyBy, map, mapValues, zipObject} from 'lodash'
import Vue from 'vue'
import {mapGetters, mapMutations, Store} from "vuex"
import {IBlock, IFlow, IResource, SupportedMode} from "@floip/flow-runner"
import {ILanguage} from "@floip/flow-runner/src/index";
import {
  createBlockCustomDataAdapterFor,
  ICustomData
} from "@/store/trees/adapters/BlockCustomDataAdapter";
import {ITree} from "@/store/trees/adapters/TreeAdapter";

export interface IBlockWithViamoMetadata extends IBlock {
  vendor_metadata: {
    io_viamo: ITreeBlock
  }
}

export interface ITreeBlock {
  jsKey: string
  type: string

  customData: ICustomData
  uiData: {
    xPosition: number
    yPosition: number
    outputNames: string[]
  },

  smsContent: Record<ILanguage['id'], string>
  ussdContent: Record<ILanguage['id'], string>
  /** @see trees/stores/trees.js::updateBlockContentFor() */
  socialContent: Record<ILanguage['id'], {
    text: string
    allLanguagesFileUrl: null
    allLanguagesFileId: null
    allLanguagesFileType: null
  }>
  clipboardContent: Record<ILanguage['id'], string>

  smsAutogenLangs: ILanguage['id'][]
  ussdAutogenLangs: ILanguage['id'][]
  socialAutogenLangs: ILanguage['id'][]
  clipboardAutogenLangs: ILanguage['id'][]

  audioFiles: {
    // ?
  }
}

export function createBlockAdapterFor(
  flow: IFlow,
  block: IBlockWithViamoMetadata,
  tree: ITree,
  store: Store<any>,
): ITreeBlock {
  Vue.observable(flow)
  Vue.observable(block)
  Vue.observable(tree)

  return new Vue({
    store,

    computed: {
      ...mapGetters('flow', ['activeFlow']),

      jsKey() {
        return block.uuid
      },

      type: {
        get() {
          return block.vendor_metadata.io_viamo.type || kebabCase(block.type)
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      customData() {
        return createBlockCustomDataAdapterFor(flow, block, tree, store)
      },

      uiData() {
        return block.vendor_metadata.io_viamo.uiData
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
          // todo: debug which gets called first: watch(flow.languages) or get(smsContent)

          const {values}: IResource = this.resourcesByUuid[block.config.prompt]
          const languageIds: ILanguage['id'][] = map(flow.languages, 'id')
          const content = zipObject(
            languageIds,
            fill(languageIds.slice(), null))

          // eslint-disable-next-line @typescript-eslint/camelcase
          const valuesForContentType = filter(values, {content_type: 'TEXT', modes: ['SMS']})
          const resourceValuesByLangId = keyBy(valuesForContentType, 'language_id')
          const contentPopulated = mapValues(resourceValuesByLangId, ({ value }) => value)

          Object.assign(content, contentPopulated)
          return Vue.observable(content)
        },
        set(value) {

          // handle blanket assignment by delegating to separate method

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
          return block.vendor_metadata.io_viamo.smsAutogenLangs
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      ussdAutogenLangs: {
        get() {
          return block.vendor_metadata.io_viamo.ussdAutogenLangs
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      socialAutogenLangs: {
        get() {
          return block.vendor_metadata.io_viamo.socialAutogenLangs
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },

      clipboardAutogenLangs: {
        get() {
          return block.vendor_metadata.io_viamo.clipboardAutogenLangs
        },
        // set(details) {
        //   this.$store.dispatch('viamoToFlowAdapter/setTreeDetails', {details})
        //   return details
        // },
      },
    },

    watch: {
      ['activeFlow.languages'](val, previousVal) {
        // set up watchers for new languages
        console.debug("setting up more watchers");

        // const newLanguageIds = difference(
        //   this.flow.languageIds,
        //   Object.keys(this.smsContent)
        // );
        //
        // console.debug(newLanguageIds);
        //
        // forEach(newLanguageIds, (id) => {
        //   this.$set(this.smsContent, id, null);
        //   this.$watch(
        //     function () {
        //       return this.smsContent[id];
        //     },
        //
        //     this.handleContentChanged
        //   );
        // });
      },

      // ['customData.title'](value, previousValue) {
      //   this.block_setName({blockId: block.uuid, value})
      // },
    },

    methods: {
      ...mapMutations(['builder/block_setName'])
    }
  })
}
