import { IBlock } from '@floip/flow-runner';
import { IIndexedString, IValidationStatus } from '../../store/validation/index';
import { ErrorObject, ValidateFunction } from 'ajv';
import { JSONSchema7 } from 'json-schema';
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
export declare function createDefaultJsonSchemaValidatorFactoryFor(jsonSchema: JSONSchema7, subSchema?: string): ValidateFunction;
export declare function debugValidationStatus(status: IValidationStatus, customMessage: string): void;
export declare function getLocalizedAjvErrors(keyPrefix: string, ajvErrors?: ErrorObject[] | null): ErrorObject[] | null;
export declare function getLocalizedBackendErrors(keyPrefix: string, blockErrors: {
    message: string;
}[]): ErrorObject[] | null;
export declare function flatValidationStatuses({ keyPrefix, errors, accumulator, }: {
    keyPrefix: string;
    errors: undefined | null | Array<ErrorObject>;
    accumulator: IIndexedString;
}): void;
export declare function getOrCreateFlowValidator(schemaVersion: string): ValidateFunction;
/**
 * Validator for the container and its content (flows, blocks, etc)
 */
export declare function getOrCreateContainerImportValidator(schemaVersion: string): ValidateFunction;
export declare function getOrCreateLanguageValidator(schemaVersion: string): ValidateFunction;
export declare function getOrCreateResourceValidator(schemaVersion: string): ValidateFunction;
/**
 * Validate Community block
 *
 * @param block
 * @param schemaVersion
 * @param customBlockJsonSchema,
 */
export declare function validateBlockWithJsonSchema({ block, schemaVersion, customBlockJsonSchema }: {
    block: IBlock;
    schemaVersion: string;
    customBlockJsonSchema?: JSONSchema7;
}): IValidationStatus;
/**
 * Extract resource variant index from error dataPath.
 * Return undefined if it does not match the resource value pattern
 *
 * @example
 * // returns 1
 * extractResourceVariantIndex('values/1/value')
 */
export declare function extractResourceVariantIndex(errorDataPath: string): number | undefined;
export declare function isNotUndefined<T>(value: T | undefined): value is T;
