// todo: children of /trees base url
export const routes = [{
  path: '/trees/create', /* no-op */
},
  // {
  // path: '/trees/:id/resource-viewer',
  // component: () => import(/* webpackChunkName:"/js/trees" */ '@/views/ResourceViewer')
// },
{
  path: '/trees/:id/interaction-designer/:mode',
  props: true,
  component: () => import(/* webpackChunkName:"/js/trees" */ '@/views/InteractionDesigner.vue')
}, {
  path: '/trees/:id',
  redirect: '/trees/:id/interaction-designer/view'
}, {
  path: '/trees/:id/edit',
  redirect: '/trees/:id/interaction-designer/edit'
}, {
  path: '/trees/:id/view',
  redirect: '/trees/:id/interaction-designer/view'
}, {
  path: '/trees/:id/interaction-designer',
  redirect: '/trees/:id/interaction-designer/view'
}, {
  path: '/trees/:id',
  alias: '/trees/:id/interaction-designer/edit',
  component: () => import(/* webpackChunkName:"/js/trees" */ '@/views/InteractionDesigner.vue')
}]

export default routes
