import { IBlock } from '@floip/flow-runner';
declare const NameEditor_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class NameEditor extends NameEditor_base {
    editBlockName: boolean;
    readonly block: IBlock;
    get blockName(): IBlock['name'];
    set blockName(value: IBlock['name']);
    filterName(e: KeyboardEvent): void;
    handleCompleteEditing(): void;
    block_setName: ({ blockId, value, lockAutoUpdate, }: {
        blockId: IBlock['uuid'];
        value: IBlock['name'];
        lockAutoUpdate: boolean;
    }) => void;
    block_resetName: ({ blockId }: {
        blockId: IBlock['uuid'];
    }) => void;
}
export default NameEditor;
