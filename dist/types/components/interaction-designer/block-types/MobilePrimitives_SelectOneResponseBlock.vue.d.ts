import { IBlock, SupportedMode } from '@floip/flow-runner';
import { ISelectOneResponseBlock } from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock';
import Lang from '../../../lib/filters/lang';
import { findOrGenerateStubbedVariantOn } from '../../../store/flow/utils/resourceHelpers';
declare const MobilePrimitives_SelectOneResponseBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class MobilePrimitives_SelectOneResponseBlock extends MobilePrimitives_SelectOneResponseBlock_base {
    readonly block: ISelectOneResponseBlock;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    SupportedMode: typeof SupportedMode;
    findOrGenerateStubbedVariantOn: typeof findOrGenerateStubbedVariantOn;
    handleChoiceChanged(): void;
    reflowExitsWhenSwitchingToBranchingTypeNotUnified(): void;
    reflowExitsFromChoices: ({ blockId }: {
        blockId: IBlock['uuid'];
    }) => void;
    handleBranchingTypeChangedToUnified: ({ block }: {
        block: IBlock;
    }) => void;
}
export default MobilePrimitives_SelectOneResponseBlock;
export declare const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
