import {IBlock, IContext, IResource} from '@floip/flow-runner'

import {cloneDeep, filter, findIndex, get, isEqual} from 'lodash'

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
  const existingFlowContainerStore = cloneDeep(existingFlowContainer);

  const newFlows = get(newFlowContainer, 'flows', []);

  newFlows.forEach((newFlow) => {
    const newFlowUUID = get(newFlow, 'uuid');
    const existingFlowIndex = findIndex(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      existingFlowContainerStore.flows,
      (flow) => flow.uuid === newFlowUUID,
    );

    if (existingFlowIndex < 0) {
      existingFlowContainerStore.flows.push(newFlow);
    } else {
      existingFlowContainerStore.flows[existingFlowIndex] = newFlow;
    }
  });

  return existingFlowContainerStore
}

interface CreateFlowStackBlock {
  uuid: string;
  type: string;
  config: {
    flow_id: string;
  };
}

interface CreateFlowStackFlow {
  uuid: string;
  blocks: CreateFlowStackBlock[];
}

interface CreateFlowStackData {
  flows: CreateFlowStackFlow[];
}

export function createContainerFlowStack(json_data: any, flow_stack: string[]): void {
  const flows = json_data.flows;
  const visitedFlows: string[] = [];

  function process_flow(flow: CreateFlowStackFlow): void {
    visitedFlows.push(flow.uuid);
    // eslint-disable-next-line no-restricted-syntax
    for (const block of flow.blocks) {
      if (block.type === 'Core.RunFlow') {
        const flow_id: string = block.config.flow_id;
        const child_flow: CreateFlowStackFlow | undefined = flows.find((f: { uuid: string }) => f.uuid === flow_id);
        if (child_flow && !visitedFlows.includes(child_flow.uuid)) {
          process_flow(child_flow);
        }
      }
    }
    if (!flow_stack.includes(flow.uuid)) {
      flow_stack.push(flow.uuid);
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const flow of flows) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!visitedFlows.includes(flow.uuid)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      process_flow(flow);
    }
  }
}

export function getLastItemFromContainerFlowStack(flow_stack: string[]): string {
  return flow_stack[flow_stack.length - 1];
}
export function createContainerFlowStackAndReturnLastItem(json_data: string): string {
    const flow_stack: string[] = [];
    if (!json_data) { return ''; }
    createContainerFlowStack(json_data, flow_stack);
    return getLastItemFromContainerFlowStack(flow_stack);
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
