import { IBlock, IBlockExit, IFlow } from '@floip/flow-runner';
import { IConnectionContext, IPosition, OperationKind, SupportedOperation } from '../../../store/builder';
import Lang from '../../../lib/filters/lang';
import { BlockClassNames } from '../../../lib/types';
declare type BlockAction = ({ block }: {
    block: IBlock;
}) => void;
declare type BlockPositionAction = ({ block, position }: {
    block: IBlock;
    position: IPosition;
}) => void;
export declare const BLOCK_RESET_CONNECTIONS = "BLOCK_RESET_CONNECTIONS";
declare const Block_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class Block extends Block_base {
    readonly block: IBlock;
    readonly x: number;
    readonly y: number;
    labelContainerMaxWidth: number;
    blockWidth: number;
    isConnectionSource: boolean;
    created(): void;
    updated(): void;
    mounted(): void;
    onBlockExitsLengthChanged(newValue: number, oldValue: number): void;
    selectedBlocks: IBlock['uuid'][];
    activeBlockId: IBlock['uuid'] | null;
    operations: Record<OperationKind, SupportedOperation>;
    activeConnectionsContext: IConnectionContext[];
    isBlockEditorOpen: boolean;
    isConnectionCreationInProgress: boolean;
    blockClasses: BlockClassNames;
    isEditable: boolean;
    activeFlow?: IFlow;
    isMouseOnBlock: boolean;
    get blockExitsLength(): number;
    get numberOfExitsShown(): number;
    get hasExitsShown(): boolean;
    get hasMultipleExitsShown(): boolean;
    get hasLayout(): boolean;
    get isAssociatedWithActiveConnection(): boolean;
    get isAssociatedWithActiveConnectionAsSourceBlock(): boolean;
    get isAssociatedWithActiveConnectionAsTargetBlock(): boolean;
    get isWaitingForConnection(): boolean;
    get isBlockSelected(): boolean;
    get isConnectionCreateActive(): boolean;
    get isBlockActivated(): boolean;
    get shouldShowBlockEditorForCurrentBlock(): boolean;
    activateBlock: () => void;
    setBlockPositionTo: BlockPositionAction;
    initDraggableForExitsByUuid: () => void;
    setIsBlockEditorOpen: (value: boolean) => void;
    deactivateConnectionFromExitUuid: ({ exitUuid }: {
        exitUuid: IBlockExit['uuid'];
    }) => void;
    setConnectionCreateTargetBlock: BlockAction;
    setConnectionCreateTargetBlockToNullFrom: BlockAction;
    setIsMouseOnBlock(value: boolean): void;
    setIsConnectionSource(value: boolean): void;
    updateLabelContainerMaxWidth(blockExitsLength?: number, isRemoving?: boolean): void;
    isExitActivatedForCreate(exit: IBlockExit): boolean;
    activateBlockAsDropZone(): void;
    deactivateBlockAsDropZone(): void;
    onMoved({ position: { left: x, top: y } }: {
        position: {
            left: number;
            top: number;
        };
    }): void;
    selectBlock(): void;
    handleDraggableEndedForBlock(): void;
    handleDraggableDestroyedForBlock(): void;
}
export default Block;
