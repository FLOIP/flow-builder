import { IFlow, IResource, ILanguage, SupportedMode } from '@floip/flow-runner';
import Lang from '@/lib/filters/lang';
declare const FlowEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class FlowEditor extends FlowEditor_base {
    readonly flow: IFlow;
    readonly flowHeader: string;
    readonly isOnSmallContainer: boolean;
    readonly didUserSubmit: boolean;
    get hasDefaultInteractionTimeout(): boolean;
    get firstRowClass(): string;
    get otherRowsClass(): string;
    updateFlowLanguages(value: ILanguage[] | ILanguage): Promise<void>;
    block_updateAllBlocksAfterAddingFlowLanguage: ({ language }: {
        language: ILanguage;
    }) => void;
    block_updateAllBlocksAfterDeletingFlowLanguage: ({ language }: {
        language: ILanguage;
    }) => void;
    updateFlowModes(value: SupportedMode[] | SupportedMode): Promise<void>;
    ui: any;
    activeFlow: IFlow;
    flow_setLanguages: ({ flowId, value }: {
        flowId: string;
        value: ILanguage | ILanguage[];
    }) => void;
    flow_setSupportedMode: any;
    handleFlowLanguagesAdded(value: ILanguage): void;
    handleFlowLanguagesRemoved(value: ILanguage): void;
    isEditable: boolean;
    validate_allBlocksWithinFlow: () => Promise<void>;
    validate_resourcesOnSupportedValues: ({ resources, supportedModes, supportedLanguages }: {
        resources: IResource[];
        supportedModes: SupportedMode[];
        supportedLanguages: ILanguage[];
    }) => Promise<void>;
}
export default FlowEditor;
