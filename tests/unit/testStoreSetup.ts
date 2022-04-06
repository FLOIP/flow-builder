import {VueConstructor} from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faCheckCircle,
  faCircle,
  faClone,
  faCommentDots, faDotCircle,
  faEdit,
  faEnvelope,
  faTimesCircle,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons'
import {faCheck, faChevronDown, faChevronUp, faMobileAlt} from '@fortawesome/free-solid-svg-icons'
import CustomIcons from '@/lib/custom-icons'
import * as commonComponents from '@/components/common'
import * as interactionDesignerComponents from '@/components/interaction-designer'
import * as blockEditorsComponents from '@/components/interaction-designer/block-editors'
import * as blockTypesComponents from '@/components/interaction-designer/block-types'
import * as blocksComponents from '@/components/interaction-designer/blocks'
import * as flowEditorsComponents from '@/components/interaction-designer/flow-editors'
import * as flowImportComponents from '@/components/interaction-designer/flow-editors/import'
import * as blockResourceEditorsComponents from '@/components/interaction-designer/resource-editors'
import * as resourceEditorComponents from '@/components/resource-editor'
import * as toolbarComponents from '@/components/interaction-designer/toolbar'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {Module, Store} from 'vuex'
import {IRootState} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import {IBlock, IFlow, ILanguage, SupportedContentType, SupportedMode} from '@floip/flow-runner'
import {cloneDeep, get, isEmpty} from 'lodash'
import {IResourceDefinitionVariantOverModesFilter} from '@/store/flow/resource'
import {IFlowsState} from '@/store/flow'
import {bootstrapLegacyGlobalDependencies} from '../../src/store/trees/bootstrap-legacy-global-dependencies'

export function registerGlobalComponents(localOrGlobalVue: VueConstructor): void {
  library.add(
    faCircle,
    faCheckCircle,
    faEdit,
    faCheck,
    faEnvelope,
    faMobileAlt,
    faCommentDots,
    faClone,
    faTrashAlt,
    faTimesCircle,
    faDotCircle,
    faChevronDown,
    faChevronUp,
    ...CustomIcons,
  )

  const Components: { [key: string]: any } = {
    ...commonComponents,
    ...interactionDesignerComponents,
    ...blockEditorsComponents,
    ...blockTypesComponents,
    ...blocksComponents,
    ...flowEditorsComponents,
    ...flowImportComponents,
    ...blockResourceEditorsComponents,
    ...resourceEditorComponents,
    ...toolbarComponents,
    FontAwesomeIcon,
  }

  Object.entries(Components).forEach((component) => {
    localOrGlobalVue.component(component[0], component[1])
  })
}

export function setupGlobalLang(): void {
  bootstrapLegacyGlobalDependencies()
}

export function setDescription(store: Store<IRootState>, blockId: string): void {
  store.commit('flow/block_setName', {blockId, value: 'A Name'})
  store.commit('flow/block_setLabel', {blockId, value: 'A Label'})
  store.commit('flow/block_setSemanticLabel', {blockId, value: 'A Semantic Label'})
}

export function setTags(store: Store<IRootState>, blockId: string): void {
  // Available tags
  store.commit('flow/block_addTag', {blockId, value: 'tag1'})
  store.commit('flow/block_addTag', {blockId, value: 'tag2'})
  // Selected tags
  store.commit('flow/block_setTags', {
    blockId,
    value: ['tag1'],
  })
}

/**
 * Fake a 1st block to make sure the current block won't be selected
 */
export async function fakeCaseBlockAsFirstBlock(store: Store<IRootState>, flowId: string): Promise<void> {
  safeRegisterBlockModule(store, CASE_BLOCK_TYPE, caseBlockStore)
  const caseBlock = await store.dispatch('flow/flow_addBlankBlockByType', {type: CASE_BLOCK_TYPE})
  const {uuid: caseBlockId} = caseBlock
  store.commit('flow_setFirstBlockId', {blockId: caseBlockId, flowId})
}

