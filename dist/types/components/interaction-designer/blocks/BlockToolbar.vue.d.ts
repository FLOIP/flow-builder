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
    handleDeleteBlock(): void;
    handleDuplicateBlock(): void;
    handleExpandMinimizeBlockEditor(): void;
    isEditable: boolean;
    setIsBlockEditorOpen: (value: boolean) => void;
    block_select: ({ blockId }: {
        blockId: IBlock['uuid'];
    }) => void;
    block_deselect: ({ blockId }: {
        blockId: IBlock['uuid'];
    }) => void;
    flow_removeBlock: ({ blockId }: {
        blockId: IBlock['uuid'];
    }) => void;
    flow_duplicateBlock: ({ blockId }: {
        blockId: IBlock['uuid'];
    }) => Promise<IBlock>;
    removeValidationStatusesFor: ({ key }: {
        key: string;
    }) => void;
}
export default BlockToolbar;
