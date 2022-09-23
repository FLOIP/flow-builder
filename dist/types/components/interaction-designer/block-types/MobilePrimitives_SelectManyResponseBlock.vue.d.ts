import { IBlock } from '@floip/flow-runner';
import SelectOneResponseBlock from './MobilePrimitives_SelectOneResponseBlock.vue';
export declare class MobilePrimitives_SelectManyResponseBlock extends SelectOneResponseBlock {
    isEditable: boolean;
    handleBranchingTypeChangedToUnified: ({ block }: {
        block: IBlock;
    }) => void;
}
export default MobilePrimitives_SelectManyResponseBlock;
export declare const install: any;
