import Lang from '../../../lib/filters/lang';
import { IBlock, IBlockExit } from '@floip/flow-runner';
declare const AdvancedExitsBuilder_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class AdvancedExitsBuilder extends AdvancedExitsBuilder_base {
    readonly block: IBlock;
    addDraftExitToBlock(): Promise<void>;
    handleDeleteExit(exit: IBlockExit): void;
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
