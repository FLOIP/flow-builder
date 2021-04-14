import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// @ts-ignore
import { routes as treesRoutes } from './trees'

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  // todo: rename trees module + url path to builder + add extensible children as intx-design & resource-viewer
  ...treesRoutes,
]

const scrollBehavior = (to) => {
  if (to.params.field) {
    const anchor = `${to.params.blockId}.${to.params.field}`
    const ele = document.getElementById(anchor)
    if (ele) {
      ele.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior,
  routes,
})

export default router
