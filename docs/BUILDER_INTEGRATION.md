The flow-builder has been designed for drop in use as an embedded app in other projects. With this in mind we expose several methods for customisation to integrate with your existing systems.

# General set up as an embedded app

## Install

The flow-builder can be installed as a package from npm:

```
yarn add @floip/flow-builder

or

npm install --save @floip/flow-builder
```

## Route Config

Unlike the standalone app, the built version of the flow-builder in `/dist` is intended to integrate with an existing Vue Router setup instead of using the exact routing config in https://github.com/FLOIP/flow-builder/blob/master/src/router/trees.js.

First we need some config to let the components know what routes are available. For example we could have:

```
const routes = {
    "flows": {
        "persistFlow": {
            "name": "persistFlow",
            "path": "/backend/flows",
            "methods": [
                "POST",
                "PUT"
            ]
        },
        "fetchFlowServer": {
            "name": "fetchFlowServer",
            "path": "/backend/flows/{flowId}",
            "params": [
                "flowId"
            ],
            "methods": [
                "GET"
            ]
        },
        "newFlow": {
            "name": "newFlow",
            "path": "/flows/new",
            "methods": [
                "GET"
            ]
        },
        "importFlow": {
            "name": "importFlow",
            "path": "/flows/import",
            "methods": [
                "GET"
            ]
        },
        "fetchFlow": {
            "name": "fetchFlow",
            "path": "/flows/{flowId}",
            "params": [
                "flowId"
            ],
            "methods": [
                "GET"
            ]
        },
        "home": {
            "name": "home",
            "path": "/host-app/flows",
            "methods": [
                "GET"
            ]
        },
        "cancelImport": {
            "name": "home",
            "path": "/flows",
            "methods": [
                "GET"
            ]
        },
        "editFlow": {
            "name": "editFlow",
            "path": "/flows/{flowId}/{mode?}",
            "params": [
                "flowId",
                "component",
                "mode"
            ],
            "methods": [
                "GET",
                "HEAD"
            ]
        }
    },
    "trees": {
        "resumeableAudioUpload": {
            "name": "resumeableAudioUpload",
            "path": "/audiofiles/upload",
            "params": [],
            "methods": [
                "POST",
                "HEAD"
            ]
        }
    }
}

```

And override the builder.config.json defaults from the community builder like so:

```
//Importing default config
import {
  builderConfig as platformBuilderConfig,
} from '@floip/flow-builder'

platformBuilderConfig.ui.routes = routes

```
Then we can configure Vue Router for this. Note passing in of `platformBuilderConfig` to make components aware of the configured routes:

```

const flowBuilderRoutes [
  {
    path: '/flows/:id/:mode',
    name: 'flow-canvas',
    props: route => ({id: route.params.id, mode: route.params.mode, appConfig: appConfigOverrides, builderConfig: platformBuilderConfig}), //passing in platformBuilderConfig
    component: CustomInteractionDesigner, //Custom version of InteractionDesigner view
    children: [ //Paths for deep linking in the interaction designer - link to validation error, edit flow modal etc.
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
    props: {appConfig: appConfigOverrides, builderConfig: platformBuilderConfig}, //passing in platformBuilderConfig
    component: Home,
  },
  {
    path: '/host-app/flows',
    beforeEnter() { window.location.href = '/trees' } //A path to navigate back to the host app
  },
  {
    path: '/flows/new',
    props: {appConfig: appConfigOverrides, builderConfig: platformBuilderConfig}, //passing in platformBuilderConfig
    component: CustomNewFlow, //Another custom override - this time of the flow-builder NewFlow route
  },
  {
    path: '/flows/import',
    props: {appConfig: appConfigOverrides, builderConfig: platformBuilderConfig}, //passing in platformBuilderConfig
    component: ImportFlow,
  },
  {
    path: '/flows/:uuid',
    props: route => ({uuid: route.params.uuid, appConfig: appConfigOverrides, builderConfig: platformBuilderConfig}), //passing in platformBuilderConfig
    component: FetchFlow,
  },
]

routes = [
  {
    path: '/home', //An existing route in the app where you are embedding
    component: require('../dashboard/components/DashboardContent.vue').default,
  },
  ...flowBuildeRoutes
]
export const router = new VueRouter({
  routes
})
```

