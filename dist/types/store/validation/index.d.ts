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
 * Is valid by mode index OR lang index:
 * - if 1st key is mode index, then the array values are lang index
 * - if the 1st key is lang index, then the array values are mode index
 */
export interface IInvalidResourcesCounterBy {
    modeIndex?: {
        [key: number]: number;
    };
    langIndex?: {
        [key: number]: number;
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
