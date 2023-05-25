import Lang from '../../../lib/filters/lang';
import { IBlock } from '@floip/flow-runner';
declare const BlockToolbar_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class BlockToolbar extends BlockToolbar_base {
    readonly block: IBlock;
    readonly isBlockSelected: boolean;
    readonly isEditorVisible: boolean;
    readonly isWaitingForConnection: boolean;
    readonly isActivatedByConnection: boolean;
    isDeleting: boolean;
    handleDeleteBlock(): Promise<void>;
    handleDuplicateBlock(): Promise<void>;
    isEditable: boolean;
    block_select: ({ blockId }: {
        blockId: IBlock['uuid'];
    }) => Promise<void>;
    block_deselect: ({ blockId }: {
        blockId: IBlock['uuid'];
    }) => Promise<void>;
    flow_removeBlock: ({ blockId }: {
        blockId: IBlock['uuid'];
    }) => Promise<void>;
    flow_duplicateBlock: ({ blockId }: {
        blockId: IBlock['uuid'];
    }) => Promise<IBlock>;
}
export default BlockToolbar;
