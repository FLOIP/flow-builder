import Vue from 'vue'

import * as commonComponents from '@/components/common'
import * as interactionDesignerComponents from '@/components/interaction-designer'
import * as blockEditorsComponents from '@/components/interaction-designer/block-editors'
import * as blockTypesComponents from '@/components/interaction-designer/block-types'
import * as flowEditorsComponents from '@/components/interaction-designer/flow-editors'
import * as flowImportComponents from '@/components/interaction-designer/flow-editors/import'
import * as resourceEditorsComponents from '@/components/interaction-designer/resource-editors'
import * as toolbarComponents from '@/components/interaction-designer/toolbar'

export default function registerCustomComponents(extra = {}) {
  Object.entries({
    ...commonComponents,
    ...interactionDesignerComponents,
    ...blockEditorsComponents,
    ...blockTypesComponents,
    ...flowEditorsComponents,
    ...flowImportComponents,
    ...resourceEditorsComponents,
    ...toolbarComponents,
    ...extra,
  }).forEach(([name, Component]) => {
    Vue.component(name, Component)
  })
}