See the example [here](#full-example-routesindexjs-see-srclibts-for-exports---the-full-file-described-above-in-the-snippets). This also shows other `builder.config.json` and `app.config.json` being overridden.

## Backend Routes

When using the builder in an app with server side persistence, the following routes must be defined and the routes above prefixed by `/backend` must be updated to use them.

[Full Spec Here](routes/markdown/routes.md)

Auth is up to the implementer for now

# Customising the Builder

## Customising and overriding community version blocks

The process for customising and overriding community blocks is roughly the same. All blocks are exported from `src/lib.ts` and provide several options for customisation. The core of adding new blocks, removing blocks and customising existing blocks is in overriding `app.builder.config`:

```
//Importing default config
import {
  builderConfig as platformBuilderConfig,
} from '@floip/flow-builder'

//Override existing block type
platformBuilderConfig.ui.blockClasses['Core.SetContactProperty'] = {
  name: 'Core.SetContactProperty',
  type: 'Core.SetContactProperty',
  is_interactive: false,
  is_branching: false,
  category: 0,
  menu_category: 2,
  uiComponent: Core_SetContactPropertyTwoBlock, //Using a different component for this community block. You may notice that this is not present in builder.config.json. If the function which registers blocks doesn't detect this then it will fall back to the registration process used by default blocks. See `src/views/InteractionDesigner.vue` - `registerBlockTypes()`
  install: installSetContactPropertyTwoBlock //Using a different installer. You may notice that this is not present in builder.config.json. If the function which registers blocks doesn't detect this then it will fall back to the registration process used by default blocks. See `src/views/InteractionDesigner.vue` - `registerBlockTypes()`
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
delete platformBuilderConfig.ui.blockClasses['Core.Log']
```

See the general setup guidance above for how this is passed into Views.

You then have several options:
- Start from scratch and create a new block editor - requires a component, store, BLOCK_TYPE and installer. See `src/components/interaction-designer/block-types` for examples.
- Wrap an existing block and use its slots to override default UI. Slots available:
    - `branching` - defaults to the `BlockOutputBranchingConfig` component. Can be switched off entirely with the `usesDefaultBranchingEditor` boolean prop
    - `contact-props` - defaults to the `GenericContactPropertyEditor` component. Can be switched off entirely with the `usesDefaultContactPropsEditor` boolean prop
    - `extras` - add content and UI specific to your custom block
    - `vendor-extras`
    - `resource-editors` - add resource editors for block type specific resources. A more specific version of extras.
    - All other UI is common between community blocks. If you wish to override then see the [Overriding and customising non block components](#overriding-and-customising-non-block-components) section below
    - `vendor` - for anything which edits the `vendor_metadata` of the block.
- Extend/use inheritance with an existing block and create a fully custom template (or wrap the BaseBlock component)
- Create your own block wrapping `src/components/interaction-designer/block-types/BaseBlock.vue` and extending `src/store/flow/block-types/BaseBlock.ts` - this gives you the standard flow spec UI and content common to all blocks. All community blocks use these if you need examples.
    - Wrapping BaseBlock
        - Label editor
        - Semantic label editor
        - Branching config - overridable via a `branching` slot
        - Contact property config - overridable via a `contact-props` slot
        - A button to set the block as the first in a flow
        - It will display your block auto generated ID
        - It will provide a slot for `extras`
        - It will provide a slot for `resource-editors`
        - It will NOT provide the `vendor` slot as that's only expected to be used when extending flow-spec blocks

    - Extending base store
        - Provides a generic `createWith` action - pass props to this which your block defaults to on creation
        - Provides a generic `handleBranchingTypeChangedToUnified` action - defines what should happen if you set your block to have a unified exit (if your block supports this)
        - Provides a generic validation action - `validateVendorBlock`, and specify the validation repo in `validationLib` param when calling `validateCommunityBlock()`. The basic method validates your block is a minimal spec compliant IBlock according to your schema version. See `@floip/flow-runner/dist/resources/validationSchema/${schemaVersion}/flowSpecJsonSchema.json`.

  ```
  async validateVendorBlock({rootGetters}, {block, schemaVersion}: {block: IBlock, schemaVersion: string}): Promise<IValidationStatus> {
      // Assuming we have a library named in node_module '@MyCompany/flow-runner' (a fork of `@floip/flow-runner` or a very different lib)
      return validateCommunityBlock({block, schemaVersion, validationLib: '@MyCompany/flow-runner'})
  },
  ```
  We can have a very flexible option by redefining `validateVendorBlock()` completely. This can be overriden with validations specific to your custom block. See here for an example:

  ```
  async validateVendorBlock({block, schemaVersion}: {block: IBlock, schemaVersion: string}): IValidationStatus {
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
  Your block will need a component, store, BLOCK_TYPE and store installer.

  The installer can be generated with a an exported helper:

  ```
  import {
  createDefaultBlockTypeInstallerFor
  } from '@floip/flow-builder'
  export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SomeBlockStore)
  ```

  By using an existing BLOCK_TYPE already used by a flow-spec block, you can override the default store for that flow spec block (e.g. to change how to validate your extended customised version)

## Overriding and customising non block components

At the top level - views - this is simple enough to do by extending or wrapping those components but we want to make such customisation as atomic as possible to allow keeping in sync with this community version of the builder and to allow changing the smallest amount possible.

- By exporting all components in `src/lib.ts` and registering them globally (rather than only where needed) we provide a simple hook for overiding any component. This means for example, that if you would like all of your `src/components/common/TextEditor.vue` components to work differently from the existing component you can simply override this when you set up the app with:

```
//importing your new text editor.
import TextEditor from '../components/common/TextEditor.vue'

//registering it globally again will replace the currently used component which we have registerd in `src/lib.ts`
Vue.component('TextEditor', TextEditor)
```

This allows us to override UI at any level of nesting required and should continue to work as long as you obey the contract of the existing component in terms of props it takes, things it writes to the store that other components need etc. You can import and wrap or extend the existing component as needed. All components can be imported like so:

```
import {
  TextEditor,
} from '@floip/flow-builder'
```

## Overriding default views.

- If your project requires custom versions of what's in the `src/views/` directory, we encourage you to override the components you need to change in the manner described [here](#overriding-and-customising-non-block-components) rather than extending the existing views as syncing changes in the templates between flow-builder versions is onerous.
    - For example, to customise the toolbar you can override the global toolbar component with a component that wraps this and uses it's slots to add custom buttons.
- We hope to standardise slots in these views so that they can instead be wrapped by a custom version and select parts overriden in future.
- If you do want to override the whole component you can use this custom version by simply switching to it in your Vue Router config as discussed [here](#general-set-up-as-an-embedded-app):

```

const flowBuilderRoutes [
  {
    path: '/flows/:id/:mode',
    name: 'flow-canvas',
    props: route => ({id: route.params.id, mode: route.params.mode, appConfig: appConfigOverrides, builderConfig: platformBuilderConfig}), //passing in platformBuilderConfig
    component: CustomInteractionDesigner, //Custom version of InteractionDesigner view
    ...
```

## Custom styling

- Default styles for the flow-builder are available in @floip/flow-builder/dist/flow-builder.css and can be included on the page serving the flow-builder.
- All components have a top level element with a css class corresponding to the component name kebab-cases. For example FetchFlow is fetch-flow, InteractionDesigner interaction-designer etc. This can be used as a hook for custom styling.

# Full example routes/index.js. See `src/lib.ts` for exports - The full file described above in the snippets

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
platformBuilderConfig.ui.supportedModes = ['SMS']
platformBuilderConfig.ui.defaultModes = ['SMS']

//Override existing block type
platformBuilderConfig.ui.blockClasses['Core.SetContactProperty'] = {
  name: 'Core.SetContactProperty',
  type: 'Core.SetContactProperty',
  is_interactive: false,
  is_branching: false,
  category: 0,
  menu_category: 2,
  uiComponent: Core_SetContactPropertyTwoBlock, //using a different component for this community block
  install: installSetContactPropertyTwoBlock //using a different installer
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
delete platformBuilderConfig.ui.blockClasses['Core.Log']

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
    component: CustomInteractionDesigner, //Custom version of InteractionDesigner view
    children: [ //Paths for deep linking in the interaction designer - link to validation error, edit flow modal etc.
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
    component: Home,
  },
  {
    path: '/host-app/flows',
    beforeEnter() { window.location.href = '/trees' } //A path to navigate back to the host app
  },
  {
    path: '/flows/new',
    props: {appConfig: appConfigOverrides, builderConfig: platformBuilderConfig},
    component: CustomNewFlow, //Another custom override - this time of the flow-builder NewFlow route
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
## Useful store hooks available when embedding and customising the builder:

### Editing block vendor_metadata

```
  export default {
    props: {
      block: {
        type: Object,
        required: true
      },
    },
    methods: {
      ...mapMutations('flow', [
        'block_updateVendorMetadataByPath',
      ]),
    },
    computed: {
      shortenedTitle: {
        get() {
          ...
        },
        set(value) {
          const {uuid: blockId} = this.block
          this.block_updateVendorMetadataByPath({blockId, path: 'customData.summaryConfiguration.shortenedTitle', value})
        }
      }
    }
```

### Determining if the flow is currently editable

```
<template>
  <div class="block-summary-config">
    <h4>Summary</h4>

    <div class="form-group">
      <fieldset :disabled="!isEditable">
        <label :class="{'text-muted' : !isEditable}">
          ...
         </label>
      </fieldset>
    </div>
  </div>
</template>

<script>

  export default {
    ...
    computed: {
      ...mapGetters('builder', [
        'isEditable',
      ]),
    },
    ...
  }
</script>

```

## Documentation of app.config.json options

TODO - also tidy no longer used options

## Documentation of builder.config.json options
### Enabling and disabling modes
Supported modes are defined in builder.config.json as ["TEXT", "SMS", "USSD", "IVR", "RICH_MESSAGING", "OFFLINE"].
This can be limited to a subset, for example:
```
platformBuilderConfig.ui.supportedModes = ['SMS', 'USSD']
```

### Setting default modes
Likewise, the modes that are *selected* by default when a new flow is created can be configured as follows:
```
platformBuilderConfig.ui.defaultModes = ['SMS']
```

### Configuring page headings visibility
It is possible to hide page titles for the Create Flow and Import Flow pages:

```
platformBuilderConfig.ui.pages.createFlow.hasPageTitle = false
platformBuilderConfig.ui.pages.importFlow.hasPageTitle = false
```

### Configuring Toolbar items visibility
There are several boolean flags that allow hiding flow title and buttons from the toolbar.

```
platformBuilderConfig.ui.toolbar.hasFlowTitle = false

platformBuilderConfig.ui.toolbar.hasHomeButton = false
platformBuilderConfig.ui.toolbar.hasNewFlowButton = false
platformBuilderConfig.ui.toolbar.hasExportButton = false
```

### Adjusting builder width
In case builder width must occupy less than full page wide,
you may reduce its width by a certain amount in pixels, e.g. 80

```
platformBuilderConfig.ui.pages.interactionDesigner.builderWidthAdjustment = 80
```

### Setting default available languages
Available languages can be configured as follows:

```
platformBuilderConfig.ui.languages = [lang1, lang2, ..., langN]
```
where each `lang` option follows the [ILanguage](https://github.com/FLOIP/flow-runner/blob/master/src/flow-spec/ILanguage.ts) schema.

### Setting available contact property fields
See below how we may configure available contact property fields:

```
platformBuilderConfig.ui.subscriberPropertyFields = [contactProp1, contactProp2, ..., contactPropN]
```
where each `contactProp` option follow the [IContactPropertyOption](https://github.com/FLOIP/flow-builder/blob/master/src/store/flow/block-types/Core_SetContactPropertyStore.ts#L9) schema.

### Setting available contact groups
See below how we may configure available contact groups:

```
platformBuilderConfig.ui.groups = [group1, group2, ..., groupN]
```
where each `group` option follow the [IGroupOption](https://github.com/FLOIP/flow-builder/blob/master/src/store/flow/block-types/Core_SetGroupMembershipStore.ts#L9) schema.

TODO - add more
