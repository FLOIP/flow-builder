import {cloneDeep, isEqual, find, map, every, isObjectLike} from 'lodash'
import Vue from 'vue'
import Vuex, {Store} from "vuex"

import {IBlock, IFlow, SupportedMode} from '@floip/flow-runner'
import {createTreeAdapterFor, ITree} from '@/store/trees/adapters/TreeAdapter'
import {ITreeBlock} from '@/store/trees/adapters/BlockAdapter'
import ILanguage from '@floip/flow-runner/src/flow-spec/ILanguage'

import BlankFlowContainer from '@/store/builder/blank-flow.json'
import ShortcutFlowContainer from '@/store/builder/2019-10-10-shortcut-flow.json'

Vue.use(Vuex)


describe('createTreeAdapterFor', () => {
  let flow: IFlow
  let store: Store<unknown>
  let tree: ITree

  beforeEach(() => {
    flow = cloneDeep(BlankFlowContainer.flows[0])
    store = new Store<unknown>({})
    tree = createTreeAdapterFor(flow, store)
  })

  it('should return an adapter (instance of Vue)', () => {
    expect(createTreeAdapterFor(flow, store)).toBeInstanceOf(Vue)
  })

  describe('TreeAdapter', () => {
    it('should map `id` to `flow.uuid`', () => {
      expect(flow.uuid).toBeTruthy()
      expect(tree.id).toBe(flow.uuid)
    })

    it('should map `hasClipboard` to `flow.supportedModes.indexOf(offline)`', () => {
      flow.supportedModes = []
      expect(tree.hasClipboard).toBe(false)

      flow.supportedModes = [SupportedMode.OFFLINE]
      expect(tree.hasClipboard).toBe(true)
    })

    it('should map `hasSms` to `flow.supportedModes.indexOf(sms)`', () => {
      flow.supportedModes = []
      expect(tree.hasSms).toBe(false)

      flow.supportedModes = [SupportedMode.SMS]
      expect(tree.hasSms).toBe(true)
    })

    it('should map `hasSocial` to `flow.supportedModes.indexOf(rich_messaging)`', () => {
      flow.supportedModes = []
      expect(tree.hasSocial).toBe(false)

      flow.supportedModes = [SupportedMode.RICH_MESSAGING]
      expect(tree.hasSocial).toBe(true)
    })

    it('should map `hasUssd` to `flow.supportedModes.indexOf(ussd)`', () => {
      flow.supportedModes = []
      expect(tree.hasUssd).toBe(false)

      flow.supportedModes = [SupportedMode.USSD]
      expect(tree.hasUssd).toBe(true)
    })

    it('should map `hasVoice` to `flow.supportedModes.indexOf(ivr)`', () => {
      flow.supportedModes = []
      expect(tree.hasVoice).toBe(false)

      flow.supportedModes = [SupportedMode.IVR]
      expect(tree.hasVoice).toBe(true)
    })

    it('should map `blocks.*.jsKey` to `flow.blocks.*.uuid`', () => {
      // todo: test cache
      // todo: test block adapter

      flow.blocks = []
      expect(tree.blocks).toEqual([])

      flow.blocks = cloneDeep(ShortcutFlowContainer.flows[0].blocks)

      expect(flow.blocks.length).toBe(8)
      expect(map(tree.blocks, 'jsKey'))
        .toEqual(map(flow.blocks, 'uuid'))
    })

    it('should map `blocks.*` to adapters (instances of Vue)', () => {
      flow.blocks = cloneDeep(ShortcutFlowContainer.flows[0].blocks)

      expect(flow.blocks.length).toBe(8)
      expect(every(tree.blocks, b => b instanceof Vue)).toBe(true)
    })

    xit('should map `connections` to `flow.*`', () => {

    })

    xit('should map `createdAt` to `flow.*`', () => {
      /**
       createdAt: Object
       date: "2021-01-19 19:51:12.000000"
       timezone: "UTC"
       timezone_type: 3
       */
    })

    xit('should map `editedAt` to `flow.*`', () => {

    })

    xit('should map `updatedAt` to `flow.*`', () => {

    })

    xit('should map `duplicateTree` to `flow.*`', () => {

    })

    xit('should map `floipSyncedAt` to `flow.*`', () => {

    })

    xit('should map `isDuplicateOf` to `flow.*`', () => {

    })

    xit('should map `orgId` to `flow.*`', () => {

    })

    xit('should map `otherVersionsCount` to `flow.*`', () => {

    })

    xit('should map `treeSetId` to `flow.*`', () => {

    })


    it('should map details to an adapter (instance of Vue)', () => {
      expect(tree.details).toBeInstanceOf(Vue)
    })
  })

  describe('TreeDetailsAdapter', () => {
    it('should map `title` to `flow.name`', () => {
      const name = 'My first flow'

      flow.name = name
      expect(tree.details.title).toBe(name)
    })

    it('should map `description` to `flow.label`', () => {
      const description = 'A description of my first flow.'

      flow.label = description
      expect(tree.details.description).toBe(description)
    })

    it('should map `enabledLanguages` to `flow.languages.*.id`', () => {
      flow.languages = [{id: '1'}, {id: '2'}, {id: '3'}] as ILanguage[]
      expect(tree.details.enabledLanguages).toStrictEqual(['1', '2', '3'])
    })

    it('should map `startingBlockKey` to `flow.firstBlockId`', () => {
      flow.firstBlockId = null
      expect(tree.details.startingBlockKey).toBe(null)

      flow.firstBlockId = '5b8c87d6-de90-4bc4-8668-4f040000006e'
      expect(tree.details.startingBlockKey).toBe(flow.firstBlockId)
    })

    it('should map `exitBlockKey` to `flow.exitBlockId`', () => {
      flow.exitBlockId = null
      expect(tree.details.exitBlockKey).toBe(null)

      flow.exitBlockId = '5b8c87d6-de90-4bc4-8668-4f040000006e'
      expect(tree.details.exitBlockKey).toBe(flow.exitBlockId)
    })

    it('should map `hasClipboard` to `flow.supportedModes.indexOf(offline)`', () => {
      flow.supportedModes = []
      expect(tree.details.hasClipboard).toBe(false)

      flow.supportedModes = [SupportedMode.OFFLINE]
      expect(tree.details.hasClipboard).toBe(true)
    })

    it('should map `hasSms` to `flow.supportedModes.indexOf(sms)`', () => {
      flow.supportedModes = []
      expect(tree.details.hasSms).toBe(false)

      flow.supportedModes = [SupportedMode.SMS]
      expect(tree.details.hasSms).toBe(true)
    })

    it('should map `hasSocial` to `flow.supportedModes.indexOf(rich_messaging)`', () => {
      flow.supportedModes = []
      expect(tree.details.hasSocial).toBe(false)

      flow.supportedModes = [SupportedMode.RICH_MESSAGING]
      expect(tree.details.hasSocial).toBe(true)
    })

    it('should map `hasUssd` to `flow.supportedModes.indexOf(ussd)`', () => {
      flow.supportedModes = []
      expect(tree.details.hasUssd).toBe(false)

      flow.supportedModes = [SupportedMode.USSD]
      expect(tree.details.hasUssd).toBe(true)
    })

    it('should map `hasVoice` to `flow.supportedModes.indexOf(ivr)`', () => {
      flow.supportedModes = []
      expect(tree.details.hasVoice).toBe(false)

      flow.supportedModes = [SupportedMode.IVR]
      expect(tree.details.hasVoice).toBe(true)
    })

    xit('should map `savedByUserOrganisationId` to `flow.*`', () => {
      //"12402"
    })

    xit('should map `syncedLanguage` to `flow.*`', () => {

    })
  })

  describe('BlockAdapter', () => {
    let flowBlock: IBlock
    let treeBlock: ITreeBlock

    beforeEach(() => {
      flow.blocks = cloneDeep(ShortcutFlowContainer.flows[0].blocks)
      flowBlock = flow.blocks[0]
      treeBlock = tree.blocks[0]
      // treeBlock = findWhere({jsKey: flowBlock.uuid})
    })

    it('should map `block` to an adapter (instance of Vue)', () => {
      expect(treeBlock).toBeInstanceOf(Vue)
    })

    it('should map `jsKey` to `block.uuid`', () => {
      expect(flowBlock.uuid).toBeTruthy()
      expect(treeBlock.jsKey).toBe(flowBlock.uuid)
    })

    it('should map `type` to `block.vendor_metadata.io_viamo.type`', () => {
      const {io_viamo: {type}} = flowBlock.vendor_metadata
      expect(type).toBe('MultipleChoiceQuestionBlock')
      expect(treeBlock.type).toBe(type)
    })

    it('should map `type` to a fallback of `block.type` when absent', () => {
      const {type} = flowBlock
      expect(type).toBe('MobilePrimitives\\SelectOneResponse') // todo: should be dot-notation

      flowBlock.vendor_metadata.io_viamo.type = null
      expect(treeBlock.type).toBe(type)
    })

    /*
    todo: customData and uiData adapters need to provide a second layer fallback mechanism for
          non-computed and block type specific props. Perhaps this will need to be a js Proxy.

          The trick is exemplified below. We can create another, `CustomDataAdapter`, but there will
          be sneaky properties that would like to be passthru.

          I suppose the ideal way for this would be to have a data() {} that returns the full set
          This gives us observability by default for "sets" using a watcher.
          We'd then need to blacklist keys on this.methods() and this.computed() if vue.js makes us.

    //   "branching": 1,
    //   "addExitForNoResponse": 0,
    //   "choices": [
    //     "Yes",
    //     "No"
    //   ],
    //   "numChoices": 2,

     */

    it('should map `customData` to an adapter (instance of Vue)', () => {
      expect(treeBlock.customData).toBeInstanceOf(Vue)
    })

    it('should map `customData` to `block.vendor_metadata.io_viamo.customData`', () => {
      expect(isObjectLike(treeBlock.customData)).toBe(true)
      expect(isEqual(treeBlock.customData, flowBlock.vendor_metadata.io_viamo.customData))
        .toBe(true)

      /** todo: we'll need to use blacklist from `CustomDataAdapter` to also filter those from above
                because they're not guarantted to match if the computed result from flowBlock
                differs from customData's */
    })

    describe('CustomDataAdapter', () => {
      xit('should map `label` to `block.name`', () => {})

      // todo: see @safs work on seggregated exits
      xit('should map `branching` to `some query over exits', () => {})
      xit('should map `addExitForNoResponse` to `some query over exits', () => {})


      xit('should map `choices` to `findTextResourceValuesByResourceId(block.config.choices)`', () => {})

      // todo: figure out which Number field we were updating to show/hide certain exits
      it('should map `numChoices` to `block.exits.length`', () => {
        expect(flowBlock.exits.length).toBeGreaterThan(0)
        expect(treeBlock.customData.numChoices).toEqual(Object.keys(flowBlock.config.choices).length)
      })


    })



    it('should map `uiData` to `block.vendor_metadata.io_viamo.uiData`', () => {
      expect(isObjectLike(treeBlock.uiData)).toBe(true)
      expect(isEqual(treeBlock.uiData, flowBlock.vendor_metadata.io_viamo.uiData))
        .toBe(true)
    })

    describe('uiDataAdapter', () => {
      xit('should map `numConnections` to block.exits.length', () => {})
    })


    // "customData": {
    //   "branching": 1,
    //   "addExitForNoResponse": 0,
    //   "choices": [
    //     "Yes",
    //     "No"
    //   ],
    //   "numChoices": 2,

    // "uiData": {
    //   "outputNames": [
    //     "Yes",
    //     "No"
    //   ],
    //   "fieldLabels": [
    //     1,
    //     2
    //   ]

    // <div v-for="n in (choices.length + 1)" class="form-group">
    //   <slot :api="api"
    //         :choice="getChoiceAt(n - 1)"
    //         :label="fieldLabels[n - 1] || n"
    //         :i="n - 1"
    //         :isAdditional="n > choices.length"
    //         :updateChoiceAt="updateChoiceAt">
    //
    //     <div class="input-group transition-all" :class="{dimmed: n > choices.length}">
    //       <div class="input-group-prepend mcq-sidebar-choice-labels">
    //         <span class="input-group-text">{{fieldLabels[n - 1] || n}}</span>
    //       </div>
    //
    //       <input type="text"
    //              :value="getChoiceAt(n - 1)"
    //              @input="updateChoiceAt(n - 1, $event.target.value)"
    //              class="form-control">
    //     </div>
    //   </slot>
    // </div>

    // updateChoiceAt(i, val) {
    //   if (!this.selectedBlock) {
    //     return;
    //   }
    //
    //   this.choices.splice(i, 1, val) // When (i - 1) > list.length === Array.push()
    //
    //   const lastPopulatedIndex = lodash.findLastIndex(this.choices, x => !!x)
    //   this.choices.splice(lastPopulatedIndex + 1, Number.MAX_SAFE_INTEGER) // clear out empties
    //
    //   this.$store.dispatch('setMcqOutputNames', {jsKey: this.selectedBlock.jsKey})
    //   this.$store.dispatch('setMcqSidebarFieldLabels', {jsKey: this.selectedBlock.jsKey})
    //   this.$store.dispatch('setContentFromQuestionText', {jsKey: this.selectedBlock.jsKey})
    //   this.$store.dispatch('uiChanged', {msg: 'MCQ choices changed'});
    // },

    // setMcqOutputNames({commit, dispatch, state: {tree}}, {jsKey}) {
    //   console.debug('vuex.trees', 'setMcqOutputNames', jsKey)
    //
    //   const block = lodash.find(tree.blocks, {jsKey})
    //   if (!block) {
    //     console.log('AppView::generateMcqOutputNamesFor()', 'Unable to find specified block.')
    //     return
    //   }
    //
    //   let isOutputBranchingEnabled = !!block.customData.branching,
    //       outputNames
    //
    //   if (isOutputBranchingEnabled) {
    //     if (block.type === "SummaryBlock") {
    //       outputNames = [langJs.trans("trees.confirm"), langJs.trans("trees.reject")]
    //     } else {
    //       outputNames = lodash.clone(lodash.get(block, 'customData.choices', lodash.range(1, block.customData.numChoices + 1)))
    //     }
    //   } else {
    //     outputNames = [1]
    //   }
    //
    //   commit('updateBlockCustomDataFor', {jsKey, key: 'numChoices', value: outputNames.length})
    //
    //   let isNoResponseExitEnabled = block.customData.addExitForNoResponse
    //   isNoResponseExitEnabled && outputNames.push('trees.output-exit')
    //
    //   commit('updateBlockUiDataFor', {jsKey, key: 'outputNames', value: outputNames})
    //   dispatch('setBlockNumConnections', {jsKey, value: outputNames.length})
    // },

    // setMcqSidebarFieldLabels({commit, dispatch, state: {tree}}, {jsKey}) {
    //   const block = lodash.find(tree.blocks, {jsKey})
    //
    //   if (!block || !isMCQBlock(block)) {
    //     console.log('AppView::generateMcqOutputNamesFor()', 'Wrong block type')
    //     return
    //   }
    //
    //   let isVoiceEnabled = tree.details.hasVoice,
    //       isTextChannelEnabled = tree.details.hasSms || tree.details.hasUssd || tree.details.hasSocial || tree.details.hasClipboard,
    //       hasChoiceKeypresses = !lodash.isEmpty(block.customData.choiceKeypresses),
    //       fieldLabels
    //
    //   if (isVoiceEnabled && !isTextChannelEnabled && hasChoiceKeypresses) {
    //     fieldLabels = getChoiceKeyPressesFor(block)
    //   } else if (isVoiceEnabled && isTextChannelEnabled && hasChoiceKeypresses) {
    //     fieldLabels = lodash.times(block.customData.numChoices, lodash.constant('•'))
    //   } else {
    //     fieldLabels = lodash.range(1, block.customData.numChoices + 1)
    //   }
    //
    //   commit('updateBlockUiDataFor', {jsKey, key: 'fieldLabels', value: fieldLabels})
    // }

    // fieldLabels() {
    //   let fieldLabels = lodash.get(this.selectedBlock, 'uiData.fieldLabels', [])
    //   return lodash.map(lodash.concat(this.choices, ''), (choice, i) => {
    //     if (fieldLabels[0] === '•') {
    //       return '•'
    //     } else {
    //       return fieldLabels[i] || i + 1
    //     }
    //   })
    // }

    /*
    processNewContentTypeBranchBlock: function(blockData) {
      console.log('Inside processNewContentTypeBranchBlock');
      console.log(blockData);

      var numConnections = 0;
      var outputTypes = [];
      var outputNames = [];

      if (app.tree.get('details').hasVoice) {
        numConnections += 1;
        outputTypes.push(1);
        outputNames.push('trees.output-voice');
      }
      if (app.tree.get('details').hasSms) {
        numConnections += 1;
        outputTypes.push(2);
        outputNames.push('trees.output-sms');
      }
      if (app.tree.get('details').hasClipboard) {
        numConnections += 1;
        outputTypes.push(3);
        outputNames.push('trees.output-clipboard');
      }
      if (app.tree.get('details').hasUssd) {
        numConnections += 1;
        outputTypes.push(4);
        outputNames.push('trees.output-ussd');
      }
      if (app.tree.get('details').hasSocial) {
        numConnections += 1;
        outputTypes.push(10);
        // eslint-disable-next-line max-len
        outputTypes.push(15);
        outputNames.push('trees.output-social');
      }

      blockData.uiData.numConnections = numConnections;
      blockData.uiData.outputNames = outputNames;
      blockData.customData.outputTypes = outputTypes;

      return blockData;
    },
    initializeJsPlumbValidateCodeBlock: function (blockData) {
      if (blockData.type === 'ValidateCodeBlock') {
        if (app.tree.get('details').hasClipboard) {
          blockData.uiData.numConnections = 4
          blockData.uiData.outputNames[3] = 'trees.offline'
        } else {
          blockData.uiData.numConnections = 3
          // Keep only the first three items in the array
          blockData.uiData.outputNames.splice(3, 1)
        }
      }
    },
*/

    xit('should map `smsContent` to flow.resources.values.*.values.{sms,text,language_id}', () => {})
    xit('should map `ussdContent` to flow.resources.values.*.values.{ussd,text,language_id}', () => {})
    xit('should map `clipboardContent.{language_id}.{text}` to flow.resources.values.*.values.{offline,text,language_id}', () => {})
    xit('should map `socialContent.{language_id}.{text}` to flow.resources.values.*.values.{rich_messaging,text,language_id}', () => {})

    it('should map `smsAutogenLangs` to `block.vendor_metadata.io_viamo.smsAutogenLangs`', () => {
      const {io_viamo: {smsAutogenLangs}} = flowBlock.vendor_metadata
      expect(smsAutogenLangs).toEqual([])
      expect(treeBlock.smsAutogenLangs).toEqual([])

      smsAutogenLangs.push('22')
      expect(treeBlock.smsAutogenLangs).toEqual(['22'])
    })

    it('should map `ussdAutogenLangs` to `block.vendor_metadata.io_viamo.ussdAutogenLangs`', () => {
      const {io_viamo: {ussdAutogenLangs}} = flowBlock.vendor_metadata
      expect(ussdAutogenLangs).toEqual([])
      expect(treeBlock.ussdAutogenLangs).toEqual([])

      ussdAutogenLangs.push('22')
      expect(treeBlock.ussdAutogenLangs).toEqual(['22'])
    })

    it('should map `socialAutogenLangs` to `block.vendor_metadata.io_viamo.smsAutogenLangs`', () => {
      const {io_viamo: {socialAutogenLangs}} = flowBlock.vendor_metadata
      expect(socialAutogenLangs).toEqual([])
      expect(treeBlock.socialAutogenLangs).toEqual([])

      socialAutogenLangs.push('22')
      expect(treeBlock.socialAutogenLangs).toEqual(['22'])
    })

    it('should map `clipboardAutogenLangs` to `block.vendor_metadata.io_viamo.smsAutogenLangs`', () => {
      const {io_viamo: {clipboardAutogenLangs}} = flowBlock.vendor_metadata
      expect(clipboardAutogenLangs).toEqual([])
      expect(treeBlock.clipboardAutogenLangs).toEqual([])

      clipboardAutogenLangs.push('22')
      expect(treeBlock.clipboardAutogenLangs).toEqual(['22'])
    })
  })
})


// {
//   "jsKey": "block_1611086165516_44"
//   "type": "MessageBlock",
//
//   "customData": {
//     "title": "Welcome from Saskatoon!!!!",
//     "label": "cat",
//     "tags": [],
//     "reviewed": {"206062": true, "209294": true},
//     "propertyFieldId": null
//   },
//
//   "uiData": {"xPosition": 56, "yPosition": 61, "numConnections": 1},
//
//   "ussdContent": {"206062": ""},
//   "smsContent": {"206062": ""},
//   "socialContent": {"206062": {"text": "Welcome from Saskatoon!!!!"}},
//   "clipboardContent": {},
//
//   "smsAutogenLangs": [],
//   "ussdAutogenLangs": [],
//   "socialAutogenLangs": [206062],
//   "clipboardAutogenLangs": [],
//
//   "audioFiles": {},
// }
