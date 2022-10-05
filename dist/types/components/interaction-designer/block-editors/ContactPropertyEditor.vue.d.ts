import { IBlock, SetContactProperty } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
import { ConfigFieldType } from '../../../store/flow/block';
declare const ContactPropertyEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class ContactPropertyEditor extends ContactPropertyEditor_base {
    readonly block: IBlock;
    PROPERTY_ACTION: {
        SET: string;
        CLEAR: string;
    };
    get propertyAction(): string;
    set propertyAction(value: string);
    block_setContactPropertyKeyOnIndex: ({ index, blockId, propertyKey }: {
        index: number;
        blockId: string;
        propertyKey?: string;
    }) => void;
    get firstProperty(): SetContactProperty | undefined;
    get propertyKey(): string | undefined;
    get propertyValue(): string;
    updatePropertyValue(value: string): void;
    block_updateConfigByPath: ({ blockId, path, value }: {
        blockId: string;
        path: string;
        value: ConfigFieldType;
    }) => void;
    set propertyKey(value: string | undefined);
    block_setContactPropertyValueOnIndex: ({ index, blockId, propertyValue }: {
        index: number;
        blockId: string;
        propertyValue: string;
    }) => void;
}
export default ContactPropertyEditor;
