import { IBlock, IFlow, IResource } from '@floip/flow-runner';
import { INumericResponseBlock } from '@floip/flow-runner/src/model/block/INumericResponseBlock';
declare const MobilePrimitives_NumericResponseBlock_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class MobilePrimitives_NumericResponseBlock extends MobilePrimitives_NumericResponseBlock_base {
    readonly block: INumericResponseBlock;
    readonly flow: IFlow;
    readonly usesDefaultBranchingEditor: boolean;
    readonly usesDefaultContactPropsEditor: boolean;
    get promptResource(): IResource;
    updateValidationMin(value: number | string): void;
    updateValidationMax(value: number | string): void;
    updateMaxDigits(value: number | string): void;
    resourcesByUuidOnActiveFlow: {
        [key: string]: IResource;
    };
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
export declare const install: any;
