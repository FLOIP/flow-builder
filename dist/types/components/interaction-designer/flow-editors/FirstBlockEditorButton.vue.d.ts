import { IBlock, IFlow } from '@floip/flow-runner';
declare const FirstBlockEditorButton_base: import("vue-class-component/lib/declarations").VueClass<unknown>;
export declare class FirstBlockEditorButton extends FirstBlockEditorButton_base {
    readonly isEditable: boolean;
    readonly blockId: IBlock['uuid'];
    readonly flow: IFlow;
    get isStartBlock(): boolean;
    setStartBlock(event: any): void;
    flow_setFirstBlockId: ({ flowId, blockId }: {
        flowId: IFlow['uuid'];
        blockId: IBlock['uuid'];
    }) => void;
}
export default FirstBlockEditorButton;
