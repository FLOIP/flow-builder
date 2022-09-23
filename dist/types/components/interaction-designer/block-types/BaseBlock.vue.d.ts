import { IBlock, IFlow } from '@floip/flow-runner';
import Lang from '@/lib/filters/lang';
declare const BaseBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class BaseBlock extends BaseBlock_base {
    readonly block: IBlock;
    readonly flow: IFlow;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    showSemanticLabel: boolean;
    handleBranchingTypeChangedToUnified(): void;
    isEditable: boolean;
}
export default BaseBlock;
