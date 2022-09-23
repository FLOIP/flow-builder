declare module "src/lib/filters/lang" {
    import Vue from 'vue';
    class Lang extends Vue {
        trans(translation: string, interpolations?: object): any;
        static trans(translation: string, interpolations?: object): any;
        /**
         * `transIf(condition, ...)` should only be used when we encounter an issue with `:disabled="!condition"` approach
         * eg: for v-b-tooltip, we may need to remove completely the tooltip on block view mode
         */
        transIf(condition: boolean, translation: string): any;
    }
    export default Lang;
    export const lang: typeof Lang;
}
declare module "src/lib/mixins/Permissions" {
    import Vue from 'vue';
    export function can(userPermissions: {
        [key: string]: any;
    }, permissionOrPermissions: string[] | string, requireAll?: boolean): any;
    export default class Permissions extends Vue {
        permissions: {
            [key: string]: any;
        };
        /**
         * @note This method can not be relied on for any real security measures, but solely provides the
         * ability to hide and curb navigation to prohibited parts of the app. Authorization still needs to be handled
         * on all endpoints and actions where necessitated. <3
         *
         * Implementation ported from:
         *  https://github.com/Zizaco/entrust/blob/master/src/Entrust/Traits/EntrustUserTrait.php#L144
         *
         * @param permission
         * @param requireAll
         * @returns {boolean}  */
        can(permission: string, requireAll?: boolean): any;
    }
}
declare module "src/lib/mixins/Routes" {
    import Vue from 'vue';
    export function interpolateRouteWith(context: any, route?: any): any;
    export function routeFrom(routeKey: string, context: any, routes: any): any;
    export default class Routes extends Vue {
        routes: any;
        route(routeKey: string, context: any): any;
    }
}
declare module "src/lib/mixins/FlowUploader" {
    import Vue from 'vue';
    export default class FlowUploader extends Vue {
    }
}
declare module "src/store/clipboard/index" {
    import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IPrompt } from '@floip/flow-runner';
    export interface BlocksData {
        isFocused: boolean;
        prompt: IPrompt;
    }
    export interface IClipboardState {
        isSimulatorActive: boolean;
        blocksData: BlocksData[];
    }
    export const stateFactory: () => IClipboardState;
    export const getters: GetterTree<IClipboardState, IRootState>;
    export const mutations: MutationTree<IClipboardState>;
    export const actions: ActionTree<IClipboardState, IRootState>;
    export const store: Module<IClipboardState, IRootState>;
    export default store;
}
declare module "src/components/interaction-designer/block-editors/BlockOutputBranchingConfig.model" {
    import { IBlock } from '@floip/flow-runner';
    export enum OutputBranchingType {
        UNIFIED = "UNIFIED",
        EXIT_PER_CHOICE = "EXIT_PER_CHOICE",
        ADVANCED = "ADVANCED"
    }
    export interface IVendorMetadataWithBranchingType {
        floip: {
            ui_metadata: {
                branching_type: OutputBranchingType;
            };
        };
    }
    export interface IBlockWithBranchingType extends IBlock {
        vendor_metadata: IVendorMetadataWithBranchingType;
    }
}
declare module "src/store/validation/validationHelpers" {
    import { IBlock } from '@floip/flow-runner';
    import { IIndexedString, IValidationStatus } from "src/store/validation/index";
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
    export function createDefaultJsonSchemaValidatorFactoryFor(jsonSchema: JSONSchema7, subSchema?: string): ValidateFunction;
    export function debugValidationStatus(status: IValidationStatus, customMessage: string): void;
    export function getLocalizedAjvErrors(keyPrefix: string, ajvErrors?: ErrorObject[] | null): ErrorObject[] | null;
    export function getLocalizedBackendErrors(keyPrefix: string, blockErrors: {
        message: string;
    }[]): ErrorObject[] | null;
    export function flatValidationStatuses({ keyPrefix, errors, accumulator, }: {
        keyPrefix: string;
        errors: undefined | null | Array<ErrorObject>;
        accumulator: IIndexedString;
    }): void;
    export function getOrCreateFlowValidator(schemaVersion: string): ValidateFunction;
    /**
     * Validator for the container and its content (flows, blocks, etc)
     */
    export function getOrCreateContainerImportValidator(schemaVersion: string): ValidateFunction;
    export function getOrCreateLanguageValidator(schemaVersion: string): ValidateFunction;
    export function getOrCreateResourceValidator(schemaVersion: string): ValidateFunction;
    /**
     * Validate Community block
     *
     * @param block
     * @param schemaVersion
     * @param customBlockJsonSchema,
     */
    export function validateBlockWithJsonSchema({ block, schemaVersion, customBlockJsonSchema }: {
        block: IBlock;
        schemaVersion: string;
        customBlockJsonSchema?: JSONSchema7;
    }): IValidationStatus;
}
declare module "src/store/validation/index" {
    import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
    import { IRootState } from "src/store/index";
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
    export const stateFactory: () => IValidationState;
    export const getters: GetterTree<IValidationState, IRootState>;
    export const mutations: MutationTree<IValidationState>;
    export const actions: ActionTree<IValidationState, IRootState>;
    export const store: Module<IValidationState, IRootState>;
    export default store;
    export * from "src/store/validation/validationHelpers";
}
declare module "src/lib/validations/index" {
    import { ErrorObject } from 'ajv';
    /**
     * We have to use named exports from this file, otherwise the following
     * runtime error occurs:
     *
     * Uncaught TypeError: Super expression must either be
     * null or a function, not undefined
     */
    export type ValidationMessageSuffix = string;
    export type ValidationResult = [ErrorObject['dataPath'], ValidationMessageSuffix];
    export type ValidationResults = ValidationResult[];
}
declare module "src/store/flow/block-types/BaseBlock" {
    import { ActionContext, GetterTree, Module, MutationTree } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IBlock } from '@floip/flow-runner';
    import { IValidationStatus } from "src/store/validation/index";
    import { ValidationResults } from "src/lib/validations/index";
    export interface IEmptyState {
    }
    export const getters: GetterTree<IEmptyState, IRootState>;
    export const mutations: MutationTree<IEmptyState>;
    export const actions: {
        createWith({ getters, dispatch }: ActionContext<IEmptyState, IRootState>, { props }: {
            props: {
                uuid: string;
            } & Partial<IBlock>;
        }): Promise<IBlock>;
        /**
         * This will be the default standard exit mode,
         * but we can override it in the specific block store (eg: for dynamic test generation in MCQ)
         */
        handleBranchingTypeChangedToUnified({ dispatch, getters, rootGetters }: ActionContext<IEmptyState, IRootState>, { block }: {
            block: IBlock;
        }): Promise<void>;
        /**
         * Override this method in the consumer side to add extra config attributes
         * to avoid the validation saying we have missing prop at the creation.
         *
         * Remember to namespace the fields, e.g.:
         *
         * return {
         *   org_example: {
         *     foo: 1,
         *     bar: 'baz',
         *   },
         * }
         */
        initiateExtraVendorConfig(_ctx: unknown): Promise<object>;
        /**
         * Validate the Consumer block
         * By overriding this action in the consumer side, we will be able to customize it using different json schema for eg.
         *
         * Important: This will be overridden in the consumer side, so DO NOT add generic validations here,
         * instead edit the `validate()` if needed.
         */
        validateBlockWithCustomJsonSchema(_ctx: unknown, { block, schemaVersion }: {
            block: IBlock;
            schemaVersion: string;
        }): Promise<IValidationStatus>;
        /**
         * Validate the Consumer block
         * By overriding this action in the consumer side, we will be able to customize it using different json schema for eg.
         *
         * Important: This will be overridden in the consumer side, so DO NOT add generic validations here,
         * instead edit the `validate()` if needed.
         */
        validateWithProgrammaticLogic(_ctx: unknown, { block }: {
            block: IBlock;
        }): Promise<ValidationResults>;
        /**
         * Override this in block stores if needed, it's not recommended though.
         * For customization, let's try to override the 02 actions validateBlockWithCustomJsonSchema & validateWithProgrammaticLogic instead
         */
        validate({ dispatch }: ActionContext<IEmptyState, IRootState>, { block, schemaVersion }: {
            block: IBlock;
            schemaVersion: string;
        }): Promise<IValidationStatus>;
        /**
         * Override this method on the consumer side to react to another block's changes,
         * e.g. to update expressions that reference the modified block: "@(flow.myBlockNameThatChanged)"
         * @param context
         * @param thisBlock, listening block
         * @param oldBlock, deep clone of the modified block before the change
         * @param newBlock, deep clone of the modified block after the change, null if the block was deleted
         */
        maybeHandleAnotherBlockChange(context: ActionContext<IEmptyState, IRootState>, { thisBlock, oldBlock, newBlock }: {
            thisBlock: IBlock;
            oldBlock: IBlock;
            newBlock: IBlock | null;
        }): Promise<void>;
    };
    const BaseBlockStore: Module<IEmptyState, IRootState>;
    export default BaseBlockStore;
}
declare module "src/store/flow/utils/vuexBlockHelpers" {
    import { IBlock, IChoice } from '@floip/flow-runner';
    export function updateBlockValueByPath(state: unknown, blockId: IBlock['uuid'], path: string, value: boolean | number | string | object | null | undefined): void;
    export function deleteChoiceValueByPath(state: unknown, choice: IChoice, path: string): void;
    export function removeBlockValueByPath(state: unknown, blockId: IBlock['uuid'], path: string): void;
}
declare module "src/store/flow/block/choice" {
    import { IRootState } from "src/store/index";
    import { ActionTree, GetterTree, MutationTree } from 'vuex';
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export const BLOCK_RESPONSE_EXPRESSION = "block.response";
    export function textValueToExpression(value: string): string;
    export const getters: GetterTree<IEmptyState, IRootState>;
    export const mutations: MutationTree<IEmptyState>;
    export const actions: ActionTree<IEmptyState, IRootState>;
}
declare module "src/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore" {
    import { GetterTree, Module, MutationTree } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export const BLOCK_TYPE = "MobilePrimitives.SelectOneResponse";
    export const getters: GetterTree<IEmptyState, IRootState>;
    export const mutations: MutationTree<IEmptyState>;
    const MobilePrimitives_SelectOneResponseBlockStore: Module<IEmptyState, IRootState>;
    export default MobilePrimitives_SelectOneResponseBlockStore;
}
declare module "src/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore" {
    import { GetterTree, Module } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export const BLOCK_TYPE = "MobilePrimitives.SelectManyResponse";
    export const getters: GetterTree<IEmptyState, IRootState>;
    const MobilePrimitives_SelectManyResponseBlockStore: Module<IEmptyState, IRootState>;
    export default MobilePrimitives_SelectManyResponseBlockStore;
}
declare module "src/components/interaction-designer/block-editors/choices/expressionTransformers" {
    import { IChoice } from '@floip/flow-runner';
    export function choicesToExpression(choices: IChoice[], propertyValueMapping: Record<string, string | number>): string;
}
declare module "src/store/flow/block/set-contact-property" {
    import { IRootState } from "src/store/index";
    import { IBlock, SetContactProperty } from '@floip/flow-runner';
    import { ActionTree, GetterTree, MutationTree } from 'vuex';
    import { IFlowsState } from "src/store/flow/index";
    export interface ISetContactPropertyBlockKey {
        blockId: IBlock['uuid'];
        key: SetContactProperty['property_key'];
    }
    export interface ISetContactPropertyBlockKeyWithValue extends ISetContactPropertyBlockKey {
        value: SetContactProperty['property_value'];
    }
    export const getters: GetterTree<IFlowsState, IRootState>;
    export const mutations: MutationTree<IFlowsState>;
    export const actions: ActionTree<IFlowsState, IRootState>;
}
declare module "src/store/flow/block" {
    import { IBlock, IBlockExit } from '@floip/flow-runner';
    import { ActionTree, GetterTree, MutationTree } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IFlowsState } from "src/store/flow/index";
    export type BlockConfigFieldType = object | string | number | boolean | undefined | null;
    export const getters: GetterTree<IFlowsState, IRootState>;
    export const mutations: MutationTree<IFlowsState>;
    export const actions: ActionTree<IFlowsState, IRootState>;
    export interface IDeepBlockExitIdWithinFlow {
        blockId: IBlock['uuid'];
        exitId: IBlockExit['uuid'];
    }
    /**
     * Is the block interactive ?
     * Another meaning: will the user get response when interacting with it?
     * @param block
     */
    export function isBlockInteractive(block: IBlock): boolean;
}
declare module "src/store/builder/index" {
    import Vue from 'vue';
    import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IBlock, IBlockExit, IBlockUIMetadataCanvasCoordinates } from '@floip/flow-runner';
    import { IDeepBlockExitIdWithinFlow } from "src/store/flow/block";
    export enum OperationKind {
        CONNECTION_SOURCE_RELOCATE = "CONNECTION_SOURCE_RELOCATE",
        CONNECTION_CREATE = "CONNECTION_CREATE",
        BLOCK_RELOCATE = "BLOCK_RELOCATE"
    }
    export interface IConnectionSourceRelocateOperation {
        kind: OperationKind.CONNECTION_SOURCE_RELOCATE;
        data: null | {
            from: IDeepBlockExitIdWithinFlow;
            position: IPosition;
            to: IDeepBlockExitIdWithinFlow | null;
        };
    }
    export interface IConnectionCreateOperation {
        kind: OperationKind.CONNECTION_CREATE;
        data: null | {
            source: IDeepBlockExitIdWithinFlow;
            position: IPosition;
            targetId: IBlock['uuid'] | null;
        };
    }
    export interface IConnectionContext {
        sourceId: IBlock['uuid'];
        targetId: IBlock['uuid'];
        exitId: IBlockExit['uuid'];
    }
    export type SupportedOperation = IConnectionSourceRelocateOperation | IConnectionCreateOperation;
    export interface IPosition {
        x: number;
        y: number;
    }
    export interface IBuilderState {
        activeBlockId: IBlock['uuid'] | null;
        isEditable: boolean;
        hasFlowChanges: boolean;
        activeConnectionsContext: IConnectionContext[];
        operations: {
            [OperationKind.CONNECTION_SOURCE_RELOCATE]: IConnectionSourceRelocateOperation;
            [OperationKind.CONNECTION_CREATE]: IConnectionCreateOperation;
            [OperationKind.BLOCK_RELOCATE]: null;
        };
        draggableForExitsByUuid: object;
        isBlockEditorOpen: boolean;
        interactionDesignerBoundingClientRect: DOMRect;
        isConnectionCreationInProgress: boolean;
    }
    export const stateFactory: () => IBuilderState;
    export type ConnectionLayout = any[];
    export const getters: GetterTree<IBuilderState, IRootState>;
    export const mutations: MutationTree<IBuilderState>;
    export const actions: ActionTree<IBuilderState, IRootState>;
    export const store: Module<IBuilderState, IRootState>;
    export default store;
    export function createDefaultBlockTypeInstallerFor(blockType: IBlock['type'], storeForBlockType: Module<any, IRootState>): (builder: Vue) => true | void;
    export function generateConnectionLayoutKeyFor(source: IBlock, target: IBlock): ConnectionLayout;
    export function computeBlockCanvasCoordinates(block?: IBlock | null): IBlockUIMetadataCanvasCoordinates;
    export function getViewportCenter(): {
        x: number;
        y: number;
    };
}
declare module "src/store/index" {
    import { StoreOptions } from 'vuex';
    import { IClipboardState } from "src/store/clipboard/index";
    import { IFlowsState } from "src/store/flow/index";
    import { IBuilderState } from "src/store/builder/index";
    import { IValidationState } from "src/store/validation/index";
    export interface IRootState {
        builder: IBuilderState;
        flow: IFlowsState;
        validation: IValidationState;
        trees: any;
        audio: any;
        clipboard: IClipboardState;
    }
    export const store: StoreOptions<IRootState>;
    export default store;
}
declare module "src/store/flow/utils/importHelpers" {
    import { IBlock, IContext, IResource } from '@floip/flow-runner';
    export function updateResourcesForLanguageMatch(resources: IResource[], oldId: string, newId: string): IResource[];
    export function mergeFlowContainer(existingFlowContainer: IContext, newFlowContainer: IContext): IContext;
    export function checkSingleFlowOnly(flowContainer: IContext): boolean;
    export function detectedLanguageChanges({ flowContainer, oldFlowContainer }: {
        flowContainer: IContext;
        oldFlowContainer: IContext | null;
    }): boolean;
    export function detectedPropertyChanges({ newPropertyBlocks, oldPropertyBlocks }: {
        newPropertyBlocks: IBlock[];
        oldPropertyBlocks: IBlock[];
    }): boolean;
    export function detectedGroupChanges({ newGroupBlocks, oldGroupBlocks }: {
        newGroupBlocks: IBlock[];
        oldGroupBlocks: IBlock[];
    }): boolean;
    export function getPropertyBlocks(flowContainer: IContext): IBlock[];
    export function getGroupBlocks(flowContainer: IContext): IBlock[];
}
declare module "src/store/flow/flow" {
    import { ActionTree, GetterTree, MutationTree } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IFlowsState } from "src/store/flow/index";
    export const getters: GetterTree<IFlowsState, IRootState>;
    export const mutations: MutationTree<IFlowsState>;
    export const actions: ActionTree<IFlowsState, IRootState>;
}
declare module "src/store/flow/index" {
    import { IBlock, IFlow } from '@floip/flow-runner';
    import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
    import { IRootState } from "src/store/index";
    export interface IFlowsState {
        isCreated: boolean;
        specification_version: string;
        container_uuid: string;
        flows: IFlow[];
        first_flow_id: string | null;
        nested_flow_block_interaction_id_stack: string[];
        selectedBlocks: IBlock['uuid'][];
    }
    export const stateFactory: () => IFlowsState;
    export const getters: GetterTree<IFlowsState, IRootState>;
    export const mutations: MutationTree<IFlowsState>;
    export const actions: ActionTree<IFlowsState, IRootState>;
    export const store: Module<IFlowsState, IRootState>;
    export default store;
}
declare module "src/store/flow/resource" {
    import { IContext, IFlow, IResource, IResourceValue as IResourceDefinitionVariantOverModes, IResourceValue, SupportedContentType, SupportedMode } from '@floip/flow-runner';
    import { ActionTree, GetterTree, MutationTree } from 'vuex';
    import { IFlowsState } from "src/store/flow/index";
    import { IRootState } from "src/store/index";
    export const getters: GetterTree<IFlowsState, IRootState>;
    export const mutations: MutationTree<IFlowsState>;
    export const actions: ActionTree<IFlowsState, IRootState>;
    export type IResourceDefinitionVariantOverModesFilter = Partial<IResourceDefinitionVariantOverModes>;
    export type IResourceDefinitionVariantOverModesFilterAsKey = Omit<IResourceDefinitionVariantOverModes, 'value'>;
    export type IResourceDefinitionVariantOverModesFilterWithResourceId = Partial<IResourceDefinitionVariantOverModes> & {
        resourceId: string;
    };
    export function findResourceWith(uuid: string, { resources }: IFlow): IResource;
    export function findResourceVariantOverModesWith(uuid: IResource['uuid'], filter: IResourceDefinitionVariantOverModesFilter, flow: IFlow): IResourceDefinitionVariantOverModes;
    export function findResourceVariantOverModesOn(resource: IResource, filter: IResourceDefinitionVariantOverModesFilter): IResourceValue;
    export function findOrGenerateStubbedVariantFor(resourceId: IResource['uuid'], filter: IResourceDefinitionVariantOverModesFilterAsKey, flow: IFlow): IResourceDefinitionVariantOverModes;
    export function findOrGenerateStubbedVariantOn(resource: IResource, filter: IResourceDefinitionVariantOverModesFilterAsKey): IResourceDefinitionVariantOverModes;
    export function discoverContentTypesFor(mode: SupportedMode, resource?: IResource): SupportedContentType[] | undefined;
    export function cleanupFlowResources(container: IContext, choiceMimeType: string): IContext;
}
declare module "src/components/interaction-designer/resource-editors/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/interaction-designer/resource-editors/ResourceEditor.vue" {
    import { IBlock, IFlow, IResource, IResourceValue as IResourceDefinitionVariantOverModes, SupportedContentType, SupportedMode } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    import Permissions from "src/lib/mixins/Permissions";
    import Routes from "src/lib/mixins/Routes";
    import FlowUploader from "src/lib/mixins/FlowUploader";
    import { discoverContentTypesFor, findOrGenerateStubbedVariantOn, findResourceVariantOverModesOn, IResourceDefinitionVariantOverModesFilter } from "src/store/flow/resource";
    import { ILanguage } from '@floip/flow-runner/dist/flow-spec/ILanguage';
    export interface IAudioFile {
        id: string;
        audio_uuid: string;
        description: string;
        language_id: string;
        duration_seconds: string;
        original_extension: string;
        created_at: string;
        uri: string;
    }
    interface IResourceDefinitionVariantOverModesWithOptionalValue extends Partial<IResourceDefinitionVariantOverModes> {
        value?: IResourceDefinitionVariantOverModes['value'];
    }
    const ResourceEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang & Permissions & Routes & FlowUploader>;
    export class ResourceEditor extends ResourceEditor_base {
        block: IBlock;
        flow: IFlow;
        resource: IResource;
        label?: string | number;
        discoverContentTypesFor: typeof discoverContentTypesFor;
        findOrGenerateStubbedVariantOn: typeof findOrGenerateStubbedVariantOn;
        findResourceVariantOverModesOn: typeof findResourceVariantOverModesOn;
        SupportedMode: typeof SupportedMode;
        SupportedContentType: typeof SupportedContentType;
        iconsMap: Map<string, object>;
        triggerRecordViaPhoneFor(langId: ILanguage['id']): void;
        handleFilesSubmittedFor(key: string, { data }: {
            data: any;
        }): void;
        /**
         * handleFileSuccessFor
         * @param key
         * @param langId
         * @param event, schema: {data: {file, uploader, json}}
         */
        handleFileSuccessFor(key: string, langId: ILanguage['id'], event: any): void;
        /**
         * handleFileErrorFor
         * @param event, schema: {data: {file, message, uploader}}
         */
        handleFileErrorFor(event: any): void;
        findAudioResourceVariantFor(resource: IResource, filter: IResourceDefinitionVariantOverModesFilter): string | null;
        /**
         * Compute resource index (cell index) for a table having X languages and Y modes
         *
         * @param langIndex
         * @param modeIndex
         */
        computeResourceIndex(langIndex: number, modeIndex: number): number;
        availableAudioFiles: IAudioFile[];
        isFeatureAudioUploadEnabled: boolean;
        pushAudioIntoLibrary: (audio: IAudioFile) => void;
        resource_setOrCreateValueModeSpecific: ({ resourceId, filter, value, }: {
            resourceId: IResource['uuid'];
            filter: IResourceDefinitionVariantOverModesWithOptionalValue;
            value: string;
        }) => void;
        isEditable: boolean;
    }
    export default ResourceEditor;
}
declare module "src/lib/suggestions/getBlockSuggestions" {
    import { ISuggestion } from "src/lib/types";
    export function getBlockSuggestions(): ISuggestion[];
}
declare module "src/lib/suggestions/getContactSuggestions" {
    import { IExpressionContext, ISuggestion } from "src/lib/types";
    export function getContactSuggestions(context: IExpressionContext): ISuggestion[];
}
declare module "src/lib/suggestions/getFlowIdentifiersSuggestions" {
    import { IExpressionContext, ISuggestion } from "src/lib/types";
    export function getFlowIdentifiersSuggestions(context: IExpressionContext): ISuggestion[];
}
declare module "src/lib/suggestions/getMethodSuggestions" {
    import { ISuggestion } from "src/lib/types";
    export function getMethodSuggestions(): ISuggestion[];
}
declare module "src/lib/suggestions/suggestionHelpers" {
    import { IExpressionContext, ISuggestion, ISuggestionValue } from "src/lib/types";
    export type SuggestionValueOrString = ISuggestionValue | string;
    export function merge(suggestions: ISuggestion[]): ISuggestion[];
    export function getBlockNames(context: IExpressionContext): string[];
}
declare module "src/lib/suggestions/getResultsSuggestions" {
    import { IExpressionContext, ISuggestion } from "src/lib/types";
    export function getResultSuggestionsForBlockNames(blockNames: string[], prefix: string): ISuggestion[];
    export function getResultsSuggestions(context: IExpressionContext): ISuggestion[];
}
declare module "src/lib/suggestions/getRunSuggestions" {
    import { IExpressionContext, ISuggestion } from "src/lib/types";
    export function getRunSuggestions(context: IExpressionContext): ISuggestion[];
}
declare module "src/lib/suggestions/index" {
    import { IBlock } from '@floip/flow-runner';
    import { IExpressionContext, ISuggestion } from "src/lib/types";
    export interface ISuggestionsContext {
        blocks: IBlock[];
    }
    export function getSuggestions(context: IExpressionContext): ISuggestion[];
}
declare module "src/components/common/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/common/ExpressionInput.vue" {
    import '@avcs/autosuggest/dropdown.css';
    import Lang from "src/lib/filters/lang";
    import { IFlow } from '@floip/flow-runner';
    import { ISubscriberPropertyField, ISuggestion } from "src/lib/types";
    interface IAutoSuggest {
        dropdown: {
            dropdown: HTMLElement;
        };
    }
    const ExpressionInput_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class ExpressionInput extends ExpressionInput_base {
        readonly label: string | number;
        readonly labelClass: string;
        readonly placeholder: string;
        readonly currentExpression?: string;
        readonly expressionIdentifier: string | number | null;
        readonly rows: number;
        readonly validState: boolean | null;
        readonly prependText: string;
        readonly disabled: boolean;
        readonly disabledAutoComplete: boolean;
        suggest: IAutoSuggest;
        get autoSuggestDropdown(): HTMLElement;
        get refAutoSuggestElement(): HTMLElement;
        get refInputElement(): HTMLInputElement;
        get isInvalid(): boolean;
        get expression(): string | undefined;
        set expression(value: string | undefined);
        get suggestions(): ISuggestion[];
        /**
         * Making sure we port the auto-suggest under desired dom
         */
        portAutoSuggestContent(): void;
        /**
         * Delay the portal to make sure AutoSuggest has finished the update.
         */
        debounce_portAutoSuggestContent(): void;
        handleClick(): void;
        mounted(): void;
        updated(): void;
        focus(): void;
        activeFlow?: IFlow;
        subscriberPropertyFields: ISubscriberPropertyField[];
    }
    export default ExpressionInput;
}
declare module "src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { IResource, IResourceValue } from '@floip/flow-runner';
    import { SupportedMode } from "node_modules/@floip/flow-runner/src/flow-spec/SupportedMode";
    const ResourceVariantTextEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class ResourceVariantTextEditor extends ResourceVariantTextEditor_base {
        readonly index: number;
        readonly resourceId: IResource['uuid'];
        readonly label: string;
        readonly prependText: string;
        readonly placeholder: string;
        readonly resourceVariant: IResourceValue;
        readonly mode: SupportedMode;
        readonly rows: number;
        readonly disabledAutoComplete: boolean;
        get content(): string;
        commitExpressionChange(value: string): void;
        resource_setOrCreateValueModeSpecific: ({ resourceId, filter, value }: {
            resourceId: IResource['uuid'];
            filter: {};
            value: string;
        }) => void;
    }
    export default ResourceVariantTextEditor;
}
declare module "src/components/interaction-designer/resource-editors/index" {
    export * from "src/components/interaction-designer/resource-editors/ResourceEditor.vue";
    export * from "src/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue";
}
declare module "src/lib/types" {
    import { IBlock, ILanguage } from '@floip/flow-runner';
    import { IAudioFile } from "src/components/interaction-designer/resource-editors/index";
    export interface IBlockExtended extends IBlock {
        jsKey: string;
        customData: IBlockCustomData;
        audioFiles: Record<ILanguage['id'], string>;
        smsContent: Record<ILanguage['id'], string>;
        ussdContent: Record<ILanguage['id'], string>;
    }
    export interface IBlockCustomData {
        title: string;
        repeatKey: number;
        repeatMax: number;
        repeatDelay: number;
        repeat: boolean;
        reviewed?: Record<string, boolean>;
        approved?: Record<string, boolean>;
    }
    export interface IAudioFileSelection {
        value: IAudioFile;
        langId: ILanguage['id'];
    }
    export interface IBatchMatchAudioData {
        results: unknown;
        status: number;
        message: string;
        isEmpty: boolean;
        isFailure: boolean;
        isPending: boolean;
        isComplete: boolean;
    }
    export interface IExpressionContext {
        blocks: IBlock[];
        subscriberPropertyFields: ISubscriberPropertyField[];
    }
    export interface ISuggestionValue {
        value: string;
        focusText: Number[];
    }
    export interface ISuggestion {
        trigger: string;
        values: (ISuggestionValue | string)[];
    }
    export interface ISubscriberPropertyField {
        id: string;
        name: string;
        display_label: string;
    }
    export interface IPositionLeftTop {
        left: number;
        top: number;
    }
    export type BlockClasses = string[];
}
declare module "src/components/common/AudioLibrarySearchField.vue" {
    import { IAudioFile } from "src/components/interaction-designer/resource-editors/index";
    const AudioLibrarySearchField_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
    export class AudioLibrarySearchField extends AudioLibrarySearchField_base {
        readonly langId?: string;
        readonly audioFiles: IAudioFile[];
        isActive: boolean;
        rawQuery: string;
        cache: Record<string, IAudioFile[]>;
        isEntireLibraryModeEnabled: boolean;
        offset: number;
        limit: number;
        get query(): string;
        get isAudioLibraryEmpty(): boolean;
        get hasNext(): boolean;
        get hasPrevious(): boolean;
        search(query: string): IAudioFile[];
        incrementPage(): void;
        decrementPage(): void;
        resetPagination(): void;
        toggleAudioLibrary(): void;
        select(audio: IAudioFile): void;
        activate(): void;
        deactivate(): void;
    }
    export default AudioLibrarySearchField;
}
declare module "src/lib/filters/moment" {
    import { DurationInputArg1, DurationInputArg2, MomentInput } from 'moment';
    import { Vue } from 'vue-property-decorator';
    export function formatDate(date: MomentInput, format?: string): string;
    export function fromNow(date: MomentInput, withoutSuffix?: boolean): string;
    export function formatDuration(duration: DurationInputArg1, unit?: DurationInputArg2, withSuffix?: boolean): string;
    export function formatDurationLocalized(duration: DurationInputArg1, locale: string, unit?: DurationInputArg2, withSuffix?: boolean): string;
    export class Moment extends Vue {
    }
    export default Moment;
}
declare module "src/components/common/AudioLibrarySelection.vue" {
    import Lang from "src/lib/filters/lang";
    import Moment from "src/lib/filters/moment";
    import { IAudioFile } from "src/components/interaction-designer/resource-editors/index";
    const AudioLibrarySelection_base: import("vue-class-component/lib/declarations").VueClass<Lang & Moment>;
    export class AudioLibrarySelection extends AudioLibrarySelection_base {
        audioFile: IAudioFile;
        selectable?: boolean;
        langId?: string;
        get audioFileUrl(): string;
        get audioFileDescription(): string;
        select(): void;
        clear(): void;
    }
    export default AudioLibrarySelection;
}
declare module "src/components/common/KeypadDigitsSelector.vue" {
    import Lang from "src/lib/filters/lang";
    type MultiselectOption = {
        name: string;
        label: string;
    };
    const KeypadDigitsSelector_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class KeypadDigitsSelector extends KeypadDigitsSelector_base {
        label: string;
        value: string;
        placeholder: string;
        validState: boolean;
        get options(): MultiselectOption[];
        get modelValue(): MultiselectOption | undefined;
        set modelValue(value: MultiselectOption | undefined);
    }
    export default KeypadDigitsSelector;
}
declare module "src/components/common/FloatEditor.vue" {
    import Lang from "src/lib/filters/lang";
    const FloatEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class FloatEditor extends FloatEditor_base {
        readonly label: string | number;
        readonly placeholder: string;
        readonly step: string;
        readonly value: string | number;
        readonly min: string | number;
        readonly regexFloatFiltering: string;
        readonly validState?: boolean;
        get isInvalid(): boolean;
        filterFloat(e: KeyboardEvent): void;
    }
    export default FloatEditor;
}
declare module "src/components/common/NumericEditor.vue" {
    import Lang from "src/lib/filters/lang";
    const NumericEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class NumericEditor extends NumericEditor_base {
        readonly validState?: boolean;
        readonly label: string | number;
        readonly placeholder: string;
        readonly value?: string | number;
        readonly regexNumericFiltering: string;
        readonly subTitle: string;
        readonly tooltipHint: string;
        get isInvalid(): boolean;
        filterNumeric(e: KeyboardEvent): void;
    }
    export default NumericEditor;
}
declare module "src/components/common/PlainDraggable.vue" {
    import Lang from "src/lib/filters/lang";
    import { IPositionLeftTop } from "src/lib/types";
    const PlainDraggable_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class PlainDraggable extends PlainDraggable_base {
        startX?: number;
        startY?: number;
        isEditable: boolean;
        dragHandleId?: string;
        contentType: string;
        draggable: any;
        onToggleEditable(value: boolean): void;
        mounted(): void;
        destroyed(): void;
        handleInitialized(): void;
        handleDragged(position: IPositionLeftTop): void;
        setIsConnectionCreationInProgress: ({ value }: {
            value: boolean;
        }) => void;
        handleDragStarted(position: IPositionLeftTop): void;
        handleDragEnded(position: IPositionLeftTop): void;
    }
    export default PlainDraggable;
}
declare module "src/components/common/TextEditor.vue" {
    import { Vue } from 'vue-property-decorator';
    export class TextEditor extends Vue {
        readonly label: string | number;
        readonly labelClass: string;
        readonly placeholder: string;
        readonly value?: string;
        readonly validState?: boolean;
        readonly rows: number;
        get isInvalid(): boolean;
    }
    export default TextEditor;
}
declare module "src/components/common/ValidationMessage.vue" {
    import Lang from "src/lib/filters/lang";
    import { IIndexedString } from "src/store/validation/index";
    const ValidationMessage_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class ValidationMessage extends ValidationMessage_base {
        messageKey: string;
        shouldHideValidation: boolean;
        readonly overrides?: Record<string, string>;
        get errorMessage(): string;
        get messageOverrides(): Map<string, string>;
        get isValid(): boolean;
        flattenErrorMessages: IIndexedString;
    }
    export default ValidationMessage;
}
declare module "src/components/common/index" {
    export * from "src/components/common/AudioLibrarySearchField.vue";
    export * from "src/components/common/AudioLibrarySelection.vue";
    export * from './AudioLibrarySelector.vue';
    export * from "src/components/common/KeypadDigitsSelector.vue";
    export * from "src/components/common/ExpressionInput.vue";
    export * from "src/components/common/FloatEditor.vue";
    export * from "src/components/common/NumericEditor.vue";
    export * from "src/components/common/PlainDraggable.vue";
    export * from "src/components/common/TextEditor.vue";
    export * from "src/components/common/ValidationMessage.vue";
}
declare module "src/components/interaction-designer/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/interaction-designer/Connection.vue" {
    import { IBlock, IBlockExit } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    import { IConnectionContext } from "src/store/builder/index";
    export const colorStates: {
        ON_HOVER: string;
        CONNECTING: string;
        DEFAULT: string;
    };
    interface ILeaderLineOptions {
        color: string;
        endPlugColor?: string;
        endPlugSize: number;
        endSocket: string;
        gradient?: true;
        outline?: boolean;
        outlineColor?: string;
        path: string;
        size: number;
        startPlug: string;
        startPlugColor?: string;
        startSocket: string;
    }
    const Connection_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class Connection extends Connection_base {
        readonly exit: IBlockExit;
        readonly repaintCacheKeyGenerator: Function;
        readonly source: IBlock;
        readonly target: IBlock;
        readonly position: {
            x: number;
            y: number;
        };
        readonly color: string;
        line: any;
        isPermanentlyActive: boolean;
        get hasDestination(): Boolean;
        /**
         * these options come from the Leader-line doc: https://anseki.github.io/leader-line/#options
         */
        get options(): ILeaderLineOptions;
        get onHoverOptions(): Partial<ILeaderLineOptions>;
        get connectionContext(): IConnectionContext;
        get sourceElementId(): string;
        get targetElementId(): string;
        get repositionHook(): string | null;
        mounted(): void;
        beforeDestroy(): void;
        activateConnection: ({ connectionContext }: {
            connectionContext: IConnectionContext;
        }) => void;
        deactivateConnection: ({ connectionContext }: {
            connectionContext: IConnectionContext;
        }) => void;
        activateBlock: ({ blockId }: {
            blockId: IBlock['uuid'] | null;
        }) => void;
        reposition(): void;
        mouseOverHandler(): void;
        mouseOutHandler(): void;
        clickHandler(): void;
        clickAwayHandler(connectionElement: Element, event: Event): void;
    }
    export default Connection;
}
declare module "src/components/interaction-designer/Block.vue" {
    import { IBlock, IBlockExit, IFlow } from '@floip/flow-runner';
    import { ConnectionLayout, IConnectionContext, IPosition, OperationKind, SupportedOperation } from "src/store/builder/index";
    import Lang from "src/lib/filters/lang";
    import { BlockClasses } from "src/lib/types";
    type Draggable = any;
    type BlockAction = ({ block }: {
        block: IBlock;
    }) => void;
    type BlockExitAction = ({ block, exit }: {
        block: IBlock;
        exit: IBlockExit;
    }) => void;
    type BlockPositionAction = ({ block, position }: {
        block: IBlock;
        position: IPosition;
    }) => void;
    type BlockExitPositionAction = ({ block, exit, position }: {
        block: IBlock;
        exit: IBlockExit;
        position: IPosition;
    }) => void;
    export const BLOCK_RESET_CONNECTIONS = "BLOCK_RESET_CONNECTIONS";
    const Block_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class Block extends Block_base {
        readonly block: IBlock;
        readonly x: number;
        readonly y: number;
        livePosition: {
            x: number;
            y: number;
        } | null;
        labelContainerMaxWidth: number;
        blockWidth: number;
        blockHeight: number;
        exitHovers: {};
        exitOnDragged: Record<IBlockExit['uuid'], boolean>;
        lineHovers: Record<IBlockExit['uuid'], boolean>;
        linePermanentlyActive: Record<IBlockExit['uuid'], boolean>;
        cursorPosition: {
            x: number;
            y: number;
        } | null;
        connectionColorAtSourceDragged: string;
        connectionColorForKnowDestination: string;
        isConnectionSource: boolean;
        translatedBlockPosition: string;
        created(): void;
        updated(): void;
        mounted(): void;
        onBlockExitsLengthChanged(newValue: number, oldValue: number): void;
        selectedBlocks: IBlock['uuid'][];
        activeBlockId: IBlock['uuid'] | null;
        operations: Record<OperationKind, SupportedOperation>;
        activeConnectionsContext: IConnectionContext[];
        draggableForExitsByUuid: Record<string, Draggable>;
        isBlockEditorOpen: boolean;
        isConnectionCreationInProgress: boolean;
        blockClasses: BlockClasses;
        blocksById: Record<IBlock['uuid'], IBlock>;
        isEditable: boolean;
        interactionDesignerBoundingClientRect: DOMRect;
        activeFlow?: IFlow;
        isMouseOnBlock: boolean;
        get blockExitsLength(): number;
        get numberOfExitsShown(): number;
        get hasExitsShown(): boolean;
        get hasMultipleExitsShown(): boolean;
        get hasLayout(): boolean;
        get isAssociatedWithActiveConnection(): boolean;
        get isAssociatedWithActiveConnectionAsSourceBlock(): boolean;
        get isAssociatedWithActiveConnectionAsTargetBlock(): boolean;
        get isWaitingForConnection(): boolean;
        get isBlockSelected(): boolean;
        get isConnectionSourceRelocateActive(): boolean;
        get isConnectionCreateActive(): boolean;
        get isBlockActivated(): boolean;
        updateTranslatedBlockEditorPosition(): void;
        get shouldShowBlockEditor(): boolean;
        block_updateShouldShowBlockToolBar: ({ blockId, value }: {
            blockId: string;
            value: boolean;
        }) => void;
        get shouldShowBlockToolBar(): boolean;
        generateConnectionLayoutKeyFor(source: IBlock, target: IBlock): ConnectionLayout;
        activateBlock: () => void;
        setBlockPositionTo: BlockPositionAction;
        initDraggableForExitsByUuid: () => void;
        setIsBlockEditorOpen: () => void;
        deactivateConnectionFromExitUuid: ({ exitUuid }: {
            exitUuid: IBlockExit['uuid'];
        }) => void;
        removeConnectionFrom: BlockExitAction;
        initializeConnectionSourceRelocateWith: BlockExitPositionAction;
        setConnectionSourceRelocateValue: BlockExitAction;
        setConnectionSourceRelocateValueToNullFrom: BlockExitAction;
        applyConnectionSourceRelocate: () => void;
        initializeConnectionCreateWith: BlockExitPositionAction;
        setConnectionCreateTargetBlock: BlockAction;
        setConnectionCreateTargetBlockToNullFrom: BlockAction;
        applyConnectionCreate: () => void;
        updateShouldShowBlockToolBar(): void;
        setIsMouseOnBlock(value: boolean): void;
        exitMouseEnter(exit: IBlockExit): void;
        exitMouseLeave(exit: IBlockExit): void;
        setLineHovered(exit: IBlockExit, value: boolean): void;
        setLineClicked(exit: IBlockExit, value: boolean): void;
        updateLabelContainerMaxWidth(blockExitsLength?: number, isRemoving?: boolean): void;
        isExitActivatedForRelocate(exit: IBlockExit): boolean;
        isExitActivatedForCreate(exit: IBlockExit): boolean;
        activateExitAsDropZone(e: MouseEvent, exit: IBlockExit): void;
        deactivateExitAsDropZone(e: MouseEvent, exit: IBlockExit): void;
        activateBlockAsDropZone(): void;
        deactivateBlockAsDropZone(): void;
        onMoved({ position: { left: x, top: y } }: {
            position: {
                left: number;
                top: number;
            };
        }): void;
        handleRemoveConnectionFrom(exit: IBlockExit): void;
        handleDraggableInitializedFor({ uuid }: {
            uuid: string;
        }, { draggable }: {
            draggable: Draggable;
        }): void;
        handleDraggableDestroyedFor({ uuid }: {
            uuid: string;
        }): void;
        onCreateExitDragStarted({ draggable }: {
            draggable: Draggable;
        }, exit: IBlockExit): void;
        onCreateExitDragged({ position: { left: x, top: y } }: {
            position: {
                left: number;
                top: number;
            };
        }): void;
        onCreateExitDragEnded({ draggable }: {
            draggable: Draggable;
        }, exit: IBlockExit): void;
        onMoveExitDragStarted({ draggable }: {
            draggable: Draggable;
        }, exit: IBlockExit): void;
        onMoveExitDragged({ position: { left: x, top: y } }: {
            position: {
                left: number;
                top: number;
            };
        }): void;
        onMoveExitDragEnded({ draggable }: {
            draggable: Draggable;
        }): void;
        selectBlock(): void;
        handleDraggableEndedForBlock(): void;
        handleDraggableDestroyedForBlock(): void;
        updateCursorPosition(e: MouseEvent): void;
        adjustDraggablePosition(draggable: Draggable): void;
    }
    export default Block;
}
declare module "src/components/interaction-designer/BuilderCanvas.vue" {
    import { Vue } from 'vue-property-decorator';
    import { IBlock, IFlow, IResources } from '@floip/flow-runner';
    export class BuilderCanvas extends Vue {
        block: IBlock;
        widthAdjustment: number;
        onActiveFlowChanged(newFlow: IFlow): Promise<void>;
        debounceFlowValidation: ((this: any, { newFlow }: {
            newFlow: IFlow;
        }) => void) & import("lodash").Cancelable;
        onBlocksInActiveFlowChanged(newBlocks: IBlock[], oldBlocks: IBlock[]): Promise<void>;
        debounceBlockValidation: ((this: any) => void) & import("lodash").Cancelable;
        onResourcesOnActiveFlowChanged(newResources: IResources, oldResources: IResources): Promise<void>;
        onCanvasHeightChanged(newValue: number): void;
        onCanvasWidthChanged(newValue: number): void;
        debounceVerticalScroll: ((this: any) => void) & import("lodash").Cancelable;
        debounceHorizontalScroll: ((this: any) => void) & import("lodash").Cancelable;
        get blocksOnActiveFlowForWatcher(): IBlock[];
        get blockHeight(): number;
    }
}
declare module "src/components/interaction-designer/index" {
    export * from "src/components/interaction-designer/Block.vue";
    export * from "src/components/interaction-designer/BuilderCanvas.vue";
    export * from "src/components/interaction-designer/Connection.vue";
}
declare module "src/components/interaction-designer/block-editors/choices/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/interaction-designer/block-editors/choices/ChoicesBuilder.vue" {
    import { findOrGenerateStubbedVariantOn } from "src/store/flow/resource";
    import Lang from "src/lib/filters/lang";
    import { IBlock, IFlow, IResource, IResourceValue, SupportedContentType, SupportedMode } from '@floip/flow-runner';
    import { ISelectOneResponseBlock } from "node_modules/@floip/flow-runner/src/model/block/ISelectOneResponseBlock";
    import Vue from 'vue';
    const ChoicesBuilder_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class ChoicesBuilder extends ChoicesBuilder_base {
        readonly block: ISelectOneResponseBlock;
        draftResource: IResource | null;
        SupportedContentType: typeof SupportedContentType;
        SupportedMode: typeof SupportedMode;
        findOrGenerateStubbedVariantOn: typeof findOrGenerateStubbedVariantOn;
        get choiceResourcesOrderedByResourcesList(): IResource[];
        created(): void;
        generateDraftResource(): Promise<void>;
        addDraftResourceToChoices(): Promise<void>;
        focusInputElFor(editor?: Vue): void;
        choice_create: ({ blockId, resourceId, value }: {
            blockId: IBlock['uuid'];
            resourceId: IResource['uuid'];
            value: string;
        }) => void;
        choice_change: ({ blockId, resourceId, value }: {
            blockId: IBlock['uuid'];
            resourceId: IResource['uuid'];
            value: IResourceValue['value'];
        }) => void;
        handleExistingResourceVariantChangedFor({ choiceIndex }: {
            choiceIndex: number;
        }, { variant, resourceId, value }: {
            variant: IResourceValue;
            resourceId: IResource['uuid'];
            value: IResourceValue['value'];
        }): void;
        handleNewChoiceChange({ variant, resourceId, value }: {
            variant: IResourceValue;
            resourceId: IResource['uuid'];
            value: string;
        }): void;
        choiceMimeType: string;
        activeFlow: IFlow;
        resource_add: ({ resource }: {
            resource: IResource;
        }) => void;
        resource_createWith: ({ props }: {
            props: {
                uuid: string;
            } & Partial<IResource>;
        }) => Promise<IResource>;
        deleteChoiceByResourceIdFrom: ({ blockId, resourceId }: {
            blockId: IBlock['uuid'];
            resourceId: IResource['uuid'];
        }) => void;
        block_setChoiceIvrExpressionOnIndex: ({ blockId, index, value }: {
            blockId: string;
            index: number;
            value: string;
        }) => void;
        addChoiceByResourceIdTo: ({ blockId, resourceId }: {
            blockId: IBlock['uuid'];
            resourceId: IResource['uuid'];
        }) => void;
    }
    export default ChoicesBuilder;
}
declare module "src/components/interaction-designer/block-editors/choices/index" {
    export * from "src/components/interaction-designer/block-editors/choices/ChoicesBuilder.vue";
    export * from './ChoiceMappingModal.vue';
    export * from './VoiceMappingTable.vue';
    export * from './VoiceMappingRow.vue';
    export * from './VoiceKeyPressSelector.vue';
    export * from './mixins/CommonVoiceChoiceConfig.vue';
    export * from './SelectOneResponseBlockContactPropertyEditor.vue';
    export * from './TextMappingTable.vue';
    export * from './TextMappingRow.vue';
}
declare module "src/components/interaction-designer/block-editors/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/interaction-designer/block-editors/AdvancedExitEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock, IBlockExit } from '@floip/flow-runner';
    const AdvancedExitEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class AdvancedExitEditor extends AdvancedExitEditor_base {
        readonly block: IBlock;
        readonly exit: IBlockExit;
        readonly label: string;
        get index(): number;
        get test(): IBlockExit['test'];
        get name(): IBlockExit['name'];
        set name(value: IBlockExit['name']);
        commitExpressionChange(value: IBlockExit['test']): Promise<void>;
        block_setExitTest: ({ exitId, blockId, value }: {
            exitId: string;
            blockId: string;
            value: IBlockExit['test'];
        }) => void;
        block_setExitName: ({ exitId, blockId, value }: {
            exitId: IBlockExit['uuid'];
            blockId: IBlock['uuid'];
            value: IBlockExit['name'];
        }) => void;
    }
    export default AdvancedExitEditor;
}
declare module "src/components/interaction-designer/block-editors/AdvancedExitsBuilder.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock, IBlockExit } from '@floip/flow-runner';
    import Vue from 'vue';
    const AdvancedExitsBuilder_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class AdvancedExitsBuilder extends AdvancedExitsBuilder_base {
        readonly block: IBlock;
        draftExit: IBlockExit | null;
        created(): void;
        generateDraftExit(): Promise<void>;
        addDraftExitToBlock(): void;
        handleExitChanged(exit: IBlockExit, index: number): void;
        hasEmptyValues(exit: IBlockExit): boolean;
        focusInputEl(input?: HTMLInputElement): void;
        getNameInputFrom(exitEditor?: Vue): HTMLInputElement;
        getTestInputFrom(exitEditor?: Vue): HTMLInputElement;
        block_addExit: ({ blockId, exit }: {
            blockId: IBlock['uuid'];
            exit: IBlockExit;
        }) => void;
        block_removeExit: ({ blockId, exit }: {
            blockId: IBlock['uuid'];
            exit: IBlockExit;
        }) => void;
        block_createBlockExitWith: ({ props }: {
            props: {
                uuid: string;
            } & Partial<IBlockExit>;
        }) => Promise<IBlockExit>;
    }
    export default AdvancedExitsBuilder;
}
declare module "src/components/interaction-designer/block-editors/BlockEditor.vue" {
    import { IBlock, IFlow } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const BlockEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class BlockEditor extends BlockEditor_base {
        activeBlock?: IBlock;
        activeFlow?: IFlow;
    }
    export default BlockEditor;
}
declare module "src/components/interaction-designer/block-editors/BlockId.vue" {
    import { PropType } from 'vue';
    import { IBlock } from '@floip/flow-runner';
    const _default: import("vue").DefineComponent<{
        block: PropType<IBlock<import("@floip/flow-runner").IBlockConfig>>;
    }, {}, {}, {}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
        block: PropType<IBlock<import("@floip/flow-runner").IBlockConfig>>;
    }>>, {}>;
    export default _default;
}
declare module "src/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue" {
    import { IBlock, IBlockExit } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    import { BlockConfigFieldType } from "src/store/flow/block";
    import { OutputBranchingType } from "src/components/interaction-designer/block-editors/BlockOutputBranchingConfig.model";
    const BlockOutputBranchingConfig_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class BlockOutputBranchingConfig extends BlockOutputBranchingConfig_base {
        readonly block: IBlock;
        readonly hasExitPerChoice: boolean;
        readonly hasUnifiedExit: boolean;
        readonly labelClass?: string;
        OutputBranchingType: typeof OutputBranchingType;
        mounted(): void;
        get selectedBranchingType(): OutputBranchingType;
        set selectedBranchingType(value: OutputBranchingType);
        get isBranchingTypeExitPerChoice(): boolean;
        get isBranchingTypeUnified(): boolean;
        get isBranchingTypeAdvanced(): boolean;
        block_updateVendorMetadataByPath: ({ blockId, path, value }: {
            blockId: string;
            path: string;
            value: BlockConfigFieldType;
        }) => void;
        block_exitClearDestinationBlockFor: ({ blockExit }: {
            blockExit: IBlockExit;
        }) => void;
    }
    export default BlockOutputBranchingConfig;
}
declare module "src/components/interaction-designer/block-editors/Categorization.vue" {
    import { IBlock } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const Categorization_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class Categorization extends Categorization_base {
        readonly block: IBlock;
    }
    export default Categorization;
}
declare module "src/components/interaction-designer/block-editors/ContactPropertyEditor.vue" {
    import { IBlock, SetContactProperty } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    import { BlockConfigFieldType } from "src/store/flow/block";
    const ContactPropertyEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class ContactPropertyEditor extends ContactPropertyEditor_base {
        readonly block: IBlock;
        PROPERTY_ACTION: {
            SET: string;
            CLEAR: string;
        };
        get propertyAction(): string;
        set propertyAction(value: string);
        block_setContactPropertyKeyOnIndex: ({ index, blockId, propertyKey }: {
            index: number;
            blockId: string;
            propertyKey?: string;
        }) => void;
        get firstProperty(): SetContactProperty | undefined;
        get propertyKey(): string | undefined;
        get propertyValue(): string;
        updatePropertyValue(value: string): void;
        block_updateConfigByPath: ({ blockId, path, value }: {
            blockId: string;
            path: string;
            value: BlockConfigFieldType;
        }) => void;
        set propertyKey(value: string | undefined);
        block_setContactPropertyValueOnIndex: ({ index, blockId, propertyValue }: {
            index: number;
            blockId: string;
            propertyValue: string;
        }) => void;
    }
    export default ContactPropertyEditor;
}
declare module "src/components/interaction-designer/block-editors/EndRecordingDigitsEditor.vue" {
    import { IBlock } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const EndRecordingDigitsEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class EndRecordingDigitsEditor extends EndRecordingDigitsEditor_base {
        hasIvr: boolean;
        block: IBlock;
        get endRecordingDigits(): string;
        set endRecordingDigits(value: string);
    }
    export default EndRecordingDigitsEditor;
}
declare module "src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlockExit } from '@floip/flow-runner';
    const ExitSemanticLabelEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class ExitSemanticLabelEditor extends ExitSemanticLabelEditor_base {
        readonly isEditable: boolean;
        readonly exit: IBlockExit;
        get semanticLabel(): string;
        set semanticLabel(value: string);
    }
    export default ExitSemanticLabelEditor;
}
declare module "src/store/flow/block-types/Core_SetContactPropertyStore.model" {
    export interface IContactPropertyMultipleChoice {
        value: string;
        description: string;
    }
    export interface IContactPropertyOption {
        id: string;
        name: string;
        display_label: string;
        data_type: string;
        choices?: IContactPropertyMultipleChoice[];
    }
    export interface IContactPropertyOptionForUISelector extends IContactPropertyOption {
        $isDisabled: boolean;
    }
}
declare module "src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue" {
    import { IBlock } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    import { BlockConfigFieldType } from "src/store/flow/block";
    import { IContactPropertyOption, IContactPropertyOptionForUISelector } from "src/store/flow/block-types/Core_SetContactPropertyStore.model";
    const GenericContactPropertyEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class GenericContactPropertyEditor extends GenericContactPropertyEditor_base {
        readonly block: IBlock;
        readonly disableExpressionInput: boolean;
        shouldSetContactProperty: boolean;
        PROPERTY_VALUE_ACTION: {
            OPEN_EXPRESSION: string;
            FROM_CURRENT_BLOCK_RESPONSE: string;
        };
        propertyValueAction: string;
        propertyKey?: string;
        propertyValue?: string;
        created(): void;
        isBlockInteractive(block: IBlock): boolean;
        toggleSetContactProperty(): void;
        initPropertyValueAction(): void;
        updatePropertyValueAction({ target: { value } }: {
            target: {
                value: string;
            };
        }): void;
        get shouldUseOpenExpression(): boolean;
        updateFirstContactPropertyKey(value: string): void;
        updateFirstContactPropertyValue(value: string): void;
        get firstContactPropertyKey(): string | undefined;
        get firstContactPropertyValue(): string | undefined;
        get flowSelectedContactPropertyField(): IContactPropertyOption | null;
        set flowSelectedContactPropertyField(option: IContactPropertyOption | null);
        get hasSubscriberPropertyFields(): boolean;
        get subscriberPropertyFieldsForSelector(): IContactPropertyOptionForUISelector[];
        block_updateConfigByPath: ({ blockId, path, value }: {
            blockId: string;
            path: string;
            value: BlockConfigFieldType;
        }) => void;
        block_updateVendorMetadataByPath: ({ blockId, path, value }: {
            blockId: string;
            path: string;
            value: BlockConfigFieldType;
        }) => void;
        block_removeConfigByKey: ({ blockId, key }: {
            blockId: IBlock['uuid'];
            key: string;
        }) => void;
        block_setContactPropertyKeyOnIndex: ({ index, blockId, propertyKey }: {
            index: number;
            blockId: string;
            propertyKey: string;
        }) => void;
        block_setContactPropertyValueOnIndex: ({ index, blockId, propertyValue }: {
            index: number;
            blockId: string;
            propertyValue: string;
        }) => void;
        block_setContactPropertyOnIndex: ({ blockId, index, propertyKey, propertyValue }: {
            blockId: string;
            index: number;
            propertyKey?: string;
            propertyValue?: string;
        }) => void;
        subscriberPropertyFields: IContactPropertyOption[];
        subscriberPropertyFieldDataTypesMapping: Record<string, string[]>;
    }
    export default GenericContactPropertyEditor;
}
declare module "src/components/interaction-designer/block-editors/GroupMembershipEditor.vue" {
    import { IBlock, ISetGroupMembershipBlockConfig, IGroupMembership } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    import { BlockConfigFieldType } from "src/store/flow/block";
    type MembershipAction = {
        id: string;
        label: string;
        value: string;
    };
    enum MEMBERSHIP_ACTION {
        ADD = "add",
        REMOVE = "remove",
        CLEAR = "clear"
    }
    const GroupMembershipEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class GroupMembershipEditor extends GroupMembershipEditor_base {
        readonly block: IBlock;
        readonly availableGroups?: IGroupMembership[];
        readonly hasGroupsLoading: boolean;
        userAddedGroups: IGroupMembership[];
        get groupOptions(): IGroupMembership[];
        get availableMembershipActions(): MembershipAction[];
        get membershipAction(): MEMBERSHIP_ACTION;
        set membershipAction(value: MEMBERSHIP_ACTION);
        get isGroupListVisible(): boolean;
        get selectedGroups(): IGroupMembership[];
        set selectedGroups(groups: IGroupMembership[]);
        updateBlockConfig(config: Partial<ISetGroupMembershipBlockConfig>): void;
        onSearchChange(e: Event): void;
        onGroupAdd(name: string): void;
        block_updateConfigByPath: ({ blockId, path, value }: {
            blockId: string;
            path: string;
            value: BlockConfigFieldType;
        }) => void;
    }
    export default GroupMembershipEditor;
}
declare module "src/store/flow/block-types/Core_SetGroupMembershipStore" {
    import { Module } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export interface IGroupOption {
        id: string;
        name: string;
    }
    export const ADD_KEY = "add";
    export const REMOVE_KEY = "remove";
    export const BLOCK_TYPE = "Core.SetGroupMembership";
    const Core_SetGroupMembershipStore: Module<IEmptyState, IRootState>;
    export default Core_SetGroupMembershipStore;
}
declare module "src/components/interaction-designer/block-editors/GroupSelector.vue" {
    import { IBlock } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    import { BlockConfigFieldType } from "src/store/flow/block";
    import { IGroupOption } from "src/store/flow/block-types/Core_SetGroupMembershipStore";
    const GroupSelector_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class GroupSelector extends GroupSelector_base {
        readonly block: IBlock;
        get selectedGroup(): IGroupOption;
        set selectedGroup(value: IGroupOption);
        block_updateConfigByPath: ({ blockId, path, value, }: {
            blockId: string;
            path: string;
            value: BlockConfigFieldType;
        }) => void;
        groups: IGroupOption[];
    }
    export default GroupSelector;
}
declare module "src/components/interaction-designer/block-editors/LabelEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock } from '@floip/flow-runner';
    const LabelEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class LabelEditor extends LabelEditor_base {
        readonly block: IBlock;
        get blockLabel(): IBlock['label'];
        set blockLabel(value: IBlock['label']);
        emitGearClickedEvent(): void;
        block_setLabel: ({ blockId, value }: {
            blockId: IBlock['uuid'];
            value: IBlock['label'];
        }) => void;
    }
    export default LabelEditor;
}
declare module "src/components/interaction-designer/block-editors/MaxDigitEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock } from '@floip/flow-runner';
    const MaxDigitEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class MaxDigitEditor extends MaxDigitEditor_base {
        readonly block: IBlock;
        readonly hasIvr: boolean;
        get maxDigits(): number;
        set maxDigits(value: number);
    }
    export default MaxDigitEditor;
}
declare module "src/components/interaction-designer/block-editors/MaxDurationSecondsEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock } from '@floip/flow-runner';
    const MaxDurationSecondsEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class MaxDurationSecondsEditor extends MaxDurationSecondsEditor_base {
        readonly block: IBlock;
        readonly hasIvr: boolean;
        readonly defaultMaxDuration = 60;
        get duration(): number;
        set duration(value: number);
        created(): void;
    }
    export default MaxDurationSecondsEditor;
}
declare module "src/components/interaction-designer/block-editors/MaximumChoicesEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { ISelectManyResponseBlock } from "node_modules/@floip/flow-runner/src/model/block/ISelectManyResponseBlock";
    import { IBlock } from '@floip/flow-runner';
    const MaximumChoicesEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class MaximumChoicesEditor extends MaximumChoicesEditor_base {
        readonly block: ISelectManyResponseBlock;
        mounted(): void;
        get maxChoices(): number | string;
        set maxChoices(value: number | string);
        setMaxChoices: ({ blockId, value }: {
            blockId: IBlock['uuid'];
            value?: number;
        }) => void;
    }
    export default MaximumChoicesEditor;
}
declare module "src/components/interaction-designer/block-editors/MaximumNumericEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock } from '@floip/flow-runner';
    const MaximumNumericEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class MaximumNumericEditor extends MaximumNumericEditor_base {
        readonly block: IBlock;
        get maxValue(): any;
        set maxValue(value: any);
    }
    export default MaximumNumericEditor;
}
declare module "src/components/interaction-designer/block-editors/MinimumChoicesEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { ISelectManyResponseBlock } from "node_modules/@floip/flow-runner/src/model/block/ISelectManyResponseBlock";
    import { IBlock } from '@floip/flow-runner';
    const MinimumChoicesEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class MinimumChoicesEditor extends MinimumChoicesEditor_base {
        readonly block: ISelectManyResponseBlock;
        mounted(): void;
        get minChoices(): number | string;
        set minChoices(value: number | string);
        setMinChoices: ({ blockId, value }: {
            blockId: IBlock['uuid'];
            value?: number;
        }) => void;
    }
    export default MinimumChoicesEditor;
}
declare module "src/components/interaction-designer/block-editors/MinimumNumericEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock } from '@floip/flow-runner';
    const MinimumNumericEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class MinimumNumericEditor extends MinimumNumericEditor_base {
        readonly block: IBlock;
        get minValue(): any;
        set minValue(value: any);
    }
    export default MinimumNumericEditor;
}
declare module "src/components/interaction-designer/block-editors/NameEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock } from '@floip/flow-runner';
    const NameEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class NameEditor extends NameEditor_base {
        editBlockName: boolean;
        readonly block: IBlock;
        get blockName(): IBlock['name'];
        set blockName(value: IBlock['name']);
        filterName(e: KeyboardEvent): void;
        handleCompleteEditing(): void;
        block_setName: ({ blockId, value, lockAutoUpdate, }: {
            blockId: IBlock['uuid'];
            value: IBlock['name'];
            lockAutoUpdate: boolean;
        }) => void;
        block_resetName: ({ blockId }: {
            blockId: IBlock['uuid'];
        }) => void;
    }
    export default NameEditor;
}
declare module "src/components/interaction-designer/block-editors/PhoneRecordingRecorderSelector.vue" {
    import Lang from "src/lib/filters/lang";
    export type Recorder = {
        name: string | null;
        phone: string | null;
        isNew: boolean;
    } | null;
    const PhoneRecordingRecorderSelector_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class PhoneRecordingRecorderSelector extends PhoneRecordingRecorderSelector_base {
        readonly isModalVisible: boolean;
        description: null;
        draft: Recorder;
        selectedRecorder: Recorder;
        created(): void;
        selectNewRecorder(): void;
        setSelectedRecorder(recorder: Recorder): void;
        reset(): void;
        handleModalClosed(): void;
        handleModalCancelled(): void;
        recorders: unknown;
    }
    export default PhoneRecordingRecorderSelector;
}
declare module "src/components/interaction-designer/block-editors/PhoneRecorder.vue" {
    import { Vue } from 'vue-property-decorator';
    import { Recorder } from "src/components/interaction-designer/block-editors/PhoneRecordingRecorderSelector.vue";
    export class PhoneRecorder extends Vue {
        readonly recordingKey: string;
        callConfig: Partial<{
            recorder: Recorder;
            description: string;
        }>;
        handleRecorderSelectionChanged(): void;
        isRecorderSelectorVisible: boolean;
        isFeatureCallToRecordEnabled: boolean;
    }
    export default PhoneRecorder;
}
declare module "src/components/interaction-designer/block-editors/SemanticLabelEditor.vue" {
    import { IBlock } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const SemanticLabelEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class SemanticLabelEditor extends SemanticLabelEditor_base {
        readonly block: IBlock;
        get semanticLabel(): IBlock['semantic_label'];
        set semanticLabel(value: IBlock['semantic_label']);
        block_setSemanticLabel: ({ blockId, value }: {
            blockId: IBlock['uuid'];
            value: IBlock['semantic_label'];
        }) => void;
    }
    export default SemanticLabelEditor;
}
declare module "src/components/interaction-designer/block-editors/TagSelector.vue" {
    import { IBlock } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const TagSelector_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class TagSelector extends TagSelector_base {
        readonly block: IBlock;
        readonly taggable: boolean;
        get selectedTags(): {
            id: string;
            name: string;
        }[];
        set selectedTags(value: {
            id: string;
            name: string;
        }[]);
        get availableTagOptions(): {
            id: string;
            name: string;
        }[];
        stringListToOptions(list: string[]): {
            id: string;
            name: string;
        }[];
        addTag(newTag: string): void;
        block_setTags: ({ blockId, value }: {
            blockId: IBlock['uuid'];
            value: string[];
        }) => void;
        block_addTag: ({ blockId, value }: {
            blockId: IBlock['uuid'];
            value: string;
        }) => void;
        blockTags: string[];
    }
    export default TagSelector;
}
declare module "src/components/interaction-designer/block-editors/ThresholdEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock } from '@floip/flow-runner';
    const ThresholdEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class ThresholdEditor extends ThresholdEditor_base {
        readonly block: IBlock;
        readonly defaultValue = 5;
        get threshold(): number;
        set threshold(value: number);
    }
    export default ThresholdEditor;
}
declare module "src/components/interaction-designer/block-editors/TimeoutEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock } from '@floip/flow-runner';
    const TimeoutEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class TimeoutEditor extends TimeoutEditor_base {
        readonly block: IBlock;
        readonly defaultValue = 120;
        get timeout(): number;
        set timeout(value: number);
    }
    export default TimeoutEditor;
}
declare module "src/components/interaction-designer/block-editors/UploadMonitor.vue" {
    import Lang from "src/lib/filters/lang";
    type Upload = {
        progress: number;
        status: Map<string, number>;
    };
    const UploadMonitor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class UploadMonitor extends UploadMonitor_base {
        readonly uploadKey: string;
        uploadsById: Record<string, Upload>;
        uploadIdsByKey: Record<string, string>;
        get upload(): Upload | null;
        get hasProgress(): boolean;
        get isFailure(): boolean;
        get progress(): number;
        created(): void;
    }
    export default UploadMonitor;
}
declare module "src/components/interaction-designer/block-editors/index" {
    export * from "src/components/interaction-designer/block-editors/choices/index";
    export * from "src/components/interaction-designer/block-editors/AdvancedExitEditor.vue";
    export * from "src/components/interaction-designer/block-editors/AdvancedExitsBuilder.vue";
    export * from "src/components/interaction-designer/block-editors/BlockEditor.vue";
    export { default as BlockId } from "src/components/interaction-designer/block-editors/BlockId.vue";
    export * from "src/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue";
    export * from "src/components/interaction-designer/block-editors/BlockOutputBranchingConfig.model";
    export * from "src/components/interaction-designer/block-editors/Categorization.vue";
    export * from "src/components/interaction-designer/block-editors/ContactPropertyEditor.vue";
    export * from "src/components/interaction-designer/block-editors/EndRecordingDigitsEditor.vue";
    export * from "src/components/interaction-designer/block-editors/ExitSemanticLabelEditor.vue";
    export * from "src/components/interaction-designer/block-editors/GenericContactPropertyEditor.vue";
    export * from "src/components/interaction-designer/block-editors/GroupMembershipEditor.vue";
    export * from "src/components/interaction-designer/block-editors/GroupSelector.vue";
    export * from "src/components/interaction-designer/block-editors/LabelEditor.vue";
    export * from "src/components/interaction-designer/block-editors/MaxDigitEditor.vue";
    export * from "src/components/interaction-designer/block-editors/MaxDurationSecondsEditor.vue";
    export * from "src/components/interaction-designer/block-editors/MaximumChoicesEditor.vue";
    export * from "src/components/interaction-designer/block-editors/MaximumNumericEditor.vue";
    export * from "src/components/interaction-designer/block-editors/MinimumChoicesEditor.vue";
    export * from "src/components/interaction-designer/block-editors/MinimumNumericEditor.vue";
    export * from "src/components/interaction-designer/block-editors/NameEditor.vue";
    export * from "src/components/interaction-designer/block-editors/PhoneRecorder.vue";
    export * from "src/components/interaction-designer/block-editors/PhoneRecordingRecorderSelector.vue";
    export * from "src/components/interaction-designer/block-editors/SemanticLabelEditor.vue";
    export * from "src/components/interaction-designer/block-editors/TagSelector.vue";
    export * from "src/components/interaction-designer/block-editors/ThresholdEditor.vue";
    export * from "src/components/interaction-designer/block-editors/TimeoutEditor.vue";
    export * from "src/components/interaction-designer/block-editors/UploadMonitor.vue";
}
declare module "src/store/flow/block-types/SmartDevices_PhotoResponseBlockStore" {
    import { Module } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export const BLOCK_TYPE = "SmartDevices.PhotoResponse";
    const SmartDevices_PhotoResponseBlockStore: Module<IEmptyState, IRootState>;
    export default SmartDevices_PhotoResponseBlockStore;
}
declare module "src/components/interaction-designer/block-types/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/interaction-designer/block-types/SmartDevices_PhotoResponseBlock.vue" {
    import { IBlock, IFlow, IResource } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const SmartDevices_PhotoResponseBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class SmartDevices_PhotoResponseBlock extends SmartDevices_PhotoResponseBlock_base {
        readonly block: IBlock;
        readonly flow: IFlow;
        readonly usesDefaultBranchingEditor: boolean;
        readonly usesDefaultContactPropsEditor: boolean;
        get promptResource(): IResource;
        resourcesByUuidOnActiveFlow: {
            [key: string]: IResource;
        };
        isEditable: boolean;
        handleBranchingTypeChangedToUnified: ({ block }: {
            block: IBlock;
        }) => void;
    }
    export default SmartDevices_PhotoResponseBlock;
    export const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
}
declare module "src/store/flow/block-types/SmartDevices_LocationResponseBlockStore" {
    import { Module } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export const BLOCK_TYPE = "SmartDevices.LocationResponse";
    const SmartDevices_LocationResponseBlockStore: Module<IEmptyState, IRootState>;
    export default SmartDevices_LocationResponseBlockStore;
}
declare module "src/components/interaction-designer/block-types/SmartDevices_LocationResponseBlock.vue" {
    import { IBlock, IFlow, IResource } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const SmartDevices_LocationResponseBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class SmartDevices_LocationResponseBlock extends SmartDevices_LocationResponseBlock_base {
        readonly block: IBlock;
        readonly flow: IFlow;
        readonly usesDefaultBranchingEditor: boolean;
        readonly usesDefaultContactPropsEditor: boolean;
        updateThreshold(value: number): void;
        updateTimeout(value: number): void;
        get promptResource(): IResource;
        resourcesByUuidOnActiveFlow: {
            [key: string]: IResource;
        };
        setAccuracyThreshold: ({ blockId, value }: {
            blockId: IBlock['uuid'];
            value: number;
        }) => Promise<string>;
        setAccuracyTimeout: ({ blockId, value }: {
            blockId: IBlock['uuid'];
            value: number;
        }) => Promise<string>;
        handleBranchingTypeChangedToUnified: ({ block }: {
            block: IBlock;
        }) => void;
        isEditable: boolean;
    }
    export default SmartDevices_LocationResponseBlock;
    export const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
}
declare module "src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue" {
    import { IBlock, IFlow, IResource, SupportedMode } from '@floip/flow-runner';
    import { ISelectOneResponseBlock } from "node_modules/@floip/flow-runner/src/model/block/ISelectOneResponseBlock";
    import Lang from "src/lib/filters/lang";
    import { findOrGenerateStubbedVariantOn } from "src/store/flow/resource";
    const MobilePrimitives_SelectOneResponseBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class MobilePrimitives_SelectOneResponseBlock extends MobilePrimitives_SelectOneResponseBlock_base {
        readonly block: ISelectOneResponseBlock;
        readonly flow: IFlow;
        readonly usesDefaultBranchingEditor: boolean;
        readonly usesDefaultContactPropsEditor: boolean;
        SupportedMode: typeof SupportedMode;
        findOrGenerateStubbedVariantOn: typeof findOrGenerateStubbedVariantOn;
        get promptResource(): IResource | undefined;
        handleChoiceChanged(): void;
        reflowExitsWhenSwitchingToBranchingTypeNotUnified(): void;
        resourcesByUuidOnActiveFlow: {
            [key: string]: IResource;
        };
        reflowExitsFromChoices: ({ blockId }: {
            blockId: IBlock['uuid'];
        }) => void;
        handleBranchingTypeChangedToUnified: ({ block }: {
            block: IBlock;
        }) => void;
    }
    export default MobilePrimitives_SelectOneResponseBlock;
    export const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
}
declare module "src/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue" {
    import { IBlock } from '@floip/flow-runner';
    import SelectOneResponseBlock from "src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue";
    export class MobilePrimitives_SelectManyResponseBlock extends SelectOneResponseBlock {
        isEditable: boolean;
        handleBranchingTypeChangedToUnified: ({ block }: {
            block: IBlock;
        }) => void;
    }
    export default MobilePrimitives_SelectManyResponseBlock;
    export const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
}
declare module "src/store/flow/block-types/MobilePrimitives_OpenResponseBlockStore" {
    import { Module } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export const BLOCK_TYPE = "MobilePrimitives.OpenResponse";
    const MobilePrimitives_OpenResponseBlockStore: Module<IEmptyState, IRootState>;
    export default MobilePrimitives_OpenResponseBlockStore;
}
declare module "src/components/interaction-designer/block-types/MobilePrimitives_OpenResponseBlock.vue" {
    import { IBlock, IFlow, IResource } from '@floip/flow-runner';
    import { IOpenResponseBlock } from "node_modules/@floip/flow-runner/src/model/block/IOpenResponseBlock";
    import Lang from "src/lib/filters/lang";
    const MobilePrimitives_OpenResponseBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    class MobilePrimitives_OpenResponseBlock extends MobilePrimitives_OpenResponseBlock_base {
        readonly block: IOpenResponseBlock;
        readonly flow: IFlow;
        readonly usesDefaultBranchingEditor: boolean;
        readonly usesDefaultContactPropsEditor: boolean;
        get promptResource(): IResource;
        resourcesByUuidOnActiveFlow: {
            [key: string]: IResource;
        };
        hasTextMode: boolean;
        hasVoiceMode: boolean;
        setMaxDurationSeconds: (newDuration: number) => Promise<void>;
        setEndRecordingDigits: (endRecordingDigits: string) => Promise<void>;
        handleBranchingTypeChangedToUnified: ({ block }: {
            block: IBlock;
        }) => void;
        isEditable: boolean;
    }
    export default MobilePrimitives_OpenResponseBlock;
    export const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
}
declare module "src/store/flow/block-types/MobilePrimitives_NumericResponseBlockStore" {
    import { Module } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export const BLOCK_TYPE = "MobilePrimitives.NumericResponse";
    export function normalizeNumericConfigProperty(value?: number | string | null): [number, boolean];
    const MobilePrimitives_NumericResponseBlockStore: Module<IEmptyState, IRootState>;
    export default MobilePrimitives_NumericResponseBlockStore;
}
declare module "src/components/interaction-designer/block-types/MobilePrimitives_NumericResponseBlock.vue" {
    import { IBlock, IFlow, IResource } from '@floip/flow-runner';
    import { INumericResponseBlock } from "node_modules/@floip/flow-runner/src/model/block/INumericResponseBlock";
    import Lang from "src/lib/filters/lang";
    const MobilePrimitives_NumericResponseBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class MobilePrimitives_NumericResponseBlock extends MobilePrimitives_NumericResponseBlock_base {
        readonly block: INumericResponseBlock;
        readonly flow: IFlow;
        readonly usesDefaultBranchingEditor: boolean;
        readonly usesDefaultContactPropsEditor: boolean;
        get promptResource(): IResource;
        updateValidationMin(value: number | string): void;
        updateValidationMax(value: number | string): void;
        updateMaxDigits(value: number | string): void;
        resourcesByUuidOnActiveFlow: {
            [key: string]: IResource;
        };
        hasVoiceMode: boolean;
        setValidationMinimum: ({ blockId, value, }: {
            blockId: IBlock['uuid'];
            value: number | string;
        }) => Promise<string>;
        setValidationMaximum: ({ blockId, value, }: {
            blockId: IBlock['uuid'];
            value: number | string;
        }) => Promise<string>;
        setMaxDigits: ({ blockId, value }: {
            blockId: IBlock['uuid'];
            value: number | string;
        }) => Promise<string>;
        handleBranchingTypeChangedToUnified: ({ block }: {
            block: IBlock;
        }) => void;
        isEditable: boolean;
    }
    export default MobilePrimitives_NumericResponseBlock;
    export const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
}
declare module "src/store/flow/block-types/MobilePrimitives_MessageBlockStore" {
    import { Module } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export const BLOCK_TYPE = "MobilePrimitives.Message";
    export const MobilePrimitives_MessageBlockStore: Module<IEmptyState, IRootState>;
    export default MobilePrimitives_MessageBlockStore;
}
declare module "src/components/interaction-designer/block-types/MobilePrimitives_MessageBlock.vue" {
    import { IBlock, IFlow, IResource } from '@floip/flow-runner';
    import { IMessageBlock } from "node_modules/@floip/flow-runner/src/model/block/IMessageBlock";
    import Lang from "src/lib/filters/lang";
    const MobilePrimitives_MessageBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    class MobilePrimitives_MessageBlock extends MobilePrimitives_MessageBlock_base {
        readonly block: IMessageBlock;
        readonly flow: IFlow;
        readonly usesDefaultBranchingEditor: boolean;
        readonly usesDefaultContactPropsEditor: boolean;
        get promptResource(): IResource;
        resourcesByUuidOnActiveFlow: {
            [key: string]: IResource;
        };
        isEditable: boolean;
        handleBranchingTypeChangedToUnified: ({ block }: {
            block: IBlock;
        }) => void;
    }
    export default MobilePrimitives_MessageBlock;
    export const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
}
declare module "src/store/flow/block-types/Core_CaseBlockStore" {
    import { Module } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export const BLOCK_TYPE = "Core.Case";
    const Core_CaseBlockStore: Module<IEmptyState, IRootState>;
    export default Core_CaseBlockStore;
}
declare module "src/components/interaction-designer/block-types/Core_CaseBlock.vue" {
    import { ICaseBlock } from "node_modules/@floip/flow-runner/src/model/block/ICaseBlock";
    import { IBlockExit, IFlow } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const Core_CaseBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class Core_CaseBlock extends Core_CaseBlock_base {
        readonly block: ICaseBlock;
        readonly flow: IFlow;
        readonly usesDefaultBranchingEditor: boolean;
        readonly usesDefaultContactPropsEditor: boolean;
        get exits(): IBlockExit[];
        isEditable: boolean;
    }
    export default Core_CaseBlock;
    export const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
}
declare module "src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock, IFlow, IGroupMembership } from '@floip/flow-runner';
    const Core_SetGroupMembershipBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class Core_SetGroupMembershipBlock extends Core_SetGroupMembershipBlock_base {
        readonly block: IBlock;
        readonly flow: IFlow;
        readonly usesDefaultBranchingEditor: boolean;
        readonly usesDefaultContactPropsEditor: boolean;
        /**
         * The availableGroups and hasGroupsLoading are forwarded to group-membership-editor as is.
         * @see group-membership-editor for details of use
         */
        readonly availableGroups?: IGroupMembership[];
        readonly hasGroupsLoading?: boolean;
        handleBranchingTypeChangedToUnified: ({ block }: {
            block: IBlock;
        }) => void;
    }
    export default Core_SetGroupMembershipBlock;
    export const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
}
declare module "src/store/flow/block-types/Core_RunFlowBlockStore" {
    import { Module } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export const BLOCK_TYPE = "Core.RunFlow";
    const Core_RunFlowBlockStore: Module<IEmptyState, IRootState>;
    export default Core_RunFlowBlockStore;
}
declare module "src/components/interaction-designer/block-types/Core_RunFlowBlock.vue" {
    import { IRunFlowBlock } from "node_modules/@floip/flow-runner/src/model/block/IRunFlowBlock";
    import { IBlock, IFlow } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const Core_RunAnotherFlowBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class Core_RunAnotherFlowBlock extends Core_RunAnotherFlowBlock_base {
        readonly block: IRunFlowBlock;
        readonly flow: IFlow;
        readonly usesDefaultBranchingEditor: boolean;
        readonly usesDefaultContactPropsEditor: boolean;
        get destinationFlowId(): string;
        setDestinationFlowId: ({ blockId, newDestinationFlowId }: {
            blockId: string;
            newDestinationFlowId: string | undefined;
        }) => Promise<string>;
        set destinationFlowId(newDestinationFlowId: string);
        handleBranchingTypeChangedToUnified: ({ block }: {
            block: IBlock;
        }) => void;
        isEditable: boolean;
    }
    export default Core_RunAnotherFlowBlock;
    export const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
}
declare module "src/store/flow/block-types/Core_LogBlockStore" {
    import { Module } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export const BLOCK_TYPE = "Core.Log";
    const Core_LogBlockStore: Module<IEmptyState, IRootState>;
    export default Core_LogBlockStore;
}
declare module "src/components/interaction-designer/block-types/Core_LogBlock.vue" {
    import { IFlow, IBlock } from '@floip/flow-runner';
    import { ILogBlock } from "node_modules/@floip/flow-runner/src/model/block/ILogBlock";
    import Lang from "src/lib/filters/lang";
    const Core_LogBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class Core_LogBlock extends Core_LogBlock_base {
        readonly block: ILogBlock;
        readonly flow: IFlow;
        readonly usesDefaultBranchingEditor: boolean;
        readonly usesDefaultContactPropsEditor: boolean;
        get value(): string;
        commitMessageChange(value: string): Promise<string>;
        editMessage: (params: {
            blockId: IBlock['uuid'];
            message: string;
        }) => Promise<string>;
        handleBranchingTypeChangedToUnified: ({ block }: {
            block: IBlock;
        }) => void;
        isEditable: boolean;
    }
    export default Core_LogBlock;
    export const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
}
declare module "src/store/flow/block-types/Core_OutputBlockStore" {
    import { Module } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export const BLOCK_TYPE = "Core.Output";
    const Core_OutputBlockStore: Module<IEmptyState, IRootState>;
    export default Core_OutputBlockStore;
}
declare module "src/components/interaction-designer/block-types/Core_OutputBlock.vue" {
    import { IOutputBlock } from "node_modules/@floip/flow-runner/src/model/block/IOutputBlock";
    import { IBlock, IFlow } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const Core_OutputBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class Core_OutputBlock extends Core_OutputBlock_base {
        readonly block: IOutputBlock;
        readonly flow: IFlow;
        readonly usesDefaultBranchingEditor: boolean;
        readonly usesDefaultContactPropsEditor: boolean;
        readonly expressionEditorRows: number;
        get value(): string;
        editOutputExpression: (params: {
            blockId: IBlock['uuid'];
            value: string;
        }) => Promise<string>;
        handleBranchingTypeChangedToUnified: ({ block }: {
            block: IBlock;
        }) => void;
        isEditable: boolean;
        commitExpressionChange(value: string): Promise<string>;
    }
    export default Core_OutputBlock;
    export const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
}
declare module "src/store/flow/block-types/Core_SetContactPropertyStore" {
    import { Module } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IEmptyState } from "src/store/flow/block-types/BaseBlock";
    export const BLOCK_TYPE = "Core.SetContactProperty";
    const Core_SetContactPropertyStore: Module<IEmptyState, IRootState>;
    export default Core_SetContactPropertyStore;
}
declare module "src/components/interaction-designer/block-types/Core_SetContactPropertyBlock.vue" {
    import { IBlock, IFlow } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const Core_SetContactPropertyBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class Core_SetContactPropertyBlock extends Core_SetContactPropertyBlock_base {
        readonly block: IBlock;
        readonly flow: IFlow;
        readonly usesDefaultBranchingEditor: boolean;
        readonly usesDefaultContactPropsEditor: boolean;
        handleBranchingTypeChangedToUnified: ({ block }: {
            block: IBlock;
        }) => void;
    }
    export default Core_SetContactPropertyBlock;
    export const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
}
declare module "src/components/interaction-designer/block-types/BaseBlock.vue" {
    import { IBlock, IFlow } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const BaseBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class BaseBlock extends BaseBlock_base {
        readonly block: IBlock;
        readonly flow: IFlow;
        readonly usesDefaultBranchingEditor: boolean;
        readonly usesDefaultContactPropsEditor: boolean;
        showSemanticLabel: boolean;
        handleBranchingTypeChangedToUnified(): void;
        isEditable: boolean;
    }
    export default BaseBlock;
}
declare module "src/components/interaction-designer/block-types/index" {
    export { default as SmartDevices_PhotoResponseBlock, install as photoResponseBlockIntstaller, } from "src/components/interaction-designer/block-types/SmartDevices_PhotoResponseBlock.vue";
    export { default as SmartDevices_LocationResponseBlock, install as locationResponseBlockInstaller, } from "src/components/interaction-designer/block-types/SmartDevices_LocationResponseBlock.vue";
    export { default as MobilePrimitives_SelectOneResponseBlock, install as selectOneResponseBlockInstaller, } from "src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue";
    export { default as MobilePrimitives_SelectManyResponseBlock, install as selectManyResponseBlockInstaller, } from "src/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue";
    export { default as MobilePrimitives_OpenResponseBlock, install as openResponseBlockInstaller, } from "src/components/interaction-designer/block-types/MobilePrimitives_OpenResponseBlock.vue";
    export { default as MobilePrimitives_NumericResponseBlock, install as numericResponseBlockInstaller, } from "src/components/interaction-designer/block-types/MobilePrimitives_NumericResponseBlock.vue";
    export { default as MobilePrimitives_MessageBlock, install as messageBlockInstaller, } from "src/components/interaction-designer/block-types/MobilePrimitives_MessageBlock.vue";
    export { default as Core_CaseBlock, install as caseBlockInstaller, } from "src/components/interaction-designer/block-types/Core_CaseBlock.vue";
    export { default as Core_SetGroupMembershipBlock, install as setGroupMembershipBlockInstaller, } from "src/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue";
    export { default as Core_RunFlowBlock, install as runFlowBlockInstaller, } from "src/components/interaction-designer/block-types/Core_RunFlowBlock.vue";
    export { default as Core_LogBlock, install as logBlockInstaller, } from "src/components/interaction-designer/block-types/Core_LogBlock.vue";
    export { default as Core_OutputBlock, install as outputBlockInstaller, } from "src/components/interaction-designer/block-types/Core_OutputBlock.vue";
    export { default as Core_SetContactPropertyBlock, install as setContactPropertyBlockInstaller, } from "src/components/interaction-designer/block-types/Core_SetContactPropertyBlock.vue";
    export * from "src/components/interaction-designer/block-types/BaseBlock.vue";
}
declare module "src/components/interaction-designer/flow-editors/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/interaction-designer/flow-editors/ExitBlockEditorToggle.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock, IFlow } from '@floip/flow-runner';
    const ExitBlockEditorToggle_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class ExitBlockEditorToggle extends ExitBlockEditorToggle_base {
        readonly flow: IFlow;
        readonly blockId: IBlock['uuid'];
        readonly isEditable: boolean;
        readonly hasClipboard: boolean;
        get isExitBlock(): boolean;
        toggleExitBlock(): void;
        flow_setExitBlockId: ({ flowId, blockId }: {
            flowId: string;
            blockId: IBlock['uuid'];
        }) => void;
    }
    export default ExitBlockEditorToggle;
}
declare module "src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue" {
    import { IBlock, IFlow } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const FirstBlockEditorButton_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class FirstBlockEditorButton extends FirstBlockEditorButton_base {
        readonly isEditable: boolean;
        readonly blockId: IBlock['uuid'];
        readonly flow: IFlow;
        get isStartBlock(): boolean;
        setStartBlock(event: any): void;
        flow_setFirstBlockId: ({ flowId, blockId }: {
            flowId: IFlow['uuid'];
            blockId: IBlock['uuid'];
        }) => void;
    }
    export default FirstBlockEditorButton;
}
declare module "src/components/interaction-designer/flow-editors/FlowEditor.vue" {
    import { IFlow, IResource, ILanguage, SupportedMode } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const FlowEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class FlowEditor extends FlowEditor_base {
        readonly flow: IFlow;
        readonly flowHeader: string;
        readonly isOnSmallContainer: boolean;
        readonly didUserSubmit: boolean;
        get hasDefaultInteractionTimeout(): boolean;
        get firstRowClass(): string;
        get otherRowsClass(): string;
        updateFlowLanguages(value: ILanguage[] | ILanguage): Promise<void>;
        block_updateAllBlocksAfterAddingFlowLanguage: ({ language }: {
            language: ILanguage;
        }) => void;
        block_updateAllBlocksAfterDeletingFlowLanguage: ({ language }: {
            language: ILanguage;
        }) => void;
        updateFlowModes(value: SupportedMode[] | SupportedMode): Promise<void>;
        ui: any;
        activeFlow: IFlow;
        flow_setLanguages: ({ flowId, value }: {
            flowId: string;
            value: ILanguage | ILanguage[];
        }) => void;
        flow_setSupportedMode: any;
        handleFlowLanguagesAdded(value: ILanguage): void;
        handleFlowLanguagesRemoved(value: ILanguage): void;
        isEditable: boolean;
        validate_allBlocksWithinFlow: () => Promise<void>;
        validate_resourcesOnSupportedValues: ({ resources, supportedModes, supportedLanguages }: {
            resources: IResource[];
            supportedModes: SupportedMode[];
            supportedLanguages: ILanguage[];
        }) => Promise<void>;
    }
    export default FlowEditor;
}
declare module "src/components/interaction-designer/flow-editors/InteractionTimeoutEditor.vue" {
    import { IFlow } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const InteractionTimeoutEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class InteractionTimeoutEditor extends InteractionTimeoutEditor_base {
        readonly flow: IFlow;
        validState?: boolean;
        get interactionTimeout(): number;
        set interactionTimeout(value: number);
        flow_setInteractionTimeout: ({ flowId, value, }: {
            flowId: IFlow['uuid'];
            value: IFlow['interaction_timeout'];
        }) => void;
    }
    export default InteractionTimeoutEditor;
}
declare module "src/components/interaction-designer/flow-editors/FlowLabelEditor.vue" {
    import { IBlock, IFlow } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const FlowLabelEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class FlowLabelEditor extends FlowLabelEditor_base {
        readonly flow: IFlow;
        validState?: boolean;
        get isInvalid(): boolean;
        get label(): IBlock['label'];
        set label(label: IBlock['label']);
        flow_setLabel: ({ flowId, label }: {
            flowId: IFlow['uuid'];
            label: IFlow['label'];
        }) => void;
        flow_setNameFromLabel: ({ flowId, label }: {
            flowId: IFlow['uuid'];
            label: IFlow['label'];
        }) => void;
    }
    export default FlowLabelEditor;
}
declare module "src/components/interaction-designer/flow-editors/LanguagesEditor.vue" {
    import { IFlow } from '@floip/flow-runner';
    import { ILanguage } from '@floip/flow-runner/dist/flow-spec/ILanguage';
    import Lang from "src/lib/filters/lang";
    const LanguagesEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class LanguagesEditor extends LanguagesEditor_base {
        readonly flow: IFlow;
        onLanguagesChange(newValue: ILanguage[], oldValue: ILanguage[]): void;
        get languages(): ILanguage[];
        get flowSelectedLanguages(): ILanguage[];
        set flowSelectedLanguages(value: ILanguage[]);
        ui: any;
    }
    export default LanguagesEditor;
}
declare module "src/components/interaction-designer/flow-editors/ModesEditor.vue" {
    import { IFlow, SupportedMode } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const ModesEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class ModesEditor extends ModesEditor_base {
        readonly flow: IFlow;
        get flowSelectedModes(): SupportedMode[];
        set flowSelectedModes(value: SupportedMode[]);
        supportedModes: SupportedMode[];
    }
    export default ModesEditor;
}
declare module "src/components/interaction-designer/flow-editors/index" {
    export * from "src/components/interaction-designer/flow-editors/ExitBlockEditorToggle.vue";
    export * from "src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue";
    export * from "src/components/interaction-designer/flow-editors/FlowEditor.vue";
    export * from "src/components/interaction-designer/flow-editors/InteractionTimeoutEditor.vue";
    export * from "src/components/interaction-designer/flow-editors/FlowLabelEditor.vue";
    export * from "src/components/interaction-designer/flow-editors/LanguagesEditor.vue";
    export * from "src/components/interaction-designer/flow-editors/ModesEditor.vue";
}
declare module "src/components/interaction-designer/flow-editors/import/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/interaction-designer/flow-editors/import/ImportMatcher.vue" {
    import { IContext } from '@floip/flow-runner';
    import Lang from "src/lib/filters/lang";
    const ImportMatcher_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class ImportMatcher extends ImportMatcher_base {
        readonly matchNotFoundText: string;
        readonly type: string;
        readonly typeId: string;
        readonly typeLabel: string;
        readonly missingMatches: any[];
        readonly existingOptionsWithoutMatch: any[];
        mappings: {
            [key: string]: string;
        };
        getLabel(missingMatch: {
            [key: string]: string;
        }): string;
        getIdentifier(missingMatch: {
            [key: string]: string;
        }): string;
        updateMappings(missingMatch: {
            [key: string]: string;
        }, event: {
            target: {
                value: string;
            };
        }): void;
        get mappingsEmpty(): boolean;
        handleMatch(missingMatch: {
            [key: string]: string;
        }): void;
        tryToFixLanguages: (flowContainer: IContext) => Promise<void>;
        isFeatureAddLanguageOnImportEnabled: boolean;
        onLanguageAddition(): Promise<void>;
        flowContainer: IContext;
    }
    export default ImportMatcher;
}
declare module "src/components/interaction-designer/flow-editors/import/LanguageAdder.vue" {
    import Lang from "src/lib/filters/lang";
    import Routes from "src/lib/mixins/Routes";
    import { ILanguage } from '@floip/flow-runner';
    const LanguageAdder_base: import("vue-class-component/lib/declarations").VueClass<Lang & Routes>;
    export class LanguageAdder extends LanguageAdder_base {
        newLanguage: ILanguage;
        selected_iso_639_3: any;
        selected_iso_3166_1: any;
        iso_639_3Tags: any[];
        resetLanguage(): void;
        showAddLanguageModal(): void;
        customLanguageLabel(option: any): string;
        customLocaleLabel(option: any): string;
        iso_3166_1Locales(): object[];
        set iso_639_3(selection: any);
        get iso_639_3(): string;
        set iso_3166_1(selection: any);
        get iso_3166_1(): string;
        set variant(value: string);
        get variant(): string;
        filterVariant(e: KeyboardEvent): void;
        updateBCP47(): void;
        handleCreateLanguage(): Promise<void>;
        validateAndAddOrgLanguage: ({ language, persistRoute }: {
            language: ILanguage;
            persistRoute: string;
        }) => Promise<boolean | ILanguage>;
        locale: string;
        validation_removeNewLanguageValidation: () => Promise<void>;
    }
    export default LanguageAdder;
}
declare module "src/components/interaction-designer/flow-editors/import/index" {
    export * from "src/components/interaction-designer/flow-editors/import/ImportMatcher.vue";
    export * from "src/components/interaction-designer/flow-editors/import/LanguageAdder.vue";
    export * from './TechErrorNotifications.vue';
    export * from './ErrorHandlerV2.vue';
    export * from './FullImportMatcher.vue';
}
declare module "src/components/interaction-designer/toolbar/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/interaction-designer/toolbar/BlockErrorsExpandable.vue" {
    import { IValidationStatus } from "src/store/validation/index";
    import Lang from "src/lib/filters/lang";
    import { ErrorObject } from 'ajv';
    import { IBlock, IFlow, IResource } from '@floip/flow-runner';
    const BlockErrorsExpandable_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class BlockErrorsExpandable extends BlockErrorsExpandable_base {
        readonly block: IBlock;
        isExpanded: boolean;
        get errorsToShow(): ErrorObject[];
        /**
         * get allErrors to consider errors from:
         * - block validation
         * - resource validation
         */
        get allErrors(): ErrorObject[];
        get isListLong(): boolean;
        get blockLabel(): string;
        get currentBlockResourceUuids(): IResource['uuid'][];
        get resourceValidationStatusesForCurrentBlock(): ErrorObject[];
        get backendResourceValidationStatusesForCurrentBlock(): ErrorObject[];
        get backendBlockValidationStatusesForCurrentBlock(): ErrorObject[];
        get blockValidationStatusesForCurrentBlock(): ErrorObject[];
        getAjvErrorsFor(type: 'block' | 'resource' | 'backend/block' | 'backend/resource', uuid: string): ErrorObject[];
        toggleList(): void;
        validationStatuses: {
            [key: string]: IValidationStatus;
        };
        activeFlow?: IFlow;
    }
    export default BlockErrorsExpandable;
}
declare module "src/components/interaction-designer/toolbar/ErrorNotifications.vue" {
    import Lang from "src/lib/filters/lang";
    import { IValidationStatus } from "src/store/validation/index";
    import Routes from "src/lib/mixins/Routes";
    import { IBlock, IFlow, IResource } from '@floip/flow-runner';
    import { ErrorObject } from 'ajv';
    const ErrorNotifications_base: import("vue-class-component/lib/declarations").VueClass<Lang & Routes>;
    export class ErrorNotifications extends ErrorNotifications_base {
        updated(): void;
        get flowValidationErrors(): ErrorObject[];
        /**
         * block validation statuses for active flow only
         */
        get blockValidationStatuses(): {
            [key: string]: IValidationStatus;
        };
        hasBlockValidationErrors(uuid: string): boolean;
        hasResourceValidationErrors(uuidOrUuids: string | string[]): boolean;
        isBlockInvalid(block: IBlock): boolean;
        get invalidBlocksInActiveFlow(): IBlock[];
        get numberOfBlocksWithErrors(): number;
        fixFlowError(): Promise<void>;
        fixBlockError(blockId: string, dataPath: string): Promise<void>;
        validationStatuses: {
            [key: string]: IValidationStatus;
        };
        activeFlow?: IFlow;
        resourceUuidsOnActiveFlow: IResource['uuid'][];
    }
    export default ErrorNotifications;
}
declare module "src/components/interaction-designer/toolbar/SelectionBanner.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock } from '@floip/flow-runner';
    const SelectionBanner_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class SelectionBanner extends SelectionBanner_base {
        deleting: boolean;
        updated(): void;
        get countSelectedBlocks(): number;
        confirmMultipleDeletion(): Promise<void>;
        handleMultipleDuplicate(): Promise<void>;
        selectedBlocks: IBlock['uuid'][];
        flow_clearMultiSelection: () => Promise<void>;
        flow_removeAllSelectedBlocks: () => Promise<void>;
        flow_duplicateAllSelectedBlocks: () => Promise<void>;
    }
    export default SelectionBanner;
}
declare module "src/components/interaction-designer/toolbar/TreeBuilderToolbar.vue" {
    import Lang from "src/lib/filters/lang";
    import Permissions from "src/lib/mixins/Permissions";
    import Routes from "src/lib/mixins/Routes";
    import { IBlock, IContext, IFlow, IResource } from '@floip/flow-runner';
    import { RawLocation } from 'vue-router';
    import { Dictionary } from 'vue-router/types/router';
    const TreeBuilderToolbar_base: import("vue-class-component/lib/declarations").VueClass<Lang & Permissions & Routes>;
    export class TreeBuilderToolbar extends TreeBuilderToolbar_base {
        isExportVisible: boolean;
        height: number;
        private readonly SAVING_ANIMATION_DURATION;
        mounted(): Promise<void>;
        onMetaChanged(meta: {
            [key: string]: string;
        }): void;
        isEmpty(value?: unknown): boolean;
        get flow(): string;
        get resourceViewUrl(): string;
        get downloadAudioUrl(): string;
        get editTreeUrl(): string;
        get viewTreeUrl(): string;
        get saveButtonText(): string;
        get isSavingDisabled(): boolean;
        get blockClassesForContentCategory(): any;
        get blockClassesForContactCategory(): any;
        get blockClassesForBranchingCategory(): any;
        get blockClassesForDeveloperCategory(): any;
        get canViewResultsTotals(): boolean;
        get hasSimulator(): boolean;
        handleAddBlockByTypeSelected({ type }: {
            type: IBlock['type'];
        }): Promise<void>;
        handlePersistFlow(route: RawLocation): Promise<void>;
        showOrHideEditFlowModal(): void;
        openDropdownMenu(targetElement: HTMLElement): void;
        toggleExportVisibility(): void;
        editTreeRoute({ component, mode }?: {
            component?: any;
            mode?: string | null;
        }): string;
        hasClassDetail(classDetails: {
            [key: string]: any;
        }, attribute: string): boolean;
        hasMenuCategory(classDetails: {
            [key: string]: any;
        }, category: number): boolean;
        translateTreeClassName(className: string): string;
        shouldDisplayDividerBefore(blockClasses: {
            [key: string]: any;
        }, className: string): string;
        handleResourceViewerSelected(): void;
        removeNilValues(obj: any): Dictionary<unknown>;
        /**
         * We have to make sure this is called using $nextTick() because we play with DOM
         */
        handleHeightChangeFromDOM(): void;
        tree: any;
        ui: any;
        hasToolbarFlowTitle: boolean;
        hasToolbarHomeButton: boolean;
        hasToolbarNewFlowButton: boolean;
        hasToolbarExportButton: boolean;
        isTreeSaving: boolean;
        isBlockAvailableByBlockClass?: any;
        hasChanges: boolean;
        isTreeValid: boolean;
        selectedBlock?: IBlock;
        isFeatureTreeSaveEnabled?: boolean;
        isFeatureTreeSendEnabled?: boolean;
        isFeatureTreeDuplicateEnabled?: boolean;
        isFeatureViewResultsEnabled?: boolean;
        isFeatureSimulatorEnabled?: boolean;
        isFeatureUpdateInteractionTotalsEnabled?: boolean;
        isResourceEditorEnabled?: boolean;
        setTreeSaving: (isSaving: boolean) => void;
        attemptSaveTree: void;
        getToolbarConfig: boolean;
        activeFlow: IFlow;
        activeFlowContainer?: IContext;
        hasOfflineMode?: boolean;
        isActiveFlowValid?: boolean;
        flows?: IFlow[];
        resources?: IResource[];
        flow_removeBlock: ({ flowId, blockId }: {
            flowId?: string;
            blockId?: IBlock['uuid'];
        }) => void;
        flow_addBlankBlockByType: ({ type, ...props }: Partial<IBlock>) => Promise<IBlock>;
        flow_duplicateBlock: ({ flowId, blockId, }: {
            flowId?: string;
            blockId?: IBlock['uuid'];
        }) => Promise<IBlock>;
        flow_persist: ({ persistRoute, flowContainer, }: {
            persistRoute: any;
            flowContainer?: IContext;
        }) => Promise<IContext | null>;
        isEditable: boolean;
        hasFlowChanges: boolean;
        activeBlockId?: IBlock['uuid'];
        activeBlock?: IBlock;
        activateBlock: ({ blockId }: {
            blockId: IBlock['uuid'] | null;
        }) => void;
        setSimulatorActive: (value: boolean) => void;
        remove_block_validation: ({ blockId }: {
            blockId?: IBlock['uuid'];
        }) => void;
    }
    export default TreeBuilderToolbar;
}
declare module "src/components/interaction-designer/toolbar/index" {
    export * from "src/components/interaction-designer/toolbar/BlockErrorsExpandable.vue";
    export * from "src/components/interaction-designer/toolbar/ErrorNotifications.vue";
    export * from "src/components/interaction-designer/toolbar/SelectionBanner.vue";
    export * from "src/components/interaction-designer/toolbar/TreeBuilderToolbar.vue";
}
declare module "src/components/interaction-designer/blocks/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/interaction-designer/blocks/BlockToolbar.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock } from '@floip/flow-runner';
    const BlockToolbar_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class BlockToolbar extends BlockToolbar_base {
        readonly block: IBlock;
        readonly isBlockSelected: boolean;
        readonly isEditorVisible: boolean;
        readonly isWaitingForConnection: boolean;
        readonly isActivatedByConnection: boolean;
        isDeleting: boolean;
        handleDeleteBlock(): void;
        handleDuplicateBlock(): void;
        handleExpandMinimizeBlockEditor(): void;
        isEditable: boolean;
        setIsBlockEditorOpen: (value: boolean) => void;
        block_select: ({ blockId }: {
            blockId: IBlock['uuid'];
        }) => void;
        block_deselect: ({ blockId }: {
            blockId: IBlock['uuid'];
        }) => void;
        flow_removeBlock: ({ blockId }: {
            blockId: IBlock['uuid'];
        }) => void;
        flow_duplicateBlock: ({ blockId }: {
            blockId: IBlock['uuid'];
        }) => Promise<IBlock>;
        removeValidationStatusesFor: ({ key }: {
            key: string;
        }) => void;
    }
    export default BlockToolbar;
}
declare module "src/components/interaction-designer/blocks/index" {
    export * from "src/components/interaction-designer/blocks/BlockToolbar.vue";
}
declare module "src/components/resource-editor/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/resource-editor/BatchMatchAudioFilesPrompt.vue" {
    import { IBatchMatchAudioData } from "src/lib/types";
    const BatchMatchAudioFilesPrompt_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
    export class BatchMatchAudioFilesPrompt extends BatchMatchAudioFilesPrompt_base {
        readonly focus: boolean;
        readonly data: IBatchMatchAudioData;
        readonly isAudioLibraryEmpty?: boolean;
        pattern: string;
        replaceExisting: boolean;
        expanded: boolean;
        get disabled(): boolean;
        get isValid(): boolean;
        cancel(): void;
        confirm(): void;
        toggleExpanded(): void;
    }
    export default BatchMatchAudioFilesPrompt;
}
declare module "src/components/resource-editor/BlockContentEditorUnsupported.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlock } from '@floip/flow-runner';
    const BlockContentEditorUnsupported_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class BlockContentEditorUnsupported extends BlockContentEditorUnsupported_base {
        readonly block?: IBlock;
    }
    export default BlockContentEditorUnsupported;
}
declare module "src/components/resource-editor/HorizontalBlockContentEditor.vue" {
    import Lang from "src/lib/filters/lang";
    import { IBlockExtended } from "src/lib/types";
    const HorizontalBlockContentEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class HorizontalBlockContentEditor extends HorizontalBlockContentEditor_base {
        alternateAudioFileSelections: unknown;
        tree: unknown;
        block: IBlockExtended;
        enabledLanguages: string[];
        languageNames: Record<string, string>;
        isEditable: boolean;
        audioFiles: unknown;
        debouncedSaveTree: () => void;
        constructor();
        selectAudioFileFor({ langId, value }: {
            langId: string;
            value: boolean;
        }): void;
        toggleReviewedStateFor(langId: string): void;
    }
    export default HorizontalBlockContentEditor;
}
declare module "src/components/resource-editor/index" {
    export * from "src/components/resource-editor/BatchMatchAudioFilesPrompt.vue";
    export * from "src/components/resource-editor/BlockContentEditorUnsupported.vue";
    export * from "src/components/resource-editor/HorizontalBlockContentEditor.vue";
}
declare module "src/common-imports" {
    export default function registerCustomComponents(extra?: {}): Record<string, any>;
}
declare module "src/lib/custom-icons/index" {
    import { IconDefinition } from '@fortawesome/fontawesome-common-types';
    const _default_1: IconDefinition[];
    export default _default_1;
}
declare module "src/font-awesome-icon" { }
declare module "src/router/helpers" {
    import { Route } from 'vue-router';
    export const scrollBehavior: (to: Route) => void;
    export const scrollBlockIntoView: (blockId: string) => void;
}
declare module "src/components/interaction-designer/clipboard/shared/PromptKindMixin" {
    import Vue from 'vue';
    import { IContext, IPrompt } from '@floip/flow-runner';
    export class PromptKindMixin extends Vue {
        index: number;
        isComplete: boolean;
        goNext: Function;
        onEditComplete: Function;
        context: IContext;
        errorMsg: string | null;
        isBlockInteraction: boolean;
        get isFocused(): boolean;
        get prompt(): IPrompt<any>;
        checkIsValid(value: unknown): void;
        submitAnswerCommon(value: unknown): Promise<void>;
        editBlockCommon(): void;
        onCancelCommon(): void;
        isBlockFocused: (index: number) => boolean;
        getBlockPrompt: (index: number) => IPrompt<any>;
        setIsFocused: (data: {
            index: number;
            value: boolean;
        }) => void;
        setLastBlockUnEditable: () => void;
        setLastBlockEditable: () => void;
    }
}
declare module "src/components/interaction-designer/clipboard/shared/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/interaction-designer/clipboard/shared/BlockActionButtons.vue" {
    import Lang from "src/lib/filters/lang";
    const BlockActionButtons_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class BlockActionButtons extends BlockActionButtons_base {
        readonly isFocused: boolean;
        readonly isDisabled: boolean;
        readonly onNextClicked: () => void;
        readonly isBlockInteraction: boolean;
        readonly onCancelClicked: () => void;
        get primaryButtonText(): string;
        clickCancel(): void;
    }
    export default BlockActionButtons;
}
declare module "src/components/interaction-designer/clipboard/prompt-kinds/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/interaction-designer/clipboard/prompt-kinds/Message.vue" {
    import Lang from "src/lib/filters/lang";
    import { PromptKindMixin } from "src/components/interaction-designer/clipboard/shared/PromptKindMixin";
    const Message_base: import("vue-class-component/lib/declarations").VueClass<Lang & PromptKindMixin>;
    export default class Message extends Message_base {
        submitAnswer(): Promise<void>;
    }
}
declare module "src/components/interaction-designer/clipboard/prompt-kinds/Numeric.vue" {
    import Lang from "src/lib/filters/lang";
    import { PromptKindMixin } from "src/components/interaction-designer/clipboard/shared/PromptKindMixin";
    const Numeric_base: import("vue-class-component/lib/declarations").VueClass<Lang & PromptKindMixin>;
    export default class Numeric extends Numeric_base {
        enteredValue: string;
        backUpValue: string;
        submitAnswer(): Promise<void>;
        editBlock(): void;
        onCancel(): void;
    }
}
declare module "src/components/interaction-designer/clipboard/prompt-kinds/Open.vue" {
    import Lang from "src/lib/filters/lang";
    import { PromptKindMixin } from "src/components/interaction-designer/clipboard/shared/PromptKindMixin";
    const Open_base: import("vue-class-component/lib/declarations").VueClass<Lang & PromptKindMixin>;
    export default class Open extends Open_base {
        enteredValue: string;
        backUpValue: string;
        submitAnswer(): Promise<void>;
        editBlock(): void;
        onCancel(): void;
    }
}
declare module "src/components/interaction-designer/clipboard/prompt-kinds/SelectOne.vue" {
    import Lang from "src/lib/filters/lang";
    import { PromptKindMixin } from "src/components/interaction-designer/clipboard/shared/PromptKindMixin";
    const SelectOne_base: import("vue-class-component/lib/declarations").VueClass<Lang & PromptKindMixin>;
    export default class SelectOne extends SelectOne_base {
        selectedItem: string | null;
        options: {
            key: string;
            value: string;
        }[];
        backUpValue: string;
        mounted(): void;
        setOptions(): void;
        submitAnswer(): Promise<void>;
        editBlock(): void;
        onCancel(): void;
    }
}
declare module "src/components/interaction-designer/clipboard/prompt-kinds/SelectMany.vue" {
    import Lang from "src/lib/filters/lang";
    import { PromptKindMixin } from "src/components/interaction-designer/clipboard/shared/PromptKindMixin";
    const SelectMany_base: import("vue-class-component/lib/declarations").VueClass<Lang & PromptKindMixin>;
    export default class SelectMany extends SelectMany_base {
        selectedChoices: string[];
        options: {
            key: string;
            value: string;
        }[];
        backUpValue: never[];
        mounted(): void;
        setOptions(): void;
        submitAnswer(): Promise<void>;
        editBlock(): void;
        onCancel(): void;
    }
}
declare module "src/components/interaction-designer/clipboard/shared/UnsupportedBlock.vue" {
    import Lang from "src/lib/filters/lang";
    const UnsupportedBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export class UnsupportedBlock extends UnsupportedBlock_base {
        readonly blockName?: string;
    }
    export default UnsupportedBlock;
}
declare module "src/components/interaction-designer/clipboard/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/components/interaction-designer/clipboard/ClipboardRoot.vue" {
    import { IContext, FlowRunner } from '@floip/flow-runner';
    import { IFlowsState } from "src/store/flow/index";
    import Lang from "src/lib/filters/lang";
    import { BlocksData } from "src/store/clipboard/index";
    const ClipboardRoot_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
    export default class ClipboardRoot extends ClipboardRoot_base {
        runner: FlowRunner;
        context: IContext;
        isComplete: boolean;
        unsupportedBlockName: string;
        cursorChangeInProgress: boolean;
        created(): void;
        content(promptId: string): string | undefined;
        initializeFlowRunner(): Promise<void>;
        goNext(): Promise<void>;
        onEditComplete(index: number): Promise<void>;
        closeSimulator(): void;
        destroyed(): void;
        currentFlowsState: IFlowsState;
        blocksData: BlocksData[];
        isBlockFocused: boolean;
        setSimulatorActive: (value: boolean) => void;
        resetBlocksData: () => void;
        setIsFocused: (data: {
            index: number;
            value: boolean;
        }) => void;
        addToBlocksData: (data: BlocksData) => void;
        removeFromBlocksData: (index: number) => void;
    }
}
declare module "src/views/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/views/InteractionDesigner.vue" {
    import Lang from "src/lib/filters/lang";
    import Routes from "src/lib/mixins/Routes";
    import { Route } from 'vue-router';
    import { IBlock, IFlow } from '@floip/flow-runner';
    import { ErrorObject } from 'ajv';
    import { MutationPayload } from 'vuex';
    const InteractionDesigner_base: import("vue-class-component/lib/declarations").VueClass<Lang & Routes>;
    export class InteractionDesigner extends InteractionDesigner_base {
        readonly id: string;
        readonly mode: string;
        readonly appConfig: object;
        readonly builderConfig: object;
        toolbarHeight: number;
        pureVuejsBlocks: string[];
        simulateClipboard: boolean;
        isConfigured: boolean;
        selectedBlock?: IBlock;
        hasChanges: boolean;
        hasIssues: boolean;
        isTreeSaving: boolean;
        isTreeValid: boolean;
        jsonValidationResults?: ErrorObject;
        validationResults?: ErrorObject;
        builderWidthAdjustment: number;
        designerWorkspaceHeight: number;
        tree: unknown;
        validationResultsEmptyTree: boolean;
        hasVoice?: boolean;
        hasSms?: boolean;
        hasUssd?: boolean;
        hasSocial?: boolean;
        hasClipboard?: boolean;
        blockClasses: Record<string, any>;
        activeFlow?: IFlow;
        activeBlock?: IBlock;
        isEditable: boolean;
        hasFlowChanges: boolean;
        interactionDesignerBoundingClientRect: DOMRect;
        isSimulatorActive: boolean;
        get jsKey(): string;
        isPureVueBlock(): boolean;
        beforeCreate(): Promise<void>;
        onModeChanged(newMode: string): void;
        created(): void;
        activated(): void;
        /** @note - mixin's mount() is called _before_ local mount() (eg. InteractionDesigner.legacy::mount() is 1st) */
        mounted(): Promise<void>;
        handleRouteUpdate(to: Route): void;
        configure: ({ appConfig, builderConfig }: {
            appConfig: object;
            builderConfig: object;
        }) => void;
        deselectBlocks: () => void;
        activateBlock: ({ blockId }: {
            blockId: IBlock['uuid'] | null;
        }) => void;
        setIsBlockEditorOpen: (value: boolean) => void;
        setInteractionDesignerBoundingClientRect: (value: DOMRect) => void;
        setIsEditable: (arg0: boolean) => void;
        setHasFlowChanges: (arg0: boolean) => void;
        flow_setActiveFlowId: ({ flowId }: {
            flowId: string | null;
        }) => void;
        attemptSaveTree: () => void;
        discoverTallestBlockForDesignerWorkspaceHeight: ({ buffer, aboveTallest }: {
            buffer?: number;
            aboveTallest: boolean;
        }) => void;
        initializeTreeModel: () => void;
        registerBlockTypes(): Promise<void[]>;
        handleCanvasSelected({ target }: {
            target: Element;
        }): void;
        updateIsEditableFromParams(mode: string): void;
        /** --------------------------------| has-editable-locked | not-editable-locked |
         | mode-is-absent+view-url-suffix   |        0            |     0               |
         | mode-is-absent+edit-url-suffix   |        0 (r=>view)  |     1               |
         | mode-is-absent+absent-url-suffix |        0 (r=>view)  |     0 (r=>view)     | <- Equivalent to /view
         | mode-is-view                     |        0            |     0               |
         | mode-is-view+edit-url-suffix     |        0            |     0               |
         | mode-is-edit                     |        0 (r=>view)  |     1               |
         | mode-is-edit+view-url-suffix     |        0 (r=>view)  |     1               |
         ------------------------------------------------------------------------------ */
        discoverIsEditableFrom(mode: string, hash: string, isEditableLocked: boolean): boolean;
        hoistResourceViewerToPushState(hash: string): void;
        showOrHideSidebar(): void;
        replaceRouteInHistory(name: string): void;
        handleFlowChanges({ type, payload }: MutationPayload): void;
    }
    export default InteractionDesigner;
}
declare module "src/views/FetchFlow.vue" {
    import Lang from "src/lib/filters/lang";
    import Routes from "src/lib/mixins/Routes";
    import { IFlow } from '@floip/flow-runner';
    const FetchFlow_base: import("vue-class-component/lib/declarations").VueClass<Lang & Routes>;
    class FetchFlow extends FetchFlow_base {
        readonly uuid: string;
        readonly appConfig: object;
        readonly builderConfig: object;
        message: string;
        showNewButton: boolean;
        flowLink: null;
        activeFlow: IFlow;
        flow_fetch: ({ fetchRoute }: {
            fetchRoute: string;
        }) => Promise<IFlow>;
        flow_setActiveFlowId: ({ flowId }: {
            flowId: string;
        }) => void;
        validate_allBlocksFromBackend: () => void;
        configure: ({ appConfig, builderConfig }: {
            appConfig: object;
            builderConfig: object;
        }) => void;
        isConfigured: boolean;
        mounted(): Promise<void>;
        beforeCreate(): Promise<void>;
        created(): Promise<void>;
    }
    export default FetchFlow;
}
declare module "src/views/NewFlow.vue" {
    import Lang from "src/lib/filters/lang";
    import Routes from "src/lib/mixins/Routes";
    import { IContext, IFlow } from '@floip/flow-runner';
    import { RawLocation } from 'vue-router';
    import { IValidationStatus } from "src/store/validation/index";
    const NewFlow_base: import("vue-class-component/lib/declarations").VueClass<Lang & Routes>;
    class NewFlow extends NewFlow_base {
        readonly appConfig: object;
        readonly builderConfig: object;
        didUserSubmit: boolean;
        onActiveFlowChanged(newFlow: IFlow): Promise<void>;
        get createFlowTitle(): string;
        mounted(): Promise<void>;
        beforeCreate(): Promise<void>;
        created(): Promise<void>;
        handlePersistFlow(route: RawLocation): Promise<void>;
        flowError: string | null;
        ui: any;
        hasCreateFlowTitle: boolean;
        flow_addBlankFlow: () => Promise<IFlow>;
        flow_persist: ({ persistRoute, flowContainer, }: {
            persistRoute: any;
            flowContainer: IContext;
        }) => Promise<IContext | null>;
        activeFlow: IFlow;
        isActiveFlowConsideredValidOnCreationForm?: boolean;
        activeFlowContainer: IContext;
        configure: ({ appConfig, builderConfig }: {
            appConfig: object;
            builderConfig: object;
        }) => void;
        isConfigured: boolean;
        validate_flow: ({ flow }: {
            flow: IFlow;
        }) => Promise<IValidationStatus>;
    }
    export default NewFlow;
}
declare module "src/store/flow/views/import" {
    import { ILanguage } from '@floip/flow-runner/dist/flow-spec/ILanguage';
    import { ActionTree, GetterTree, MutationTree } from 'vuex';
    import { IRootState } from "src/store/index";
    import { IBlock, IContext } from '@floip/flow-runner';
    import { IContactPropertyMultipleChoice } from "src/store/flow/block-types/Core_SetContactPropertyStore.model";
    import { IGroupOption } from "src/store/flow/block-types/Core_SetGroupMembershipStore";
    export const getters: GetterTree<IImportState, IRootState>;
    export const mutations: MutationTree<IImportState>;
    export const actions: ActionTree<IImportState, IRootState>;
    export interface IImportState {
        matchingLanguages: ILanguage[];
        missingLanguages: ILanguage[];
        existingLanguagesWithoutMatch: ILanguage[];
        blocksMissingProperties: {
            [key: string]: string[];
        };
        missingProperties: {
            name: string;
            blockIds: string[];
        }[];
        matchingProperties: IContactPropertyMultipleChoice[];
        existingPropertiesWithoutMatch: IContactPropertyMultipleChoice[];
        blocksMissingGroups: {
            [key: string]: {
                group_name: string;
                blockIds: string[];
            };
        };
        missingGroups: {
            id: string;
            group_name: string;
            blockIds: string[];
        }[];
        matchingGroups: IGroupOption[];
        existingGroupsWithoutMatch: IGroupOption[];
        flowContainer: IContext | null;
        flowJsonText: string;
        flowSpecVersion: string | undefined;
        propertyBlocks: IBlock[];
        groupBlocks: IBlock[];
        updating: boolean;
    }
    export const stateFactory: () => IImportState;
    const _default_2: {
        namespaced: boolean;
        state: () => IImportState;
        getters: GetterTree<IImportState, IRootState>;
        mutations: MutationTree<IImportState>;
        actions: ActionTree<IImportState, IRootState>;
    };
    export default _default_2;
}
declare module "src/views/ImportFlow.vue" {
    import Lang from "src/lib/filters/lang";
    import Routes from "src/lib/mixins/Routes";
    import { IContext } from '@floip/flow-runner';
    import { ErrorObject } from 'ajv';
    const ImportFlow_base: import("vue-class-component/lib/declarations").VueClass<Lang & Routes>;
    class ImportFlow extends ImportFlow_base {
        readonly appConfig: object;
        readonly builderConfig: object;
        uploadOrPasteSetting: string;
        fileName: string;
        beforeCreate(): Promise<void>;
        created(): Promise<void>;
        resetValidationStatuses: ({ key }: {
            key: string;
        }) => void;
        get uploadOrPaste(): string;
        set uploadOrPaste(value: string);
        get flowJson(): string;
        set flowJson(value: string);
        setUpdatingAndHandleFlowJsonTextChange(value: string): void;
        debounceHandleFlowJsonTextChange: ((value: string) => Promise<void>) & import("lodash").Cancelable;
        handleFlowJsonTextChange(value: string): Promise<void>;
        isSafeToImport: boolean;
        get flowUUID(): any;
        chooseFile(): void;
        handleFileUpload(event: any): Promise<void>;
        pushAjvErrorToValidationStatuses: ({ key, ajvError }: {
            key: string;
            ajvError: ErrorObject;
        }) => void;
        ui: any;
        flow_persistImport: ({ persistRoute, flowContainer, }: {
            persistRoute: string;
            flowContainer: IContext;
        }) => Promise<IContext>;
        handleImportFlow(route: string): Promise<void>;
        configure: ({ appConfig, builderConfig }: {
            appConfig: object;
            builderConfig: object;
        }) => void;
        isConfigured: boolean;
        hasImportFlowTitle: boolean;
        get disableContinue(): boolean;
        setFlowJson: (value: string) => Promise<void>;
        baseReset: () => void;
        resetLanguageMatching: () => void;
        resetGroupMatching: () => void;
        resetPropertyMatching: () => void;
        setFlowError: (text: string) => void;
        setUpdating: (updatingStatus: boolean) => void;
        flowError: string;
        flowJsonText: string;
        flowContainer: IContext;
        reset(): void;
    }
    export default ImportFlow;
}
declare module "src/views/Home.vue" {
    import Lang from "src/lib/filters/lang";
    import Routes from "src/lib/mixins/Routes";
    import { IFlow } from '@floip/flow-runner';
    const Home_base: import("vue-class-component/lib/declarations").VueClass<Lang & Routes>;
    class Home extends Home_base {
        readonly appConfig: object;
        readonly builderConfig: object;
        isExtraContentHidden: boolean;
        showExtraContent(e: KeyboardEvent): void;
        hideExtraContent(e: KeyboardEvent): void;
        flows: IFlow[];
        configure: ({ appConfig, builderConfig }: {
            appConfig: object;
            builderConfig: object;
        }) => void;
        isConfigured: boolean;
        beforeCreate(): Promise<void>;
        created(): Promise<void>;
    }
    export default Home;
}
declare module "src/store/flow/block-types/index" {
    export { default as BaseBlockStore } from "src/store/flow/block-types/BaseBlock";
    export { default as SmartDevices_PhotoResponseBlockStore } from "src/store/flow/block-types/SmartDevices_PhotoResponseBlockStore";
    export { default as SmartDevices_LocationResponseBlockStore } from "src/store/flow/block-types/SmartDevices_LocationResponseBlockStore";
    export { default as MobilePrimitives_SelectOneResponseBlockStore } from "src/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore";
    export { default as MobilePrimitives_SelectManyResponseBlockStore } from "src/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore";
    export { default as MobilePrimitives_OpenResponseBlockStore } from "src/store/flow/block-types/MobilePrimitives_OpenResponseBlockStore";
    export { default as MobilePrimitives_NumericResponseBlockStore } from "src/store/flow/block-types/MobilePrimitives_NumericResponseBlockStore";
    export { default as MobilePrimitives_MessageBlockStore } from "src/store/flow/block-types/MobilePrimitives_MessageBlockStore";
    export { default as Core_CaseBlockStore } from "src/store/flow/block-types/Core_CaseBlockStore";
    export { default as Core_SetGroupMembershipBlockStore } from "src/store/flow/block-types/Core_SetGroupMembershipStore";
    export { default as Core_RunFlowBlockStore } from "src/store/flow/block-types/Core_RunFlowBlockStore";
    export { default as Core_LogBlockStore } from "src/store/flow/block-types/Core_LogBlockStore";
    export { default as Core_OutputBlockStore } from "src/store/flow/block-types/Core_OutputBlockStore";
    export { default as Core_SetContactPropertyBlockStore } from "src/store/flow/block-types/Core_SetContactPropertyStore";
    export * from "src/store/flow/block-types/Core_SetContactPropertyStore.model";
}
declare module "src/lib" {
    import { createDefaultBlockTypeInstallerFor as createDefaultBlockTypeInstallerForFunction } from "src/store/builder/index";
    import InteractionDesignerComponent from "src/views/InteractionDesigner.vue";
    import FetchFlowComponent from "src/views/FetchFlow.vue";
    import NewFlowComponent from "src/views/NewFlow.vue";
    import ImportFlowComponent from "src/views/ImportFlow.vue";
    import HomeComponent from "src/views/Home.vue";
    import BaseBlockComponent from "src/components/interaction-designer/block-types/BaseBlock.vue";
    export const appConfig: any;
    export const builderConfig: any;
    export const InteractionDesigner: typeof InteractionDesignerComponent;
    export const FetchFlow: typeof FetchFlowComponent;
    export const NewFlow: typeof NewFlowComponent;
    export const ImportFlow: typeof ImportFlowComponent;
    export const Home: typeof HomeComponent;
    export const defaultLocalisations: {
        "en.flow-builder": {
            warnings: string;
            "warnings-hint-on-import": string;
            errors: string;
            "please-fix-errors-first": string;
            "success-with-warnings": string;
            synonyms: string;
            "text-expression": string;
            "flow-builder": string;
            "bcp-47-label": string;
            "iso-639-3-label": string;
            "iso-3166-1-label": string;
            "add-language": string;
            weather: string;
            "photo-response-prompt": string;
            "include-photo-response-prompt": string;
            "group-membership-action-hint": string;
            "set-group-membership": string;
            "remove-group-membership": string;
            "clear-group-membership": string;
            "tags-label": string;
            "tags-selector-placeholder": string;
            ivr: string;
            text: string;
            rich_messaging: string;
            "add-at-least-one-block": string;
            "import-flow": string;
            "import-success": string;
            "import-explanation": string;
            "import-note": string;
            "create-flow-from-json": string;
            create: string;
            "import-json-file": string;
            "paste-json-directly": string;
            "paste-flow-json": string;
            "edit-flow-json": string;
            "invalid-json-provided": string;
            "uploaded-file": string;
            "action-label": string;
            "action-placeholder": string;
            add: string;
            "contact-property-expression": string;
            "contact-property-label": string;
            "contact-property-selector-placeholder": string;
            "contact-property-action-hint": string;
            "set-contact-property": string;
            "set-contact-property-with-response": string;
            "enter-message": string;
            "enter-label": string;
            "enter-variant": string;
            "entry-from-this-block": string;
            expression: string;
            expressions: string;
            "value-expression": string;
            "clear-contact-property": string;
            "enter-contact-property-label": string;
            "group-selector-placeholder": string;
            "fix-issue": string;
            "locate-block-issue": string;
            "show-issues": string;
            "flow-error-message": string;
            "flow-builder-documentation": string;
            "block-error-message": string;
            "accuracy-threshold-in-meters": string;
            "accuracy-timeout-in-seconds": string;
            "edit-variable": string;
            "go-to-flow": string;
            "problem-creating-flow": string;
            "problem-importing-flow": string;
            "flow-not-found": string;
            "flow-found": string;
            "fetching-flow": string;
            "create-flow": string;
            "create-a-new-flow": string;
            "new-flow": string;
            "flow-name": string;
            "flow-label": string;
            "flow-importer": string;
            "flow-exporter": string;
            "Interaction-timeout": string;
            modes: string;
            "enter-flow-name": string;
            "enter-flow-label": string;
            "enter-destination-flow-id": string;
            "maximum-digits": string;
            "max-digits-help-text": string;
            AirtimeTransferBlock: string;
            BillSubscriberBlock: string;
            CallBackWithCallCenterBlock: string;
            CallHistoryBranchBlock: string;
            CollaborativeFilteringQuestionBlock: string;
            CollaborativeFilteringRatingBlock: string;
            CollaborativeFilteringRatioBranchBlock: string;
            ConnectToOperatorBlock: string;
            ContentTypeBranchBlock: string;
            "Core.Case": string;
            "Core.Log": string;
            "Core.Output": string;
            "Core.RunFlow": string;
            "Core.SetContactProperty": string;
            "Core.SetGroupMembership": string;
            CreateSubscriberBlock: string;
            CurrentTimeBranchBlock: string;
            DecisionBranchBlock: string;
            DirectorySelectionBlock: string;
            EntitySelectionBlock: string;
            ExpressionBranchBlock: string;
            GenerateCodeBlock: string;
            GroupBranchBlock: string;
            GroupPropertyBlock: string;
            GroupSizeBranchBlock: string;
            IdValidationBlock: string;
            LanguageSelectorBlock: string;
            LocationBlock: string;
            MarkCallCompleteBlock: string;
            MessageBlock: string;
            "MobilePrimitives.Message": string;
            "MobilePrimitives.NumericResponse": string;
            "MobilePrimitives.OpenResponse": string;
            "MobilePrimitives.SelectOneResponse": string;
            "MobilePrimitives.SelectManyResponse": string;
            MultipleChoiceQuestionBlock: string;
            MultipleSelectMultipleChoiceQuestionBlock: string;
            NumericBranchBlock: string;
            NumericQuestionBlock: string;
            OpenQuestionBlock: string;
            PlayGroupMessageBlock: string;
            RandomBranchBlock: string;
            RandomOrderMultipleChoiceQuestionBlock: string;
            RecordGroupMessageBlock: string;
            RunTreeBlock: string;
            "SmartDevices.LocationResponse": string;
            "SmartDevices.PhotoResponse": string;
            SubscriberBranchBlock: string;
            SubscriberPropertiesSnapshotBlock: string;
            SubscriberPropertyBlock: string;
            SummaryBlock: string;
            TriggerOutgoingCallBlock: string;
            ValidateCodeBlock: string;
            WeatherAlertsBlock: string;
            WeatherForecastBlock: string;
            WebhookBlock: string;
            WebhookContentBlock: string;
            "X-abbreviations-set-when-creating-tree": string;
            "X-are-required-placeholder-components-for-rule-but-additional-designation-optional": string;
            "X-assigned-to-a-block": string;
            "X-of-resources-populated": string;
            "X-seconds-long": string;
            "X-subscribers-selected": string;
            "X-will-match-with-Y": string;
            "X-wont-match-with-Y": string;
            "absolute-date": string;
            accessed: string;
            action: string;
            "action-allows-custom-subscriber-data-when-block-reached": string;
            "action-changes-preferred-content-types-to-receive-in-future": string;
            "action-immediately-changes-preferred-language-of-subscriber": string;
            actions: string;
            active: string;
            "adapted-from": string;
            "add-a-description-to-this-recording": string;
            "add-a-new-recorder": string;
            "add-block": string;
            "add-condition": string;
            "add-data": string;
            "add-label-tags": string;
            "add-map-coordinates-field": string;
            "add-question": string;
            "add-to": string;
            "add-to-group": string;
            added: string;
            "additional-designation-created-in-the-rule": string;
            "adds-subscribers-to-the": string;
            "admin-csv-file": string;
            advanced: string;
            "advanced-exit-name": string;
            "advanced-exit-name-placeholder": string;
            "advanced-exit-expression-placeholder": string;
            after: string;
            "after-completing-all-output-branches": string;
            "airtime-credit-transfer": string;
            "alert-message-title": string;
            "all-block-types": string;
            "all-blocks": string;
            "all-channels": string;
            "all-content-across-this-organisation": string;
            "all-languages": string;
            "all-message-blocks": string;
            "all-other-possible-values": string;
            "all-question-blocks": string;
            "all-subscribers": string;
            "all-transcriptions-saved": string;
            "allow-visitors-to-modify-the-date-range": string;
            "allow-visitors-to-translate-the-page-in-their-language": string;
            "already-published": string;
            "already-used": string;
            and: string;
            "any-key": string;
            anytime: string;
            "api-key": string;
            "api-success": string;
            "append-or-replace-on-upload": string;
            "applies-to-calls-sent-to-all-subscribers-or-groups-containing-subscriber": string;
            apply: string;
            "apply-all-filters": string;
            "april-month": string;
            "are-you-sure-you-want-to-delete-this-shareable-link": string;
            "as-at": string;
            at: string;
            "at-character": string;
            "at-least": string;
            "at-least-one-language-must-be-checked": string;
            "at-minimum-we-need-two-placeholders": string;
            "at-this-time": string;
            "attach-multimedia": string;
            "audio-export-started-for": string;
            "audio-file-naming-pattern": string;
            "audio-files": string;
            "audio-files-per-task": string;
            "audio-lib-empty-for-this-org": string;
            "audio-library": string;
            "audio-listened": string;
            "august-month": string;
            auto: string;
            "auto-gen-content-from-block-details": string;
            "auto-link-audio-files": string;
            "automatic-routing-description": string;
            "automatic-routing-label": string;
            "automatically-enable-statements": string;
            "automatically-enable-statements-help": string;
            "average-audio-length": string;
            "avg-duration-for-all-calls": string;
            "avg-duration-for-completed-calls": string;
            back: string;
            "back-to-choices-list": string;
            "back-to-trees-list": string;
            "base-url": string;
            "base-url-placeholder": string;
            "bill-subscriber": string;
            block: string;
            "block-allows-connect-to-operator-chosen-at-random-from-pre-specified-operator-contact-list": string;
            "block-choice-filter-description": string;
            "block-code": string;
            "block-details": string;
            "block-id": string;
            "block-label": string;
            "block-name": string;
            "block-ordering": string;
            "block-ordering-help-text": string;
            "block-responses-to-send-payload": string;
            "block-semantic-label": string;
            "block-exit-semantic-label": string;
            "block-title": string;
            "block-type-unsupported-in-resource-view": string;
            blocks: string;
            "blocks-responses": string;
            "blocks-to-display": string;
            "branch-if-subscriber-property": string;
            "branch-to-true-if-the-subscriber-is-a-member-of-the": string;
            "branch-via-call-history": string;
            "branch-via-call-history-desc1": string;
            "branch-via-call-history-desc2": string;
            "branch-via-content-type": string;
            "branch-via-expression": string;
            "branch-via-group-membership": string;
            "branch-via-group-size": string;
            "branch-via-subscriber-data": string;
            "branch-via-valid-code": string;
            branching: string;
            "breakdown-by": string;
            "btn-add-exit": string;
            "call-back-block-desc": string;
            "call-back-block-dialing-list-desc": string;
            "call-back-block-dialing-list-heading": string;
            "call-back-block-enable-routing-by-queue": string;
            "call-back-block-enable-routing-by-queue-desc": string;
            "call-back-block-enter-api-key": string;
            "call-back-block-enter-dialing-list-name": string;
            "call-back-block-notify-different-org": string;
            "call-back-block-notify-this-org": string;
            "call-back-block-org-api-key": string;
            "call-back-block-queue-name": string;
            "call-back-block-select-queue": string;
            "call-finished": string;
            "call-started": string;
            "call-this-phone-number": string;
            "call-to-record": string;
            caller: string;
            "calls-after": string;
            "calls-before": string;
            "calls-quota-threshold": string;
            campaigns: string;
            cancel: string;
            "candidate-question": string;
            "cannot-delete-that-tree": string;
            "cannot-restore-that-tree": string;
            "cannot-restore-that-tree.": string;
            "cannot-map-choices-hint": string;
            "case-of-duplicates-instruction": string;
            categorization: string;
            category: string;
            "category-name": string;
            "cell-contents": string;
            "cell-contents-format": string;
            "cf-ratio-description": string;
            "chance-of-rain": string;
            "change-subscriber-language": string;
            "change-subscriber-start-date": string;
            channel: string;
            channels: string;
            characters: string;
            "check-url-api": string;
            choice: string;
            "choice-name": string;
            "choice-filter-tags": string;
            "choice-id-choice-text": string;
            "choice-id-only": string;
            "choice-keypress-options": string;
            "choice-options": string;
            "choice-options-fixed": string;
            choices: string;
            "choices-choice-attributes": string;
            "choices-prompt": string;
            "choose-a-language-selector": string;
            "choose-a-language-selector-label": string;
            "choose-audio": string;
            "choose-csv-file": string;
            "choose-date": string;
            "choose-file": string;
            "choose-how-many-seconds-to-wait": string;
            "choose-how-many-times-can-repeat": string;
            "choose-subscribers": string;
            "choose-which-numbered-key": string;
            "clear-floip-config": string;
            "clear-selection": string;
            "click-and-drag-to-create-a-new-connection": string;
            "click-and-drag-to-move-this-block": string;
            "click-here-to-download-the-file": string;
            "click-to-lock-this-choice-in-place": string;
            "click-to-remove-this-connection": string;
            "click-to-select-this-block": string;
            "click-to-toggle-editing": string;
            "click-to-unlock": string;
            clipboard: string;
            "clipboard-content": string;
            "clipboard-simulator": string;
            "clipboard-subscribers-that-reached-this-block": string;
            "clipboard-subtitle": string;
            close: string;
            cloudy: string;
            "code-length": string;
            "code-validation": string;
            codes: string;
            code: string;
            "collaborative-filtering-question": string;
            "collaborative-filtering-rating": string;
            "combined-block-results": string;
            "combined-tree-results": string;
            "compact-filter-display": string;
            "compact-filter-display-help-text": string;
            completed: string;
            "completed-interactions-per-block": string;
            "completed-of": string;
            "completed-transcriptions": string;
            "completed-via": string;
            "components-can-be-separated-by-symbols-but-not-required": string;
            "configure-floip-header": string;
            "configure-referral-entity-prompt-eg": string;
            confirm: string;
            "confirm-delete": string;
            "confirmation-for-delete-selection": string;
            "yes-delete": string;
            "no-cancel": string;
            "confirm-upload": string;
            "conflict-external-changes": string;
            "conflict-new-version": string;
            "connect-to": string;
            "connect-to-an-operator": string;
            "connect-to-the-following-operator-list": string;
            "connected-of": string;
            contact: string;
            "contact-properties": string;
            "contact-updated": string;
            content: string;
            "content-type": string;
            "content-type-1": string;
            "content-type-2": string;
            "content-type-3": string;
            "content-type-4": string;
            "content-type-5": string;
            "content-type-is-not-selected": string;
            "continue-through-exit": string;
            continuous: string;
            "corresponding-audio-file-components-examples": string;
            "could-not-add-property": string;
            "could-not-download-audio-for-that-tree": string;
            "could-not-export-open-ended-audio": string;
            "create-a-new-group": string;
            "create-a-new-list": string;
            "create-a-new-one": string;
            "create-a-new-survey": string;
            "create-a-new-tree": string;
            "create-a-tag-prompt": string;
            "create-and-upload-a-new-message": string;
            "create-at-least-one-language-selector": string;
            "create-contact-absolute-date": string;
            "create-contact-description": string;
            "create-contact-instructions": string;
            "create-contact-relative-block": string;
            "create-contact-relative-date": string;
            "create-new-link": string;
            "create-new-version": string;
            "create-task": string;
            "create-tasks": string;
            "create-transcription-tasks": string;
            "create-tree": string;
            "create-weather-alerts": string;
            "create-weather-forecast": string;
            created: string;
            "created-a-new-version-of": string;
            "created-new-version-of": string;
            "created-with": string;
            "csv-format": string;
            "currency-to-use": string;
            "current-time-after": string;
            "current-time-and": string;
            "current-time-before": string;
            "current-time-between": string;
            "current-time-day": string;
            "current-time-day-of-month": string;
            "current-time-day-of-week": string;
            "current-time-exclusive": string;
            "current-time-go-to-true-when": string;
            "current-time-inclusive": string;
            "current-time-is": string;
            "current-time-month": string;
            "current-time-select-comparison": string;
            "current-time-select-day-of-week": string;
            "current-time-select-month": string;
            "current-time-time-of-day": string;
            "current-time-time-to-compare": string;
            "current-time-timezone": string;
            "currently-set-as-exit-block": string;
            "currently-set-as-starting-block": string;
            "custom-data-category-name": string;
            "custom-data-value": string;
            "custom-ordering": string;
            "custom-settings": string;
            daily: string;
            data: string;
            "data-residency-mode-is-enabled-for-this-account-responses-to-this-block-will-be-retained-on-the-in-country-server-only-and-de-identified-before-being-transmitted-outside-the-country": string;
            "data-type-boolean": string;
            "data-type-date": string;
            "data-type-location": string;
            "data-type-map_coordinates": string;
            "data-type-multiple_choice": string;
            "data-type-number": string;
            "data-type-phone": string;
            "data-type-text": string;
            "data-validation-invalid-choice": string;
            "data-validation-invalid-value": string;
            "data-validation-max_length": string;
            "data-validation-max_numeric_digits": string;
            "date-created": string;
            "date-range": string;
            "date-range-locked": string;
            "date-updated": string;
            day: string;
            "day-of-week": string;
            days: string;
            "days-after": string;
            "days-after-adding": string;
            "days-before": string;
            "december-month": string;
            "decision-branch": string;
            "default-repeat-key": string;
            "default-sender-for-x-otherwise-systems": string;
            "delay-to-enter-repeat-key": string;
            delete: string;
            "delete-issue-tracker": string;
            "delete-task": string;
            "delete-this-shareable-link": string;
            "delete-tracker": string;
            "delete-transcription-task-question": string;
            "delete-tree": string;
            "delete-tree-question": string;
            "delete-tree-version": string;
            "delete-version": string;
            "deleted-subscriber": string;
            "deleted-title-version": string;
            "deselect-block": string;
            description: string;
            "destination-flow": string;
            "destination-tree": string;
            "destination-tree-not-found": string;
            "destination-url": string;
            "directory-selection-block-invalid-details": string;
            "directory-selection-description": string;
            "directory-selection-filter-description": string;
            "directory-selection-filters": string;
            disable: string;
            "disable-voice-sms": string;
            disabled: string;
            "disaggregate-data-by-the-audio-listened-percentage": string;
            "disaggregate-data-by-the-communication-channels": string;
            "disaggregate-data-by-the-question-choices": string;
            "display-headings-without-spaces": string;
            "display-latest-interaction-only": string;
            "display-regular-table-headings": string;
            "do-not-merge-any-calls": string;
            "do-not-prompt": string;
            "do-you-want-to-proceed": string;
            "dont-receive": string;
            done: string;
            download: string;
            "download-X-format": string;
            "download-admin-file": string;
            "download-audio-file": string;
            "download-csv": string;
            "download-csv-file-to-your-computer": string;
            "download-response-audio": string;
            "download-template": string;
            "download-template-admin-file": string;
            "download-the-audio-files-from-open-ended-responses": string;
            "download-x-template-file": string;
            draft: string;
            "drag-and-drop-instruction": string;
            dry: string;
            duplicate: string;
            "duplicate-as-new-tree": string;
            "duplicate-entire-flow": string;
            "duplicate-tree": string;
            "duplicate-tree-has-been-created": string;
            "duplicates-warning": string;
            duration: string;
            "earth-networks": string;
            edit: string;
            "edit-alert-message": string;
            "edit-block-type": string;
            "edit-case-block": string;
            "edit-collaborative-filtering-question": string;
            "edit-collaborative-filtering-rating": string;
            "edit-content": string;
            "edit-expression": string;
            "enter-expression": string;
            "flow-details": string;
            "view-flow": string;
            "edit-mode": string;
            "view-mode": string;
            "edit-generate-code-block": string;
            "edit-group-membership": string;
            "edit-location": string;
            "edit-log-block": string;
            "edit-message": string;
            "edit-multiple-choice-question": string;
            "edit-multiple-select-multiple-choice-question": string;
            "edit-new-version": string;
            "edit-numeric-question": string;
            "edit-open-ended-question": string;
            "edit-operator-contact-lists": string;
            "edit-outgoing-call": string;
            "edit-output-block": string;
            "edit-random-order-multiple-choice-question": string;
            "edit-run-flow-block": string;
            "edit-settings": string;
            "edit-subscriber-property": string;
            "edit-this-block": string;
            "edit-tree-before-sending": string;
            "edit-validate-block": string;
            "edit-voice-content": string;
            "edit-block-code": string;
            empty: string;
            "empty-audio-library": string;
            "empty-responses": string;
            enable: string;
            "enable-disable-subscriber": string;
            "enable-display-of-block-type": string;
            "enable-display-of-key-metrics": string;
            "enable-sms": string;
            "enable-voice": string;
            "enable-voice-sms": string;
            enabled: string;
            "enabled-languages": string;
            "enabled-result-tabs": string;
            "end-at": string;
            "end-date": string;
            "end-recording-by-pressing": string;
            "end-the-call-session": string;
            ends: string;
            "enter-a-value": string;
            "enter-accepted-responses": string;
            "enter-at-least-one-choice-above": string;
            "enter-at-least-three-chars": string;
            "enter-at-least-three-chars-to-search": string;
            "enter-audio-content": string;
            "enter-block-label": string;
            "enter-block-name": string;
            "enter-block-semantic-label": string;
            "enter-block-exit-semantic-label": string;
            "enter-clipboard-content": string;
            "enter-confirmation-audio": string;
            "enter-date": string;
            "enter-title": string;
            "enter-block-code": string;
            "enter-duration": string;
            "enter-each-on-new-line": string;
            "enter-exit-label": string;
            "enter-exit-test-expression": string;
            "enter-image-content": string;
            "enter-ivr-number": string;
            "enter-num-ratings": string;
            "enter-number": string;
            "enter-number-of-days": string;
            "enter-operator-queue-name": string;
            "enter-primary-and-synonyms": string;
            "enter-primary-attribute": string;
            "enter-primary-attribute-title": string;
            "enter-program-id": string;
            "enter-property-name": string;
            "enter-secondary-attribute": string;
            "enter-secondary-attribute-title": string;
            "enter-secondary-attribute-title-2": string;
            "enter-sms-content": string;
            "enter-sms-text-here": string;
            "enter-rich-messaging-content": string;
            "enter-social-messaging-text-here": string;
            "enter-text-content": string;
            "enter-ussd-content": string;
            "enter-ussd-text-here": string;
            "enter-offline-content": string;
            "enter-value": string;
            "enter-value-for-choices-for-selected-property": string;
            "enter-video-content": string;
            entered: string;
            entity: string;
            "entity-selection-block-instructions": string;
            "equal-to": string;
            error: string;
            "error-creating-transcription-task": string;
            "error-found": string;
            "error-importing-json": string;
            "error-report": string;
            "error-updating-transcription-task": string;
            "error-uploading-file-try-again": string;
            "error-persisting-language": string;
            "error-while-attempting-to-publish-specified-tree": string;
            "error-while-downloading-template": string;
            "error-while-saving-transcriptions": string;
            "error-while-saving-tree": string;
            "establish-connection": string;
            "example-tree": string;
            examples: string;
            exceeds: string;
            "excel-supported-format": string;
            "existing-flows": string;
            "flow-builder-info-1": string;
            "learn-more": string;
            "flow-builder-info-2": string;
            "flow-builder-info-3-pt-1": string;
            "flow-builder-info-3-pt-2": string;
            "flow-builder-info-4": string;
            less: string;
            exit: string;
            "exit-block-tree-begins-here": string;
            "exit-default": string;
            "exit-otherwise-through-default": string;
            "exit-through": string;
            "exit-to-another-output": string;
            "exit-when": string;
            "expires-after": string;
            "expires-on": string;
            "export-date-time-format": string;
            "export-results-to-csv": string;
            "export-transcriptions": string;
            "export-tree-json": string;
            "export-using-current-time-zone": string;
            "export-using-utc": string;
            "export-using-utc-with-subscriber-phone-number": string;
            "expression-branch-description": string;
            failed: string;
            "failed-finding-matches": string;
            failure: string;
            false: string;
            "february-month": string;
            "feedback-message": string;
            field: string;
            "field-deleted-since-configuring-this-block": string;
            "file-details": string;
            filesize: string;
            "fill-out-template-instruction": string;
            "fill-out-template-instruction-1": string;
            "fill-out-template-instruction-2": string;
            "fill-out-template-instruction-3": string;
            "fill-out-template-instruction-4": string;
            "fill-out-template-instruction-5": string;
            "filter-block-content": string;
            "filter-by-block": string;
            "filter-by-date": string;
            "filter-by-directory-selection": string;
            "filter-by-tag": string;
            "filter-enabled": string;
            "filter-instructions": string;
            "filter-validation": string;
            filters: string;
            "filters-saved": string;
            "find-matches": string;
            "first-time-subscribers": string;
            "fix-validation-errors-before-publishing": string;
            "fixed-date": string;
            "flag-this-recording-as-either": string;
            "flagged-as-flagtype": string;
            "flagged-as-inaudible-or-empty": string;
            "floip-cleared": string;
            "floip-expressions-escape-with-double-at-symbol": string;
            "floip-instructions-1": string;
            "floip-instructions-2": string;
            "floip-sync-success": string;
            "floip-sync-warning": string;
            "flow-view": string;
            "for-a-given-subscriber-custom-data-category": string;
            "for-a-given-subscriber-go-to-true-false": string;
            "for-assistance": string;
            "for-example-to-assign-the-first-hundred-audio-responses-to-a-transcriber": string;
            "for-the-best-user-experience": string;
            "for-this-block": string;
            fri: string;
            "friday-day": string;
            "from-block-input": string;
            "from-import": string;
            "generate-code-title": string;
            "generate-csv-file": string;
            "generate-shareable-link": string;
            "generating-data-from-past-calls": string;
            "get-shareable-link": string;
            "go-to-lang-selector-interface": string;
            "go-to-true-or-false": string;
            "go-to-true-otherwise-go-to-false": string;
            "go-to-true-output-if-contact-language-is": string;
            "greater-than": string;
            group: string;
            "group-is-larger-than": string;
            "group-label": string;
            "enter-group-label": string;
            "set-group-membership-from-expression": string;
            "group-not-set": string;
            groups: string;
            "has-already-been-published": string;
            "has-been-successfully-published": string;
            "has-value": string;
            "header-validation": string;
            "header-validation-missing": string;
            "heading-exit": string;
            headings: string;
            "headings-format": string;
            "heres-what-we-know": string;
            hide: string;
            "hide-instruction": string;
            "hide-phone-numbers": string;
            "hide-question-titles": string;
            "hide-subscriber-id": string;
            "high-winds": string;
            "hint-to-set-advance-exit": string;
            "hint-to-set-contact-prop-by-expression": string;
            "histogram-of-percentage-listened": string;
            home: string;
            "how-to-import-tree-results": string;
            "human-readable": string;
            "hung-up": string;
            "i-have-translated-my-choices": string;
            if: string;
            "if-a-respondent-has-already-started-this-tree-but-not-finished": string;
            "if-all-following-true": string;
            "if-all-of-the-following-are-true": string;
            "if-any-following-true": string;
            "if-any-of-the-following-are-true": string;
            "if-at-least": string;
            "if-at-least-this-many-following-true": string;
            "if-at-least-this-many-of-the-following-are-true": string;
            "if-b-all-b-of-the-following-are-true-go-to-true": string;
            "if-cfq-block-has-x-ratings": string;
            "if-in": string;
            "if-not-in": string;
            "if-subscriber-custom-data": string;
            "if-subscriber-language-is": string;
            "if-subscriber-language-is-unknown": string;
            "if-subscriber-start-date-is": string;
            "if-symbols-are-used-then-reflect-in-filename": string;
            "if-the-number-of-subscribers-in-the": string;
            "if-the-subscriber-is": string;
            "if-the-value-is": string;
            "if-youd-like-to-repeat-msg-press-2": string;
            "import-done": string;
            export: string;
            "import-failed": string;
            "import-file": string;
            "replace-file": string;
            "import-file-instruction": string;
            "import-in-progress": string;
            "import-new-results": string;
            "import-results": string;
            "import-status": string;
            "import-tree": string;
            "import-tree-json": string;
            importing: string;
            "importing-file": string;
            "in-progress": string;
            "in-the-following-group": string;
            "inactive-do-not-receive-outgoing-calls": string;
            inaudible: string;
            "include-calls-from": string;
            "include-in-summary": string;
            "infinite-loops-detected-please-edit-before-sending": string;
            "infinite-loops-exist": string;
            input: string;
            "input-help": string;
            "input-required": string;
            "instructional-text-optional": string;
            interactions: string;
            "internal-notes": string;
            "internal-notes-optional": string;
            invalid: string;
            "invalid-content-type": string;
            "invalid-csv": string;
            "invalid-entry": string;
            "invalid-pattern": string;
            invalid_startingblock_key: string;
            is: string;
            "is-complete": string;
            "is-private-not-reversible": string;
            "issue-trackers": string;
            "ivr-content": string;
            "january-month": string;
            "july-month": string;
            "june-month": string;
            "key-metrics": string;
            "key-press": string;
            label: string;
            "label-is-already-in-use": string;
            language: string;
            "language-options": string;
            "language-variant": string;
            "language-tag-selector-placeholder": string;
            "language-locale-selector-placeholder": string;
            "language-selection-prompt": string;
            "language-selector": string;
            "language-selector-for-this-call": string;
            "language-selector-not-found": string;
            "language-x-csv-file": string;
            languages: string;
            "languages-have-not-been-enabled": string;
            "last-edited": string;
            "last-edited-on-this-date": string;
            "last-saved-at": string;
            lat: string;
            "latest-message-for-user-groups": string;
            "latin-languages": string;
            "learn-more-about-viamo-by-visiting": string;
            "less-than": string;
            "let-users-repeat": string;
            "letters-only": string;
            library: string;
            "load-more-subscribers": string;
            loading: string;
            "loading-average-call-durations": string;
            "local-currency": string;
            "local-time-is-utc": string;
            location: string;
            "location-selector": string;
            lock: string;
            "lock-the-date-range-to-the-dates-above": string;
            locked: string;
            logic: string;
            lon: string;
            "machine-readable": string;
            "machine-readable-format": string;
            "make-new-subscriber": string;
            "manage-queues": string;
            "manage-responses": string;
            "manage-statements": string;
            "manage-transcriptions": string;
            "march-month": string;
            "mark-call-as-complete": string;
            "match-for-groups-not-found": string;
            "match-for-languages-not-found": string;
            "match-for-properties-not-found": string;
            "max-amount": string;
            "max-code-issue": string;
            "max-days": string;
            "max-duration-in-seconds": string;
            "max-length": string;
            "max-number-of-repeats": string;
            "maximum-choices": string;
            "maximum-number-of-response-digits": string;
            "maximum-record-duration": string;
            "maximum-value": string;
            "maximum-value-(inclusive)": string;
            "may-month": string;
            "mcq-response-format": string;
            "merge-all-calls-from-same-subscriber": string;
            "merge-incomplete-calls-from-the-same-subscriber": string;
            "merge-only-resumed-calls": string;
            "merge-options": string;
            message: string;
            "message-block-values": string;
            "message-blocks-only": string;
            "message-details": string;
            "message-title": string;
            method: string;
            "min-amount": string;
            "min-length": string;
            "minimum-choices": string;
            "minimum-value": string;
            "minimum-value-(inclusive)": string;
            minutes: string;
            modified: string;
            "modify-subscriber": string;
            "modify-subscriber-active-status-to": string;
            "modify-subscriber-preferred-content-type-for": string;
            "modify-subscriber-start-date-to": string;
            "modify-subscribers-start-date-to-absolute-date-here": string;
            mon: string;
            "monday-day": string;
            month: string;
            monthly: string;
            "months-after": string;
            "months-before": string;
            more: string;
            "more-options": string;
            "more-than": string;
            "most-active-blocks": string;
            "most-recent-published-version": string;
            "most-recent-version": string;
            "most-recent-version-of": string;
            mostly: string;
            "msmcq-description-p1": string;
            "msmcq-description-p2": string;
            "msmcq-description-p3": string;
            "multiple-choice-question": string;
            "multiple-select-multiple-choice-question": string;
            name: string;
            never: string;
            "new-contact-created": string;
            "new-edits-click-save": string;
            "new-exclamation": string;
            "new-issue-tracker": string;
            "new-property": string;
            "new-subscriber-value": string;
            "new-transcription-task": string;
            "new-transcription-task-created": string;
            "new-transcription-tasks-generated": string;
            "new-tree": string;
            "new-tree-created": string;
            "new-version": string;
            "new-version-created": string;
            newest: string;
            "newest-to-oldest": string;
            next: string;
            no: string;
            "no-action-selected": string;
            "no-admin-file-yet-filters": string;
            "no-admin-file-yet-selection-confirmation": string;
            "no-audio-files-found-for-X": string;
            "no-audio-files-found-in-organisation": string;
            "no-audio-yet": string;
            "no-blocks-for-content": string;
            "no-blocks-found-for-tree-with-identifier": string;
            "no-change": string;
            "no-choice-selected": string;
            "no-choices-added": string;
            "no-choices-yet-please-specify": string;
            "no-choices-yet-please-specify-your-choices-first-in-the-sidebar": string;
            "no-clipboard-content-yet": string;
            "no-content-blocks": string;
            "no-content-blocks-to-populate-content-onto": string;
            "no-content-types-enabled": string;
            "no-credit": string;
            "no-csv-exports-for-these-results-have-been-created-yet": string;
            "no-data": string;
            "no-directory-selection-blocks": string;
            "no-groups-created-yet": string;
            "no-labels-or-tags": string;
            "no-languages-enabled": string;
            "no-languages-enabled-on-the-tree": string;
            "no-matches-found": string;
            "no-messages-created-yet": string;
            "no-number-of-audio-files-per-task-supplied": string;
            "no-operator-contact-lists-made-yet": string;
            "no-preferred-channel-selected": string;
            "no-preferred-language": string;
            "no-question-selected": string;
            "no-question-text-provided": string;
            "no-result-for-the-selected-filters": string;
            "no-results-for-this-block-yet": string;
            "no-results-not-sent-yet": string;
            "no-results-yet": string;
            "no-shareable-links-have-been-created-yet": string;
            "no-sms-content-yet": string;
            "no-social-content-yet": string;
            "no-subscriber-field-type-map-coordinates": string;
            "no-surveys-created": string;
            "no-tag-found": string;
            "no-tagged-blocks": string;
            "no-tree-found-with-identifier": string;
            "no-trees-created-yet": string;
            "no-trees-have-been-created-yet": string;
            "no-ussd-content-yet": string;
            "no-validation": string;
            "no-value": string;
            "none-selected": string;
            normalize: string;
            "normalize-chart-results": string;
            not: string;
            "not-available": string;
            "not-created-any-language-selectors-yet": string;
            "not-equal-to": string;
            "not-found": string;
            "not-in-the-following-group": string;
            "not-launched-yet": string;
            "not-set": string;
            "november-month": string;
            now: string;
            "num-ratings-per-statement": string;
            "num-ratings-that-each-statement-should-receive": string;
            number: string;
            "number-of-calls-in-date-range": string;
            "number-of-calls-in-the-last": string;
            "number-of-choices": string;
            "number-of-exits": string;
            "number-of-outputs": string;
            "number-of-people-who-ended-at-this-block": string;
            "numbers-alphabet": string;
            "numbers-only": string;
            "numeric-average": string;
            "numeric-block-title": string;
            "numeric-branch": string;
            "numeric-quesion-block": string;
            "numeric-question": string;
            occurrences: string;
            "october-month": string;
            of: string;
            "of-following-true": string;
            "of-the-following-are-true": string;
            "of-the-following-are-true-go-to-true": string;
            offline: string;
            "offline-content": string;
            "oldest-to-newest": string;
            on: string;
            "on-line": string;
            "one-output-for-all-choices": string;
            "only-accepts-word-characters": string;
            "only-display-latest-interaction-if-multiple-interactions-exist-for-the-same-session-and-block": string;
            "only-question-blocks": string;
            "open-block-with-voice-set-sub-prop-warning": string;
            "open-ended-audio-export-ready": string;
            "open-ended-question": string;
            "open-ended-responses": string;
            "open-external-link": string;
            "open-in-new-window": string;
            "open-link": string;
            "open-link-in-new-window": string;
            "operator-contact-list": string;
            "operator-queue-name": string;
            operators: string;
            "optional-description": string;
            "optionally-you-can-create-loop-back": string;
            options: string;
            or: string;
            order: string;
            "order-by": string;
            "order-of-components-dont-matter-but-must-be-adjacent-one-another": string;
            "order-of-results": string;
            "organization-not-found-with-api-key": string;
            "original-file": string;
            "original-quality": string;
            originally: string;
            "outgoing-calls": string;
            output: string;
            "output-branching": string;
            "output-clipboard": string;
            "output-connected": string;
            "output-error": string;
            "output-exit": string;
            "output-expression": string;
            "output-failed": string;
            "output-false": string;
            "output-not-met": string;
            "output-quota-met": string;
            "output-sms": string;
            "output-true": string;
            "output-ussd": string;
            "output-voice": string;
            outputs: string;
            partly: string;
            password: string;
            "pattern-not-provided-for-tree": string;
            pause: string;
            "percent-of-audio-listened": string;
            "percent-of-the-content-provided": string;
            phone: string;
            "phone-number": string;
            "phone-quality": string;
            "phone-recording": string;
            "pick-a-date-range-to-display-block-interaction-totals": string;
            "plain-input": string;
            play: string;
            "play-audio": string;
            "please-fix-the-validation-errors-in-this-tree-before-publishing": string;
            "please-provide-numeric-codes": string;
            "please-provide-valid-start-and-end-numbers": string;
            "please-resolve-the-set-of-infinite-loops-before-sending-this-tree": string;
            "please-select-a-numeric-question-block": string;
            "please-select-channel": string;
            "please-translate-choices": string;
            "please-try-again-or-contact": string;
            "precipitation-level": string;
            press: string;
            "preview-file": string;
            previous: string;
            "previous-exports": string;
            "previous-imports": string;
            "primary-information-heading": string;
            "log-message": string;
            "pro-tip": string;
            "problem-connecting-api": string;
            processing: string;
            "product-code": string;
            program: string;
            "program-help-generate-code-block": string;
            "program-help-validate-code-block": string;
            prompt: string;
            "prompt-for-statement": string;
            prompts: string;
            property: string;
            "property-configuration": string;
            "property-not-supported": string;
            protocol: string;
            "provide-a-language-selector-menu": string;
            "provide-key": string;
            "provide-url": string;
            publish: string;
            "publish-new-version": string;
            "publish-the-newest-version-of-this-tree": string;
            "publish-this-version-of-the-flow": string;
            published: string;
            "published-header": string;
            question: string;
            "question-and-message-blocks": string;
            "question-blocks-only": string;
            "question-prompt": string;
            "question-responses": string;
            "question-title": string;
            "quota-threshold": string;
            rain: string;
            "random-branch": string;
            "random-code": string;
            "ready-to-send": string;
            receive: string;
            "receive-outgoing-calls": string;
            received: string;
            "recipient-group": string;
            recommended: string;
            "recommended-export-format-settings": string;
            "record-group-message": string;
            "record-group-message-title": string;
            reject: string;
            "relative-to-numeric-input": string;
            "relative-to-the-call-date": string;
            reload: string;
            remove: string;
            "remove-condition": string;
            "remove-file": string;
            "remove-filter-tags": string;
            "remove-from": string;
            "remove-from-group": string;
            "remove-question": string;
            "removes-subscribers-from-the": string;
            repeat: string;
            "repeat-every": string;
            "repeat-questions": string;
            repeating: string;
            repeats: string;
            replace: string;
            "replace-existing-audio-files-on-blocks": string;
            reset: string;
            "reset-all-filter": string;
            "reset-all-filters": string;
            "reset-breakdown-and-show-interactions": string;
            "reset-breakdown-and-show-total-interactions": string;
            "reset-filters": string;
            "resolve-warnings-and-save-simulate-clipboard": string;
            "resource-view": string;
            response: string;
            "response-timeout": string;
            responses: string;
            "responses-in-this-task": string;
            "responses-to-this-block-might-contain-personal-identifying-information": string;
            "responses-to-this-block-will-be-hidden-from-users-without-permission-to-view-personal-information": string;
            "restored-title-version": string;
            "restored-tree": string;
            "result-import": string;
            results: string;
            "results-listed-on-page": string;
            "resume-tree-for-partial-respondents": string;
            "retain-only-most-recent-call-from-same-subscriber": string;
            "rich_messaging-content": string;
            rows: string;
            "rows-processed": string;
            "rule-components": string;
            "run-another-tree": string;
            "runs-the-latest-version-of": string;
            "runs-the-latest-version-of ": string;
            "record-audio": string;
            "upload-audio": string;
            sat: string;
            "saturday-day": string;
            save: string;
            "save-and-continue": string;
            "save-and-go-to-next-page": string;
            "save-changes-to-the-flow": string;
            "save-selection": string;
            "save-template-instruction": string;
            "save-transcriptions": string;
            saved: string;
            saving: string;
            "saving-and-checking-for-errors": string;
            "saving-transcriptions": string;
            "saving-tree": string;
            "schedule-and-send-an-outgoing-call": string;
            "schedule-type": string;
            "search-audio-library": string;
            "search-subscribers": string;
            "secondary-information-headings": string;
            seconds: string;
            "seconds-ago": string;
            "seconds-for-a-response": string;
            "seconds-for-response": string;
            "see-error-report-instruction": string;
            "see-more-versions": string;
            "see-your-notifications-inbox-for-the-download-link": string;
            "select-a": string;
            "select-a-caller-from-the-list-below": string;
            "select-a-candidate-block": string;
            "select-a-channel": string;
            "select-a-field": string;
            "select-a-property": string;
            "select-a-question": string;
            "select-a-tag": string;
            "select-a-tag-placeholder": string;
            "select-a-value": string;
            "select-all": string;
            "select-audio": string;
            "select-block": string;
            "select-data": string;
            "select-from-audio-library": string;
            "select-group-message-to-play": string;
            "select-groups": string;
            "select-input-block": string;
            "select-input-source": string;
            "select-languages": string;
            "select-modes": string;
            "select-none": string;
            "select-property-type": string;
            "select-provider": string;
            "select-queue": string;
            "select-source": string;
            "select-source-content": string;
            "select-subscribers": string;
            "select-the-content-type-to-be-enabled-for-this-tree": string;
            select_at_least_1_property: string;
            select_property_to_set: string;
            "select-value-for-choices-for-selected-property": string;
            selected: string;
            "selected-groups": string;
            "selected-subscribers": string;
            "selected-x-blocks": string;
            "selection-confirmation": string;
            "selection-confirmation-instructions": string;
            "selection-response-instructions": string;
            send: string;
            "send-on-date": string;
            "send-request-to-call-center": string;
            "send-request-to-different-call-center": string;
            "send-this-call-to": string;
            "send-tree": string;
            "send-tree-ellipsis": string;
            "sends-call-as-random-dial-campaign": string;
            "sends-call-at-specified-time": string;
            "sends-call-immediately": string;
            "sends-call-repeating-based-on-options": string;
            "sensitive-data": string;
            "separate-output-for-each-choice": string;
            "advanced-configuration-of-outputs": string;
            "september-month": string;
            sessions: string;
            "set-as-a-starting-block": string;
            "set-as-exit-block": string;
            "set-as-starting-block": string;
            "set-channel-type": string;
            "set-choice-options": string;
            "set-custom-subscriber-data": string;
            "set-preferred-channel-type": string;
            "set-preferred-content-type": string;
            "set-sub-prop-w-response": string;
            "share-results": string;
            "shareable-link-to-results-for-this-tree": string;
            "shareable-links": string;
            "shortened-title-for-summary": string;
            "shortened-title-for-summary-description": string;
            "should-ignore-offline-submissions": string;
            "should-redeem-code": string;
            show: string;
            "show-all": string;
            "show-all-results": string;
            "show-between-the-following-dates": string;
            "show-clipboard-simulator": string;
            "show-empty-only": string;
            "show-interactions": string;
            "show-key-metrics": string;
            "show-key-metrics-lower": string;
            "show-keymetrics-ajax-error": string;
            "show-less-options": string;
            "show-message-text": string;
            "show-more-options": string;
            "show-percentage-listened": string;
            "show-results-from-incomplete-engagements": string;
            "show-stars": string;
            "show-subscriber-id": string;
            "show-summary-metrics": string;
            "showing-block-content-filtered-by-X": string;
            "showing-entire-audio-library": string;
            "shuffle-randomly-again": string;
            "sign-into-your-account": string;
            sms: string;
            "sms-content": string;
            "text-content": string;
            "sms-content-not-set": string;
            "sms-disabled": string;
            "sms-enabled": string;
            "sms-prompt": string;
            "sms-responses": string;
            "sms-status": string;
            "sms-subscribers-that-reached-this-block": string;
            "sms-to": string;
            social: string;
            "social-messaging": string;
            "social-messaging-content": string;
            "social-subscribers-that-reached-this-block": string;
            sorry: string;
            "sorry-cannot-locate-the-selected-tree": string;
            "sorry-there-are-no-results-for-this-date-range": string;
            "sorry-there-was-an-issue-trying-to-export-audio-for-tree": string;
            "sorry-we-cant-find-any-results-with-that-address": string;
            "sorry-you-don-t-have-permission-to-delete-this-tree": string;
            "sorry-you-dont-have-permission-to-delete-this-tree": string;
            "sort-by-date": string;
            "sort-by-name": string;
            source: string;
            "specific-language-used-this-call": string;
            "specific-time": string;
            "specify-what-should-happen-if-a-subscribers-language-is-unknown": string;
            "start-at": string;
            "start-date": string;
            "start-date-equal-to": string;
            "start-date-greater-than": string;
            "start-date-less-than": string;
            "started-at": string;
            "starting-block-tree-begins-here": string;
            starts: string;
            status: string;
            "stock-code": string;
            subscriber: string;
            "subscriber-custom-data": string;
            "subscriber-language": string;
            "subscriber-prop-to-send-payload": string;
            "subscriber-properties": string;
            "subscriber-properties-to-snapshot": string;
            "subscriber-property": string;
            "subscriber-property-to-branch-via": string;
            "subscriber-start-date": string;
            "subscriber-starting-date-reference": string;
            subscribers: string;
            "subscribers-that-reached-this-block": string;
            success: string;
            "successfully-imported-result": string;
            "summary-block-description": string;
            sun: string;
            "sun-level": string;
            "sunday-day": string;
            sunny: string;
            survey: string;
            "survey-details": string;
            "switch-to-tree-view-to-add-blocks": string;
            "system-generated": string;
            "tag-filter-description": string;
            "tag-filters": string;
            tags: string;
            "task-was-successfully-deleted": string;
            "tell-me-more": string;
            "test-call": string;
            "test-call-queued-at": string;
            "test-call-request-sent": string;
            "test-expression": string;
            "text-responses": string;
            "text-responses-sms-ussd": string;
            "that-block-was-not-found-please-save-and-try-again": string;
            "that-collaborative-filtering-page-was-not-found-please-try-again": string;
            "that-tree-json-was-not-found-please-try-again": string;
            "that-tree-set-was-not-found-please-try-again": string;
            "that-tree-was-not-found-please-try-again": string;
            "the-contacts-x-property-will-be-set-using-block-input": string;
            "the-json-code-that-has-been-imported-is-invalid-or-can-not-be-parsed": string;
            "flow-invalid": string;
            "the-property-will-be-set-to-x": string;
            "the-property-will-be-set-using-block-input": string;
            "the-remaining-tasks-are-visible-below": string;
            "the-response-from-the": string;
            "the-specified-tree-version": string;
            "the-transcription-set-was-not-found": string;
            "the-tree-version": string;
            "the-tree-version-x-was-deleted": string;
            "the-tree-x-was-deleted": string;
            "the-tree-x-was-restored": string;
            "then-callers-will-go-to-the-quota-met-output-if-not-callers-will-go-to-the-not-met-output": string;
            "there-are-no-results-yet-please-check-back-later": string;
            "this-block-branches-based-on-type-of-the-recipient": string;
            "this-block-directs-callers-based-on-the-total-number-of-calls-1": string;
            "this-block-directs-callers-based-on-the-total-number-of-calls-2": string;
            "this-block-directs-callers-based-on-the-total-number-of-subs-1": string;
            "this-block-directs-callers-based-on-the-total-number-of-subs-2": string;
            "this-block-directs-callers-based-on-their-answers": string;
            "this-block-directs-callers-on-previous-answers": string;
            "this-block-directs-callers-random": string;
            "this-block-generates-the-weather-forecast-1": string;
            "this-block-generates-the-weather-forecast-2": string;
            "this-block-is-configured-by-the-referrals-app": string;
            "this-block-runs-the-destination-tree-1": string;
            "this-block-runs-the-destination-tree-2": string;
            "this-block-runs-the-destination-tree-3": string;
            "this-tree": string;
            "this-tree-set": string;
            "three-components-used-to-create-assignment-rules-and-name-audio-files": string;
            thunderstorms: string;
            thurs: string;
            "thursday-day": string;
            timeline: string;
            "timeline-total-interactions": string;
            times: string;
            "times-for-incorrect-responses": string;
            "times-in-utc": string;
            "times-in-your-account-time-zone": string;
            timespan: string;
            timezone: string;
            title: string;
            to: string;
            "toggle-block-editor-tooltip": string;
            "to-attach-a-message-to-a-call": string;
            "to-attach-a-survey-to-a-call": string;
            "to-attach-a-tree-to-a-call": string;
            "to-be-matched-to-tree": string;
            "to-send-call-to-only-some-subscribers": string;
            "toggle-to-auto-gen-content-from-block": string;
            "toggle-to-overwrite-auto-genned-content": string;
            "toggles-subscriber-receiving-outgoing-calls": string;
            "tooltip-new-connection": string;
            "tooltip-relocate-connection": string;
            "tooltip-remove-connection": string;
            "tooltip-delete-block": string;
            "delete-block": string;
            "tooltip-duplicate-block": string;
            too_many_languages_for_collaborative_filtering: string;
            too_many_languages_for_collaborative_filtering_description: string;
            total: string;
            "total-audio-length": string;
            "total-interactions": string;
            "total-open-ended-responses": string;
            "total-responses": string;
            "total-results": string;
            "total-sms-responses": string;
            "total-versions": string;
            "total-voice-responses": string;
            totals: string;
            "transcription-task-successfully-updated": string;
            "transcription-tasks-can-be-sent-out-to-external-transcribers-to-easily-transcribe-open-ended-audio-responses": string;
            transcriptions: string;
            "transcriptions-saved": string;
            "transcriptions-saved-continuing-to-next-page": string;
            "transfer-amount": string;
            "transfer-amount-currency": string;
            "transferto-cross-border-mobile-payments": string;
            tree: string;
            "tree-could-not-be-published": string;
            "tree-deleted": string;
            "tree-details": string;
            "tree-does-not-have-any-blocks-yet": string;
            "tree-duplicated": string;
            "tree-identifier-not-provided": string;
            "tree-is-empty": string;
            "tree-is-empty-please-use-the-add-block-button-on-the-top-left-to-add-some-blocks-to-get-started": string;
            "tree-restored": string;
            "tree-result-import-heading-validation-error": string;
            "tree-result-import-in-progress": string;
            "tree-saved": string;
            "tree-update-conflict": string;
            "tree-used-elsewhere-by-x-at-x": string;
            "tree-versions": string;
            trees: string;
            "trigger-outgoing-call": string;
            "trimmed-to": string;
            true: string;
            tues: string;
            "tuesday-day": string;
            "two-or-more-choices-required": string;
            "unable-to-delete-the-requested-transcription-task": string;
            "unable-to-find-block-locally-from-server-results-with-key": string;
            undo: string;
            "unexpected-error": string;
            "unique-subscribers": string;
            unknown: string;
            "unknown-error-occurred": string;
            "unknown-language": string;
            "unknown-subscriber-branch-criteria": string;
            "unlimited-if-not-defined-or-set-as-zero": string;
            unlock: string;
            "unset-as-exit-block": string;
            "untitled-block": string;
            "untitled-collab-filtering-rating": string;
            "untitled-collaborative-filtering-question": string;
            "untitled-generate-code": string;
            "untitled-message": string;
            "untitled-multiple-choice-question": string;
            "untitled-numeric-question": string;
            "untitled-open-ended-question": string;
            "untitled-question": string;
            "untitled-record-group-message": string;
            "untitled-tree": string;
            "untitled-validate-code": string;
            "update-existing-subscriber": string;
            "update-task": string;
            "update-transcription-task": string;
            updated: string;
            update: string;
            upload: string;
            "upload-a-csv-with-column-codes": string;
            "upload-audio-files-to-X": string;
            "upload-codes": string;
            "upload-csv-file": string;
            "upload-csv-file-instruction": string;
            "upload-error": string;
            "upload-file": string;
            uploading: string;
            "url-destination": string;
            "url-for-this-csv-export-via-api-key": string;
            "usd-at-current-exchange": string;
            "usd-exchange-warning-message": string;
            "use-a-specific-language-for-this-call": string;
            "use-expressions": string;
            "use-custom-block-ordering": string;
            "use-different-multimedia-files-each-language": string;
            "use-full-text-descriptions": string;
            "use-hybrid-format": string;
            "use-machine-readable-format": string;
            "use-machine-readable-numbers": string;
            "use-master-for-language": string;
            "use-simple-date-range-picker": string;
            "use-tags-in-your-location-message-for-references-in-alert": string;
            "use-text-descriptions": string;
            "use-the-button-above-to-generate-a-new-csv-export-for-this-tree": string;
            "use-the-button-above-to-generate-a-shareable-results-page-for-this-tree": string;
            "use-the-button-below-to-generate-a-shareable-results-page-for-this-tree": string;
            "use-the-form-below-to-create-a-new-transcription-task": string;
            "use-the-shareable-link-below-to-share-the-results-of-this-tree": string;
            "use-the-tag-expiry-time": string;
            "use-tree-view-to-add-blocks": string;
            "user-guide": string;
            username: string;
            "using-automatic-routing": string;
            ussd: string;
            "ussd-content": string;
            "ussd-prompt": string;
            "ussd-subscribers-that-reached-this-block": string;
            valid: string;
            "validate-code-block": string;
            "validate-code-block-ignore-offline-submissions-help": string;
            "validate-code-title": string;
            value: string;
            version: string;
            "version-capitalized": string;
            versions: string;
            "versions-capitalized": string;
            view: string;
            "view-all-responses": string;
            "view-and-manage-collaborative-submissions": string;
            "view-and-manage-collaborative-submissions-a-for-this-block": string;
            "view-and-manage-statements": string;
            "view-generate-code-block": string;
            "view-instruction": string;
            "view-issues": string;
            "view-results": string;
            "view-tracker-configuration": string;
            "view-trackers": string;
            "view-tree": string;
            "view-tree-details": string;
            "view-tree-structure": string;
            "view-tree-versions": string;
            "view-validate-code-block": string;
            "view-versions-issue-trackers": string;
            "view-x-other-versions": string;
            voice: string;
            "voice-choice-mapping-expression": string;
            "voice-content": string;
            "voice-disabled": string;
            "voice-enabled": string;
            "voice-key-press": string;
            "voice-prompt": string;
            "voice-status": string;
            "voice-subscribers-that-reached-this-block": string;
            "voice-to": string;
            wait: string;
            "waiting-for-results": string;
            "we-are-upgrading-how-we-handle": string;
            "we-didnt-find-any-matches-revisit-pattern": string;
            "we-need-audio-files-previously-uploaded-to-audio-lib-to-match-to-blocks": string;
            "weather-forecast": string;
            "webhook-block-empty-payload-info": string;
            "webhook-block-payload-help-text": string;
            "webhook-http-warning": string;
            "webhook-method": string;
            "webhook-secret": string;
            "webhook-secret-desc": string;
            "webhook-subscriber-empty-payload-info": string;
            "webhook-subscriber-payload-help-text": string;
            "webhook-untitled-block": string;
            wed: string;
            "wednesday-day": string;
            week: string;
            weekly: string;
            "weeks-after": string;
            "weeks-before": string;
            welcome: string;
            "when-block-reached-caller-exits-and-connects-to-operator": string;
            "when-block-reached-subscriber-start-date-set-to-date-based-upon-previous-numeric-input": string;
            "when-block-reached-subscriber-start-date-set-to-date-relative-to-call-and-timespan-specified": string;
            "when-block-reached-subscriber-start-date-set-to-specified": string;
            "when-finished-returns-to-this-tree-and-continues-to-any-blocks-connected-below": string;
            "when-no-preferred-language-subscriber-receives-lang-selector": string;
            "when-no-valid-response-is-received": string;
            "when-randomizing": string;
            "wind-level": string;
            windy: string;
            "with-subscriber-phone-number": string;
            words: string;
            "working-loading": string;
            "x-of-y": string;
            "x-text-responses": string;
            year: string;
            yearly: string;
            yes: string;
            "you-are-about-to-delete-a-transcription-task": string;
            "you-are-about-to-delete-a-tree": string;
            "you-are-about-to-delete-a-tree-version": string;
            "you-are-about-to-delete-this-issue-tracker": string;
            "you-can-edit-your-tree-with-the-interface-below": string;
            "you-can-send-out-the-external-link-from-the-table-below": string;
            "you-can-send-out-the-external-links-from-the-table-below": string;
            "you-have-x-unsaved-transcriptions": string;
            "you-need-permission-to-export-content": string;
            "your-browser-does-not-support-the-audio-element": string;
            "your-combined-tree-results-are-being-exported": string;
            "your-file-file-name-is-currently-being-processed": string;
            "your-open-ended-audio-download-for": string;
            "your-orgs-audio-library": string;
            "your-prompt": string;
            "youre-using-floip-expressions": string;
            "simulator-unsupported-block": string;
            "show-more": string;
            "show-less": string;
        };
        "fr.flow-builder": {
            warnings: string;
            "warnings-hint-on-import": string;
            errors: string;
            "please-fix-errors-first": string;
            "success-with-warnings": string;
            synonyms: string;
            "text-expression": string;
            "flow-builder": string;
            "bcp-47-label": string;
            "iso-639-3-label": string;
            "iso-3166-1-label": string;
            "add-language": string;
            weather: string;
            "photo-response-prompt": string;
            "include-photo-response-prompt": string;
            "group-membership-action-hint": string;
            "set-group-membership": string;
            "remove-group-membership": string;
            "clear-group-membership": string;
            "tags-label": string;
            "tags-selector-placeholder": string;
            ivr: string;
            text: string;
            rich_messaging: string;
            "add-at-least-one-block": string;
            "import-flow": string;
            "import-success": string;
            "import-explanation": string;
            "import-note": string;
            "create-flow-from-json": string;
            create: string;
            "import-json-file": string;
            "paste-json-directly": string;
            "paste-flow-json": string;
            "edit-flow-json": string;
            "invalid-json-provided": string;
            "uploaded-file": string;
            "action-label": string;
            "action-placeholder": string;
            add: string;
            "contact-property-expression": string;
            "contact-property-label": string;
            "contact-property-selector-placeholder": string;
            "contact-property-action-hint": string;
            "set-contact-property": string;
            "set-contact-property-with-response": string;
            "enter-message": string;
            "enter-label": string;
            "enter-variant": string;
            "entry-from-this-block": string;
            expression: string;
            expressions: string;
            "value-expression": string;
            "clear-contact-property": string;
            "enter-contact-property-label": string;
            "group-selector-placeholder": string;
            "fix-issue": string;
            "locate-block-issue": string;
            "show-issues": string;
            "flow-error-message": string;
            "flow-builder-documentation": string;
            "block-error-message": string;
            "accuracy-threshold-in-meters": string;
            "accuracy-timeout-in-seconds": string;
            "edit-variable": string;
            "go-to-flow": string;
            "problem-creating-flow": string;
            "problem-importing-flow": string;
            "flow-not-found": string;
            "flow-found": string;
            "fetching-flow": string;
            "create-a-new-flow": string;
            "create-flow": string;
            "new-flow": string;
            "flow-name": string;
            "flow-label": string;
            "flow-importer": string;
            "flow-exporter": string;
            "Interaction-timeout": string;
            modes: string;
            "enter-flow-name": string;
            "enter-flow-label": string;
            "enter-destination-flow-id": string;
            "maximum-digits": string;
            "max-digits-help-text": string;
            AirtimeTransferBlock: string;
            BillSubscriberBlock: string;
            CallBackWithCallCenterBlock: string;
            CallHistoryBranchBlock: string;
            CollaborativeFilteringQuestionBlock: string;
            CollaborativeFilteringRatingBlock: string;
            CollaborativeFilteringRatioBranchBlock: string;
            ConnectToOperatorBlock: string;
            ContentTypeBranchBlock: string;
            "Core.Case": string;
            "Core.Log": string;
            "Core.Output": string;
            "Core.RunFlow": string;
            "Core.SetContactProperty": string;
            "Core.SetGroupMembership": string;
            CreateSubscriberBlock: string;
            CurrentTimeBranchBlock: string;
            DecisionBranchBlock: string;
            DirectorySelectionBlock: string;
            EntitySelectionBlock: string;
            ExpressionBranchBlock: string;
            GenerateCodeBlock: string;
            GroupBranchBlock: string;
            GroupPropertyBlock: string;
            GroupSizeBranchBlock: string;
            IdValidationBlock: string;
            LanguageSelectorBlock: string;
            LocationBlock: string;
            MarkCallCompleteBlock: string;
            MessageBlock: string;
            "MobilePrimitives.Message": string;
            "MobilePrimitives.NumericResponse": string;
            "MobilePrimitives.OpenResponse": string;
            "MobilePrimitives.SelectOneResponse": string;
            "MobilePrimitives.SelectManyResponse": string;
            MultipleChoiceQuestionBlock: string;
            MultipleSelectMultipleChoiceQuestionBlock: string;
            NumericBranchBlock: string;
            NumericQuestionBlock: string;
            OpenQuestionBlock: string;
            PlayGroupMessageBlock: string;
            RandomBranchBlock: string;
            RandomOrderMultipleChoiceQuestionBlock: string;
            RecordGroupMessageBlock: string;
            RunTreeBlock: string;
            "SmartDevices.LocationResponse": string;
            "SmartDevices.PhotoResponse": string;
            SubscriberBranchBlock: string;
            SubscriberPropertiesSnapshotBlock: string;
            SubscriberPropertyBlock: string;
            SummaryBlock: string;
            TriggerOutgoingCallBlock: string;
            ValidateCodeBlock: string;
            WeatherAlertsBlock: string;
            WeatherForecastBlock: string;
            WebhookBlock: string;
            WebhookContentBlock: string;
            "X-abbreviations-set-when-creating-tree": string;
            "X-are-required-placeholder-components-for-rule-but-additional-designation-optional": string;
            "X-assigned-to-a-block": string;
            "X-of-resources-populated": string;
            "X-seconds-long": string;
            "X-subscribers-selected": string;
            "X-will-match-with-Y": string;
            "X-wont-match-with-Y": string;
            "absolute-date": string;
            accessed: string;
            action: string;
            "action-allows-custom-subscriber-data-when-block-reached": string;
            "action-changes-preferred-content-types-to-receive-in-future": string;
            "action-immediately-changes-preferred-language-of-subscriber": string;
            actions: string;
            active: string;
            "adapted-from": string;
            "add-a-description-to-this-recording": string;
            "add-a-new-recorder": string;
            "add-block": string;
            "add-condition": string;
            "add-data": string;
            "add-label-tags": string;
            "add-map-coordinates-field": string;
            "add-question": string;
            "add-to": string;
            "add-to-group": string;
            added: string;
            "additional-designation-created-in-the-rule": string;
            "adds-subscribers-to-the": string;
            "admin-csv-file": string;
            advanced: string;
            "advanced-exit-name": string;
            "advanced-exit-name-placeholder": string;
            "advanced-exit-expression-placeholder": string;
            after: string;
            "after-completing-all-output-branches": string;
            "airtime-credit-transfer": string;
            "alert-message-title": string;
            "all-block-types": string;
            "all-blocks": string;
            "all-channels": string;
            "all-content-across-this-organisation": string;
            "all-languages": string;
            "all-message-blocks": string;
            "all-other-possible-values": string;
            "all-question-blocks": string;
            "all-subscribers": string;
            "all-transcriptions-saved": string;
            "allow-visitors-to-modify-the-date-range": string;
            "allow-visitors-to-translate-the-page-in-their-language": string;
            "already-published": string;
            "already-used": string;
            and: string;
            "any-key": string;
            anytime: string;
            "api-key": string;
            "api-success": string;
            "append-or-replace-on-upload": string;
            "applies-to-calls-sent-to-all-subscribers-or-groups-containing-subscriber": string;
            apply: string;
            "apply-all-filters": string;
            "april-month": string;
            "are-you-sure-you-want-to-delete-this-shareable-link": string;
            "as-at": string;
            at: string;
            "at-character": string;
            "at-least": string;
            "at-least-one-language-must-be-checked": string;
            "at-minimum-we-need-two-placeholders": string;
            "at-this-time": string;
            "attach-multimedia": string;
            "audio-export-started-for": string;
            "audio-file-naming-pattern": string;
            "audio-files": string;
            "audio-files-per-task": string;
            "audio-lib-empty-for-this-org": string;
            "audio-library": string;
            "audio-listened": string;
            "august-month": string;
            auto: string;
            "auto-gen-content-from-block-details": string;
            "auto-link-audio-files": string;
            "automatic-routing-description": string;
            "automatic-routing-label": string;
            "automatically-enable-statements": string;
            "automatically-enable-statements-help": string;
            "average-audio-length": string;
            "avg-duration-for-all-calls": string;
            "avg-duration-for-completed-calls": string;
            back: string;
            "back-to-choices-list": string;
            "back-to-trees-list": string;
            "base-url": string;
            "base-url-placeholder": string;
            "bill-subscriber": string;
            block: string;
            "block-allows-connect-to-operator-chosen-at-random-from-pre-specified-operator-contact-list": string;
            "block-choice-filter-description": string;
            "block-code": string;
            "block-details": string;
            "block-id": string;
            "block-label": string;
            "block-name": string;
            "block-ordering": string;
            "block-ordering-help-text": string;
            "block-responses-to-send-payload": string;
            "block-semantic-label": string;
            "block-title": string;
            "block-type-unsupported-in-resource-view": string;
            blocks: string;
            "blocks-responses": string;
            "blocks-to-display": string;
            "branch-if-subscriber-property": string;
            "branch-to-true-if-the-subscriber-is-a-member-of-the": string;
            "branch-via-call-history": string;
            "branch-via-call-history-desc1": string;
            "branch-via-call-history-desc2": string;
            "branch-via-content-type": string;
            "branch-via-expression": string;
            "branch-via-group-membership": string;
            "branch-via-group-size": string;
            "branch-via-subscriber-data": string;
            "branch-via-valid-code": string;
            branching: string;
            "breakdown-by": string;
            "btn-add-exit": string;
            "call-back-block-desc": string;
            "call-back-block-dialing-list-desc": string;
            "call-back-block-dialing-list-heading": string;
            "call-back-block-enable-routing-by-queue": string;
            "call-back-block-enable-routing-by-queue-desc": string;
            "call-back-block-enter-api-key": string;
            "call-back-block-enter-dialing-list-name": string;
            "call-back-block-notify-different-org": string;
            "call-back-block-notify-this-org": string;
            "call-back-block-org-api-key": string;
            "call-back-block-queue-name": string;
            "call-back-block-select-queue": string;
            "call-finished": string;
            "call-started": string;
            "call-this-phone-number": string;
            "call-to-record": string;
            caller: string;
            "calls-after": string;
            "calls-before": string;
            "calls-quota-threshold": string;
            campaigns: string;
            cancel: string;
            "candidate-question": string;
            "cannot-delete-that-tree": string;
            "cannot-restore-that-tree": string;
            "cannot-restore-that-tree.": string;
            "cannot-map-choices-hint": string;
            "case-of-duplicates-instruction": string;
            categorization: string;
            category: string;
            "category-name": string;
            "cell-contents": string;
            "cell-contents-format": string;
            "cf-ratio-description": string;
            "chance-of-rain": string;
            "change-subscriber-language": string;
            "change-subscriber-start-date": string;
            channel: string;
            channels: string;
            characters: string;
            "check-url-api": string;
            choice: string;
            "choice-name": string;
            "choice-filter-tags": string;
            "choice-id-choice-text": string;
            "choice-id-only": string;
            "choice-keypress-options": string;
            "choice-options": string;
            "choice-options-fixed": string;
            choices: string;
            "choices-choice-attributes": string;
            "choices-prompt": string;
            "choose-a-language-selector": string;
            "choose-a-language-selector-label": string;
            "choose-audio": string;
            "choose-csv-file": string;
            "choose-date": string;
            "choose-file": string;
            "choose-how-many-seconds-to-wait": string;
            "choose-how-many-times-can-repeat": string;
            "choose-subscribers": string;
            "choose-which-numbered-key": string;
            "clear-floip-config": string;
            "clear-selection": string;
            "click-and-drag-to-create-a-new-connection": string;
            "click-and-drag-to-move-this-block": string;
            "click-here-to-download-the-file": string;
            "click-to-lock-this-choice-in-place": string;
            "click-to-remove-this-connection": string;
            "click-to-select-this-block": string;
            "click-to-toggle-editing": string;
            "click-to-unlock": string;
            clipboard: string;
            "clipboard-content": string;
            "clipboard-simulator": string;
            "clipboard-subscribers-that-reached-this-block": string;
            "clipboard-subtitle": string;
            close: string;
            cloudy: string;
            "code-length": string;
            "code-validation": string;
            codes: string;
            code: string;
            "collaborative-filtering-question": string;
            "collaborative-filtering-rating": string;
            "combined-block-results": string;
            "combined-tree-results": string;
            "compact-filter-display": string;
            "compact-filter-display-help-text": string;
            completed: string;
            "completed-interactions-per-block": string;
            "completed-of": string;
            "completed-transcriptions": string;
            "completed-via": string;
            "components-can-be-separated-by-symbols-but-not-required": string;
            "configure-floip-header": string;
            "configure-referral-entity-prompt-eg": string;
            confirm: string;
            "confirm-delete": string;
            "confirmation-for-delete-selection": string;
            "yes-delete": string;
            "no-cancel": string;
            "confirm-upload": string;
            "conflict-external-changes": string;
            "conflict-new-version": string;
            "connect-to": string;
            "connect-to-an-operator": string;
            "connect-to-the-following-operator-list": string;
            "connected-of": string;
            contact: string;
            "contact-properties": string;
            "contact-updated": string;
            content: string;
            "content-type": string;
            "content-type-1": string;
            "content-type-2": string;
            "content-type-3": string;
            "content-type-4": string;
            "content-type-5": string;
            "content-type-is-not-selected": string;
            "continue-through-exit": string;
            continuous: string;
            "corresponding-audio-file-components-examples": string;
            "could-not-add-property": string;
            "could-not-download-audio-for-that-tree": string;
            "could-not-export-open-ended-audio": string;
            "create-a-new-group": string;
            "create-a-new-list": string;
            "create-a-new-one": string;
            "create-a-new-survey": string;
            "create-a-new-tree": string;
            "create-a-tag-prompt": string;
            "create-and-upload-a-new-message": string;
            "create-at-least-one-language-selector": string;
            "create-contact-absolute-date": string;
            "create-contact-description": string;
            "create-contact-instructions": string;
            "create-contact-relative-block": string;
            "create-contact-relative-date": string;
            "create-new-link": string;
            "create-new-version": string;
            "create-task": string;
            "create-tasks": string;
            "create-transcription-tasks": string;
            "create-tree": string;
            "create-weather-alerts": string;
            "create-weather-forecast": string;
            created: string;
            "created-a-new-version-of": string;
            "created-new-version-of": string;
            "created-with": string;
            "csv-format": string;
            "currency-to-use": string;
            "current-time-after": string;
            "current-time-and": string;
            "current-time-before": string;
            "current-time-between": string;
            "current-time-day": string;
            "current-time-day-of-month": string;
            "current-time-day-of-week": string;
            "current-time-exclusive": string;
            "current-time-go-to-true-when": string;
            "current-time-inclusive": string;
            "current-time-is": string;
            "current-time-month": string;
            "current-time-select-comparison": string;
            "current-time-select-day-of-week": string;
            "current-time-select-month": string;
            "current-time-time-of-day": string;
            "current-time-time-to-compare": string;
            "current-time-timezone": string;
            "currently-set-as-exit-block": string;
            "currently-set-as-starting-block": string;
            "custom-data-category-name": string;
            "custom-data-value": string;
            "custom-ordering": string;
            "custom-settings": string;
            daily: string;
            data: string;
            "data-residency-mode-is-enabled-for-this-account-responses-to-this-block-will-be-retained-on-the-in-country-server-only-and-de-identified-before-being-transmitted-outside-the-country": string;
            "data-type-boolean": string;
            "data-type-date": string;
            "data-type-location": string;
            "data-type-map_coordinates": string;
            "data-type-multiple_choice": string;
            "data-type-number": string;
            "data-type-phone": string;
            "data-type-text": string;
            "data-validation-invalid-choice": string;
            "data-validation-invalid-value": string;
            "data-validation-max_length": string;
            "data-validation-max_numeric_digits": string;
            "date-created": string;
            "date-range": string;
            "date-range-locked": string;
            "date-updated": string;
            day: string;
            "day-of-week": string;
            days: string;
            "days-after": string;
            "days-after-adding": string;
            "days-before": string;
            "december-month": string;
            "decision-branch": string;
            "default-repeat-key": string;
            "default-sender-for-x-otherwise-systems": string;
            "delay-to-enter-repeat-key": string;
            delete: string;
            "delete-issue-tracker": string;
            "delete-task": string;
            "delete-this-shareable-link": string;
            "delete-tracker": string;
            "delete-transcription-task-question": string;
            "delete-tree": string;
            "delete-tree-question": string;
            "delete-tree-version": string;
            "delete-version": string;
            "deleted-subscriber": string;
            "deleted-title-version": string;
            "deselect-block": string;
            description: string;
            "destination-flow": string;
            "destination-tree": string;
            "destination-tree-not-found": string;
            "destination-url": string;
            "directory-selection-block-invalid-details": string;
            "directory-selection-description": string;
            "directory-selection-filter-description": string;
            "directory-selection-filters": string;
            disable: string;
            "disable-voice-sms": string;
            disabled: string;
            "disaggregate-data-by-the-audio-listened-percentage": string;
            "disaggregate-data-by-the-communication-channels": string;
            "disaggregate-data-by-the-question-choices": string;
            "display-headings-without-spaces": string;
            "display-latest-interaction-only": string;
            "display-regular-table-headings": string;
            "do-not-merge-any-calls": string;
            "do-not-prompt": string;
            "do-you-want-to-proceed": string;
            done: string;
            "dont-receive": string;
            download: string;
            "download-X-format": string;
            "download-admin-file": string;
            "download-audio-file": string;
            "download-csv": string;
            "download-csv-file-to-your-computer": string;
            "download-response-audio": string;
            "download-template": string;
            "download-template-admin-file": string;
            "download-the-audio-files-from-open-ended-responses": string;
            "download-x-template-file": string;
            draft: string;
            "drag-and-drop-instruction": string;
            dry: string;
            duplicate: string;
            "duplicate-as-new-tree": string;
            "duplicate-entire-flow": string;
            "duplicate-tree": string;
            "duplicate-tree-has-been-created": string;
            "duplicates-warning": string;
            duration: string;
            "earth-networks": string;
            edit: string;
            "edit-alert-message": string;
            "edit-block-type": string;
            "edit-case-block": string;
            "edit-collaborative-filtering-question": string;
            "edit-collaborative-filtering-rating": string;
            "edit-content": string;
            "edit-expression": string;
            "enter-expression": string;
            "flow-details": string;
            "view-flow": string;
            "edit-mode": string;
            "view-mode": string;
            "edit-generate-code-block": string;
            "edit-group-membership": string;
            "edit-location": string;
            "edit-log-block": string;
            "edit-message": string;
            "edit-multiple-choice-question": string;
            "edit-multiple-select-multiple-choice-question": string;
            "edit-new-version": string;
            "edit-numeric-question": string;
            "edit-open-ended-question": string;
            "edit-operator-contact-lists": string;
            "edit-outgoing-call": string;
            "edit-output-block": string;
            "edit-random-order-multiple-choice-question": string;
            "edit-run-flow-block": string;
            "edit-settings": string;
            "edit-subscriber-property": string;
            "edit-this-block": string;
            "edit-tree-before-sending": string;
            "edit-validate-block": string;
            "edit-voice-content": string;
            "edit-block-code": string;
            empty: string;
            "empty-audio-library": string;
            "empty-responses": string;
            enable: string;
            "enable-disable-subscriber": string;
            "enable-display-of-block-type": string;
            "enable-display-of-key-metrics": string;
            "enable-sms": string;
            "enable-voice": string;
            "enable-voice-sms": string;
            enabled: string;
            "enabled-languages": string;
            "enabled-result-tabs": string;
            "end-at": string;
            "end-date": string;
            "end-recording-by-pressing": string;
            "end-the-call-session": string;
            ends: string;
            "enter-a-value": string;
            "enter-accepted-responses": string;
            "enter-at-least-one-choice-above": string;
            "enter-at-least-three-chars": string;
            "enter-at-least-three-chars-to-search": string;
            "enter-audio-content": string;
            "enter-block-label": string;
            "enter-block-name": string;
            "enter-block-semantic-label": string;
            "enter-clipboard-content": string;
            "enter-confirmation-audio": string;
            "enter-date": string;
            "enter-title": string;
            "enter-block-code": string;
            "enter-duration": string;
            "enter-each-on-new-line": string;
            "enter-exit-label": string;
            "enter-exit-test-expression": string;
            "enter-image-content": string;
            "enter-ivr-number": string;
            "enter-num-ratings": string;
            "enter-number": string;
            "enter-number-of-days": string;
            "enter-operator-queue-name": string;
            "enter-primary-and-synonyms": string;
            "enter-primary-attribute": string;
            "enter-primary-attribute-title": string;
            "enter-program-id": string;
            "enter-property-name": string;
            "enter-secondary-attribute": string;
            "enter-secondary-attribute-title": string;
            "enter-secondary-attribute-title-2": string;
            "enter-sms-content": string;
            "enter-sms-text-here": string;
            "enter-rich-messaging-content": string;
            "enter-social-messaging-text-here": string;
            "enter-text-content": string;
            "enter-ussd-content": string;
            "enter-ussd-text-here": string;
            "enter-offline-content": string;
            "enter-value": string;
            "enter-value-for-choices-for-selected-property": string;
            "enter-video-content": string;
            entered: string;
            entity: string;
            "entity-selection-block-instructions": string;
            "equal-to": string;
            error: string;
            "error-creating-transcription-task": string;
            "error-found": string;
            "error-importing-json": string;
            "error-report": string;
            "error-updating-transcription-task": string;
            "error-uploading-file-try-again": string;
            "error-persisting-language": string;
            "error-while-attempting-to-publish-specified-tree": string;
            "error-while-downloading-template": string;
            "error-while-saving-transcriptions": string;
            "error-while-saving-tree": string;
            "establish-connection": string;
            "example-tree": string;
            examples: string;
            exceeds: string;
            "excel-supported-format": string;
            "existing-flows": string;
            "flow-builder-info-1": string;
            "learn-more": string;
            "flow-builder-info-2": string;
            "flow-builder-info-3-pt-1": string;
            "flow-builder-info-3-pt-2": string;
            "flow-builder-info-4": string;
            less: string;
            exit: string;
            "exit-block-tree-begins-here": string;
            "exit-default": string;
            "exit-otherwise-through-default": string;
            "exit-through": string;
            "exit-to-another-output": string;
            "exit-when": string;
            "expires-after": string;
            "expires-on": string;
            "export-date-time-format": string;
            "export-results-to-csv": string;
            "export-transcriptions": string;
            "export-tree-json": string;
            "export-using-current-time-zone": string;
            "export-using-utc": string;
            "export-using-utc-with-subscriber-phone-number": string;
            "expression-branch-description": string;
            failed: string;
            "failed-finding-matches": string;
            failure: string;
            false: string;
            "february-month": string;
            "feedback-message": string;
            field: string;
            "field-deleted-since-configuring-this-block": string;
            "file-details": string;
            filesize: string;
            "fill-out-template-instruction": string;
            "fill-out-template-instruction-1": string;
            "fill-out-template-instruction-2": string;
            "fill-out-template-instruction-3": string;
            "fill-out-template-instruction-4": string;
            "fill-out-template-instruction-5": string;
            "filter-block-content": string;
            "filter-by-block": string;
            "filter-by-date": string;
            "filter-by-directory-selection": string;
            "filter-by-tag": string;
            "filter-enabled": string;
            "filter-instructions": string;
            "filter-validation": string;
            filters: string;
            "filters-saved": string;
            "find-matches": string;
            "first-time-subscribers": string;
            "fix-validation-errors-before-publishing": string;
            "fixed-date": string;
            "flag-this-recording-as-either": string;
            "flagged-as-flagtype": string;
            "flagged-as-inaudible-or-empty": string;
            "floip-cleared": string;
            "floip-expressions-escape-with-double-at-symbol": string;
            "floip-instructions-1": string;
            "floip-instructions-2": string;
            "floip-sync-success": string;
            "floip-sync-warning": string;
            "flow-view": string;
            "for-a-given-subscriber-custom-data-category": string;
            "for-a-given-subscriber-go-to-true-false": string;
            "for-assistance": string;
            "for-example-to-assign-the-first-hundred-audio-responses-to-a-transcriber": string;
            "for-the-best-user-experience": string;
            "for-this-block": string;
            fri: string;
            "friday-day": string;
            "from-block-input": string;
            "from-import": string;
            "generate-code-title": string;
            "generate-csv-file": string;
            "generate-shareable-link": string;
            "generating-data-from-past-calls": string;
            "get-shareable-link": string;
            "go-to-lang-selector-interface": string;
            "go-to-true-or-false": string;
            "go-to-true-otherwise-go-to-false": string;
            "go-to-true-output-if-contact-language-is": string;
            "greater-than": string;
            group: string;
            "group-is-larger-than": string;
            "group-label": string;
            "enter-group-label": string;
            "set-group-membership-from-expression": string;
            "group-not-set": string;
            groups: string;
            "has-already-been-published": string;
            "has-been-successfully-published": string;
            "has-value": string;
            "header-validation": string;
            "header-validation-missing": string;
            "heading-exit": string;
            headings: string;
            "headings-format": string;
            "heres-what-we-know": string;
            hide: string;
            "hide-instruction": string;
            "hide-phone-numbers": string;
            "hide-question-titles": string;
            "hide-subscriber-id": string;
            "high-winds": string;
            "hint-to-set-advance-exit": string;
            "hint-to-set-contact-prop-by-expression": string;
            "histogram-of-percentage-listened": string;
            home: string;
            "how-to-import-tree-results": string;
            "human-readable": string;
            "hung-up": string;
            "i-have-translated-my-choices": string;
            if: string;
            "if-a-respondent-has-already-started-this-tree-but-not-finished": string;
            "if-all-following-true": string;
            "if-all-of-the-following-are-true": string;
            "if-any-following-true": string;
            "if-any-of-the-following-are-true": string;
            "if-at-least": string;
            "if-at-least-this-many-following-true": string;
            "if-at-least-this-many-of-the-following-are-true": string;
            "if-b-all-b-of-the-following-are-true-go-to-true": string;
            "if-cfq-block-has-x-ratings": string;
            "if-in": string;
            "if-not-in": string;
            "if-subscriber-custom-data": string;
            "if-subscriber-language-is": string;
            "if-subscriber-language-is-unknown": string;
            "if-subscriber-start-date-is": string;
            "if-symbols-are-used-then-reflect-in-filename": string;
            "if-the-number-of-subscribers-in-the": string;
            "if-the-subscriber-is": string;
            "if-the-value-is": string;
            "if-youd-like-to-repeat-msg-press-2": string;
            "import-done": string;
            export: string;
            "import-failed": string;
            "import-file": string;
            "replace-file": string;
            "import-file-instruction": string;
            "import-in-progress": string;
            "import-new-results": string;
            "import-results": string;
            "import-status": string;
            "import-tree": string;
            "import-tree-json": string;
            importing: string;
            "importing-file": string;
            "in-progress": string;
            "in-the-following-group": string;
            "inactive-do-not-receive-outgoing-calls": string;
            inaudible: string;
            "include-calls-from": string;
            "include-in-summary": string;
            "infinite-loops-detected-please-edit-before-sending": string;
            "infinite-loops-exist": string;
            input: string;
            "input-help": string;
            "input-required": string;
            "instructional-text-optional": string;
            interactions: string;
            "internal-notes": string;
            "internal-notes-optional": string;
            invalid: string;
            "invalid-content-type": string;
            "invalid-csv": string;
            "invalid-entry": string;
            "invalid-pattern": string;
            invalid_startingblock_key: string;
            is: string;
            "is-complete": string;
            "is-private-not-reversible": string;
            "issue-trackers": string;
            "ivr-content": string;
            "january-month": string;
            "july-month": string;
            "june-month": string;
            "key-metrics": string;
            "key-press": string;
            label: string;
            "label-is-already-in-use": string;
            language: string;
            "language-options": string;
            "language-tag-selector-placeholder": string;
            "language-locale-selector-placeholder": string;
            "language-variant": string;
            "language-selection-prompt": string;
            "language-selector": string;
            "language-selector-for-this-call": string;
            "language-selector-not-found": string;
            "language-x-csv-file": string;
            languages: string;
            "languages-have-not-been-enabled": string;
            "last-edited": string;
            "last-edited-on-this-date": string;
            "last-saved-at": string;
            lat: string;
            "latest-message-for-user-groups": string;
            "latin-languages": string;
            "learn-more-about-viamo-by-visiting": string;
            "less-than": string;
            "let-users-repeat": string;
            "letters-only": string;
            library: string;
            "load-more-subscribers": string;
            loading: string;
            "loading-average-call-durations": string;
            "local-currency": string;
            "local-time-is-utc": string;
            location: string;
            "location-selector": string;
            lock: string;
            "lock-the-date-range-to-the-dates-above": string;
            locked: string;
            logic: string;
            lon: string;
            "machine-readable": string;
            "machine-readable-format": string;
            "make-new-subscriber": string;
            "manage-queues": string;
            "manage-responses": string;
            "manage-statements": string;
            "manage-transcriptions": string;
            "march-month": string;
            "mark-call-as-complete": string;
            "match-for-groups-not-found": string;
            "match-for-languages-not-found": string;
            "match-for-properties-not-found": string;
            "max-amount": string;
            "max-code-issue": string;
            "max-days": string;
            "max-duration-in-seconds": string;
            "max-length": string;
            "max-number-of-repeats": string;
            "maximum-choices": string;
            "maximum-number-of-response-digits": string;
            "maximum-record-duration": string;
            "maximum-value": string;
            "maximum-value-(inclusive)": string;
            "may-month": string;
            "mcq-response-format": string;
            "merge-all-calls-from-same-subscriber": string;
            "merge-incomplete-calls-from-the-same-subscriber": string;
            "merge-only-resumed-calls": string;
            "merge-options": string;
            message: string;
            "message-block-values": string;
            "message-blocks-only": string;
            "message-details": string;
            "message-title": string;
            method: string;
            "min-amount": string;
            "min-length": string;
            "minimum-choices": string;
            "minimum-value": string;
            "minimum-value-(inclusive)": string;
            minutes: string;
            modified: string;
            "modify-subscriber": string;
            "modify-subscriber-active-status-to": string;
            "modify-subscriber-preferred-content-type-for": string;
            "modify-subscriber-start-date-to": string;
            "modify-subscribers-start-date-to-absolute-date-here": string;
            mon: string;
            "monday-day": string;
            month: string;
            monthly: string;
            "months-after": string;
            "months-before": string;
            more: string;
            "more-options": string;
            "more-than": string;
            "most-active-blocks": string;
            "most-recent-published-version": string;
            "most-recent-version": string;
            "most-recent-version-of": string;
            mostly: string;
            "msmcq-description-p1": string;
            "msmcq-description-p2": string;
            "msmcq-description-p3": string;
            "multiple-choice-question": string;
            "multiple-select-multiple-choice-question": string;
            name: string;
            never: string;
            "new-contact-created": string;
            "new-edits-click-save": string;
            "new-exclamation": string;
            "new-issue-tracker": string;
            "new-property": string;
            "new-subscriber-value": string;
            "new-transcription-task": string;
            "new-transcription-task-created": string;
            "new-transcription-tasks-generated": string;
            "new-tree": string;
            "new-tree-created": string;
            "new-version": string;
            "new-version-created": string;
            newest: string;
            "newest-to-oldest": string;
            next: string;
            no: string;
            "no-action-selected": string;
            "no-admin-file-yet-filters": string;
            "no-admin-file-yet-selection-confirmation": string;
            "no-audio-files-found-for-X": string;
            "no-audio-files-found-in-organisation": string;
            "no-audio-yet": string;
            "no-blocks-for-content": string;
            "no-blocks-found-for-tree-with-identifier": string;
            "no-change": string;
            "no-choice-selected": string;
            "no-choices-added": string;
            "no-choices-yet-please-specify": string;
            "no-choices-yet-please-specify-your-choices-first-in-the-sidebar": string;
            "no-clipboard-content-yet": string;
            "no-content-blocks": string;
            "no-content-blocks-to-populate-content-onto": string;
            "no-content-types-enabled": string;
            "no-credit": string;
            "no-csv-exports-for-these-results-have-been-created-yet": string;
            "no-data": string;
            "no-directory-selection-blocks": string;
            "no-groups-created-yet": string;
            "no-labels-or-tags": string;
            "no-languages-enabled": string;
            "no-languages-enabled-on-the-tree": string;
            "no-matches-found": string;
            "no-messages-created-yet": string;
            "no-number-of-audio-files-per-task-supplied": string;
            "no-operator-contact-lists-made-yet": string;
            "no-preferred-channel-selected": string;
            "no-preferred-language": string;
            "no-question-selected": string;
            "no-question-text-provided": string;
            "no-result-for-the-selected-filters": string;
            "no-results-for-this-block-yet": string;
            "no-results-not-sent-yet": string;
            "no-results-yet": string;
            "no-shareable-links-have-been-created-yet": string;
            "no-sms-content-yet": string;
            "no-social-content-yet": string;
            "no-subscriber-field-type-map-coordinates": string;
            "no-surveys-created": string;
            "no-tag-found": string;
            "no-tagged-blocks": string;
            "no-tree-found-with-identifier": string;
            "no-trees-created-yet": string;
            "no-trees-have-been-created-yet": string;
            "no-ussd-content-yet": string;
            "no-validation": string;
            "no-value": string;
            "none-selected": string;
            normalize: string;
            "normalize-chart-results": string;
            not: string;
            "not-available": string;
            "not-created-any-language-selectors-yet": string;
            "not-equal-to": string;
            "not-found": string;
            "not-in-the-following-group": string;
            "not-launched-yet": string;
            "not-set": string;
            "november-month": string;
            now: string;
            "num-ratings-per-statement": string;
            "num-ratings-that-each-statement-should-receive": string;
            number: string;
            "number-of-calls-in-date-range": string;
            "number-of-calls-in-the-last": string;
            "number-of-choices": string;
            "number-of-exits": string;
            "number-of-outputs": string;
            "number-of-people-who-ended-at-this-block": string;
            "numbers-alphabet": string;
            "numbers-only": string;
            "numeric-average": string;
            "numeric-block-title": string;
            "numeric-branch": string;
            "numeric-quesion-block": string;
            "numeric-question": string;
            occurrences: string;
            "october-month": string;
            of: string;
            "of-following-true": string;
            "of-the-following-are-true": string;
            "of-the-following-are-true-go-to-true": string;
            offline: string;
            "offline-content": string;
            "oldest-to-newest": string;
            on: string;
            "on-line": string;
            "one-output-for-all-choices": string;
            "only-accepts-word-characters": string;
            "only-display-latest-interaction-if-multiple-interactions-exist-for-the-same-session-and-block": string;
            "only-question-blocks": string;
            "open-block-with-voice-set-sub-prop-warning": string;
            "open-ended-audio-export-ready": string;
            "open-ended-question": string;
            "open-ended-responses": string;
            "open-external-link": string;
            "open-in-new-window": string;
            "open-link": string;
            "open-link-in-new-window": string;
            "operator-contact-list": string;
            "operator-queue-name": string;
            operators: string;
            "optional-description": string;
            "optionally-you-can-create-loop-back": string;
            options: string;
            or: string;
            order: string;
            "order-by": string;
            "order-of-components-dont-matter-but-must-be-adjacent-one-another": string;
            "order-of-results": string;
            "organization-not-found-with-api-key": string;
            "original-file": string;
            "original-quality": string;
            originally: string;
            "outgoing-calls": string;
            output: string;
            "output-branching": string;
            "output-clipboard": string;
            "output-connected": string;
            "output-error": string;
            "output-exit": string;
            "output-expression": string;
            "output-failed": string;
            "output-false": string;
            "output-not-met": string;
            "output-quota-met": string;
            "output-sms": string;
            "output-true": string;
            "output-ussd": string;
            "output-voice": string;
            outputs: string;
            partly: string;
            password: string;
            "pattern-not-provided-for-tree": string;
            pause: string;
            "percent-of-audio-listened": string;
            "percent-of-the-content-provided": string;
            phone: string;
            "phone-number": string;
            "phone-quality": string;
            "phone-recording": string;
            "pick-a-date-range-to-display-block-interaction-totals": string;
            "plain-input": string;
            play: string;
            "play-audio": string;
            "please-fix-the-validation-errors-in-this-tree-before-publishing": string;
            "please-provide-numeric-codes": string;
            "please-provide-valid-start-and-end-numbers": string;
            "please-resolve-the-set-of-infinite-loops-before-sending-this-tree": string;
            "please-select-a-numeric-question-block": string;
            "please-select-channel": string;
            "please-translate-choices": string;
            "please-try-again-or-contact": string;
            "precipitation-level": string;
            press: string;
            "preview-file": string;
            previous: string;
            "previous-exports": string;
            "previous-imports": string;
            "primary-information-heading": string;
            "log-message": string;
            "pro-tip": string;
            "problem-connecting-api": string;
            processing: string;
            "product-code": string;
            program: string;
            "program-help-generate-code-block": string;
            "program-help-validate-code-block": string;
            prompt: string;
            "prompt-for-statement": string;
            prompts: string;
            property: string;
            "property-configuration": string;
            "property-not-supported": string;
            protocol: string;
            "provide-a-language-selector-menu": string;
            "provide-key": string;
            "provide-url": string;
            publish: string;
            "publish-new-version": string;
            "publish-the-newest-version-of-this-tree": string;
            "publish-this-version-of-the-flow": string;
            published: string;
            "published-header": string;
            question: string;
            "question-and-message-blocks": string;
            "question-blocks-only": string;
            "question-prompt": string;
            "question-responses": string;
            "question-title": string;
            "quota-threshold": string;
            rain: string;
            "random-branch": string;
            "random-code": string;
            "ready-to-send": string;
            receive: string;
            "receive-outgoing-calls": string;
            received: string;
            "recipient-group": string;
            recommended: string;
            "recommended-export-format-settings": string;
            "record-group-message": string;
            "record-group-message-title": string;
            reject: string;
            "relative-to-numeric-input": string;
            "relative-to-the-call-date": string;
            reload: string;
            remove: string;
            "remove-condition": string;
            "remove-file": string;
            "remove-filter-tags": string;
            "remove-from": string;
            "remove-from-group": string;
            "remove-question": string;
            "removes-subscribers-from-the": string;
            repeat: string;
            "repeat-every": string;
            "repeat-questions": string;
            repeating: string;
            repeats: string;
            replace: string;
            "replace-existing-audio-files-on-blocks": string;
            reset: string;
            "reset-all-filter": string;
            "reset-all-filters": string;
            "reset-breakdown-and-show-interactions": string;
            "reset-breakdown-and-show-total-interactions": string;
            "reset-filters": string;
            "resolve-warnings-and-save-simulate-clipboard": string;
            "resource-view": string;
            response: string;
            "response-timeout": string;
            responses: string;
            "responses-in-this-task": string;
            "responses-to-this-block-might-contain-personal-identifying-information": string;
            "responses-to-this-block-will-be-hidden-from-users-without-permission-to-view-personal-information": string;
            "restored-title-version": string;
            "restored-tree": string;
            "result-import": string;
            results: string;
            "results-listed-on-page": string;
            "resume-tree-for-partial-respondents": string;
            "retain-only-most-recent-call-from-same-subscriber": string;
            "rich_messaging-content": string;
            rows: string;
            "rows-processed": string;
            "rule-components": string;
            "run-another-tree": string;
            "runs-the-latest-version-of": string;
            "runs-the-latest-version-of ": string;
            "record-audio": string;
            "upload-audio": string;
            sat: string;
            "saturday-day": string;
            save: string;
            "save-and-continue": string;
            "save-and-go-to-next-page": string;
            "save-changes-to-the-flow": string;
            "save-selection": string;
            "save-template-instruction": string;
            "save-transcriptions": string;
            saved: string;
            saving: string;
            "saving-and-checking-for-errors": string;
            "saving-transcriptions": string;
            "saving-tree": string;
            "schedule-and-send-an-outgoing-call": string;
            "schedule-type": string;
            "search-audio-library": string;
            "search-subscribers": string;
            "secondary-information-headings": string;
            seconds: string;
            "seconds-ago": string;
            "seconds-for-a-response": string;
            "seconds-for-response": string;
            "see-error-report-instruction": string;
            "see-more-versions": string;
            "see-your-notifications-inbox-for-the-download-link": string;
            "select-a": string;
            "select-a-caller-from-the-list-below": string;
            "select-a-candidate-block": string;
            "select-a-channel": string;
            "select-a-field": string;
            "select-a-property": string;
            "select-a-question": string;
            "select-a-tag": string;
            "select-a-tag-placeholder": string;
            "select-a-value": string;
            "select-all": string;
            "select-audio": string;
            "select-block": string;
            "select-data": string;
            "select-from-audio-library": string;
            "select-group-message-to-play": string;
            "select-groups": string;
            "select-input-block": string;
            "select-input-source": string;
            "select-languages": string;
            "select-modes": string;
            "select-none": string;
            "select-property-type": string;
            "select-provider": string;
            "select-queue": string;
            "select-source": string;
            "select-source-content": string;
            "select-subscribers": string;
            "select-the-content-type-to-be-enabled-for-this-tree": string;
            select_at_least_1_property: string;
            select_property_to_set: string;
            "select-value-for-choices-for-selected-property": string;
            selected: string;
            "selected-groups": string;
            "selected-subscribers": string;
            "selected-x-blocks": string;
            "selection-confirmation": string;
            "selection-confirmation-instructions": string;
            "selection-response-instructions": string;
            send: string;
            "send-on-date": string;
            "send-request-to-call-center": string;
            "send-request-to-different-call-center": string;
            "send-this-call-to": string;
            "send-tree": string;
            "send-tree-ellipsis": string;
            "sends-call-as-random-dial-campaign": string;
            "sends-call-at-specified-time": string;
            "sends-call-immediately": string;
            "sends-call-repeating-based-on-options": string;
            "sensitive-data": string;
            "separate-output-for-each-choice": string;
            "advanced-configuration-of-outputs": string;
            "september-month": string;
            sessions: string;
            "set-as-a-starting-block": string;
            "set-as-exit-block": string;
            "set-as-starting-block": string;
            "set-channel-type": string;
            "set-choice-options": string;
            "set-custom-subscriber-data": string;
            "set-preferred-channel-type": string;
            "set-preferred-content-type": string;
            "set-sub-prop-w-response": string;
            "share-results": string;
            "shareable-link-to-results-for-this-tree": string;
            "shareable-links": string;
            "shortened-title-for-summary": string;
            "shortened-title-for-summary-description": string;
            "should-ignore-offline-submissions": string;
            "should-redeem-code": string;
            show: string;
            "show-all": string;
            "show-all-results": string;
            "show-between-the-following-dates": string;
            "show-clipboard-simulator": string;
            "show-empty-only": string;
            "show-interactions": string;
            "show-key-metrics": string;
            "show-key-metrics-lower": string;
            "show-keymetrics-ajax-error": string;
            "show-less-options": string;
            "show-message-text": string;
            "show-more-options": string;
            "show-percentage-listened": string;
            "show-results-from-incomplete-engagements": string;
            "show-stars": string;
            "show-subscriber-id": string;
            "show-summary-metrics": string;
            "showing-block-content-filtered-by-X": string;
            "showing-entire-audio-library": string;
            "shuffle-randomly-again": string;
            "sign-into-your-account": string;
            sms: string;
            "sms-content": string;
            "text-content": string;
            "sms-content-not-set": string;
            "sms-disabled": string;
            "sms-enabled": string;
            "sms-prompt": string;
            "sms-responses": string;
            "sms-status": string;
            "sms-subscribers-that-reached-this-block": string;
            "sms-to": string;
            social: string;
            "social-messaging": string;
            "social-messaging-content": string;
            "social-subscribers-that-reached-this-block": string;
            sorry: string;
            "sorry-cannot-locate-the-selected-tree": string;
            "sorry-there-are-no-results-for-this-date-range": string;
            "sorry-there-was-an-issue-trying-to-export-audio-for-tree": string;
            "sorry-we-cant-find-any-results-with-that-address": string;
            "sorry-you-don-t-have-permission-to-delete-this-tree": string;
            "sorry-you-dont-have-permission-to-delete-this-tree": string;
            "sort-by-date": string;
            "sort-by-name": string;
            source: string;
            "specific-language-used-this-call": string;
            "specific-time": string;
            "specify-what-should-happen-if-a-subscribers-language-is-unknown": string;
            "start-at": string;
            "start-date": string;
            "start-date-equal-to": string;
            "start-date-greater-than": string;
            "start-date-less-than": string;
            "started-at": string;
            "starting-block-tree-begins-here": string;
            starts: string;
            status: string;
            "stock-code": string;
            subscriber: string;
            "subscriber-custom-data": string;
            "subscriber-language": string;
            "subscriber-prop-to-send-payload": string;
            "subscriber-properties": string;
            "subscriber-properties-to-snapshot": string;
            "subscriber-property": string;
            "subscriber-property-to-branch-via": string;
            "subscriber-start-date": string;
            "subscriber-starting-date-reference": string;
            subscribers: string;
            "subscribers-that-reached-this-block": string;
            success: string;
            "successfully-imported-result": string;
            "summary-block-description": string;
            sun: string;
            "sun-level": string;
            "sunday-day": string;
            sunny: string;
            survey: string;
            "survey-details": string;
            "switch-to-tree-view-to-add-blocks": string;
            "system-generated": string;
            "tag-filter-description": string;
            "tag-filters": string;
            tags: string;
            "task-was-successfully-deleted": string;
            "tell-me-more": string;
            "test-call": string;
            "test-call-queued-at": string;
            "test-call-request-sent": string;
            "test-expression": string;
            "text-responses": string;
            "text-responses-sms-ussd": string;
            "that-block-was-not-found-please-save-and-try-again": string;
            "that-collaborative-filtering-page-was-not-found-please-try-again": string;
            "that-tree-json-was-not-found-please-try-again": string;
            "that-tree-set-was-not-found-please-try-again": string;
            "that-tree-was-not-found-please-try-again": string;
            "the-contacts-x-property-will-be-set-using-block-input": string;
            "the-json-code-that-has-been-imported-is-invalid-or-can-not-be-parsed": string;
            "flow-invalid": string;
            "the-property-will-be-set-to-x": string;
            "the-property-will-be-set-using-block-input": string;
            "the-remaining-tasks-are-visible-below": string;
            "the-response-from-the": string;
            "the-specified-tree-version": string;
            "the-transcription-set-was-not-found": string;
            "the-tree-version": string;
            "the-tree-version-x-was-deleted": string;
            "the-tree-x-was-deleted": string;
            "the-tree-x-was-restored": string;
            "then-callers-will-go-to-the-quota-met-output-if-not-callers-will-go-to-the-not-met-output": string;
            "there-are-no-results-yet-please-check-back-later": string;
            "this-block-branches-based-on-type-of-the-recipient": string;
            "this-block-directs-callers-based-on-the-total-number-of-calls-1": string;
            "this-block-directs-callers-based-on-the-total-number-of-calls-2": string;
            "this-block-directs-callers-based-on-the-total-number-of-subs-1": string;
            "this-block-directs-callers-based-on-the-total-number-of-subs-2": string;
            "this-block-directs-callers-based-on-their-answers": string;
            "this-block-directs-callers-on-previous-answers": string;
            "this-block-directs-callers-random": string;
            "this-block-generates-the-weather-forecast-1": string;
            "this-block-generates-the-weather-forecast-2": string;
            "this-block-is-configured-by-the-referrals-app": string;
            "this-block-runs-the-destination-tree-1": string;
            "this-block-runs-the-destination-tree-2": string;
            "this-block-runs-the-destination-tree-3": string;
            "this-tree": string;
            "this-tree-set": string;
            "three-components-used-to-create-assignment-rules-and-name-audio-files": string;
            thunderstorms: string;
            thurs: string;
            "thursday-day": string;
            timeline: string;
            "timeline-total-interactions": string;
            times: string;
            "times-for-incorrect-responses": string;
            "times-in-utc": string;
            "times-in-your-account-time-zone": string;
            timespan: string;
            timezone: string;
            title: string;
            to: string;
            "toggle-block-editor-tooltip": string;
            "to-attach-a-message-to-a-call": string;
            "to-attach-a-survey-to-a-call": string;
            "to-attach-a-tree-to-a-call": string;
            "to-be-matched-to-tree": string;
            "to-send-call-to-only-some-subscribers": string;
            "toggle-to-auto-gen-content-from-block": string;
            "toggle-to-overwrite-auto-genned-content": string;
            "toggles-subscriber-receiving-outgoing-calls": string;
            "tooltip-new-connection": string;
            "tooltip-relocate-connection": string;
            "tooltip-remove-connection": string;
            "tooltip-delete-block": string;
            "delete-block": string;
            "tooltip-duplicate-block": string;
            too_many_languages_for_collaborative_filtering: string;
            too_many_languages_for_collaborative_filtering_description: string;
            total: string;
            "total-audio-length": string;
            "total-interactions": string;
            "total-open-ended-responses": string;
            "total-responses": string;
            "total-results": string;
            "total-sms-responses": string;
            "total-versions": string;
            "total-voice-responses": string;
            totals: string;
            "transcription-task-successfully-updated": string;
            "transcription-tasks-can-be-sent-out-to-external-transcribers-to-easily-transcribe-open-ended-audio-responses": string;
            transcriptions: string;
            "transcriptions-saved": string;
            "transcriptions-saved-continuing-to-next-page": string;
            "transfer-amount": string;
            "transfer-amount-currency": string;
            "transferto-cross-border-mobile-payments": string;
            tree: string;
            "tree-could-not-be-published": string;
            "tree-deleted": string;
            "tree-details": string;
            "tree-does-not-have-any-blocks-yet": string;
            "tree-duplicated": string;
            "tree-identifier-not-provided": string;
            "tree-is-empty": string;
            "tree-is-empty-please-use-the-add-block-button-on-the-top-left-to-add-some-blocks-to-get-started": string;
            "tree-restored": string;
            "tree-result-import-heading-validation-error": string;
            "tree-result-import-in-progress": string;
            "tree-saved": string;
            "tree-update-conflict": string;
            "tree-used-elsewhere-by-x-at-x": string;
            "tree-versions": string;
            trees: string;
            "trigger-outgoing-call": string;
            "trimmed-to": string;
            true: string;
            tues: string;
            "tuesday-day": string;
            "two-or-more-choices-required": string;
            "unable-to-delete-the-requested-transcription-task": string;
            "unable-to-find-block-locally-from-server-results-with-key": string;
            undo: string;
            "unexpected-error": string;
            "unique-subscribers": string;
            unknown: string;
            "unknown-error-occurred": string;
            "unknown-language": string;
            "unknown-subscriber-branch-criteria": string;
            "unlimited-if-not-defined-or-set-as-zero": string;
            unlock: string;
            "unset-as-exit-block": string;
            "untitled-block": string;
            "untitled-collab-filtering-rating": string;
            "untitled-collaborative-filtering-question": string;
            "untitled-generate-code": string;
            "untitled-message": string;
            "untitled-multiple-choice-question": string;
            "untitled-numeric-question": string;
            "untitled-open-ended-question": string;
            "untitled-question": string;
            "untitled-record-group-message": string;
            "untitled-tree": string;
            "untitled-validate-code": string;
            "update-existing-subscriber": string;
            "update-task": string;
            "update-transcription-task": string;
            updated: string;
            update: string;
            upload: string;
            "upload-a-csv-with-column-codes": string;
            "upload-audio-files-to-X": string;
            "upload-codes": string;
            "upload-csv-file": string;
            "upload-csv-file-instruction": string;
            "upload-error": string;
            "upload-file": string;
            uploading: string;
            "url-destination": string;
            "url-for-this-csv-export-via-api-key": string;
            "usd-at-current-exchange": string;
            "usd-exchange-warning-message": string;
            "use-a-specific-language-for-this-call": string;
            "use-expressions": string;
            "use-custom-block-ordering": string;
            "use-different-multimedia-files-each-language": string;
            "use-full-text-descriptions": string;
            "use-hybrid-format": string;
            "use-machine-readable-format": string;
            "use-machine-readable-numbers": string;
            "use-master-for-language": string;
            "use-simple-date-range-picker": string;
            "use-tags-in-your-location-message-for-references-in-alert": string;
            "use-text-descriptions": string;
            "use-the-button-above-to-generate-a-new-csv-export-for-this-tree": string;
            "use-the-button-above-to-generate-a-shareable-results-page-for-this-tree": string;
            "use-the-button-below-to-generate-a-shareable-results-page-for-this-tree": string;
            "use-the-form-below-to-create-a-new-transcription-task": string;
            "use-the-shareable-link-below-to-share-the-results-of-this-tree": string;
            "use-the-tag-expiry-time": string;
            "use-tree-view-to-add-blocks": string;
            "user-guide": string;
            username: string;
            "using-automatic-routing": string;
            ussd: string;
            "ussd-content": string;
            "ussd-prompt": string;
            "ussd-subscribers-that-reached-this-block": string;
            valid: string;
            "validate-code-block": string;
            "validate-code-block-ignore-offline-submissions-help": string;
            "validate-code-title": string;
            value: string;
            version: string;
            "version-capitalized": string;
            versions: string;
            "versions-capitalized": string;
            view: string;
            "view-all-responses": string;
            "view-and-manage-collaborative-submissions": string;
            "view-and-manage-collaborative-submissions-a-for-this-block": string;
            "view-and-manage-statements": string;
            "view-generate-code-block": string;
            "view-instruction": string;
            "view-issues": string;
            "view-results": string;
            "view-tracker-configuration": string;
            "view-trackers": string;
            "view-tree": string;
            "view-tree-details": string;
            "view-tree-structure": string;
            "view-tree-versions": string;
            "view-validate-code-block": string;
            "view-versions-issue-trackers": string;
            "view-x-other-versions": string;
            voice: string;
            "voice-choice-mapping-expression": string;
            "voice-content": string;
            "voice-disabled": string;
            "voice-enabled": string;
            "voice-key-press": string;
            "voice-prompt": string;
            "voice-status": string;
            "voice-subscribers-that-reached-this-block": string;
            "voice-to": string;
            wait: string;
            "waiting-for-results": string;
            "we-are-upgrading-how-we-handle": string;
            "we-didnt-find-any-matches-revisit-pattern": string;
            "we-need-audio-files-previously-uploaded-to-audio-lib-to-match-to-blocks": string;
            "weather-forecast": string;
            "webhook-block-empty-payload-info": string;
            "webhook-block-payload-help-text": string;
            "webhook-http-warning": string;
            "webhook-method": string;
            "webhook-secret": string;
            "webhook-secret-desc": string;
            "webhook-subscriber-empty-payload-info": string;
            "webhook-subscriber-payload-help-text": string;
            "webhook-untitled-block": string;
            wed: string;
            "wednesday-day": string;
            week: string;
            weekly: string;
            "weeks-after": string;
            "weeks-before": string;
            welcome: string;
            "when-block-reached-caller-exits-and-connects-to-operator": string;
            "when-block-reached-subscriber-start-date-set-to-date-based-upon-previous-numeric-input": string;
            "when-block-reached-subscriber-start-date-set-to-date-relative-to-call-and-timespan-specified": string;
            "when-block-reached-subscriber-start-date-set-to-specified": string;
            "when-finished-returns-to-this-tree-and-continues-to-any-blocks-connected-below": string;
            "when-no-preferred-language-subscriber-receives-lang-selector": string;
            "when-no-valid-response-is-received": string;
            "when-randomizing": string;
            "wind-level": string;
            windy: string;
            "with-subscriber-phone-number": string;
            words: string;
            "working-loading": string;
            "x-of-y": string;
            "x-text-responses": string;
            year: string;
            yearly: string;
            yes: string;
            "you-are-about-to-delete-a-transcription-task": string;
            "you-are-about-to-delete-a-tree": string;
            "you-are-about-to-delete-a-tree-version": string;
            "you-are-about-to-delete-this-issue-tracker": string;
            "you-can-edit-your-tree-with-the-interface-below": string;
            "you-can-send-out-the-external-link-from-the-table-below": string;
            "you-can-send-out-the-external-links-from-the-table-below": string;
            "you-have-x-unsaved-transcriptions": string;
            "you-need-permission-to-export-content": string;
            "your-browser-does-not-support-the-audio-element": string;
            "your-combined-tree-results-are-being-exported": string;
            "your-file-file-name-is-currently-being-processed": string;
            "your-open-ended-audio-download-for": string;
            "your-orgs-audio-library": string;
            "your-prompt": string;
            "youre-using-floip-expressions": string;
            "simulator-unsupported-block": string;
            "show-more": string;
            "show-less": string;
        };
        "en.flow-builder-validation": {
            "floip-format": string;
            "flow-first_block_id-pattern": string;
            "flow-name-minLength": string;
            "flow-interaction_timeout-type": string;
            "flow-languages-minItems": string;
            "flow-supported_modes-minItems": string;
            "block-name-pattern": string;
            "block-config-ivr-max_duration_seconds-type": string;
            "block-config-text-max_response_characters-type": string;
            "block-config-accuracy_threshold_meters-type": string;
            "block-config-accuracy_timeout_seconds-type": string;
            "block-config-value-type": string;
            "block-config-is_member-type": string;
            "block-config-set_contact_property-x-required": string;
            "resource-values-x-value-pattern": string;
            "resource-values-x-value-pattern-ivr": string;
            "numeric-block-min-value-must-be-lower-than-max-value": string;
            "numeric-block-max-value-must-be-greater-than-min-value": string;
            "numeric-block-missing-max-value-and-max-digits": string;
            "numeric-block-min-value-must-be-lower-than-implied-max-digits": string;
            "numeric-block-max-value-must-be-lower-than-implied-max-digits": string;
            "set-group-membership-groups-required": string;
            "date-must-be-selected": string;
            "input-must-be-a-number": string;
            "numeric-block-must-be-selected": string;
            "block-config-flow_id-required": string;
            "duplicate-ivr-test-test_expression": string;
            "block-config-choices-minItems": string;
            "duplicate-choice-names": string;
            "invalid-json-provided": string;
            "container-flow-is-empty": string;
            "importer-currently-supports-single-flow-only": string;
            "non-supported-spec-version": string;
            "unsupported-blocks-detected": string;
        };
        "fr.flow-builder-validation": {
            "floip-format": string;
            "flow-first_block_id-pattern": string;
            "flow-name-minLength": string;
            "flow-interaction_timeout-type": string;
            "flow-languages-minItems": string;
            "flow-supported_modes-minItems": string;
            "block-name-pattern": string;
            "block-config-ivr-max_duration_seconds-type": string;
            "block-config-text-max_response_characters-type": string;
            "block-config-accuracy_threshold_meters-type": string;
            "block-config-accuracy_timeout_seconds-type": string;
            "block-config-value-type": string;
            "block-config-is_member-type": string;
            "block-config-set_contact_property-x-required": string;
            "resource-values-x-value-pattern": string;
            "resource-values-x-value-pattern-ivr": string;
            "numeric-block-min-value-must-be-lower-than-max-value": string;
            "numeric-block-max-value-must-be-greater-than-min-value": string;
            "numeric-block-missing-max-value-and-max-digits": string;
            "numeric-block-min-value-must-be-lower-than-implied-max-digits": string;
            "numeric-block-max-value-must-be-lower-than-implied-max-digits": string;
            "set-group-membership-groups-required": string;
            "date-must-be-selected": string;
            "input-must-be-a-number": string;
            "numeric-block-must-be-selected": string;
            "block-config-flow_id-required": string;
            "duplicate-ivr-test-test_expression": string;
            "block-config-choices-minItems": string;
            "duplicate-choice-names": string;
            "invalid-json-provided": string;
            "container-flow-is-empty": string;
            "importer-currently-supports-single-flow-only": string;
            "non-supported-spec-version": string;
            "unsupported-blocks-detected": string;
        };
    };
    export const BaseBlock: typeof BaseBlockComponent;
    export const BaseBlockStore: import("vuex").Module<import("@/store/flow/block-types/BaseBlock").IEmptyState, import("@/store").IRootState>;
    export const createDefaultBlockTypeInstallerFor: typeof createDefaultBlockTypeInstallerForFunction;
    export * from "src/components/common/index";
    export * from "src/components/interaction-designer/index";
    export * from "src/components/interaction-designer/block-types/index";
    export * from "src/components/interaction-designer/block-editors/index";
    export * from "src/components/interaction-designer/blocks/index";
    export * from "src/components/interaction-designer/flow-editors/index";
    export * from "src/components/interaction-designer/flow-editors/import/index";
    export * from "src/components/interaction-designer/resource-editors/index";
    export * from "src/components/resource-editor/index";
    export * from "src/components/interaction-designer/toolbar/index";
    export * from "src/store/flow/block-types/index";
    export * from "src/router/helpers";
    export * from "src/store/validation/index";
    export * from "src/lib/validations/index";
    const Components: Record<string, any>;
    export default Components;
}
declare module "src/router/index" {
    import VueRouter, { RouteConfig } from 'vue-router';
    export const routes: Array<RouteConfig>;
    export const router: VueRouter;
    export default router;
}
declare module "src/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "src/App.vue" {
    const _default_3: any;
    export default _default_3;
}
declare module "src/main" {
    /**
     * This import modifies the jquery that should already be on the page globally at global.$
     * e.g. adding $().modal() and other jquery plugins
     */
    import 'bootstrap';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    import 'vue-multiselect/dist/vue-multiselect.min.css';
    import 'scss/main.scss';
}
declare module "tests/unit/components/interaction-designer/block-editors/choices/expressionTransformers.spec" { }
declare module "stories/story-utils/storeSetup" {
    import Vue from 'vue';
    import { IBlock, IFlow } from '@floip/flow-runner';
    export interface IBaseOptions {
        components: any;
        template: string;
        store?: any;
    }
    /**
     * Vue class used to gather required Getter, Mutation, Action for the BaseMounted binding
     */
    export class BaseMountedVueClass extends Vue {
        activeBlock: IBlock;
        activeFlow: IFlow;
        activateBlock: ({ blockId }: {
            blockId: IBlock['uuid'] | null;
        }) => void;
        flow_addBlankFlow: () => Promise<IFlow>;
        flow_addBlankBlockByType: ({ type, ...props }: Partial<IBlock>) => Promise<IBlock>;
        flow_add: ({ flow }: {
            flow: IFlow;
        }) => Promise<IFlow>;
        flow_createWith: ({ props }: {
            props: {
                uuid: string;
            } & Partial<IFlow>;
        }) => Promise<IFlow>;
        flow_setActiveFlowId: ({ flowId }: {
            flowId: IFlow['uuid'];
        }) => void;
        block_setName: any;
        block_setLabel: any;
        block_setSemanticLabel: any;
        flow_setFirstBlockId: any;
        block_setTags: ({ blockId, value }: {
            blockId: IBlock['uuid'];
            value: string[];
        }) => void;
        blockTags: string[];
        setDescription(blockId: string): void;
        setTags(blockId: string): void;
        /**
         * Fake a 1st block to make sure the current block won't be selected
         */
        fakeCaseBlockAsFirstBlock(flowId: string): Promise<void>;
        /**
         * Safe register block module
         * Because some weird race condition is leading to modules not getting unregistered when clicking between stories before the next story re-registers
         */
        safeRegisterBlockModule(BLOCK_TYPE: string, blockTypeStore: any): Promise<any>;
        baseMounted(BLOCK_TYPE: string, blockTypeStore: any): Promise<any>;
    }
    export class BaseMountedVueClassWithResourceAndMode extends BaseMountedVueClass {
        resource_setValue: any;
        flow_setSupportedMode: any;
        setResourceData({ shouldSetChoices, configPath }: {
            shouldSetChoices: boolean;
            configPath: string;
        }): void;
    }
}
declare module "stories/story-utils/__VLS_types" {
    import * as vue from 'vue';
    import type { FunctionalComponent, EmitsOptions, DefineComponent, SetupContext, ObjectDirective, FunctionDirective } from 'vue';
    type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
    export type PickNotAny<A, B> = IsAny<A> extends true ? B : A;
    type AnyArray<T = any> = T[] | readonly T[];
    type ForableSource<T> = [
        T extends {
            [Symbol.iterator](): IterableIterator<infer T1>;
        } ? T1 : T[keyof T],
        typeof Symbol.iterator extends keyof T ? number : T extends T ? keyof T : never,
        typeof Symbol.iterator extends keyof T ? undefined : number
    ][];
    export type GlobalComponents = PickNotAny<import('vue').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-core').GlobalComponents, {}> & PickNotAny<import('@vue/runtime-dom').GlobalComponents, {}> & Pick<typeof vue, 'Transition' | 'TransitionGroup' | 'KeepAlive' | 'Suspense' | 'Teleport'>;
    export function getVforSourceType<T>(source: T): ForableSource<NonNullable<T extends number ? number[] : T extends string ? string[] : T>>;
    export function getNameOption<T>(t?: T): T extends {
        name: infer N;
    } ? N : undefined;
    export function directiveFunction<T>(dir: T): T extends ObjectDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T extends FunctionDirective<infer E, infer V> ? undefined extends V ? (value?: V) => void : (value: V) => void : T;
    export function withScope<T, K>(ctx: T, scope: K): ctx is T & K;
    export function makeOptional<T>(t: T): {
        [K in keyof T]?: T[K];
    };
    export type ExtractComponentSlots<T> = IsAny<T> extends true ? Record<string, any> : T extends {
        $scopedSlots?: infer S;
    } ? {
        [K in keyof S]-?: S[K] extends ((obj: infer O) => any) | undefined ? O : any;
    } : Record<string, any>;
    export type FillingEventArg_ParametersLength<E extends (...args: any) => any> = IsAny<Parameters<E>> extends true ? -1 : Parameters<E>['length'];
    export type FillingEventArg<E> = E extends (...args: any) => any ? FillingEventArg_ParametersLength<E> extends 0 ? ($event?: undefined) => ReturnType<E> : E : E;
    export type ExtractEmit2<T> = T extends FunctionalComponent<infer _, infer E> ? SetupContext<E>['emit'] : T extends new (...args: any) => {
        $emit: infer Emit;
    } ? Emit : unknown;
    export type ReturnVoid<T> = T extends (...payload: infer P) => any ? (...payload: P) => void : (...args: any) => void;
    export type EmitEvent2<F, E> = F extends {
        (event: E, ...payload: infer P): infer R;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : F extends {
        (event: E, ...payload: infer P): infer R;
        (...args: any): any;
        (...args: any): any;
        (...args: any): any;
    } ? (...payload: P) => void : unknown | '[Type Warning] Volar could not infer $emit event more than 4 overloads without DefineComponent. see https://github.com/johnsoncodehk/volar/issues/60';
    export type EmitEvent<T, E> = T extends DefineComponent<infer _, any, any, any, any, any, any, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E2> ? EmitEvent_3<E2, E> : T extends FunctionalComponent<infer _, infer E> ? EmitEvent2<SetupContext<E>['emit'], E> : unknown;
    export type EmitEvent_3<E2, E> = EmitsOptions extends E2 ? unknown : E2 extends AnyArray<infer K> ? (E extends K ? (...args: any) => void : unknown) : E extends keyof E2 ? ReturnVoid<E2[E]> : unknown;
    export type FirstFunction<F0 = void, F1 = void, F2 = void, F3 = void, F4 = void> = NonNullable<F0> extends (Function | AnyArray<Function>) ? F0 : NonNullable<F1> extends (Function | AnyArray<Function>) ? F1 : NonNullable<F2> extends (Function | AnyArray<Function>) ? F2 : NonNullable<F3> extends (Function | AnyArray<Function>) ? F3 : NonNullable<F4> extends (Function | AnyArray<Function>) ? F4 : unknown;
    export type GlobalAttrs = JSX.IntrinsicElements['div'];
    export type SelfComponent<N, C> = string extends N ? {} : N extends string ? {
        [P in N]: C;
    } : {};
    export type PickComponents<T> = ComponentKeys<T> extends keyof T ? Pick<T, ComponentKeys<T>> : T;
    export type ConvertInvalidJsxElement<T> = IsComponent<T> extends true ? T : any;
    type IsComponent<T> = T extends (...args: any) => JSX.Element ? true : T extends new (...args: any) => JSX.ElementClass ? true : IsAny<T>;
    type ComponentKeys<T> = keyof {
        [K in keyof T as IsComponent<T[K]> extends true ? K : never]: any;
    };
}
declare module "stories/story-utils/FlowBuilderContainer.vue" {
    import '@/css/stories/InteractionDesigner.css';
    import 'bootstrap';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    import 'vue-multiselect/dist/vue-multiselect.min.css';
    import '@/scss/main.scss';
    import '@/css/customized/vue-multiselect.css';
    import Vue from 'vue';
    export class FlowBuilderContainer extends Vue {
    }
    export default FlowBuilderContainer;
}
declare module "stories/story-utils/FlowBuilderSidebarEditorContainer.vue" {
    import Vue from 'vue';
    import { IBlock, IFlow } from '@floip/flow-runner';
    export class FlowBuilderSidebarEditorContainer extends Vue {
        readonly block: IBlock;
        readonly flow: IFlow;
        created(): void;
        configure: any;
    }
    export default FlowBuilderSidebarEditorContainer;
}
declare module "stories/CaseBlockStyled.stories" {
    import { BaseMountedVueClass } from "stories/story-utils/storeSetup";
    const _default_4: {
        title: string;
        excludeStories: RegExp;
    };
    export default _default_4;
    class DefaultClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const Default: () => typeof DefaultClass;
    class CurrentClass2 extends BaseMountedVueClass {
        mounted(): Promise<void>;
        block_addExit: any;
        block_createBlockExitWith: any;
        block_createBlockDefaultExitWith: any;
    }
    export const ExistingDataBlock: () => typeof CurrentClass2;
}
declare module "stories/Flow.stories" {
    import { BaseMountedVueClass } from "stories/story-utils/storeSetup";
    const _default_5: {
        title: string;
        excludeStories: RegExp;
    };
    export default _default_5;
    class CurrentClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
        flow_setSupportedMode: any;
    }
    export const Default: () => typeof CurrentClass;
    class CurrentClass2 extends BaseMountedVueClass {
        mounted(): Promise<void>;
        flow_setNameFromLabel: any;
        flow_setLabel: any;
        flow_setInteractionTimeout: any;
        flow_setSupportedMode: any;
        flow_setLanguages: any;
    }
    export const ExistingDataPreFilled: () => typeof CurrentClass2;
}
declare module "stories/LocationResponseBlock.stories" {
    import { BaseMountedVueClass } from "stories/story-utils/storeSetup";
    const _default_6: {
        title: string;
        excludeStories: RegExp;
    };
    export default _default_6;
    class CurrentClass1 extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const Default: () => typeof CurrentClass1;
    class CurrentClass2 extends BaseMountedVueClass {
        mounted(): Promise<void>;
        setAccuracyThreshold: any;
        setAccuracyTimeout: any;
    }
    export const ExistingDataPreFilled: () => typeof CurrentClass2;
    class CurrentClass3 extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const NonStartingBlock: () => typeof CurrentClass3;
}
declare module "stories/story-utils/PlainFlowBuilderBlockEditorContainer.vue" {
    import '@/css/stories/InteractionDesigner.css';
    import 'bootstrap';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    import 'vue-multiselect/dist/vue-multiselect.min.css';
    import '@/scss/main.scss';
    import '@/css/customized/vue-multiselect.css';
    import Vue from 'vue';
    import { IBlock } from '@floip/flow-runner';
    export class PlainFlowBuilderBlockEditorContainer extends Vue {
        readonly block: IBlock;
        created(): void;
        configure: any;
    }
    export default PlainFlowBuilderBlockEditorContainer;
}
declare module "stories/LogBlockPlain.stories" {
    import { BaseMountedVueClass } from "stories/story-utils/storeSetup";
    const _default_7: {
        title: string;
        excludeStories: RegExp;
    };
    export default _default_7;
    class DefaultClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const Default: () => typeof DefaultClass;
    class CurrentClass2 extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const ExistingDataBlock: () => typeof CurrentClass2;
}
declare module "stories/LogBlockStyled.stories" {
    import { BaseMountedVueClass } from "stories/story-utils/storeSetup";
    const _default_8: {
        title: string;
        excludeStories: RegExp;
    };
    export default _default_8;
    class DefaultClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const Default: () => typeof DefaultClass;
    class CurrentClass2 extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const ExistingDataBlock: () => typeof CurrentClass2;
    class CurrentClass3 extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const ExistingDataNonStartingBlock: () => typeof CurrentClass3;
}
declare module "stories/MessageBlock.stories" {
    import { BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode } from "stories/story-utils/storeSetup";
    const _default_9: {
        title: string;
        excludeStories: RegExp;
    };
    export default _default_9;
    class DefaultClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const Default: () => typeof DefaultClass;
    class ExistingDataBlockClass extends BaseMountedVueClassWithResourceAndMode {
        mounted(): Promise<void>;
    }
    export const ExistingDataBlock: () => typeof ExistingDataBlockClass;
    class NonStartingBlockClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const NonStartingBlock: () => typeof NonStartingBlockClass;
}
declare module "stories/NumericResponseBlock.stories" {
    import { BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode } from "stories/story-utils/storeSetup";
    const _default_10: {
        title: string;
        excludeStories: RegExp;
    };
    export default _default_10;
    class CurrentClass1 extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const Default: () => typeof CurrentClass1;
    class CurrentClass2 extends BaseMountedVueClassWithResourceAndMode {
        mounted(): Promise<void>;
        setValidationMinimum: any;
        setValidationMaximum: any;
        setMaxDigits: any;
    }
    export const ExistingDataForAllModes: () => typeof CurrentClass2;
    class CurrentClass3 extends BaseMountedVueClassWithResourceAndMode {
        mounted(): Promise<void>;
        setValidationMinimum: any;
        setValidationMaximum: any;
        setMaxDigits: any;
    }
    export const ExistingDataForIvrOnly: () => typeof CurrentClass3;
    class CurrentClass4 extends BaseMountedVueClassWithResourceAndMode {
        mounted(): Promise<void>;
        setValidationMinimum: any;
        setValidationMaximum: any;
    }
    export const ExistingDataForTextOnly: () => typeof CurrentClass4;
    class CurrentClass5 extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const NonStartingBlock: () => typeof CurrentClass5;
}
declare module "stories/OpenResponseBlock.stories" {
    import { BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode } from "stories/story-utils/storeSetup";
    const _default_11: {
        title: string;
        excludeStories: RegExp;
    };
    export default _default_11;
    class CurrentClass1 extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const Default: () => typeof CurrentClass1;
    class CurrentClass2 extends BaseMountedVueClassWithResourceAndMode {
        mounted(): Promise<void>;
        setMaxDurationSeconds: any;
        setMaxResponseCharacters: any;
    }
    export const ExistingDataForAllModes: () => typeof CurrentClass2;
    class CurrentClass3 extends BaseMountedVueClassWithResourceAndMode {
        mounted(): Promise<void>;
        setMaxDurationSeconds: any;
    }
    export const ExistingDataForIvrOnly: () => typeof CurrentClass3;
    class CurrentClass4 extends BaseMountedVueClassWithResourceAndMode {
        mounted(): Promise<void>;
        setMaxResponseCharacters: any;
    }
    export const ExistingDataForTextOnly: () => typeof CurrentClass4;
    class CurrentClass5 extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const NonStartingBlock: () => typeof CurrentClass5;
}
declare module "stories/OutputBlockStyled.stories" {
    import { BaseMountedVueClass } from "stories/story-utils/storeSetup";
    const _default_12: {
        title: string;
        excludeStories: RegExp;
    };
    export default _default_12;
    class DefaultClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const Default: () => typeof DefaultClass;
}
declare module "stories/PhotoResponseBlock.stories" {
    import { BaseMountedVueClass } from "stories/story-utils/storeSetup";
    const _default_13: {
        title: string;
        excludeStories: RegExp;
    };
    export default _default_13;
    class CurrentClass1 extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const Default: () => typeof CurrentClass1;
    class CurrentClass2 extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const ExistingDataPreFilled: () => typeof CurrentClass2;
    class CurrentClass3 extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const NonStartingBlock: () => typeof CurrentClass3;
}
declare module "stories/RunAnotherFlowBlockStyled.stories" {
    import { BaseMountedVueClass } from "stories/story-utils/storeSetup";
    const _default_14: {
        title: string;
        excludeStories: RegExp;
    };
    export default _default_14;
    class DefaultClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const Default: () => typeof DefaultClass;
}
declare module "stories/SelectManyResponsesBlock.stories" {
    import selectManyResponseBlock from "src/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue";
    import { BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode } from "stories/story-utils/storeSetup";
    const _default_15: {
        component: typeof selectManyResponseBlock;
        title: string;
    };
    export default _default_15;
    class InFlowBuilderClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const InFlowBuilder: () => typeof InFlowBuilderClass;
    class IvrOnlyClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const IvrOnly: () => typeof IvrOnlyClass;
    class MoreLanguagesClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const MoreLanguages: () => typeof MoreLanguagesClass;
    class ExistingDataClass extends BaseMountedVueClassWithResourceAndMode {
        mounted(): Promise<void>;
    }
    export const ExistingData: () => typeof ExistingDataClass;
}
declare module "stories/SelectOneResponseBlock.stories" {
    import SelectOneResponseBlock from "src/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue";
    import { BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode } from "stories/story-utils/storeSetup";
    const _default_16: {
        component: typeof SelectOneResponseBlock;
        title: string;
    };
    export default _default_16;
    class InFlowBuilderClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const InFlowBuilder: () => typeof InFlowBuilderClass;
    class IvrOnlyClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const IvrOnly: () => typeof IvrOnlyClass;
    class MoreLanguagesClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const MoreLanguages: () => typeof MoreLanguagesClass;
    class ExistingDataClass extends BaseMountedVueClassWithResourceAndMode {
        mounted(): Promise<void>;
    }
    export const ExistingData: () => typeof ExistingDataClass;
}
declare module "stories/SetContactPropertyBlock.stories" {
    import { BaseMountedVueClass } from "stories/story-utils/storeSetup";
    const _default_17: {
        title: string;
        excludeStories: RegExp;
    };
    export default _default_17;
    class DefaultClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
    }
    export const Default: () => typeof DefaultClass;
    class ExistingDataBlockClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
        block_setContactPropertyKeyOnIndex: ({ index, blockId, propertyKey }: {
            index: number;
            blockId: string;
            propertyKey: string;
        }) => void;
        block_setContactPropertyValueOnIndex: ({ index, blockId, propertyValue }: {
            index: number;
            blockId: string;
            propertyValue: string;
        }) => void;
    }
    export const ExistingDataBlock: () => typeof ExistingDataBlockClass;
    class ClearActionClass extends BaseMountedVueClass {
        mounted(): Promise<void>;
        block_setContactPropertyKeyOnIndex: ({ index, blockId, propertyKey }: {
            index: number;
            blockId: string;
            propertyKey: string;
        }) => void;
        block_setContactPropertyValueOnIndex: ({ index, blockId, propertyValue }: {
            index: number;
            blockId: string;
            propertyValue: string;
        }) => void;
    }
    export const ClearAction: () => typeof ClearActionClass;
}
declare module "stories/SetGroupMembershipBlock.stories" {
    import { BaseMountedVueClass } from "stories/story-utils/storeSetup";
    const _default_18: {
        title: string;
        excludeStories: RegExp;
    };
    export default _default_18;
    class DefaultClass extends BaseMountedVueClass {
    }
    export const Default: () => typeof DefaultClass;
    class ExistingDataBlockClass extends BaseMountedVueClass {
        addContactGroup: ({ group }: {
            group: any;
        }) => void;
        mounted(): Promise<void>;
    }
    export const ExistingDataBlock: () => typeof ExistingDataBlockClass;
}
declare module "stories/story-utils/router/index" {
    import VueRouter, { RouteConfig } from 'vue-router';
    export const routes: Array<RouteConfig>;
    const router: VueRouter;
    export default router;
}
declare module "stories/Toolbar.stories" {
    import Vue from 'vue';
    import { IFlow } from '@floip/flow-runner';
    const _default_19: {
        title: string;
        excludeStories: RegExp;
        decorators: (() => {
            template: string;
        })[];
    };
    export default _default_19;
    class BaseMountedClass extends Vue {
        created(): Promise<void>;
        initializeTreeModel: any;
        configure: any;
        addEnabledFeature: any;
        removeEnabledFeature: any;
        flow_addBlankFlow: () => Promise<IFlow>;
        activeFlow: IFlow;
        flow_setActiveFlowUUID: any;
        setIsEditable: (value: boolean) => void;
    }
    class DefaultClass extends BaseMountedClass {
        mounted(): Promise<void>;
    }
    export const Default: () => typeof DefaultClass;
    class ResourceEditorClass extends BaseMountedClass {
        mounted(): Promise<void>;
    }
    export const WithoutResourceEditorToggle: () => typeof ResourceEditorClass;
    class EditFlowClass extends BaseMountedClass {
        mounted(): Promise<void>;
    }
    export const EditFlow: () => typeof EditFlowClass;
    class SaveClass extends BaseMountedClass {
        mounted(): Promise<void>;
    }
    export const WithSaveButton: () => typeof SaveClass;
    class GroupButtonsSlotClass extends BaseMountedClass {
        mounted(): Promise<void>;
    }
    export const WithGroupedButtonsSlot: () => typeof GroupButtonsSlotClass;
    class ExtraButtonsSlotClass extends BaseMountedClass {
        mounted(): Promise<void>;
    }
    export const WithExtraButtonsSlot: () => typeof ExtraButtonsSlotClass;
    class SavingStateClass extends BaseMountedClass {
        mounted(): Promise<void>;
        setTreeSaving: any;
    }
    export const SavingState: () => typeof SavingStateClass;
}
