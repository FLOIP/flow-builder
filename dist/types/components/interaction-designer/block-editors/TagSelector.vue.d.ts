import { IBlock } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
declare type Option = {
    id: string;
    name: string;
};
declare const TagSelector_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class TagSelector extends TagSelector_base {
    readonly block: IBlock;
    readonly taggable: boolean;
    readonly noLabel: boolean;
    get selectedTags(): Option[];
    set selectedTags(value: Option[]);
    get availableTagOptions(): Option[];
    stringListToOptions(list: string[]): Option[];
    addTag(newTag: string): void;
    clearAll(): void;
    block_setTags: ({ blockId, value }: {
        blockId: IBlock['uuid'];
        value: string[];
    }) => void;
    block_addTag: ({ blockId, value }: {
        blockId: IBlock['uuid'];
        value: string;
    }) => void;
    blockTags: string[];
}
export default TagSelector;
