[![Build Status](https://travis-ci.com/FLOIP/flow-builder.svg?branch=master)](https://travis-ci.com/FLOIP/flow-builder)

# flow-builder
flow-builder provides an open source frontend for authoring [flow interoperability project specification](https://floip.gitbook.io/flow-specification/) compliant flows. It enables the importing, editing and exporting of flow json, as well as authoring from scratch. Such flows can then be run using a compatible flow runner such as [FLOIP/flow-runner](https://github.com/FLOIP/flow-runner).

## What are flows
Flows are a modern paradigm for describing the logic of digital information systems that interact with individuals,
often for the purpose of (a) collecting data or (b) providing information through interactive requests. Some common examples of this are in mobile services using voice-based or SMS-based conversations over basic mobile phones. Flows follow the "flowchart" paradigm, consisting of actions (nodes) and connections between actions, which can incorporate decision-making logic.

## Project setup
For quick serving, just follow this:
```
git clone git@github.com:FLOIP/flow-builder.git
cd flow-builder
yarn install
yarn serve
```

And visit [localhost:8080/trees/create](http://localhost:8080/trees/create) to create a new flow or [localhost:8080/trees/1/edit](http://localhost:8080/trees/1/edit) to edit an example flow.

Note, `yarn serve` will also hot reload for development.

## Development
### Frequently used yarn commands
| Command                        | Description                                                     |
|--------------------------------|-----------------------------------------------------------------|
| yarn install                   | Install dependencies                                            |
| yarn serve                     | Serve the app, and provide hot reload for development           |
| yarn build-bundle              | Compiles and minifies for production & for other consumer apps  |
| yarn update-flow-runner        | Interactive update for flow-runner                              |
| yarn deep-update-flow-packages | Making sure the flow project dependencies are updated correctly |
| yarn lint                      | Lints and fixes files                                           |

Check the `packages.json`'s `scripts` to see more available commands.

### Routes
| Route definition place          | Description                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------|
| builder.config.json             | a list of **all needed routes**, used by the `src\lib\mixins\Routes.ts` helper                                       |
| src\lib\mixins\Routes.ts        | A route helper for all vue component to allow us calling something like <br/>`this.route('routeKey.something', ...)` |
| vue.config.js                   | Mocked endpoints to simulate backend response (webpack-dev-server stub routes), eg: `/audiofiles/upload`             |
| src\router\*                    | Vue router, to map routes & views                                                                                    |
| docs\routes\openapi\routes.yaml | OpenAPI endpoints definition to explain complex endpoints                                                            |
| docs\routes\markdown\routes.md  | Generated doc from the `routes.yaml` after calling `yarn md-docs`                                                    |

For UI **standalone** usage, the stub routes under `/vue.config.js` are providing needed responses.

Therefore, if we want to integrate the `flow-builder` repo into **other projects** (consumer apps):
- we should create equivalent routes (and their associated controllers) inside the project which will use the flow-builder

To integrate with/embed it in a Host App (consumer apps), find here a configuration Guide:
[See here](https://github.com/FLOIP/flow-builder/blob/master/docs/BUILDER_INTEGRATION.md)

### Changes on JS dependencies: /src/lib/mixins/FlowUploader.js
This is related to `Flow.js` library which is providing multiple simultaneous, stable and resumable uploads via the HTML5 File API.
- On standalone UI, we import the Flow like `import Flow from '@flowjs/flow.js';` and use it inside the file like `new Flow(...)`
- But when we integrate the flow-builder into other project, we may need to call a global Flow like `new global.Flow(...)`.

### Storybook
1. You only need to serve it with `yarn storybook:serve`
2. Then follow the provided url, by default it should be `http://localhost:6006/` (but in case the port `6006` is non-available, it may use different one)

### An explanation of app.config.json vs builder.config.json
`app.config.json` is intended to support the configuration needed when integrating this flow building ui into a larger platform or application while `builder.config.json` is intended to configure those features which are core to the flow builder - the blocks enabled, languages or content types supported etc.

(More details to follow.)

## Usage (simple demos)
### Create new flow
To begin, you can create a new flow by visiting [https://floip.github.io/flow-builder/#/](https://floip.github.io/flow-builder/#/). Click on **New Flow** , from there, you can enter the pertinent flow information before opening the Flow Builder.

You may also go directly to the following link: [https://https://floip.github.io/flow-builder/#/flows/new](https://floip.github.io/flow-builder/#/flows/new)
![Flow 1](https://user-images.githubusercontent.com/88047281/127682517-9d2141f9-8d04-45f2-8121-1d80a71fe089.gif)

### Adding Blocks and Content
Once you have the canvas open you can add blocks to create your flow
![Flow 2](https://user-images.githubusercontent.com/88047281/127685985-2946f931-f2a5-456b-81aa-7eb45b1d93ab.gif)

### Adding and Removing Connections
Adding and removing connections can be done easily
![Flow 4](https://user-images.githubusercontent.com/88047281/127687599-7e0681c7-e36c-4b9e-b462-8c62cff693af.gif)

### Navigating the Block Toolbar
Each block has a toolbar at the top that appears when hovering over the block. You may select the block, delete the block, duplicate the block, or access the sidebar editor from this toolbar.
![Flow 3](https://user-images.githubusercontent.com/88047281/127687008-484170c2-7687-4110-ab86-1bf913e16ac4.gif)

### Multiple Block Actions
If you select multiple blocks, you are able to duplicate or delete them on the Multiple Select Toolbar
![Flow 5](https://user-images.githubusercontent.com/88047281/127688307-19808290-3881-43bb-bd26-60a55551d29b.gif)

### Import existing flow
Visit [https://floip.github.io/flow-builder/#/](https://floip.github.io/flow-builder/#/) and click on the **Import/Paste a JSON File** Link in order to import an exiting flow via JSON schema or by pasting the JSON file directly

You may also go directly to the following link: [https://floip.github.io/flow-builder/#/flows/import](https://floip.github.io/flow-builder/#/flows/import)

Importing JSON file
![Flow 6](https://user-images.githubusercontent.com/88047281/127689738-3a4184f3-fc46-4f3d-bf4a-405adaed6397.gif)

Pasting JSON file directly
![Flow 7](https://user-images.githubusercontent.com/88047281/127689934-7907d6c3-ecde-46b9-9d85-b60369868fdc.gif)

Edits using the builder will then be reflected in the flow JSON in this panel and vice versa.

### Export flow
To export, simply copy the json in this panel to a file.
![Flow 8](https://user-images.githubusercontent.com/88047281/127690332-5593e45f-b545-449b-89b7-b8a961be005b.gif)

## Future extensions and improvements
- Documentation on integration of this UI into another app including configuration of routes used for server side persistence
- Validations and human readable validation error messages for the import feature
- Documentation on extending this library - adding support for new block types or extending existing block types
- Add details about how to use the resource mode
- A way to add to the supportable languages
- Guidance for integration into a permissions system for flow editing/viewing
- Add regression testing pipeline for storyshots
