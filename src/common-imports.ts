import Vue from 'vue'

import * as commonComponents from '@/components/common'
import * as interactionDesignerComponents from '@/components/interaction-designer'
import * as blockEditorsComponents from '@/components/interaction-designer/block-editors'
import * as blockEditorsChoicesComponents from '@/components/interaction-designer/block-editors/choices'
import * as blockTypesComponents from '@/components/interaction-designer/block-types'
import * as flowEditorsComponents from '@/components/interaction-designer/flow-editors'
import * as flowImportComponents from '@/components/interaction-designer/flow-editors/import'
import * as toolbarComponents from '@/components/interaction-designer/toolbar'
import * as blocksComponents from '@/components/interaction-designer/blocks'
import * as blockResourceEditorsComponents from '@/components/interaction-designer/resource-editors'
import * as resourceViewerComponents from '@/components/interaction-designer/resource-viewer'

require('./font-awesome-icon')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function registerCustomComponents(extra = {}): Record<string, any> {
  const Components = {
    ...commonComponents,
    ...interactionDesignerComponents,
    ...blockEditorsComponents,
    ...blockEditorsChoicesComponents,
    ...blockTypesComponents,
    ...flowEditorsComponents,
    ...flowImportComponents,
    ...toolbarComponents,
    ...blocksComponents,
    ...blockResourceEditorsComponents,
    ...resourceViewerComponents,
    ...extra,
  }
  Object.entries(Components)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .forEach(([name, component]: [string, any]) => {
      Vue.component(name, component)
    })
  return Components
}
