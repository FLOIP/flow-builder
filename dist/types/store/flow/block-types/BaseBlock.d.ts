import { ActionContext, GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '@/store';
import { IBlock } from '@floip/flow-runner';
import { IValidationStatus } from '@/store/validation';
import { ValidationResults } from '@/lib/validations';
export interface IEmptyState {
}
export declare const getters: GetterTree<IEmptyState, IRootState>;
export declare const mutations: MutationTree<IEmptyState>;
export declare const actions: {
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
declare const BaseBlockStore: Module<IEmptyState, IRootState>;
export default BaseBlockStore;
