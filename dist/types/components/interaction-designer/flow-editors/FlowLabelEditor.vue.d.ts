import { IBlock, IFlow } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
declare const FlowLabelEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class FlowLabelEditor extends FlowLabelEditor_base {
    readonly flow: IFlow;
    validState?: boolean;
    get isInvalid(): boolean;
    get label(): IBlock['label'];
    set label(label: IBlock['label']);
    flow_setLabel: ({ flowId, label }: {
        flowId: IFlow['uuid'];
        label: IFlow['label'];
    }) => void;
    flow_setNameFromLabel: ({ flowId, label }: {
        flowId: IFlow['uuid'];
        label: IFlow['label'];
    }) => void;
}
export default FlowLabelEditor;
