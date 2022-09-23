import { IFlow } from '@floip/flow-runner';
declare const FetchFlow_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
declare class FetchFlow extends FetchFlow_base {
    readonly uuid: string;
    readonly appConfig: object;
    readonly builderConfig: object;
    message: string;
    showNewButton: boolean;
    flowLink: any;
    activeFlow: IFlow;
    flow_fetch: ({ fetchRoute }: {
        fetchRoute: string;
    }) => Promise<IFlow>;
    flow_setActiveFlowId: ({ flowId }: {
        flowId: string;
    }) => void;
    validate_allBlocksFromBackend: () => void;
    configure: ({ appConfig, builderConfig }: {
        appConfig: object;
        builderConfig: object;
    }) => void;
    isConfigured: boolean;
    mounted(): Promise<void>;
    beforeCreate(): Promise<void>;
    created(): Promise<void>;
}
export default FetchFlow;
