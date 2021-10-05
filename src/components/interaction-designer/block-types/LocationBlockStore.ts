import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit} from '@floip/flow-runner'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IMessageBlock} from '@floip/flow-runner/src/model/block/IMessageBlock'
import {cloneDeep, defaults, defaultsDeep, merge} from 'lodash'
import {IFlowsState} from "@/store/flow"
import {IBlockWithViamoMetadata} from "@/store/trees/adapters/BlockAdapter";

export const BLOCK_TYPE = 'LocationBlock'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

const appUiCommonBlockDefaults = JSON.parse('{"type":"","customData":{"title":"","label":"","tags":[],"reviewed":{}},"uiData":{},"audioFiles":{},"smsContent":{},"ussdContent":{},"socialContent":{},"clipboardContent":{},"smsAutogenLangs":[],"ussdAutogenLangs":[],"socialAutogenLangs":[],"clipboardAutogenLangs":[]}')
const appUiblockDefaults = JSON.parse('{"MultipleChoiceQuestionBlock":{"customData":{"branching":1,"addExitForNoResponse":0,"choices":[]}},"LocationBlock":{"customData":{"choices":[]},"uiData":{"outputNames":["trees.output-true","trees.output-false"]}},"RandomOrderMultipleChoiceQuestionBlock":{"customData":{"branching":1,"addExitForNoResponse":0,"choices":[]}},"MultipleSelectMultipleChoiceQuestionBlock":{"customData":{"branching":0,"addExitForNoResponse":0,"choices":[]}},"CollaborativeFilteringRatingBlock":{"customData":{"branching":1,"addExitForNoResponse":0,"choices":[]}},"LanguageSelectorBlock":{"customData":{"addExitForNoResponse":0}},"DecisionBranchBlock":{"uiData":{"outputNames":["trees.output-true","trees.output-false"]}},"GroupBranchBlock":{"uiData":{"outputNames":["trees.output-true","trees.output-false"]}},"GroupPropertyBlock":{"customData":{"action":"add"}},"SubscriberBranchBlock":{"customData":{"action":"customData"},"uiData":{"outputNames":["trees.output-true","trees.output-false"]}},"GroupSizeBranchBlock":{"uiData":{"outputNames":["trees.output-quota-met","trees.output-not-met"]}},"ContentTypeBranchBlock":{"customData":{"outputTypes":[]}},"CallHistoryBranchBlock":{"uiData":{"outputNames":["blocks.calls_quota_met","blocks.calls_quota_not_met"]}},"BillSubscriberBlock":{"uiData":{"outputNames":["blocks.success","blocks.failure","blocks.error"]}},"IdValidationBlock":{"uiData":{"outputNames":["blocks.valid","blocks.invalid"]}},"ConnectToOperatorBlock":{"uiData":{"outputNames":["trees.output-connected","trees.output-failed","trees.output-error"]}},"AirtimeTransferBlock":{"uiData":{"outputNames":["blocks.success","trees.no-credit","trees.failure"]}},"WebhookBlock":{"customData":{"url":"","title":"","secret":"","method":"GET","questionBlocks":[]}},"WebhookContentBlock":{"customData":{"url":"","title":"","secret":"","method":"GET","questionBlocks":[]},"uiData":{"outputNames":["blocks.success","trees.failure"]}},"CollaborativeFilteringRatioBranchBlock":{"uiData":{"outputNames":["trees.prompt-for-statement","trees.do-not-prompt"]}},"CurrentTimeBranchBlock":{"customData":{"timeType":"time","timeComparison":"between","time1":"","time2":"","timezone":"UTC"},"uiData":{"outputNames":["trees.output-true","trees.output-false"]}},"CallBackWithCallCenterBlock":{"customData":{"shouldNotifyThisCallCenter":true,"title":"Send Request to Call Center","shouldRouteByQueue":false}},"RunTreeBlock":{"customData":{"destinationTreeSetId":"","destinationTreeId":""}},"SubscriberPropertiesSnapshotBlock":{"customData":{"propertiesToSnapshot":[]}},"SummaryBlock":{"uiData":{"outputNames":["trees.confirm","trees.reject"]}},"EntitySelectionBlock":{"uiData":{"outputNames":["trees.success","trees.failure"]}},"ValidateCodeBlock":{"customData":{"shouldRedeemCode":true,"program":"","inputBlock":""},"uiData":{"outputNames":["trees.valid","trees.not-found","trees.already-used"]}},"WeatherForecastBlock":{"uiData":{"outputNames":["trees.success","trees.no-location","trees.invalid-location"]}},"GenerateCodeBlock":{"customData":{"codeType":1,"maxLength":10,"minLength":6,"codeLength":8},"uiData":{"outputNames":["trees.valid","trees.invalid"]}},"CreateSubscriberBlock":{"uiData":{"outputNames":["trees.success","trees.failure"]}},"TransferSubscriberBlock":{"uiData":{"outputNames":["1","trees.exit-default"]}},"PlayGroupMessageBlock":{"uiData":{"outputNames":["trees.success","trees.not-found"]}},"ExpressionBranchBlock":{"customData":{"outputs":[{"label":"1","test":""},{"label":"trees.exit-default","default":true}],"numOutputs":"2"},"uiData":{"outputNames":["1","trees.exit-default"]}}}')

export const actions: ActionTree<IFlowsState, IRootState> = {

  async createWith({rootGetters, commit, dispatch}, {props}: {props: {uuid: string} & Partial<IMessageBlock>}) {
    /**
     * @see src/views/InteractionDesigner.legacy.js::addNewBlock()
     * @see src/store/trees/10-trees-model.js::addBlock()
     */
    const blankMessageResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    const block: IBlockWithViamoMetadata = defaults(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semanticLabel: '',
      exits: [],
      config: {
        prompt: blankMessageResource.uuid,
        messageAudio: '' // TODO: remove this once flow-runner doesn't require it anymore
      },

      // todo: sync this with flow-runner@v1.0 upgrade
      // eslint-disable-next-line @typescript-eslint/camelcase
      vendor_metadata: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        io_viamo: defaultsDeep(
          cloneDeep(appUiblockDefaults[BLOCK_TYPE]),
          cloneDeep(appUiCommonBlockDefaults))
      }
    })

    const {outputNames} = block.vendor_metadata.io_viamo.uiData
    block.exits = await Promise.all(outputNames
      .map(async (name) => dispatch('flow/block_createBlockExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          tag: name,
          label: name,
        }) as IBlockExit,
      }, {root: true}))) as unknown as IBlockExit[]

    return block
  },
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
