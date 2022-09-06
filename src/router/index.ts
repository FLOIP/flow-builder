import {createWebHistory, createRouter, RouterOptions} from 'vue-router'
import {routes as treesRoutes} from '@/router/trees.js'
import {scrollBehavior} from '@/router/helpers'

export const routes: Array<unknown> = [
  // todo: rename trees module + url path to builder + add extensible children as intx-design & resource-viewer
  ...treesRoutes,
]
export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior,
} as RouterOptions)

export default router
