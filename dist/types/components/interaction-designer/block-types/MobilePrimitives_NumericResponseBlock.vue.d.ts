import { IBlock } from '@floip/flow-runner';
import { INumericResponseBlock } from '@floip/flow-runner/src/model/block/INumericResponseBlock';
import Lang from '../../../lib/filters/lang';
declare const MobilePrimitives_NumericResponseBlock_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class MobilePrimitives_NumericResponseBlock extends MobilePrimitives_NumericResponseBlock_base {
    readonly block: INumericResponseBlock;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    updateValidationMin(value: number | string): void;
    updateValidationMax(value: number | string): void;
    updateMaxDigits(value: number | string): void;
    hasVoiceMode: boolean;
    setValidationMinimum: ({ blockId, value, }: {
        blockId: IBlock['uuid'];
        value: number | string;
    }) => Promise<string>;
    setValidationMaximum: ({ blockId, value, }: {
        blockId: IBlock['uuid'];
        value: number | string;
    }) => Promise<string>;
    setMaxDigits: ({ blockId, value }: {
        blockId: IBlock['uuid'];
        value: number | string;
    }) => Promise<string>;
    handleBranchingTypeChangedToUnified: ({ block }: {
        block: IBlock;
    }) => void;
    isEditable: boolean;
}
export default MobilePrimitives_NumericResponseBlock;
export declare const install: (builder: import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue-property-decorator").Vue<Record<string, any>, Record<string, any>, never, never, any>>) => true | void;
