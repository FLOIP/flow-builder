import { IBlock, IFlow, IResource, SupportedMode } from '@floip/flow-runner';
import { ISelectOneResponseBlock } from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock';
declare const MobilePrimitives_SelectOneResponseBlock_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class MobilePrimitives_SelectOneResponseBlock extends MobilePrimitives_SelectOneResponseBlock_base {
    readonly block: ISelectOneResponseBlock;
    readonly flow: IFlow;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    SupportedMode: typeof SupportedMode;
    findOrGenerateStubbedVariantOn: any;
    get promptResource(): IResource | undefined;
    handleChoiceChanged(): void;
    reflowExitsWhenSwitchingToBranchingTypeNotUnified(): void;
    resourcesByUuidOnActiveFlow: {
        [key: string]: IResource;
    };
    reflowExitsFromChoices: ({ blockId }: {
        blockId: IBlock['uuid'];
    }) => void;
    handleBranchingTypeChangedToUnified: ({ block }: {
        block: IBlock;
    }) => void;
}
export default MobilePrimitives_SelectOneResponseBlock;
export declare const install: any;
