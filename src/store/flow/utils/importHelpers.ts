import {IBlock, IContext, IFlow, IResource} from '@floip/flow-runner'

import {cloneDeep, filter, findIndex, get, isEmpty, isEqual} from 'lodash'
import {BLOCK_TYPE as RUN_FLOW_BLOCK_TYPE} from '@/store/flow/block-types/Core_RunFlowBlockStore'

export function updateResourcesForLanguageMatch(
  resources: IResource[], oldId: string, newId: string,
): IResource[] {
  return resources.map((resource) => {
    const newResource = cloneDeep(resource)
    newResource.values = resource.values.map((value) => {
      const newValue = cloneDeep(value)
      if (value.language_id === oldId) {
        newValue.language_id = newId
      }
      return newValue
    })
    return newResource
  })
}

// We shouldn't need any special logic over collisions
// We just overwrite any existing flows/resources with a given uuid
// This is because they are uuids
// We warn this will happen in the importer
// For now we don't care about flow container uuid collisions
// ...as we aren't quite sure on the role of flow container yet
export function mergeFlowContainer(
  existingFlowContainer: IContext, newFlowContainer: IContext,
): IContext {
  const clonedExistingFlowContainer = cloneDeep(existingFlowContainer)

  const newFlows = newFlowContainer.flows

  newFlows.forEach((newFlow) => {
    const existingFlowIndex = findIndex(
      clonedExistingFlowContainer.flows,
      (flow) => flow.uuid === newFlow.uuid,
    )

    if (existingFlowIndex < 0) {
      clonedExistingFlowContainer.flows.push(newFlow)
    } else {
      clonedExistingFlowContainer.flows[existingFlowIndex] = newFlow
    }
  })

  return clonedExistingFlowContainer
}

export function createContainerFlowStack(jsonData: IContext): IFlow['uuid'][] {
  const flows: IFlow[] = jsonData.flows
  const visitedFlows: IFlow['uuid'][] = []
  const flowStack: IFlow['uuid'][] = []

  /*
  * The recursive function processFlowForCreatingFlowStack takes a flow object as an argument and starts iterating over its blocks. If a block has a type of "Core.RunFlow,"
  * it means that this block is calling another flow,
  * so the function recursively calls itself with the child flow as an argument.
  * This ensures that all the nested flows are processed before moving back to the parent flow.
  *
  * Once all the nested flows are processed, the parent flow is added to the flowStack array.
  * */
  function processFlowForCreatingFlowStack(flow: IFlow): void {
    visitedFlows.push(flow.uuid)
    flow.blocks.forEach((block) => {
      if (block.type === RUN_FLOW_BLOCK_TYPE) {
        const flowId: string = block.config.flow_id
        const childFlow: IFlow | undefined = flows.find((f: { uuid: string }) => f.uuid === flowId)
        if (childFlow && !visitedFlows.includes(childFlow.uuid)) {
          processFlowForCreatingFlowStack(childFlow)
        }
      }
    })
    if (!flowStack.includes(flow.uuid)) {
      flowStack.push(flow.uuid)
    }
  }

  flows.forEach((flow) => {
    if (!visitedFlows.includes(flow.uuid)) {
      processFlowForCreatingFlowStack(flow)
    }
  })
  return flowStack
}
export function createContainerFlowStackAndReturnLastItem(jsonData: IContext): IFlow['uuid'] {
  if (isEmpty(jsonData)) {
      return ''
  }
  const flowStack = createContainerFlowStack(jsonData)
  const lastItem = flowStack.pop()
  return lastItem ?? ''
}

export function checkSingleFlowOnly(flowContainer: IContext): boolean {
  return get(flowContainer, 'flows', []).length === 1
}

export function detectedLanguageChanges(
  {flowContainer, oldFlowContainer}:
    { flowContainer: IContext, oldFlowContainer: IContext | null },
): boolean {
  return !isEqual(get(flowContainer, 'flows[0].languages'), get(oldFlowContainer, 'flows[0].languages'))
}

export function detectedPropertyChanges(
  {newPropertyBlocks, oldPropertyBlocks}: { newPropertyBlocks: IBlock[], oldPropertyBlocks: IBlock[] },
): boolean {
  return !isEqual(newPropertyBlocks, oldPropertyBlocks)
}

export function detectedGroupChanges(
  {newGroupBlocks, oldGroupBlocks}: { newGroupBlocks: IBlock[], oldGroupBlocks: IBlock[] },
): boolean {
  return !isEqual(newGroupBlocks, oldGroupBlocks)
}

export function getPropertyBlocks(flowContainer: IContext): IBlock[] {
  return filter(get(flowContainer, 'flows[0].blocks'), (block) => block.type === 'Core.SetContactProperty')
}

export function getGroupBlocks(flowContainer: IContext): IBlock[] {
  return filter(get(flowContainer, 'flows[0].blocks'), (block) => block.type === 'Core.SetGroupMembership')
}
