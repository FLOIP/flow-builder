import { IFlow, SupportedMode } from '@floip/flow-runner';
import Lang from '@/lib/filters/lang';
declare const ModesEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class ModesEditor extends ModesEditor_base {
    readonly flow: IFlow;
    get flowSelectedModes(): SupportedMode[];
    set flowSelectedModes(value: SupportedMode[]);
    supportedModes: SupportedMode[];
}
export default ModesEditor;
