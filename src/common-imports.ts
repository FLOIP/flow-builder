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
import * as resourceEditorComponents from '@/components/resource-editor'
require('./font-awesome-icon')

// interface Props {
//   app: unknown,
//   extra : Record<string, any>
// }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function registerCustomComponents(app, extra = {}) {
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
    ...resourceEditorComponents,
    ...extra,
  }
  Object.entries(Components)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .forEach(([name, component]: [string, any]) => {
      app?.component(name, component)
    })
  return Components
}
