import Lang from '../../../../lib/filters/lang';
import Routes from '../../../../lib/mixins/Routes';
import { ILanguage } from '@floip/flow-runner';
declare const LanguageAdder_base: import("vue-class-component/lib/declarations").VueClass<Lang & Routes>;
export declare class LanguageAdder extends LanguageAdder_base {
    newLanguage: ILanguage;
    selected_iso_639_3: any;
    selected_iso_3166_1: any;
    iso_639_3Tags: any[];
    resetLanguage(): void;
    showAddLanguageModal(): void;
    customLanguageLabel(option: any): string;
    customLocaleLabel(option: any): string;
    iso_3166_1Locales(): object[];
    set iso_639_3(selection: any);
    get iso_639_3(): string;
    set iso_3166_1(selection: any);
    get iso_3166_1(): string;
    set variant(value: string);
    get variant(): string;
    filterVariant(e: KeyboardEvent): void;
    updateBCP47(): void;
    handleCreateLanguage(): Promise<void>;
    validateAndAddOrgLanguage: ({ language, persistRoute }: {
        language: ILanguage;
        persistRoute: string;
    }) => Promise<boolean | ILanguage>;
    locale: string;
    validation_removeNewLanguageValidation: () => Promise<void>;
}
export default LanguageAdder;
