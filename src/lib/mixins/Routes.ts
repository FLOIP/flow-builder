import Vue from 'vue'
import {get, isEmpty} from 'lodash'
import Component from 'vue-class-component'
import {State} from 'vuex-class'

const PATH_PARAM_DISCOVERER = /(\/){(.*?)(\?)?}/g
const raiseFor = (p: any) => {
  throw new Error(`InvalidContextError - Missing param: ${p}`)
}

export function interpolateRouteWith(context: any, route?: any) {
  if (!route) {
    return null
  }

  context = context || {}

  const {
    path, params,
  } = route
  const isPathComplete = isEmpty(params)

  if (isPathComplete) {
    return path
  }

  return path.replace(PATH_PARAM_DISCOVERER, (m: any, prefix = '', captured: string, isOptional: boolean) => {
    const param = captured.trim()
    const absent = !(param in context)

    if (absent && !isOptional) {
      raiseFor(param)
    }

    if (absent && isOptional) {
      return ''
    }

    return `${prefix}${context[param]}`
  })
}

export function routeFrom(routeKey: string, context: any, routes: any) {
  return interpolateRouteWith(context, get(routes, routeKey))
}

@Component
export default class Routes extends Vue {
  @State((s) => s.trees.ui.routes) routes: any

  route(routeKey: string, context: any) {
    return routeFrom(routeKey, context, this.routes)
  }
}
