import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import {routes as treesRoutes} from '@/router/trees.js'
import {scrollBehavior} from '@/router/helpers'

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  // todo: rename trees module + url path to builder + add extensible children as intx-design & resource-viewer
  ...treesRoutes,
]

export const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior,
  routes,
})

export default router
