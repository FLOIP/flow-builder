The flow-builder has been designed for drop in use as an embedded app in other projects. With this in mind we expose several methods for customisation to integrate with your existing systems.

# General set up

The flow-builder can be installed as a package from npm:

```
yarn add @floip/flow-builder

or

npm install --save @floip/flow-builder
```

Unlike the standalone app, the built version of the flow-builder in `/dist` is intended to integrate with an existing Vue Router setup. See the example [here]('#full-example-routes-index-js-src-lib-ts-for-exports') 

## Backend Routes

[Full Spec Here](routes/markdown/routes.md)

Auth is up to the implementer for now

## Customising the Builder


## Customising Core Blocks



## Overriding Core Blocks

## Removing Blocks

## Creating Fully Custom Vendor Blocks

- Using helpers - BaseBlock and BaseStore
- Minimal block example
- Block store API and structure
- Custom validations
  - overwrite the validate method in the store
  - example version, you can make this fit your app:

  ```
  export function validateCustomBlock({block, schemaVersion}: {block: IBlock, schemaVersion: string}): IValidationStatus {
    let validate = null
    if (isEmpty(validators) || !validators.has(block.type)) {
      const blockTypeWithoutNameSpace = block.type.split('.')[block.type.split('.').length - 1]
      let blockJsonSchema
      try {
        blockJsonSchema = require(`path/to/custom/block/schema.json`)
        validate = createDefaultJsonSchemaValidatorFactoryFor(blockJsonSchema)
      } catch (e) {
        console.info(`A Specific Validator for the ${blockTypeWithoutNameSpace}Block could not be found. Falling back the generic Block validator for ${schemaVersion}`)
        //This gets the generic IBlock schema
        blockJsonSchema = require(`@floip/flow-runner/dist/resources/validationSchema/${schemaVersion}/flowSpecJsonSchema.json`)
        validate = createDefaultJsonSchemaValidatorFactoryFor(blockJsonSchema, '#/definitions/IBlock')
      }
      validators.set(block.type, validate)
    } else {
      validate = validators.get(block.type)!
    }

    return {
      isValid: validate(block),
      ajvErrors: validate.errors,
      type: block.type,
    }
  }
  ```

- Documented elsewhere - converting Viamo Tree Blocks to Flow Blocks.

## Overriding Components

- Specific guidance on routing for views?
- Can get store api and initial template from looking at existing?

## Customising Components 

## Creating New Views

- some guidance on the store structure and API goes here?

## Custom styling

- semantic class names on each component div/top level component

## Full example routes/index.js. See `src/lib.ts` for exports

