import Vue from 'vue'
import InteractionDesignerComponent from './views/InteractionDesigner.vue'
import FetchFlowComponent from './views/FetchFlow.vue'
import NewFlowComponent from './views/NewFlow.vue'
import ImportFlowComponent from './views/ImportFlow.vue'
import HomeComponent from './views/Home.vue'
import defaultLocalisationsJson from "./assets/messages.json";
import CustomIconComponents from './lib/custom-icons/index'

//Block helpers
import BaseBlockComponent from './components/interaction-designer/block-types/BaseBlock.vue'
import BaseStore from './store/flow/block-types/BaseBlock'
import {createDefaultBlockTypeInstallerFor as createDefaultBlockTypeInstallerForFunction} from '@/store/builder'

export const appConfig = require('../app.config')
export const builderConfig = require('../builder.config')

export const InteractionDesigner = InteractionDesignerComponent
export const FetchFlow = FetchFlowComponent
export const NewFlow = NewFlowComponent
export const ImportFlow = ImportFlowComponent
export const Home = HomeComponent
export const defaultLocalisations = defaultLocalisationsJson
export const CustomIcons = CustomIconComponents

export const BaseBlock = BaseBlockComponent
export const BaseBlockStore = BaseStore
export const createDefaultBlockTypeInstallerFor = createDefaultBlockTypeInstallerForFunction

const Components: { [key: string]: any } = {
  InteractionDesignerComponent,
  FetchFlowComponent,
  NewFlowComponent,
  ImportFlowComponent,
  HomeComponent,
}

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name])
})

export default Components
