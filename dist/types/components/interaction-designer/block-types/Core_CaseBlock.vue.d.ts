import { ICaseBlock } from '@floip/flow-runner/src/model/block/ICaseBlock';
import { IBlockExit, IFlow } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
declare const Core_CaseBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class Core_CaseBlock extends Core_CaseBlock_base {
    readonly block: ICaseBlock;
    readonly flow: IFlow;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    get exits(): IBlockExit[];
    isEditable: boolean;
}
export default Core_CaseBlock;
export declare const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
