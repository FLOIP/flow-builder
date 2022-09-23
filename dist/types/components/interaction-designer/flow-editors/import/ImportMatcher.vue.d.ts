import { IContext } from '@floip/flow-runner';
import Lang from '@/lib/filters/lang';
declare const ImportMatcher_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class ImportMatcher extends ImportMatcher_base {
    readonly matchNotFoundText: string;
    readonly type: string;
    readonly typeId: string;
    readonly typeLabel: string;
    readonly missingMatches: any[];
    readonly existingOptionsWithoutMatch: any[];
    mappings: {
        [key: string]: string;
    };
    getLabel(missingMatch: {
        [key: string]: string;
    }): string;
    getIdentifier(missingMatch: {
        [key: string]: string;
    }): string;
    updateMappings(missingMatch: {
        [key: string]: string;
    }, event: {
        target: {
            value: string;
        };
    }): void;
    get mappingsEmpty(): boolean;
    handleMatch(missingMatch: {
        [key: string]: string;
    }): void;
    tryToFixLanguages: (flowContainer: IContext) => Promise<void>;
    isFeatureAddLanguageOnImportEnabled: boolean;
    onLanguageAddition(): Promise<void>;
    flowContainer: IContext;
}
export default ImportMatcher;
