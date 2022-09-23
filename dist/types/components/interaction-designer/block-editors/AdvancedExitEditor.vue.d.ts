import Lang from '@/lib/filters/lang';
import { IBlock, IBlockExit } from '@floip/flow-runner';
declare const AdvancedExitEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class AdvancedExitEditor extends AdvancedExitEditor_base {
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
