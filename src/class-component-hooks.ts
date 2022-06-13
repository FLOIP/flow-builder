import Component from 'vue-class-component'

// See also https://github.com/vuejs/vue-class-component/issues/261
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
])
