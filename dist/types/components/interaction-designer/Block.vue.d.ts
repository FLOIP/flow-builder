import { IBlock, IBlockExit, IFlow } from '@floip/flow-runner';
import { ConnectionLayout, IConnectionContext, IPosition, OperationKind, SupportedOperation } from '../../store/builder';
import Lang from '../../lib/filters/lang';
import { BlockClassNames } from '../../lib/types';
declare type Draggable = any;
declare type BlockAction = ({ block }: {
    block: IBlock;
}) => void;
declare type BlockExitAction = ({ block, exit }: {
    block: IBlock;
    exit: IBlockExit;
}) => void;
declare type BlockPositionAction = ({ block, position }: {
    block: IBlock;
    position: IPosition;
}) => void;
declare type BlockExitPositionAction = ({ block, exit, position }: {
    block: IBlock;
    exit: IBlockExit;
    position: IPosition;
}) => void;
export declare const BLOCK_RESET_CONNECTIONS = "BLOCK_RESET_CONNECTIONS";
declare const Block_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class Block extends Block_base {
    readonly block: IBlock;
    readonly x: number;
    readonly y: number;
    livePosition: {
        x: number;
        y: number;
    } | null;
    labelContainerMaxWidth: number;
    blockWidth: number;
    blockHeight: number;
    exitHovers: {};
    exitOnDragged: Record<IBlockExit['uuid'], boolean>;
    lineHovers: Record<IBlockExit['uuid'], boolean>;
    linePermanentlyActive: Record<IBlockExit['uuid'], boolean>;
    cursorPosition: {
        x: number;
        y: number;
    } | null;
    connectionColorAtSourceDragged: string;
    connectionColorForKnowDestination: string;
    isConnectionSource: boolean;
    translatedBlockPosition: string;
    created(): void;
    updated(): void;
    mounted(): void;
    onBlockExitsLengthChanged(newValue: number, oldValue: number): void;
    selectedBlocks: IBlock['uuid'][];
    activeBlockId: IBlock['uuid'] | null;
    operations: Record<OperationKind, SupportedOperation>;
    activeConnectionsContext: IConnectionContext[];
    draggableForExitsByUuid: Record<string, Draggable>;
    isBlockEditorOpen: boolean;
    isConnectionCreationInProgress: boolean;
    blockClasses: BlockClassNames;
    blocksById: Record<IBlock['uuid'], IBlock>;
    isEditable: boolean;
    interactionDesignerBoundingClientRect: DOMRect;
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
    get isConnectionSourceRelocateActive(): boolean;
    get isConnectionCreateActive(): boolean;
    get isBlockActivated(): boolean;
    updateTranslatedBlockEditorPosition(): void;
    get shouldShowBlockEditor(): boolean;
    generateConnectionLayoutKeyFor(source: IBlock, target: IBlock): ConnectionLayout;
    activateBlock: () => void;
    setBlockPositionTo: BlockPositionAction;
    initDraggableForExitsByUuid: () => void;
    setIsBlockEditorOpen: (value: boolean) => void;
    deactivateConnectionFromExitUuid: ({ exitUuid }: {
        exitUuid: IBlockExit['uuid'];
    }) => void;
    removeConnectionFrom: BlockExitAction;
    initializeConnectionSourceRelocateWith: BlockExitPositionAction;
    setConnectionSourceRelocateValue: BlockExitAction;
    setConnectionSourceRelocateValueToNullFrom: BlockExitAction;
    applyConnectionSourceRelocate: () => void;
    initializeConnectionCreateWith: BlockExitPositionAction;
    setConnectionCreateTargetBlock: BlockAction;
    setConnectionCreateTargetBlockToNullFrom: BlockAction;
    applyConnectionCreate: () => void;
    setIsMouseOnBlock(value: boolean): void;
    exitMouseEnter(exit: IBlockExit): void;
    exitMouseLeave(exit: IBlockExit): void;
    setLineHovered(exit: IBlockExit, value: boolean): void;
    setLineClicked(exit: IBlockExit, value: boolean): void;
    updateLabelContainerMaxWidth(blockExitsLength?: number, isRemoving?: boolean): void;
    isExitActivatedForRelocate(exit: IBlockExit): boolean;
    isExitActivatedForCreate(exit: IBlockExit): boolean;
    activateExitAsDropZone(e: MouseEvent, exit: IBlockExit): void;
    deactivateExitAsDropZone(e: MouseEvent, exit: IBlockExit): void;
    activateBlockAsDropZone(): void;
    deactivateBlockAsDropZone(): void;
    onMoved({ position: { left: x, top: y } }: {
        position: {
            left: number;
            top: number;
        };
    }): void;
    handleRemoveConnectionFrom(exit: IBlockExit): void;
    handleDraggableInitializedFor({ uuid }: {
        uuid: string;
    }, { draggable }: {
        draggable: Draggable;
    }): void;
    handleDraggableDestroyedFor({ uuid }: {
        uuid: string;
    }): void;
    onCreateExitDragStarted({ draggable }: {
        draggable: Draggable;
    }, exit: IBlockExit): void;
    onCreateExitDragged({ position: { left: x, top: y } }: {
        position: {
            left: number;
            top: number;
        };
    }): void;
    onCreateExitDragEnded({ draggable }: {
        draggable: Draggable;
    }, exit: IBlockExit): void;
    onMoveExitDragStarted({ draggable }: {
        draggable: Draggable;
    }, exit: IBlockExit): void;
    onMoveExitDragged({ position: { left: x, top: y } }: {
        position: {
            left: number;
            top: number;
        };
    }): void;
    onMoveExitDragEnded({ draggable }: {
        draggable: Draggable;
    }): void;
    selectBlock(): void;
    handleDraggableEndedForBlock(): void;
    handleDraggableDestroyedForBlock(): void;
    updateCursorPosition(e: MouseEvent): void;
    adjustDraggablePosition(draggable: Draggable): void;
}
export default Block;
