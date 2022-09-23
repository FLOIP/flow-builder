import { IBlock, IContext, IFlow, IResource } from '@floip/flow-runner';
import { RawLocation } from 'vue-router';
import { Dictionary } from 'vue-router/types/router';
declare const TreeBuilderToolbar_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class TreeBuilderToolbar extends TreeBuilderToolbar_base {
    isExportVisible: boolean;
    height: number;
    private readonly SAVING_ANIMATION_DURATION;
    mounted(): Promise<void>;
    onMetaChanged(meta: {
        [key: string]: string;
    }): void;
    isEmpty(value?: unknown): boolean;
    get flow(): string;
    get resourceViewUrl(): string;
    get downloadAudioUrl(): string;
    get editTreeUrl(): string;
    get viewTreeUrl(): string;
    get saveButtonText(): string;
    get isSavingDisabled(): boolean;
    get blockClassesForContentCategory(): any;
    get blockClassesForContactCategory(): any;
    get blockClassesForBranchingCategory(): any;
    get blockClassesForDeveloperCategory(): any;
    get canViewResultsTotals(): boolean;
    get hasSimulator(): boolean;
    handleAddBlockByTypeSelected({ type }: {
        type: IBlock['type'];
    }): Promise<void>;
    handlePersistFlow(route: RawLocation): Promise<void>;
    showOrHideEditFlowModal(): void;
    openDropdownMenu(targetElement: HTMLElement): void;
    toggleExportVisibility(): void;
    editTreeRoute({ component, mode }?: {
        component?: any;
        mode?: string | null;
    }): string;
    hasClassDetail(classDetails: {
        [key: string]: any;
    }, attribute: string): boolean;
    hasMenuCategory(classDetails: {
        [key: string]: any;
    }, category: number): boolean;
    translateTreeClassName(className: string): string;
    shouldDisplayDividerBefore(blockClasses: {
        [key: string]: any;
    }, className: string): string;
    handleResourceViewerSelected(): void;
    removeNilValues(obj: any): Dictionary<unknown>;
    /**
     * We have to make sure this is called using $nextTick() because we play with DOM
     */
    handleHeightChangeFromDOM(): void;
    tree: any;
    ui: any;
    hasToolbarFlowTitle: boolean;
    hasToolbarHomeButton: boolean;
    hasToolbarNewFlowButton: boolean;
    hasToolbarExportButton: boolean;
    isTreeSaving: boolean;
    isBlockAvailableByBlockClass?: any;
    hasChanges: boolean;
    isTreeValid: boolean;
    selectedBlock?: IBlock;
    isFeatureTreeSaveEnabled?: boolean;
    isFeatureTreeSendEnabled?: boolean;
    isFeatureTreeDuplicateEnabled?: boolean;
    isFeatureViewResultsEnabled?: boolean;
    isFeatureSimulatorEnabled?: boolean;
    isFeatureUpdateInteractionTotalsEnabled?: boolean;
    isResourceEditorEnabled?: boolean;
    setTreeSaving: (isSaving: boolean) => void;
    attemptSaveTree: void;
    getToolbarConfig: boolean;
    activeFlow: IFlow;
    activeFlowContainer?: IContext;
    hasOfflineMode?: boolean;
    isActiveFlowValid?: boolean;
    flows?: IFlow[];
    resources?: IResource[];
    flow_removeBlock: ({ flowId, blockId }: {
        flowId?: string;
        blockId?: IBlock['uuid'];
    }) => void;
    flow_addBlankBlockByType: ({ type, ...props }: Partial<IBlock>) => Promise<IBlock>;
    flow_duplicateBlock: ({ flowId, blockId, }: {
        flowId?: string;
        blockId?: IBlock['uuid'];
    }) => Promise<IBlock>;
    flow_persist: ({ persistRoute, flowContainer, }: {
        persistRoute: any;
        flowContainer?: IContext;
    }) => Promise<IContext | null>;
    isEditable: boolean;
    hasFlowChanges: boolean;
    activeBlockId?: IBlock['uuid'];
    activeBlock?: IBlock;
    activateBlock: ({ blockId }: {
        blockId: IBlock['uuid'] | null;
    }) => void;
    setSimulatorActive: (value: boolean) => void;
    remove_block_validation: ({ blockId }: {
        blockId?: IBlock['uuid'];
    }) => void;
}
export default TreeBuilderToolbar;
