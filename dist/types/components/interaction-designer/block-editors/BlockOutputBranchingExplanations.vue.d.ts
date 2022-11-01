import { IBlockClass, IExplanatoryText } from '../../../lib/types';
export declare const BlockOutputBranchingExplanations: import("vue").DefineComponent<{
    blockType: {
        type: StringConstructor;
        required: true;
    };
    branchingType: {
        type: StringConstructor;
        required: true;
    };
}, {}, {}, {
    blockClasses(): Record<string, IBlockClass>;
    blockClass(): IBlockClass;
    explanatoryTexts(): IExplanatoryText[];
    definitions(): any[];
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    blockType: {
        type: StringConstructor;
        required: true;
    };
    branchingType: {
        type: StringConstructor;
        required: true;
    };
}>>, {}>;
export default BlockOutputBranchingExplanations;
