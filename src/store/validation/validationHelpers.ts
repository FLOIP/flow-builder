import {IBlock} from '@floip/flow-runner'
import {IIndexedString, IValidationStatus} from '@/store/validation/index'
import Ajv, {ErrorObject, ValidateFunction} from 'ajv'
import {get, isEmpty} from 'lodash'
import {JSONSchema7} from 'json-schema'
import ajvFormat from 'ajv-formats'

const ajv = new Ajv({allErrors: true})

// we need this to use AJV format such as 'date-time' (https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.7)
ajvFormat(ajv)

const DEV_ERROR_KEYWORDS = [
  // unwanted extra props
  'additionalProperties',
  // missing props
  'required',
]

// AJV validators, keys are types
const validators = new Map<string, ValidateFunction>()

/**
 * Create AJV Validator
 * Usage :
 * const validate = createDefaultJsonSchemaValidatorFactoryFor(require('./some-json-schema.json')
 * const isValid = validate(myData)
 * const error = validate.errors
 *
 * @param jsonSchema
 * @param subSchema, Specify it if we want to pick a sub definition eg: pick `#/definitions/IFlow` under IContainer
 */
export function createDefaultJsonSchemaValidatorFactoryFor(jsonSchema: JSONSchema7, subSchema = ''): ValidateFunction {
  if (subSchema === '') {
    return ajv.compile(jsonSchema)
  }
  let validate = ajv.getSchema(subSchema)
  if (!validate) {
    ajv.addSchema(jsonSchema)
    validate = ajv.getSchema(subSchema)
  }
  if (!validate) {
    throw new Error(`Cannot find definition ${subSchema} in schema ${jsonSchema}`)
  }
  return validate as ValidateFunction
}

export function debugValidationStatus(status: IValidationStatus, customMessage: string): void {
  if (status != null) {
    console.debug(
      'store/validation:',
      customMessage,
      ' | isValid:',
      status.isValid,
      ' | error dataPaths:',
      `${Object.prototype.hasOwnProperty.call(status, 'ajvErrors') && status.ajvErrors ? (status.ajvErrors).map((item) => get(
        item,
        'dataPath',
        'undefined',
      )).join(';') : 'undefined'}`,
      ' | error messages:',
      `${Object.prototype.hasOwnProperty.call(status, 'ajvErrors') && status.ajvErrors ? (status.ajvErrors).map((item) => get(
        item,
        'message',
        'undefined',
      )).join(';') : 'undefined'}`,
      ' | error details:',
      status,
    )
  } else {
    console.debug('store/validation:', 'the status in debugValidationStatus was undefined')
  }
}

export function flatValidationStatuses({
  keyPrefix,
  errors,
  accumulator,
}: { keyPrefix: string, errors: undefined | null | Array<ErrorObject>, accumulator: IIndexedString }): void {
  errors?.forEach((error) => {
    let index = ''
    let message = ''
    if (DEV_ERROR_KEYWORDS.includes(error.keyword)) {
      // this is more likely a dev issue than user error
      // error.dataPath could be empty or not for such errors
      index = `${keyPrefix}${error.schemaPath}`
      message = `${error.message}, for params ${JSON.stringify(error.params)}`
      console.warn('store/validation:', `Schema issue found on ${index}: ${message}`)
    } else {
      index = `${keyPrefix}${error.dataPath}`
      message = error.message as string
    }
    accumulator[index] = message
  })
}

export function getOrCreateFlowValidator(schemaVersion: string): ValidateFunction {
  const validationType = 'flow'
  if (isEmpty(validators) || !validators.has(validationType)) {
    const flowJsonSchema = require(`@floip/flow-runner/dist/resources/validationSchema/${schemaVersion}/flowSpecJsonSchema.json`)

    // remove `blocks` property from IFlow schema to avoid double validations
    flowJsonSchema.definitions.IFlow.additionalProperties = true
    delete flowJsonSchema.definitions.IFlow.properties.blocks

    validators.set(validationType, createDefaultJsonSchemaValidatorFactoryFor(flowJsonSchema, '#/definitions/IFlow'))
  }
  return validators.get(validationType)!
}

export function getOrCreateLanguageValidator(schemaVersion: string): ValidateFunction {
  const validationType = 'language'
  if (isEmpty(validators) || !validators.has(validationType)) {
    const flowJsonSchema = require(`@floip/flow-runner/dist/resources/validationSchema/${schemaVersion}/flowSpecJsonSchema.json`)
    validators.set(validationType, createDefaultJsonSchemaValidatorFactoryFor(flowJsonSchema, '#/definitions/ILanguage'))
  }
  return validators.get(validationType)!
}

export function validateCommunityBlock({block, schemaVersion}: {block: IBlock, schemaVersion: string}): IValidationStatus {
  let validate = null
  if (isEmpty(validators) || !validators.has(block.type)) {
    const blockTypeWithoutNameSpace = block.type.split('.')[block.type.split('.').length - 1]
    let blockJsonSchema
    try {
      const schemaPath = `@floip/flow-runner/dist/resources/validationSchema/${schemaVersion}/I${blockTypeWithoutNameSpace}Block2.json`
      blockJsonSchema = require(schemaPath)
      validate = createDefaultJsonSchemaValidatorFactoryFor(blockJsonSchema)
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        console.info(`A Specific Validator for the ${blockTypeWithoutNameSpace}Block could not be found. `
          + `Falling back the generic Block validator for ${schemaVersion}`)
        blockJsonSchema = require(`@floip/flow-runner/dist/resources/validationSchema/${schemaVersion}/flowSpecJsonSchema.json`)
        validate = createDefaultJsonSchemaValidatorFactoryFor(blockJsonSchema, '#/definitions/IBlock')
      } else {
        throw e
      }
    }
    validators.set(block.type, validate)
  } else {
    validate = validators.get(block.type)!
  }

  return {
    isValid: validate(block),
    ajvErrors: validate.errors,
    type: block.type,
    label: block.label,
  }
}
