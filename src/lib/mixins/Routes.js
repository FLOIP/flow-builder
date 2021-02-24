import {get, isEmpty} from 'lodash'
import {mapState} from 'vuex'

const PATH_PARAM_DISCOVERER = /(\/){(.*?)(\?)?}/g

// todo: we'll want route() to also be importable/accessible anywhere!
export default {
  computed: {
    ...mapState({
      routes: s => s.trees.ui.routes,
    }),
  },

  methods: {
    route(routeKey, context) {
      return routeFrom(routeKey, context, this.routes)
    }
  }
}

export function routeFrom(routeKey, context, routes) {
  return interpolateRouteWith(context, get(routes, routeKey))
}

const raiseFor = p => {throw new Error(`InvalidContextError - Missing param: ${p}`)}

export function interpolateRouteWith(context, route) {
  if (!route) {
    return null
  }

  context = context || {}

  const {id, path, params, methods} = route
  const isPathComplete = isEmpty(params)

  if (isPathComplete) {
    return path
  }

  return path.replace(PATH_PARAM_DISCOVERER, (m, prefix='', captured, isOptional) => {
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