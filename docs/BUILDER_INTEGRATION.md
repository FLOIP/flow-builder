# Set up guide

## Routes

[Full Spec Here](routes/markdown/routes.md)

Auth is up to the implementer for now

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
