import {Location} from 'vue-router'
import {IFlowsState} from '@/store/flow'
import {BLOCK_CREATE_REGEX, parseBlockCreateParams} from './block-create'
import {BLOCK_CHANGE_REGEX, parseBlockChangeParams} from './block-change'
import {parseResourceChangeParams, RESOURCE_CHANGE_REGEX} from './resource-change'

/* eslint-disable import/prefer-default-export, @typescript-eslint/no-explicit-any */
export function getDeepLink(changedKeys: string[], flows: IFlowsState): DeepLink | null {
  const key = changedKeys.find(key => BLOCK_CREATE_REGEX.test(key) || BLOCK_CHANGE_REGEX.test(key) || RESOURCE_CHANGE_REGEX.test(key))

  if (key === undefined) {
    console.info('No deep link found for changed keys', JSON.stringify(changedKeys))
    return null
  } else if (BLOCK_CREATE_REGEX.test(key)) {
    const {flowIndex, blockIndex} = parseBlockCreateParams(key)!
    const blockId = flows.flows[flowIndex].blocks[blockIndex].uuid
    return {
      routeName: 'block-selected-details',
      routeParams: {
        blockId,
      },
    }
  } else if (BLOCK_CHANGE_REGEX.test(key)) {
    const {flowIndex, blockIndex, fieldPath} = parseBlockChangeParams(key)!
    const blockId = flows.flows[flowIndex].blocks[blockIndex].uuid
    return {
      routeName: 'block-scroll-to-anchor',
      routeParams: {
        blockId,
        field: fieldPath,
      },
    }
  } else if (RESOURCE_CHANGE_REGEX.test(key)) {
    const {flowIndex, resourceIndex, fieldPath} = parseResourceChangeParams(key)!
    const flow = flows.flows[flowIndex]
    const resource = flow.resources[resourceIndex]
    const block = flow.blocks.find(block => isBlockUsingResource(block, resource.uuid))!

    return {
      routeName: 'block-scroll-to-anchor',
      routeParams: {
        blockId: block.uuid,
        resourceId: resource.uuid,
        field: fieldPath,
      },
    }
  } else {
    console.error('This should have never happened. Did you forget to implement a deep link case?')
    return null
  }
}

type DeepLink = {
  routeName: Location['name'],
  routeParams: Location['params'],
}
