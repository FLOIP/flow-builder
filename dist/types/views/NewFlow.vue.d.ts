import Lang from '../lib/filters/lang';
import Routes from '../lib/mixins/Routes';
import { IContext, IFlow } from '@floip/flow-runner';
import { RawLocation } from 'vue-router';
import { IValidationStatus } from '../store/validation';
declare const NewFlow_base: import("vue-class-component/lib/declarations").VueClass<Lang & Routes>;
declare class NewFlow extends NewFlow_base {
    readonly appConfig: object;
    readonly builderConfig: object;
    didUserSubmit: boolean;
    onActiveFlowChanged(newFlow: IFlow): Promise<void>;
    get createFlowTitle(): string;
    mounted(): Promise<void>;
    beforeCreate(): Promise<void>;
    created(): Promise<void>;
    handlePersistFlow(route: RawLocation): Promise<void>;
    flowError: string | null;
    ui: any;
    hasCreateFlowTitle: boolean;
    flow_addBlankFlow: () => Promise<IFlow>;
    flow_persist: ({ persistRoute, flowContainer, }: {
        persistRoute: any;
        flowContainer: IContext;
    }) => Promise<IContext | null>;
    activeFlow: IFlow;
    isActiveFlowConsideredValidOnCreationForm?: boolean;
    activeFlowContainer: IContext;
    configure: ({ appConfig, builderConfig }: {
        appConfig: object;
        builderConfig: object;
    }) => void;
    isConfigured: boolean;
    validate_flow: ({ flow }: {
        flow: IFlow;
    }) => Promise<IValidationStatus>;
}
export default NewFlow;
