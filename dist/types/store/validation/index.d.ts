import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '../../store';
import { ErrorObject } from 'ajv';
export interface IIndexedString {
    [key: string]: string;
}
export interface IValidationStatusContext {
    resourceUuid?: string;
    isOrphanResource?: boolean;
}
/**
 * Is valid by mode OR languageId
 *
 * eg:
 * {
 *   mode: {
 *     "USSD": 12 // there are 12 invalid resources for USSD mode
 *   },
 *   languageId: {
 *     "eng": 34 // there are 34 invalid resources for "eng" language
 *   }
 * }
 */
export interface IInvalidResourcesCounterBy {
    mode?: {
        [key: string]: number;
    };
    languageId?: {
        [key: string]: number;
    };
}
export interface IValidationStatus {
    isValid: boolean | PromiseLike<any>;
    ajvErrors?: null | Array<ErrorObject>;
    type: string;
    label?: string;
    context?: IValidationStatusContext;
    invalidCounterBy?: IInvalidResourcesCounterBy;
}
export interface IValidationState {
    validationStatuses: {
        [key: string]: IValidationStatus;
    };
}
export declare const stateFactory: () => IValidationState;
export declare const validationGetters: GetterTree<IValidationState, IRootState>;
export declare const validationMutations: MutationTree<IValidationState>;
export declare const validationActions: ActionTree<IValidationState, IRootState>;
export declare const validationStore: Module<IValidationState, IRootState>;
export default validationStore;
export * from './validationHelpers';
