import { IFlow, IBlock } from '@floip/flow-runner';
import { ILogBlock } from '@floip/flow-runner/src/model/block/ILogBlock';
declare const Core_LogBlock_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class Core_LogBlock extends Core_LogBlock_base {
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
export declare const install: any;
