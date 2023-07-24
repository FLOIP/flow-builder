import { PropType } from 'vue';
import { ISelectOneResponseBlock } from '@floip/flow-runner';
export declare const SelectOneResponseBlockContactPropertyEditor: import("vue").DefineComponent<{
    block: {
        type: PropType<ISelectOneResponseBlock>;
        required: true;
    };
    showCreateContactPropertyOption: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, {}, {
    contactPropertyName(): any;
    contactProperty(): any;
    isTextProperty(): boolean;
    isNumberProperty(): boolean;
    isBooleanProperty(): boolean;
    choices(): any;
    isMultipleChoiceProperty(): boolean;
    choiceValueOptions(): any[];
    booleanChoiceValueOptions(): {
        value: string;
        description: any;
    }[];
    subscriberPropertyFields: import("vuex/types/helpers").Computed;
}, {
    getChoiceValue(choicePrompt: any): any;
    setChoiceValue(choiceValue: any, choicePrompt: any): void;
    onSetContactPropertyToggle(shouldSetContactProperty: boolean): void;
    onShouldUseCurrentBlockResponseUpdate(shouldUseCurrentBlockResponse: boolean): void;
    resetMapping(): void;
    removeMapping(): void;
    getChoiceValueOption(choicePrompt: any): any;
    setChoiceValueOption(choiceValueOption: any, choicePrompt: any): void;
    getBooleanChoiceValueOption(choicePrompt: any): any;
    setBooleanChoiceValueOption(choiceValueOption: any, choicePrompt: any): void;
    block_resetContactPropertyMetadata: import("vuex/types/helpers").ActionMethod;
    block_updateConfigByPath: import("vuex/types/helpers").MutationMethod;
    block_updateVendorMetadataByPath: import("vuex/types/helpers").MutationMethod;
    block_removeVendorMetadataByPath: import("vuex/types/helpers").MutationMethod;
}, typeof import("../../../../lib/filters/lang").default, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    block: {
        type: PropType<ISelectOneResponseBlock>;
        required: true;
    };
    showCreateContactPropertyOption: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    showCreateContactPropertyOption: boolean;
}>;
export default SelectOneResponseBlockContactPropertyEditor;
