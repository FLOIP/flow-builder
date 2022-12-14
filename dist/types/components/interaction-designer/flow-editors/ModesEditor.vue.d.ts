import { IFlow, SupportedMode } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
declare const ModesEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class ModesEditor extends ModesEditor_base {
    readonly flow: IFlow;
    get allModes(): SupportedMode[];
    get selectedModes(): SupportedMode[];
    set selectedModes(newModes: SupportedMode[]);
    availableModes: SupportedMode[];
    flow_updateModes: (args: {
        flowId: string;
        newModes: SupportedMode[];
    }) => void;
}
export default ModesEditor;
