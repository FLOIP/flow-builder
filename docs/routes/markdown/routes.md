# Flow Builder Routes
This document describes the specification for any implementation of the server required for integration of the flow builder with a backend.

## Version: 1.0.0

### /flows/{id}

#### GET
##### Summary:

Finds Flow in Container by ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID of flow to return. | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Returns the flow in a container on success. See https://floip.gitbook.io/flow-specification/flows#containers for full spec. The 'flows' attribute of the returned container will contain the flow itself and any nested flows. 'resources' will contain any nested resources |
| 404 | Flow not found |

#### POST
##### Summary:

Create or update a Flow and associated Resources. UUIDs are generated client side and for simplicity we allow creation and updates at a single endpoint. This follows the model where the builder frontend can work as a standalone app without a backend when necessary and not contain logic related to whether a Flow is persisted or not.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | Creates or updates a flow and it's associated resources by ID | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Echos back the sent flow in a container on success. See https://floip.gitbook.io/flow-specification/flows#containers for full spec. The 'flows' attribute of the returned container will contain the flow itself and any nested flows. 'resources' will contain any nested resources |
| 500 | Error in flow creation including validation errors (the builder should prevent these client side before we get to that point though) |

### /blocks/{id}

#### POST
##### Description:

WIP

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID of the block. | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | WIP |

### /flows/import

#### POST
##### Description:

WIP

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | WIP |

### Models


#### FlowContainer

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| specification_version | string |  | No |
| uuid | string |  | No |
| name | string |  | No |
| description | string |  | No |
| platform_metadata | object |  | No |
| flows | [ object ] |  | No |
| resources | object |  | No |