import { IRunFlowBlock } from '@floip/flow-runner/src/model/block/IRunFlowBlock';
import { IBlock } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
declare const Core_RunAnotherFlowBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class Core_RunAnotherFlowBlock extends Core_RunAnotherFlowBlock_base {
    readonly block: IRunFlowBlock;
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
export declare const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
