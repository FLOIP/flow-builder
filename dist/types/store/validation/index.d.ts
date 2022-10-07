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
export interface IValidationStatus {
    isValid: boolean | PromiseLike<any>;
    ajvErrors?: null | Array<ErrorObject>;
    type: string;
    label?: string;
    context?: IValidationStatusContext;
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
