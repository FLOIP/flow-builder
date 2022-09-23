import { IFlow } from '@floip/flow-runner';
import { ILanguage } from '@floip/flow-runner/dist/flow-spec/ILanguage';
import Lang from '@/lib/filters/lang';
declare const LanguagesEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class LanguagesEditor extends LanguagesEditor_base {
    readonly flow: IFlow;
    onLanguagesChange(newValue: ILanguage[], oldValue: ILanguage[]): void;
    get languages(): ILanguage[];
    get flowSelectedLanguages(): ILanguage[];
    set flowSelectedLanguages(value: ILanguage[]);
    ui: any;
}
export default LanguagesEditor;
