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
declare module 'vue-focus'
declare module 'leader-line'
