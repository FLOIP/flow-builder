import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '@/store';
import { ErrorObject } from 'ajv';
export interface IIndexedString {
    [key: string]: string;
}
export interface IValidationStatusContext {
    resourceUuid?: string;
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
export declare const getters: GetterTree<IValidationState, IRootState>;
export declare const mutations: MutationTree<IValidationState>;
export declare const actions: ActionTree<IValidationState, IRootState>;
export declare const store: Module<IValidationState, IRootState>;
export default store;
export * from './validationHelpers';
