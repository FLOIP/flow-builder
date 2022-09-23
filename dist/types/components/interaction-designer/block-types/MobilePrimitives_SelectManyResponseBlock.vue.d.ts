import { IBlock } from '@floip/flow-runner';
import SelectOneResponseBlock from './MobilePrimitives_SelectOneResponseBlock.vue';
export declare class MobilePrimitives_SelectManyResponseBlock extends SelectOneResponseBlock {
    isEditable: boolean;
    handleBranchingTypeChangedToUnified: ({ block }: {
        block: IBlock;
    }) => void;
}
export default MobilePrimitives_SelectManyResponseBlock;
export declare const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
