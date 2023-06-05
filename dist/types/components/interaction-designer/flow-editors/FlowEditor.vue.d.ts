import { IFlow } from '@floip/flow-runner';
import Lang from '../../../lib/filters/lang';
declare const FlowEditor_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class FlowEditor extends FlowEditor_base {
    readonly flow: IFlow;
    readonly flowHeader: string;
    readonly isOnSmallContainer: boolean;
    readonly didUserSubmit: boolean;
    get hasDefaultInteractionTimeout(): boolean;
    get firstRowClass(): string;
    get otherRowsClass(): string;
    ui: any;
    isEditable: boolean;
}
export default FlowEditor;
