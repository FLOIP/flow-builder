import Vue from 'vue'
import InteractionDesignerComponent from './views/InteractionDesigner.vue'
import FetchFlowComponent from './views/FetchFlow.vue'
import NewFlowComponent from './views/NewFlow.vue'
import HomeComponent from './views/Home.vue'

export const appConfig = require('../app.config')
export const builderConfig = require('../builder.config')

export const InteractionDesigner = InteractionDesignerComponent
export const FetchFlow = FetchFlowComponent
export const NewFlow = NewFlowComponent
export const Home = HomeComponent

const Components = {
  InteractionDesignerComponent,
  FetchFlowComponent,
  NewFlowComponent,
  HomeComponent,
}

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name])
})

export default Components
