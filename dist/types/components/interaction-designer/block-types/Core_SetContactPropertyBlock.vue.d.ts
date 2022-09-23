import { IBlock, IFlow } from '@floip/flow-runner';
declare const Core_SetContactPropertyBlock_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class Core_SetContactPropertyBlock extends Core_SetContactPropertyBlock_base {
    readonly block: IBlock;
    readonly flow: IFlow;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    handleBranchingTypeChangedToUnified: ({ block }: {
        block: IBlock;
    }) => void;
}
export default Core_SetContactPropertyBlock;
export declare const install: any;
