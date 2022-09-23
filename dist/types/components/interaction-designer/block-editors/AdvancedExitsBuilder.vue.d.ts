import Lang from '@/lib/filters/lang';
import { IBlock, IBlockExit } from '@floip/flow-runner';
import Vue from 'vue';
declare const AdvancedExitsBuilder_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class AdvancedExitsBuilder extends AdvancedExitsBuilder_base {
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
