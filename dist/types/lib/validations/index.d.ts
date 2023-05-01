import { ErrorObject } from 'ajv';
/**
 * We have to use named exports from this file, otherwise the following
 * runtime error occurs:
 *
 * Uncaught TypeError: Super expression must either be
 * null or a function, not undefined
 */
export declare type ValidationMessageSuffix = string;
export declare type ValidationResult = [ErrorObject['dataPath'], ValidationMessageSuffix];
export declare type ValidationResults = ValidationResult[];
