import Vue from 'vue'
import InteractionDesignerComponent from './views/InteractionDesigner.vue'

export const InteractionDesigner = InteractionDesignerComponent

const Components = {
  InteractionDesignerComponent,
}

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name])
})

export default Components
