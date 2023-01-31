import { IBlock } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
import { ConfigFieldType } from '../../../store/flow/block';
import { IContactPropertyOption, IContactPropertyOptionForUISelector } from '../../../store/flow/block-types/Core_SetContactPropertyStore.model';
declare const GenericContactPropertyEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class GenericContactPropertyEditor extends GenericContactPropertyEditor_base {
    readonly block: IBlock;
    readonly disableExpressionInput: boolean;
    shouldSetContactProperty: boolean;
    PROPERTY_VALUE_ACTION: {
        OPEN_EXPRESSION: string;
        FROM_CURRENT_BLOCK_RESPONSE: string;
    };
    propertyValueAction: string;
    propertyKey?: string;
    propertyValue?: string;
    created(): void;
    isBlockInteractive(block: IBlock): boolean;
    toggleSetContactProperty(): void;
    initPropertyValueAction(): void;
    updatePropertyValueAction({ target: { value } }: {
        target: {
            value: string;
        };
    }): void;
    get shouldUseOpenExpression(): boolean;
    updateFirstContactPropertyKey(value: string): void;
    updateFirstContactPropertyValue(value: string): void;
    get firstContactPropertyKey(): string | null;
    get firstContactPropertyValue(): string | null;
    get flowSelectedContactPropertyField(): IContactPropertyOption | null;
    set flowSelectedContactPropertyField(option: IContactPropertyOption | null);
    get hasSubscriberPropertyFields(): boolean;
    get subscriberPropertyFieldsForSelector(): IContactPropertyOptionForUISelector[];
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
