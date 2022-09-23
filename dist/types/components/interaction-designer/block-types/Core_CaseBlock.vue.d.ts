import { ICaseBlock } from '@floip/flow-runner/src/model/block/ICaseBlock';
import { IBlockExit, IFlow } from '@floip/flow-runner';
declare const Core_CaseBlock_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class Core_CaseBlock extends Core_CaseBlock_base {
    readonly block: ICaseBlock;
    readonly flow: IFlow;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    get exits(): IBlockExit[];
    isEditable: boolean;
}
export default Core_CaseBlock;
export declare const install: any;
