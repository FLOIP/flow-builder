import { IRunFlowBlock } from '@floip/flow-runner/src/model/block/IRunFlowBlock';
import { IBlock, IFlow } from '@floip/flow-runner';
declare const Core_RunAnotherFlowBlock_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class Core_RunAnotherFlowBlock extends Core_RunAnotherFlowBlock_base {
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
export declare const install: any;
