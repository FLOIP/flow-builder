import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router';
import Home from '../views/Home.vue'
import { routes as treesRoutes } from '@/router/trees.js'

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  // todo: rename trees module + url path to builder + add extensible children as intx-design & resource-viewer
  ...treesRoutes,
]

export const scrollBehavior = (to: Route) => {
  if (to.params.field) {
    const anchor = `block/${to.params.blockId}${to.params.field}`
    const domElement = document.getElementById(anchor)
    if (domElement) {
      domElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      console.debug('Deep linking: cannot scroll to ', anchor, ' as the DOM element is not found')
    }
  }
}

export const scrollBlockIntoView = (blockId: string) => {
  const blockElement = document.querySelector(`#block\\/${blockId} .plain-draggable`)
  if (blockElement) {
    blockElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  } else {
    console.debug('Deep linking: cannot scroll block ', blockElement, 'as block is not found in the DOM')
  }
}

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior,
  routes,
})

export default router
