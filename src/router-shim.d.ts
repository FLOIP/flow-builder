declare module 'vue/types/vue' {
  import { Router } from 'vue-router';

  interface VueConstructor {
    $router: Router
  }

  interface Vue {
    $router: Router
  }
}
