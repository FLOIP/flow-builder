import Vue from 'vue'
import {createDefaultBlockTypeInstallerFor as createDefaultBlockTypeInstallerForFunction} from '@/store/builder'

import registerCustomComponents from '@/common-imports'

// To register components globally by default
import InteractionDesignerComponent from './views/InteractionDesigner.vue'
import FetchFlowComponent from './views/FetchFlow.vue'
import NewFlowComponent from './views/NewFlow.vue'
import ImportFlowComponent from './views/ImportFlow.vue'
import HomeComponent from './views/Home.vue'
import defaultLocalisationsJson from './assets/messages.json'

// Block helpers
import BaseBlockComponent from './components/interaction-designer/block-types/BaseBlock.vue'
import BaseStore from './store/flow/block-types/BaseBlock'

export const appConfig = require('../app.config')
export const builderConfig = require('../builder.config')

export const InteractionDesigner = InteractionDesignerComponent
export const FetchFlow = FetchFlowComponent
export const NewFlow = NewFlowComponent
export const ImportFlow = ImportFlowComponent
export const Home = HomeComponent
export const defaultLocalisations = defaultLocalisationsJson
export const BaseBlock = BaseBlockComponent
export const BaseBlockStore = BaseStore
export const createDefaultBlockTypeInstallerFor = createDefaultBlockTypeInstallerForFunction

// To allow importing of common components as named imports rather than part of default
export * from '@/components/common'
export * from '@/components/interaction-designer'
export * from '@/components/interaction-designer/block-types'
export * from '@/components/interaction-designer/block-editors'
export * from '@/components/interaction-designer/blocks'
export * from '@/components/interaction-designer/flow-editors'
export * from '@/components/interaction-designer/flow-editors/import'
export * from '@/components/interaction-designer/resource-editors'
export * from '@/components/interaction-designer/resource-viewer'
export * from '@/components/interaction-designer/toolbar'
export * from '@/store/flow/block-types'
export * from '@/router/helpers'
export {default as flowBuilderStore} from '@/store'

// We may need those validation helpers to customize the validation in the consumer side
export * from '@/store/validation'
export * from './lib/validations'

const Components = registerCustomComponents({
  InteractionDesigner: InteractionDesignerComponent,
  FetchFlow: FetchFlowComponent,
  NewFlow: NewFlowComponent,
  ImportFlow: ImportFlowComponent,
  Home: HomeComponent,
})

export default Components
