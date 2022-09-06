declare module '@/store/*'
declare module '@/router/trees.js'
declare module '@flowjs/flow.js'

/*
 * These modules does not have type declarations, but are used
 * in TypeScript context:
 *   - src/components/common/PlainDraggable.vue
 *   - src/components/common/ExpressionInput.vue
 *   - src/components/common/AudioLibrarySearchField.vue
 *   - src/components/interaction-designer/Connection.vue
 */
declare module 'plain-draggable'
declare module '@avcs/autosuggest'
// declare module 'vue-focus'
declare module 'leader-line'

declare interface LangInterface {
    messages: Array<string>,
    locale: string,
  }
  declare interface PublicAppInterface {
    options: Array<unknown>,
  }
  
  declare const __PUBLIC_APP__: PublicAppInterface
  
  interface GlobalApp {
    locale: string,
  }
  
  interface AppUi {
    ui: {
      isoCodes: Array<[key: string]>,
      bcpCodes: Array<[key: string]>,
      language?: Array<unknown>,
    },
  }
  
  declare global {
    var __APP__: GlobalApp
    var app: AppUi
    var route: (routeKey: string, context: Map<string, unknown>) => String | undefined
    var $emit: unknown
    var Lang: LangInterface
  }
  