/**
 * Safe register block module
 * Because some weird race condition is leading to modules not getting unregistered
 * when clicking between stories before the next story re-registers
 */
export function safeRegisterBlockModule(
  store: Store<IRootState>,
  BLOCK_TYPE: string,
  blockTypeStore: Module<IFlowsState, IRootState>,
): void {
  if (store.hasModule(['flow', BLOCK_TYPE])) {
    store.unregisterModule(['flow', BLOCK_TYPE])
  }
  // todo: this will end up in `flow_addBlankBlockByType` once we get async import builds working
  // console.log(`Registering module flow/${BLOCK_TYPE}`)
  store.registerModule(['flow', BLOCK_TYPE], blockTypeStore)
}

let storyInitState = {}
export async function setupFlowAndBlock(
  store: Store<IRootState>,
  BLOCK_TYPE: string,
  blockTypeStore: Module<IFlowsState, IRootState>,
): Promise<{block: IBlock, flow: IFlow}> {
  if (isEmpty(storyInitState)) {
    // console.log('storyInitState is empty')
    storyInitState = cloneDeep(store.state)
  } else {
    // Make sure we have cleared state in store for each new mounted story, as we're using one flow to put blocks
    // console.log('storyInitState is NOT empty, clearing it')
    Object.assign(store.state, cloneDeep(storyInitState))
  }

  safeRegisterBlockModule(store, BLOCK_TYPE, blockTypeStore)

  const flow = await store.dispatch('flow/flow_addBlankFlow')
  flow.languages = [
    {id: '1', label: 'English'} as ILanguage,
    // mutation
  ]

  const block = await store.dispatch('flow/flow_addBlankBlockByType', {type: BLOCK_TYPE})
  const {uuid: blockId} = block

  store.commit('builder/activateBlock', {blockId})

  return {block, flow}
}

export function setResourceData(
  store: Store<IRootState>,
  {shouldSetChoices, configPath}: { shouldSetChoices: boolean, configPath: string },
): void {
  const activeBlock = store.getters['builder/activeBlock']
  const activeFlow = store.getters['flow/activeFlow']
  const {
    languages: {
      0: {id: languageId},
    },
  }: IFlow = activeFlow
  const resourceId = get(activeBlock, configPath, '')

  // Set values on resource editor
  const variantSms: IResourceDefinitionVariantOverModesFilter = {
    language_id: languageId,
    modes: [SupportedMode.SMS],
    content_type: SupportedContentType.TEXT,
  }
  const variantUssd: IResourceDefinitionVariantOverModesFilter = {
    language_id: languageId,
    modes: [SupportedMode.USSD],
    content_type: SupportedContentType.TEXT,
  }
  const variantIvr: IResourceDefinitionVariantOverModesFilter = {
    language_id: languageId,
    modes: [SupportedMode.IVR],
    content_type: SupportedContentType.AUDIO,
  }
  // we're assuming this pseudo-variants exist
  store.commit('flow/resource_setValue', {resourceId, filter: variantSms, value: 'text for SMS'})
  store.commit('flow/resource_setValue', {resourceId, filter: variantUssd, value: 'text for USSD'})
  store.commit('flow/resource_setValue', {resourceId, filter: variantIvr, value: 'path/to/ivr audio.mp3'})

  if (shouldSetChoices) {
    // TODO: uncomment these if needed, when we found a solution for the above todo. This is not working for now.
    // const choiceResourceId = get(this.activeBlock, `config.choices.1`, '')
    // this.resource_setValue({resourceId: choiceResourceId, filter: variantSms, value: "text for SMS"})
    // this.resource_setValue({resourceId: choiceResourceId, filter: variantUssd, value: "text for USSD"})
    // this.resource_setValue({resourceId: choiceResourceId, filter: variantIvr, value: "path/to/ivr audio.mp3"})
  }
}
