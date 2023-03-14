import Lang from '../../../lib/filters/lang';
import { IBlock } from '@floip/flow-runner';
declare const SimplifiedNameEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class SimplifiedNameEditor extends SimplifiedNameEditor_base {
    editBlockName: boolean;
    readonly block: IBlock;
    block_setName: ({ blockId, value, lockAutoUpdate, }: {
        blockId: IBlock['uuid'];
        value: IBlock['name'];
        lockAutoUpdate: boolean;
    }) => void;
    block_resetName: ({ blockId }: {
        blockId: IBlock['uuid'];
    }) => void;
    get blockName(): IBlock['name'];
    set blockName(value: IBlock['name']);
    updated(): void;
    filterName(e: KeyboardEvent): void;
    activateEditing(): void;
    handleCompleteEditing(): void;
}
export default SimplifiedNameEditor;
