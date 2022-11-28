import { IBlock, IFlow, SupportedMode } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
import Permissions from '../../../lib/mixins/Permissions';
import Routes from '../../../lib/mixins/Routes';
import FlowUploader from '../../../lib/mixins/FlowUploader';
declare const PerModeResourceEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang & Permissions & Routes & FlowUploader>;
export declare class PerModeResourceEditor extends PerModeResourceEditor_base {
    block: IBlock;
    openResources?: string[];
    activeFlow: IFlow;
    supportedModeWithOrderInfo: {
        mode: SupportedMode;
        index: number;
        order: number;
    }[];
    SupportedMode: typeof SupportedMode;
    iconsMap: Map<string, object>;
    expandedPanels: Record<string, boolean>;
    expandedPanelsOverridden: Record<string, boolean>;
    get hasOpenPanelsOverridden(): boolean;
    overrideOpenResources(resources: string[]): void;
    get isPanelExpanded(): Record<string, boolean>;
    updateIsPanelExpanded(id: any): void;
}
export default PerModeResourceEditor;
