/// <reference types="lodash" />
import Lang from '../lib/filters/lang';
import Routes from '../lib/mixins/Routes';
import { Route } from 'vue-router';
import { IBlock, IFlow, ILanguage, IResource, IResources, SupportedMode } from '@floip/flow-runner';
import { ErrorObject } from 'ajv';
import { MutationPayload } from 'vuex';
import { IValidationStatus } from '../store/validation';
declare const InteractionDesigner_base: import("vue-class-component/lib/declarations").VueClass<Lang & Routes>;
export declare class InteractionDesigner extends InteractionDesigner_base {
    readonly id: string;
    readonly mode: string;
    readonly mainComponent: string;
    readonly appConfig: object;
    readonly builderConfig: object;
    windowTop: number;
    get blocksOnActiveFlowForWatcher(): IBlock[];
    onActiveFlowChanged(newFlow: IFlow): Promise<void>;
    onBlocksInActiveFlowChanged(newBlocks: IBlock[], oldBlocks: IBlock[]): Promise<void>;
    validate_flow: ({ flow }: {
        flow: IFlow;
    }) => Promise<IValidationStatus>;
    debounceFlowValidation: ((this: any, { newFlow }: {
        newFlow: IFlow;
    }) => Promise<void>) & import("lodash").Cancelable;
    validate_allBlocksWithinFlow: () => Promise<void>;
    debounceBlockValidation: ((this: any) => void) & import("lodash").Cancelable;
    validate_resourcesOnSupportedValues: ({ resources, supportedModes, supportedLanguages }: {
        resources: IResource[];
        supportedModes: SupportedMode[];
        supportedLanguages: ILanguage[];
    }) => Promise<void>;
    onResourcesOnActiveFlowChanged(newResources: IResources, oldResources: IResources): Promise<void>;
    toolbarHeight: number;
    pureVuejsBlocks: string[];
    simulateClipboard: boolean;
    isConfigured: boolean;
    selectedBlock?: IBlock;
    hasChanges: boolean;
    hasIssues: boolean;
    isTreeSaving: boolean;
    isTreeValid: boolean;
    jsonValidationResults?: ErrorObject;
    validationResults?: ErrorObject;
    builderWidthAdjustment: number;
    designerWorkspaceHeight: number;
    tree: unknown;
    validationResultsEmptyTree: boolean;
    hasVoice?: boolean;
    hasSms?: boolean;
    hasUssd?: boolean;
    hasSocial?: boolean;
    hasClipboard?: boolean;
    blockClasses: Record<string, any>;
    activeFlow?: IFlow;
    activeMainComponent?: string;
    activeBlock?: IBlock;
    isEditable: boolean;
    hasFlowChanges: boolean;
    interactionDesignerBoundingClientRect: DOMRect;
    isBuilderCanvasEnabled: boolean;
    isResourceViewerCanvasEnabled: boolean;
    isSimulatorActive: boolean;
    get jsKey(): string;
    isPureVueBlock(): boolean;
    beforeCreate(): Promise<void>;
    onModeChanged(newMode: string): void;
    onMainComponentChanged(newMainComponent: string): void;
    setActiveMainComponent: ({ mainComponent }: {
        mainComponent: string | undefined;
    }) => void;
    activated(): void;
    created(): void;
    /** @note - mixin's mount() is called _before_ local mount() (eg. InteractionDesigner.legacy::mount() is 1st) */
    mounted(): Promise<void>;
    beforeDestroy(): void;
    onScroll(e: any): void;
    handleRouteUpdate(to: Route): void;
    configure: ({ appConfig, builderConfig }: {
        appConfig: object;
        builderConfig: object;
    }) => void;
    deselectBlocks: () => void;
    activateBlock: ({ blockId }: {
        blockId: IBlock['uuid'] | null;
    }) => void;
    setIsBlockEditorOpen: (value: boolean) => void;
    setInteractionDesignerBoundingClientRect: (value: DOMRect) => void;
    setInteractionDesignerHeaderBoundingClientRect: (value: DOMRect) => void;
    setWindowScrollY: (value: number) => void;
    setIsEditable: (arg0: boolean) => void;
    setHasFlowChanges: (arg0: boolean) => void;
    flow_setActiveFlowId: ({ flowId }: {
        flowId: string | null;
    }) => void;
    attemptSaveTree: () => void;
    discoverTallestBlockForDesignerWorkspaceHeight: ({ buffer, aboveTallest }: {
        buffer?: number;
        aboveTallest: boolean;
    }) => void;
    initializeTreeModel: () => void;
    registerBlockTypes(): Promise<void[]>;
    handleCanvasSelected({ target }: {
        target: Element;
    }): void;
    updateIsEditableFromParams(mode: string): void;
    /** --------------------------------| has-editable-locked | not-editable-locked |
     | mode-is-absent+view-url-suffix   |        0            |     0               |
     | mode-is-absent+edit-url-suffix   |        0 (r=>view)  |     1               |
     | mode-is-absent+absent-url-suffix |        0 (r=>view)  |     0 (r=>view)     | <- Equivalent to /view
     | mode-is-view                     |        0            |     0               |
     | mode-is-view+edit-url-suffix     |        0            |     0               |
     | mode-is-edit                     |        0 (r=>view)  |     1               |
     | mode-is-edit+view-url-suffix     |        0 (r=>view)  |     1               |
     ------------------------------------------------------------------------------ */
    discoverIsEditableFrom(mode: string, hash: string, isEditableLocked: boolean): boolean;
    showOrHideSidebar(): void;
    replaceRouteInHistory(name: string): void;
    handleFlowChanges({ type, payload }: MutationPayload): void;
}
export default InteractionDesigner;
