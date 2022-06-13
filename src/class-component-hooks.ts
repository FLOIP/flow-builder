import {Component} from 'vue-property-decorator'

// See also https://github.com/vuejs/vue-class-component/issues/261
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
])
