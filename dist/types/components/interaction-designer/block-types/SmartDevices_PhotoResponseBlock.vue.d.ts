import { IBlock, IFlow, IResource } from '@floip/flow-runner';
declare const SmartDevices_PhotoResponseBlock_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class SmartDevices_PhotoResponseBlock extends SmartDevices_PhotoResponseBlock_base {
    readonly block: IBlock;
    readonly flow: IFlow;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    get promptResource(): IResource;
    resourcesByUuidOnActiveFlow: {
        [key: string]: IResource;
    };
    isEditable: boolean;
    handleBranchingTypeChangedToUnified: ({ block }: {
        block: IBlock;
    }) => void;
}
export default SmartDevices_PhotoResponseBlock;
export declare const install: any;
