import { IFlow } from '@floip/flow-runner';
import { ILanguage } from '@floip/flow-runner/dist/flow-spec/ILanguage';
import Lang from '../../../lib/filters/lang';
declare const LanguagesEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class LanguagesEditor extends LanguagesEditor_base {
    readonly flow: IFlow;
    get allLanguages(): ILanguage[];
    get selectedLanguages(): ILanguage[];
    set selectedLanguages(newLanguages: ILanguage[]);
    availableLanguages: ILanguage[];
    flow_updateLanguages: ({ flowId, newLanguages }: {
        flowId: string;
        newLanguages: ILanguage[];
    }) => void;
}
export default LanguagesEditor;
