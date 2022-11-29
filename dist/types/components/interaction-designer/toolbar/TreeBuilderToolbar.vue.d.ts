import Lang from '../../../lib/filters/lang';
import Permissions from '../../../lib/mixins/Permissions';
import Routes from '../../../lib/mixins/Routes';
import { IBlock, IContext, IFlow, IResource } from '@floip/flow-runner';
import { RawLocation } from 'vue-router';
import { Dictionary } from 'vue-router/types/router';
declare const TreeBuilderToolbar_base: import("vue-class-component/lib/declarations").VueClass<Lang & Permissions & Routes>;
export declare class TreeBuilderToolbar extends TreeBuilderToolbar_base {
    isExportVisible: boolean;
    height: number;
    mounted(): Promise<void>;
    onMetaChanged(meta: {
        [key: string]: string;
    }): void;
    isEmpty(value?: unknown): boolean;
    get flow(): string;
    get resourceUrl(): string;
    get downloadAudioUrl(): string;
    get treeUrl(): string;
    activeMainComponent?: string;
    get editModeUrl(): string;
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
    removeNilValues(obj: any): Dictionary<unknown>;
    /**
     * We have to make sure this is called using $nextTick() because we play with DOM
     */
    handleHeightChangeFromDOM(): void;
    handleFlowViewMenu(): void;
    handleResourceViewMenu(): void;
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
    isResourceViewerEnabled?: boolean;
    setTreeSaving: (isSaving: boolean) => void;
    attemptSaveTree: void;
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
    isEditable: boolean;
    hasFlowChanges: boolean;
    activeBlockId?: IBlock['uuid'];
    get viewModeUrl(): string;
    activeBlock?: IBlock;
    isBuilderCanvasEnabled: boolean;
    isResourceViewerCanvasEnabled: boolean;
    activateBlock: ({ blockId }: {
        blockId: IBlock['uuid'] | null;
    }) => void;
    setActiveMainComponent: ({ mainComponent }: {
        mainComponent: string | undefined;
    }) => void;
    persistFlowAndHandleUiState: () => Promise<IContext | undefined>;
    setSimulatorActive: (value: boolean) => void;
    remove_block_validation: ({ blockId }: {
        blockId?: IBlock['uuid'];
    }) => void;
}
export default TreeBuilderToolbar;
