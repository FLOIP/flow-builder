import { IBlock } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
import { ConfigFieldType } from '../../../store/flow/utils/vuexBlockAndFlowHelpers';
import { IContactPropertyOption, IContactPropertyOptionForUISelector } from '../../../store/flow/block-types/Core_SetContactPropertyStore.model';
declare const GenericContactPropertyEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class GenericContactPropertyEditor extends GenericContactPropertyEditor_base {
    readonly block: IBlock;
    readonly disableExpressionInput: boolean;
    readonly forceUsingBlockValue: boolean;
    readonly showCreateContactPropertyOption: boolean;
    PROPERTY_VALUE_ACTION: {
        OPEN_EXPRESSION: string;
        FROM_CURRENT_BLOCK_RESPONSE: string;
    };
    CREATE_CONTACT_PROPERTY_OPTION: IContactPropertyOption;
    created(): void;
    get isBlockInteractive(): boolean;
    get shouldSetContactProperty(): boolean;
    set shouldSetContactProperty(value: boolean);
    get propertyValueAction(): string;
    set propertyValueAction(value: string);
    get shouldUseOpenExpression(): boolean;
    updateFirstContactPropertyKey(value: string): void;
    updateFirstContactPropertyValue(value: string): void;
    get propertyKey(): string | null;
    get propertyValue(): string | null;
    set propertyValue(value: string | null);
    get flowSelectedContactPropertyField(): IContactPropertyOption | null;
    set flowSelectedContactPropertyField(option: IContactPropertyOption | null);
    get hasSubscriberPropertyFields(): boolean;
    get subscriberPropertyFieldsForSelector(): IContactPropertyOptionForUISelector[];
    toggleSetContactProperty(): void;
    block_updateConfigByPath: ({ blockId, path, value }: {
        blockId: string;
        path: string;
        value: ConfigFieldType;
    }) => void;
    block_updateVendorMetadataByPath: ({ blockId, path, value }: {
        blockId: string;
        path: string;
        value: ConfigFieldType;
    }) => void;
    block_removeConfigByKey: ({ blockId, key }: {
        blockId: IBlock['uuid'];
        key: string;
    }) => void;
    block_setContactPropertyKeyOnIndex: ({ index, blockId, propertyKey }: {
        index: number;
        blockId: string;
        propertyKey: string;
    }) => void;
    block_setContactPropertyValueOnIndex: ({ index, blockId, propertyValue }: {
        index: number;
        blockId: string;
        propertyValue: string;
    }) => void;
    block_setContactPropertyOnIndex: ({ blockId, index, propertyKey, propertyValue }: {
        blockId: string;
        index: number;
        propertyKey?: string;
        propertyValue?: string;
    }) => void;
    subscriberPropertyFields: IContactPropertyOption[];
    subscriberPropertyFieldDataTypesMapping: Record<string, string[]>;
}
export default GenericContactPropertyEditor;
