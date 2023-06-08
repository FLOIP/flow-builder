import {Location} from 'vue-router'
import {IFlowsState} from '@/store/flow'
import {isBlockUsingResource} from '@/store/flow/utils/resourceHelpers'
import {BLOCK_CREATE_REGEX, parseBlockCreateParams} from './block-create'
import {BLOCK_CHANGE_REGEX, parseBlockChangeParams} from './block-change'
import {parseResourceChangeParams, RESOURCE_CHANGE_REGEX} from './resource-change'
import {FLOW_CHANGE_REGEX} from './flow-change'

/* eslint-disable import/prefer-default-export, @typescript-eslint/no-explicit-any */
/**
 * Returns a route name & params for navigation when undoing-redoing user's commands.
 * Returns null values for unsupported commands.
 * Supported commands: create block, change block, change resource.
 * @param changedKeys
 * @param flows
 */
export function getDeepLink({changedKeys, flows}: {changedKeys: string[], flows: IFlowsState}): DeepLink {
  const key = changedKeys.find(key =>
    BLOCK_CREATE_REGEX.test(key)
    || BLOCK_CHANGE_REGEX.test(key)
    || RESOURCE_CHANGE_REGEX.test(key)
    || FLOW_CHANGE_REGEX.test(key))

  if (key === undefined) {
    console.warn('No deep link found for changed keys', JSON.stringify(changedKeys))
    return {
      routeName: null,
      routeParams: null,
    }
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
        field: `block/${blockId}/${fieldPath}`,
      },
    }
  } else if (RESOURCE_CHANGE_REGEX.test(key)) {
    const {flowIndex, resourceIndex, fieldPath} = parseResourceChangeParams(key)!

    const flow = flows.flows[flowIndex]
    const resourceId = flow.resources[resourceIndex].uuid
    const block = flow.blocks.find(block => isBlockUsingResource(block, resourceId))!

    return {
      routeName: 'block-scroll-to-anchor',
      routeParams: {
        blockId: block.uuid,
        field: `resource/${resourceId}/${fieldPath}`,
      },
    }
  } else if (FLOW_CHANGE_REGEX.test(key)) {
    return {
      routeName: 'flow-details',
      routeParams: {},
    }
  } else {
    console.error('This should have never happened. Did you forget to implement a deep link case?')
    return {
      routeName: null,
      routeParams: null,
    }
  }
}

type DeepLink = {
  routeName: Location['name'],
  routeParams: Location['params'],
} | {
  routeName: null,
  routeParams: null,
}
