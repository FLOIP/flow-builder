import { Route } from 'vue-router';
import { IBlock, IFlow } from '@floip/flow-runner';
import { ErrorObject } from 'ajv';
import { MutationPayload } from 'vuex';
declare const InteractionDesigner_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class InteractionDesigner extends InteractionDesigner_base {
    readonly id: string;
    readonly mode: string;
    readonly appConfig: object;
    readonly builderConfig: object;
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
    activeBlock?: IBlock;
    isEditable: boolean;
    hasFlowChanges: boolean;
    interactionDesignerBoundingClientRect: DOMRect;
    isSimulatorActive: boolean;
    get jsKey(): string;
    isPureVueBlock(): boolean;
    beforeCreate(): Promise<void>;
    onModeChanged(newMode: string): void;
    created(): void;
    activated(): void;
    /** @note - mixin's mount() is called _before_ local mount() (eg. InteractionDesigner.legacy::mount() is 1st) */
    mounted(): Promise<void>;
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
    hoistResourceViewerToPushState(hash: string): void;
    showOrHideSidebar(): void;
    replaceRouteInHistory(name: string): void;
    handleFlowChanges({ type, payload }: MutationPayload): void;
}
export default InteractionDesigner;
