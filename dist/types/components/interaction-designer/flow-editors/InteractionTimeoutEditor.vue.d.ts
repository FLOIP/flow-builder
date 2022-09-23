import { IFlow } from '@floip/flow-runner';
declare const InteractionTimeoutEditor_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class InteractionTimeoutEditor extends InteractionTimeoutEditor_base {
    readonly flow: IFlow;
    validState?: boolean;
    get interactionTimeout(): number;
    set interactionTimeout(value: number);
    flow_setInteractionTimeout: ({ flowId, value, }: {
        flowId: IFlow['uuid'];
        value: IFlow['interaction_timeout'];
    }) => void;
}
export default InteractionTimeoutEditor;
