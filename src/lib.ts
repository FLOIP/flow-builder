import Vue from 'vue'
import InteractionDesignerComponent from './views/InteractionDesigner.vue'
import FetchFlowComponent from './views/FetchFlow.vue'
import NewFlowComponent from './views/NewFlow.vue'
import HomeComponent from './views/Home.vue'
import { forEach } from 'lodash'
import { BLOCK_CLASS_CONFIG as PRINT_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/ConsoleIO_PrintBlockStore'
import { BLOCK_CLASS_CONFIG as READ_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/ConsoleIO_ReadBlockStore'
import { BLOCK_CLASS_CONFIG as CASE_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/Core_CaseBlockStore'
import { BLOCK_CLASS_CONFIG as LOG_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/Core_LogBlockStore'
import { BLOCK_CLASS_CONFIG as OUTPUT_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/Core_OutputBlockStore'
import { BLOCK_CLASS_CONFIG as RUN_FLOW_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/Core_RunFlowBlockStore'
import { BLOCK_CLASS_CONFIG as SET_CONTACT_PROP_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/Core_SetContactPropertyStore'
import { BLOCK_CLASS_CONFIG as SET_GROUP_MEMBERSHIP_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/Core_SetGroupMembershipStore'
import { BLOCK_CLASS_CONFIG as MESSAGE_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/MobilePrimitives_MessageBlockStore'
import { BLOCK_CLASS_CONFIG as NUMERIC_RESPONSE_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/MobilePrimitives_NumericResponseBlockStore'
import { BLOCK_CLASS_CONFIG as OPEN_RESPONSE_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/MobilePrimitives_OpenResponseBlockStore'
import { BLOCK_CLASS_CONFIG as SELECT_ONE_RESPONSE_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'
import { BLOCK_CLASS_CONFIG as SELECT_MANY_RESPONSE_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'
import { BLOCK_CLASS_CONFIG as LOCATION_RESPONSE_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/SmartDevices_LocationResponseBlockStore'
import { BLOCK_CLASS_CONFIG as PHOTO_RESPONSE_BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/SmartDevices_PhotoResponseBlockStore'


export const appConfig = require('../app.config')
export const builderConfig = require('../builder.config')
export const defaultBlockTypes = {
  [`${PRINT_BLOCK_CLASS_CONFIG.type}`]: PRINT_BLOCK_CLASS_CONFIG,
  [`${READ_BLOCK_CLASS_CONFIG.type}`]: READ_BLOCK_CLASS_CONFIG,
  [`${CASE_BLOCK_CLASS_CONFIG.type}`]: CASE_BLOCK_CLASS_CONFIG,
  [`${LOG_BLOCK_CLASS_CONFIG.type}`]: LOG_BLOCK_CLASS_CONFIG,
  [`${OUTPUT_BLOCK_CLASS_CONFIG.type}`]: OUTPUT_BLOCK_CLASS_CONFIG,
  [`${RUN_FLOW_BLOCK_CLASS_CONFIG.type}`]: RUN_FLOW_BLOCK_CLASS_CONFIG,
  [`${SET_CONTACT_PROP_BLOCK_CLASS_CONFIG.type}`]: SET_CONTACT_PROP_BLOCK_CLASS_CONFIG,
  [`${SET_GROUP_MEMBERSHIP_BLOCK_CLASS_CONFIG.type}`]: SET_GROUP_MEMBERSHIP_BLOCK_CLASS_CONFIG,
  [`${MESSAGE_BLOCK_CLASS_CONFIG.type}`]: MESSAGE_BLOCK_CLASS_CONFIG,
  [`${NUMERIC_RESPONSE_BLOCK_CLASS_CONFIG.type}`]: NUMERIC_RESPONSE_BLOCK_CLASS_CONFIG,
  [`${OPEN_RESPONSE_BLOCK_CLASS_CONFIG.type}`]: OPEN_RESPONSE_BLOCK_CLASS_CONFIG,
  [`${SELECT_ONE_RESPONSE_BLOCK_CLASS_CONFIG.type}`]: SELECT_ONE_RESPONSE_BLOCK_CLASS_CONFIG,
  [`${SELECT_MANY_RESPONSE_BLOCK_CLASS_CONFIG.type}`]: SELECT_MANY_RESPONSE_BLOCK_CLASS_CONFIG,
  [`${LOCATION_RESPONSE_BLOCK_CLASS_CONFIG.type}`]: LOCATION_RESPONSE_BLOCK_CLASS_CONFIG,
  [`${PHOTO_RESPONSE_BLOCK_CLASS_CONFIG.type}`]: PHOTO_RESPONSE_BLOCK_CLASS_CONFIG
}

export const InteractionDesigner = InteractionDesignerComponent
export const FetchFlow = FetchFlowComponent
export const NewFlow = NewFlowComponent
export const Home = HomeComponent

const Components: {[key: string]: any} = {
  InteractionDesignerComponent,
  FetchFlowComponent,
  NewFlowComponent,
  HomeComponent,
}

// expose block-type components to consumer repositories
// eg: import {ConsoleIORead} from '@floip/flow-builder'
forEach(builderConfig.ui.blockClasses, async ({type}, key) => {
  const typeWithoutSeparators = type.replace('.', '')
  Components[typeWithoutSeparators] = await import(`../src/${key}.vue`)
})


Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name])
})

export default Components
