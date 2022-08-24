import {ErrorObject} from 'ajv'

/**
 * We have to use named exports from this file, otherwise the following
 * runtime error occurs:
 *
 * Uncaught TypeError: Super expression must either be
 * null or a function, not undefined
 */
export type ValidationMessageSuffix = string
export type ValidationResult = [ErrorObject['dataPath'], ValidationMessageSuffix]
export type ValidationResults = ValidationResult[]
