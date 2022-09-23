import { IBlock, IFlow } from '@floip/flow-runner';
declare const BaseBlock_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
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