```
import Vue from 'vue'

//Importing top level views, default config
import {
  Home,
  FetchFlow,
  ImportFlow,
  appConfig, //default app config - e.g. permissions
  builderConfig, //default builder config - e.g. blocks, features
  defaultLocalisations // default localisations
} from '@floip/flow-builder'

import {without} from 'lodash'

//Top level view overrides
import CustomNewFlow from '../views/CustomNewFlow.vue'
import CustomInteractionDesigner from '../views/CustomInteractionDesigner.vue'

//Custom blocks
import Core_SetContactPropertyTwoBlock, {install as installSetContactPropertyTwoBlock} from '../components/block-types/Core_SetContactPropertyTwoBlock.vue'
import Viamo_GroupBranchBlock, {installGroupBranchBlock} from '../components/block-types/Viamo_GroupBranchBlock.vue'

//Component override examples
//Override the default text editor registered globally in flow-builder lib.ts
//At this point, we expect that this will only be done globally except for some block sidebars.
//In that case though, you can rewrite the component however you like and use the block specific registration system
//...in resources/assets/js/floip/builder/routes/index.js
import TextEditor from '../components/common/TextEditor.vue'

Vue.component('TextEditor', TextEditor)

//Pull relevant config from your frontend global context
const {__APP__: {locale}} = global

const platformBuilderConfig = builderConfig
const appConfigOverrides = appConfig

//Use the current locale from you frontend context
appConfigOverrides.locale = locale
//Remove features based on permissions, your backend should also enforce permissions
appConfigOverrides.permissions['send-call-to-records'] = false

//Overwrite default localisations
//For example if the default text for this note only makes sense in the context of the standalone app
defaultLocalisations['en.flow-builder']['import-note'] = ''
defaultLocalisations['fr.flow-builder']['import-note'] = ''
appConfigOverrides.i18n = defaultLocalisations

//Pull relevant config from an app specific frontend context
if (typeof __BUILDER_CONTEXT__ !== 'undefined' && __BUILDER_CONTEXT__) {
  platformBuilderConfig.ui.routes = __BUILDER_CONTEXT__.ui.routes
  platformBuilderConfig.ui.languages = __BUILDER_CONTEXT__.ui.languages
}

// Configure enabled features - turn things on that are off in the default builder config
platformBuilderConfig.ui.enabledFeatures.push(
    'viewResults',
    'treeDuplicate',
    'treeSend',
)
//Turn some other things off
platformBuilderConfig.ui.enabledFeatures = without(platformBuilderConfig.ui.enabledFeatures, 'addLanguageOnImport')

//Override existing block type ...TODO
platformBuilderConfig.ui.blockClasses['Core.SetContactPropertyTwo'] = {
  name: 'Core.SetContactPropertyTwo',
  type: 'Core.SetContactPropertyTwo',
  is_interactive: false,
  is_branching: false,
  category: 0,
  menu_category: 2,
  uiComponent: Core_SetContactPropertyTwoBlock,
  install: installSetContactPropertyTwoBlock
}
//Add custom block type
platformBuilderConfig.ui.blockClasses['Viamo.GroupBranch'] = {
  name: 'Viamo.GroupBranch',
  type: 'Viamo.GroupBranch',
  is_interactive: false,
  is_branching: false,
  category: 0,
  menu_category: 3,
  uiComponent: Viamo_GroupBranchBlock,
  install: installGroupBranchBlock
}
//Remove default block type
...TODO

//Export routing config for use in an existing router:
//import FlowBuilderRoutes from 'floip/builder/routes' //importing these routes here
//routes = [
//  {
//    path: '/home',
//    component: require('../dashboard/components/DashboardContent.vue').default,
//  },
//  ...FlowBuildeRoutes
//]
//export const router = new VueRouter({
//  routes
//})

export default [
  {
    path: '/flows/:id/:mode',
    name: 'flow-canvas',
    props: route => ({id: route.params.id, mode: route.params.mode, appConfig: appConfigOverrides, builderConfig: platformBuilderConfig}),
    component: CustomInteractionDesigner,
    children: [
      {
        path: 'details',
        name: 'flow-details',
        meta: {isFlowEditorShown: true},
      },
      {
        path: 'block/:blockId',
        name: 'block-selected',
        props: route => ({blockId: route.params.blockId}),
        children: [
          {
            path: 'details',
            name: 'block-selected-details',
            meta: {isBlockEditorShown: true},
          },
          {
            path: ':field',
            name: 'block-scroll-to-anchor',
            meta: {isBlockEditorShown: true},
          },
        ],
      },
    ],
  },
  {
    path: '/flows',
    props: {appConfig: appConfigOverrides, builderConfig: platformBuilderConfig},
    component: Home, //TODO - temp component - will likely be replaced with voto5 page
  },
  {
    path: '/host-app/flows',
    beforeEnter() { window.location.href = '/trees' }
  },
  {
    path: '/flows/new',
    props: {appConfig: appConfigOverrides, builderConfig: platformBuilderConfig},
    component: CustomNewFlow,
  },
  {
    path: '/flows/import',
    props: {appConfig: appConfigOverrides, builderConfig: platformBuilderConfig},
    component: ImportFlow,
  },
  {
    path: '/flows/:uuid',
    props: route => ({uuid: route.params.uuid, appConfig: appConfigOverrides, builderConfig: platformBuilderConfig}),
    component: FetchFlow,
  },
]

```

## Documentation of app.config.json options

TODO

## Documentation of builder.config.json options
