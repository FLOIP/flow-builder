/// <reference types="lodash" />
import Lang from '../lib/filters/lang';
import Routes from '../lib/mixins/Routes';
import { IContext } from '@floip/flow-runner';
import { ErrorObject } from 'ajv';
declare const ImportFlow_base: import("vue-class-component/lib/declarations").VueClass<Lang & Routes>;
declare class ImportFlow extends ImportFlow_base {
    readonly appConfig: object;
    readonly builderConfig: object;
    uploadOrPasteSetting: string;
    fileName: string;
    beforeCreate(): Promise<void>;
    created(): Promise<void>;
    mounted(): Promise<void>;
    resetValidationStatuses: ({ key }: {
        key: string;
    }) => void;
    get uploadOrPaste(): string;
    set uploadOrPaste(value: string);
    get flowJson(): string;
    set flowJson(value: string);
    setUpdatingAndHandleFlowJsonTextChange(value: string): void;
    debounceHandleFlowJsonTextChange: ((value: string) => Promise<void>) & import("lodash").Cancelable;
    handleFlowJsonTextChange(value: string): Promise<void>;
    isSafeToImport: boolean;
    get flowUUID(): string;
    chooseFile(): void;
    handleFileUpload(event: any): Promise<void>;
    pushAjvErrorToValidationStatuses: ({ key, ajvError }: {
        key: string;
        ajvError: ErrorObject;
    }) => void;
    ui: any;
    flow_persistImport: ({ persistRoute, flowContainer, }: {
        persistRoute: string;
        flowContainer: IContext;
    }) => Promise<IContext>;
    flow_resetStates: () => void;
    handleImportFlow(route: string): Promise<void>;
    configure: ({ appConfig, builderConfig }: {
        appConfig: object;
        builderConfig: object;
    }) => void;
    isConfigured: boolean;
    hasImportFlowTitle: boolean;
    get disableContinue(): boolean;
    setFlowJson: (value: string) => Promise<void>;
    baseReset: () => void;
    resetLanguageMatching: () => void;
    resetGroupMatching: () => void;
    resetPropertyMatching: () => void;
    setFlowError: (text: string) => void;
    setUpdating: (updatingStatus: boolean) => void;
    flowError: string;
    flowJsonText: string;
    flowContainer: IContext;
    reset(): void;
}
export default ImportFlow;
