import {get, isEmpty} from 'lodash'
import {mapState} from 'vuex'

const PATH_PARAM_DISCOVERER = /(\/){(.*?)(\?)?}/g

export function routeFrom(routeKey, context, routes) {
  return interpolateRouteWith(context, get(routes, routeKey))
}

export function interpolateRouteWith(context, route) {
  if (!route) {
    return null
  }

  context = context || {}

  const {path, params} = route
  const isPathComplete = isEmpty(params)

  if (isPathComplete) {
    return path
  }

  return path.replace(PATH_PARAM_DISCOVERER, (m, prefix = '', captured, isOptional) => {
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

// todo: we'll want route() to also be importable/accessible anywhere!
export default {
  computed: {
    ...mapState({
      routes: (s) => s.trees.ui.routes,
    }),
  },

  methods: {
    route(routeKey, context) {
      return routeFrom(routeKey, context, this.routes)
    },
  },
}

const raiseFor = (p) => {
  throw new Error(`InvalidContextError - Missing param: ${p}`)
}
