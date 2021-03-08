import Vue from 'vue'
import {forEach} from 'lodash'
import InteractionDesignerComponent from "./views/InteractionDesigner.vue"

export const appConfig = require('../app.config')
export const builderConfig = require('../builder.config')

export const InteractionDesigner = InteractionDesignerComponent

const Components = {
  InteractionDesignerComponent
};

// expose block-type components to consumer repositories
// eg: import {ConsoleIORead} from '@floip/flow-builder'
forEach(builderConfig.ui.blockClasses, async ({type}, key) => {
  const typeWithoutSeparators = type.replace(/\\/g, '')
  Components[typeWithoutSeparators] = await import(`../src/${key}.vue`)
})

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
});

export default Components
