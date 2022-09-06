// import {Options, Vue} from 'vue-class-component'
// import selectManyResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue'
// import selectManyStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'

// import {SupportedMode} from '@floip/flow-runner'
// import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
// import {BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode, IBaseOptions} from './story-utils/storeSetup'

// export default {
//   component: selectManyResponseBlock,
//   title: 'MobilePrimitives/selectManyResponseBlock',
// }

// const SelectManyTemplate = `
//     <flow-builder-sidebar-editor-container :block="activeBlock">
//       <select-many-response-block
//           :block="activeBlock"
//           :flow="activeFlow"/>
//     </flow-builder-sidebar-editor-container>
//   `

// const BaseOptions: IBaseOptions = {
//   components: {
//     FlowBuilderSidebarEditorContainer,
//     selectManyResponseBlock,
//   },
//   template: SelectManyTemplate,
// }

// @Options({
//   ...BaseOptions,
// })
// class InFlowBuilderClass extends BaseMountedVueClass {
//   async mounted() {
//     await this.baseMounted(BLOCK_TYPE, selectManyStore)
//   }
// }

// export const InFlowBuilder = () => InFlowBuilderClass

// @Options({
//   ...BaseOptions,

// })
// class IvrOnlyClass extends BaseMountedVueClass {
//   async mounted() {
//     const {flow} = await this.baseMounted(BLOCK_TYPE, selectManyStore)
//     flow.supported_modes = [SupportedMode.IVR]
//   }
// }

// export const IvrOnly = () => IvrOnlyClass

// @Options({
//   ...BaseOptions,
// })
// class MoreLanguagesClass extends BaseMountedVueClass {
//   async mounted() {
//     const {flow} = await this.baseMounted(BLOCK_TYPE, selectManyStore)
//     // mutation
//     flow.languages = [{id: '1', label: 'English'}, {id: '2', label: 'French'}]
//   }
// }

// export const MoreLanguages = () => MoreLanguagesClass

// @Options({
//   ...BaseOptions,

// })
// class ExistingDataClass extends BaseMountedVueClassWithResourceAndMode {
//   async mounted() {
//     const {block: {uuid: blockId}} = await this.baseMounted(BLOCK_TYPE, selectManyStore)
//     this.setDescription(blockId)
//     this.setResourceData({
//       shouldSetChoices: true,
//       configPath: 'config.prompt',
//     })
//     this.setTags(blockId)
//   }
// }

// export const ExistingData = () => ExistingDataClass
