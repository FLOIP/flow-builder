import { IFlow, SupportedMode } from '@floip/flow-runner';
declare const ModesEditor_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class ModesEditor extends ModesEditor_base {
    readonly flow: IFlow;
    get flowSelectedModes(): SupportedMode[];
    set flowSelectedModes(value: SupportedMode[]);
    supportedModes: SupportedMode[];
}
export default ModesEditor;
