import {render, RenderResult} from '@testing-library/vue'
import {createLocalVue} from '@vue/test-utils'
import Vuex, {Store} from 'vuex'
import {IRootState, store} from '@/store'
import messageBlockStore, {BLOCK_TYPE as MESSAGE_BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_MessageBlockStore'
import MobilePrimitives_MessageBlock from '@/components/interaction-designer/block-types/MobilePrimitives_MessageBlock.vue'
import {setupFlowAndBlock, registerGlobalComponents, setDescription, setResourceData, setTags, setupGlobalLang} from './testStoreSetup'

async function setupMessageBlock(store: Store<IRootState>): Promise<void> {
  const {block: {uuid: blockId}} = await setupFlowAndBlock(store, MESSAGE_BLOCK_TYPE, messageBlockStore)

  setDescription(store, blockId)
  setResourceData(store, {
    shouldSetChoices: false,
    configPath: 'config.prompt',
  })
  setTags(store, blockId)
}

async function renderDefaultMessageBlock(): Promise<RenderResult> {
  const localVue = createLocalVue()

  registerGlobalComponents(localVue)
  localVue.use(Vuex)
  setupGlobalLang()

  const localStore = new Vuex.Store<IRootState>(store)
  await setupMessageBlock(localStore)

  return render(MobilePrimitives_MessageBlock, {
    propsData: {
      block: localStore.getters['builder/activeBlock'],
      flow: localStore.getters['flow/activeFlow'],
    },
    store: localStore,
    localVue,
  })
}

test('The MessageBlock has the root div', async () => {
  const {container, debug} = await renderDefaultMessageBlock()
  debug()
  const blockRootDiv = container.querySelector('.mobile-primitive-message-block')
  expect(blockRootDiv).not.toBeNull()
})

test('The MessageBlock has a resource editor', async () => {
  const {container} = await renderDefaultMessageBlock()
  const resourceEditor = container.querySelector('.resource-editor')
  expect(resourceEditor).not.toBeNull()
})

test('The MessageBlock has the default branching config', async () => {
  const {container} = await renderDefaultMessageBlock()
  const defaultBranchingConfig = container.querySelector('.block-output-branching-config')
  expect(defaultBranchingConfig).not.toBeNull()
})

test('The MessageBlock doesn\'t have a contact property editor', async () => {
  const {container} = await renderDefaultMessageBlock()
  const contactPropertyEditor = container.querySelector('.generic-contact-property-editor')
  expect(contactPropertyEditor).toBeNull()
})

test('The MessageBlock has a block categorization', async () => {
  const {container} = await renderDefaultMessageBlock()
  const blockCategorization = container.querySelector('.block-categorization')
  expect(blockCategorization).not.toBeNull()
})

test('The MessageBlock has a block id', async () => {
  const {container} = await renderDefaultMessageBlock()
  const blockId = container.querySelector('.block-id')
  expect(blockId).not.toBeNull()
})
