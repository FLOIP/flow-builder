import { IBlock, IBlockUIMetadata } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
export declare const NameEditor: import("vue").DefineComponent<{
    block: {
        type: () => IBlock;
        required: true;
    };
}, {}, {}, {
    blockName: {
        get(): IBlock['name'];
        set(value: IBlock['name']): void;
    };
    editBlockName: {
        get(): IBlockUIMetadata['editBlockName'];
        set(value: IBlockUIMetadata['editBlockName']): void;
    };
}, {
    filterName(e: KeyboardEvent): void;
    handleCompleteEditing(): void;
    block_updateVendorMetadataByPath: import("vuex/types/helpers").MutationMethod;
    block_setName: import("vuex/types/helpers").ActionMethod;
    block_resetName: import("vuex/types/helpers").ActionMethod;
}, typeof Lang, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    block: {
        type: () => IBlock;
        required: true;
    };
}>>, {}>;
export default NameEditor;
