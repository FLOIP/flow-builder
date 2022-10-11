import Lang from '../../lib/filters/lang';
import { IContext, IFlow } from '@floip/flow-runner';
export declare const DEBOUNCE_FLOW_PERSIST_MS = 1500;
declare const ResourceViewer_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class ResourceViewer extends ResourceViewer_base {
    activeFlow: IFlow;
    debounce_persistFlow: any;
    persistFlowAndHandleUiState: () => Promise<IContext | undefined>;

    get id(): string;

    mounted(): void;
}
export default ResourceViewer;
