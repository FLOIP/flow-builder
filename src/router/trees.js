// todo: children of /trees base url
export const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName:"chunk-builder" */ '@/views/Home.vue'),
  },
  {
    path: '/flows/new',
    component: () => import(/* webpackChunkName:"chunk-builder" */ '@/views/NewFlow.vue'),
  },
  {
    path: '/flows/import',
    component: () => import(/* webpackChunkName:"chunk-builder" */ '@/views/ImportFlow.vue'),
  },
  {
    path: '/flows/:uuid',
    props: (route) => ({ uuid: route.params.uuid }),
    component: () => import(/* webpackChunkName:"chunk-builder" */ '@/views/FetchFlow.vue'),
  },
  {
    path: '/trees/:id/interaction-designer/:mode',
    alias: '/flows/:id/interaction-designer/:mode',
    name: 'flow-canvas',
    props: (route) => ({ id: route.params.id, mode: route.params.mode }),
    component: () => import(/* webpackChunkName:"chunk-builder" */ '@/views/InteractionDesigner.vue'),
    children: [
      {
        path: 'details',
        name: 'flow-details',
        meta: { isSidebarShown: true },
      },
      {
        path: 'block/:blockId',
        name: 'block-selected',
        props: (route) => ({ blockId: route.params.blockId }),
        children: [
          {
            path: 'details',
            name: 'block-selected-details',
            meta: { isBlockEditorShown: true },
          },
          {
            path: ':field',
            name: 'block-scroll-to-anchor',
            meta: { isBlockEditorShown: true },
          },
        ],
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
]

export default routes
