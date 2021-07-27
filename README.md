[![Build Status](https://travis-ci.com/FLOIP/flow-builder.svg?branch=master)](https://travis-ci.com/FLOIP/flow-builder)

# flow-builder

flow-builder provides an open source frontend for authoring [flow interoperability project specification](https://floip.gitbook.io/flow-specification/) compliant flows. It enables the importing, editing and exporting of flow json, as well as authoring from scratch. Such flows can then be run using a compatible flow runner such as [FLOIP/flow-runner](https://github.com/FLOIP/flow-runner).

## What are flows

Flows are a modern paradign for describing the logic of digital information systems that interact with individuals,
often for the purpose of (a) collecting data or (b) providing information through interactive requests. Some common examples of this are in mobile services using voice-based or SMS-based conversations over basic mobile phones. Flows follow the "flowchart" paradigm, consisting of actions (nodes) and connections between actions, which can incorporate decision-making logic.

## Project setup - Testing and Developing
### Serving
```
git clone git@github.com:FLOIP/flow-builder.git

cd flow-builder

yarn install

yarn serve
```

And visit [localhost:8080/trees/create](http://localhost:8080/trees/create) to create a new flow or [localhost:8080/trees/1/edit](http://localhost:8080/trees/1/edit) to edit an example flow.

Note, `yarn serve` will also hot reload for development.

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### webpack-dev-server stub routes

For UI standalone usage, we implemented stub routes under `/vue.config.js`, eg: `/audiofiles/upload`
Therefore, if we want to integrate the `flow-builder` repo into **other project**:
- we should remove those stub routes
- we should create equivalent routes (and their associated controllers) inside the project which will use the flow-builder

### Changes on JS dependencies
#### /src/lib/mixins/FlowUploader.js
This is related to `Flow.js` library which is providing multiple simultaneous, stable and resumable uploads via the HTML5 File API.
- On standalone UI, we import the Flow like `import Flow from '@flowjs/flow.js';` and use it inside the file like `new Flow(...)`
- But when we integrate the flow-builder into other project, we may need to call a global Flow like `new global.Flow(...)`.

## Usage

### Create new flow

To begin, you can create a new flow by visiting [localhost:8080/trees/create](http://localhost:8080/trees/create). From there, you can start with a blank flow (a flow without blocks) and get editing:

![image](https://user-images.githubusercontent.com/88047281/127185140-b9583be3-e141-46b6-bf3d-68efa1b9e9f7.png)

### Import existing flow

Or you can use the Import/Export panel and text field to copy in an existing flow:

![Imported flow](./docs/images/screenshot-imported-flow.png)

Edits using the builder will then be reflected in the flow JSON in this panel and vice versa.

### Export flow

To export, simply copy the json in this panel to a file. 

## Storybook

1. You only need to serve it with `yarn storybook:serve`
2. Then follow the provided url, by default it should be `http://localhost:6006/` (but in case the port `6006` is non-available, it may use different one)

## An explanation of app.config.json vs builder.config.json

`app.config.json` is intended to support the configuration needed when integrating this flow building ui into a larger platform or application while `builder.config.json` is intended to configure those features which are core to the flow builder - the blocks enabled, languages or content types supported etc.

More detail to follow.

## Integrating With/Embedding In a Host App - Configuration Guide:

[See here](https://github.com/FLOIP/flow-builder/blob/master/docs/BUILDER_INTEGRATION.md)

## Future extensions and improvements

- Documentation on integration of this UI into another app including configuration of routes used for server side persistence
- Validations and human readable validation error messages for the full flow spec - compulsory fields, string formats etc.
- Documentation on extending this library - adding support for new block types or extending existing block types
- More fully featured resource editing including audio upload
- A way to add to the supportable languages
- Guidance for integration into a permissions system for flow editing/viewing
- Add regression testing pipeline for storyshots
