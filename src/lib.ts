import Vue from 'vue'
import {createDefaultBlockTypeInstallerFor as createDefaultBlockTypeInstallerForFunction} from '@/store/builder'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheck, faMobileAlt, faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons'
import {
  faCheckCircle,
  faCircle,
  faClone,
  faTrashAlt,
  faTimesCircle,
  faDotCircle,
  faEdit,
  faEnvelope,
  faCommentDots,
} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
//To register components globally by default
import * as commonComponents from '@/components/common'
import * as interactionDesignerComponents from '@/components/interaction-designer/'
import * as blockEditorsComponents from '@/components/interaction-designer/block-editors'
import * as blockTypesComponents from '@/components/interaction-designer/block-types'
import * as blockComponents from '@/components/interaction-designer/block'
import * as flowEditorsComponents from '@/components/interaction-designer/flow-editors'
import * as flowImportComponents from '@/components/interaction-designer/flow-editors/import'
import * as resourceEditorsComponents from '@/components/interaction-designer/resource-editors'
import * as toolbarComponents from '@/components/interaction-designer/toolbar'
import InteractionDesignerComponent from './views/InteractionDesigner.vue'
import FetchFlowComponent from './views/FetchFlow.vue'
import NewFlowComponent from './views/NewFlow.vue'
import ImportFlowComponent from './views/ImportFlow.vue'
import HomeComponent from './views/Home.vue'
import defaultLocalisationsJson from './assets/messages.json'

//Block helpers
import BaseBlockComponent from './components/interaction-designer/block-types/BaseBlock.vue'
import BaseStore from './store/flow/block-types/BaseBlock'

/**
 * Enable needed icons
 * Vue way for Fontawesome
 * more details: https://www.npmjs.com/package/@fortawesome/vue-fontawesome#the-icon-property
 *
 */
import CustomIcons from './lib/custom-icons/index'

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
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

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

//To allow importing of common components as named imports rather than part of default
export * from '@/components/common'
export * from '@/components/interaction-designer'
export * from '@/components/interaction-designer/block-types'
export * from '@/components/interaction-designer/block-editors'
export * from '@/components/interaction-designer/block'
export * from '@/components/interaction-designer/flow-editors'
export * from '@/components/interaction-designer/flow-editors/import'
export * from '@/components/interaction-designer/resource-editors'
export * from '@/components/interaction-designer/toolbar'
export * from '@/store/flow/block-types'

const Components: { [key: string]: any } = {
  InteractionDesigner: InteractionDesignerComponent,
  FetchFlow: FetchFlowComponent,
  NewFlow: NewFlowComponent,
  ImportFlow: ImportFlowComponent,
  Home: HomeComponent,
  ...commonComponents,
  ...interactionDesignerComponents,
  ...blockEditorsComponents,
  ...blockTypesComponents,
  ...blockComponents,
  ...flowEditorsComponents,
  ...flowImportComponents,
  ...resourceEditorsComponents,
  ...toolbarComponents,
}

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name])
})

export default Components
