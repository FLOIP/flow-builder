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
    path: '/flows/:uuid',
    props: (route) => ({ uuid: route.params.uuid }),
    component: () => import(/* webpackChunkName:"chunk-builder" */ '@/views/FetchFlow.vue'),
  },
  {
    path: '/trees/create', /* no-op */
  },
  {
    path: '/trees/:id/interaction-designer/:mode',
    props: (route) => ({ id: route.params.id, mode: route.params.mode }),
    component: () => import(/* webpackChunkName:"chunk-builder" */ '@/views/InteractionDesigner.vue'),
  }, {
    path: '/trees/:id',
    redirect: '/trees/:id/interaction-designer/view',
  }, {
    path: '/trees/:id/edit',
    redirect: '/trees/:id/interaction-designer/edit',
  }, {
    path: '/trees/:id/view',
    redirect: '/trees/:id/interaction-designer/view',
  }, {
    path: '/trees/:id/interaction-designer',
    redirect: '/trees/:id/interaction-designer/view',
  }, {
    path: '/trees/:id',
    alias: '/trees/:id/interaction-designer/edit',
    component: () => import(/* webpackChunkName:"chunk-builder" */ '@/views/InteractionDesigner.vue'),
  },
];

export default routes;
