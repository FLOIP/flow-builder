import { IBlock } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
declare const TagSelector_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class TagSelector extends TagSelector_base {
    readonly block: IBlock;
    readonly taggable: boolean;
    get selectedTags(): {
        id: string;
        name: string;
    }[];
    set selectedTags(value: {
        id: string;
        name: string;
    }[]);
    get availableTagOptions(): {
        id: string;
        name: string;
    }[];
    stringListToOptions(list: string[]): {
        id: string;
        name: string;
    }[];
    addTag(newTag: string): void;
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
