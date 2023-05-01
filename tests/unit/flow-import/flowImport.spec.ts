import {createContainerFlowStack} from '@/store/flow/utils/importHelpers'
import {IContext} from '@floip/flow-runner'

describe('create_flow_stack', () => {
  test('should create a flow stack with correct order', () => {
    const jsonData = `
      {
        "flows": [
          {
            "uuid": "flow1",
            "blocks": [
              {
                "type": "Core.RunFlow",
                "config": {
                  "flow_id": "flow2"
                }
              },
              {
                "type": "Core.RunFlow",
                "config": {
                  "flow_id": "flow4"
                }
              }
            ]
          },
          {
            "uuid": "flow2",
            "blocks": [
              {
                "type": "Core.RunFlow",
                "config": {
                  "flow_id": "flow3"
                }
              }
            ]
          },
          {
            "uuid": "flow3",
            "blocks": []
          },
          {
            "uuid": "flow4",
            "blocks": []
          },
          {
            "uuid": "flow5",
            "blocks": []
          }
        ]
      }
    `
    const jsonDataParsed = JSON.parse(jsonData)

    const contextObject = {
    name: 'TODO',
    description: 'TODO',
    vendor_metadata: {},
    flows: jsonDataParsed.flows,
  } as unknown as IContext
    const flowStack = createContainerFlowStack(contextObject)
    expect(flowStack).toEqual(['flow3', 'flow2', 'flow4', 'flow1', 'flow5'])
  })

  test('should create a flow stack with correct order_when_there_are_sibling_flows', () => {
    const jsonData = `
      {
        "flows": [
          {
            "uuid": "flow3",
            "blocks": []
          },
          {
            "uuid": "flow4",
            "blocks": []
          },
          {
            "uuid": "flow5",
            "blocks": []
          }
        ]
      }
    `
    const jsonDataParsed = JSON.parse(jsonData)

    const contextObject = {
    name: 'TODO',
    description: 'TODO',
    vendor_metadata: {},
    flows: jsonDataParsed.flows,
  } as unknown as IContext
    const flowStack = createContainerFlowStack(contextObject)
    expect(flowStack).toEqual(['flow3', 'flow4', 'flow5'])
  })
})
