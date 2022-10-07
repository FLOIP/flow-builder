import {IBlock, IChoice, IResource} from '@floip/flow-runner'

export function findBlockRelatedResourcesUuids({block}: {block: IBlock}): IResource['uuid'][] {
  const resources: IResource['uuid'][] = []
  // Get uuid from block config prompt
  if (block.config?.prompt !== undefined) {
    resources.push((block.config.prompt as IBlock['uuid']))
  }

  // Get uuid from block config choices
  block.config?.choices?.forEach((choice: IChoice) => {
    resources.push(choice.prompt)
  })

  return resources
}
